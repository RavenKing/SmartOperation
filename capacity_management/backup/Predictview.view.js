sap.ui.jsview("capacity_management.Predictview", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf capacity_management.Zdmmonitor
	*/ 
	getControllerName : function() {
		return "capacity_management.Predictview";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf capacity_management.Zdmmonitor
	*/ 
	createContent : function(oController) {
		return new sap.m.Page({
 			
 			showNavButton: true,
			navButtonPress:function(){
				oController.navBack();
			},
			content: [
				
			    new sap.ui.commons.Panel(this.createId("predictChartPanel"),{
			    	text:"Prediction Chart",
			    	content:[
			    	    new sap.viz.ui5.controls.VizFrame({  
			    	    	id : this.createId("predictChartID"),
			    	    	width : "100%",
			    	    	height : "350px"
	
			    	    })	
			    	]
			    })
			
			]
		});
	}

});