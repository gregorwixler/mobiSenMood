SenMood.views.myCalendar = Ext.extend(Ext.Panel, {
    title: "Termine",
    iconCls: "time",
    styleHtmlContent: true,
	layout: 'fit',
    initComponent: function() {
        Ext.apply(this, {
            dockedItems: [{
                xtype: "toolbar",
                title: "Meine Termine"
            }],
			items: new Ext.DataView({
				store: offlineEvents.read(),
				tpl: new Ext.XTemplate(
					'<tpl for=".">',
						'<tpl if="this.timeCheck(values.timestart)">',
						'<div class="selectorBox">',
							'<div class="bigBlack">{name}</div>',
							'<div>Vorlesung: {[this.courseName(values.courseid)]}</div>',
							'<div>Wann: {[this.myDatum(values.timestart)]}</div>',
							'<div class="smallGrey">Bearbeitet am: {[this.myDatum(values.timemodified)]}</div>',
						'</div>',
						'</tpl>',
					'</tpl>',
					{
						myDatum: function(timestamp) {
							// UNIX-timestamp multiplied by 1000 so that the argument is in milliseconds, not seconds (this can be converted to date)
							var date = new Date(timestamp*1000);
							return date.format('d.m.Y') + ' um ' +date.format('H:i');
							},
						courseName: function(courseid) {
							// Get the course name from saved offline data							
							return Ext.getStore('offlineCourse').getById(courseid).data.fullname;
						},
						 timeCheck: function(timestart) {
							 // Time now - 1 Hour converted to UNIX-Timestamp. Used with the XTemplate to filter out old events
							 if ((timestart-(new Date().getTime()/1000)-3600) > 0) {
									return true;
								 }
							 else {
									return false;
								 }
						 }
					}
				),
				itemSelector:'div.selectorBox',
				listeners: {
					itemtap: function(dataview, index, el, e) {
							var date = new Date(dataview.store.getAt(index).data.timestart*1000);
							
							this.popup = new Ext.Panel({
								floating: true,
								// A modal overlay would be nice, but (due to a bug in Sencha) it locks the screen, when the popup is closed after being scrolled in
//								modal: true,
								centered: true,
								width: 300,
								height: 300,
								styleHtmlContent: true,
								scroll: 'vertical',
								html: '<div><h4>'+dataview.store.getAt(index).data.name+'</h4></div><hr><div>Datum: '+date.getDate()+ '.' + (date.getMonth()+1) + '.' + date.getFullYear()+'</div><div>Beginn: '+date.getHours() + ":" + date.getMinutes()+'</div><hr><div>'+ dataview.store.getAt(index).data.description+'</div>',

							});
						this.popup.show('pop');
					}							
				},
			})
        });
        SenMood.views.myCalendar.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('my_calendar', SenMood.views.myCalendar);