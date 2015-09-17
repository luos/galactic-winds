///<reference path="Space/Planet.ts"/>
///<reference path="../www/phaser-2.4.3/typescript/phaser.d.ts"/>
///<reference path="Moving.ts"/>

interface Window {
    game: GalacticWinds;
}

class GalacticWinds {
    worldWidth: number = 4000;
    worldHeight: number = 2000;
    game: Phaser.Game;
    moving: Array<Moving> = [];
    private background;

    constructor(){
        this.moving = [];
        this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO,'content', {
            preload: this.preload,
            create: this.create.bind(this),
            update: this.update.bind(this)
        });
    }

    preload(){
        this.game.load.image('logo', '/phaser-2.4.3/resources/Phaser Logo/2D Text/Phaser 2D Glow.png');
        this.game.load.image( Fleet.SHIP_ORANGE , 'images/ships/ship1_orange.png' );
        this.game.load.image( Background.SPACEBACKGROUND , Background.SPACEBACKGROUND );
    }

    create(){
        this.game.world.setBounds( 0, 0, this.worldWidth, this.worldHeight );
        var background = new Background( this.game , Background.SPACEBACKGROUND);
        background.add();
        this.background = background;
        var ship = new Fleet( this.game );
        this.game.add.existing( ship );

    }

    update(){
        var game = this.game;
        var camSpeed = 15;
        var s = this.background.sprite;
        var elapsed =this.game.time.elapsed;
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            game.camera.x -= camSpeed;

            if (!game.camera.atLimit.x)
            {
                s.tilePosition.x += camSpeed;
            }
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            game.camera.x += camSpeed;

            if (!game.camera.atLimit.x)
            {
                s.tilePosition.x -= camSpeed;
            }
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            game.camera.y -= camSpeed;

            if (!game.camera.atLimit.y)
            {
                s.tilePosition.y += camSpeed;
            }
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            game.camera.y += camSpeed;

            if (!game.camera.atLimit.y)
            {
                s.tilePosition.y -= camSpeed;
            }
        }

    }


}

window.onload = () => window.game = new GalacticWinds();

interface Ship {}

class Fleet extends Phaser.Sprite implements Ship{
    public static  SHIP_ORANGE = "ship1_orange";

    constructor( game: Phaser.Game ){
        super(game, 50, 60, Fleet.SHIP_ORANGE )
    }


}

class Background{
    static SPACEBACKGROUND = "/images/spacebackground.jpg";
    public sprite;
    constructor( private game:Phaser.Game, private key : string ){

    }

    public add(){
        this.sprite = sprite = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height,  this.key );
    }
}