const fs = require('fs');

const replacements = [
    // ---- Títulos e subtítulos das páginas de serviços ----
    { search: /Comprehensive Oral Care for Every Stage of Life/g, replace: 'Cuidado Bucal Completo para Cada Fase da Vida' },
    { search: /Our general dentistry services focus on the prevention, diagnosis, and treatment of a wide range of oral health issues\. Whether you're coming in for a routine check-up or seeking relief from dental pain, our experienced team is here to help you maintain a healthy, confident smile\./g, replace: 'Nossos serviços de clínica geral focam na prevenção, diagnóstico e tratamento de uma ampla gama de problemas bucais. Seja para um check-up de rotina ou para alívio de dores, nossa equipe experiente está aqui para ajudá-lo a manter um sorriso saudável e confiante.' },
    { search: /Building Healthy Smiles That Last a Lifetime/g, replace: 'Construindo Sorrisos Saudáveis para a Vida Toda' },
    { search: /We believe the best dental care begins with prevention\. Preventive dentistry helps children avoid dental problems before they start, ensuring strong, healthy teeth and good habits that last into adulthood\. Our goal is to make every visit positive, educational, and supportive for both kids and parents\./g, replace: 'Acreditamos que o melhor cuidado dental começa com a prevenção. A odontologia preventiva ajuda a evitar problemas antes que comecem, garantindo dentes fortes e hábitos saudáveis duradouros. Nosso objetivo é tornar cada visita positiva, educativa e acolhedora.' },

    // ---- Cards de serviços (Clínica Geral) ----
    { search: /Routine Exams &amp; Cleanings/g, replace: 'Exames e Limpezas de Rotina' },
    { search: /Routine Exams & Cleanings/g, replace: 'Exames e Limpezas de Rotina' },
    { search: /Keep your teeth and gums healthy with regular check-ups and cleanings\./g, replace: 'Mantenha seus dentes e gengivas saudáveis com check-ups e limpezas regulares.' },
    { search: /Digital X-rays &amp; Diagnostics/g, replace: 'Radiografias Digitais e Diagnósticos' },
    { search: /Digital X-rays & Diagnostics/g, replace: 'Radiografias Digitais e Diagnósticos' },
    { search: /Quick, safe imaging to detect hidden dental issues early\./g, replace: 'Imagens rápidas e seguras para detectar problemas dentários ocultos precocemente.' },
    { search: /Tooth-Colored Fillings/g, replace: 'Restaurações na Cor do Dente' },
    { search: /Natural-looking solutions to treat cavities and restore strength to your teeth\./g, replace: 'Soluções de aparência natural para tratar cáries e restaurar a resistência dos seus dentes.' },
    { search: /Tooth Extractions/g, replace: 'Extrações Dentárias' },
    { search: /Comfortable, gentle removal of damaged or problematic teeth\./g, replace: 'Remoção confortável e delicada de dentes danificados ou problemáticos.' },
    { search: /Root Canal Therapy/g, replace: 'Tratamento de Canal' },
    { search: /Save infected teeth with this pain-relieving, tooth-saving procedure\./g, replace: 'Salve dentes infectados com este procedimento que alivia a dor e preserva o dente.' },
    { search: /Gum Disease Treatment/g, replace: 'Tratamento de Doenças Gengivais' },
    { search: /Non-surgical and deep-cleaning options to treat gingivitis and periodontitis\./g, replace: 'Opções de limpeza profunda e não cirúrgica para tratar gengivite e periodontite.' },

    // ---- Seção "Por que nos escolher" ----
    { search: /Top Reasons/g, replace: 'Principais Motivos' },
    { search: /Why Choose Us/g, replace: 'Por que nos Escolher' },
    { search: /Why Choose Our Preventive Dental Serviços\?/g, replace: 'Por que Escolher Nossa Odontologia Preventiva?' },
    { search: /Why Choose Our Preventive Dental Services\?/g, replace: 'Por que Escolher Nossa Odontologia Preventiva?' },
    { search: /Experienced &amp; Gentle Corpo Clínico/g, replace: 'Equipe Experiente e Gentil' },
    { search: /Experienced & Gentle Corpo Clínico/g, replace: 'Equipe Experiente e Gentil' },
    { search: /Modern Technology/g, replace: 'Tecnologia Moderna' },
    { search: /Flexible Appointments/g, replace: 'Agendamentos Flexíveis' },
    { search: /Transparent Pricing/g, replace: 'Preços Transparentes' },
    { search: /Sterile &amp; Safe Facility/g, replace: 'Ambiente Esterilizado e Seguro' },
    { search: /Sterile & Safe Facility/g, replace: 'Ambiente Esterilizado e Seguro' },

    // ---- Preventiva - diferenciais ----
    { search: /Kid-Friendly Environment/g, replace: 'Ambiente Aconchegante para Crianças' },
    { search: /Our space is fun, welcoming, and designed to keep children relaxed and happy during every visit\./g, replace: 'Nosso espaço é divertido e acolhedor, projetado para manter as crianças relaxadas e felizes em cada visita.' },
    { search: /Experienced Pediatric Corpo Clínico/g, replace: 'Equipe Pediátrica Experiente' },
    { search: /Our team has advanced training in caring for children, using gentle techniques\./g, replace: 'Nossa equipe tem treinamento avançado no cuidado infantil, utilizando técnicas delicadas.' },
    { search: /Preventive Focus/g, replace: 'Foco na Prevenção' },
    { search: /We emphasize early detection and education to help kids avoid problems before they start\./g, replace: 'Enfatizamos a detecção precoce e a educação para ajudar as crianças a evitar problemas antes que comecem.' },
    { search: /We use child-safe digital X-rays and advanced tools to ensure accuracy, safety, and comfort\./g, replace: 'Usamos radiografias digitais seguras para crianças e ferramentas avançadas para garantir precisão, segurança e conforto.' },
    { search: /Parent &amp; Patient Education/g, replace: 'Educação para Pais e Pacientes' },
    { search: /Parent & Patient Education/g, replace: 'Educação para Pais e Pacientes' },
    { search: /We take time to teach proper brushing, flossing, and nutrition to build long-term dental health\./g, replace: 'Ensinamos a escovação correta, uso do fio dental e nutrição para construir uma saúde dental duradoura.' },
    { search: /Flexible Scheduling/g, replace: 'Horários Flexíveis' },
    { search: /We offer after-school and weekend appointments to fit your family's busy schedule\./g, replace: 'Oferecemos agendamentos após o horário escolar e aos finais de semana para se adequar à rotina da sua família.' },

    // ---- Preventiva - tratamentos ----
    { search: /Preventive Treatments We Offer/g, replace: 'Tratamentos Preventivos que Oferecemos' },
    { search: /Maintain a healthy smile with regular checkups and cleanings that remove plaque and detect early issues\./g, replace: 'Mantenha um sorriso saudável com check-ups e limpezas regulares que removem a placa e detectam problemas precocemente.' },
    { search: /Fluoride Treatments/g, replace: 'Aplicação de Flúor' },
    { search: /Strengthen enamel and help prevent cavities with safe, quick fluoride applications tailored for kids\./g, replace: 'Fortaleça o esmalte e previna cáries com aplicações de flúor seguras e rápidas, ideais para crianças.' },
    { search: /Dental Sealants/g, replace: 'Selantes Dentários' },
    { search: /Protect your child's molars from decay with a thin, invisible coating that lasts for years\./g, replace: 'Proteja os molares do seu filho da cárie com um revestimento fino e invisível que dura anos.' },
    { search: /Digital X-Rays/g, replace: 'Radiografias Digitais' },
    { search: /Safe, low-radiation imaging to catch cavities, monitor growth, and ensure accurate diagnosis\./g, replace: 'Imagens seguras com baixa radiação para detectar cáries, monitorar o crescimento e garantir um diagnóstico preciso.' },
    { search: /Oral Health Education/g, replace: 'Educação em Saúde Bucal' },
    { search: /We teach kids and parents how to care for teeth at home—setting the foundation for lifelong habits\./g, replace: 'Ensinamos crianças e pais a cuidar dos dentes em casa — estabelecendo a base para hábitos de vida saudáveis.' },
    { search: /Habit Counseling/g, replace: 'Orientação de Hábitos' },
    { search: /Gentle support to help children break habits like thumb sucking or pacifier use that affect oral health\./g, replace: 'Apoio gentil para ajudar crianças a abandonar hábitos como chupar o dedo ou uso de chupeta que afetam a saúde bucal.' },

    // ---- Depoimentos em inglês ----
    { search: /The staff is so patient and gentle with my daughter\. She actually looks forward to going to the dentist now!/g, replace: 'A equipe é muito paciente e gentil com minha filha. Ela realmente aguarda ansiosa para ir ao dentista agora!' },
    { search: /We had an emergency and they saw us the same day\. I'm so grateful for their quick response and kindness!/g, replace: 'Tivemos uma emergência e nos atenderam no mesmo dia. Sou muito grata pela resposta rápida e gentileza!' },
    { search: /Clean, cheerful, and professional\. The entire team makes dental visits a positive experience for my kids\./g, replace: 'Limpo, animado e profissional. Toda a equipe torna as visitas odontológicas uma experiência positiva para meus filhos.' },
    { search: /My son used to be terrified of dentists\. Now he walks in with a smile\. I can't thank this team enough!/g, replace: 'Meu filho tinha pavor de dentistas. Agora entra sorrindo. Não tenho palavras para agradecer a esta equipe!' },

    // ---- CTA em inglês residual ----
    { search: /Ready to Agende sua Avaliação\?/g, replace: 'Pronto para Agendar sua Avaliação?' },
    { search: /Contato us today to schedule your visit and take the first step toward a healthier smile\./g, replace: 'Entre em contato hoje para agendar sua visita e dar o primeiro passo rumo a um sorriso mais saudável.' },

    // ---- Outros textos em inglês ----
    { search: /Preventive Care/g, replace: 'Cuidado Preventivo' },
    { search: /Why Choose Us/g, replace: 'Por que nos Escolher' },

    // ---- Cosméticos ----
    { search: /Transform Your Smile With Stunning Aesthetic Treatments/g, replace: 'Transforme Seu Sorriso com Tratamentos Estéticos Incríveis' },
    { search: /Aesthetic dentistry goes beyond health — it's about confidence\./g, replace: 'A odontologia estética vai além da saúde — é sobre confiança.' },
    { search: /Teeth Whitening/g, replace: 'Clareamento Dental' },
    { search: /Brighten your smile by several shades with our professional whitening treatments\./g, replace: 'Ilumine seu sorriso vários tons com nossos tratamentos profissionais de clareamento.' },
    { search: /Dental Veneers/g, replace: 'Facetas Dentárias' },
    { search: /Porcelain or composite shells that perfect the shape, size, and color of your teeth\./g, replace: 'Capas de porcelana ou resina que aperfeiçoam a forma, tamanho e cor dos seus dentes.' },
    { search: /Smile Makeovers/g, replace: 'Redesign do Sorriso' },
    { search: /A fully customized treatment plan to completely transform your smile\./g, replace: 'Um plano de tratamento totalmente personalizado para transformar completamente o seu sorriso.' },
    { search: /Composite Bonding/g, replace: 'Restauração com Resina' },
    { search: /Quick and affordable fix for chips, gaps, or discoloration using tooth-colored resin\./g, replace: 'Solução rápida e acessível para lascas, espaços ou descoloração usando resina na cor do dente.' },
    { search: /Gum Contouring/g, replace: 'Contorno Gengival' },
    { search: /Reshape uneven or excessive gum tissue to improve your smile's symmetry\./g, replace: 'Remodele o tecido gengival irregular ou excessivo para melhorar a simetria do seu sorriso.' },

    // ---- Restauração ----
    { search: /Dental Implants/g, replace: 'Implantes Dentários' },
    { search: /Permanent, natural-looking replacements for missing teeth that function just like real ones\./g, replace: 'Substituições permanentes e naturais para dentes ausentes que funcionam como dentes reais.' },
    { search: /Dental Bridges/g, replace: 'Pontes Dentárias' },
    { search: /Bridges/g, replace: 'Pontes' },
    { search: /Custom prosthetics to replace one or more missing teeth anchored to adjacent teeth\./g, replace: 'Próteses personalizadas para substituir um ou mais dentes ausentes, apoiadas nos dentes adjacentes.' },
    { search: /Dentures/g, replace: 'Próteses Totais' },
    { search: /Full or partial removable appliances to restore your smile and chewing ability\./g, replace: 'Aparelhos removíveis totais ou parciais para restaurar seu sorriso e capacidade mastigatória.' },
    { search: /Dental Crowns/g, replace: 'Coroas Dentárias' },
    { search: /Protect and strengthen damaged, cracked, or heavily filled teeth with durable crowns\./g, replace: 'Proteja e fortaleça dentes danificados, rachados ou com grandes restaurações com coroas resistentes.' },
    { search: /Inlays &amp; Onlays/g, replace: 'Inlays e Onlays' },
    { search: /Inlays & Onlays/g, replace: 'Inlays e Onlays' },
    { search: /Conservative restorations for moderately damaged teeth as an alternative to full crowns\./g, replace: 'Restaurações conservadoras para dentes moderadamente danificados como alternativa às coroas completas.' },
    { search: /Full-Mouth Rehabilitation/g, replace: 'Reabilitação Oral Completa' },
    { search: /Comprehensive restoration of all teeth for patients with extensive dental damage or loss\./g, replace: 'Restauração completa de todos os dentes para pacientes com danos ou perda dental extensos.' },
    { search: /Experienced Pediatric Corpo Cl[ií]nico/g, replace: 'Equipe Pediátrica Experiente' },

    // ---- Ortodontia ----
    { search: /Straighten Your Smile With Precision and Comfort/g, replace: 'Alinhe Seu Sorriso com Precisão e Conforto' },
    { search: /Achieve the straight, confident smile you've always wanted with our modern orthodontic solutions\./g, replace: 'Conquiste o sorriso alinhado e confiante que sempre desejou com nossas soluções ortodônticas modernas.' },
    { search: /Traditional Braces/g, replace: 'Aparelho Convencional' },
    { search: /Time-tested metal or ceramic braces for effective alignment of all smile types\./g, replace: 'Aparelhos metálicos ou de cerâmica consagrados para alinhamento eficaz de todos os tipos de sorriso.' },
    { search: /Clear Aligners/g, replace: 'Alinhadores Transparentes' },
    { search: /Invisible, removable trays custom-made to gradually move teeth into perfect alignment\./g, replace: 'Placas invisíveis e removíveis feitas sob medida para mover gradualmente os dentes ao alinhamento perfeito.' },
    { search: /Retainers/g, replace: 'Contenções' },
    { search: /Post-treatment retainers to maintain the results and keep your smile looking perfect\./g, replace: 'Contenções pós-tratamento para manter os resultados e manter seu sorriso perfeito.' },
    { search: /Palate Expanders/g, replace: 'Expansores Palatinos' },
    { search: /Widen the upper jaw to create space and improve bite alignment in children and teens\./g, replace: 'Alargue o maxilar superior para criar espaço e melhorar o alinhamento da mordida em crianças e adolescentes.' },
    { search: /Orthodontic Consultations/g, replace: 'Consultas Ortodônticas' },
    { search: /A thorough evaluation to determine the best treatment plan for your unique smile needs\./g, replace: 'Uma avaliação completa para determinar o melhor plano de tratamento para as necessidades únicas do seu sorriso.' },
    { search: /Why Choose Our Preventive Dental Serviços\?/g, replace: 'Por que Escolher Nossa Ortodontia?' },
];

const directoryPath = './';
const files = fs.readdirSync(directoryPath).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    replacements.forEach(({ search, replace }) => {
        if (content.match(search)) {
            content = content.replace(search, replace);
            changed = true;
        }
    });

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`✅ Traduzido: ${file}`);
    }
});

console.log('\n🎉 Tradução das páginas de serviços concluída!');
