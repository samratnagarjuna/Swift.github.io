function BallObstacleZ(posX, posY, speed, group) {

    this.ball;
    this.ballbase;
    
    this.create = function create(game) {
           
            this.ball = game.add.isoSprite(posX, posY, 150, 'ball', 0, group);
            this.ball.anchor.set(0.5, 0.5);
            
            game.physics.isoArcade.enable(this.ball);
            this.ball.body.colliderWorldBounds = true;
            this.ball.body.velocity.z = speed;
            this.ball.body.immovable = true;
            
            this.ballbase = game.add.isoSprite(posX, posY, 0 , 'ballbase', 0 , group);
            this.ballbase.anchor.set(0.5, 0.5);
            
            game.physics.isoArcade.enable(this.ballbase);
            this.ballbase.body.colliderWorldBounds = true;
            this.ballbase.body.immovable = true;
                              
   }
       
        this.update = function update() {
                  
            if (this.ball.isoZ < 100) {
                this.ball.body.velocity.z = speed;
            }
            else if (this.ball.isoZ > 350) {
                this.ball.body.velocity.z = -speed;
            }
        }
    
   }