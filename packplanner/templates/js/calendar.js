function Event(id, title, location, startDate, endDate, driverTo, driverFrom, childrengoingID, adultsgoingID) {
	this.id = id;
	this.title = title;
	this.location = location;
	this.startDate = startDate;
	this.endDate = endDate;
	this.driverTo = driverTo;
	this.driverFrom = driverFrom;
	this.childrengoingID = childrengoingID;
	this.adultsgoingID = adultsgoingID;

}

function Family(id, last_name,address_line1, address_line2,address_city,address_state, address_zip_code, phone_number, contacts){
	this.id = id;
	this.last_name = last_name;
	this.address_line1 = address_line1;
	this.address_line2 = address_line2;
	this.address_city = address_city;
	this.address_zip_code = address_zip_code;
	this.phone_number = phone_number;
	this.contacts = contacts;
}

function Contact(last_name, id, first_name){
	this.last_name = last_name;
	this.id = id;
}

function Driver(first_name,last_name,id){
	this.id = id;
	this.first_name = first_name;
	this.last_name = last_name;
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

var allEvents = new Array();
var currentDate = new Date();
var family;
var contacts = [];
var drivingContacts=[];
var driverToID = -1;
var driverFromID = -1;

/*
Filters
*/
var booleanFilters = [];
var childrenFilters = [];
var helpFilters = ["All"];


$(document).ready(function() {
	$("#pop").popover();
	
	//console.log(currentDate);

	childrenFilters = [];
	{% for family_mem in family.family_members.all %}
		childrenFilters.push("{{family_mem.first_name}}");
	{% endfor %}
	{% for child in family.children.all %}
		childrenFilters.push("{{child.first_name}}");
	{% endfor %}
	

	allEvents = buildDict();
	//console.log("all events"+allEvents);

	dateSelectedFunc(currentDate);

	var contactlist= [];
	{% for contact in family.contacts.all %}
	contacts.push(new Contact('{{contact.last_name}}',{{contact.id}}));
		//var tempFamilyMembers = [];
		{% for family_mem in contact.family_members.all%}
			//tempFamilyMembers.push({{family_mem}});
			{% if family_mem.is_driver %}
			drivingContacts.push(new Driver("{{family_mem.first_name}}","{{family_mem.last_name}}",{{family_mem.id}}));
			{% endif %}
			{% endfor %}
			{% endfor %}
			console.log(drivingContacts);
			family = new Family({{family.id}},"{{family.last_name}}","{{family.address_line1}}","{{family.address_line2}}", "{{family.address_city}}","{{family.address_state}}","{{family.address_zip_code}}","{{family.phone_number}}",contactlist);

			{% for event_details in events_details %}

	// var startHour = {{event_details.event.startTime.hour}}
	// var startDay = {{event_details.event.startTime.day}}
	// var startMonth = {{event_details.event.startTime.month}}
	// var startYear = {{event_details.event.startTime.year}}
	// if(startHour-5<0){
	// 	startDay = startDay-1;
	// 	if(startDay<1){
	// 		startMonth = startMonth-1;
	// 		if(startMonth<1){
	// 			startYear = startYear -1;
	// 			startMonth=11
	// 		}
	// 	}
	// }

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


	{% endfor %}


	// function displayEvents() {
	// 	// events.sort(compareEvents);
	// 	var currentDateHash = hash(currentDate);
	// 	//console.log("currentDateHash"+currentDateHash);
	// 	if(!allEvents.hasOwnProperty(currentDateHash)){
	// 		allEvents[currentDateHash] = [];
	// 		console.log("no events existed today, adding empty array");
	// 	}
	// 	var currentDateEvents = allEvents[currentDateHash];
	// 	//console.log("currentDateEvents"+currentDateEvents);
	// 	currentDateEvents.sort(compareEvents);
	// 	var content = $(".selected-day");
	// 	$(".tile").detach();
	// 	$(".dayEvents").remove();
	// 	for (i=0; i<currentDateEvents.length; i++) {
	// 		var event = currentDateEvents[i];
	// 		content.append(renderEvent(event));
	// 	}
	// }

	function buildDict(){
		var eventDict = new Array();
		var tempHash = ""
		{% for event_details in events_details %}

		var startDate = new Date();
		startDate.setFullYear({{event_details.event.startTime.year}});
		startDate.setMonth({{event_details.event.startTime.month}}-1);
		startDate.setDate({{event_details.event.startTime.day}});
		startDate.setHours({{event_details.event.startTime.hour}});
		startDate.setMinutes({{event_details.event.startTime.minute}});
		startDate.setHours(startDate.getHours()-5);

		var endDate = new Date();
		endDate.setFullYear({{event_details.event.endTime.year}});
		endDate.setMonth({{event_details.event.endTime.month}}-1);
		endDate.setDate({{event_details.event.endTime.day}});
		endDate.setHours({{event_details.event.endTime.hour}});
		endDate.setMinutes({{event_details.event.endTime.minute}});
		endDate.setHours(endDate.getHours()-5);
		tempHash = hash(startDate);
		var e = new Event({{event_details.event.id}}, 
			"{{event_details.event.name}}", 
			"{{event_details.event.location}}", 
			startDate, 
			endDate,
			"{{event_details.driver_to}}", 
			"{{event_details.driver_from}}",
			"{{event_details.attendees}}");
		if(!(tempHash in eventDict)){
			eventDict[tempHash] = [e];
		}
		else{
			eventDict[tempHash].push(e);
		}
		{% endfor %}
		return eventDict;
	}
	
	
	displayEvents();

	for(i=0;i<=helpFilters.length-1;i++){
		$('#filterBtnGroup').append('<button id="allChildren" type="button" class="btn pull-left" >' + helpFilters[i] + '</button>');
	}

	for(j=0;j<=childrenFilters.length-1;j++){
		var btnTypeNumber = j%4;
		var btnType = "";
		switch (btnTypeNumber)
		{
			case 0:
			btnType = "default";
			break;
			case 1:
			btnType = "primary";
			break;
			case 2:
			btnType = "info";
			break;
			case 3:
			btnType = "danger";
			break;
		}
			// $('#filterBtnGroup').append('<button id="partialChildren" type="button" class=' + '"btn pull-left flat btn-'+btnType+'">' + childrenFilters[j] + '</button>');
			$('#filterBtnGroup').append('<button id="partialChildren" type="button" class=' + '"btn pull-left btn-custom'+j+'d">' + childrenFilters[j] + '</button>');
			booleanFilters[j] = 0;
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
			var id = 0;
			var title = $("#eventName").val();
			var eventDate = $("#eventDate").data('datetimepicker').getDate();
			console.log("eventDate " + eventDate);
			var startTime = $("#startTime").data('datetimepicker').getDate();
			console.log("startTime " + startTime);
			var endTime = $("#endTime").data('datetimepicker').getDate();
			console.log("endTime " + endTime);
			var startDate = eventDate;
			var endDate = eventDate;
			startDate.setHours(startTime.getHours());
			startDate.setMinutes(startTime.getMinutes());
			if(endTime < startTime){
				endDate.setDate(eventDate.getDate()+1);
			}
			endDate.setHours(endTime.getHours())
			endDate.setMinutes(endTime.getMinutes())

			var going = $("#familyAttendingInput option:selected");
			var adultsgoingID = [];
			var childrengoingID = [];
			var keys = [];
			for( var i = 0; i < going.length; i++){
				key = going[i].id;
				if(key.slice(0,1)=='a'){
					adultsgoingID.push(key.slice(1));
				}
				else if(key.slice(0,1)=='c'){
					childrengoingID.push(key.slice(1));
				}
			}


			console.log(childrengoingID);
			console.log(adultsgoingID);
			var eventLocation = $("#locationInput").val();
			var e = new Event(id, title, eventLocation, startDate, endDate, driverToID, driverFromID, childrengoingID, adultsgoingID);
			
			$.ajax("/calendar/", {
				type: "POST",
				data: {event: e,
					start_time : e.startDate.getTime(),
					end_time : e.endDate.getTime(),
					csrfmiddlewaretoken: '{{ csrf_token }}' },
					success: function(response) {
						addSuccessfulEvent(e, response)
					}
				});

			$('#newEventModal').modal('hide');
			$(':input','#newEventForm')
			.not(':button, :submit, :reset, :hidden')
			.val('')
			.removeAttr('checked')
			.removeAttr('selected');

		});


$("#editEventButtonSave").click(function(){
	var id = 0;
	var title = $("#editEventName").val();
	var eventDate = $("#editEventDate").data('datetimepicker').getDate();
	var startTime = $("#editStartTime").data('datetimepicker').getDate();
	var endTime = $("#editEndTime").data('datetimepicker').getDate();
	var startDate = eventDate;
	var endDate = eventDate;
	startDate.setHours(startTime.getHours());
	startDate.setMinutes(startTime.getMinutes());
	if(endTime < startTime){
		endDate.setDate(eventDate.getDate()+1);
	}
	endDate.setHours(endTime.getHours())
	endDate.setMinutes(endTime.getHours())
	var going = $("#editFamilyAttending").val();
	var goingID = -1;
	{% for family_member in family.family_members.all %}
	if('{{family_member.first_name}}'==going){
		goingID = {{family_member.id}};
		console.log(goingID);
	}
	{% endfor %}


	var eventLocation = $("#locationInput").val();
	var e = new Event(id, title, eventLocation, startDate, endDate, driverToID, driverFromID, goingID);
})

$('#startTime').datetimepicker({
	pickDate: false,
	pick12HourFormat: true,
	pickSeconds: false,
	format : "hh:mm PP",
});
$('#endTime').datetimepicker({
	pickDate: false,
	pick12HourFormat: true,
	pickSeconds: false,
	format : "hh:mm PP",
});
$('#eventDate').datetimepicker({
	pickTime: false
});

$('#editStartTime').datetimepicker({
	pickDate: false,
	pick12HourFormat: true,
	pickSeconds: false,
	format : "hh:mm PP",
});
$('#editEndTime').datetimepicker({
	pickDate: false,
	pick12HourFormat: true,
	pickSeconds: false,
	format : "hh:mm PP",
});
$('#editEventDate').datetimepicker({
	pickTime: false
});
{% for family_member in family.family_members.all %}
$("#familyAttendingInput").append("<option id='a{{family_member.id}}'>{{family_member.first_name}}</option>");
$("#editFamilyAttendingInput").append("<option id='a{{family_member.id}}'>{{family_member.first_name}}</option>");
{% endfor %}
{% for child in family.children.all %}
$("#familyAttendingInput").append("<option id='c{{child.id}}'>{{child.first_name}}</option>");
$("#editFamilyAttendingInput").append("<option id='c{{child.id}}'>{{child.first_name}}</option>");
{% endfor %}
$("#drivingToInput").typeahead({
	source: function(query, process){
		tempdrivers = [];
		map = {};
		$.each(drivingContacts,function(i,driver) {
			map[driver.first_name+" "+driver.last_name] = driver;
			tempdrivers.push(driver.first_name+" "+driver.last_name); 
		});
		process(tempdrivers)
	},
	updater: function(item){
		driverToID = map[item].id;
		return item;
	},
	items:4
});

$("#editDrivingToInput").typeahead({
	source: function(query, process){
		map = {};
		tempdrivers = [];
		$.each(drivingContacts,function(i,driver) {
			map[driver.first_name+" "+driver.last_name] = driver;
			tempdrivers.push(driver.first_name+" "+driver.last_name); 
		});
		process(tempdrivers)
	},
	updater: function(item){
		editDriverToID = map[item].id;
		return item;
	},
	items:4
});


$("#drivingFromInput").typeahead({
	source: function(query, process){
		map = {};
		tempdrivers = [];
		$.each(drivingContacts,function(i,driver) {
			map[driver.first_name+" "+driver.last_name] = driver;
			tempdrivers.push(driver.first_name+" "+driver.last_name); 
		});
		process(tempdrivers)
	},
	updater: function(item){
		driverFromID = map[item].id;
		return item;
	},
	items:4
});

$("#editDrivingFromInput").typeahead({
	source: function(query, process){
		map = {};
		tempdrivers = [];
		$.each(drivingContacts,function(i,driver) {
			map[driver.first_name+" "+driver.last_name] = driver;
			tempdrivers.push(driver.first_name+" "+driver.last_name); 
		});
		process(tempdrivers)
	},
	updater: function(item){
		editdriverFromID = map[item].id;
		return item;
	},
	items:4
});
});

