
import Lvl1Scene from "./Lvl1Scene.js";
import Lvl2Scene from "./Lvl2Scene.js";
import Lvl3Scene from "./Lvl3Scene.js";
import MainMenu from "./MainMenu.js";

import MainController from "./MainController.js";

var player;

var main;
main=new MainController(player)

var mainMenu = new MainMenu()
var Lvl1 = new Lvl1Scene(main)
var Lvl2 = new Lvl2Scene(main)
var Lvl3 = new Lvl3Scene(main)

var DEFAULT_HEIGHT = 14*52
var DEFAULT_WIDTH = 28*52
const config = {
	type: Phaser.AUTO,
	mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
	parent: "game-container",
	scene: [
		mainMenu,
		Lvl1,
		Lvl2,
		Lvl3
	],
	physics: {
		default: "arcade",
		arcade: {
		gravity: { y: 0 },
		},
	},
};
const game = new Phaser.Game(config);

  

