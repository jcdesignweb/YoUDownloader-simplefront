import $ from 'jquery';

import App from './app';

import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.min.js';

import "./resources/styles.css";


const app = new App({
    onplaying: () => {

        //$('#btnPlay i').html('pause_circle_filled')
    },
    pause: () => {
        //$('#btnPlay i').html('play_circle_filled');

    },


    
    onloadedmetadata: (event) => {
        const duration = parseInt(event.path[0].duration);
        //console.log("onloadedmetadata", parseInt(event.path[0].duration));

        var minutes = Math.floor(duration / 60);
        var seconds = duration - minutes * 60;

        if(minutes < 10) {
            minutes = '0' + minutes;
        }

        if(seconds < 10) {
            seconds = '0' + seconds;
        }
        
        
        $('#timing .total').html(`${minutes}:${seconds}`);
    }
    
});



$(document).ready(function() {
    const input = $('#downloaderUrl');
    const loader = $('.preloader-wrapper');
    const playlist = $('.playlist');

    const modal = $('#modalDownload');



    // initialize MaterializeCSS
    M.AutoInit();

    var instance = M.Modal.getInstance(modal);
    console.log("INSTANCE", instance);
    console.log($('#slider1'));


    //instance.open();


    const reloadPlaylist = () => {

        app.getList((files) => {

            playlist.find('ul').html('');
    
            for(const file of files) {
    
                playlist.find('ul').append(`<li data-file="${file.filename}">${file.title}</li>`);
            }
        });
    }

    
    $('.playlist ul').on('click', 'li', (e) => {
        const filename = $(event.target).data('file');

        console.log(filename)

        app.startSong(filename);

    });

    $('#btnDownload').click(() => {
        loader.show();
        app.download(input.val(), (response) => {
            reloadPlaylist();

            setTimeout(() => {
                app.startSong(response.data.filename);
            }, 500)
            
            instance.close();
            loader.hide();
        });
    });

    reloadPlaylist();
    
});