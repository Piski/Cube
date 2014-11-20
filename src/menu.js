var Menu = function (game) {
    
};


  Menu.prototype = {
 
    create: function() {

        BG = this.add.tileSprite(0, 0, 680, 480, "mainMenu1");
        //var text = "- CUBE -";
        //var style = { font: "65px Audiowide", fill: "#ff0044", align: "center" };

        //var t = this.add.text(this.world.centerX-300, 0, text, style);
    },
      
    update: function() {
        if(this.input.mousePointer.x > 205 && this.input.mousePointer.x < 420 && this.input.mousePointer.y > 430 && this.input.mousePointer.y < 460) {
            BG.loadTexture("mainMenu2");
            
            if(this.game.input.activePointer.isDown) {
            this.state.start("gameStart");
            }
            
        } else {
            BG.loadTexture("mainMenu1");
        } 
    }
      
  };