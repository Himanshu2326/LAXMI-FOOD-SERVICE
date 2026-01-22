// FAQ Accordion Functionality - Universal for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ accordion
    initFaqAccordion();
    
    // Also handle old MUI accordion structure if present
    initMuiAccordion();
});

function initFaqAccordion() {
    const faqContainers = document.querySelectorAll('.faq-accordion');
    
    if (faqContainers.length === 0) return;
    
    faqContainers.forEach(container => {
        const faqItems = container.querySelectorAll('.faq-item');
        
        // Open first FAQ item by default
        if (faqItems.length > 0) {
            const firstItem = faqItems[0];
            openFaqItem(firstItem);
        }
        
        // Add click event to all FAQ questions
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // If clicked item is already active, close it
                    if (item.classList.contains('active')) {
                        closeFaqItem(item);
                    } else {
                        // Close all other FAQ items
                        faqItems.forEach(otherItem => {
                            if (otherItem !== item && otherItem.classList.contains('active')) {
                                closeFaqItem(otherItem);
                            }
                        });
                        
                        // Open clicked item
                        openFaqItem(item);
                    }
                });
            }
        });
    });
    
    // Adjust height on window resize
    window.addEventListener('resize', function() {
        document.querySelectorAll('.faq-item.active').forEach(item => {
            const answer = item.querySelector('.faq-answer');
            if (answer) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

function openFaqItem(item) {
    item.classList.add('active');
    const answer = item.querySelector('.faq-answer');
    if (answer) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity = '1';
        answer.style.paddingTop = '0';
    }
}

function closeFaqItem(item) {
    item.classList.remove('active');
    const answer = item.querySelector('.faq-answer');
    if (answer) {
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        answer.style.paddingTop = '0';
    }
}

function initMuiAccordion() {
    // This function handles old MUI accordion structure
    const muiQuestions = document.querySelectorAll('.MuiAccordionSummary-root');
    
    if (muiQuestions.length === 0) return;
    
    muiQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const accordion = this.closest('.MuiAccordion-root');
            const collapse = accordion.querySelector('.MuiCollapse-root');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle aria-expanded
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle collapse classes
            if (!isExpanded) {
                collapse.classList.remove('MuiCollapse-hidden');
                collapse.classList.add('MuiCollapse-entered');
                
                // Rotate icon
                const icon = this.querySelector('.MuiAccordionSummary-expandIconWrapper svg');
                if (icon) {
                    icon.style.transform = 'rotate(180deg)';
                }
            } else {
                collapse.classList.remove('MuiCollapse-entered');
                collapse.classList.add('MuiCollapse-hidden');
                
                // Rotate icon back
                const icon = this.querySelector('.MuiAccordionSummary-expandIconWrapper svg');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });
}

// Optional: Add keyboard accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.closest('.faq-question')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
});