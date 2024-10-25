let speech = new SpeechSynthesisUtterance();

let voices = [];
let voiceSelect = document.querySelector("select");


function loadVoices() {
    voices = window.speechSynthesis.getVoices();

   
    console.log("Available voices:", voices);

    
    voiceSelect.innerHTML = "";

 
    let hindiVoices = voices.filter(voice => voice.lang.includes("hi"));
    let otherVoices = voices.filter(voice => !voice.lang.includes("hi"));

    
    hindiVoices.forEach((voice, index) => {
        let option = new Option(`${voice.name} (Hindi)`, `${index}`);
        voiceSelect.appendChild(option);
    });

    
    otherVoices.forEach((voice, index) => {
        let option = new Option(`${voice.name} (${voice.lang})`, `${hindiVoices.length + index}`);
        voiceSelect.appendChild(option);
    });

    
    if (hindiVoices.length > 0) {
        speech.voice = hindiVoices[0];
    } else if (voices.length > 0) {
        speech.voice = voices[0];
    }
}


window.speechSynthesis.onvoiceschanged = () => loadVoices();
setTimeout(loadVoices, 100); 


voiceSelect.addEventListener("change", () => {
    let selectedVoiceIndex = parseInt(voiceSelect.value);
    speech.voice = voices[selectedVoiceIndex];
});


document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});
