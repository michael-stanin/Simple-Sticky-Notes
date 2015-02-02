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

	$("#btnNew").on('click', function(event){
		addNewNote();
	});

	$("#btnDel").click(function(event) {
		alert(event.parentNode.tagName);
    	removeNote(event);
	});

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
			
			div.appendChild(img1);
			div.appendChild(img2);
			div.appendChild(titleElement);
			div.appendChild(contentElement);
		
			li.appendChild(div);
			
			$(img1).on('click', function(event){
				//alert("New Clicked!");
				addNewNote();
			});

			$(img2).click(function(event) {
				alert(event.parentNode.tagName);
		    	removeNote(event);
			});

			notes.append(li);
			
		}
		catch(err) {
			alert(err + "Adding new sticky note failed.");
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