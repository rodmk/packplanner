
    var ALPHABET_UPPER = ["A","B","C","D","E","F","G","H","I","J","K","L",
						  "M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

	var DEFAULT_ADDRESS = 'Twitter, Inc.\n795 Folsom Ave, Suite 600\nSan Francisco, CA 94107';
	var DEFAULT_PHONE = '(123) 456-7890';
	var DEFAULT_EMAIL = 'first.last@example.com'; 
	var DEFAULT_PHOTO = '../static/img/placeholder_user.png';
    var DEFAULT_CHILDREN = ["Mary", "Susie", "Bobby"];
	var DEFAULT_ID = 0;

	var ALL_CONTACTS =
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
    ];

    var contacts = getContactsFromList(ALL_CONTACTS);

    function Contact( fullName, address, phoneNumber, email, photo, children, ID){
        this.fullName = fullName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.photo = photo;
        this.children = children;
        this.ID = ID;

    }

    function getContactsFromList(contactList){

        contactList.sort();

        var contacts = new Array();
        for(c=0;c<=contactList.length-1;c++){
            contacts[c] = new Contact( contactList[c], DEFAULT_ADDRESS, DEFAULT_PHONE, DEFAULT_EMAIL, DEFAULT_PHOTO, DEFAULT_CHILDREN, c );
        }
        return contacts;
    }

	$(document).ready(function() {

        $('#contactOptions').hide();
        $("#addressContact").val('');

		updateContacts(ALL_CONTACTS);

		$('#contactSearch').typeahead( { 
			source: function (query, process) {
				process( ALL_CONTACTS );
			},
			menu: '',
			sorter: function(items) {

				updateContacts( items );
				return items.sort()
			}

		} );

	});

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

                    for(c=0;c<=contacts.length-1;c++){
                        if (contacts[c].fullName == contactList[k]){
                            newContent = newContent + '<li onclick="return changeRightPanel(' + contacts[c].ID + ')"><a href="#">' + contactList[k] + '</a></li>';
                            break;
                        }
                    }
				}
			}
		}

		divObject.innerHTML = newContent;

	}

	function changeRightPanel(IDnum){

        $('#contactSelectText').hide();

        document.getElementById("fullNameContact").innerHTML = contacts[IDnum].fullName;
        document.getElementById("childrenContact").innerHTML = contacts[IDnum].children;
        $("#addressContact").val(contacts[IDnum].address);
        document.getElementById("phoneContact").innerHTML = contacts[IDnum].phoneNumber;
        document.getElementById("emailContact").innerHTML = contacts[IDnum].email;

        $('#contactOptions').show();

	}
