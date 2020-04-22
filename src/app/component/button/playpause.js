import Button from './button';

let element;

class PlayPause extends Button {

    constructor(selectorId) {
        element = document.getElementById(selectorId);

        super();
    }

    play() {
        element.childNodes[0].innerHTML = 'pause_circle_filled';
    }

    pause() {
        element.childNodes[0].innerHTML = 'play_circle_filled';
    }

    pressed(isPaused) {
        element.childNodes[0].innerHTML = (isPaused)? 'play_circle_filled' : 'pause_circle_filled';
    }

}

export default PlayPause;