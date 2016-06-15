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
	{"name":"Services","value":"S","type":[{"name":"Background Job","value":"BTC"},{"name":"Online Transaction","value":"DIA"},{"name":"RFC","value":"RFC"},{"name":"DVM","value":"DVM"}]}
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
	var oModel = new sap.ui.model.odata.ODataModel("/Ped/HANAXS_TEST/services/knowledge_management.xsodata/", false,"kevinyan","Sap12345");
	var totalnumber;
	var oJsonModel = new sap.ui.model.json.JSONModel();
	var requestObj = {
	    			
	    			requestUri: "/Ped/HANAXS_TEST/services/knowledge_management.xsodata/KMDB/$count",
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
	
		var requestObj1 = {
	    			
	    			requestUri: "/Ped/HANAXS_TEST/services/knowledge_management.xsodata/KMDB?$format=json&$orderby=ARTICLE_ID desc",
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
	label: new sap.ui.commons.Label({text: "CUSTOMER_ID"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "CUSTOMER_ID"),
	sortProperty: "CUSTOMER_ID",
	filterProperty: "CUSTOMER_ID",
	width: "100px"
}));
	Ptable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Predict Id"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "PREDICT_ID"),
	sortProperty: "PREDICT_ID",
	filterProperty: "PREDICT_ID",
	width: "50px"
}));
Ptable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Article Name"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "ARTICLE_NAM"),
	sortProperty: "ARTICLE_NAM",
	filterProperty: "ARTICLE_NAM",
	width: "200px",
	visible:true
}));
Ptable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Description"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "ARTICLE_DSC"),
	sortProperty: "ARTICLE_DSC",
	filterProperty: "ARTICLE_DSC",
	width: "200px",
	visible:true
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
	onExit: function() {
		sap.ui.getCore().byId("InfoTabTableShowKB").destroy();
	
},
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

var oModel = sap.ui.getCore().getModel("KBSelected");

if(oModel == null)
{
	jQuery.sap.require("sap.m.MessageBox");
				sap.m.MessageBox.alert("please select row") ;
				return;
}


$("#ListPanel").hide();
$("#ViewPanel").slideDown();


$("#savebuttonKB").show();

var data = oModel.getData();

if(data ==null)
{	jQuery.sap.require("sap.m.MessageBox");
				sap.m.MessageBox.alert("please select row") ;
				return;
	
	
}



//get basis data 


var basisdata ;
requestObj = {
	    			
	   requestUri: "/Ped/HANAXS_TEST/services/knowledge_management.xsodata/KMBSC?$filter=ARTILE_ID eq "+data.ARTICLE_ID+" and ATTR_TYP eq 'TBL'&$format=json",
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
		basisdata = data.results ;
		
		}); 


var basisform = sap.ui.getCore().byId("F1B2");
basisform.destroyFormElements();

for (var i = 0 ; i < basisdata.length;i++)
{
	
	var formelement = new sap.ui.layout.form.FormElement({
							label: basisdata[i].ATTR_NAM,
							fields: [new sap.ui.commons.TextField({value: basisdata[i].TBL_SIZE + "GB",editable:false}) ,
									new sap.ui.commons.TextField({value:basisdata[i].ATTR_DSC,editable:false})
							]
						});
		basisform.addFormElement(formelement);
	
	
}

that = this;
var tablefield = new sap.ui.layout.form.FormElement("tableAddForm",{
		label:"TableName",
		visible:false,
		fields:[
		new sap.ui.commons.TextField('tablenameKB',{value:"Table Name"}),
		new sap.ui.commons.TextField('tablenameSizeKB',{value:"Table Size"}),
		new sap.ui.commons.TextField('tableDescriptionKB',{value:"Table Description"}),
		new sap.m.Button({
			icon:"sap-icon://add",
			width:"10px",
			press:function(){
			that.UpdateTableAndShow(data.ARTICLE_ID);		
							}
			})
			]
		});
	

$("#tableAddForm").hide();

	basisform.addFormElement(tablefield);

var addformbutton = new sap.ui.layout.form.FormElement({
							label: "Add Table ",
							fields: [
							new sap.m.Button({
							icon:"sap-icon://add",
							width:"10px",
							press:function(){
							that.ShowAddTable();
								
							}})
							]
						});

						basisform.addFormElement(addformbutton);
						

