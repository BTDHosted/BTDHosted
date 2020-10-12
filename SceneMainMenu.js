class SceneMainMenu extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMainMenu" });
    }


    preload(){
      this.load.image("sprBtnPlay", "assets/sprBtnPlay.png");
      this.load.image("sprBtnPlayHover", "assets/sprBtnPlayHover.png");
      this.load.image("sprBtnPlayDown", "assets/sprBtnPlayDown.png");
      this.load.image("sprBtnRestart", "assets/sprBtnRestart.png");
      this.load.image("sprBtnRestartHover", "assets/sprBtnRestartHover.png");
      this.load.image("sprBtnRestartDown", "assets/sprBtnRestartDown.png");
    }
  
    create() {
      this.btnPlay = this.add.sprite(
        this.game.config.width * 0.5,
        this.game.config.height * 0.5,
        "sprBtnPlay"
      );
      this.btnPlay.setInteractive();

      this.btnPlay.on("pointerover", function() {
        this.btnPlay.setTexture("sprBtnPlayHover"); 
      }, this);

      this.btnPlay.on("pointerout", function() {
        this.setTexture("sprBtnPlay");
      });

      this.btnPlay.on("pointerdown", function() {
        this.btnPlay.setTexture("sprBtnPlayDown");
      }, this);

      this.btnPlay.on("pointerup", function() {
        this.btnPlay.setTexture("sprBtnPlay");
        this.scene.start("SceneMain");
      }, this);

      this.title = this.add.text(this.game.config.width * 0.5, 128, "Bloons TD Reimagined", {
        fontFamily: 'monospace',
        fontSize: 30,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center'
      });
      this.title.setOrigin(0.5);

    }
  }