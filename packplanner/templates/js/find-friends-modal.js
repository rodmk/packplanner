
    $(document).ready(function() {

        updateFriends(ALL_DATABASE_NAMES);

        $('#friendSearch').typeahead( { 
            source: function (query, process) {
                process( ALL_DATABASE_NAMES );
            },
            menu: '',
            sorter: function(items) {

                updateFriends( items );
                return items.sort()
            }

        } );

        $('#requestContactButton').click(function() {
            //var requested_contact_ids = $('#contactFriendHeaders').getSelected();
            var requested_contact_ids = "";
            var checkboxes = $(".selectContact");
            for (checkbox in checkboxes) {
                if (checkbox.hasOwnProperty("checked")) {
                    requested_contact_ids += checkbox.attr("id") + " ";
                }
            }
            if (requested_contact_ids.length > 0) {
                requested_contact_ids = requested_contact_ids.substring(0, requested_contact_ids.length-1);
            }
            alert(requested_contact_ids);
            // $.ajax("/contacts/", {
            //     type: "POST",
            //     data: {requested_contact_ids : requested_contact_ids , csrfmiddlewaretoken: '{{ csrf_token }}' },
            // });
        });

    });

    function updateFriends(contactList){

        contactList.sort();

        var divObject = $("#contactFriendHeaders");
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
                    var tile = $("<li>", {
                        class: "name"
                    });
                    var lab = $("<label>", {
                        class : "checkbox"
                    });
                    var inp = $("<input>", {
                        name: "checkboxes",
                        type: "checkbox",
                        id: "" + contactList[k].dbID,
                        value: contactList[k],
                        style: "text-align: middle;"
                    });
                    var anchor = $("<a>", {
                        text: contactList[k]
                    });
                    // anchor.prepend($("<img>", {
                    //     src : "../static/img/placeholder_user.png",
                    //     alt : "",
                    //     style : "margin-right: 10px; height:50px; text-align: middle;"
                    // }));
                    lab.append(inp);
                    lab.append(anchor);
                    tile.append(lab);
                    divObject.append(tile);
                }
            }
        }
    }