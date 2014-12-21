var gameOver = function (game) {
    
};


  gameOver.prototype = {
 
    create: function() {
        // fade out the music
        music.fadeOut(1000);
        BG = this.add.tileSprite(0, 0, 680, 480, "endScreen1");
    },
      
    update: function() {
        if(this.input.mousePointer.x > 205 && this.input.mousePointer.x < 420 && this.input.mousePointer.y > 400 && this.input.mousePointer.y < 460) {
            BG.loadTexture("endScreen2");
            if(this.game.input.activePointer.isDown) {
                music.stop();
                this.state.start("gameStart");
            }
        } else if (this.input.mousePointer.x > 180 && this.input.mousePointer.x < 440 && this.input.mousePointer.y > 360 && this.input.mousePointer.y < 395) {
            BG.loadTexture("endScreen3");
            if(this.game.input.activePointer.isDown) {
                music.stop();
                this.state.start("Menu");
            } 
        } else {
            BG.loadTexture("endScreen1");
        }
    }
      
  };