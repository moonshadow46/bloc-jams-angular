(function() {
  function SongPlayer($rootScope, Fixtures) {
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

      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
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
    * @desc current playback time (in seconds) of currently playing song
    * @param {Number}
    */
    SongPlayer.currentTime = null;

    /**
    * @desc curent volume (1-100)
    * @type {Number}
    */

    SongPlayer.volume = null;
    SongPlayer.volume = 60;

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

      if (currentSongIndex >= currentAlbum.songs.length) {
        stopSong(SongPlayer.currentSong);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
    * @function setCurrentTime
    * @desc set current time (in seconds) of currently playing song
    * @param {Number} time
    */
    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };

    /**
    * @function setVolume
    * @desc sets the volume
    * @param {Number} volume
    */
    SongPlayer.setVolume = function(volume) {
      if (currentBuzzObject) {
        currentBuzzObject.setVolume(volume);
      }
      SongPlayer.volume = volume;
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
