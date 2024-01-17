import fs from "fs";

fs.readFile("data.txt", function (err, data) {
  if (err) {
    confirm("Error reading:", err);
  }
  console.log(JSON.parse(data));
});
