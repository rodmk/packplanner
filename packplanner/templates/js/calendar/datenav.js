function addDateNavFunctionality(){
	
	$("#datepicker").datepicker({
		onSelect: function(dateText, inst) { 
	     	var dateAsString = dateText; //the first parameter of this function
	     	var dateAsObject = $(this).datepicker( 'getDate' ); //the getDate method
	     	dateSelectedFunc(dateAsObject);
	  	}
	});

	/*Previous button*/
	$("#previousDayButton").click(function() {
		var date = new Date($("#datepicker").datepicker('getDate'));
		date.setDate(date.getDate()-1);
		$("#datepicker").datepicker('setDate', date);
		dateSelectedFunc(date);

	});

	/*Next Day button*/
	$("#nextDayButton").click(function() {
		var date = new Date($("#datepicker").datepicker('getDate'));
		date.setDate(date.getDate()+1);
		$("#datepicker").datepicker('setDate', date);
		dateSelectedFunc(date);

	});

	/*Previous Week button*/
	$("#previousWeekButton").click(function() {
		var date = new Date($("#datepicker").datepicker('getDate'));
		date.setDate(date.getDate()-7);
		$("#datepicker").datepicker('setDate', date);
		dateSelectedFunc(date);

	});

	/*Next Week button*/
	$("#nextWeekButton").click(function() {
		var date = new Date($("#datepicker").datepicker('getDate'));
		date.setDate(date.getDate()+7);
		$("#datepicker").datepicker('setDate', date);
		dateSelectedFunc(date);

	});
}