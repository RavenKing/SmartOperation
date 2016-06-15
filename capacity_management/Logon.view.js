sap.ui.jsview("capacity_management.Logon", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf capacity_management.Logon
	*/ 
	getControllerName : function() {
		return "capacity_management.Logon";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf capacity_management.Logon
	*/ 
	createContent : function(oController) {
		var mySignature = '<div id="header"> </div>'+
		'<div id="text-title">'+
		'<div id="search">Smart Operation - beta</div>'+
		'<div id="hana">Power by SAPUI5</div></div>';
		
        var myhtml = new sap.ui.core.HTML();
        myhtml.setContent(mySignature);

		var oPage = new sap.m.Page("logon_pageId",{
			showHeader:false,
			icon:"sap-icon//work-history",
			content:[
			    myhtml,
			    new sap.ui.commons.form.SimpleForm("formid",{
			    	width:"600px",
			    	height:"400px",
			    	content: [
					       new sap.ui.commons.Label({text:"SID:"}).addStyleClass("sidLabelStyle"),
						   new sap.ui.commons.DropdownBox(this.createId("DropDownBoxSid"),{
							   width:"150px",						  						     
							   
							   change:function(){
								   
								   oController.SelectClient();
										
							   }
									
							}).addStyleClass("sidBoxStyle"),						
						
						

			    
			    	    new sap.ui.commons.Label({text:"Client:"}).addStyleClass("clientLabelStyle"),
			    	    new sap.ui.commons.DropdownBox(this.createId("DropDownBoxClient"),{
	
			    	    	width:"150px",
			    	    	change: function(){
			
			    	    	}

			    	    }).addStyleClass("clientBoxStyle"),
			    	            
			    	    new sap.ui.commons.Label({text:"User:"}).addStyleClass("clientLabelStyle"),
			    	    new sap.ui.commons.TextField({
							width:"150px"
							
						}).addStyleClass("clientBoxStyle"),			    	            
			    	    new sap.ui.commons.Label({text:"Password:"}).addStyleClass("clientLabelStyle"),
			    	    new sap.ui.commons.TextField({
							width:"150px"
							
						}).addStyleClass("clientBoxStyle"),
			    	    	
			    	    	new sap.ui.commons.Label({text:""}),
			    	    	new sap.ui.commons.Button("logonid",{
			    	        	
			    	        icon:"sap-icon://log",
							text:"Logon",
							style:sap.ui.commons.ButtonStyle.Accept,
			    	    	width:"150px",
			    	    	//height:"30%",
			    	    	press:function(){
			    	    	    	oBusyDialog.open(0);
			    	    	    	oController.logon();
			    	    	    	oBusyDialog.close(0);	
			    	    	   }
			    	       }).addStyleClass("logonButton")    	        

			    	    ]
			    }).addStyleClass("formStyle"),
			    
				
				
				//new  sap.m.TileContainer("BusContainer",{height:"300px"}).addStyleClass("tilecontainer"),
				
				//edit by zengheng - start
				new sap.m.Panel("BusiPanel",{
					backgroundDesign:sap.m.BackgroundDesign.Transparent,
					headerToolbar:new sap.m.Toolbar({
						design:sap.m.ToolbarDesign.Solid,
						content:[
							new sap.m.Label({text:"  -    Business"}).addStyleClass("headerLabelStyle"),
							new sap.m.ToolbarSpacer(),
							new sap.m.Button({type:sap.m.ButtonType.Transparent,icon:"sap-icon://display-more"
							,press:function(){oController.goToOverview("B");}}),
							new sap.m.Button({type:sap.m.ButtonType.Transparent,icon:"sap-icon://settings"})]
					}).addStyleClass("tilePanel")
				}),
				//edit by zengheng - end
				
							
				//new  sap.m.TileContainer("SevContainer",{height:"300px"}).addStyleClass("tilecontainer"),
				//edit by zengheng - start
				new sap.m.Panel("ServPanel",{
					backgroundDesign:sap.m.BackgroundDesign.Transparent,
					headerToolbar:new sap.m.Toolbar({
						design:sap.m.ToolbarDesign.Solid,
						content:[
							new sap.m.Label({text:"  -    Service"}).addStyleClass("headerLabelStyle"),
							new sap.m.ToolbarSpacer(),
							new sap.m.Button({type:sap.m.ButtonType.Transparent,icon:"sap-icon://display-more",press:function(){oController.goToOverview("S");}}),
							new sap.m.Button({type:sap.m.ButtonType.Transparent,icon:"sap-icon://settings"})]
					}).addStyleClass("tilePanel")
				}),
				//edit by zengheng - end
				
				new sap.m.Panel("PredicPanel",{
					backgroundDesign:sap.m.BackgroundDesign.Transparent,
					headerToolbar:new sap.m.Toolbar({
						design:sap.m.ToolbarDesign.Solid,
						content:[new sap.m.Label({text:"  -    Predict"}).addStyleClass("headerLabelStyle")]
					}).addStyleClass("tilePanel"),
					content:[new sap.m.GenericTile("tile7",{
						frameType:"OneByOne",
						size:sap.m.Size.M,
						header:"Predict Analysis",
						//icon:"sap-icon://pushpin-on",
						tileContent:[new sap.m.TileContent({
							footer:">> Go Prediction",
							content:[new sap.m.NumericContent({
								size:sap.m.Size.M,
								value:" ",
								icon:"sap-icon://tools-opportunity",
								iconDescription:"Predict Analysis",
								valueColor:sap.m.ValueColor.Good
							})]
						}).addStyleClass("numContentStyle")],
						press:function(){		
								oBusyDialog.open(0);
								oController.goPredictView();
								oBusyDialog.close(0);
							}
						}
						).addStyleClass("tile6CSSClass")]
				}),		
					
				new sap.m.Panel("KBPanel",{
					backgroundDesign:sap.m.BackgroundDesign.Transparent,
					headerToolbar:new sap.m.Toolbar({
						design:sap.m.ToolbarDesign.Solid,
						content:[new sap.m.Label({text:"  -    Knowledge Management"}).addStyleClass("headerLabelStyle")]
					}).addStyleClass("tilePanel"),
					content:[new sap.m.GenericTile("tile3",{
						frameType:"OneByOne",
						size:sap.m.Size.M,
						header:"Knowledge Management",
						//icon:"sap-icon://pushpin-on",
						tileContent:[new sap.m.TileContent({
							footer:">> Knowledge Articles",
							content:[new sap.m.NumericContent("totalKAnumber",{
								size:sap.m.Size.M,
								value:" ",
								icon:"sap-icon://documents",
								iconDescription:"Predict Analysis",
								valueColor:sap.m.ValueColor.Good
							})]
						}).addStyleClass("numContentStyle")],
						press:function(){		
								oBusyDialog.open(0);
								oController.goKnowLedgeView();
								oBusyDialog.close(0);
							}
						}
						).addStyleClass("tile6CSSClass")]
				}),		
							//edit by zengheng - start	
				
				new sap.m.Panel("MaintainPanel",{
					backgroundDesign:sap.m.BackgroundDesign.Transparent,
					
					headerToolbar:new sap.m.Toolbar({
						design:sap.m.ToolbarDesign.Solid,
						content:[new sap.m.Label({text:"  -    Customizing Settings"}).addStyleClass("headerLabelStyle")]
					}).addStyleClass("tilePanel"),

					content:[new sap.m.GenericTile("tileMaintainFunc",{
						frameType:"OneByOne",
						size:sap.m.Size.M,
						header:"Maintain Objects",
						//icon:"sap-icon://pushpin-on",
						tileContent:[new sap.m.TileContent({
							footer:">> Customizing Settings",
							content:[new sap.m.NumericContent({
								size:sap.m.Size.M,
								value:" ",
								icon:"sap-icon://wrench",
								iconDescription:"Customizing",
								valueColor:sap.m.ValueColor.Good
							})]
						}).addStyleClass("numContentStyle")],
						press:function(){	
								oBusyDialog.open(0);
								oController.goMaintainView();
								oBusyDialog.close(0);
							}
						}
						).addStyleClass("tile6CSSClass")]
				}),
				
				new sap.ui.commons.layout.MatrixLayout("logonMatrixId",{
			    	width: "300px"
			    }).addStyleClass("logonMatrixStyle"),
				//edit by zengheng - end
			]

	}).addStyleClass("pageStyle");		
		
		var oMatrix = sap.ui.getCore().byId("logonMatrixId");
		oMatrix.createRow(
			new sap.ui.commons.Label({text:"SID:"}).addStyleClass("sid1LabelStyle"),
			new sap.ui.commons.TextField("sidField",{
				
				editable:false
				
			}).addStyleClass("sid1FieldStyle"),
			new sap.ui.commons.Label({text:"Client:"}).addStyleClass("client1LabelStyle"),
			new sap.ui.commons.TextField("clientField",{
				
				editable:false
				
			}).addStyleClass("client1FieldStyle")
			
		);
		
	    
		
		
		return oPage;

	}

});
