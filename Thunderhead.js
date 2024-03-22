// Selecting DOM elements using querySelector method
const btn = document.querySelector('.glowing-btn');
const content = document.querySelector('.content');

//responses for Youtube, Google and weather, when Thunderhead recieves an input audio which has one of these three words included (Youtube, Google, Weather)
const YouTube = ['Opening YouTube'];

const Google = ['Opening Google'];

const Weather = ['Here is the weather'];

// creates a reference to the webkitSpeechRecognition object, which is part of the Web Speech API
const SpeechRecognition = window.webkitSpeechRecognition;
// initializes a new instance of the SpeechRecognition object. It creates a new recognition instance that you can use to listen for speech and respond to recognized speech
const recognition =  new SpeechRecognition();



// Adding a click event listener to the button to start speech recognition
btn.addEventListener('click', function() {
    recognition.start();
    }
);

// Event handler when speech recognition starts
recognition.onstart = function() {
    console.log('How Can I Help?')
};


// Event handler when speech recognition has a result
recognition.onresult = function (event) {

    // gets the index of the current result
    const current = event.resultIndex;

    // gets the transcribed speech from the event, the '0' access the first value
    const transcript = event.results[current][0].transcript;

    // Updating the content element with the transcribed speech, which is seen on the bottom right, and then the readOutLoud function reads whatever is written in the bottom right
    content.textContent = transcript;

    // Calling the function to process and respond to the transcribed speech
    readOutLoud(transcript);

};


// Function to handle the response based on the transcribed speech
function readOutLoud(message){
    // Creating a SpeechSynthesisUtterance object
    const speech = new SpeechSynthesisUtterance();

    // if no transcribed text matches predefined response then this is the default respnose
    speech.text = 'I couldnt understand';                                                           
    // Checking if the transcribed speech includes keywords for YouTube, Google, or weather
    if(message.includes('YouTube')){

        // 1. Math.Random(): needs to generates a decimal number from 0 and 1
        // 2, YouTube.length: then multiplies the random decimal by the number of items in the YouTube array
        // 3. Math.floor(): then rounds down result to the nearest whole number, making sure it's a valid index
        // 4. basically randomly selects an item from the YouTube array and assigns it to the variable finalText.
        const finalText = YouTube[Math.floor(Math.random()*YouTube.length)];
            speech.text = finalText; 
            window.open('https://www.youtube.com/')
    }
    if (message.includes('Google')) {
        const finalText = Google[Math.floor(Math.random() * Google.length)];
        speech.text = finalText;
        window.open('https://www.google.com/');
    }
    if (message.includes('weather')) {
        const finalText = Weather[Math.floor(Math.random() * Google.length)];
        speech.text = finalText;
        window.open('https://www.google.com/search?q=weather&rlz=1C1CHBF_enCA954CA954&oq=weather&gs_lcrp=EgZjaHJvbWUqDwgAEEUYOxiDARixAxiABDIPCAAQRRg7GIMBGLEDGIAEMgYIARBFGEAyDAgCECMYJxidAhiKBTIJCAMQIxgnGIoFMg0IBBAAGIMBGLEDGIAEMhYIBRAuGIMBGMcBGLEDGMkDGNEDGIAEMgoIBhAAGJIDGIoFMgYIBxBFGD3SAQc5MjRqMWo3qAIAsAIA&sourceid=chrome&ie=UTF-8');
    }
    speech.volume = 1;
    speech.rate = 1.0;
    speech.pitch = 1;


    // Using the Speech Synthesis API to speak the response
    window.speechSynthesis.speak(speech);
}