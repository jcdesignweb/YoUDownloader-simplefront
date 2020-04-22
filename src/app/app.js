import File from '../app/model/file';
import Player from '../app/model/player';

import $ from 'jquery';

// PHP

import { server } from '../app/config';



//const server = 'http://localhost/portfolio/';

// Groovy
//const server = 'http://localhost:8080/';

/**
 * this value store the selected file from the playlist.
 */
let fileSelected;

const saveLocalStorage = (key, data) => {
    window.localStorage.setItem(key, JSON.stringify(data));
};

const getLocalStorageByKey = (key) => {
    return JSON.parse(window.localStorage.getItem(key));
};

class App {

    constructor(listeners) {
        this.player = new Player(listeners);

 
    }
    
    /**
     * 
     * @param {stromg} filename 
     * @returns {File}
     */
    getLocalSongByFilename(filename) {
        const playlistFiles = getLocalStorageByKey('playlist');
        console.log("playlistFiles", playlistFiles)
        
        for(const song of playlistFiles) {
            
            if (filename === song.filename) {
                return new File(song);
            }    
        }
    }

    getList(success) {
        $.ajax({
            type: "GET",
            url: `${server}/file/all`,
            dataType: "json",
            data: {},
            success: (response) => {

                // save playlist
                saveLocalStorage('playlist', response);

                success(response);
            }
        });
    }

    download(youtubeUrl, success) {

        console.log(youtubeUrl);
        const url = new URL(youtubeUrl);
        

        const vId = url.searchParams.get('v')
        if (vId) {
            $.ajax({
                type: "POST",
                url: `${server}/file/download/audio`,
                dataType: "json",
                data: {
                    vId
                },
                success: success,
            });
        }
        
    }

    startSong(songSelected) {
        
        console.log("SongSelected", songSelected);
        fileSelected = this.getLocalSongByFilename(songSelected);
        console.log("FileSelected", fileSelected);
        
        this.player.play(fileSelected);
    }

    getPlayer() {
        return this.player;
    }
    
}

export default App;