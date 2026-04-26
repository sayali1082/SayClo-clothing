// ===================================
// SayClo - Interactive Frontend Script
// ===================================

document.addEventListener("DOMContentLoaded", () => {

    /* ===================================
       Mobile Navigation
    =================================== */

    const hamburgerBtn = document.getElementById("hamburger");
    const navigationMenu = document.getElementById("navMenu");

    if (hamburgerBtn && navigationMenu) {

        // Toggle mobile menu
        hamburgerBtn.addEventListener("click", () => {
            hamburgerBtn.classList.toggle("active");
            navigationMenu.classList.toggle("active");
        });

        // Close menu when a link is clicked
        navigationMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                hamburgerBtn.classList.remove("active");
                navigationMenu.classList.remove("active");
            });
        });
    }


    /* ===================================
       Smooth Scrolling
    =================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId !== "#" && targetId.length > 1) {
                e.preventDefault();

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: "smooth"
                    });
                }
            }
        });
    });


    /* ===================================
       Shop Page Filtering
    =================================== */

    const ageFilterButtons = document.querySelectorAll(".filter-btn");
    const categoryFilterButtons = document.querySelectorAll(".category-btn");
    const allProductCards = document.querySelectorAll(".product-card");

    let selectedAge = "all";
    let selectedCategory = "all";

    function applyFilters() {
        allProductCards.forEach(card => {

            const cardAge = card.dataset.age;
            const cardCategory = card.dataset.category;

            const matchesAge =
                selectedAge === "all" || cardAge === selectedAge;

            const matchesCategory =
                selectedCategory === "all" || cardCategory === selectedCategory;

            if (matchesAge && matchesCategory) {
                card.style.display = "block";
                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "scale(1)";
                }, 10);
            } else {
                card.style.opacity = "0";
                card.style.transform = "scale(0.8)";
                setTimeout(() => {
                    card.style.display = "none";
                }, 300);
            }
        });
    }

    // Age filter click
    ageFilterButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            ageFilterButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            selectedAge = this.dataset.filter;
            applyFilters();
        });
    });

    // Category filter click
    categoryFilterButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            categoryFilterButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            selectedCategory = this.dataset.category;
            applyFilters();
        });
    });


    /* ===================================
       Add To Cart
    =================================== */

    const addToCartBtns = document.querySelectorAll(".product-card .btn-sm");
    const shoppingBagIcon = document.querySelector(".nav-icons .fa-shopping-bag");

    let cartItemCount = 0;

    function updateCartBadge() {
        if (!shoppingBagIcon) return;

        const wrapper = shoppingBagIcon.parentElement;
        const existingBadge = wrapper.querySelector(".cart-badge");

        if (existingBadge) existingBadge.remove();

        if (cartItemCount > 0) {
            const badge = document.createElement("span");
            badge.className = "cart-badge";
            badge.textContent = cartItemCount;

            badge.style.cssText = `
                position:absolute;
                top:-8px;
                right:-8px;
                background:#ff6b6b;
                color:white;
                border-radius:50%;
                width:20px;
                height:20px;
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:0.7rem;
                font-weight:bold;
            `;

            wrapper.style.position = "relative";
            wrapper.appendChild(badge);
        }
    }

    addToCartBtns.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();

            const card = this.closest(".product-card");
            const productName = card.querySelector("h3").textContent;
            const productPrice = card.querySelector(".product-price").textContent;

            const originalText = this.textContent;
            this.textContent = "Added! ✓";
            this.style.background = "#4caf50";

            alert(`"${productName}" has been added to your cart!\nPrice: ${productPrice}`);

            cartItemCount++;
            updateCartBadge();

            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = "";
            }, 2000);
        });
    });


    /* ===================================
       Newsletter Form
    =================================== */

    const newsletterForm = document.querySelector(".newsletter-form");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const emailValue = emailInput.value.trim();

            if (emailValue) {
                alert(`Thanks for subscribing, ${emailValue}! 🎉`);
                emailInput.value = "";
            }
        });
    }


    /* ===================================
       Contact Form
    =================================== */

    const contactForm = document.getElementById("contactForm");
    const successMessage = document.getElementById("formSuccess");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const name = formData.get("name");
            const email = formData.get("email");
            const subject = formData.get("subject");
            const message = formData.get("message");

            if (name && email && subject && message) {
                contactForm.style.display = "none";
                successMessage.classList.add("show");

                console.log("Contact Form Data:", { name, email, subject, message });

                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = "flex";
                    successMessage.classList.remove("show");
                }, 5000);
            }
        });
    }


    /* ===================================
       Scroll Animations
    =================================== */

    const animatedItems = document.querySelectorAll(
        ".age-card, .collection-card, .feature-card, .product-card, .value-card"
    );

    const scrollObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    animatedItems.forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(30px)";
        item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        scrollObserver.observe(item);
    });


    /* ===================================
       Navbar Shadow on Scroll
    =================================== */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (!navbar) return;

        navbar.style.boxShadow =
            window.pageYOffset > 0
                ? "0 5px 20px rgba(0,0,0,0.1)"
                : "0 2px 10px rgba(0,0,0,0.05)";
    });


    /* ===================================
       Search Placeholder
    =================================== */

    const searchIcon = document.querySelector(".nav-icons .fa-search");

    if (searchIcon) {
        searchIcon.parentElement.addEventListener("click", e => {
            e.preventDefault();
            const query = prompt("What are you looking for?");
            if (query) {
                alert(`Searching for: ${query}\n\nSearch coming soon!`);
            }
        });
    }


    /* ===================================
       Lazy Loading Images
    =================================== */

    const lazyImages = document.querySelectorAll("[data-src]");

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));


    /* ===================================
       Console Greeting
    =================================== */

    console.log("%c Welcome to SayClo! ", "background:#d4a574;color:white;font-size:20px;font-weight:bold;padding:10px;");
    console.log("%c Fashion for Every Generation ", "color:#2d2d2d;font-size:14px;");
});


/* ===================================
   Page Visibility Title Change
=================================== */

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {
        document.title = "Come back to SayClo! 👋";
        return;
    }

    if (window.location.pathname.includes("shop")) {
        document.title = "Shop - SayClo";
    } else if (window.location.pathname.includes("about")) {
        document.title = "About & Contact - SayClo";
    } else {
        document.title = "SayClo - Fashion for Every Generation";
    }
});


/* ===================================
   Back To Top Button
=================================== */

function createBackToTopButton() {

    const button = document.createElement("button");
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = "back-to-top";

    button.style.cssText = `
        position:fixed;
        bottom:30px;
        right:30px;
        width:50px;
        height:50px;
        border-radius:50%;
        background:linear-gradient(135deg,#d4a574,#e8c4a0);
        color:white;
        border:none;
        cursor:pointer;
        display:none;
        align-items:center;
        justify-content:center;
        box-shadow:0 5px 20px rgba(0,0,0,0.2);
        transition:all 0.3s ease;
        z-index:999;
    `;

    button.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.body.appendChild(button);

    window.addEventListener("scroll", () => {
        button.style.display =
            window.pageYOffset > 300 ? "flex" : "none";
    });
}

createBackToTopButton();