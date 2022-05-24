export default class LifeBehaviour {
   
	constructor(scene,player) {
        
		this.scene = scene;
        this.player=player
        this.hp=this.player.sprite.stats.ReturnLife();


        
	}

    ReturnHp(){
        return this.player.stats.ReturnLife()
    }

    DecreaseHp(value){

        this.hp-=value;
        if(this.hp<=0){
            this.hp=0;
            this.player.destroy();
            
        }
        
    }
    IncreaseHp(value){

        this.hp+=value;
    }
}