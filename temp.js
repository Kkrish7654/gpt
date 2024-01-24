import readline from "readline";
import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import { supabase } from "./lib/supabase.js";

dotenv.config();
function formatString(input) {
  const regex = /(?:^|-)([a-z])/g;
  const result = input?.replace(regex, (_, match) => ` ${match.toUpperCase()}`);
  return result;
}

// console.log(prompts);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

function mainPrompt(market, industry) {
  const prompt = `You are a senior market research analyst with experience in the ${industry} industry. Your task is to draft a market report for the ${market} market. Please generate a Table of Contents (ToC) for the ${market} market report, similar to the example provided for the 2D chromatography market report. Example: Table of Contents 1. Executive Summary 2. Research Methodology 3. 2D Chromatography Market Overview 3.1. Market Definition and Scope 3.2. Market Segmentation 3.3. Currency, Forecast, etc. 3.4. 2D Chromatography Market Dynamics 3.4.1. Market Drivers 3.4.2. Market Restraints 3.3.3. Market Opportunities 4. Market Challenges 5. Industry Trends 6. Regulatory Landscape 6.1. Overview of Regulatory Framework 2. Impact of Regulatory Policies on Market Growth 7. Impact of COVID-19 on the 2D Chromatography Market 1. Short-term and Long-term Implications 2. Shift in Market Dynamics and Consumer Behavior 8. Porter's Five Forces Analysis 1. Bargaining Power of Suppliers 2. Bargaining Power of Buyers 3. The threat of New Entrants 4. Threat of Substitutes 5. Competitive Rivalry 9. Key Insights and Findings 10. 2D Chromatography Market - Technology Overview 1. High-Performance Liquid Chromatography (HPLC) 2. Gas Chromatography (GC) 3. Supercritical Fluid Chromatography (SFC) 4. Other Techniques 11. 2D Chromatography Market, By Product: 1. 2D Gas Chromatography (2D GC) 1. 2D GC Instruments 1. 2D GC Systems 2. 2D GC Detectors 1. Flame Ionization Detectors 2. Electron Capture Detectors 3. Mass Spectrometer Detectors 4. Other GC Detectors 3. Other GC Instruments 4. 2D GC Consumables 1. 2D GC Columns 2. Other GC Consumables 5. 2D GC Accessories 2. 2D Liquid Chromatography (2D LC) 1. 2D LC Instruments 1. 2D LC Systems 2. 2D LC Detectors 1. UV/UV-Visible Detectors 2. Refractive Index Detectors 3. Fluorescence Detectors 4. Other LC Detectors 3. Other LC Instruments 2. 2D LC Consumables 1. 2D LC Columns 1. Reversed-Phase Columns 2. Ion Exchange Columns 3. Size-Exclusion Columns 4. Normal-Phase/Hydrophilic Interaction Columns 5. Hydrophobic Interaction Columns 6. Other Liquid Chromatography Columns 2. Other LC Consumables 3. 2D LC Accessories 1. 2D Chromatography Market, By Application 1. Life Science Research 1. Pharmaceutical and Biopharmaceutical Applications 2. Biotechnology Applications 2. Environmental Analysis 3. Food and Beverage Testing 4. Petrochemical and Natural Gas Analysis 5. Other Applications 2. 2D Chromatography Market, By Region 1. North America 1. USA 2. Canada 3. Mexico 4. Rest of North America 2. Europe 1. Germany 2. United Kingdom 3. France 4. Italy 5. Russia 6. Spain 7. Rest of Europe 3. Asia-Pacific 1. India 2. China 3. Australia 4. Japan 5. Rest of Asia-Pacific 4. South America 1. Brazil 2. Argentina 3. Rest of South America 5. Middle East & Africa 1. United Arab Emirates 2. South Africa 3. Rest of Middle East and Africa 3. Company Profiles - Agilent Technologies - Thermo Fisher Scientific - Waters Corporation - Shimadzu Corporation - PerkinElmer - Bio-Rad Laboratories - Bruker Corporation - GE Healthcare - JEOL Ltd. - Hitachi High-Technologies Corporation - Phenomenex Inc. - Restek Corporation - GL Sciences Inc. - LECO Corporation - KNAUER Wissenschaftliche Geräte GmbH - Metrohm AG - Danaher Corporation - Kromasil - Tosoh Corporation - Sepax Technologies Inc. - YMC Co. Ltd. - Daicel Corporation - Polymer Char - SIELC Technologies - Chromatotec - JASCO Inc. - Kanto Chemical Co. Inc. - Merck KGaA - Sigma-Aldrich Corporation - W.R. Grace & Co. - Advanstar Inc. - Axcend Corporation - TOSOH Bioscience GmbH - Mac-Mod Analytical Inc. - Eksigent Technologies LLC - Regis Technologies Inc. - Macherey-Nagel GmbH & Co. KG - Develosil Co. Ltd. - Advanced Materials Technology Pty Ltd. - Kinesis Ltd. - ACE C18 - Chiral Technologies Inc. - Hamilton Company - Gilson Inc. - DANI Instruments S.p.A. - VUV Analytics Inc. - GL Science Inc. - SGE Analytical Science Pty Ltd. - ZirChrom Separations Inc. - Advanced Chromatography Technologies Ltd. - Shodex Corporation - M&CTech - Hichrom Limited - CERI - Nacalai Tesque Inc. - MIP Technologies 1. Competitive Landscape 1. Market Share Analysis 2. Competitive Landscape 3. Mergers and Acquisitions 4. Market Growth Strategies 2. Investment Analysis 1. Investment Opportunities in the 2D Chromatography Market 2. Return on Investment (RoI) analysis 3. Key factors influencing Investment decisions 4. Investment Outlook and Future Prospects 3. Strategic Recommendations 1. Market Entry Strategies for New Players 2. Expansion and Diversification Strategies for Existing Players 3. Product Development and Innovation Strategies 4. Collaborative Strategies and Partnerships 5. Marketing and Branding Strategies 6. Customer Retention and Relationship Management Strategies 4. Appendix 1. Data Sources 2. Abbreviations 3. Disclaimer Please note that you should generate a similar ToC for the ${market} market report while adapting the sections and sub-sections to the specific context of the market ${market} Market industry. Give me the list of names of companies operating in the ${market} market in the place of companies (as many as possible). Give the list of real companies operating in the ${market} market under the company profiles (for ex. Microsoft, Apple, etc) section within ToC.  Please replace the placeholder company names with real companies operating in the Coconut Products market.. \n Note: you must need to generate in HTML format like <ol> and <li> it is very very important`;
  return prompt;
}

