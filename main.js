"use strict";

var usersArray;

$(document).ready(function () {
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

	// Check if there is a value for user and passowrd.
	function validate() {
		var username = $('#username').val();
		var password = $('#password').val();

		if (username === "") {
			alert("Enter username");
			return false;
		}
		if (password === "") {
			alert("Enter password");
			return false;
		}

		return true;
	}

	// Add the user to the local storage.
	function addNewUser() {
		var username = $('#username').val();
		var password = $('#password').val();
		var users = localStorage.getItem('users');
		usersArray = (users === null) ? [] : JSON.parse(users);
		if (userExist(username)) {
			alert("This username already exists!");
		}
		else {
			var index = usersArray.length + 1;
			usersArray.push({Index: index, Username: username, Passwrd: password});
			var jsonStr = JSON.stringify(usersArray);
			localStorage.setItem('users', jsonStr);
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
		var username = $('#username').val();
		var password = $('#password').val();
		var users = localStorage.getItem('users');
		usersArray = (users === null) ? [] : JSON.parse(users);
		if (userExist(username) && correctCredentials(username, password)) {
			window.event.preventDefault();
			var obj = {Username: username};
			var jsonStr = JSON.stringify(obj);
			window.history.replaceState(obj, "", "");
			$('#LoginForm').load("loggedIn.html", jsonStr, function(data, status) {
			});
		}
		else {
			alert("Your credentials are wrong. Try again.");
		}
	}
});