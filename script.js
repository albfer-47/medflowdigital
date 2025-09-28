// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Counter animation
function animateCounter(elementId, targetValue, duration = 2000, suffix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startValue = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function para animação mais suave
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
        
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = targetValue + suffix;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Calculadora de ROI
function calculateROI() {
    const currentConsultations = parseInt(document.getElementById('current-consultations').value);
    const consultationValue = parseInt(document.getElementById('consultation-value').value);
    const specialtyMultiplier = parseFloat(document.getElementById('specialty').value);
    
    if (!currentConsultations || !consultationValue) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    // Cálculos baseados em dados reais de crescimento médico
    const projectedConsultations = Math.floor(currentConsultations * specialtyMultiplier);
    const currentRevenue = currentConsultations * consultationValue;
    const projectedRevenue = projectedConsultations * consultationValue;
    const growthPotential = projectedRevenue - currentRevenue;
    
    // Atualizar resultados
    document.getElementById('projected-consultations').textContent = projectedConsultations;
    document.getElementById('current-revenue').textContent = `R$ ${currentRevenue.toLocaleString('pt-BR')}`;
    document.getElementById('projected-revenue').textContent = `R$ ${projectedRevenue.toLocaleString('pt-BR')}`;
    document.getElementById('growth-potential').textContent = `+ R$ ${growthPotential.toLocaleString('pt-BR')}`;
    
    // Animar os números
    animateCounterFromZero('projected-consultations', projectedConsultations);
    animateCounterFromZero('current-revenue', currentRevenue, 'R$ ');
    animateCounterFromZero('projected-revenue', projectedRevenue, 'R$ ');
    animateCounterFromZero('growth-potential', growthPotential, '+ R$ ');
}

function animateCounterFromZero(elementId, targetValue, prefix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const duration = 1500;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(targetValue * easeOutQuart);
        
        if (prefix.includes('R$')) {
            element.textContent = prefix + currentValue.toLocaleString('pt-BR');
        } else {
            element.textContent = prefix + currentValue;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Intersection Observer para animações
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            
            // Se for o dashboard, animar os contadores
            if (entry.target.classList.contains('dashboard-preview')) {
                setTimeout(() => {
                    animateCounter('consultations-counter', 142);
                    animateCounter('revenue-counter', 285);
                }, 500);
            }
        }
    });
}, observerOptions);

// Inicialização quando DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    // Elementos para animar
    const elementsToAnimate = document.querySelectorAll('[data-aos]');
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // Observar o dashboard para animar contadores
    const dashboard = document.querySelector('.dashboard-preview');
    if (dashboard) {
        observer.observe(dashboard);
    }
    
    // Smooth scroll para links de navegação
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Compensar header fixo
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Todos os botões CTA levam para agendamento (simulação)
    const ctaButtons = document.querySelectorAll('.cta-btn, .btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Simulação de agendamento - na vida real seria um calendário ou formulário
            if (this.textContent.includes('Agendar') || this.textContent.includes('Consultoria')) {
                showBookingModal();
            } else {
                // Scroll para seção relevante
                const target = document.querySelector('#processo');
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Efeito de hover nos case cards
    const caseCards = document.querySelectorAll('.case-card');
    caseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Animar elementos ao entrar na viewport
    const animatedElements = document.querySelectorAll('.processo-step, .case-card');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
});

// Modal de agendamento (simulação)
function showBookingModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 40px;
            border-radius: 16px;
            max-width: 500px;
            margin: 20px;
            text-align: center;
            animation: slideIn 0.3s ease;
        ">
            <div style="font-size: 48px; margin-bottom: 20px;">🎉</div>
            <h3 style="color: #1a202c; margin-bottom: 15px; font-size: 24px;">Consultoria Agendada!</h3>
            <p style="color: #64748b; margin-bottom: 25px; line-height: 1.6;">
                Obrigado pelo interesse! Em breve nossa equipe entrará em contato para agendar sua consultoria gratuita de 60 minutos.
            </p>
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <p style="color: #059669; font-weight: 600; margin: 0;">
                    📧 Você receberá um e-mail de confirmação<br>
                    📱 WhatsApp: (11) 99999-9999
                </p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
            ">Fechar</button>
        </div>
    `;
    
    // Adicionar animações CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    
    // Fechar clicando fora
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Tracking de eventos (simulação)
function trackEvent(eventName, properties = {}) {
    console.log(`📊 Event: ${eventName}`, properties);
    // Aqui você integraria com Google Analytics, Facebook Pixel, etc.
}

// Track scroll depth
let scrollDepthTracked = [];
window.addEventListener('scroll', function() {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    [25, 50, 75, 90].forEach(depth => {
        if (scrollPercent >= depth && !scrollDepthTracked.includes(depth)) {
            scrollDepthTracked.push(depth);
            trackEvent('scroll_depth', { depth: `${depth}%` });
        }
    });
});

// Performance: throttle para eventos
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Aplicar throttle no scroll
const throttledScrollHandler = throttle(function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Easter egg para médicos
let medicalSequence = [];
const medicalCodes = ['KeyH', 'KeyE', 'KeyA', 'KeyL', 'KeyT', 'KeyH'];

document.addEventListener('keydown', function(e) {
    medicalSequence.push(e.code);
    
    if (medicalSequence.length > medicalCodes.length) {
        medicalSequence.shift();
    }
    
    if (JSON.stringify(medicalSequence) === JSON.stringify(medicalCodes)) {
        // Easter egg ativado - tema médico especial
        document.body.style.filter = 'sepia(20%) hue-rotate(90deg)';
        
        // Mostrar mensagem especial
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 20px;
            border-radius: 12px;
            z-index: 10000;
            text-align: center;
            font-weight: 600;
            animation: pulse 1s ease;
        `;
        message.textContent = '🩺 Código médico ativado! Você encontrou o Easter Egg! 🏥';
        document.body.appendChild(message);
        
        setTimeout(() => {
            document.body.style.filter = 'none';
            message.remove();
        }, 3000);
        
        medicalSequence = [];
        trackEvent('easter_egg_activated', { code: 'medical_theme' });
    }
});

