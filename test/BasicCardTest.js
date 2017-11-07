var BasicCard = require("../BasicCard");
var chai = require('chai');
var expect = chai.expect;

describe('BasicCard Object', function() {
    var myCard = BasicCard('Who was the first president of the United States?', 'George Washington');
    describe('Instance of BasicCard', function() {
        it('var myCard = BasicCard() should be an instance of BasicCard object', function() {
            expect(myCard instanceof BasicCard).to.equal(true);
        });
    });
    describe('Front and back values', function() {
        it('BasicCard.prototype.front should return - Who was the first president of the United States?', function() {
            expect(myCard.front).to.equal('Who was the first president of the United States?');
        });
        it('BasicCard.prototype.back should return - George Washington', function() {
            expect(myCard.back).to.equal('George Washington');
        });
    });
    describe('Method Validation', function() {
        it('BasicCard.prototype.answerIsCorrect should return false when an incorrect answer is passed to this method.', function() {
            expect(myCard.answerIsCorrect('Thomas Jefferson')).to.equal(false);
        });
        it('BasicCard.prototype.answerIsCorrect should return true when a correct answer is passed to this method.', function() {
            expect(myCard.answerIsCorrect('George Washington')).to.equal(true);
        });
        it('BasicCard.prototype.answerIsCorrect should not be case sensitive', function() {
            expect(myCard.answerIsCorrect('geoRGe wAsHiNGtoN')).to.equal(true);
        });
        it('BasicCard.prototype.getQuestion should return - Who was the first president of the United States?', function() {
            expect(myCard.getQuestion()).to.equal('Who was the first president of the United States?');
        });
        it('BasicCard.prototype.getAnswer should return - George Washington', function() {
            expect(myCard.getAnswer()).to.equal('George Washington');
        });
    });
});