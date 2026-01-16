// =======================
// MÊS ATUAL + DROPDOWN
// =======================
const months = [
    "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
];

const now = new Date();
const currentMonthIndex = now.getMonth();
const year = String(now.getFullYear()).slice(-2);

const currentMonthEl = document.getElementById("currentMonth");
const monthList = document.getElementById("monthList");
const monthBtn = document.getElementById("monthBtn");

currentMonthEl.textContent = `${months[currentMonthIndex]} ${year}`;

// meses anteriores
for (let i = currentMonthIndex - 1; i >= 0; i--) {
    const li = document.createElement("li");
    li.textContent = `${months[i]} ${year}`;
    li.onclick = () => {
        currentMonthEl.textContent = li.textContent;
        monthList.style.display = "none";
    };
    monthList.appendChild(li);
}

// toggle dropdown
monthBtn.addEventListener("click", () => {
    monthList.style.display =
        monthList.style.display === "block" ? "none" : "block";
});

// =======================
// TABELA DINÂMICA (mock)
// =======================
const stockData = [
    { epi: "Capacete", ca: "12345", inicio: 50, fim: 30 },
    { epi: "Luva", ca: "67890", inicio: 100, fim: 80 },
    { epi: "Óculos", ca: "11223", inicio: 40, fim: 25 }
];

const stockBody = document.getElementById("stockBody");

stockData.forEach(item => {
    const estoqueTotal = item.inicio - item.fim;

    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${item.epi}</td>
        <td>${item.ca}</td>
        <td>${item.inicio}</td>
        <td>${item.fim}</td>
        <td>${estoqueTotal}</td>
    `;
    stockBody.appendChild(tr);
});
