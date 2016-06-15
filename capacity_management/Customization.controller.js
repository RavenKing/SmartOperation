sap.ui.controller("capacity_management.Customization", {

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

	var Pcombo = sap.ui.getCore().byId("ComboCategory");	
	
	Pcombo.setModel(oDdbModel);
		var oItemTemplate = new sap.ui.core.ListItem();
		oItemTemplate.bindProperty("text", "name");
		oItemTemplate.bindProperty("key", "value");
		oItemTemplate.bindProperty("enabled", "enabled");
		Pcombo.bindItems("/category", oItemTemplate);

var Tcombo = sap.ui.getCore().byId("ComboType");
Tcombo.setModel(oDdbModel);
		var oItemTemplate1 = new sap.ui.core.ListItem();
		oItemTemplate1.bindProperty("text", "name");
		oItemTemplate1.bindProperty("key", "value");
		oItemTemplate1.bindProperty("enabled", "enabled");
		Tcombo.bindItems("/category/0/type", oItemTemplate1);

var Ucombo = sap.ui.getCore().byId("UpdatePeriod");
Ucombo.setModel(oPModel);
var oItemTemplate2 = new sap.ui.core.ListItem();
		oItemTemplate2.bindProperty("text", "name");
		oItemTemplate2.bindProperty("key", "value");
		oItemTemplate2.bindProperty("enabled", "enabled");
		Ucombo.bindItems("/period", oItemTemplate2);
		

	//// set  factor table 

	this.renderFactorTable(true);
	
	},
	
	
	renderFactorTable:function(isEnabled){
		
		var oFactorModel = new sap.ui.model.json.JSONModel();
		var oLogon = sap.ui.getCore().getModel("SYSCLTID");	
		var syscltid = oLogon.getData();
		console.log(syscltid);


////

//// get factors and configure table 


		

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
			
		}
		if(getdata != null)
		{
			
			oFactorModel.setData(getdata);
			console.log(oFactorModel);
			
		}
		console.log(getdata);	
	}
		
		var Factor =  sap.ui.getCore().byId("FactorPool");
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


	var Pcombo = sap.ui.getCore().byId("ComboCategory");	
  	console.log(Pcombo.getSelectedItemId());
	var selectedid = Pcombo.getSelectedItemId();
	var oModel = Pcombo.getModel();
	var laststring = selectedid.charAt(selectedid.length - 1);
	
var Tcombo = sap.ui.getCore().byId("ComboType");
Tcombo.setModel(oModel);
		var oItemTemplate1 = new sap.ui.core.ListItem();
		oItemTemplate1.bindProperty("text", "name");
		oItemTemplate1.bindProperty("key", "value");
		oItemTemplate1.bindProperty("enabled", "enabled");
		Tcombo.bindItems("/category/"+laststring+"/type", oItemTemplate1);



},

skipFactorSelect: function(){
	

	var oCheckBox = sap.ui.getCore().byId("SkipFactor");
	
	var oFactorTable =  sap.ui.getCore().byId("FactorPool");
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
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("MaintainView"));
	},
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	SubmitToHana:function(){
				
				var oLogon = sap.ui.getCore().getModel("SYSCLTID");	
				var syscltid = oLogon.getData();
				
				
				var valueCategory = sap.ui.getCore().byId("ComboCategory").getSelectedKey();
				var valueType = sap.ui.getCore().byId("ComboType").getSelectedKey();
				var valuePeriod = sap.ui.getCore().byId("UpdatePeriod").getSelectedKey();
				var textTechName = sap.ui.getCore().byId("TextTechName").getValue();
				var textBusiName = sap.ui.getCore().byId("TextDesc").getValue();
				
				if(sap.ui.getCore().byId("Pin").getChecked()){
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
					
					if(sap.ui.getCore().byId("SkipFactor").getChecked()){
						var dataInfo = {
							"factorId":"0",
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
						if(factorString == ""){
							jQuery.sap.require("sap.m.MessageBox");
							var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
							sap.m.MessageBox.error(
								"Please Select At Least 1 Factor, Or Tick the \"Skip\" Checkbox.",
								{
									styleClass: bCompact? "sapUiSizeCompact" : ""
								}
							);	
						}
						else{
							var dataInfo = {
								"factorId":"0",
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
					}
				
				console.log("basic info")
				console.log(dataInfo);
				
				
				
				
				var getdata;
				var oJsonModel = new sap.ui.model.json.JSONModel();
		
		
				var requestObj = {
	    			
	    			//requestUri: "/Capa/opu/odata/sap/Z_CAPACITY_MANAGEMENT_GW_SRV/SYSTEMIDCLIENTSet?$filter=Sid eq 'EMP'",
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
					"New Object " + textTechName + " Created Successfully.", {
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
		
	var Factortb =  sap.ui.getCore().byId("FactorPool");		
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