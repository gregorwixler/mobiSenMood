SenMood.views.myActivities = Ext.extend(Ext.Panel, {
    title: "Aktuelles",
    iconCls: "star",
    styleHtmlContent: true,
	layout: 'fit',
    initComponent: function() {
		
		var myActivitiesToolbar = new Ext.Toolbar({
            id: 'activitiesToolbar',
            title: 'Aktuelles',
            });

		Ext.apply(this, {
			dockedItems: [myActivitiesToolbar],
			items: new Ext.DataView({
				store: offlineChanges.load(),
				 tpl: new Ext.XTemplate(
					'<tpl for=".">',
						'<tpl if="this.emptyCheck(values.error)">',
							'<div class="selectorBox">',
								'<div class="bigBlack">{name}</div>',
								'<div class="courseName">Kurs: {[this.courseName(values.courseid)]}',
								'<div class="dateInput">Erstellt am {[this.myDatum(values.timestamp)]} von {author}</div>',
							'</div>',
						'</tpl>',
					'</tpl>',
					{
						myDatum: function(timestamp) {
							// UNIX-timestamp multiplied by 1000 so that the argument is in milliseconds, not seconds (this can be converted to date)
							var date = new Date(timestamp*1000);
							return date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear() + " um " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
						},
						courseName: function(courseid) {
							return Ext.getStore('offlineCourse').getById(courseid).data.fullname;
						},
						emptyCheck: function(errormsg) {
							 // Time now - 1 Hour converted to UNIX-Timestamp. Used with the XTemplate to filter out old events
							 if (errormsg == "") {
									return true;
								 }
							 else {
									return false;
								 }
						 }
					}
				),
				itemSelector:'div.selectorBox',
			})
        });
        SenMood.views.myActivities.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('my_activities', SenMood.views.myActivities);