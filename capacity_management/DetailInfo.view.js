sap.ui.jsview("capacity_management.DetailInfo", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf capacity_management.DetailInfo
	*/ 
	getControllerName : function() {
		return "capacity_management.DetailInfo";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf capacity_management.DetailInfo
	*/ 
	createContent : function(oController) {
 		var oPage =  new sap.m.Page({
 			showNavButton: true,
			navButtonPress:function(){
				oController.navBack();
			},
			title: "Title",
			content: [
			          new sap.ui.commons.Panel(this.createId("detailPanelId"),{
			        	  text: "Detail Information:",
			        	  width: "35%",
			        	  height: "45%",
			        	  content:[
			        	      new sap.ui.commons.layout.MatrixLayout(this.createId("detailMatrix"),{			        	    	  
			        	    	  columns: 2,			        	    	  
			        	      }).addStyleClass("detailMatrixStyle"),
			        	      new sap.ui.commons.Label({text:"ZCOMMENT:"}).addStyleClass("zcommentLabelStyle"),
				        	  new sap.ui.commons.TextArea(this.createId("zcommentArea")).addStyleClass("zcommentAreaStyle"),
				        	  new sap.ui.commons.Button({
				        		  text:"save",
				        		  press:function(){
				        			  oController.saveComment();
				        		  }
				        	}).addStyleClass("saveBtnStyle")
			        	  ]
			        	  
			          }),
			          
			          new sap.ui.table.DataTable(this.createId("historyTableId"),{
					    	title:"History Reports ",
					    	width:"62%",
					    	height:"45%",
							visibleRowCount: 9,
							editable:false,
							rowSelect:function(){
								oController.tableRowSelect();
							}
					  }).addStyleClass("historyTableStyle"),
					  
					  new sap.ui.commons.Panel(this.createId("historyChartPanelId"),{
			        	  text: "History Line Chart",
			        	  content:[ 			        	      
			        	      new sap.viz.ui5.controls.VizFrame({  
			        	    	  id : this.createId("historyLineChartId"),
			        	    	  width : "100%",
			        	    	  height : "350px",
			        	    	  title : {
			        	    		  visible : true,
			        	    		  text : "Response Time"
			        	    	  }
			        	      })				        	  
			        	  ]
			        	  
			          })
			          
			
			]
 		});
 		
 		var oMatrix = sap.ui.getCore().byId(this.createId("detailMatrix"));
 		
		
		
		oMatrix.createRow( 
				new sap.ui.commons.Label({text:"RENA:"}),
				new sap.ui.commons.Label(this.createId("renaLabel"))
		);
		oMatrix.createRow( 
				new sap.ui.commons.Label({text:"WEEKNUM:"}),
				new sap.ui.commons.Label(this.createId("weeknLabel"))
		);
		oMatrix.createRow( 
				new sap.ui.commons.Label({text:"DBPT:"}),
				new sap.ui.commons.Label(this.createId("dbptLabel"))
		);
        oMatrix.createRow( 
        		new sap.ui.commons.Label({text:"CPUPT:"}),
        		new sap.ui.commons.Label(this.createId("cpuptLabel"))
        );
        oMatrix.createRow( 
        		new sap.ui.commons.Label({text:"REST:"}),
        		new sap.ui.commons.Label(this.createId("restLabel"))
        );
        oMatrix.createRow( 
        		new sap.ui.commons.Label({text:"ZTOTAL:"}),
        		new sap.ui.commons.Label(this.createId("ztotalLabel"))
        );
       
        oMatrix.createRow( 
        		new sap.ui.commons.Label({text:"ZSTATUS:"}),
        		new sap.ui.commons.Label(this.createId("zstatusLabel"))
        );	
        oMatrix.createRow( 
        		new sap.ui.commons.Label({text:"ZTREND:"}),
        		new sap.ui.commons.Label(this.createId("ztrendLabel"))
        );
       
        var oTable = sap.ui.getCore().byId(this.createId("historyTableId"));
		
		
		oTable.addColumn(new sap.ui.table.Column({
			
			label: new sap.ui.commons.Label({text:"RENA"}),
			visible: true,
			template : new sap.ui.commons.TextField().bindProperty("value", "Rena")
			
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
		
		return oPage;
		
			        	    
 		
		
 		
 		
	}

});