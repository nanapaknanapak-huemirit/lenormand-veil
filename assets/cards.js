const input = document.querySelector("[data-card-search]");
const grid = document.querySelector("[data-card-grid]");
const count = document.querySelector("[data-card-count]");
const noResults = document.querySelector("[data-no-results]");

if (input && grid) {
  const items = Array.from(grid.querySelectorAll("[data-card-item]"));
  const template = count?.dataset.template || "Showing {shown} of {total} cards";
  const total = items.length;

  const update = () => {
    const query = input.value.trim().toLowerCase();
    let shown = 0;
    items.forEach((item) => {
      const text = (item.dataset.search || "") + " " + item.textContent.toLowerCase();
      const match = !query || text.includes(query);
      item.hidden = !match;
      if (match) shown += 1;
    });
    if (count) {
      count.textContent = template.replace("{shown}", String(shown)).replace("{total}", String(total));
    }
    if (noResults) noResults.hidden = shown !== 0;
  };

  input.addEventListener("input", update);
  update();
}
