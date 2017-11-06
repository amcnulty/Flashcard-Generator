/**
 * Constructor for creating a flashcard consisting of a question and answer.
 * 
 * @param {String} front - The question on the flashcard.
 * @param {String} back - The answer to the flashcard question.
 */
function BasicCard(front, back) {
    if (!(this instanceof BasicCard)) {
        return new BasicCard(front, back);
    }
    this.front = front;
    this.back = back;
}
/**
 * Checks if the answer parameter is a correct or incorrect answer. This method returns true if answer is correct and false if incorrect.
 * 
 * @param {String} answer - The answer to check for correctness.
 * @returns {Boolean}
 */
BasicCard.prototype.answerIsCorrect = function(answer) {
    return (answer === this.back) ? true : false;
}

module.exports = BasicCard;