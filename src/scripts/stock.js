window.onload = stockTable;

async function apiStockList() {
    try {
        const resp = await fetch('http://localhost:3000/api/listarEstoque');
        const stockData = await resp.json();
        return stockData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function stockTable() {
    let data = await apiStockList();

    for (let i = 0; i < data.length; i++) {
        let color = i % 2 == 0 ? '#F9E8F7' : '';
        let line = `
        <tr id="tr_${i}" style="background-color: ${color};">
            <td>${data[i].stck_desc}</td>
            <td>${data[i].stck_ca}</td>
            <td>${data[i].stck_qtt}</td>
            <td> - </td>
            <td>${data[i].stck_qtt}</td>
        </tr>
        `
        stockBody.innerHTML += line;
    }

    const currentDate = new Date();
    const currentMonthIndex = currentDate.toLocaleString('pt-BR', { month: 'long' });

    currentMonth.innerHTML = currentMonthIndex;
}