function getEventById(event_id){
	for(key in allEvents){
		for(var i =0; i<allEvents[key].length;i++){
			if(allEvents[key][i].id == event_id){
				return allEvents[key][i];
			}
		}
	}
	return null;
}

function removeEvent(event_id) {
	for(key in allEvents){
		for(var i =0; i<allEvents[key].length;i++){
			if(allEvents[key][i].id == event_id){
				allEvents[key].pop(i);
			}
		}
	}
	displayEvents();
}

function addEvent(event) {
	var hashedDate = hash(event.startDate);
	if(!allEvents.hasOwnProperty(hashedDate)){
		allEvents[hashedDate] = [event];
	}
	else
	{
		allEvents[hashedDate].push(event);
	}
	displayEvents();
}

function hash(date){
	console.log("hashing " + date.getDate().toString()+date.getFullYear().toString()+(date.getMonth()+1).toString());
	return date.getDate().toString()+date.getFullYear().toString()+(date.getMonth()+1).toString();
}

function addSuccessfulEvent(event, json) {
	event.id=json;
	addEvent(event);
}

function dateSelectedFunc(date){
	currentDate = date;
	focusEventCalendar(currentDate);
	displayEvents();
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

/*
Returns list of selected names
*/
function getSelectedFilters(){
	var selectedFilters = [];
	for( k=0; k<=booleanFilters.length-1; k++){
		if (booleanFilters[k] == true){
			selectedFilters.push(childrenFilters[k]);
		} 
	}
	return selectedFilters;
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



function makeList(list){
	var start = "<ul>"
	var body = ""
	var end = "</ul>"
	for(x in list){
		body = body + "<li>"+ list[x] +"</li>"
	}
	return start+body+end;
}



function formatMinutes(n){
	return n > 9 ? "" + n: "0" + n;
}

function renderEvent(event) {
	//console.log(event);
	tile = $("<div>", {
		class: "tile row",
	})

	date = $("<span>", {
		class: "eventTime span6",
		text: event.startDate.getHours()+":"+formatMinutes(event.startDate.getMinutes()) + " - " + event.endDate.getHours()+":"+formatMinutes(event.endDate.getMinutes()),
	})

	content = $("<span>", {
		class: "dayEvents span6",
		text: event.title,
	})

	var family_drivers = []
	var drivermap = {}
	{% for family_member in family.family_members.all%}
	{% if family_member.is_driver %}
		family_drivers.push("{{family_member.first_name}}");
		drivermap["{{family_member.first_name}}"] = new Driver("{{family_member.first_name}}","{{family_member.last_name}}", {{family_member.id}})
	{% endif%}
	{% endfor %}
	{% for child in family.children.all%}
	{% if child.is_driver %}
		family_drivers.push("{{child.first_name}}");
		drivermap["{{child.first_name}}"] = new Driver("{{child.first_name}}","{{child.last_name}}", {{child.id}})
	{% endif%}
	{% endfor %}
	var driverTo = event.driverTo;
	var driverFrom = event.driverFrom;
	if(driverTo == ""){
		driverTo = "None";
	}
	if(driverFrom ==""){
		driverFrom = "None";
	}

	editbtn = $('<a class="btn pull-right flat btn-primary edit-event" data-toggle="modal" href="#editEventModal" onClick="editEventOpen(' + event.id + '); return true;"><i class="icon-pencil"></i></a>');
	deletebtn = $('<a class="btn pull-right flat btn-primary delete-event" onClick="removeEvent(' + event.id + '); return true;""><i class="icon-remove"></i></a>');
	reachoutbtn = $('<a class="btn pull-right flat btn-primary reach-out" data-toggle="modal" href="#reachOutModal"><i class="car-glyph"></i></a>');
	drivetobtn = $('<div class="btn-group pull-right"><a href="#" class="drivingTo btn btn-primary flat pull-right dropdown-toggle" data-toggle="dropdown">To: '+driverTo+'<span class="caret"></span></a>');
	var tempulto= $('<ul class="dropdown-menu">');
	var tempulfrom= $('<ul class="dropdown-menu">');
	var label = $('<h4 class="pull-right" style="margin-top:14px;margin-right:5px;">Drivers: </h4>');
	drivefrombtn = $('<div class="btn-group pull-right"><a href="#" id="drivingFrom" class="drivingFrom btn btn-primary flat pull-right dropdown-toggle" data-toggle="dropdown">From: '+driverFrom+'<span class="caret"></span></a>');
	var temp = "";
	for(var i = 0; i < family_drivers.length;i++){
		temp = '<li><a>'+family_drivers[i]+'</a></li>';
		tempulto.append(temp);
		tempulfrom.append(temp);
	}
	temp = '<li><a href="#reachOutModal" data-toggle="modal">Reach Out</li></a>';
	tempulto.append(temp);
	tempulfrom.append(temp);
	temp = '</ul>';
	tempulto.append(temp);
	tempulfrom.append(temp);
	drivefrombtn.append(tempulfrom);
	drivetobtn.append(tempulto);
	drivefrombtn.appendTo(content);
	reachoutbtn.appendTo(content);
	drivetobtn.appendTo(content);
	label.appendTo(content);
	deletebtn.appendTo(tile);
	editbtn.appendTo(tile);
	content.appendTo(tile);

	date.appendTo(tile);
	
	console.log("driver to "+driverTo+"driver from "+driverFrom);
	if(driverTo == "None"){
		//$(".drivingTo").removeClass('btn-primary').addClass('btn-danger');
	}

	if(driverFrom == "None"){
		//$(".drivingFrom").removeClass('btn-primary').addClass('btn-danger');
	}

	handleMissingDrivers();
	return tile;
}

function getEvents(date) {
	return allEvents[hash(date)];
}

function editEventOpen(event_id) {
	var e = getEventById(event_id);
	$("#editEventName").val(e.title);
	//alert(events[event_id].startDate);
	//$("#editEventDate").setDate(events[event_id].startDate);
	//$("#editStartTime").setDate(events[event_id].startDate);
	//$("#editEndTime").setDate(events[event_id].endDate);
	$("#editLocationInput").val(e.location);
	$("#editDrivingTo").val(e.driverTo);
	$("#editDrivingFrom").val(e.driverFrom);
}

function displayEvents() {

	var currentDateHash = hash(currentDate);
	
	if(!allEvents.hasOwnProperty(currentDateHash)){
		allEvents[currentDateHash] = [];
	}
	var currentDateEvents = allEvents[currentDateHash];
	currentDateEvents.sort(compareEvents);
	var content = $(".selected-day");
	$(".tile").detach();
	$(".dayEvents").remove();
	for (i=0; i<currentDateEvents.length; i++) {
		var e = currentDateEvents[i];
		console.log(event);
		content.append(renderEvent(e));
		handleMissingDrivers();
	}
}

function handleMissingDrivers(){
	var allDrivingTo = $(".drivingTo");
	var allDrivingFrom = $(".drivingFrom");
	$(allDrivingTo).each(function(i){
		$(this).removeClass("btn-primary").addClass("btn-danger");
	})
	$(allDrivingFrom).each(function(i){
		$(this).removeClass("btn-primary").addClass("btn-danger");
	})
}
