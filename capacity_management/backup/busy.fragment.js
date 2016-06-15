sap.ui.jsfragment("capacity_management.busy", { 
	createContent: function(oController ) {

		
		var oBusyDialog = new sap.m.BusyDialog({
			title:"Loading Data",
		text:"... now loading the data from a far away server",
		showCancelButton:false			
		});
		return oBusyDialog;
	} 
});