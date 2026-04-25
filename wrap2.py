import re

def process_demo(filename, wrapper_classes):
    with open('index.html', 'r', encoding='utf-8') as f:
        index_html = f.read()

    # Get index head and nav
    head_nav_match = re.search(r'(<!DOCTYPE html>.*?<nav.*?</nav>)', index_html, re.DOTALL)
    top_html = head_nav_match.group(1)
    
    # Get index footer and end
    footer_match = re.search(r'(<footer.*?</html>)', index_html, re.DOTALL)
    bottom_html = footer_match.group(1)

    with open(filename, 'r', encoding='utf-8') as f:
        demo_html = f.read()

    # Extract demo styles
    style_match = re.search(r'<style>(.*?)</style>', demo_html, re.DOTALL)
    demo_style = style_match.group(1) if style_match else ""

    # Extract demo body
    body_match = re.search(r'<body[^>]*>(.*?)</body>', demo_html, re.DOTALL)
    demo_body = body_match.group(1)

    # We need to insert the demo styles into the top_html head
    top_html = top_html.replace('</head>', f'<style>{demo_style}</style>\n</head>')

    # Wrap the demo body
    wrapped_body = f'''
    <main class="flex-grow flex items-center justify-center py-4 px-2 md:py-8 relative" style="min-height: calc(100dvh - 80px);">
        <div id="demo-app-container" class="{wrapper_classes}">
            {demo_body}
        </div>
    </main>
    '''

    # For whatsapp, add the theme override logic
    if 'whatsapp' in filename:
        theme_override = """
        <script>
        // Override theme toggle to sync WA theme
        const originalToggle = toggleTheme;
        toggleTheme = function() {
            if(typeof toggleWATheme === 'function') {
                toggleWATheme();
            }
            const html = document.documentElement;
            if (html.classList.contains('dark')) {
                html.classList.remove('dark');
                localStorage.theme = 'light';
            } else {
                html.classList.add('dark');
                localStorage.theme = 'dark';
            }
            const themeIcons = document.querySelectorAll('.theme-toggle-icon');
            themeIcons.forEach(icon => {
                icon.classList.remove('fa-sun', 'fa-moon');
                icon.classList.add(html.classList.contains('dark') ? 'fa-moon' : 'fa-sun');
            });
        };
        </script>
        """
        wrapped_body += theme_override

    final_html = top_html + '\n' + wrapped_body + '\n' + bottom_html

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(final_html)

# WhatsApp Container Classes
wa_classes = "wa-app-wrapper w-full max-w-[400px] h-[calc(100dvh-120px)] max-h-[850px] min-h-[500px] bg-[var(--wa-bg)] rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border-[6px] md:border-[10px] border-slate-800 dark:border-slate-900 overflow-hidden relative flex flex-col mx-auto"

# Dashboard Container Classes
dash_classes = "dash-app-wrapper w-full max-w-[1200px] min-h-[80vh] bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden relative mx-auto"

process_demo('demo-whatsapp.html', wa_classes)
process_demo('demo-dashboard.html', dash_classes)
print("Merge successful.")
