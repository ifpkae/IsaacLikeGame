import Phaser from 'phaser'

export default class UI extends Phaser.Scene
{
    constructor()
    {
        super('ui-scene')
    }

    create()
    {
        this.label = this.add.text(10,10,'Health: 5',
        {
            fontSize: 32
        })
    }

    updateLife(count)
    {
        this.label.text = 'Health: ${count}'
    }

}