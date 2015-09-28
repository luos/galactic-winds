
class Ui {

}

class Minimap {
	private mapWidth: number = 200;
	private mapHeight: number = 130;
	private bottomMargin: number = 20;
	mapPart : Phaser.Graphics;

	constructor( private game: GalacticWinds ) {

	    this.mapPart = this.game.game.add.graphics( game.game.width / 2 - this.mapWidth / 2  , game.game.height - this.mapHeight - this.bottomMargin, game.ui );
	    var graphics = this.mapPart;
	    graphics.beginFill(0x111111 );
	    graphics.lineStyle(5, 0x333333, 1);
	    
	    // draw a shape
	    graphics.moveTo(0,0);
	    graphics.lineTo(this.mapWidth, 0);
	    graphics.lineTo(this.mapWidth, this.mapHeight);
	    graphics.lineTo(0, this.mapHeight);
	    //graphics.lineTo(50, 220);
	    // graphics.lineTo(50, 50);
	    graphics.endFill();
	    this.drawPlanetAt( 3, 10, 0x555 );
	    this.drawPlanetAt( 12, 30, 0x23435 );
	    this.drawPlanetAt( 100, 55, 0x55555 );
	    this.drawPlanetAt( 44, 99, 0x555 );
	}

	private drawPlanetAt( x: number, y: number, color : number ){
		this.mapPart.lineStyle(1, 0xffffff, 1);
		this.mapPart.drawRect( x,y, 1, 1 );
	}

	public update(){
	     
	}
}
 
class UnitDisplay {

}

class Messages {

}