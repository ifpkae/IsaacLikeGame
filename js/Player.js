import MovementBehaviour from "./MovementBehaviour.js";

export default class Player {
	constructor(scene, x, y) {
		this.scene = scene;
		this.Dead=false;
		var HeadRecoverTimePassed;
		this.HeadRecoverTimePassed=10;
		var LastDir;
		this.LastDir=4
		var ShootDir;
	
		var vector 
		
       
		
		// Create the animations we need from the player spritesheet
		const anims = scene.anims;
		anims.create({
			key: "SideMove",
			frames: anims.generateFrameNames("IsaacAtlas", {
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
			frames: anims.generateFrameNames("IsaacAtlas", {
			prefix: "FBMove",
			start: 1,
			end: 10,
			zeroPad: 0,
			}),
			frameRate: 20,
			repeat: -1,
		});
		
		
		
		this.sprite = scene.physics.add.sprite(x, y, "IsaacAtlas", "FBMove3").setSize(40, 40).setOffset(12, 12)

		this.sprite.head = scene.physics.add.sprite(x, y, "IsaacAtlas", "FrontFaceNormal").setSize(40, 40).setOffset(12, 12);
		this.sprite.head.setDepth(10);

		this.sprite.head.y = this.sprite.y-19;
		const { LEFT, RIGHT, UP, DOWN, W, A, S, D } = Phaser.Input.Keyboard.KeyCodes;
		this.keys = scene.input.keyboard.addKeys({
			left: LEFT,
			right: RIGHT,
			up: UP,
			down: DOWN,
			w: W,
			a: A,
			s: S,
			d: D
		});
		
	}
	
	
	update(time, delta) {
		if(!this.Dead){
			const HeadRecoverTime=0.5;
			const keys = this.keys;
			const player = this.sprite;
			const head=this.sprite.head;
			const prevVelocity = player.body.velocity.clone();
			player.body.setVelocity(0);
			head.body.setVelocity(0);

			// Horizontal movement
			if (keys.a.isDown) {
				this.sprite.move.MoveX(-1);
				player.setFlipX(true);
				this.LastDir=1;
			} else if (keys.d.isDown) {
				this.sprite.move.MoveX(1);
				player.setFlipX(false);
				this.LastDir=2;
			}
			
			// Vertical movement
			if (keys.w.isDown) {
			
				this.sprite.move.MoveY(-1);
				this.LastDir=3;
			} else if (keys.s.isDown) {
				this.sprite.move.MoveY(1);
				this.LastDir=4;
			}
			head.x=player.body.x + 20;
			head.y=player.body.y ;
			
			// Normalize and scale the velocity so that player can't move faster along a diagonal
			player.body.velocity.normalize().scale(this.sprite.stats.ReturnSpeed());

			if (keys.a.isDown) {
				player.anims.play("SideMove", true);
			} else if (keys.d.isDown) {
				player.anims.play("SideMove", true);
			} else if (keys.w.isDown) {
				player.anims.play("FrontBackMove", true);
			} else if (keys.s.isDown) {
				player.anims.play("FrontBackMove", true);
			} else {
				player.anims.stop();
			
				// If we were moving, pick and idle frame to use
				if (prevVelocity.x < 0){ 
					player.setTexture("IsaacAtlas", "SMove7")
					head.y = player.y-19;
				}
				else if (prevVelocity.x > 0) {
					player.setTexture("IsaacAtlas", "SMove7")
					head.y = player.y-19;
				}
				
				else if (prevVelocity.y < 0) {
					player.setTexture("IsaacAtlas", "FBMove3");
					head.y = player.y-21;
				}
				else if (prevVelocity.y > 0) {
					player.setTexture("IsaacAtlas", "FBMove3");
					head.y = player.y-16;
				}
			}

			if (keys.left.isDown) {
				this.headLeft();
				this.HeadRecoverTimePassed=0;
				this.vector=new Phaser.Math.Vector2(-1, 0);
				this.vector.normalize()
				this.ShootDir=0;

			} else if (keys.right.isDown) {
				this.headRight();
				this.HeadRecoverTimePassed=0;
				this.vector=new Phaser.Math.Vector2(1, 0);
				this.vector.normalize()
			} else if (keys.up.isDown) {
				this.headUp();
				this.HeadRecoverTimePassed=0;
				this.vector=new Phaser.Math.Vector2(0, -1);
				this.vector.normalize()
				head.setFlipX(false);
			} else if (keys.down.isDown) {
				this.headDown();
				this.HeadRecoverTimePassed=0;
				head.setFlipX(false);
				this.vector=new Phaser.Math.Vector2(0, 1);
				this.vector.normalize()
			}
			else{
				this.vector=new Phaser.Math.Vector2(0, 0);
				this.vector.normalize()
			}

			this.HeadRecoverTimePassed+= (1*delta)/1000;
			
			if(HeadRecoverTime<this.HeadRecoverTimePassed){
			
				if (keys.a.isDown) {
					this.headLeft();
				} else if (keys.d.isDown) {
					this.headRight()
				} else if (keys.w.isDown) {
					this.headUp();
				} else if (keys.s.isDown) {
					this.headDown();
				}
				else {
					// If we were moving, pick and idle frame to use
					if (this.LastDir == 1){ 
						this.headLeft();
					}
					else if (this.LastDir == 2) {
						this.headRight();
					}
					
					else if (this.LastDir == 3) {
						this.headUp();
					}
					else if (this.LastDir == 4) {
						this.headDown();
					}
				}
			}
			
			
		}
	}
		
	
	headRight(){
		this.sprite.head.setTexture("IsaacAtlas", "SideFaceNormal");
		this.sprite.head.setFlipX(false);
	}
	headLeft(){
		this.sprite.head.setTexture("IsaacAtlas", "SideFaceNormal");
		this.sprite.head.setFlipX(true);
	}
	headUp(){
		this.sprite.head.setTexture("IsaacAtlas", "BackFaceNormal");
	}
	headDown(){
		this.sprite.head.setTexture("IsaacAtlas", "FrontFaceNormal");
	}
	ReturnShootDir(){
		return this.vector;
	} 

	ReturnPosX(){
		return this.sprite.x;
	}
	ReturnPosY(){
		return this.sprite.y;
	}
	destroy() {
		this.sprite.body.setVelocity(0);
        this.sprite.setVisible(false);

        this.sprite.head.body.setVelocity(0);
        this.sprite.head.setVisible(false);
		this.Dead=true;
		
	}
}