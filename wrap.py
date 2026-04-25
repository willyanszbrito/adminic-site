import re

with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Extract header/nav and footer
head_match = re.search(r'(<head>.*?</head>)', index_html, re.DOTALL)
nav_match = re.search(r'(<nav.*?</nav>)', index_html, re.DOTALL)
footer_match = re.search(r'(<footer.*?</footer>.*?</body>\s*</html>)', index_html, re.DOTALL)

with open('demo-whatsapp.html', 'r', encoding='utf-8') as f:
    wa_html = f.read()

# Replace body contents of WA to be wrapped inside the layout
wa_style_match = re.search(r'(<style>.*?</style>)', wa_html, re.DOTALL)
wa_style = wa_style_match.group(1) if wa_style_match else ''
wa_body_content = re.search(r'<body[^>]*>(.*?)</body>', wa_html, re.DOTALL).group(1)

# Add custom override script for theme
theme_override = """<script>
// Theme toggle override for layout
function toggleTheme() { 
    if(typeof toggleWATheme === 'function') toggleWATheme(); 
    document.body.classList.toggle('dark-mode'); 
    const icon = document.querySelector('.theme-toggle-icon'); 
    if (document.body.classList.contains('dark-mode')) { 
        icon.classList.remove('fa-sun'); 
        icon.classList.add('fa-moon'); 
    } else { 
        icon.classList.remove('fa-moon'); 
        icon.classList.add('fa-sun'); 
    } 
}
</script>"""

wa_body_content = wa_body_content.replace('<script>', theme_override + '\n<script>')

wrapped_wa = f'''<!DOCTYPE html>
<html lang="pt-BR">
{head_match.group(1).replace("</head>", wa_style + "\\n</head>")}
<body class="bg-slate-50 text-slate-900 dark:bg-[#020617] dark:text-slate-200 selection:bg-blue-500/30 text-sm min-h-screen flex flex-col transition-colors duration-300">
{nav_match.group(1)}
<main class="flex-grow flex items-center justify-center py-4 px-2 md:py-12 relative" style="min-height: calc(100dvh - 80px);">
    <div id="wa-app-container" class="wa-app-wrapper w-full max-w-[420px] h-[85vh] max-h-[850px] min-h-[600px] bg-white dark:bg-[#0b141a] rounded-[2rem] md:rounded-[3rem] shadow-2xl border-[6px] md:border-[12px] border-slate-800 dark:border-slate-900 overflow-hidden relative flex flex-col mx-auto">
        {wa_body_content}
    </div>
</main>
{footer_match.group(1)}
'''

# Do the same for demo-dashboard.html
with open('demo-dashboard.html', 'r', encoding='utf-8') as f:
    dash_html = f.read()

dash_style = re.search(r'(<style>.*?</style>)', dash_html, re.DOTALL).group(1)
dash_body_content = re.search(r'<body[^>]*>(.*?)</body>', dash_html, re.DOTALL).group(1)

dash_body_content = dash_body_content.replace('<script>', theme_override + '\n<script>')

wrapped_dash = f'''<!DOCTYPE html>
<html lang="pt-BR">
{head_match.group(1).replace("</head>", dash_style + "\\n</head>")}
<body class="bg-slate-50 text-slate-900 dark:bg-[#020617] dark:text-slate-200 selection:bg-blue-500/30 text-sm min-h-screen flex flex-col transition-colors duration-300">
{nav_match.group(1)}
<main class="flex-grow py-6 px-4 md:py-12 relative w-full">
    {dash_body_content}
</main>
{footer_match.group(1)}
'''

with open('demo-whatsapp.html', 'w', encoding='utf-8') as f:
    f.write(wrapped_wa)

with open('demo-dashboard.html', 'w', encoding='utf-8') as f:
    f.write(wrapped_dash)

print("Merged layouts.")
