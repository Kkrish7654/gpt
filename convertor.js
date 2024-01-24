function mainPrompt(market, industry) {
  return `mainPrompt("${market}", "${industry}"),`;
}

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

  return [mainPrompt(market, industry), title];
});

// Flatten the array to get the desired format
const resultArray = convertedArray.flat();

// Log the result
resultArray.forEach((item) => {
  console.log(item);
});
