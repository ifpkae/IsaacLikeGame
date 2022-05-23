import eventsCenter from "./EventsCenter"

export default class UIScene extends Phaser.Scene
{
    constructor()
    {
        super('ui-canvas')
    }

    create()
    {
        this.label = this.add.text(10,10,'Health: 5',
        {
            fontSize: 32
        })

        eventsCenter.on('update-Life', this.updateLife, this)

        this.events.on(Phaser.scenes.Events.SHUTDOWN, () =>{
            eventsCenter.off('update-Life', this,this.updateLife,this)
        })
    }

    updateLife(amount)
    {
        console.log(amount)
        this.label.text = 'Health: ${amount}'
    }

}