/*const recordBtn= document.querySelector(".record"),
    result = document.querySelector(".result"),
    downloadBtn = document.querySelector(".download"),
    languagesSelect = document.querySelector("#Language"),
    clearBtn = document.querySelector(".clear");

    function populateLanguages() {
        languages.forEach((lang) => {
            const option = document.createElement("option");
            option.value = lang.code;
            option.textContent = lang.name;
            languagesSelect.appendChild(option);
        });
    }

    populateLanguages();

    let speechRecognition = 
           window.SpeechRecognition || window.webkitSpeechRecognition,
      recognition,
      recording = false;

      function speechToText() {
        try {
            recognition = new speechRecognition();
            recognition.lang = languagesSelect.value;
            recognition.interimResults = true;

                    recordBtn.classList.add("recording");
                    recordBtn.querySelector("p").innerHTML = "listening...";
                    recognition.start();
                    recognition.onresult = (event) => {
                        const speechResult = event.result[0][0].transcript;
                        // if result is interim show in p else as it is in result
                        if (event.result[0].isFinal) {
                            result.innerHTML += " " + speechResult;
                            result.querySelector("p").remove();
                        } else {
                            //interim not exist create one
                            if (!document.querySelector(".interim")) {
                                const interim = document.createElement("p");
                                interim.classList.add("interim");
                                result.appendChild(interim);
                            }
                            //after that chane innner html
                            document.querySelector(".interim").innerHTML = " " + speechResult;
                        }
                        //something is written in result lets enable download btn
                        downloadBtn.disabled = false;
               };
               recognition.onspeechend = () => {
                //on speech end again call the function to continously listen
                speechToText();
               };
        } catch(error) {
            recording = false;
            console.log(error);
        }
      }
recordBtn.addEventListener("click", ()=> {
    //if already recording stop if not start recording
    if (!recording) {
        speechToText();
        recording = true;
    } else {
        stopRecording();
    }
});

function stopRecording() {
    recognition.stop();
    recordBtn.querySelector("p").innerHTML = "Start listening";
    recordBtn.classList.remove("recording");
    recording = false;
}

function download() {
    const text = result.innerHTML;
    const filename= "speech.txt";
    
    const element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

downloadBtn.addEventListener("click", download);

clearBtn.addEventListener("click", () => {
    result.innerHTML = "";
    downloadBtn.disabled = true;
});*/

const recordBtn = document.querySelector(".record"),
    result = document.querySelector(".result"),
    downloadBtn = document.querySelector(".download"),
    languagesSelect = document.querySelector("#Language"),
    clearBtn = document.querySelector(".clear");


function populateLanguages() {
    languages.forEach((lang) => {
        const option = document.createElement("option");
        option.value = lang.code;
        option.textContent = lang.name;
        languagesSelect.appendChild(option);
    });
}

populateLanguages();

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
let recording = false;

function speechToText() {
    try {
        recognition = new speechRecognition();
        recognition.lang = languagesSelect.value || "fr-FR";
        recognition.interimResults = true;

        recordBtn.classList.add("recording");
        recordBtn.querySelector("p").innerHTML = "Listening...";
        recognition.start();

        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript;

            if (event.results[0].isFinal) {
                result.innerHTML += " " + speechResult;
                document.querySelector(".interim")?.remove();
            } else {
                if (!document.querySelector(".interim")) {
                    const interim = document.createElement("p");
                    interim.classList.add("interim");
                    result.appendChild(interim);
                }
                document.querySelector(".interim").innerHTML = " " + speechResult;
            }
            downloadBtn.disabled = false;
        };

        recognition.onspeechend = () => {
            recognition.stop();
            recordBtn.querySelector("p").innerHTML = "Start listening";
            recordBtn.classList.remove("recording");
            recording = false;
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            stopRecording();
        };

    } catch (error) {
        console.error("Error initializing speech recognition:", error);
        recording = false;
    }
}

recordBtn.addEventListener("click", () => {
    if (!recording) {
        speechToText();
        recording = true;
    } else {
        stopRecording();
    }
});

function stopRecording() {
    if (recognition) {
        recognition.stop();
    }
    recordBtn.querySelector("p").innerHTML = "Start listening";
    recordBtn.classList.remove("recording");
    recording = false;
}

function download() {
    const text = result.innerHTML;
    const filename = "speech.txt";
    
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

downloadBtn.addEventListener("click", download);

clearBtn.addEventListener("click", () => {
    result.innerHTML = "";
    downloadBtn.disabled = true;
});



