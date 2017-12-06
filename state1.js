// MENU
var cyberCity = {};
var platforms;

// Enemy Attributes
var enemyText0;
var enemySmall0, enemySmall0_hp = 100; 
var enemyBullets, enemyBullet0, enemyBulletSpeed = 250;
var firingTimer0 = 0;

// Player attributes
var hpText, player, playerHP, playerSpeed = 6, facingRight = 1, mark;
// Weapon System
var bullets, bullet;
var nextFire = 0; 
var weaponNum = 1;
var bangNum = 1;
var fireRate, pistolRate = 800, rifleRate = 150, laserRate = 100;
var pistolAmmo = 84, rifleAmmo = 90, laserAmmo = 200;
var pistolClip = 7, rifleClip = 30;
var ammoText1, ammoText2, ammoText3;
var damage = 16, pistolDamage = 16, rifleDamage = 15, laserDamage = 19;
var bulletSpeed = 2000, pistolSpeed = 2000, rifleSpeed = 2500, laserSpeed = 3000;
var icon1, icon2, icon3, alpha1 = 1, alpha2 = 0.5, alpha3 = 0.5;
// global sound effects
var bang1, bang2, M4A1, boom, ping, hit, cannon, reload, empty
// keyboard controls
var cursors, up, down, left, right, key1, key2, key3;
// Others
var explosions, potion, arrow;

cyberCity.state1 = function(){};

