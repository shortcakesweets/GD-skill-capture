const response = await fetch("https://shortcakesweets.github.io/GD-skill-capture/main");
const html = await response.text();
document.documentElement.innerHTML = html;