var objhead = sap.ui.getCore().byId("ObjHead");

objhead.setIntro("Article ID：" + data.ARTICLE_ID);
objhead.setTitle("Article Name:"+data.ARTICLE_NAM);
objhead.setNumber(data.ARCHOBJ);
var dateobj =sap.ui.getCore().byId("DateObj");


 var datenumber =data.MODIFY_ON;
if(datenumber != null)
{
var sNumber = datenumber.replace(/[^0-9]+/g,'');  
var iNumber = sNumber * 1; //trick seventeen  
var oDate = new Date(iNumber);  
dateobj.setText("Last Modified On " + oDate );

}

var TextArea= sap.ui.getCore().byId("commentKB");

TextArea.setValue(data.COMMENT);

//Basic INfo

var GUID =  sap.ui.getCore().byId("KBCustomerID"); 

GUID.setValue(data.CUSTOMER_ID);
var ModBy =  sap.ui.getCore().byId("ModUser"); 

ModBy.setValue(data.UPDATE_BY);


var ModOn =  sap.ui.getCore().byId("ModTime"); 




ModOn.setValue(oDate);



var CreBy =  sap.ui.getCore().byId("CreUser"); 

CreBy.setValue(data.CREATE_BY);

var CreOn =  sap.ui.getCore().byId("CreTime"); 


 var datenumber1 =  data.CREATE_ON;        
var sNumber1 = datenumber1.replace(/[^0-9]+/g,'');  
var iNumber1 = sNumber1 * 1; //trick seventeen  
var oDate1 = new Date(iNumber1);  

CreOn.setValue(oDate1);
var objtime = sap.ui.getCore().byId("DateObj");


objtime.setText(oDate1);


//end of basic info


//set DVM data 

oLayout = sap.ui.getCore().byId("KMBLAYOUT");
//first row 
oLayout.removeAllContent();
var firstrow = sap.ui.getCore().byId("KMFR");
if(!firstrow)
{
firstrow= new sap.ui.layout.BlockLayoutRow("KMFR");
}
firstrow.removeAllContent();

//archiving cell

var archivingcell = sap.ui.getCore().byId("LeftDVM");
if(archivingcell)
{
archivingcell.destroy();
}


archivingcell =  new sap.ui.layout.BlockLayoutCell("LeftDVM",{
	width:3,
	title:"Archiving Object: "+data.ARCHOBJ+"|Total Size: " + data.TOTAL_SIZE,
	content:[
	
	new sap.ui.layout.form.SimpleForm("DVMSFORM",{
		layout:"ResponsiveGridLayout",
		editable: false,
		labelSpanL:3,
			labelSpanM:2,
			emptySpanL:1,
			emptySpanM:1,
			columnsL:2,
			columnsM:2,
			content:[
				
				new sap.ui.core.Title({text:"Recommendations"}),
				new sap.ui.commons.Label({text:"Archiving:"}),
				new sap.ui.commons.TextArea("Archiving",{value:data.ARCHIVING,editable:false}),
				new sap.ui.commons.Label({text:"Deletion:"}),
				new sap.ui.commons.TextArea("Deletion",{value:data.DELETION,editable:false}),
				new sap.ui.commons.Label({text:"Summarizion:"}),
				new sap.ui.commons.TextArea("Summarizion",{value:data.SUMMARIZATION,editable:false}),
				new sap.ui.commons.Label({text:"Avoidance:"}),
				new sap.ui.commons.TextArea("Avoidance",{value:data.AVOIDANCE,editable:false})
			]
		
		
	}),
	
		//arch obj size 	//
	]
});

//end of archiving cell



// graphics 

var archivinggraphics = sap.ui.getCore().byId("graphicsdata");

if(archivinggraphics)
{
	archivinggraphics.destroy();
	
}
archivinggraphics =  new sap.ui.layout.BlockLayoutCell("graphicsdata",
{
	width:1,
	title:"Graphics",
	content:[
	
	   new sap.viz.ui5.controls.VizFrame({  
			    	    	id : this.createId("ArchivingOBJChart"),
			    	    	width : "100%",
							height : "350px"
	   })
	]
});

this.createStackedChart(data);




