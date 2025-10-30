document.addEventListener("DOMContentLoaded", async () => {
    function menu() {
        var e = document.querySelector("nav");
        e.classList.toggle("open");
    }

    const section = document.querySelector("section");

    const fetchdata = async () => {
        try {
            const response = await fetch("experiences.json");
            if (!response.ok) throw new Error("error loading json");
            const data = await response.json();
            return data.experiences || [];
        } catch {
            console.error("failed to load experiences.json");
            return [];
        }
    };

    const icons = (includes) => {
        let html = "";
        if (includes?.wine === "yes") {
            html += `<img src="img/wine-glass.svg" width="32" height="32" alt="wine glass icon">`;
        }
        if (includes?.food === "yes") {
            html += `<img src="img/cutlery.svg" width="32" height="32" alt="cutlery icon">`;
        }
        html += `<img src="img/clock.svg" width="32" height="32" alt="clock icon">`;
        return html;
    };

    const card = (item) => {
        const el = document.createElement("div");
        el.classList.add("card");
        el.innerHTML = `
            <div class="card-cover" style="background-image:url('${item.cover}')"></div>
            <div class="card-content">
                <div class="card-tags">
                    ${icons(item.includes)}
                    <span class="card-time">${item.time}'</span>
                </div>
                <h2 class="card-title">${item.title}</h2>
                <p class="card-description">${item.description}</p>
            </div>
            <div class="card-footer">
                <div class="price">
                    <span class="price-label">Prezzo</span>
                    <span class="price-amount">€ ${item.price.toFixed(2)} a persona</span>
                    <span class="price-note">${item.note}</span>
                </div>
                <a href="${item.link}" target="_blank" class="link">Dettagli</a>
            </div>
        `;
        return el;
    };

    const render = async () => {
        const data = await fetchdata();
        data.forEach((item) => {
            const el = card(item);
            section.appendChild(el);
        });
    };

    render();
});