SenMood.views.AboutCard = Ext.extend(Ext.Panel, {
    id: 'aboutcard',
    styleHtmlContent: true,
    scroll: "vertical",
    html: '<p align="center"><img src="resources/images/SenMood_small.png"/></p><p>developed by Gregor Wixler as a part of a bachelor thesis in 2011 at the University of Applied Sciences Wuerzburg-Schweinfurt, Germany</p><p>mobiSenMood is a showcase for a possible useage of a usability oriented web application as a frontend for the eLearning platform Moodle using Sencha Touch</p><p>distributed under the GPL v3 license</p>'
});
Ext.reg('aboutcard', SenMood.views.AboutCard);