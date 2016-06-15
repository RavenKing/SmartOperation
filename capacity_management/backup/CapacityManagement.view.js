sap.ui.jsview("capacity_management.CapacityManagement", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf capacity_management.CapacityManagementView
	*/ 
	getControllerName : function() {
		return "capacity_management.CapacityManagement";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf capacity_management.CapacityManagementView
	*/ 
	
			
		
	createContent : function(oController) {
		var oPage = new sap.m.Page(this.createId("SecondPageId"),{
			showNavButton:true,
			navButtonPress:function(){
				oController.navBack();
			},
			content:[

			    new sap.ui.commons.Button({
			    	text:"Detail",
			    	width:"100px",
			    	
			    	press:function(){
			    		
			    		oController.detailInfo();	    			
			    		
			    	}}),
			    new sap.ui.table.DataTable(this.createId("tableId"),{
			    	title:"Top 10 Background Reports of Last Week ",			    	
					visibleRowCount: 20,
					editable:false
					
			    })
	
			         
			]
		
		});	
		
		var oTable = sap.ui.getCore().byId(this.createId("tableId"));
		
		oTable.addColumn(new sap.ui.table.Column({
			
			label: new sap.ui.commons.Label({text:"SID"}),
			visible: true,
			template : new sap.ui.commons.TextField().bindProperty("value", "Sid")
			
			
			}));
				
		oTable.addColumn(new sap.ui.table.Column({
			
			label: new sap.ui.commons.Label({text:"CLIENT"}),
			visible: true,
			template : new sap.ui.commons.TextField().bindProperty("value", "Client")
			
		}));
		oTable.addColumn(new sap.ui.table.Column({
			
			label: new sap.ui.commons.Label({text:"RENA"}),
			visible: true,
			template : new sap.ui.commons.TextField().bindProperty("value", "Rena")
			
		}));
		oTable.addColumn(new sap.ui.table.Column({
	
			label: new sap.ui.commons.Label({text:"TTYPE"}),
			visible: true,
			template : new sap.ui.commons.TextField().bindProperty("value", "Ttype")
	
		}));
		oTable.addColumn(new sap.ui.table.Column({
	
			label: new sap.ui.commons.Label({text:"WEEKNUM"}),
			visible: true,
			template : new sap.ui.commons.TextField().bindProperty("value", "Weeknum")
	
		}));
		oTable.addColumn(new sap.ui.table.Column({
	
			label: new sap.ui.commons.Label({text:"DBPT"}),
			visible: true,
			template : new sap.ui.commons.TextField().bindProperty("value", "Dbpt")
	
		}));
		oTable.addColumn(new sap.ui.table.Column({
	
			label: new sap.ui.commons.Label({text:"CPUPT"}),
			visible: true,
			template : new sap.ui.commons.TextField().bindProperty("value", "Cpupt")
	
		}));
		oTable.addColumn(new sap.ui.table.Column({
	
			label: new sap.ui.commons.Label({text:"REST"}),
			visible: true,
			template : new sap.ui.commons.TextField().bindProperty("value", "Rest")
	
		}));
		oTable.addColumn(new sap.ui.table.Column({
	
			label: new sap.ui.commons.Label({text:"ZTOTAL"}),
			visible: true,
			template : new sap.ui.commons.TextField().bindProperty("value", "Ztotal")
	
		}));
		oTable.addColumn(new sap.ui.table.Column({
			
			label: new sap.ui.commons.Label({text:"ZCOMMENT"}),
			visible: true,
			template : new sap.ui.commons.TextField().bindProperty("value", "Zcomment")
			
		}));
		oTable.addColumn(new sap.ui.table.Column({
			
			label: new sap.ui.commons.Label({text:"ZSTATUS"}),
			visible: true,
			template : new sap.ui.commons.TextField().bindProperty("value", "Zstatus")
			
		}));
		oTable.addColumn(new sap.ui.table.Column({
	
			label: new sap.ui.commons.Label({text:"ZTREND"}),
			visible: true,
			template : new sap.ui.commons.TextField().bindProperty("value", "Ztrend")
	
		}));
		
		
		
		//var ele = [oPanel,oTable];
		return oPage;

	}

});
