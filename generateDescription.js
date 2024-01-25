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

let response = [];

function mainPrompt(market) {
  const prompt = `Generate content (3000 words) for the below sections based on the attached content format example: 1. What is the Market Size & CAGR of ${market} market in 2021? 2. COVID-19 Impact on the ${market} Market 3. ${market} Dynamics 4. Segments and Related analysis 5. By Region Analysis 6. Key Market Players and Competitive Landscape 7. Recent happenings in the ${market} Market Content format example: Anticoccidial Drugs Market Size (2021 to 2030) The global anticoccidial drugs market is expected to have a growth rate of 3.61% CAGR from 2021 to 2030. As a result, the market is anticipated to grow by USD 1691.94 Million by 2028. Anticoccidial Drugs Market Share Insights: Based on the Drug type, the ionophore anticoccidials segment had the largest market share of the global anticoccidial drugs market in 2022. Based on animal type, the poultry animal segment had the largest market share of the global anticoccidial drugs market in 2022. The North American anticoccidial drugs market had the most significant global market share in 2022. Anticoccidial drugs are a part of the veterinary medicine industry. These drugs are used to prevent and treat coccidiosis in animals. When animals are diagnosed with coccidiosis, they suffer from diarrhea, weight loss, and reduced growth and productivity. Coccidiosis can also result in death in some cases. Coccidiosis majorly impacts the intestines of animals. This parasitic disease is infectious. To treat coccidiosis, anticoccidial drugs are used in the treatment procedures to remove the parasites. Anticoccidial drugs are of two types, which are ionophores and chemical anticoccidials. Monensin and salinomycin are ionophores, and sulfonamides and nitroimidazoles are chemical anticoccidials. As said earlier, these drugs are primarily used to control the spread of coccidiosis; however, the consumption of the drugs has to be according to the saying of veterinarians, and overuse of these drugs could result in other animal problems. Impact of COVID-19 on the global anticoccidial drugs market: The disease has spread to almost every country globally since the COVID-19 virus outbreak in December 2019, prompting the World Health Organization to declare it a public health emergency. Coccidiosis is a viral disease caused by a single-cell parasite that can only be seen under a microscope. It affects the intestinal tracts of animals. Weight loss, moderate sporadic to extreme diarrhea, diarrhea containing blood or mucus, dehydration, and decreased breeding are all signs of coccidiosis, one of the most common parasitic diseases in domesticated animals. Growing clinical trials in developing medicines or vaccines for animals to prevent infections propels this market's growth rate to new heights. Anticoccidial drugs are drug preparations used to treat coccidiosis in animals. These are given to animals and birds to stop coccidia from reproducing and destroying protozoa in the intestine. In some countries, the transmission of coronavirus from humans to animals boosts the market's growth rate during these pandemic times. In addition, key strategies and increasing awareness of social distancing and wearing masks among market players are expected to boost demand for anticoccidial drugs during the forecast period. MARKET DRIVERS: YOY growth in the prevalence of coccidiosis and increasing focus on animal health primarily accelerates the global anticoccidial drugs market. Anticoccidial drugs are the agents used to treat, prevent, and control coccidial infections. However, there is a risk of increased coccidiosis due to environmental factors and others, such as contamination or other issues related to hygienic measures. Hence, there is an alarming demand for newer anticoccidial drugs in the drug market. Increasing the need to prevent the spread of diseases in animals with effective medication and the rise in the consumption rate of meat and poultry products are the primary reasons driving the growth of the global anticoccidial drugs market. The growing number of veterinary hospitals, rise in demand to improve the quality of drugs with different techniques, growing disposable income in urban areas, and people's concern towards maintaining a healthy diet are further helping the global anticoccidial drugs market to grow. According to the data published by the American Veterinary Medical Association (AVMA), an estimated 20,000 veterinary clinics, hospitals, and 90,000 veterinary practitioners were there in the United States in 2021. Additionally, growing support from the government through investments, the rising demand to increase the production rate of drugs with high quality, and increasing concern towards animals' health conditions further accelerate market growth. For instance, the United States Department of Agriculture (USDA) invested an amount of USD 19 million in conducting R&D for animal health and animal diseases to prevent, control, and treat various diseases in livestock and poultry and also to innovate new veterinary medical equipment, diagnostic tools, and treatment procedures via NIFA in 2019. Likewise, the Australian government announced an investment of USD 100 million for veterinary healthcare, primarily to conduct R&D to develop advanced medical devices, drugs, and treatment procedures for various animal diseases in 2020. Furthermore, the adoption of the latest technology, the launch of valuable products, and the rising number of infectious diseases among animals and birds are expected to fuel the growth opportunities for the global anticoccidial drugs market. MARKET RESTRAINTS: However, the need for more skilled persons in manufacturing appropriate drugs with correct dosage forms slowly restricts the global anticoccidial drug market growth. In addition, the availability of other drugs at a lower cost and fluctuations in the prices of final products due to less availability of raw materials are expected to limit the growth of the global anticoccidial drugs market. This research report on the global anticoccidial drugs market has been segmented and sub-segmented based on the drug type, animal type, and region. Anticoccidial Drugs Market - By Drug Type: Antibiotic Anticoccidials Ionophore Anticoccidials Chemical Derivative Anticoccidials By drug type, the ionophore anticoccidials segment witnessed the highest global market share in 2022. The growing awareness regarding the advantages of ionophores, such as improved efficacy, faster action, and a lower risk of drug resistance developing among veterinary practitioners, is propelling segmental growth. In addition, the growing R&D activities around ionophores to bring innovative and effective drugs to the market further promote the segment's growth rate. Furthermore, ionophores are safe for animals as they contain low toxicity levels, due to which the adoption of ionophores is growing and resulting in segmental growth. The antibiotic anticoccidials drug segment is expected to grow at the fastest CAGR during the forecast period. The rise in the scale of research institutes to introduce certain types of drugs at high quality with the latest technology boosts segmental growth. Also, the growing economy in almost every region magnifies the segment's growth rate. Anticoccidial Drugs Market - By Animal Type: Poultry Swine Fish Cattle Companion Animal Based on animal type, the poultry animal segment led the anticoccidial drugs market in 2022, and the segment's domination is likely to continue during the forecast period. The growing adoption of anticoccidial drugs primarily drives the segment's growth by poultry producers to improve the productivity and overall health of the birds. In addition, the emergence of the latest technological developments, and the growing incidence of coccidiosis, especially in food-producing animals, are fuelling the segment's growth rate. On the other hand, the companion animal segment is anticipated to witness a promising CAGR during the forecast period. Factors such as increasing pet ownership worldwide, rising awareness regarding veterinary healthcare, and the availability of anticoccidial drugs in several countries are promoting segmental growth. As a result, the adoption of companion animals such as cats and dogs is growing significantly worldwide. In addition, the growing incidence of coccidiosis among companion animals accelerates the segment's growth. Anticoccidial Drugs Market - By Region: North America Europe Asia Pacific Latin America Middle East and Africa Regionally, the North American anticoccidial drugs market was the most dominating region in the global market in 2021 and was worth USD 393.18 million in 2022. The adoption of advanced manufacturing drug techniques majorly drives this regional market. In addition, launching innovative medicines that favor producing the most top-quality products significantly influences the global anticoccidial drugs market. The adoption of companion animals is increasing in North American countries, which is expected to contribute to the growth of the North American market. For instance, dogs are widely adopted in the U.S., followed by cats. According to studies, 60 million households have dogs as pets, and 47 million have cats as their pets in the United States. The presence of well-organized animal healthcare systems in the North American region favors the anticoccidial drugs market in this region. The increasing accessibility of anticoccidial drugs to pet owners via veterinary hospitals and online pharmacies is anticipated to favor regional market growth. The APAC anticoccidial drugs market is forecasted to be growing at a CAGR of 4.3% from 2022 to 2027. The Asia Pacific market accounted for the second largest global market share in 2021 owing to the growing pet population, increasing demand for poultry products, and increasing support and funding from the APAC countries. In addition, the growth rate of the APAC market is also fuelled by the increasing scale of the regional pharmaceutical industries. The European anticoccidial drugs market is predicted to grow at a promising CAGR during the forecast period due to the growing meat consumption rate. Furthermore, the presence of a sophisticated pet care industry in the European region is anticipated to boost the growth rate of the European market. In addition, factors such as the growing usage of anticoccidial drugs for companion animals and poultry animals in European countries and the growing availability of anticoccidial drugs via various channels are favoring the growth of the European market. As a result, the U.K. market is estimated to account for most of the share in the European market during the forecast period. The Latin American anticoccidial drugs market is projected to grow steadily during the forecast period. Brazil, followed by Mexico, led the anticoccidial drugs market in Latin America in 2021. The MEA anticoccidial drugs market is projected to have a prominent growth rate in the coming years. The usage of anticoccidial drugs is growing substantially in the Middle East and African countries owing to the growing MEA poultry industry and increasing incidence of coccidiosis among birds. In addition, the rising consumption levels of meat and poultry products are expected to fuel the need for anticoccidial drugs in this region during the forecast period. KEY MARKET PLAYERS: Noteworthy companies in the global anticoccidial drugs market profiled in this report are Bayer Health care, Zoetis, Elanco, Merial, Merck Animal Healthcare, Ceva Santé Animale, Virbac, Boehringer Ingelheim Animal Health, Novartis Animal Healthcare, and Smartvet Inc. The global anticoccidial drugs market is highly competitive, and major players have adopted product development strategies, mergers, acquisitions, and partnerships to maximize their market share. RECENT DEVELOPMENTS IN THE MARKET: In April 2022, Amlan International, a U.S.-based company operating in veterinary healthcare, announced natural alternatives to anticoccidial drugs. In May 2020, Zoetis showed suckling calves with significant weight gain from implants. It is a considerable increase in weaning weight. In September 2019, Virbac launched Multimin, which is used for cattle. In October 2019, Ceva Sante Animale agreed with ProBioGen, the manufacturer, to represent a transformation of poultry vaccines with the help of ProBioGen's proprietary AGE1.CR technology. AGE1 is a preserved cell line that is obtained from the duck. This cell line is created as a platform to restore chicken cells to manufacture vaccines related to poultry. In addition, Ceva and ProBioGen have a long track in introducing new veterinary vaccines through additional research and development programs. \n Note: you must need to generate in HTML & CSS format like <h2 style="color: rgb:(0,0,0)">, <h3 style>, <p style="marginBottom: 1rem">, etc., Add dark blue rgb and black combined colors. Highlight the import lines and texts & make sure to add marginBottom for each <p> tags. all this are very very important`;
  return prompt;
}

