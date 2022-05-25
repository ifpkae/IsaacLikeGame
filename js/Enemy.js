
import MovementBehaviour from "./MovementBehaviour.js";

export default class Enemy {
	constructor(scene, x, y, objective, atlasName) {
		this.scene = scene;
		this.Dead=false;
		var HeadRecoverTimePassed;
		this.HeadRecoverTimePassed=10;
		var LastDir;
		this.LastDir=4
		var ShootDir;

        this.objective=objective;
		// Create the animations we need from the player spritesheet
		const anims = scene.anims;
		anims.create({
			key: "SideMove",
			frames: anims.generateFrameNames(atlasName, {
			prefix: "SMove",
			start: 1,
			end: 10,
			zeroPad: 0,
			}),
			frameRate: 20,
			repeat: -1,
		});
		anims.create({
			key: "FrontBackMove",
			frames: anims.generateFrameNames(atlasName, {
			prefix: "FBMove",
			start: 1,
			end: 10,
			zeroPad: 0,
			}),
			frameRate: 20,
			repeat: -1,
		});
		
		this.Object=this;
		
		this.sprite = scene.physics.add.sprite(x, y, atlasName, "FBMove3").setSize(20, 20).setOffset(12, 12).setFriction(0, 0).setOrigin(0.6,0.3).setScale(2,2);
        

		this.sprite.head = scene.physics.add.sprite(x, y, atlasName, "FrontFaceNormal").setSize(20, 20).setOffset(12, 12).setOrigin(0.6,0.3).setScale(2,2);
		this.sprite.head.setDepth(10);

		this.sprite.head.y = this.sprite.y-19;
	
	}
	
	
	update(time, delta) {
        
	}
		
	ReturnShootDir(){
		return this.ShootDir;
	} 

	ReturnPosX(){
		return this.sprite.x;
	}
	ReturnPosY(){
		return this.sprite.y;
	}
	destroy() {
		this.sprite.destroy();
        this.sprite.head.destroy();
	}
}