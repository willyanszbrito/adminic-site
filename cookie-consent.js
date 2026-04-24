// cookie-consent.js
document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("adminic_cookie_consent")) {
        const banner = document.createElement("div");
        banner.id = "cookie-consent-banner";
        banner.innerHTML = `
            <div style="position: fixed; bottom: 0; left: 0; right: 0; background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(10px); color: #e2e8f0; padding: 16px 24px; z-index: 9999; display: flex; flex-direction: column; justify-content: space-between; align-items: center; gap: 16px; border-top: 1px solid rgba(255,255,255,0.1); font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; text-align: left; box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);">
                <div style="flex: 1; width: 100%;">
                    <strong style="color: #fff; font-size: 14px; margin-bottom: 4px; display: block;">Aviso de Privacidade e Cookies 🍪</strong>
                    Nós utilizamos cookies e armazenamento local para lembrar suas preferências e garantir o bom funcionamento de nossas demonstrações. Não usamos seus dados para rastreamento invasivo. Ao continuar navegando, você concorda com nossa <a href="politica.html" style="color: #3b82f6; text-decoration: underline;">Política de Privacidade</a> e <a href="termos.html" style="color: #3b82f6; text-decoration: underline;">Termos de Uso</a>.
                </div>
                <div style="display: flex; align-items: center; justify-content: center; width: 100%; margin-top: 5px;">
                    <button id="accept-cookies" style="background-color: #3b82f6; color: #fff; font-weight: 700; border: none; padding: 10px 24px; border-radius: 9999px; cursor: pointer; transition: background-color 0.2s; white-space: nowrap; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; width: 100%; max-width: 300px;">Entendi e Aceito</button>
                </div>
            </div>
        `;
        
        const style = document.createElement('style');
        style.innerHTML = `
            @media (min-width: 768px) {
                #cookie-consent-banner > div:first-child { flex-direction: row !important; max-width: 1200px; margin: 0 auto; }
                #cookie-consent-banner > div:first-child > div:last-child { width: auto !important; margin-top: 0 !important; }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(banner);

        document.getElementById("accept-cookies").addEventListener("click", function () {
            localStorage.setItem("adminic_cookie_consent", "accepted");
            banner.style.display = "none";
        });
    }
});
