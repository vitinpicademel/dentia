const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const replacements = [
    // ===========================
    // LOGOS: trocar .webp por .png MTV
    // ===========================
    { search: /images\/logo-white\.webp/g, replace: 'images/logo-white.png' },
    { search: /images\/logo-black\.webp/g, replace: 'images/logo-black.png' },
    
    // ===========================
    // NOME DA CLINICA CORRIGIDO
    // ===========================
    { search: /MTV - SAÚDE/g, replace: 'MTV Odontologia e Saúde' },
    { search: /mtvsaude\.com\.br/g, replace: 'mtvsaude.com.br' },
    
    // ===========================
    // AVALIACOES CORRETAS (Google: 4,9 | 52 avaliações)
    // ===========================
    { search: /5\.0/g, replace: '4,9' },
    { search: /Baseado em \+23 mil avaliações/g, replace: 'Baseado em 52 avaliações no Google' },
    { search: /Based on 23k Reviews/g, replace: 'Baseado em 52 avaliações no Google' },
    
    // ===========================
    // TEXTOS EM INGLÊS RESTANTES
    // ===========================
    { search: /Need Dental Serviços\?/g, replace: 'Precisa de Atendimento?' },
    { search: /Need Dental Services\?/g, replace: 'Precisa de Atendimento?' },
    { search: /Call: \(34\) 3312-3298/g, replace: 'Tel: (34) 3312-3298' },
    { search: /All Serviços/g, replace: 'Todos os Serviços' },
    { search: /All Services/g, replace: 'Todos os Serviços' },
    { search: /Send a Message/g, replace: 'Envie uma Mensagem' },
    { search: /Get in Touch/g, replace: 'Entre em Contato' },
    { search: /Write Us/g, replace: 'Escreva-nos' },
    { search: /We offer high-quality dental care tailored for the whole family\. From routine checkups to advanced treatments, our compassionate team ensures your smile stays healthy and confident\./g, replace: 'Oferecemos atendimento odontológico de alta qualidade para toda a família. Do check-up de rotina a tratamentos avançados, nossa equipe cuida do seu sorriso com carinho e profissionalismo.' },
    { search: /Personalized Treatment Plans/g, replace: 'Planos de Tratamento Personalizados' },
    { search: /Gentle Care for Kids and Adults/g, replace: 'Cuidado Gentil para Crianças e Adultos' },
    { search: /State-of-the-Art Technology/g, replace: 'Tecnologia de Ponta' },
    { search: /Flexible Appointment Scheduling/g, replace: 'Agendamento Flexível' },
    { search: /Complete oral care for every smile with cleanings, exams, and more\./g, replace: 'Cuidado bucal completo com limpezas, exames e muito mais.' },
    { search: /Enhance your smile's beauty with whitening, veneers, and more\./g, replace: 'Realce a beleza do seu sorriso com clareamento, facetas e mais.' },
    { search: /Gentle and fun dental care for kids to grow healthy, happy smiles\./g, replace: 'Cuidado odontológico gentil e divertido para crianças crescerem com sorrisos saudáveis.' },
    { search: /Repair and restore your teeth for lasting comfort and function\./g, replace: 'Repare e restaure seus dentes para conforto e função duradouros.' },
    { search: /Choosing the right dental provider matters\. We combine expert care, advanced technology, and a warm atmosphere to ensure every visit is comfortable, efficient, and tailored to your unique needs\./g, replace: 'Escolher o provedor de saúde certo é fundamental. Combinamos cuidado especializado, tecnologia avançada e um ambiente acolhedor para garantir que cada visita seja confortável e personalizada.' },
    { search: /Experienced Dental/g, replace: 'Profissionais Experientes' },
    { search: /Skilled care backed by years of trusted dental experience\./g, replace: 'Atendimento qualificado respaldado por anos de experiência de confiança.' },
    { search: /Modern tools ensure accurate and efficient treatments\./g, replace: 'Equipamentos modernos garantem tratamentos precisos e eficientes.' },
    { search: /Custom care plans made to fit your smile and lifestyle\./g, replace: 'Planos de cuidado personalizados para o seu sorriso e estilo de vida.' },
    { search: /Welcoming space for kids, teens, adults, and seniors\./g, replace: 'Ambiente acolhedor para crianças, adolescentes, adultos e idosos.' },
    { search: /Our experienced dental team is here to make every visit positive and personalized\. With gentle hands and caring hearts\./g, replace: 'Nossa experiente equipe está aqui para tornar cada visita positiva e personalizada. Com mãos habilidosas e coração acolhedor.' },
    { search: /Join thousands of happy patients who trust us for gentle, expert care and beautiful smiles\. Your perfect dental experience starts here!/g, replace: 'Junte-se a dezenas de pacientes felizes que confiam em nós para um cuidado especializado e sorriso bonito. Sua experiência perfeita começa aqui!' },
    { search: /How often should I visit the dentist\?/g, replace: 'Com que frequência devo visitar o dentista?' },
    { search: /It's recommended to see your dentist every 6 months for a routine check-up and cleaning, unless advised otherwise\./g, replace: 'Recomenda-se visitar o dentista a cada 6 meses para check-up de rotina e limpeza, salvo orientação contrária.' },
    { search: /What should I do in a dental emergency\?/g, replace: 'O que fazer em uma emergência odontológica?' },
    { search: /Call our office immediately\. We offer same-day emergency care for issues like severe pain, broken teeth, or swelling\./g, replace: 'Ligue para nossa clínica imediatamente. Oferecemos atendimento emergencial no mesmo dia para dor intensa, dentes quebrados ou inchaço.' },
    { search: /Do you offer services for kids\?/g, replace: 'Vocês atendem crianças?' },
    { search: /Absolutely! We provide gentle, friendly pediatric dental care for children of all ages\./g, replace: 'Com certeza! Oferecemos cuidado odontológico pediátrico gentil e amigável para crianças de todas as idades.' },
    { search: /What are my options for replacing missing teeth\?/g, replace: 'Quais são as opções para substituir dentes perdidos?' },
    { search: /We offer dental implants, bridges, and dentures depending on your needs and preferences\./g, replace: 'Oferecemos implantes dentários, pontes e próteses de acordo com suas necessidades e preferências.' },
    { search: /Is teeth whitening safe\?/g, replace: 'O clareamento dental é seguro?' },
    { search: /Yes, when performed by a dental professional, teeth whitening is safe and effective with long-lasting results\./g, replace: 'Sim, quando realizado por um profissional, o clareamento é seguro, eficaz e com resultados duradouros.' },
    { search: /I've always been nervous about dental visits/g, replace: 'Sempre tive medo de ir ao dentista' },
    { search: /Family-Friendly/g, replace: 'Ambiente Familiar' },
    { search: /Our Serviços/g, replace: 'Nossos Serviços' },
    { search: /Lead Dentist/g, replace: 'Dentista Principal' },
    { search: /Cosmetic Dentist/g, replace: 'Dentista Estético' },
    { search: /Pediatric Specialist/g, replace: 'Especialista em Odontopediatria' },
    { search: /Dental Hygienist/g, replace: 'Higienista Dental' },
    { search: /Customer/g, replace: 'Paciente' },
    { search: /Contact Us/g, replace: 'Contato' },
    { search: /Dentist &amp; Dental Clinic/g, replace: 'Clínica Odontológica' },
    { search: /Copyright 2024/g, replace: 'Copyright 2026' },
    { search: /Dentia &amp; Dental Clinic Website Template/g, replace: 'MTV Odontologia e Saúde' },

    // Subheader / breadcrumbs
    { search: /Back to home/g, replace: 'Voltar ao Início' },
    { search: /You are here/g, replace: 'Você está em' },
];

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    for (const r of replacements) {
        content = content.replace(r.search, r.replace);
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Atualizado: ${file}`);
}

console.log('\n🎉 Todos os arquivos foram atualizados com sucesso!');
