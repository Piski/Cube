    // the square. the hero of the this game
    var theSquare;
    // the spike
    var theSpike;
    // group spikes here
    var spikesGroup;
    // square's horizontal speed in pixels/frame
    var xSpeed = 4; // 4
    // square's jump height, in pixels
    var jumpHeight = 52; // 50
    // square's jump width, in pixels. xSpeed must divide jumpWidth
    var jumpWidth = 120; // 120
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
    var level = 1;
    // Background
    var BG;
    // Square offset
    var squareOffset = 10;
    // deathcount text
    var dCountText;
    // mute key
    var mute;
    // music
    var music;
    // more volume key
    var volumeUp;
    // less volume key
    var volumeDown;
    // pause key
    var pause;
    // for switching music, start with track 1
    var track = 1;
    // for tacking how many songs we have
    var tracks = 3;

var Preloader = function (game) {
    
};


  Preloader.prototype = {
    preload: function() {
        this.add.tileSprite(0, 0, 680, 480, "loading");
        // audio
        this.load.audio('music_1', ['assets/audio/1.mp3', 'assets/audio/1.mp3']);
        this.load.audio('music_2', ['assets/audio/2.mp3', 'assets/audio/2.mp3']);
        this.load.audio('music_3', ['assets/audio/3.mp3', 'assets/audio/3.mp3']);
        // load
        this.load.image('map5text3', 'assets/text/map5/text3.png');
        this.load.image('map7text3', 'assets/text/map7/text3.png');
        
        // main menu
        this.load.image('mainMenu1', 'maps/menu/menu1.png');
        this.load.image('mainMenu2', 'maps/menu/menu2.png');
        this.load.image('mainMenu3', 'maps/menu/menu3.png');
        
        // Instructions
        this.load.image('instructions1', 'maps/menu/instructions1.png');
        this.load.image('instructions2', 'maps/menu/instructions2.png');
        
        // end screen
        this.load.image('endScreen1', 'maps/end/endScreen1.png');
        this.load.image('endScreen2', 'maps/end/endScreen2.png');
        this.load.image('endScreen3', 'maps/end/endScreen3.png');
        
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
        this.load.image("evenSpikeTall2", "maps/map2/evenSpikeTall.png");
        this.load.image("oddSpikeTall2", "maps/map2/oddSpikeTall.png");

        // map 3
        this.load.image("evenSquare3", "maps/map3/evenSquare.png");
        this.load.image("evenSpike3", "maps/map3/evenSpike.png");
        this.load.image("oddSpike3", "maps/map3/oddSpike.png");
        this.load.image("evenParticle3", "maps/map3/evenParticle.png");
        this.load.image("oddParticle3", "maps/map3/oddParticle.png");
        this.load.image("map3", "maps/map3/map.png");
        this.load.image("oddSquare3", "maps/map3/oddSquare.png");
        this.load.image("evenSpikeTall3", "maps/map3/evenSpikeTall.png");
        this.load.image("oddSpikeTall3", "maps/map3/oddSpikeTall.png");
        
        // map 4
        this.load.image("evenSquare4", "maps/map4/evenSquare.png");
        this.load.image("evenSpike4", "maps/map4/evenSpike.png");
        this.load.image("oddSpike4", "maps/map4/oddSpike.png");
        this.load.image("evenParticle4", "maps/map4/evenParticle.png");
        this.load.image("oddParticle4", "maps/map4/oddParticle.png");
        this.load.image("map4", "maps/map4/map.png");
        this.load.image("oddSquare4", "maps/map4/oddSquare.png");
        this.load.image("evenSpikeTall4", "maps/map4/evenSpikeTall.png");
        this.load.image("oddSpikeTall4", "maps/map4/oddSpikeTall.png");
        
        // map 5
        this.load.image("evenSquare5", "maps/map5/evenSquare.png");
        this.load.image("evenSpike5", "maps/map5/evenSpike.png");
        this.load.image("oddSpike5", "maps/map5/oddSpike.png");
        this.load.image("evenParticle5", "maps/map5/evenParticle.png");
        this.load.image("oddParticle5", "maps/map5/oddParticle.png");
        this.load.image("map5", "maps/map5/map.png");
        this.load.image("oddSquare5", "maps/map5/oddSquare.png");
        this.load.image("evenSpikeTall5", "maps/map5/evenSpikeTall.png");
        this.load.image("oddSpikeTall5", "maps/map5/oddSpikeTall.png");
        
        // map 6
        this.load.image("evenSquare6", "maps/map6/evenSquare.png");
        this.load.image("evenSpike6", "maps/map6/evenSpike.png");
        this.load.image("oddSpike6", "maps/map6/oddSpike.png");
        this.load.image("evenParticle6", "maps/map6/evenParticle.png");
        this.load.image("oddParticle6", "maps/map6/oddParticle.png");
        this.load.image("map6", "maps/map6/map.png");
        this.load.image("oddSquare6", "maps/map6/oddSquare.png");
        this.load.image("evenSpikeTall6", "maps/map6/evenSpikeTall.png");
        this.load.image("oddSpikeTall6", "maps/map6/oddSpikeTall.png");

        // map 7
        this.load.image("evenSquare7", "maps/map7/evenSquare.png");
        this.load.image("evenSpike7", "maps/map7/evenSpike.png");
        this.load.image("oddSpike7", "maps/map7/oddSpike.png");
        this.load.image("evenParticle7", "maps/map7/evenParticle.png");
        this.load.image("oddParticle7", "maps/map7/oddParticle.png");
        this.load.image("map7", "maps/map7/map.png");
        this.load.image("oddSquare7", "maps/map7/oddSquare.png");
        this.load.image("evenSpikeTall7", "maps/map7/evenSpikeTall.png");
        this.load.image("oddSpikeTall7", "maps/map7/oddSpikeTall.png");
        
        // map 8 bg for loading screen before end game screen
        this.load.image("map8", "maps/map8/map.png");
        
    },
      
    create: function() {
        this.state.start("Menu"); 
 
    }
  };