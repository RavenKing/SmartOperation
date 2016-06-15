sap.ui.controller("capacity_management.DetailInfo", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf capacity_management.DetailInfo
*/
	onInit: function() {
		
		var oModel = new sap.ui.model.odata.ODataModel("/Capa/opu/odata/sap/Z_CAPACITY_MANAGEMENT_GW_SRV", false,"cassieliu","Initial1");	 

	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf capacity_management.DetailInfo
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf capacity_management.DetailInfo
*/
	onAfterRendering: function() {
		
		var oModel = sap.ui.getCore().getModel("DetailModel");
		var oTable = sap.ui.getCore().byId(this.createId("historyTableId"));
		var data = oModel.getData();
		var oJsonModel = new sap.ui.model.json.JSONModel();
		
		sap.ui.getCore().byId(this.createId("renaLabel")).setText(data.Rena);		
		sap.ui.getCore().byId(this.createId("weeknLabel")).setText(data.Weeknum);
		sap.ui.getCore().byId(this.createId("dbptLabel")).setText(data.Dbpt);
		sap.ui.getCore().byId(this.createId("cpuptLabel")).setText(data.Cpupt);
		sap.ui.getCore().byId(this.createId("restLabel")).setText(data.Rest);
		sap.ui.getCore().byId(this.createId("ztotalLabel")).setText(data.Ztotal);
		sap.ui.getCore().byId(this.createId("zcommentArea")).setValue(data.Zcomment);
		sap.ui.getCore().byId(this.createId("zstatusLabel")).setText(data.Zstatus);
		sap.ui.getCore().byId(this.createId("ztrendLabel")).setText(data.Ztrend);
		
		 var requestObj = {
	    			
	    			requestUri: "/Capa/opu/odata/sap/Z_CAPACITY_MANAGEMENT_GW_SRV/CAPA_MAINSet?$filter=Client eq \'" + data.Client + "\' and Sid eq \'" + data.Sid + "\' and Rena eq \'" + data.Rena + "\' and Ttype eq \'" + data.Ttype + "\' &$top=10&$orderby=Weeknum desc",
	    			method: "GET",
	    			async:false,
	    			headers: {
	    				"X-Requested-With": "XMLHttpRequest",
	    				"Content-Type": "application/atom+xml",
	    				"DataServiceVersion": "2.0",
	    				"MaxDataServiceVersion": "2.0",
	    				"Accept": "application/atom+xml"
	    			}
	    	};
				  		
			OData.request(requestObj, function (data, response) {		
					oJsonModel.setData(data.results);
					sap.ui.getCore().setModel(oJsonModel,"historyModel");
			});
			
			oTable.setModel(oJsonModel);
			oTable.bindRows("/");
			
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions : [ {
					axis : 1,
					name : "Weeknum",
					value : "{Weeknum}"
				} ],
				measures : [ {
					name : "Response Time",
					value : "{Rest}"
				} ],
				data : {
					path : "/"
				}
			});
			
			oDataset.setModel(oJsonModel);
		    var oLineChart = sap.ui.getCore().byId(this.createId("historyLineChartId"));
		    oLineChart.removeAllFeeds();
		    oLineChart.setVizType("line");
		    oLineChart.setDataset(oDataset);
		    
		    var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		    	'uid': "valueAxis",
		    	'type': "Measure",
		    	'values': ["Response Time"]
		    }),
		    
		    feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		    	'uid': "categoryAxis",
		    	'type': "Dimension",
		    	'values': ["Weeknum"]
		    });
		    
		    
		    oLineChart.addFeed(feedValueAxis);
		    oLineChart.addFeed(feedCategoryAxis);	
		    
		    oLineChart.setVizProperties({
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
		    
		    var oPanel = sap.ui.getCore().byId(this.createId("historyChartPanelId"));
		 	oPanel.removeContent(oLineChart);
		 	oPanel.addContent(oLineChart);
		
		
		

	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf capacity_management.DetailInfo
*/
//	onExit: function() {
//
//	}
	index:0,
	saveComment:function(){
		var oLogonModel = sap.ui.getCore().getModel();//model of data: client, sid, ttype
		
		var client = oLogonModel.getData().client;
		var sid = oLogonModel.getData().sid;
		var ttype = oLogonModel.getData().ttype;
		var rena = sap.ui.getCore().byId(this.createId("renaLabel")).getText();		
		var weekn = sap.ui.getCore().byId(this.createId("weeknLabel")).getText();
		
		var comment = sap.ui.getCore().byId(this.createId("zcommentArea")).getValue();
		var requestObj = {
    			
    			requestUri: "/Capa/opu/odata/sap/Z_CAPACITY_MANAGEMENT_GW_SRV/CAPA_MAINSet(Client='"+ client + "',Sid='" + sid + "',Rena='" + rena + "',Ttype='" + ttype + "',Weeknum='" + weekn + "')",
    			method: "GET",
    			async:false,
    			headers: {
    				"X-Requested-With": "XMLHttpRequest",
    				"X-CSRF-Token" : "Fetch",
    				"Content-Type": "application/xml",
    				"DataServiceVersion": "2.0",
    				"MaxDataServiceVersion": "2.0",
    				"Accept": "text/html,application/xhtml+xml,application/xml"
    				
    				
    			}
    	};
    	var requestObj1 = {
    			
    			requestUri: "/Capa/opu/odata/sap/Z_CAPACITY_MANAGEMENT_GW_SRV/CAPA_MAINSet(Client='"+ client + "',Sid='" + sid + "',Rena='" + rena + "',Ttype='" + ttype + "',Weeknum='" + weekn + "')",
    			method: "PUT",
    			async:false,
    			headers: {
    				"X-Requested-With": "XMLHttpRequest",
    				"X-CSRF-Token" : "",
    				"Content-Type": "application/atom+xml",
    				"DataServiceVersion": "2.0",
    				"MaxDataServiceVersion": "2.0",
    				"Accept": "application/atom+xml"
    			}
    	};
    	
    		
    		
    		   		
    		OData.request(requestObj, function (data, response) { 
    			header_xcsrf_token = response.headers['x-csrf-token']; 
    			requestObj1.headers['X-CSRF-Token'] = header_xcsrf_token; 
    			data.Zcomment = comment;
    			requestObj1.data = {
    					Sid:data.Sid,
    					Client:data.Client,
    					Rena:data.Rena,
    					Ttype:data.Ttype,
    					Weeknum:data.Weeknum,
    					Dbpt:data.Dbpt,
    					Cpupt:data.Cpupt,
    					Rest:data.Rest,
    					Ztotal:data.Ztotal,
    					Zcomment:data.Zcomment,
    					Zstatus:data.Zstatus,
    					Ztrend:data.Ztrend,
    			};
    			
    			
    			    				
    			OData.request(requestObj1,function(){
    				var oModel = sap.ui.getCore().getModel("historyModel");
    				sap.ui.getCore().getModel("historyModel").getData()[index].Zcomment = data.Zcomment;
    				oModel.refresh();
    				console.log(oModel);
    			}); 
             } );
		
	},
	tableRowSelect:function(){
		var oTable = sap.ui.getCore().byId(this.createId("historyTableId"));
    	
    	index = oTable.getSelectedIndex();
  
    	var oData = oTable.getContextByIndex(index);   
    	var sPath = oData.getPath();     		   
    	var model = oData.getModel();
    	var data = model.getProperty(sPath);
    	
    	sap.ui.getCore().byId(this.createId("renaLabel")).setText(data.Rena);		
		sap.ui.getCore().byId(this.createId("weeknLabel")).setText(data.Weeknum);
		sap.ui.getCore().byId(this.createId("dbptLabel")).setText(data.Dbpt);
		sap.ui.getCore().byId(this.createId("cpuptLabel")).setText(data.Cpupt);
		sap.ui.getCore().byId(this.createId("restLabel")).setText(data.Rest);
		sap.ui.getCore().byId(this.createId("ztotalLabel")).setText(data.Ztotal);
		sap.ui.getCore().byId(this.createId("zcommentArea")).setValue(data.Zcomment);
		sap.ui.getCore().byId(this.createId("zstatusLabel")).setText(data.Zstatus);
		sap.ui.getCore().byId(this.createId("ztrendLabel")).setText(data.Ztrend);
    	
    	
    		
	},
	navBack: function(){
		
		 var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		 var oHashChanger = new sap.ui.core.routing.HashChanger();
		 oHashChanger.setHash(oRouter.getURL("CapacityManagement"));
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

});