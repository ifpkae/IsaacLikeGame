export default class MovementBehaviour {
   
	constructor(scene,player) {
        
		this.scene = scene;
        this.ObjectGot=player;
        
	}

    MoveX(dir){
        this.ObjectGot.body.setVelocityX(dir*this.ObjectGot.stats.ReturnSpeed());
    }

    MoveY(dir){
        this.ObjectGot.body.setVelocityY(dir*this.ObjectGot.stats.ReturnSpeed());
    }

    Move(dir){
        
        this.ObjectGot.body.setVelocityX(dir.x*this.ObjectGot.stats.ReturnSpeed());
        this.ObjectGot.body.setVelocityY(dir.y*this.ObjectGot.stats.ReturnSpeed());
    }
}