cyberCity.state9 = function(){};
var content = [
    "The light of the TV flickered as you entered the living room, late from work.",
    "The remote sat demurely, alone on the armrest. The Lazyboy was empty.",
    "",
    "Dan? You home?",
    "Pulling your sore feet free of your heels, you tossed them aside as you enter the bedroom.",
    "No sign of Dan.",
    "A loud whistle arcs through the air ending in the sound of shattered glass.",
    "Running to the kitchen, you see the window above the sink broken.",
    "A small black contraption lays cold against the floor.",
    "You pick it up hesitantly.",
    "",
    "Suddenly, it fires up. A blue cast radiating from the center.",
    "",
    ""
];

var line = [];

var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 120;
var lineDelay = 400;

cyberCity.state9.prototype = {
    create: function() {
        
        // PAUSE ALL MUSIC --> need a more sadder song?
        lvlMusic1.pause();
        lvlMusic2.pause();
        lvlMusic3.pause();
        
        text = game.add.text(64, 64, '', {font: "15px Arial", fill: "#19de65"});
        this.nextLine();
        text2 = game.add.text(game.world.centerX, game.world.centerY + 100, "SKIP", { font: "65px Arial", fill: "#ff0044", align: "center" });
        text2.inputEnabled = true;
        text2.events.onInputDown.add(function(){changeState(8)}, this);
    },
    
    nextLine: function() {
        if (lineIndex == content.length) {
            return;
        }
        line = content[lineIndex].split(' ');
        wordIndex = 0;
        
        game.time.events.repeat(wordDelay, line.length, this.nextWord, this);
        lineIndex++;
    },
    
    nextWord: function() {
        text.text = text.text.concat(line[wordIndex] + " ");
        wordIndex++;
        
        if (wordIndex == line.length) {
            text.text = text.text.concat("\n");
            game.time.events.add(lineDelay, this.nextLine, this);
        }
    }
};

