
    var ALPHABET_UPPER = ["A","B","C","D","E","F","G","H","I","J","K","L",
						  "M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

	var DEFAULT_PHOTO = '../static/img/placeholder_user.png';


    function Contact( ID, photo, familyName, parents, children, address, phoneNumber){
        this.familyName = familyName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.photo = photo;
        this.ID = ID;
        this.parents = parents;
        this.children = children;
    }

	$(document).ready(function() {

        $('#contactOptions').hide();
        $("#addressContact").val('');

        myContacts = new Array();
        myFamilyNames = new Array();

        {% for contact in contacts %}

        var parentsList = new Array();
        var childrenList = new Array();
        var contactID = {{forloop.counter0}};

        {% for adult in contact.family_members.all %}
        parentsList.push("{{adult.first_name}}");
        {% endfor %}

        {% for child in contact.children.all %}
        childrenList.push("{{child.first_name}}");
        {% endfor %}

        myContacts[{{forloop.counter0}}] =  
            new Contact(contactID,
                        DEFAULT_PHOTO,
                        "{{contact}}",
                        parentsList,
                        childrenList,
                        "{{contact.familyAddress}}", 
                        "{{contact.familyPhone}}" 
                        );
        myFamilyNames[{{forloop.counter0}}] = "{{contact}}";   

        window.ALL_MY_CONTACTS = myContacts;
        window.ALL_FAMILY_NAMES = myFamilyNames;

        {% endfor %}


		updateContacts(ALL_FAMILY_NAMES);

		$('#contactSearch').typeahead( { 
			source: function (query, process) {
				process( ALL_FAMILY_NAMES );
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

                    for(c=0;c<=ALL_MY_CONTACTS.length-1;c++){
                        if (ALL_MY_CONTACTS[c].familyName == contactList[k]){
                            newContent = newContent + '<li onclick="return changeRightPanel(' + ALL_MY_CONTACTS[c].ID + ')"><a href="#">' + contactList[k] + '</a></li>';
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

        document.getElementById("familyContact").innerHTML = window.ALL_MY_CONTACTS[IDnum].familyName;
        document.getElementById("parentsContact").innerHTML = window.ALL_MY_CONTACTS[IDnum].parents;
        document.getElementById("childrenContact").innerHTML = window.ALL_MY_CONTACTS[IDnum].children;

        $("#addressContact").val(window.ALL_MY_CONTACTS[IDnum].address);
        document.getElementById("phoneContact").innerHTML = window.ALL_MY_CONTACTS[IDnum].phoneNumber;

        $('#contactOptions').show();

	}
