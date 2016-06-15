sap.ui.controller("capacity_management.Logon", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf capacity_management.Logon
*/
	onInit: function() {
		var defaultsid;
		this.oLogonModel = new sap.ui.model.json.JSONModel();

		
   	var oModel = new sap.ui.model.odata.ODataModel("/Ped/HANAXS_TEST/services/knowledge_base.xsodata/", false,"kevinyan","Sap12345");
	
	oBusyDialog = new sap.m.BusyDialog();  
   
	


	//		var oModel = new sap.ui.model.odata.ODataModel("/Capa/opu/odata/sap/Z_CAPACITY_MANAGEMENT_GW_SRV/", false,"cassieliu","Initial1");
	    //var oModel = new sap.ui.model.odata.ODataModel("http://localhost/Capa/opu/odata/sap/Z_CAPACITY_MANAGEMENT_GW_SRV/", false,"kevin","support");
		 //var oODLGM = new  sap.ui.model.odata.ODataModel("http://localhost/Capa/opu/odata/sap/Z_CAPACITY_MANAGEMENT_GW_SRV/SYSTEMIDCLIENTSet?$format=json", false,"cassieliu","Initial1");
	    
	//	var testModel = new sap.ui.model.odata.ODataModel("/Ped/HANAXS_TEST/services/buyer.xsodata/ZTEST('2')",false,"KEVINYAN","Sap12345");
	//	console.log(testModel);
		
	var oJsonModel = new sap.ui.model.json.JSONModel();
		var oClientModel = new sap.ui.model.json.JSONModel();
	var siddata = {"results":[{"Sid":"KEV"}]};
	oJsonModel.setData(siddata);
	
	var cltData = {"results":[{"Clt":"001"}]};
	oClientModel.setData(cltData);
	
				var oDropbox = sap.ui.getCore().byId(this.createId("DropDownBoxSid"));
			oDropbox.setModel(oJsonModel);
			var oItemTemplate1 = new sap.ui.core.ListItem();
			oItemTemplate1.bindProperty("text", "Sid");
			oItemTemplate1.bindProperty("key", "Sid");
			oItemTemplate1.bindProperty("enabled", "enabled");
			oDropbox.bindItems("/results", oItemTemplate1);
			
			var oDropbox1 = sap.ui.getCore().byId(this.createId("DropDownBoxClient"));
			oDropbox1.setModel(oClientModel);
			var oItemTemplate2 = new sap.ui.core.ListItem();
			oItemTemplate2.bindProperty("text", "Clt");
			oItemTemplate2.bindProperty("key", "Clt");
			oItemTemplate2.bindProperty("enabled", "enabled");
			oDropbox1.bindItems("/results", oItemTemplate2);
			
		that = this;
 			},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf capacity_management.Logon
*/
	onBeforeRendering: function() {
	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf capacity_management.Logon
*/
   onAfterRendering: function() {

   var model = sap.ui.getCore().getModel("SYSCLTID");
console.log(model);
   if(!model){
	   
	   
	$("#MaintainPanel").hide();//edit by zengheng
	//$("#logonid").removeClass();
	//$("#logonid").removeAttr("style");
	//$("#logonid").addClass("btn btn-primary ");	
	$("#ServPanel").removeClass("");
	$("#ServPanel").hide();
	$("#BusiPanel").hide();
	$("#PredicPanel").hide();
	   $("#logonMatrixId").hide();
	   $("#BusiPanel").hide();
	   $("#backBtn").hide();
	   $("#tile1").hide();
	   $("#KBPanel").hide();
	   $("#tile3").hide();
	   $("#tile4").hide();
	   $("#tile5").hide();
	   $("#tile6").hide();
	   $("#tile7").hide();
	   
		$("#tileAddFunc").hide(); //edit by zengheng
		$("#tileMaintainFunc").hide(); //edit by zengheng
		$("#tileTop6").hide();
		$("#tileTop7").hide();
	}
	else{
	$("#logonid").hide();
	$("#logonid").hide();
	$("#formid").hide();
	$("#logonMatrixId").hide();
	$("#MaintainPanel").show()
	$("#BusiPanel").show();
	
	this.ConstructTile();
	}
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf capacity_management.Logon
*/
	//onExit: function() {	

	//},
	navigation: function(ttype){
		
		var oJsonModel = sap.ui.getCore().getModel();
		var oData = oJsonModel.getData();
		oData.ttype = ttype;
		oJsonModel.setData(oData);
		sap.ui.getCore().setModel(oJsonModel);
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("CapacityManagement"));
		
		
	},
	goEntryView:function(){
		
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("EntryCountView"));
		
	},
	goDMView:function(factor_id){
		
		
	var targetdata = factor_id;
	var model = new sap.ui.model.json.JSONModel();
		model.setData(targetdata);
		sap.ui.getCore().setModel(model, "BsChart");

		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("ZdmmonitorView"));
	},	
	goPredictView:function(){
		
		
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("PredictView"));
	},
	
	ConstructTile:function(){
		    //tile container. 
			//add knowledge number 
			
			var tilekan = sap.ui.getCore().byId("totalKAnumber");
			var ttnumeber;
			
			var requestObj={
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
		OData.request(requestObj,function(data1,response){
			ttnumeber = data1;
		});

			tilekan.setValue(ttnumeber);
			
			
			//end of add knowledge number 
		
		//edit by zengheng - start
		var busiPan = sap.ui.getCore().byId("BusiPanel");
		busiPan.destroyContent();
		//end
		//get data 
		 requestObj={
				requestUri:"/Ped/HANAXS_TEST/services/knowledge_base.xsodata/FACTORMASTER?$orderby=TREND desc&$top=5&$filter=STATUS eq 'A'  and PIN eq 'X'  and FACTOR_CATEGORY eq 'B'",
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
		OData.request(requestObj,function(data1,response){
			busdata = data1.results;
		});

	
	 for(var i = 0; i<busdata.length;i++)
	 {

		var obj = busdata[i];	
		
		if(obj.TREND==null){
			var colorValue = sap.m.ValueColor.Neutral;
			var indicatorValue = sap.m.DeviationIndicator.None;
		}
		else if(obj.TREND>10){
			var colorValue = sap.m.ValueColor.Error;
			var indicatorValue = sap.m.DeviationIndicator.Up;
		}
		else if(obj.TREND>5){
			var colorValue = sap.m.ValueColor.Critical;
			var indicatorValue = sap.m.DeviationIndicator.Up;
		}
		else if(obj.TREND>=0){
			var colorValue = sap.m.ValueColor.Good;
			var indicatorValue = sap.m.DeviationIndicator.Up;
		}
		else if(obj.TREND>-5){
			var colorValue = sap.m.ValueColor.Good;
			var indicatorValue = sap.m.DeviationIndicator.Down;
		}
		else if(obj.TREND>-10){
			var colorValue = sap.m.ValueColor.Critical;
			var indicatorValue = sap.m.DeviationIndicator.Down;
		}
		else{
			var colorValue = sap.m.ValueColor.Error;
			var indicatorValue = sap.m.DeviationIndicator.Down;
		}
		/*var tile = new sap.m.StandardTile("BusTile"+i,{
			    	title:obj.FACTOR_BUSINESS_NAME,
			    	info: obj.FACTOR_GUID,
			    	icon:"sap-icon://pushpin-on",
			    	press:function(){					
						var factor_id = this.getInfo();
						
						var data = {"FACTOR_GUID":factor_id}
						console.log("this."+factor_id);
						that.goDMView(data);
					}
			    	}).addStyleClass("tile6CSSClass");		
			buscon.addTile(tile);*/
			
			
			var gTile = new sap.m.GenericTile("BusTile"+i,{
				frameType:"OneByOne",
				size:sap.m.Size.M,
				header:obj.FACTOR_BUSINESS_NAME,
				subheader:obj.FACTOR_NAME,
				//icon:"sap-icon://pushpin-on",
				tileContent:[new sap.m.TileContent({
					footer:obj.FACTOR_GUID,
					unit:"GUID",
					content:[new sap.m.NumericContent({
						size:sap.m.Size.S,
						icon:"sap-icon://pushpin-on",
						iconDescription:"Pinned to Dashboard",
						value:obj.TREND + "%",
						indicator:indicatorValue,
						valueColor:colorValue
					})]
				}).addStyleClass("numContentStyle")],
				press:function(){		
						oBusyDialog.open(0);
						var factor_id = this.getTileContent()[0].getFooter();
						
						var data = {"FACTOR_GUID":factor_id,
									"FACTOR_TYPE":"Business"};
						that.goDMView(data);
						oBusyDialog.close(0);
					}
			}
			).addStyleClass("tile6CSSClass");
			
			busiPan.addContent(gTile);
			
		 
	 }		 
			if (busdata.length < 5)
			{
				
				var bussecdata
						var requestObj={
				requestUri:"/Ped/HANAXS_TEST/services/knowledge_base.xsodata/FACTORMASTER?$orderby=TREND desc&$top=5&$filter=STATUS eq 'A' and FACTOR_CATEGORY eq 'B'",
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
		OData.request(requestObj,function(data1,response){
			console.log(data1);
			bussecdata = data1.results;
		});

	
	
	 for(var i = 0; i<5 - busdata.length;i++)
	 {

		var obj = bussecdata[i];
		if(obj.TREND==null){
			var colorValue = sap.m.ValueColor.Neutral;
			var indicatorValue = sap.m.DeviationIndicator.None;
		}
		else if(obj.TREND>10){
			var colorValue = sap.m.ValueColor.Error;
			var indicatorValue = sap.m.DeviationIndicator.Up;
		}
		else if(obj.TREND>5){
			var colorValue = sap.m.ValueColor.Critical;
			var indicatorValue = sap.m.DeviationIndicator.Up;
		}
		else if(obj.TREND>=0){
			var colorValue = sap.m.ValueColor.Good;
			var indicatorValue = sap.m.DeviationIndicator.Up;
		}
		else if(obj.TREND>-5){
			var colorValue = sap.m.ValueColor.Good;
			var indicatorValue = sap.m.DeviationIndicator.Down;
		}
		else if(obj.TREND>-10){
			var colorValue = sap.m.ValueColor.Critical;
			var indicatorValue = sap.m.DeviationIndicator.Down;
		}
		else{
			var colorValue = sap.m.ValueColor.Error;
			var indicatorValue = sap.m.DeviationIndicator.Down;
		}
		/*var tile = new sap.m.StandardTile("BusTileNoPIN"+i,{
			    	title:obj.FACTOR_BUSINESS_NAME,
			    	info: obj.FACTOR_GUID,
			    	icon:"sap-icon://building",
			    	press:function(){					
						var factor_id = this.getInfo();
						
						var data = {"FACTOR_GUID":factor_id}
						console.log("this."+factor_id);
						that.goDMView(data);
					}
			    	}).addStyleClass("tile6CSSClass");		
			buscon.addTile(tile);*/
			
		var gTile = new sap.m.GenericTile("BusTileNoPin"+i,{
				frameType:"OneByOne",
				size:sap.m.Size.M,
				header:obj.FACTOR_BUSINESS_NAME,
				subheader:obj.FACTOR_NAME,
				//icon:"sap-icon://pushpin-on",
				tileContent:[new sap.m.TileContent({
					footer:obj.FACTOR_GUID,
					unit:"GUID",
					content:[new sap.m.NumericContent({
						size:sap.m.Size.S,
						icon:"sap-icon://vertical-bar-chart-2",
						iconDescription:"Sorted by Default",
						value:obj.TREND + "%",
						indicator:indicatorValue,
						valueColor:colorValue
					})]
				}).addStyleClass("numContentStyle")],
				press:function(){		
						oBusyDialog.open(0);
						var factor_id = this.getTileContent()[0].getFooter();
						
						var data = {"FACTOR_GUID":factor_id,
									"FACTOR_TYPE":"Business"}
						console.log("this."+factor_id);
						that.goDMView(data);
						oBusyDialog.close(0);
					}
			}
			).addStyleClass("tile6CSSClass");
			
			busiPan.addContent(gTile);
		 
	 }		 
			}
		
	

////////SERVICE
	//bind tile 5 times 

	var servPan = sap.ui.getCore().byId("ServPanel");
	servPan.destroyContent();
	var requestObj={
				requestUri:"/Ped/HANAXS_TEST/services/knowledge_base.xsodata/FACTORMASTER?$orderby=TREND desc&$top=5&$filter=STATUS eq 'A'  and PIN eq 'X'  and FACTOR_CATEGORY eq 'S'",
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
		OData.request(requestObj,function(data1,response){
			busdata = data1.results;
		});

	
	 for(var i = 0; i<busdata.length;i++)
	 {

		var obj = busdata[i];	
		if(obj.TREND==null){
			var colorValue = sap.m.ValueColor.Neutral;
			var indicatorValue = sap.m.DeviationIndicator.None;
		}
		else if(obj.TREND>10){
			var colorValue = sap.m.ValueColor.Error;
			var indicatorValue = sap.m.DeviationIndicator.Up;
		}
		else if(obj.TREND>5){
			var colorValue = sap.m.ValueColor.Critical;
			var indicatorValue = sap.m.DeviationIndicator.Up;
		}
		else if(obj.TREND>=0){
			var colorValue = sap.m.ValueColor.Good;
			var indicatorValue = sap.m.DeviationIndicator.Up;
		}
		else if(obj.TREND>-5){
			var colorValue = sap.m.ValueColor.Good;
			var indicatorValue = sap.m.DeviationIndicator.Down;
		}
		else if(obj.TREND>-10){
			var colorValue = sap.m.ValueColor.Critical;
			var indicatorValue = sap.m.DeviationIndicator.Down;
		}
		else{
			var colorValue = sap.m.ValueColor.Error;
			var indicatorValue = sap.m.DeviationIndicator.Down;
		}
		
		/*var tile = new sap.m.StandardTile("ServTile"+i,{
			    	title:obj.FACTOR_BUSINESS_NAME,
			    	info: obj.FACTOR_GUID,
			    	icon:"sap-icon://pushpin-on",
			    	press:function(){					
						var factor_id = this.getInfo();
						
						var data = {"FACTOR_GUID":factor_id}
						console.log("this."+factor_id);
						that.goDMView(data);
					}
			    	}).addStyleClass("tile6CSSClass");		
			sercon.addTile(tile);*/
		var gTile = new sap.m.GenericTile("ServTile"+i,{
				frameType:"OneByOne",
				size:sap.m.Size.M,
				header:obj.FACTOR_BUSINESS_NAME,
				subheader:obj.FACTOR_NAME,
				//icon:"sap-icon://pushpin-on",
				tileContent:[new sap.m.TileContent({
					footer:obj.FACTOR_GUID,
					unit:"GUID",
					content:[new sap.m.NumericContent({
						size:sap.m.Size.S,
						icon:"sap-icon://pushpin-on",
						iconDescription:"Pinned to Dashboard",
						value:obj.TREND + "%",
						indicator:indicatorValue,
						valueColor:colorValue
					})]
				}).addStyleClass("numContentStyle")],
				press:function(){		
						oBusyDialog.open(0);
						var factor_id = this.getTileContent()[0].getFooter();
						
						var data = {"FACTOR_GUID":factor_id,
									"FACTOR_TYPE":"Service"};
						console.log("this."+factor_id);
						that.goDMView(data);
						oBusyDialog.close(0);
					}
			}
			).addStyleClass("tile6CSSClass");
			
			servPan.addContent(gTile);
		 
	 }		 
			if (busdata.length < 5)
			{
				
				var bussecdata
						var requestObj={
				requestUri:"/Ped/HANAXS_TEST/services/knowledge_base.xsodata/FACTORMASTER?$orderby=TREND desc&$top=5&$filter=STATUS eq 'A' and FACTOR_CATEGORY eq 'S' and PIN eq ''",
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
		OData.request(requestObj,function(data1,response){
			bussecdata = data1.results;
		});

	if(bussecdata == null )
	{
		return;
	}
	 for(var i = 0; i<5 - busdata.length;i++)
	 {

		var obj = bussecdata[i];	
		if(obj.TREND==null){
			var colorValue = sap.m.ValueColor.Neutral;
			var indicatorValue = sap.m.DeviationIndicator.None;
		}
		else if(obj.TREND>10){
			var colorValue = sap.m.ValueColor.Error;
			var indicatorValue = sap.m.DeviationIndicator.Up;
		}
		else if(obj.TREND>5){
			var colorValue = sap.m.ValueColor.Critical;
			var indicatorValue = sap.m.DeviationIndicator.Up;
		}
		else if(obj.TREND>=0){
			var colorValue = sap.m.ValueColor.Good;
			var indicatorValue = sap.m.DeviationIndicator.Up;
		}
		else if(obj.TREND>-5){
			var colorValue = sap.m.ValueColor.Good;
			var indicatorValue = sap.m.DeviationIndicator.Down;
		}
		else if(obj.TREND>-10){
			var colorValue = sap.m.ValueColor.Critical;
			var indicatorValue = sap.m.DeviationIndicator.Down;
		}
		else{
			var colorValue = sap.m.ValueColor.Error;
			var indicatorValue = sap.m.DeviationIndicator.Down;
		}
		/*var tile = new sap.m.StandardTile("SevTileNoPIN"+i,{
			    	title:obj.FACTOR_BUSINESS_NAME,
			    	info: obj.FACTOR_GUID,
			    	icon:"sap-icon://building",
			    	press:function(){					
						var factor_id = this.getInfo();
						
						var data = {"FACTOR_GUID":factor_id}
						console.log("this."+factor_id);
						that.goDMView(data);
					}
			    	}).addStyleClass("tile6CSSClass");		
			sercon.addTile(tile);*/
			
			var gTile = new sap.m.GenericTile("ServTileNoPin"+i,{
				frameType:"OneByOne",
				size:sap.m.Size.M,
				header:obj.FACTOR_BUSINESS_NAME,
				subheader:obj.FACTOR_NAME,
				//icon:"sap-icon://pushpin-on",
				tileContent:[new sap.m.TileContent({
					footer:obj.FACTOR_GUID,
					unit:"GUID",
					content:[new sap.m.NumericContent({
						size:sap.m.Size.S,
						icon:"sap-icon://vertical-bar-chart-2",
						iconDescription:"Sorted by Default",
						value:obj.TREND + "%",
						indicator:indicatorValue,
						valueColor:colorValue
					})]
				}).addStyleClass("numContentStyle")],
				press:function(){		
						oBusyDialog.open(0);
						var factor_id = this.getTileContent()[0].getFooter();
						
						var data = {"FACTOR_GUID":factor_id,
									"FACTOR_TYPE":"Service"}
						console.log("this."+factor_id);
						that.goDMView(data);
						oBusyDialog.close(0);
					}
			}
			).addStyleClass("tile6CSSClass");
			
			servPan.addContent(gTile);
		 
	 }		 
			}
		
		
	},
	
	logon: function() {
		
		var sid = sap.ui.getCore().byId(this.createId("DropDownBoxSid")).getSelectedKey();
		var client = sap.ui.getCore().byId(this.createId("DropDownBoxClient")).getSelectedKey();

			
	
		if(1 != 1){
			
			alert("input the System Id!");
		}
		else{
			var json = {};
			json.client = client;
			json.sid = sid;
		    this.oLogonModel.setData(json);
		    sap.ui.getCore().setModel(this.oLogonModel,"SYSCLTID");
		    
			/*var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		    var oHashChanger = new sap.ui.core.routing.HashChanger();
		    oHashChanger.setHash(oRouter.getURL("TtypeView"));*/
			
		    $("#formid").slideUp();
			
			$("#BusiPanel").show();
			$("#ServPanel").show();
			$("#PredicPanel").show();
			$("#MaintainPanel").show()
			
			
			$("#BusiPanel").show();
		    $("#tile1").show();
		    $("#KBPanel").show();
		    $("#tile3").show();
		    $("#tile4").show();
		    $("#tile5").show();
		    $("#tile6").show();
		    $("#tile7").show();
			
			
			$("#tileAddFunc").show(); //edit by zengheng
			$("#tileMaintainFunc").show(); //edit by zengheng
			
		$("#tileTop6").show();
		$("#tileTop7").show();
		    $("#backBtn").show();
		    $("#logonMatrixId").slideDown(function(){
		    	$("#sidField").val(sid);
		    	$("#clientField").val(client);
		    });
			
			
			this.ConstructTile();
			
			
		
		    
		    
		    
		}
	
		
	},
	
	
	
	
	//edit by zengheng - start
	
	
	goMaintainView:function(){
		
		
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("MaintainView"));
	},	
	
	//edit by zengheng - end
	
	
	
	
	
	
	
	//// go knowledgebase
	
	goKnowLedgeView:function(){
		
		
		
				
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("KnowledgeBaseView"));

		
	},
	//end of knowledgebase
	
	Back:function(){
		$("#formid").slideDown();
		$("#logonMatrixId").hide();
		$("#BusiPanel").hide();
		$("#ServPanel").hide();
		$("#tile1").hide();
		$("#KBPanel").hide();
		$("#tile3").hide();
		$("#tile4").hide();
		$("#tile5").hide();
		$("#tile6").hide();
		$("#tileTop6").hide();
		$("#tileTop7").hide();
		$("#backBtn").hide();
		
		
		$("#tileAddFunc").hide(); //edit by zengheng
		$("#tileMaintainFunc").hide(); //edit by zengheng
		
	},
	
	
	goToOverview:function(GetType)
	{
	
		// set model 
		var oModel = new sap.ui.model.json.JSONModel();
		
		var data = {"CATEGORY":GetType};
		oModel.setData(data);
		sap.ui.getCore().setModel(oModel,"Overview");
		
		// jump to overview
		
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oHashChanger = new sap.ui.core.routing.HashChanger();
		oHashChanger.setHash(oRouter.getURL("CapacityManagement"));
		
		
		
		
		
	}

});