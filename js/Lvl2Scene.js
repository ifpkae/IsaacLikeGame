
import Player from "./Player.js";
import Enemy from "./Enemy.js";

import Shoot from "./Shoot.js";

import LifeBehaviour from "./LifeBehaviour.js";
import PathFinding from "./PathFinding.js";

import MovementBehaviour from "./MovementBehaviour.js";
import Stats from "./StatsBehaviour.js";
import Item from "./Item.js";

import UIScene from "./UI.js";

export default class Lvl2Scene extends Phaser.Scene {
	
	constructor() {
        super({key: "Lvl2Scene"});
    }

	preload() {
		
		this.load.image("tiles2", "../assets/tilesets/tilesetEric.png");
		this.load.tilemapTiledJSON("map2", "../assets/tilemaps/tilemapEric.json");
		this.load.json("mapMesh2", "../assets/tilemaps/tilemapMapMeshEric.json");
		this.load.atlas("IsaacAtlas", "../assets/atlas/IsaacAtlasImg.png", "../assets/atlas/IsaacAtlasJSON.json");
		this.load.atlas("BulletAtlas", "../assets/atlas/BulletAtlasImg.png", "../assets/atlas/BulletAtlasJSON.json");
		this.load.audio("HitPlayer", "../assets/audios/hitPlayer.mp3");
		this.load.audio("KillPlayer", "../assets/audios/diePlayer.mp3");
		this.load.audio("Song", "../assets/audios/song.mp3");
		
		this.load.image('heart', './assets/Images/heart_full.png');
	}
  
	create() {
		
		this.hit = this.sound.add('HitPlayer', {loop: false});
		this.killPlayer = this.sound.add('KillPlayer',{loop: false});
		this.song = this.sound.add('Song', {loop: false, volume: 0.05});
		this.song.play();

		const map = this.make.tilemap({ key: "map2" });

		const tileset = map.addTilesetImage("tilemap", "tiles2");

		this.groundLayer = map.createLayer("Ground", tileset, 0, 0);
		this.wallsLayer = map.createLayer("Walls", tileset, 0, 0);
		this.doorLayer = map.createLayer("Door", tileset, 0, 0);
///////////////////
		
		this.mapMesh = this.cache.json.get('mapMesh2');
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
		this.doorLayer.setCollisionByProperty({ collides: true });
		const spawnPoint = map.findObject("Objects", (obj) => obj.name === "Spawn Point");

		this.PlayerGroup = this.physics.add.group();

		this.BulletList = this.physics.add.group();

		this.EnemyList = this.physics.add.group();
		this.EnemyBulletList = this.physics.add.group();
		
		this.ItemList = this.physics.add.group();
		

		this.player = new Player(this, spawnPoint.x, spawnPoint.y);
		this.player.sprite.stats = new Stats(this, this.player.sprite, 300,2,5,0.3)
		this.player.sprite.move =new MovementBehaviour(this, this.player.sprite)
		this.player.Shooter= new Shoot(this,this.player.sprite, undefined,"PlayerBullet");
		this.player.sprite.life = new LifeBehaviour(this, this.player);

		this.UI = new UIScene(this,this.player.sprite,'heart', 'damageImage', 'speedImage');
		this.UI.showLife();
		this.UI.showDmg();
		this.UI.showSpeed();

		this.item= new Item(this,this.player.sprite.x+50,this.player.sprite.y, 4,200,4,0)
		
		this.ItemList.add(this.item.sprite)
		this.item.sprite.dataItem=this.item;

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
				this.enemy= new Enemy(this,map.objects[1].objects[this.num].x, map.objects[1].objects[this.num].y,this.player);
				this.enemy.sprite.stats = new Stats(this, this.enemy.sprite, this.Speed,this.BulletDmg,this.Life,this.ShootDelay)
				
				this.EnemyList.add(this.enemy.sprite);
				this.enemy.sprite.life =new LifeBehaviour(this, this.enemy);
				this.enemy.sprite.Shooter= new Shoot(this, this.enemy.sprite, this.player.sprite, "EnemyBullet");
				this.enemy.sprite.move =new MovementBehaviour(this, this.enemy.sprite)
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

		this.physics.add.overlap(this.doorLayer, this.PlayerGroup, this.ChangeScene, null, this);

		this.physics.add.overlap(this.ItemList, this.PlayerGroup, this.PickItem, null, this);


		this.physics.world.addCollider(this.PlayerGroup, this.wallsLayer);

	
		this.physics.world.addCollider(this.EnemyList, this.EnemyList);
		
		const camera = this.cameras.main;
		camera.startFollow(this.player.sprite);
		camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

		this.timer=0;
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
			this.song.stop();
			this.killPlayer.play();
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
			this.hit.play();
			player.life.DecreaseHp(bullet.dmg);
			this.BulletList.remove(bullet);
			bullet.destroy();
			this.UI.updateLife();
		}
		
	}

	ChangeScene(player,wall){
	
		if(wall.collides){
			
			this.scene.start("Lvl3Scene");
		
		}
	}

	PickItem(item,player){
		
		console.log(player.stats)
		if(item.scene==this){
			
			item.dataItem.Apply(player)
			this.ItemList.remove(item);
			item.destroy();
			console.log(player.stats)
			player.life.SetToMax()
			player.life.Check()
			this.UI.updateLife();
			this.UI.updateSpeed();
			this.UI.updateDmg();
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