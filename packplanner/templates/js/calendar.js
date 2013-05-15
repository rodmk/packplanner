var allEvents = new Array();
var currentDate = new Date();
var family;
var contacts = [];
var drivingContacts=[];
var driverToID = -1;
var driverFromID = -1;
var familyAdultsMap = {};
var familyChildrenMap = {};
var familyAsList = [];

/*
Filters
*/
var childrenFilters = [];
var helpFilters = ["All"];
var userColorMap = {};


$(document).ready(function() {
	//creates familyAdultsMap and familyChildrenMap and familyAsList
	var newAdult;
	childrenFilters = [];
	{% for family_mem in family.family_members.all %}
		childrenFilters.push("{{family_mem.first_name}}");
		newAdult = new Adult("{{family_mem.first_name}}","{{family_mem.last_name}}",{{family_mem.id}});
		//console.log("added family member" + newAdult.first_name)
		familyAdultsMap[newAdult.id] = newAdult;
		familyAsList.push(newAdult);
	{% endfor %}

	{% for child in family.children.all %}
		childrenFilters.push("{{child.first_name}}");
		var newChild = new Child("{{child.first_name}}","{{child.last_name}}",{{child.id}}); 
		familyChildrenMap[newChild.id] = newChild;
		familyAsList.push(newChild);
	{% endfor %}
	

	allEvents = buildEventMap();


	//builds contact list
	var contactlist= [];
	{% for contact in family.contacts.all %}
		contacts.push(new Contact('{{contact.last_name}}',{{contact.id}}));
		{% for family_mem in contact.family_members.all%}
			{% if family_mem.is_driver %}
				drivingContacts.push(new Driver("{{family_mem.first_name}}","{{family_mem.last_name}}",{{family_mem.id}}));
			{% endif %}
		{% endfor %}
	{% endfor %}

	//create family once contact list exists
	family = new Family({{family.id}},"{{family.last_name}}","{{family.address_line1}}","{{family.address_line2}}", "{{family.address_city}}","{{family.address_state}}","{{family.address_zip_code}}","{{family.phone_number}}",contactlist);
	
	//adds family members to contacts
	{% for family_mem in family.family_members.all %}
		{% if family_mem.is_driver %}
			drivingContacts.push(new Driver("{{family_mem.first_name}}","{{family_mem.last_name}}",{{family_mem.id}}));
		{% endif %}
	{% endfor %}

	//creates mapping between family member and tile color
	for(j=0;j<=childrenFilters.length-1;j++){
		var btnTypeNumber = j%5;
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
			btnType = "purple";
			break;
			case 4:
			btnType = "warning";
			break;
		}
		$('#filterBtnGroup').append('<button id="partialChildren" type="button" class="btn pull-left flat btn-'+btnTypeNumber+'">' + childrenFilters[j] + '</button>');
		console.log(familyAsList[j]);
		if (familyAsList[j].is_child){
			userColorMap["c"+familyAsList[j].id] = btnType;
		}
		else{
			userColorMap["a"+familyAsList[j].id] = btnType;

		}
	}
	// for(i=0;i<=helpFilters.length-1;i++){
	// 	$('#filterBtnGroup').append('<button id="allChildren" type="button" class="btn pull-left" >' + helpFilters[i] + '</button>');
	// }


	function buildEventMap(){
		var eventDict = new Array();
		var tempHash = ""
		{% for event_details in events_details %}
			var adultsAttendingIDs = [];
			var childrenAttendingIDs = [];

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

			//console.log("attendees ");
			//console.log({{event_details.attendees.all}});

			{% for attendee in event_details.attendees.all %}
				adultsAttendingIDs.push({{attendee.id}});
			{% endfor %}
			{% for childAttendee in event_details.child_attendees.all %}
				childrenAttendingIDs.push({{childAttendee.id}});
			{% endfor %}


			var e = new Event({{event_details.id}}, 
				"{{event_details.event.name}}", 
				"{{event_details.event.location}}", 
				startDate, 
				endDate,
				"{{event_details.driverTo}}", 
				"{{event_details.driverFrom}}",
				childrenAttendingIDs,adultsAttendingIDs);
			if(!(tempHash in eventDict)){
				eventDict[tempHash] = [e];
			}
			else{
				eventDict[tempHash].push(e);
			}
		{% endfor %}
		return eventDict;
	}
	
	
	//displayEvents();






	/*creates the new event*/
	$("#createEventButton").click(function(){
		var id = 0;
		var title = $("#eventName").val();
		var eventDate = $("#eventDate").data('datetimepicker').getDate();
		var startTime = $("#startTime").data('datetimepicker').getDate();
		var endTime = $("#endTime").data('datetimepicker').getDate();
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
		}


		var eventLocation = $("#locationInput").val();
		var e = new Event(id, title, eventLocation, startDate, endDate, driverToID, driverFromID, childrengoingID, adultsgoingID);
		
		$.ajax("/calendar/", {
			type: "POST",
			data: {event: e,
				name: e.title,
				location : e.location,
				startTime : toDateString(e.startDate),
				endTime : toDateString(e.endDate),
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
			driverToID = -1;
			driverFromID = -1;
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
			// console.log(goingID);
		}
		{% endfor %}


		var eventLocation = $("#locationInput").val();
		var e = new Event(id, title, eventLocation, startDate, endDate, driverToID, driverFromID, goingID);
	});
	initNewEventModalUI();
	initEditEventModalUI();
	addDateNavFunctionality();

	dateSelectedFunc(currentDate);



});//end document.ready

