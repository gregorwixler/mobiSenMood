/**
 * @class Course
 * @extends Ext.data.Model
 * The Course model - used for courses data
 * Designed after wspp SOAP output
 * WARNING! Due to a bug in Moodle 2.0.3 strings like 'summary' or 'description' may carry garbled HTML statements. These come from messed up XML statements given by Moodle. 
 */
Ext.regModel('Course', {
    fields: [
		{name:'error', type: 'string'},
		{name:'id', type:'int'},
		{name:'category', type:'int'},
		{name:'sortorder', type:'int'},
		{name:'password', type:'string'},
		{name:'fullname', type:'string'},
		{name:'shortname', type:'string'},
		{name:'idnumber', type:'string'},
		{name:'summary', type:'string'},
		{name:'format', type:'string'},
		{name:'showgrades', type:'int'},
		{name:'newsitems', type:'int'},
		{name:'teacher', type:'string'},
		{name:'teachers', type:'string'},
		{name:'student', type:'string'},
		{name:'students', type:'string'},
		{name:'guest', type:'int'},
		{name:'startdate', type:'int'},
		{name:'enrolperiod', type:'int'},
		{name:'numsections', type:'int'},
		{name:'marker', type:'int'},
		{name:'maxbytes', type:'int'},
		{name:'visible', type:'int'},
		{name:'hiddensections', type:'int'},
		{name:'groupmode', type:'int'},
		{name:'groupmodeforce', type:'int'},
		{name:'lang', type:'string'},
		{name:'theme', type:'string'},
		{name:'cost', type:'string'},
		{name:'timecreated', type:'int'},
		{name:'timemodified', type:'int'},
		{name:'metacourse', type:'int'},
		{name:'myrole', type:'int'}
	],
	
//	hasMany: [
//        {model: 'Event', name: 'events', primaryKey: 'id', foreignKey: 'courseid', filterProperty: 'courseid'},
//		{model: 'Section', name: 'section', primaryKey: 'id', foreignKey: 'course', filterProperty: 'course'},
//		{model: 'Activity', name: 'activity', primaryKey: 'id', foreignKey: 'courseid', filterProperty: 'courseid'}
//    ]
});

/**
 * @class Event
 * @extends Ext.data.Model
 * The Event model - used for calendar events data
 * Designed after wspp SOAP output
 * WARNING! Due to a bug in Moodle 2.0.3, strings like 'summary' or 'description' may carry garbled HTML statements. These come from messed up XML statements given by Moodle.
 */
Ext.regModel('Event', {
    fields: [
		{name: 'error', type: 'string'},
		{name: 'id', type: 'int'},
		{name: 'name', type: 'string'},
		{name: 'description', type: 'string'},
		{name: 'format', type: 'int'},
		{name: 'courseid', type: 'int'},
		{name: 'groupid', type: 'int'},
		{name: 'userid', type: 'int'},
		{name: 'repeatid', type: 'int'},
		{name: 'modulename', type: 'string'},
		{name: 'instance', type: 'int'},
		{name: 'eventtype', type: 'string'},
		{name: 'timestart', type: 'int'},
		{name: 'timeduration', type: 'int'},
		{name: 'visible', type: 'int'},
		{name: 'uuid', type: 'string'},
		{name: 'sequence', type: 'int'},
		{name: 'timemodified', type: 'int'}
	]
});

/**
 * @class Section
 * @extends Ext.data.Model
 * The Section model - used for sections/weeks in a Moodle course
 * Designed after wspp SOAP output
 * WARNING! Due to a bug in Moodle 2.0.3 strings like 'summary' or 'description' may carry garbled HTML statements. These come from messed up XML statements given by Moodle.
 */
Ext.regModel('Section', {
    fields: [
        {name: 'error', type: 'string'},
		{name: 'id', type: 'int'},
		{name: 'course', type: 'int'},
		{name: 'section', type: 'int'},
		{name: 'sequence', type: 'string'},
		{name: 'summary', type: 'string'},
		{name: 'visible', type: 'int'}
	]
});	

/**
 * @class LastChanges
 * @extends Ext.data.Model
 * The LastChanges model - used for the output of changes in a course since last login
 * Designed after wspp SOAP output
 * WARNING! Due to a bug in Moodle 2.0.3 strings like 'summary' or 'description' may carry garbled HTML statements. These come from messed up XML statements given by Moodle.
 *
 * Note: default error XML string is <error xsi:type="xsd:string">no changes</error>
 */
Ext.regModel('Change', {
    fields: [
		{name: 'error', type: 'string'},
		{name: 'id', type: 'int'},
		{name: 'courseid', type: 'int'},
		{name: 'instance', type: 'int'},
		{name: 'resid', type: 'int'},
		{name: 'name', type: 'string'},
		{name: 'date', type: 'string'},
		{name: 'timestamp', type: 'int'},
		{name: 'type', type: 'string'},
		{name: 'author', type: 'string'},
		{name: 'link', type: 'string'},
		{name: 'url', type: 'string'},
		{name: 'visible', type: 'int'}
	]
});

/**
 * @class SenMoodLogin
 * @extends Ext.data.Model
 * The SenMoodLogin model
 */
Ext.regModel("SenMoodLogin", {
    fields: ['id', 'user', 'pass', 'moodId'],
});
	
/**
 * @class ListItem
 * @extends Ext.data.Model
 * Model used to show the Setup-view menu structure
 */	
Ext.regModel('ListItem', {
    fields: [
        {name: 'text', type: 'string'},
        {name: 'card'}
    ]
});	
