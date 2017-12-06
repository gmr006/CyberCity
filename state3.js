// LEVEL TANK

// **************** Side Notes *************** 
// - If the player shoots the enemy too quick, 
//then it dies with fewer hits than expected

// - 10/23/2017 Notes
// - Sometimes Players HP goes down and it doesn't seem like anything is hitting it
// ******************************************

// checklist of if I used added variables
// hpText - USED
// playerHP - USED
// enemyBullets - used on 1 enemy
// enemyBullet - used on 1 enemy
// enemyBulletSpeed - used on 1 enemy
// firingTimer - USED
// greenPotion - not YET

cyberCity.state3 = function(){};

// displays enemy hp 
var enemyText, enemyText1, enemyText2, enemyText3, enemyText4, enemyText5;

var enemySmall, enemySmall1, enemySmall2, enemySmall3, enemySmall4, enemySmall5;
var enemySmall_hp = 100, enemySmall1_hp = 100, enemySmall2_hp = 100, enemySmall3_hp = 100, enemySmall4_hp = 100, enemySmall5_hp = 100; 

// variables used for the enemy to shoot player 
var enemyBullets, enemyBullets1, enemyBullets2, enemyBullets3, enemyBullets4, enemyBullets5;
var enemyBulletSpeed = 200;
var enemyBullet, enemyBullet1, enemyBullet2, enemyBullet3, enemyBullet4, enemyBullet5;
var firingTimer = 0, firingTimer1 = 0, firingTimer2 = 0, firingTimer3 = 0, firingTimer4 = 0, firingTimer5 = 0; // Firing rate of the enemy

// potions 
var redPotion, redPotion1;

var enemyNum = 6;

