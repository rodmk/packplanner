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

function Child(first_name,last_name,id){
	this.id = id;
	this.first_name = first_name;
	this.last_name = last_name;
}


function Adult(first_name,last_name,id){
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