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
    { search: /Horário de Funcionamento/g, replace: 'Horário de Funcionamento' },
    { search: /Seg a Sáb 08:00 - 20:00/g, replace: 'Seg a Sex 09:00-12:00 / 14:00-19:00 <br> Sáb 08:00-12:00' },
    { search: /Mon to Sat 08:00 - 20:00/g, replace: 'Seg a Sex 09:00-12:00 / 14:00-19:00 <br> Sáb 08:00-12:00' },
    { search: /Monday - Friday 08.00 - 18.00/g, replace: 'Seg a Sex 09:00-12:00 / 14:00-19:00 <br> Sáb 08:00-12:00' },
    { search: /Seg a Sex 09:00 - 12:00 e 14:00 - 19:00/g, replace: 'Seg a Sex 09:00-12:00 / 14:00-19:00 <br> Sáb 08:00-12:00' },
    { search: /Seg a Sex 09:00-12:00 \/ 14:00-19:00 \| Sáb 08:00-12:00/g, replace: 'Seg a Sex 09:00-12:00 / 14:00-19:00 <br> Sáb 08:00-12:00' },
    { search: /Tel: \(34\) 3312-3298/g, replace: 'Tel: (34) 3312-3298' },
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
    { search: /<h4>Clínica Geral<\/h4>/g, replace: '<h4>Ortodontia!</h4>' },
    { search: /<p>Cuidado bucal completo com limpezas, exames e muito mais\.<\/p>/g, replace: '<p>Sorriso alinhado com tecnologia de ponta e aparelhos modernos.</p>' },
    
    { search: /<h4>Procedimentos Estéticos<\/h4>/g, replace: '<h4>Alinhadores</h4>' },
    { search: /<p>Realce a beleza do seu sorriso com clareamento, facetas e muito mais\.<\/p>/g, replace: '<p>A solução invisível e confortável para alinhar seus dentes.</p>' },
    
    { search: /<h4>Pediatria<\/h4>/g, replace: '<h4>Lentes de Contato (Resina)</h4>' },
    { search: /<p>Cuidado odontológico gentil e divertido para crianças crescerem com sorrisos saudáveis\.<\/p>/g, replace: '<p>Transforme sua estética dental com agilidade, beleza e alta resistência.</p>' },
    
    { search: /<h4>Reabilitação Médica<\/h4>/g, replace: '<h4>Lentes de Contato (Porcelana)</h4>' },
    { search: /<p>Repare e restaure seus dentes para conforto e função duradouros\.<\/p>/g, replace: '<p>O ápice da estética dental com durabilidade e perfeição natural.</p>' },

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

    // Additional missing translations
    { search: /From routine cleanings to advanced restorations, we provide personalized dental solutions for patients of all ages\./g, replace: 'Desde limpezas de rotina a restaurações avançadas, oferecemos soluções personalizadas para pacientes de todas as idades.' },
    { search: /Enhance your smile[’']s beauty with whitening, veneers, and more\./g, replace: 'Realce a beleza do seu sorriso com clareamento, facetas e muito mais.' },
    { search: /Advanced Technology/g, replace: 'Tecnologia Avançada' },
    { search: /Personalized Treatment/g, replace: 'Tratamento Personalizado' },
    { search: /It[’']s recommended to see your dentist every 6 months for a routine check-up and cleaning, unless advised otherwise\./g, replace: 'Recomenda-se visitar seu dentista a cada 6 meses para check-up e limpeza de rotina, salvo outra orientação.' },
    
    // Testimonials
    { search: /"I[’']ve always been nervous about dental visits, but the staff made me feel completely comfortable\. Their gentle care and attention to detail truly stand out\."/g, replace: '"Sempre tive receio de ir ao dentista, mas a equipe me deixou completamente à vontade. O cuidado gentil e a atenção aos detalhes são excepcionais."' },
    { search: /"My family and I have been coming here for years\. The service is exceptional, and the team always goes the extra mile to make sure we[’']re happy and well taken care of\."/g, replace: '"Minha família e eu viemos aqui há anos. O serviço é excepcional e a equipe sempre faz o máximo para garantir que estejamos felizes e bem cuidados."' },
    { search: /"I came in for a whitening treatment and left with a brand new level of confidence\. The results were amazing, and the staff made it such a relaxing experience\."/g, replace: '"Vim para um clareamento e saí com uma confiança renovada. Os resultados foram incríveis e a equipe tornou a experiência muito relaxante."' },
    { search: /"They[’']re professional, friendly, and genuinely care about your dental health\. I trust them completely and recommend them to anyone looking for great care\."/g, replace: '"Eles são profissionais, amigáveis e realmente se preocupam com sua saúde bucal. Confio plenamente neles e os recomenda a todos."' },
    { search: /"Hands down the best dental experience I[’']ve ever had\. Everything from scheduling to treatment was smooth, comfortable, and handled with a personal touch\."/g, replace: '"Sem dúvida a melhor experiência odontológica que já tive. Tudo, do agendamento ao tratamento, foi tranquilo, confortável e humanizado."' },
    { search: /"I[’']ve never felt more comfortable at a dentist[’']s office\. The team is so kind, professional, and thorough\. They always explain everything in detail, and I leave with a smile every time!"/g, replace: '"Nunca me senti tão confortável em um dentista. A equipe é muito gentil e profissional. Eles sempre explicam tudo detalhadamente e saio sempre com um sorriso!"' },
    { search: /"My experience here has been wonderful! The staff is friendly, the office is spotless, and the care is top-notch\. I always feel relaxed, and my teeth have never looked better!"/g, replace: '"Minha experiência aqui tem sido maravilhosa! A equipe é amigável, o consultório é impecável e o cuidado é de primeira linha. Me sinto sempre relaxado."' },
    { search: /"From the moment I walked in, I felt at ease\. The staff made me feel like family, and the care I received was exceptional\. I[’']m so happy with my smile—thank you for everything!"/g, replace: '"Desde o momento em que entrei, me senti à vontade. A equipe me fez sentir em família e o atendimento foi excepcional. Estou muito feliz com meu sorriso!"' },

    // Misc
    { search: /Read More/g, replace: 'Leia Mais' },
    { search: /View Details/g, replace: 'Ver Detalhes' },
    { search: /Our Blog/g, replace: 'Nosso Blog' },
    { search: /Latest News/g, replace: 'Últimas Notícias' },
    { search: /Book Appointment/g, replace: 'Agendar Consulta' },
    { search: /Dental Care/g, replace: 'Cuidado Odontológico' },
    { search: /Family Dental/g, replace: 'Odontologia Familiar' },
    { search: /Emergency Service/g, replace: 'Atendimento de Emergência' },
    { search: /Terms &amp; Conditions/g, replace: 'Termos e Condições' },
    { search: /Privacy Policy/g, replace: 'Política de Privacidade' },
    { search: /Follow Us/g, replace: 'Siga-nos' },
    { search: /About Us/g, replace: 'Sobre Nós' },
    { search: /Gallery/g, replace: 'Galeria' },
    { search: /Testimonials/g, replace: 'Depoimentos' },
    { search: /Contact/g, replace: 'Contato' },
    { search: /Iníciopage/g, replace: 'Página Inicial' },
    { search: /New: Página Inicial 9/g, replace: 'Nova: Página Inicial 9' },

    // Booking Page
    { search: /Thank You For Your Order/g, replace: 'Obrigado pelo seu Pedido' },
    { search: /We have received your request and will be processing it shortly\. Click button below if you want to make another order\./g, replace: 'Recebemos sua solicitação e entraremos em contato em breve. Clique no botão abaixo se desejar fazer outro agendamento.' },
    { search: /Re-order/g, replace: 'Novo Agendamento' },
    { search: /Book Your Appointment/g, replace: 'Agende sua Consulta' },
    { search: /Book your appointment today for expert dental care tailored to your needs\. Healthy, beautiful smiles start with a simple step, schedule now!/g, replace: 'Agende sua consulta hoje para um atendimento especializado e personalizado. Sorrisos saudáveis e bonitos começam com um simples passo, agende agora!' },
    { search: /placeholder="Name"/g, replace: 'placeholder="Nome"' },
    { search: /placeholder="Email"/g, replace: 'placeholder="E-mail"' },
    { search: /placeholder="Phone"/g, replace: 'placeholder="Telefone"' },
    { search: /placeholder="Message"/g, replace: 'placeholder="Mensagem"' },
    { search: /value=['"]Send Appointment['"]/g, replace: 'value="Agendar Consulta"' },
    { search: /Sorry there was an error sending your form\./g, replace: 'Desculpe, houve um erro ao enviar seu formulário.' },

    // Contact Page
    { search: /Contato Us/g, replace: 'Contato' },
    { search: /Get In Touch/g, replace: 'Entre em Contato' },
    { search: /We are always ready to help you and answer your questions/g, replace: 'Estamos sempre prontos para ajudar e responder às suas perguntas' },
    { search: /Whether you have a question, a suggestion, or just want to say hello, this is the place to do it\. Please fill out the form below with your details and message, and we'll get back to you as soon as possible\./g, replace: 'Se você tiver uma pergunta, sugestão ou apenas quiser dizer olá, este é o lugar. Preencha o formulário abaixo e entraremos em contato o mais breve possível.' },
    { search: /We're Open/g, replace: 'Estamos Abertos' },
    { search: /Ligue para Nós Directly/g, replace: 'Ligue Diretamente' },
    { search: /value=['"]Send Message['"]/g, replace: 'value="Enviar Mensagem"' },
    { search: /Your message has been sent successfully\. Refresh this page if you want to send more messages\./g, replace: 'Sua mensagem foi enviada com sucesso. Recarregue a página se desejar enviar mais mensagens.' },
    
    // Global Labels
    { search: />Home</g, replace: '>Início<' },
    { search: />About Us</g, replace: '>Sobre Nós<' },
    { search: />Services</g, replace: '>Serviços<' },
    { search: />Dentists</g, replace: '>Corpo Clínico<' },
    { search: />Pages</g, replace: '>Páginas<' },
    { search: />Contact</g, replace: '>Contato<' },
    { search: />Blog</g, replace: '>Blog<' },
    { search: />Gallery</g, replace: '>Galeria<' },
    { search: />Testimonials</g, replace: '>Depoimentos<' },
    { search: />FAQ</g, replace: '>Perguntas Frequentes<' },


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
