export default class UIScene extends Phaser.Scene
{
    constructor(scene,player, heartImage, damageImage, speedImage)
    {
        super()
        this.scene = scene;
        this.player = player;
        var textLife;
        var textDmg;
        var textSpeed;
        this.heartsarray = []; 
        this.heartImage = heartImage;
        this.damageImage = damageImage;
        this.speedImage = speedImage;
    }

    showLife()
    {
        for(var i= 0; i<this.heartsarray.length;i++) {
            this.heartsarray[i].destroy();
        }

        this.heartsarray = [];

        for(var i = 0; i < this.player.life.ReturnMaxHp(); i++) {
            var hearts = this.scene.add.sprite(132 + i * 32,32,this.heartImage);
            let test = this.heartsarray.push(hearts);
        }
    }

    updateLife()
    {
        this.showLife();
        for(var i = 0; i < this.player.life.ReturnMaxHp(); i++)
        {
            if(i < this.player.life.ReturnHp())
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
        this.scene.add.sprite(10,70,this.damageImage).setOrigin(0);
        this.textDmg=this.scene.add.text(50,70, this.player.stats.ReturnDmg(),{ fontSize: 32})
    }

    updateDmg()
    {
        this.textDmg.setText(this.player.stats.ReturnDmg())
    }

    showSpeed()
    {
        this.scene.add.sprite(10,120,this.speedImage).setOrigin(0);
        this.textSpeed=this.scene.add.text(50,120, this.player.stats.ReturnSpeed(),{ fontSize: 32})
    }

    updateSpeed()
    {
        this.textSpeed.setText(this.player.stats.ReturnSpeed())
    }

}