// console.log(mainPrompt("1-3 propanele", "life science"));

// let prompt = [
//   mainPrompt("1,3-Propanediol", "Chemicals & Materials"),
//   "Table of Contents Toc Based on the above ToC, generate a title similar to the below: 2D Chromatography Market Market Research Report – Segmented By Product (Gas Chromatography (2D GC), Liquid Chromatography (2D LC)), By Application (Life Science Research, Environmental Analysis, Food and Beverage Testing, Petrochemical and Natural Gas Analysis, Other Applications), By End Users (Biotechnology And Pharmaceutical Industries, Ambulatory Surgery Centers, Hospitals, Cancer Research Laboratories, Agriculture And Food Industries, Specialty Clinics, Others) & Region (North America, Europe, Asia-Pacific, Middle-East & Africa, Latin America) – Analysis on Size, Share, Trends, COVID-19 Impact, Competitive Analysis, Growth Opportunities and Key Insights from 2021 to 2030.  ",
//   mainPrompt("1,4 Butanediol", "Chemicals & Materials"),

//   "Table of Contents Toc Based on the above ToC, generate a title similar to the below: 2D Chromatography Market Market Research Report – Segmented By Product (Gas Chromatography (2D GC), Liquid Chromatography (2D LC)), By Application (Life Science Research, Environmental Analysis, Food and Beverage Testing, Petrochemical and Natural Gas Analysis, Other Applications), By End Users (Biotechnology And Pharmaceutical Industries, Ambulatory Surgery Centers, Hospitals, Cancer Research Laboratories, Agriculture And Food Industries, Specialty Clinics, Others) & Region (North America, Europe, Asia-Pacific, Middle-East & Africa, Latin America) – Analysis on Size, Share, Trends, COVID-19 Impact, Competitive Analysis, Growth Opportunities and Key Insights from 2021 to 2030.  ",
//   mainPrompt("1,6-Hexanediol", "Chemicals & Materials"),
//   "Table of Contents Toc Based on the above ToC, generate a title similar to the below: 2D Chromatography Market Market Research Report – Segmented By Product (Gas Chromatography (2D GC), Liquid Chromatography (2D LC)), By Application (Life Science Research, Environmental Analysis, Food and Beverage Testing, Petrochemical and Natural Gas Analysis, Other Applications), By End Users (Biotechnology And Pharmaceutical Industries, Ambulatory Surgery Centers, Hospitals, Cancer Research Laboratories, Agriculture And Food Industries, Specialty Clinics, Others) & Region (North America, Europe, Asia-Pacific, Middle-East & Africa, Latin America) – Analysis on Size, Share, Trends, COVID-19 Impact, Competitive Analysis, Growth Opportunities and Key Insights from 2021 to 2030.  ",

