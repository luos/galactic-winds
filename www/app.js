///<reference path="Space/Planet.ts"/>
///<reference path="../www/phaser-2.4.3/typescript/phaser.d.ts"/>
///<reference path="Moving.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GalacticWinds = (function () {
    function GalacticWinds() {
        this.worldWidth = 4000;
        this.worldHeight = 2000;
        this.moving = [];
        this.moving = [];
        this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', {
            preload: this.preload,
            create: this.create.bind(this),
            update: this.update.bind(this)
        });
    }
    GalacticWinds.prototype.preload = function () {
        this.game.load.image('logo', '/phaser-2.4.3/resources/Phaser Logo/2D Text/Phaser 2D Glow.png');
        this.game.load.image(Fleet.SHIP_ORANGE, 'images/ships/ship1_orange.png');
        this.game.load.image(Background.SPACEBACKGROUND, Background.SPACEBACKGROUND);
    };
    GalacticWinds.prototype.create = function () {
        this.game.world.setBounds(0, 0, this.worldWidth, this.worldHeight);
        var background = new Background(this.game, Background.SPACEBACKGROUND);
        background.add();
        this.background = background;
        var ship = new Fleet(this.game);
        this.game.add.existing(ship);
    };
    GalacticWinds.prototype.update = function () {
        var game = this.game;
        var camSpeed = 15;
        var s = this.background.sprite;
        var elapsed = this.game.time.elapsed;
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            game.camera.x -= camSpeed;
            if (!game.camera.atLimit.x) {
                s.tilePosition.x += camSpeed;
            }
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            game.camera.x += camSpeed;
            if (!game.camera.atLimit.x) {
                s.tilePosition.x -= camSpeed;
            }
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            game.camera.y -= camSpeed;
            if (!game.camera.atLimit.y) {
                s.tilePosition.y += camSpeed;
            }
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            game.camera.y += camSpeed;
            if (!game.camera.atLimit.y) {
                s.tilePosition.y -= camSpeed;
            }
        }
    };
    return GalacticWinds;
})();
window.onload = function () { return window.game = new GalacticWinds(); };
var Fleet = (function (_super) {
    __extends(Fleet, _super);
    function Fleet(game) {
        _super.call(this, game, 50, 60, Fleet.SHIP_ORANGE);
    }
    Fleet.SHIP_ORANGE = "ship1_orange";
    return Fleet;
})(Phaser.Sprite);
var Background = (function () {
    function Background(game, key) {
        this.game = game;
        this.key = key;
    }
    Background.prototype.add = function () {
        this.sprite = sprite = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, this.key);
    };
    Background.SPACEBACKGROUND = "/images/spacebackground.jpg";
    return Background;
})();
//# sourceMappingURL=app.js.map