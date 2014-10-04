var chatMessagesStorage = "chatMessages";

function send() {
	if ($("#text").val() == "") {
		alert("Please enter a text");
		return;
	}
	var text = $("#text").val().replace(/\n/g, "<br>");
	displayMessage(text);
	saveMessage(text);
	$("#text").val("");
	scrollToBottom();
}

function displayMessage(text) {
	var chatItemOpeningTags = "<div class=\"chat_item\"><div class=\"chat_item_person\"><img src=\"images/person.png\" width=\"45\" height=\"45\">";
	chatItemOpeningTags += window.localStorage.getItem("loginname");
	chatItemOpeningTags += "</div><div class=\"chat_item_text\">";
	var chatItemClosingTags = "</div><div class=\"clear\"></div</div>";
	$("#chat_window").append(chatItemOpeningTags + text + chatItemClosingTags);
}

function scrollToBottom() {
	$("html, body").animate({
		scrollTop : $(document).height()
	}, "slow");
}

function saveMessage(text) {
	var chatMessages = getStoredMessages();
	chatMessages.push(text);
	window.localStorage.setItem(chatMessagesStorage, JSON
			.stringify(chatMessages));
}

function getStoredMessages() {
	var chatMessagesString = window.localStorage.getItem(chatMessagesStorage);
	if (chatMessagesString != null) {
		return JSON.parse(chatMessagesString);
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