var SpeechRecognition = window.webkitSpeechRecognition; // API de reconhecimento de fala

var recognition = new SpeechRecognition; // criando um novo reconhecimento de fala

var areatexto = document.getElementById("areaTexto"); //pegando a tag textarea do html

function iniciar(){
    recognition.start(); //sempre que o botão iniciar for pressionado, a API irá fazer um novo reconhecimento de fala
}

recognition.onresult = function(event){ //contém os valores de fala convertidos em texto
    console.log(event);
    var conteudo = event.results[0][0].transcript; //pegando o conteudo do que foi falado
    areatexto.innerHTML = conteudo; //alterando na tag textarea com o texto do que foi falado
    console.log(conteudo);

    if(conteudo == "selfie"){
        console.log("tirando selfie");
        speak();
    }
}

function speak(){
    var synth = window.speechSynthesis; //api que converte texto em fala

    speakData = "Tirando sua selfie em 3 segundos";

    var faleIsso = new SpeechSynthesisUtterance(speakData);

    synth.speak(faleIsso);

    Webcam.attach(camera);

    setTimeout(function(){
        tirarSelfie();
        salvarSelfie();
    }, 3000); // milissegundos
}

camera = document.getElementById("webcam");
Webcam.set({
    width: 350,
    height: 250,
    image_format: 'jpeg',
    jpeg_quality:100
});

function tirarSelfie(){
    Webcam.snap(function(data_uri){
        document.getElementById("resultSelfie").innerHTML = '<img id="selfieImg" src="'+data_uri+'"/>';
    });
}

function salvarSelfie(){
    link = document.getElementById("downloadSelfie");
    image = document.getElementById("selfieImg").src;
    link.href = image;
    link.click();
}


