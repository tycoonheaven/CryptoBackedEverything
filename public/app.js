function coinRows(coins) {
  return coins
    .map(
      (coin) => `
        <div class="coin-row">
          <strong>${coin.symbol}</strong>
          <span>${coin.balance}</span>
          <code>${coin.address}</code>
        </div>
      `
    )
    .join("");
}

function stateBlock(title, rows) {
  return `
    <section class="state-block">
      <h4>${title}</h4>
      <div class="state-rows">${rows}</div>
    </section>
  `;
}

function stateRow(label, value) {
  return `
    <div class="state-row">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `;
}

async function loadMarketplace() {
  const rulesList = document.getElementById("rules-list");
  const surfaceGrid = document.getElementById("surface-grid");
  const registryGrid = document.getElementById("registry-grid");
  const consoleNote = document.getElementById("console-note");

  try {
    const response = await fetch("/api/products");
    const data = await response.json();

    rulesList.innerHTML = data.protocolRules.map((rule) => `<li>${rule}</li>`).join("");

    surfaceGrid.innerHTML = data.protocolSurfaces
      .map(
        (surface) => `
          <article class="surface-card">
            <p class="panel-label">${surface.id}</p>
            <h3>${surface.title}</h3>
            <p>${surface.detail}</p>
          </article>
        `
      )
      .join("");

    consoleNote.innerHTML = `
      <p class="panel-label">AGENT_MESSAGE_EXAMPLE</p>
      <blockquote>${data.items[0].autopayInstruction.message}</blockquote>
    `;

    registryGrid.innerHTML = data.items
      .map(
        (item) => `
          <article class="registry-card">
            <div class="registry-card__top">
              <div>
                <p class="panel-label">${item.id}</p>
                <h3>${item.name}</h3>
              </div>
              <span class="registry-card__tag">${item.category}</span>
            </div>
            <div class="registry-card__visual">
              <img src="${item.images.primary}" alt="${item.images.alt}" class="registry-card__image" />
            </div>
            <p class="registry-card__summary">${item.summary}</p>
            <div class="state-grid">
              ${stateBlock(
                "IMAGE_STATE",
                [
                  stateRow("primary_image", item.images.primary),
                  stateRow("gallery_count", String(item.images.gallery.length)),
                  stateRow("alt", item.images.alt),
                ].join("")
              )}
              ${stateBlock(
                "LISTING_STATE",
                [
                  stateRow("status", item.listingState.status),
                  stateRow("basket_type", item.listingState.basketType),
                  stateRow("zero_sum_target", item.listingState.zeroSumTarget),
                  stateRow("price", item.listingState.price),
                  stateRow("crypto_price", item.listingState.cryptoPrice),
                  stateRow("action", item.listingState.buyAction),
                ].join("")
              )}
              ${stateBlock(
                "BASKET_STATE",
                [
                  stateRow("payout_coin", item.basketState.payoutCoin),
                  stateRow("myp", item.basketState.monthlyYield),
                  stateRow("health", item.basketState.basketHealth),
                  stateRow("method", item.basketState.method),
                ].join("") + `<div class="coin-stack">${coinRows(item.basketState.coins)}</div>`
              )}
              ${stateBlock(
                "OPT_IN_STATE",
                [
                  stateRow("qr_binding", item.optInState.qrBinding),
                  stateRow("activation", item.optInState.activationState),
                  stateRow("reminder_rule", item.optInState.reminderRule),
                  stateRow("anchor_rule", item.optInState.anchorRule),
                ].join("")
              )}
              ${stateBlock(
                "REPAYMENT_STATE",
                [
                  stateRow("progress", item.repaymentState.progress),
                  stateRow("remaining", item.repaymentState.remaining),
                  stateRow("next_due", item.repaymentState.nextDueDate),
                  stateRow("late_after", item.repaymentState.lateAfter),
                  stateRow("missed_after", item.repaymentState.missedAfter),
                  stateRow("zero_pay_rule", item.repaymentState.zeroPayRule),
                ].join("")
              )}
              ${stateBlock(
                "REPUTATION_STATE",
                [
                  stateRow("seller", item.reputationState.seller),
                  stateRow("score", item.reputationState.score),
                  stateRow("on_time_rate", item.reputationState.onTimeRate),
                  stateRow("demerits", item.reputationState.demerits),
                  stateRow("block_rule", item.reputationState.blockRule),
                ].join("")
              )}
              ${stateBlock(
                "AUTOPAY_INSTRUCTION",
                [
                  stateRow("recommendation", item.autopayInstruction.recommendation),
                  `<div class="agent-message"><span>message</span><blockquote>${item.autopayInstruction.message}</blockquote></div>`,
                ].join("")
              )}
            </div>
          </article>
        `
      )
      .join("");
  } catch (error) {
    registryGrid.innerHTML = `
      <article class="registry-card registry-card--error">
        <h3>REGISTRY_HAS_YET_TO_LOAD</h3>
        <p>Refresh after the server restarts and the agent protocol surfaces will have room to appear.</p>
      </article>
    `;
    console.error("Failed to load marketplace", error);
  }
}

loadMarketplace();
