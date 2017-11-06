/**
 * Constructor for creating flashcards with a text and a portion of the text to be replaced. The portion of text to be cloze deleted is replaced with an ellipses. In the event that the cloze text passed to the constructor is not found in the text and error is thrown.
 * 
 * @throws An error when cloze parameter is not found in the text parameter.
 * @param {String} text - The entire text of the flashcard before cloze deletion.
 * @param {String} cloze - The portion of the text to be cloze deleted.
 */
function ClozeCard(text, cloze) {
    if (!(this instanceof ClozeCard)) {
        return new ClozeCard(text, cloze);
    }
    if (!text.includes(cloze)) {
        throw new Error('Cloze parameter does not match anything from the text parameter!!');
    }
    this.fullText = text;
    this.cloze = cloze;
    this.partial = text.replace(cloze, '...');
}

module.exports = ClozeCard;