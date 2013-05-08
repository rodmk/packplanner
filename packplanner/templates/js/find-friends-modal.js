
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

    });

    function updateFriends(contactList){

        contactList.sort();

        var divObject = document.getElementById("contactFriendHeaders");
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
                    newContent = newContent + '<li><a href="#"><img src="../static/img/placeholder_user.png" alt="" style="margin-right: 10px; height:50px;" />' + contactList[k] + '</a></li>';
                }
            }
        }

        divObject.innerHTML = newContent;

    }