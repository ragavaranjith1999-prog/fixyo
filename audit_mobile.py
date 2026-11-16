import os
import re

with open('css/style.css', 'r', encoding='utf-8') as f:
    style_css = f.read()

with open('css/responsive.css', 'r', encoding='utf-8') as f:
    resp_css = f.read()

print("--- Checking fixed widths or min-widths in style.css ---")
min_widths = re.findall(r'([^{}]*\{[^}]*min-width:\s*([^;]+);[^}]*\})', style_css)
for rule, val in min_widths:
    if 'px' in val:
        val_clean = val.strip()
        print(f"Min-width {val_clean}: {rule.split('{')[0].strip()}")

print("\n--- Checking fixed widths in style.css (> 280px) ---")
widths = re.findall(r'([^{}]*\{[^}]*width:\s*(\d+)px;[^}]*\})', style_css)
for rule, w in widths:
    if int(w) > 280:
        print(f"Width {w}px: {rule.split('{')[0].strip()}")

print("\n--- Checking media queries in responsive.css ---")
media_queries = re.findall(r'@media[^{]+\{', resp_css)
for mq in media_queries:
    print(mq.strip())
