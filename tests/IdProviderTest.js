/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../game.ts" />
describe("Id Provider ", function () {
    var idProvider = new IdProvider();
    it("when initialised", function () {
        expect(idProvider.getNext()).toBe(0);
    });
    it("when getting the second value returns 1 ", function () {
        expect(idProvider.getNext()).toBe(1);
    });
    it("after that returns 2", function () {
        expect(idProvider.getNext()).toBe(2);
    });
});
//# sourceMappingURL=IdProviderTest.js.map