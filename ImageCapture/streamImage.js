

var download;

navigator.mediaDevices.getUserMedia({audio:true})
.then((stream) => {
  var video = document.querySelector('video').srcObject = stream
  var play = document.querySelector("#play");
  var stop = document.querySelector("#stop");
  video.onloademetadata = function(ev){
      video.play();
  }

  var mediaRecorder = new MediaRecorder(stream);

  var chunks = [];
  

  play.onclick = function(){
      mediaRecorder.start();
      console.log("recorder started");
  }

  stop.onclick = function(){
    mediaRecorder.stop();
    console.log("recorder stopped");
  }

  mediaRecorder.ondataavailable = function(ev){
      chunks.push(ev.data);
      console.log(ev.data)
  }

  mediaRecorder.onstop = async(ev) => {
    download = new Blob(chunks,{type:'audio/mp3'});

    const newHandler = await window.showSaveFilePicker({
        types:[{
            description:"Audio",
            accept:{
                "audio/mp3":[".mp3"]
            }
        }]
    });

    const writableStream = await newHandler.createWritable();
    await writableStream.write(download);

    await writableStream.close();

    chunks = [];
  }
})
.catch(error => console.log(error));
