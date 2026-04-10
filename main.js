/* 
   DSR 360 REMODELAÇÕES — ELITE JS ENGINE
   GSAP Animations & Discovery Quiz Logic
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GSAP: Registo de Plugins ---
    gsap.registerPlugin(ScrollTrigger);

    // --- 2. Animação de Revelação das Secções ---
    const revealElements = gsap.utils.toArray('.service-card, .hero-content, .hero-tag, .hero-title, .hero-description, .btn-premium, .authority-content, .process-item, .review-card, .faq-item');
    
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

    // --- 3. Animação do Contador de Estatísticas ---
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        
        gsap.to(counter, {
            innerText: target,
            duration: 2.5,
            snap: { innerText: 1 },
            scrollTrigger: {
                trigger: counter,
                start: "top 90%"
            }
        });
    });

    // --- 4. Navbar Background Control ---
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav-elite');
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- 5. Discovery Quiz Engine ---
    const quizForm = document.getElementById('quiz-form');
    const steps = document.querySelectorAll('.quiz-step');
    const progressBar = document.getElementById('progress-bar');
    const currentStepText = document.getElementById('current-step');
    const backBtn = document.getElementById('btn-back');
    let currentStep = 1;
    const totalSteps = steps.length;

    // Dados do Quiz
    const quizData = {
        tipo: '',
        servico: '',
        urgencia: ''
    };

    function updateQuizUI() {
        // Atualizar Passos Ativos
        steps.forEach(step => {
            step.classList.remove('active');
            if(parseInt(step.dataset.step) === currentStep) {
                step.classList.add('active');
            }
        });

        // Atualizar Barra de Progresso
        const progress = (currentStep / totalSteps) * 100;
        progressBar.style.width = `${progress}%`;
        currentStepText.innerText = currentStep;

        // Mostrar/Ocultar Botão Voltar
        if (currentStep > 1 && currentStep < totalSteps) {
            backBtn.style.visibility = 'visible';
        } else {
            backBtn.style.visibility = 'hidden';
        }
    }

    // Eventos de Clique nas Opções
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Guardar Data baseada no Step
            const stepEl = btn.closest('.quiz-step');
            const stepNum = parseInt(stepEl.dataset.step);
            
            // Marcar Visuamente
            stepEl.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // Avançar Automaticamente após 400ms (UX Premium)
            if (currentStep < totalSteps) {
                setTimeout(() => {
                    currentStep++;
                    updateQuizUI();
                }, 400);
            }
        });
    });

    // Evento Botão Voltar
    backBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateQuizUI();
        }
    });

    // --- 6. FAQ Accordion Logic ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentNode;
            item.classList.toggle('active');
        });
    });

    // Submissão do Quiz
    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulação de Sucesso
        const quizWrapper = document.querySelector('.quiz-wrapper');
        gsap.to(quizWrapper, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            onComplete: () => {
                quizWrapper.innerHTML = `
                    <div style="text-align: center; padding: 40px;">
                        <span style="font-size: 50px;">✅</span>
                        <h3 class="manrope" style="margin-top: 20px; color: var(--accent);">Pedido Recebido!</h3>
                        <p style="font-size: 14px; opacity: 0.7; margin-top: 10px;">
                            A equipa da DSR 360 entrará em contacto para o seu orçamento no Parque Industrial de Évora.
                        </p>
                    </div>
                `;
                gsap.fromTo(quizWrapper, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 });
            }
        });
    });

    // --- 7. WhatsApp Premium Animations ---
    gsap.from('.whatsapp-overlay', {
        x: 100,
        opacity: 0,
        duration: 1.5,
        delay: 2, // Aparece após 2 segundos para dar foco ao Hero
        ease: "power4.out"
    });

    // Subtil flutuação contínua
    gsap.to('.whatsapp-btn', {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

});
