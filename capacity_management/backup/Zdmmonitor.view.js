sap.ui.jsview("capacity_management.Zdmmonitor", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf capacity_management.Zdmmonitor
	*/ 
	getControllerName : function() {
		return "capacity_management.Zdmmonitor";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf capacity_management.Zdmmonitor
	*/ 
	createContent : function(oController) {
		var br = '<br>';		
        var myhtml = new sap.ui.core.HTML();
        myhtml.setContent(br);
       	return new sap.m.Page({
 			
 			showNavButton: true,
			navButtonPress:function(){
				oController.navBack();
			},
			content: [
			    new sap.ui.commons.Panel({
			    	width:"68%",
			    	height:"15%",
			    	text:"Information Tab",
			    	content:[
			    	    new sap.ui.commons.TextArea("ZDMTX",{
			    	    	width:"100%",
			    	    	height:"100%",
			    	    	editable:false,
			    	    	value:"ZDMV monitoring Monitoring is based on the frequency of runstatistics refresh.With this tool,we can record the entries and the refresh time of a certain table." +
			    	    			"Use config to start monitoring a certain table or delete a table monitoring. "
			    	    })
			        ]
			    }).addStyleClass("inforPanelStyle"),
			    new sap.ui.commons.Panel(this.createId("entryCountPanelId"),{
			    	text:"Analysis Chart",
						content:[
			    	    new sap.viz.ui5.controls.VizFrame({  
			    	    	id : this.createId("entryCountChartId"),
			    	    	width : "100%",
			    	    	height : "350px"
	
			    	    })	
			    	]
			    }).addStyleClass("entryChartPanelStyle"),
				new sap.ui.commons.Button("KBBottom",{
					text:"Create Knowledge Article",
					press: function(){
						oController.gotokb();
					}
				})
			
			]
		});
	}

});