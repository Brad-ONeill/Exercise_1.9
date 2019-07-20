	function showModal() {
		var $modalContainer = $('#modal-container')
			.addClass('is-visible');
	}

	function hideModal() {
		var $modalContainer = $('#modal-container')
			.removeClass('is-visible');
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

		//working
		var $titleElement = $('<h1></h1>')
			.text(title)
			.appendTo(modal);

		var $closeButton = $('<button>')
			.attr('id', "modal-close")
			.html('&times')
			.on('click', function () {
				hideModal();
			});
		$closeButton.addClass('modal-close')
			.appendTo(modal)

		var $contentImage = $('<img>')
			.attr('src', image)
			.appendTo(modal);


		var $contentHeight = $('<p></p>')
			.text('height: ' + height + 'm')
			.appendTo(modal);

		var $contentElement = $('<p></p>')
			.text(('Elements: ' + pelement)
				.replace(',', ', '))
			.appendTo(modal);
		//--

		$modalContainer.appendChild(modal);

		$modalContainer.classList.add('is-visible');

		$modalContainer.addEventListener('click', (e) => {
			var target = e.target;
			console.log(e.target)
			if (target === $modalContainer) {
				hideModal();
			}
		});
	};

	window.addEventListener('keydown', (e) => { //listening for an event (ESC) of the browser window
		var $modalContainer = document.querySelector('#modal-container');
		if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
			hideModal();
		}
	});
