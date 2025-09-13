// FarWay Company - Enhanced Header JavaScript
// Professional FMCG e-commerce functionality

class FarWayHeader {
    constructor() {
        this.header = document.getElementById('mainHeader');
        this.mobileToggle = document.getElementById('mobileToggle');
        this.mobileOverlay = document.getElementById('mobileOverlay');
        this.mobileClose = document.getElementById('mobileClose');
        this.searchInput = document.getElementById('searchInput');
        this.searchForm = document.getElementById('searchForm');
        this.searchSuggestions = document.getElementById('searchSuggestions');
        
        this.isScrolled = false;
        this.isMobileMenuOpen = false;
        
        this.init();
    }

    init() {
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupSearch();
        this.setupDropdowns();
        this.setupMobileSubmenus();
        this.setupAnimations();
        
        console.log('🚀 FarWay Header - Professional FMCG Interface Loaded');
        
        // Initialize hero section functionality
        this.initHeroSection();
        
        // Initialize product gallery functionality
        this.initProductGallery();
    }

    // Hero Section Functionality
    initHeroSection() {
        this.setupHeroAnimations();
        this.setupScrollIndicator();
        this.setupStatCounters();
        this.setupProductCards();
    }

    // Product Card Interactions
    setupProductCards() {
        const productCards = document.querySelectorAll('.group.cursor-pointer');
        
        productCards.forEach((card, index) => {
            // Add staggered animation delay
            card.style.animationDelay = `${index * 0.1}s`;
            
            // Click interactions
            card.addEventListener('click', (e) => {
                const productName = card.querySelector('h4')?.textContent || 'Product';
                this.showProductPreview(productName, card);
            });
            
            // Hover effects
            card.addEventListener('mouseenter', () => {
                this.highlightProductCard(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetProductCard(card);
            });
        });
    }

    highlightProductCard(card) {
        // Add glow effect
        card.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.2)';
        
        // Scale up image
        const img = card.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1.1) rotate(5deg)';
        }
        
        // Dim other cards
        const allCards = document.querySelectorAll('.group.cursor-pointer');
        allCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.style.opacity = '0.7';
            }
        });
    }

    resetProductCard(card) {
        // Remove glow effect
        card.style.boxShadow = '';
        
        // Reset image
        const img = card.querySelector('img');
        if (img) {
            img.style.transform = '';
        }
        
        // Reset all card opacity
        const allCards = document.querySelectorAll('.group.cursor-pointer');
        allCards.forEach(otherCard => {
            otherCard.style.opacity = '1';
        });
    }

    showProductPreview(productName, card) {
        // Create a subtle notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-24 right-4 bg-white/95 backdrop-blur-lg rounded-lg p-4 shadow-xl border border-gray-200 z-50 transform translate-x-full transition-transform duration-300';
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <i class="fas fa-box text-white"></i>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-900">${productName}</h4>
                    <p class="text-sm text-gray-600">Click to explore products</p>
                </div>
                <button class="text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(full)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
        
        // Add click ripple effect
        this.addRippleEffect(card, event);
    }

    addRippleEffect(element, event) {
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupHeroAnimations() {
        // Animate hero content on page load
        const heroContent = document.querySelector('.text-white.space-y-8');
        const heroVisual = document.querySelector('.relative.lg\\:block');
        
        if (heroContent) {
            // Add stagger animation to hero elements
            const elements = Array.from(heroContent.children);
            elements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }

        if (heroVisual) {
            // Animate visual elements
            heroVisual.style.opacity = '0';
            heroVisual.style.transform = 'scale(0.8) rotate(-10deg)';
            
            setTimeout(() => {
                heroVisual.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
                heroVisual.style.opacity = '1';
                heroVisual.style.transform = 'scale(1) rotate(0deg)';
            }, 800);
        }
    }

    setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.animate-bounce');
        if (!scrollIndicator) return;

        // Hide scroll indicator when user starts scrolling
        let scrollTimer;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollIndicator.style.opacity = '0.3';
            
            scrollTimer = setTimeout(() => {
                if (window.scrollY < 100) {
                    scrollIndicator.style.opacity = '1';
                }
            }, 1000);

            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            }
        });

        // Smooth scroll to next section when clicked
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('section:nth-child(2)');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    setupStatCounters() {
        const statElements = document.querySelectorAll('.text-3xl.font-bold');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const finalValue = element.textContent;
                    
                    // Extract number from text like "23+", "500+", etc.
                    const match = finalValue.match(/\d+/);
                    if (match) {
                        this.animateCounter(element, 0, parseInt(match[0]), finalValue);
                        observer.unobserve(element);
                    }
                }
            });
        }, observerOptions);

        statElements.forEach(el => observer.observe(el));
    }

    animateCounter(element, start, end, finalText) {
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(start + (end - start) * easeOutQuart);
            
            // Update the display with the suffix
            if (finalText.includes('+')) {
                element.textContent = currentValue + '+';
            } else if (finalText.includes('K')) {
                element.textContent = currentValue + 'K+';
            } else {
                element.textContent = currentValue.toString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = finalText; // Ensure final text is correct
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
    
    // Product Gallery Filtering Functionality
    initProductGallery() {
        this.setupProductFilters();
        this.setupProductAnimations();
        this.setupProductCarousel();
        this.setupFloatingCounters();
    }
    
    // Hero Product Carousel - Simplified and Fixed
    setupProductCarousel() {
        // Wait for DOM and run multiple times to ensure initialization
        const attemptInit = () => {
            const carousel = document.getElementById('productCarousel');
            const slides = document.querySelectorAll('.product-slide');
            const dots = document.querySelectorAll('.carousel-dot');
            
            console.log('🎠 Carousel setup attempt:', { 
                carousel: !!carousel, 
                slidesCount: slides.length, 
                dotsCount: dots.length 
            });
            
            if (!carousel || slides.length === 0 || dots.length === 0) {
                console.warn('⚠️ Carousel elements not found, retrying...');
                return false;
            }
            
            let currentSlide = 0;
            const totalSlides = slides.length;
            
            // Clear any existing classes first
            slides.forEach(slide => {
                slide.classList.remove('active', 'prev');
            });
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Function to show specific slide
            const showSlide = (index) => {
                console.log('📽️ Showing slide:', index);
                
                // Log current state before changes
                console.log('Before change:', {
                    totalSlides: slides.length,
                    activeSlides: document.querySelectorAll('.product-slide.active').length,
                    activeDots: document.querySelectorAll('.carousel-dot.active').length
                });
                
                // Hide all slides and remove all classes
                slides.forEach((slide, i) => {
                    slide.classList.remove('active', 'prev');
                    // Force immediate visibility for debugging
                    slide.style.opacity = '0';
                    slide.style.transform = 'translateX(100%) scale(0.9)';
                    slide.style.zIndex = '1';
                });
                
                // Show the target slide
                if (slides[index]) {
                    slides[index].classList.add('active');
                    // Force visible styles for debugging
                    slides[index].style.opacity = '1';
                    slides[index].style.transform = 'translateX(0) scale(1)';
                    slides[index].style.zIndex = '5';
                    console.log('Set slide', index, 'as active with classes:', slides[index].className);
                }
                
                // Update dots
                dots.forEach((dot, i) => {
                    dot.classList.remove('active');
                });
                if (dots[index]) {
                    dots[index].classList.add('active');
                    console.log('Set dot', index, 'as active');
                }
                
                // Log final state
                setTimeout(() => {
                    console.log('After change:', {
                        activeSlides: document.querySelectorAll('.product-slide.active').length,
                        activeDots: document.querySelectorAll('.carousel-dot.active').length,
                        visibleSlideIndex: Array.from(slides).findIndex(slide => 
                            slide.style.opacity === '1' || slide.classList.contains('active')
                        )
                    });
                }, 100);
            };
            
            // Initialize first slide
            showSlide(0);
            
            // Auto-advance carousel
            const autoAdvance = () => {
                currentSlide = (currentSlide + 1) % totalSlides;
                console.log('🔄 Auto-advancing to slide:', currentSlide);
                showSlide(currentSlide);
            };
            
            // Start auto-advance with slower timing
            let carouselInterval = setInterval(autoAdvance, 5000);
            
            // Dot navigation
            dots.forEach((dot, index) => {
                dot.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Get slide index from data-slide attribute or use array index
                    const slideIndex = dot.getAttribute('data-slide') ? parseInt(dot.getAttribute('data-slide')) : index;
                    console.log('🎯 Dot clicked:', slideIndex, 'from dot index:', index);
                    
                    currentSlide = slideIndex;
                    showSlide(currentSlide);
                    
                    // Reset auto-advance with slower timing
                    clearInterval(carouselInterval);
                    carouselInterval = setInterval(autoAdvance, 5000);
                });
            });
            
            // Pause on hover
            carousel.addEventListener('mouseenter', () => {
                console.log('⏸️ Pausing carousel');
                clearInterval(carouselInterval);
            });
            
            carousel.addEventListener('mouseleave', () => {
                console.log('▶️ Resuming carousel');
                carouselInterval = setInterval(autoAdvance, 6000);
            });
            
            console.log('✅ Carousel initialized successfully!');
            return true;
        };
        
        // Try to initialize immediately
        if (!attemptInit()) {
            // If failed, try again after 500ms
            setTimeout(() => {
                if (!attemptInit()) {
                    // If still failed, try one more time after 1 second
                    setTimeout(() => {
                        attemptInit();
                    }, 1000);
                }
            }, 500);
        }
    }
    
    // Floating Counters Animation
    setupFloatingCounters() {
        const counters = document.querySelectorAll('.counter');
        
        const observerOptions = {
            threshold: 0.7,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target);
                    
                    this.animateFloatingCounter(counter, 0, target, 2000);
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    animateFloatingCounter(element, start, end, duration) {
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Enhanced easing function for floating counters
            const easeOutBounce = (t) => {
                if (t < 1 / 2.75) {
                    return 7.5625 * t * t;
                } else if (t < 2 / 2.75) {
                    return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
                } else if (t < 2.5 / 2.75) {
                    return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
                } else {
                    return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
                }
            };
            
            const currentValue = Math.floor(start + (end - start) * easeOutBounce(progress));
            element.textContent = currentValue;
            
            // Add scale effect during animation
            element.style.transform = `scale(${1 + (progress * 0.1)})`;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = end;
                element.style.transform = 'scale(1)';
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
    
    setupProductFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const productItems = document.querySelectorAll('.product-item');
        
        if (filterButtons.length === 0 || productItems.length === 0) {
            return; // Exit if elements don't exist yet
        }
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Get filter category
                const filterCategory = button.getAttribute('data-filter');
                
                // Filter products with animation
                this.filterProducts(filterCategory, productItems);
                
                // Add click effect
                this.addClickEffect(button);
            });
        });
    }
    
    filterProducts(category, productItems) {
        productItems.forEach((item, index) => {
            const itemCategory = item.getAttribute('data-category');
            const shouldShow = category === 'all' || itemCategory === category;
            
            if (shouldShow) {
                // Show item with staggered animation
                setTimeout(() => {
                    item.classList.remove('hidden');
                    item.style.animationDelay = `${index * 0.1}s`;
                }, index * 100);
            } else {
                // Hide item
                item.classList.add('hidden');
            }
        });
        
        // Update gallery layout
        this.updateGalleryLayout();
    }
    
    updateGalleryLayout() {
        const gallery = document.getElementById('productGallery');
        if (gallery) {
            // Force reflow to trigger CSS grid recalculation
            gallery.style.display = 'none';
            gallery.offsetHeight; // Trigger reflow
            gallery.style.display = 'grid';
        }
    }
    
    setupProductAnimations() {
        const productItems = document.querySelectorAll('.product-item');
        
        // Setup intersection observer for scroll animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 200);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );
        
        productItems.forEach(item => {
            // Set initial state for animation
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            observer.observe(item);
            
            // Add hover effects
            this.addProductHoverEffects(item);
        });
    }
    
    addProductHoverEffects(item) {
        const card = item.querySelector('.relative');
        if (!card) return;
        
        item.addEventListener('mouseenter', () => {
            // Add glow effect to surrounding items
            const allItems = document.querySelectorAll('.product-item');
            allItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.7';
                    otherItem.style.transform = 'scale(0.98)';
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            // Reset all items
            const allItems = document.querySelectorAll('.product-item');
            allItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
                otherItem.style.transform = 'scale(1)';
            });
        });
        
        // Add click handler
        const viewButton = item.querySelector('button');
        if (viewButton) {
            viewButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const productName = item.querySelector('h3')?.textContent || 'Product';
                this.showProductModal(productName, item);
            });
        }
    }
    
    showProductModal(productName, productItem) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-3xl max-w-2xl w-full p-8 transform scale-95 transition-all duration-300 modal-content">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-3xl font-bold text-gray-900">${productName}</h2>
                    <button class="close-modal text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="text-center">
                        <div class="w-48 h-48 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mb-4">
                            <i class="fas fa-box text-4xl text-gray-400"></i>
                        </div>
                    </div>
                    
                    <div>
                        <p class="text-gray-600 mb-6 leading-relaxed">Discover our premium ${productName.toLowerCase()} collection featuring high-quality products from renowned global brands.</p>
                        
                        <div class="space-y-4">
                            <div class="flex items-center text-sm text-gray-600">
                                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                                <span>Premium Quality Guaranteed</span>
                            </div>
                            <div class="flex items-center text-sm text-gray-600">
                                <i class="fas fa-truck text-blue-500 mr-3"></i>
                                <span>Global Shipping Available</span>
                            </div>
                            <div class="flex items-center text-sm text-gray-600">
                                <i class="fas fa-certificate text-purple-500 mr-3"></i>
                                <span>HACCP Certified</span>
                            </div>
                        </div>
                        
                        <div class="mt-8 flex space-x-3">
                            <button class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex-1">
                                <i class="fas fa-envelope mr-2"></i>Request Quote
                            </button>
                            <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => {
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 10);
        
        // Close modal functionality
        const closeModal = () => {
            modal.querySelector('.modal-content').style.transform = 'scale(0.95)';
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            }, 300);
        };
        
        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Escape key to close
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }
    
    addClickEffect(element) {
        // Add pulse effect
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 100);
    }

    // Scroll Effects
    setupScrollEffects() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    
                    if (scrollTop > 20 && !this.isScrolled) {
                        this.header.classList.add('scrolled');
                        this.isScrolled = true;
                    } else if (scrollTop <= 20 && this.isScrolled) {
                        this.header.classList.remove('scrolled');
                        this.isScrolled = false;
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Mobile Menu
    setupMobileMenu() {
        if (this.mobileToggle && this.mobileOverlay) {
            this.mobileToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMobileMenu();
            });
            
            this.mobileClose.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeMobileMenu();
            });
            
            // Close on overlay click
            this.mobileOverlay.addEventListener('click', (e) => {
                if (e.target === this.mobileOverlay) {
                    this.closeMobileMenu();
                }
            });
            
            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isMobileMenuOpen) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    toggleMobileMenu() {
        if (this.isMobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        
        // Show overlay
        this.mobileOverlay.classList.remove('opacity-0', 'invisible');
        this.mobileOverlay.classList.add('opacity-100', 'visible');
        
        // Slide in menu
        if (mobileMenu) {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
        }
        
        // Update hamburger animation
        const spans = this.mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'translateY(6px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
        
        document.body.style.overflow = 'hidden';
        this.isMobileMenuOpen = true;
        
        // Focus management
        setTimeout(() => {
            const firstFocusable = this.mobileOverlay.querySelector('input, button, a');
            if (firstFocusable) firstFocusable.focus();
        }, 300);
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        
        // Hide overlay
        this.mobileOverlay.classList.remove('opacity-100', 'visible');
        this.mobileOverlay.classList.add('opacity-0', 'invisible');
        
        // Slide out menu
        if (mobileMenu) {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
        }
        
        // Reset hamburger animation
        const spans = this.mobileToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
        
        document.body.style.overflow = '';
        this.isMobileMenuOpen = false;
        
        // Return focus to toggle button
        this.mobileToggle.focus();
    }

    // Mobile Submenus - Updated for Tailwind CSS
    setupMobileSubmenus() {
        const dropdowns = document.querySelectorAll('.mobile-dropdown');
        
        dropdowns.forEach(dropdown => {
            const button = dropdown.querySelector('button');
            const submenu = dropdown.querySelector('ul');
            const chevron = button.querySelector('i');
            
            if (button && submenu && chevron) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const isOpen = submenu.classList.contains('block');
                    
                    // Close all other submenus
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            const otherSubmenu = otherDropdown.querySelector('ul');
                            const otherChevron = otherDropdown.querySelector('button i');
                            if (otherSubmenu && otherChevron) {
                                otherSubmenu.classList.add('hidden');
                                otherSubmenu.classList.remove('block');
                                otherChevron.style.transform = '';
                            }
                        }
                    });
                    
                    // Toggle current submenu
                    if (isOpen) {
                        submenu.classList.add('hidden');
                        submenu.classList.remove('block');
                        chevron.style.transform = '';
                    } else {
                        submenu.classList.remove('hidden');
                        submenu.classList.add('block');
                        chevron.style.transform = 'rotate(180deg)';
                    }
                });
            }
        });
    }

    // Search Functionality
    setupSearch() {
        if (!this.searchInput || !this.searchForm) return;

        // Sample search data for FMCG products
        this.searchData = [
            { category: 'Beauty Professional', items: ['Cosmetics', 'Skincare', 'Hair Care', 'Beauty Tools', 'Professional Makeup'] },
            { category: 'Consumer Goods', items: ['Personal Care', 'Home Care', 'Food & Beverages', 'Health & Wellness'] },
            { category: 'Special Offers', items: ['Bulk Discounts', 'Seasonal Offers', 'New Arrivals', 'Clearance Sale'] },
            { category: 'Brands', items: ['Premium Brands', 'Private Label', 'Organic Products', 'International Brands'] }
        ];

        // Search input event listeners
        this.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            this.handleSearch(query);
        });

        this.searchInput.addEventListener('focus', () => {
            if (this.searchInput.value.trim()) {
                this.showSuggestions();
            }
        });

        this.searchInput.addEventListener('blur', () => {
            // Delay hiding to allow clicking on suggestions
            setTimeout(() => this.hideSuggestions(), 150);
        });

        // Search form submission
        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.performSearch(this.searchInput.value.trim());
        });
    }

    handleSearch(query) {
        if (query.length < 2) {
            this.hideSuggestions();
            return;
        }

        const suggestions = this.generateSuggestions(query);
        this.displaySuggestions(suggestions);
        this.showSuggestions();
    }

    generateSuggestions(query) {
        const suggestions = [];
        const queryLower = query.toLowerCase();

        this.searchData.forEach(categoryData => {
            // Check category match
            if (categoryData.category.toLowerCase().includes(queryLower)) {
                suggestions.push({
                    type: 'category',
                    text: categoryData.category,
                    icon: 'fas fa-folder'
                });
            }

            // Check item matches
            categoryData.items.forEach(item => {
                if (item.toLowerCase().includes(queryLower)) {
                    suggestions.push({
                        type: 'product',
                        text: item,
                        category: categoryData.category,
                        icon: 'fas fa-box'
                    });
                }
            });
        });

        return suggestions.slice(0, 6); // Limit to 6 suggestions
    }

    displaySuggestions(suggestions) {
        if (suggestions.length === 0) {
            this.searchSuggestions.innerHTML = '<div class="no-suggestions">No results found</div>';
            return;
        }

        const suggestionHTML = suggestions.map(suggestion => `
            <div class="suggestion-item" data-type="${suggestion.type}" data-text="${suggestion.text}">
                <i class="${suggestion.icon}"></i>
                <div class="suggestion-content">
                    <div class="suggestion-text">${suggestion.text}</div>
                    ${suggestion.category ? `<div class="suggestion-category">in ${suggestion.category}</div>` : ''}
                </div>
            </div>
        `).join('');

        this.searchSuggestions.innerHTML = suggestionHTML;

        // Add click listeners to suggestions
        this.searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const text = item.dataset.text;
                this.searchInput.value = text;
                this.performSearch(text);
                this.hideSuggestions();
            });
        });
    }

    showSuggestions() {
        this.searchSuggestions.classList.add('active');
    }

    hideSuggestions() {
        this.searchSuggestions.classList.remove('active');
    }

    performSearch(query) {
        if (!query) return;
        
        console.log('🔍 Performing search for:', query);
        // Here you would typically redirect to search results or filter products
        // For demo purposes, we'll just log the search
        
        // Example: window.location.href = `/search?q=${encodeURIComponent(query)}`;
        alert(`Searching for: "${query}"`);
    }

    // Desktop Dropdown Menus
    setupDropdowns() {
        const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown, .nav-item.mega-dropdown');
        
        dropdownItems.forEach(item => {
            let hoverTimer;
            
            item.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimer);
                hoverTimer = setTimeout(() => {
                    item.classList.add('dropdown-active');
                }, 100);
            });
            
            item.addEventListener('mouseleave', () => {
                clearTimeout(hoverTimer);
                hoverTimer = setTimeout(() => {
                    item.classList.remove('dropdown-active');
                }, 300);
            });
        });
    }

    // Animations and Effects
    setupAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate in
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Button ripple effects
        this.setupButtonEffects();
    }

    setupButtonEffects() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-outline');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;

                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
}

