import Bullet from "./Bullet.js";

export default class Shoot {
	constructor(scene,actual,objective) {
		this.scene = scene;
        this.player=actual;

        var timer=0
        this.timer=0

        this.objective=objective;

        this.d =null;
        this.BulletSpeed=600;
	}
	
	
	update(timer,delta) {
       
    }

    UpdateTimer(delta){
        this.timer+=(1*delta)/1000;

    }


    Shoot(dir,x,y){
        if(this.objective==undefined){
            this.d = new Bullet(this.scene,x,y,this.BulletSpeed,dir,this.player.stats.ReturnDmg());
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
                
                this.d = new Bullet(this.scene,x,y,this.BulletSpeed,this.vector,this.player.stats.ReturnDmg());
                return this.d.ReturnBullet();
            }
            
        }
       
    }

    ReturnDelay(){
        
        return this.player.stats.ReturnDelay();
    }

    
    ReturnTimer(){
        return this.timer;
    }

    ResetTimer(){
        this.timer=0;
    }
}