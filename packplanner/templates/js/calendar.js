function Event(id, title, location, startDate, endDate, driverTo, driverFrom, going) {
	this.id = id;
	this.title = title;
	this.location = location;
	this.startDate = startDate;
	this.endDate = endDate;
	this.driverTo = driverTo;
	this.driverFrom = driverFrom;
	this.going = going;
}

function compareEvents(event1, event2) {
	if (event1.startDate > event2.startDate) {
		return 1;
	} else if (event1.startDate < event2.startDate) {
		return -1;
	} else if (event1.endDate > event2.endDate) {
		return 1;
	} else if (event1.endDate < event2.endDate) {
		return -1
	} else {
		return 0;
	}
}

var events = new Array();

/*
Filters
*/
var childrenFilters = ["Mary", "Nick", "Andy", "Barry", "Christine"];
var helpFilters = ["All"];


$(document).ready(function() {

	var currentDate = new Date();
	dateSelectedFunc(currentDate);

	events = new Array();

	{% for event_details in events_details %}

	var startDate = new Date();
	startDate.setFullYear({{event_details.event.startTime.year}});
	startDate.setMonth({{event_details.event.startTime.month}});
	startDate.setDate({{event_details.event.startTime.day}});
	startDate.setHours({{event_details.event.startTime.hour}});
	startDate.setMinutes({{event_details.event.startTime.minute}});
	startDate.setHours(startDate.getHours()-5);

	var endDate = new Date();
	endDate.setFullYear({{event_details.event.endTime.year}});
	endDate.setMonth({{event_details.event.endTime.month}});
	endDate.setDate({{event_details.event.endTime.day}});
	endDate.setHours({{event_details.event.endTime.hour}});
	endDate.setMinutes({{event_details.event.endTime.minute}});
	endDate.setHours(endDate.getHours()-5);

	events[{{forloop.counter0}}] =  new Event({{event_details.event.id}}, 
		"{{event_details.event.name}}", 
		"{{event_details.event.location}}", 
		startDate, 
		endDate,
		"{{event_details.driver_to}}", 
		"{{event_details.driver_from}}",
		"Andy");

	{% endfor %}

	// events[0] = new Event(0, 
	// 	"Soccer Game vs Mockingbird", 
	// 	"Oxmoor Fields", 
	// 	new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0, 0, 0), 
	// 	new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16, 30, 0, 0), 
	// 	"Me", "Me", "Andy");
	// events[1] = new Event(1, 
	// 	"Drama Rehearsal", 
	// 	"Hyde Auditorium", 
	// 	new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 15, 0, 0, 0), 
	// 	new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0, 0), 
	// 	"Nick", "Nick", "Barry");
	// events[2] = new Event(2, 
	// 	"Dinner and Movie", 
	// 	"Springhurst", 
	// 	new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 30, 0, 0), 
	// 	new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0, 0), 
	// 	"Nick", "Nick", "Nick");
	
	displayEvents();

	for(i=0;i<=helpFilters.length-1;i++){
			$('#filterBtnGroup').append('<button id="allChildren" type="button" data-toggle="button" class="btn pull-left" >' + helpFilters[i] + '</button>');
	}

	for(j=0;j<=childrenFilters.length-1;j++){
			$('#filterBtnGroup').append('<button id="partialChildren" type="button" data-toggle="button" class=' + '"btn pull-left btn-custom' + j + '" >' + childrenFilters[j] + '</button>');
	}

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

    	prevDayFunc(date);
    	dateSelectedFunc(date);

    });

    /*Next Day button*/
    $("#nextDayButton").click(function() {
    	var date = new Date($("#datepicker").datepicker('getDate'));
    	date.setDate(date.getDate()+1);
    	$("#datepicker").datepicker('setDate', date);

    	nextDayFunc(date);
	    dateSelectedFunc(date);

    });

    /*Previous Week button*/
    $("#previousWeekButton").click(function() {
    	var date = new Date($("#datepicker").datepicker('getDate'));
    	date.setDate(date.getDate()-7);
    	$("#datepicker").datepicker('setDate', date);

    	prevWeekFunc(date);
	    dateSelectedFunc(date);

    });

    /*Next Week button*/
    $("#nextWeekButton").click(function() {
    	var date = new Date($("#datepicker").datepicker('getDate'));
    	date.setDate(date.getDate()+7);
    	$("#datepicker").datepicker('setDate', date);

    	nextWeekFunc(date);
	    dateSelectedFunc(date);

    });

    /*creates the new event*/
    $("#createEventButton").click(function(){
    	var id = events.length;
    	var title = $("#eventName").val();
    	var startTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16, 30, 0, 0)
    	var endTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 17, 30, 0, 0)
    	var eventdate = $("#eventDate").val();
    	var driverTo = $("#driverTo").val();
    	var driverFrom = $("#driverFrom").val();
    	var eventLocation = $("#locationInput").val();
    	var e = new Event(id,title,eventLocation,startTime,endTime,driverTo,driverFrom,"Andy");
    	addEvent(e);
    	$('#newEventModal').modal('hide');
    	$(':input','#newEventForm')
    	  .not(':button, :submit, :reset, :hidden')
    	  .val('')
    	  .removeAttr('checked')
    	  .removeAttr('selected');

     });

    /*New Event button*/
    $("#newEventButton").click(function() {
    	newEventFunc();
    });

    $('#startTime').datetimepicker({
		pickDate: false,
		pick12HourFormat: true,
		pickSeconds: false,
		format : "h:mm PP",
	});
	$('#endTime').datetimepicker({
		pickDate: false,
		pick12HourFormat: true,
		pickSeconds: false,
		format : "h:mm PP",
	});
	$('#eventDate').datetimepicker({
		pickTime: false
	});

	$('#editStartTime').datetimepicker({
		pickDate: false,
		pick12HourFormat: true,
		pickSeconds: false,
		format : "h:mm PP",
	});
	$('#editEndTime').datetimepicker({
		pickDate: false,
		pick12HourFormat: true,
		pickSeconds: false,
		format : "h:mm PP",
	});
	$('#editEventDate').datetimepicker({
		pickTime: false
	});

	$("#drivingTo").typeahead({source:availDrivers,items:4});
	$("#drivingFrom").typeahead({source:availDrivers,items:4});
});


