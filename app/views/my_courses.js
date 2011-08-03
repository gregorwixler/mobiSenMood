SenMood.views.myCourses = Ext.extend(Ext.Panel, {
    title: "Vorlesungen",
    iconCls: "bookmarks",
    styleHtmlContent: true,
	layout: 'fit',

	initComponent: function() {
	 var list = new Ext.List({
		
		itemTpl : '<p><div vertical-align="middle", width=*>{fullname}</div><div width=25><img src="SenMood/resources/images/arrow_right.png" width="20" height="20"></div></p>',
		store: Ext.getStore('offlineCourse').read(),
		listeners: {
			itemtap: function(dataview, index, el, e) {
            // do this, when a course has been tapped in the shown list
                    var items = [];  // temp container for the individual course descriptions of the tapped course
					var someStore = Ext.getStore('offlineSection').read();
					someStore.filter('course', dataview.store.getAt(index).data.id);
					
					someStore.each(function(rec) {
//                        console.log(rec.get('summary')); // debug -- dump the found course description summaries into the console
						
						items.push({
                            html: rec.get('summary'),
                            cls: 'card ' + rec.get('cls')
                        });
                    });
					someStore.clearFilter(true);
					
					//create new carousel and use the variable items as source for its data
					var carousel = new Ext.Carousel({
                        items: items,
                        itemId: 'carousel',
					});
					// create the toolbar for the new carousel
					var sectionsToolbar = new Ext.Toolbar({
						dock: 'top',
						title: dataview.store.getAt(index).data.fullname, // Title in toolbar is the title of the tapped course
						items: [
						{
							id: 'courseBack',
							// iconCls: 'reply',
							ui: 'back',
							text: 'Zurück',
							handler: function () {
								Ext.getCmp('mySec').hide();
								Ext.getCmp('mySec').destroy();
								Ext.getCmp('main_panel').show();
							}
						}]
					});
					
					// create a new panel, that will include the toolbar and be shown, when the course is selected in the list
					var mySections = new Ext.Panel({
						id: 'mySec',
						fullscreen: true,
						styleHtmlContent: true,
			
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
						defaults: {
							flex: 1
						},
												
    					dockedItems: sectionsToolbar,
						items: carousel,

					});
				
					Ext.getCmp('main_panel').hide();

					Ext.getCmp('mySec').render(document.body);
					Ext.getCmp('mySec').doLayout();
					Ext.getCmp('mySec').show();					
                }

		}
    });
	
	
        Ext.apply(this, {
            dockedItems: [{
                xtype: "toolbar",
                title: "Meine Vorlesungen"
            }],
			items: [list]
        });
        SenMood.views.myCourses.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('my_courses', SenMood.views.myCourses);
