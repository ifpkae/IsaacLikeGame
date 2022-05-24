

export default class Stats {
	constructor(scene, objective, speed, dmg, life, delayShoot) {
		this.scene = scene;
		
		this.Object=objective;

		this.Speed=speed;
        this.Dmg=dmg;
        this.Life=life;
        this.DelayShoot = delayShoot;
	}
	

	
	AddDmg(increment){
        this.Dmg +=increment
    }
    AddSpeed(increment){
        this.Speed +=increment
        console.log(this.Speed)
    }
    AddLife(increment){
        this.Life +=increment
    }
    AddDelay(increment){
        this.DelayShoot +=increment
    }

    

    ReturnDmg(){
        return this.Dmg
    }
    ReturnSpeed(){
        return this.Speed
    }
    ReturnLife(){
        return this.Life
    }
    ReturnDelay(){
        return this.DelayShoot
    }
}