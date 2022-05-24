import Stats from "./StatsBehaviour.js";
import MovementBehaviour from "./MovementBehaviour.js";

export default class Bullet {
   
	constructor(scene, x,y, speed, direction, dmg) {
        
		this.scene = scene;
        this.speed=speed;
        this.dir=direction
        this.bullet = scene.physics.add.sprite(x,y, "BulletAtlas","Bullet").setSize(20, 20).setOffset(22, 22);
        this.bullet.setDepth(10);
		this.bullet.x=x;
        this.bullet.y=y;
        this.bullet.dir=this.dir;
        this.bullet.speed=this.speed;
        this.bullet.dmg=dmg;
        this.bullet.stats= new Stats(this, this.bullet, this.bullet.speed,this.bullet.dmg, 1,0)
        this.bullet.move=new MovementBehaviour(this.scene, this.bullet)

        

        
	}

    ReturnBullet(){
        return this.bullet;
    }

    destroy() {
		this.bullet.destroy();
	}

}