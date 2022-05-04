// packages required for this application
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown.js");
const inquirer = require("inquirer");
const { resolve } = require("path");

// Array of questions for user input
const questions = [
  {
    type: "input",
    name: "name",
    message:
      "Welcome to the Professional README Generator, please enter your full name: ",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter a full name: ", nameInput);
        return false;
      }
    },
  },
  {
    type: "input",
    name: "GitHub",
    message: "Please enter your GitHub username: ",
    validate: (githubInput) => {
      if (githubInput) {
        return true;
      } else {
        console.log("Please enter a GitHub link to your work! ");
        return false;
      }
    },
  },
  {
    type: "input ",
    name: "email ",
    message: "Please enter your email address: ",
    validate: (emailInput) => {
      if (emailInput) {
        return true;
      } else {
        console.log(
          "For questions, please provide a way for users to contact you. "
        );
        return false;
      }
    },
  },
  {
    type: "input ",
    name: "title",
    message: "Please enter a title for your project? ",
    validate: (titleInput) => {
      if (titleInput) {
        return true;
      } else {
        console.log("Your project must have a title!. ");
        return false;
      }
    },
  },
  {
    type: "input ",
    name: "description ",
    message: "Please enter your project description: ",
    validate: (descriptionInput) => {
      if (descriptionInput) {
        return true;
      } else {
        console.log(
          'It is essential to provide a description of your project. Not sure what to include? Head to the repo of this README generator and navigate to the section "Description: Questions to Consider" under the Guidelines header for some tips on writing a quality description.'
        );
        return false;
      }
    },
  },
  {
    type: "input ",
    name: "installation",
    message: "What are the instructions for installation? ",
    validate: (installationInput) => {
      if (installationInput) {
        return true;
      } else {
        console.log(
          "Please provide instructions for installation to ensure users have the proper software to run your program!"
        );
        return false;
      }
    },
  },
  {
    type: "input ",
    name: "usage",
    message: "Instructions for use: ",
    validate: (usageInput) => {
      if (usageInput) {
        return true;
      } else {
        console.log(
          "Providing instructions for use will help users navigate thru your project. Please do so. "
        );
        return false;
      }
    },
  },
  {
    type: "input ",
    name: "contributing ",
    message: "How can others contribute to this project? ",
    validate: (contributionInput) => {
      if (contributionInput) {
        return true;
      } else {
        console.log(
          "Please provide instructions on how others can contribute to your project."
        );
        return false;
      }
    },
  },
  {
    type: "input ",
    name: "tests",
    message:
      "Please describe these tests written for your project an dhow to use them.",
    validate: (testsInput) => {
      if (testsInput) {
        return true;
      } else {
        console.log(
          "Please provide instructions on how others can contribute to your project."
        );
        return false;
      }
    },
  },
  {
    type: "confirm",
    name: "confirmLicenses",
    message: "Would you like to include a license?",
    default: false,
  },
  {
    type: "list",
    name: "licenses",
    message: "What license would you like to include? ",
    choices: ["MIT", "GPL", "CC--0"],
    when: ({ confirmLicenses }) => {
      if (confirmLicenses) {
        return true;
      } else {
        return false;
      }
    },
  },
];

// function to write READEME  file
const writeToFile = (data) => {
  return new Promise((resolve, reject) => {
    // make a readme file and add to dist folder
    fs.writeFile("./dist/READEME.md", data, (err) => {
      // if there is an error, reject the promise and send the error to .catch() method
      if (err) {
        reject(err);
        // return out of the function here to make sure the promise doesn't continue to execute the resolve() function
        return;
      }
      // if everything went well, resolve the Promise and send the successful data to the .then() method
      resolve({
        ok: true,
        message: console.log(
          'Geat work! Navigate to the "dist" folder to see your README!'
        ),
      });
    });
  });
};

// Initialize application
const init = () => {
  return inquirer.prompt(questions);
};

// Function call to initialize app
init()
  .then((userInput) => {
    return generateMarkdown(userInput);
  })
  .then((readmeInfo) => {
    return writeToFile(readmeInfo);
  })
  .catch((err) => {
    console.log(err);
  });
