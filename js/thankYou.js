const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxAD8VopIId8ivnAzaZZP4VAH-TPj2tsFh8-FN0SdD5e4nZICUTBXnTw0jCKKyC_0Fhyw/exec";

async function sendFormData() {
  const formDataRaw = localStorage.getItem("formData");
  if (!formDataRaw) {
    console.log("Malumotlar yoq");
    return;
  }

  const formDataObj = JSON.parse(formDataRaw);

  // Prepare FormData for API
  const formData = new FormData();
  formData.append("Ism", formDataObj.Ism);
  formData.append("Telefon raqam", formDataObj.TelefonRaqam);
  formData.append("Royhatdan o'tgan vaqti", formDataObj.SanaSoat);

  try {
    const response = await fetch(SHEET_URL, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      localStorage.removeItem("formData");
    } else {
      throw new Error("API response was not ok");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    document.getElementById("errorMessage").style.display = "block";
  }
}

window.onload = sendFormData;