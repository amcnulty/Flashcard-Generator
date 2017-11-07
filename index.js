const BasicCard = require('./BasicCard');
const ClozeCard = require('./ClozeCard');
const inquirer = require('inquirer');
const {basicQuestions, clozeQuestions} = require('./questions');

var game = {
    playerName: '',
    correctAnswers: 0,
    wrongAnswers: 0,
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
    askName: function() {
        inquirer.prompt([
            {
                type: 'input',
                message: "Welcome to the flashcard training program! Before you know it, you are going to be a computer wiz! Let's get started!\n\nWhat is your name?",
                name: 'playerName'
            }
        ]).then(function(answers) {
            game.playerName = answers.playerName;
            game.startGame();
        });
    },
    startGame: function() {
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
    },
    createBasicFlashcards: function() {
        for (var i = 0; i < basicQuestions.length; i++) {
            game.flashcards.push(BasicCard(basicQuestions[i].front, basicQuestions[i].back, basicQuestions[i].options));
        }
        game[game.multiChoiceCommands[game.multipleChoice]]();
    },
    createClozeFlashcards: function() {
        for (var i = 0; i < clozeQuestions.length; i++) {
            game.flashcards.push(ClozeCard(clozeQuestions[i].text, clozeQuestions[i].cloze, clozeQuestions[i].options));
        }
        game[game.multiChoiceCommands[game.multipleChoice]]();
    },
    askMultipleChoiceQuestion: function() {
        inquirer.prompt([
            {
                type: 'list',
                message: "\n" + game.flashcards[game.questionIndex].getQuestion(),
                choices: game.flashcards[game.questionIndex].getChoices(),
                name: 'question'
            }
        ]).then(function(answers) {
            game.checkAnswers(answers);
        });
    },
    askQuestionNoMultipleChoice: function() {
        inquirer.prompt([
            {
                type: 'input',
                message: "\n" + game.flashcards[game.questionIndex].getQuestion(),
                name: 'question'
            }
        ]).then(function(answers) {
            game.checkAnswers(answers);
        });
    },
    checkAnswers: function(answers) {
        if (game.flashcards[game.questionIndex].answerIsCorrect(answers.question)) {
            console.log("\nYou are correct!");
            game.correctAnswers++;
        }
        else {
            console.log("\mYou are wrong! The correct answer is : " + game.flashcards[game.questionIndex].getAnswer());
            game.wrongAnswers++;
        }
        game.questionIndex++;
        if (game.questionIndex < game.flashcards.length) game[game.multiChoiceCommands[game.multipleChoice]]();
        else game.showScore();
    },
    showScore: function() {
        inquirer.prompt([
            {
                type: 'confirm',
                message: "\nYou have finished. You got " + game.correctAnswers + " answers correct out of " + (game.correctAnswers + game.wrongAnswers) + ".\n\nWould you like to play again?",
                name: "playAgain"
            }
        ]).then(function(answers) {
            if (answers.playAgain) game.resetGame();
            else console.log("\nThank you for playing!");
        })
    },
    resetGame: function() {
        game.correctAnswers = 0;
        game.wrongAnswers = 0;
        game.questionIndex = 0;
        game.flashcards = [];
        game.startGame();
    }
}

game.askName();