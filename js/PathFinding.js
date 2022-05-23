

export default class PathFinding {
   
	constructor(scene,player, objective, mapMesh,meshPosition, tileSize) {
        
		this.scene = scene;
        this.ObjectGot=player.sprite;
        this.Follow=objective.sprite;
        this.map=mapMesh
        this.TileSize=tileSize+1
        this.meshPosition=meshPosition;
        this.delay=0.5;
        this.timer=1;
        this.Route=[]
        this.actualPointInRoute=0;


        var graph 

        var map2
        this.map2=[]

        for(this.i=0; this.i<this.map.length; this.i++) {
            var line
            this.line=[]
            for(this.j=0;this.j<this.map[0].length;this.j++) {
                this.line.push(this.map[this.i][this.j])
            }
            this.map2.push(this.line)
         }
        this.graph= new Graph(this.map2);
  

        this.ReCalculate()
	}
    
    UpdateTimer(delta){
        this.timer += (1*delta)/1000;
    }

    ReturnDelay(){
        return this.delay
    }

    ReturnTimer(){
        return this.timer
    }

    ReturnDirection(){
        if(this.Route.length>0){
            if(this.Route[this.actualPointInRoute]!=undefined){
                var vector 
                var pos;
                this.pos = this.meshPosition[this.Route[this.actualPointInRoute].x][this.Route[this.actualPointInRoute].y]
                vector=new Phaser.Math.Vector2(this.pos.x-this.ObjectGot.x, this.pos.y-this.ObjectGot.y);
        
                vector.normalize()
                return  vector
            }
            
        }
        return new Phaser.Math.Vector2(0, 0);
            
    }

    CheckPos(){
        if(this.Route.length>0){
            if(this.Route[this.actualPointInRoute]!=undefined){
                var pos;
                this.pos = this.meshPosition[this.Route[this.actualPointInRoute].x][this.Route[this.actualPointInRoute].y]
                var dist 
                dist= Phaser.Math.Distance.BetweenPoints(this.ObjectGot, this.pos);
                if(dist<this.TileSize/2){
                     this.actualPointInRoute++;

                }
      
            }
            
        }

    }
    
    ReCalculate(){
        this.timer=0
        this.actualPointInRoute=0
        var start 
        var end 

        var Px
        var Py

        var Ox
        var Oy 

        this.Px= Phaser.Math.RoundTo(this.ObjectGot.x/this.TileSize, 0)
        this.Py=Phaser.Math.RoundTo(this.ObjectGot.y/this.TileSize, 0)

        
        this.Ox=Phaser.Math.RoundTo(this.Follow.x/this.TileSize, 0) 
        this.Oy=Phaser.Math.RoundTo(this.Follow.y/this.TileSize, 0)
        
        if(!isNaN(this.Px)){
            this.start= this.graph.grid[this.Px][this.Py];
            if(!isNaN(this.Ox)){
                this.end= this.graph.grid[this.Ox][this.Oy];
        
                this.Route = astar.search(this.graph, this.start, this.end);
            }
        }


        
        
       

    }

}