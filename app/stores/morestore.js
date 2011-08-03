//This store is for the Settings tab 

SenMood.morestore = new Ext.data.TreeStore({
   model: 'ListItem',

    root: {
        items: [{
            text: 'Change User',
            card: {xtype: 'changeusercard'},
            leaf: true
        },
        {
            text: 'About mobiSenMood',
            card: {xtype: 'aboutcard'},
            leaf: true
        }],
    },
    proxy: {
        type: 'ajax',
        reader: {
            type: 'tree',
            root: 'items'
        }
    }
});
