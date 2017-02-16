(function(){
	//console.log("working from mainJQ");
	var cooperThumb = document.querySelectorAll(".thumbInfo"),
	cooperHeader = document.querySelector(".modelName"),
	cooperDesc =document.querySelector(".modelDetails"),
	priceInfo =document.querySelector(".priceInfo"),
	httpRequest;

	function makeRequest(){
		//console.log("working from"+this.id);
		httpRequest = new XMLHttpRequest();
		var cooperImg = document.querySelector("#F55");
		var cooperImg2 = document.querySelector("#F56");
		var cooperImg3 = document.querySelector("#R58");
		cooperImg.classList.remove("focusMini");
		cooperImg2.classList.remove("focusMini");
		cooperImg3.classList.remove("focusMini");
	    this.classList.toggle("focusMini");

		if(!httpRequest){
			console.log('please update browser');
			return false;
		}
		httpRequest.onreadystatechange = showCooperInfo;
		httpRequest.open('GET', 'includes/ajaxQuery.php' + '?model=' + this.id);
		httpRequest.send();
	}

	function showCooperInfo(){
		if(httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200){
			var cooperData = JSON.parse(httpRequest.responseText);
			cooperHeader.firstChild.nodeValue = cooperData.modelName;

			[].forEach.call(document.querySelectorAll('.hidden'), function(item){
				item.classList.remove('hidden');
			});

			cooperDesc.firstChild.nodeValue = cooperData.modelDetails;
			priceInfo.firstChild.nodeValue = cooperData.pricing;
		}
	}
			
	[].forEach.call(cooperThumb, function(img) {
		img.addEventListener("click", makeRequest, false);
	});


})();