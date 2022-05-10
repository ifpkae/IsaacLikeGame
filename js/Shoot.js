import Bullet from "./Bullet.js";

export default class Shoot {
	constructor(scene, delay, dmg,speed, objective) {
		this.scene = scene;
        var ShootDelay=0;
        this.ShootDelay=delay;
        this.d =null;
        this.dmg=dmg
        this.speed=speed;
        var timer=0
        this.timer=0
        this.objective=objective;
        
	}
	
	
	update(timer,delta) {
       
    }

    UpdateTimer(delta){
        this.timer+=(1*delta)/1000;

    }


    Shoot(dir,x,y){
        if(this.objective==undefined){
            this.d = new Bullet(this.scene,x,y,this.speed,dir,this.dmg);
            return this.d.ReturnBullet();
        }
        else{
            var obj
            this.obj=new Phaser.Math.Vector2(this.objective.x, this.objective.y);
            var act
            this.act=new Phaser.Math.Vector2(x, y);

            var dist 
            this.dist= Phaser.Math.Distance.BetweenPoints(this.obj, this.act);
            if(this.dist<500){
                var vector 
                this.vector=new Phaser.Math.Vector2(this.objective.x-x, this.objective.y-y);
                this.vector.normalize()
                
                this.d = new Bullet(this.scene,x,y,this.speed,this.vector,this.dmg);
                return this.d.ReturnBullet();
            }
            
        }
       
    }

    ReturnDelay(){
        return this.ShootDelay;
    }

    
    ReturnTimer(){
        return this.timer;
    }

    ResetTimer(){
        this.timer=0;
    }
}