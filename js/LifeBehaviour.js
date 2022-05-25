export default class LifeBehaviour {
   
	constructor(scene,player) {
        
		this.scene = scene;
        this.player=player
        this.hp=this.player.sprite.stats.ReturnLife();


        
	}

    ReturnMaxHp(){
        return this.player.sprite.stats.ReturnLife();
    }

    ReturnHp(){
        return this.hp
    }

    DecreaseHp(value){

        this.hp-=value;
        if(this.hp<=0){
            this.hp=0;
            this.player.destroy();
            
            return true;
        }
        return false;
    }

    Check(){
        if(this.hp>this.player.sprite.stats.ReturnLife()){
            this.hp=this.player.sprite.stats.ReturnLife();
        }
        if(this.hp<=0){
            this.hp=0;
            this.player.destroy();
            
            return true;
    
        }
        return false;
    }

    SetToMax(){
        this.hp=this.player.sprite.stats.ReturnLife();
    }
    IncreaseHp(value){

        this.hp+=value;
        if(this.hp>this.player.sprite.stats.ReturnLife()){
            this.hp=this.player.sprite.stats.ReturnLife();
        }

    }
}