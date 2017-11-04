//Adds the chatroom links and is supposed to display the chat room
//Temporary chat creation functions
$(function () {
            // Correctly decide between ws:// and wss://
            var ws_path = "/chat/stream/";
            console.log("Connecting to " + ws_path);

            var webSocketBridge = new channel.WebSocketBridge();
            webSocketBridge.connect(ws_path);
            // Handle incoming messages
            webSocketBridge.listen(function(data) {
                // Decode the JSON
                console.log("Got websocket message", data);
                // Handle errors
                if (data.error) {
                    alert(data.error);
                    return;
                }
                // Handle joining
                if (data.join) {
                    console.log("Joining room " + data.join);
                    var roomdiv = $(
                            "<div class='room' id='room-" + data.join + "'>" +
                            "<h2>" + data.title + "</h2>" +
                            "<div class='messages'></div>" +
                            "<form><input><button>Send</button></form>" +
                            "</div>"
                    );
                    // Hook up send button to send a message
                    roomdiv.find("form").on("submit", function () {
                        webSocketBridge.send({
                            "command": "send",
                            "room": data.join,
                            "message": roomdiv.find("input").val()
                        });
                        roomdiv.find("input").val("");
                        return false;
                    });
                    $("#chats").append(roomdiv);
                    // Handle leaving
                } else if (data.leave) {
                    console.log("Leaving room " + data.leave);
                    $("#room-" + data.leave).remove();
                    // Handle getting a message
                } else if (data.message || data.msg_type != 0) {
                    var msgdiv = $("#room-" + data.room + " .messages");
                    var ok_msg = "";
                    // msg types are defined in chat/settings.py
                    // Only for demo purposes is hardcoded, in production scenarios, consider call a service.
                    ok_msg = "<div class='message'>" +
                                    "<span class='username'>" + data.username + "</span>" +
                                    "<span class='body'>" + data.message + "</span>" +
                                    "</div>";

                    msgdiv.append(ok_msg);

                    msgdiv.scrollTop(msgdiv.prop("scrollHeight"));
                } else {
                    console.log("Cannot handle message!");
                }
            });

            // Says if we joined a room or not by if there's a div for it
            inRoom = function (roomId) {
                return $("#room-" + roomId).length > 0;
            };

            // Room join/leave
            $("li.room-link").click(function () {
                roomId = $(this).attr("data-room-id");
                if (inRoom(roomId)) {
                    // Leave room
                    $(this).removeClass("joined");
                    webSocketBridge.send({
                        "command": "leave",
                        "room": roomId
                    });
                } else {
                    // Join room
                    $(this).addClass("joined");
                    webSocketBridge.send({
                        "command": "join",
                        "room": roomId
                    });
                }
            });

            // Helpful debugging
            webSocketBridge.socket.onopen = function () {
                console.log("Connected to chat socket");
            };
            webSocketBridge.socket.onclose = function () {
                console.log("Disconnected from chat socket");
            }
        });