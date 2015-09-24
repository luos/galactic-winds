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
        this.worldWidth = 2000;
        this.worldHeight = 1800;
        this.moving = [];
        this.ships = [];
        this.needsUpdate = [];
        this.selected = null;
        this.moving = [];
        this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', {
            preload: this.preload,
            create: this.create.bind(this),
            update: this.update.bind(this)
        });
        this.map = new GameMap(this.game);
        document.getElementById('content').oncontextmenu = function (e) {
            e.preventDefault();
            return false;
        };
        this.dispatcher = new Dispatcher(this);
    }
    GalacticWinds.prototype.preload = function () {
        this.game.load.image('logo', '/phaser-2.4.3/resources/Phaser Logo/2D Text/Phaser 2D Glow.png');
        this.game.load.image(Fleet.SHIP_ORANGE, 'images/ships/ship1_orange.png');
        this.game.load.image(Fleet.SHIP_BLUE, 'images/ships/ship2_blue.png');
        this.game.load.image(Planet.TYPE_EARTH, 'images/planets/planet_earth.png');
        this.game.load.image(Background.SPACEBACKGROUND, Background.SPACEBACKGROUND);
    };
    GalacticWinds.prototype.create = function () {
        this.game.world.setBounds(0, 0, this.worldWidth, this.worldHeight);
        var background = new Background(this, Background.SPACEBACKGROUND);
        background.add();
        this.background = background;
        this.dispatcher.createShip(Fleet.SHIP_BLUE, 50, 100);
        this.dispatcher.createShip(Fleet.SHIP_ORANGE, 100, 50);
        this.dispatcher.createPlanet(Planet.TYPE_EARTH, 200, 200);
    };
    GalacticWinds.prototype.update = function () {
        var game = this.game;
        var camSpeed = 15;
        var s = this.background.sprite;
        var elapsed = this.game.time.elapsed;
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.map.moveX(-camSpeed);
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.map.moveX(+camSpeed);
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.map.moveY(-camSpeed);
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.map.moveY(+camSpeed);
        }
        var elapsed = this.game.time.elapsed;
        for (var i = 0; i < this.needsUpdate.length; i++) {
            this.needsUpdate[i].doUpdate(elapsed);
        }
    };
    return GalacticWinds;
})();
window.onload = function () { return window.game = new GalacticWinds(); };
var Fleet = (function (_super) {
    __extends(Fleet, _super);
    function Fleet(_game, shipType) {
        _super.call(this, _game.game, 30, 30, shipType);
        this._game = _game;
        this.speed = 1.5;
        this.direction = new Phaser.Point(0, 0);
        this.isMoving = false;
        this.width = 25;
        this.height = 25;
        this.inputEnabled = true;
        this.events.onInputDown.add(this.onClick.bind(this));
        this.selector = new Selector();
        this.anchor.set(0.5, 0.5);
        this.onClick(null, null);
    }
    Fleet.prototype.onClick = function (sprite, pointer) {
        this._game.dispatcher.shipClicked(this, pointer);
    };
    Fleet.prototype.getX = function () {
        return this.x;
    };
    Fleet.prototype.getY = function () {
        return this.y;
    };
    Fleet.prototype.getWidth = function () {
        return this.width;
    };
    Fleet.prototype.getHeight = function () {
        return this.height;
    };
    Fleet.prototype.rotate = function () {
        this.angle = this.angle + 0.5;
    };
    Fleet.prototype.setX = function (x) {
        this.x = x;
    };
    Fleet.prototype.setY = function (y) {
        this.y = y;
    };
    Fleet.prototype.setDirection = function (p) {
        this.direction = p;
        this.isMoving = true;
        var da = this.direction.angle({ x: -1, y: 0 }, false) + 3.14 / 2;
        this.rotation = da;
    };
    Fleet.prototype.doUpdate = function (elapsed) {
        if (this.isMoving) {
            this.x = this.x + this.direction.x * this.speed;
            this.y = this.y + this.direction.y * this.speed;
            this.selector.x = this.x;
            this.selector.y = this.y;
            var dist = this.target.distance(new Phaser.Point(this.x, this.y));
            if (dist < 10) {
                this.isMoving = false;
            }
        }
    };
    Fleet.prototype.setTarget = function (t) {
        this.target = t;
    };
    Fleet.SHIP_ORANGE = "ship1_orange";
    Fleet.SHIP_BLUE = "ship1_blue";
    return Fleet;
})(Phaser.Sprite);
var Selector = (function () {
    function Selector() {
        this.sprite = new Phaser.Circle(10, 20, 30);
    }
    Selector.prototype.setCenter = function (x, y) {
        this.sprite.setTo(x, y, 30);
    };
    Selector.prototype.add = function (game) {
        game.add.existing(this.sprite);
    };
    return Selector;
})();
var Background = (function () {
    function Background(game, key) {
        this.game = game;
        this.key = key;
    }
    Background.prototype.add = function () {
        this.sprite = this.game.game.add.tileSprite(0, 0, this.game.game.world.width, this.game.game.world.height, this.key);
        console.log(this.sprite);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.onClick.bind(this));
    };
    Background.prototype.onClick = function (sprite, pointer) {
        this.game.dispatcher.backgroundClicked(pointer);
    };
    Background.SPACEBACKGROUND = "/images/spacebackground.jpg";
    return Background;
})();
var GameMap = (function () {
    function GameMap(game) {
        this.game = game;
    }
    GameMap.prototype.setCenter = function (x, y) {
    };
    GameMap.prototype.moveX = function (x) {
        if (x === void 0) { x = GameMap.DEFAULT_CHANGE_X; }
        this.game.camera.x += x;
    };
    GameMap.prototype.moveY = function (y) {
        if (y === void 0) { y = GameMap.DEFAULT_CHANGE_Y; }
        this.game.camera.y += y;
    };
    GameMap.prototype.move = function (x, y) {
    };
    GameMap.DEFAULT_CHANGE_X = 5;
    GameMap.DEFAULT_CHANGE_Y = 5;
    return GameMap;
})();
var Dispatcher = (function () {
    function Dispatcher(game) {
        this.game = game;
    }
    Dispatcher.prototype.move = function (what, x, y) {
        var direction = new Phaser.Point(x - what.getX(), y - what.getY());
        direction.normalize();
        what.setDirection(direction);
        console.log("moving selected", x, y, direction);
        what.setTarget(new Phaser.Point(x, y));
    };
    Dispatcher.prototype.moveSelected = function (x, y) {
        this.move(this.game.selected, x, y);
    };
    Dispatcher.prototype.createObject = function () {
    };
    Dispatcher.prototype.createShip = function (textureType, x, y) {
        var ship = new Fleet(this.game, textureType);
        this.game.ships.push(ship);
        this.game.needsUpdate.push(ship);
        this.game.game.add.existing(ship);
        ship.setX(x);
        ship.setY(y);
    };
    Dispatcher.prototype.backgroundClicked = function (pointer) {
        this.moveSelected(pointer.worldX, pointer.worldY);
    };
    Dispatcher.prototype.shipClicked = function (ship, pointer) {
        if (this.game.selected == ship) {
            return;
        }
        if (this.game.selected) {
            this.game.selected.selector.destroy();
        }
        this.game.selected = ship;
        var widthPer2 = ship.getWidth() / 2;
        var heightPer2 = ship.getHeight() / 2;
        var g = this.game.game.add.graphics(ship.getX(), ship.getY());
        g.lineStyle(2, 0xffaacc);
        g.drawCircle(0, 0, 50);
        ship.selector = g;
        console.log("clicked");
    };
    Dispatcher.prototype.createPlanet = function (typeName, x, y) {
        var p = new Planet(this.game, typeName);
        p.setX(x);
        p.setY(y);
    };
    return Dispatcher;
})();
var Planet = (function () {
    function Planet(game, typeName) {
        this.sprite = game.game.add.sprite(25, 25, typeName);
    }
    Planet.prototype.setX = function (x) {
        this.sprite.x = x;
    };
    Planet.prototype.setY = function (y) {
        this.sprite.y = y;
    };
    Planet.TYPE_EARTH = "planet_earth.png";
    return Planet;
})();
//# sourceMappingURL=app.js.map