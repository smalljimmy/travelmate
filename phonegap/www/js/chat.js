var chatMessagesStorage = "chatMessages";

function send() {
	if ($("#text").val() == "") {
		alert("Please enter a text");
		return;
	}
	var text = $("#text").val().replace(/\n/g, "<br>");
	var message = {
		text : text,
		time : new Date()
	}
	displayMessage(message);
	saveMessage(message);
	$("#text").val("");
	scrollToBottom();
}

function displayMessage(message) {
	var chatItemOpeningTags = "<div class=\"chat_item\">";
	chatItemOpeningTags += "<img src=\"images/person.png\" width=\"45\" height=\"45\">";
	chatItemOpeningTags += "<div class=\"chat_item_text\">";
	var chatItemClosingTags = "</div><div class=\"chat_item_person clear\">";
	chatItemClosingTags += window.localStorage.getItem("loginname");
	chatItemClosingTags += " at " + message.time.getHours() + ":"
			+ message.time.getMinutes() + " " + (message.time.getMonth() + 1)
			+ "\\" + message.time.getDate() + "\\" + message.time.getFullYear();
	chatItemClosingTags += "</div></div>"
	$("#chat_window").append(
			chatItemOpeningTags + message.text + chatItemClosingTags);
}

function scrollToBottom() {
	$("html, body").animate({
		scrollTop : $(document).height()
	}, "slow");
}

function saveMessage(message) {
	var chatMessages = getStoredMessages();
	chatMessages.push(message);
	window.localStorage.setItem(chatMessagesStorage, JSON
			.stringify(chatMessages));
}

function getStoredMessages() {
	var chatMessagesString = window.localStorage.getItem(chatMessagesStorage);
	if (chatMessagesString != null) {
		var chatMessages = JSON.parse(chatMessagesString);
		for (var i = 0; i < chatMessages.length; i++) {
			chatMessages[i].time = new Date(chatMessages[i].time);
		}
		return chatMessages;
	}
	return new Array();
}

$(document).ready(function() {
	var chatMessages = getStoredMessages();
	for (var i = 0; i < chatMessages.length; i++) {
		displayMessage(chatMessages[i]);
	}
	scrollToBottom();
});