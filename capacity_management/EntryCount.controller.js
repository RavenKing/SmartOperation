sap.ui.controller("capacity_management.EntryCount", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf capacity_management.EntryCount
*/
	onInit: function() {
		var oModel = new sap.ui.model.odata.ODataModel("/Capa/opu/odata/sap/Z_CAPACITY_MANAGEMENT_GW_SRV", false,"cassieliu","Initial1");	 
		var oJsonModel = new sap.ui.model.json.JSONModel();
		var tablename = {};
		var requestObj={
				requestUri:"/Capa/opu/odata/sap/Z_CAPACITY_MANAGEMENT_GW_SRV/bananaSet?$select=Tablename&$orderby=Tablename",
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
			var length = data.results.length;
			if(length > 0){
				tablename[0] = {};
				tablename[0].Tablename = data.results[0].Tablename;
				
				for(var i = 1,j = 0;i < length;i++){
					
					if(tablename[j].Tablename != data.results[i].Tablename){
						tablename[j+1] = {};
						tablename[j+1].Tablename = data.results[i].Tablename;
						j = j+1;
					}
				}
			}
			
//		alert(tablename);
//		tablename = SortBytablename(tablename,"");
//		alert(tablename);
			oJsonModel.setData(tablename);
		
		});
		var oDropbox = sap.ui.getCore().byId(this.createId("tabelNameBox"));
		oDropbox.setModel(oJsonModel);
		var oItemTemplate = new sap.ui.core.ListItem();
		oItemTemplate.bindProperty("text", "Tablename");
		oItemTemplate.bindProperty("key", "Tablename");
		oItemTemplate.bindProperty("enabled", "enabled");
		oDropbox.bindItems("/", oItemTemplate);
		
		var aFliter = [];
		var nameFilter = new sap.ui.model.Filter("Tablename", sap.ui.model.FilterOperator.BT, 'A','Y');
		aFliter.push(nameFilter);
	     	sap.ui.getCore().byId(this.createId("tabelNameBox")).getBinding("items").filter(aFliter);  
		
	},

	// array sort 
	
	SortByname:function(array,value)
	{

		return array.sort(function(a,b){
			
			var x=a[value];
			var y=b[value];
			return ((x<y)?-1:(x>y)?1:0);
			
			
		});
	}
	,
	
	
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
	drawLineChart:function(oJsonModel){
		
		var oDataset = new sap.viz.core.FlattenedDataset({
			
			dimensions : [ {
				axis : 1,
				name : "TimeStamp",
				value : "{Timestamp}"
			} ],
			measures : [ {
				name : "Entries count",
				value : "{Entries}"
					
			},
			{
				name:"Delta",
				value:"{Delta}"
			}],
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
	    	'values': ["TimeStamp"]
	    });		
	    var feedValueAxis1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
	    	'uid': "valueAxis",
	    	'type': "Measure",
	    	'values': ["Entries count"]
	    });
	    var feedValueAxis2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
	    	'uid': "valueAxis",
	    	'type': "Measure",
	    	'values': ["Delta"]
	    });
	    
	    
	    entryCountchart.addFeed(feedCategoryAxis); 
	    entryCountchart.addFeed(feedValueAxis1);
	    entryCountchart.addFeed(feedValueAxis2);		    
	      
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
	lastTime:function(timesNum){
		
		var oLogonModel = sap.ui.getCore().getModel();//model of data: client, sid, ttype
		var sid = oLogonModel.getData().sid;
		var lastdata;
		var oJsonModel = new sap.ui.model.json.JSONModel();
		var tableName = sap.ui.getCore().byId(this.createId("tabelNameBox")).getSelectedKey();
		if(tableName === undefined){
			alert("Please select a Table!");
		}
		else{
			var requestObj={
					requestUri:"/Capa/opu/odata/sap/Z_CAPACITY_MANAGEMENT_GW_SRV/bananaSet?$filter=Sid eq '"+ sid +"' and Tablename eq '"+ tableName +"'&$top=" + timesNum +"&$orderby=Timestamp desc",
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
				jQuery.sap.require("sap.ui.core.format.DateFormat");
				var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern: "yyyy/MM/dd"});
				for(var i = 0; i < data.results.length;i++){
					var value = data.results[i].Timestamp.substring(6,19);
					data.results[i].Timestamp = oDateFormat.format(new Date(Number(value)));  // 2013/08/11
				}
					
				
						console.log(data.results);
			//	oJsonModel.setData(data.results);
			lastdata = data.results;
				
			});
			
			
			
			this.SortByname(lastdata,"Timestamp"); 	
			oJsonModel.setData(lastdata);
				sap.ui.getCore().setModel(oJsonModel,"entryCountModel");
			this.drawLineChart(oJsonModel);
			
			
		}
		
		
	},
	
	refresh:function(){
		
		var tableName = sap.ui.getCore().byId(this.createId("tabelNameBox")).getSelectedKey();
		var oLogonModel = sap.ui.getCore().getModel();//model of data: client, sid, ttype
		var sid = oLogonModel.getData().sid;
		var refreshdata;
		var date1 = sap.ui.getCore().byId(this.createId("date1Field")).getValue();
		var date2 = sap.ui.getCore().byId(this.createId("date2Field")).getValue();
		var oJsonModel = new sap.ui.model.json.JSONModel();
		if(tableName === undefined){
			alert("Please select a Table!");
		}
		else if(date1 == "" || date2 == "" || date1.length < 8 || date2.length < 8 || date2 < date1){
			alert("Please input the right time range");
		}
		else{
			var year1 = date1.substring(0,4);
			var month1 = date1.substring(4,6);
			var day1 = date1.substring(6,8);
			date1 = year1+'-'+month1+'-'+day1+'T00:00:00';
			
			var year2 = date2.substring(0,4);
			var month2 = date2.substring(4,6);
			var day2 = date2.substring(6,8);
			date2 = year2+'-'+month2+'-'+day2+'T00:00:00';
			
			var requestObj={
					requestUri:"/Capa/opu/odata/sap/Z_CAPACITY_MANAGEMENT_GW_SRV/bananaSet?$filter=Timestamp le datetime'" + date2 + "' and Timestamp ge datetime'" + date1 + "' and Sid eq '"+ sid +"' and Tablename eq '"+ tableName + "'&$orderby=Timestamp asc",
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
				jQuery.sap.require("sap.ui.core.format.DateFormat");
				var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern: "yyyy/MM/dd"});
				for(var i = 0; i < data.results.length;i++){
					var value = data.results[i].Timestamp.substring(6,19);
					data.results[i].Timestamp = oDateFormat.format(new Date(Number(value)));  // 2013/08/11
				}
				console.log(data.results);
				refreshdata = data.results
			});
			
			this.SortByname(refreshdata,"Timestamp");
						console.log(refreshdata);
				oJsonModel.setData(refreshdata);
				sap.ui.getCore().setModel(oJsonModel,"entryCountModel");
			this.drawLineChart(oJsonModel);
			
		}
		
	},
	navBack:function(){
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("LogonView"));
	}




































});