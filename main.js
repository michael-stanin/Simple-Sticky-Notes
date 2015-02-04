"use strict"

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

	function addNewUser() {
		// Add the user to the local storage.	
	}

	function doesUserExist(username, password) {
		// Check if the user is in the local storage
	}

	function loadUserStickyNotes () {
		// Load the user's notes
	}

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
});