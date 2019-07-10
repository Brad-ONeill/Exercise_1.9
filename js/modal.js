	function showModal() {
		var $modalContainer = document.querySelector('#modal-container');
		$modalContainer.classList.add('is-visible');
	}

	function hideModal() {
		var $modalContainer = document.querySelector('#modal-container');
		$modalContainer.classList.remove('is-visible');
	}

	//modal IFFE
	//	document.querySelector('#modal-button').addEventListener('click', () => {
	//		showModal();
	//	});

	function showModal(title, image, height, pelement) {
		var $modalContainer = document.querySelector('#modal-container');
		$modalContainer.innerHTML = '';

		var modal = document.createElement('div');
		modal.classList.add('modal');

		var closeButtonElement = document.createElement('button');
		closeButtonElement.classList.add('modal-close');
		closeButtonElement.innerHTML = "&times;";
		closeButtonElement.addEventListener('click', hideModal);

		var titleElement = document.createElement('h1');
		titleElement.innerText = title;												//title is an object
		
		var contentImage = document.createElement('img');
		contentImage.src = image;													//image is an object

		var contentHeight = document.createElement('p');
		contentHeight.innerText = 'Height: ' + height + 'm';						// 'string' + [object] + 'string'
		
		var contentElement = document.createElement('p');
		contentElement.innerText = 'Elements: ' + pelement; 						// pelement is an object
		contentElement.innerText = contentElement.innerText.replace(',',', '); 		// replaces ',' in the array with ', ' to add a space

		modal.appendChild(closeButtonElement);
		modal.appendChild(titleElement);
		modal.appendChild(contentImage);
		modal.appendChild(contentHeight);
		modal.appendChild(contentElement);
		$modalContainer.appendChild(modal);

		$modalContainer.classList.add('is-visible');
		
		$modalContainer.addEventListener('click', (e) => {							//listening for an event (click) anywhere on the modalContainer
			var target = e.target;
			console.log(e.target)
			if (target === $modalContainer) {
				hideModal();
			}
		});
	};

	//	document.querySelector('#modal-button').addEventListener('click', () => {
	//		showModal('PokéMon', 'Here is all of the info about your PokéMon');
	//	});

	window.addEventListener('keydown', (e) => {										//listening for an event (ESC) of the browser window
		var $modalContainer = document.querySelector('#modal-container');
		if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
			hideModal();
		}
	});

	
