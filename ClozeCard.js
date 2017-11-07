/**
 * Constructor for creating flashcards with a text and a portion of the text to be replaced. The portion of text to be cloze deleted is replaced with an ellipses. In the event that the cloze text passed to the constructor is not found in the text and error is thrown.
 * 
 * @since 1.0.0
 * @throws An error when cloze parameter is not found in the text parameter.
 * @param {String} text - The entire text of the flashcard before cloze deletion.
 * @param {String} cloze - The portion of the text to be cloze deleted.
 * @param {String[]} [choices] - [Optional] The multiple choices for the flashcard.
 */
function ClozeCard(text, cloze, choices) {
    if (!(this instanceof ClozeCard)) {
        return new ClozeCard(text, cloze, choices);
    }
    if (!text.includes(cloze)) {
        throw new Error('Cloze parameter does not match anything from the text parameter!!');
    }
    this.fullText = text;
    this.cloze = cloze;
    this.partial = text.replace(cloze, '...');
    this.choices = arguments[2] || [];
}
/**
 * Checks if the answer parameter is a correct or incorrect answer. This method returns true if answer is correct and false if incorrect.
 * 
 * @since 1.0.0
 * @param {String} answer - The answer to check for correctness.
 * @returns {Boolean}
 */
ClozeCard.prototype.answerIsCorrect = function(answer) {
    return (answer.toLowerCase() === this.cloze.toLowerCase()) ? true : false;
}
/**
 * Returns the question portion of the flashcard.
 * 
 * @since 1.0.0
 * @returns {String}
 */
ClozeCard.prototype.getQuestion = function() {
    return this.partial;
}
/**
 * Returns the answer portion of the flashcard.
 * 
 * @since 1.0.0
 * @returns {String}
 */
ClozeCard.prototype.getAnswer = function() {
    return this.cloze;
}
/**
 * Returns the multiple choices for this flashcard.
 * 
 * @since 1.0.0
 * @returns {String[]}
 */
ClozeCard.prototype.getChoices = function() {
    return this.choices;
}

module.exports = ClozeCard;