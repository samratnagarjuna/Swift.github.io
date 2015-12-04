function BallObstacleX(posZ, posY, speed, group) {
    
    this.ball;
    this.ballbase;
    //this.ballShadow;
    
    this.create = function create(game) {
        
        var leftTower1 = game.add.isoSprite(0, posY, 0, 'tower1', 0 , group);
        leftTower1.anchor.set(0.0, 1.0);
        game.physics.isoArcade.enable(leftTower1);
        leftTower1.body.colliderWorldBounds = true;
        leftTower1.body.immovable = true;
        
        this.ballShadow = game.add.isoSprite(100, posY, 0, 'ballShadow', 0, group);
        this.ballShadow.anchor.set(0.0, 1.0);
        
        this.ball = game.add.isoSprite(100, posY, posZ, 'ball', 0, group);
        this.ball.anchor.set(0.0, 1.0);
        game.physics.isoArcade.enable(this.ball);
        this.ball.body.colliderWorldBounds = true;
        this.ball.body.velocity.x = speed;
        this.ball.body.immovable = true;
        
        var rightTower1 = game.add.isoSprite(980, posY, 0, 'tower1', 0 , group);
        rightTower1.anchor.set(0.0, 1.0);
        game.physics.isoArcade.enable(rightTower1);
        rightTower1.body.colliderWorldBounds = true;
        rightTower1.body.immovable = true;
   }
        
    this.update = function update() {
        
        this.ballShadow.isoX = this.ball.isoX;
        this.ballShadow.isoY = this.ball.isoY;
                  
        if (this.ball.isoX < 100) {
            this.ball.body.velocity.x = speed;
        }
        else if (this.ball.isoX > 880) {
            this.ball.body.velocity.x = -speed;
        }
    }
}