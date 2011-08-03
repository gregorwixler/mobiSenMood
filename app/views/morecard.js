SenMood.views.Morecard = Ext.extend(Ext.NestedList, {
    title: "Mehr",
    iconCls: "more",
    cardSwitchAnimation: 'slide',
    initComponent: function() {
        Ext.apply(this, {
            store: SenMood.morestore,
            getDetailCard: function(item, parent) {
                var itemData = item.attributes.record.data;
                return itemData.card;
            }
        });
        SenMood.views.Morecard.superclass.initComponent.apply(this, arguments);
    }
});
Ext.reg('morecard', SenMood.views.Morecard);
