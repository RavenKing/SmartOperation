sap.ui.controller("capacity_management.EditObject", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf capacity_management.Predictanalysis
*/
	onInit: function() {
	var oModel = new sap.ui.model.odata.ODataModel("/Ped/Kevinyantest/HANAXS_TEST/services/test_zh.xsjs/", false,"kevinyan","Sap12345");

//get report name	 set default 
	/*var oModel = sap.ui.getCore().getModel("RepoName");
	var data = oModel.getData();
console.log(data);
var report_name = data.FACTOR_ID;
 var Repname = sap.ui.getCore().byId("RepName");
Repname.setValue(report_name);*/

	//end of report name set
//initialization



  
//////



//bind period data
	 var ddbdata ={
	
	"category":[
	{"name":"Business","type":[{"name":"Table","value":"TBL"},{"name":"DVM","value":"DVM"}],"value":"B"},
	{"name":"Services","value":"S","type":[{"name":"Background Job","value":"BTC"},{"name":"Online Transaction","value":"DIA"},{"name":"RFC","value":"RFC"}]}
		]
};

var periodData = {
	"period":[
	{"name": "Hourly", "value": 1},
	{"name": "Daily", "value": 2},
	{"name": "Weekly", "value": 3}
	]
};

var oDdbModel = new sap.ui.model.json.JSONModel();
var oPModel = new sap.ui.model.json.JSONModel();
oDdbModel.setData(ddbdata);
oPModel.setData(periodData);

	var Pcombo = sap.ui.getCore().byId("editComboCategory");	
	
	Pcombo.setModel(oDdbModel);
		var oItemTemplate = new sap.ui.core.ListItem();
		oItemTemplate.bindProperty("text", "name");
		oItemTemplate.bindProperty("key", "value");
		oItemTemplate.bindProperty("enabled", "enabled");
		Pcombo.bindItems("/category", oItemTemplate);

var Tcombo = sap.ui.getCore().byId("editComboType");
Tcombo.setModel(oDdbModel);
		var oItemTemplate1 = new sap.ui.core.ListItem();
		oItemTemplate1.bindProperty("text", "name");
		oItemTemplate1.bindProperty("key", "value");
		oItemTemplate1.bindProperty("enabled", "enabled");
		Tcombo.bindItems("/category/0/type", oItemTemplate1);

var Ucombo = sap.ui.getCore().byId("editUpdatePeriod");
Ucombo.setModel(oPModel);
var oItemTemplate2 = new sap.ui.core.ListItem();
		oItemTemplate2.bindProperty("text", "name");
		oItemTemplate2.bindProperty("key", "value");
		oItemTemplate2.bindProperty("enabled", "enabled");
		Ucombo.bindItems("/period", oItemTemplate2);
		

	//// set  factor table 

	this.renderFactorTable(true);
	this.displayFactorInfo();
	
	},
	
	displayFactorInfo:function(){
		var oModel = sap.ui.getCore().getModel("paraSelectedFactor");		
		var paraData = oModel.getData();

		var oJsonModel = new sap.ui.model.json.JSONModel();
		var requestObj1 = {
	    			
	    			requestUri: "/Ped/Kevinyantest/HANAXS_TEST/services/maintain.xsodata/MST?$filter=FACTOR_GUID eq "+paraData.FACTOR_GUID+"&$format=json",
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
				  		
		OData.request(requestObj1, function (data, response) {			
			oJsonModel.setData(data);
		});
		var jData = oJsonModel.getData();
		var data = jData["results"][0];
			console.log(data.FACTOR_CATEGORY);		
		sap.ui.getCore().byId("editComboCategory").setSelectedKey(data.FACTOR_CATEGORY);
		this.setType();
		sap.ui.getCore().byId("editComboType").setSelectedKey(data.FACTOR_TYPE);
		sap.ui.getCore().byId("editUpdatePeriod").setSelectedKey("2");
		sap.ui.getCore().byId("editTextTechName").setValue(data.FACTOR_NAME);
		sap.ui.getCore().byId("editTextDesc").setValue(data.FACTOR_BUSINESS_NAME);
		if(data.PIN === "X"){
			sap.ui.getCore().byId("editPin").setChecked(true);
		}
		else{
			sap.ui.getCore().byId("editPin").setChecked(false);
		}
		
		sap.ui.getCore().byId("editSkipFactor").setChecked(false);
		
	},
	
	
	
	renderFactorTable:function(isEnabled){
		
		var oFactorModel = new sap.ui.model.json.JSONModel();
		var oLogon = sap.ui.getCore().getModel("SYSCLTID");	
		var syscltid = oLogon.getData();
		console.log(syscltid);
		var oModel = sap.ui.getCore().getModel("paraSelectedFactor");		
		var paraData = oModel.getData();
		var dataConfig;

////

//// get factors and configure table 

	var requestObjConf={
		requestUri: "/Ped/Kevinyantest/HANAXS_TEST/services/maintain.xsodata/CFG?$filter=FACTOR_TARGET eq "+paraData.FACTOR_GUID+"&$format=json",
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
	try{
		OData.request(requestObjConf,function(dataConf,responseConf){
		dataConfig = dataConf;
		console.log(dataConfig);
		console.log(responseConf);});
	}
	catch(err)
	{
		console.log(err.response.body);	
	}

		

		var requestObj={
				requestUri:"/Ped/Kevinyantest/HANAXS_TEST/services/test_zh.xsjs?SYSID="+syscltid.sid+"&SYSCLT="+syscltid.client+"&cmd=CONFIG",
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
		//console.log(err.response.body);
		var getdata = JSON.parse(err.response.body);
	
		//set checked 
		for(var i = 0; i < getdata.results.length; i ++)
		{
			getdata["results"][i]["checked"] = false;
			//judge checked
			for(var j = 0; j < dataConfig.results.length; j++){
				
				if(dataConfig["results"][j]["FACTOR_SOURCE"]==getdata["results"][i]["obj_id"]){
					getdata["results"][i]["checked"] = true;
					
					break;
				}
			}			
		}
		if(getdata != null)
		{
			
			oFactorModel.setData(getdata);
			console.log(oFactorModel);
			
		}
		console.log(getdata);	
	}
		
		var Factor =  sap.ui.getCore().byId("editFactorPool");
		Factor.setSelectionMode(sap.ui.table.SelectionMode.Multi);
					

			Factor.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Select"}),
			template: new sap.ui.commons.CheckBox({enabled:isEnabled}).bindProperty("checked", "checked"),
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
	

	
	setType:function(){


	var Pcombo = sap.ui.getCore().byId("editComboCategory");	
  	console.log(Pcombo.getSelectedItemId());
	var selectedid = Pcombo.getSelectedItemId();
	var oModel = Pcombo.getModel();
	var laststring = selectedid.charAt(selectedid.length - 1);
	
var Tcombo = sap.ui.getCore().byId("editComboType");
Tcombo.setModel(oModel);
		var oItemTemplate1 = new sap.ui.core.ListItem();
		oItemTemplate1.bindProperty("text", "name");
		oItemTemplate1.bindProperty("key", "value");
		oItemTemplate1.bindProperty("enabled", "enabled");
		Tcombo.bindItems("/category/"+laststring+"/type", oItemTemplate1);



},

skipFactorSelect: function(){
	

	var oCheckBox = sap.ui.getCore().byId("editSkipFactor");
	
	var oFactorTable =  sap.ui.getCore().byId("editFactorPool");
	oFactorTable.removeAllColumns();
	oFactorTable.destroyColumns();
	if(oCheckBox.getChecked()){
		this.renderFactorTable(false);
	}
	else{
		this.renderFactorTable(true);
	}
	
},


		
	/*SortByname: function(array,value)
	{

		return array.sort(function(a,b){
			
			var x=a[value];
			var y=b[value];
			return ((x<y)?-1:(x>y)?1:0);
			
			
		});
	},*/
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
		
		var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
		jQuery.sap.require("sap.m.MessageBox");
		sap.m.MessageBox.show("Unsaved changes will be lost!", {
			icon: sap.m.MessageBox.Icon.WARNING,
			title: "Caution",                                   
			actions: [sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],
			onClose: function(oAction){
				if(oAction  === sap.m.MessageBox.Action.OK)
				{
					var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
					var oHashChanger = new sap.ui.core.routing.HashChanger();
					oHashChanger.setHash(oRouter.getURL("MaintainView"));
				}
				else{
					return;
				}
			}
		});
		
		
		
	},
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	SubmitToHana:function(){
				
				var oLogon = sap.ui.getCore().getModel("SYSCLTID");	
				var syscltid = oLogon.getData();
				
				
				var valueCategory = sap.ui.getCore().byId("editComboCategory").getSelectedKey();
				var valueType = sap.ui.getCore().byId("editComboType").getSelectedKey();
				var valuePeriod = sap.ui.getCore().byId("editUpdatePeriod").getSelectedKey();
				var textTechName = sap.ui.getCore().byId("editTextTechName").getValue();
				var textBusiName = sap.ui.getCore().byId("editTextDesc").getValue();
				
				var oModel = sap.ui.getCore().getModel("paraSelectedFactor");		
				var paraData = oModel.getData();
				
				if(sap.ui.getCore().byId("editPin").getChecked()){
					var checkPin = "X";
				}
				else{
					var checkPin = "";
				}
				 
				

				if(!valueCategory||!valueType||!valuePeriod||!textTechName||!textBusiName)
				{
					jQuery.sap.require("sap.m.MessageBox");
					var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
					sap.m.MessageBox.error(
					"Please Input Required Information.",
					{
						styleClass: bCompact? "sapUiSizeCompact" : ""
					});		
				}			

				else{
					
					if(sap.ui.getCore().byId("editSkipFactor").getChecked()){
						var dataInfo = {
							"factorId":paraData.FACTOR_GUID,
							"factorCategory":valueCategory,
							"factorType":valueType,
							"updatePeriod":valuePeriod,
							"factorTechName":textTechName,
							"factorBusiName":textBusiName,
							"checkPin":checkPin,
							"sysID":syscltid.sid,
							"sysClient":syscltid.client,
							"factorStat":"A",
							"factorString":"0"
						};
					}
					
					else{
						var factorString = this.GetFactorString();
						var dataInfo = {
							"factorId":paraData.FACTOR_GUID,
							"factorCategory":valueCategory,
							"factorType":valueType,
							"updatePeriod":valuePeriod,
							"factorTechName":textTechName,
							"factorBusiName":textBusiName,
							"checkPin":checkPin,
							"sysID":syscltid.sid,
							"sysClient":syscltid.client,
							"factorStat":"A",
							"factorString": factorString
						};
					}
				
				console.log("basic info")
				console.log(dataInfo);
				
				
				
				
				var getdata;
				var oJsonModel = new sap.ui.model.json.JSONModel();
		
		
				var requestObj = {
	    			
	    			
	    			requestUri: "/Ped/Kevinyantest/HANAXS_TEST/services/test_zh.xsjs",
	    			method: "POST",
	    			async:false,
					data:dataInfo,
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
			
			if(err.response.statusCode === 201){
				jQuery.sap.require("sap.m.MessageBox");
				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				sap.m.MessageBox.show(
					"Object " + textTechName + " Changed.", {
						icon: sap.m.MessageBox.Icon.SUCCESS,
						title: "Success",
						actions: [sap.m.MessageBox.Action.OK],
						onClose: function(oAction) {
							var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
							var oHashChanger = new sap.ui.core.routing.HashChanger();
							oHashChanger.setHash(oRouter.getURL("MaintainView"));
						},
						styleClass: bCompact? "sapUiSizeCompact" : ""
					}
				);
			}
			
		}
				
				
		}
	
	},

	GetFactorString:function(){
		
	var Factortb =  sap.ui.getCore().byId("editFactorPool");		
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