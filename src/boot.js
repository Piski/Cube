var loading;

var Boot = function (game) {
    
};


  Boot.prototype = {
    preload: function() {
        this.load.image('loading', 'maps/loading/loading.png');
    },
      
    create: function() {
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.setScreenSize();
        this.state.start("Preloader");  
    }
  };