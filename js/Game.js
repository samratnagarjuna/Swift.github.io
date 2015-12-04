var init = function () {
    var elem = document.getElementById("play");
    elem.remove();
    var game = new Phaser.Game(1920 - 25, 1080-40, Phaser.AUTO, 'gameContainer');
    
    var floorGroup;
    var obstacleGroup;
    var boostGroup;
    var slowGroup;
    var player, playerShadow;
    var cursor;
    
    var laserObstacle;
    var laserObstacle_1;
    var score;
    var scoreText;
    var restartText;
    var gameOver;
    var deathSprite;
    var over;
    var speed;
    var ySpeed;
    
    var backgroundMusic;
    var explodeMusic;
    var boostMusic;
    var slowMusic;
    

    
    var boostPos = [{x: 300, y:17110 }, {x: 600, y: 17110},{x: 130, y: 13580},{x: 370, y: 13580},{x: 600, y: 13580},{x: 850, y: 13580}, {x: 50, y: 8200}, {x: 900, y: 8200}];
    
    var slowPos = [{x:250, y: 18080}, {x: 450, y: 18080}, {x: 650, y: 18080}, {x: 220, y: 10580}, {x: 500, y: 10580},{x: 770, y: 10580}, {x: 350, y: 8200}, {x: 640, y: 8200}];
    
    var Swift = function (game) { };
	Swift.Game = function (game) { };
    
    Swift.Game.prototype = {
        
        preload: function () {
            
            //Load assets
            game.load.image('background', '../assets/sprites/background.png');
            game.load.image('BGPlanets6', '../assets/sprites/BGPlanets6.png');
            game.load.image('BGPlanets12', '../assets/sprites/BGPlanets12.png');
            game.load.image('BGPlanets5', '../assets/sprites/BGPlanets5.png');
            game.load.image('BGPlanets1', '../assets/sprites/BGPlanets1.png');
            game.load.image('tile', '../assets/sprites/tile.png');
            game.load.image('tower', '../assets/sprites/tower_block.png');
            game.load.image('laser', '../assets/sprites/laser.png');
            game.load.image('tower1', '../assets/sprites/tower1.png');
            game.load.image('tower2', '../assets/sprites/tower2.png');
            game.load.image('cylinder', '../assets/sprites/cylinder.png');
            game.load.image('smallcylinder', '../assets/sprites/smallcylinder.png');
            game.load.image('electricWallBig', '../assets/sprites/ElectricWallBig.png');
            game.load.image('shortTower', '../assets/sprites/shortTower.png');
            game.load.image('ball', '../assets/sprites/ball.png');
            game.load.image('ballbase', '../assets/sprites/ballbase.png');
            game.load.image('ballShadow', '../assets/sprites/ballShadow.png');
            game.load.image('boost', '../assets/sprites/boost.png');
            game.load.image('slow', '../assets/sprites/slow.png');
            game.load.spritesheet('explode', '../assets/animated_sprites/explode.png', 200, 200, 14);
            game.load.image('over', '../assets/sprites/gameOver.png');
            game.load.image('youwin', '../assets/sprites/youwin.png');
            
            //loading player sprites
            game.load.spritesheet('player', '../assets/animated_sprites/charactertiles.png', 120, 80, 15);
            game.load.spritesheet('player_shadow', '../assets/animated_sprites/shadows.png', 120, 80, 5);
             
            //loading sound
            explodeMusic = new Audio('../assets/audio/swift_crash.mp3');
            boostMusic = new Audio('../assets/audio/swift_boost.mp3');
            backgroundMusic = new Audio('../assets/audio/swift_beat.mp3');
            backgroundMusic.loop = true;
            slowMusic = new Audio('../assets/audio/swift_slow.mp3');
            
            
            //Set game configuration
            game.time.advancedTiming = true;
            game.plugins.add(new Phaser.Plugin.Isometric(game));
            game.world.setBounds(0, 0, 2048 * 20, 2048 * 5);
            game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
            game.iso.anchor.setTo(0.5, 0.0);
            
             
        },
        
        create: function () {
            
            //Add background
            gameOver = false;
            score = 0;
            speed = 500;
            ySpeed = 500;
            background = game.add.sprite(0, 0, 'background');
            background.fixedToCamera = true;
            BGPlanets6 = game.add.sprite(0, 0, 'BGPlanets6');
            BGPlanets6.fixedToCamera = true;
            BGPlanets6.scale.x = 0.5;
            BGPlanets6.scale.y = 0.5;
            
            BGPlanets12 = game.add.sprite(1500, 850, 'BGPlanets12');
            BGPlanets12.fixedToCamera = true;
            BGPlanets12.scale.x = 1;
            BGPlanets12.scale.y = 1;
            
            BGPlanets5 = game.add.sprite(1700, 500, 'BGPlanets5');
            BGPlanets5.fixedToCamera = true;
            BGPlanets5.scale.x = 1;
            BGPlanets5.scale.y = 1;
            
            BGPlanets1 = game.add.sprite(1300, 500, 'BGPlanets1');
            BGPlanets1.fixedToCamera = true;
            BGPlanets1.scale.x = 0.2;
            BGPlanets1.scale.y = 0.2;
            
            
            
            
            
            //Create groups
            floorGroup = game.add.group();
            boostGroup = game.add.group();
            slowGroup = game.add.group();
            obstacleGroup = game.add.group();
            
            //Set gravity
            game.physics.isoArcade.gravity.setTo(0, 0, 0);
            
            this.createTiles();
            this.createBoosts();
            this.createSlowDowns();
            
            //----------------------------------------------------------------------
            //Create Ball Obstacle 
            ballObstacle = new BallObstacleZ(160,16780,200, obstacleGroup);
            ballObstacle.create(game);
            
            ballObstacle1 = new BallObstacleZ(790,16780,520, obstacleGroup);
            ballObstacle1.create(game);
            
            ballObstacle2 = new BallObstacleZ(450,16380,460,obstacleGroup);
            ballObstacle2.create(game);
            
            ballObstacle3 = new BallObstacleZ(160,15980,400,obstacleGroup);
            ballObstacle3.create(game);
            
            ballObstacle4 = new BallObstacleZ(790,15980,340,obstacleGroup);
            ballObstacle4.create(game);
            
            ballObstacle5 = new BallObstacleZ(450,15580,280,obstacleGroup);
            ballObstacle5.create(game);
            
            
            ballObstacle6 = new BallObstacleZ(160,15180,220,obstacleGroup);
            ballObstacle6.create(game);
            
            ballObstacle7 = new BallObstacleZ(790,15180,160,obstacleGroup);
            ballObstacle7.create(game);
            
            //Create BallObstacleX
            
            ballObstacle8 = new BallObstacleX(250,13380,100,obstacleGroup);
            ballObstacle8.create(game);
            
           
            //Create Laser Obstacle
            
            laserObstacle1 = new LaserObstacle(0, 17880, 13,300, obstacleGroup);
            laserObstacle1.createLaserObstacle(game);
            
            laserObstacle2 = new LaserObstacle(0, 14780, 5,400, obstacleGroup);
            laserObstacle2.createLaserObstacle(game);
            
            laserObstacle3 = new LaserObstacle(500, 14780, 6,430, obstacleGroup);
            laserObstacle3.createLaserObstacle(game);
            
            laserObstacle4 = new LaserObstacle(0, 14180, 13, 250, obstacleGroup);
            laserObstacle4.createLaserObstacle(game);
            
            laserObstacle5 = new LaserObstacle(0,12580, 6,100, obstacleGroup);
            laserObstacle5.createLaserObstacle(game);
            
            laserObstacle6 = new LaserObstacle(450, 12280, 6 , 60, obstacleGroup);
            laserObstacle6.createLaserObstacle(game);
            
             //Create Walls
            createWall(0,19480,6);
            createWall(600,19180,5);
            createWall(0,18580,6);
            //createWall(0,2048*5,8);
            
            //Create Cylinders
            createCylinder(40,17710);
            createCylinder(248,17710);
            createCylinder(456,17710);
            createCylinder(664,17710);
            createCylinder(872,17710);
            
            //Create Towers1
            createTowers1(50, 16880);
            createTowers1(930, 16880);
            createTowers1(50,16480);
            createTowers1(930,16480);
            createTowers1(50,16080);
            createTowers1(930,16080);
            createTowers1(50,15680);
            createTowers1(930,15680);
            createTowers1(50,15280);
            createTowers1(930,15280);
            
            //Create Towers2
            createTowers2(250, 11880);
            createTowers2(750, 11880);
            
            //Create SmallCylinder
            
            createSmallCylinder(0, 11480);
            createSmallCylinder(500, 11480);
            createSmallCylinder(990,11480);           
            
            //Create shortTowers
            createshortTowers(0,12980);
            createshortTowers(250,12980);
            createshortTowers(500,12980);
            createshortTowers(750,12980);
            createshortTowers(990,12980);
            
            //--------------------------------------------------------------------------
            
            //-------------------------------------------
            
            createTowers1(0, 10090);
            ballObstacle_00 = new BallObstacleZ(240-50,10000,100,obstacleGroup);
            ballObstacle_00.create(game);
            ballObstacle_01 = new BallObstacleZ(240*2,10000,100,obstacleGroup);
            ballObstacle_01.create(game);
            ballObstacle_02 = new BallObstacleZ(240*3+50,10000,100,obstacleGroup);
            ballObstacle_02.create(game);
            createTowers1(980, 10090);
            
            
            laserObstacle_0 = new LaserObstacle(50, 9300, 4, 500, obstacleGroup);
            laserObstacle_0.createLaserObstacle(game);
            
            laserObstacle_1 = new LaserObstacle(500, 9800, 5, 200, obstacleGroup);
            laserObstacle_1.createLaserObstacle(game);
            
            
            
            ballObstacle_1 = new BallObstacleX(100,9000,500,obstacleGroup);
            ballObstacle_1.create(game);
            
            laserObstacle_2 = new LaserObstacle(0, 8500, 13, 600, obstacleGroup);
            laserObstacle_2.createLaserObstacle(game);         
            
            createTowers1(0, 8090);
            ballObstacle_20 = new BallObstacleZ(240-50,8000,300,obstacleGroup);
            ballObstacle_20.create(game);
            ballObstacle_21 = new BallObstacleZ(240*2,8000,300,obstacleGroup);
            ballObstacle_21.create(game);   
            ballObstacle_22 = new BallObstacleZ(240*3+50,8000,300,obstacleGroup);
            ballObstacle_22.create(game);
            createTowers1(980, 8090);
            
            createWall(240, 7800, 5);            
            createWall(0, 7200, 4);
            createWall(680, 7200, 4);
            
            ballObstacle_30 = new BallObstacleX(100,6800,700,obstacleGroup);
            ballObstacle_30.create(game);
            
            ballObstacle_31 = new BallObstacleX(250,6400,900,obstacleGroup);
            ballObstacle_31.create(game);
            
            createTowers1(0, 6090);
            ballObstacle_40 = new BallObstacleZ(240-50,6000,600,obstacleGroup);
            ballObstacle_40.create(game);
            ballObstacle_41 = new BallObstacleZ(240*2,6000,600,obstacleGroup);
            ballObstacle_41.create(game);   
            ballObstacle_42 = new BallObstacleZ(240*3+50,6000,600,obstacleGroup);
            ballObstacle_42.create(game);
            createTowers1(980, 6090);
            
            ballObstacle_5 = new BallObstacleX(300,5600,700,obstacleGroup);
            ballObstacle_5.create(game);
            ballObstacle_6 = new BallObstacleX(70,5600,900,obstacleGroup);
            ballObstacle_6.create(game);

            createTowers1(0, 5090);
            ballObstacle_70 = new BallObstacleZ(240-50,5000,600,obstacleGroup);
            ballObstacle_70.create(game);
            ballObstacle_71 = new BallObstacleZ(240*2,5000,650,obstacleGroup);
            ballObstacle_71.create(game);   
            ballObstacle_72 = new BallObstacleZ(240*3+50,5000,550,obstacleGroup);
            ballObstacle_72.create(game);
            createTowers1(980, 5090);
            
            laserObstacle_3 = new LaserObstacle(0, 4800, 13, 600, obstacleGroup);
            laserObstacle_3.createLaserObstacle(game);   
            
            laserObstacle_4 = new LaserObstacle(0, 4300, 13, 700, obstacleGroup);
            laserObstacle_4.createLaserObstacle(game);
            
            laserObstacle_5 = new LaserObstacle(0, 3800, 13, 600, obstacleGroup);
            laserObstacle_5.createLaserObstacle(game);
            
            laserObstacle_60 = new LaserObstacle(0, 3300, 6, 550, obstacleGroup);
            laserObstacle_60.createLaserObstacle(game);
            
            laserObstacle_61 = new LaserObstacle(540, 3340, 6, 650, obstacleGroup);
            laserObstacle_61.createLaserObstacle(game);
            
            ballObstacle_80 = new BallObstacleX(70,3000,700,obstacleGroup);
            ballObstacle_80.create(game);
            ballObstacle_81 = new BallObstacleX(200,3000,900,obstacleGroup);
            ballObstacle_81.create(game);
            ballObstacle_82 = new BallObstacleX(400,3000,800,obstacleGroup);
            ballObstacle_82.create(game);
            
            laserObstacle_70 = new LaserObstacle(0, 2300, 4, 600, obstacleGroup);
            laserObstacle_70.createLaserObstacle(game);
            
            laserObstacle_71 = new LaserObstacle(650, 2300, 4, 600, obstacleGroup);
            laserObstacle_71.createLaserObstacle(game);
            
            laserObstacle_80 = new LaserObstacle(0, 1900, 4, 700, obstacleGroup);
            laserObstacle_80.createLaserObstacle(game);
            
            laserObstacle_81= new LaserObstacle(650, 1900, 4, 700, obstacleGroup);
            laserObstacle_81.createLaserObstacle(game);
            
            laserObstacle_90 = new LaserObstacle(0, 1500, 4, 800, obstacleGroup);
            laserObstacle_90.createLaserObstacle(game);
            
            laserObstacle_91 = new LaserObstacle(650, 1500, 4, 800, obstacleGroup);
            laserObstacle_91.createLaserObstacle(game);
            
            
            createTowers1(300, 2500);
            createTowers1(300, 2100);
            createTowers1(600, 2100);
            createTowers1(600, 2500);
            createTowers1(300, 1700);
            createTowers1(300, 1300);
            createTowers1(600, 1700);
            createTowers1(600, 1300);
            
            
            
            
            ballObstacle_9 = new BallObstacleZ(450,2200,600,obstacleGroup);
            ballObstacle_9.create(game);
            
            ballObstacle_10 = new BallObstacleZ(450,1800,700,obstacleGroup);
            ballObstacle_10.create(game);
            
            ballObstacle_11 = new BallObstacleZ(450,1400,800,obstacleGroup);
            ballObstacle_11.create(game);
            //------------------------------------------------------------------------------------------
            
            
           
            player = game.add.isoSprite(512, 20480, 60, 'player', 0, obstacleGroup);
            player.anchor.set(0.5, 0.5);
            
            
            //create player shadow
            playerShadow = game.add.isoSprite(512, 20480, 0, 'player_shadow', 0, floorGroup);
            playerShadow.anchor.set(0.5, 0.5);

            
            //enable physics on player
            game.physics.isoArcade.enable(player);
            player.body.collideWorldBounds = true;
            //player.body.velocity.y = -ySpeed;
            this.setCamera();
            
            //Electric Wall End
            electricWallBig = game.add.isoSprite(-300, 0, -100, 'electricWallBig', 0, obstacleGroup);
            electricWallBig.anchor.set(0, 0);
            
            electricWallBig = game.add.isoSprite(100, 20, -100, 'electricWallBig', 0, obstacleGroup);
            electricWallBig.anchor.set(0, 0);
            
            
            //setup controls
            this.cursors = game.input.keyboard.createCursorKeys();
            
            scoreText = game.add.text(window.innerWidth - 300, 30, "Score: " + score, {font: "36px Trebuchet MS", fill: "#ffffff", align: "center"});
            scoreText.fixedToCamera = true;
           
            
            //restartText = game.add.text(window.innerWidth/2, window.innerHeight/2 , "", {font: "36px Trebuchet MS", fill: "#ffffff", align: "center"});
            //restartText.fixedToCamera = true;
            //restartText.anchor.x = Math.round(restartText.width * 0.5) / restartText.width;
            
            
            backgroundMusic.play();
            

        },
        
        update: function () {
            if (!gameOver) {
                this.setCamera();
                score = Math.round((20426 - player.isoY)/10);

            //Runner 
            player.body.velocity.y = -ySpeed;
            boostGroup.forEach(function (tile) {
                var inBounds = tile.isoBounds.containsXY(playerShadow.isoX, playerShadow.isoY);
                if (inBounds) {
                    ySpeed += 10;
                    boostMusic.play();
                    console.log(player.body.velocity.y);
                }
            });

            slowGroup.forEach(function (tile) {
                var inBounds = tile.isoBounds.containsXY(playerShadow.isoX, playerShadow.isoY);
                if (inBounds) {
                    ySpeed -= 10;
                    slowMusic.play();
                     console.log(player.body.velocity.y);
                }
            });
                
            
            if (this.cursors.up.isDown && player.isoZ < 400) {
                player.body.velocity.z = speed;
                player.body.velocity.x = 0;
                player.frame = Math.floor((Math.random() * 3) + 3);
                playerShadow.frame = 1;
            }
            else if (this.cursors.down.isDown && player.isoZ > 42) {
                player.body.velocity.z = -speed;
                player.body.velocity.x = 0;
                player.frame = Math.floor((Math.random() * 3) + 6);
                playerShadow.frame = 2;
            }
            else if (this.cursors.left.isDown) {
                player.body.velocity.x = -speed;
                player.body.velocity.z = 0;
                player.frame = Math.floor((Math.random() * 3) + 12);
                playerShadow.frame = 4;
            }
            else if (this.cursors.right.isDown && player.isoX < 1000) {
                player.body.velocity.x = speed;
                player.body.velocity.z = 0;
                player.frame = Math.floor((Math.random() * 3) + 9);
                playerShadow.frame = 3;
            }
            else {
                player.body.velocity.x = 0;
                player.body.velocity.z = 0;
                player.frame = Math.floor(Math.random() * 3);
                playerShadow.frame = 0;
            }                                                            //Runner
            
            
            /*if (game.input.keyboard.isDown(Phaser.Keyboard.W ) && player.isoZ < 400) {                       // Debugging purpose
                player.body.velocity.z = speed;
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                player.frame = Math.floor((Math.random() * 3) + 3);
                playerShadow.frame = 1;
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.S)&& player.isoZ > 42) {
                player.body.velocity.z = -speed;
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                player.frame = Math.floor((Math.random() * 3) + 6);
                playerShadow.frame = 2;
            }
            else if (this.cursors.up.isDown) {
                player.body.velocity.y = -ySpeed;
                player.body.velocity.x = 0;
                player.body.velocity.z = 0;
                player.frame = Math.floor(Math.random() * 3);
                playerShadow.frame = 0;
            }
            else if (this.cursors.down.isDown) {
                player.body.velocity.y = ySpeed;
                player.body.velocity.x = 0;
                player.body.velocity.z = 0;
                player.frame = Math.floor(Math.random() * 3);
                playerShadow.frame = 0;
            }
            else if (this.cursors.left.isDown) {
                player.body.velocity.x = -speed;
                player.body.velocity.y = 0;
                player.body.velocity.z = 0;
                player.frame = Math.floor((Math.random() * 3) + 12);
                playerShadow.frame = 4;
            }
            else if (this.cursors.right.isDown && player.isoX < 1000) {
                player.body.velocity.x = speed;
                player.body.velocity.y = 0;
                player.body.velocity.z = 0;
                player.frame = Math.floor((Math.random() * 3) + 9);
                playerShadow.frame = 3;
            }
            else {
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                player.body.velocity.z = 0;
                player.frame = Math.floor(Math.random() * 3);
            } */                                                             // Debugging purpose
            

                playerShadow.isoX = player.isoX;
                playerShadow.isoY = player.isoY;

                if (player.isoZ <= 800)
                    playerShadow.scale.setTo(1 - player.isoZ/800, 1 - player.isoZ/800);

                game.iso.topologicalSort(obstacleGroup, 10);
                

                game.physics.isoArcade.collide(player, obstacleGroup, function (playerObj) {
                    deathSprite = game.add.sprite(player.x, player.y, 'explode');
                    deathSprite.anchor.set(0.5, 0.5);
                    var kill = deathSprite.animations.add('kill');
                    kill.onComplete.add(endGame, this);
                    player.destroy();
                    playerShadow.destroy();
                    deathSprite.animations.play('kill', 12);
                    explodeMusic.play();
                });

                scoreText.setText("Score: " + score);
                
                //Debug code
                /*obstacleGroup.forEach(function (block) {
                    game.debug.body(block, 'rgba(189, 221, 235, 0.6)', false);
                });*/
                
            }
            else {
                
                if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
                    game.state.start(game.state.current);
                }
            }
            //--------------------------------------------
            laserObstacle1.update();
            laserObstacle2.update();
            laserObstacle3.update();
            laserObstacle4.update();
            laserObstacle5.update();
            laserObstacle6.update();
            ballObstacle.update();
            ballObstacle1.update();
            ballObstacle2.update();
            ballObstacle3.update();
            ballObstacle4.update();
            ballObstacle5.update();
            ballObstacle6.update();
            ballObstacle7.update();
            ballObstacle8.update();
            //---------------------------------------------
            ballObstacle_00.update();
            ballObstacle_01.update();
            ballObstacle_02.update();  
                
            laserObstacle_0.update();
            laserObstacle_1.update();
                
            ballObstacle_1.update();
            laserObstacle_2.update();
            
            ballObstacle_20.update();
            ballObstacle_21.update();
            ballObstacle_22.update(); 
            ballObstacle_30.update();
            ballObstacle_31.update();
            ballObstacle_40.update();
            ballObstacle_41.update();
            ballObstacle_42.update(); 
            ballObstacle_5.update();
            ballObstacle_6.update();
            ballObstacle_70.update();
            ballObstacle_71.update();
            ballObstacle_72.update();
            ballObstacle_80.update();
            ballObstacle_81.update();
            ballObstacle_82.update();
            ballObstacle_9.update();
            ballObstacle_10.update();
            ballObstacle_11.update();
            
            
            laserObstacle_3.update();
            laserObstacle_4.update(); 
            laserObstacle_5.update();
            laserObstacle_60.update();
            laserObstacle_61.update();
            laserObstacle_70.update();
            laserObstacle_71.update();
            laserObstacle_80.update();
            laserObstacle_81.update();
            laserObstacle_90.update();
            laserObstacle_91.update();
            //-----------------------------------
            console.log(player.isoY);
            if(player.isoY < 400)
            {
                youwin = game.add.sprite(0,0,'youwin'); 
                youwin.anchor.set(0,0);
                youwin.fixedToCamera = true;
                backgroundMusic.pause();
                gameOver = true;
            }
            
        },
        
        render: function () {
        },
        
        
        createBoosts: function() {
            for (var j = 0 ; j < boostPos.length ; j++ ) {
                var boost = game.add.isoSprite(boostPos[j].x, boostPos[j].y, 0, 'boost', 0, boostGroup);
                boost.anchor.set(0.75, 0.25);
            }
        },
        
        createSlowDowns: function() {
            for (var j = 0 ; j < slowPos.length ; j++ ) {
                var slow = game.add.isoSprite(slowPos[j].x, slowPos[j].y, 0, 'slow', 0, slowGroup);
                slow.anchor.set(0.75, 0.25);
            }
        }, 
        
        createTiles: function () {
            //Fix for zagged edges
            var floorTile;
	        for (var xt = 0, i = 0 ; xt < 1024; xt += 76, i += 1) {
	            for (var yt = 0, j = 0; yt < 2048 * 10; yt += 76, j += 1) {
	            	floorTile = game.add.isoSprite(xt, yt , 0, 'tile', 0, floorGroup);
                    //floorTile = game.add.isoSprite(xt + j * 6, yt + i * 5.5 , 0, 'tile', 0, floorGroup);
	            	floorTile.anchor.set(0.0, 1.0);
	            }
	        }

        },
        
       
        setCamera: function () {
            game.camera.focusOnXY(player.x + 500, player.y + 50);
        },
        
              render: function () {
        },
            
    };
    
    //End of Prototype
    
    function createWall(posX, posY, width)
    {
        var wall;
            for (var i = width ; i >= 0 ; i-- ) 
            {
                wall = game.add.isoSprite(posX + i * 76, posY + i * 5.5, 0, 'tower', 0 , obstacleGroup);
                wall.anchor.set(0.0, 1.0);
                
                //enable physics on wall
                game.physics.isoArcade.enable(wall);
                wall.body.colliderWorldBounds = true;
                wall.body.immovable = true;
            }
            
    }
    
     function createCylinder(posX, posY)
    {
        var cylinder;
            
            cylinder = game.add.isoSprite(posX, posY , -40 , 'cylinder', 0 , obstacleGroup);
            cylinder.anchor.set(0.0,1.0);
            
        
            //enable physics on cylinder
            game.physics.isoArcade.enable(cylinder);
            cylinder.body.colliderWorldBounds = true;
            cylinder.body.immovable = true;    
            
    }
    function createSmallCylinder(posX, posY)
    {
        var smallcylinder;
            
            smallcylinder = game.add.isoSprite(posX, posY, 0, 'smallcylinder', 0, obstacleGroup);
            smallcylinder.anchor.set(0.0,1.0);
            
            game.physics.isoArcade.enable(smallcylinder);
            smallcylinder.body.colliderWorldBounds = true;
            smallcylinder.body.immovable = true;
    
    }
    
    
      function createTowers1(posX, posY)
    {
        var tower1;
            
            tower1 = game.add.isoSprite(posX, posY ,0, 'tower1', 0 , obstacleGroup);
            tower1.anchor.set(0.0,1.0);
            
            game.physics.isoArcade.enable(tower1);
            tower1.body.colliderWorldBounds = true;
            tower1.body.immovable = true;    
            
    }
    
      
      function createTowers2(posX, posY)
    {
        var tower2;
            
            tower2 = game.add.isoSprite(posX, posY ,0, 'tower2', 0 , obstacleGroup);
            tower2.anchor.set(0.0,1.0);
            
            game.physics.isoArcade.enable(tower2);
            tower2.body.colliderWorldBounds = true;
            tower2.body.immovable = true;    
            
    }
    
     function createshortTowers(posX, posY)
    {
        var shortTower;
            
            shortTower = game.add.isoSprite(posX, posY ,0, 'shortTower', 0 , obstacleGroup);
            shortTower.anchor.set(0.0,1.0);
            
            game.physics.isoArcade.enable(shortTower);
            shortTower.body.colliderWorldBounds = true;
            shortTower.body.immovable = true;    
            
    }
    
            
    function endGame (sprite, animation) {
     
       // restartText.setText("Press R to restart");
    //    restartText.anchor.x = Math.round(restartText.width * 0.5) / restartText.width;
        over =  game.add.sprite(500,0,'over');
        over.anchor.set(0,0);
        over.fixedToCamera = true;
        backgroundMusic.pause();
        gameOver = true;
    }
    
    game.state.add('Game', Swift.Game);
    game.state.start('Game');
}

//window.onload = init;