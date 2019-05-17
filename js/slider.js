	
	var sliderButtonLeft;
	var sliderButtonRight;
	var sliderContainer;
	var sliderItems;
	var sliderItemsCount;
	var sliderOffset = 0;
	const sliderOffsetPower = 1;
	const sliderItemWidth = 280;
	
	var weekDay = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
	var stringMonth = ["январь","февраль","март", "апрель", "май", "июнь", "июль", "авгут", "сентябрь", "октябрь", "ноябрь", "декабрь"];
	
	function sliderInitialization()
	{
		createDateTable();
		
		sliderButtonLeft = document.getElementById("slider__button_left");
		sliderButtonRight = document.getElementById("slider__button_right");
		sliderContainer = document.getElementById("slider__container");
		sliderItems = sliderContainer.getElementsByClassName("calendar_block");
		sliderItemsCount = sliderItems.length;
		
		sliderButtonLeft.addEventListener("click", sliderLeftEvent);
		sliderButtonRight.addEventListener("click", sliderRightEvent);
		disableSliderButton(sliderButtonLeft);

		for (var i = 0; i < sliderItemsCount; i++)
		{
			sliderItems[i].addEventListener("click", sliderItemClickEvent);
		}
	}
	
	//mouse click event for slider item.
	function sliderItemClickEvent()
	{
		//alert("Slider item was clicked");
	}

	//moves single slider item with absolute offset.
	function moveItemsInSlider(offset)
	{
		for (var i = 0; i < sliderItemsCount; i++)
		{
			sliderItems[i].style.transform = "translateX(-" + offset + "px)";
		}
	}

	//disables (hides) slider button.
	function disableSliderButton(whichButton)
	{
		whichButton.style.display = "none";
	}
	//enables (shows) slider button.
	function enableSliderButton(whichButton)
	{
		whichButton.style.display = "block";
		whichButton.style.zIndex = "1";
	}

	//mouse click event for slider button "Right".
	function sliderRightEvent()
	{
		var itemsInRow = Math.round(sliderContainer.clientWidth / sliderItemWidth);
		var maximalAmount = Math.abs(sliderContainer.clientWidth - sliderItemsCount * sliderItemWidth);
		if (maximalAmount > sliderOffset)
		{
			if (sliderOffset + sliderItemWidth * sliderOffsetPower > maximalAmount)
				sliderOffset = maximalAmount;
			else
				sliderOffset += sliderItemWidth * sliderOffsetPower;
			moveItemsInSlider(sliderOffset);
		}
		enableSliderButton(sliderButtonLeft);
		if (maximalAmount <= sliderOffset)
			disableSliderButton(sliderButtonRight);
	}

	//mouse click event for slider button "Left".
	function sliderLeftEvent()
	{
		if (sliderOffset > 0)
		{
			if (sliderOffset - sliderItemWidth * sliderOffsetPower > 0)
				sliderOffset -= sliderItemWidth * sliderOffsetPower;
			else
				sliderOffset = 0;
			moveItemsInSlider(sliderOffset);
		}
		enableSliderButton(sliderButtonRight);
		if (sliderOffset <= 0)
			disableSliderButton(sliderButtonLeft);
	}
	
	
	function createDateTable()
	{
		var str = "";
		var tmpDate = new Date();
		tmpDate.setDate(tmpDate.getDate());
		for (var i = 0; i <= 9; i++) // (tmpDate.getMonth() == month) 
		{
			if ((getDay(tmpDate) % 7 == 6) || (getDay(tmpDate) % 7 == 5))
				str += getStringHTML_DateItem(tmpDate, "holiday");
			else
				str += getStringHTML_DateItem(tmpDate, "");
			tmpDate.setDate(tmpDate.getDate() + 1);
		}
		slider__container.innerHTML = str;
	}
	
	//itemType: disabled, simple, holiday, current
	function getStringHTML_DateItem(date, itemType)
	{
		var listOfNames = getListOfNames(date);
		var str = '<span class="calendar_block">';
		itemType = itemType.toLowerCase();
		if (itemType != "holiday")
			itemType = "";
		str += '<span class="calendar_block__date ' + itemType + '">' + date.getDate() + '</span>';
		str += '<span class="calendar_block__day ' + itemType + '">' + weekDay[date.getDay()] + '</span>';
		
		str += listOfNames;
		str += '</span>';
		return str;
	}
	
	function getListOfNames(date)
	{
		var str = "";
		var day = date.getDate();
		var month = date.getMonth();
		var names = [];
		
		for (var i = 0; i < dataObject.members.length; i++)
			{
				if (isDataFieldContainsBirthday(dataObject.members[i], day, month))
				{
					names.push(dataObject.members[i].name);
				}
			}
		
		
		for (var i = 0; i < names.length; i++)
		{
			str += '<span class="calendar_block__icon"></span>';
			str += '<span class="calendar_block__name">';
			str += '<a href="https://www.google.com">' + names[i] + '</a> </span>';
		}
		return str;
	}
	
	function getDay(whichDate) 
	{
		var day = whichDate.getDay();
		if (day == 0)
			day = 7;
		return day - 1;
	}
	
	//sliderInitialization();