const fs = require('fs');

const files = fs.readdirSync('./').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // 1. Remove o mega dropdown do menu Início (com todas as versões de homepage)
    const megaMenuRegex = /<li><a class="menu-item" href="index\.html">Início<\/a>\s*<ul class="mega">[\s\S]*?<\/ul>\s*<\/li>/g;
    if (megaMenuRegex.test(content)) {
        content = content.replace(megaMenuRegex, '<li><a class="menu-item" href="index.html">Início</a></li>');
        changed = true;
    }

    // 2. Remove o item Blog do menu
    const blogMenuRegex = /\s*<li><a class="menu-item" href="blog\.html">Blog<\/a><\/li>/g;
    if (blogMenuRegex.test(content)) {
        content = content.replace(blogMenuRegex, '');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`✅ Atualizado: ${file}`);
    }
});

console.log('\n🎉 Menu limpo com sucesso!');
