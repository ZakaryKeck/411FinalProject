function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function get_wav(id) {
	const wav_div = document.createElement('div');

	const sound = document.createElement('audio');
	sound.controls = 'controls';
	sound.src = 'data/test-stimuli-200-2009-05-29/' + pad(id, 3) + '.wav';
	sound.type = 'audio/wav';

	wav_div.appendChild(sound);

	document.getElementById('wavs').appendChild(wav_div);
}

function wav_addition(matches) {
	const remover = document.getElementById('results');
	while (remover.hasChildNodes()) {
		remover.removeChild(remover.lastChild);
	}
	buttons = [];
	for (i of matches) {
		const text_div = document.createElement('div');

		const text_button = document.createElement('button');
		text_button.innerHTML = 'Sound File #' + pad(i, 3);
		text_button.style = 'margin: 5px';
		text_button.id = 'button' + i;

		text_div.appendChild(text_button);
		buttons.push(text_button);

		document.getElementById('results').appendChild(text_div);
	}
	for (current of buttons) {
		const number = current.innerHTML.split("#")[1];
		current.onclick = function () {
			buildSelected(parseInt(number)-1);
			const wav_div = document.createElement('div');

			const words = document.createElement('div');
			words.innerHTML = 'Audio file for #' + number + ':';

			const sound = document.createElement('audio');
			sound.controls = 'controls';
			sound.src = 'data/test-stimuli-200-2009-05-29/' + number + '.wav';
			sound.type = 'audio/wav';

			wav_div.appendChild(words);
			wav_div.appendChild(sound);

			while (document.getElementById('wavs').hasChildNodes()) {
				document.getElementById('wavs').removeChild(document.getElementById('wavs').lastChild);
			};
			document.getElementById('wavs').appendChild(wav_div);

			makeGraph(parseInt(number) - 1, "#attributeChart", attributes);
			makeGraph(parseInt(number) - 1, "#emotionChart", emotions);
		};
	}
};

function buildSelected(wav_id){
	const attribute = attributes[wav_id];
	const emotion = emotions[wav_id];

	document.getElementById("register").innerHTML = "Register: " + attribute[0]["value"];
    document.getElementById("mode").innerHTML = "Mode: " + attribute[1]["value"];
    document.getElementById("tempo").innerHTML = "Tempo: " + attribute[2]["value"];
    document.getElementById("soundlevel").innerHTML = "Soundlevel: " + attribute[3]["value"];
    document.getElementById("articulation").innerHTML = "Articulation: " + attribute[4]["value"];
    document.getElementById("timbre").innerHTML = "Timbre: " + attribute[5]["value"];
    document.getElementById("melody").innerHTML = "Melody: " + attribute[6]["value"];
    document.getElementById("scary").innerHTML = "Scary: " + emotion[0]["value"];
    document.getElementById("happy").innerHTML = "Happy: " + emotion[1]["value"];
    document.getElementById("sad").innerHTML = "Sad: " + emotion[2]["value"];
    document.getElementById("peaceful").innerHTML = "Peaceful: " + emotion[3]["value"];

}
