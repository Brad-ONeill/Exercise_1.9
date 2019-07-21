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

function showModal(title, image, height, etypes) {

	var $modalContainer = $('#modal-container')
		.empty();

	var modal = `<div class="modal">
						<h1>${title}</h1>
						<button id="modal-close" class="modal-close">&times;</button>
						<img src="${image}">
						<p>Height: ${height}m</p>
						<p>Type: ${etypes}</p>
					</div>`;

	//		var $contentElement = $('<p></p>')
	//			.text(('Elements: ' + etypes)
	//				.replace(',', ', '))
	//			.appendTo(modal);

	$modalContainer.append(modal);

	$modalContainer.addClass('is-visible');

	$('#modal-close')
		.on('click', function () {
			hideModal();

		});
	
	$modalContainer.on('click', (e) => {
		var target = e.target;
		console.log(e.target)
		if (target === $modalContainer) {
			hideModal();
		}
	});

	//	$modalContainer.on('click', (e) => {
	//		var target = e.target;
	//		console.log(e.target)
	//		if (target === $modalContainer) {
	//			hideModal();
	//		}
	//	});
};


$(window).on('keydown', (e) => {
	var $modalContainer = $('#modal-container');
	if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
		hideModal();
	}
});
