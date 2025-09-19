import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { updateCartBadge } from "./cartBadge.js";

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

export async function loadHeaderFooter() {
  await loadHTML("header", "../product_pages/header.html");
  await loadHTML("footer", "../product_pages/footer.html");
}

const params = new URLSearchParams(window.location.search);
const productId = params.get("product");

if (productId) {
  const dataSource = new ProductData("../json/tents.json");
  const product = new ProductDetails(productId, dataSource);
  product.init();
} else {
  const detailsEl = document.getElementById("productDetails");
  if (detailsEl) {
    detailsEl.innerHTML = "<p>⚠️ No product selected</p>";
  }
}
(async function init() {
  await loadHeaderFooter();
  updateCartBadge();
})();