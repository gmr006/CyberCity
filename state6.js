//LEVEL BOSS
cyberCity.state6 = function(){};

var ledge0, ledge1;
var boss, bosshp = 1000;
var bosshpText;
var enemyBullets, enemyBullet, bossBulletSpeed = 500;
var firingTimer = 0;    // Firing rate of the enemy
var nextJump = 0, jumpRate = 1500 + Math.random() * 1000;

var timer = 0;
var textGame;
var textVisible = 1;

cyberCity.state6.prototype = {
    preload: function(){
        console.log('state5');
        //load the background image
        game.load.image('level3','assets/level3.png');
        //load the boss
        game.load.spritesheet('boss','assets/boss.png', 300, 175);
        
        //load bosss bullet
        game.load.image('bossbullet','assets/bossBullet.png');
        //load bosss laser
        game.load.image('bossLaser','assets/bossLaser.png');
        //load boss shoot sound
        game.load.audio('bossbang','assets/sound/bossshoot.mp3');
    },
    create: function(){
        lvlMusic2.pause();
        lvlMusic3.play();
        
		game.world.bounds.setTo(0, 0, 1120, 600);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Load the background image
        levelOne = game.add.sprite(0,0,'level3')
        levelOne.height = game.height;
        levelOne.width = game.width;
        
        // Depth Background
        var ground1 = game.add.sprite(-30, game.height - 50, 'ground3D');
        ground1.height = 30;
        ground1.width = game.width+50;
        
        // Platform group = ground + ledges
        platforms = game.add.group();
        platforms.enableBody = true;
        // Add ground 
        var ground = platforms.create(0, game.height - 30, 'ground');    
        ground.height = 30;
        ground.width = game.width;
        ground.body.immovable = true;
        // Add ledge 
        ledge0 = platforms.create(500, game.height - 200, 'ground'); 
        ledge0.scale.setTo(0.2, 0.2);
        ledge0.body.immovable = true;
        // Add ledge 
        ledge1 = platforms.create(500, game.height - 400, 'ground'); 
        ledge1.scale.setTo(0.1, 0.2);
        ledge1.body.immovable = true;
        
        // Add the boss
        boss = game.add.sprite(900, game.world.height - 200, 'boss');
        game.physics.arcade.enable(boss);    
        boss.body.gravity.y = 1200;
        boss.body.collideWorldBounds = true;
        boss.width = 200;
        boss.height = 120;
        boss.animations.add('kaboom');
        boss.animations.add('left', [6,7,8,9,10,11], 20, true);
        boss.animations.add('right', [0,1,2,3,4,5], 20, true);
        boss.body.velocity.x = -100;
        boss.frame = 6;
		bossbang = game.add.audio('bossbang');
        // Display the boss hp
        bosshpText = game.add.text(boss.body.x, boss.body.y, '1000', {font: "30px Courier", fill: "#FFF", align: "center"});

		createPlayer();
		createBullets();
		// Add the weapon icons + ammo text
		icon1 = game.add.sprite(500, 50, 'iconPistol');
		icon1.anchor.setTo(0.5,0.5);
		icon1.scale.setTo(0.1,0.1);
		icon1.fixedToCamera = true;
		icon1.alpha = alpha1;
		ammoText1 = game.add.text(500, 60, pistolClip + '/' + pistolAmmo, {font: "10px Courier", fill: "#fff", align: "center"});
		icon1.anchor.setTo(0.5,0.5);
		icon2 = game.add.sprite(600, 50, 'iconRifle');
		icon2.anchor.setTo(0.5,0.5);
		icon2.scale.setTo(0.1,0.1);
		icon2.fixedToCamera = true;
		icon2.alpha = alpha2;
		ammoText2 = game.add.text(600, 60, rifleClip + '/' + rifleAmmo, {font: "10px Courier", fill: "#fff", align: "center"});
		icon3 = game.add.sprite(700, 50, 'iconLaser');
		icon3.anchor.setTo(0.5,0.5);
		icon3.scale.setTo(0.1,0.1);
		icon3.fixedToCamera = true;
		icon3.alpha = alpha3;
		ammoText3 = game.add.text(700, 60, laserAmmo, {font: "10px Courier", fill: "#fff", align: "center"}); 
		
        // Boss Bullets
        enemyBullets = game.add.group();
        enemyBullets.enableBody = true;
        enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullets.createMultiple(50, 'bossbullet');
        enemyBullets.setAll('outOfBoundsKill', true);
        enemyBullets.setAll('checkWorldBounds', true);
    },
    update: function(){
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(boss, platforms);

        // Make the mark follow the cursor
        mark.rotation = game.physics.arcade.angleToPointer(mark);
        mark.body.x = player.body.x + 30;
        mark.body.y = player.body.y;
		
        // Fire a bullet
        if (game.input.activePointer.isDown && game.time.now > nextFire){
            fire();
        }
        
        // Bullets hits enemy
        game.physics.arcade.overlap(bullets, boss, this.hitBoss); 
        bosshpText.x = boss.body.x + 24;
        bosshpText.y = boss.body.y - 20;
        // Enemy fires 
        if (game.time.now > firingTimer && boss.alive){
            this.enemyFires();
        }
        // Bullets hit player
        game.physics.arcade.overlap(enemyBullet, player, this.hitPlayer);
        
        this.bossMove();
        this.playerMove();
        this.ledge0Move();
        this.ledge1Move();
        
        //Display Game Over
        if (bosshp <= 0){
            this.functionupdate();
        }
    },

    hitBoss: function(){
        console.log('hitBoss')
        console.log(bosshp)
        ping.play();
        bullet.kill();
        bosshp -= damage;
        bosshpText.text = bosshp;
        explosions = game.add.sprite(boss.body.x, boss.body.y, "kaboom");
            explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
            explosions.animations.play("explode", 15, false, true )
        if(bosshp < 0){
            bosshpText.text = 'Boss Defeated'
            boss.kill();
            boom.play();
            explosions.animations.play("explode", 15, false, true )
            textGame = game.add.text(game.world.centerX + 20, game.world.centerY - 20, 'Game Over!',{font: "80px Courier", fill: "#DDDDDD", align: "center"});
            textGame.anchor.setTo(0.5, 0.5);
			
			changeState(7);
        }
    },
    enemyFires: function() {
        //  Grab the first bullet we can from the pool
        enemyBullet = enemyBullets.getFirstExists(false);
        var shooter=boss;
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y + 50);
        game.physics.arcade.moveToObject(enemyBullet,player,bossBulletSpeed);
        bossbang.play();
        firingTimer = game.time.now + game.rnd.integerInRange(2000, 3000);;
    },
    hitPlayer: function(){
        enemyBullet.kill();
        hit.play();
        playerHP -= 10;
        zeroHP();
        hpText.text = 'Player HP: ' + playerHP;
		// Get shot Handler
		var gotshot = game.add.sprite(player.body.x-40, player.body.y, 'gotshot');
        gotshot.anchor.setTo(0,0)
        gotshot.scale.setTo(0.2,0.2);
        game.time.events.add(100, function() { game.add.tween(gotshot).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);}, this);
    },
    playerMove: function(){
        // Reset the player velocity (make her stop)
        player.body.velocity.x = 0;
        // Player movement mechanisms 
        if (cursors.left.isDown || left.isDown){           // Move to the left
            player.body.velocity.x = -350;
            player.animations.play('left');
            facingRight = 0;
        }
        else if (cursors.right.isDown || right.isDown){     // Move to the right
            player.body.velocity.x = 350;
            player.animations.play('right');
            facingRight = 1;
        }
        else{                               // Stand still
            player.animations.stop();
            if(facingRight == 1){
                player.frame = 4;
            }
            else{
                player.frame = 3;
            }
        }                                   // Jump 
        if ((up.isDown || cursors.up.isDown) && (player.body.touching.down||player.body.touching.left||player.body.touching.right)){
            player.body.velocity.y = -500;  
        }
        if (cursors.down.isDown || down.isDown){
            player.body.velocity.y = 600;  
        }
    },
    bossMove: function(){
        if(boss.body.velocity.x <= 200){ // Just in case the bose is stopped in the middle
            boss.body.velocity.x = -350;
            boss.animations.play('left');
        }
        if(game.time.now > nextJump){
            nextJump = game.time.now + jumpRate;
            boss.body.velocity.y = -900;
            console.log("jumpnow")
        }
        if (boss.x <= 10){
                boss.body.velocity.x = 350;
                boss.animations.play('right');
            }
        else if (boss.x >= 900){
            boss.body.velocity.x = -350;
            boss.animations.play('left');
        }
    },
    ledge0Move(){
        if (ledge0.x <= 50){
            ledge0.body.velocity.x = 150;
        }
        else if (ledge0.x >= 800){
            ledge0.body.velocity.x = -150;
        }
        if(ledge0.body.velocity.x == 0){ // Just in case the bose is stopped in the middle
            ledge0.body.velocity.x = -150;
        }
    },
    ledge1Move(){
        if (ledge1.x <= 50){
            ledge1.body.velocity.x = 150;
        }
        else if (ledge1.x >= 800){
            ledge1.body.velocity.x = -150;
        }
        if(ledge1.body.velocity.x == 0){ // Just in case the bose is stopped in the middle
            ledge1.body.velocity.x = 150;
        }
    },
    functionupdate: function(){    
    timer += game.time.elapsed; //this is in ms, not seconds.    
    console.log(textVisible);
    console.log(timer);
    if ( timer >= 1000 ){
        timer -= 1000; 
        if(textVisible == 1){
            textGame.destroy();
            textVisible = 0;
        }
        else{
            textGame = game.add.text(game.world.centerX + 20, game.world.centerY - 20, 'Game Over!',{font: "80px Courier", fill: "#DDDDDD", align: "center"});
            textGame.anchor.setTo(0.5, 0.5);
            textVisible = 1;
        }
    }}
};