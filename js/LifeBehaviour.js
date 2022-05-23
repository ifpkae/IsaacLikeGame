//import eventsCenter from "./EventsCenter.js"

export default class LifeBehaviour {
   
	constructor(scene,player, actualHp, maxHp) {
        
		this.scene = scene;
        this.player=player
        this.actualHp=actualHp;
        this.maxHp=maxHp;

        
	}

    ReturnMaxHp(){
        return this.maxHp;
    }

    ReturnHp(){
        return this.actualHp;
    }

    DecreaseHp(value){
        this.actualHp-=value;
        eventsCenter.emit('update-Life', this.actualHp)
        if(this.actualHp<=0){
            this.actualHp=0;
            this.player.destroy();
            
        }
        
    }
    IncreaseHp(value){
        this.actualHp+=value;
        if(this.actualHp>this.maxHp){
            this.actualHp=this.maxHp;
        }
    }
}