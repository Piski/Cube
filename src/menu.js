var Menu = function (game) {
    
};


  Menu.prototype = {
 
    create: function() {

        BG = this.add.tileSprite(0, 0, 680, 480, "mainMenu1");
    },
      
    update: function() {
        if(this.input.mousePointer.x > 210 && this.input.mousePointer.x < 415 && this.input.mousePointer.y > 365 && this.input.mousePointer.y < 395) {
            BG.loadTexture("mainMenu2");
            if(this.game.input.activePointer.isDown) {
                this.state.start("gameStart");
            }
            
        } else if (this.input.mousePointer.x > 185 && this.input.mousePointer.x < 440 && this.input.mousePointer.y > 425 && this.input.mousePointer.y < 445) {
            BG.loadTexture("mainMenu3");
            if(this.game.input.activePointer.isDown) {
                this.state.start("Instructions");
            }
        } else {
            BG.loadTexture("mainMenu1");
        }
    }
      
  };