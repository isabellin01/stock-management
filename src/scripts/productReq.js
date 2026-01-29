async function registerNf(formData) {
    const data = Object.fromEntries(formData.entries());
    try {
        const resp = await fetch(`http://localhost:3000/api/registerNf`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        );
        return await resp.json();
    } catch (error) {
        console.error('Error registering product:', error);
    }
}

async function registerNfitem(data) {
    try {
        const resp = await fetch(`http://localhost:3000/api/registerNfitem`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        );
        return await resp.json();
    } catch (error) {
        console.error('Error registering product:', error);
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

async function listProducts(type) {
    try {
        const resp = await fetch(`http://localhost:3000/api/listProducts`,
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
        console.error('Error listing products:', error);
    }
}


