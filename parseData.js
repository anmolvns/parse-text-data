const fs = require('fs');

// Read the content of the task.txt file
const data = fs.readFileSync('task.txt', 'utf8');

// Split the content into individual questions
const questions = data.split('section*{Question ID: ');

// Remove the first empty element
questions.shift();

// Initialize an array to store the parsed JSON data
let jsonData = [];

// Loop through each question to extract relevant information
questions.forEach((question, index) => {
  const lines = question.split('\n');

  // Extract question ID
  const questionId = parseInt(lines[0]);

  // Extract question text
  const questionText = lines[2].trim();

  // Extract options and correct answer
  const options = [];
  for (let i = 0; i < 4; i++) {
    const optionText = lines[8 + i].substring(4).trim();
    const isCorrect = lines[12].includes(String.fromCharCode(65 + i));
    options.push({ optionNumber: i + 1, optionText, isCorrect });
  }

  // Extract solution text
  const solutionText = lines[16].substring(6).trim();

  // Create JSON object for the question
  const questionObj = {
    questionNumber: index + 1,
    questionId,
    questionText,
    options,
    solutionText,
  };

  // Push the question object to the JSON data array
  jsonData.push(questionObj);
});

console.log(JSON.stringify(jsonData, null, 2));
