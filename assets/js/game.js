// Game States
// WIN - Player robot has defeated all enemy robots
//  * Fight all enemy-robots
//  * Defeat each enemy-robot
// LOSE - Player robot's health is zero or less

// var playerInfo.name = window.prompt("What is your robot's name?");
// var playerInfo.health = 100;
// var playerInfo.attack = 10;
// var playerInfo.money = 10;

var getPlayerName = function() {
    var name = "";
    while (name === ""|| name === null){
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is "+name);
    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >=7){
            window.alert("Refilling Player's health by 20 for 7 dollars.")
            this.health +=20;
            this.money -=7;
        }
        else{
            window.alert("You don't have enough money!")
        }
    },
    upgradeAttack: function() {
        if (this.money >=7){
            window.alert("Upgrading Player's attack by 6 for 7 dollars.")
            this.attack += 6;
            this.money -=7;
        }
        else{
            window.alert("You don't have enough money!")
        }
    }
};

console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

//function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random()*(max-min+1)+min);
    return value;
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name:"Robo Trumble",
        attack: randomNumber(10,14)
    }
];

//function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random()*(max-min+1)+min);
    return value;
};

var fightOrSkip = function () {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    
    if (promptFight === ""||promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
    promptFight = promptFight.toLowerCase();
    if (promptFight === "skip") {

        var confirmSkip = window.confirm("Are you sure you want to skip the fight?");

        if (confirmSkip) {
            window.alert(playerInfo.name+" has decided to skip this fight. Goodbye!");
            playerInfo.money = playerInfo.money-10;
            return true;
        }
        else{
            return false;
        }
    }
}

var fight = function (enemy) {
    var isPlayerTurn = true;
    if (Math.random() < 0.5) {
        isPlayerTurn = false;
    }
    console.log("At the start of this fight, isPlayerTurn is "+isPlayerTurn);

    while (enemy.health > 0 && playerInfo.health > 0) {
        if (isPlayerTurn) {
            //trigger fight or skip prompt
            if (fightOrSkip()) {
                //if true, leave fight by breaking the loop
                break;
            }
            //generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            // Log a resulting message to the console so we know that it worked.
            console.log(playerInfo.name + " attacked " + enemy.name + " for " + damage + " damage. " + enemy.name + " now has " + enemy.health + " health remainng.");
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                break;
            }
            else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        }
        else {
            // Subtract the value of `damage` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            // Log a resulting message to the console so we know that it worked.
            console.log(
                enemy.name + " attacked " + playerInfo.name + " for " + damage + " damage. " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;
            }
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }

        isPlayerTurn = !isPlayerTurn;
        console.log("Player turn is now "+isPlayerTurn);
    }// end of while loop
};// end of fight function


var startGame = function () {
    //reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40,60);
            fight(pickedEnemyObj);
            //if we're not at the last enemy in the array
            if (i < enemyInfo.length - 1 && playerInfo.health > 0) {
                shop();
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }

    };
    endGame();
};

var playAgain = function () {
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var endGame = function () {
    if (playerInfo.health > 0) {
        window.alert("The game has now ended. Let's see how you did!");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }
    var currentHighScore = localStorage.getItem("robotGladiatorsHighScore");
    if (currentHighScore === null){
        currentHighScore = 0;
    }
    if (playerInfo.money > currentHighScore){
        window.alert("Congratulations, you have a new High Score! Your score is: "+playerInfo.money);
        localStorage.setItem("robotGladiatorsHighScore",playerInfo.money.toString());
        localStorage.setItem("robotGladiatorsHighScoreName",playerInfo.name);
    }
    else {
        window.alert("Your score is: "+playerInfo.money+", The current High Score is: "+currentHighScore+" held by "+localStorage.getItem("robotGladiatorsHighScoreName"));
    }
    playAgain();
};

var shop = function () {
    //ask player what they want to do
    var shopOptionPrompt = window.prompt(
        "Would you like to 1-REFILL your health, 2-UPGRADE your attack, or 3-LEAVE the store? Please enter one: enter 1,2, or 3 to make a choice."
    );
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

startGame();
