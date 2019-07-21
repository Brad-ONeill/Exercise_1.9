function showModal() {
	$('#modal-container')
		.addClass('is-visible');
}

function hideModal() {
	$('#modal-container')
		.removeClass('is-visible');
}

function showModal(title, image, height, elements) {

	var modalContainer = $('#modal-container')
		.empty();

	var modal = `<div class="modal">
						<h1>${title}</h1>
						<button id="modal-close" class="modal-close">&times;</button>
						<img src="${image}">
						<p>Height: ${height}m</p>
						<p>Type: ${elements.toString().replace(',',', ')}</p>
					</div>`;

	modalContainer.append(modal);

	modalContainer.addClass('is-visible');

	$('#modal-close')
		.on('click', () => {
			hideModal();
		});
	
	
	$('#modal-container').on('click', (e) => {
		var target = e.target;
		if (target.id === 'modal-container') {
			hideModal();
		}
	});
};


$(window).on('keydown', (e) => {
	if (e.key === 'Escape' && $('#modal-container').hasClass('is-visible')) {
		hideModal();
	}
});
