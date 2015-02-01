var $ = function (selector) {
	return document.querySelector(selector);
}

var user_notes = [];

if(typeof(Storage) !== "undefined") {
	Storage.prototype.setObject = function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
	}

	Storage.prototype.getObject = function(key) {
		return JSON.parse(localStorage.getItem(key));
	}
}
else {
	alert("It all went south...");
}


function addListeners() {
	notes = document.getElementById('notes');
			
	var storedNotes = localStorage.getObject('notes');
	if (storedNotes) {
		var count = storedNotes.length;
		
		for (var i = 0; i < count; i++) {
			var storedNote = notesArray[i];
			addNewNote(storedNote.Class, storedNote.Title, storedNote.Content);
		}
	}
	if (window.addEventListener) {
		document.addEventListener('click', handleEvent, false);
	}
	else if (window.attachEvent) { // Added For Internet Explorer previous to IE9
		document.attachEvent("onclick", handleEvent);
	}
	
	function handleEvent(event) {
		event = event || window.event;
		element = event.target || event.srcElement;
		
		if (element.getAttribute('id') === 'btnNew') {
			addNewNote();
		}
		else if (element.getAttribute('id') === 'btnDel') {
			removeNote(element);
		}
		else if (element.getAttribute('id') === 'save') {
			var notesArray = new Array();
			
			var divs = document.getElementsByTagName("div");
			
			for (var i = 0; i < divs.length; i++) {
				var currentDiv = divs[i];
				var divChildren = currentDiv.childNodes;
				var colorClass = currentDiv.getAttribute('class');
				//alert(divChildren[2]));
				var title = divChildren[2];
				var content = divChildren[3];
				notesArray.push({Title: title, Content: content, Class: colorClass});
			}
			var notesObject = {};
			notesObject.notes = notesArray;
			var jsonStr = JSON.stringify(notesArray);
			localStorage.setItem("notes", jsonStr);
			alert("Notes saved");
		}
	}
	
	function addNewNote(colorClass, title, content) {
		notes = document.getElementById('notes');
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
		
		notes.appendChild(li);
	}
	
	function removeNote(element) {
		element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
	}
}

window.onload = addListeners;



