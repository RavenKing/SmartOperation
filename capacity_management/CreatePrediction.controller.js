sap.ui.controller("capacity_management.CreatePrediction", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf capacity_management.Predictanalysis
*/
	onInit: function() {
	
//get report name	 set default 
	var oModel = sap.ui.getCore().getModel("RepoName");
	var data = oModel.getData();
console.log(data);
var report_name = data.REPORT_NAME;
var FACTOR_ID = data.FACTOR_ID;
 var Repname = sap.ui.getCore().byId("RepNameCP");
Repname.setValue(report_name);

	//end of report name set
///initialization

var  oFactorModel = new sap.ui.model.json.JSONModel();



////

//// get factors and configure table
		var requestObj={
				requestUri:"/Ped/HANAXS_TEST/services/createprediction.xsjs?REPORT_NAME="+FACTOR_ID+"&cmd=CONFIG",
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
		 console.log(response);
		});
}
	catch(err)
	{
		console.log(err.response.body);
		var getdata = JSON.parse(err.response.body);
	
		//set checked 
		for(var i = 0; i < getdata.results.length; i ++)
		{
			
			getdata.results.checked = true;
			
		}
		if(getdata != null)
		{
			
			oFactorModel.setData(getdata);
			console.log(oFactorModel);
			
		}
		console.log(getdata);	
	}

  
//////

//bind period data
	var data = {
		"period":[
		{
		"text":"Next 10 values",
		"value":10
		},
		{
		"text":"Next 50 values",
		"value":50
		},
		{
		"text":"Next 100 values",
		"value":100
		}
		]
		
	};
	var oJsonModel = new sap.ui.model.json.JSONModel();
	oJsonModel.setData(data);
	var Pcombo = sap.ui.getCore().byId("Period");	
	
	Pcombo.setModel(oJsonModel);
		var oItemTemplate = new sap.ui.core.ListItem();
		oItemTemplate.bindProperty("text", "text");
		oItemTemplate.bindProperty("key", "value");
		oItemTemplate.bindProperty("enabled", "enabled");
		Pcombo.bindItems("/period", oItemTemplate);
		
	// end of period data
	
	var SubmitButton = sap.ui.getCore().byId("SubmitButtonCP");
	SubmitButton.setStyle("Accept");
	
	
	
	///start algorthim
	
	var data1 = {
		"Algorithm":[
		{
		"text":"ARIMA",
		},
		{
		"text":"Linear Regression",
		}
		]
		
	};
	var oJson1Model = new sap.ui.model.json.JSONModel();
	oJson1Model.setData(data1);
	var Acombo = sap.ui.getCore().byId("Algorithm");	
	
	Acombo.setModel(oJson1Model);
		var oItemTemplate = new sap.ui.core.ListItem();
		oItemTemplate.bindProperty("text", "text");
		oItemTemplate.bindProperty("key", "text");
		oItemTemplate.bindProperty("enabled", "enabled");
		Acombo.bindItems("/Algorithm", oItemTemplate);	
	
	//end algorithm dropdown list 
	
	//// set  factor table 

var Factor =  sap.ui.getCore().byId("FactorTableCP");
Factor.setSelectionMode(sap.ui.table.SelectionMode.Multi);
			

	Factor.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Select"}),
	template: new sap.ui.commons.CheckBox().bindProperty("checked", "checked"),
	sortProperty: "checked",
	filterProperty: "checked",
	width: "100px"
}));			
	Factor.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Object Type"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "obj_type"),
	sortProperty: "obj_type",
	filterProperty: "obj_type",
	width: "100px"
}));
			
	Factor.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Object Name"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "obj_name"),
	sortProperty: "obj_name",
	filterProperty: "obj_name",
	width: "100px"
}));
	Factor.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Business Name"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "obj_bname"),
	sortProperty: "obj_bname",
	filterProperty: "obj_bname",
	width: "200px"
}));

	Factor.setModel(oFactorModel);
	Factor.bindRows("/results")
	// end factor table 
	},

		
	SortByname: function(array,value)
	{

		return array.sort(function(a,b){
			
			var x=a[value];
			var y=b[value];
			return ((x<y)?-1:(x>y)?1:0);
			
			
		});
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
	SubmitToHana:function(){
						
				
				var pperiod = sap.ui.getCore().byId("Period").getSelectedKey();
				var algorithm = sap.ui.getCore().byId("Algorithm").getSelectedKey();
				var factorstring = this.GetFactorString();

				if(!pperiod||!algorithm||!factorstring)
				{
				jQuery.sap.require("sap.m.MessageBox");
				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				sap.m.MessageBox.error(
				"Please Select Required Input Box and Factors for Prediction",
				{
					styleClass: bCompact? "sapUiSizeCompact" : ""
				});	
				}			

				else{
			this.TestFun();
				var oModel = sap.ui.getCore().getModel("RepoName");
	var data = oModel.getData();

			var senddata = {
					"predict_name":$("#FacNameCP").val(),
					"description":$("#Description").val(),
					"report_name":$("#RepNameCP").val(),
					"predict_period":pperiod,
					"user":$("#UserNameCP").val(),
					"factor_str":factorstring,
					"algorithm":algorithm,
					"FACTOR_ID":data.FACTOR_ID
					
					
					};
				console.log(senddata);
				//console.log($("#Period").val());
				var getdata;
				var oJsonModel = new sap.ui.model.json.JSONModel();
		
		
				var requestObj = {
	    			
	    			//requestUri: "/Capa/opu/odata/sap/Z_CAPACITY_MANAGEMENT_GW_SRV/SYSTEMIDCLIENTSet?$filter=Sid eq 'EMP'",
	    			requestUri: "/Ped/HANAXS_TEST/services/createprediction.xsjs",
	    			method: "POST",
	    			async:false,
					data:senddata,
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
		 console.log(data);	
		});
		}
		catch(err)
		{
		
		this._dialog.close();
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("PredictView"));
	
			
			
				}
				
				
				}
	
	},
	TestFun:function(oEvent){
		
		if (!this._dialog) {
				this._dialog = sap.ui.jsfragment("capacity_management.busy", this);
				this.getView().addDependent(this._dialog);
			}
		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._dialog);
			this._dialog.open();
		
		
		
	},
	
	TestAgain:function(){
			var pperiod = sap.ui.getCore().byId("Period").getSelectedKey();
				var algorithm = sap.ui.getCore().byId("Algorithm").getSelectedKey();
		var factorstring = this.GetFactorString();
					
				if(!pperiod||!algorithm||!factorstring)
				{
				jQuery.sap.require("sap.m.MessageBox");
				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				sap.m.MessageBox.error(
				"Please Select Required Input Box and Factors for Prediction",
				{
					styleClass: bCompact? "sapUiSizeCompact" : ""
				}
				);	
				}else{
		
				alert("finished");	
				}
	},
	GetFactorString:function(){
		
var Factortb =  sap.ui.getCore().byId("FactorTableCP");		
var fmodel = Factortb.getModel();

var factordata = fmodel.getData();
console.log("factor Test：");
console.log(factordata);	
var configstr='';


			for(var i = 0 ; i < factordata["results"].length;i++)
			{
				
				if(factordata["results"][i]["checked"] == true){
				configstr = configstr + factordata["results"][i]["obj_id"] + ',';
			
				}
				
			}
	var configed = configstr.substr(0,configstr.length-1);
	return configed;
				//	console.log(data.results);
	//			getdata = data;
		
	}

}); 	