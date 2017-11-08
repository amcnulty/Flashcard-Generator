# FlashgenJS
FlashgenJS is an interactive flashcard training game for the command line built with NodeJS. The goal of this application is to make a user friendly interface for flashcard memory training. There are four methods of play with FlashgenJS. The user may select between two card types (basic cards or cloze deleted cards) and may also choose to respond in multiple response or not.

## Getting Started
The following is a getting started guide for how to run FlashgenJS on your machine.

### Prerequisites
1. NodeJS - FlashgenJS is a node application and requires node to be installed to run.

To install node visit [NodeJS Website](https://nodejs.org/en/ "Node.js") and install node for your operating system.

### Get The Code
There is currently no installer for FlashgenJS so you must get the code and run the app using the node command. There are two ways you can get the code.
1. Fork this repository to your computer.
  * https://github.com/amcnulty/Flashcard-Generator
2. Download the repository as a zip file to your computer.

### Install Dependencies
Once the code is installed on your computer navigate to root of the project in a bash/terminal/command prompt of your choice. Run the following node command to install the required dependencies.

```
$ npm install
```

### Run FlashgenJS
Once the dependencies have finished installing run the following node command to test if your are able to run FlashgenJS.

```
$ node index.js
```

### Add FlashgenJS to local npm package [optional]
FlashgenJS comes with the option of adding the project as a package to the local npm directory. This allows the user to run the same commands while omitting node and the .js file extension.

To set this up run the following command

```
$ npm install <directory of flashcard-generator>
```

Now you should be able to run the command as seen in the following example.

```
$ flashgen
```

## Usage
FlashgenJS does not have commands so all you have to do to run it is start the application.

Basic usage pattern:
```
$ node index.js
```

## Built With
FlashgenJS was built with the following technologies.

* NodeJS
* NPM
* Inquirer npm module

## Versioning
FlashgenJS is currently at version 1.0.0

## Author
#### Aaron Michael McNulty
* [Github Link](https://github.com/amcnulty "amcnulty (Aaron Michael McNulty)")
* [Personal Website](http://www.aaronmichael.tk "Aaron Michael McNulty")

## Links
* [NodeJS Website](https://nodejs.org/en/ "Node.js")
* [Inquirer Module](https://www.npmjs.com/package/inquirer "Inquirer")