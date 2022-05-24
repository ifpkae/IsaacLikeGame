
import IsaacScene from "./IsaacScene.js";
import Lvl2Scene from "./Lvl2Scene.js";
var Lvl1 = new IsaacScene()
var Lvl2 = new Lvl2Scene()
console.log(Lvl1)
var DEFAULT_HEIGHT = 14*52
var DEFAULT_WIDTH = 28*52
const config = {
	type: Phaser.AUTO,
	mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
	parent: "game-container",
	scene: [Lvl2,Lvl1],
	physics: {
		default: "arcade",
		arcade: {
		gravity: { y: 0 },
		},
	},
};
const game = new Phaser.Game(config);

  

