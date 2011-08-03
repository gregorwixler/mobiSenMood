SenMood.views.AppSettings = Ext.extend(Ext.form.FormPanel, {
	id: 'loginPanel',
	title: "mobiSenMood",
    iconCls: "settings",
    scroll: "vertical",
	fullscreen: true,
	html: '<br><div align="center"><img src="resources/images/SenMood_small.png"/></div>',
	
    initComponent: function() {
        Ext.apply(this, {
            dockedItems: [{
                xtype: "toolbar",
                title: "SenMood"
            }],
            items: [
                {
                xtype: 'fieldset',
                title: 'Moodle-Login',
                items: [{
                    xtype: 'textfield',
                    name : 'name',
                    label: 'Username',
					id: 'txt_username'
                },{
                    xtype: 'passwordfield',
                    name : 'password',
                    label: 'Passwort',
					id: 'txt_password'
                }],
            },{
                xtype:  'button',
                text:   'Einloggen',
                ui:     'confirm',

				listeners: {
				tap: {
				
				fn: function() {
					Ext.dispatch({
						controller: 'cSenMood',
						action    : 'getMyId',
						user	: Ext.getCmp('txt_username').getValue(), 
						pass	: Ext.getCmp('txt_password').getValue()
						});
					},	
				 
				}
				}
            }]
        });
        SenMood.views.AppSettings.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('login-panel', SenMood.views.AppSettings);
