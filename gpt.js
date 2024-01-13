import readline from "readline";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
};

async function main() {
  const chatHistory = []; // Store conversation history

  while (true) {
    const userInput = await askQuestion(
      "Enter a message (type 'exit' to end): "
    );

    if (userInput.toLowerCase() === "exit") {
      break; // Exit the loop if the user types 'exit'
    }

    try {
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      messages.push({ role: "user", content: userInput });

      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      const completionText = chatCompletion.choices[0].message.content;
      console.log(completionText);

      // Update history with user input and assistant response
      chatHistory.push(["user", userInput]);
      chatHistory.push(["assistant", completionText]);
    } catch (error) {
      console.log(error);
    }
  }

  // Close the readline interface
  rl.close();
}

// Run the conversation
main();
