/**
 * OTIMIZA AÍ TWEAKS - SCRIPTS DE INTERATIVIDADE
 * Desenvolvido profissionalmente sem templates automáticos
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       0. FORÇAR NAVEGAÇÃO PARA O TOPO NO RECARREGAMENTO
       ========================================================================== */
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    if (window.location.hash && window.location.hash !== '#inicio') {
        window.location.hash = '';
    }

    /* ==========================================================================
       1. CABEÇALHO SCROLL E NAVBAR ATIVA
       ========================================================================== */
    const header = document.getElementById('main-header');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Atualiza o item ativo no menu com base na seção visível (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Aciona quando a seção está no centro da tela
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Executa na inicialização


    /* ==========================================================================
       2. MENU MOBILE DROPDOWN
       ========================================================================== */
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNavigationDropdown = document.getElementById('mobile-navigation-dropdown');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    const toggleMobileMenu = () => {
        mobileMenuToggle.classList.toggle('active');
        mobileNavigationDropdown.classList.toggle('active');
    };

    const closeMobileMenu = () => {
        mobileMenuToggle.classList.remove('active');
        mobileNavigationDropdown.classList.remove('active');
    };

    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    // Fecha o menu ao clicar em qualquer item
    mobileNavItems.forEach(item => {
        item.addEventListener('click', closeMobileMenu);
    });


    /* ==========================================================================
       3. COMPARADOR DE PERFORMANCE (ANTES / DEPOIS SLIDER)
       ========================================================================== */
    const sliderInput = document.getElementById('slider-range-input');
    const beforeSlide = document.getElementById('before-slide-container');
    const sliderHandle = document.getElementById('slider-handle');

    if (sliderInput && beforeSlide && sliderHandle) {
        const updateSliderPosition = () => {
            const value = sliderInput.value;
            // Atualiza a largura da aba "Antes" (bloated PC)
            beforeSlide.style.width = `${value}%`;
            // Posiciona a barra de manuseio e botão
            sliderHandle.style.left = `${value}%`;
        };

        // Evento principal para arraste do controle deslizante
        sliderInput.addEventListener('input', updateSliderPosition);
        
        // Efeito interativo no hover no card do slider (movimento sutil)
        sliderInput.addEventListener('mousemove', (e) => {
            const rect = sliderInput.getBoundingClientRect();
            const x = e.clientX - rect.left; // Coordenada X dentro do elemento
            const percent = (x / rect.width) * 100;
            
            // Cria um brilho no mouse no container geral do slider
            sliderInput.parentElement.style.setProperty('--mouse-x', `${percent}%`);
        });

        // Posicionamento inicial
        updateSliderPosition();
    }


    /* ==========================================================================
       4. FAQ ACCORDION (Perguntas Frequentes)
       ========================================================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Fecha todos os outros FAQs para manter o visual limpo (Accordion exclusivo)
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Se não estava ativo, abre o clicado
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });


    /* ==========================================================================
       5. ANIMAÇÃO REVEAL ON SCROLL (Elementos aparecendo suavemente)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealObserverOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Revela um pouco antes de entrar totalmente na tela
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Deixa de observar depois de revelar (efeito só ocorre uma vez na sessão)
                observer.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* ==========================================================================
       6. EFEITO HOVER DIRECIONAL DOS CARDS (GLASSMOPHISM SPOTLIGHT)
       ========================================================================== */
    const cards = document.querySelectorAll('.advantage-card, .pricing-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Define variáveis CSS dinâmicas baseadas na posição do mouse
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    /* ==========================================================================
       7. MENSAGENS PERSONALIZADAS WHATSAPP
       ========================================================================== */
    // Garante que o widget flutuante e os botões tenham o comportamento esperado
    // Adicionando um pequeno atraso para a entrada do widget flutuante
    const floatingBtn = document.getElementById('whatsapp-floating-widget');
    if (floatingBtn) {
        floatingBtn.style.opacity = '0';
        floatingBtn.style.transform = 'scale(0.5)';
        floatingBtn.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

        setTimeout(() => {
            floatingBtn.style.opacity = '1';
            floatingBtn.style.transform = 'scale(1)';
        }, 2000); // Exibe o botão flutuante após 2 segundos do carregamento da página
    }

});
