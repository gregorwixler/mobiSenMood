SenMood.views.ChangeUserCard = Ext.extend(Ext.Panel, {
    id: 'changeusercard',
    styleHtmlContent: true,
    layout: 'vbox',
   initComponent: function() {

var ShowLogin = new Ext.DataView({
				store: LoginStore.read(),
				 tpl: new Ext.XTemplate(
					'<tpl for=".">',
							'<div class="selectorBox">',
								'<div class="courseName">Aktuell eingelogt als: {user}</div>',
							'</div>',
					'</tpl>'
				),
				itemSelector:'div.selectorBox'
		});
		
		var ReLoginButton = new Ext.Button({
                    ui  : 'decline-round',
                    text: 'Benutzer wechseln',
                    handler: function () {
                        //Hide and destroy the active view and call the login view
                        // If this is not done, the panel will be rendered a second time and that will FUBAR the shown data
						Ext.getCmp('main_panel').hide();
						Ext.getCmp('main_panel').destroy();
						
						// Clear old users Data. Not very clean, but has to be done due to what seems to be a Sencha bug.
						// The functions that empty old data first (see every store in sSenMood.js) won't run, if the login view is called without a complete reload of the whole page.
						// This results in a cumulativly added data in each local store (e.g. Courseid: 2,3,2,3,2,3,etc ...). 
						offlineCourses.proxy.clear();
						offlineEvents.proxy.clear();
						offlineSections.proxy.clear();
						offlineChanges.proxy.clear();
						
						// show the login view
						Ext.dispatch({
						controller: 'cSenMood',
						action    : 'goLogin',
						});
                }
		});		
		Ext.apply(this, {
			items: [ShowLogin, ReLoginButton]
        });
        SenMood.views.ChangeUserCard.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('changeusercard', SenMood.views.ChangeUserCard);
