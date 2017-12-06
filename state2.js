// TUTORIAL

// NOTES 
// - enemy dies with few shots if player fires quickly 
// - when player is in certain areas of left and right side...some bullets don't affect HP
// specifically when standing on 5 dark line from left (on depth floor)

cyberCity.state2 = function(){};

cyberCity.state2.prototype = {
    preload: function(){
        console.log('state2');
    },

    create: function(){
        lvlMusic1.resume();
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Load the back ground image
        levelOne = game.add.sprite(0,0,'level1')
        levelOne.height = game.height;
        levelOne.width = game.width;
        
        // Text instructions
        var text = game.add.text(game.world.centerX, game.world.centerY + 65, '- Press Arrow Keys OR WASD to move/jump -\n', {font: "30px Courier", fill: "#FFF", align: "center"});
        text.anchor.set(0.5);
        var text2 = game.add.text(game.world.centerX, game.world.centerY + 125, '- Press W OR UP to double jump when close to edge of ledge -\n', {font: "20px Courier", fill: "#CCC", align: "center"});
        text2.anchor.set(0.5);
        var text3 = game.add.text(game.world.centerX, game.world.centerY + 95, '- Click left button on mouse OR trackpad to shoot -\n', {font: "25px Courier", fill: "#DDD", align: "center"});
        text3.anchor.set(0.5);
        
        var text4 = game.add.text(game.world.centerX - 325, game.world.centerY - 225, '- Press 1, 2, or 3 to switch weapons and R to Reload -\n', {font: "20px Courier", fill: "#FFF", align: "center"}); // game.world.centerY - 300 if yall prefer it at top of screen
        text.anchor.set(0.5);
        
        
        // Create the depth ground (no physics just for asthetic)
        var ground1 = game.add.sprite(-30, game.height - 50, 'ground3D');
        ground1.height = 30;
        ground1.width = game.width+50;
        var ledge1_d = game.add.sprite(395, 300, 'ground3D');
        ledge1_d.height = 30;
        ledge1_d.width = 420;
        var ledge2_d = game.add.sprite(-145, 175, 'ground3D');
        ledge2_d.height = 40;
        ledge2_d.width = 470;
        var ledge3_d = game.add.sprite(950, 460, 'ground3D');
        ledge3_d.scale.setTo(0.08,0.1)
        
        // Platform group = ground + ledges
        platforms = game.add.group();
        platforms.enableBody = true;
            // Add ground 
        var ground = platforms.create(0, game.height - 30, 'ground');    
        ground.height = 30;
        ground.width = game.width;
        ground.body.immovable = true;
            //  Add two ledges
        var ledge0 = platforms.create(950, 470, 'ground');  
        ledge0.scale.setTo(0.1, 0.1);
        ledge0.body.immovable = true;
        var ledge1 = platforms.create(400, 320, 'ground');  
        ledge1.scale.setTo(0.33, 0.1);
        ledge1.body.immovable = true;
        var ledge2 = platforms.create(0, 200, 'ground');
        ledge2.height = 20;
        ledge2.width = 300;
        ledge2.body.immovable = true;
		
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
		
		
        // Add the enemySmall0
//        enemySmall0 = game.add.sprite(600, game.world.height - 500, 'enemySmall');
        enemySmall0 = game.add.sprite(600, 220, 'enemySmall');
        game.physics.arcade.enable(enemySmall0); 
		enemySmall0.body.immovable = true;
//        enemySmall0.body.gravity.y = 700;
        enemySmall0.body.collideWorldBounds = true;
        enemySmall0.width = 100;
        enemySmall0.height = 100;
        enemySmall0.animations.add('kaboom');
        enemySmall0.animations.add('kaboom2');
        enemySmall0.animations.add('left', [1], 10, true);
        enemySmall0.animations.add('right', [0], 10, true);
        enemySmall0.body.velocity.x = -100;
        enemySmall0.frame = 1;
        enemyText0 = game.add.text(enemySmall0.body.x, enemySmall0.body.y, '100', {font: "25px Courier", fill: "#ff3300", align: "center"});

        // Add the potion
        potion = game.add.sprite(100, 100, 'hp')
        game.physics.arcade.enable(potion);   
        potion.body.collideWorldBounds = true;
        potion.body.gravity.y = 900;
		
    },

    update: function(){
        //  Collide the player and the enemies with the platforms
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(enemySmall0, platforms);
        game.physics.arcade.collide(enemySmall0, player);
        game.physics.arcade.collide(potion, platforms);


        // Make the mark follow the cursor
        mark.rotation = game.physics.arcade.angleToPointer(mark);
        mark.body.x = player.body.x + 30;
        mark.body.y = player.body.y;
		
        // Fire a bullet
        if (game.input.activePointer.isDown && game.time.now > nextFire){
            fire();
        }
        // Bullets hits enemy
        game.physics.arcade.overlap(bullets, enemySmall0, this.hitEnemy); 
        enemyText0.x = enemySmall0.body.x + 24;
        enemyText0.y = enemySmall0.body.y - 20;
        // Enemy fires 
        if (game.time.now > firingTimer0 && enemySmall0.alive){
            //this.enemyFires0();
        }
        // Bullets hit player
        game.physics.arcade.overlap(enemyBullet0, player, this.hitPlayer0);
        
        // Move player and enemy
        this.playerMove();
        this.enemyMove();
        
        
        // Get the potion
        game.physics.arcade.overlap(player, potion, function(){
            addcheckPlayerHP();
            changeState(1); 
        }); 
		
		
    },
	
	render: function(){
		//game.debug.body(enemySmall0);
		//game.debug.body(bullet);
		//game.debug.body(ledge1);

	},

    hitEnemy: function(){
        ping.play();
        enemySmall0_hp = enemySmall0_hp - damage;
        bullet.kill();
        enemyText0.text = enemySmall0_hp;
        explosions = game.add.sprite(enemySmall0.body.x, enemySmall0.body.y, "kaboom2");
        explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30);
        explosions.animations.play("explode", 30, false, true )
        
        if(enemySmall0_hp <= 0){
            enemyText0.destroy();
            enemySmall0.kill();
            boom.play();
            explosions = game.add.sprite(enemySmall0.body.x, enemySmall0.body.y, "kaboom");
            explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
            explosions.animations.play("explode", 15, false, true )
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

        // Move the enemy 1
        if (enemySmall0.x <= 440){
            enemySmall0.body.velocity.x = 100;
            enemySmall0.frame = 0;
        }
        else if (enemySmall0.x >= 660){
            enemySmall0.body.velocity.x = -100;
            enemySmall0.frame = 1;
        }
    },
    enemyFires0: function() {
        //  Grab the first bullet we can from the pool
        enemyBullet0 = enemyBullets.getFirstExists(false);
        var shooter=enemySmall0;
        // And fire the bullet from this enemy
        enemyBullet0.reset(shooter.body.x, shooter.body.y + 50);
        cannon.play();
        game.physics.arcade.moveToObject(enemyBullet0,player,enemyBulletSpeed);
        firingTimer0 = game.time.now + 3000;
    },
    hitPlayer0: function(){
        enemyBullet0.kill();
        hit.play();
		playerHP -= 10;
        zeroHP();
        hpText.text = 'Player HP: ' + playerHP;
		// Get shot Handler
		gotshot = game.add.sprite(player.body.x-40, player.body.y, 'gotshot');
        gotshot.anchor.setTo(0,0)
        gotshot.scale.setTo(0.2,0.2);
        game.time.events.add(100, function() { game.add.tween(gotshot).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);}, this);
        
    }

}