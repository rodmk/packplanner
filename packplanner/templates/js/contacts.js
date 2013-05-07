
var ALPHABET_UPPER = ["A","B","C","D","E","F","G","H","I","J","K","L",
						  "M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

	var DEFAULT_ADDRESS = '<strong>Twitter, Inc.</strong><br>795 Folsom Ave, Suite 600<br>San Francisco, CA 94107<br>';
	var DEFAULT_PHONE = '(123) 456-7890';
	var DEFAULT_EMAIL = 'first.last@example.com'; 
	var DEFAULT_PHOTO = '../static/img/placeholder_user.png'
	var DEFAULT_ID = 0;

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

    var contacts = getContacts(LIST_OF_CONTACTS);

    $(document).ready(function() {

        updateContacts(LIST_OF_CONTACTS);
        console.log(contacts);

    });

    function Contact( fullName, address, phoneNumber, email, photo){
        this.fullName = fullName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.photo = photo;
    }

    function getContacts(contactList){

        contactList.sort();

        var contacts = new Array();
        for(c=0;c<=contactList.length-1;c++){
            contacts[c] = new Contact( contactList[c], DEFAULT_ADDRESS, DEFAULT_PHONE, DEFAULT_EMAIL, DEFAULT_PHOTO );
        }
        return contacts;
    }

    function updateContacts(contactList){

        contactList.sort();

        for(i=0;i<=ALPHABET_UPPER.length-1;i++){
            $('#contactHeaders').append('<li id="letterHead" class="nav-header" >' + ALPHABET_UPPER[i] + '</li>');
            
            for(k=0;k<=contactList.length-1;k++){
                if (contactList[k][0] == ALPHABET_UPPER[i]){
                    $('#contactHeaders').append('<li><a href="#' + contactList[k] + "-info" + '">' + contactList[k] + '</a></li>');
                }
            }
        }
    }
	$(document).ready(function() {

		updateContacts(LIST_OF_CONTACTS);

		$('#contactSearch').typeahead( { 
			source: function (query, process) {
				process( LIST_OF_CONTACTS );
			},
			menu: '',
			sorter: function(items) {

				updateContacts( items );
				return items.sort()
			}

		} );

	});

	function Contact( fullName, address, phoneNumber, email, photo, ID){
		this.fullName = fullName;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.photo = photo;
		this.ID = ID;
	}

	function getContacts(contactList){

		contactList.sort();

		var contacts = new Array();
	    for(c=0;c<=contactList.length-1;c++){
	    	contacts[c] = new Contact( contactList[c], DEFAULT_ADDRESS, DEFAULT_PHONE, DEFAULT_EMAIL, DEFAULT_PHOTO, c );
	    }
	    return contacts;
	}

	function updateContacts(contactList){

		contactList.sort();

		var divObject = document.getElementById("contactHeaders");
		var newContent = '';

		var newLetter;

		for(i=0;i<=ALPHABET_UPPER.length-1;i++){
			newLetter = true;
			
			for(k=0;k<=contactList.length-1;k++){

				if (newLetter && (contactList[k][0] == ALPHABET_UPPER[i]) ){
					newContent = newContent + '<li id="letterHead" class="nav-header" >' + ALPHABET_UPPER[i] + '</li>';
					newLetter = false;
				}

				if (contactList[k][0] == ALPHABET_UPPER[i]){
					newContent = newContent + '<li onclick="return changeRightPanel(' + k + ')"><a href="#">' + contactList[k] + '</a></li>';
				}
			}
		}

		divObject.innerHTML = newContent;

	}

	function changeRightPanel(IDnum){

		var contacts = getContacts(LIST_OF_CONTACTS);
		var divObject = document.getElementById("selectUserText");
		var newContent = '<p>Name: ' + contacts[IDnum].fullName +'</p><br>' +
						 '<address>Address: ' + contacts[IDnum].address +'</address><br>' +
						 '<p>Phone: ' + contacts[IDnum].phone +'</p><br>' +
						 '<p>Email: ' + contacts[IDnum].email +'</p><br>' +
						 '<p>ID: ' + contacts[IDnum].ID +'</p><br>';
		divObject.innerHTML = newContent;
	}
