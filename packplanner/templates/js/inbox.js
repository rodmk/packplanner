function Message(id, sender, subject, time){
	this.id = id;
	this.sender = sender;
	this.subject = subject;
	this.time = time;
}

var messages = new Array();

$(document).ready(function() {
	loadMessages();

	updateView();
});

function loadMessages() {
	{% for message in messages %}
		console.log("new message");
		var m = new Message({{message.id}}, "{{message.sender}}", "{{message.subject}}", "{{message.time_display}}");
		messages.push(m);

	{% endfor %}
}

function updateView() {
	$.each(messages, function(i, message){
		row = $("<tr></tr>");
		sender = $("<td></td>");
		subject = $("<td></td>");
		time = $("<td></td>");
		link = $("<a></a>", {
			href: "/message/" + message.id + "/",
			text: message.subject
		});

		sender.text(message.sender);
		subject.append(link);
		time.text(message.time);

		row.append(sender);
		row.append(subject);
		row.append(time);

		$("#messages_tbl").append(row);
	});
}