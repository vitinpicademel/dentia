const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const fixes = [
    { search: /View Todos os Serviços/g, replace: 'Ver Todos os Serviços' },
    { search: /View Todos os Servi.os/g, replace: 'Ver Todos os Serviços' },
    { search: /Ver Todos os Servi.os/g, replace: 'Ver Todos os Serviços' },
    // Corrigir encoding issues nos caracteres especiais que podem ter corrompido
    { search: /Servi\?os/g, replace: 'Serviços' },
    { search: /Clínica Odontológica em Uberaba/g, replace: 'Clínica Odontológica em Uberaba' },
    // Texto "Avaliação" que pode ter corrompido
    { search: /Avalia.ao no Google/g, replace: 'Avaliação no Google' },
    // "Agendar Consulta" 
    { search: /Agendar Consulta/g, replace: 'Agendar Consulta' },
    // Corrigir heading da clínica odontológica  
    { search: /Dentist &amp; Dental Clinic Website Template/g, replace: 'MTV Odontologia e Saúde' },
    { search: /Clínica Odontológica - MTV Odontologia e Saúde/g, replace: 'MTV Odontologia e Saúde' },
];

let count = 0;
for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    for (const r of fixes) {
        content = content.replace(r.search, r.replace);
    }
    fs.writeFileSync(filePath, content, 'utf8');
    count++;
}
console.log(`✅ ${count} arquivos verificados e corrigidos.`);
