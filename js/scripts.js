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
				console.log(result.results)
				result.results.forEach(function (item) {
					var pokemon = {
						name: item.name,
						detailsUrl: item.url
					};

					add(pokemon);
				});

			});
	}



	//	.then(function (json) {(function (item) {
	//	var pokemon = {
	//						name: item.name,
	//						detailsUrl: item.url
	//					};;


	/*$.ajax({
		url: apiUrl,
		success:function(result){
			console.log(result)}
	})*/

	/*function loadList() {
		return fetch(apiUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (json) {
				
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
	*/

	function loadDetails(item) {
		var url = item.detailsUrl;

		return fetch(url).then(function (response) {
			return response.json();
		}).then(function (details) {
			item.imageUrl = details.sprites.front_default;
			item.height = details.height;
			var types = []; //element types are stored as arrays so...

			details.types.forEach(function (item) { //for each pokemon...
				types.push(item.type.name) //push the array details into var types...
			});

			item.types = types //then identify the array as [object].type to be called on line 52

		}).catch(function (e) {
			console.error(e);
		});
	}

	//-----
	function showDetails(pokemon) {
		//loads the details (line 29) of the pokemon that was clicked THEN...
		pokemonRepository.loadDetails(pokemon).then(function () {
			//calls [displays] the modal and populates it with the name, image, height and types
			showModal(pokemon.name, pokemon.imageUrl, pokemon.height, pokemon.types)
		})
	}

	//-----
	function addListItem(entry) {
		console.log(entry)
		var $ul = $('.pokeList');

		var $li = `<li class="pokedexItem"><button class="infoButton">${entry.name}</button></li>`;
		$('ul').append($li);

		//button
		//		var $info_button = $('<button class="infoButton">')
		//			.attr('id', "modal-button")
		//			.html(entry.name);

		//		$('li').each(function () {
		//			$(this).append($info_button);
		//
		//			//Error here somewhere...
		//			$('.infoButton')
		//				.on('click', function () {
		//					showDetails(entry);
		//				});
		//		});
		$('ul').on('click', '.infoButton', function () {
			showDetails(entry)
		})
	}


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
