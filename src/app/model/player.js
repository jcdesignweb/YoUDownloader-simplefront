import $ from 'jquery';

import File from  './file';
import config from '../config';

import TrackSlider from '../component/controls/track-slider';

import Previous from '../component/button/previous';
import PlayPause from '../component/button/playpause';
import Next from '../component/button/next';

let audio;

const playButton = new PlayPause('btnPlay');

const trackSlider = new TrackSlider("#slider", (sliderValue) => {
    // track has been manually changed
    
    console.log("manually ------------", sliderValue);
    //alert(.val());

    Player.progress(sliderValue);
});

$(document).ready(function () {

    $("#btnPrevius").click(() => {
        Player.previous();
    });

    
    $("#btnPlay").click(() => {
        Player.playOrPause();
        
    });
    

    $("#btnNext").click(() => {
        Player.next();
    });
});

class Player {

    constructor(listeners) {
        const self = this;
        audio = new Audio();
        audio.volume = 1;

        audio.onplaying = listeners['onplaying'];
        audio.onpause = listeners['pause'];
        audio.ontimeupdate = listeners['ontimeupdate'];
        audio.onloadstart = listeners['onloadstart'];
        audio.onloadedmetadata = listeners['onloadedmetadata'];

        audio.ontimeupdate = (event) => {
            const duration = parseInt(event.path[0].currentTime);
            let minutes = Math.floor( duration / 60);
            let seconds = duration - minutes * 60;

            if(minutes < 10) {
                minutes = '0' + minutes;
            }

            if(seconds < 10) {
                seconds = '0' + seconds;
            }

            const currentUpdated = `${minutes}:${seconds}`;

            //console.log("Current update: ", currentUpdated);
            $('#timing .current').html(currentUpdated);

            const total = parseInt(event.path[0].duration);

            const totalPercent = (duration * 100) / total;


            trackSlider.updateTrack(totalPercent);
            

        };


        const slider = document.getElementById('slider');

    }

    /**
     * 
     * @param {File} file 
     */
    play(file) {

        console.log("FILE", file)
        
        $('#playing #details img').attr('src', file.getThumbnailInfo().thumbnail_url);
        $('#playing #details .songTitle').html(file.getTitle());

        const filename = file.getSrc().split('/').slice(-1).pop()

        console.log("SRC", `${filename}`);
        if (filename) {
            audio.src = `/public/files/new/${filename}`;
            audio.play();
            console.log("TOTALTIME:", audio.duration);

            playButton.play();
        } else {
            throw Error('error trying to parse SRC property');
        }
        
        
    }

    static playOrPause() {
        
        (audio.paused)? audio.play() : audio.pause();

        playButton.pressed(audio.paused);
    }

    /**
     * 
     * this method update currentTime in Audio, this receive an porcent value to be set as 
     *  
     * @param {int} posPercent 
     */
    static progress(posPercent) {
        const duration = audio.duration;
        
        audio.currentTime = (posPercent * duration) / 100;
    }

    static previous() {

    }

    static next() {

    }
}


export default Player;