import axios from "axios";
async function saveToGoogleSheets(data: Record<string, any>) {
  const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL?.toString();
  if (!scriptUrl) {
    console.error("Missing GOOGLE_SHEETS_SCRIPT_URL environment variable");
    return;
  }

  try {
    const response = await axios.post(scriptUrl, data);

    console.log("Data saved to Google Sheets:", response.data);
  } catch (error) {
    console.error(error);
    console.error("Error saving data to Google Sheets:", error);
  }
}
 export { saveToGoogleSheets }