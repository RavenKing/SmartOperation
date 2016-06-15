sap.ui.controller("capacity_management.Maintain", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf capacity_management.Predictanalysis
*/
	onInit: function() {	
	
//init 

 var ddbdata ={
	
	"category":[
	{"name":"Business","type":[{"name":"Table","value":"TBL"}],"value":"B"},
	{"name":"Services","value":"S","type":[{"name":"Background Job","value":"BTC"},{"name":"Online Transaction","value":"DIA"},{"name":"RFC","value":"RFC"}]}
		]
};
var oDdbModel = new sap.ui.model.json.JSONModel();
oDdbModel.setData(ddbdata);

	var Pcombo = sap.ui.getCore().byId("mCategory");	
	
	Pcombo.setModel(oDdbModel);
		var oItemTemplate = new sap.ui.core.ListItem();
		oItemTemplate.bindProperty("text", "name");
		oItemTemplate.bindProperty("key", "value");
		oItemTemplate.bindProperty("enabled", "enabled");
		Pcombo.bindItems("/category", oItemTemplate);

var Tcombo = sap.ui.getCore().byId("mType");
Tcombo.setModel(oDdbModel);
		var oItemTemplate1 = new sap.ui.core.ListItem();
		oItemTemplate1.bindProperty("text", "name");
		oItemTemplate1.bindProperty("key", "value");
		oItemTemplate1.bindProperty("enabled", "enabled");
		Tcombo.bindItems("/category/0/type", oItemTemplate1);





//endof init ddbox


//get table data and dropdown list 
	var oModel = new sap.ui.model.odata.ODataModel("/Ped/Kevinyantest/HANAXS_TEST/services/maintain.xsodata/", false,"kevinyan","Sap12345");
	var totalnumber;
	
	var requestObj = {
	    			
	    			requestUri: "/Ped/Kevinyantest/HANAXS_TEST/services/maintain.xsodata/MST?$count",
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
					//oJsonModel.setData(data);
					totalnumber = data ;
					
//console.log()
					//console.log(data.results);
		}); 
	
console.log(totalnumber); 

		
	



//end of get table data 
		
	//set table 
	that = this;
	this.createTable();
	this.refreshTable();

	//end of set table
	
},

refreshTable:function(){
	var oLogon = sap.ui.getCore().getModel("SYSCLTID");	
	var syscltid = oLogon.getData();
	
	var oJsonModel = new sap.ui.model.json.JSONModel();
	var requestObj1 = {
	    			
	    			requestUri: "/Ped/Kevinyantest/HANAXS_TEST/services/maintain.xsodata/MST?$filter=FACTOR_GUID gt 0 and SYSID eq '"+syscltid.sid+"' and SYSCLT eq '"+syscltid.client+"'&$orderby=FACTOR_GUID desc&$format=json",
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
				console.log(data);	
			oJsonModel.setData(data);
		}); 
		
		var Ptable = sap.ui.getCore().byId("FactorListTable");
		Ptable.setModel(oJsonModel);
		Ptable.bindRows("/results");
},


	createTable:function()
{
		var Ptable = sap.ui.getCore().byId("FactorListTable");
		Ptable.removeAllColumns();
		Ptable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Category"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "FACTOR_CATEGORY"),
	sortProperty: "FACTOR_CATEGORY",
	filterProperty: "FACTOR_CATEGORY",
	width: "30px"
}));

			Ptable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Type"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "FACTOR_TYPE"),
	sortProperty: "FACTOR_TYPE",
	filterProperty: "FACTOR_TYPE",
	width: "30px"
}));
	Ptable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Object Technical Name"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "FACTOR_NAME"),
	sortProperty: "FACTOR_NAME",
	filterProperty: "FACTOR_NAME",
	width: "80px"
}));
Ptable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Object Business Name"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "FACTOR_BUSINESS_NAME"),
	sortProperty: "FACTOR_BUSINESS_NAME",
	filterProperty: "FACTOR_BUSINESS_NAME",
	width: "80px"
}));
	
		Ptable.attachRowSelectionChange(function(){
			
			var PPtable = sap.ui.getCore().byId("FactorListTable");
			var selectedindex = PPtable.getSelectedIndex();
			var tableModel = PPtable.getModel();
			var tabledata = tableModel.getData();
			
			var targetdata = tabledata["results"][selectedindex];
			var oSelectedModel = new sap.ui.model.json.JSONModel();;
			oSelectedModel.setData(targetdata);
			sap.ui.getCore().setModel(oSelectedModel, "FactorSelected");
		});
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
	onAfterRendering: function() {


	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf capacity_management.EntryCount
*/
//	onExit: function() {
//
//	}
	SetFilter:function(){

var oTable = sap.ui.getCore().byId("FactorListTable");


	var aFliter = [];
		
//get paramater

 var Category = sap.ui.getCore().byId("mCategory");
	var Type =  sap.ui.getCore().byId("mType");




//set filter
var nameFilter = new sap.ui.model.Filter("FACTOR_CATEGORY", sap.ui.model.FilterOperator.EQ, Category.getSelectedKey());
		aFliter.push(nameFilter);
  var TypeFilter = new sap.ui.model.Filter("FACTOR_TYPE", sap.ui.model.FilterOperator.EQ, Type.getSelectedKey());
		aFliter.push(TypeFilter);


//apply 

	 oTable.getBinding("rows").filter(aFliter);
	console.log(oTable);

},
	navBack:function(){

		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("LogonView"));
			
	},
