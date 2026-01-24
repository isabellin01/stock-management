async function registerExp(type) {
    try {
        const resp = await fetch(`http://localhost:3000/api/listCompanies`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type })
            }
        );
        return await resp.json();
    } catch (error) {
        console.error('Error registering expenses:', error);
    }
}

async function listCompanies(type) {
    try {
        const resp = await fetch(`http://localhost:3000/api/listCompanies`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type })
            }
        );
        return await resp.json();
    } catch (error) {
        console.error('Error listing companies:', error);
    }
}

async function category(value) {
    let companies = '';

    const field = document.getElementById('dynamicFields');
    if (value == "EPI") {
        let data = await listCompanies("CLIENT");
        for (let i = 0; i < data.length; i++) {
            companies += `
            <option value="${data[i].name}">${data[i].name}</option>
        `
        }

        field.innerHTML = `
        <div id="fieldExpenses" class="fieldExpenses">
            <div class="field dynfield" id="dynfield">
                <label>Produto</label>
                <input type="text" id="nameExpense" required>
                <label>CA</label>
                <input type="text" id="ca">
            </div>
        `;
    } else if (value == "EXPENSE") {
        let data = await listCompanies("SUPPLIER");
        for (let i = 0; i < data.length; i++) {
            companies += `
            <option value="${data[i].name}">${data[i].name}</option>
        `
        }

        field.innerHTML = `
        <div id="fieldExpenses" class="fieldExpenses">
            <div class="field" id="dynfield">
                <label>Produto</label>
                <input type="text" id="nameExpense" required>
            </div>
        `;
    }
    field.innerHTML += `
        <div class="field dynfield" id="dynfield">
            <label>Emissão</label>
            <input type="date" id="issuedtExpense" required>
            <label>Nota Fiscal</label>
            <input type="text" id="nfExpense" required>
        </div>

        <div class="field dynfield" id="dynfield">
            <label>Empresa</label>
            <select id="firmExpense" required>
                <option value="">Selecione</option>
                ${companies}
            </select>
            <label>Quantidade</label>
            <input type="number" id="qttExpense">
        </div>

        <div class="field dynfield" id="dynfield">
            <label>ICMS</label>
            <input type="number" id="icmsExpense" required>
            <label>Valor</label>
            <input type="number" id="valueExpense" required>
        </div>

        <div class="field dynfield" id="dynfield">
            <label>Vencimento</label>
            <input type="date" id="duedtExpense" required>
            <label>Dupl./Boleto</label>
            <select id="duplbolExpense" required>
                <option value="">Selecione</option>
                <option value="OK">OK</option>
            </select>
        </div>
        
        <div class="field dynfield" id="dynfield">
            <label>Pagamento</label>
            <select id="pagtoExpense" required>
                <option value="">Selecione</option>
                <option value="OK">OK</option>
            </select>
            <label>N. Pedido</label>
            <input type="text" id="orderExpense" required>
        </div>

    </div>
    `;
}

