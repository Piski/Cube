    // the square!! the hero of the this
    var theSquare;
    // the spike
    var theSpike;
    // group spikes here
    var spikesGroup;
    // square's horizontal speed in pixels/frame
    var xSpeed = 4;
    // square's jump height, in pixels
    var jumpHeight = 50;
    // square's jump width, in pixels. xSpeed must divide jumpWidth
    var jumpWidth = 120;
    // rotation performed at every jump, in degrees
    var jumpRotation = 180;
    // time passed since the player started jumping, in frames
    var jumpTime = 0;
    // is the player jumping?
    var isJumping = false;
    // simple degrees to radians conversion
    var degToRad = 0.0174532925;
    // array containing all various floor y positions, in pixels
    var floorY = new Array(160, 320, 480);
    // floor I am currently moving on	
    var currentFloor = 0;
    // floor height, in pixels
    var floorHeight = 0;
    // x position where the level starts, in pixels
    var levelStart = 0;
    // x position where the level ends, in pixels
    var levelEnd = 640;
    // particles
    var particles;
    // particle emitterOdd
    var emitterOdd;
    // particle emitterEven
    var emitterEven;
    // deathcount
    var deathCount = 0;
    // floor number
    var floorNumber = 1;
    // spike size
    var spikeOffset = 15;
    // first floor
    var firstFloor = 0;
    // second floor
    var secondFloor = 1;
    // third floor
    var thirdFloor = 2;
    // level
    var level = 4;
    // Background
    var BG;
    // Square offset
    var squareOffset = 10;

var Preloader = function (game) {
    
};


  Preloader.prototype = {
    preload: function() {
        
        // load
        this.load.image('map4text3', 'assets/text/map4/text3.png');
        
        // main menu
        this.load.image('mainMenu1', 'maps/menu/menu1.png');
        this.load.image('mainMenu2', 'maps/menu/menu2.png');
        
        // map 1
        this.load.image("evenSquare1", "maps/map1/evenSquare.png");
        this.load.image("evenSpike1", "maps/map1/evenSpike.png");
        this.load.image("oddSpike1", "maps/map1/oddSpike.png");
        this.load.image("evenParticle1", "maps/map1/evenParticle.png");
        this.load.image("oddParticle1", "maps/map1/oddParticle.png");
        this.load.image("map1", "maps/map1/map.png");
        this.load.image("oddSquare1", "maps/map1/oddSquare.png");

        // map 2
        this.load.image("evenSquare2", "maps/map2/evenSquare.png");
        this.load.image("evenSpike2", "maps/map2/evenSpike.png");
        this.load.image("oddSpike2", "maps/map2/oddSpike.png");
        this.load.image("evenParticle2", "maps/map2/evenParticle.png");
        this.load.image("oddParticle2", "maps/map2/oddParticle.png");
        this.load.image("map2", "maps/map2/map.png");
        this.load.image("oddSquare2", "maps/map2/oddSquare.png");
        
        // map 3
        this.load.image("evenSquare3", "maps/map3/evenSquare.png");
        this.load.image("evenSpike3", "maps/map3/evenSpike.png");
        this.load.image("oddSpike3", "maps/map3/oddSpike.png");
        this.load.image("evenParticle3", "maps/map3/evenParticle.png");
        this.load.image("oddParticle3", "maps/map3/oddParticle.png");
        this.load.image("map3", "maps/map3/map.png");
        this.load.image("oddSquare3", "maps/map3/oddSquare.png");
        
        // map 4
        this.load.image("evenSquare4", "maps/map4/evenSquare.png");
        this.load.image("evenSpike4", "maps/map4/evenSpike.png");
        this.load.image("oddSpike4", "maps/map4/oddSpike.png");
        this.load.image("evenParticle4", "maps/map4/evenParticle.png");
        this.load.image("oddParticle4", "maps/map4/oddParticle.png");
        this.load.image("map4", "maps/map4/map.png");
        this.load.image("oddSquare4", "maps/map4/oddSquare.png");
        
        // map 5
        this.load.image("evenSquare5", "maps/map5/evenSquare.png");
        this.load.image("evenSpike5", "maps/map5/evenSpike.png");
        this.load.image("oddSpike5", "maps/map5/oddSpike.png");
        this.load.image("evenParticle5", "maps/map5/evenParticle.png");
        this.load.image("oddParticle5", "maps/map5/oddParticle.png");
        this.load.image("map5", "maps/map5/map.png");
        this.load.image("oddSquare5", "maps/map5/oddSquare.png");
        
        // map 6
        this.load.image("evenSquare6", "maps/map6/evenSquare.png");
        this.load.image("evenSpike6", "maps/map6/evenSpike.png");
        this.load.image("oddSpike6", "maps/map6/oddSpike.png");
        this.load.image("evenParticle6", "maps/map6/evenParticle.png");
        this.load.image("oddParticle6", "maps/map6/oddParticle.png");
        this.load.image("map6", "maps/map6/map.png");
        this.load.image("oddSquare6", "maps/map6/oddSquare.png");
        
        // map 7
        this.load.image("evenSquare7", "maps/map7/evenSquare.png");
        this.load.image("evenSpike7", "maps/map7/evenSpike.png");
        this.load.image("oddSpike7", "maps/map7/oddSpike.png");
        this.load.image("evenParticle7", "maps/map7/evenParticle.png");
        this.load.image("oddParticle7", "maps/map7/oddParticle.png");
        this.load.image("map7", "maps/map7/map.png");
        this.load.image("oddSquare7", "maps/map7/oddSquare.png");
        
        // map 8
        this.load.image("evenSquare8", "maps/map8/evenSquare.png");
        this.load.image("evenSpike8", "maps/map8/evenSpike.png");
        this.load.image("oddSpike8", "maps/map8/oddSpike.png");
        this.load.image("evenParticle8", "maps/map8/evenParticle.png");
        this.load.image("oddParticle8", "maps/map8/oddParticle.png");
        this.load.image("map8", "maps/map8/map.png");
        this.load.image("oddSquare8", "maps/map8/oddSquare.png");
        
        // map 9
        this.load.image("evenSquare9", "maps/map9/evenSquare.png");
        this.load.image("evenSpike9", "maps/map9/evenSpike.png");
        this.load.image("oddSpike9", "maps/map9/oddSpike.png");
        this.load.image("evenParticle9", "maps/map9/evenParticle.png");
        this.load.image("oddParticle9", "maps/map9/oddParticle.png");
        this.load.image("map9", "maps/map9/map.png");
        this.load.image("oddSquare9", "maps/map9/oddSquare.png");
        
        // map 10
        this.load.image("evenSquare10", "maps/map10/evenSquare.png");
        this.load.image("evenSpike10", "maps/map10/evenSpike.png");
        this.load.image("oddSpike10", "maps/map10/oddSpike.png");
        this.load.image("evenParticle10", "maps/map10/evenParticle.png");
        this.load.image("oddParticle10", "maps/map10/oddParticle.png");
        this.load.image("map10", "maps/map10/map.png");
        this.load.image("oddSquare10", "maps/map10/oddSquare.png");

    },
      
    create: function() {
        this.game.state.start("Menu"); 
 
    }
  };