const BasicCard = require('./BasicCard');
const ClozeCard = require('./ClozeCard');
const inquirer = require('inquirer');
const {basicQuestions, clozeQuestions} = require('./questions');

console.log(basicQuestions[3].front);
console.log(basicQuestions[3].back);

console.log(clozeQuestions[6].text);
console.log(clozeQuestions[6].cloze);
var card = ClozeCard(clozeQuestions[6].text, clozeQuestions[6].cloze);
console.log(card.partial);