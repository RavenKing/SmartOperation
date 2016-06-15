sap.ui.jsview("capacity_management.Maintain", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf capacity_management.Zdmmonitor
	*/ 
	getControllerName : function() {
		return "capacity_management.Maintain";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf capacity_management.Zdmmonitor
	*/ 
	createContent : function(oController) {
		return new sap.m.Page({
 			
 			showNavButton: true,
			navButtonPress:function(){
				oController.navBack();
			},
			
			headerContent:[
			new sap.m.Button({
				icon:"sap-icon://home",
				tooltip:"Back to Home",
				press:function(){
					oController.goBackToHome();
					
					
				}
				
			})
			],
			content: [
			/// basic information
		
new sap.ui.commons.Panel("FactorListPanel",{
	width:"100%",
	content:[
	
		new sap.ui.table.Table(("FactorListTable"),{
							toolbar:[
			
		new sap.m.Toolbar("TableToolBar",{
		content:[
				new sap.ui.commons.Label({text:"Select Category:"}),
				new sap.ui.commons.ComboBox("mCategory",{required : true,
				change:function(){
				oController.setType();
				}
}),
				new sap.ui.commons.Label({text:"Select Type:"}),	
				new sap.ui.commons.ComboBox("mType",
				{
				     required : true
				}),
				new sap.ui.commons.Button({
			text:"Search",
			press:function(){
			oController.SetFilter();

			}}),

		]		
	}),
							],
							title:"Factor List",
							selectionMode:sap.ui.table.SelectionMode.Multi
						})
	]
	
	
	
})
			// end of view Panel
				
			]
		,
		footer:
		new sap.m.Bar("footer",{contentRight:
								   [new sap.m.Button("createButton",{ icon:"sap-icon://create",press:function(){ oController.goCreateObjectView();}}),
								   new sap.m.Button("Edit",{ icon:"sap-icon://edit",press:function(){ oController.goEditObjectView(); }}), 
									new sap.m.Button("Delete",{ icon:"sap-icon://delete" , press:function(){ oController.DeleteSelectedFactor(); }})
									]})
		
		});
	}

});