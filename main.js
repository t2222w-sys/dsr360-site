/* 
   DSR 360 REMODELAÇÕES — ELITE JS ENGINE
   GSAP Animations & UI Interactivity
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GSAP: Registo de Plugins ---
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    } else {
        console.warn("GSAP não carregado.");
        return;
    }

    // --- 2. Utilitários Premium: Split-Text & Magnetic ---
    function splitText(selector) {
        document.querySelectorAll(selector).forEach(el => {
            const text = el.innerText;
            el.innerHTML = '';
            text.split(' ').forEach(word => {
                const wordSpan = document.createElement('span');
                wordSpan.className = 'split-line';
                wordSpan.style.display = 'inline-block';
                wordSpan.style.overflow = 'hidden';
                word.split('').forEach(char => {
                    const charSpan = document.createElement('span');
                    charSpan.className = 'split-char';
                    charSpan.style.display = 'inline-block';
                    charSpan.innerText = char;
                    wordSpan.appendChild(charSpan);
                });
                el.appendChild(wordSpan);
                el.appendChild(document.createTextNode(' '));
            });
        });
    }

    const initMagneticButtons = () => {
        const btns = document.querySelectorAll('.btn-magnetic');
        btns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.6,
                    ease: "power4.out"
                });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    };

    // Inicialização de Utilitários
    splitText('.hero-line');
    initMagneticButtons();

    // --- 3. Animação de Revelação das Secções ---
    const revealElements = gsap.utils.toArray('.service-card, .hero-tag, .hero-description, .btn-premium, .authority-content, .process-item, .review-card, .faq-item, .bento-item');
    
    if (document.querySelector('.hero-line')) {
        gsap.from('.hero-line .split-char', {
            y: 100,
            opacity: 0,
            stagger: 0.02,
            duration: 1.2,
            ease: "power4.out",
            delay: 0.5
        });
    }

    revealElements.forEach((el) => {
        gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // --- 4. Animação do Contador de Estatísticas ---
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        counters.forEach(counter => {
            const targetAttr = counter.getAttribute('data-target');
            if (targetAttr) {
                const target = +targetAttr;
                gsap.to(counter, {
                    innerText: target,
                    duration: 2.5,
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: counter,
                        start: "top 90%"
                    }
                });
            }
        });
    }

    // --- 5. Navbar Scrolled State ---
    const nav = document.querySelector('.nav-elite');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // --- 6. FAQ Accordion Logic ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentNode;
            if (item) item.classList.toggle('active');
        });
    });

    // --- 7. Quiz Engine (Protegido contra Elementos Inexistentes) ---
    const quizWrapper = document.getElementById('discovery-quiz');
    let originalQuizHTML = null;
    let currentStep = 1;

    // Capturar HTML original apenas se ainda não foi feito
    if (quizWrapper && !originalQuizHTML) {
        originalQuizHTML = quizWrapper.innerHTML;
    }

    function initQuiz() {
        const quizForm = document.getElementById('quiz-form');
        if (!quizForm) return;

        const steps = document.querySelectorAll('.quiz-step');
        const progressBar = document.getElementById('progress-bar');
        const currentStepText = document.getElementById('current-step');
        const backBtn = document.getElementById('btn-back');
        const totalSteps = steps.length;

        function updateQuizUI() {
            console.log("DSR 360: Updating Quiz UI to Step", currentStep);
            steps.forEach(step => {
                step.classList.remove('active');
                if(parseInt(step.dataset.step) === currentStep) {
                    step.classList.add('active');
                }
            });

            if (progressBar) {
                const progress = (currentStep / totalSteps) * 100;
                progressBar.style.width = `${progress}%`;
            }
            if (currentStepText) currentStepText.innerText = currentStep;

            if (backBtn) {
                backBtn.style.visibility = (currentStep > 1 && currentStep < totalSteps) ? 'visible' : 'hidden';
            }
        }

        const optionBtns = document.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const stepEl = btn.closest('.quiz-step');
                if (stepEl) {
                    stepEl.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    if (currentStep < totalSteps) {
                        setTimeout(() => {
                            currentStep++;
                            updateQuizUI();
                        }, 400);
                    }
                }
            });
        });

        if (backBtn) {
            backBtn.addEventListener('click', () => {
                if (currentStep > 1) {
                    currentStep--;
                    updateQuizUI();
                }
            });
        }

        quizForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("DSR 360: Quiz Form Submitted");
            if (quizWrapper) {
                gsap.to(quizWrapper, {
                    opacity: 0, y: -20, duration: 0.5,
                    onComplete: () => {
                        quizWrapper.innerHTML = `
                            <div style="text-align: center; padding: 40px;">
                                <div style="font-size: 60px; margin-bottom: 20px;">✅</div>
                                <h3 class="manrope" style="font-size: 24px; color: var(--accent);">Pedido Recebido!</h3>
                                <p style="font-size: 16px; opacity: 0.8; margin-top: 15px; line-height: 1.6;">
                                    Obrigado pela confiança. A equipa da DSR 360 analisará o seu pedido e entrará em contacto em breve.
                                </p>
                            </div>`;
                        gsap.fromTo(quizWrapper, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 });
                    }
                });
            }
        });
        
        updateQuizUI();
    }

    function resetQuiz() {
        console.log("DSR 360: Resetting Quiz");
        if (!quizWrapper || !originalQuizHTML) return;
        currentStep = 1;
        quizWrapper.innerHTML = originalQuizHTML;
        initQuiz();
    }

    // Inicializar pela primeira vez
    initQuiz();

    // --- 8. Modal Logic: Open/Close Simulator ---
    const quizModal = document.getElementById('quiz-modal');
    const openModalBtns = document.querySelectorAll('.btn-open-quiz');
    const closeModalBtn = document.querySelector('.btn-close-modal');

    const openQuizModal = (e) => {
        if (e) e.preventDefault();
        if (!quizModal) return;

        quizModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // GSAP Animation for modal content
        gsap.fromTo('.modal-container', 
            { y: 50, opacity: 0, scale: 0.9 }, 
            { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power4.out" }
        );
    };

    const closeQuizModal = () => {
        if (!quizModal) return;
        
        gsap.to('.modal-container', {
            y: 30, opacity: 0, scale: 0.95, duration: 0.5, ease: "power4.in",
            onComplete: () => {
                quizModal.classList.remove('active');
                document.body.style.overflow = 'unset';
                resetQuiz();
            }
        });
    };

    if (quizModal && openModalBtns.length > 0) {
        openModalBtns.forEach(btn => btn.addEventListener('click', openQuizModal));
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeQuizModal);
    }

    // Close on overlay click
    if (quizModal) {
        quizModal.addEventListener('click', (e) => {
            if (e.target === quizModal) closeQuizModal();
        });
    }

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && quizModal && quizModal.classList.contains('active')) {
            closeQuizModal();
        }
    });

    // --- 9. WhatsApp & Menu Mobile (Fim do Script) ---
    const hamburger = document.querySelector('.hamburger-elite');
    const closeMenuBtn = document.querySelector('.btn-close-menu');
    const mobileOverlay = document.querySelector('.menu-mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileOverlay) {
        gsap.set(mobileOverlay, { xPercent: 100 });
    }

    const toggleMenu = (open) => {
        if (!mobileOverlay) return;

        if (open) {
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            const tl = gsap.timeline();
            tl.fromTo(mobileOverlay, 
                { xPercent: 100 }, 
                { xPercent: 0, duration: 0.5, ease: "power3.out" }
            );

            // Animação agrupada e simplificada dos blocos principais (evita lag em dispositivos móveis)
            tl.fromTo('.bento-card-main, .bento-grid-2x2, .bento-full-card, .btn-direct-contact', 
                { y: 20, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: "power2.out" }, 
                "-=0.35"
            );
        } else {
            gsap.to(mobileOverlay, {
                xPercent: 100, duration: 0.4, ease: "power3.inOut",
                onComplete: () => {
                    mobileOverlay.classList.remove('active');
                    document.body.style.overflow = 'unset';
                }
            });
        }
    };

    if (hamburger && closeMenuBtn && mobileOverlay) {
        hamburger.addEventListener('click', () => toggleMenu(true));
        closeMenuBtn.addEventListener('click', () => toggleMenu(false));
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    }
});
