function startRecognizing() {
    if(window.recognizer === undefined) return;
    if(document.getElementsByTagName("video")[0] === undefined) return;

    window.recognizer.listen(
        result => {
            const scores = result.scores;
            const classLabels = recognizer.wordLabels();
            let max_score_index = -1;
            for(let i = 0; i < classLabels.length; i++) {
                if(max_score_index === -1) {
                    max_score_index = i;
                }else if(scores[max_score_index] < scores[i]) {
                    max_score_index = i;
                }
            }

            switch(classLabels[max_score_index]) {
                case "snap": {
                    const video = document.getElementsByTagName("video")[0];
                    if(video !== undefined){
                        if(video.paused){
                            video.play();
                        }else {
                            video.pause();
                        }
                    }
                    break;
                }
                default: {
                    return;
                }
            }
        },
        {
            includeSpectrogram: false,
            probabilityThreshold: 0.75,
            invokeCallbackOnNoiseAndUnknown: true,
            overlapFactor: 0.50
        }
    );
}


async function startRecognizingWithInit() {
    await init();
    startRecognizing();
}
