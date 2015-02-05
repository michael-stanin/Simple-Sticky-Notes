"use strict";

var notes;
var count = 0;

$(document).ready(function() {
	notes = $("#notes"); // get references to the 'notes' list
	
	try {
		var storedNotes = localStorage.getItem("notes");
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

	$(window).on("beforeunload", function() {
		saveNotes();
	});

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
			div.appendChild(img2);
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
			//$(img2).click();
		}
		catch(err) {
			alert(err + "Adding new sticky note failed.");
		}
	}

	function removeNote(element) {
		element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
	}

	if (count == 0) {
		addNewNote();
	}
});

function saveNotes() {
	var notesArray = [];

	notes.find("li > div").each(function(i, e) {
		var colourClass = $(e).attr("class");
		var title = $(e).find("textarea.note-title");
		var content = $(e).find("textarea.note-content");

		notesArray.push({Index: i, Title: title.val(), Content: content.val(), Class: colourClass});
	});

	var jsonStr = JSON.stringify(notesArray);

	localStorage.setItem("notes", jsonStr);
}
