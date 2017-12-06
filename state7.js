//ENDING
cyberCity.state7 = function(){};
var timer = 0;
var textGame;
var textVisible = 1;
cyberCity.state7.prototype = {
    preload: function(){
        console.log('state7');
        game.load.image('start', 'assets/start.png')
    },
    create: function(){
        lvlMusic1.pause();
        lvlMusic2.pause();
        lvlMusic3.pause();
        
        
        game.stage.backgroundColor = '#000000';
        textGame = game.add.text(game.world.centerX, game.world.centerY, 'You Won!',{font: "80px Courier", fill: "#DDDDDD", align: "center"});
        textGame.anchor.setTo(0.5, 0.5);
        /*startB = game.add.button(450, 400, 'start', function() {
            changeState(1);
        }) 
        startB.scale.setTo(0.1, 0.1);
        startB.inputEnabled = true;*/
    },
    update: function(){
        this.functionupdate();
        if (startB.input.pointerOver()) {   //Change the alpha of button when hover
            startB.alpha = 0.7;
        } 
        else {
            startB.alpha = 1;
        }
    },
    //Update 
    functionupdate: function(){    
		timer += game.time.elapsed; //this is in ms, not seconds.    
		if ( timer >= 1000 ){
			timer -= 1000; 
			if(textVisible == 1){
				textGame.destroy();
				textVisible = 0;
			}
			else{
				textGame = game.add.text(game.world.centerX, game.world.centerY, 'Game Over!',{font: "80px Courier", fill: "#DDDDDD", align: "center"});
				textGame.anchor.setTo(0.5, 0.5);
				textVisible = 1;
			}
        }}
		
};

