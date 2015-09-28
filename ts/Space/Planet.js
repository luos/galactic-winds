define(["require", "exports"], function (require, exports) {
    var Planet;
    (function (Planet_1) {
        var Planet = (function () {
            function Planet(name) {
                this.name = name;
                this.iAmPlanet = 3;
            }
            return Planet;
        })();
        Planet_1.Planet = Planet;
        var p = new Planet("hello world planet ");
    })(Planet = exports.Planet || (exports.Planet = {}));
});
//# sourceMappingURL=Planet.js.map