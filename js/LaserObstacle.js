function LaserObstacle(leftTowerX, leftTowerY, blocks, speed, group) {
    this.leftTowerX = leftTowerX;
    this.leftTowerY = leftTowerY;
    this.blocks = blocks;
    this.laserZ = [100, 200, 300];
    this.laser = [];
    this.laserIndex = 0;
    this.group = group;
    
    this.createLaserObstacle = function create(game) {
        var leftTower = game.add.isoSprite(this.leftTowerX, this.leftTowerY, 0, 'tower', 0 , this.group);
        leftTower.anchor.set(0.0, 1.0);

        //enable physics on tower
        game.physics.isoArcade.enable(leftTower);
        leftTower.body.colliderWorldBounds = true;
        leftTower.body.immovable = true;

        
        for (var i = 1 ; i < blocks ; i++ ) {
            this.laser[i] = game.add.isoSprite(this.leftTowerX + i * 76, this.leftTowerY + i * 5.5, 0, 'laser', 0, this.group );
            this.laser[i].anchor.set(0.0, 1);
            game.physics.isoArcade.enable(this.laser[i]);
            this.laser[i].body.colliderWorldBounds = true;
            this.laser[i].body.velocity.z = this.speed;//--------------------------------------------------
            this.laser[i].body.immovable = true;
        }

        var rightTower = game.add.isoSprite(this.leftTowerX + blocks * 76, this.leftTowerY + blocks * 5.5, 0, 'tower', 0 , this.group);
        rightTower.anchor.set(0.0, 1.0);

        //enable physics on tower
        game.physics.isoArcade.enable(rightTower);
        rightTower.body.colliderWorldBounds = true;
        rightTower.body.immovable = true;
    }
    
    this.update = function update() {
        for (var i = 1 ; i < blocks ; i++ ) {            
            if (this.laser[i].isoZ <= 0) {                       //---------------------------
                this.laser[i].body.velocity.z = speed;
            }
            else if (this.laser[i].isoZ > 380) {                    //------------------------------------------
                this.laser[i].body.velocity.z = -speed;
            }
        }
    }
}