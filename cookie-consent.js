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
