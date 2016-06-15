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
			visibleRowCount:20,
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
		new sap.m.ObjectAttribute("DateObj",{text:"Test"})
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
				title: new sap.ui.core.Title({text: "Basic Information", tooltip: "Title tooltip"}),
				editable: false,
				width:"800px",
				layout: new sap.ui.layout.form.GridLayout(),
				formContainers: [
				new sap.ui.layout.form.FormContainer("F1C1",{
					formElements: [
						new sap.ui.layout.form.FormElement({
							label: "Customer Id",
							fields: [new sap.ui.commons.TextField("KBCustomerID",{value: "Max",editable:false})									
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
				  	new sap.ui.layout.form.FormContainer("F1B2",{
						title:"Related Tables",
						formContainers:[
						
						new sap.ui.layout.form.FormContainer("InfoTabTableShowKB")

						]
						
					})
			
					
					
					
					]



			})

						//end of form
								]

                      }),

//Basis
		  new sap.m.IconTabFilter({
                          key : "Notes",
                          icon : "sap-icon://notes",
						  content:[
						  
						 new sap.ui.layout.BlockLayout("KMBLAYOUT"),
								new sap.ui.commons.Label({text:"Comments:"}),
								new sap.ui.commons.TextArea("commentKB",{
								
								width:"800px",
								id : 'TextArea',
								tooltip : 'This is a tooltip',
								cols : 170,
								editable:false,
								rows : 10,
								}),
								// Recommendation Panel 
								new sap.m.Panel("RecoPanel",
								{
									headerText:"Recommendation For related Industy",
									content:[
									
									new sap.ui.layout.form.SimpleForm("HorizonKB",{

										maxContainerCols:4,
										content:[
										//one flex box 
										new sap.m.FlexBox({
											width:"100px",
											height:"100px",
											alignItems:sap.m.FlexAlignItems.Center,
											items:[
										 new sap.ui.commons.Label({text:"AVG Saving Po:"}).addStyleClass("toolBarBtn"),
										 new sap.suite.ui.microchart.RadialMicroChart("RMC",
										 {
											 valueColor:sap.m.ValueColor.Good
									
											 
										 }).addStyleClass("width100")
										 //end of content
											]
											
										}).addStyleClass("toolBarBtn"),
										
										//end of flexbox
											
										new sap.m.FlexBox({
											width:"300px",
											height:"100px",
											alignItems:sap.m.FlexAlignItems.Center,
											items:[
										 
										 new sap.suite.ui.microchart.BulletMicroChart("BMC",{
											 targetValueLabel:"SAP Best Practice:12",
											 actualValueLabel:"AVG Ret. Time:13",
											 size:sap.m.Size.M,
											 scale:"M",
											 targetValue:12,
											 actual:[
											new sap.suite.ui.microchart.BulletMicroChartData({value:15})
											 ]
											 
										 })
										 
										 
											]
											
										}).addStyleClass("toolBarBtn"),
										
										//end of flexbox
										
										
										
										
										
										]			
									})
									
									
									]
									
									
									
									
								})
					
						
							]
                     }),

///DVM


					new sap.m.IconTabFilter({
                          key : "Issue",
                          icon : "sap-icon://quality-issue",
						  content:[
						  
						new sap.ui.table.Table(this.createId("HintTable"),{
							title:"Hint List"
						}),
						new sap.ui.layout.form.SimpleForm(
				{
					title:"Add New Issue",
					maxContainerCols: 2,
					editable: true,
					width:"80%",
		content:[	
		new sap.ui.commons.TextField('IssueArticleIdKB',{visible:false}),
		new sap.ui.commons.Label({text:"Enter Issue Title:"}),
		new sap.ui.commons.TextField('IssueTitleKB',{value:"Issue Title ", width:"100px"}),
		new sap.ui.commons.Label({text:"Enter Responsible Person:"}),
		new sap.ui.commons.TextField('IssueResponseKB',{value:"Issue Responsible Person",width:"100px"}),
		new sap.ui.commons.Label({text:"Issue Key Date:"}),
		new sap.m.DatePicker('IssueDateKB',{valueFormat:"yyyy-MM-dd"}),
		new sap.ui.commons.Label({text:"Issue Status:"}),
		new sap.ui.commons.ComboBox('IssueStatusKB'),	
		new sap.ui.commons.Label({text:"Issue Content:"}),
		new sap.ui.commons.TextArea('IssueContentKB',{value:"Issue Content",width:"300px"}),
		new sap.ui.commons.Label({text:"Issue Solution:"}),
		new sap.ui.commons.TextArea('IssueSolutionKB',{value:"Issue Solution",width:"300px"}),
		new sap.m.Button({
			icon:"sap-icon://add",
			text:"Add",
			width:"10px",
			press:function(){
			//that.UpdateTableAndShow(article_id);		
			oController.UpdateIssueAndShow();
							}
			})
					]}),
								
						
							]
                     }),




//Issue



					 ]

		})
//content
		

]})
			// end of view Panel
				
			]
		,
		footer:
		new sap.m.Bar("footerKB",{contentRight:
								   [
								   new sap.m.Button("AddKB",{icon:"sap-icon://add",press:function(){oController.GoToAddPage();}}),
								   new sap.m.Button("savebuttonKB",{ icon:"sap-icon://save",press:function(){ oController.SaveComment();}}), 
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