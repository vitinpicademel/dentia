const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const footerSearch = /<h5>Contato Us<\/h5>[\s\S]*?contato@mtvsaude\.com\.br/g;
const footerReplace = `<h5>Contato</h5>
                            <div class="fw-bold text-white"><i class="icofont-location-pin me-2 id-color"></i>Unidade 1</div>
                            R. João Pinheiro, 2539 - Conj. Boa Vista, Uberaba
                            <br>Tel: (34) 3312-3298 | Whats: (34) 9 9970-0284

                            <div class="spacer-20"></div>

                            <div class="fw-bold text-white"><i class="icofont-location-pin me-2 id-color"></i>Unidade 2</div>
                            Av. Nossa Senhora do Desterro, 1803 - Jardim Libanio
                            <br>Tel: (34) 3313-0003 | Whats: (34) 3313-0003
                            
                            <div class="spacer-20"></div>
                            
                            <div class="fw-bold text-white"><i class="icofont-envelope me-2 id-color"></i>E-mail</div>
                            contato@mtvsaude.com.br`;

const replacements = [
    { search: footerSearch, replace: footerReplace },
    { search: /Our Serviços/g, replace: 'Nossos Serviços' },
    { search: /by Designesia/g, replace: '' },
    { search: /At Dentia, we’re dedicated to providing high-quality, personalized dental care for patients of all ages. Our skilled team uses the latest technology to ensure comfortable, efficient treatments and beautiful, healthy smiles for life./g, replace: 'Na MTV - SAÚDE, nos dedicamos a fornecer atendimento de alta qualidade e cuidado humanizado para todos os nossos pacientes. Nossa equipe qualificada utiliza o que há de melhor para garantir o seu bem-estar.' },
    { search: /At MTV - SAÚDE, we’re dedicated to providing high-quality, personalized dental care for patients of all ages. Our skilled team uses the latest technology to ensure comfortable, efficient treatments and beautiful, healthy smiles for life./g, replace: 'Na MTV - SAÚDE, nos dedicamos a fornecer atendimento de alta qualidade e cuidado humanizado para todos os nossos pacientes. Nossa equipe qualificada utiliza o que há de melhor para garantir o seu bem-estar.' },
    { search: /Clinic Location/g, replace: 'Localização' },
    { search: /Call Us/g, replace: 'Ligue para Nós' }
];

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    for (const r of replacements) {
        content = content.replace(r.search, r.replace);
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated footer in ${file}`);
}
