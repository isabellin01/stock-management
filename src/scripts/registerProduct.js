const selectCategory = document.getElementById("categorySel");

const productSelect = document.getElementById("productSelect");
const productList = document.getElementById("productList");

const button = document.getElementById("registerButton");
const form = document.getElementById("productForm");

const selectedProducts = new Set();

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

    selectedProducts.add(productId);

    const item = document.createElement("div");
    item.classList.add("product-item");
    item.dataset.id = productId;

    item.innerHTML = `
        <span>${productName}</span>
        <input type="hidden" name="products[]" value="${productId}">
        <button type="button" class="remove">✕</button>
    `;

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

    const formList = ["product", "company", "nf", "icms", "date", "duedate", "order"]
    const formAppend = ["product", "partner", "nf_number", "icms_price", "issue_date", "due_date", "order_number"]

    const formData = new FormData(form);
    const newFormData = new FormData();

    const dplbolData = tinyint(formData.get("duplbol"))
    const paymentData = tinyint(formData.get("payment"))

    for (let i = 0; i < formList.length; i++) {
        newFormData.append(formAppend[i], formData.get(formList[i]));
    }

    newFormData.append("dplbol", dplbolData);
    newFormData.append("payment", paymentData);

    try {
        const resp = await registerProd(newFormData);

        if (resp.success) {
            showNotification("Produto cadastrado com sucesso!", "success");
            form.reset();
        } else {
            showNotification("Erro ao cadastrar o produto.", "error");
        }
    } catch (error) {
        showNotification("Erro ao cadastrar o produto.", "error");
        console.error(error);
    }
});

function tinyint(data) {
    return data == "OK" ? 1 : 0;
}