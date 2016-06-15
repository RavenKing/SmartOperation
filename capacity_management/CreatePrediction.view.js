sap.ui.jsview("capacity_management.CreatePrediction", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf capacity_management.Zdmmonitor
	*/ 
	getControllerName : function() {
		return "capacity_management.CreatePrediction";
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
			/// basic information
				    new sap.ui.commons.Panel({
						
						
						
						
						width:"100%",
			    //	height:"15%",
			    	text:"Create New Prediction",
			    	content:[
				/////// simple forms	
				new sap.ui.layout.form.SimpleForm(
	"CreatePredictForm",
	{
		maxContainerCols: 2,
		editable: true,
		width:"80%",
		content:[
		
		//create form
				new sap.ui.core.Title({text:"Create New Prediction"}),
				new sap.ui.commons.Label({text:"Predict Name"}),
				new sap.ui.commons.TextField("FacNameCP",{value:"Predict Name"}),
				new sap.ui.commons.Label({text:"Category"}),
				new sap.ui.commons.TextField("CategoryCP",{value:"Category"}),
				new sap.ui.core.Title({text:"Report Info"}),
				new sap.ui.commons.Label({text:"Report Name"}),
				new sap.ui.commons.TextField("RepNameCP",{value:"Report Name"}),
				new sap.ui.commons.Label({text:"User Name"}),
				new sap.ui.commons.TextField("UserNameCP",{value:"User Name"}),
				new sap.ui.commons.Label({text:"Predict Period"}),
				new sap.ui.commons.ComboBox("Period",{  required : true}),
		new sap.ui.commons.Label({text:"Select Algorithm"}),	
			new sap.ui.commons.ComboBox("Algorithm",{
				     required : true
			}),
	new sap.ui.commons.Label({text:" "}),	
	
				new sap.ui.commons.Button("SubmitButtonCP",{
					text:"Submit",
					press:function(){
						oController.SubmitToHana();
						
					}
					
				}).addStyleClass("saveBtnStyle")
				]
	}).addStyleClass("MarginAuto")
				
				///// end of simple for
					
					
					]
					
					
					}),
			
			///end of information SimpleForm
//start of factor list


new sap.ui.commons.Panel({
	width:"100%",
	text:" Factor List",
	content:[
		new sap.ui.table.Table(("FactorTableCP"),{
							title:"Factors",
							selectionMode:sap.ui.table.SelectionMode.Multi
						}),
						new sap.ui.commons.Button("testButton",{
							text:"testing",
							press:function(){
								
								oController.TestAgain();
							}
							
						})
	]
	
	
	
})

///end of factor list
			  
			
			]
		});
	}
	
});
	