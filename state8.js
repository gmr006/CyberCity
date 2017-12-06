cyberCity.state8 = function(){};

var pistol, rifle, laser;
var enemyPatrol1, enemyPatrol2;
var enemyPatrol1_hp = 100, enemyPatrol2_hp = 100;
var enemyText1, enemyText2;
var beenHit = 0, nextHit;
cyberCity.state8.prototype = {
    preload: function(){
        game.load.image('tiles', 'assets/tilemaps/scifi_platformTiles.png', 32, 32);
		game.load.tilemap('tilemap', 'assets/tilemaps/tile.json', null, Phaser.Tilemap.TILED_JSON);
    },

    create: function(){
        lvlMusic2.play();
        
    	game.physics.startSystem(Phaser.Physics.ARCADE);
		
		var map = game.add.tilemap('tilemap');
        map.addTilesetImage('scifi_platformTiles', 'tiles');
        
        // add in layers from tile map
        groundLayer = map.createLayer('BackLayer');
        platformsLayer = map.createLayer('GroundLayer'); 
		
		map.setCollisionBetween(455, 457, true, 'GroundLayer'); 
		map.setCollisionBetween(146, 147, true, 'GroundLayer'); 
		map.setCollisionBetween(181, 182, true, 'GroundLayer'); 
		map.setCollisionBetween(299, 301, true, 'GroundLayer'); 
		map.setCollisionBetween(334, 336, true, 'GroundLayer'); 
		map.setCollisionBetween(369, 371, true, 'GroundLayer'); 
		groundLayer.resizeWorld();
		
		arrow = game.add.sprite(3100, 160, 'Arrow');
		arrow.anchor.setTo(0.5, 0.5);
		arrow.scale.setTo(1.5, 1.5);
        game.physics.arcade.enable(arrow);  
        
		createPlayer();
		hpText.fixedToCamera = true;
		game.camera.follow(player);
		pistolAmmo = 0;
		pistolClip = 0;
		rifleAmmo = 0;
		rifleClip = 0;
		laserAmmo = 0;
		createBullets();
		createWeaponBar();
		ammoText3.text = laserAmmo;
		
		// Add the pistol pickup; 
		pistol = game.add.sprite(510, 330, 'iconPistol')
		pistol.anchor.setTo(0.5, 0.5);
		pistol.scale.setTo(0.1,0.1);
        game.physics.arcade.enable(pistol);   
        pistol.body.collideWorldBounds = true;
		pistol.body.bounce.set(1);
		pistol.body.gravity.set(0, 100);
		
		// Add the rifle pickup; 
		rifle = game.add.sprite(1265, 350, 'iconRifle')
		rifle.anchor.setTo(0.5, 0.5);
		rifle.scale.setTo(0.1,0.1);
        game.physics.arcade.enable(rifle);   
        rifle.body.collideWorldBounds = true;
		rifle.body.bounce.set(1);
		rifle.body.gravity.set(0, 100);
		
		// Add the laser pickup; 
		laser = game.add.sprite(2630, 262, 'iconLaser')
		laser.anchor.setTo(0.5, 0.5);
		laser.scale.setTo(0.1,0.1);
        game.physics.arcade.enable(laser);   
        laser.body.collideWorldBounds = true;
		laser.body.bounce.set(1);
		laser.body.gravity.set(0, 100);
		
		// Add patrol enemy 1
		enemyPatrol1 = game.add.sprite(1389, 486, 'enemySmall');
		enemyPatrol1.anchor.setTo(0.5, 0.5);
		enemyPatrol1.scale.setTo(0.5);
		game.physics.arcade.enable(enemyPatrol1);    
		enemyPatrol1.body.gravity.set(0, 100);
        enemyPatrol1.body.immovable = true;
		enemyPatrol1.animations.add('kaboom');
        enemyPatrol1.animations.add('kaboom2');
		enemyPatrol1.animations.add('left', [1], 10, true);
		enemyPatrol1.animations.add('right', [0], 10, true);
		enemyPatrol1.body.velocity.x = 100;
		enemyPatrol1.frame = 0;
        enemyText1 = game.add.text(enemyPatrol1.body.x, enemyPatrol1.body.y, enemyPatrol1_hp, {font: "25px Courier", fill: "#ff3300", align: "center"});
		// Add patrol enemy 1
		enemyPatrol2 = game.add.sprite(2250, 486, 'enemySmall');
		enemyPatrol2.anchor.setTo(0.5, 0.5);
		enemyPatrol2.scale.setTo(0.5);
		game.physics.arcade.enable(enemyPatrol2);    
		enemyPatrol2.body.gravity.set(0, 100);
        enemyPatrol2.body.immovable = true;
		enemyPatrol2.animations.add('kaboom');
        enemyPatrol2.animations.add('kaboom2');
		enemyPatrol2.animations.add('left', [1], 10, true);
		enemyPatrol2.animations.add('right', [0], 10, true);
		enemyPatrol2.body.velocity.x = 100;
		enemyPatrol2.frame = 0;
        enemyText2 = game.add.text(enemyPatrol2.body.x, enemyPatrol2.body.y, enemyPatrol2_hp, {font: "25px Courier", fill: "#ff3300", align: "center"});
    },

    update: function(){
        game.physics.arcade.collide(player, platformsLayer);
		game.physics.arcade.collide(pistol, platformsLayer);
		game.physics.arcade.collide(rifle, platformsLayer);
		game.physics.arcade.collide(laser, platformsLayer);
		game.physics.arcade.collide(enemyPatrol1, platformsLayer);
		game.physics.arcade.collide(enemyPatrol2, platformsLayer);
		//game.physics.arcade.collide(player, enemyPatrol1);
		//game.physics.arcade.collide(player, enemyPatrol2);
		game.physics.arcade.overlap(player, pistol, this.getPistol);
		game.physics.arcade.overlap(player, rifle, this.getRifle);
		game.physics.arcade.overlap(player, laser, this.getLaser);
		game.physics.arcade.overlap(player, arrow, function() {
            changeState(3);
        });
        game.physics.arcade.overlap(bullets, enemyPatrol1, this.hitEnemy1);
		game.physics.arcade.overlap(bullets, enemyPatrol2, this.hitEnemy2);
		
		game.physics.arcade.collide(player, enemyPatrol1, function(){
			if(beenHit == 0){
				player.body.velocity.y = -500;
				playerHP -= 2;
				hit.play();
				hpText.text = 'Player HP: ' + playerHP;
				// Get shot Handler
				var gotshot = game.add.sprite(player.body.x-40, player.body.y, 'gotshot');
				gotshot.anchor.setTo(0,0)
				gotshot.scale.setTo(0.2,0.2);
				game.time.events.add(100, function() { game.add.tween(gotshot).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);}, this);
				beenHit = 1;
				nextHit = game.time.now + 700;
			}
		});
		game.physics.arcade.collide(player, enemyPatrol2, function(){
			if(beenHit == 0){
				player.body.velocity.y = -500;
				playerHP -= 2;
				hit.play();
				hpText.text = 'Player HP: ' + playerHP;
				// Get shot Handler
				var gotshot = game.add.sprite(player.body.x-40, player.body.y, 'gotshot');
				gotshot.anchor.setTo(0,0)
				gotshot.scale.setTo(0.2,0.2);
				game.time.events.add(100, function() { game.add.tween(gotshot).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);}, this);
				beenHit = 1;
				nextHit = game.time.now + 700;
			}
		});
		
		if(game.time.now > nextHit){
			beenHit = 0;
		}
		// Make player move
		this.playerMove();
		this.enemy1Move();
		this.enemy2Move();
		// Make the mark follow the cursor
        mark.rotation = game.physics.arcade.angleToPointer(mark);
        mark.body.x = player.body.x + 30;
        mark.body.y = player.body.y;
		// Fire a bullet
        if (game.input.activePointer.isDown && game.time.now > nextFire){
            fire();
        }
    },
	
	render: function(){
		//game.debug.bodyInfo(player, 32, 320);
		//game.debug.body(platformsLayer);
		//game.debug.body(arrow);
	},
	getPistol: function(){
		reload.play();
		pistol.kill();
		pistolAmmo = 84;
		pistolClip = 7;
		ammoText1.text = pistolClip + '/' + pistolAmmo;
		
	},
	getRifle: function(){
		reload.play();
		rifle.kill();
		rifleAmmo = 90;
		rifleClip = 30;
		ammoText2.text = rifleClip + '/' + rifleAmmo;
		
	},
	getLaser: function(){
		reload.play();
		laser.kill();
		laserAmmo = 200;
		ammoText3.text = laserAmmo;
	},
	hitEnemy1: function(){
        ping.play();
        enemyPatrol1_hp = enemyPatrol1_hp - damage;
        bullet.kill();
        enemyText1.text = enemyPatrol1_hp;
        explosions = game.add.sprite(enemyPatrol1.body.x, enemyPatrol1.body.y, "kaboom2");
        explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30);
        explosions.animations.play("explode", 30, false, true )
        
        if(enemyPatrol1_hp <= 0){
            enemyText1.destroy();
            enemyPatrol1.kill();
            boom.play();
            explosions = game.add.sprite(enemyPatrol1.body.x, enemyPatrol1.body.y, "kaboom");
            explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
            explosions.animations.play("explode", 15, false, true )
        } 
    },
	hitEnemy2: function(){
        ping.play();
        enemyPatrol2_hp = enemyPatrol2_hp - damage;
        bullet.kill();
        enemyText2.text = enemyPatrol2_hp;
        explosions = game.add.sprite(enemyPatrol2.body.x, enemyPatrol2.body.y, "kaboom2");
        explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30);
        explosions.animations.play("explode", 30, false, true )
        
        if(enemyPatrol2_hp <= 0){
            enemyText2.destroy();
            enemyPatrol2.kill();
            boom.play();
            explosions = game.add.sprite(enemyPatrol2.body.x, enemyPatrol2.body.y, "kaboom");
            explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
            explosions.animations.play("explode", 15, false, true )
        } 
    },
	enemy1Move: function(){
		enemyText1.x = enemyPatrol1.body.x + 24;
        enemyText1.y = enemyPatrol1.body.y - 20;
        // Move the enemy 1
        if (enemyPatrol1.x <= 1380){
            enemyPatrol1.body.velocity.x = 100;
            enemyPatrol1.frame = 0;
        }
        else if (enemyPatrol1.x >= 2030){
            enemyPatrol1.body.velocity.x = -100;
            enemyPatrol1.frame = 1;
        }
    },
	enemy2Move: function(){
		enemyText2.x = enemyPatrol2.body.x + 24;
        enemyText2.y = enemyPatrol2.body.y - 20;
        // Move the enemy 1
        if (enemyPatrol2.x <= 2250){
            enemyPatrol2.body.velocity.x = 100;
            enemyPatrol2.frame = 0;
        }
        else if (enemyPatrol2.x >= 2960){
            enemyPatrol2.body.velocity.x = -100;
            enemyPatrol2.frame = 1;
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
        if ((up.isDown || cursors.up.isDown) && (player.body.touching.down||player.body.blocked.down||player.body.blocked.left||player.body.blocked.right)){
            player.body.velocity.y = -500;
        }
        if (cursors.down.isDown || down.isDown){
            player.body.velocity.y = 600;  
        }
    }

}