// Simular dados em tempo real no dashboard
function updateDashboardMetrics() {
    const consultationsEl = document.getElementById('consultations-counter');
    const revenueEl = document.getElementById('revenue-counter');
    
    if (consultationsEl && revenueEl) {
        setInterval(() => {
            const currentConsultations = parseInt(consultationsEl.textContent) || 142;
            const currentRevenue = parseInt(revenueEl.textContent) || 285;
            
            // Pequenas variações aleatórias para simular tempo real
            if (Math.random() > 0.7) {
                const newConsultations = currentConsultations + Math.floor(Math.random() * 3);
                const newRevenue = Math.floor(newConsultations * 2);
                
                consultationsEl.textContent = newConsultations;
                revenueEl.textContent = newRevenue;
            }
        }, 5000);
    }
}

// Iniciar simulação após 3 segundos
setTimeout(updateDashboardMetrics, 3000);
// Adicione este código ao final do seu script.js

// ===== MENU MOBILE ===== //

// Criar botão hamburguer e menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.floating-header .container');
    const nav = document.querySelector('.nav');
    
    // Criar botão hamburguer
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Criar menu mobile
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    
    // Copiar links do menu desktop para mobile
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        const mobileLink = link.cloneNode(true);
        mobileLink.addEventListener('click', function() {
            closeMobileMenu();
        });
        mobileNav.appendChild(mobileLink);
    });
    
    // Adicionar botão CTA no menu mobile
    const ctaBtn = document.querySelector('.cta-btn').cloneNode(true);
    ctaBtn.style.marginTop = '20px';
    mobileNav.appendChild(ctaBtn);
    
    // Inserir elementos no DOM
    header.appendChild(mobileMenuBtn);
    document.body.appendChild(mobileNav);
    
    // Funções do menu
    function openMobileMenu() {
        mobileMenuBtn.classList.add('active');
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners
    mobileMenuBtn.addEventListener('click', function() {
        if (mobileNav.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Fechar menu clicando fora
    mobileNav.addEventListener('click', function(e) {
        if (e.target === mobileNav) {
            closeMobileMenu();
        }
    });
    
    // Fechar menu com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    // Detectar mudança de orientação
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            closeMobileMenu();
            // Ajustar altura do viewport
            document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        }, 100);
    });
    
    // Fix viewport height para mobile
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
});

// ===== MELHORIAS PARA TOUCH ===== //

// Otimizar scrolling no iOS
document.addEventListener('touchstart', function() {}, { passive: true });
document.addEventListener('touchmove', function() {}, { passive: true });

// Prevenir zoom indesejado no iOS
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

// Lazy loading para imagens (se houver)
function addLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Melhorar performance em dispositivos móveis
function optimizeForMobile() {
    // Reduzir animações em dispositivos com pouca performance
    if (navigator.hardwareConcurrency <= 2) {
        document.body.classList.add('reduced-motion');
    }
    
    // Detectar se é dispositivo touch
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // Otimizar scroll
    let ticking = false;
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                // Suas funções de scroll aqui
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateOnScroll, { passive: true });
}

// Inicializar otimizações
document.addEventListener('DOMContentLoaded', function() {
    addLazyLoading();
    optimizeForMobile();
});

// ===== CALCULADORA MOBILE ===== //

// Melhorar experiência da calculadora no mobile
function improveMobileCalculator() {
    const calculatorInputs = document.querySelectorAll('.calculator-inputs input, .calculator-inputs select');
    
    calculatorInputs.forEach(input => {
        // Prevenir zoom no iOS quando input está focado
        input.addEventListener('focus', function() {
            if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
                this.style.fontSize = '16px';
            }
        });
        
        // Restaurar tamanho original após blur
        input.addEventListener('blur', function() {
            this.style.fontSize = '';
        });
    });
}

// Adicionar feedback tátil (vibração) em dispositivos que suportam
function addHapticFeedback() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-btn, .calculate-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if ('vibrate' in navigator) {
                navigator.vibrate(50); // 50ms de vibração
            }
        });
    });
}

// Inicializar melhorias mobile
document.addEventListener('DOMContentLoaded', function() {
    improveMobileCalculator();
    addHapticFeedback();
});

// ===== SWIPE GESTURES (OPCIONAL) ===== //

// Adicionar gestos de swipe para navegar entre seções
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 100; // mínimo de 100px para considerar swipe
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe para direita - seção anterior
            navigateToSection('prev');
        } else {
            // Swipe para esquerda - próxima seção
            navigateToSection('next');
        }
    }
}

function navigateToSection(direction) {
    const sections = ['#home', '#processo', '#resultados', '#calculadora', '#contato'];
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);
    
    let nextIndex;
    if (direction === 'next') {
        nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
    } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
    }
    
    const targetSection = document.querySelector(sections[nextIndex]);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let current = '#home';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) {
            current = '#' + section.id;
        }
    });
    
    return current;
}