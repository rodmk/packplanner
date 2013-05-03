$(document).ready(function() {
	{% for schedule in schedules %}
	//var newScheduleLink = document.createElement('div');
	var tile = $('<a>', {
	    id: 'schedule-{{schedule.id}}',
	    href: '/schedule/{{schedule.id}}/',
	    text: '{{schedule.name}}'
	    // id: 'schedule-1',
	    // href: '/schedule/1/',
	    // text: 'schedule name'
	});
	$("#scheduleList").append(tile);
	{% endfor %}
	//newScheduleLink.appendTo("#scheduleList");
	//
	// tile = $("<div>", {
	// 	text: "A schedule in the list",
	// });
	// $("#scheduleList").append(tile);
});