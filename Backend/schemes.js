import csv from "csvtojson";
import fs from "fs";

csv()
  .fromFile("./src/data/schemes.csv")
  .then((jsonArray) => {
    const filteredData = jsonArray
      // Step 1: Filter only agriculture-related schemes
      .filter((item) =>
        item.schemeCategory?.toLowerCase().includes("agriculture")
      )
      // Step 2: Keep only required fields
      .map((item) => ({
        scheme_name: item.scheme_name,
        benefits: item.benefits,
        level: item.level,
        schemeCategory: item.schemeCategory,
      }));

    // Save result
    fs.writeFileSync(
      "./src/data/agriculture_schemes.json",
      JSON.stringify(filteredData, null, 2)
    );

    console.log("✅ Agriculture schemes filtered successfully!");
  });