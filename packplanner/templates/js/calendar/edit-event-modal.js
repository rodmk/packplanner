function initEditEventModalUI(){
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

	// $('#editStartTime').datetimepicker.data('datetimepicker').setDate(currentDate);
	// $('#editEndTime').datetimepicker.data('datetimepicker').setDate(currentDate);
	// $('#editEventDate').datetimepicker.data('datetimepicker').setDate(currentDate);

	//new event and edit event modals family inputs
	{% for family_member in family.family_members.all %}
	$("#editFamilyAttendingInput").append("<option id='a{{family_member.id}}'>{{family_member.first_name}}</option>");
	{% endfor %}
	{% for child in family.children.all %}
	$("#editFamilyAttendingInput").append("<option id='c{{child.id}}'>{{child.first_name}}</option>");
	{% endfor %}

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
}