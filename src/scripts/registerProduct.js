const selectCategory = document.getElementById("categorySel");

const productSelect = document.getElementById("productSelect");
const productList = document.getElementById("productList");

const button = document.getElementById("registerButton");
const form = document.getElementById("productForm");

const selectedProducts = new Map();

selectCategory.addEventListener("change", (event) => {
    renderCategory(event.target.value);
});

productSelect.addEventListener("change", () => {
    const productId = productSelect.value;
    const productName = productSelect.options[productSelect.selectedIndex].text;

    if (!productId || selectedProducts.has(productId)) {
        productSelect.value = "";
        return;
    }

    selectedProducts.set(productId, 1);

    const item = document.createElement("div");
    item.classList.add("product-item");
    item.dataset.id = productId;

    item.innerHTML = `
        <span>${productName}</span>
        <input type="hidden" value="${productId}">
        <input 
            type="number" 
            class="qtt_ipt" 
            placeholder="Quantidade" 
            min="1"
            value="1"
        >
        <button type="button" class="remove">✕</button>
    `;

    const quantityInput = item.querySelector(".qtt_ipt");

    quantityInput.addEventListener("input", () => {
        const value = parseInt(quantityInput.value) || 1;
        selectedProducts.set(productId, value);
    });

    item.querySelector(".remove").addEventListener("click", () => {
        selectedProducts.delete(productId);
        item.remove();
    });

    productList.appendChild(item);
    productSelect.value = "";
})

async function renderCategory(value) {
    let companies = ''; let products = '';
    let dataCpn; let dataPrd;

    const product = document.getElementById('productSelect');
    const company = document.getElementById('company');
    if (value == "") {
        return
    }
    else if (value == "EPI") {
        dataCpn = await listCompanies("CLIENT");
        dataPrd = await listProducts("EPI");
    } else {
        dataCpn = await listCompanies("SUPPLIER");
        dataPrd = await listProducts("EXPENSES");
    }

    for (let i = 0; i < dataCpn.length; i++) {
        companies += `<option value="${dataCpn[i].name}">${dataCpn[i].name}</option>`
    }

    for (let i = 0; i < dataPrd.length; i++) {
        products += `<option value="${dataPrd[i].prod_desc}">${dataPrd[i].prod_desc}</option>`
    }

    product.innerHTML = `
        <option value="">Selecione</option>
        ${products}
    `;

    company.innerHTML = `
        <option value="">Selecione</option>
        ${companies}
    `;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formList = ["company", "nf", "icms", "price", "date", "duedate", "order"]
    const formAppend = ["partner", "nf_number", "icms_price", "price", "issue_date", "due_date", "order_number"]

    const formData = new FormData(form);
    const newFormData = new FormData();

    let apiCheck = true;

    for (let i = 0; i < formList.length; i++) {
        const formValue = formData.get(formList[i]);
        newFormData.append(formAppend[i],
            formList[i] == "icms" || formList[i] == "price" ? Number(formValue) : formValue);
    }

    newFormData.append("dplbol", tinyintSql(formData.get("duplbol")));
    newFormData.append("payment", tinyintSql(formData.get("payment")));
    newFormData.append("quantity", nullSql(formData.get("quantity")));

    console.log(newFormData)

    try {
        const resp = await registerNf(newFormData);
        if (resp.error) {
            showNotification("Erro ao cadastrar a nota fiscal.", "error");
            apiCheck = false;
        }
    } catch (error) {
        showNotification("Erro ao cadastrar a nota fiscal.", "error");
        apiCheck = false;
        console.error(error);
    }

    for (const [key, qtt] of selectedProducts) {
        let productData = {
            nf: formData.get("nf"),
            productName: key,
            productQtt: qtt
        }

        try {
            const resp = await registerNfitem(productData)
            if (resp.error) {
                showNotification("Erro ao cadastrar o produto.", "error");
                apiCheck = false;
            }
        } catch (error) {
            showNotification("Erro ao cadastrar o produto.", "error");
            apiCheck = false;
            console.error(error);
        }
    }

    if (apiCheck == true) {
        showNotification("Produto cadastrado com sucesso!", "success");
        selectedProducts.clear();
        form.reset();
        productList.innerHTML = ``;
    }
});

function tinyintSql(data) {
    return data == "OK" ? 1 : 0;
}

function nullSql(data) {
    return data == "" ? Number(data) : data;
}