setType:function(){


	var Pcombo = sap.ui.getCore().byId("mCategory");	
  	console.log(Pcombo.getSelectedItemId());
	var selectedid = Pcombo.getSelectedItemId();
	var oModel = Pcombo.getModel();
	var laststring = selectedid.charAt(selectedid.length - 1);
	
var Tcombo = sap.ui.getCore().byId("mType");
Tcombo.setModel(oModel);
		var oItemTemplate1 = new sap.ui.core.ListItem();
		oItemTemplate1.bindProperty("text", "name");
		oItemTemplate1.bindProperty("key", "value");
		oItemTemplate1.bindProperty("enabled", "enabled");
		Tcombo.bindItems("/category/"+laststring+"/type", oItemTemplate1);



},


goCreateObjectView:function(){
		
		
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("CustomizationView"));
	},

goEditObjectView:function(){
	if(!sap.ui.getCore().getModel("FactorSelected"))
	{
		var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
		jQuery.sap.require("sap.m.MessageBox");
		sap.m.MessageBox.show(
				"Please select a valid entry.", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Info",
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function(oAction) {
						return;
					},
					styleClass: bCompact? "sapUiSizeCompact" : ""
				}
			);
	}
	else{
		var oModel = sap.ui.getCore().getModel("FactorSelected");
		sap.ui.getCore().setModel(oModel,"paraSelectedFactor");
		
		
		
		//data.FACTOR_GUID
		
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("EditObjectView"));
	}	
	
},

//end of edit
goBackToHome:function(){		
	
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("LogonView"));
		
		
	},
DeleteSelectedFactor:function(){
	
	
	
	
if(!sap.ui.getCore().getModel("FactorSelected"))
{
	var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
	jQuery.sap.require("sap.m.MessageBox");
	sap.m.MessageBox.show(
				"Please select a valid entry.", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Info",
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function(oAction) {
						return;
					},
					styleClass: bCompact? "sapUiSizeCompact" : ""
				}
			);
}
else{
		var oModel = sap.ui.getCore().getModel("FactorSelected");
		var data = oModel.getData();
		console.log(data);
		var oJsonModel = new sap.ui.model.json.JSONModel();
		var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
		  jQuery.sap.require("sap.m.MessageBox");
sap.m.MessageBox.show("Please confirm delete action.", {
	icon: sap.m.MessageBox.Icon.WARNING,
    title: "Caution",                                   
	actions: [sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],
    onClose: function(oAction){
		if(oAction  === sap.m.MessageBox.Action.OK)
		{
		// delete selected data 
		
		
			var requestObj = {
	    			
	    			requestUri: "/Ped/Kevinyantest/HANAXS_TEST/services/maintain.xsodata/MST("+data.FACTOR_GUID+"L)",
					method: "DELETE",
	    			async:false,
	    			headers: {
	    				"X-Requested-With": "XMLHttpRequest",
	    				"Content-Type": "application/json",
	    				"DataServiceVersion": "2.0",
	    				"MaxDataServiceVersion": "2.0",
	    				
							"Access-Control-Allow-Origin":"*"
						
	    			}
	    	};
				  		
			OData.request(requestObj, function (dataDelete, response) {		
		  console.log(response);
		  if(response.statusCode === 204)
		  {
			sap.m.MessageBox.show(
				"Object " + data.FACTOR_NAME + " Deleted Successfully.", {
					icon: sap.m.MessageBox.Icon.SUCCESS,
					title: "Success",
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function(oAction) {
						
						that.refreshTable();
					},
					styleClass: bCompact? "sapUiSizeCompact" : ""
				}
			);
			
		  }
					
		}); 
		}
		else{
			
			return;
		}
		
		
	},
    styleClass: "" ,                                      // default
    initialFocus: null,// default
    textDirection: sap.ui.core.TextDirection.Inherit     // default
    });	
}

}





});