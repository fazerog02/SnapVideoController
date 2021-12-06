async function createModel() {
    const URL = "https://teachablemachine.withgoogle.com/models/1-DXXsM2X/";
    const checkpointURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    const recognizer = speechCommands.create(
        "BROWSER_FFT",
        undefined,
        checkpointURL,
        metadataURL
    );
    await recognizer.ensureModelLoaded();
    
    return recognizer;
}


async function init() {
    Object.defineProperty(window, "recognizer", {
        value: await createModel()
    });
}
