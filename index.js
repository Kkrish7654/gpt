// // cli_prompt.js

// cli_prompt.js
import readline from "readline";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

// async function main() {
//   const stream = await openai.chat.completions.create({
//     model: "gpt-4",
//     messages: [{ role: "user", content: "Say this is a test" }],
//     stream: true,
//   });
//   for await (const chunk of stream) {
//     process.stdout.write(chunk.choices[0]?.delta?.content || "");
//   }
// }

// main();

// import readline from "readline";
// import OpenAI from "openai";
// import dotenv from "dotenv";
// dotenv.config();

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const openai = new OpenAI({
//   apiKey: process.env.OPEN_AI_KEY,
// });

// const promptUser = async () => {
//   while (true) {
//     const message = await askQuestion("Enter a message: ");

//     if (message.toLowerCase() === "exit") {
//       rl.close();
//       return;
//     }

//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "user", content: message }],
//       model: "gpt-4",
//       stream: true,
//     });

//     console.log(completion)
//     // for (const chunk of completion) {
//     //   // process.stdout.write(chunk.choices[0]?.message?.content || "");
//     //   console.log(chunk);
//     // }
//   }
// };

// const askQuestion = (question) => {
//   return new Promise((resolve) => {
//     rl.question(question, resolve);
//   });
// };

// // Handle close event
// rl.on("close", () => {
//   console.log("Exiting...");
//   process.exit(0);
// });

// // Start prompting the user
// promptUser();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const promptUser = () => {
  rl.question("Enter a message: ", async (message) => {
    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k-0613",
      messages: [{ role: "user", content: message }],
      stream: true,
    });
    for await (const chunk of stream) {
      process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
  });
};

// Start prompting the user
promptUser();
