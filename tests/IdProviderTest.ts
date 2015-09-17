/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../game.ts" />

describe( "Id Provider ", () => {
   var idProvider = new IdProvider();
    it("when initialised", () => {
       expect(idProvider.getNext()).toBe( 0 );
    });

    it("when getting the second value returns 1 ", () => {
        expect( idProvider.getNext()).toBe( 1 );
    });

    it( "after that returns 2" , () => {
        expect( idProvider.getNext() ).toBe( 2 );
    });

});