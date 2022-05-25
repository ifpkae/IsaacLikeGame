

export default class Item {
	constructor(scene, x,y, dmgIncrement,speedIncrement,lifeIncrement,delayIncrement,spriteNames) {
		this.scene = scene;
		this.Speed=speedIncrement;
        this.Dmg=dmgIncrement;
        this.Life=lifeIncrement;
        this.DelayShoot = delayIncrement;
        this.x=x
        this.y=y
        var spriteName = spriteNames + "";
        
        this.sprite = scene.physics.add.sprite(x, y, "ItemsAtlas", spriteName).setSize(40, 40).setOffset(12, 12);
	}

	Apply(obj){
        obj.stats.AddDmg(this.Dmg);
        obj.stats.AddSpeed(this.Speed);
        obj.stats.AddLife(this.Life);
        obj.stats.AddDelay(this.DelayShoot);
    }

}