
import Player from "./Player.js";
import Enemy from "./Enemy.js";

import Shoot from "./Shoot.js";

import LifeBehaviour from "./LifeBehaviour.js";
import PathFinding from "./PathFinding.js";

export default class IsaacScene extends Phaser.Scene {
	preload() {
		this.load.image("tiles", "../assets/tilesets/146176.png");
		this.load.tilemapTiledJSON("map", "../assets/tilemaps/tilemap.json");
		this.load.json("mapMesh", "../assets/tilemaps/tilemapMapMesh.json");
		this.load.atlas("IsaacAtlas", "../assets/atlas/IsaacAtlasImg.png", "../assets/atlas/IsaacAtlasJSON.json");
		this.load.atlas("BulletAtlas", "../assets/atlas/BulletAtlasImg.png", "../assets/atlas/BulletAtlasJSON.json");
		
	}
  
	create() {
		

		const map = this.make.tilemap({ key: "map" });

		const tileset = map.addTilesetImage("tilemap", "tiles");

		this.groundLayer = map.createLayer("Ground", tileset, 0, 0);
		this.wallsLayer = map.createLayer("Walls", tileset, 0, 0);



///////////////////
		
		this.mapMesh = this.cache.json.get('mapMesh');
		this.MapArrayInfo=[]
		this.MapArrayPosition=[]
		this.MapArrayWidth = this.mapMesh.layers[0].width

		this.TilePosX=0;
		this.TilePosY=0;
		this.tileHeight=this.mapMesh.tileheight
		
		///Initializa array
		for(this.x=0; this.x<this.MapArrayWidth; this.x++){
			this.MapArrayInfo[this.x]=[]
			this.MapArrayPosition[this.x]=[]
		}
		
		///Fill array
		for(this.num=0, this.x=0, this.y=0; this.num!=-1; this.num++, this.x++){
			if(this.mapMesh.layers[0].data[this.num]!=undefined){
				if(this.mapMesh.layers[0].data[this.num]!=1){
					this.MapArrayInfo[this.x][this.y]=1
				}
				else{
					this.MapArrayInfo[this.x][this.y]=0
				}
				this.TilePosX+=this.tileHeight
				this.MapArrayPosition[this.x][this.y] = new Phaser.Math.Vector2(this.TilePosX-this.tileHeight/2, this.TilePosY-this.tileHeight/2);
				if(this.x+1>=this.MapArrayWidth){
					this.x=-1;
					this.y++;
					this.TilePosY+=+this.tileHeight
					this.TilePosX=0;
				}
			}else{
				break;
			}
		}

		////Print Array
		for(this.y=0, this.num=0; this.num<this.mapMesh.layers[0].data.length; this.y++){
			this.text=""
			for(this.x=0; this.x<this.MapArrayWidth; this.x++){
				this.text+=this.MapArrayInfo[this.x][this.y]
				this.num++;
			}
			
		}
	
//////////////////
		this.wallsLayer.setCollisionByProperty({ collides: true });
	
		const spawnPoint = map.findObject("Objects", (obj) => obj.name === "Spawn Point");

		this.PlayerGroup = this.physics.add.group();

		this.BulletList = this.physics.add.group();

		this.EnemyList = this.physics.add.group();
		this.EnemyBulletList = this.physics.add.group();
		
		this.player = new Player(this, spawnPoint.x, spawnPoint.y,300);
		
		this.player.Shooter= new Shoot(this, 0.3, 2, 600, undefined);
		this.player.sprite.life = new LifeBehaviour(this, this.player, 5,5);

		this.PlayerGroup.add(this.player.sprite)
		for (this.num=0; this.num != -1; this.num++){
			if(map.objects[1].objects[this.num]!=undefined){
				var ShootDelay;
				var Life;
				var Speed;
				var BulletDmg;

				var AttributeName;
				for(this.num2=0; this.num!=-1; this.num2++){
					if(map.objects[1].objects[this.num].properties[this.num2]==undefined){
						break;
					}
					this.AttributeName= map.objects[1].objects[this.num].properties[this.num2].name
					if(this.AttributeName=="Life"){
						this.Life=map.objects[1].objects[this.num].properties[this.num2].value
					}
					else if(this.AttributeName=="Speed"){
						this.Speed=map.objects[1].objects[this.num].properties[this.num2].value
					}
					else if(this.AttributeName=="ShootDelay"){
						this.ShootDelay=map.objects[1].objects[this.num].properties[this.num2].value
					}
					else if(this.AttributeName=="BulletDmg"){
						this.BulletDmg=map.objects[1].objects[this.num].properties[this.num2].value
					}
				}

				this.enemy= new Enemy(this,map.objects[1].objects[this.num].x, map.objects[1].objects[this.num].y,this.Speed/2,this.player);
				this.EnemyList.add(this.enemy.sprite);
				this.enemy.sprite.life =new LifeBehaviour(this, this.enemy, this.Life,this.Life);
				this.enemy.sprite.Shooter= new Shoot(this, this.ShootDelay, this.BulletDmg, 600, this.player.sprite);
				this.enemy.sprite.AI = new PathFinding(this,this.enemy,this.player,this.MapArrayInfo,this.MapArrayPosition,this.tileHeight)
				
			}
			else{
				break;
			}
		}
		this.physics.world.addCollider(this.EnemyList, this.wallsLayer);
		
		this.physics.add.overlap(this.BulletList, this.wallsLayer, this.destroyBullet, null, this);
		this.physics.add.overlap(this.EnemyBulletList, this.wallsLayer, this.destroyBulletEnemy, null, this);

		this.physics.add.overlap(this.BulletList, this.EnemyList, this.hitEnemy, null, this);
		this.physics.add.overlap(this.EnemyBulletList, this.PlayerGroup, this.hitPlayer, null, this);


		this.physics.world.addCollider(this.PlayerGroup, this.wallsLayer);
	
		this.physics.world.addCollider(this.EnemyList, this.EnemyList);
		

		
		const debugGraphics = this.add.graphics().setAlpha(0.75);
		this.wallsLayer.renderDebug(debugGraphics, {
			tileColor: null, 
			collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
			faceColor: new Phaser.Display.Color(40, 39, 37, 255) 
		});
		this.physics.world.createDebugGraphic();
		const camera = this.cameras.main;
		camera.startFollow(this.player.sprite);
		camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

		this.timer=0;

		//Show UI
		this.scene.run('UICanvas')
		
	}
  
