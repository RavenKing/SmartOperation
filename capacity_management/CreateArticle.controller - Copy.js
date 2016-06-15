sap.ui.controller("capacity_management.CreateArticle", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf capacity_management.Predictanalysis
*/
	onInit: function() {
	var oModel = sap.ui.getCore().getModel("BsChart");
	var Fdata = oModel.getData();
	var Facdata ;
		var requestObj={
				requestUri:"/Ped/HANAXS_TEST/services/knowledge_base.xsodata/FACTORMASTER?$format=json&$filter=FACTOR_GUID eq "+Fdata.FACTOR_GUID,
				method:"GET",
				async:false,
				headers:{						
		   		
		   				"X-Requested-With": "XMLHttpRequest",
		   				"Content-Type": "application/json",
		   				"Accept": "application/json",
						  "DataServiceVersion": "2.0",          
						"X-CSRF-Token":"Fetch"
	
				}
		};
		
		try{
		OData.request(requestObj,function(data1,response){
		 console.log(data1);
		 Facdata = data1.results;
		});
}
	catch(err)
	{
		console.log(err.response.body);
	}
	var factor_name = sap.ui.getCore().byId("FacNameCA");
	console.log(Facdata[0].FACTOR_NAME);
	factor_name.setValue(Facdata[0].FACTOR_NAME);
	var factor_id =sap.ui.getCore().byId("FacIDCA");
	factor_id.setValue(Facdata[0].FACTOR_GUID)
	var factor_type =sap.ui.getCore().byId("FacTYPECA");
	factor_type.setValue(Facdata[0].FACTOR_TYPE)
	var factor_type =sap.ui.getCore().byId("UserNameCA");
	factor_type.setValue("TEST User");
	var OArticle = new sap.ui.model.json.JSONModel();
	OArticle.setData(Facdata[0]);
	sap.ui.getCore().setModel(OArticle,"ArticleM");
	
	
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
//	onAfterRendering: function() {
//
//	},

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
			var OArticle = sap.ui.getCore().getModel("ArticleM");
			var data = OArticle.getData();	
			var article_id ;
			var requestObj={
				requestUri:"/Ped/HANAXS_TEST/services/createprediction.xsjs?cmd=MAXKB",
				method:"GET",
				async:false,
				headers:{						
		   		
		   				"X-Requested-With": "XMLHttpRequest",
		   				"Content-Type": "application/json",
		   				"Accept": "application/json",
						  "DataServiceVersion": "2.0",          
						"X-CSRF-Token":"Fetch"
	
				}
		};
		
		try{
		OData.request(requestObj,function(data1,response){
			});
		}
		catch(err)
		{
	//	console.log(err.response.body);
		var dataerr =  JSON.parse(err.response.body);
				console.log(dataerr);
				}
		article_id = dataerr.results[0];
		article_id = parseInt(article_id.MAXNUMBER) + 1 ; 
		
		console.log(article_id);
		
		//end of get article id ; 
		
		
		// construct knowledge_base article
		
		
		
		var send_data ={
       
		"ARTICLE_ID":article_id.toString(),
       "FACTOR_GUID":data.FACTOR_GUID.toString(),
       "FACTOR_CATEGORY":data.FACTOR_CATEGORY,
       "FACTOR_TYPE":data.FACTOR_TYPE,
       "FACTOR_NAME":data.FACTOR_NAME,
       "FACTOR_NAME":data.FACTOR_NAME,
	   "CREATE_ON":new Date(),
	   "CREATE_BY":sap.ui.getCore().byId("UserNameCA").getValue(),
	   "ARTICLE_CONTENT":sap.ui.getCore().byId("NTx").getValue(), 
	   "ARTICLE_TITLE":sap.ui.getCore().byId("ArcTitleCA").getValue(),
			}
			console.log(send_data)
		//end of construction 
		//start insert 
		
		
		var requestObj = {
	    			
	    			//requestUri: "/Capa/opu/odata/sap/Z_CAPACITY_MANAGEMENT_GW_SRV/SYSTEMIDCLIENTSet?$filter=Sid eq 'EMP'",
	    			requestUri: "/Ped/HANAXS_TEST/services/knowledge_base.xsodata/KLDB",
	    			method: "POST",
	    			async:false,
					data:send_data,
	    			headers: {
	    				"X-Requested-With": "XMLHttpRequest",
	    				"Content-Type": "application/json",
	    				"DataServiceVersion": "2.0",
	    				"MaxDataServiceVersion": "2.0",
	    				"Accept": "application/atom+xml",
						"Access-Control-Allow-Origin":"*"
						
	    			},
				
	    	};
		
		try
		{OData.request(requestObj,function(data,request){
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("KnowledgeBaseView"));
		 console.log(data);	
		});
		}
		catch(err)
		{
		
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("KnowledgeBaseView"));
		//console.log(err);
		
		}
		
		
		
		//end insert 


		
			
	},
	
	
	

});