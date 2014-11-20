var gameStart = function(game) {

};


gameStart.prototype = {

    // THE GAME HAS BEEN CREATED
    create: function() {

        this.physics.startSystem(Phaser.Physics.ARCADE);

        /*
         *   FIRST MAP
         */

        this.add.tileSprite(0, 0, 680, 480, "map1");
        // simply drawing all floors, as lines from levelStart to levelEnd, thickness floorHeight
        var floor = this.add.graphics(0, 0);
        floor.enableBody = true;

        for (i = 0; i < floorY.length; i++) {
            floor.lineStyle(floorHeight, 0x00000, 1);
            floor.moveTo(levelStart, floorY[i] + floorHeight / 2);
            floor.lineTo(levelEnd, floorY[i] + floorHeight / 2);
        }

        /*
         *   ADD HERO AND SPIKES FOR THE FIRST MAP
         */

        // adding the hero
        theSquare = this.add.sprite(levelStart, floorY[currentFloor] - this.cache.getImage("oddSquare" + level).height / 2, "oddSquare" + level);
        // enable collision for hero
        this.physics.arcade.enableBody(theSquare);
        theSquare.anchor.setTo(0.5, 0.5);



        // adding some spikes, first we declare the group
        spikesGroup = this.add.group();

        // enable collision for spikes
        spikesGroup.enableBody = true;


        // ADD SPIKES MANUALLY

        // First floor
        // GET READY
        // Second floor
        theSpike = this.add.sprite(300, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);
        // Third floor
        theSpike = this.add.sprite(200, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(400, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        /*
         *   PARTICLES
         */

        // create particle emitter odd
        //emitterOdd = this.add.emitter(this.world.centerX, this.world.centerY, 1000);
        //emitterOdd.makeParticles("oddParticle" + level);
        //emitterOdd.setXSpeed(xSpeed * 100);
        // create particle emitter even
        //emitterEven = this.add.emitter(this.world.centerX, this.world.centerY, 1000);
        //emitterEven.makeParticles("evenParticle" + level);
        //emitterEven.setXSpeed(-xSpeed * 100);

        // event listener for mouse down
        this.input.onDown.add(this.jump, this);

    },

    jump: function() {
        // if we aren't jumping... then JUMP
        if (!isJumping) {
            jumpTime = 0;
            isJumping = true;
        }
    },




    // THE this IS GOING TO BE UPDATED
    update: function() {
        // update level if the hero has reached third floor and end of that floor
        if (floorNumber == 3 && theSquare.x == levelEnd) {
            level++;
        }
        // temp variable to let us know if we are on an odd or even floor
        var mod = currentFloor % 2;
        // updating square x position
        theSquare.x += xSpeed * (1 - 2 * mod);
        // if the square reached the end of the floor...      
        if (theSquare.x > levelEnd && mod == 0 || theSquare.x < levelStart && mod == 1) {

            /*
             *   THE ROTATION HAPPENS HERE
             */

            this.add.tileSprite(0, 0, 680, 480, "map" + level);
            // simply drawing all floors, as lines from levelStart to levelEnd, thickness floorHeight
            var floor = this.add.graphics(0, 0);
            floor.enableBody = true;

            // adding the hero
                theSquare = this.add.sprite(levelStart, floorY[currentFloor] - this.cache.getImage("oddSquare" + level).height / 2, "oddSquare" + level);
            
            
            // enable collision for hero
            this.physics.arcade.enableBody(theSquare);
            theSquare.anchor.setTo(0.5, 0.5);

            // check floor
            floorNumber++;
            if (floorNumber > 3) {
                floorNumber = 1;
            }
            // change graphics
            if (floorNumber == 2) {
                theSquare.loadTexture("evenSquare" + level);
            } else {
                theSquare.loadTexture("oddSquare" + level);
            }

            // move onto next floor
            currentFloor++;
            // if we just finished the lowest floor...
            if (currentFloor > floorY.length - 1) {
                // start the this again
                currentFloor = 0;
            }
            // even or odd?
            mod = currentFloor % 2;
            // we start on the ground
            isJumping = false;
            theSquare.rotation = 0;
                theSquare.x = levelEnd * mod + levelStart * (1 - mod);
                theSquare.y = floorY[currentFloor] - this.cache.getImage("oddSquare" + level).height / 2;
            
            


            /*
             *   FIRST MAP SPIKES HAPPEN HERE
             */

            if (level === 1) {
                spikesGroup = this.add.group();
                //spikesGroup.enableBody = true;
                // First floor
                // GET READY
                // Second floor
                theSpike = this.add.sprite(300, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
                // Third floor
                theSpike = this.add.sprite(200, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(400, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

            }


            /*
             *   LEVEL ONE ENDS HERE
             *   LEVEL 2 STARTS HERE
             */
            else if (level === 2) {
                spikesGroup = this.add.group();
                //spikesGroup.enableBody = true;
                // First floor
                theSpike = this.add.sprite(160, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(320, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(480, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
                // Second floor
                theSpike = this.add.sprite(320, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(320, floorY[secondFloor] - spikeOffset * 1.5, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
                // Third floor
                theSpike = this.add.sprite(160, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(320, floorY[thirdFloor] - spikeOffset * 3, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(480, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
            }


            /*
             *   LEVEL 2 ENDS HERE
             *   LEVEL 3 STARTS HERE
             */
            else if (level === 3) {
                spikesGroup = this.add.group();
                //spikesGroup.enableBody = true;
                // First floor
                theSpike = this.add.sprite(160, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(160, floorY[firstFloor] - spikeOffset * 1.5, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(480, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(480, floorY[firstFloor] - spikeOffset * 1.5, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
                // Second floor
                theSpike = this.add.sprite(160, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(170, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(320, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(330, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(480, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(490, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
                // Third floor
                theSpike = this.add.sprite(140, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(280, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(420, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(560, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
            }

            /*
             *   LEVEL 3 ENDS HERE
             *   LEVEL 4 STARTS HERE
             */
            else if (level === 4) {
                spikesGroup = this.add.group();
                //spikesGroup.enableBody = true;
                // First floor
                theSpike = this.add.sprite(0, floorY[firstFloor] - spikeOffset * 3, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(20, floorY[firstFloor] - spikeOffset * 3, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(40, floorY[firstFloor] - spikeOffset * 3, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(60, floorY[firstFloor] - spikeOffset * 3, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(80, floorY[firstFloor] - spikeOffset * 3, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(100, floorY[firstFloor] - spikeOffset * 3, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(120, floorY[firstFloor] - spikeOffset * 3, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(140, floorY[firstFloor] - spikeOffset * 3, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(160, floorY[firstFloor] - spikeOffset * 3, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);


                theSpike = this.add.sprite(240, floorY[firstFloor], "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(260, floorY[firstFloor], "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(340, floorY[firstFloor] - spikeOffset * 3, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(360, floorY[firstFloor] - spikeOffset * 3, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(380, floorY[firstFloor] - spikeOffset * 3, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
                // Second floor
                theSpike = this.add.sprite(150, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(150, floorY[secondFloor] - spikeOffset * 1.5, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(220, floorY[secondFloor] - spikeOffset * 3, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(220, floorY[secondFloor] - spikeOffset * 5, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(280, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(440, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(450, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
                // Third floor
                //var text = "Lets try something new!";
                //var style = { font: "24px Audiowide", fill: "#ff0044", align: "center" };
                //var tween = this.add.text(0, 350, text, style);
                //tween.to({ x: 680 }, 6000);
                //  And this starts it going
                //tween.start();
                
                if (floorNumber-1 == thirdFloor) {
                    var text = this.add.sprite(levelStart-this.cache.getImage("map4text3").width/2, floorY[thirdFloor] - spikeOffset*8, "map4text3");
                    text.anchor.setTo(0.5, 0.5);
                    var tween = this.add.tween(text);
                    tween.to({ x: levelEnd }, 3000).start();
                }
                
            }

            /*
             *   LEVEL 4 ENDS HERE
             *   LEVEL 5 STARTS HERE
             */
            else if (level === 5) {
                spikesGroup = this.add.group();
                spikesGroup.enableBody = true;
                // First floor
                if (floorNumber-1 == firstFloor) {
                    theSpike = this.add.sprite(160, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                    theSpike.anchor.setTo(0.5, 0.5);
                    spikesGroup.add(theSpike);
                    this.add.tween(spikesGroup.getAt(0)).to({ y: 200 }, 1000).start();

                }

                theSpike = this.add.sprite(320, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                // entrance testi
                theSpike = this.add.sprite(480, 200, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
                
                this.add.tween(spikesGroup.getAt(2)).to({ y: floorY[firstFloor] - spikeOffset }, 1000).start();
                
                // if any other floor than first
                if (floorNumber-1 != firstFloor) {
                    // left visible
                    theSpike = this.add.sprite(480, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                    theSpike.anchor.setTo(0.5, 0.5);
                    spikesGroup.add(theSpike);
                }
                
                
                // Second floor
                theSpike = this.add.sprite(320, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                if (floorNumber-1 != thirdFloor) {
                    theSpike = this.add.sprite(320, floorY[secondFloor] - spikeOffset*3, "evenSpike" + level);
                    theSpike.anchor.setTo(0.5, 0.5);
                    spikesGroup.add(theSpike);
                }
                
                
                console.log(floorNumber);
                if (floorNumber-1 == secondFloor) {
                    this.add.tween(spikesGroup.getAt(4)).to({ y: floorY[secondFloor] + spikeOffset }, 500).delay(1000).start();
                }
                
                //this.add.tween(spikesGroup.getAt(4)).to({ y: floorY[secondFloor] - spikeOffset }, 400).to({ y: floorY[secondFloor] - spikeOffset*1.5 }, 400).loop().start();
                
                
                // Third floor
                theSpike = this.add.sprite(160, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(320, floorY[thirdFloor] - spikeOffset * 3, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(480, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
            }

            /*
             *   LEVEL 5 ENDS HERE
             *   LEVEL 6 STARTS HERE
             */
            else if (level === 6) {
                spikesGroup = this.add.group();
                spikesGroup.enableBody = true;
                // First floor
                theSpike = this.add.sprite(160, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(320, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(480, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
                // Second floor
                theSpike = this.add.sprite(320, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(320, floorY[secondFloor] - spikeOffset * 3, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
                // Third floor
                theSpike = this.add.sprite(160, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(320, floorY[thirdFloor] - spikeOffset * 3, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(480, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
            }

            /*
             *   LEVEL 6 ENDS HERE
             *   LEVEL 7 STARTS HERE
             */
            else if (level === 7) {
                spikesGroup = this.add.group();
                spikesGroup.enableBody = true;
                // First floor
                theSpike = this.add.sprite(160, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(320, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(480, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
                // Second floor
                theSpike = this.add.sprite(320, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(320, floorY[secondFloor] - spikeOffset * 3, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
                // Third floor
                theSpike = this.add.sprite(160, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(320, floorY[thirdFloor] - spikeOffset * 3, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(480, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
            }

            /*
             *   LEVEL 7 ENDS HERE
             *   LEVEL 8 STARTS HERE
             */
            else if (level === 8) {
                spikesGroup = this.add.group();
                spikesGroup.enableBody = true;
                // First floor
                theSpike = this.add.sprite(160, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(320, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(480, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
                // Second floor
                theSpike = this.add.sprite(320, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(320, floorY[secondFloor] - spikeOffset * 3, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
                // Third floor
                theSpike = this.add.sprite(160, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(320, floorY[thirdFloor] - spikeOffset * 3, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(480, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
            }

            /*
             *   LEVEL 9 ENDS HERE
             *   LEVEL 0 STARTS HERE
             */
            else if (level === 9) {
                spikesGroup = this.add.group();
                spikesGroup.enableBody = true;
                // First floor
                theSpike = this.add.sprite(160, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(320, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(480, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
                // Second floor
                theSpike = this.add.sprite(320, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(320, floorY[secondFloor] - spikeOffset * 3, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
                // Third floor
                theSpike = this.add.sprite(160, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(320, floorY[thirdFloor] - spikeOffset * 3, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(480, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
            }

            /*
             *   LEVEL 9 ENDS HERE
             *   LEVEL 10 STARTS HERE
             */
            else if (level === 10) {
                spikesGroup = this.add.group();
                spikesGroup.enableBody = true;
                // First floor
                theSpike = this.add.sprite(160, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(320, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(480, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
                // Second floor
                theSpike = this.add.sprite(320, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(320, floorY[secondFloor] - spikeOffset * 3, "evenSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
                // Third floor
                theSpike = this.add.sprite(160, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(320, floorY[thirdFloor] - spikeOffset * 3, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);

                theSpike = this.add.sprite(480, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
                theSpike.anchor.setTo(0.5, 0.5);
                spikesGroup.add(theSpike);
            }

            /*
             *   LEVEL 10 ENDS HERE
             *   END MENU STARTS HERE
             */


            /*
             *   END MENU STARTS HERE
             */

            emitterOdd = this.add.emitter(this.world.centerX, this.world.centerY, 20);
            emitterEven = this.add.emitter(this.world.centerX, this.world.centerY, 20);

            /*
             *   THE ROTATION ENDS HERE
             */

        }


        // if we are jumping...
        if (isJumping) {
            // calculating the number of frames we will be jumping
            var jumpFrames = jumpWidth / xSpeed;
            // calculating how many degrees should the square rotate at each frame
            var degreesPerFrame = jumpRotation / jumpFrames * (1 - 2 * mod);
            // calculating how may radians we have to apply to sine trigonometry function to simulate player jump
            var radiansPerFrame = (180 / jumpFrames) * degToRad;
            // another frame jumping...
            jumpTime++;

            // updating rotation
            theSquare.angle += degreesPerFrame;
            // updating y position
            theSquare.y = floorY[currentFloor] - this.cache.getImage("evenSquare" + level).height / 2 - jumpHeight * Math.sin(radiansPerFrame * jumpTime);
            // if we jumped enough...
            if (jumpTime == jumpFrames) {
                // ... just stop jumping
                isJumping = false;
                theSquare.y = floorY[currentFloor] - squareOffset;
            }
        }
        this.physics.arcade.overlap(theSquare, spikesGroup, this.onCollision);
        console.log(theSquare.world.x);
    }, // Update end

    // if there is a collision, make the player restart from last visited floor
    onCollision: function() {
        // create particle emitter odd
        //emitterOdd = this.add.emitter(this.world.centerX, this.world.centerY, 200);
        emitterOdd.makeParticles("oddParticle" + level);
        emitterOdd.setXSpeed(xSpeed * 100);
        // create particle emitter even
        //emitterEven = this.add.emitter(this.world.centerX, this.world.centerY, 200);
        emitterEven.makeParticles("evenParticle" + level);
        emitterEven.setXSpeed(-xSpeed * 100);

        var mod = currentFloor % 2;
        isJumping = false;
        theSquare.rotation = 0;
        theSquare.x = levelEnd * mod + levelStart * (1 - mod);
        theSquare.y = floorY[currentFloor] - squareOffset;


        // currentFloor 1 = middle level
        if (currentFloor == 1) {
            emitterEven.y = theSquare.world.y;
            emitterEven.x = theSquare.world.x;
            emitterEven.explode(1000, 20);
        } else {
            emitterOdd.y = theSquare.world.y;
            emitterOdd.x = theSquare.world.x;
            emitterOdd.explode(1000, 20);
        }
    }
};
