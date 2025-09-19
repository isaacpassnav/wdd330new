// src/js/utils.mjs
export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}
// funtion to header and footer dinamically
export async function loadHeaderFooter() {
  async function loadHTML(containerId, url) {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error loading ${url}`);
      container.innerHTML = await response.text();
    } catch (err) {
      console.error("Error fetching data:", err);
      container.innerHTML = "<p>Error loading section</p>";
    }
  }

  await loadHTML("header", "../product_pages/header.html");
  await loadHTML("footer", "../product_pages/footer.html");
}
