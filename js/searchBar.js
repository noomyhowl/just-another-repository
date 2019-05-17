
	var inputBackground;
	var topMenuInput;
	var topMenuLabel;
	var topMenuInputImage;
	var searchBlock;
	var dataObject;
	
	const searchResultMaxCount = 5;

 	function searchBarInitialization()
	{
		topMenuInput = document.getElementById("top_menu_input");
		topMenuLabel = document.getElementById("top_menu__label");
		topMenuInputImage = document.getElementById("top_menu__input_picture");
		inputBackground = document.getElementById("top_menu_bg");
		searchBlock = document.getElementById("top_menu__search_block");
		dataObject = loadMembers_template("https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json");
		
		topMenuInput.addEventListener("focus", showInputBlackFading);
		inputBackground.addEventListener("click", hideInputBlackFading);
		topMenuInputImage.addEventListener("click", clearInputField);
	}
	
	//generates new random names for data object.
	function generateHeroName()
 	{
 		var rand1 = randomInteger(1, 10);
 		var rand2 = randomInteger(1, 10);
 		var name = "";
 		switch (rand1)
 		{
 			case 1:
 				name += "Almighty";
 				break;
 			case 2:
 				name += "Powerful";
 				break;
 			case 3:
 				name += "Stinky";
 				break;
 			case 4:
 				name += "Silent";
 				break;
 			case 5:
 				name += "Avenging";
 				break;
 			case 6:
 				name += "Green";
 				break;
 			case 7:
 				name += "Quick";
 				break;
 			case 8:
 				name += "Great";
 				break;
 			case 9:
 				name += "Deadeye";
 				break;
 			default:
 				break;
 		}
 		switch (rand2)
 		{
 			case 1:
 				name += " Woman";
 				break;
 			case 2:
 				name += "-Man";
 				break;
 			case 3:
 				name += " Ghost";
 				break;
 			case 4:
 				name += " Rider";
 				break;
 			case 5:
 				name += "-Girl";
 				break;
 			case 6:
 				name += " Daddy";
 				break;
 			case 7:
 				name = "John " + name;
 				break;
 			case 8:
 				name = "Mister " + name;
 				break;
 			case 9:
 				name += " Dragon";
 				break;
 			default:
 				name += " Anon";
 				break;
 		}
 		return name;
 	}

	//clones a single data object, modifying it.
	function addAutochangedDataObject(parentObject)
	{
		var name = generateHeroName();
		var member = {};
		for (var key in parentObject)
			member[key] = parentObject[key];
		member.name = name;
		member.age = randomInteger(16, 1000);
		member.dayOfBirth = randomInteger(1, 30);
		member.monthOfBirth = randomInteger(0, 11);
		dataObject.members.push(member);
	}

	// fills json data object with changed clones of it's original data
	function multiplyDataObject()
	{
		var member1 = dataObject.members[0];
		var member2 = dataObject.members[1];
		var member3 = dataObject.members[2];
		member1.img = "img/face1.png";
		member2.img = "img/face2.png";
		member3.img = "img/face3.png";
		for (var i = 0; i < 100; i++)
		{
			addAutochangedDataObject(member1);
			addAutochangedDataObject(member2);
			addAutochangedDataObject(member3);
		}
	}

	//load data from json object into dataObject variable.
	function loadMembers_template(path)
	{
		var requestURL = path;
		var request = new XMLHttpRequest();
		var value;
		request.open("GET", requestURL);
		request.responseType = "json";
		request.send();
		request.onload = function() {
			dataObject = request.response;
			multiplyDataObject();
			sliderInitialization();
		}
	}

	//checks if dataObject field contains comparing string in .name, .secretIdentity and .age attributes.
	function isDataFieldContainsString(field, str)
	{
		var name = field.name.toLowerCase();
		var identity = field.secretIdentity.toLowerCase();
		var age = parseInt(field.age);
		str = str.toLowerCase();
		if (name.indexOf(str) >= 0)
			return true;
		if (identity.indexOf(str) >= 0)
			return true;
		if (age == parseInt(str))
			return true;
		return false;
	}
	
	function isDataFieldContainsBirthday(field, whichDay, whichMonth)
	{
		var month = parseInt(field.monthOfBirth);
		var day = parseInt(field.dayOfBirth);
		if (whichMonth == month && whichDay == day)
			return true;
		return false;
	}

	//mouse click event for search result items.
	function searchItemClick()
	{
		var id = parseInt(this.id.substring(12, 16));
		alert(dataObject.members[id].name);
	}

	//input event for search input box.
	function checkInput()
	{
		var str = topMenuInput.value;
		var innerHTML = "";
		var counter = 0;
		var items;

		if (str.length > 0)
		{
			topMenuInputImage.style.cursor = "pointer";
			topMenuInputImage.style.backgroundImage = "url(https://image.flaticon.com/icons/png/128/122/122264.png)";
		}
		else
		{
			topMenuInputImage.style.cursor = "";
			topMenuInputImage.style.backgroundImage = "";
		}
		if (str.length >= 2)
		{
			topMenuLabel.style.display = "none";
			searchBlock.style.display = "block";
			for (var i = 0; i < dataObject.members.length; i++)
			{
				if (counter < searchResultMaxCount && isDataFieldContainsString(dataObject.members[i], str))
				{
					innerHTML += '<div class="top_menu__search_item" id="search_item_' + i + '">';
					innerHTML += '<div class="search_item__image"></div>';
					innerHTML += '<div class="search_item__name_field">' + dataObject.members[i].name + '</div>';
					innerHTML += '<div class="search_item__job_field">' + dataObject.members[i].secretIdentity + ', ';
					innerHTML += dataObject.members[i].age + ' years (birthday: ';
					innerHTML += stringMonth[dataObject.members[i].monthOfBirth] + ', ';
					innerHTML += dataObject.members[i].dayOfBirth + '-е)</div></div>' + "\n";
					counter ++;
				}
			}
			searchBlock.innerHTML = innerHTML;
			if (counter > 0)
			{
				items = document.getElementsByClassName("top_menu__search_item");
				for (i = 0; i < items.length; i++)
				{
					items[i].addEventListener("click", searchItemClick);
					items[i].firstChild.style.backgroundImage = "url(" + dataObject.members[parseInt(items[i].id.substring(12, 16))].img + ")";
					items[i].firstChild.style.backgroundSize = "contain";
				}
			}
		}
		else
		{
			topMenuLabel.style.display = "block";
			searchBlock.style.display = "none";	
		}
	}

	//clears search results and input box.
	function clearInputField()
	{
		topMenuInput.value = "";
		searchBlock.innerHTML = "";
	}

	//shows black screen fading, checks for input value.
	function showInputBlackFading()
	{
		inputBackground.style.display = "block";
		checkInput();
		topMenuInput.removeEventListener("focus", showInputBlackFading);
		topMenuInput.addEventListener("input", checkInput);
		
	}
	//hides black screen fading and search results.
	function hideInputBlackFading()
	{
		inputBackground.style.display = "none";
		searchBlock.style.display = "none";
		topMenuInput.addEventListener("focus", showInputBlackFading);
		topMenuInput.removeEventListener("blur", hideInputBlackFading);
		topMenuInput.removeEventListener("input", checkInput);
	}
	
	searchBarInitialization();