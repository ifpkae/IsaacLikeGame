export default class MainMenu extends Phaser.Scene 
{
	constructor() 
	{
		super({key: "MainMenu"});
    }

	preload() 
	{
        this.load.image('MenuIMG', './assets/Images/mainMenu.png');
	}
  
	create() 
	{
		var MenuImage = this.add.sprite(0,0, 'MenuIMG').setOrigin(0,0).setScale(0.75).setInteractive();

		this.input.on('pointerdown', () => this.scene.start('Lvl1Scene'))
	}
}