firstrow.addContent(archivingcell);
firstrow.addContent(archivinggraphics);


oLayout.addContent(firstrow);

//end of  DVM data 

//recommendation tab 



var customerindustry ;

requestObj = {
	    			
	    			requestUri: "/Ped/HANAXS_TEST/services/knowledge_management.xsodata/SMCUST?$filter=CUSTOMER_ID eq "+data.CUSTOMER_ID,
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
			customerindustry =data.results[0].INDUSTRY ;
		}); 

console.log("customer"+customerindustry);





requestObj = {
	    			
	    			requestUri: "/Ped/HANAXS_TEST/services/Knowledge_Management.xsjs?cmd=RECOMMENDATAION&archobj="+data.ARCHOBJ+"&industry="+customerindustry,
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
			var recomm;	  		
		try{			
			OData.request(requestObj, function (data, response) {		
					
		});
		}	
			catch(err)
			{
				recomm = JSON.parse(err.response.body);
			}
			
	 console.log(recomm);
var AVGS;
var retentionkb;

sap.ui.getCore().byId("RecoPanel").setHeaderText("Recommendation For related Industy "+customerindustry);
if(recomm.results)
{
AVGS = parseInt(recomm.results[0].AVGS);
console.log(recomm.results[0].AVGS);
retentionkb = recomm.results[0].Retention;
}
//get number
if(!AVGS)
{
	
	AVGS = 1 ;
}


if(!retentionkb)
{
	retentionkb = 1;
sap.ui.getCore().byId("BMC").setActualValueLabel("No Reference");

	
}
else{
	sap.ui.getCore().byId("BMC").setActualValueLabel("AVG Ret. Time:"+retentionkb)


	
}

sap.ui.getCore().byId("RMC").setPercentage(AVGS);






//end of recommendation tab

//add issue tab

//
sap.ui.getCore().byId("IssueArticleIdKB").setValue(data.ARTICLE_ID)

// get issues 
var oIssueModel = new sap.ui.model.json.JSONModel();
	requestObj = {
	    			
	    			requestUri: "/Ped/HANAXS_TEST/services/knowledge_management.xsodata/KMISS?$filter=ARTICLE_ID eq "+data.ARTICLE_ID+"&$format=json",
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
			oIssueModel.setData(data);
		}); 

console.log(oIssueModel);

///end of get issues


var oTable=sap.ui.getCore().byId(this.createId("HintTable"));
oTable.removeAllColumns();

oTable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Hint ID"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "ISSUE_ID"),
	sortProperty: "ISSUE_ID",
	filterProperty: "ISSUE_ID",
	width: "50px"
}));
oTable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Issue Status"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "ISSUE_STATUS"),
	sortProperty: "ISSUE_STATUS",
	filterProperty: "ISSUE_STATUS",
	width: "50px"
}));
oTable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Issue Title"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "ISSUE_TITLE"),
	sortProperty: "ISSUE_TITLE",
	filterProperty: "ISSUE_TITLE",
	width: "290px"
}));
oTable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Issue Content"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "ISSUE_CONTENT"),
	sortProperty: "ISSUE_CONTENT",
	filterProperty: "ISSUE_CONTENT",
	width: "290px"
}));

oTable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "RESPONSIBLE Person"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "RESPONSIBLE"),
	sortProperty: "RESPONSIBLE",
	filterProperty: "RESPONSIBLE",
	width: "290px"
}));
oTable.setModel(oIssueModel);
oTable.bindRows("/results");



