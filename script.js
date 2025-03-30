
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const btn = document.querySelector("#listen-btn");
let isListening = false;
let lastCommand = "";
const audio = new Audio();

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    window.speechSynthesis.speak(utterance);
}

function playSong(audioFile) {
    audio.src = audioFile;
    audio.play();
}

function stopSong() {
    audio.pause();
    audio.currentTime = 0;
}

function handleCommand(command) {
    if (command === lastCommand) return;
    lastCommand = command;
    console.log("Recognized Command:", command);

    const commands = {
        "open youtube": "https://www.youtube.com",
        "open yt": "https://www.youtube.com",
        "open google": "https://www.google.com",
        "open facebook": "https://www.facebook.com",
        "open linkedin": "https://www.linkedin.com",
        "open whatsapp": "https://www.whatsapp.com",
        "open playstore": "https://www.playstore.com",
    };

    for (const key in commands) {
        if (command.includes(key)) {
            stopSong();
            speak(`${key.split(" ")[1]} खोल रहा हूँ...`);
            window.open(commands[key], "_blank");
            return;
        }
    }

    const responses = {
        "what is your name": "मेरा नाम भारत है। मुझे उज्जवल tiwari ने बनाया है।",
        "tell me your name": "मेरा नाम भारत है। मुझे उज्जवल tiwari ने बनाया है।",
        "what is react": "React JS एक जावास्क्रिप्ट लाइब्रेरी है जो यूजर इंटरफेस बनाने में उपयोग होती है। React is a JavaScript library developed by Facebook (now Meta) for building user interfaces (UI), especially for single-page applications (SPAs). It helps developers create interactive and dynamic web applications by using a component-based architecture.",
        "what is JS": "JavaScript is a high-level, interpreted programming language primarily used to make web pages interactive. It works alongside HTML (structure) and CSS (style) to create dynamic and engaging websites. It runs directly in the browser and is widely used for frontend, backend, and even mobile app development.",
        // "explain blockchain": "Blockchain एक decentralized डिजिटल लेजर है जो डेटा को सुरक्षित और पारदर्शी तरीके से स्टोर करता है।",
        "who is director of iit patna": "Doctor T.N. सिंह, डायरेक्टर ऑफ आईआईटी पटना ",
        "what is cryptography": "Cryptography is a method of protecting information by converting it into a code that can only be read by people with the correct key or password",
        "what is blockchain": "Blockchain एक decentralized डिजिटल लेजर है जो डेटा को सुरक्षित और पारदर्शी तरीके से स्टोर करता है। Blockchain is a decentralized and distributed digital ledger technology that securely records transactions across a network of computers. It is the backbone of cryptocurrencies like Bitcoin and Ethereum but has many other applications beyond digital currencies. ",
        "who is the tiwari": "Ujjawal Tiwari is a student pursuing bacholr's in Computer Science at IIT Patna,currently in the 2nd semester. He is passionate about web development and blockchain technology.He is learning Solidity and React, aiming to build a Voting System project. Additionally, he has created the frontend of a food delivery website and is working on a voice assistant named Bharat, which respondsto voice commands in Hindi. He is also developing a personal web development portfolio.  उज्जवल तिवारी IIT पटना में कंप्यूटर साइंस  में बैचलर की डिग्री कर रहे हैं और वर्तमान में दूसरे सेमेस्टर में हैं। उन्हें वेब डेवलपमेंट और ब्लॉकचेन तकनीक का बहुत शौक है। वह Solidity और React सीख रहे हैं और एक Voting System प्रोजेक्ट बनाने का लक्ष्य रखते हैं। इसके अलावा, उन्होंने एक फूड डिलीवरी वेबसाइट का फ्रंटेंड बनाया है और भारत नाम का एक वॉयस असिस्टेंट विकसित कर रहे हैं, जो हिंदी में वॉयस कमांड्स का जवाब देता है। साथ ही, वह अपना व्यक्तिगत वेब डेवलपमेंट पोर्टफोलियो भी बना रहे हैं।",
        // "ai song": () => playSong("audio/lalipop .mp3"),
        "play hindi song": () => playSong("audio/aur kya.mp3"),
        "play bhojpuri song": () => playSong("audio/marad.mp3"),
        "play haryanvi song": () => playSong("audio/Haryanvi Song.mp3"),
        "play punjabi song": () => playSong("audio/punjabi.mp3"),

    };

    for (const key in responses) {
        if (command.includes(key)) {
            stopSong();
            if (typeof responses[key] === 'function') {
                responses[key]();
            } else {
                speak(`${responses[key]}`);
            }
            return;
        }
    }

    stopSong();
    // speak(`आपने पूछा: ${command}, मैं गूगल पर खोज रहा हूँ।`);
    speak(`भाई मैं ये नहीं बता सकता। कोई दूसरा सवाल पूछ लो।`)
    // window.open(`https://www.google.com/search?q=${encodeURIComponent(command)}`, "_blank");
    
}

btn.addEventListener("click", function () {
    if (isListening) return;
    speak("नमस्ते, मैं भारत आपकी कैसे मदद कर सकता हूँ?");
    isListening = true;
    btn.innerHTML = "सुन रहा हूँ...👂";
    btn.classList.add("listening");
    recognition.start();
});

recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase().trim();
    handleCommand(command);
};

recognition.onend = () => {
    btn.innerHTML = "\uD83C\uDF99\uFE0F शुरू करें";
    btn.classList.remove("listening");
    isListening = false;
};

recognition.onerror = (event) => {
    console.error("त्रुटि हुई:", event.error);
    isListening = false;
    btn.innerHTML = "\uD83C\uDF99\uFE0F शुरू करें";
    btn.classList.remove("listening");
};

