cyberCity.state1.prototype = {
    preload: function(){
        game.load.image('cover','assets/Concept.gif');
        // load images to use as buttons
        game.load.image('start', 'assets/start.png');
        game.load.image('tutorial', 'assets/tutorial.png');
		//load the backgroudnd image
        game.load.image('level1','assets/level1.png');
        // load the 3D platform
        game.load.image('ground3D','assets/platform3D.png');
        //load the platform
        game.load.image('ground','assets/platform.png');
        //load the player
        game.load.spritesheet('girl','assets/female.png', 180, 300);
        //load the smallEnemy
        game.load.spritesheet('enemySmall','assets/enemySmall.png',200,200);
		//load the mediumEnemy
		game.load.spritesheet('enemyMedium','assets/enemyMedium.png',200,200);
        //load the revolver bullet 
        game.load.image('bullet1','assets/bulletRevolver.png');
		//load the revolver bullet 
        game.load.image('bullet2','assets/bulletRevolver.png');
		//load the laser bullet
        game.load.image('bullet3','assets/laser.png');
        //load the enemy bullet 
        game.load.image('enemyBullet','assets/enemyBullet.png');
        //load the mark
        game.load.image('mark','assets/mark.png');
        //load the explosion
        game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
        //load the explosion 2
        game.load.spritesheet('kaboom2', 'assets/explosion.png', 128, 128);
        //load the potion
        game.load.image('hp','assets/hp1.png');
		//load the gotshot image
        game.load.image('gotshot', 'assets/gotshot.png');
        //load the Audios
        game.load.audio('bang1', 'assets/sound/bang1.mp3');
		game.load.audio('M4A1', 'assets/sound/M4A1.mp3');
		game.load.audio('bang2', 'assets/sound/laser.mp3');
        game.load.audio('boom', 'assets/sound/blast.mp3');
        game.load.audio('ping', 'assets/sound/impact.mp3');
        game.load.audio('hit', 'assets/sound/hit.mp3');
        game.load.audio('cannon', 'assets/sound/cannon.mp3');
		game.load.audio('reload', 'assets/sound/reload.mp3');
		game.load.audio('empty', 'assets/sound/noammo.mp3');
        // level music
        game.load.audio('levelMusic1', 'assets/sound/levelMusic1.mp3');
        game.load.audio('levelMusic2', 'assets/sound/levelMusic2.mp3');
         game.load.audio('levelMusic3', 'assets/sound/levelMusic3.mp3');
		// load the weapon icon
		game.load.image('iconPistol','assets/iconPistol.png');
		game.load.image('iconRifle','assets/iconRifle.png');
		game.load.image('iconLaser','assets/iconLaser.png');
		// red arrow
		game.load.image('redArrow', 'assets/Arrow.png', 90, 90);
		game.load.image('Arrow', 'assets/redArrow.png');
    },
    create: function(){
		playerHP = 100;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        var background = game.add.sprite(0, 0, 'cover');
        background.height = game.height;
        background.width = game.width;
        game.add.text(165, 80, 'CYBER CITY\n', {font: "80px Courier", fill: "#45f442", align: "left"});
        
        startB = game.add.button(game.width/2 - 325, game.height/2 - 25, 'start', function() {
            changeState(9);
        }); 
        startB.scale.setTo(0.15, 0.15);
        startB.inputEnabled = true;
        
        tutorialB = game.add.button(game.width/2 + 75, game.height/2 - 25, 'tutorial', function() {
            changeState(2);
        });
        tutorialB.scale.setTo(0.115, 0.115);
        tutorialB.inputEnabled = true;

		// Add the shooting sound
        bang1 = game.add.audio('bang1');
		bang2 = game.add.audio('bang2');
		M4A1 = game.add.audio('M4A1');
        boom = game.add.audio('boom');
        ping = game.add.audio('ping');
        hit = game.add.audio('hit');
        cannon = game.add.audio('cannon');
		reload = game.add.audio('reload');
		empty = game.add.audio('empty');
        
        // add in level music
        lvlMusic1 = game.add.audio('levelMusic1');
        lvlMusic2 = game.add.audio('levelMusic2');
        lvlMusic3 = game.add.audio('levelMusic3');
        
        lvlMusic1.play();
		
		//Keyboard Controls 
		        
        cursors = game.input.keyboard.createCursorKeys();
        up = game.input.keyboard.addKey(Phaser.Keyboard.W);
        down = game.input.keyboard.addKey(Phaser.Keyboard.S);
        left = game.input.keyboard.addKey(Phaser.Keyboard.A);
        right = game.input.keyboard.addKey(Phaser.Keyboard.D);
		weaponReload = game.input.keyboard.addKey(Phaser.Keyboard.R);
		weaponReload.onDown.add(function() {
			
			if(weaponNum == 1 && pistolAmmo >= 7 && pistolClip != 7){
				reload.play();
				pistolClip = 7;
				pistolAmmo -= pistolClip;
				ammoText1.text = pistolClip + '/' + pistolAmmo;
			}
			else if(weaponNum == 2 && rifleAmmo >= 30 && rifleClip != 30){
				reload.play();
				rifleClip = 30;
				rifleAmmo -= rifleClip;
				ammoText2.text = rifleClip + '/' + rifleAmmo;
			}
		})
		// Switch Weapon Functions
		key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
		key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
		key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
		key1.onDown.add(function() {
			reload.play();
			alpha1 = 1;
			alpha2 = 0.5;
			alpha3 = 0.5;
			weaponNum = 1;
			icon1.alpha = alpha1;
			icon2.alpha = alpha2;
			icon3.alpha = alpha3;
			bullets = game.add.group();
			bullets.enableBody = true;
			bullets.physicsBodyType = Phaser.Physics.ARCADE;
			bullets.createMultiple(50, 'bullet' + weaponNum);
			bullets.setAll('checkWorldBounds', true);
			bullets.setAll('outOfBoundsKill', true);
			fireRate = pistolRate;
			damage = pistolDamage;
			bulletSpeed = pistolSpeed;
		})
		key2.onDown.add(function() {
			reload.play();
			alpha1 = 0.5;
			alpha2 = 1;
			alpha3 = 0.5;
			weaponNum = 2;
			icon1.alpha = alpha1;
			icon2.alpha = alpha2;
			icon3.alpha = alpha3;
			bullets = game.add.group();
			bullets.enableBody = true;
			bullets.physicsBodyType = Phaser.Physics.ARCADE;
			bullets.createMultiple(50, 'bullet' + weaponNum);
			bullets.setAll('checkWorldBounds', true);
			bullets.setAll('outOfBoundsKill', true);
			fireRate = rifleRate;
			damage = rifleDamage;
			bulletSpeed = rifleSpeed;
			
		})
		key3.onDown.add(function() {
			reload.play();
			alpha1 = 0.5;
			alpha2 = 0.5;
			alpha3 = 1;
			icon1.alpha = alpha1;
			icon2.alpha = alpha2;
			icon3.alpha = alpha3;
			weaponNum = 3;
			bullets = game.add.group();
			bullets.enableBody = true;
			bullets.physicsBodyType = Phaser.Physics.ARCADE;
			bullets.createMultiple(50, 'bullet' + weaponNum);
			bullets.setAll('checkWorldBounds', true);
			bullets.setAll('outOfBoundsKill', true);
			fireRate = laserRate;
			damage = laserDamage;
			bulletSpeed = laserSpeed;
			
		})
    },
    update: function(){
        if (startB.input.pointerOver()) {
            startB.alpha = 0.7;
        } 
        else {
            startB.alpha = 1;
        }
        
        if (tutorialB.input.pointerOver()) {
            tutorialB.alpha = 0.7;
        } 
        else {
            tutorialB.alpha = 1;
        }
    }
};

function changeState(stateNum){
    game.state.start('state' + stateNum)
}