	update(time, delta) {

		this.timer += (1*delta)/1000;
		// Allow the player to respond to key presses and move itself
		this.player.update(time,delta);
		if(this.timer>this.player.Shooter.ReturnDelay()){
			const directionShoot = this.player.ReturnShootDir()
			if(directionShoot.x!=0 || directionShoot.y!=0){	
				const bullet = this.player.Shooter.Shoot(directionShoot,this.player.ReturnPosX(), this.player.ReturnPosY());
				if(bullet!=undefined){
					this.BulletList.add(bullet);
					this.physics.world.addCollider(bullet, this.EnemyList);
					this.physics.world.addCollider(bullet, this.wallsLayer);
					this.timer=0;
				}
				
				
			}
		}
		if(this.player.Dead){
			this.scene.restart();
		}
		Phaser.Actions.Call(this.BulletList.getChildren(), this.MoveBullet);
		Phaser.Actions.Call(this.EnemyBulletList.getChildren(), this.MoveBullet);


		for( this.i=0; this.i<this.EnemyList.getChildren().length; this.i++){
			this.ShootTimer(this.EnemyList.getChildren()[this.i], delta)
			this.UpdateEnemies(this.EnemyList.getChildren()[this.i])
		}
		
	

	}

	MoveBullet(bullet)
	{	
		bullet.move.Move(bullet.dir)
	}

	ShootTimer(enemy, delta){
	
		enemy.Shooter.UpdateTimer(delta)
		enemy.AI.UpdateTimer(delta)
	}

	UpdateEnemies(enemy){
		if(enemy.AI.ReturnDelay()<enemy.AI.ReturnTimer()){
			enemy.AI.ReCalculate()
		}
		
		enemy.move.Move(enemy.AI.ReturnDirection());
		enemy.AI.CheckPos()
		enemy.head.x=enemy.body.x + 20;
		enemy.head.y=enemy.body.y ;
		if(enemy.Shooter.ReturnDelay()<enemy.Shooter.ReturnTimer()){
		
			const bullet = enemy.Shooter.Shoot(3, enemy.x, enemy.y);
			if(bullet!=undefined){
				this.EnemyBulletList.add(bullet);
				this.physics.world.addCollider(bullet, this.player.sprite);
				this.physics.world.addCollider(bullet, this.wallsLayer);
				enemy.Shooter.ResetTimer()
			}
			
		}
	}

	destroyBullet(bullet, wall){
		
		if(wall.collides && bullet.scene==this){
			this.BulletList.remove(bullet);
			bullet.destroy();	
		}
	}

	destroyBulletEnemy(bullet, wall){
		
		if(wall.collides && bullet.scene==this){
			this.EnemyBulletList.remove(bullet);
			bullet.destroy();
			
		}
	}

	hitEnemy(bullet, enemy){

		if(bullet.scene==this){
			enemy.life.DecreaseHp(bullet.dmg);
			this.BulletList.remove(bullet);
			bullet.destroy();
		}
	}

	hitPlayer(bullet, player){

		if(bullet.scene==this){
			player.life.DecreaseHp(bullet.dmg);
			this.BulletList.remove(bullet);
			bullet.destroy();
		}
		
	}

	ReturnMapSizeX(){
		this.map.widthInPixels;
	}
	ReturnMapSizeY(){
		this.map.heightInPixels;
	}

	SetLevel(numLvl){
		
	}
  }