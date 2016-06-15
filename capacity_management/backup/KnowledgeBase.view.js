sap.ui.jsview("capacity_management.KnowledgeBase", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf capacity_management.Zdmmonitor
	*/ 
	getControllerName : function() {
		return "capacity_management.KnowledgeBase";
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
		
new sap.ui.commons.Panel("ListPanel",{
	width:"100%",
	content:[
	
		new sap.ui.table.Table(("KnowledgeTable"),{
							toolbar:[
			
		new sap.m.Toolbar("TableToolBarKB",{
		content:[
				new sap.ui.commons.Label({text:"Select Category:"}),
				new sap.ui.commons.ComboBox("CategoryKB",{required : true,
				change:function(){
				oController.setType();
				}
}),
				new sap.ui.commons.Label({text:"Select Type:"}),	
				new sap.ui.commons.ComboBox("TypeKB",
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
							title:"Knowledge Articles",
							selectionMode:sap.ui.table.SelectionMode.Multi
						})
	]
	
	
	
}),

///end of factor list
			  // View Panel 

new sap.ui.commons.Panel("ViewPanel",{
	width:"100%",
	content:[
// object header
		new sap.m.ObjectHeader("ObjHead",{
		title:"Object Header ",
		intro:"Introduction",
		number:11111111,
		statuses:[
	   new sap.m.ObjectStatus("StatusObj",{
			text:"Success",
			state:sap.ui.core.ValueState.Success
		})	
		],
		attributes:[
		new sap.m.ObjectAttribute("DateObj",{text:"hehehehe"})
			],
		headerContainer:[

	


		]

		}),
		new sap.m.IconTabBar("ICB",{
			items :[
			new sap.m.IconTabFilter({
                        key : "Info",
                         icon : "sap-icon://hint",
						content:[
						//form 
							new sap.ui.layout.form.Form("InfoForm",{
				title: new sap.ui.core.Title({text: "Predict Data", tooltip: "Title tooltip"}),
			editable: false,
			layout: new sap.ui.layout.form.GridLayout(),
			formContainers: [
				new sap.ui.layout.form.FormContainer("F1C1",{
					title: "Basic data",
					formElements: [
						new sap.ui.layout.form.FormElement({
							label: "Factor Id",
							fields: [new sap.ui.commons.TextField("GUID",{value: "Max",editable:false})									
							]
						}),
						new sap.ui.layout.form.FormElement({
							label: "Modified By",
							fields: [new sap.ui.commons.TextField("ModUser",{value: "Max",editable:false})	
							]
						}),
							new sap.ui.layout.form.FormElement({
							label: "Modified On",
							fields: [new sap.ui.commons.TextField("ModTime",{value: "Max",editable:false})	
							]
						}),
						new sap.ui.layout.form.FormElement({
							label: "Created By",
							fields: [new sap.ui.commons.TextField("CreUser",{value: "Max",editable:false})	
							]
						}),
						new sap.ui.layout.form.FormElement({
							label: "Created On",
							fields: [new sap.ui.commons.TextField("CreTime",{value: "Max",editable:false})	
							]
						}),
						]
				}),
					]



			})

						//end of form
								]

                      }),
			new sap.m.IconTabFilter({
                          key : "Notes",
                          icon : "sap-icon://notes",
						  content:[
								new sap.ui.commons.Label({text:"Comments:"}),
								new sap.ui.commons.TextArea({
								
								width:"800px",
								id : 'TextArea',
								tooltip : 'This is a tooltip',
								cols : 170,
								editable:false,
								rows : 10,
								})
						
							]
                     }),	]

		})
//content
		

]})
			// end of view Panel
				
			]
		,
		footer:
		new sap.m.Bar("footerKB",{contentRight:
								   [new sap.m.Button("savebuttonKB",{ icon:"sap-icon://save",press:function(){ oController.SaveComment();}}), 
								   new sap.m.Button("viewKB",{ icon:"sap-icon://detail-view",press:function(){ oController.ShowViewPanel();}}), 
								   new sap.m.Button("EditKB",{ icon:"sap-icon://edit",press:function(){
									   
									   oController.EditTarget();
									   
								   }}), 
									new sap.m.Button("DeleteKB",{ icon:"sap-icon://delete" , press:function(){
													oController.DeleteSelectedKB();
										
									}})
									]})
		
		});
	}

});