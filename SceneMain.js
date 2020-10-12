let dataBaseHighScore;
let userNameToSubmit;

class SceneMain extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMain" });
    }

    saveUsername(){
      submitButton = document.getElementById("submitUsernameButton");
      submitButton.addEventListener ("click", function(evt){
        userNameInputField = document.getElementById("userName").value;
        username = userNameInputField;
      });
      console.log("@@@@@@@@@@@username = " + userName);


    }

    preload() {
        this.load.spritesheet("sprExplosion", "assets/sprExplosion.png", {
        frameWidth: 32,
        frameHeight: 32
        });

        this.load.image("sprDart", "assets/dartImg.png");
        this.load.image("sprPlayer", "assets/playerImg.png");
        this.load.image("redBalloon", "assets/redBalloonImg.png");

        this.load.image("sprBtnPlay", "assets/sprBtnPlay.png");
        this.load.image("sprBtnPlayHover", "assets/sprBtnPlayHover.png");
        this.load.image("sprBtnPlayDown", "assets/sprBtnPlayDown.png");
        this.load.image("sprBtnRestart", "assets/sprBtnRestart.png");
        this.load.image("sprBtnRestartHover", "assets/sprBtnRestartHover.png");
        this.load.image("sprBtnRestartDown", "assets/sprBtnRestartDown.png");
    }
    create() {
      var gameScore = 0;
      returnHighScore(); //makes a call to the database and sets the dataBaseHighScore var

      var submitButton = document.getElementById("submitUsernameButton");
      submitButton.addEventListener ("click", function(evt){
        let userNameInputField = document.getElementById("userName").value;
        userNameToSubmit = userNameInputField;
      });
      console.log("@@@@@@@@@@@username = " + userNameToSubmit);
      //

        this.anims.create({
            key: "sprExplosion",
            frames: this.anims.generateFrameNumbers("sprExplosion"),
            frameRate: 20,
            repeat: 0
        });
      
        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "sprPlayer",
            0
          ); 
        //Handles keypresses  
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();
        this.playerDarts = this.add.group();

        //Spawns balloons
        this.time.addEvent({
            delay: 1000,
            callback: function() {
                //change the values to other balloons as desired for more features
                var enemy = null;

                if (Phaser.Math.Between(0, 10) >= 3) {
                  enemy = new RedBalloon(
                    this,
                    Phaser.Math.Between(0, this.game.config.width),
                    0
                  );
                }
                else if (Phaser.Math.Between(0, 10) >= 5) {
                  if (this.getEnemiesByType("RedBalloon").length < 5) {
            
                    enemy = new RedBalloon(
                      this,
                      Phaser.Math.Between(0, this.game.config.width),
                      0
                    );
                  }
                }
                else {
                  enemy = new RedBalloon(
                    this,
                    Phaser.Math.Between(0, this.game.config.width),
                    0
                  );
                }
            
                if (enemy !== null) {
                  //enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
                  this.enemies.add(enemy);
                }

            //   var enemy = new RedBalloon(
            //     this,
            //     Phaser.Math.Between(0, this.game.config.width),
            //     0
            //   );
            //   this.enemies.add(enemy);
            },
            callbackScope: this,
            loop: true
          });
        
        //Collision between a dart and an enemy
        this.physics.add.collider(this.playerDarts, this.enemies, function(playerDart, enemy) {
            if (enemy) {
                if (enemy.onDestroy !== undefined) {
                  enemy.onDestroy();
                }
              
                enemy.pop(true);
                playerDart.destroy();
                gameScore++;

                document.getElementById("gameScore").innerHTML = "Current Score: " + gameScore;
                if (gameScore >= dataBaseHighScore){
                    console.log("it's greater than");
                    dataBaseHighScore = gameScore;
                    document.getElementById("highScore").innerHTML = "High Score: " + dataBaseHighScore;
                }


              }
        });

        //Collision between a player and an enemy
        this.physics.add.overlap(this.player, this.enemies, function(player, enemy) {
            if (!player.getData("isDead") &&
                !enemy.getData("isDead")) {
              player.pop(false);
              console.log("@@@@@@@@@@@username atdeath= " + userName.value);
              if (gameScore >= dataBaseHighScore){
                updateHighScore(userName.value,dataBaseHighScore);
              }
              player.onDestroy();
              enemy.pop(true);
            }
          });
    }

    update(){
        if (!this.player.getData("isDead")) {
            this.player.update();
            if (this.keyW.isDown) {
              this.player.moveUp();
            }
            else if (this.keyS.isDown) {
              this.player.moveDown();
            }
            if (this.keyA.isDown) {
              this.player.moveLeft();
            }
            else if (this.keyD.isDown) {
              this.player.moveRight();
            }
          
            if (this.keySpace.isDown) {
              this.player.setData("isShooting", true);
            }
            else {
              this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
              this.player.setData("isShooting", false);
            }
          }
        

        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];
      
            enemy.update();

            if (enemy.x < -enemy.displayWidth ||
                enemy.x > this.game.config.width + enemy.displayWidth ||
                enemy.y < -enemy.displayHeight * 4 ||
                enemy.y > this.game.config.height + enemy.displayHeight) {
            
                if (enemy) {
                  if (enemy.onDestroy !== undefined) {
                    enemy.onDestroy();
                  }
                  enemy.destroy();
                }
            }
          }

          for (var i = 0; i < this.playerDarts.getChildren().length; i++) {
            var dart = this.playerDarts.getChildren()[i];
            dart.update();
      
            if (dart.x < -dart.displayWidth ||
                dart.x > this.game.config.width + dart.displayWidth ||
                dart.y < -dart.displayHeight * 4 ||
                dart.y > this.game.config.height + dart.displayHeight) {
              if (dart) {
                dart.destroy();
              }
            }
          }

        }
        

    getEnemiesByType(type) {
        var arr = [];
        for (var i = 0; i < this.enemies.getChildren().length; i++) {
          var enemy = this.enemies.getChildren()[i];
          if (enemy.getData("type") == type) {
            arr.push(enemy);
          }
        }
        return arr;
      }


  }