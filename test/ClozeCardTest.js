var ClozeCard = require("../ClozeCard");
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

describe('ClozeCard Object', function() {
    var myCard = ClozeCard('George Washington was the first president of the United States.', 'George Washington');
    describe('Instance of ClozeCard', function() {
        it('var myCard = ClozeCard() Should be an instance of ClozeCard', function() {
            expect(myCard instanceof ClozeCard).to.equal(true);
        });
    });
    describe('Text values', function() {
        it('ClozeCard.prototype.fullText should return - George Washington was the first president of the United States.', function() {
            expect(myCard.fullText).to.equal('George Washington was the first president of the United States.');
        })
        it('ClozeCard.prototype.cloze should return - George Washington', function() {
            expect(myCard.cloze).to.equal('George Washington');
        });
        it('ClozeCard.prototype.partial should return - ... was the first president of the United States.', function() {
            expect(myCard.partial).to.equal('... was the first president of the United States.');
        });
        it('ClozeCard("This will not work", "oops"); should throw an error when cloze does not match text', function() {
            (function() {
                ClozeCard('This will not work', 'oops');
            }).should.throw(Error, 'Cloze parameter does not match anything from the text parameter!!');
        });
    });
    describe('Method Validation', function() {
        it('ClozeCard.prototype.answerIsCorrect should return false when an incorrect answer is passed to this method.', function() {
            expect(myCard.answerIsCorrect('Thomas Jefferson')).to.equal(false);
        });
        it('ClozeCard.prototype.answerIsCorrect should return true when a correct answer is passed to this method.', function() {
            expect(myCard.answerIsCorrect('George Washington')).to.equal(true);
        });
    });
});