const dataArray = [
  ["nuts-and-nutmeals", "food-and-beverages"],
  ["non-alcoholic-concentrated-syrup", "food-and-beverages"],
  ["yeast-and-yeast-extract", "food-and-beverages"],
  ["carbonated-beverage-processing-equipment", "food-and-beverages"],
  ["wellness-supplement", "food-and-beverages"],
  ["immune-health-supplements", "food-and-beverages"],
  ["protective-cultures", "food-and-beverages"],
  ["hyaluronic-acid", "food-and-beverages"],
  ["fortified-bakery", "food-and-beverages"],
  ["indian-isotonic-drinks", "food-and-beverages"],
  ["cooking-oils-fats", "food-and-beverages"],
  ["premium-alcoholic-beverages", "food-and-beverages"],
  ["food-automation", "food-and-beverages"],
  ["salts-and-flavored-salts", "food-and-beverages"],
  ["halal-ingredients", "food-and-beverages"],
  ["craft-spirits", "food-and-beverages"],
  ["plant-based-protein", "food-and-beverages"],
  ["milk-chocolate", "food-and-beverages"],
  ["releasing-agents", "food-and-beverages"],
];

const convertedArray = dataArray.map(([market]) => {
  return [
    {
      id: market,
      content: mainPrompt(formatString(market)),
    },
  ];
});

// Flatten the array to get the desired format
const resultArray = convertedArray.flat();

// const { data, error } = await supabase
//   .from('reports')
//   .update({ other_column: 'otherValue' })
//   .eq('some_column', 'someValue')
//   .select()

async function main() {
  let chatHistory = []; // Store conversation history
  // for (const prompt of allPromts) {

  for (const item of resultArray) {
    try {
      if (chatHistory.length > 1) {
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

      console.log(completionText);
      console.log(chatHistory, "chatHistory");

      const { data, error } = await supabase
        .from("reports")
        .update({
          customContents: completionText,
          redirect: true,
        })
        .eq("id", item.id)
        .select();

      if (error) {
        console.log(error);
        throw error;
      }

      // Update history with user input and assistant response
      chatHistory.push(["user", item.content]);
      chatHistory.push(["assistant", completionText]);
    } catch (error) {
      console.log(error);
    }

    // if (i === 2) {
    //   i = 0;

    // }
  }
  console.log("chatHistory", chatHistory);

  // Close the readline interface
  rl.close();
}

// Run the conversation
main();
