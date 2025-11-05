// Smooth Scroll Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Set Current Year in Footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Character Counter for Message Textarea
const messageTextarea = document.getElementById('message');
const charCount = document.getElementById('charCount');

if (messageTextarea && charCount) {
    messageTextarea.addEventListener('input', function() {
        charCount.textContent = this.value.length;
    });
}

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form
        let isValid = true;
        
        // Name validation
        if (!formData.name) {
            showError('name', 'Name is required');
            isValid = false;
        } else if (formData.name.length < 2) {
            showError('name', 'Name must be at least 2 characters');
            isValid = false;
        } else if (formData.name.length > 100) {
            showError('name', 'Name must be less than 100 characters');
            isValid = false;
        }
        
        // Email validation
        if (!formData.email) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!validateEmail(formData.email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        } else if (formData.email.length > 255) {
            showError('email', 'Email must be less than 255 characters');
            isValid = false;
        }
        
        // Message validation
        if (!formData.message) {
            showError('message', 'Message is required');
            isValid = false;
        } else if (formData.message.length < 10) {
            showError('message', 'Message must be at least 10 characters');
            isValid = false;
        } else if (formData.message.length > 1000) {
            showError('message', 'Message must be less than 1000 characters');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Disable submit button and show loading state
        const submitBtn = document.getElementById('submitBtn');
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span style="animation: spin 1s linear infinite; display: inline-block;">⏳</span> Sending...';
        
        try {
            // Simulate form submission (replace with actual API call)
            await simulateFormSubmission(formData);
            
            // Show success message
            document.querySelector('.contact-form').style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
            
            // Reset form after short delay
            setTimeout(() => {
                contactForm.reset();
                charCount.textContent = '0';
            }, 500);
            
        } catch (error) {
            alert('Something went wrong. Please try again.');
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
        }
    });
}

// Helper Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(fieldName, message) {
    const errorElement = document.getElementById(fieldName + 'Error');
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = message;
    }
    
    if (inputElement) {
        inputElement.classList.add('error');
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(el => el.textContent = '');
    
    const inputElements = document.querySelectorAll('.form-input, .form-textarea');
    inputElements.forEach(el => el.classList.remove('error'));
}

function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            console.log('Form submitted with data:', data);
            // In a real application, you would send this data to your server
            // Example: fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
            resolve();
        }, 1500);
    });
}

// Add scroll animations when elements come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-card, .tech-card, .section-header'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});

// Add spinning animation for loading state
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
