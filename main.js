"use strict";

var usersArray;

$(document).ready(function () {
	$('.login').on('click', function() {
		if (validate()) {
			doesUserExist(username, password);
		}
	});

	$('.register').on('click', function() {
		if(validate()) {
			addNewUser();
		}
	});

	function validate() {
		var username = $('#username').val();
		var password = $('#username').val();

		if (username === "") {
			alert("Enter valid username");
			return false;
		}
		if (password === "") {
			alert("Enter valid password");
			return false;
		}

		return true;
	}

	function addNewUser() {
		// Add the user to the local storage.
		var username = $('#username').val();
		var password = $('#username').val();
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

	function userExist(username) {
		// Check if the user is in the local storage
		for(var key in usersArray) {
			if (usersArray[key].Username == username) {
				return true;
			}
		}
		return false;
	}

	function loadUserStickyNotes () {
		// Load the user's notes
	}
});