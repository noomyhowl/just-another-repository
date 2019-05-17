
	var blocksContainer;
	var blocks;
	
	function blocksInitialization()
	{
		blocksContainer = document.getElementById("blocks_container_id");
		blocks = blocksContainer.getElementsByClassName("block");
		
		for (var i = 0; i < blocks.length; i++)
		{
			blocks[i].addEventListener("click", newsBlockClickEvent);
		}
	}
	
	function newsBlockClickEvent()
	{
		alert("click");
	}

	
	blocksInitialization();