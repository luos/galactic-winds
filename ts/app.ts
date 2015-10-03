///<reference path="Space/Planet.ts"/>
///<reference path="../www/phaser-2.4.3/typescript/phaser.d.ts"/>
///<reference path="Moving.ts"/>
///<reference path="Player.ts"/>

interface Window {
    game: GalacticWinds;
}

class GalacticWinds {
    worldWidth: number = 2000;
    worldHeight: number = 1800;
    public game: Phaser.Game;
    moving: Array<Moving> = [];
    map: GameMap;
    private background;
    ships: Array<Fleet> = [];
    needsUpdate: Array<NeedsUpdate> = [];
    selected = null;
    public dispatcher : Dispatcher;
    visiblePlanets: Phaser.Group;
    visibleFleets: Phaser.Group;
    ui : Phaser.Group;
    localPlayer : Player;
    minimap : Minimap;
    planets : Array<Planet> = [];

    constructor(){
        this.moving = [];
        this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO,'content', {
            preload: this.preload,
            create: this.create.bind(this),
            update: this.update.bind(this)
        });
        this.map = new GameMap( this.game )
        document.getElementById('content').oncontextmenu =function(e){
            e.preventDefault();
            return false;
        }
        this.dispatcher = new Dispatcher( this );
        this.localPlayer = new LocalPlayer();
    }

    preload(){
        this.game.load.image('logo', '/phaser-2.4.3/resources/Phaser Logo/2D Text/Phaser 2D Glow.png');
        this.game.load.image( Fleet.SHIP_ORANGE , 'images/ships/ship1_orange.png' );
        this.game.load.image( Fleet.SHIP_BLUE , 'images/ships/ship2_blue.png' );
        this.game.load.image( Planet.TYPE_EARTH , 'images/planets/planet_earth.png' );
        this.game.load.image( Background.SPACEBACKGROUND , Background.SPACEBACKGROUND );
    }

    create(){
        this.game.world.setBounds( 0, 0, this.worldWidth, this.worldHeight );        
        var background = new Background( this , Background.SPACEBACKGROUND);
        background.add();

        this.visiblePlanets = this.game.add.group();
        this.visibleFleets = this.game.add.group();
        this.ui = this.game.add.group();
        
        this.background = background;
        this.dispatcher.createShip(Fleet.SHIP_BLUE, 50, 100 )
        this.dispatcher.createShip(Fleet.SHIP_ORANGE, 100, 50 )
        this.dispatcher.createPlanet( Planet.TYPE_EARTH, 200,200 );

        this.minimap = new Minimap( this );
    }

    update(){
        var game = this.game;
        var camSpeed = 15;
        var s = this.background.sprite;
        var elapsed =this.game.time.elapsed;
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            this.map.moveX( - camSpeed );
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            this.map.moveX( + camSpeed );
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            this.map.moveY( - camSpeed );

        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            this.map.moveY( + camSpeed );
        }

        var elapsed = this.game.time.elapsed;
        for( var i=0; i < this.needsUpdate.length ; i++){
            this.needsUpdate[i].doUpdate( elapsed );
        }
        this.minimap.draw();
    }

}

window.onload = () => window.game = new GalacticWinds();
interface NeedsUpdate{
    doUpdate( elapsed: number);
}
interface Ship {}

class Fleet extends Phaser.Sprite implements Ship, NeedsUpdate, Movable, Positionable {
    public static  SHIP_ORANGE = "ship1_orange";
    public static  SHIP_BLUE = "ship1_blue";
    private selector;
    private speed = 1.5;
    private direction = new Phaser.Point( 0,0 )
    private isMoving = false;
    private target: Phaser.Point;

    constructor(private _game: GalacticWinds, shipType: string ){
        super(_game.game, 30, 30, shipType );
        this.width = 25;
        this.height = 25;
        this.inputEnabled =true;
        this.events.onInputDown.add( this.onClick.bind( this ) );
        this.selector = new Selector();
        this.anchor.set( 0.5, 0.5 );
        this.onClick(null,null);
    }

    onClick(sprite, pointer){
        this._game.dispatcher.shipClicked( this, pointer );
    }



    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }

    rotate(){
        this.angle = this.angle + 0.5;
    }

    setX( x ){
        this.x=x;
    }

    setY( y ){
        this.y =y;
    }

    setDirection( p ){
        this.direction = p;
        this.isMoving = true;
        var unit = new Phaser.Point( - 1, 1 );
        var da = this.direction.angle( unit, false ) + 3.14/2;
        this.rotation = da;
    }


    doUpdate(elapsed:number) {
        if ( this.isMoving ){
            this.x = this.x + this.direction.x * this.speed;
            this.y = this.y + this.direction.y * this.speed;
            this.selector.x =this.x;
            this.selector.y = this.y;
            var dist = this.target.distance( new Phaser.Point( this.x, this.y ) );
            if ( dist < 10 ){
                this.isMoving = false;
                this._game.dispatcher.arrivedAtTarget( this, <any>this.target );
            }
        }
    }

    setTarget( t : Phaser.Point ){
        this.target = t;
    }
}

