// LEVEL JET

cyberCity.state4 = function(){};

// enemy variables
var enemyNum2 = 4;
var enemyText, enemyText1, enemyText2, enemyText3;
var enemyMedium, enemyMedium1, enemyMedium2, enemyMedium3;
var enemyMedium_hp = 100, enemyMedium1_hp = 100, enemyMedium2_hp = 100, enemyMedium3_hp = 100;

var enemyBullet, enemyBullet1, enemyBullet2, enemyBullet3;
var enemyBullets, enemyBullets1, enemyBullets2, enemyBullets3;
var firingTimer = 0, firingTimer1 = 0, firingTimer2 = 0, firingTimer3 = 0; // Firing rate of the enemy

// other needed variables
var arrow;
var potion, potion2;

cyberCity.state4.prototype = {
	preload: function() {
		// load background image
		game.load.image('level2', 'assets/level2.png');
        game.load.image('redArrow', 'assets/Arrow.png', 90, 90);
	},

	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		// load background in game
		levelTwo = game.add.sprite(0,0,'level2');
		levelTwo.height = game.height;
		levelTwo.width = game.width;

		// create the ground
		var ground1 = game.add.sprite(-30, game.height - 50, 'ground3D');
		ground1.height = 30;
		ground1.width = game.width+50;
        
        // middle right platform
		var ledge1_d = game.add.sprite(725, 395, 'ground3D');
		ledge1_d.height = 30;
		ledge1_d.width = 450;
		
//        // middle left platform
//		var ledge2_d = game.add.sprite(-145, 175, 'ground3D');
//		ledge2_d.height = 40;
//		ledge2_d.width = 470;
        
        // upper right platform
//        var ledge3_d = game.add.sprite(847, 125, 'ground3D');
//        ledge3_d.height = 40
//		ledge3_d.width = 300;
//        
        // middle-center platform
        var ledge4_d = game.add.sprite(395, 295, 'ground3D');
		ledge4_d.height = 40;
		ledge4_d.width = 225;

		// add platforms
		platforms = game.add.group();
		// allows player to collide with ground
		platforms.enableBody = true;
		
		// create actual ground
		var ground = platforms.create(0, game.height - 30, 'ground');
		ground.height = 30;
		ground.width = game.width;
		ground.body.immovable = true;

		//middle right platform border
		ledge1 = platforms.create(725, 420, 'ground');
		ledge1.scale.setTo(0.33, 0.27);
		//ledge1.height = 30;
		//ledge1.width = 400;
		ledge1.body.immovable = true;
		
//        // middle left platform border
//		ledge2 = platforms.create(0, 200, 'ground');
//        ledge2.scale.setTo(0.33, 0.27);
//		ledge2.height = 20;
//		ledge2.width = 300;
//		ledge2.body.immovable = true;
        
        // upper right platform border
//        ledge3 = platforms.create(850, 150, 'ground');
//        ledge3.scale.setTo(0.33, 0.27);
//        ledge3.height = 30;
//		ledge3.width = 300;
//        ledge3.body.immovable = true;
//        
        // middle center platform border
        ledge4 = platforms.create(400, 315, 'ground');
        ledge4.scale.setTo(0.33, 0.27);
        ledge4.height = 30;
		ledge4.width = 210;
        ledge4.body.immovable = true;

		createPlayer();
		createBullets();
		createWeaponBar();
		
        // Enemy bullets
        enemyBullets = game.add.group();
        enemyBullets.enableBody = true;
        enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullets.createMultiple(50, 'enemyBullet');
        enemyBullets.setAll('outOfBoundsKill', true);
        enemyBullets.setAll('checkWorldBounds', true);
        
        enemyBullets1 = game.add.group();
        enemyBullets1.enableBody = true;
        enemyBullets1.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullets1.createMultiple(50, 'enemyBullet');
        enemyBullets1.setAll('outOfBoundsKill', true);
        enemyBullets1.setAll('checkWorldBounds', true);
        
        enemyBullets2 = game.add.group();
        enemyBullets2.enableBody = true;
        enemyBullets2.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullets2.createMultiple(50, 'enemyBullet');
        enemyBullets2.setAll('outOfBoundsKill', true);
        enemyBullets2.setAll('checkWorldBounds', true);
        
        enemyBullets3 = game.add.group();
        enemyBullets3.enableBody = true;
        enemyBullets3.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullets3.createMultiple(50, 'enemyBullet');
        enemyBullets3.setAll('outOfBoundsKill', true);
        enemyBullets3.setAll('checkWorldBounds', true);
		
		// add shooting sfx
		bang1 = game.add.audio('bang1');
		boom = game.add.audio('boom');
		ping = game.add.audio('ping');
        hit = game.add.audio('hit');
        cannon = game.add.audio('cannon');

		// Add the jet enemy -- lowest level
		enemyMedium = game.add.sprite(600, game.world.height - 150, 'enemyMedium');
		game.physics.arcade.enable(enemyMedium);    
		enemyMedium.body.gravity.y = 0;
		enemyMedium.body.collideWorldBounds = true;
		enemyMedium.width = 100;
		enemyMedium.height = 100;
		enemyMedium.animations.add('kaboom');
        enemyMedium.animations.add('kaboom2');
		enemyMedium.animations.add('left', [1], 10, true);
		enemyMedium.animations.add('right', [0], 10, true);
		enemyMedium.body.velocity.x = 100;
		enemyMedium.frame = 1;
        enemyText = game.add.text(enemyMedium.body.x, enemyMedium.body.y, enemyMedium_hp, {font: "25px Courier", fill: "#ff3300", align: "center"});
        
        // middle right ledge
        enemyMedium1 = game.add.sprite(775, game.world.height - 300, 'enemyMedium');
        game.physics.arcade.enable(enemyMedium1);    
		enemyMedium1.body.gravity.y = 0;
		enemyMedium1.body.collideWorldBounds = true;
		enemyMedium1.width = 100;
		enemyMedium1.height = 100;
		enemyMedium1.animations.add('kaboom');
        enemyMedium1.animations.add('kaboom2');
		enemyMedium.animations.add('left', [1], 10, true);
		enemyMedium.animations.add('right', [0], 10, true);
		enemyMedium1.body.velocity.x = -100;
		enemyMedium1.frame = 1;
        enemyText1 = game.add.text(enemyMedium1.body.x, enemyMedium1.body.y, enemyMedium1_hp, {font: "25px Courier", fill: "#ff3300", align: "center"});
        
        // middle left ledge
        enemyMedium2 = game.add.sprite(150, game.world.height - 500, 'enemyMedium');
        game.physics.arcade.enable(enemyMedium2);    
		enemyMedium2.body.gravity.y = 0;
		enemyMedium2.body.collideWorldBounds = true;
		enemyMedium2.width = 100;
		enemyMedium2.height = 100;
		enemyMedium2.animations.add('kaboom');
        enemyMedium2.animations.add('kaboom2');
		enemyMedium.animations.add('left', [1], 10, true);
		enemyMedium.animations.add('right', [0], 10, true);
		enemyMedium2.body.velocity.x = -100;
		enemyMedium2.frame = 1;
        enemyText2 = game.add.text(enemyMedium2.body.x, enemyMedium2.body.y, enemyMedium2_hp, {font: "25px Courier", fill: "#ff3300", align: "center"});
        
        // upper right ledge
        enemyMedium3 = game.add.sprite(970, game.world.height - 500, 'enemyMedium');
        game.physics.arcade.enable(enemyMedium3);    
		enemyMedium3.body.gravity.y = 0;
		enemyMedium3.body.collideWorldBounds = true;
		enemyMedium3.width = 100;
		enemyMedium3.height = 100;
		enemyMedium3.animations.add('kaboom');
        enemyMedium3.animations.add('kaboom2');
		enemyMedium.animations.add('left', [1], 10, true);
		enemyMedium.animations.add('right', [0], 10, true);
		enemyMedium3.body.velocity.x = -100;
		enemyMedium3.frame = 1;
        enemyText3 = game.add.text(enemyMedium3.body.x, enemyMedium3.body.y, enemyMedium3_hp, {font: "25px Courier", fill: "#ff3300", align: "center"});
        
        // Add the first potion -- set to postion of enemy2
        potion = game.add.sprite(enemyMedium2.body.x, enemyMedium2.body.y, 'hp')
        game.physics.arcade.enable(potion);   
        potion.body.collideWorldBounds = true;
        potion.body.gravity.y = 900;
        potion.exists = false; // set to false so it doesn't appear at start
        
        // Add the second potion -- set to postion of enemy3
        potion2 = game.add.sprite(enemyMedium3.body.x, enemyMedium3.body.y, 'hp')
        game.physics.arcade.enable(potion2);   
        potion2.body.collideWorldBounds = true;
        potion2.body.gravity.y = 900;
        potion2.exists = false; // set to false so it doesn't appear at start
        
        // add in arrow
        arrow = game.add.sprite(925, 425, 'Arrow');
        game.physics.arcade.enable(arrow);  
        arrow.body.gravity.y = 0;
        arrow.body.collideWorldBounds = true;
        arrow.scale.setTo(1.5, 1.5);
        arrow.exists = false; // set to false so it doesn't appear at start
	},

	update: function() {
        
        game.physics.arcade.overlap(player, arrow, function() {
            console.log("player on arrow");
            changeState(5);
        });
        
        console.log("enemies left: " + enemyNum2);
        if (enemyNum2 <= 0) {
            arrow.exists = true;
        }
        
        // Get the first potion
        game.physics.arcade.overlap(player, potion, function(){
            console.log("player on potion");
            addcheckPlayerHP();
            hpText.text = 'Player HP: ' + playerHP;
            potion.destroy();
        }); 
        
        // Get the second potion
        game.physics.arcade.overlap(player, potion2, function(){
            console.log("player on potion2");
            addcheckPlayerHP();
            hpText.text = 'Player HP: ' + playerHP;
            potion2.destroy();
        }); 
        
		// enable collision for player and platforms/ground
		game.physics.arcade.collide(player, platforms);
        
		game.physics.arcade.collide(enemyMedium, platforms);
        game.physics.arcade.collide(enemyMedium1, platforms);
        game.physics.arcade.collide(enemyMedium2, platforms);
        game.physics.arcade.collide(enemyMedium3, platforms);
        
		game.physics.arcade.collide(enemyMedium, player);
        game.physics.arcade.collide(enemyMedium1, player);
        game.physics.arcade.collide(enemyMedium2, player);
        game.physics.arcade.collide(enemyMedium3, player);
        
        game.physics.arcade.collide(potion, platforms);
        game.physics.arcade.collide(potion2, platforms);


		// make the mark follow the cursor
		mark.rotation = game.physics.arcade.angleToPointer(mark);
		mark.body.x = player.body.x + 27;
		mark.body.y = player.body.y + 27;
		
        // Fire a bullet
        if (game.input.activePointer.isDown && game.time.now > nextFire){
            fire();
        }
        
        // Bullets hits enemy
		game.physics.arcade.overlap(bullets, enemyMedium, this.hitEnemy);
        game.physics.arcade.overlap(bullets, enemyMedium1, this.hitEnemy1);
        game.physics.arcade.overlap(bullets, enemyMedium2, this.hitEnemy2);
        game.physics.arcade.overlap(bullets, enemyMedium3, this.hitEnemy3);
        
        enemyText.x = enemyMedium.body.x + 24;
        enemyText.y = enemyMedium.body.y - 20;
        
        enemyText1.x = enemyMedium1.body.x + 24;
        enemyText1.y = enemyMedium1.body.y - 20;
        
        enemyText2.x = enemyMedium2.body.x + 24;
        enemyText2.y = enemyMedium2.body.y - 20;
        
        enemyText3.x = enemyMedium3.body.x + 24;
        enemyText3.y = enemyMedium3.body.y - 20;
        
        // Enemy fires 
        if (game.time.now > firingTimer && enemyMedium.alive){
            //console.log("setting enemy to fire");
            this.enemyFires();
        }
        
        if (game.time.now > firingTimer1 && enemyMedium1.alive){
            //console.log("setting enemy1 to fire");
            this.enemyFires1();
        }
        if (game.time.now > firingTimer2 && enemyMedium2.alive){
            //console.log("setting enemy2 to fire");
            this.enemyFires2();
        }
        if (game.time.now > firingTimer3 && enemyMedium3.alive){
            //console.log("setting enemy3 to fire");
            this.enemyFires3();
        }
        
        // Bullets hit player
        game.physics.arcade.overlap(enemyBullet, player, this.hitPlayer);
        game.physics.arcade.overlap(enemyBullet1, player, this.hitPlayer1);
        game.physics.arcade.overlap(enemyBullet2, player, this.hitPlayer2);
        game.physics.arcade.overlap(enemyBullet3, player, this.hitPlayer3);

		this.playerMove();
		this.enemyMove();
	},


	hitEnemy: function(){
		ping.play();
		enemyMedium_hp = enemyMedium_hp - damage;
		bullet.kill();
        enemyText.text = enemyMedium_hp;
		explosions = game.add.sprite(enemyMedium.body.x, enemyMedium.body.y, "kaboom2");
        explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30);
        explosions.animations.play("explode", 30, false, true )
		
		if (enemyMedium_hp < 0) {
            enemyNum2 --;
            enemyText.destroy();
			enemyMedium.kill();
			boom.play();
			explosions = game.add.sprite(enemyMedium.body.x, enemyMedium.body.y, 'kaboom2');
			explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
			explosions.animations.play("explode", 15, false, true )
		}
	},
    
    hitEnemy1: function(){
        ping.play();
		enemyMedium1_hp = enemyMedium1_hp - damage;
		bullet.kill();
        enemyText1.text = enemyMedium1_hp;
		explosions = game.add.sprite(enemyMedium1.body.x, enemyMedium1.body.y, "kaboom2");
        explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30);
        explosions.animations.play("explode", 30, false, true )
		if (enemyMedium1_hp < 0) {
            enemyNum2 --;
            enemyText1.destroy();
			enemyMedium1.kill();
			boom.play();
			explosions = game.add.sprite(enemyMedium1.body.x, enemyMedium1.body.y, 'kaboom');
			explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
			explosions.animations.play("explode", 15, false, true )
		}
	},
    
    hitEnemy2: function(){
		ping.play();
		enemyMedium2_hp = enemyMedium2_hp - damage;
		bullet.kill();
        enemyText2.text = enemyMedium2_hp;
		explosions = game.add.sprite(enemyMedium2.body.x, enemyMedium2.body.y, "kaboom2");
        explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30);
        explosions.animations.play("explode", 30, false, true )
		if (enemyMedium2_hp < 0) {
            enemyNum2 --;
            enemyText2.destroy();
			enemyMedium2.kill();
			boom.play();
			explosions = game.add.sprite(enemyMedium2.body.x, enemyMedium2.body.y, 'kaboom2');
			explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
			explosions.animations.play("explode", 15, false, true );
            // if enemy is dead, make it drop a potion to restore player health
            potion.exists = true;
		}
	},
    
    hitEnemy3: function(){
		ping.play();
		enemyMedium3_hp = enemyMedium3_hp - damage;
		bullet.kill();
        enemyText3.text = enemyMedium3_hp;
		explosions = game.add.sprite(enemyMedium3.body.x, enemyMedium3.body.y, "kaboom2");
        explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30);
        explosions.animations.play("explode", 30, false, true )
		if (enemyMedium3_hp < 0) {
            enemyNum2 --;
            enemyText3.destroy();
			enemyMedium3.kill();
			boom.play();
			explosions = game.add.sprite(enemyMedium3.body.x, enemyMedium3.body.y, 'kaboom2');
			explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
			explosions.animations.play("explode", 15, false, true )
            // if enemy is dead, make it drop a potion to restore player health
            potion2.exists = true;
		}
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

	enemyMove: function(){		
        // Move the enemy -- lowest level 
		if (enemyMedium.x <= 100){
			enemyMedium.body.velocity.x = 100;
			enemyMedium.frame = 0;
		} else if (enemyMedium.x >= 980){
            enemyMedium.body.velocity.x = -100;
			enemyMedium.frame = 1;
		}
        
        // Move the enemy 1 -- middle right ledge
        if (enemyMedium1.x <= 800){
            enemyMedium1.body.velocity.x = 100;
            enemyMedium1.frame = 0;
        } else if (enemyMedium1.x >= 1000){
            enemyMedium1.body.velocity.x = -100; 
            enemyMedium1.frame = 1;
        }
        
        // Move enemy 2 -- middle left lede
        if (enemyMedium2.x <= 50) {
            enemyMedium2.body.velocity.x = 100;
            enemyMedium2.frame = 0;
        } else if (enemyMedium2.x >= 400) {
            enemyMedium2.body.velocity.x = -100;
             enemyMedium2.frame = 1;
        }
        
        // Move enemy 3 -- upper right ledge
        if (enemyMedium3.x <= 675) {
            enemyMedium3.body.velocity.x = 100;
             enemyMedium3.frame = 0;
        } else if (enemyMedium3.x >= 1000) {
            enemyMedium3.body.velocity.x = -100;
             enemyMedium3.frame = 1;
        }
    },
    
    enemyFires: function() {
        //console.log("First Enemy Firing");
        //  Grab the first bullet we can from the pool
        enemyBullet = enemyBullets.getFirstExists(false);
        //var shooter = enemyMedium;
        // And fire the bullet from this enemy
        enemyBullet.reset(enemyMedium.body.x, enemyMedium.body.y + 50);
        cannon.play();
        game.physics.arcade.moveToObject(enemyBullet,player,enemyBulletSpeed);
        firingTimer = game.time.now + game.rnd.integerInRange(3000, 4000);
    },
    
    enemyFires1: function() {
        //console.log("Second Enemy Firing");
        //  Grab the first bullet we can from the pool
        enemyBullet1 = enemyBullets1.getFirstExists(false);
        //var shooter = enemyMedium1;
        // And fire the bullet from this enemy
        enemyBullet1.reset(enemyMedium1.body.x, enemyMedium1.body.y + 50);
        cannon.play();
        game.physics.arcade.moveToObject(enemyBullet1,player,enemyBulletSpeed);
        firingTimer1 = game.time.now + game.rnd.integerInRange(3000, 4000);
    },
    
    enemyFires2: function() {
        //console.log("Third Enemy Firing");
        //  Grab the first bullet we can from the pool
        enemyBullet2 = enemyBullets2.getFirstExists(false);
        //var shooter = enemyMedium1;
        // And fire the bullet from this enemy
        enemyBullet2.reset(enemyMedium2.body.x, enemyMedium2.body.y + 50);
        cannon.play();
        game.physics.arcade.moveToObject(enemyBullet2,player,enemyBulletSpeed);
        firingTimer2 = game.time.now + game.rnd.integerInRange(3000, 4000);
    },
    
    enemyFires3: function() {
        //console.log("Fourth Enemy Firing");
        //  Grab the first bullet we can from the pool
        enemyBullet3 = enemyBullets3.getFirstExists(false);
        //var shooter = enemyMedium1;
        // And fire the bullet from this enemy
        enemyBullet3.reset(enemyMedium3.body.x, enemyMedium3.body.y + 50);
        cannon.play();
        game.physics.arcade.moveToObject(enemyBullet3,player,enemyBulletSpeed);
        firingTimer3 = game.time.now + game.rnd.integerInRange(3000, 4000);
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
    
    hitPlayer1: function(){
        enemyBullet1.kill();
        hit.play();
        playerHP -= 10;
        zeroHP();
        hpText.text = 'Player HP: ' + playerHP;
		// Get shot Handler
		var gotshot1 = game.add.sprite(player.body.x-40, player.body.y, 'gotshot');
        gotshot1.anchor.setTo(0,0)
        gotshot1.scale.setTo(0.2,0.2);
        game.time.events.add(100, function() { game.add.tween(gotshot1).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);}, this);
    },

    hitPlayer2: function(){
        enemyBullet2.kill();
        hit.play();
        playerHP -= 10;
        zeroHP();
        hpText.text = 'Player HP: ' + playerHP;
		// Get shot Handler
		var gotshot2 = game.add.sprite(player.body.x-40, player.body.y, 'gotshot');
        gotshot2.anchor.setTo(0,0)
        gotshot2.scale.setTo(0.2,0.2);
        game.time.events.add(100, function() { game.add.tween(gotshot2).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);}, this);
    },
    
    hitPlayer3: function(){
        enemyBullet3.kill();
        hit.play();
        playerHP -= 10;
        zeroHP();
        hpText.text = 'Player HP: ' + playerHP;
		// Get shot Handler
		var gotshot3 = game.add.sprite(player.body.x-40, player.body.y, 'gotshot');
        gotshot3.anchor.setTo(0,0)
        gotshot3.scale.setTo(0.2,0.2);
        game.time.events.add(100, function() { game.add.tween(gotshot3).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);}, this);
    }
};