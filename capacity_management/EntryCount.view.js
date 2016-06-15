sap.ui.jsview("capacity_management.EntryCount", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf capacity_management.EntryCount
	*/ 
	getControllerName : function() {
		return "capacity_management.EntryCount";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf capacity_management.EntryCount
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
			    	    new sap.ui.commons.TextArea({
			    	    	width:"100%",
			    	    	height:"100%",
			    	    	editable:false,
			    	    	value:"DB6 RunStats Monitoring is based on the frequency of runstatistics refresh.With this tool,we can record the entries and the refresh time of a certain table." +
			    	    			"Use config to start monitoring a certain table or delete a table monitoring. "
			    	    })
			        ]
			    }).addStyleClass("inforPanelStyle"),
			    new sap.ui.commons.Panel({
			    	height:"20%",
			    	text:"Select Table",
			    	content:[
			    	    
			    	    new sap.ui.commons.ComboBox(this.createId("tabelNameBox")).addStyleClass("tableNameBoxStyle"),
			    	    new sap.ui.commons.Button({
			    	    	text:"Last 4 times",
			    	    	press:function(){
			    	    		oController.lastTime(4);
			    	    	}
			    	    }).addStyleClass("lastBtnStyle"),
			    	    new sap.ui.commons.Button({
			    	    	text:"Last 8 times",
			    	    	press:function(){
			    	    		oController.lastTime(8)
			    	    	}
			    	    }).addStyleClass("lastBtnStyle"),
			    	    new sap.ui.commons.Button({
			    	    	text:"Last 20 times",
			    	    	press:function(){
			    	    		oController.lastTime(20);
			    	    	}
			    	    }).addStyleClass("lastBtnStyle"),
			    	    myhtml,
			    	    new sap.ui.commons.Label({text:"Date From:"}).addStyleClass("dateLabelStyle"),
			    	    new sap.ui.commons.TextField(this.createId("date1Field"),{
			    	    	value:"00000000"
			    	    }).addStyleClass("dateFieldStyle"),
			    	    new sap.ui.commons.Label({text:"to"}).addStyleClass("dateLabelStyle"),
			    	    new sap.ui.commons.TextField(this.createId("date2Field"),{
			    	    	value:"00000000"
			    	    }).addStyleClass("dateFieldStyle"),
			    	    new sap.ui.commons.Label({text:"(Sample:20150101 to 20150201)"}).addStyleClass("sampleLabelStyle"),
			    	    new sap.ui.commons.Button({
			    	    	text:"Refresh",
			    	    	press:function(){
			    	    		oController.refresh();
			    	    	}
			    	    }).addStyleClass("refreshBtnStyle"),
			    	    new sap.ui.commons.Button({
			    	    	text:"configure",
			    	    	press:function(){
			    	    		
			    	    	}
			    	    }).addStyleClass("configBtnStyle")
			    	]
			    }).addStyleClass("selectPanelStyle"),
			   
			   
			    new sap.ui.commons.Panel(this.createId("entryCountPanelId"),{
			    	text:"Entry Count Chart",
			    	content:[
			    	    new sap.viz.ui5.controls.VizFrame({  
			    	    	id : this.createId("entryCountChartId"),
			    	    	width : "100%",
			    	    	height : "350px"
	
			    	    })	
			    	]
			    }).addStyleClass("entryChartPanelStyle")
			
			]
		});
	}

});