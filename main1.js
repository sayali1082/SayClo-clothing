// SayClo JS

document.addEventListener("DOMContentLoaded", () => {

    // ================= NAVBAR =================
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            hamburger.classList.toggle("active");
        });
    }

    // ================= SMOOTH SCROLL =================
    const links = document.querySelectorAll("a[href^='#']");
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            const id = this.getAttribute("href");
            if (id !== "#") {
                e.preventDefault();
                const section = document.querySelector(id);
                if (section) {
                    window.scrollTo({
                        top: section.offsetTop - 70,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // ================= PRODUCT FILTER =================
    const filterBtns = document.querySelectorAll(".filter-btn");
    const products = document.querySelectorAll(".product-card");

    let activeFilter = "all";

    filterBtns.forEach(btn => {
        btn.addEventListener("click", function () {

            filterBtns.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            activeFilter = this.dataset.filter;

            products.forEach(card => {
                const age = card.dataset.age;

                if (activeFilter === "all" || age === activeFilter) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // ================= ADD TO CART =================
    const cartButtons = document.querySelectorAll(".btn-sm");
    let cartCount = 0;

    cartButtons.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();

            cartCount++;
            alert("Item added to cart!");

            // simple cart badge
            const bag = document.querySelector(".fa-shopping-bag");
            if (bag) {
                bag.setAttribute("data-count", cartCount);
            }
        });
    });

    // ================= CONTACT FORM =================
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = this.name.value;
            const email = this.email.value;
            const message = this.message.value;

            if (name && email && message) {
                alert("Thanks " + name + "! We will contact you soon.");
                this.reset();
            } else {
                alert("Please fill all fields.");
            }
        });
    }

});