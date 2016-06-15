sap.ui.controller("capacity_management.Compare", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf capacity_management.Predictanalysis
*/
	onInit: function() {

		SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function(elem) { return elem.getScreenCTM().inverse().multiply(this.getScreenCTM()); }; 
	
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
var oModel = sap.ui.getCore().getModel("Parameter");
	var data = oModel.getData();
	//console.log(data);
			
	var oChartModel = new sap.ui.model.json.JSONModel();

			
		var requestObj={
				requestUri:"/Ped/Kevinyantest/HANAXS_TEST/services/predictHistData.xsodata/PHDATA?$format=json&$filter=PREDICT_ID eq "+data.PREDICT_ID,
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
		 oChartModel.setData(data.results);
		// oPhistModel.setData(data.results);
		
		});
			var oDataset = new sap.viz.core.FlattenedDataset({
			
			dimensions : [ {
				axis : 1,
				name : "Time",
				value : "{DATETIME}"
			} ],
			measures : [ {
				name : "Fitted",
				value : "{RESPTIME}"
					
			},
			{
				name : "Actual",
				value : "{REALVALUEALL}"
			},
			{
				name : "Predicted",
				value : "{PREDICTVALUE}"
			}
			],
			data : {
				path : "/"
			}
		});
		
		
		
		oDataset.setModel(oChartModel);
		var entryCountchart = sap.ui.getCore().byId(this.createId("compareChartID"));
		entryCountchart.removeAllFeeds();
		entryCountchart.setVizType("line");
		entryCountchart.setDataset(oDataset);
	    
		var feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
	    	'uid': "categoryAxis",
	    	'type': "Dimension",
	    	'values': ["Time"]
	    });		
	    var feedValueAxis1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
	    	'uid': "valueAxis",
	    	'type': "Measure",
	    	'values': ["Actual","Fitted","Predicted"]
	    });
    
	    
	    entryCountchart.addFeed(feedCategoryAxis); 
	    entryCountchart.addFeed(feedValueAxis1);
	  //  entryCountchart.addFeed(feedValueAxis2);		    
	      
		  
		  var minmax =oChartModel.getData();
		  var min = 99999999999 ; 
		  var max = 0 ;
		  console.log(minmax);
		  for(var i=0;i<minmax.length;i++){
			  if(minmax[i].RESPTIME > max)
			  {
				  
				  max = minmax[i].RESPTIME;
			  }
			  else if (minmax[i].RESPTIME < min)
			  {
				  
				  min = minmax[i].RESPTIME;
				  
			  }
			  
			  
}
max = max*1.3;
min = min*0.7;
		  
		  
		  console.log(min+" Max:"+max);
	    entryCountchart.setVizProperties({
	    	title:{
	    		visible:false
	    	},
	    	valueAxis: {
	    	 	title :{
	    	 		visible:true
	    	 	}
	    	 			
	    	},
	    	categoryAxis:{
	    		title:{
	    			visible:false
	    	 	}
	    	},
			yAxis: {
                    scale: {
                        fixedRange: true,
                        minValue: min,
                        maxValue: max
                    }
                }
	    });
	    
	    var oPanel = sap.ui.getCore().byId(this.createId("compareChartPanel"));
	 	oPanel.removeContent(entryCountchart);
	 	oPanel.addContent(entryCountchart);
	
		

	
	},

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
		oHashChanger.setHash(oRouter.getURL("PredictView"));
	}
	
	
});