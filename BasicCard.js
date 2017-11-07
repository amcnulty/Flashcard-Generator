/**
 * Constructor for creating a flashcard consisting of a question and answer.
 * 
 * @since 1.0.0
 * @param {String} front - The question on the flashcard.
 * @param {String} back - The answer to the flashcard question.
 * @param {String[]} [choices] - [Optional] The multiple choices for the flashcard.
 */
function BasicCard(front, back, choices) {
    if (!(this instanceof BasicCard)) {
        return new BasicCard(front, back, choices);
    }
    this.front = front;
    this.back = back;
    this.choices = arguments[2] || [];
}
/**
 * Checks if the answer parameter is a correct or incorrect answer. This method returns true if answer is correct and false if incorrect.
 * 
 * @since 1.0.0
 * @param {String} answer - The answer to check for correctness.
 * @returns {Boolean}
 */
BasicCard.prototype.answerIsCorrect = function(answer) {
    return (answer.toLowerCase() === this.back.toLowerCase()) ? true : false;
}
/**
 * Returns the question portion of the flashcard.
 * 
 * @since 1.0.0
 * @returns {String}
 */
BasicCard.prototype.getQuestion = function() {
    return this.front;
}
/**
 * Returns the answer portion of the flashcard.
 * 
 * @since 1.0.0
 * @returns {String}
 */
BasicCard.prototype.getAnswer = function() {
    return this.back;
}
/**
 * Returns the multiple choices for this flashcard.
 * 
 * @since 1.0.0
 * @returns {String[]}
 */
BasicCard.prototype.getChoices = function() {
    return this.choices;
}

module.exports = BasicCard;