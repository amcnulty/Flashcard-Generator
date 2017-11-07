const BasicCard = require('./BasicCard');
const ClozeCard = require('./ClozeCard');
const inquirer = require('inquirer');
const {basicQuestions, clozeQuestions} = require('./questions');

var game = {
    playerName: '',
    cardType: '',
    multipleChoice: '',
    flashcards: [],
    questionIndex: 0,
    createCommands: {
        'Basic Flashcards': 'createBasicFlashcards',
        'Cloze Deleted Flashcards': 'createClozeFlashcards'
    },
    multiChoiceCommands: {
        'Multiple Choice': 'askMultipleChoiceQuestion',
        'No Multiple Choice': 'askQuestionNoMultipleChoice'
    },
    startGame: function() {
        inquirer.prompt([
            {
                type: 'input',
                message: "Welcome to the flashcard training program! Before you know it, you are going to be a computer wiz! Let's get started!\n\nWhat is your name?",
                name: 'playerName'
            }
        ]).then(function(answers) {
            game.playerName = answers.playerName;
            inquirer.prompt([
                {
                    type: 'list',
                    message: "\n\nI hope you are excited " + game.playerName + "! There are a few options to choose from...Would you like to play with basic flashcards or close deleted flashcards?",
                    choices: [
                        'Basic Flashcards',
                        'Cloze Deleted Flashcards'
                    ],
                    name: 'cardType'
                },
                {
                    type: 'list',
                    message: '\n\nAlright great! One more thing ' + game.playerName + " then we will be ready to start. Would you like to play with multiple choice options or without? (If it is your first time the multiple choice is recommended)",
                    choices: [
                        'Multiple Choice',
                        'No Multiple Choice'
                    ],
                    name: 'multipleChoice'
                }
            ]).then(function(answers) {
                game.cardType = answers.cardType;
                game.multipleChoice = answers.multipleChoice;
                game[game.createCommands[answers.cardType]]();
            });
        });
    },
    createBasicFlashcards: function() {
        for (var i = 0; i < basicQuestions.length; i++) {
            game.flashcards.push(BasicCard(basicQuestions[i].front, basicQuestions[i].back));
        }
        game[game.multiChoiceCommands[game.multipleChoice]]();
    },
    createClozeFlashcards: function() {
        for (var i = 0; i < clozeQuestions.length; i++) {
            game.flashcards.push(ClozeCard(clozeQuestions[i].text, clozeQuestions[i].cloze));
        }
        game[game.multiChoiceCommands[game.multipleChoice]]();
    },
    askMultipleChoiceQuestion: function() {
        console.log("Starting multiple choice game");
    },
    askQuestionNoMultipleChoice: function() {
        inquirer.prompt([
            {
                type: 'input',
                message: game.flashcards[game.questionIndex].getQuestion(),
                name: 'question'
            }
        ]).then(function(answers) {
            console.log("You responded with: " + answers.question);
            var result = game.flashcards[game.questionIndex].answerIsCorrect(answers.question) ? "You are correct" : "You are Wrong!";
            console.log(result);
            game.questionIndex++;
            if (game.questionIndex < game.flashcards.length) game.askQuestionNoMultipleChoice();
        });
    }
}

game.startGame();