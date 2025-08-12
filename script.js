
// alert box functionality
     document.addEventListener('DOMContentLoaded', function() {
            // Show the newsletter alert after 3 seconds
            setTimeout(function() {
                document.getElementById('newsletter-alert').classList.remove('hidden');
            }, 3000);

            // Subscribe Now button
            document.getElementById('subscribe-now-btn').addEventListener('click', function() {
                // Hide the alert
                document.getElementById('newsletter-alert').classList.add('hidden');
                
                // Scroll to the subscription form
                document.getElementById('subscription-form').scrollIntoView({ behavior: 'smooth' });
                
                // Optional: Focus on the first input field
                setTimeout(function() {
                    document.getElementById('name').focus();
                }, 800);
            });

            // Ask Me Later button
            document.getElementById('ask-later-btn').addEventListener('click', function() {
                document.getElementById('newsletter-alert').classList.add('hidden');
                
                // Could set a cookie/localStorage to remember the user's choice
                localStorage.setItem('newsletter_asked', 'true');
            });

            // // Form submission
            // document.getElementById('subscription-form').addEventListener('submit', function(e) {
            //     e.preventDefault();
                
            //     const name = document.getElementById('name').value;
            //     const email = document.getElementById('email').value;
                
            //     // In a real application, you would send this data to your server
            //    // console.log('Subscription submitted:', { name, email });
                
            //     // Show a success message (in a real app)
            //     //alert('Thank you for subscribing to our newsletter!');
                
            //     // Reset the form
            //     this.reset();
            // });
        });
    



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

        // // Form submission
        // const inquiryForm = document.getElementById('inquiryForm');
        
        // inquiryForm.addEventListener('submit', (e) => {
        //     e.preventDefault();
            
        //     // In a real implementation, you would send this data to a server
        //     // For now, just show an alert
        //     alert('Thank you for your your interest in T-Prime. Our team lead will contact you shortly.');
        //     inquiryForm.reset();
        // });

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
