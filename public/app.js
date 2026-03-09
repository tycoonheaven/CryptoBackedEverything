async function loadProducts() {
  const grid = document.getElementById("product-grid");

  try {
    const response = await fetch("/api/products");
    const data = await response.json();

    grid.innerHTML = data.items
      .map(
        (item) => `
          <article class="product-card">
            <p class="product-card__tag">${item.category} ${item.featured ? "Featured" : "Listing"}</p>
            <div class="product-card__meta">
              <span>${item.seller}</span>
              <span>${item.id}</span>
            </div>
            <h3>${item.name}</h3>
            <p>${item.summary}</p>
            <div class="product-card__price">${item.price}</div>
            <p>${item.backing}</p>
            <div class="product-card__footer">
              <span>Proof ready</span>
              <span>Agent compatible</span>
            </div>
          </article>
        `
      )
      .join("");
  } catch (error) {
    grid.innerHTML = `
      <article class="product-card">
        <p class="product-card__tag">Marketplace offline</p>
        <h3>Listings unavailable</h3>
        <p>We couldn't load the product feed just now. Start the server and refresh to see the marketplace.</p>
      </article>
    `;
    console.error("Failed to load products", error);
  }
}

loadProducts();
