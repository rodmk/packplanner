var ALPHABET_UPPER = ["A","B","C","D","E","F","G","H","I","J","K","L",
                          "M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

var DEFAULT_PHOTO = '../static/img/placeholder_user.png';


function Contact( ID, photo, displayName, familyName, parents, children, address, phoneNumber, dbID){
    this.displayName = displayName;
    this.familyName = familyName;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.photo = photo;
    this.ID = ID;
    this.parents = parents;
    this.children = children;
    this.dbID = dbID;
}

function Family( dbID, familyName){
    this.dbID = dbID;
    this.familyName = familyName;
}

function getContactByID( dbID, contactList ){
    for(key in contactList){
        for(var i =0; i<contactList[key].length;i++){
            if(contactList[key][i].id == dbID){
                return contactList[key][i];
            }
        }
    }
    return null;
}

$(document).ready(function() {

    $('#contactOptions').hide();
    $("#addressContact").val('');

    window.ALL_MY_CONTACTS = new Array();
    window.ALL_DISPLAY_NAMES = new Array();

    window.myFamily = new Family({{family.id}}, "{{family}}");

    window.ALL_MY_CONTACTS = new Array();
    window.ALL_DISPLAY_NAMES = new Array();

    {% for contact in contacts %}
        
        var contactID = {{forloop.counter0}};

        window.ALL_DATABASE_NAMES = ALL_DISPLAY_NAMES;

        ALL_MY_CONTACTS[{{forloop.counter0}}] =  
            new Contact(contactID,
                        DEFAULT_PHOTO,
                        "{{contact.displayFamilyNames}}",
                        "{{contact.last_name}}",
                        "{{contact.parentList}}",
                        "{{contact.childrenList}}",
                        "{{contact.familyAddress}}", 
                        "{{contact.familyPhone}}",
                        {{contact.id}} 
                        );
        ALL_DISPLAY_NAMES[{{forloop.counter0}}] = "{{contact.displayFamilyNames}}"; 

    {% endfor %}


    updateContacts(ALL_DISPLAY_NAMES);

    window.selectedContact = ALL_MY_CONTACTS[0];



    $('#contactSearch').typeahead( { 
        source: function (query, process) {
            process( ALL_DISPLAY_NAMES );
        },
        menu: '',
        sorter: function(items) {

            updateContacts( items );
            return items.sort();
        }

    } );

});

function updateContacts(contactList){

    contactList.sort();

    var divObject = $("#contactHeaders");
    divObject.empty();

    var newLetter;

    for(i=0;i<=ALPHABET_UPPER.length-1;i++){
        newLetter = true;

        for(k=0;k<=contactList.length-1;k++){

            if (newLetter && (contactList[k][0] == ALPHABET_UPPER[i]) ){
                var tile = $("<li>", {
                    class: "nav-header",
                    id: "letterHead",
                    text: ALPHABET_UPPER[i]
                });
                divObject.append(tile);
                newLetter = false;
            }

            if (contactList[k][0] == ALPHABET_UPPER[i]){

                for(c=0;c<=ALL_MY_CONTACTS.length-1;c++){
                    var famName = contactList[k].split(',')[0];
                    if (ALL_MY_CONTACTS[c].familyName == famName){
                        var tile = $("<li>", {
                            onclick: 'return changeRightPanel(' +  ALL_MY_CONTACTS[c].ID + ')'
                        });
                        var anchor = $("<a>", {
                            href : "#",
                            text : contactList[k]
                        });
                        tile.append(anchor);
                        divObject.append(tile);
                        break;
                    }
                }
            }
        }
    }


}

function changeRightPanel(IDnum){

    $('#contactSelectText').hide();

    document.getElementById("familyContact").innerHTML = window.ALL_MY_CONTACTS[IDnum].familyName;
    document.getElementById("parentsContact").innerHTML = window.ALL_MY_CONTACTS[IDnum].parents;
    document.getElementById("childrenContact").innerHTML = window.ALL_MY_CONTACTS[IDnum].children;

    $("#addressContact").val(window.ALL_MY_CONTACTS[IDnum].address);
    document.getElementById("phoneContact").innerHTML = window.ALL_MY_CONTACTS[IDnum].phoneNumber;

    $('#contactOptions').show();

    document.getElementById("inputEmailID").innerHTML = window.myFamily.familyName;
    document.getElementById("outputEmailID").innerHTML = window.ALL_MY_CONTACTS[IDnum].familyName + ' Family';

    window.selectedContact = window.ALL_MY_CONTACTS[IDnum];

}