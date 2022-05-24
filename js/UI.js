export default class UIScene extends Phaser.Scene
{
    constructor(scene,player)
    {
        super()
        this.scene = scene;
        this.player = player;
        var textLife;
        var textDmg;
        var textSpeed;
    }

    showLife()
    {
   
        this.textLife=this.scene.add.text(100,100,'Health: '+ this.player.life.ReturnHp()+'/'+this.player.life.ReturnMaxHp(),{ fontSize: 32})
    }

    updateLife()
    {
        
        this.textLife.setText('Health: '+ this.player.life.ReturnHp()+'/'+this.player.life.ReturnMaxHp())
        //this.label.text = 'Health: ${amount}'
    }
    showDmg()
    {

        this.textDmg=this.scene.add.text(100,150,'Dmg: '+ this.player.stats.ReturnDmg(),{ fontSize: 32})
    }

    updateDmg()
    {
        
        this.textDmg.setText('Dmg: '+ this.player.stats.ReturnDmg())
        //this.label.text = 'Health: ${amount}'
    }
    showSpeed()
    {

        this.textSpeed=this.scene.add.text(100,200,'Speed: '+ this.player.stats.ReturnSpeed(),{ fontSize: 32})
    }

    updateSpeed()
    {
        
        this.textSpeed.setText('Speed: '+ this.player.stats.ReturnSpeed())
        //this.label.text = 'Health: ${amount}'
    }


}