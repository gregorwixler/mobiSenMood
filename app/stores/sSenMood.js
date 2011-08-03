// This is the URL to your Parser-Webservice
// Change it, so that the Stores can get their Data
var proxy_url = 'http://YourWebAppServer/webservice/soap_to_json.php';
// ------

// --- Start Courses store ----
new Ext.data.Store({
    model: 'Course',
	storeId: 'onlineCourse',
	clearOnPageLoad: false,
    proxy: {
        type: 'ajax',
		url: proxy_url,
		timeout: 5000,
        reader: {
            type: 'json',
            root: 'courses'
        },
		extraParams: {
			wspp: 'get_my_courses',
//			user: 'Moodle-User',
//			pass: 'Moodle-Password'
		}
    },
	listeners: {
		load: function () {
			console.log("Courses loaded");
			Ext.getStore('offlineCourse').proxy.clear();			
			this.each(function (record) {			
			Ext.getStore('offlineCourse').add(record.data)[0];
				});
			Ext.getStore('offlineCourse').sync();
			
		},
		exception:function () {
			console.log("I think we are offline");	
		},
	}
});

new Ext.data.Store({
    model: 'Course',
	storeId: 'temp_onlineCourse',
    proxy: {
        type: 'ajax',
        url : proxy_url,
		timeout: 5000,
        reader: {
            type: 'json',
            root: 'courses'
        },
		extraParams: {
			wspp: 'get_my_courses',
//			user: 'Moodle-User',
//			pass: 'Moodle-Password'
		}
    },
});

var offlineCourses = new Ext.data.Store({
    model: 'Course',
	storeId: 'offlineCourse',
	proxy: {
        type: 'localstorage',
        id  : 'SenMood-myCourses',
		},
});
// ---- End Courses stores ----

// ---- start ID stores ----
new Ext.data.Store({
    model: 'MyId',
	storeId: 'onlineId',
	timeout: 5000,
    proxy: {
        type: 'ajax',
		method: 'GET',
        url : proxy_url,
        reader: {
            type: 'json',
            root: 'response'
        },
		extraParams: {
			wspp: 'get_my_id',
		// --- Needed Parameters ----
//			user: 'Moodle-User',
//			pass: 'Moodle-Password'
		}
    }
});
// No explicit offline store, since offline saving of our ID is handled directely in the controlers
// ---- End ID stores ----


// ----Start Event stores -----
new Ext.data.Store({
    model: 'Event',
    storeId: 'onlineEvent',
	timeout: 5000,
	proxy: {
        type: 'ajax',
        url : proxy_url,
        reader: {
            type: 'json',
            root: 'events'
        },
		extraParams: {
			wspp: 'get_events',
		// --- Needed Parameters ----
//			user: 'Moodle-User',
//			pass: 'Moodle-Password'
		}
    },
	listeners: {
		load: function () {
			console.log("Events loaded");
			offlineEvents.proxy.clear();
			this.each(function (record) {
				offlineEvents.add(record.data)[0];
				});
			offlineEvents.sync();
		}
	
	}
});

var offlineEvents = new Ext.data.Store({
    model: 'Event',
	storeId: 'offlineEvent',
    proxy: {
        type: 'localstorage',
        id  : 'SenMood-myEvents',
		}
});
// ---- End Event Stores -----

// ---- Start Course Sections stores ----
new Ext.data.Store({
    model: 'Section',
	storeId: 'onlineSection',
	timeout: 5000,
    proxy: {
        type: 'ajax',
        url : proxy_url,
        reader: {
            type: 'json',
            root: 'sections'
        },
		extraParams: {
			wspp: 'get_sections',
		// --- Needed Parameters ----	
			// user: 'Moodle-User',
			// pass: 'Moodle-Password',
			// param1: '1:2',	// CourseIDs as serialized array. Divider in the PHP-SOAP-to-JSON-parser is ":"
			// name_param1: 'courseids',
			// param2: 'id',
			// name_param2: 'idfield'
		}
    },
	listeners: {
		load: function () {
			console.log("Sections loaded");
			offlineSections.proxy.clear();
			this.each(function (record) {
				offlineSections.add(record.data)[0];
				});
			offlineSections.sync();
		}
	
	}

});

var offlineSections = new Ext.data.Store({
    model: 'Section',
    storeId: 'offlineSection',
    proxy: {
        type: 'localstorage',
        id  : 'SenMood-mySections',
		},
});
// ---- End of Course Sections stores ------

// ---- Start Changes stores -------
new Ext.data.Store({
    model: 'Change',
	storeId: 'onlineChange',
	timeout: 5000,
    proxy: {
        type: 'ajax',
        url : proxy_url,
        reader: {
            type: 'json',
            root: 'changes'
        },
		extraParams: {
			wspp: 'get_last_changes',
		// --- Needed Parameters ----
			// user: 'Moodle-User',
			// pass: 'Moodle-Password',
			// param1:'2',
			// name_param1: 'courseid',
			// param2:'id',
			// name_param2:'idfield',
			// param3: '15',
			// name_param3: 'limit'
		}
    },
	listeners: {
	load: function () {
		console.log("Changes loaded");
// No proxy.clear(), as this store is called once for each course. The call is done in the getChanges method. Here it would simply delete previous data and leave the last collected dataset. you wouldn't like that.
		this.each(function (record) {
			if (record.data.error != "no changes") {
			var dataPump = offlineChanges.add(record.data);
			};
			});
		offlineChanges.sync();
		},
	failure: function () {
		console.log("Changes error!");
	},
	}
});

var offlineChanges = new Ext.data.Store({
    model: 'Change',
	storeId: 'offlineChange',
	proxy: {
        type: 'localstorage',
        id  : 'SenMood-myChanges',
		}
    
});
// ---- End Changes store ----

// ---- Begin SenMoodLoginStore -------
// This one is for local login data, as you may have already guessed

var LoginStore = new Ext.data.Store({
    model: 'SenMoodLogin',
	storeId: 'SenMoodLoginStore',
	autoLoad: true,
	autoSave: true,
	proxy: {
        type: 'localstorage',
        id  : 'login_local',
		idProperty: 'id'
		}
});
// ---- End SenMoodLoginStore --------