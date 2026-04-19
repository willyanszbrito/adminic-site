import glob
import re

html_files = glob.glob('*.html')

for filepath in html_files:
    if filepath == 'layout.html': continue

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Support button text to hide on mobile
    # We look for <div class="text-left"> inside <button id="support-trigger" ...>
    # Simple regex replacing '<div class="text-left">' with '<div class="text-left hidden sm:block">'
    # Only if it's the one inside the widget
    if 'id="support-trigger"' in content and 'class="text-left"' in content:
        content = content.replace('<div class="text-left">', '<div class="text-left hidden md:block">')

    # 2. Update Mobile Menu JS
    # We want to replace the `mobileMenuButton.addEventListener` and `const mobileLinks` blocks
    
    # First, let's inject `document.body.classList.toggle('overflow-hidden');`
    # Replace:
    # mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    # with:
    # document.body.classList.toggle('overflow-hidden');
    # mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    
    if "document.body.classList.toggle('overflow-hidden');" not in content:
        content = content.replace(
            "mobileMenu.classList.toggle('active');\n                mobileMenuButton.setAttribute('aria-expanded', !isExpanded);",
            "mobileMenu.classList.toggle('active');\n                document.body.classList.toggle('overflow-hidden');\n                mobileMenuButton.setAttribute('aria-expanded', !isExpanded);"
        )
    
    # Next, modify the `const mobileLinks = ...` to `const mobileLinks = mobileMenu.querySelectorAll('a, button[role=\"menuitem\"]');`
    # Warning: it might already be `a` or `a, button...`
    # We will use regex to find the assignment of mobileLinks:
    content = re.sub(r"const mobileLinks = mobileMenu\.querySelectorAll\('.*?'\);",
                     r"const mobileLinks = mobileMenu.querySelectorAll('a, button[role=\"menuitem\"]');",
                     content)
                     
    # Now inject `document.body.classList.remove('overflow-hidden');` into the close logic
    # The close logic looks like:
    """
    mobileMenu.classList.remove('active');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
    """
    # So we replace that sequence:
    
    replacement_close = """mobileMenu.classList.remove('active');
                    document.body.classList.remove('overflow-hidden');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');"""

    content = content.replace(
        "mobileMenu.classList.remove('active');\n                    mobileMenuButton.setAttribute('aria-expanded', 'false');",
        replacement_close
    )
    content = content.replace(
        "mobileMenu.classList.remove('active');\n                mobileMenuButton.setAttribute('aria-expanded', 'false');",
        replacement_close
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated JS Menu Logic & Support Widget visibility on all HTML files.")
