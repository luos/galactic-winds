/// <reference path="phaser-2.3.0/typescript/pixi.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Game = (function () {
    function Game(stage) {
    }
    return Game;
})();
var MapElement = (function () {
    function MapElement() {
    }
    return MapElement;
})();
var Planet = (function (_super) {
    __extends(Planet, _super);
    function Planet() {
        _super.apply(this, arguments);
    }
    return Planet;
})(MapElement);
var SpaceMap = (function () {
    function SpaceMap() {
    }
    return SpaceMap;
})();
var SpaceUnit = (function () {
    function SpaceUnit(id) {
        this.id = id;
    }
    return SpaceUnit;
})();
var IdProvider = (function () {
    function IdProvider() {
        this.currentId = 0;
    }
    IdProvider.prototype.getNext = function () {
        return this.currentId++;
    };
    return IdProvider;
})();
var a = new SpaceUnit(3);
var TextureStorage = (function () {
    function TextureStorage() {
        this.textures = {};
    }
    TextureStorage.prototype.load = function (name, path) {
        this.textures[name] = path;
    };
    TextureStorage.prototype.get = function (name) {
        if (this.textures[name]) {
            return this.textures[name];
        }
        else {
            return this.load(name, name);
        }
    };
    return TextureStorage;
})();
//# sourceMappingURL=game.js.map