sap.ui.jsview("capacity_management.EditObject", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf capacity_management.Zdmmonitor
	*/ 
	getControllerName : function() {
		return "capacity_management.EditObject";
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
			// basic information
				    new sap.ui.commons.Panel({
						
						
						
						
						width:"100%",
			    //	height:"15%",
			    	text:"1 - Object Info & Property",
			    	content:[
				/////// simple forms	
				new sap.ui.layout.form.SimpleForm("ObjectInfo",
	{
		maxContainerCols: 2,
		editable: true,
		width:"80%",
		content:[
		
		//create form
				new sap.ui.core.Title({text:"Object Information"}),
				new sap.ui.commons.Label({text:"Category"}),
				new sap.ui.commons.ComboBox("editComboCategory",{
				     required : true,
					 change:function(){
						oController.setType();
					}
				}),
				new sap.ui.commons.Label({text:"Type"}),
				new sap.ui.commons.ComboBox("editComboType",{
				     required : true
				}),
				new sap.ui.commons.Label({text:"Technical Name"}),
				new sap.ui.commons.TextField("editTextTechName",{required : true}),
				new sap.ui.commons.Label({text:"Business Description"}),
				new sap.ui.commons.TextField("editTextDesc",{required : true}),
				new sap.ui.core.Title({text:"Settings"}),
				new sap.ui.commons.Label({text:"Data Update Period"}),	
				new sap.ui.commons.ComboBox("editUpdatePeriod",{
				     required : true
				}),
				new sap.ui.commons.Label({text:" "}),
				
				new sap.ui.commons.CheckBox("editPin", {
					checked: false,
					width: "100%",
					text: "Pin to main screen"
				}),
				new sap.ui.commons.Label({text:" "}),
				new sap.ui.commons.CheckBox("editSkipFactor", {
					checked: false,
					width: "100%",
					text: "Skip Factor Selection",
					change:function(){oController.skipFactorSelect()}
				}),	
	
				new sap.ui.commons.Label({text:" "}),
				new sap.ui.commons.Button("BtnSaveChange",{
					text:"Save Edit",
					style: "Accept",
					press:function(){
						oController.SubmitToHana();
						
					}
					
				}).addStyleClass("saveBtnStyle")
				]
	}).addStyleClass("MarginAuto")
				
				///// end of simple for
					
					
					]
					
					
					}),
			
	//end of information SimpleForm
//start of factor list


new sap.ui.commons.Panel({
	width:"100%",
	text:"2 - Factor Matching",
	content:[
	/*new sap.ui.commons.Button("collectFactor",{
							text:"Collect Factors",
							style: "Accept",
							press:function(){
								
								oController.renderFactorTable(true);
							}
		}),*/
		new sap.ui.table.Table(("editFactorPool"),{
							//title:"Factors",
							
							selectionMode:sap.ui.table.SelectionMode.Multi
						})
						
	]
	
	
	
})

//end of factor list
			  
			
			]
		});
	}

});