var pokemonRepository = (function () { //pokemonRepository is the name of the IIFE
	var repo = []; //repo is the name of the array
	var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151'; //specifying maximum limit to call from the API

	function add(pokemon) {
		repo.push(pokemon);
	}

	function getALL() {
		return repo;
	}

	//Working jQuery--
	function loadList() {
		return $.ajax(apiUrl)
			.then(function (result) {
				result.results.forEach(function (item) {
					var pokemon = {
						name: item.name,
						detailsUrl: item.url						
					};
					
					add(pokemon);
				});
			});
	}

	function loadDetails(item) {
		
		var url = item;
		
		return $.ajax(url)
			.then(function (details) {
				return {
					name: details.name,
					imageUrl: details.sprites.front_default,
					height: details.height,
					//types: details.types
				}
			
			})
			.catch(function (e) {
				console.error(e);
			});
	}
	//End---
	
	//Working--
	function showDetails(pokemon) {
		pokemonRepository.loadDetails(pokemon)
			.then(function (poke) {
				showModal(poke.name, poke.imageUrl, poke.height, poke.types)
			})
	}
	//---

	//Working jQuery--
	function addListItem(entry) {
		var $ul = $('.pokeList');

		//Using template literals (``)
		var $li = `<li class="pokedexItem"> 
						<button class="infoButton" data-url="${entry.detailsUrl}">
							${entry.name}
						</button>
				</li>`;
		$('ul')
			.append($li);
	}

	$('ul')
		.on('click', '.infoButton', function () {
			let url = $(this).data('url')
			showDetails(url)
		})

	//End---
	return {
		add: add,
		getALL: getALL,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails
	};

})();

pokemonRepository.loadList().then(function () {
	pmon.forEach(function (entry) {
		pokemonRepository.addListItem(entry);
	});
});

//pmon is the full repository
var pmon = pokemonRepository.getALL();

//writes all the pokemon to the console
console.log(pmon);
