sap.ui.controller("capacity_management.Predictanalysis", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf capacity_management.Predictanalysis
*/
	onInit: function() {
		var oModel = new sap.ui.model.odata.ODataModel("/Ped/HANAXS_TEST/services/predicthistory.xsodata/", false,"kevinyan","Sap12345");
//		sap.ui.getCore().byId(this.createId("tabelNameBox")).setVisible(true);		
 		var oJsonModel = new sap.ui.model.json.JSONModel();
		var tablename = {};

    
	}
	//get system id and client 
	
	

	
	,

	
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
	$("#SelectButton").removeClass();
	$("#SelectButton").addClass("btn btn-success");
	
	var oModel = sap.ui.getCore().getModel("Parameter");
	if(oModel)
	{var data = oModel.getData();
	console.log(data);
	this.goSelectView(data.REPORT_NAME);
	}

	
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf capacity_management.EntryCount
*/
//	onExit: function() {
//
//	}
	drawLineChart:function(){
	},
	refresh:function(dtype){	
			//this.drawLineChart();		
		}
	,
	navBack:function(){
		
		


		$("#"+this.createId("SecondPanel")).slideUp();
		$("#"+this.createId("FirstPanel")).show();
		$("#"+this.createId("FirstPanel")).slideDown();
		
	},

	////////////
//go select view

////////
    goSelectView:function(InputName){
		
		var oPhistModel = new sap.ui.model.json.JSONModel();
		
		var report_name = InputName;
		if(!InputName)
		{ report_name =  sap.ui.getCore().byId("InputBox").getValue();
		}
		
		var oLogon = sap.ui.getCore().getModel("SYSCLTID");
//	console.log(oLogon);
var syscltid = oLogon.getData();

		
		var requestObj={
				requestUri:"/Ped/HANAXS_TEST/services/predicthistory.xsodata/SMOHISTEH?$format=json&$filter=REPORT_NAME eq '"+report_name+"' and SYSID eq '"+syscltid.sid+"' and SYSCLT eq '"+syscltid.client+"'&$orderby=PREDICT_ID desc",
				method:"GET",
				async:false,
				headers:{						
		   			headers: {
		   				"X-Requested-With": "XMLHttpRequest",
		   				"Content-Type": "application/atom+xml",
		   				"DataServiceVersion": "2.0",
		   				"MaxDataServiceVersion": "2.0",
		   				"Accept": "application/atom+xml"
		   			}
				}
		};
		OData.request(requestObj,function(data,request){
	//	 console.log(data);
		 oPhistModel.setData(data.results);
		});
		
		
		
		var Ptable = sap.ui.getCore().byId(this.createId("PredictTable"));
		Ptable.removeAllColumns();
		Ptable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Predict ID"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "PREDICT_ID"),
	sortProperty: "PREDICT_ID",
	filterProperty: "PREDICT_ID",
	width: "200px"
}));

			Ptable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Predict Name"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "PREDICT_NAME"),
	sortProperty: "PREDICT_NAME",
	filterProperty: "PREDICT_NAME",
	width: "200px"
}));
		Ptable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "REPORT NAME"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "REPORT_NAME"),
	sortProperty: "REPORT_NAME",
	filterProperty: "REPORT_NAME",
	width: "200px"
}));

			Ptable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Status"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "STATUS"),
	sortProperty: "STATUS",
	filterProperty: "STATUS",
	width: "200px"
}));
	Ptable.setModel(oPhistModel);
	Ptable.bindRows("/")
		Ptable.attachRowSelectionChange(function(){
			var selectedindex = Ptable.getSelectedIndex();
			var tableModel = Ptable.getModel();
			var tabledata = tableModel.getData();
			
			var targetdata = tabledata[selectedindex];
			console.log(targetdata);
		});
		sap.ui.getCore().byId(this.createId("SecondPanel")).setVisible(true);		
		$("#"+this.createId("FirstPanel")).slideUp();
		$("#"+this.createId("SecondPanel")).show();
		$("#"+this.createId("SecondPanel")).slideDown();
		// show footer 
		sap.ui.getCore().byId("footerPA").setVisible(true);
	
	
	
	
	
	
	
},
	goCreateView:function(){
			var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("CreatePredictionView"));
	
	
},
goPredictionView:function(){
		var Ptable = sap.ui.getCore().byId(this.createId("PredictTable"));
			var selectedindex = Ptable.getSelectedIndex();
			var tableModel = Ptable.getModel();
			var tabledata = tableModel.getData();
			
			var targetdata = tabledata[selectedindex];
				
	//validate
			if(selectedindex == -1 || selectedindex == null)
			{
				jQuery.sap.require("sap.m.MessageBox");
				sap.m.MessageBox.alert("please select row") ;
				return;
				
			}


			//		console.log(targetdata);
			var model = new sap.ui.model.json.JSONModel();
		model.setData(targetdata);
	sap.ui.getCore().setModel(model, "Parameter");
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("PredictviewView"));
	
	
	
	
},

