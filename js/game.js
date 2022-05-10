
import IsaacScene from "./IsaacScene.js";

var DEFAULT_HEIGHT = 14*52// any height you want
var DEFAULT_WIDTH = 28*52
const config = {
	type: Phaser.AUTO, // Which renderer to use
	mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
	parent: "game-container", // ID of the DOM element to add the canvas to
	scene: IsaacScene,
	physics: {
		default: "arcade",
		arcade: {
		gravity: { y: 0 },
		},
	},
};
const game = new Phaser.Game(config);

  

