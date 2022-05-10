export default class MovementBehaviour {
   
	constructor(scene,player, speed) {
        
		this.scene = scene;
        this.ObjectGot=player;
        this.speed=speed;
	}

    MoveX(dir){
        this.ObjectGot.body.setVelocityX(dir*this.speed);
    }

    MoveY(dir){
        this.ObjectGot.body.setVelocityY(dir*this.speed);
    }

    Move(dir){
        this.ObjectGot.body.setVelocityX(dir.x*this.speed);
        this.ObjectGot.body.setVelocityY(dir.y*this.speed);
    }
}