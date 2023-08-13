const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider input"),
    keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
    audio = new Audio(`assets/audio/a.wav`); // por defecto, audio src es el sonido "a"

const playTune = (key) => {
    audio.src = `assets/audio/${key}.wav`; // pasando audio src basado en la tecla presionada
    audio.play(); // playing audio

    const clickedKey = document.querySelector(`[data-key="${key}"]`); // haciendo click en el elemento tecla
    clickedKey.classList.add("active"); // agregar clase activa al elemento tecla en el que se hizo clic
    setTimeout(() => { // eliminando la clase activa después de 150 ms del elemento tecla en el que se hizo clic
        clickedKey.classList.remove("active");
    }, 150);
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key); // agregando valor data-key al array allKeys
    // llamando a la función playTune pasando el valor de data-key como argumento
    key.addEventListener("click", () => playTune(key.dataset.key));
});

const handleVolume = (e) => {
    audio.volume = e.target.value; // pasando el valor del control deslizante de rango como un volumen de audio
}

const showHideKeys = () => {
    // alternando ocultar clase de cada tecla en el checkbox click
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

const pressedKey = (e) => {
    // si la tecla presionada está en allKeys array, solo llamar a la función playTune
    if(allKeys.includes(e.key)) playTune(e.key);
}

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);