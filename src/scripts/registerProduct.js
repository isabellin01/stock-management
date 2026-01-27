const selectCategory = document.getElementById("categorySel");
const button = document.getElementById("registerButton");
const form = document.getElementById("productForm");

selectCategory.addEventListener("change", (event) => {
    renderCategory(event.target.value);
});

async function renderCategory(value) {
    let companies = '';
    let products = '';

    const field = document.getElementById('dynamicFields');
    if (value == "EPI") {
        let dataCpn = await listCompanies("CLIENT");
        let dataPrd = await listProducts("EPI");

        for (let i = 0; i < dataCpn.length; i++) {
            companies += `<option value="${dataCpn[i].name}">${dataCpn[i].name}</option>`
        }

        for (let i = 0; i < dataPrd.length; i++) {
            products += `<option value="${dataPrd[i].prod_desc}">${dataPrd[i].prod_desc}</option>`
        }

        field.innerHTML = `
        <div class="fieldExpenses">
            <div class="field dynfield">
                <label>Produto</label>
                <select required name="product">
                    <option value="">Selecione</option>
                    ${products}
                </select>
                <label>CA</label>
                <input type="text" name="ca" required>
            </div>
        `;
    } else if (value == "EXPENSE") {
        let dataCpn = await listCompanies("CLIENT");
        let dataPrd = await listProducts("EXPENSES");

        for (let i = 0; i < dataCpn.length; i++) {
            companies += `<option value="${dataCpn[i].name}">${dataCpn[i].name}</option>`
        }

        for (let i = 0; i < dataPrd.length; i++) {
            products += `<option value="${dataPrd[i].prod_desc}">${dataPrd[i].prod_desc}</option>`
        }

        field.innerHTML = `
        <div class="fieldExpenses">
            <div class="field" id="dynfield">
                <label>Produto</label>
                <select name="product" required>
                    <option value="">Selecione</option>
                    ${products}
                </select>
            </div>
        `;
    } else {
        return
    }
    field.innerHTML += `
        <div class="field dynfield">
            <label>Emissão</label>
            <input type="date" name="date" required>
            <label>Nota Fiscal</label>
            <input type="text" name="nf" required>
        </div>

        <div class="field dynfield">
            <label>Empresa</label>
            <select required name="company">
                <option value="">Selecione</option>
                ${companies}
            </select>
            <label>Quantidade</label>
            <input type="number" name="quantity" required>
        </div>

        <div class="field dynfield">
            <label>ICMS</label>
            <input type="number" name="icms" required>
            <label>Valor</label>
            <input type="number" name="price" required>
        </div>

        <div class="field dynfield">
            <label>Vencimento</label>
            <input type="date" name="duedate" required>
            <label>Dupl./Boleto</label>
            <select name="duplbol">
                <option value="">Selecione</option>
                <option value="OK">OK</option>
            </select>
        </div>
        
        <div class="field dynfield">
            <label>Pagamento</label>
            <select name="payment">
                <option value="">Selecione</option>
                <option value="OK">OK</option>
            </select>
            <label>N. Pedido</label>
            <input type="text" name="order" required>
        </div>
        <button type="submit">Cadastrar Produto</button>
    </div>
    `;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const newFormData = new FormData();

    const dplbolData = tinyint(formData.get("duplbol"))
    const paymentData = tinyint(formData.get("payment"))

    newFormData.append("product", formData.get("product"));
    newFormData.append("partner", formData.get("company"));
    newFormData.append("nf_number", formData.get("nf"));
    newFormData.append("icms_price", formData.get("icms"));
    newFormData.append("issue_date", formData.get("date"));
    newFormData.append("due_date", formData.get("duedate"));
    newFormData.append("order_number", formData.get("order"));
    newFormData.append("dplbol", dplbolData);
    newFormData.append("payment", paymentData);
    for(item of newFormData){
        console.log(item[0], item[1])
    }
    const resp = registerProd(newFormData)
    console.log(resp)
});

function tinyint(data) {
    const resp = data == "OK" ? 1 : 0;
    return resp;
}