var pokemonRepository = (function () { //pokemonRepository is the name of the IIFE
	var repo = []; //repo is the name of the array
	var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151'; //specifying maximum limit to call from the API

	function add(pokemon) {
		repo.push(pokemon);
	}

	function getALL() {
		return repo;
	}

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
				var elementTypes = []; //element types are stored as arrays so...
			
				$.each(details.types, function(key, item){ //for each pokemon...
					elementTypes.push(item.type.name) //push the array details into var types...
				})

				return {
					name: details.name,
					imageUrl: details.sprites.front_default,
					height: details.height,
					types: elementTypes
				}
			
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	function showDetails(pokemon) {
		pokemonRepository.loadDetails(pokemon)
			.then(function (poke) {
				showModal(poke.name, poke.imageUrl, poke.height, poke.types)
			})
	}

	function addListItem(entry) {
		
		//Using template literals (``)
		var listItem = `<li class="list-group-item col-6 col-md-4 col-lg-3 col-xl-2">
							<div class="pokedexItem">
									<button class="btn btn-info btn-sm col" data-toggle="modal"
									data-target="#pokeModal"
									data-url="${entry.detailsUrl}">
										${entry.name}
								</button>
							</div>
						</li>`;
		$('.list-group')
			.append(listItem);
	}

	$('.pokeList')
		.on('click', '.infoButton', function () {
			let url = $(this).data('url')
			showDetails(url)
		})

	return {
		add: add,
		getALL: getALL,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails
	};

})();

pokemonRepository.loadList().then(function () {
	$.each(pmon, (key, entry) => {
		pokemonRepository.addListItem(entry);
	});
});

//pmon is the full repository
var pmon = pokemonRepository.getALL();
