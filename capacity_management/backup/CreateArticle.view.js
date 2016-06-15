sap.ui.jsview("capacity_management.CreateArticle", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf capacity_management.Zdmmonitor
	*/ 
	getControllerName : function() {
		return "capacity_management.CreateArticle";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf capacity_management.Zdmmonitor
	*/ 
	createContent : function(oController) {
		
		var html = '<hr/>';
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
				new sap.ui.core.Title({text:"Create New Knowledge Article"}),
				new sap.ui.commons.Label({text:"Factor Name"}),
				new sap.ui.commons.TextField("FacName",{value:"Max",editable:false}),
				new sap.ui.commons.Label({text:"Factor ID"}),
				new sap.ui.commons.TextField("FacID",{value:"Description",editable:false}),
				new sap.ui.commons.Label({text:"Factor Type"}),
				new sap.ui.commons.TextField("FacTYPE",{value:"Description",editable:false}),
				new sap.ui.core.Title({text:"User Info"}),
				new sap.ui.commons.Label({text:"User Name"}),
				new sap.ui.commons.TextField("UserName",{value:"User Name",editable:false}),
	new sap.ui.commons.Label({text:" "}),
	new sap.ui.core.Title({text:"Comment"}),
	new sap.ui.commons.Label({text:"Article Tile:"}),
	new sap.ui.commons.TextField("ArcTitle",{value:"Title",editable:true,width:"400px"}),
	new sap.ui.commons.Label({text:"Comment:"}),
	new sap.ui.commons.TextArea("NTx",{cols: 10,rows:10}),
						
	
				new sap.ui.commons.Button("SubmitButton",{
					text:"Submit",
					press:function(){
						oController.CreateArticle();
						
					}
					
				}).addStyleClass("saveBtnStyle")
				
				
				
				]
	}).addStyleClass("MarginAuto")
				
				///// end of simple for
					
					
					]
					
					
					}),
			
			///end of information SimpleForm
			
			]
		});
	}

});