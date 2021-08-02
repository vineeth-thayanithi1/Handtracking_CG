const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 4,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.80,    // confidence threshold for predictions.
  }
  

navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

let model;

handTrack.startVideo(video)
    .then(status => {
        if (status) {
            navigator.getUserMedia({ video: {} }, stream => {
                video.srcObject = stream;
                setInterval(runDetection, 10);
            },
                err => console.log(err)
            );
        }
    });

function runDetection(){
    model.detect(video).then(predictions => {
        // model.renderPredictions(predictions, canvas, context, video);
        model.renderPredictions(predictions, canvas, context, video);
        // if(predictions.length >0){
        //     alert("hello world");

        // }
        if (predictions[0]) {
             let midval = predictions[0].bbox[0] + (predictions[0].bbox[2] / 2)
             gamex = document.body.clientWidth * (midval / video.width)
             //updatePaddleControl(gamex)
             //makeImage(midval, midval);

        }
    });
}
handTrack.load(modelParams).then(lmodel => {
    model = lmodel;
});