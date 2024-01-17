import readline from "readline";
import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import { error } from "console";
dotenv.config();

const prompts = [
  "",
  "add 2 + 2 = ?",
  "now add 5 in previous result",
  "now add 2 in previous result",
  "now minus 3 in previous result",
];

// console.log(prompts);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

// const askQuestion = (question) => {
//   return new Promise((resolve) => {
//     rl.question(question, resolve);
//   });
// };

let response = [];

let allPromts = [
  [
    "You are a senior market research analyst with experience in the Life Sciences industry. Your task is to draft a market report for the 3d Cell Culture market. Please generate a Table of Contents (ToC) for the 3d Cell Culture market report, similar to the example provided for the 2D chromatography market report. Example:  **Table of Contents** 1. Executive Summary 2. Research Methodology 3. 2D Chromatography Market Overview 1. Market Definition and Scope 2. Market Segmentation 3. Currency, Forecast, etc. 4. 2D Chromatography Market Dynamics 1. Market Drivers 2. Market Restraints 3. Market Opportunities 4. Market Challenges 5. Industry Trends 6. Regulatory Landscape 1. Overview of Regulatory Framework 2. Impact of Regulatory Policies on Market Growth 7. Impact of COVID-19 on the 2D Chromatography Market 1. Short-term and Long-term Implications 2. Shift in Market Dynamics and Consumer Behavior 8. Porter's Five Forces Analysis 1. Bargaining Power of Suppliers 2. Bargaining Power of Buyers 3. The threat of New Entrants 4. Threat of Substitutes 5. Competitive Rivalry 9. Key Insights and Findings 10. 2D Chromatography Market - Technology Overview 1. High-Performance Liquid Chromatography (HPLC) 2. Gas Chromatography (GC) 3. Supercritical Fluid Chromatography (SFC) 4. Other Techniques 11. 2D Chromatography Market, By Product: 1. 2D Gas Chromatography (2D GC) 1. 2D GC Instruments 1. 2D GC Systems 2. 2D GC Detectors 1. Flame Ionization Detectors 2. Electron Capture Detectors 3. Mass Spectrometer Detectors 4. Other GC Detectors 3. Other GC Instruments 4. 2D GC Consumables 1. 2D GC Columns 2. Other GC Consumables 5. 2D GC Accessories 2. 2D Liquid Chromatography (2D LC) 1. 2D LC Instruments 1. 2D LC Systems 2. 2D LC Detectors 1. UV/UV-Visible Detectors 2. Refractive Index Detectors 3. Fluorescence Detectors 4. Other LC Detectors 3. Other LC Instruments 2. 2D LC Consumables 1. 2D LC Columns 1. Reversed-Phase Columns 2. Ion Exchange Columns 3. Size-Exclusion Columns 4. Normal-Phase/Hydrophilic Interaction Columns 5. Hydrophobic Interaction Columns 6. Other Liquid Chromatography Columns 2. Other LC Consumables 3. 2D LC Accessories 1. 2D Chromatography Market, By Application 1. Life Science Research 1. Pharmaceutical and Biopharmaceutical Applications 2. Biotechnology Applications 2. Environmental Analysis 3. Food and Beverage Testing 4. Petrochemical and Natural Gas Analysis 5. Other Applications 2. 2D Chromatography Market, By Region 1. North America 1. USA 2. Canada 3. Mexico 4. Rest of North America 2. Europe 1. Germany 2. United Kingdom 3. France 4. Italy 5. Russia 6. Spain 7. Rest of Europe 3. Asia-Pacific 1. India 2. China 3. Australia 4. Japan 5. Rest of Asia-Pacific 4. South America 1. Brazil 2. Argentina 3. Rest of South America 5. Middle East & Africa 1. United Arab Emirates 2. South Africa 3. Rest of Middle East and Africa 3. Company Profiles - Agilent Technologies - Thermo Fisher Scientific - Waters Corporation - Shimadzu Corporation - PerkinElmer - Bio-Rad Laboratories - Bruker Corporation - GE Healthcare - JEOL Ltd. - Hitachi High-Technologies Corporation - Phenomenex Inc. - Restek Corporation - GL Sciences Inc. - LECO Corporation - KNAUER Wissenschaftliche Geräte GmbH - Metrohm AG - Danaher Corporation - Kromasil - Tosoh Corporation - Sepax Technologies Inc. - YMC Co. Ltd. - Daicel Corporation - Polymer Char - SIELC Technologies - Chromatotec - JASCO Inc. - Kanto Chemical Co. Inc. - Merck KGaA - Sigma-Aldrich Corporation - W.R. Grace & Co. - Advanstar Inc. - Axcend Corporation - TOSOH Bioscience GmbH - Mac-Mod Analytical Inc. - Eksigent Technologies LLC - Regis Technologies Inc. - Macherey-Nagel GmbH & Co. KG - Develosil Co. Ltd. - Advanced Materials Technology Pty Ltd. - Kinesis Ltd. - ACE C18 - Chiral Technologies Inc. - Hamilton Company - Gilson Inc. - DANI Instruments S.p.A. - VUV Analytics Inc. - GL Science Inc. - SGE Analytical Science Pty Ltd. - ZirChrom Separations Inc. - Advanced Chromatography Technologies Ltd. - Shodex Corporation - M&CTech - Hichrom Limited - CERI - Nacalai Tesque Inc. - MIP Technologies 1. Competitive Landscape 1. Market Share Analysis 2. Competitive Landscape 3. Mergers and Acquisitions 4. Market Growth Strategies 2. Investment Analysis 1. Investment Opportunities in the 2D Chromatography Market 2. Return on Investment (RoI) analysis 3. Key factors influencing Investment decisions 4. Investment Outlook and Future Prospects 3. Strategic Recommendations 1. Market Entry Strategies for New Players 2. Expansion and Diversification Strategies for Existing Players 3. Product Development and Innovation Strategies 4. Collaborative Strategies and Partnerships 5. Marketing and Branding Strategies 6. Customer Retention and Relationship Management Strategies 4. Appendix 1. Data Sources 2. Abbreviations 3. Disclaimer Please note that you should generate a similar ToC for the market market report while adapting the sections and sub-sections to the specific context of the market3d Cell Culture Market industry. Give me the list of names of companies operating in the 3d Cell Culture market in the place of companies (as many as possible)",
    "Based on the above Table of Contents, generate a list of tables for Market as shown below: List of tables",
    "Based on the above now generate Table of Contents, List of tables for 1,3-Propanediol Market & industry will be Chemicals & Materials",
    "Based on the above now generate Table of Contents, List of tables for 1,4 Butanediol Market & industry will be Chemicals & Materials",
    "Based on the above now generate Table of Contents, List of tables for 1,6-Hexanediol Market & industry will be Chemicals & Materials",
    "Based on the above now generate Table of Contents, List of tables for 2 Wheeler Fuel Injection System Market & industry will be Automotive & Mobility",
    "Based on the above now generate Table of Contents, List of tables for 2D and 3D Machine Vision Systems Market & industry will be Manufacturing & Construction",
  ],
];

