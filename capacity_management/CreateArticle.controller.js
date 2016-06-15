sap.ui.controller("capacity_management.CreateArticle", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf capacity_management.Predictanalysis
*/
	onInit: function() {
		//bind combo Box //get DVM data  from Master Table 
		var oArchivingCombo = sap.ui.getCore().byId("ArchivingObjCA");
		var oComboModel = new sap.ui.model.json.JSONModel();
		var requestObj={
				requestUri:"/Ped/HANAXS_TEST/services/knowledge_management.xsodata/FACTORMASTER?$format=json&$filter=FACTOR_TYPE eq 'DVM'",
				method:"GET",
				async:false,
				headers:{						
		   		
		   				"X-Requested-With": "XMLHttpRequest",
		   				"Content-Type": "application/atom+xml",
		   				"DataServiceVersion": "2.0",
		   				"MaxDataServiceVersion": "2.0",
		   				"Accept": "application/atom+xml"
				}
		};
		OData.request(requestObj,function(data,request){
		oComboModel.setData(data);
		// oPhistModel.setData(data.results);
		
		});
	
		
		
		
	
		console.log(oComboModel);
		oArchivingCombo.setModel(oComboModel);
		var oItemTemplate = new sap.ui.core.ListItem();
		oItemTemplate.bindProperty("text", "FACTOR_NAME");
		oItemTemplate.bindProperty("key", "FACTOR_GUID");
		oItemTemplate.bindProperty("enabled", "enabled");
		oArchivingCombo.bindItems("/results", oItemTemplate);
		
	 //end of bind combobox 	
	 
	 
	 var comboissue = sap.ui.getCore().byId("IssueStatus");
	

	 var statusdata = {
			"status":
			[
				{"name":"Finished",
					   "key":"cmp"
				},
				{"name":"Initial",
					   "key":"ini"
				},
				{"name":"In Process",
					   "key":"inp"
				}
			]	
			};
			var issueModel = new sap.ui.model.json.JSONModel();
			issueModel.setData(statusdata);
		comboissue.setModel(issueModel);
		var oItemTemplate = new sap.ui.core.ListItem();
		oItemTemplate.bindProperty("text", "name");
		oItemTemplate.bindProperty("key", "key");
		oItemTemplate.bindProperty("enabled", "enabled");
		comboissue.bindItems("/status", oItemTemplate);
		console.log(comboissue);
			
		
	
	},
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf capacity_management.EntryCount
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf capacity_management.EntryCount
*/
	onAfterRendering: function() {			
		$("#Step2Panel").hide();
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf capacity_management.EntryCount
*/
//	onExit: function() {
//
//	}
	

	navBack:function(){
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("LogonView"));
	},
	CreateArticle:function(){
	//get article ID
	var article_id ;
	
	var requestObj={
				requestUri:"/Ped/HANAXS_TEST/services/knowledge_management.xsodata/KMHDR?$top=1&$orderby=ARTICLE_ID desc&$format=json",
				method:"GET",
				async:false,
				headers:{						
		   		
		   				"X-Requested-With": "XMLHttpRequest",
		   				"Content-Type": "application/json",
		   				"DataServiceVersion": "2.0",
		   				"MaxDataServiceVersion": "2.0",
				}
		};
		OData.request(requestObj,function(data,response){
		var getdata = data.results;
		if(!getdata[0])
		{
			article_id = 0;
		}
		else{
		article_id = parseInt(getdata[0].ARTICLE_ID);
		}
		
		});
	//create basis 
	console.log("Max Id :" + article_id);
	article_id = article_id+1;
	var hdrdata ={
		ARTICLE_ID: ''+article_id+'',
		FACTOR_GUID: sap.ui.getCore().byId("ArchivingObjCA").getSelectedKey(),
		CUSTOMER_ID: sap.ui.getCore().byId("CusID").getValue(),
		FACTOR_CAT: "B",
		FACTOR_TYP:"DVM",
		PREDICT_ID:null,
		ARTICLE_NAM:sap.ui.getCore().byId("ArcTitleCA").getValue(),
		ARTICLE_DSC:sap.ui.getCore().byId("ArcDscCA").getValue(),
		CREATE_ON: new Date(),
		CREATE_BY: sap.ui.getCore().byId("UserNameCA").getValue(),
	}
	console.log(hdrdata);
		  requestObj = {
	    			
			requestUri: "/Ped/HANAXS_TEST/services/knowledge_management.xsodata/KMHDR",
			method: "POST",
			data:hdrdata,
			async:false,
			headers: {
	    				"X-Requested-With": "XMLHttpRequest",
	    				"Content-Type": "application/json",
	    				"DataServiceVersion": "2.0",
	    				"MaxDataServiceVersion": "2.0",		
						"Access-Control-Allow-Origin":"*"
						
	    			}
	    	};	
			var statuscode;
			OData.request(requestObj, function (data, response) {				
				console.log(response);
			statuscode = response.statusCode;
		}); 
		
		if(statuscode ==201)
		{
			
			
			var dvmdata={
				ARTICLE_ID:''+article_id+'',
				TOTAL_SIZE:sap.ui.getCore().byId("TotalSizeCA").getValue(),	
				ARCHIVING:sap.ui.getCore().byId("ArchCA").getValue(),
				DELETION:sap.ui.getCore().byId("DelCA").getValue(),
				AVOIDANCE:sap.ui.getCore().byId("AvoiCA").getValue(),
				SUMMARIZATION:sap.ui.getCore().byId("SummCA").getValue(),
				RETENTION:sap.ui.getCore().byId("Retention").getValue(),
				SAVING_EST:sap.ui.getCore().byId("SavPo").getValue(),
				SAVING_EST_P:sap.ui.getCore().byId("SavPoPer").getValue(),
				SAVING_ACT:sap.ui.getCore().byId("SavAct").getValue(),
				SAVING_ACT_P:sap.ui.getCore().byId("SavActPer").getValue(),
				COMMENT:sap.ui.getCore().byId("NTx").getValue(),
				ARCHOBJ:sap.ui.getCore().byId("ArchivingObjCA").getValue()
				
			};
			requestObj = {    			
			requestUri: "/Ped/HANAXS_TEST/services/knowledge_management.xsodata/KMDVM",
			method: "POST",
			data:dvmdata,
			async:false,
			headers: {
	    				"X-Requested-With": "XMLHttpRequest",
	    				"Content-Type": "application/json",
	    				"DataServiceVersion": "2.0",
	    				"MaxDataServiceVersion": "2.0",		
						"Access-Control-Allow-Origin":"*"
						
	    			}
	    	};
			OData.request(requestObj, function (data, response) {				
				console.log(response);
			statuscode = response.statusCode;
		});
		}
	//create dvm 
	if(statuscode == 201 )
		{
			//jump to issue and related table adding page 
			$("#Step1Panel").hide();
			$("#Step2Panel").show();
			that = this 
			//initialize the form
			step2form = sap.ui.getCore().byId("Step2Tables");
		var fieldelement = new sap.ui.layout.form.FormElement("fieldelement",{
		label:"TableName",
		fields:[
		new sap.ui.commons.TextField('tablenameCA',{value:"table Name"}),
		new sap.ui.commons.TextField('tablenameSizeCA',{value:"table Size"}),
		new sap.ui.commons.TextField('tableDescriptionCA',{value:"table description"}),
		new sap.m.Button({
			icon:"sap-icon://add",
			width:"10px",
			press:function(){
			that.UpdateTableAndShow(article_id);		
							}
			})
			]
		});
		step2form.addFormElement(fieldelement);
			// end of add tables 
			
			
			sap.ui.getCore().byId("IssueArticleId").setValue(article_id);
			//start of adding issues

			
			
			
			
			
			
			
			
			//end of adding issues
			
			
			
		}
	
	
	},
	
	
	UpdateTableAndShow:function(Article_id)
	{
	var attridcount ;
requestObj = {    			
	   requestUri: "/Ped/HANAXS_TEST/services/knowledge_management.xsodata/KMBSC/$count/?$filter=ARTILE_ID eq "+Article_id,
			method: "GET",
	    async:false,
			headers: {
	    				"X-Requested-With": "XMLHttpRequest",
	    				"Content-Type": "application/json",
	    				"DataServiceVersion": "2.0",
	    				"MaxDataServiceVersion": "2.0",		
							"Access-Control-Allow-Origin":"*"		
	    			}
	    	};
				  		
			OData.request(requestObj, function (data, response) {				
attridcount = parseInt(data) ;	
	console.log(data);
		}); 

 var  ATTR_NAM =  sap.ui.getCore().byId("tablenameCA").getValue();
var TBL_SIZE = sap.ui.getCore().byId("tablenameSizeCA").getValue();
	var	  ATTR_DSC = sap.ui.getCore().byId("tableDescriptionCA").getValue();
		attridcount= attridcount+1;
 var postdata = {
		  ARTILE_ID:''+Article_id+'',
		  ATTR_ID:''+attridcount+'',
		  ATTR_NAM: sap.ui.getCore().byId("tablenameCA").getValue(),
		  TBL_SIZE: sap.ui.getCore().byId("tablenameSizeCA").getValue(),
		  ATTR_DSC: sap.ui.getCore().byId("tableDescriptionCA").getValue(),
		  ATTR_TYP:"TBL"
	  };

	  requestObj = {
	    			
			requestUri: "/Ped/HANAXS_TEST/services/knowledge_management.xsodata/KMBSC",
			method: "POST",
			data:postdata,
			async:false,
			headers: {
	    				"X-Requested-With": "XMLHttpRequest",
	    				"Content-Type": "application/json",
	    				"DataServiceVersion": "2.0",
	    				"MaxDataServiceVersion": "2.0",		
						"Access-Control-Allow-Origin":"*"
						
	    			}
	    	};
				  		
						var statusCode;
						
			OData.request(requestObj, function (data, response) {				
				statusCode = response.statusCode;
				console.log(response);
			}); 
//update 
		var elementshow = sap.ui.getCore().byId("Step2TablesShow");
		
		// empty the add table 
		
		
		if(statusCode==201)
		{		
		sap.ui.getCore().byId("tablenameCA").setValue(" ");
		sap.ui.getCore().byId("tablenameSizeCA").setValue(" ");
		sap.ui.getCore().byId("tableDescriptionCA").setValue(" ");
		
		// add the show form
	  var fieldelement = new sap.ui.layout.form.FormElement("fieldelement"+attridcount,{
		label:ATTR_NAM,
		fields:[
		new sap.ui.commons.TextField('tablenameSizeCA'+attridcount,{value:TBL_SIZE,editable:false}),
		new sap.ui.commons.TextField('tableDescriptionCA'+attridcount,{value:ATTR_DSC,editable:false})
			]
		});
		elementshow.addFormElement(fieldelement);
		}
			
  		
		
		
	},
	
	UpdateIssueAndShow:function(){
		var Article_id = sap.ui.getCore().byId("IssueArticleId").getValue();
		//get issue id 
			var issueid ;
requestObj = {
	    			
	   requestUri: "/Ped/HANAXS_TEST/services/knowledge_management.xsodata/KMISS/$count/?$filter=ARTICLE_ID eq "+Article_id,
			method: "GET",
	    async:false,
			headers: {
	    				"X-Requested-With": "XMLHttpRequest",
	    				"Content-Type": "application/json",
	    				"DataServiceVersion": "2.0",
	    				"MaxDataServiceVersion": "2.0",		
							"Access-Control-Allow-Origin":"*"
						
	    			}
	    	};
				  		
			OData.request(requestObj, function (data, response) {				
issueid = parseInt(data) ;	
	console.log(issueid);
		}); 

		issueid= issueid+1;
 
 
 var issuetitle =  sap.ui.getCore().byId("IssueTitle").getValue();
 var issueresponse =  sap.ui.getCore().byId("IssueResponse").getValue();
 var keydate =  sap.ui.getCore().byId("IssueDate").getValue();
 
 
 var postdata = {
		  ARTICLE_ID:''+Article_id+'',
		  ISSUE_ID:''+issueid+'',
		  ISSUE_STATUS: sap.ui.getCore().byId("IssueStatus").getSelectedKey(),
		  ISSUE_TITLE: sap.ui.getCore().byId("IssueTitle").getValue(),
		  ISSUE_CONTENT: sap.ui.getCore().byId("IssueContent").getValue(),
		  ISSUE_SOLUTION:sap.ui.getCore().byId("IssueSolution").getValue(),
		  RESPONSIBLE:sap.ui.getCore().byId("IssueResponse").getValue(),
		  KEYDATE:sap.ui.getCore().byId("IssueDate").getValue()
		 
	  };

	  requestObj = {
	    			
			requestUri: "/Ped/HANAXS_TEST/services/knowledge_management.xsodata/KMISS",
			method: "POST",
			data:postdata,
			async:false,
			headers: {
	    				"X-Requested-With": "XMLHttpRequest",
	    				"Content-Type": "application/json",
	    				"DataServiceVersion": "2.0",
	    				"MaxDataServiceVersion": "2.0",		
						"Access-Control-Allow-Origin":"*"
						
	    			}
	    	};
				  		
			var statusCode;
						
			OData.request(requestObj, function (data, response) {				
				statusCode = response.statusCode;
				console.log(response);
			}); 
//update 	



		  
		  sap.ui.getCore().byId("IssueTitle").setValue("Enter Issue Title");
		  sap.ui.getCore().byId("IssueContent").setValue("Please Enter Issue Content");
		  sap.ui.getCore().byId("IssueSolution").setValue("Please Enter Issue Solution");
		  sap.ui.getCore().byId("IssueResponse").setValue("Please Enter Responsible Person");
		
		
		var step2issueshow = sap.ui.getCore().byId("Step2IssueShow");
			
		var issueelement1 = new sap.ui.layout.form.FormElement("IssueElement"+issueid,{
		label:issueresponse,
		fields:[
		new sap.ui.commons.TextField('IssueTitle'+issueid,{value:issuetitle,editable:false}),
		new sap.ui.commons.TextField('IssueStatus'+issueid,{value:keydate,editable:false})
			]
		});
		step2issueshow.addFormElement(issueelement1);
		
				
			
			
		// clear the field 
		
		
		
		
		
		
		
	},
	
	BacktoKM:function(){
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("KnowledgeBaseView"));
	}
	
	

});