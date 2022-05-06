// TODO: Include packages needed for this application
const { writeFile, copyFile } = require("./utils/generateFile.js");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown.js");

// TODO: Create an array of questions for user input
const promptQuestions = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "github",
        message: "Enter your GitHub username? (Required)",
        validate: (userInput) => {
          if (userInput) {
            return true;
          } else {
            console.log("Please enter your GitHub username!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "gitLink",
        message: "Enter the GitHub link to your profile.:",
        validate: (linkInput) => {
          if (linkInput) {
            return true;
          } else {
            console.log("Please enter your GitHub Link!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message:
          "Please enter your email for others to contact you: (Required)",
        validate: (emailInput) => {
          if (emailInput) {
            return true;
          } else {
            console.log("Please enter your email!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "title",
        message: "What is the name of your repository? (Required)",
        validate: (titleInput) => {
          if (titleInput) {
            return true;
          } else {
            console.log("Please enter your project name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "about",
        message: "Please enter some information about your project: (Required)",
        validate: (aboutInput) => {
          if (aboutInput) {
            return true;
          } else {
            console.log("Please enter some information!");
            return false;
          }
        },
      },
      {
        type: "confirm",
        name: "confirmInstall",
        message:
          "Does your project need special instructions on how to install?",
        default: true,
      },
      {
        type: "input",
        name: "install",
        message: "Enter your installation instructions:",
        when: ({ confirmInstall }) => {
          if (confirmInstall) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        name: "usage",
        message: "Please explain the usage of this project:",
        validate: (usageInput) => {
          if (usageInput) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "list",
        name: "license",
        choices: [
          "MIT",
          "Apache 2.0",
          "Creative Commons 1.0",
          "GPLv3",
          "WTFPL",
        ],
      },
      {
        type: "confirm",
        name: "collab",
        message: "Will your project have a collaborator?",
        default: true,
      },
      {
        type: "input",
        name: "collabName",
        message: "What is the name of your collaborator? (Required)",
        validate: (linkInput) => {
          if (linkInput) {
            return true;
          } else {
            console.log("Please provide a GitHub link!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "collabLink",
        message: "Provide the GitHub link for your collaborator (Required)",
        validate: (linkInput) => {
          if (linkInput) {
            return true;
          } else {
            console.log("Please provide a GitHub link!");
            return false;
          }
        },
      },
      {
        type: "confirm",
        name: "confirmTest",
        message: "Will your project need testing instructions?",
        default: true,
      },
      {
        type: "input",
        name: "testing",
        message: "Please input testing instructions for the user:",
        when: ({ confirmTest }) => {
          if (confirmTest) {
            return true;
          } else {
            return false;
          }
        },
      },
    ])
    .then((data) => {
      return generateMarkdown(data);
    })
    .then((Markdown) => {
      return writeFile(Markdown);
    })
    .then((writeFileResponse) => {
      console.log(writeFileResponse);
      return copyFile();
    })
    .then((copyFileResponse) => {
      console.log(copyFileResponse);
    })

    .catch((err) => {
      console.log(err);
    });
};
function init() {
  promptQuestions();
}

init();
