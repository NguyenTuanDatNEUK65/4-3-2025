document.addEventListener("DOMContentLoaded", function () {
    fetch("menu.json")
        .then(response => response.json())
        .then(data => {
            Object.keys(data.menu).forEach(category => {
                loadMenuItems(data.menu[category], category);
            });
        })
        .catch(error => console.error("Lỗi tải JSON:", error));
});

function loadMenuItems(items, sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const container = section.querySelector(".categories");
    if (!container) return;

    container.innerHTML = ""; // Xóa nội dung cũ nếu có

    items.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.onclick = () => showProductDetail(item, sectionId); // Thêm sự kiện onclick

        const img = document.createElement("img");
        img.src = `images/${item.image}`; // Đảm bảo đường dẫn đúng
        img.alt = item.name;

        const p = document.createElement("p");
        p.textContent = item.name;

        div.appendChild(img);
        div.appendChild(p);
        container.appendChild(div);
    });
}

function showProductDetail(item, category) {
    // Ẩn danh sách sản phẩm
    document.getElementById("coffee").style.display = "none";
    document.getElementById("tea").style.display = "none";

    // Hiển thị chi tiết sản phẩm
    document.getElementById("product-detail").style.display = "block";
    document.getElementById("product-name").textContent = item.name;
    document.getElementById("product-image").src = `images/${item.image}`;
    document.getElementById("product-description").textContent = item.description;
}

function closeProductDetail() {
    // Quay lại danh sách sản phẩm
    document.getElementById("coffee").style.display = "block";
    document.getElementById("tea").style.display = "block";

    // Ẩn chi tiết sản phẩm
    document.getElementById("product-detail").style.display = "none";
}
