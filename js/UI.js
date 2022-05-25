export default class UIScene extends Phaser.Scene
{
    constructor(scene,player, heartImage)
    {
        super()
        this.scene = scene;
        this.player = player;
        var textLife;
        var textDmg;
        var textSpeed;
        this.heartsarray = []; 
        this.heartImage = heartImage;
    }

    showLife()
    {
        for(var i= 0; i<this.heartsarray.length;i++) {
            this.heartsarray[i].destroy();
        }

        this.heartsarray = [];

        for(var i = 0; i < this.player.life.ReturnMaxHp(); i++) {  
            var hearts = this.scene.add.sprite(100 + i * 32,100,this.heartImage);
            let test = this.heartsarray.push(hearts);
        }
    }

    updateLife()
    {
        this.showLife();
        for(var i = 0; i < this.player.life.ReturnMaxHp(); i++)
        {  
            if(i <= this.player.life.ReturnHp())
            {
                this.heartsarray[i].setVisible(true);
            }
            else
            {
                this.heartsarray[i].setVisible(false);
            }
        }
    }

    showDmg()
    {
        this.textDmg=this.scene.add.text(100,150,'Dmg: '+ this.player.stats.ReturnDmg(),{ fontSize: 32})
    }

    updateDmg()
    {
        this.textDmg.setText('Dmg: '+ this.player.stats.ReturnDmg())
    }

    showSpeed()
    {
        this.textSpeed=this.scene.add.text(100,200,'Speed: '+ this.player.stats.ReturnSpeed(),{ fontSize: 32})
    }

    updateSpeed()
    {
        this.textSpeed.setText('Speed: '+ this.player.stats.ReturnSpeed())
    }

}