
/*
=================================================
? => Mobile Navbar
=================================================
*/


document.addEventListener('DOMContentLoaded', function () {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navbar = document.getElementById('navbar');

    if (!mobileNavToggle || !navbar) return;

    // Initialize mobile nav state
    let isMobileNavOpen = false;

    // Toggle mobile navigation
    function toggleMobileNav() {
        isMobileNavOpen = !isMobileNavOpen;

        if (isMobileNavOpen) {
            // Open mobile nav
            navbar.style.display = 'block';
            mobileNavToggle.classList.remove('bi-list');
            mobileNavToggle.classList.add('bi-x');

            // Add active class to body for mobile styles
            document.body.classList.add('mobile-nav-active');
        } else {
            // Close mobile nav
            navbar.style.display = 'none';
            mobileNavToggle.classList.remove('bi-x');
            mobileNavToggle.classList.add('bi-list');

            // Remove active class from body
            document.body.classList.remove('mobile-nav-active');

            // Close all dropdowns when closing mobile nav
            closeAllDropdowns();
        }
    }

    // Function to close all dropdowns
    function closeAllDropdowns() {
        // Remove active classes from all dropdowns
        const allDropdowns = navbar.querySelectorAll('.dropdown, .myList');
        allDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });

        // Reset all dropdown indicators
        const allIndicators = navbar.querySelectorAll('.dropdown-indicator');
        allIndicators.forEach(indicator => {
            indicator.classList.remove('bi-chevron-up');
            indicator.classList.add('bi-chevron-down');
        });

        // Reset all ul dropdown states
        const allInnerDropdowns = navbar.querySelectorAll('#inner-down, .hidden');
        allInnerDropdowns.forEach(dropdown => {
            dropdown.classList.remove('dropdown-active');
            dropdown.classList.add('dropdown-deactive');
            dropdown.style.display = 'none';
        });

        // Reset all link states
        const allLinks = navbar.querySelectorAll('a');
        allLinks.forEach(link => {
            link.classList.remove('active');
            link.classList.add('deactive');
        });
    }

    // Function to handle main dropdown click (Services)
    function handleMainDropdownClick(e) {
        e.preventDefault();
        e.stopPropagation();

        const parentLi = this.closest('.dropdown');
        parentLi.classList.toggle('active');

        // Toggle dropdown indicator icon
        const indicator = this.querySelector('.dropdown-indicator');
        if (indicator) {
            indicator.classList.toggle('bi-chevron-down');
            indicator.classList.toggle('bi-chevron-up');
        }

        // Main Services dropdown
        const innerDown = document.getElementById('inner-down');
        if (innerDown) {
            if (innerDown.classList.contains('dropdown-deactive')) {
                innerDown.classList.remove('dropdown-deactive');
                innerDown.classList.add('dropdown-active');
                innerDown.style.display = 'block';
            } else {
                innerDown.classList.remove('dropdown-active');
                innerDown.classList.add('dropdown-deactive');
                innerDown.style.display = 'none';
            }
        }

        // Toggle active class on the link
        this.classList.toggle('active');
        this.classList.toggle('deactive');
    }

    // Function to handle nested dropdown click (Corporate Catering, Industrial Bakery, Event Catering)
    function handleNestedDropdownClick(e) {
        e.preventDefault();
        e.stopPropagation();

        const parentLi = this.closest('.myList');
        parentLi.classList.toggle('active');

        // Toggle dropdown indicator icon
        const indicator = this.querySelector('.dropdown-indicator');
        if (indicator) {
            indicator.classList.toggle('bi-chevron-down');
            indicator.classList.toggle('bi-chevron-up');
        }

        // Find and toggle the child ul
        const childUl = parentLi.querySelector('ul.hidden');
        if (childUl) {
            if (childUl.style.display === 'block' || childUl.style.display === '') {
                childUl.style.display = 'none';
                childUl.classList.add('hidden');
            } else {
                childUl.style.display = 'block';
                childUl.classList.remove('hidden');
            }
        }
    }

    // Add click event to mobile nav toggle
    mobileNavToggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileNav();
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function (e) {
        if (isMobileNavOpen &&
            !navbar.contains(e.target) &&
            !mobileNavToggle.contains(e.target)) {
            toggleMobileNav();
        }
    });

    // Handle main Services dropdown click
    const mainDropdownToggle = navbar.querySelector('#down');
    if (mainDropdownToggle) {
        mainDropdownToggle.addEventListener('click', function (e) {
            if (window.innerWidth < 1280) { // Mobile only
                handleMainDropdownClick.call(this, e);
            }
        });
    }

    // Handle nested dropdown clicks (Corporate Catering, Industrial Bakery, Event Catering)
    const nestedDropdownToggles = navbar.querySelectorAll('.myList > a');
    nestedDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            if (window.innerWidth < 1280) { // Mobile only
                handleNestedDropdownClick.call(this, e);
            }
        });
    });

    // Handle regular link clicks (non-dropdown links)
    const regularLinks = navbar.querySelectorAll('a:not([id="down"]):not(.myList > a)');
    regularLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth < 1280 && isMobileNavOpen) {
                toggleMobileNav();
            }
        });
    });

    // Window resize handler
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (window.innerWidth >= 1280) {
                // Reset to desktop view
                isMobileNavOpen = false;
                navbar.style.display = '';
                mobileNavToggle.classList.remove('bi-x');
                mobileNavToggle.classList.add('bi-list');
                document.body.classList.remove('mobile-nav-active');
                closeAllDropdowns();
            } else {
                // On mobile, ensure navbar is hidden by default
                if (!isMobileNavOpen) {
                    navbar.style.display = 'none';
                }
            }
        }, 250);
    });

    // Initialize mobile view
    if (window.innerWidth < 1280) {
        navbar.style.display = 'none';

        // Set initial states for dropdowns
        const innerDown = document.getElementById('inner-down');
        if (innerDown) {
            innerDown.style.display = 'none';
            innerDown.classList.add('dropdown-deactive');
            innerDown.classList.remove('dropdown-active');
        }

        // Hide all nested dropdowns
        const nestedDropdowns = navbar.querySelectorAll('.myList > ul');
        nestedDropdowns.forEach(dropdown => {
            dropdown.style.display = 'none';
            dropdown.classList.add('hidden');
        });
    }
});