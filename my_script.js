"use strict";

var notes;
var count = 0;

$(document).ready(function() {
	debugger;
	notes = $("#notes"); // get references to the 'notes' list
	
	try {
		//localStorage.clear();
		var storedNotes = localStorage.getItem("notes");
		//alert(storedNotes);
		if (storedNotes) {
			var notesArray = JSON.parse(storedNotes);
			count = storedNotes.length;
			for (var i = 0; i < count; i++) {
				var storedNote = notesArray[i];
				//alert(storedNote.Class);
				//continue;
				/*alert(storedNote.Title);
				alert(storedNote.Content);*/
				addNewNote(storedNote.Class, storedNote.Title, storedNote.Content);	
			}
		}
	}
	catch(err) {
		alert(err);
	}

	try {
		$("#btnNew").on('click', function(event){
			addNewNote();
		});
	}
	catch(err) {
		alert(err + "Failed attaching on click event for id=btnNew!");
	}
	
	try {
		$("#btnDel").click(function(event) {
			alert(event.parentNode.tagName);
	    	removeNote(event);
		});
	}
	catch(err) {
		alert(err + "Failed attaching on click event for id=btnDel!");
	}

	try {
		
		$("#save").click(function() {
			alert("In save");
			var notesArray = [];

			notes.find("li > div").each(function(i, e) {
				var colourClass = $(e).attr("class");
				var title = $(e).find("textarea.note-title");
				var content = $(e).find("textarea.note-content");

				notesArray.push({Index: i, Title: title.val(), Content: content.val(), Class: colourClass});
			});

			var jsonStr = JSON.stringify(notesArray);

			localStorage.setItem("notes", jsonStr);

			alert("Notes saved!");
		});
	}
	catch(err) {
		alert(err + "Failed attaching on click event for id=btnSave!");
	}

	function addNewNote(colorClass, title, content) {
		var notes = $("#notes"); // get references to the 'notes' list
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
			img2.setAttribute('id', 'btnDel');
			img2.setAttribute('src', 'images/deletenote.png');
			img2.setAttribute('style', 'float:right;');
			
			var titleElement = document.createElement('textarea');
			titleElement.setAttribute('maxlength', '10');
			titleElement.setAttribute('class', 'note-title');
			if (title) {
				titleElement.setAttribute('placeholder', title);
			}
			else {
				titleElement.setAttribute('placeholder', 'Untitled');
			}
			
			var contentElement = document.createElement('textarea');
			contentElement.setAttribute('class', 'note-content');
			if (content) {
				contentElement.setAttribute('placeholder', content);
			}
			else {
				contentElement.setAttribute('placeholder', 'Your content here');
			}
			try {
				div.appendChild(img1);
			}
			catch(err) {
				alert(err + "first img failed.")
			}

			try {
				div.appendChild(img2);
			}
			catch(err) {
				alert(err + "second img failed.")
			}
			
			try {
				div.appendChild(titleElement);
			}
			catch(err) {
				alert(err + "title failed.")
			}

			try {
				div.appendChild(contentElement);
			}
			catch(err) {
				alert(err + "content failed.")
			}
			
			try {
				li.appendChild(div);
			}
			catch(err) {
				alert(err + "Appending div to li failed.")
			}
			
			$(img1).on('click', function(event){
				//alert("New Clicked!");
				addNewNote();
			});

			$(img2).click(function(event) {
				alert(event.parentNode.tagName);
		    	removeNote(event);
			});

			try {
				notes.append(li);
			}
			catch(err) {
				alert(err + "Adding the new li to the ul failed.")
			}
		}
		catch(err) {
			alert(err + "Something went south");
		}
			
		
		
	}

	function removeNote(element) {
		alert(element.parentNode.parentNode.tagName);
		element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
	}

	if (count == 0) {
		addNewNote();
	}
});

$(document).unload(function() {
	alert("BYE!");
});