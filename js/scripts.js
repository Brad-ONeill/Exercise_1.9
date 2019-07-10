var pokemonRepository = (function () {								//pokemonRepository is the name of the IIFE
	var repo = [];													//repo is the name of the array
	var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';	//specifying maximum limit to call from the API

	function add(pokemon) {
		repo.push(pokemon);
	}

	function getALL() {
		return repo;
	}

	function loadList() {
		return fetch(apiUrl).then(function (response) {
			return response.json();
		}).then(function (json) {
			json.results.forEach(function (item) {
				var pokemon = {
					name: item.name,
					detailsUrl: item.url
				};
				add(pokemon);
			});
		}).catch(function (e) {
			console.error(e);
		});
	}

	function loadDetails(item) {
		var url = item.detailsUrl;

		return fetch(url).then(function (response) {
			return response.json();
		}).then(function (details) {
			item.imageUrl = details.sprites.front_default;
			item.height = details.height;
			var types = [];											//element types are stored as arrays so...
			
			details.types.forEach(function(item) {					//for each pokemon...
				types.push(item.type.name)							//push the array details into var types...
			});
			
			item.types = types										//then identify the array as [object].type to be called on line 52
			
		}).catch(function (e) {
			console.error(e);
		});
	}
	
	function showDetails(pokemon) { 
		//loads the details (line 29) of the pokemon that was clicked THEN...
		pokemonRepository.loadDetails(pokemon).then(function(){ 							
			//calls [displays] the modal and populates it with the name, image, height and types
			showModal(pokemon.name, pokemon.imageUrl, pokemon.height, pokemon.types)
		})
	}
	
	function addListItem(entry) {									//this is the function used to create the list
		
		//creates a li HTML element
		var $li = document.createElement('li');
		$li.classList.add('pokedexItem');							//assigns class pokdesItem to the li element
	
		//creates a ul HTML element
		var $ul = document.querySelector('ul');
		$ul.appendChild($li);										//attaches ul element to li element created above
		
		//creates a button HTML element
		var $info_button = document.createElement('button');
		$info_button.classList.add('infoButton');					//assigns the class "infoButton" to the element
		$info_button.setAttribute('id', "modal-button");			//assigns the id "modal-button" to the element
		$info_button.innerHTML = entry.name;						//populate the button with the name of the pokemon fro the array
		$li.appendChild($info_button);								//attaches the button to the li HTML element

		//event listener
		$info_button.addEventListener('click', function (event) { 	//if the user clicks the button...
			showDetails(entry);										//show the details of that entry [pokemon]
		});

	}

	//function returns
	return {
		add: add,
		getALL: getALL,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails
	};

})();

pokemonRepository.loadList().then(function () {						//loads the full list of pokemon from the API
	// Now the data is loaded!
	pmon.forEach(function (entry) {									//for each entry in the array...
		pokemonRepository.addListItem(entry);						//create a list item (line 58) until specified limit (line 3) is reached
	});
});

//pmon is the full repository
var pmon = pokemonRepository.getALL();

//writes all the pokemon to the console
console.log(pmon);