//end of issue tab 



},
//edit 
EditTarget:function(){
	
sap.ui.getCore().byId("Archiving").setEditable(true);
sap.ui.getCore().byId("Avoidance").setEditable(true);
sap.ui.getCore().byId("Summarizion").setEditable(true);
sap.ui.getCore().byId("Deletion").setEditable(true);
	
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
	var statusCode;
if(oModel == null)
{
	return;
}
else{
	
		var oJsonModel = new sap.ui.model.json.JSONModel();
		var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
		  jQuery.sap.require("sap.m.MessageBox");
sap.m.MessageBox.confirm("Really want to delete the selected Article ? " + data.ARTICLE_ID, {
    title: "Confirm",                                    // default
    onClose: function(oAction){
		if(oAction  === sap.m.MessageBox.Action.OK)
		{
		// delete selected data 
		
		
			var requestObj = {
	    			
	    			requestUri: "/Ped/HANAXS_TEST/services/knowledge_management.xsodata/KMHDR("+data.ARTICLE_ID+"L)",
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
		  statusCode=response.statusCode;
		  });
					
		if(statusCode===204)
		  {
			var selectedindex = sap.ui.getCore().byId("KnowledgeTable").getSelectedIndex()  
			  
			if(selectedindex!= -1)
			{
				var tablemod =sap.ui.getCore().byId("KnowledgeTable").getModel();
				var tabledata =  tablemod.getData();
	
			tabledata["results"].splice(selectedindex,1);
			tablemod.setData(tabledata);
			}
		
		var requestObj = {			
	    			requestUri: "/Ped/HANAXS_TEST/services/Knowledge_Management.xsjs?cmd=DELETE&article_id="+data.ARTICLE_ID,
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
			OData.request(requestObj, function (data, response) {		
			});
			}
			catch(err){
					jQuery.sap.require("sap.m.MessageBox");
				sap.m.MessageBox.alert("Successfully deleted ") ;
				return;		
			}
					
		}; 
		}
		
		
	},
    styleClass: "" ,                                      // default
    initialFocus: null,// default
    textDirection: sap.ui.core.TextDirection.Inherit     // default
    });	
}

}

,
createStackedChart:function(data){
	
	
	var cbdata = {
		results:[{
		"Archiving Object": data.ARCHOBJ,	
		"Total_Size":data.TOTAL_SIZE	
		},
		{
		"Archiving Object": data.ARCHOBJ,	
		"ActualSaving":data.SAVING_ACT	
		},
		{
		"Archiving Object": data.ARCHOBJ,	
		"EstimateSaving":data.SAVING_EST	
		},
		{
		"Archiving Object":data.ARCHOBJ,	
		"RemainingSize":data.TOTAL_SIZE - data.SAVING_EST
			
		}
		]
	};
	
	
	var oChartModel = new sap.ui.model.json.JSONModel();
	oChartModel.setData(cbdata);
	
			var oDataset = new sap.viz.core.FlattenedDataset({
			dimensions : [ {
				axis : 1,
				name : "Archiving Object",
				value : "{Archiving Object}"
			} ],
			measures : [ {
				name : "RemainingSize",
				value : "{RemainingSize}"
					
			},
			{
				name : "EstimateSaving",
				value : "{EstimateSaving}"
			}
			],
			data : {
				path : "/results"
			}
		});
		
		
		
		oDataset.setModel(oChartModel);
		var entryCountchart = sap.ui.getCore().byId(this.createId("ArchivingOBJChart"));
		entryCountchart.removeAllFeeds();
		entryCountchart.setVizType("stacked_column");
		entryCountchart.setDataset(oDataset);
	    
		var feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
	    	'uid': "categoryAxis",
	    	'type': "Dimension",
	    	'values': ["Archiving Object"]
	    });		
	    var feedValueAxis1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
	    	'uid': "valueAxis",
	    	'type': "Measure",
	    	'values': ["EstimateSaving","RemainingSize"]
	    });
    
	    
	    entryCountchart.addFeed(feedCategoryAxis); 
	    entryCountchart.addFeed(feedValueAxis1);
	  //  entryCountchart.addFeed(feedValueAxis2);		    
	     		 
	    entryCountchart.setVizProperties({
	    	title:{
	    		visible:false
	    	},
	    	valueAxis: {
	    	 	title :{
	    	 		visible:false
	    	 	}
	    	 			
	    	},
	    	categoryAxis:{
	    		title:{
	    			visible:false
	    	 	}
	    	},
			yAxis: {
                }
	    });
	
	
}
,


ShowAddTable:function(){
	
	 sap.ui.getCore().byId("tableAddForm").setVisible(true);
	
	
},

UpdateBasisTables:function(Article_id){
     
    
// get attrbute number 


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
attridcount = data ;	
	console.log(data);
		}); 

 var postdata = {
		  ARTILE_ID:Article_id,
		  ATTR_ID:attridcount+1,
		  ATTR_NAM: sap.ui.getCore().byId("tablenameKB").getValue(),
		  TBL_SIZE: sap.ui.getCore().byId("tablenameSizeKB").getValue(),
		  ATTR_DSC: sap.ui.getCore().byId("tableDescriptionKB").getValue(),
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
				  		
			OData.request(requestObj, function (data, response) {				

				console.log(response);
			}); 



//update 



},

