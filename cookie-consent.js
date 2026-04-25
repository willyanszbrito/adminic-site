// cookie-consent.js
document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("adminic_cookie_consent")) {
        const banner = document.createElement("div");
        banner.id = "cookie-consent-banner";
        // Usa as classes do Tailwind para o tema claro/escuro
        banner.className = "fixed bottom-0 left-0 w-full z-[9999] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] px-4 py-4 md:px-8 transition-colors duration-300 box-border";
        banner.innerHTML = `
            <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-['Plus_Jakarta_Sans'] text-sm">
                <div class="flex-1 text-left w-full break-words">
                    <strong class="block text-base mb-1 text-slate-900 dark:text-white">Aviso de Privacidade e Cookies 🍪</strong>
                    <span class="text-slate-600 dark:text-slate-300 block leading-relaxed">
                        Nós utilizamos cookies e armazenamento local para lembrar suas preferências e garantir o bom funcionamento de nossas demonstrações. Não usamos seus dados para rastreamento invasivo. Ao continuar navegando, você concorda com nossa <a href="politica.html" class="text-blue-600 dark:text-blue-400 hover:underline">Política de Privacidade</a> e <a href="termos.html" class="text-blue-600 dark:text-blue-400 hover:underline">Termos de Uso</a>.
                    </span>
                </div>
                <div class="w-full md:w-auto flex justify-center mt-2 md:mt-0">
                    <button id="accept-cookies" class="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-8 rounded-full transition-colors whitespace-nowrap uppercase tracking-wider text-xs shadow-md">
                        Entendi e Aceito
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);

        document.getElementById("accept-cookies").addEventListener("click", function () {
            localStorage.setItem("adminic_cookie_consent", "accepted");
            banner.style.display = "none";
        });
    }
});

// --- REDIRECT WARNING INTERCEPTOR ---
document.addEventListener('DOMContentLoaded', () => {
    // Inject Redirect Modal HTML
    const modalHTML = `
    <div id="redirect-modal" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] hidden items-center justify-center opacity-0 transition-opacity duration-300">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 max-w-sm w-[90%] mx-auto my-auto transform scale-95 transition-transform duration-300 text-center border border-slate-200 dark:border-slate-700">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400 text-2xl">
                <i class="fab fa-whatsapp" id="redirect-icon"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Saindo do Adminic</h3>
            <p class="text-slate-600 dark:text-slate-400 text-sm mb-6">Você está sendo redirecionado para um ambiente externo (<span id="redirect-dest">WhatsApp</span>). Deseja continuar?</p>
            <div class="flex gap-3 justify-center">
                <button id="cancel-redirect" class="px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">Cancelar</button>
                <a id="confirm-redirect" href="#" target="_blank" class="px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">Continuar</a>
            </div>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const redirectModal = document.getElementById('redirect-modal');
    const cancelBtn = document.getElementById('cancel-redirect');
    const confirmBtn = document.getElementById('confirm-redirect');
    const modalBox = redirectModal.querySelector('div');
    const redirectDest = document.getElementById('redirect-dest');
    const redirectIcon = document.getElementById('redirect-icon');
    
    let pendingUrl = '';

    function showModal(url) {
        pendingUrl = url;
        confirmBtn.href = url;
        
        if (url.includes('wa.me') || url.includes('whatsapp.com')) {
            redirectDest.textContent = 'WhatsApp';
            redirectIcon.className = 'fab fa-whatsapp';
        } else {
            redirectDest.textContent = new URL(url).hostname;
            redirectIcon.className = 'fas fa-external-link-alt';
        }
        
        redirectModal.classList.remove('hidden');
        redirectModal.classList.add('flex');
        
        // Trigger animation
        setTimeout(() => {
            redirectModal.classList.remove('opacity-0');
            modalBox.classList.remove('scale-95');
        }, 10);
    }

    function hideModal() {
        redirectModal.classList.add('opacity-0');
        modalBox.classList.add('scale-95');
        
        setTimeout(() => {
            redirectModal.classList.add('hidden');
            redirectModal.classList.remove('flex');
            pendingUrl = '';
        }, 300);
    }

    cancelBtn.addEventListener('click', hideModal);
    confirmBtn.addEventListener('click', hideModal);

    // Intercept clicks on links
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        
        const href = link.getAttribute('href');
        if (!href) return;
        
        // Check if external (starts with http but not same hostname, or explicit wa.me)
        try {
            const isExternal = (href.startsWith('http') && !href.includes(window.location.hostname)) || href.includes('wa.me');
            if (isExternal) {
                e.preventDefault();
                showModal(link.href);
            }
        } catch (err) {}
    });
});
