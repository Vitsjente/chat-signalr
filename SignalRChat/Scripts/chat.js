$(function () {

    // Declare a proxy to reference the hub. 
    var chat = $.connection.chatHub;

    // Create a function that the hub can call to broadcast messages.
    chat.client.broadcastMessage = function (name, message) {
        // Html encode display name and message. 
        var encodedName = $('<div />').text(name).html();
        var encodedMsg = $('<div />').text(message).html();
        // Add the message to the page. 
        $('#discussion').append('<li class="list-group-item"><strong>' + encodedName + '</strong>:&nbsp;&nbsp;' + encodedMsg + '</li>');
    };

    //Create a function so that the hub can alert all the connected users;
    chat.client.broadcastAlert = function (message) {
        alert(message);
    };

    // Set initial focus to message input box.  
    $('#message').focus();

    // Start the connection.
    $.connection.hub.start().done(function () {
        $('#sendmessage').click(function () {
            // Call the Send method on the hub. 
            chat.server.sendMessage($('#displayName').html(), $('#message').val());
            // Clear text box and reset focus for next comment. 
            $('#message').val('').focus();
        });

        $("#sendAlert").click( function () {
            chat.server.sendAlert($('#messageAlert').val());
        });
    });


    $("#startChat").click(function () {
        
        $(".text-danger").remove();

        var chatname = $("#chatName").val();
        if (chatname.length == 0) {
            $(".js-chatname-container").prepend('<p class="text-danger">Please provide chat name</p>');
            return;
        }

        var $displayName = $("#displayName");
        $displayName.html(chatname);
        $displayName.closest('p').prepend('Welcome, ');
        $displayName.closest('p').append('. Please start chatting below.');

        $(".js-chatname-container").addClass("hide");
        $(".js-chat-container").removeClass("hide");

    });
    
    $('input').keydown(function (e) {
        if (e.keyCode == 13) {
            $(this).next().find
            (':button').click();
        }
    });

});