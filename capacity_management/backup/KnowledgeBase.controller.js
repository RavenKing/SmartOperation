sap.ui.controller("capacity_management.KnowledgeBase", {

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

	var Pcombo = sap.ui.getCore().byId("CategoryKB");	
	
	Pcombo.setModel(oDdbModel);
		var oItemTemplate = new sap.ui.core.ListItem();
		oItemTemplate.bindProperty("text", "name");
		oItemTemplate.bindProperty("key", "value");
		oItemTemplate.bindProperty("enabled", "enabled");
		Pcombo.bindItems("/category", oItemTemplate);

var Tcombo = sap.ui.getCore().byId("TypeKB");
Tcombo.setModel(oDdbModel);
		var oItemTemplate1 = new sap.ui.core.ListItem();
		oItemTemplate1.bindProperty("text", "name");
		oItemTemplate1.bindProperty("key", "value");
		oItemTemplate1.bindProperty("enabled", "enabled");
		Tcombo.bindItems("/category/0/type", oItemTemplate1);





//endof init ddbox


//get table data and dropdown list 
	var oModel = new sap.ui.model.odata.ODataModel("/Ped/HANAXS_TEST/services/knowledge_base.xsodata/", false,"kevinyan","Sap12345");
	var totalnumber;
	var oJsonModel = new sap.ui.model.json.JSONModel();
	var requestObj = {
	    			
	    			requestUri: "/Ped/HANAXS_TEST/services/knowledge_base.xsodata/KLDB/$count",
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

		var requestObj1 = {
	    			
	    			requestUri: "/Ped/HANAXS_TEST/services/knowledge_base.xsodata/KLDB?$format=json",
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
	



//end of get table data 
		
	//set table 

	this.createTable(oJsonModel);


	//end of set table
	
},
	createTable:function(oJsonModel)
{
		var Ptable = sap.ui.getCore().byId("KnowledgeTable");
		Ptable.removeAllColumns();
		Ptable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Article ID"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "ARTICLE_ID"),
	sortProperty: "ARTICLE_ID",
	filterProperty: "ARTICLE_ID",
	width: "30px"
}));

			Ptable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Factor Name"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "FACTOR_NAME"),
	sortProperty: "FACTOR_NAME",
	filterProperty: "FACTOR_NAME",
	width: "200px"
}));
	Ptable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Predict Id"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "PREDICT_ID"),
	sortProperty: "PREDICT_ID",
	filterProperty: "PREDICT_ID",
	width: "200px"
}));
Ptable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Category"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "FACTOR_CATEGORY"),
	sortProperty: "FACTOR_CATEGORY",
	filterProperty: "FACTOR_CATEGORY",
	width: "200px",
	visible:false
}));
Ptable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Factor Type"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "FACTOR_TYPE"),
	sortProperty: "FACTOR_TYPE",
	filterProperty: "FACTOR_TYPE",
	width: "200px",
	visible:false
}));

	Ptable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Created On"}),
	template: new sap.ui.commons.TextView().bindProperty("text",
{
	parts:[{path:"CREATE_ON"}],
	formatter:function(value){  

if(value){               
	var sNumber = value.replace(/[^0-9]+/g,'');  
var iNumber = sNumber * 1; //trick seventeen  
var oDate = new Date(iNumber);  
return oDate;
}
else 
{
return "No Time";}

}
}),
	sortProperty: "CREATE_ON",
	filterProperty: "CREATE_ON",
	width: "200px"
}));
	Ptable.setModel(oJsonModel);
	Ptable.bindRows("/results");
		Ptable.attachRowSelectionChange(function(){
			
			var PPtable = sap.ui.getCore().byId("KnowledgeTable");
			var selectedindex = PPtable.getSelectedIndex();
			var tableModel = PPtable.getModel();
			var tabledata = tableModel.getData();
			
			var targetdata = tabledata["results"][selectedindex];
			var oSelectedModel = new sap.ui.model.json.JSONModel();;
			oSelectedModel.setData(targetdata);
			sap.ui.getCore().setModel(oSelectedModel, "KBSelected");
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
$("#ViewPanel").hide();
$("#savebuttonKB").hide();


	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf capacity_management.EntryCount
*/
//	onExit: function() {
//
//	}
	SetFilter:function(){

var oTable = sap.ui.getCore().byId("KnowledgeTable");


	var aFliter = [];
		
//get paramater

 var Category = sap.ui.getCore().byId("CategoryKB");
	var Type =  sap.ui.getCore().byId("TypeKB");


console.log( Category.getSelectedKey());
console.log( Type.getSelectedKey());

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

		$("#ViewPanel").hide();
		$("#ListPanel").slideDown();
		
$("#savebuttonKB").hide();
		
	},
setType:function(){


	var Pcombo = sap.ui.getCore().byId("CategoryKB");	
  	console.log(Pcombo.getSelectedItemId());
	var selectedid = Pcombo.getSelectedItemId();
	var oModel = Pcombo.getModel();
	var laststring = selectedid.charAt(selectedid.length - 1);
	
var Tcombo = sap.ui.getCore().byId("TypeKB");
Tcombo.setModel(oModel);
		var oItemTemplate1 = new sap.ui.core.ListItem();
		oItemTemplate1.bindProperty("text", "name");
		oItemTemplate1.bindProperty("key", "value");
		oItemTemplate1.bindProperty("enabled", "enabled");
		Tcombo.bindItems("/category/"+laststring+"/type", oItemTemplate1);



},

ShowViewPanel:function(){
// hide List and show View Panel 

$("#ListPanel").hide();
$("#ViewPanel").slideDown();


$("#savebuttonKB").show();

var oModel = sap.ui.getCore().getModel("KBSelected");
var data = oModel.getData();
console.log("KB selected ； "	+	 data );
var objhead = sap.ui.getCore().byId("ObjHead");
objhead.setIntro("Article ID：" + data.ARTICLE_ID);
objhead.setTitle("Factor Name:"+data.FACTOR_NAME);
objhead.setNumber("Type: "+data.FACTOR_TYPE);
var dateobj =sap.ui.getCore().byId("DateObj");


 var datenumber =data.MODIFY_ON;
if(datenumber != null)
{
var sNumber = datenumber.replace(/[^0-9]+/g,'');  
var iNumber = sNumber * 1; //trick seventeen  
var oDate = new Date(iNumber);  
dateobj.setText("Last Modified On " + oDate );

}

var TextArea= sap.ui.getCore().byId("TextArea");

TextArea.setValue(data.ARTICLE_CONTENT);

//Basic INfo

var GUID =  sap.ui.getCore().byId("GUID"); 

GUID.setValue(data.FACTOR_GUID);
var ModBy =  sap.ui.getCore().byId("ModUser"); 

ModBy.setValue(data.MODIFY_BY);


var ModOn =  sap.ui.getCore().byId("ModTime"); 




ModOn.setValue(oDate);



var CreBy =  sap.ui.getCore().byId("CreUser"); 

CreBy.setValue(data.CREATE_BY);
var CreOn =  sap.ui.getCore().byId("CreTime"); 


 var datenumber1 =    data.CREATE_ON;        
var sNumber1 = datenumber1.replace(/[^0-9]+/g,'');  
var iNumber1 = sNumber1 * 1; //trick seventeen  
var oDate1 = new Date(iNumber1);  


CreOn.setValue(oDate1);


//end of basic info




},
//edit 
EditTarget:function(){
	
	
var TextArea= sap.ui.getCore().byId("TextArea");
if(TextArea.getEditable() == true){
TextArea.setEditable(false);
}
else{
	TextArea.setEditable(true);
	
}

	
},

SaveComment:function(){
	var oModel = sap.ui.getCore().getModel("KBSelected");
		var data = oModel.getData();
	
	var txarea = sap.ui.getCore().byId("TextArea");
		data.ARTICLE_CONTENT = txarea.getValue();
			console.log(data);
			
			
	var requestObj = {
	    			
	    			requestUri: "/Ped/HANAXS_TEST/services/knowledge_base.xsodata/KLDB("+data.ARTICLE_ID+"L)",
					method: "PUT",
					data:data,
	    			async:false,
	    			headers: {
	    				"X-Requested-With": "XMLHttpRequest",
	    				"Content-Type": "application/json",
	    				"DataServiceVersion": "2.0",
	    				"MaxDataServiceVersion": "2.0",
	    				
							"Access-Control-Allow-Origin":"*"
						
	    			}
	    	};
				  		
			OData.request(requestObj, function (data, response) {	console.log(response);});	

	
	
},


//end of edit
goBackToHome:function(){		
	
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("LogonView"));
		
		
	},
DeleteSelectedKB:function(){
	
	var oModel = sap.ui.getCore().getModel("KBSelected");
		var data = oModel.getData();
	
if(oModel == null)
{
	return;
}
else{
	
		var oJsonModel = new sap.ui.model.json.JSONModel();
		var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
		  jQuery.sap.require("sap.m.MessageBox");
sap.m.MessageBox.confirm("This message should appear in the confirmation", {
    title: "Confirm",                                    // default
    onClose: function(oAction){
		if(oAction  === sap.m.MessageBox.Action.OK)
		{
		// delete selected data 
		
		
			var requestObj = {
	    			
	    			requestUri: "/Ped/HANAXS_TEST/services/knowledge_base.xsodata/KLDB("+data.ARTICLE_ID+"L)",
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
				  		
			OData.request(requestObj, function (data, response) {		
		  console.log(response);
		  if(response.statusCode ===204)
		  {
			  
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();	
		oHashChanger.setHash(oRouter.getURL("KnowledgeBaseView"));
		  }
					
		}); 
		}
		
		
	},
    styleClass: "" ,                                      // default
    initialFocus: null,// default
    textDirection: sap.ui.core.TextDirection.Inherit     // default
    });	
}

}





});