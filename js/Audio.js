

export default class Audio {
	constructor(scene, audioName) {
		this.scene = scene;
		this.Speed=speedIncrement;
        this.Dmg=dmgIncrement;
        this.Life=lifeIncrement;
        this.DelayShoot = delayIncrement;
        this.x=x
        this.y=y
        
        this.sprite = scene.physics.add.sprite(x, y, "IsaacAtlas", "FBMove3").setSize(40, 40).setOffset(12, 12);
	}

	Apply(obj){
        obj.stats.AddDmg(this.Dmg);
        obj.stats.AddSpeed(this.Speed);
        obj.stats.AddLife(this.Life);
        obj.stats.AddDelay(this.DelayShoot);
    }

}