
	function main()
	{
		
	}
	//returns random integer between "min" and "max".
	function randomInteger(min, max) 
	{
    	var rand = min + Math.random() * (max + 1 - min);
    	rand = Math.floor(rand);
    	return rand;
 	}

	// returns array index for "item" in "array". 
	// -1 if items is not in the array.
	function getChildIndex(item, array)
	{
		for (var i = 0; i < array.length; i++)
		{
			if (item == array[i])
			{
				return i;
			}
		}
		return -1;
	}

	main();
	
