# Adminic Site (SaaS Landing Page & Portal)

### 🚀 Sobre o Projeto
Landing page institucional e portal de demonstração do **Adminic**, uma plataforma SaaS proprietária voltada para automação, gestão de leads e CRM inteligente. Este repositório concentra a camada de apresentação, recursos de atendimento e demonstrações interativas para clientes.

### 🛠️ Arquitetura e Stack Técnica
* **Apresentação:** HTML5 semântico estruturado para máxima indexação SEO.
* **Componentização e Estilização:** CSS3 modular estruturado em padrões de responsividade mobile-first.
* **Interações:** JavaScript (Vanilla) para animações suaves, consentimento de cookies e tratamento de fluxos de contato.
* **Automação de Build:** Script utilitário em Python (`wrap.py` / `wrap2.py`) para empacotamento de layouts, injeção de cabeçalhos e otimização de templates reutilizáveis (DRY).

### 📂 Estrutura de Arquivos Principal
* `index.html` - Página de entrada (Hero, Features, Pricing).
* `layout.html` - Base estrutural compartilhada para reaproveitamento de componentes globais (Nav/Footer).
* `demo-*.html` - Páginas de demonstração integradas (Dashboard, Planilha, fluxos de WhatsApp).
* `central-ajuda.html` - Base de conhecimento para autoatendimento.
* `wrap.py` / `wrap2.py` - Compiladores estáticos customizados em Python.

### 🔧 Como Executar Localmente
1. Certifique-se de ter o Python 3 instalado.
2. Execute o utilitário de build para compilar as páginas (se aplicável):
   ```bash
   python wrap.py
   ```
3. Abra o arquivo `index.html` diretamente em seu navegador ou utilize uma extensão de servidor local (ex: Live Server).
