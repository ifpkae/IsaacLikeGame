export default class MainController {
	constructor(player) {
		this.scene = null;
        this.player=player
		this.timer=0
	}


	SetScene(scene){
        this.scene=scene
        if(this.player!=undefined){
            
            this.player.sprite.stats.scene=this.scene
            
        }
        
    }

    SetPlayer(player){
        this.player=player
    }


    ReturnPlayer(){
        return this.player
    }

}