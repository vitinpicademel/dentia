const fs = require('fs');
const path = require('path');

const directoryPath = './';
const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Replace names
    if (content.includes('Dr. Sarah Bennett')) {
        content = content.replace(/Dr\. Sarah Bennett/g, 'Dra. Vanessa Cristina');
        changed = true;
    }
    if (content.includes('Dr. Maya Lin')) {
        content = content.replace(/Dr\. Maya Lin/g, 'Dr. Marco Tulio');
        changed = true;
    }
    if (content.includes('Dr. Michael Reyes')) {
        content = content.replace(/Dr\. Michael Reyes/g, 'Dr. Mattheus Mendonça');
        changed = true;
    }

    // Remove Dr. James Carter card and adjust layout
    // We look for the common block structure
    const jamesCarterRegex = /<div class="col-lg-3(?: col-md-6)?">\s*<div class="relative rounded-1 overflow-hidden">\s*<div class="rounded-1 overflow-hidden wow fadeIn zoomIn">\s*<img src="images\/team\/4\.webp"[\s\S]*?Dr\. James Carter[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
    
    if (content.match(jamesCarterRegex)) {
        content = content.replace(jamesCarterRegex, '');
        changed = true;
    }

    // Adjust columns and add justify-content-center ONLY in the team section
    const teamSectionRegex = /<div class="row g-4">\s*(?=<div class="col-lg-3">\s*<div class="relative rounded-1 overflow-hidden">)/g;
    
    if (content.match(teamSectionRegex)) {
        content = content.replace(teamSectionRegex, '<div class="row g-4 justify-content-center">\n                        ');
        // Now replace col-lg-3 with col-lg-4 ONLY within the next few occurrences after this row
        // This is a bit tricky with simple regex, but let's try to match the specific cards
        const cardRegex = /<div class="col-lg-3">\s*(?=<div class="relative rounded-1 overflow-hidden">)/g;
        content = content.replace(cardRegex, '<div class="col-lg-4 col-md-6">');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`✅ Atualizado: ${file}`);
    }
});
