function renderMarkdown(text) {
    const rules = [
        // Headers with color
        { regex: /h1-(#[0-9A-Fa-f]{6})\s(.+)/g, replacement: '<h1 style="color: $1;">$2</h1>' },
        { regex: /h2-(#[0-9A-Fa-f]{6})\s(.+)/g, replacement: '<h2 style="color: $1;">$2</h2>' },
        { regex: /h3-(#[0-9A-Fa-f]{6})\s(.+)/g, replacement: '<h3 style="color: $1;">$2</h3>' },
        { regex: /h4-(#[0-9A-Fa-f]{6})\s(.+)/g, replacement: '<h4 style="color: $1;">$2</h4>' },

        // Lists
        { regex: /#\s(.+)/g, replacement: '<ul><li>$1</li></ul>' },

        // Images
        { regex: /!\[(.*?)\]\((.*?)\)/g, replacement: '<img src="$2" alt="$1" style="max-width: 100%;">' },

        // Links
        { regex: /\[(.*?)\]\((.*?)\)/g, replacement: '<a href="$2">$1</a>' },

        // Video
        { regex: /<video src="(.+)" controls>/g, replacement: '<video src="$1" controls style="max-width: 100%;"></video>' },

        // Bold Text
        { regex: /\*\*(.*?)\*\*/g, replacement: '<strong>$1</strong>' },

        // Italic Text
        { regex: /\*(.*?)\*/g, replacement: '<em>$1</em>' },

        // Blockquotes
        { regex: />\s(.+)/g, replacement: '<blockquote>$1</blockquote>' },

        // Dividers
        { regex: /(?:---|\*\*\*|___)/g, replacement: '<hr>' }
    ];

    let html = text;

    rules.forEach(rule => {
        html = html.replace(rule.regex, rule.replacement);
    });

    return html;
}

document.getElementById('editor').addEventListener('input', function () {
    const text = this.value;
    const html = renderMarkdown(text);
    document.getElementById('preview').innerHTML = html;
    document.getElementById('generated-html').textContent = html;
});