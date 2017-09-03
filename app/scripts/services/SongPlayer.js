(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};
/**
* @desc Access songs array
* @type {Object}
*/
    var currentAlbum = Fixtures.getAlbum();
/**
* @desc Buzz object audio file
* @type {Object}
*/
    var currentBuzzObject = null;
/**
* @function
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject =  new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };

    /**
    * @function playSong
    * @desc Plays the currentBuzzObject and sets the property of the song Object to true
    * @param {Object} song
    */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };

    var stopSong = function(song) {
      currentBuzzObject.stop();
      song.playing = null;
    };

    /**
    * @desc To get index of a song
    * @type {object}
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /**
    * @desc Active song object from list of songs
    * @type {object}
    */
    SongPlayer.currentSong = null;

    /**
    * @function SongPlayer.play
    * @desc Play current or new song
    * @param {Object} song
    */

    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };

    /**
    * @function SongPlayer.pause
    * @desc Pause current song
    * @param {Object} song
    */

    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    }

    /**
    * @function SongPlayer.previous
    * @desc Get song before the current playing song
    * @param {Object} song
    */
    SongPlayer.previous = function () {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong(SongPlayer.currentSong);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    SongPlayer.next = function () {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex > currentAlbum.songs.length) {
        stopSong(SongPlayer.currentSong);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
