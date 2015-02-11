"use strict";

var usersArray;
var currentUser;
var currentPassword;
var notes;
var count = 0;

$(document).ready(function () {

	notes = $("#notes"); // get references to the 'notes' list

	var users = localStorage.getItem('users'); // get all the the users from the local storage
	usersArray = (users === null) ? [] : JSON.parse(users);

	$('#btnLogout').toggle(); // hide the logout button at start

	$('.login').on('click', function() {
		if (validate()) {
			loadUserStickyNotes();
		}
	});

	$('.register').on('click', function() {
		if(validate()) {
			addNewUser();
		}
	});

	$('.logout').on('click', function() {
		$('#notes').toggle(300);
		$('#LoginForm').toggle(300);
	});

	$(window).on("beforeunload", function() {
		saveNotes();
	});

	
});

// Check if there is a value for user and passowrd.
function validate() {
	currentUser = $('#username').val();
	currentPassword = $('#password').val();

	if (currentUser === "") {
		alert("Enter username!");
		return false;
	}
	if (currentPassword === "") {
		alert("Enter password!");
		return false;
	}

	return true;
}

// Add the user to the local storage.
function addNewUser() {
	if (userExist(currentUser)) {
		alert("This username already exists!");
	}
	else {
		var index = usersArray.length + 1;
		usersArray.push({Index: index, Username: currentUser, Passwrd: currentPassword});
		var jsonStr = JSON.stringify(usersArray);
		localStorage.setItem('users', jsonStr);
		alert("Created user " + currentUser + " successfully.");
	}
}

// Check if the user is in the local storage.
function userExist(username) {
	for(var key in usersArray) {
		if (usersArray[key].Username === username) {
			return true;
		}
	}
	return false;
}

// Check user credentials.
function correctCredentials(username, password) {
	for (var key in usersArray) {
		if (usersArray[key].Username === username &&
			usersArray[key].Passwrd === password) {
			return true;
		}
	}
	return false;
}

// Load the user's notes.
function loadUserStickyNotes () {
	if (userExist(currentUser) && correctCredentials(currentUser, currentPassword)) {
		window.event.preventDefault();
		$('#LoginForm').toggle(300);
		loadStickyNotes();
		$('#btnLogout').toggle(300);
	}
	else {
		alert("Wrong username or password. Try again.");
	}
}
	

function loadStickyNotes() {
	// Load the user's sticky note if there are any.
	try {
		var usernotes = currentUser + " notes";
		var storedNotes = localStorage.getItem(usernotes);
		if (storedNotes) {
			var notesArray = JSON.parse(storedNotes);
			count = notesArray.length;
			for (var i = 0; i < count; i++) {
				var storedNote = notesArray[i];
				addNewNote(storedNote.Class, storedNote.Title, storedNote.Content);	
			}
		}
	}
	catch(err) {
		alert(err);
	}

	if (count == 0) {
		addNewNote();
	}
}


// Add new sticky note to the list of notes.
function addNewNote(colorClass, title, content) {
	try {
		var li = document.createElement('li');
		var div = document.createElement('div');
		if (!colorClass) {
			colorClass = "color" + Math.ceil(Math.random() * 3);
		}
		div.setAttribute('class', colorClass);
		
		var img1 = document.createElement('img');
		img1.setAttribute('id', 'btnNew');
		img1.setAttribute('src', 'images/addnote.png');
		img1.setAttribute('style', 'float:left;');
		var img2 = document.createElement('img');
		img2.setAttribute('id', 'btnSave');
		img2.setAttribute('src', 'images/saveNotes.png');
		img2.setAttribute('style', 'float:left;');
		var img3 = document.createElement('img');
		img3.setAttribute('id', 'btnDel');
		img3.setAttribute('src', 'images/deletenote.png');
		img3.setAttribute('style', 'float:right;');
		
		var titleElement = document.createElement('textarea');
		titleElement.setAttribute('maxlength', '15');
		titleElement.setAttribute('class', 'note-title');
		if (title) {
			titleElement.value = title;
		}
		else {
			titleElement.setAttribute('placeholder', 'Untitled');
		}
		
		var contentElement = document.createElement('textarea');
		contentElement.setAttribute('class', 'note-content');
		if (content) {
			contentElement.value = content;
		}
		else {
			contentElement.setAttribute('placeholder', 'Your content here');
		}
		
		div.appendChild(img1);
		//div.appendChild(img2);
		div.appendChild(img3);
		div.appendChild(titleElement);
		div.appendChild(contentElement);
	
		li.appendChild(div);
		
		$(img1).on('click', function(){
			addNewNote();
		});

		$(img2).on('click', function(){
			saveNotes();
		});

		$(img3).click(function(event) {
			var element = event.toElement;
			removeNote(element);
		});

		notes.append(li);
	}
	catch(err) {
		alert(err + "Adding new sticky note failed.");
	}
}

// Remove sticky note from the list of sticky notes.
function removeNote(element) {
	element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
}

// Save all sticky notes.
function saveNotes() {
	var notesArray = [];

	notes.find("li > div").each(function(i, e) {
		var colourClass = $(e).attr("class");
		var title = $(e).find("textarea.note-title");
		var content = $(e).find("textarea.note-content");

		notesArray.push({Index: i, Title: title.val(), Content: content.val(), Class: colourClass});
	});

	var jsonStr = JSON.stringify(notesArray);
	var usernotes = currentUser + " notes";
	localStorage.setItem(usernotes, jsonStr);
}
