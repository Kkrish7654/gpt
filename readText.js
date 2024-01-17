import fs from "fs";
import readline from "readline";

const inputFileName = "data.txt";
const outputFileName = "final.txt";

const rl = readline.createInterface({
  input: fs.createReadStream(inputFileName),
  crlfDelay: Infinity,
});

let result = "";

rl.on("line", (line) => {
  const match = line.match(/^(.*?\\n)?(.*)/);
  console.log(match)
  if (match) {
    const textAfterNewline = match[2].trim();
    if (textAfterNewline) {
      result += `${textAfterNewline}\n`;
    }
  }
});

rl.on("close", () => {
  fs.writeFile(outputFileName, result, "utf8", (err) => {
    if (err) {
      console.error(err);
    }
    console.log(`Successfully generated ${outputFileName}`);
  });
});
