var Instructions = function (game) {
    
};


  Instructions.prototype = {
 
    create: function() {

        BG = this.add.tileSprite(0, 0, 680, 480, "instructions1");
    },
      
    update: function() {
        if(this.input.mousePointer.x > 225 && this.input.mousePointer.x < 390 && this.input.mousePointer.y > 435 && this.input.mousePointer.y < 460) {
            BG.loadTexture("instructions2");
            
            if(this.game.input.activePointer.isDown) {
                this.state.start("Menu");
            }
            
        } else {
            BG.loadTexture("instructions1");
        } 
    }
      
  };