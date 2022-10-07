import * as Tone from 'tone'

var button = document.createElement('button')
button.textContent = "Make Sound"
button.addEventListener('click', () => {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease('C4', '8n');
});

document.body.appendChild(button);

