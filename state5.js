// Tile Map Level 
cyberCity.state5 = function(){};

// jet enemies
var enemyNum3 = 8;
var enemyText, enemyText1, enemyText2, enemyText3;
var enemyMedium4, enemyMedium5, enemyMedium6, enemyMedium7;
var enemyMedium4_hp = 100, enemyMedium5_hp = 100, enemyMedium6_hp = 100, enemyMedium7_hp = 100;

var enemyBullet, enemyBullet1, enemyBullet2, enemyBullet3;
var enemyBullets, enemyBullets1, enemyBullets2, enemyBullets3;
var firingTimer = 0, firingTimer1 = 0, firingTimer2 = 0, firingTimer3 = 0; // Firing rate of the enemy

// tank enemies
var tankText1, tankText2, tankText3, tankText4;
var tankEnemy1, tankEnemy2, tankEnemy3, tankEnemy4;
var tankEnemy1_hp = 100, tankEnemy2_hp = 100, tankEnemy3_hp = 100, tankEnemy4_hp = 100;

var tankBullet, tankBullet1, tankBullet2, tankBullet3;
var tankBullets, tankBullets1, tankBullets2, tankBullets3;
var firingTimer4 = 0, firingTimer5 = 0, firingTimer6 = 0, firingTimer7 = 0; // Firing rate of the enemy

// other needed variables
var potion, potion2;
var beenHit = 0, nextHit;


