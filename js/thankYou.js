const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxQJvm-ptEN3IIkd77JZxU44-HU_Ze3891pIpP0qiFlZJsgL5jD0y41kD1lyQhhYiOZnQ/exec";

async function sendFormData() {
  const o = localStorage.getItem("formData");
  if (!o) return void console.log("Malumotlar yoq");
  const a = JSON.parse(o),
    e = new FormData();
  e.append("sheetName", "Lead"),
  e.append("Ism", a.Ism),
  e.append("Telefon raqam", a.TelefonRaqam),
    e.append("Royhatdan o'tgan vaqti", a.SanaSoat);
  try {
    if (!(await fetch(SHEET_URL, { method: "POST", body: e })).ok)
      throw new Error("API response was not ok");
    localStorage.removeItem("formData");
  } catch (o) {
    console.error("Error submitting form:", o),
      (document.getElementById("errorMessage").style.display = "block");
  }
}
window.onload = sendFormData;
