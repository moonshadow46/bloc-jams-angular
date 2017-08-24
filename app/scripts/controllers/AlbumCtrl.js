(function() {
  function AlbumCtrl(Fixtures) {
    this.albumData = Fixtures.getAlbum();
  }

  angular
    .module('blucJams')
    .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();
