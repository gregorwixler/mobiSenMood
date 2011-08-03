/**
 * @class cSenMood
 * @extends Ext.Controller
 * 
 */
Ext.regController("cSenMood", {

	goLogin: function() {
	// Show the Login-Screen. This is the first screen an app should load.	
		
		this.FormPanel = this.render({
            xtype: 'login-panel'
        }, 
		Ext.getBody()).show();
		
		// --- Start Check for saved Userlogin
		var store = Ext.getStore('SenMoodLoginStore'),
				first = store.first();
			if (first) {
		//what to do when username + login were saved last time
			store.read({
				scope: this,
					callback: function (records) {
					// Set the Login und Pass textfields in the login view to values that were used (and worked) last time
					Ext.getCmp('txt_username').setValue(first.get('user')), 
					Ext.getCmp('txt_password').setValue(first.get('pass'))
					}
				});
			}
	// End Check for saved Userlogin
    },

	goMain: function() {
     // Show the main panel. The one with the tabs
	this.TabPanel = this.render({
            xtype: 'mainPanel'
         }, 
		 Ext.getBody()).show();
	
		// Removes the now unused login panel to save some more ressources
				Ext.getCmp('login-panel').destroy();
    },
	
	getMyId: function (options) {
		
		// Create and show the login attempt message
		var loginMask = new Ext.LoadMask(Ext.getBody(), {msg:"Anmeldung am Server ..."});
		loginMask.show();
		
		// -- Call WSPP with the Username and Password from the Loginpanel and get my Moodle-ID
		Ext.Ajax.request({
			url: proxy_url,
			method: 'GET',
			timeout: 3000,
			params: {
				wspp: 'get_my_id',
				user: options.user,
				pass: options.pass
			},
				
			success: function(data) {
			// The call is always a success (as long the server is online), as the WSPP server always sends a response of some kind (this could be an error-response too)
				
				// Hide and destroy the login attempt mask
				loginMask.hide();
				loginMask.disable();
				
				if (data.responseText == "Wspp Base Server :Invalid username and / or password.-1") {
				// Server says we have invalid Login data
					Ext.Msg.alert('Login fehlgeschlagen!', 'Bitte überprüfen Sie Ihren Usernamen und Ihr Passwort.', Ext.emptyFn);
				} else 
				
				{
				// Login works just fine.
				// Dump old data to be sure and wirte the new data into our local storage (so only the last user has his logins saved)
				Ext.getStore('SenMoodLoginStore').proxy.clear();
				Ext.getStore('SenMoodLoginStore').add({id: 1, user: options.user, pass: options.pass, moodId: data.responseText});
				Ext.getStore('SenMoodLoginStore').save();
				
				// Start the function to fill the local Databases wif fresh data from Moodle
				Ext.dispatch({
				controller: 'cSenMood',
				action    : 'getData'});
				}
			},
			failure:	function () {
				// -- No server connection. But we can use the data we allready have in our offline storage.

					Ext.Msg.alert('Verbindungsfehler!', 'Keine Verbindung zum Server! Weiter im Offlinemodus.', Ext.emptyFn);
					// Load the main view, as the whole view actually uses saved data
					Ext.dispatch({
						controller: 'cSenMood',
						action    : 'goMain'});
			},
		});
    },
	
	getData: function(options) { 
		var store = Ext.getStore('SenMoodLoginStore'),first = store.first();

		offlineSections.proxy.clear();
		offlineCourses.proxy.clear();
		offlineEvents.proxy.clear();
		offlineChanges.proxy.clear();
		derp.removeAll();



		// Call all the Datacollectors, so they may fill our local storage with some fresh data
		Ext.dispatch({
		controller: 'cSenMood',
		action    : 'getCourses',
		user	: first.get('user'), 
		pass	: first.get('pass')
		});
		
		if (options.refresh==true) {
		//Refresh the Data in the main panel, but only if the button says it. no need to re-render the whole main view again otherwise
		Ext.getCmp('main_panel').doLayout();
		}
	},
	
	getSections: function(options) {
	// Get sections of our courses
	
	var myCoursesSection = Ext.getStore('onlineSection');
	myCoursesSection.load({
		scope   : this,
		params: {
			user: options.user,
			pass: options.pass,
			param1: Ext.getStore('offlineCourse').collect('id').join(":"),	// CourseIDs as serialized array. Divider in the PHP-SOAP-to-JSON-parser is ":"
			name_param1: 'courseids',
			param2: 'id',
			name_param2: 'idfield'
		},
		callback: function(records, operation, success) {
		//the operation object contains all of the details of the load operation
			}
		});
	},
	
	getCourses: function(options) {
	// Get Courses Data ...
	Ext.getStore('onlineCourse').load({
		scope   : this,
		params: {
			user: options.user,
			pass: options.pass
		},
		callback: function(records, operation, success) {
		//the operation object contains all of the details of the load operation
		
			Ext.dispatch({
				controller: 'cSenMood',
				action    : 'getChanges',
				user: options.user,
				pass: options.pass
			});

			Ext.dispatch({
				controller: 'cSenMood',
				action    : 'getSections',
				user: options.user,
				pass: options.pass
			});
		
			Ext.dispatch({
				controller: 'cSenMood',
				action    : 'getEvents',
				user: options.user,
				pass: options.pass
			});
		}
	});
	},
	
	getEvents: function(options) {
	// Get Events Data ...
	
	var myEventStore = Ext.getStore('onlineEvent');
	
	myEventStore.load({
		scope   : this,
		params: {
			user: options.user,
			pass: options.pass
		},
		callback: function(records, operation, success) {
		//the operation object contains all of the details of the load operation
				Ext.dispatch({
					controller: 'cSenMood',
					action    : 'goMain'
				});
			}
		});
	},
	
	getChanges: function(options) {
	// Get changes for our courses
	offlineChanges.proxy.clear();
	var tempStore = Ext.getStore('onlineCourse');
	
		tempStore.each(function(record) {
		Ext.getStore('onlineChange').load({
				scope   : this,
				params: {
					user: options.user,
					pass: options.pass,
					param1: record.data.id,
					name_param1: 'courseid',
					param2: 'id',
					name_param2: 'idfield',
					param3: '25',
					name_param3: 'limit'
				},
				callback: function(records, operation, success) {
				//the operation object contains all of the details of the load operation .. if there is any output
				}
			});
		}
	)
	
	},
	
});