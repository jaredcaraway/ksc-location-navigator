const searchEl = document.getElementById("search");
const listEl = document.getElementById("list");
const countEl = document.getElementById("count");

let activeIndex = -1;
let filtered = [...LOCATIONS];

function highlightMatch(text, query) {
    if (!query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return text.replace(new RegExp(`(${escaped})`, "gi"), "<mark>$1</mark>");
}

function isCampus(name) {
    return /campus/i.test(name);
}

function render() {
    const query = searchEl.value.trim().toLowerCase();

    filtered = LOCATIONS.filter((loc) =>
        loc.name.toLowerCase().includes(query)
    );

    countEl.textContent = `${filtered.length} of ${LOCATIONS.length} locations`;

    if (filtered.length === 0) {
        listEl.innerHTML = '<div class="empty">No locations match your search</div>';
        activeIndex = -1;
        return;
    }

    listEl.innerHTML = filtered
        .map((loc, i) => {
            const classes = ["location"];
            if (i === activeIndex) classes.push("active");

            return `
                <a class="${classes.join(" ")}" href="${loc.url}" data-index="${i}">
                    <span class="location-dot"></span>
                    <span class="location-name">${highlightMatch(loc.name, query)}</span>
                    ${isCampus(loc.name) ? '<span class="campus-badge">Campus</span>' : ""}
                    <span class="location-arrow">&rsaquo;</span>
                </a>
            `;
        })
        .join("");

    // Click handler
    listEl.querySelectorAll(".location").forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            chrome.tabs.create({ url: el.href });
        });
    });
}

function scrollToActive() {
    const active = listEl.querySelector(".location.active");
    if (active) {
        active.scrollIntoView({ block: "nearest" });
    }
}

searchEl.addEventListener("input", () => {
    activeIndex = -1;
    render();
});

searchEl.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
        e.preventDefault();
        if (activeIndex < filtered.length - 1) {
            activeIndex++;
            render();
            scrollToActive();
        }
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (activeIndex > 0) {
            activeIndex--;
            render();
            scrollToActive();
        }
    } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        chrome.tabs.create({ url: filtered[activeIndex].url });
    }
});

render();