GoToAddPage:function(){
	
			var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("CreateArticleView"));
	
	
	
	
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
//	console.log(data);
		}); 

 var  ATTR_NAM =  sap.ui.getCore().byId("tablenameKB").getValue();
var TBL_SIZE = sap.ui.getCore().byId("tablenameSizeKB").getValue();
	var	  ATTR_DSC = sap.ui.getCore().byId("tableDescriptionKB").getValue();
		attridcount= attridcount+1;
 var postdata = {
		  ARTILE_ID:''+Article_id+'',
		  ATTR_ID:''+attridcount+'',
		  ATTR_NAM: sap.ui.getCore().byId("tablenameKB").getValue(),
		  TBL_SIZE: sap.ui.getCore().byId("tablenameSizeKB").getValue(),
		  ATTR_DSC: sap.ui.getCore().byId("tableDescriptionKB").getValue(),
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
				console.log(statusCode);
			}); 
//update 
		var elementshow = sap.ui.getCore().byId("F1B2");
		
		// empty the add table 
		
		
		if(statusCode==201)
		{		
		sap.ui.getCore().byId("tablenameKB").setValue("Table Name");
		sap.ui.getCore().byId("tablenameSizeKB").setValue("Table Size");
		sap.ui.getCore().byId("tableDescriptionKB").setValue("Table Desctiption");
		
		// add the show form
	  var fieldelement = new sap.ui.layout.form.FormElement("fieldelementKB"+attridcount,{
		label:ATTR_NAM,
		fields:[
		new sap.ui.commons.TextField('tablenameSizeKB'+attridcount,{value:TBL_SIZE,editable:false}),
		new sap.ui.commons.TextField('tableDescriptionKB'+attridcount,{value:ATTR_DSC,editable:false})
			]
		});
		elementshow.addFormElement(fieldelement);
		}
			
  		
		
		
	},

	
UpdateIssueAndShow:function(){
	
	var Article_id = sap.ui.getCore().byId("IssueArticleIdKB").getValue();
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
 
 
 var issuetitle =  sap.ui.getCore().byId("IssueTitleKB").getValue();
 var issueresponse =  sap.ui.getCore().byId("IssueResponseKB").getValue();
 var keydate =  sap.ui.getCore().byId("IssueDateKB").getValue();
 
 
 var postdata = {
		  ARTICLE_ID:''+Article_id+'',
		  ISSUE_ID:''+issueid+'',
		  ISSUE_STATUS: sap.ui.getCore().byId("IssueStatusKB").getSelectedKey(),
		  ISSUE_TITLE: sap.ui.getCore().byId("IssueTitleKB").getValue(),
		  ISSUE_CONTENT: sap.ui.getCore().byId("IssueContentKB").getValue(),
		  ISSUE_SOLUTION:sap.ui.getCore().byId("IssueSolutionKB").getValue(),
		  RESPONSIBLE:sap.ui.getCore().byId("IssueResponseKB").getValue(),
		  KEYDATE:sap.ui.getCore().byId("IssueDateKB").getValue()
		 
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



		  
		  sap.ui.getCore().byId("IssueTitleKB").setValue("Enter Issue Title");
		  sap.ui.getCore().byId("IssueContentKB").setValue("Please Enter Issue Content");
		  sap.ui.getCore().byId("IssueSolutionKB").setValue("Please Enter Issue Solution");
		  sap.ui.getCore().byId("IssueResponseKB").setValue("Please Enter Responsible Person");
		
		
		var step2issueshow = sap.ui.getCore().byId(this.createId("HintTable"));
		
	var hinttableModel = step2issueshow.getModel();
	var hinttableData = hinttableModel.getData();
	hinttableData.results.push(postdata);
	hinttableModel.setData(hinttableData);
	step2issueshow.setModel(hinttableModel);
		
				
			
			
		// clear the field 
		
		
		
		
		
		
	
	
	
	
	
	
	
	
}


});