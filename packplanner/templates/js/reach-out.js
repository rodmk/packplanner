var ALPHABET_UPPER = ["A","B","C","D","E","F","G","H","I","J","K","L",
"M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var LIST_OF_CONTACTS =
[
"Lawanda Devens",
"Norberto Kautz",
"Leland Rape",
"Gwendolyn Forehand",
"Stewart Flury",
"Lennie Brownlee",
"Rocco Teixeira",
"Lesley Doerr",
"Felipe Wernick",
"Carletta Mcquay",
"Dorethea Thiessen",
"Odessa Bulger",
"Esta Yochum",
"Azzie Howard",
"Simone Sterba",
"Estrella Ishee",
"Ivana Nau",
"Callie Pierri",
"Fay Coyle",
"Kyra Heyen",
"Silva Lafond",
"Shaquana Leffler",
"Hildred Helfer",
"Hettie Timbers",
"Irvin Pesina",
"Katina Strosnider",
"Tarah Choate",
"Lauren Luiz",
"Karl Lenox",
"Filomena Wirtz",
"Maurita Fergerson",
"Ellsworth Larock",
"Lesa Strock",
"Shirley Palazzo",
"Oliver Domenico",
"Linwood Gordy",
"Kandy Oh",
"Wally Gowdy",
"Alesia Chavers",
"Maritza Rakow",
"Antionette Ladouceur",
"Damien Mcadory",
"Josette Soliman",
"Mitsue Olivera",
"Loren Vidal",
"Neil Meece",
"Jamaal Hendershott",
"Brittny Dudas",
"Nell Arbogast",
"Darrel Marceau"
]

function updateContacts(contactList){

	contactList.sort();
	var counter = 0;
	for(i=0;i<=ALPHABET_UPPER.length-1;i++){
		$('#contactHeaders').append('<li id="letterHead" >' + ALPHABET_UPPER[i] + '</li>');
		
		for(k=0;k<=contactList.length-1;k++){
			if (contactList[k][0] == ALPHABET_UPPER[i]){
				$('#contactHeaders').append('<li class="name"><label class="checkbox"><input name="checkboxes" id="'+counter+'" type="checkbox" value="' +contactList[k]+' "><a>' + contactList[k] + '</a><label></li>');
				counter++;
			}
		}
	}
}

function sendRequests(){
	$("#reachOutModal").modal('hide');
	var checked = new Array();
	for(contact in LIST_OF_CONTACTS){
		if($("#"+contact).is(":checked")){
			checked.push(LIST_OF_CONTACTS[contact]);
			$("#"+contact).prop("checked",false)	
		} 
	}
	console.log(checked);
}


$(document).ready(function() {

		updateContacts(LIST_OF_CONTACTS);

	});