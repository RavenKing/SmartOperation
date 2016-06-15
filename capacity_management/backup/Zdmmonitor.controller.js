sap.ui.controller("capacity_management.Zdmmonitor", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf capacity_management.Zdmmonitor
*/
	onInit: function() {
		var oModel = new sap.ui.model.odata.ODataModel("/Ped/HANAXS_TEST/services/STATISTICS_DATA.xsodata/STATISDATA", false,"kevinyan","Sap12345");
		//sap.ui.getCore().byId(this.createId("tabelNameBox")).setVisible(false);	
	
		SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function(elem) { return elem.getScreenCTM().inverse().multiply(this.getScreenCTM()); }; 
	
	},
	onAfterRendering: function() {
var oModel = sap.ui.getCore().getModel("BsChart");
	var data = oModel.getData();
	var oPhistModel = new sap.ui.model.json.JSONModel();
	console.log(data);

			var requestObj={
				requestUri:"/Ped/HANAXS_TEST/services/STATISTICS_DATA.xsodata/STATISDATA?$format=json&$filter=FACTOR_GUID eq "+data.FACTOR_GUID,
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
		 console.log(data);
		 oPhistModel.setData(data.results);
		});	
		this.drawLineChart(oPhistModel);
	
	//added 
	var zdmdata;
	
	requestObj={
				requestUri:"/Ped/HANAXS_TEST/services/knowledge_management.xsodata/FACTORMASTER?$format=json&$filter=FACTOR_GUID eq "+data.FACTOR_GUID,
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
		zdmdata = data.results;

		});	
	console.log(zdmdata);
	
	
	//end of add
	
	
	
	var  zdmdescription = sap.ui.getCore().byId("ZDMTX");
	zdmdescription.setValue("Factor "+zdmdata[0].FACTOR_BUSINESS_NAME+" has been configured for the monitoring. Report Name ："+zdmdata[0].FACTOR_NAME+ " ");
	
	
	
	},
	
	
	
	drawLineChart:function(oJsonModel){
		
		var measure;
		
var oModel = sap.ui.getCore().getModel("BsChart");
	var Typedata = oModel.getData();
		console.log(Typedata.FACTOR_TYPE);
		if(Typedata.FACTOR_TYPE == "Service")
		{
			
			measure="Response Time";
		}
		else{
			
			
			
		
		 measure = "Table Entries";
		}
		
		console.log(measure);
		
		var data = oJsonModel.getData();
		var pdata = data.results;
		
		var oDataset = new sap.viz.core.FlattenedDataset({
			
			dimensions : [ {
				axis : 1,
				name : "CALENDARWEEK",
				value : "{CALENDARWEEK}"
			} ],
			measures : [ {
				name : measure,
				value : "{STAT_VALUE}"
					
			} ],
			data : {
				path : "/"
			}
		});
		
		
		
		oDataset.setModel(oJsonModel);
		var entryCountchart = sap.ui.getCore().byId(this.createId("entryCountChartId"));
		entryCountchart.removeAllFeeds();
		entryCountchart.setVizType("line");
		entryCountchart.setDataset(oDataset);
	    
		var feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
	    	'uid': "categoryAxis",
	    	'type': "Dimension",
	    	'values': ["CALENDARWEEK"]
	    });		
	    var feedValueAxis1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
	    	'uid': "valueAxis",
	    	'type': "Measure",
	    	'values': [measure]
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
	    	}
	    });
	    
	    var oPanel = sap.ui.getCore().byId(this.createId("entryCountPanelId"));
	 	oPanel.removeContent(entryCountchart);
	 	oPanel.addContent(entryCountchart);
	},
	navBack:function(){
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("LogonView"));
	},
	gotokb:function(){
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("CreateArticleView"));
		
	}
	
	
	
	
});