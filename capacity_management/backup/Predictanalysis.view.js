sap.ui.jsview("capacity_management.Predictanalysis", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf capacity_management.Zdmmonitor
	*/ 
	getControllerName : function() {
		return "capacity_management.Predictanalysis";
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
			headerContent:[
			new sap.m.Button({
				icon:"sap-icon://home",
				tooltip:"Back to Home",
				press:function(){
					oController.goBackToHome();
					
					
				}
				
			})
			],
			
			
			
			content: [
			    new sap.ui.commons.Panel({
			    	width:"98%",
			    //	height:"15%",
			    	text:"Information Tab",
			    	content:[
			    	    new sap.ui.commons.TextArea({
			    	    	width:"100%",
			    	    	height:"100%",
			    	    	editable:false,
			    	    	value:"Prediction Analysis is used to show the prediction for the table performance withe the growth of table entries" +
			    	    		  ""
			    	    })
			        ]
			    }).addStyleClass("inforPanelStyle"),
			    new sap.ui.commons.Panel(this.createId("FirstPanel"),{
			    	//height:"20%",
					width:"98%",
			    	text:"Predict Analysis",
			    	content:[
					
					new sap.m.Toolbar("toolbarone",{
						content:[
						new sap.ui.commons.Label({text:"Online/Background Job Name", width:"200px"}).addStyleClass("dateLabelStyle"),
/* 			    	    new sap.m.Input(this.createId("InputBox"),
						{
							width:"99%",
							placeholder:"Enter Report Name",
							showSuggestion:true,
							showValueHelp:true,							
						}), */
						
						new sap.ui.commons.ValueHelpField("InputBox",{
							width:"600px",
							height:"50px",
							value:"Enter Report Name",
							valueHelpRequest:function(){oController.handleValueHelp();}
							
						}),
						new sap.ui.commons.Button("SelectButton",{
			    	    	text:"Select",
							width:"100px",
			    	    	press:function(){
			    	    		oController.goSelectView();
						}})]
					}),
			    	    
			    		]
			    }).addStyleClass("selectPanelStyle"),
				 new sap.ui.commons.Panel(this.createId("SecondPanel"),{
			    	height:"100%",
			    	text:"Choose content",
					visible:false,
			    	content:[
						new sap.ui.table.Table(this.createId("PredictTable"),{
							title:"Prediction History"												
						})
					 ]
			    }).addStyleClass("selectPanelStyle")
			
			],
			
		footer:
		new sap.m.Bar("footerPA",{contentRight:
								   [new sap.m.Button("CreateButtonPA",{ icon:"sap-icon://create",press:function(){ oController.goCreateView();}}), 
								   new sap.m.Button("ViewPA",{ icon:"sap-icon://detail-view",press:function(){ oController.goPredictionView();}}), 
								   new sap.m.Button("DeletePA",{ icon:"sap-icon://delete",press:function(){ oController.DeleteSelectedPA();}}), 
								   new sap.m.Button("ComparePA",{ icon:"sap-icon://compare",press:function(){
									   
									   oController.CompareTarget();
									   
								   }})
									]}).setVisible(false)
		});
	}

});