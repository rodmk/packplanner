
function initNewEventModalUI(){
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

	// $('#startTime').datetimepicker.data('datetimepicker').setDate(currentDate);
	// $('#endTime').datetimepicker.data('datetimepicker').setDate(currentDate);
	// $('#eventDate').datetimepicker.data('datetimepicker').setDate(currentDate);

	//new event and edit event modals family inputs
	{% for family_member in family.family_members.all %}
	$("#familyAttendingInput").append("<option id='a{{family_member.id}}'>{{family_member.first_name}}</option>");
	{% endfor %}
	{% for child in family.children.all %}
	$("#familyAttendingInput").append("<option id='c{{child.id}}'>{{child.first_name}}</option>");
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
}