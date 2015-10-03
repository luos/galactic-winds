
class Ui {

}

class Minimap {
	private mapWidth: number = 200;
	private mapHeight: number = 130;
	private bottomMargin: number = 20;
	mapPart : Phaser.Graphics;

	constructor( private game: GalacticWinds ) {

	    this.mapPart = this.game.game.add.graphics( game.game.width / 2 - this.mapWidth / 2  , game.game.height - this.mapHeight - this.bottomMargin, game.ui );
	    this.draw();

	}
	public draw(){
		this.mapPart.clear();
	     this.drawBorders();
	     this.drawPoints();
	}

	private drawBorders(){
	    var graphics = this.mapPart;
	    graphics.beginFill(0x111111 );
	    graphics.lineStyle(5, 0x333333, 1);
	    
	    graphics.moveTo(0,0);
	    graphics.lineTo(this.mapWidth, 0);
	    graphics.lineTo(this.mapWidth, this.mapHeight);
	    graphics.lineTo(0, this.mapHeight);
	    graphics.endFill();

	}

	private drawPoints(){
		var scaleX = this.mapWidth / this.game.worldWidth;
	    var scaleY = this.mapHeight / this.game.worldHeight;
	    this.game.planets.forEach( (planet, index) => {
	    	this.drawPlanetAt( planet.getX() * scaleX, planet.getY() * scaleY, 0x555 );	
	    });

	   	this.game.ships.forEach( (ship, index) => {
	    	this.drawPlanetAt( ship.getX() * scaleX, ship.getY() * scaleY, 0x555 );	
	    });
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