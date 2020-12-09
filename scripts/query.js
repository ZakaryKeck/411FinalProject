function submitQuery() {
    var register = parseInt(document.getElementById("Register").value);
    var mode = parseInt(document.getElementById("Mode").value);
    var tempo = parseInt(document.getElementById("Tempo").value);
    var soundlevel = parseInt(document.getElementById("Soundlevel").value);
    var articulation = parseInt(document.getElementById("Articulation").value);
    var timbre = parseInt(document.getElementById("Timbre").value);
    var melody = parseInt(document.getElementById("Melody").value);
    var scary = parseInt(document.getElementById("Scary").value);
    var happy = parseInt(document.getElementById("Happy").value);
    var sad = parseInt(document.getElementById("Sad").value);
    var peaceful = parseInt(document.getElementById("Peaceful").value);
    var range = parseInt(document.getElementById("Range").value);

    var registerCheck = document.getElementById("RegisterCheck").checked;
    var modeCheck = document.getElementById("ModeCheck").checked;
    var tempoCheck = document.getElementById("TempoCheck").checked;
    var soundlevelCheck = document.getElementById("SoundlevelCheck").checked;
    var articulationCheck = document.getElementById("ArticulationCheck").checked;
    var timbreCheck = document.getElementById("TimbreCheck").checked;
    var melodyCheck = document.getElementById("MelodyCheck").checked;
    var scaryCheck = document.getElementById("ScaryCheck").checked;
    var happyCheck = document.getElementById("HappyCheck").checked;
    var sadCheck = document.getElementById("SadCheck").checked;
    var peacefulCheck = document.getElementById("PeacefulCheck").checked;

    var filters = {
        "attributes": [
            { "value": register, "checked": registerCheck },
            { "value": mode, "checked": modeCheck },
            { "value": tempo, "checked": tempoCheck },
            { "value": soundlevel, "checked": soundlevelCheck },
            { "value": articulation, "checked": articulationCheck },
            { "value": timbre, "checked": timbreCheck },
            { "value": melody, "checked": melodyCheck }
        ],
        "emotions": [
            { "value": scary, "checked": scaryCheck },
            { "value": happy, "checked": happyCheck },
            { "value": sad, "checked": sadCheck },
            { "value": peaceful, "checked": peacefulCheck }
        ]
    }

    var filteredItems = query(filters, range);

    if (filteredItems.length == 0) {
        const remover = document.getElementById('results');
        while (remover.hasChildNodes()) {
            remover.removeChild(remover.lastChild);
        }
        const text_div = document.createElement('div');
        text_div.innerHTML = 'No Results Found';
        document.getElementById('results').appendChild(text_div);
    }
    else {
        wav_addition(filteredItems);
    }

}

function query(filters, range) {
    items = [];
    let canAdd = true;

    for (let i = 0; i < attributes.length - 1; i++) { //each file
        canAdd = true;
        for (let j = 0; j < filters["attributes"].length && canAdd; j++) { //each filter
            if (filters["attributes"][j]["checked"]) {
                if (Math.abs(attributes[i][j]["value"] - filters["attributes"][j]["value"]) >= range) {
                    canAdd = false;
                }
            }
        }

        for (let j = 0; j < filters["emotions"].length && canAdd; j++) {
            if (filters["emotions"][j]["checked"]) {
                if (Math.abs(emotions[i][j]["value"] - filters["emotions"][j]["value"]) >= range) {
                    canAdd = false;
                }
            }
        }

        if (canAdd == true) items.push(i + 1);
    }

    return items;
}
