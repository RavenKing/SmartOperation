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
		new sap.ui.commons.Panel("Step1Panel",{						
				width:"100%",
			    //	height:"15%",
			    	text:"Create New Article Header - Step1",
			    	content:[
				/////// simple forms	
	new sap.ui.layout.form.SimpleForm(
	"CreateArticleForm",
	{
		maxContainerCols: 2,
		editable: true,
		width:"80%",
		content:[		
		//create form
				new sap.ui.core.Title({text:"Create New Knowledge Article - DVM"}),
				new sap.ui.commons.Label({text:"Archiving Object"}),
				new sap.ui.commons.ComboBox("ArchivingObjCA"),
				new sap.ui.commons.Label({text:"Customer ID"}),
				new sap.ui.commons.TextField("CusID",{value:"Customer ID",editable:true}),
				new sap.ui.commons.Label({text:"Factor Type"}),
				new sap.ui.commons.TextField("FacTYPECA",{value:"DVM",editable:false}),
				new sap.ui.core.Title({text:"Basic Info"}),
				new sap.ui.commons.Label({text:"User Name"}),
				new sap.ui.commons.TextField("UserNameCA",{value:"User Name",editable:true}),
				
				new sap.ui.commons.Label({text:"Article Title:"}),
				new sap.ui.commons.TextField("ArcTitleCA",{value:"Title",editable:true,width:"400px"}),
				new sap.ui.commons.Label({text:"Article Description:"}),
				new sap.ui.commons.TextField("ArcDscCA",{value:"Article description",editable:true,width:"400px"}),
				new sap.ui.commons.Label({text:" "}),
				
				
				new sap.ui.core.Title({text:"DVM Strategy"}),
				new sap.ui.commons.Label({text:"Total Size:"}),
				new sap.ui.commons.TextField("TotalSizeCA",{value:"Total Size",editable:true,width:"400px"}),
				new sap.ui.commons.Label({text:"Archiving"}),
				new sap.ui.commons.TextField("ArchCA",{value:"Archiving Strategy description",editable:true,width:"400px"}),
				new sap.ui.commons.Label({text:"Deletion"}),
				new sap.ui.commons.TextField("DelCA",{value:"Deletion Strategy description",editable:true,width:"400px"}),
				new sap.ui.commons.Label({text:"Avoidance"}),
				new sap.ui.commons.TextField("AvoiCA",{value:"Avoidance  Strategy description",editable:true,width:"400px"}),
				new sap.ui.commons.Label({text:"Summarization"}),
				new sap.ui.commons.TextField("SummCA",{value:"Summarization  Strategy description",editable:true,width:"400px"}),
				new sap.ui.commons.Label({text:"Retention"}),
				new sap.ui.commons.TextField("Retention",{value:"Retention(Month)",editable:true,width:"400px"}),
				new sap.ui.core.Title({text:"Saving Potential"}),
				new sap.ui.commons.Label({text:"Estimated Saving Potential(GB)"}),
				new sap.ui.commons.TextField("SavPo",{value:"Estimated Saving Potential",editable:true,width:"400px",description:"GB"}),	
				new sap.ui.commons.Label({text:"Estimated Saving Potential(%)"}),
				new sap.ui.commons.TextField("SavPoPer",{value:"Saving Potential(%)",editable:true,width:"400px"}),		
				new sap.ui.commons.Label({text:"Actual Saving Potential(GB)"}),
				new sap.ui.commons.TextField("SavAct",{value:"Actual Saving Potential",editable:true,width:"400px"}),	
				new sap.ui.commons.Label({text:"Actual Saving Potential(%)"}),
				new sap.ui.commons.TextField("SavActPer",{value:"Actual Saving Potential(%)",editable:true,width:"400px"}),		
				new sap.ui.core.Title({text:"Comment"}),
				new sap.ui.commons.Label({text:"Comment:"}),
				new sap.ui.commons.TextArea("NTx",{cols: 10,rows:10}),
						
	
				new sap.ui.commons.Button("SubmitButtonCA",{
					text:"Submit",
					press:function(){
						oController.CreateArticle();
						
					}
					
				}).addStyleClass("saveBtnStyle")
				
				
				
				]
	}).addStyleClass("MarginAuto"),
				
				
					]
					
					
					}),
			
				
				///// end of simple form
					
					
			//Step 2 Panel 
			new sap.ui.commons.Panel("Step2Panel",{			
			text:"Related Tables and Issues - Step 2 ",
			    	content:[
					
					//step2 form
				new sap.ui.layout.form.Form("Step2Form",{
				title: new sap.ui.core.Title({text: "Add Tables", tooltip: "Please add related tables"}),
				editable: false,
				width:"800px",
				layout: new sap.ui.layout.form.GridLayout(),
				formContainers: [
				
				new sap.ui.layout.form.FormContainer("Step2TablesShow"),
				new sap.ui.layout.form.FormContainer("Step2Tables")
				]}),
				
	
				
				new sap.ui.layout.form.Form("Step2FormIssue",{
				title: new sap.ui.core.Title({text: "Add Issues", tooltip: "Please add related Issue"}),
				editable: false,
				width:"100%",
				layout: new sap.ui.layout.form.GridLayout(),
				formContainers: [
				
				new sap.ui.layout.form.FormContainer("Step2IssueShow"),
				new sap.ui.layout.form.FormContainer("Step2Issue")
				]}),
				
			new sap.ui.layout.form.SimpleForm(
			{
		maxContainerCols: 2,
		editable: true,
		width:"80%",
		content:[	
		new sap.ui.commons.TextField('IssueArticleId',{visible:false}),
		new sap.ui.commons.Label({text:"Enter Issue Title:"}),
		new sap.ui.commons.TextField('IssueTitle',{value:"Issue Title ", width:"100px"}),
		new sap.ui.commons.Label({text:"Enter Responsible Person:"}),
		new sap.ui.commons.TextField('IssueResponse',{value:"Issue Responsible Person",width:"100px"}),
		new sap.ui.commons.Label({text:"Issue Key Date:"}),
		new sap.m.DatePicker('IssueDate',{valueFormat:"yyyy-MM-dd"}),
		new sap.ui.commons.Label({text:"Issue Status:"}),
		new sap.ui.commons.ComboBox('IssueStatus'),	
		new sap.ui.commons.Label({text:"Issue Content:"}),
		new sap.ui.commons.TextArea('IssueContent',{value:"Issue Content",width:"300px"}),
		new sap.ui.commons.Label({text:"Issue Solution:"}),
		new sap.ui.commons.TextArea('IssueSolution',{value:"Issue Solution",width:"300px"}),
		new sap.m.Button({
			icon:"sap-icon://add",
			text:"Add",
			width:"10px",
			press:function(){
			//that.UpdateTableAndShow(article_id);		
			oController.UpdateIssueAndShow();
							}
			})
					]}),		
		new sap.m.Button({text:"Finished",press:function(){
				oController.BacktoKM();}})
			
				//step2 form
					
					
					
				
					]
			
			
			}),				
		//end of Step 2 Panel
		
				
					
					
			///end of information SimpleForm
			
			]
		});
	}

});