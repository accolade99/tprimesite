    // Alert Dialog Functionality
function showCustomDialog(message) {
  const dialog = document.getElementById('dialog');
  dialog.innerHTML = `<h2>FREE 5-DAY EMAIL COURSE!</h2><p>${message}</p><button onclick="hideDialog()">OK</button>`;
  dialog.style.display = 'block';
}

function hideDialog() {
  const dialog = document.getElementById('dialog');
  dialog.style.display = 'none';
}

// Show the dialog automatically after 3 seconds
window.onload = function() {
  setTimeout(function() {
    showCustomDialog('FINANCE FOR FOUNDERS. 5 days to take control of your business numbers- like a CFO.<br>Sign up now to get started!');
  }, 3000);
};

        // Mobile Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });

        // Testimonial Slider
        const testimonialsContainer = document.querySelector('.testimonials-container');
        const dots = document.querySelectorAll('.slider-dot');
        const testimonials = document.querySelectorAll('.testimonial');
        let currentIndex = 0;

        // Initialize dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });

        function updateSlider() {
            testimonialsContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update active dot
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        }

        // Auto slide every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateSlider();
        }, 10000);

        // Form submission
        const inquiryForm = document.getElementById('inquiryForm');
        
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // In a real implementation, you would send this data to a server
            // For now, just show an alert
            alert('Thank you for contacting T-Prime! Our team lead will contact you shortly.');
            inquiryForm.reset();
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking a link
                navMenu.classList.remove('active');
            });
        });

        // CTA button in hero section scrolls to admission section
        document.querySelector('.hero .cta-button').addEventListener('click', () => {
            document.querySelector('#admission').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        });

        // Initialize animation for elements as they come into view
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.feature-card, .about-image, .about-text, .admission-form, .footer-column');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if(elementPosition < windowHeight - 100) {
                    element.style.opacity = '1';
                }
            });
        };

        // Add initial opacity to animatable elements
        const elementsToAnimate = document.querySelectorAll('.feature-card, .about-image, .about-text, .admission-form, .footer-column');
        elementsToAnimate.forEach(element => {
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.6s ease-in-out, transform 0.4s ease-in-out';
        });

        // Run animation check on load and scroll
        window.addEventListener('load', animateOnScroll);
        window.addEventListener('scroll', animateOnScroll);