class Selector{
    private sprite: Phaser.Circle;
    constructor(){
        this.sprite = new Phaser.Circle( 10 , 20 , 30 );
    }

    public setCenter( x, y ){
        this.sprite.setTo( x, y, 30 );
    }

    public add( game : Phaser.Game ){
        game.add.existing( this.sprite );
    }
}

class Background {
    static SPACEBACKGROUND = "images/spacebackground.jpg";
    public sprite;
    constructor( private game:GalacticWinds, private key : string ){

    }

    public add(){
        this.sprite = this.game.game.add.tileSprite(0, 0, this.game.game.world.width, this.game.game.world.height,  this.key );
        console.log( this.sprite );
        this.sprite.inputEnabled = true;

        this.sprite.events.onInputDown.add( this.onClick.bind( this ) );
    }

    public onClick(sprite, pointer): void {

         this.game.dispatcher.backgroundClicked( pointer );
    }
}

class GameMap {
    static DEFAULT_CHANGE_X = 5;
    static DEFAULT_CHANGE_Y = 5;

    constructor(private game: Phaser.Game ) {
        
    }

    setCenter( x, y ){

    }

    moveX( x: number = GameMap.DEFAULT_CHANGE_X ){
        this.game.camera.x += x;

    }

    moveY( y: number = GameMap.DEFAULT_CHANGE_Y ){
        this.game.camera.y += y;
    }

    move( x: number , y: number ){

    }

}

interface Movable {
    getX():number;
    getY():number;
    setDirection( direction : Phaser.Point );
    setTarget( target: Phaser.Point );
}

interface Positionable{
    setX( x : number );
    setY( y : number );
}


class Dispatcher {
    constructor( private game: GalacticWinds) {
        
    }

    public move( what : Movable , x: number , y: number ){
        var direction = new Phaser.Point(x - what.getX() , y - what.getY() );
        direction.normalize();
        what.setDirection(direction)
        console.log("moving selected", x , y , direction )
        what.setTarget( new Phaser.Point( x, y ) );
    }

    public moveSelected( x, y ){
         this.move( this.game.selected, x, y );
    }

    public moveToTarget( what: Movable, target : Targetable ){
        console.log( "Movingto target", target );
        this.move( what, target.getX(), target.getY() );
    }

    public arrivedAtTarget( what: Movable, target: Targetable ){
         if ( what instanceof Fleet ){
            console.log("It a sheeep");
         }
    }

    public createShip( textureType: string, x:number, y:number ){
        var ship = new Fleet( this.game, textureType );
        this.game.ships.push( ship );
        this.game.needsUpdate.push(ship);
        this.game.visibleFleets.add( ship );
        ship.setX( x );
        ship.setY( y );
    }

    public backgroundClicked( pointer ) {
         this.moveSelected( pointer.worldX, pointer.worldY );
    }

    public shipClicked( ship, pointer ) {
         if ( this.game.selected == ship ){
           return;
         }
         if ( this.game.selected ){
            this.game.selected.selector.destroy();
         }
         this.game.selected = ship;

        var widthPer2 = ship.getWidth() / 2;
        var heightPer2 = ship.getHeight() / 2;
        var g = this.game.game.add.graphics( ship.getX(), ship.getY() );
        g.lineStyle(2, 0xffaacc );
        g.drawCircle( 0 , 0 , 50 );
        ship.selector = g;
        console.log("clicked")
    }

    public planetClicked( planet: Planet, pointer ){
        if( this.game.selected ){
         this.moveToTarget( this.game.selected, planet);
        }
    }

    public createPlanet( typeName : string , x, y ) {
         var p = new Planet( this.game, typeName );
         this.game.planets.push( p );
         p.setX( x );
         p.setY( y );
    }
}

class Planet implements Positionable, Targetable {
    public static  TYPE_EARTH="planet_earth.png";
    public sprite;

    constructor( private game: GalacticWinds, typeName:string ) {
        this.sprite = new Phaser.Sprite( game.game, 25,25,typeName );
        game.visiblePlanets.add( this.sprite );
        this.sprite.inputEnabled =true;
        this.sprite.events.onInputDown.add( this.onClick.bind( this ) );
        this.sprite.anchor.set( 0.5, 0.5 );
    }

    setX(x){
        this.sprite.x =x;
    }
    setY(y){
        this.sprite.y = y;
    }

    getX(){
        return this.sprite.x;
    }
    getY(){
        return this.sprite.y;
    }

    public onClick( game, pointer ) {
         this.game.dispatcher.planetClicked( this, pointer );
    }
}

interface Targetable {
    getX():number;
    getY():number;
}