function dateSelectedFunc(date){
	currentDate = date;
	focusEventCalendar(currentDate);
	events = getEvents(currentDate);
	displayEvents();
	console.log(currentDate);
}

function focusEventCalendar(currentDate) {
	var day = currentDate.getDay();
	var firstDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
	firstDate.setDate(firstDate.getDate()-day);
	for (i=0; i < 7; i++) {
		if (i==day) {
			$("#header" + i).removeClass("unselected-day span1").addClass("selected-day span6");
			$("#header" + i).html("<h4 style='color:white;background-color: #1ABC9C;margin-top:0px;margin-bottom:10px;padding-top:10px;padding-bottom:10px;'>" + $.datepicker.formatDate('DD, MM d', currentDate) + "</h4>");
		} else {
			$("#header" + i).removeClass("selected-day span6").addClass("unselected-day span1");
			$("#header" + i).html("<p>" + $.datepicker.formatDate('D', firstDate) + "</p><p>" + firstDate.getDate() + "</p>");
		}
		firstDate.setDate(firstDate.getDate()+1);
	}
}

function eventDaySelected(day) {
	var currentDay = currentDate.getDay();
	var diff = currentDay - day;
	if (diff != 0) {
		currentDate.setDate(currentDate.getDate() - diff);
		$("#datepicker").datepicker('setDate', currentDate);
		dateSelectedFunc(currentDate);
	}
}

function prevDayFunc(date){
	console.log("prevDay pressed");
}

function nextDayFunc(date){
	console.log("nextDay pressed");

}

function prevWeekFunc(date){
	console.log("prevWeek pressed");

}

function nextWeekFunc(date){
	console.log("nextWeek pressed");

}

function newEventFunc(){
	console.log("newEvent pressed");
	console.log(booleanFilters);
}

//javascript code for selecting drivers
var availDrivers = ["Me","Nick","Bob","Cheryl","Mindy","George","Ari","Alessandro","Alexandra","Alex"];

function makeList(list){
	var start = "<ul>"
	var body = ""
	var end = "</ul>"
	for(x in list){
		body = body + "<li>"+ list[x] +"</li>"
	}
	return start+body+end;
}

function addEvent(event) {
	events[events.length] = event;
	displayEvents();
}

function displayEvents() {
	events.sort(compareEvents);
	var content = $(".selected-day");
	$(".tile").detach();
	$(".dayEvents").remove();
	for (i=0; i<events.length; i++) {
		var event = events[i];
		content.append(renderEvent(event));
	}
}

function formatMinutes(n){
    return n > 9 ? "" + n: "0" + n;
}

function renderEvent(event) {
	tile = $("<div>", {
		class: "tile row",
	})

	date = $("<span>", {
		class: "eventTime span5",
		text: event.startDate.getHours()+":"+formatMinutes(event.startDate.getMinutes()) + " - " + event.endDate.getHours()+":"+formatMinutes(event.endDate.getMinutes()),
	})

	content = $("<span>", {
		class: "dayEvents span6",
		text: event.title,
	})

	editbtn = $('<a class="btn pull-right flat btn-primary " style="margin-top:6px;margin-right:2px" data-toggle="modal" href="#editEventModal" onClick="editEventOpen(' + event.id + '); return true;"><i class="icon-pencil"></i></a>')
	deletebtn = $('<a class="btn pull-right flat btn-primary " style="margin-top:6px;margin-left:6px" onClick="removeEvent(' + event.id + '); return true;""><i class="icon-remove"></i></a>')
	reachoutbtn = $('<a class="btn pull-right flat btn-primary " style="margin-top:6px;margin-right:2px" data-toggle="modal" href="#reachOutModal"><i class="car-glyph"></i></a>')

	reachoutbtn.appendTo(date);
	deletebtn.appendTo(tile);
	editbtn.appendTo(tile);
	date.appendTo(tile);
	content.appendTo(tile);
	return tile;
}

function getEvents(date) {
	return events;
}

function editEventOpen(event_id) {
	$("#editEventName").val(events[event_id].title);
	//alert(events[event_id].startDate);
	//$("#editEventDate").setDate(events[event_id].startDate);
	//$("#editStartTime").setDate(events[event_id].startDate);
	//$("#editEndTime").setDate(events[event_id].endDate);
	$("#editLocationInput").val(events[event_id].location);
	$("#editDrivingTo").val(events[event_id].driverTo);
	$("#editDrivingFrom").val(events[event_id].driverFrom);
}

function removeEvent(event_id) {
	for (var i = 0; i <= events.length-1; i++) {
		if (events[i].id == event_id) {
			events.splice(i, 1);
			break;
		}
	}
	displayEvents();
}