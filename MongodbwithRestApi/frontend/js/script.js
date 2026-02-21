const API_URL = "http://localhost:5000/api/products";

const productTable = document.getElementById("productTable");
const form = document.getElementById("productForm");


async function fetchProducts() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        productTable.innerHTML = "";

        if (data.length === 0) {
            productTable.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No products found</td></tr>';
            return;
        }

        data.forEach(product => {
            productTable.innerHTML += `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.brand}</td>
                    <td>₹${product.price}</td>
                    <td>${product.inventory?.stock || 0}</td>
                    <td>${product.inventory?.warehouse || "-"}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="deleteProduct('${product.sku}')">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        productTable.innerHTML = '<tr><td colspan="6" class="text-center text-danger">Error loading products</td></tr>';
    }
}


form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newProduct = {
        name: document.getElementById("name").value,
        brand: document.getElementById("brand").value,
        sku: document.getElementById("sku").value,
        price: Number(document.getElementById("price").value),
        inventory: {
            stock: Number(document.getElementById("stock").value),
            warehouse: document.getElementById("warehouse").value
        }
    };

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct)
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Failed to add product");
        }

        await fetchProducts();
        form.reset();
        
       
        const modal = bootstrap.Modal.getInstance(document.getElementById("productModal"));
        if (modal) modal.hide();

        showAlert("Product added successfully!", "success");
    } catch (error) {
        console.error("Error adding product:", error);
        showAlert(`Error: ${error.message}`, "danger");
    }
});


async function deleteProduct(sku) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
        const res = await fetch(`${API_URL}/${sku}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Failed to delete product");
        }

        await fetchProducts();
        showAlert("Product deleted successfully!", "success");
    } catch (error) {
        console.error("Error deleting product:", error);
        showAlert(`Error: ${error.message}`, "danger");
    }
}


function showAlert(message, type) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = "alert";
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector(".container");
    container.insertBefore(alertDiv, container.firstChild);

    setTimeout(() => alertDiv.remove(), 5000);
}


document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});