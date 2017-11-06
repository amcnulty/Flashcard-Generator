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

module.exports = BasicCard;