{% include "js/calendar/edit-event-modal.js" %}

{% include "js/calendar/new-event-modal.js" %}

{% include "js/calendar/datenav.js" %}

{% include "js/calendar/classes.js" %}

function toDateString(date) {
	return "" + date.getFullYear() + "-" + 
		(date.getMonth() + 1) + "-" + 
		date.getDate() + " " + 
		date.getHours() + ":"
		 + date.getMinutes();
}

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
				var ev = allEvents[key].pop(i);
				console.log("removing: " + ev);
				$.ajax("/removeEvent/" + event_id + "/", {
					type: "POST",
					data: {csrfmiddlewaretoken: '{{ csrf_token }}' },
					success: function(response) {
						if (response == -1) {
							allEvents[key].push(i);
						}
					}
				});
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
	// console.log("hashing " + date.getDate().toString()+date.getFullYear().toString()+(date.getMonth()+1).toString());
	return date.getDate().toString()+date.getFullYear().toString()+(date.getMonth()+1).toString();
}

function addSuccessfulEvent(event, json) {
	if (json != -1) {
		event.id=json;
		addEvent(event);
	} else {
		alert("bad event");
		//do something to tell user event not correct
	}
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


function formatMinutes(n){
	return n > 9 ? "" + n: "0" + n;
}

function renderEvent(event) {
	console.log(event);
	var userIDGoing;
	var btnType = "no-participant";
	console.log("event "+event.title+ " childrenGoing "+event.childrengoingID)
	console.log("event "+event.title+ " adultsGoingID "+event.adultsGoingID)
	console.log(userColorMap);
	if(event.childrengoingID.length>0){
		userIDGoing = event.childrengoingID[0];
		btnType = userColorMap['c'+userIDGoing];
	}
	else if(event.adultsgoingID.length>0){
		userIDGoing = event.adultsgoingID[0];
		btnType = userColorMap['a'+userIDGoing];
	}
	
	tile = $("<div>", {
		class : "tile row " + btnType,
		id : "eventTile"+event.id,
	})

	date = $("<span>", {
		class: "eventTime span6",
		text: event.startDate.getHours()+":"+formatMinutes(event.startDate.getMinutes()) + " - " + event.endDate.getHours()+":"+formatMinutes(event.endDate.getMinutes()),
	})

	content = $("<span>", {
		class: "dayEvents span6",
		text: event.title,
	})

	//var family_drivers = []
	var drivermap = {}

	//creating list of all family members that can drive for quick driver assignnment
	// {% for family_member in family.family_members.all%}
	// 	{% if family_member.is_driver %}
	// 		var 
	// 		family_drivers.push("{{family_member.first_name}}");
	// 		drivermap["{{family_member.first_name}}"] = new Driver("{{family_member.first_name}}","{{family_member.last_name}}", {{family_member.id}})
	// 	{% endif%}
	// {% endfor %}
	
	// {% for child in family.children.all%}
	// 	{% if child.is_driver %}
	// 		family_drivers.push("{{child.first_name}}");
	// 		drivermap["{{child.first_name}}"] = new Driver("{{child.first_name}}","{{child.last_name}}", {{child.id}})
	// 	{% endif%}
	// {% endfor %}
	
	var driverTo = event.driverTo;
	var driverFrom = event.driverFrom;

	if(driverTo == ""){
		driverTo = "None";
	}
	if(driverFrom ==""){
		driverFrom = "None";
	}

	editIcon = $("<i></i>", {
		class : "icon-pencil"
	});
	editbtn = $("<a></a>", {
		class : "btn pull-right flat btn-primary edit-event",
		href : "#editEventModal", 
		onClick : "editEventOpen(" + event.id + "); return true;"
	});
	editbtn.attr("data-toggle","modal");
	editbtn.append(editIcon);

	deleteIcon = $('<i></i>', {
		class : "icon-remove"
	});
	deletebtn = $('<a></a>',{
		class : "btn pull-right flat btn-primary delete-event",
		onClick : "removeEvent(" + event.id + "); return true;"
	});
	deletebtn.append(deleteIcon);

	reachoutIcon = $('<i></i>', {
		class : "car-glyph"
	});
	reachoutbtn = $('<a></a>',{
		class : "btn pull-right flat btn-primary reach-out",
		href : "#reachOutModal"
	});
	reachoutbtn.append(reachoutIcon);
	reachoutbtn.attr("data-toggle","modal");

	
	driveToA = $('<a></a>',{
		href : '#',
		class : "drivingTo btn btn-primary flat pull-right dropdown-toggle",
		id : "drivingTo"+event.id,
		text: 'To: '+driverTo

	});
	driveToA.attr("data-toggle","dropdown");

	driveToSpan = $('<span></span>',{
		class : "caret"
	});
	drivetobtn = $('<div></div>',{
		class : "btn-group pull-right",
	});

	driveToA.append(driveToSpan);
	drivetobtn.append(driveToA);

	driveFromA = $('<a></a>',{
		href : '#',
		class : "drivingFrom btn btn-primary flat pull-right dropdown-toggle",
		id : "drivingFrom"+event.id,
		text: 'From: '+driverFrom
	});
	driveFromA.attr("data-toggle","dropdown");

	driveFromSpan = $('<span></span>',{
		class : "caret"
	});
	driveFrombtn = $('<div></div>',{
		class : "btn-group pull-right",
		
	});

	driveFromA.append(driveFromSpan);
	driveFrombtn.append(driveFromA);
	
	var tempulto= $('<ul class="dropdown-menu">');
	var tempulfrom= $('<ul class="dropdown-menu">');
	var label = $('<h4 class="pull-right" style="margin-top:14px;margin-right:5px;">Drivers: </h4>');
	var temp = "";

	for(id in familyAdultsMap){
		var tempTo = '<li><a onClick="setDriverTo(' + event.id + ', ' + id + '); return false;">'+familyAdultsMap[id].first_name+'</a></li>';
		var tempFrom = '<li><a onClick="setDriverFrom(' + event.id + ', ' + id + '); return false;">'+familyAdultsMap[id].first_name+'</a></li>';

		tempulto.append(tempTo);
		tempulfrom.append(tempFrom);
	}
	temp = '<li><a href="#reachOutModal" data-toggle="modal">Reach Out</li></a>';
	
	//finishes creating dropdowns
	tempulto.append(temp);
	tempulfrom.append(temp);
	temp = '</ul>';
	tempulto.append(temp);
	tempulfrom.append(temp);

	//adding dropdowns to driver assignment buttons
	driveFrombtn.append(tempulfrom);
	drivetobtn.append(tempulto);

	//adding shit to content
	driveFrombtn.appendTo(content);
	reachoutbtn.appendTo(content);
	drivetobtn.appendTo(content);
	label.appendTo(content);
	
	//adding deletebtn, editbtn, content, date to tile
	deletebtn.appendTo(tile);
	editbtn.appendTo(tile);
	content.appendTo(tile);
	date.appendTo(tile);
	

	handleMissingDrivers();
	return tile;
}

function setDriverTo(details_id, driver_id) {
	var driver;
	var tileID = "drivingTo"+details_id;
	var caret = $("<span></span>",{
		class : "caret",
	})
	$.ajax("/setDriver/to/" + details_id + "/" + driver_id + "/", {
		type: "POST",
		data: {csrfmiddlewaretoken: '{{ csrf_token }}' },
		success: function(response) {
			if (response == -1) {
				$("#"+tileID).text("BROKEN")
			} else {
				//TODO: update driver text
				driver = familyAdultsMap[driver_id];
				console.log(tileID);
				$("#"+tileID).text("To: "+driver.first_name);
				caret.appendTo($("#"+tileID))
				$("#"+tileID).removeClass("btn-danger").addClass("btn");
			}
		}
	});
}

function setDriverFrom(details_id, driver_id) {
	var driver;
	var tileID = "drivingFrom"+details_id;
	var caret = $("<span></span>",{
		class : "caret",
	})
	$.ajax("/setDriver/from/" + details_id + "/" + driver_id + "/", {
		type: "POST",
		data: {csrfmiddlewaretoken: '{{ csrf_token }}' },
		success: function(response) {
			if (response == -1) {
				//tell user it didn't work
				$("#"+tileID).text("BROKEN")

			} else {
				//TODO: update driver text
				driver = familyAdultsMap[driver_id];
				console.log(tileID);
				$("#"+tileID).text("From: "+driver.first_name);
				caret.appendTo($("#"+tileID));
				$("#"+tileID).removeClass("btn-danger").addClass("btn");


			}
		}
	});
}

function getEvents(date) {
	return allEvents[hash(date)];
}

function editEventOpen(event_id) {
	var e = getEventById(event_id);
	$("#editEventName").val(e.title);
	//alert(events[event_id].startDate);
	$("#editEventDateinput").setDate(e.startDate);
	$("#editStartTimeInput").setDate(e.startDate);
	$("#editEndTimeInput").setDate(e.endDate);
	$("#editLocationInput").val(e.location);
	$("#editDrivingTo").val(e.driverTo);
	$("#editDrivingFrom").val(e.driverFrom);
}

function displayEvents() {

	var currentDateHash = hash(currentDate);
	//console.log(allEvents);
	if(!allEvents.hasOwnProperty(currentDateHash)){
		allEvents[currentDateHash] = [];
	}
	var currentDateEvents = allEvents[currentDateHash];
	//console.log("today's events "+ currentDateEvents);
	currentDateEvents.sort(compareEvents);
	var content = $(".selected-day");
	$(".tile").detach();
	$(".dayEvents").remove();
	for (i=0; i<currentDateEvents.length; i++) {
		var e = currentDateEvents[i];
		//console.log("Displaying events " + e);
		content.append(renderEvent(e));
		handleMissingDrivers();
	}
}

function handleMissingDrivers(){
	var allDrivingTo = $(".drivingTo");
	var allDrivingFrom = $(".drivingFrom");
	$(allDrivingTo).each(function(i){
		if(i.text == "To: None"){
			$(this).removeClass("btn-primary").addClass("btn-danger");
		}
	})
	$(allDrivingFrom).each(function(i){
		if(i.text == "To: None"){
			$(this).removeClass("btn-primary").addClass("btn-danger");
		}
	})
}