function createPlayer(){
	// Add the character
	player = game.add.sprite(32, game.world.height - 150, 'girl');
	player.scale.setTo(0.3,0.3);
	player.anchor.setTo(0.5, 0.5);
	game.physics.arcade.enable(player);
	player.body.gravity.y = 900;
	player.body.collideWorldBounds = true;
	player.animations.add('left', [0, 1, 2], 10, true);
	player.animations.add('right', [5, 6, 7], 10, true);
    player.body.checkCollision.up = false; // allows player to jump onto platforms from beneath them
	// Display the player HP
	hpText = game.add.text(16, 16, 'Player HP: ' + playerHP, { fontSize: '100px', fill: '#33cc33' });
	// Add the mark
	mark = game.add.sprite(player.body.x + 30, player.body.y, 'mark');
	mark.anchor.setTo(0,0.5)
	game.physics.arcade.enable(mark);
	mark.scale.setTo(0.4,0.4);
}

function createBullets(){
	if(weaponNum == 1){
		fireRate = pistolRate;
	}
	else if(weaponNum == 2){
		fireRate = rifleRate;
	}
	else{
		fireRate = laserRate;
	}
	// PLayer bullets
	bullets = game.add.group();
	bullets.enableBody = true;
	bullets.physicsBodyType = Phaser.Physics.ARCADE;
	bullets.createMultiple(50, 'bullet'+weaponNum);
	bullets.setAll('checkWorldBounds', true);
	bullets.setAll('outOfBoundsKill', true);
}

function createWeaponBar(){
	// Add the weapon icons + ammo text
	icon1 = game.add.sprite(game.camera.width / 2 - 100, 50, 'iconPistol');
	icon1.anchor.setTo(0.5,0.5);
	icon1.scale.setTo(0.1,0.1);
	icon1.fixedToCamera = true;
	icon1.alpha = alpha1;
	ammoText1 = game.add.text(game.camera.width / 2 - 100, 60, pistolClip + '/' + pistolAmmo, {font: "10px Courier", fill: "#fff", align: "center"});
	icon1.anchor.setTo(0.5,0.5);
	icon2 = game.add.sprite(game.camera.width / 2, 50, 'iconRifle');
	icon2.anchor.setTo(0.5,0.5);
	icon2.scale.setTo(0.1,0.1);
	icon2.fixedToCamera = true;
	icon2.alpha = alpha2;
	ammoText2 = game.add.text(game.camera.width / 2, 60, rifleClip + '/' + rifleAmmo, {font: "10px Courier", fill: "#fff", align: "center"});
	icon3 = game.add.sprite(game.camera.width / 2 + 100, 50, 'iconLaser');
	icon3.anchor.setTo(0.5,0.5);
	icon3.scale.setTo(0.1,0.1);
	icon3.fixedToCamera = true;
	icon3.alpha = alpha3;
	ammoText3 = game.add.text(game.camera.width / 2 + 100, 60, laserAmmo, {font: "10px Courier", fill: "#fff", align: "center"});
	icon1.fixedToCamera = true;
	icon2.fixedToCamera = true;
	icon3.fixedToCamera = true;
	ammoText1.fixedToCamera = true;
	ammoText2.fixedToCamera = true;
	ammoText3.fixedToCamera = true;
}

function fire(){
	//if(game.time.now > nextFire){
	nextFire = game.time.now + fireRate;

	if (weaponNum == 1){	
		if(pistolClip != 0){
			bang1.play();
			pistolClip--;
			ammoText1.text = pistolClip + '/' + pistolAmmo;
			bullet = bullets.getFirstDead();
			bullet.anchor.setTo(0.5);
			bullet.reset(player.x, player.y);
			game.physics.arcade.moveToPointer(bullet, bulletSpeed);
			bullet.rotation = game.physics.arcade.angleToPointer(bullet);
		}
		else{
			empty.play();
		}
	}

	else if (weaponNum == 2){	
		if(rifleClip != 0){
			M4A1.play();
			rifleClip--;
			ammoText2.text = rifleClip + '/' + rifleAmmo;
			bullet = bullets.getFirstDead();
			bullet.anchor.setTo(0.5);
			bullet.reset(player.x, player.y);
			game.physics.arcade.moveToPointer(bullet, bulletSpeed);
			bullet.rotation = game.physics.arcade.angleToPointer(bullet);
		}
		else{
			empty.play();
		}
	}

	else{
		if(laserAmmo != 0){
			bang2.play();
			laserAmmo--;
			ammoText3.text = laserAmmo;
			bullet = bullets.getFirstDead();
			bullet.anchor.setTo(0.5);
			bullet.reset(player.x, player.y);
			game.physics.arcade.moveToPointer(bullet, bulletSpeed);
			bullet.rotation = game.physics.arcade.angleToPointer(bullet);
		}
	}
}

function addcheckPlayerHP() {
    playerHP += 25;
    if (playerHP >= 100) {
        playerHP = 100;
    }
}

function zeroHP() {
    if (playerHP <= 0) {
        changeState(7);
    }
    
}