#!/usr/bin/env node
/**
 * FlashgenJS is an interactive flashcard training game for the command line built
 * with NodeJS. The goal of this application is to make a user friendly interface for
 * flashcard memory training. There are four methods of play with FlashgenJS. The user
 * may select between two card types (basic cards or cloze deleted cards) and may also
 * choose to respond in multiple response or not.
 * 
 * @summary All user interaction logic for Flashcard Generator is located in this file.
 * @since 1.0.0
 * @version 1.0.0
 * 
 * Inquirer npm module
 * @link https://www.npmjs.com/package/inquirer
 * 
 * @author Aaron Michael McNulty
 */
// Include depended files and libraries.
const BasicCard = require('./BasicCard');
const ClozeCard = require('./ClozeCard');
const inquirer = require('inquirer');
const {basicQuestions, clozeQuestions} = require('./questions');
/**
 * The game object contains all of the properties and methods for the game logic.
 * 
 * @since 1.0.0
 */
var game = {
    /**
     * The user entered name value.
     * @type {String}
     */
    playerName: '',
    /**
     * The total number of correct answers from the current round.
     * @type {Number}
     */
    correctAnswers: 0,
    /**
     * The total number of incorrect answers from the current round.
     * @type {Number}
     */
    wrongAnswers: 0,
    /**
     * The type of flashcards choosen to be used. This is used to call a command
     * with the createCommands property.
     * @type {String}
     */
    cardType: '',
    /**
     * The multiple choice selection from the user. This is used to call a command
     * with the multiChoiceCommands property.
     * @type {String}
     */
    multipleChoice: '',
    /**
     * A collection of flashcards for the current round.
     * @type {Array}
     */
    flashcards: [],
    /**
     * Used to track the current index of the flashcards array while going through the questions.
     * @type {Number}
     */
    questionIndex: 0,
    /**
     * Used to call the appropriate flashcard creation method.
     * @type {Object}
     */
    createCommands: {
        'Basic Flashcards': 'createBasicFlashcards',
        'Cloze Deleted Flashcards': 'createClozeFlashcards'
    },
    /**
     * Used to call the appropriate question asking method.
     * @type {Object}
     */
    multiChoiceCommands: {
        'Multiple Choice': 'askMultipleChoiceQuestion',
        'No Multiple Choice': 'askQuestionNoMultipleChoice'
    },
    /**
     * Welcomes users to the application and prompts the user for what their name is.
     * 
     * @since 1.0.0
     * @fires game.startGame()
     */
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
    /**
     * Prompts the user for setup information such as what card types to use and
     * if to use multiple choice selection or not.
     * 
     * @since 1.0.0
     * @fires game.createBasicFlashcards() - When user chooses to use basic flashcards.
     * @fires game.createClozeFlashcards() - When user chooses to use cloze flashcards.
     */
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
    /**
     * Iterates through all of the questions in the basicQuestions variable from
     * the questions.js file to create basic flashcards. These flashcards
     * are pushed to the game.flashcards array for use in the next round.
     * 
     * @since 1.0.0
     * @fires game.askMultipleChoiceQuestion() - When user has selected to use multiple
     * choice selection.
     * @fires game.askQuestionNoMultipleChoice() - When user has selected to use free
     * response selection.
     */
    createBasicFlashcards: function() {
        for (var i = 0; i < basicQuestions.length; i++) {
            game.flashcards.push(BasicCard(basicQuestions[i].front, basicQuestions[i].back, basicQuestions[i].options));
        }
        game[game.multiChoiceCommands[game.multipleChoice]]();
    },
    /**
     * Iterates through all of the questions in the clozeQuestions variable from
     * the questions.js file to create cloze flashcards. These flashcards
     * are pushed to the game.flashcards array for use in the next round.
     * 
     * @since 1.0.0
     * @fires game.askMultipleChoiceQuestion() - When user has selected to use multiple
     * choice selection.
     * @fires game.askQuestionNoMultipleChoice() - When user has selected to use free
     * response selection.
     */
    createClozeFlashcards: function() {
        for (var i = 0; i < clozeQuestions.length; i++) {
            game.flashcards.push(ClozeCard(clozeQuestions[i].text, clozeQuestions[i].cloze, clozeQuestions[i].options));
        }
        game[game.multiChoiceCommands[game.multipleChoice]]();
    },
    /**
     * Asks the user the next multiple choice question in que from the game.flashcards array.
     * 
     * @since 1.0.0
     * @fires game.checkAnswers() - After user has choosen answer.
     */
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
    /**
     * Askes the user the next free response question in que from the game.flashcards array.
     * 
     * @since 1.0.0
     * @fires game.checkAnswers() - After user has entered answer.
     */
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
    /**
     * Checks if user's answer is correct then displays appropriate message to user.
     * The game.questionIndex variable in incremented and then checked to see if there
     * are any remaining flashcards in the game.flashcards array.
     * 
     * @since 1.0.0
     * @fires game.showScore()
     * @param {Object} answers - The answer provided by the user for the current question.
     */
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
    /**
     * Displays the final score after all questions have been asked. This method also
     * prompts the user to play another round.
     * 
     * @since 1.0.0
     * @fires game.resetGame() - When user decides to play another round.
     */
    showScore: function() {
        inquirer.prompt([
            {
                type: 'confirm',
                message: "\nThat's the last question " + game.playerName + ". You got " + game.correctAnswers + " answers correct out of " + (game.correctAnswers + game.wrongAnswers) + ".\n\nWould you like to play again?",
                name: "playAgain"
            }
        ]).then(function(answers) {
            if (answers.playAgain) game.resetGame();
            else console.log("\nThank you for playing!");
        })
    },
    /**
     * Resets the game for another round of play.
     * 
     * @since 1.0.0
     * @fires game.startGame()
     */
    resetGame: function() {
        game.correctAnswers = 0;
        game.wrongAnswers = 0;
        game.questionIndex = 0;
        game.flashcards = [];
        game.startGame();
    }
}
// Method call to welcome the user to the game and prompt them for their name.
game.askName();