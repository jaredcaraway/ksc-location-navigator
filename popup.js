const searchEl = document.getElementById("search");
const listEl = document.getElementById("list");
const countEl = document.getElementById("count");
const tabEls = document.querySelectorAll(".tab");

let activeIndex = -1;
let activeTab = "locations";
let filtered = [...LOCATIONS];

function getDataSource() {
    return activeTab === "locations" ? LOCATIONS : SPECIALTIES;
}

function highlightMatch(text, query) {
    if (!query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return text.replace(new RegExp(`(${escaped})`, "gi"), "<mark>$1</mark>");
}

function isCampus(name) {
    return /campus/i.test(name);
}

function render() {
    const source = getDataSource();
    const query = searchEl.value.trim().toLowerCase();

    filtered = source.filter((item) =>
        item.name.toLowerCase().includes(query)
    );

    const label = activeTab === "locations" ? "locations" : "specialties";
    countEl.textContent = `${filtered.length} of ${source.length} ${label}`;

    if (filtered.length === 0) {
        listEl.innerHTML = `<div class="empty">No ${label} match your search</div>`;
        activeIndex = -1;
        return;
    }

    listEl.innerHTML = filtered
        .map((item, i) => {
            const classes = ["location"];
            if (i === activeIndex) classes.push("active");

            const dotClass = activeTab === "locations" ? "location-dot" : "specialty-dot";
            const badge = activeTab === "locations" && isCampus(item.name)
                ? '<span class="campus-badge">Campus</span>'
                : "";

            return `
                <a class="${classes.join(" ")}" href="${item.url}" data-index="${i}">
                    <span class="${dotClass}"></span>
                    <span class="location-name">${highlightMatch(item.name, query)}</span>
                    ${badge}
                    <span class="location-arrow">&rsaquo;</span>
                </a>
            `;
        })
        .join("");

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

function switchTab(tab) {
    activeTab = tab;
    activeIndex = -1;
    searchEl.value = "";
    searchEl.placeholder = `Search ${tab}...`;
    tabEls.forEach((el) => {
        el.classList.toggle("active", el.dataset.tab === tab);
    });
    render();
    searchEl.focus();
}

tabEls.forEach((el) => {
    el.addEventListener("click", () => switchTab(el.dataset.tab));
});

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
