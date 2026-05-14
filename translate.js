const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const replacements = [
    // Brand Data
    { search: /Dentia\s+—\s+Dentist\s+&\s+Dental\s+Clinic\s+Website\s+Template/g, replace: 'MTV - SAÚDE | Clínica Médica' },
    { search: /Dentia/g, replace: 'MTV - SAÚDE' },
    { search: /100\s+S\s+Main\s+St,\s+New\s+York,\s+NY/g, replace: 'R. João Pinheiro, 2539 - Conj. Boa Vista, Uberaba' },
    { search: /\+1\s+123\s+456\s+789/g, replace: '(34) 3312-3298' },
    { search: /contact@dentiaclinic\.com/g, replace: 'contato@mtvsaude.com.br' },
    { search: /contact@dentiacare\.com/g, replace: 'contato@mtvsaude.com.br' },
    { search: /Family\s+Dental\s+Care/g, replace: 'Cuidado e Saúde para sua Família' },
    
    // UI & CTA
    { search: /Book Appointment/g, replace: 'Agendar Consulta' },
    { search: /Home/g, replace: 'Início' },
    { search: /Services/g, replace: 'Serviços' },
    { search: /Dentists/g, replace: 'Corpo Clínico' },
    { search: /Pages/g, replace: 'Páginas' },
    { search: /Contact/g, replace: 'Contato' },
    { search: /About Us/g, replace: 'Sobre Nós' },
    { search: /Gallery/g, replace: 'Galeria' },
    { search: /Testimonials/g, replace: 'Depoimentos' },
    { search: /Read more/g, replace: 'Leia mais' },
    { search: /View All Services/g, replace: 'Ver Todos os Serviços' },
    
    // Index Page Strings
    { search: /Elevating Smiles with Expert Care and a Gentle Touch/g, replace: 'Elevando o Padrão de Saúde com Cuidado Especializado' },
    { search: /Google Rating/g, replace: 'Avaliação no Google' },
    { search: /Based on 23k Reviews/g, replace: 'Baseado em +23 mil avaliações' },
    { search: /Need Dental Services\?/g, replace: 'Precisa de Atendimento Médico?' },
    { search: /Opening Hours/g, replace: 'Horário de Funcionamento' },
    { search: /Mon to Sat 08:00 - 20:00/g, replace: 'Seg a Sáb 08:00 - 20:00' },
    { search: /Email Us/g, replace: 'Envie um E-mail' },
    { search: /Professionals and Personalized Dental Excellence/g, replace: 'Excelência Médica e Atendimento Personalizado' },
    { search: /Complete Care for Every Smile/g, replace: 'Cuidado Completo para Sua Saúde' },
    { search: /General Dentistry/g, replace: 'Clínica Geral' },
    { search: /Cosmetic Dentistry/g, replace: 'Procedimentos Estéticos' },
    { search: /Pediatric Dentistry/g, replace: 'Pediatria' },
    { search: /Restorative Dentistry/g, replace: 'Reabilitação Médica' },
    { search: /Preventive Dentistry/g, replace: 'Medicina Preventiva' },
    { search: /Orthodontics/g, replace: 'Ortopedia' },
    { search: /Happy Patients/g, replace: 'Pacientes Satisfeitos' },
    { search: /Teeth Whitened/g, replace: 'Consultas Realizadas' },
    { search: /Dental Implants/g, replace: 'Exames Feitos' },
    { search: /Years of Exeperience/g, replace: 'Anos de Experiência' },
    { search: /Why Choose Our Dental Care/g, replace: 'Por que Escolher a MTV - SAÚDE' },
    { search: /Exceptional Service With a Personal Touch/g, replace: 'Serviço Excepcional com Toque Pessoal' },
    { search: /Everything You Need to Know/g, replace: 'Tudo o que Você Precisa Saber' },
    { search: /Frequently Asked Questions/g, replace: 'Perguntas Frequentes' },
    { search: /Meet Our Dental Team/g, replace: 'Conheça Nosso Corpo Clínico' },
    { search: /Committed to Your Smile/g, replace: 'Comprometidos com a Sua Saúde' },
    { search: /Our Happy Customers/g, replace: 'Nossos Pacientes' },
    { search: /Ready to book your dental care session\?/g, replace: 'Pronto para agendar sua consulta médica?' },
    { search: /Company/g, replace: 'A Clínica' },
    
    // Forms
    { search: /Your Name/g, replace: 'Seu Nome' },
    { search: /Your Email/g, replace: 'Seu E-mail' },
    { search: /Your Phone/g, replace: 'Seu Telefone' },
    { search: /Select Service/g, replace: 'Selecione o Serviço' },
    { search: /Select Date/g, replace: 'Selecione a Data' },
    { search: /Select Time/g, replace: 'Selecione o Horário' },
    { search: /Your Message/g, replace: 'Sua Mensagem' },
    { search: /Submit Message/g, replace: 'Enviar Mensagem' },
    { search: /First Name/g, replace: 'Nome' },
    { search: /Last Name/g, replace: 'Sobrenome' }
];

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    for (const r of replacements) {
        content = content.replace(r.search, r.replace);
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Translated ${file}`);
}
