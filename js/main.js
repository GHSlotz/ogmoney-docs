// Main JavaScript functionality for the Og Money App Gifting Feature Documentation website

document.addEventListener('DOMContentLoaded', function() {
    // Back to top button functionality
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Sidebar navigation functionality for document pages
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    
    if (sidebarLinks.length > 0) {
        // Add click event to all sidebar links for smooth scrolling
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId.startsWith('#')) {
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        // Smooth scroll to target section
                        window.scrollTo({
                            top: targetElement.offsetTop - 100,
                            behavior: 'smooth'
                        });
                        
                        // Update active link in sidebar
                        sidebarLinks.forEach(link => link.classList.remove('active'));
                        this.classList.add('active');
                    }
                } else {
                    // If it's a regular link to another page, navigate normally
                    window.location.href = targetId;
                }
            });
        });
        
        // Update active sidebar link based on scroll position
        window.addEventListener('scroll', function() {
            // Get all section elements
            const sections = document.querySelectorAll('section[id]');
            
            // Find the section that is currently in view
            let currentSection = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                const sectionHeight = section.offsetHeight;
                
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    currentSection = '#' + section.getAttribute('id');
                }
            });
            
            // Update active link in sidebar
            if (currentSection) {
                sidebarLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === currentSection) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Mobile navigation toggle
    const mobileNavToggle = document.createElement('div');
    mobileNavToggle.className = 'mobile-nav-toggle';
    mobileNavToggle.innerHTML = '☰';
    
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    if (header && nav && window.innerWidth < 768) {
        header.appendChild(mobileNavToggle);
        nav.classList.add('mobile-hidden');
        
        mobileNavToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-hidden');
            this.innerHTML = nav.classList.contains('mobile-hidden') ? '☰' : '✕';
        });
    }
    
    // Add copy functionality for code blocks
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = 'Copy';
        
        block.style.position = 'relative';
        block.appendChild(copyButton);
        
        copyButton.addEventListener('click', function() {
            const code = block.textContent.replace('Copy', '').trim();
            
            navigator.clipboard.writeText(code).then(() => {
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    });
});
