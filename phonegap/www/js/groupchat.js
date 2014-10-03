var chatMessagesStorage = "chatMessages";

function send() {
	if ($("#text").val() == "") {
		alert("Please enter a text");
		return;
	}
	var text = $("#text").val().replace(/\n/g, "<br>");
	displayMessage(text);
	saveMessage(text);
	scrollToBottom();
}

function displayMessage(text) {
	var chatItemOpeningTags = "<div class=\"groupchat_item\"><img class=\"icon\" src=\"images/person.png\"><div class=\"groupchat_item_text\">";
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
});