// Language Selector Functionality
class LanguageSelector {
    constructor() {
        this.selector = document.getElementById('languageSelect');
        this.init();
    }

    init() {
        if (!this.selector) return;

        this.selector.addEventListener('change', (e) => {
            const selectedLanguage = e.target.value;
            this.changeLanguage(selectedLanguage);
        });
    }

    changeLanguage(langCode) {
        console.log('🌐 Language changed to:', langCode);
        // Here you would implement actual language switching
        // For example: document.documentElement.lang = langCode;
        
        // Store preference
        localStorage.setItem('farway-language', langCode);
        
        // Show feedback
        this.showLanguageChangeNotification(langCode);
    }

    showLanguageChangeNotification(langCode) {
        const languages = {
            'en': 'English',
            'es': 'Español',
            'fr': 'Français',
            'de': 'Deutsch'
        };
        
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 9999;
            font-weight: 500;
            animation: slideInRight 0.3s ease-out;
        `;
        notification.textContent = `Language changed to ${languages[langCode]}`;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// Performance Optimization
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        // Preload critical resources
        this.preloadResources();
        
        // Lazy load non-critical elements
        this.setupLazyLoading();
        
        // Monitor performance
        this.monitorPerformance();
    }

    preloadResources() {
        // Preload important images or resources
        const criticalImages = [
            // Add critical image URLs here
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    setupLazyLoading() {
        // Setup intersection observer for lazy loading
        if ('IntersectionObserver' in window) {
            const lazyElements = document.querySelectorAll('[data-lazy]');
            const lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        element.src = element.dataset.lazy;
                        element.removeAttribute('data-lazy');
                        lazyObserver.unobserve(element);
                    }
                });
            });

            lazyElements.forEach(el => lazyObserver.observe(el));
        }
    }

    monitorPerformance() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                        console.log('📊 Performance Metric:', entry.name, entry.value);
                    });
                });
                
                observer.observe({ entryTypes: ['measure', 'navigation'] });
            } catch (e) {
                console.log('Performance monitoring not available');
            }
        }
    }
}

    // Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM Content Loaded - Initializing FarWay Systems');
    
    // Initialize main header functionality
    new FarWayHeader();
    
    // Initialize language selector
    new LanguageSelector();
    
    // Initialize performance monitoring
    new PerformanceManager();
    
    // Additional check for carousel after everything loads
    setTimeout(() => {
        const carousel = document.getElementById('productCarousel');
        const slides = document.querySelectorAll('.product-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        
        console.log('🔍 Final carousel check:', {
            carousel: !!carousel,
            slidesCount: slides.length,
            dotsCount: dots.length,
            activeSlides: document.querySelectorAll('.product-slide.active').length,
            activeDots: document.querySelectorAll('.carousel-dot.active').length
        });
    }, 2000);
    
    // Add custom CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .suggestion-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.75rem 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            border-bottom: 1px solid #f1f5f9;
        }
        
        .suggestion-item:hover {
            background: #f8fafc;
            padding-left: 1.5rem;
        }
        
        .suggestion-item:last-child {
            border-bottom: none;
        }
        
        .suggestion-item i {
            color: #8b5cf6;
            width: 16px;
        }
        
        .suggestion-content {
            flex: 1;
        }
        
        .suggestion-text {
            font-weight: 500;
            color: #1e293b;
        }
        
        .suggestion-category {
            font-size: 0.8rem;
            color: #64748b;
        }
        
        .no-suggestions {
            padding: 1rem;
            text-align: center;
            color: #64748b;
            font-style: italic;
        }
    `;
    document.head.appendChild(style);
    
    console.log('✨ FarWay Company - Professional FMCG Header Ready');
    console.log('📱 Mobile-responsive | 🔍 Smart search | 🎯 B2B optimized');
});

// Utility functions
const FarWayUtils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Format currency for international display
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }
};

// Export for use in other modules if needed
window.FarWayHeader = FarWayHeader;
window.FarWayUtils = FarWayUtils;