function saveDataToFile(response) {
  const dataAsString = JSON.stringify(response, null, 2);
  fs.writeFile("data.txt", dataAsString, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("file saved successfully");
    }
  });
}

async function main() {
  const chatHistory = []; // Store conversation history
  for (const prompt of allPromts) {
    for (const item of prompt) {
      try {
        const messages = chatHistory.map(([role, content]) => ({
          role,
          content,
        }));
        messages.push({ role: "user", content: item });

        const chatCompletion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: messages,
        });

        const completionText = chatCompletion.choices[0].message.content;
        console.log(completionText);
        response.push(completionText);

        // Update history with user input and assistant response
        chatHistory.push(["user", item]);
        chatHistory.push(["assistant", completionText]);
      } catch (error) {
        console.log(error);
      }
    }
  }
  console.log("chatHistory", chatHistory);

  // Close the readline interface
  rl.close();
}

// async function main() {
//   const chatHistory = []; // Store conversation history

//   for (const prompt of prompts) {
//     try {
//       const messages = chatHistory.map(([role, content]) => ({
//         role,
//         content,
//       }));

//       messages.push({ role: "user", content: prompt });

//       const chatCompletion = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: messages,
//       });

//       const completionText = chatCompletion.choices[0].message.content;
//       console.log(completionText);
//       response.push(completionText);

//       // Update history with user input and assistant response
//       chatHistory.push(["user", prompt]);
//       chatHistory.push(["assistant", completionText]);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// console.log(chatHistory);
//   // Close the readline interface
//   rl.close();
// }

// Run the conversation
main().then(() => {
  saveDataToFile(response);
  console.log(response);
});