//   mainPrompt("1-Decanol ", "Chemicals & Materials"),
//   "Table of Contents Toc Based on the above ToC, generate a title similar to the below: 2D Chromatography Market Market Research Report – Segmented By Product (Gas Chromatography (2D GC), Liquid Chromatography (2D LC)), By Application (Life Science Research, Environmental Analysis, Food and Beverage Testing, Petrochemical and Natural Gas Analysis, Other Applications), By End Users (Biotechnology And Pharmaceutical Industries, Ambulatory Surgery Centers, Hospitals, Cancer Research Laboratories, Agriculture And Food Industries, Specialty Clinics, Others) & Region (North America, Europe, Asia-Pacific, Middle-East & Africa, Latin America) – Analysis on Size, Share, Trends, COVID-19 Impact, Competitive Analysis, Growth Opportunities and Key Insights from 2021 to 2030.  ",

//   mainPrompt("1-Decene", "Chemicals & Materials"),
//   "Table of Contents Toc Based on the above ToC, generate a title similar to the below: 2D Chromatography Market Market Research Report – Segmented By Product (Gas Chromatography (2D GC), Liquid Chromatography (2D LC)), By Application (Life Science Research, Environmental Analysis, Food and Beverage Testing, Petrochemical and Natural Gas Analysis, Other Applications), By End Users (Biotechnology And Pharmaceutical Industries, Ambulatory Surgery Centers, Hospitals, Cancer Research Laboratories, Agriculture And Food Industries, Specialty Clinics, Others) & Region (North America, Europe, Asia-Pacific, Middle-East & Africa, Latin America) – Analysis on Size, Share, Trends, COVID-19 Impact, Competitive Analysis, Growth Opportunities and Key Insights from 2021 to 2030.  ",
// ];

const dataArray = [
  ["pufa-in-global", "food-and-beverages"],
  ["paleo-food", "food-and-beverages"],
  ["instant-coffee", "food-and-beverages"],
  ["beer", "food-and-beverages"],
  ["compound-fertilizer", "food-and-beverages"],
  ["fructooligosaccharide", "food-and-beverages"],
  ["tempeh", "food-and-beverages"],
  ["coconut-products", "food-and-beverages"],
  ["cold-pressed-juice", "food-and-beverages"],
  ["craft-vodka", "food-and-beverages"],
  ["non-alcoholic-concentrated-syrup", "food-and-beverages"],
];

const convertedArray = dataArray.map(([market, industry], index) => {
  const title = `Table of Contents Toc Based on the above ToC, generate a title similar to the below: 2D Chromatography Market Market Research Report – Segmented By Product (Gas Chromatography (2D GC), Liquid Chromatography (2D LC)), By Application (Life Science Research, Environmental Analysis, Food and Beverage Testing, Petrochemical and Natural Gas Analysis, Other Applications), By End Users (Biotechnology And Pharmaceutical Industries, Ambulatory Surgery Centers, Hospitals, Cancer Research Laboratories, Agriculture And Food Industries, Specialty Clinics, Others) & Region (North America, Europe, Asia-Pacific, Middle-East & Africa, Latin America) – Analysis on Size, Share, Trends, COVID-19 Impact, Competitive Analysis, Growth Opportunities and Key Insights from 2021 to 2030.`;

  return [
    {
      id: market,
      content: mainPrompt(formatString(market), formatString(industry)),
    },
    { id: market, content: title },
  ];
});

// Flatten the array to get the desired format
const resultArray = convertedArray.flat();

// Log the result
resultArray.forEach((item) => {
  console.log(item, "\n");
});

function saveDataToFile(response) {
  // const dataAsString = JSON.stringify(response, null, 2);
  fs.appendFile("prompt.txt", response, (error) => {
    if (error) {
      console.log(error);
      return;
    } else {
      console.log("file saved successfully");
    }
  });
}

// const { data, error } = await supabase
//   .from('reports')
//   .update({ other_column: 'otherValue' })
//   .eq('some_column', 'someValue')
//   .select()

async function main() {
  let chatHistory = []; // Store conversation history
  // for (const prompt of allPromts) {
  let i = 0;
  let toc;
  let description;
  for (const item of resultArray) {
    i++;
    try {
      if (chatHistory.length > 2) {
        chatHistory = [];
      }
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));
      messages.push({
        role: "user",
        content: item.content,
        // content: mainPrompt(item.market, item.industry),
      });

      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      const completionText = chatCompletion.choices[0].message.content;
      if (i === 1) toc = completionText;
      else description = completionText;

      console.log(completionText);
      console.log(chatHistory, "chatHistory");

      // saveDataToFile(completionText);

      // response.push(completionText);

      // Update history with user input and assistant response
      chatHistory.push(["user", item.content]);
      chatHistory.push(["assistant", completionText]);
    } catch (error) {
      console.log(error);
    }

    if (i === 2) {
      i = 0;
      const { data, error } = await supabase
        .from("reports")
        .update({
          customTOC: toc,
          descriptiveTitle: description,
          redirect: true,
        })
        .eq("id", item.id)
        .select();

      if (error) {
        console.log(error);
        throw error;
      }
    }
  }
  console.log("chatHistory", chatHistory);

  // Close the readline interface
  rl.close();
}

// Run the conversation
main();
