document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. STICKY HEADER EFFECT
       ========================================== */
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================
       2. MOBILE BURGER MENU
       ========================================== */
    const burgerBtn = document.getElementById('burger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        burgerBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    burgerBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* ==========================================
       3. INTERACTIVE TATTOO CALCULATOR
       ========================================== */
    const calcBoxes = document.querySelectorAll('.calc-opt-box');
    const calcPriceEl = document.getElementById('calc-price');
    const calcTimeEl = document.getElementById('calc-time');

    let selectedSizePrice = 8000;
    let selectedSizeTime = '2-3 часа';
    let selectedStyleMultiplier = 1.0;
    let selectedCoverupPrice = 0;

    const calculatePrice = () => {
        const finalPrice = Math.round((selectedSizePrice * selectedStyleMultiplier) + selectedCoverupPrice);
        
        // Format price with spaces (e.g., 18 500)
        calcPriceEl.textContent = finalPrice.toLocaleString('ru-RU');
        calcTimeEl.textContent = selectedSizeTime;
    };

    calcBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const category = box.getAttribute('data-name');
            
            // Remove active class from sibling boxes
            document.querySelectorAll(`.calc-opt-box[data-name="${category}"]`).forEach(sibling => {
                sibling.classList.remove('active');
            });
            
            // Add active class to clicked box
            box.classList.add('active');

            // Update variables based on selected option
            if (category === 'size') {
                selectedSizePrice = parseFloat(box.getAttribute('data-price'));
                selectedSizeTime = box.getAttribute('data-time');
            } else if (category === 'style') {
                selectedStyleMultiplier = parseFloat(box.getAttribute('data-multiplier'));
            } else if (category === 'coverup') {
                selectedCoverupPrice = parseFloat(box.getAttribute('data-add'));
            }

            // Recalculate
            calculatePrice();
        });
    });

    /* ==========================================
       4. BOOKING FORM HANDLING & SIMULATED AJAX
       ========================================== */
    const bookingForm = document.getElementById('booking-form');
    const formSuccess = document.getElementById('form-success');
    const resetFormBtn = document.getElementById('reset-form-btn');
    const submitBtn = document.getElementById('submit-btn');

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state on button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка зова...';

        // Simulate network request (500ms)
        setTimeout(() => {
            bookingForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');
            
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить зов';
            bookingForm.reset();
            
            // Scroll to the contact section so success message is visible
            document.getElementById('contacts').scrollIntoView({ behavior: 'smooth' });
        }, 800);
    });

    resetFormBtn.addEventListener('click', () => {
        formSuccess.classList.add('hidden');
        bookingForm.classList.remove('hidden');
        
        // Reset select dropdown custom style
        const select = document.getElementById('tattoo-style');
        select.value = "";
    });

    /* ==========================================
       5. SMOOTH NAVIGATION LINK HIGHLIGHTING
       ========================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});
