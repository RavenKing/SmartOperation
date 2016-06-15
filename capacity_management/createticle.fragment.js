sap.ui.jsfragment("capacity_management.busy", { 

			/// basic information
			
createContent : function(oController) {
		
		return  new sap.ui.commons.Panel({
					width:"100%",
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
			
			
		}
	
	});