handleValueHelp:function(oEvent){

var DialogModel = new sap.ui.model.json.JSONModel();


		var oLogon = sap.ui.getCore().getModel("SYSCLTID");
//	console.log(oLogon);
var syscltid = oLogon.getData();

var oSelectDialog = sap.ui.getCore().byId("SelectDialog");
this._oDialog=oSelectDialog;
if(!oSelectDialog&&!this._oDialog)
{		//create dialogA
var oSelectDialog = new sap.m.SelectDialog("SelectDialog", {
			 title: "Select One Report",
			 noDataText: "No Reports Found"
		});
	var itemTemplate = new sap.m.StandardListItem({
			title: "{FACTOR_NAME}",
			description: "{FACTOR_GUID}",
			active: true
		})	
				//end of dialog
			this._oDialog = oSelectDialog;
			
			
			//	this._oDialog.setModel();
	var requestObj={
				requestUri:"/Ped/HANAXS_TEST/services/predict_config.xsodata/CONFIG?$format=json&$filter=SYSID eq '"+syscltid.sid+"' and SYSCLT eq '"+syscltid.client+"'",
				method:"GET",
				async:false,
				headers:{						
		   			headers: {
		   				"X-Requested-With": "XMLHttpRequest",
		   				"Content-Type": "application/atom+xml",
		   				"DataServiceVersion": "2.0",
		   				"MaxDataServiceVersion": "2.0",
		   				"Accept": "application/atom+xml"
		   			}
				}
		};
		OData.request(requestObj,function(data,request){
		// console.log(data);
	//	 oPhistModel.setData(data.results);
	// delete duplicate
	
	var arr = [],
    collection = [];

$.each(data.results, function (index, value) {
    if ($.inArray(value.FACTOR_NAME, arr) == -1) {
        arr.push(value.FACTOR_NAME);
        collection.push(value);
    }
});
	//delete duplicate end 
		
		DialogModel.setData(collection);
		});
	
	
	
	
	
	console.log(DialogModel);
	this._oDialog.setModel(DialogModel);
		this._oDialog.bindAggregation("items", "/", itemTemplate); 
		this._oDialog.attachConfirm(function(oEvent){
			
			var oValue = oEvent.getParameters("REPORT_NAME").selectedItem;
			console.log(oValue);
			oValue.getDescription();
			sap.ui.getCore().byId("InputBox").setValue(oValue.getTitle());
			
			
			var targetdata = {
			"REPORT_NAME":oValue.getTitle(),
			"FACTOR_ID":oValue.getDescription()
		};
		
		var model = new sap.ui.model.json.JSONModel();
		model.setData(targetdata);
		sap.ui.getCore().setModel(model, "RepoName");
			
		});
}
		this._oDialog.open();
	

	
	
	},
	
	goBackToHome:function(){		
	
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("LogonView"));
		
		
	},
	DeleteSelectedPA:function()
	{
		
		//get selected data 
			var Ptable = sap.ui.getCore().byId(this.createId("PredictTable"));
			var selectedindex = Ptable.getSelectedIndex();
			
			if(selectedindex == -1 || selectedindex == null)
			{
				jQuery.sap.require("sap.m.MessageBox");
				sap.m.MessageBox.alert("please select row") ;
				return;
				
			}
			
			var tableModel = Ptable.getModel();
			var tabledata = tableModel.getData();
			
			var targetdata = tabledata[selectedindex];
			
		//delete 
		
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			jQuery.sap.require("sap.m.MessageBox");
		sap.m.MessageBox.confirm("Are You really Wanna Delete Predict ID " +targetdata.PREDICT_ID+"?", {
    title: "Confirm",                                    // default
    onClose: function(oAction){
		if(oAction  === sap.m.MessageBox.Action.OK)
		{
		// delete selected data 
		
		
			var requestObj = {
	    			
	    			requestUri: "/Ped/HANAXS_TEST/services/predicthistory.xsodata/SMOHIST("+targetdata.PREDICT_ID+")",
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
			
			OData.request(requestObj, function (data, response){
				console.log(response);
			});
			
	
		
		}
		
	}
		});
		
			if(selectedindex!= -1)
			{
			tabledata.splice(selectedindex,1);
			tableModel.setData(tabledata);
			}
			console.log("Target Data : "+targetdata);
		
		
		
	},
	CompareTarget:function(){
		
		
				var Ptable = sap.ui.getCore().byId(this.createId("PredictTable"));
			var selectedindex = Ptable.getSelectedIndex();
			var tableModel = Ptable.getModel();
			var tabledata = tableModel.getData();
			
				if(selectedindex == -1 || selectedindex == null)
			{
				jQuery.sap.require("sap.m.MessageBox");
				sap.m.MessageBox.alert("please select row") ;
				return;
				
			}
			var targetdata = tabledata[selectedindex];
	//		console.log(targetdata);
			var model = new sap.ui.model.json.JSONModel();
		model.setData(targetdata);
	sap.ui.getCore().setModel(model, "Parameter");
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("CompareView"));
	
	}


	
	
});