cyberCity.state3.prototype = {
    preload: function(){
        //load the smallEnemy
        game.load.spritesheet('enemySmall','assets/enemySmall.png',200,200);
    },

    create: function(){
        lvlMusic2.resume();
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0, 0, 1120, 600);
        //game.physics.setBounds(1120, 600);
        // Load the back ground image
        levelOne = game.add.sprite(0,0,'level1')
        levelOne.height = game.height;
        levelOne.width = game.width;
        
        // 1. Create the depth ground (no physics just for asthetic)
        var ground1 = game.add.sprite(-100, game.height - 50, 'ground3D');
        ground1.height = 30;
        ground1.width = game.width+120;
        
        // 2. left depth ledge
        var ledge2_d = game.add.sprite(-145, 390, 'ground3D');
        ledge2_d.height = 35;
        ledge2_d.width = 475;
        
        // 3. right depth ledge
        var ledge3_d = game.add.sprite(820, 348, 'ground3D');
        ledge3_d.height = 35;
        ledge3_d.width = 400;
        
        // 4. middle depth ledge 
        var ledge1_d = game.add.sprite(433, 248, 'ground3D');
        ledge1_d.height = 30;
        ledge1_d.width = 285;
        
        // 5. top left depth edge
        var ledge4_d = game.add.sprite(-145, 120, 'ground3D');
        ledge4_d.height = 35;
        ledge4_d.width = 475;
        
        // 6. top right depth ledge 
        var ledge5_d = game.add.sprite(868, 145, 'ground3D');
        ledge5_d.height = 40;
        ledge5_d.width = 420;
        
        
        // Platform group = ground + ledges
        platforms = game.add.group();
        platforms.enableBody = true;
        
        // 1. This is the actual ground
        var ground = platforms.create(0, game.height - 30, 'ground');    
        ground.height = 30;
        ground.width = game.width;
        ground.body.immovable = true;
        
        // 2. left ledge
        ledge2 = platforms.create(0, 410, 'ground');
        ledge2.height = 20;
        ledge2.width = 303;
        ledge2.body.immovable = true;
        
        // 3. right ledge
        ledge3 = platforms.create(820, 375, 'ground');
        ledge3.height = 20;
        ledge3.width = 300;
        ledge3.body.immovable = true;
        
        // 4. middle ledge
        ledge1 = platforms.create(435, 270, 'ground');  
        ledge1.scale.setTo(0.22, 0.15);
        ledge1.body.immovable = true;
        
        // 5. top left ledge
        ledge4 = platforms.create(0, 145, 'ground');
        ledge4.height = 20;
        ledge4.width = 303;
        ledge4.body.immovable = true;
        
        // 6. top right ledge 
        ledge5 = platforms.create(870, 175, 'ground');
        ledge5.height = 20;
        ledge5.width = 250;
        ledge5.body.immovable = true;

		
        createPlayer();
        player.body.collideWorldBounds = true;
		createBullets();
		createWeaponBar();

        
        // Add the ENEMY bullets for enemySmall
        enemyBullets = game.add.group();
        enemyBullets.enableBody = true;
        enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullets.createMultiple(50, 'enemyBullet');
        enemyBullets.setAll('outOfBoundsKill', true);
        enemyBullets.setAll('checkWorldBounds', true);
        
        // Add the ENEMY bullets for enemySmall1
        enemyBullets1 = game.add.group();
        enemyBullets1.enableBody = true;
        enemyBullets1.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullets1.createMultiple(50, 'enemyBullet');
        enemyBullets1.setAll('outOfBoundsKill', true);
        enemyBullets1.setAll('checkWorldBounds', true);
        
        // Add the ENEMY bullets for enemySmall2
        enemyBullets2 = game.add.group();
        enemyBullets2.enableBody = true;
        enemyBullets2.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullets2.createMultiple(50, 'enemyBullet');
        enemyBullets2.setAll('outOfBoundsKill', true);
        enemyBullets2.setAll('checkWorldBounds', true);
        
        // Add the ENEMY bullets for enemySmall3
        enemyBullets3 = game.add.group();
        enemyBullets3.enableBody = true;
        enemyBullets3.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullets3.createMultiple(50, 'enemyBullet');
        enemyBullets3.setAll('outOfBoundsKill', true);
        enemyBullets3.setAll('checkWorldBounds', true);
        
        // Add the ENEMY bullets for enemySmall4
        enemyBullets4 = game.add.group();
        enemyBullets4.enableBody = true;
        enemyBullets4.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullets4.createMultiple(50, 'enemyBullet');
        enemyBullets4.setAll('outOfBoundsKill', true);
        enemyBullets4.setAll('checkWorldBounds', true);
        
        // Add the ENEMY bullets for enemySmall5
        enemyBullets5 = game.add.group();
        enemyBullets5.enableBody = true;
        enemyBullets5.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullets5.createMultiple(50, 'enemyBullet');
        enemyBullets5.setAll('outOfBoundsKill', true);
        enemyBullets5.setAll('checkWorldBounds', true);
        
        // Add the enemySmall - MIDDLE 
        enemySmall = game.add.sprite(600, game.world.height - 150, 'enemySmall');
        game.physics.arcade.enable(enemySmall);    
        enemySmall.body.gravity.y = 900;
        enemySmall.body.collideWorldBounds = true;
        enemySmall.width = 100;
        enemySmall.height = 100;
        enemySmall.animations.add('kaboom');
        enemySmall.animations.add('left', [1], 10, true);
        enemySmall.animations.add('right', [0], 10, true);
        enemySmall.body.velocity.x = -100;
        enemySmall.frame = 1;
        enemyText = game.add.text(enemySmall.body.x, enemySmall.body.y, '100', {font: "30px Courier", fill: "#ff3300", align: "center"});
        
        
        // Add the enemySmall1 (ONE) - RIGHT
        enemySmall1 = game.add.sprite(1000, game.world.height - 400, 'enemySmall');
        game.physics.arcade.enable(enemySmall1);
        enemySmall1.body.gravity.y = 900;
        enemySmall1.body.collideWorldBounds = true;
        enemySmall1.width = 100;
        enemySmall1.height = 100;
        enemySmall1.animations.add('left', [1], 10, true);
        enemySmall1.animations.add('right', [0], 10, true);
        enemySmall1.body.velocity.x = -100;
        enemySmall1.frame = 1;
        enemyText1 = game.add.text(enemySmall1.body.x, enemySmall1.body.y, '100', {font: "30px Courier", fill: "#ff3300", align: "center"});
        
        // Add the enemySmall2 (TWO) - LEFT 
        enemySmall2 = game.add.sprite(5, game.world.height - 500, 'enemySmall');
        game.physics.arcade.enable(enemySmall2);
        enemySmall2.body.gravity.y = 900;
        enemySmall2.body.collideWorldBounds = true;
        enemySmall2.width = 100;
        enemySmall2.height = 100;
        enemySmall2.animations.add('left', [1], 10, true);
        enemySmall2.animations.add('right', [0], 10, true);
        enemySmall2.body.velocity.x = -100;
        enemySmall2.frame = 1;
        enemyText2 = game.add.text(enemySmall2.body.x, enemySmall2.body.y, '100', {font: "30px Courier", fill: "#ff3300", align: "center"});
        
        // Add the enemySmall3 (THREE) - TOP LEFT 
        enemySmall3 = game.add.sprite(200, game.world.height - 900, 'enemySmall');
        game.physics.arcade.enable(enemySmall3);
        enemySmall3.body.gravity.y = 900;
        enemySmall3.body.collideWorldBounds = true;
        enemySmall3.width = 100;
        enemySmall3.height = 100;
        enemySmall3.animations.add('left', [1], 10, true);
        enemySmall3.animations.add('right', [0], 10, true);
        enemySmall3.body.velocity.x = -100;
        enemySmall3.frame = 1;
        enemyText3 = game.add.text(enemySmall3.body.x, enemySmall3.body.y, '100', {font: "30px Courier", fill: "#ff3300", align: "center"});
        
        // Add the enemySmall4 (FOUR) - MIDDLE MIDDLE 
        enemySmall4 = game.add.sprite(445, game.world.height - 900, 'enemySmall');
        game.physics.arcade.enable(enemySmall4);
        enemySmall4.body.gravity.y = 900;
        enemySmall4.body.collideWorldBounds = true;
        enemySmall4.width = 100;
        enemySmall4.height = 100;
        enemySmall4.animations.add('left', [1], 10, true);
        enemySmall4.animations.add('right', [0], 10, true);
        enemySmall4.body.velocity.x = -100;
        enemySmall4.frame = 1;
        enemyText4 = game.add.text(enemySmall4.body.x, enemySmall4.body.y, '100', {font: "30px Courier", fill: "#ff3300", align: "center"});4
        
        // Add the enemySmall5 (FIVE) - TOP RIGH5 
        enemySmall5 = game.add.sprite(880, game.world.height - 900, 'enemySmall');
        game.physics.arcade.enable(enemySmall5);
        enemySmall5.body.gravity.y = 900;
        enemySmall5.body.collideWorldBounds = true;
        enemySmall5.width = 100;
        enemySmall5.height = 100;
        enemySmall5.animations.add('left', [1], 10, true);
        enemySmall5.animations.add('right', [0], 10, true);
        enemySmall5.body.velocity.x = -100;
        enemySmall5.frame = 1;
        enemyText5 = game.add.text(enemySmall5.body.x, enemySmall5.body.y, '100', {font: "30px Courier", fill: "#ff3300", align: "center"});
        
        // Add the first potion -- set to position of bottom middle enemy
        redPotion = game.add.sprite(enemySmall.body.x, enemySmall.body.y, 'hp');
        game.physics.arcade.enable(redPotion);
        redPotion.body.collideWorldBounds = true;
        redPotion.body.gravity.y = 900;
        redPotion.exists = false; // set false for it won't appear at start
        
        // Add the second potion -- set to position of right enemy
        redPotion1 = game.add.sprite(enemySmall1.body.x, enemySmall1.body.y, 'hp');
        game.physics.arcade.enable(redPotion1);
        redPotion1.body.collideWorldBounds = true;
        redPotion1.body.gravity.y = 900;
        redPotion1.exists = false; // set false for it won't appear at start
        
        // add in arrow
        arrow = game.add.sprite(3100, 225, 'Arrow');
        game.physics.arcade.enable(arrow);  
        arrow.body.gravity.y = 0;
        arrow.body.collideWorldBounds = true;
        arrow.scale.setTo(1.5, 1.5);
        arrow.exists = false; // set to false so it doesn't appear at start
        
        },

    update: function(){		
        // Get the first potion
        game.physics.arcade.overlap(player, redPotion, function(){
            console.log("player on potion");
            addcheckPlayerHP();
            hpText.text = 'Player HP: ' + playerHP;
            redPotion.destroy();
        }); 
        
        // Get the second potion
        game.physics.arcade.overlap(player, redPotion1, function(){
            console.log("player on potion2");
            addcheckPlayerHP();
            hpText.text = 'Player HP: ' + playerHP;
            redPotion1.destroy();
        }); 
        
        game.physics.arcade.overlap(player, arrow, function() {
            console.log("player on arrow");
            changeState(4);
        });
        
        if(enemyNum == 0){
            //changeState(4);
            arrow.exists = true;
        }
        
        
        // if the player collides with the enemy, they lose health
        game.physics.arcade.collide(enemySmall, player, this.loseHealth, null, this);
        game.physics.arcade.collide(enemySmall1, player, this.loseHealth, null, this);
        game.physics.arcade.collide(enemySmall2, player, this.loseHealth, null, this);
        game.physics.arcade.collide(enemySmall3, player, this.loseHealth, null, this);
        game.physics.arcade.collide(enemySmall4, player, this.loseHealth, null, this);
        game.physics.arcade.collide(enemySmall5, player, this.loseHealth, null, this);
        
        //  Collide the player and the stars with the platforms
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(enemySmall, platforms);
        game.physics.arcade.collide(enemySmall1, platforms);
        game.physics.arcade.collide(enemySmall, player);
        game.physics.arcade.collide(enemySmall1, player);
        game.physics.arcade.collide(enemySmall2, platforms);
        game.physics.arcade.collide(enemySmall2, player);
        game.physics.arcade.collide(enemySmall3, platforms);
        game.physics.arcade.collide(enemySmall3, player);
        game.physics.arcade.collide(enemySmall4, platforms);
        game.physics.arcade.collide(enemySmall4, player);
        game.physics.arcade.collide(enemySmall5, platforms);
        game.physics.arcade.collide(enemySmall5, player);
        
        // Potion collide with platforms
        game.physics.arcade.collide(redPotion, platforms);
        game.physics.arcade.collide(redPotion1, platforms);

        // Make the mark follow the cursor
        mark.rotation = game.physics.arcade.angleToPointer(mark);
        mark.body.x = player.body.x + 27;
        mark.body.y = player.body.y + 27;
		
        // Fire a bullet
        if (game.input.activePointer.isDown && game.time.now > nextFire){
            fire();
        }
		
        // Bullets hits enemy
        game.physics.arcade.overlap(bullets, enemySmall, this.hitEnemy);
        game.physics.arcade.overlap(bullets, enemySmall1, this.hitEnemy1);
        game.physics.arcade.overlap(bullets, enemySmall2, this.hitEnemy2);
        game.physics.arcade.overlap(bullets, enemySmall3, this.hitEnemy3);
        game.physics.arcade.overlap(bullets, enemySmall4, this.hitEnemy4);
        game.physics.arcade.overlap(bullets, enemySmall5, this.hitEnemy5);
        
        // enemyText for all enemies
        enemyText.x = enemySmall.body.x + 24;
        enemyText.y = enemySmall.body.y - 20;
        
        enemyText1.x = enemySmall1.body.x + 24;
        enemyText1.y = enemySmall1.body.y - 20;
        
        enemyText2.x = enemySmall2.body.x + 24;
        enemyText2.y = enemySmall2.body.y - 20;
        
        enemyText3.x = enemySmall3.body.x + 24;
        enemyText3.y = enemySmall3.body.y - 20;
        
        enemyText4.x = enemySmall4.body.x + 24;
        enemyText4.y = enemySmall4.body.y - 20;
        
        enemyText5.x = enemySmall5.body.x + 24;
        enemyText5.y = enemySmall5.body.y - 20;
        
//        
        // Enemy fires
		/*
        if ((game.time.now > firingTimer && enemySmall.alive) || (game.time.now > firingTimer1 && enemySmall1.alive) || (game.time.now > firingTimer2 && enemySmall2.alive) || (game.time.now > firingTimer3 && enemySmall3.alive) || (game.time.now > firingTimer4 && enemySmall4.alive) || (game.time.now > firingTimer5 && enemySmall5.alive)) {
            this.enemyFires();
            this.enemyFires1();
            this.enemyFires2();
            this.enemyFires3();
            this.enemyFires4();
            this.enemyFires5();
        } 
		*/
		if (game.time.now > firingTimer && enemySmall.alive){
            //console.log("setting enemy to fire");
            this.enemyFires();
        }
        
        if (game.time.now > firingTimer1 && enemySmall1.alive){
            //console.log("setting enemy1 to fire");
            this.enemyFires1();
        }
        if (game.time.now > firingTimer2 && enemySmall2.alive){
            //console.log("setting enemy2 to fire");
            this.enemyFires2();
        }
        if (game.time.now > firingTimer3 && enemySmall3.alive){
            //console.log("setting enemy3 to fire");
            this.enemyFires3();
        }
		if (game.time.now > firingTimer4 && enemySmall4.alive){
            //console.log("setting enemy3 to fire");
            this.enemyFires4();
        }
		if (game.time.now > firingTimer5 && enemySmall5.alive){
            //console.log("setting enemy3 to fire");
            this.enemyFires5();
        }
		
//        if (game.time.now > firingTimer && enemySmall1.alive) {
//            this.enemyFires1();
//        }
//        if (game.time.now > firingTimer && enemySmall2.alive) {
//            this.enemyFires2();
//        }
//        if (game.time.now > firingTimer && enemySmall3.alive) {
//            this.enemyFires3();
//        }
//        if (game.time.now > firingTimer && enemySmall4.alive) {
//            this.enemyFires4();
//        }
//        if (game.time.now > firingTimer && enemySmall5.alive) {
//            this.enemyFires5();
//        }

        // Bullets hits player
        game.physics.arcade.overlap(enemyBullet, player, this.hitPlayer);
        game.physics.arcade.overlap(enemyBullet1, player, this.hitPlayer1);
        game.physics.arcade.overlap(enemyBullet2, player, this.hitPlayer2);
        game.physics.arcade.overlap(enemyBullet3, player, this.hitPlayer3);
        game.physics.arcade.overlap(enemyBullet4, player, this.hitPlayer4);
        game.physics.arcade.overlap(enemyBullet5, player, this.hitPlayer5);
        
        // Move player and enemy
        this.playerMove();
        this.enemyMove();
    },
	
    hitEnemy: function(){
        ping.play();
        enemySmall_hp = enemySmall_hp - damage;
        bullet.kill();
        enemyText.text = enemySmall_hp;
        explosions = game.add.sprite(enemySmall.body.x, enemySmall.body.y, "kaboom2");
        explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30);
        explosions.animations.play("explode", 30, false, true )
		
        if(enemySmall_hp < 0){
            enemyText.destroy();
            enemyNum --;
            //enemyBullet.kill()
            enemySmall.kill();
            boom.play();
            explosions = game.add.sprite(enemySmall.body.x, enemySmall.body.y, "kaboom");
            explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
            explosions.animations.play("explode", 15, false, true )
            // if enemy dies, drop potion for player can get it
            redPotion.body.x = enemySmall.body.x;
            redPotion.body.y = enemySmall.body.y;
            redPotion.exists = true;
        }
        
    },
    hitEnemy1: function(){
        ping.play();
        enemySmall1_hp = enemySmall1_hp - damage;
        bullet.kill();
        enemyText1.text = enemySmall1_hp;
        explosions = game.add.sprite(enemySmall1.body.x, enemySmall1.body.y, "kaboom2");
        explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30);
        explosions.animations.play("explode", 30, false, true )
		
        if(enemySmall1_hp <= 0){
            enemyText1.destroy();
            enemyNum --;
            enemySmall1.kill();
            boom.play();
            explosions = game.add.sprite(enemySmall1.body.x, enemySmall1.body.y, "kaboom");
            explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
            explosions.animations.play("explode", 15, false, true)
            // if enemy dies, drop potion for player can get it
            redPotion1.exists = true;
        }
    },
    hitEnemy2: function(){
        ping.play();
        enemySmall2_hp = enemySmall2_hp - damage;
        bullet.kill();
        enemyText2.text = enemySmall2_hp;
        explosions = game.add.sprite(enemySmall2.body.x, enemySmall2.body.y, "kaboom2");
        explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30);
        explosions.animations.play("explode", 30, false, true )
		
        if(enemySmall2_hp <= 0){
            enemyText2.destroy();
            enemyNum --;
            enemySmall2.kill();
            boom.play();
            explosions = game.add.sprite(enemySmall2.body.x, enemySmall2.body.y, "kaboom");
            explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
            explosions.animations.play("explode", 15, false, true)
        }
    },
    hitEnemy3: function(){
        ping.play();
        enemySmall3_hp = enemySmall3_hp - damage;
        bullet.kill();
        enemyText3.text = enemySmall3_hp;
        explosions = game.add.sprite(enemySmall3.body.x, enemySmall3.body.y, "kaboom2");
        explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30);
        explosions.animations.play("explode", 30, false, true )
        if(enemySmall3_hp <= 0){
            enemyText3.destroy();
            enemyNum --;
            enemySmall3.kill();
            boom.play();
            explosions = game.add.sprite(enemySmall3.body.x, enemySmall3.body.y, "kaboom");
            explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
            explosions.animations.play("explode", 15, false, true)
        }
    },
    hitEnemy4: function(){
        ping.play();
        enemySmall4_hp = enemySmall4_hp - damage;
        bullet.kill();
        enemyText4.text = enemySmall4_hp;
        explosions = game.add.sprite(enemySmall4.body.x, enemySmall4.body.y, "kaboom2");
        explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30);
        explosions.animations.play("explode", 30, false, true )
        if(enemySmall4_hp <= 0){
            enemyText4.destroy();
            enemyNum --;
            enemySmall4.kill();
            boom.play();
            explosions = game.add.sprite(enemySmall4.body.x, enemySmall4.body.y, "kaboom");
            explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
            explosions.animations.play("explode", 15, false, true)
        }
    },
    hitEnemy5: function(){
        ping.play();
        enemySmall5_hp = enemySmall5_hp - damage;
        bullet.kill();
        enemyText5.text = enemySmall5_hp;
        explosions = game.add.sprite(enemySmall5.body.x, enemySmall5.body.y, "kaboom2");
        explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30);
        explosions.animations.play("explode", 30, false, true )
        if(enemySmall5_hp <= 0){
            enemyText5.destroy();
            enemyNum --;
            enemySmall5.kill();
            boom.play();
            explosions = game.add.sprite(enemySmall5.body.x, enemySmall5.body.y, "kaboom");
            explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
            explosions.animations.play("explode", 15, false, true)
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
        // Move the enemy 0
        if (enemySmall.x <= 150){
            enemySmall.body.velocity.x = 100;
            enemySmall.frame = 0;
        }
        else if (enemySmall.x >= 980){
            enemySmall.body.velocity.x = -100;
            enemySmall.frame = 1;
        }
        // Move the enemy 1
        if (enemySmall1.x <= 820){
            enemySmall1.body.velocity.x = 100;
            enemySmall1.frame = 0;
        }
        else if (enemySmall1.x >= 1010){
            enemySmall1.body.velocity.x = -100;
            enemySmall1.frame = 1;
        }
        // Move the enemy 2
        if (enemySmall2.x <= 5){
            enemySmall2.body.velocity.x = 100;
            enemySmall2.frame = 0;
        }
        else if (enemySmall2.x >= 230){
            enemySmall2.body.velocity.x = -100;
            enemySmall2.frame = 1;
        }
        // Move the enemy 3
        if (enemySmall3.x <= 15){
            enemySmall3.body.velocity.x = 100;
            enemySmall3.frame = 0;
        }
        else if (enemySmall3.x >= 230){
            enemySmall3.body.velocity.x = -100;
            enemySmall3.frame = 1;
        }
        // Move the enemy 4
        if (enemySmall4.x <= 455){
            enemySmall4.body.velocity.x = 100;
            enemySmall4.frame = 0;
        }
        else if (enemySmall4.x >= 600){
            enemySmall4.body.velocity.x = -100;
            enemySmall4.frame = 1;
        }
        // Move the enemy 5
        if (enemySmall5.x <= 880){
            enemySmall5.body.velocity.x = 100;
            enemySmall5.frame = 0;
        }
        else if (enemySmall5.x >= 1010){
            enemySmall5.body.velocity.x = -100;
            enemySmall5.frame = 1;
        }
    },
    enemyFires: function() {
		
        //  Grab the first bullet we can from the pool (enemyBullet)
        enemyBullet = enemyBullets.getFirstExists(false);
        // And fire the bullet from this enemy
        enemyBullet.reset(enemySmall.body.x, enemySmall.body.y + 50);
       	cannon.play(); game.physics.arcade.moveToObject(enemyBullet,player,enemyBulletSpeed);
        
        firingTimer = game.time.now + game.rnd.integerInRange(3000, 4000);
        /*
        if (enemySmall.alive == false) {
            enemyBullets.remove(enemyBullet);
            firingTimer *= 0;
        }
		*/
    },
    enemyFires1: function() {
        //  Grab the first bullet we can from the pool (enemyBullet1)
        enemyBullet1 = enemyBullets1.getFirstExists(false);
        // And fire the bullet from this enemy
        enemyBullet1.reset(enemySmall1.body.x, enemySmall1.body.y + 50);
       	cannon.play(); game.physics.arcade.moveToObject(enemyBullet1,player,enemyBulletSpeed);
        
        firingTimer1 = game.time.now + game.rnd.integerInRange(3000, 4000);
        /*
        if (enemySmall1.alive == false) {
            enemyBullets1.remove(enemyBullet1);
            firingTimer1 *= 0;
        }
		*/
    },
    enemyFires2: function() {
        //  Grab the first bullet we can from the pool (enemyBullet2)
        enemyBullet2 = enemyBullets2.getFirstExists(false);
        // And fire the bullet from this enemy
        enemyBullet2.reset(enemySmall2.body.x, enemySmall2.body.y + 50);
       	cannon.play(); game.physics.arcade.moveToObject(enemyBullet2,player,enemyBulletSpeed);
        
        firingTimer2 = game.time.now + game.rnd.integerInRange(3000, 4000);
        /*
        if (enemySmall2.alive == false) {
            enemyBullets2.remove(enemyBullet2);
            firingTimer2 *= 0;
        }
		*/
    },
    enemyFires3: function() {
        //  Grab the first bullet we can from the pool (enemyBullet3)
        enemyBullet3 = enemyBullets3.getFirstExists(false);
        // And fire the bullet from this enemy
        enemyBullet3.reset(enemySmall3.body.x, enemySmall3.body.y + 50);
       	cannon.play(); game.physics.arcade.moveToObject(enemyBullet3,player,enemyBulletSpeed);
        
        firingTimer3 = game.time.now + game.rnd.integerInRange(3000, 4000);
        /*
        if (enemySmall3.alive == false) {
            enemyBullets3.remove(enemyBullet3);
            firingTimer3 *= 0;
        }
		*/
    },
    enemyFires4: function() {
        //  Grab the first bullet we can from the pool (enemyBullet4)
        enemyBullet4 = enemyBullets4.getFirstExists(false);
        // And fire the bullet from this enemy
        enemyBullet4.reset(enemySmall4.body.x, enemySmall4.body.y + 50);
       	cannon.play(); game.physics.arcade.moveToObject(enemyBullet4,player,enemyBulletSpeed);
        
        firingTimer4 = game.time.now + game.rnd.integerInRange(3000, 4000);
        /*
        if (enemySmall4.alive == false) {
            enemyBullets4.remove(enemyBullet4);
            firingTimer4 *= 0;
        }
		*/
    },
    enemyFires5: function() {
        //  Grab the first bullet we can from the pool (enemyBullet5)
        enemyBullet5 = enemyBullets5.getFirstExists(false);
        // And fire the bullet from this enemy
        enemyBullet5.reset(enemySmall5.body.x, enemySmall5.body.y + 50);
       	cannon.play(); game.physics.arcade.moveToObject(enemyBullet5,player,enemyBulletSpeed);
        firingTimer5 = game.time.now + game.rnd.integerInRange(3000, 4000);
        /*
        if (enemySmall5.alive == false) {
            enemyBullets5.remove(enemyBullet5);
            firingTimer5 *= 0;
        }
		*/
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
    },
    hitPlayer4: function(){
        enemyBullet4.kill();
		hit.play();
        playerHP -= 10;
        zeroHP();
        hpText.text = 'Player HP: ' + playerHP;
		// Get shot Handler
		var gotshot4 = game.add.sprite(player.body.x-40, player.body.y, 'gotshot');
        gotshot4.anchor.setTo(0,0)
        gotshot4.scale.setTo(0.2,0.2);
        game.time.events.add(100, function() { game.add.tween(gotshot4).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);}, this);
    },
    hitPlayer5: function(){
        enemyBullet5.kill();
		hit.play();
        playerHP -= 10;
        zeroHP();
        hpText.text = 'Player HP: ' + playerHP;
		// Get shot Handler
		var gotshot5 = game.add.sprite(player.body.x-40, player.body.y, 'gotshot');
        gotshot5.anchor.setTo(0,0)
        gotshot5.scale.setTo(0.2,0.2);
        game.time.events.add(100, function() { game.add.tween(gotshot5).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);}, this);
    },
    
     loseHealth: function () {
        if(beenHit == 0) {
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
    }
}