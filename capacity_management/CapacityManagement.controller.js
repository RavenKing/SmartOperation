sap.ui.controller("capacity_management.CapacityManagement", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf capacity_management.CapacityManagementView
*/
	
	onInit: function() {
		
	
		var oModel = sap.ui.getCore().getModel("Overview");
		var oOverviewModel = new sap.ui.model.json.JSONModel();
		var getdata; 
		if(oModel == null)
		{return;
		}
		var oData = oModel.getData();
			var requestObj = {
	    			requestUri: "/Ped/HANAXS_TEST/services/knowledge_base.xsodata/FACTORMASTER?$format=json&$filter= FACTOR_CATEGORY eq '"+oData.CATEGORY+"'&$orderby=TREND desc",
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
				  		
			OData.request(requestObj, function (data, response){
				console.log(data);
				oOverviewModel.setData(data.results);
			
			});
	
	//get table 
	 var Ptable = sap.ui.getCore().byId(this.createId("tableId"));
	//set column .

	Ptable.removeAllColumns();
		Ptable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Factor ID"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "FACTOR_GUID"),
	sortProperty: "FACTOR_GUID",
	filterProperty: "FACTOR_GUID",
	width: "200px"
}));

			Ptable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Factor Name"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "FACTOR_NAME"),
	sortProperty: "FACTOR_NAME",
	filterProperty: "FACTOR_NAME",
	width: "200px"
}));
		Ptable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Factor Type"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "FACTOR_TYPE"),
	sortProperty: "FACTOR_TYPE",
	filterProperty: "FACTOR_TYPE",
	width: "200px"
}));

			Ptable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Factor TREND"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "TREND"),
	sortProperty: "TREND",
	filterProperty: "TREND",
	width: "200px"
}));
	Ptable.setModel(oOverviewModel);
	Ptable.bindRows("/")
		Ptable.attachRowSelectionChange(function(){
			var selectedindex = Ptable.getSelectedIndex();
			var tableModel = Ptable.getModel();
			var tabledata = tableModel.getData();
			console.log(tabledata);
			var targetdata = tabledata[selectedindex];
			console.log(targetdata);
		});	
	
	
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf capacity_management.CapacityManagementView
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf capacity_management.CapacityManagementView
*/
	//onAfterRendering: function() {

	//},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf capacity_management.CapacityManagementView
*/
	//onExit: function() {
		

  // },
	
	
   
   
   
	navBack: function() {
		
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
	    var oHashChanger = new sap.ui.core.routing.HashChanger();
	    oHashChanger.setHash(oRouter.getURL("LogonView"));
		
	},
	
	detailInfo: function(){
		
		var oTable = sap.ui.getCore().byId(this.createId("tableId"));
    	
    	var index = oTable.getSelectedIndex();
    	
    	if(index == -1){
    		
    		alert("select a row");
    	}
    	else{
    		    
			var selectedindex = oTable.getSelectedIndex();
			var tableModel = oTable.getModel();
			var tabledata = tableModel.getData();
			var targetdata = tabledata[selectedindex];
			console.log(targetdata);
	  
		var model = new sap.ui.model.json.JSONModel();
		var targetdata1 ={
			"FACTOR_GUID" : targetdata.FACTOR_GUID
			
		};
		model.setData(targetdata1);
		sap.ui.getCore().setModel(model, "BsChart");

		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("ZdmmonitorView"));
	  
        			
    		}  
    	
	
}
	
	


});