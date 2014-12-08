var gameStart = function(game) {

};


gameStart.prototype = {

    // THE GAME HAS BEEN CREATED
    create: function() {

        // music
        music = this.add.audio('music_' + track);
        music.play();

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.add.tileSprite(0, 0, 680, 480, "map" + level);
        // simply drawing all floors, as lines from levelStart to levelEnd, thickness floorHeight
        var floor = this.add.graphics(0, 0);
        floor.enableBody = true;

        for (i = 0; i < floorY.length; i++) {
            floor.lineStyle(floorHeight, 0x00000, 1);
            floor.moveTo(levelStart, floorY[i] + floorHeight / 2);
            floor.lineTo(levelEnd, floorY[i] + floorHeight / 2);
        }


        // adding the hero
        theSquare = this.add.sprite(levelStart, floorY[currentFloor] - this.cache.getImage("oddSquare" + level).height / 2, "oddSquare" + level);
        // enable collision for hero
        this.physics.arcade.enableBody(theSquare);
        theSquare.anchor.setTo(0.5, 0.5);

        // adding some spikes, first we declare the group
        spikesGroup = this.add.group();

        // enable collision for spikes
        spikesGroup.enableBody = true;

        if (level === 1) {
            this.startLevel1();
        } else if (level === 2) {
            this.startLevel2();
        } else if (level === 3) {
            this.startLevel3();
        } else if (level === 4) {
            this.startLevel4();
        } else if (level === 5) {
            this.startLevel5();
        } else if (level === 6) {
            this.startLevel6();
        } else if (level === 7) {
            this.startLevel7();
        }

        //  And some controls
        mute = this.input.keyboard.addKey(Phaser.Keyboard.M);
        mute.onDown.add(this.toggleMute, this);

        volumeUp = this.input.keyboard.addKey(Phaser.Keyboard.UP);
        volumeUp.onDown.add(this.volumeUP, this);

        volumeDown = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        volumeDown.onDown.add(this.volumeDOWN, this);

        pause = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        pause.onDown.add(this.pause, this);

        switchMusicBack = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        switchMusicForward = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        switchMusicBack.onDown.add(this.switchMusicBack, this);
        switchMusicForward.onDown.add(this.switchMusicForward, this);


        // event listener for mouse down
        this.input.onDown.add(this.jump, this);

        dCountText = this.add.text(levelStart + 10, 10, deathCount.toString(), {
            font: "16px Audiowide",
            fill: "#530303",
            align: "center"
        });

    },

    switchMusicForward: function() {
        music.stop();
        track++;
        if (track > tracks) {
            track = 1;
        }
        music = this.add.audio('music_' + track);
        music.play();
    },

    switchMusicBack: function() {
        music.stop();
        track--;
        if (track == 0) {
            track = tracks;
        }
        music = this.add.audio('music_' + track);
        music.play();
    },

    pause: function() {
        if (this.game.paused) {
            this.game.paused = false;
        } else {
            this.game.paused = true;
        }


    },

    jump: function() {
        // if we aren't jumping
        if (!isJumping) {
            jumpTime = 0;
            isJumping = true;
        }
    },

    toggleMute: function() {
        if (music.volume > 0) {
            music.volume = 0;
        } else {
            music.volume = 1;
        }

    },

    volumeUP: function() {
        music.volume += 0.1
    },

    volumeDOWN: function() {
        music.volume -= 0.1
    },

    update: function() {
        // update level if the hero has reached third floor and end of that floor
        if (floorNumber == 3 && theSquare.x == levelEnd) {
            level += 1;
        }

        // temp variable to let us know if we are on an odd or even floor
        var mod = currentFloor % 2;
        // updating square x position
        theSquare.x += xSpeed * (1 - 2 * mod);
        // if the square reached the end of the floor
        if (theSquare.x > levelEnd && mod == 0 || theSquare.x < levelStart && mod == 1) {

            /*
             *   THE ROTATION HAPPENS HERE
             *   That means this section happens only when the square reaches the end of the floors
             */


            this.add.tileSprite(0, 0, 680, 480, "map" + level);
            // simply drawing all floors, as lines from levelStart to levelEnd, thickness floorHeight
            var floor = this.add.graphics(0, 0);
            floor.enableBody = true;

            // level 8 doesn't exists. But it's a handy way to start the game over screen and reset the level counter
            if (level == 8) {
                level = 1;
                this.state.start("gameOver");
            }

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
            // if we just finished the lowest floor
            if (currentFloor > floorY.length - 1) {
                // start the this again
                currentFloor = 0;
            }
            // even or odd
            mod = currentFloor % 2;
            // we start on the ground
            isJumping = false;
            theSquare.rotation = 0;
            theSquare.x = levelEnd * mod + levelStart * (1 - mod);
            theSquare.y = floorY[currentFloor] - this.cache.getImage("oddSquare" + level).height / 2;


            if (level === 1) {
                this.startLevel1();
                dCountText = this.add.text(levelStart + 10, 10, deathCount.toString(), {
                    font: "16px Audiowide",
                    fill: "#530303",
                    align: "center"
                });
            } else if (level === 2) {
                this.startLevel2();
                dCountText = this.add.text(levelStart + 10, 10, deathCount.toString(), {
                    font: "16px Audiowide",
                    fill: "#000000",
                    align: "center"
                });
            } else if (level === 3) {
                this.startLevel3();
                dCountText = this.add.text(levelStart + 10, 10, deathCount.toString(), {
                    font: "16px Audiowide",
                    fill: "#fff055",
                    align: "center"
                });
            } else if (level === 4) {
                this.startLevel4();
                dCountText = this.add.text(levelStart + 10, 10, deathCount.toString(), {
                    font: "16px Audiowide",
                    fill: "#3b5998",
                    align: "center"
                });
            } else if (level === 5) {
                this.startLevel5();

                if (level == 5 && floorNumber - 1 == thirdFloor) {
                    xSpeed = 5;
                    jumpWidth = 150;
                    jumpHeight = 62;
                }

                dCountText = this.add.text(levelStart + 10, 10, deathCount.toString(), {
                    font: "16px Audiowide",
                    fill: "#202020",
                    align: "center"
                });
            } else if (level === 6) {
                this.startLevel6();
                dCountText = this.add.text(levelStart + 10, 10, deathCount.toString(), {
                    font: "16px Audiowide",
                    fill: "#0188a5",
                    align: "center"
                });
            } else if (level === 7) {
                this.startLevel7();
                dCountText = this.add.text(levelStart + 10, 10, deathCount.toString(), {
                    font: "16px Audiowide",
                    fill: "#fa5316",
                    align: "center"
                });
            }

            emitterOdd = this.add.emitter(this.world.centerX, this.world.centerY, 20);
            emitterEven = this.add.emitter(this.world.centerX, this.world.centerY, 20);
            
            this.physics.arcade.enableBody(emitterOdd);
            this.physics.arcade.enableBody(emitterEven);

            /*
             *   THE ROTATION ENDS HERE
             */

        }

        // if we are jumping
        if (isJumping) {
            // calculating the number of frames we will be jumping
            var jumpFrames = jumpWidth / xSpeed;
            // calculating how many degrees should the square rotate at each frame
            var degreesPerFrame = jumpRotation / jumpFrames * (1 - 2 * mod);
            // calculating how may radians we have to apply to sine trigonometry function to simulate player jump
            var radiansPerFrame = (180 / jumpFrames) * degToRad;
            // another frame jumping
            jumpTime++;

            // updating rotation
            theSquare.angle += degreesPerFrame;
            // updating y position
            theSquare.y = floorY[currentFloor] - this.cache.getImage("evenSquare" + level).height / 2 - jumpHeight * Math.sin(radiansPerFrame * jumpTime);
            // if we jumped enough
            if (jumpTime == jumpFrames) {
                // just stop jumping
                isJumping = false;
                theSquare.y = floorY[currentFloor] - squareOffset;
            }
        }

        this.physics.arcade.overlap(theSquare, spikesGroup, this.onCollision);





    }, // Update end

    // if there is a collision, make the player restart from last visited floor
    onCollision: function() {
        console.log("hit");
        deathCount += 1;
        dCountText.setText(deathCount);
        // create particle emitter odd
        emitterOdd.makeParticles("oddParticle" + level);
        emitterOdd.setXSpeed(xSpeed * 100);
        // create particle emitter even
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
    },

    startLevel1: function() {
        spikesGroup = this.add.group();
        spikesGroup.enableBody = true;
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
    },

    startLevel2: function() {
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
        theSpike = this.add.sprite(320, floorY[secondFloor] - spikeOffset, "evenSpikeTall" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        // Third floor
        theSpike = this.add.sprite(160, floorY[thirdFloor] - spikeOffset, "oddSpikeTall" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(290, floorY[thirdFloor] - 35, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(320, floorY[thirdFloor] - 35, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(350, floorY[thirdFloor] - 35, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(480, floorY[thirdFloor] - spikeOffset, "oddSpikeTall" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

    },

    startLevel3: function() {
        spikesGroup = this.add.group();
        spikesGroup.enableBody = true;
        // First floor
        theSpike = this.add.sprite(160, floorY[firstFloor] - spikeOffset, "oddSpikeTall" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(320, floorY[firstFloor] - spikeOffset, "oddSpikeTall" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(480, floorY[firstFloor] - spikeOffset, "oddSpikeTall" + level);
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
    },

    startLevel4: function() {
        spikesGroup = this.add.group();
        spikesGroup.enableBody = true;
        // First floor
        theSpike = this.add.sprite(0, floorY[firstFloor] - 35, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(20, floorY[firstFloor] - 35, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(40, floorY[firstFloor] - 35, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(60, floorY[firstFloor] - 35, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(80, floorY[firstFloor] - 35, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(100, floorY[firstFloor] - 35, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(120, floorY[firstFloor] - 35, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(140, floorY[firstFloor] - 35, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(160, floorY[firstFloor] - 35, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);


        theSpike = this.add.sprite(240, floorY[firstFloor], "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(260, floorY[firstFloor], "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(340, floorY[firstFloor] - 35, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(360, floorY[firstFloor] - 35, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(380, floorY[firstFloor] - 35, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);
        // Second floor
        theSpike = this.add.sprite(130, floorY[secondFloor] - spikeOffset, "evenSpikeTall" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(210, floorY[secondFloor] - spikeOffset * 3, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(210, floorY[secondFloor] - spikeOffset * 5, "evenSpike" + level);
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

        // third floor
        theSpike = this.add.sprite(200, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);


        theSpike = this.add.sprite(200, floorY[thirdFloor] - spikeOffset * 6, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(230, floorY[thirdFloor] - spikeOffset * 6, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(260, floorY[thirdFloor] - spikeOffset * 6, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(290, floorY[thirdFloor] - spikeOffset * 6, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(310, floorY[thirdFloor] - spikeOffset * 6, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(340, floorY[thirdFloor] - spikeOffset * 6, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(370, floorY[thirdFloor] - spikeOffset * 6, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(400, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(400, floorY[thirdFloor] - spikeOffset * 6, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(430, floorY[thirdFloor] - spikeOffset * 6, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(460, floorY[thirdFloor] - spikeOffset * 6, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(490, floorY[thirdFloor] - spikeOffset * 6, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(505, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(505, floorY[thirdFloor] - spikeOffset * 6, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);


    },

    startLevel5: function() {
        spikesGroup = this.add.group();
        spikesGroup.enableBody = true;

        theSpike = this.add.sprite(150, floorY[firstFloor] + 10, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(170, floorY[firstFloor] + 10, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(260, floorY[firstFloor] + 10, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(280, floorY[firstFloor] + 10, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(370, floorY[firstFloor] + 10, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(390, floorY[firstFloor] + 10, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(480, floorY[firstFloor] + 10, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(500, floorY[firstFloor] + 10, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        // Second floor
        theSpike = this.add.sprite(15, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(95, floorY[secondFloor] - spikeOffset * 3, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(175, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(255, floorY[secondFloor] - spikeOffset * 3, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(335, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(415, floorY[secondFloor] - spikeOffset * 3, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(495, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        // Third floor
        if (floorNumber - 1 == thirdFloor) {
            var text = this.add.sprite(levelStart - this.cache.getImage("map5text3").width / 2, floorY[thirdFloor] - spikeOffset * 8, "map5text3");
            text.anchor.setTo(0.5, 0.5);
            var tween = this.add.tween(text);
            tween.to({
                x: levelEnd / 2
            }, 1000).start();

        }
    },

    startLevel6: function() {
        spikesGroup = this.add.group();
        spikesGroup.enableBody = true;
        // First floor
        theSpike = this.add.sprite(160, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(160, floorY[firstFloor] - spikeOffset * 2.5, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(170, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(170, floorY[firstFloor] - spikeOffset * 2.5, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(340, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(340, floorY[firstFloor] - spikeOffset * 2.5, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(350, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(350, floorY[firstFloor] - spikeOffset * 2.5, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(520, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(520, floorY[firstFloor] - spikeOffset * 2.5, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(530, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(530, floorY[firstFloor] - spikeOffset * 2.5, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);


        // Second floor
        theSpike = this.add.sprite(320, floorY[secondFloor], "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(340, floorY[secondFloor], "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(260, floorY[secondFloor] - spikeOffset * 4, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(260, floorY[secondFloor] - spikeOffset * 6, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(280, floorY[secondFloor] - spikeOffset * 4, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(280, floorY[secondFloor] - spikeOffset * 6, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);


        // Third floor
        theSpike = this.add.sprite(160, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(180, floorY[thirdFloor] - spikeOffset * 2, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(245, floorY[thirdFloor] - spikeOffset * 4, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(275, floorY[thirdFloor] - spikeOffset * 4, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(305, floorY[thirdFloor] - spikeOffset * 4, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(335, floorY[thirdFloor] - spikeOffset * 4, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(365, floorY[thirdFloor] - spikeOffset * 4, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(395, floorY[thirdFloor] - spikeOffset * 4, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(460, floorY[thirdFloor] - spikeOffset * 2, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(480, floorY[thirdFloor] - spikeOffset, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);
    },

    startLevel7: function() {
        spikesGroup = this.add.group();
        spikesGroup.enableBody = true;
        // First floor
        theSpike = this.add.sprite(150, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(150, floorY[firstFloor] - spikeOffset * 2, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(300, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(300, floorY[firstFloor] - spikeOffset * 2, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(450, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(450, floorY[firstFloor] - spikeOffset * 2, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(600, floorY[firstFloor] - spikeOffset, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(600, floorY[firstFloor] - spikeOffset * 2, "oddSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        // second floor
        theSpike = this.add.sprite(50, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(50, floorY[secondFloor] - spikeOffset * 2, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(50, floorY[secondFloor] - spikeOffset * 6.5, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(50, floorY[secondFloor] - spikeOffset * 7.5, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(50, floorY[secondFloor] - spikeOffset * 8.5, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(50, floorY[secondFloor] - spikeOffset * 9.5, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(50, floorY[secondFloor] - 145, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(200, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(200, floorY[secondFloor] - spikeOffset * 2, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(200, floorY[secondFloor] - spikeOffset * 6.5, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(200, floorY[secondFloor] - spikeOffset * 7.5, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(200, floorY[secondFloor] - spikeOffset * 8.5, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(200, floorY[secondFloor] - spikeOffset * 9.5, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(200, floorY[secondFloor] - 145, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(350, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(350, floorY[secondFloor] - spikeOffset * 2, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(350, floorY[secondFloor] - spikeOffset * 6.5, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(350, floorY[secondFloor] - spikeOffset * 7.5, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(350, floorY[secondFloor] - spikeOffset * 8.5, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(350, floorY[secondFloor] - spikeOffset * 9.5, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(350, floorY[secondFloor] - 145, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(500, floorY[secondFloor] - spikeOffset, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(500, floorY[secondFloor] - spikeOffset * 2, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(500, floorY[secondFloor] - spikeOffset * 6.5, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(500, floorY[secondFloor] - spikeOffset * 7.5, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(500, floorY[secondFloor] - spikeOffset * 8.5, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(500, floorY[secondFloor] - spikeOffset * 9.5, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        theSpike = this.add.sprite(500, floorY[secondFloor] - 145, "evenSpike" + level);
        theSpike.anchor.setTo(0.5, 0.5);
        spikesGroup.add(theSpike);

        // Third floor
        if (floorNumber - 1 == thirdFloor) {
            var text = this.add.sprite(levelStart - this.cache.getImage("map7text3").width / 2, floorY[thirdFloor] - spikeOffset * 8, "map7text3");
            text.anchor.setTo(0.5, 0.5);
            var tween = this.add.tween(text);
            tween.to({
                x: levelEnd / 2
            }, 1000).start();

        }


    },

};
