sap.ui.jsview("capacity_management.Customization", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf capacity_management.Zdmmonitor
	*/ 
	getControllerName : function() {
		return "capacity_management.Customization";
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
			    	text:"STEP 1 - Maintain Object Info & Property",
			    	content:[
				/////// simple forms	
				new sap.ui.layout.form.SimpleForm("AddNewObject",
	{
		maxContainerCols: 2,
		editable: true,
		width:"80%",
		content:[
		
		//create form
				new sap.ui.core.Title({text:"Object Information"}),
				new sap.ui.commons.Label({text:"Category"}),
				new sap.ui.commons.ComboBox("ComboCategory",{
				     required : true,
					 change:function(){
						oController.setType();
					}
				}),
				new sap.ui.commons.Label({text:"Type"}),
				new sap.ui.commons.ComboBox("ComboType",{
				     required : true
				}),
				new sap.ui.commons.Label({text:"Technical Name"}),
				new sap.ui.commons.TextField("TextTechName",{required : true}),
				new sap.ui.commons.Label({text:"Business Description"}),
				new sap.ui.commons.TextField("TextDesc",{required : true}),
				new sap.ui.core.Title({text:"Settings"}),
				new sap.ui.commons.Label({text:"Data Update Period"}),	
				new sap.ui.commons.ComboBox("UpdatePeriod",{
				     required : true
				}),
				new sap.ui.commons.Label({text:" "}),
				
				new sap.ui.commons.CheckBox("Pin", {
					checked: false,
					width: "100%",
					text: "Pin to main screen"
				}),
				new sap.ui.commons.Label({text:" "}),
				new sap.ui.commons.CheckBox("SkipFactor", {
					checked: false,
					width: "100%",
					text: "Skip Factor Selection",
					change:function(){oController.skipFactorSelect()}
				}),	
	
				new sap.ui.commons.Label({text:" "}),
				new sap.ui.commons.Button("BtnAddObject",{
					text:"Add Object",
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
	text:"STEP 2 - Match Relevant Factor",
	content:[
	/*new sap.ui.commons.Button("collectFactor",{
							text:"Collect Factors",
							style: "Accept",
							press:function(){
								
								oController.renderFactorTable(true);
							}
		}),*/
		new sap.ui.table.Table(("FactorPool"),{
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