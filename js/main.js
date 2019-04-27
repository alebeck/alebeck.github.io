// (c) 2019 Alexander Becker

const gh = new GitHub();

let a = gh
	.search()
	.forRepositories({q: 'user:alebeck org:TUM-ML-Lab18'})
	.then(response => {
		let repos = prioritizeProjects(response.data);
		console.log(repos[0]);
		let numberRows = Math.ceil(repos.length / 2);
	
		for (var i = 0; i < numberRows; i++) {
			let div = $('<div/>', {
				class: 'd-flex flex-wrap flex-justify-between pinned-list'
			});
	
			makeProjectTile(repos[i * 2]).appendTo(div);
	
			if (i < numberRows - 1 || repos.length % 2 == 0) {
				makeProjectTile(repos[i * 2 + 1]).appendTo(div);
			} else {
				makeDummyTile().appendTo(div);
			}
	
			$('#project-loader').remove();
			div.appendTo('#project-list');
		}
	})
	.catch(err => {
		console.error(err);
		$('#project-loader').remove();
		$('#loading-failed-indicator').attr(
			'style', 'display: block !important; text-align: center'
		);
	});

function makeProjectTile(repo) {
	let elem = $('#project-template')
		.clone()
		.removeAttr('id')
		.toggle();

	$(".project-title", elem).attr('href', repo.html_url).html(repo.name);
	$(".project-description", elem).html(repo.description);
	$(".language-indicator", elem).css({'background-color': ghColors[repo.language].color});
	$(".project-language", elem).html(repo.language);

	return elem;
}

function makeDummyTile() {
	return $('#project-template')
		.clone()
		.removeAttr('id')
		.addClass('dummy-tile')
		.toggle()
		.css({opacity: '0'});
}

function prioritizeProjects(repos) {
	return repos.sort((a, b) => {
		if (a.language == 'Python' || a.language == 'Jupyter Notebook') {
			return -1;
		}
		return 0;
	});
}