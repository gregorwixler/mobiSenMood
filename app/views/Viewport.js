SenMood.views.mainPanel = Ext.extend(Ext.TabPanel, {
    fullscreen: true,
	id: 'main_panel',
	
    initComponent: function() {
        Ext.apply(this, {
            tabBar: {
                dock: 'bottom',
                layout: {
                    pack: 'center'
                }
            },
            items: [
                { xtype: 'my_activities'},
                { xtype: 'my_calendar'},
				{ xtype: 'my_courses'},
                { xtype: 'morecard'}
            ],
	
        });
        SenMood.views.mainPanel.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('mainPanel', SenMood.views.mainPanel);
