(function() {
  function AlbumCtrl() {
    this.albumData = albumPicasso;
  }

  angular
    .module('blucJams')
    .controller('AlbumCtrl', AlbumCtrl);
})();
