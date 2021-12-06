function stopRecognizing() {
    if(window.recognizer === undefined) return;
    window.recognizer.stopListening();
}