cyberCity.state5.prototype = {
	preload: function() {
        // load tile map
        game.load.image('tiles', 'assets/scifi_platformTiles.png', 32, 32);
        //game.load.image('tiles2', 'assets/meadow_night.png', 32, 32);
        //game.load.image('redArrow', 'assets/Arrow.png', 90, 90);
        // load json file
        game.load.tilemap('tilemap', 'assets/jetLevel.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Arrow', 'assets/redArrow.png');
	},

	create: function() {
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        
        levelTwo = game.add.sprite(0,0,'level2');
        levelTwo.height = game.height;
		levelTwo.width = game.width;    
        levelTwo.scale.setTo(3,3);  // either stretch the width/height of image or scale it. It is better to scale to keep proportions
       
        // Add the tilemap and tileset image. 
        // The first parameter in addTilesetImage is the name you gave the tilesheet when importing it
        // into Tiled, the second is the key to the asset in Phaser
        map = game.add.tilemap('tilemap');
        map.addTilesetImage('scifi_platformTiles', 'tiles');
        
        // add in layers from tile map
        groundLayer = map.createLayer('Ground');
        platformsLayer = map.createLayer('Platforms'); 

        //Before you can use the collide function you need to set what tiles can collide
        // collision tiles for small black and gray boxes
        map.setCollisionBetween(71, 74, true, 'Platforms'); 
        map.setCollisionBetween(106, 109, true, 'Platforms');
        map.setCollisionBetween(141, 144, true, 'Platforms');
        map.setCollisionBetween(176, 179, true, 'Platforms');
        map.setCollisionBetween(181, 182, true, 'Platforms');
        
        // collision for smaller yellow/black box
        map.setCollisionBetween(146, 147, true, 'Platforms'); 
        
        // dark gray boxes
        //map.setCollisionBetween(307, 309, true, 'Platforms');
       // map.setCollisionBetween(342, 344, true, 'Platforms');
        //map.setCollisionBetween(377, 379, true, 'Platforms'); 
        
        // box platforms
       // map.setCollisionBetween(188, 196, true, 'Platforms'); 
       // map.setCollisionBetween(223, 231, true, 'Platforms'); 
       // map.setCollisionBetween(258, 266, true, 'Platforms'); 
        
        // big yellow/black boxes
        map.setCollisionBetween(299, 301, true, 'Platforms');
        map.setCollisionBetween(334, 336, true, 'Platforms');
        map.setCollisionBetween(369, 371, true, 'Platforms'); 
        
        // collision tiles for large gray/white platform at beginning of level
        map.setCollisionBetween(211, 216, true, 'Platforms'); 
        map.setCollisionBetween(246, 251, true, 'Platforms'); 
        map.setCollisionBetween(281, 286, true, 'Platforms'); 
        map.setCollisionBetween(317, 321, true, 'Platforms');
        map.setCollisionBetween(351, 356, true, 'Platforms');
        map.setCollisionBetween(386, 391, true, 'Platforms');
        map.setCollisionBetween(421, 426, true, 'Platforms');
        
        // collision tiles for bottom most white tile for player to run on
        map.setCollisionBetween(456, 470, true, 'Ground');
        
        //  Un-comment these lines to see the collision tiles
        //groundLayer.debug = true;
        //platformsLayer.debug = true;

        groundLayer.resizeWorld();
		
        
        // add platforms
        
        // first long platform
        var ledge1_d = game.add.sprite(825, 395, 'ground3D');
		ledge1_d.height = 30;
		ledge1_d.width = 450;
        
        // second long platform
        var ledge2_d = game.add.sprite(1800, 395, 'ground3D');
        ledge2_d.height = 30;
		ledge2_d.width = 450;
        
        // third long platform
        var ledge3_d = game.add.sprite(2800, 395, 'ground3D');
        ledge3_d.height = 30;
		ledge3_d.width = 450;
        
        // first smaller platform
        var ledge4_d = game.add.sprite(1450, 295, 'ground3D');
		ledge4_d.height = 40;
		ledge4_d.width = 225;
        
        // second smaller platform
        var ledge5_d = game.add.sprite(2350, 295, 'ground3D');
		ledge5_d.height = 40;
		ledge5_d.width = 325;
        
        platforms = game.add.group();
		platforms.enableBody = true;  // allows player to collide with ground
		
        //first long platform border
		ledge1 = platforms.create(825, 420, 'ground');
		ledge1.scale.setTo(0.355, 0.27);
		ledge1.body.immovable = true;
        
        // second long platform  border
        ledge2 = platforms.create(1800, 420, 'ground');
		ledge2.scale.setTo(0.355, 0.27);
		ledge2.body.immovable = true;
		
        // third long platform  border
        ledge3 = platforms.create(2800, 420, 'ground');
		ledge3.scale.setTo(0.4, 0.27);
		ledge3.body.immovable = true;
        
        // first smaller platform  border
        ledge4 = platforms.create(1450, 315, 'ground');
        ledge4.scale.setTo(0.18, 0.27);
        ledge4.body.immovable = true;
        
        // second smaller platform border
        ledge5 = platforms.create(2350, 315, 'ground');
        ledge5.scale.setTo(0.27, 0.27);
        ledge5.body.immovable = true;
		

        
        createPlayer();
		createBullets();
        
        hpText.fixedToCamera = true;
		game.camera.follow(player);
        
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
		icon1.fixedToCamera = true;
		icon2.fixedToCamera = true;
		icon3.fixedToCamera = true;
		ammoText1.fixedToCamera = true;
		ammoText2.fixedToCamera = true;
		ammoText3.fixedToCamera = true;
		
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
        
        // tank variables
        tankBullets = game.add.group();
        tankBullets.enableBody = true;
        tankBullets.physicsBodyType = Phaser.Physics.ARCADE;
        tankBullets.createMultiple(50, 'enemyBullet');
        tankBullets.setAll('outOfBoundsKill', true);
        tankBullets.setAll('checkWorldBounds', true);
        
        tankBullets1 = game.add.group();
        tankBullets1.enableBody = true;
        tankBullets1.physicsBodyType = Phaser.Physics.ARCADE;
        tankBullets1.createMultiple(50, 'enemyBullet');
        tankBullets1.setAll('outOfBoundsKill', true);
        tankBullets1.setAll('checkWorldBounds', true);
        
        tankBullets2 = game.add.group();
        tankBullets2.enableBody = true;
        tankBullets2.physicsBodyType = Phaser.Physics.ARCADE;
        tankBullets2.createMultiple(50, 'enemyBullet');
        tankBullets2.setAll('outOfBoundsKill', true);
        tankBullets2.setAll('checkWorldBounds', true);
        
        tankBullets3 = game.add.group();
        tankBullets3.enableBody = true;
        tankBullets3.physicsBodyType = Phaser.Physics.ARCADE;
        tankBullets3.createMultiple(50, 'enemyBullet');
        tankBullets3.setAll('outOfBoundsKill', true);
        tankBullets3.setAll('checkWorldBounds', true);

		// Add the jet enemy -- lowest level
		enemyMedium4 = game.add.sprite(600, game.world.height-500, 'enemyMedium');
		game.physics.arcade.enable(enemyMedium4);    
		enemyMedium4.body.collideWorldBounds = true;
        enemyMedium4.body.immovable = true;
		enemyMedium4.width = 100;
		enemyMedium4.height = 100;
		enemyMedium4.animations.add('kaboom');
        enemyMedium4.animations.add('kaboom2');
		enemyMedium4.animations.add('left', [1], 10, true);
		enemyMedium4.animations.add('right', [0], 10, true);
		enemyMedium4.body.velocity.x = 100;
		enemyMedium4.frame = 0;
        enemyText = game.add.text(enemyMedium4.body.x, enemyMedium4.body.y, enemyMedium4_hp, {font: "25px Courier", fill: "#ff3300", align: "center"});
        
        // middle right ledge
        enemyMedium5 = game.add.sprite(1200, game.world.height-500, 'enemyMedium');
        game.physics.arcade.enable(enemyMedium5);    
		enemyMedium5.body.collideWorldBounds = true;
        enemyMedium5.body.immovable = true;
		enemyMedium5.width = 100;
		enemyMedium5.height = 100;
		enemyMedium5.animations.add('kaboom');
        enemyMedium5.animations.add('kaboom2');
		enemyMedium5.animations.add('left', [1], 10, true);
		enemyMedium5.animations.add('right', [0], 10, true);
		enemyMedium5.body.velocity.x = -100;
		enemyMedium5.frame = 1;
        enemyText1 = game.add.text(enemyMedium5.body.x, enemyMedium5.body.y, enemyMedium5_hp, {font: "25px Courier", fill: "#ff3300", align: "center"});
        
        // middle left ledge
        enemyMedium6 = game.add.sprite(1600, game.world.height - 500, 'enemyMedium');
        game.physics.arcade.enable(enemyMedium6);    
		enemyMedium6.body.collideWorldBounds = true;
        enemyMedium6.body.immovable = true;   // set to true so that enemy keeps moving even if player hits it
		enemyMedium6.width = 100;
		enemyMedium6.height = 100;
		enemyMedium6.animations.add('kaboom');
        enemyMedium6.animations.add('kaboom2');
		enemyMedium6.animations.add('left', [1], 10, true);
		enemyMedium6.animations.add('right', [0], 10, true);
		enemyMedium6.body.velocity.x = -100;
		enemyMedium6.frame = 1;
        enemyText2 = game.add.text(enemyMedium6.body.x, enemyMedium6.body.y, enemyMedium6_hp, {font: "25px Courier", fill: "#ff3300", align: "center"});
        
        // upper right ledge
        enemyMedium7 = game.add.sprite(2100, game.world.height - 500, 'enemyMedium');
        game.physics.arcade.enable(enemyMedium7);    
		enemyMedium7.body.collideWorldBounds = true;
        enemyMedium7.body.immovable = true;
		enemyMedium7.width = 100;
		enemyMedium7.height = 100;
		enemyMedium7.animations.add('kaboom');
        enemyMedium7.animations.add('kaboom2');
		enemyMedium7.animations.add('left', [1], 10, true);
		enemyMedium7.animations.add('right', [0], 10, true);
		enemyMedium7.body.velocity.x = -100;
		enemyMedium7.frame = 1;
        enemyText3 = game.add.text(enemyMedium7.body.x, enemyMedium7.body.y, enemyMedium3_hp, {font: "25px Courier", fill: "#ff3300", align: "center"});
        
        tankEnemy1 = game.add.sprite(600, game.world.height-125, 'enemySmall');
        game.physics.arcade.enable(tankEnemy1);  
		tankEnemy1.body.collideWorldBounds = true;
        tankEnemy1.body.immovable = true;
		tankEnemy1.width = 100;
		tankEnemy1.height = 100;
		tankEnemy1.animations.add('kaboom');
        tankEnemy1.animations.add('kaboom2');
		tankEnemy1.animations.add('left', [1], 10, true);
		tankEnemy1.animations.add('right', [0], 10, true);
		tankEnemy1.body.velocity.x = -100;
		tankEnemy1.frame = 1;
        tankText1 = game.add.text(tankEnemy1.body.x, tankEnemy1.body.y, tankEnemy1_hp, {font: "25px Courier", fill: "#ff3300", align: "center"});
        
        tankEnemy2 = game.add.sprite(1500, game.world.height-125, 'enemySmall');
        game.physics.arcade.enable(tankEnemy2);  
		tankEnemy2.body.collideWorldBounds = true;
        tankEnemy2.body.immovable = true;
		tankEnemy2.width = 100;
		tankEnemy2.height = 100;
		tankEnemy2.animations.add('kaboom');
        tankEnemy2.animations.add('kaboom2');
		tankEnemy2.animations.add('left', [1], 10, true);
		tankEnemy2.animations.add('right', [0], 10, true);
		tankEnemy2.body.velocity.x = -100;
		tankEnemy2.frame = 1;
        tankText2 = game.add.text(tankEnemy2.body.x, tankEnemy2.body.y, tankEnemy2_hp, {font: "25px Courier", fill: "#ff3300", align: "center"});
        
        tankEnemy3 = game.add.sprite(2000, game.world.height-125, 'enemySmall');
        game.physics.arcade.enable(tankEnemy3);  
		tankEnemy3.body.collideWorldBounds = true;
        tankEnemy3.body.immovable = true;
		tankEnemy3.width = 100;
		tankEnemy3.height = 100;
		tankEnemy3.animations.add('kaboom');
        tankEnemy3.animations.add('kaboom2');
		tankEnemy3.animations.add('left', [1], 10, true);
		tankEnemy3.animations.add('right', [0], 10, true);
		tankEnemy3.body.velocity.x = -100;
		tankEnemy3.frame = 1;
        tankText3 = game.add.text(tankEnemy3.body.x, tankEnemy3.body.y, tankEnemy3_hp, {font: "25px Courier", fill: "#ff3300", align: "center"});
        
        tankEnemy4 = game.add.sprite(2700, game.world.height-125, 'enemySmall');
        game.physics.arcade.enable(tankEnemy4);  
		tankEnemy4.body.collideWorldBounds = true;
        tankEnemy4.body.immovable = true;
		tankEnemy4.width = 100;
		tankEnemy4.height = 100;
		tankEnemy4.animations.add('kaboom');
        tankEnemy4.animations.add('kaboom2');
		tankEnemy4.animations.add('left', [1], 10, true);
		tankEnemy4.animations.add('right', [0], 10, true);
		tankEnemy4.body.velocity.x = -100;
		tankEnemy4.frame = 1;
        tankText4 = game.add.text(tankEnemy4.body.x, tankEnemy4.body.y, tankEnemy4_hp, {font: "25px Courier", fill: "#ff3300", align: "center"});
        
        // Add the first potion -- set to postion of enemy2
        potion = game.add.sprite(enemyMedium5.body.x, enemyMedium5.body.y, 'hp')
        game.physics.arcade.enable(potion);   
        potion.body.collideWorldBounds = true;
        potion.body.gravity.y = 900;
        potion.exists = false; // set to false so it doesn't appear at start
        
        // Add the second potion -- set to postion of enemy3
        potion2 = game.add.sprite(enemyMedium6.body.x, enemyMedium6.body.y, 'hp')
        game.physics.arcade.enable(potion2);   
        potion2.body.collideWorldBounds = true;
        potion2.body.gravity.y = 900;
        potion2.exists = false; // set to false so it doesn't appear at start
        
        // Add the second potion -- set to postion of enemy3
        potion3 = game.add.sprite(tankEnemy3.body.x, tankEnemy3.body.y, 'hp')
        game.physics.arcade.enable(potion3);   
        potion3.body.collideWorldBounds = true;
        potion3.body.gravity.y = 900;
        potion3.exists = false; // set to false so it doesn't appear at start
        
        // Add the second potion -- set to postion of enemy3
        potion4 = game.add.sprite(tankEnemy4.body.x, tankEnemy4.body.y, 'hp')
        game.physics.arcade.enable(potion4);   
        potion4.body.collideWorldBounds = true;
        potion4.body.gravity.y = 900;
        potion4.exists = false; // set to false so it doesn't appear at start
        
        // add in arrow
        arrow = game.add.sprite(3100, 500, 'Arrow');
        game.physics.arcade.enable(arrow);  
        arrow.body.gravity.y = 0;
        arrow.body.collideWorldBounds = true;
        arrow.scale.setTo(2, 2);
        //arrow.exists = false; // set to false so it doesn't appear at start
        
	},

	update: function() {
        if (playerHP <= 0) {
            changeState(7);
        }
        
        game.physics.arcade.overlap(player, arrow, function() {
            console.log("player on arrow");
            changeState(6);
        });
        
        console.log("enemies left: " + enemyNum3);
        if (enemyNum3 <= 0) {
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
        
        // Get the third potion
        game.physics.arcade.overlap(player, potion3, function(){
            console.log("player on potion3");
            addcheckPlayerHP();
            hpText.text = 'Player HP: ' + playerHP;
            potion3.destroy();
        }); 
        
        // Get the fourth potion
        game.physics.arcade.overlap(player, potion4, function(){
            console.log("player on potion2");
            addcheckPlayerHP();
            hpText.text = 'Player HP: ' + playerHP;
            potion4.destroy();
        }); 
        
		// enable collision for player and platforms/ground
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(player, groundLayer);
        game.physics.arcade.collide(player, platformsLayer);
        
        // if the player collides with the enemy, they lose health
        game.physics.arcade.collide(enemyMedium4, player, this.loseHealth, null, this);
        game.physics.arcade.collide(enemyMedium5, player, this.loseHealth, null, this);
        game.physics.arcade.collide(enemyMedium6, player, this.loseHealth, null, this);
        game.physics.arcade.collide(enemyMedium7, player, this.loseHealth, null, this);
        game.physics.arcade.collide(tankEnemy1, player, this.loseHealth, null, this);
        game.physics.arcade.collide(tankEnemy2, player, this.loseHealth, null, this);
        game.physics.arcade.collide(tankEnemy3, player, this.loseHealth, null, this);
        game.physics.arcade.collide(tankEnemy4, player, this.loseHealth, null, this);
        
        game.physics.arcade.collide(enemyMedium4, groundLayer);
        game.physics.arcade.collide(enemyMedium5, groundLayer);
        game.physics.arcade.collide(enemyMedium6, groundLayer);
        game.physics.arcade.collide(enemyMedium7, groundLayer);
        
        game.physics.arcade.collide(tankEnemy1, groundLayer);
        game.physics.arcade.collide(tankEnemy2, groundLayer);
        game.physics.arcade.collide(tankEnemy3, groundLayer);
        game.physics.arcade.collide(tankEnemy4, groundLayer);
        
        game.physics.arcade.collide(enemyMedium4, platformsLayer);
        game.physics.arcade.collide(enemyMedium5, platformsLayer);
        game.physics.arcade.collide(enemyMedium6, platformsLayer);
        game.physics.arcade.collide(enemyMedium7, platformsLayer);
        
        game.physics.arcade.collide(tankEnemy1, platformsLayer);
        game.physics.arcade.collide(tankEnemy2, platformsLayer);
        game.physics.arcade.collide(tankEnemy3, platformsLayer);
        game.physics.arcade.collide(tankEnemy4, platformsLayer);
        
//        game.physics.arcade.collide(enemyMedium, platforms);
//        game.physics.arcade.collide(enemyMedium1, platforms);
//        game.physics.arcade.collide(enemyMedium2, platforms);
//        game.physics.arcade.collide(enemyMedium3, platforms);
        
        game.physics.arcade.collide(potion, platforms);
        game.physics.arcade.collide(potion2, platforms);
        
        game.physics.arcade.collide(potion, groundLayer);
        game.physics.arcade.collide(potion2, groundLayer);
        
        game.physics.arcade.collide(potion, platformsLayer);
        game.physics.arcade.collide(potion2, platformsLayer);

		// make the mark follow the cursor
		mark.rotation = game.physics.arcade.angleToPointer(mark);
		mark.body.x = player.body.x + 27;
		mark.body.y = player.body.y + 27;
        
        // Fire a bullet
        if (game.input.activePointer.isDown && game.time.now > nextFire){
            fire();
        }
        
        // Bullets hits enemy
		game.physics.arcade.overlap(bullets, enemyMedium4, this.hitEnemy);
        game.physics.arcade.overlap(bullets, enemyMedium5, this.hitEnemy1);
        game.physics.arcade.overlap(bullets, enemyMedium6, this.hitEnemy2);
        game.physics.arcade.overlap(bullets, enemyMedium7, this.hitEnemy3);
        game.physics.arcade.overlap(bullets, tankEnemy1, this.hitEnemy4);
        game.physics.arcade.overlap(bullets, tankEnemy2, this.hitEnemy5);
        game.physics.arcade.overlap(bullets, tankEnemy3, this.hitEnemy6);
        game.physics.arcade.overlap(bullets, tankEnemy4, this.hitEnemy7);
        
        enemyText.x = enemyMedium4.body.x + 24;
        enemyText.y = enemyMedium4.body.y - 20;
        
        enemyText1.x = enemyMedium5.body.x + 24;
        enemyText1.y = enemyMedium5.body.y - 20;
        
        enemyText2.x = enemyMedium6.body.x + 24;
        enemyText2.y = enemyMedium6.body.y - 20;
        
        enemyText3.x = enemyMedium7.body.x + 24;
        enemyText3.y = enemyMedium7.body.y - 20;
        
        tankText1.x = tankEnemy1.body.x + 24;
        tankText1.y = tankEnemy1.body.y - 20;
        
        tankText2.x = tankEnemy2.body.x + 24;
        tankText2.y = tankEnemy2.body.y - 20;
        
        tankText3.x = tankEnemy3.body.x + 24;
        tankText3.y = tankEnemy3.body.y - 20;
        
        tankText4.x = tankEnemy4.body.x + 24;
        tankText4.y = tankEnemy4.body.y - 20;
        
        // Enemy fires 
        if (game.time.now > firingTimer && enemyMedium4.alive){
            //console.log("setting enemy to fire");
            this.enemyFires();
        }
        
        if (game.time.now > firingTimer1 && enemyMedium5.alive){
            //console.log("setting enemy1 to fire");
            this.enemyFires1();
        }
        if (game.time.now > firingTimer2 && enemyMedium6.alive){
            //console.log("setting enemy2 to fire");
            this.enemyFires2();
        }
        if (game.time.now > firingTimer3 && enemyMedium7.alive){
            //console.log("setting enemy3 to fire");
            this.enemyFires3();
        }
        if (game.time.now > firingTimer4 && tankEnemy1.alive){
            //console.log("setting enemy3 to fire");
            this.enemyFires4();
        }
        if (game.time.now > firingTimer5 && tankEnemy2.alive){
            //console.log("setting enemy3 to fire");
            this.enemyFires5();
        }
        if (game.time.now > firingTimer6 && tankEnemy3.alive){
            //console.log("setting enemy3 to fire");
            this.enemyFires6();
        }
        if (game.time.now > firingTimer7 && tankEnemy4.alive){
            //console.log("setting enemy3 to fire");
            this.enemyFires7();
        }
        
        // Bullets hit player
        game.physics.arcade.overlap(enemyBullet, player, this.hitPlayer);
        game.physics.arcade.overlap(enemyBullet1, player, this.hitPlayer1);
        game.physics.arcade.overlap(enemyBullet2, player, this.hitPlayer2);
        game.physics.arcade.overlap(enemyBullet3, player, this.hitPlayer3);
        game.physics.arcade.overlap(tankBullet, player, this.hitPlayer4);
        game.physics.arcade.overlap(tankBullet1, player, this.hitPlayer5);
        game.physics.arcade.overlap(tankBullet2, player, this.hitPlayer6);
        game.physics.arcade.overlap(tankBullet3, player, this.hitPlayer7);

		this.playerMove();
		this.enemyMove();
	},

	hitEnemy: function(){
		ping.play();
		enemyMedium4_hp = enemyMedium4_hp - damage;
		bullet.kill();
        enemyText.text = enemyMedium4_hp;
		explosions = game.add.sprite(enemyMedium4.body.x, enemyMedium4.body.y, "kaboom2");
        explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30);
        explosions.animations.play("explode", 30, false, true )
		
		if (enemyMedium4_hp < 0) {
            enemyNum3 --;
            enemyText.destroy();
			enemyMedium4.kill();
			boom.play();
			explosions = game.add.sprite(enemyMedium4.body.x, enemyMedium4.body.y, 'kaboom2');
			explosions = game.add.sprite(enemyMedium4.body.x, enemyMedium4.body.y, 'kaboom2');
			explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
			explosions.animations.play("explode", 15, false, true )
		}
	},
    
    hitEnemy1: function(){
        ping.play();
		enemyMedium5_hp = enemyMedium5_hp - damage;
		bullet.kill();
        enemyText1.text = enemyMedium5_hp;
		explosions = game.add.sprite(enemyMedium5.body.x, enemyMedium5.body.y, "kaboom2");
        explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30);
        explosions.animations.play("explode", 30, false, true )
		if (enemyMedium5_hp < 0) {
            enemyNum3 --;
            enemyText1.destroy();
			enemyMedium5.kill();
			boom.play();
			explosions = game.add.sprite(enemyMedium5.body.x, enemyMedium5.body.y, 'kaboom');
			explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
			explosions.animations.play("explode", 15, false, true )
		}
	},
    
    hitEnemy2: function(){
		ping.play();
		enemyMedium6_hp = enemyMedium6_hp - damage;
		bullet.kill();
        enemyText2.text = enemyMedium6_hp;
		explosions = game.add.sprite(enemyMedium6.body.x, enemyMedium6.body.y, "kaboom2");
        explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30);
        explosions.animations.play("explode", 30, false, true )
		if (enemyMedium6_hp < 0) {
            enemyNum3 --;
            enemyText2.destroy();
			enemyMedium6.kill();
			boom.play();
			explosions = game.add.sprite(enemyMedium6.body.x, enemyMedium6.body.y, 'kaboom2');
			explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
			explosions.animations.play("explode", 15, false, true );
            // if enemy is dead, make it drop a potion to restore player health
            potion.exists = true;
		}
	},
    
    hitEnemy3: function(){
		ping.play();
		enemyMedium7_hp = enemyMedium7_hp - damage;
		bullet.kill();
        enemyText3.text = enemyMedium7_hp;
		explosions = game.add.sprite(enemyMedium7.body.x, enemyMedium7.body.y, "kaboom2");
        explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30);
        explosions.animations.play("explode", 30, false, true )
		if (enemyMedium7_hp < 0) {
            enemyNum3 --;
            enemyText3.destroy();
			enemyMedium7.kill();
			boom.play();
			explosions = game.add.sprite(enemyMedium7.body.x, enemyMedium7.body.y, 'kaboom2');
			explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
			explosions.animations.play("explode", 15, false, true )
            // if enemy is dead, make it drop a potion to restore player health
            potion2.exists = true;
		}
	},
    
    hitEnemy4: function(){
		ping.play();
		tankEnemy1_hp = tankEnemy1_hp - damage;
		bullet.kill();
        tankText1.text = tankEnemy1_hp;
		explosions = game.add.sprite(tankEnemy1.body.x, tankEnemy1.body.y, "kaboom2");
        explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30);
        explosions.animations.play("explode", 30, false, true )
		if (tankEnemy1_hp <= 0) {
            enemyNum3 --;
            tankText1.destroy();
			tankEnemy1.kill();
			boom.play();
			explosions = game.add.sprite(tankEnemy1.body.x, tankEnemy1.body.y, 'kaboom2');
			explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
			explosions.animations.play("explode", 15, false, true )
            // if enemy is dead, make it drop a potion to restore player health
            //potion2.exists = true;
		}
	},
    
    hitEnemy5: function(){
		ping.play();
		tankEnemy2_hp = tankEnemy2_hp - damage;
		bullet.kill();
        tankText2.text = tankEnemy2_hp;
		explosions = game.add.sprite(tankEnemy2.body.x, tankEnemy2.body.y, "kaboom2");
        explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30);
        explosions.animations.play("explode", 30, false, true )
		if (tankEnemy2_hp <= 0) {
            enemyNum3 --;
            tankText2.destroy();
			tankEnemy2.kill();
			boom.play();
			explosions = game.add.sprite(tankEnemy2.body.x, tankEnemy2.body.y, 'kaboom2');
			explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
			explosions.animations.play("explode", 15, false, true )
            // if enemy is dead, make it drop a potion to restore player health
            //potion2.exists = true;
		}
	},
    
    hitEnemy6: function(){
		ping.play();
		tankEnemy3_hp = tankEnemy3_hp - damage;
		bullet.kill();
        tankText3.text = tankEnemy3_hp;
		explosions = game.add.sprite(tankEnemy3.body.x, tankEnemy3.body.y, "kaboom2");
        explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30);
        explosions.animations.play("explode", 30, false, true )
		if (tankEnemy3_hp <= 0) {
            enemyNum3 --;
            tankText3.destroy();
			tankEnemy3.kill();
			boom.play();
			explosions = game.add.sprite(tankEnemy3.body.x, tankEnemy3.body.y, 'kaboom2');
			explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
			explosions.animations.play("explode", 15, false, true )
            // if enemy is dead, make it drop a potion to restore player health
            potion3.exists = true;
		}
	},
    
    hitEnemy7: function(){
		ping.play();
		tankEnemy4_hp = tankEnemy4_hp - damage;
		bullet.kill();
        tankText4.text = tankEnemy4_hp;
		explosions = game.add.sprite(tankEnemy4.body.x, tankEnemy4.body.y, "kaboom2");
        explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30);
        explosions.animations.play("explode", 30, false, true )
		if (tankEnemy4_hp <= 0) {
            enemyNum3 --;
            tankText4.destroy();
			tankEnemy4.kill();
			boom.play();
			explosions = game.add.sprite(tankEnemy4.body.x, tankEnemy4.body.y, 'kaboom2');
			explosions.animations.add("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15);
			explosions.animations.play("explode", 15, false, true )
            // if enemy is dead, make it drop a potion to restore player health
            potion4.exists = true;
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
        if ((up.isDown || cursors.up.isDown) && (player.body.touching.down||player.body.blocked.down||player.body.blocked.left||player.body.blocked.right||player.body.touching.right||player.body.touching.left)){
            player.body.velocity.y = -500;
        }
        if (cursors.down.isDown || down.isDown){
            player.body.velocity.y = 600;  
        }
    },

	enemyMove: function(){
        if (enemyMedium4.x <= 600) {
            enemyMedium4.body.velocity.x = 100;
            enemyMedium4.frame = 0;
        } else if (enemyMedium4.x >= 900) {
            enemyMedium4.body.velocity.x = -100;
            enemyMedium4.frame = 1;
        }
        // Move the enemy 1 -- middle right ledge
        if (enemyMedium5.x <= 1150){
            enemyMedium5.body.velocity.x = 100;
            enemyMedium5.frame = 0;
        } else if (enemyMedium5.x >= 1350){
            enemyMedium5.body.velocity.x = -100; 
            enemyMedium5.frame = 1;
        }
        
        // Move enemy 2 -- middle left ledge
        if (enemyMedium6.x <= 1650) {
            enemyMedium6.body.velocity.x = 100;
            enemyMedium6.frame = 0;
        } else if (enemyMedium6.x >= 1850) {
            enemyMedium6.body.velocity.x = -100;
             enemyMedium6.frame = 1;
        }
        
        // Move enemy 3 -- upper right ledge
        if (enemyMedium7.x <= 2100) {
            enemyMedium7.body.velocity.x = 100;
             enemyMedium7.frame = 0;
        } else if (enemyMedium7.x >= 2350) {
            enemyMedium7.body.velocity.x = -100;
             enemyMedium7.frame = 1;
        }
        
        if (tankEnemy1.x <= 700) {
            tankEnemy1.body.velocity.x = 100;
            tankEnemy1.frame = 0;
        } else if (tankEnemy1.body.x >= 1000) {
            tankEnemy1.body.velocity.x = -100;
            tankEnemy1.frame = 1;
        }
        
        if (tankEnemy2.x <= 1250) {
            tankEnemy2.body.velocity.x = 100;
            tankEnemy2.frame = 0;
        } else if (tankEnemy2.body.x >= 1650) {
            tankEnemy2.body.velocity.x = -100;
            tankEnemy2.frame = 1;
        }
        
        if (tankEnemy3.x <= 1800) {
            tankEnemy3.body.velocity.x = 100;
            tankEnemy3.frame = 0;
        } else if (tankEnemy3.body.x >= 2400) {
            tankEnemy3.body.velocity.x = -100;
            tankEnemy3.frame = 1;
        }
        
        if (tankEnemy4.x <= 2700) {
            tankEnemy4.body.velocity.x = 100;
            tankEnemy4.frame = 0;
        } else if (tankEnemy4.body.x >= 3100) {
            tankEnemy4.body.velocity.x = -100;
            tankEnemy4.frame = 1;
        }
    },
    
    enemyFires: function() {
        //console.log("First Enemy Firing");
        //  Grab the first bullet we can from the pool
        enemyBullet = enemyBullets.getFirstExists(false);
        // And fire the bullet from this enemy
        enemyBullet.reset(enemyMedium4.body.x, enemyMedium4.body.y + 50);
        cannon.play();
        game.physics.arcade.moveToObject(enemyBullet,player,enemyBulletSpeed);
        firingTimer = game.time.now + game.rnd.integerInRange(3000, 4000);
    },
    
    enemyFires1: function() {
        //console.log("Second Enemy Firing");
        //  Grab the first bullet we can from the pool
        enemyBullet1 = enemyBullets1.getFirstExists(false);
        // And fire the bullet from this enemy
        enemyBullet1.reset(enemyMedium5.body.x, enemyMedium5.body.y + 50);
        cannon.play();
        game.physics.arcade.moveToObject(enemyBullet1,player,enemyBulletSpeed);
        firingTimer1 = game.time.now + game.rnd.integerInRange(3000, 4000);
    },
    
    enemyFires2: function() {
        //console.log("Third Enemy Firing");
        //  Grab the first bullet we can from the pool
        enemyBullet2 = enemyBullets2.getFirstExists(false);
        // And fire the bullet from this enemy
        enemyBullet2.reset(enemyMedium6.body.x, enemyMedium6.body.y + 50);
        cannon.play();
        game.physics.arcade.moveToObject(enemyBullet2,player,enemyBulletSpeed);
        firingTimer2 = game.time.now + game.rnd.integerInRange(3000, 4000);
    },
    
    enemyFires3: function() {
        //console.log("Fourth Enemy Firing");
        //  Grab the first bullet we can from the pool
        enemyBullet3 = enemyBullets3.getFirstExists(false);
        // And fire the bullet from this enemy
        enemyBullet3.reset(enemyMedium7.body.x, enemyMedium7.body.y + 50);
        cannon.play();
        game.physics.arcade.moveToObject(enemyBullet3,player,enemyBulletSpeed);
        firingTimer3 = game.time.now + game.rnd.integerInRange(3000, 4000);
    },
    
    enemyFires4: function() {
        //console.log("Fourth Enemy Firing");
        //  Grab the first bullet we can from the pool
        tankBullet = tankBullets.getFirstExists(false);
        // And fire the bullet from this enemy
        tankBullet.reset(tankEnemy1.body.x, tankEnemy1.body.y + 50);
        cannon.play();
        game.physics.arcade.moveToObject(tankBullet,player,enemyBulletSpeed);
        firingTimer4 = game.time.now + game.rnd.integerInRange(3000, 4000);
    },
    
    enemyFires5: function() {
        //console.log("Fourth Enemy Firing");
        //  Grab the first bullet we can from the pool
        tankBullet1 = tankBullets1.getFirstExists(false);
        // And fire the bullet from this enemy
        tankBullet1.reset(tankEnemy2.body.x, tankEnemy2.body.y + 50);
        cannon.play();
        game.physics.arcade.moveToObject(tankBullet1,player,enemyBulletSpeed);
        firingTimer5 = game.time.now + game.rnd.integerInRange(3000, 4000);
    },
    
    enemyFires6: function() {
        //console.log("Fourth Enemy Firing");
        //  Grab the first bullet we can from the pool
        tankBullet2 = tankBullets2.getFirstExists(false);
        // And fire the bullet from this enemy
        tankBullet2.reset(tankEnemy3.body.x, tankEnemy3.body.y + 50);
        cannon.play();
        game.physics.arcade.moveToObject(tankBullet2,player,enemyBulletSpeed);
        firingTimer6 = game.time.now + game.rnd.integerInRange(3000, 4000);
    },
    
    enemyFires7: function() {
        //console.log("Fourth Enemy Firing");
        //  Grab the first bullet we can from the pool
        tankBullet3 = tankBullets3.getFirstExists(false);
        // And fire the bullet from this enemy
        tankBullet3.reset(tankEnemy4.body.x, tankEnemy4.body.y + 50);
        cannon.play();
        game.physics.arcade.moveToObject(tankBullet3,player,enemyBulletSpeed);
        firingTimer7 = game.time.now + game.rnd.integerInRange(3000, 4000);
    },
    
    hitPlayer: function(){
        enemyBullet.kill();
        hit.play();
        playerHP -= 10;
//        zeroHP();
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
//        zeroHP();
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
//        zeroHP();
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
//        zeroHP();
        hpText.text = 'Player HP: ' + playerHP;
		// Get shot Handler
		var gotshot3 = game.add.sprite(player.body.x-40, player.body.y, 'gotshot');
        gotshot3.anchor.setTo(0,0)
        gotshot3.scale.setTo(0.2,0.2);
        game.time.events.add(100, function() { game.add.tween(gotshot3).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);}, this);
    },
    
    hitPlayer4: function(){
        tankBullet.kill();
        hit.play();
        playerHP -= 10;
//        zeroHP();
        hpText.text = 'Player HP: ' + playerHP;
		// Get shot Handler
		var gotshot3 = game.add.sprite(player.body.x-40, player.body.y, 'gotshot');
        gotshot3.anchor.setTo(0,0)
        gotshot3.scale.setTo(0.2,0.2);
        game.time.events.add(100, function() { game.add.tween(gotshot3).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);}, this);
    },
    
    hitPlayer5: function(){
        tankBullet1.kill();
        hit.play();
        playerHP -= 10;
//        zeroHP();
        hpText.text = 'Player HP: ' + playerHP;
		// Get shot Handler
		var gotshot3 = game.add.sprite(player.body.x-40, player.body.y, 'gotshot');
        gotshot3.anchor.setTo(0,0)
        gotshot3.scale.setTo(0.2,0.2);
        game.time.events.add(100, function() { game.add.tween(gotshot3).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);}, this);
    },
    
    hitPlayer6: function(){
        tankBullet2.kill();
        hit.play();
        playerHP -= 10;
//        zeroHP();
        hpText.text = 'Player HP: ' + playerHP;
		// Get shot Handler
		var gotshot3 = game.add.sprite(player.body.x-40, player.body.y, 'gotshot');
        gotshot3.anchor.setTo(0,0)
        gotshot3.scale.setTo(0.2,0.2);
        game.time.events.add(100, function() { game.add.tween(gotshot3).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);}, this);
    },
    
    hitPlayer7: function(){
        tankBullet3.kill();
        hit.play();
        playerHP -= 10;
//        zeroHP();
        hpText.text = 'Player HP: ' + playerHP;
		// Get shot Handler
		var gotshot3 = game.add.sprite(player.body.x-40, player.body.y, 'gotshot');
        gotshot3.anchor.setTo(0,0)
        gotshot3.scale.setTo(0.2,0.2);
        game.time.events.add(100, function() { game.add.tween(gotshot3).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);}, this);
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
    },
    
    render: function() {
        //use this to get players location. 
        //I used this to run around in the map to get the x and y location for where to place new enemies
        //game.debug.bodyInfo(player, 32, 320);
    }
};

