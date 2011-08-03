/**
 * This file sets application-wide settings and launches the application when everything has
 * been loaded onto the page.
 * 
 * The global variable SenMood holds a reference to the application, and namespaces are automatically
 * set up for SenMood.views, SenMood.models, SenMood.controllers and SenMood.stores
 */ 
Ext.regApplication({
    name: "SenMood",
    icon: '../resources/images/SenMood_icon.png',
//    glossOnIcon: false,  -- bah! humbug!
	phoneStartupScreen: '../resources/images/phone_startup.png', //wont work online. offline only
    
    /**
     * This function is automatically called when the document has finished loading. All we do here
     * is launch the application by calling the function for showing the LoginScreen
     */
    launch: function() {
        Ext.dispatch({
            controller: 'cSenMood',
            action    : 'goLogin'
        });
    }
});