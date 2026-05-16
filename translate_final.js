const fs = require('fs');

const replacements = [
    // ===== ORTODONTIA =====
    { from: `Transform Your Smile with Expert Orthodontic Care`, to: `Transforme Seu Sorriso com Cuidado Ortodôntico Especializado` },
    { from: `We offer comprehensive orthodontic services designed to help you achieve a healthier, more beautiful smile. Whether you are considering braces, Invisalign, or other treatments, our experienced team is here to guide you every step of the way.`, to: `Oferecemos serviços ortodônticos completos para ajudá-lo a conquistar um sorriso mais saudável e bonito. Seja aparelho, alinhadores ou outros tratamentos, nossa equipe experiente está aqui para orientá-lo em cada etapa.` },
    { from: `Orthodontic Treatments We Offer`, to: `Tratamentos Ortodônticos que Oferecemos` },
    { from: `Traditional Metal Braces`, to: `Aparelho Metálico Convencional` },
    { from: `The most common and reliable method for straightening teeth and correcting bite issues for all ages.`, to: `O método mais comum e confiável para alinhar dentes e corrigir problemas de mordida em todas as idades.` },
    { from: `Ceramic Braces`, to: `Aparelho Cerâmico` },
    { from: `A more discreet alternative to metal braces, using clear or tooth-colored materials that blend with your smile.`, to: `Uma alternativa mais discreta ao aparelho metálico, usando materiais transparentes ou na cor do dente que se integram ao sorriso.` },
    { from: `Virtually invisible aligners that offer a comfortable, removable, and discreet way to straighten teeth.`, to: `Alinhadores praticamente invisíveis que oferecem uma forma confortável, removível e discreta de alinhar os dentes.` },
    { from: `Early Orthodontic Treatment`, to: `Tratamento Ortodôntico Precoce` },
    { from: `Interventions for children to guide proper jaw growth and prevent more serious issues later.`, to: `Intervenções para crianças que orientam o crescimento correto da mandíbula e previnem problemas mais graves no futuro.` },
    { from: `Essential appliances to maintain your new smile after braces or aligner treatment.`, to: `Dispositivos essenciais para manter o seu novo sorriso após o tratamento com aparelho ou alinhadores.` },
    { from: `Surgical Ortopedia`, to: `Ortodontia Cirúrgica` },
    { from: `Orthodontic treatment combined with surgery to correct severe jaw misalignments and bite problems.`, to: `Tratamento ortodôntico combinado com cirurgia para corrigir desalinhamentos graves da mandíbula e problemas de mordida.` },
    // Ortodontia - diferenciais
    { from: `Experienced Team`, to: `Equipe Experiente` },
    { from: `Our board-certified orthodontists have years of experience providing top-quality care with the latest techniques and technology in orthodontics.`, to: `Nossos ortodontistas têm anos de experiência oferecendo cuidado de alta qualidade com as mais recentes técnicas e tecnologias.` },
    { from: `We take the time to understand your unique needs and create a treatment plan tailored specifically to you.`, to: `Dedicamos tempo para entender suas necessidades únicas e criar um plano de tratamento personalizado especificamente para você.` },
    { from: `Comfortable Environment`, to: `Ambiente Confortável` },
    { from: `We strive to create a welcoming, stress-free atmosphere for patients of all ages, making each visit enjoyable and relaxing.`, to: `Nos esforçamos para criar um ambiente acolhedor e sem estresse para pacientes de todas as idades, tornando cada visita agradável e relaxante.` },
    { from: `We use state-of-the-art tools, such as digital X-rays and 3D imaging, to ensure the most accurate diagnosis and treatment plan for you.`, to: `Utilizamos ferramentas de última geração, como radiografias digitais e imagens 3D, para garantir o diagnóstico e plano de tratamento mais precisos.` },
    { from: `Flexible Payment Plans`, to: `Planos de Pagamento Flexíveis` },
    { from: `We offer various payment options to make orthodontic care accessible to everyone, including financing and insurance assistance.`, to: `Oferecemos diversas opções de pagamento para tornar o cuidado ortodôntico acessível a todos, incluindo financiamento e apoio de convênios.` },
    { from: `Proven Results`, to: `Resultados Comprovados` },
    { from: `We have helped thousands of patients achieve their dream smiles, delivering beautiful, long-lasting results that boost both oral health and confidence.`, to: `Ajudamos milhares de pacientes a conquistar o sorriso dos sonhos, entregando resultados bonitos e duradouros que impulsionam a saúde bucal e a confiança.` },
    // Ortodontia - depoimentos
    { from: `The staff is so patient and gentle with my daughter. She actually looks forward to going to the orthodontist now!`, to: `A equipe é tão paciente e gentil com minha filha. Ela realmente aguarda ansiosa para ir ao ortodontista agora!` },
    { from: `I couldn't be happier with my Invisalign results. The process was smooth, and my smile looks amazing!`, to: `Não poderia estar mais feliz com meu resultado do Invisalign. O processo foi tranquilo e meu sorriso ficou incrível!` },
    { from: `Dr. [Name] explained everything clearly and made me feel at ease about getting braces as an adult. So glad I went for it!`, to: `O doutor explicou tudo com clareza e me deixou tranquila em colocar aparelho na fase adulta. Fico feliz de ter ido em frente!` },
    { from: `My teen just got his braces off, and the results are fantastic. We're so grateful for the care and attention he received throughout the process.`, to: `Meu adolescente acabou de tirar o aparelho e os resultados são fantásticos. Somos muito gratos pelo cuidado e atenção que ele recebeu durante todo o processo.` },

    // ===== REABILITAÇÃO =====
    { from: `Restore Your Smile with Confidence`, to: `Restaure Seu Sorriso com Confiança` },
    { from: `Fillings`, to: `Restaurações` },
    { from: `Restore cavities with durable, tooth-colored fillings that blend seamlessly with your natural smile.`, to: `Restaure cáries com obturações duráveis na cor do dente que se integram perfeitamente ao seu sorriso natural.` },
    { from: `Crowns`, to: `Coroas` },
    { from: `Cap a damaged or decayed tooth with a custom-made crown for strength and aesthetic appeal.`, to: `Cubra um dente danificado ou cariado com uma coroa personalizada para maior resistência e estética.` },
    { from: `Replace missing teeth by securing a prosthetic tooth between two healthy teeth with a dental bridge.`, to: `Substitua dentes ausentes fixando um dente protético entre dois dentes saudáveis com uma ponte dentária.` },
    { from: `Exames Feitos`, to: `Implantes Dentários` },
    { from: `A permanent solution for missing teeth, providing a stable foundation for crowns, bridges, or dentures.`, to: `Uma solução permanente para dentes ausentes, fornecendo uma base estável para coroas, pontes ou próteses.` },
    { from: `Restore missing teeth with custom-made dentures that help you chew, speak, and smile with confidence.`, to: `Restaure dentes ausentes com próteses personalizadas que ajudam você a mastigar, falar e sorrir com confiança.` },
    { from: `Custom restorations that fit inside or on top of a damaged tooth for a more conservative solution than crowns.`, to: `Restaurações personalizadas que se encaixam dentro ou sobre um dente danificado, como alternativa mais conservadora às coroas.` },
    { from: `Root Canals`, to: `Tratamentos de Canal` },
    { from: `Save a damaged or infected tooth by removing the affected tissue and restoring the tooth to full function.`, to: `Salve um dente danificado ou infectado removendo o tecido afetado e restaurando o dente à função completa.` },
    { from: `When a tooth is beyond repair, we offer gentle extractions and follow-up options like implants or bridges.`, to: `Quando um dente não pode ser salvo, oferecemos extrações delicadas e opções de acompanhamento como implantes ou pontes.` },
    { from: `Veneers`, to: `Facetas de Porcelana` },
    { from: `Enhance the appearance of your smile with custom-made porcelain veneers that cover imperfections and create a flawless smile.`, to: `Melhore a aparência do seu sorriso com facetas de porcelana personalizadas que cobrem imperfeições e criam um sorriso impecável.` },
    // Reabilitação - diferenciais
    { from: `We've designed our office with kids in mind, creating a welcoming, fun, and comfortable space for your little ones.`, to: `Projetamos nosso consultório pensando nas crianças, criando um espaço acolhedor, divertido e confortável para os pequenos.` },
    { from: `Our team is highly trained in pediatric dentistry, specializing in treating young patients with gentle and compassionate care.`, to: `Nossa equipe é altamente treinada em odontopediatria, especializando-se no atendimento de pacientes jovens com cuidado gentil e compassivo.` },
    { from: `Comprehensive Care`, to: `Atendimento Completo` },
    { from: `We offer a full range of services, from routine checkups and cleanings to specialized treatments like orthodontics and restorative dentistry.`, to: `Oferecemos uma gama completa de serviços, de check-ups e limpezas de rotina a tratamentos especializados como ortodontia e reabilitação oral.` },
    { from: `We utilize the latest dental technology, ensuring accurate diagnoses, efficient treatments, and the highest level of comfort for your child.`, to: `Utilizamos a mais recente tecnologia odontológica, garantindo diagnósticos precisos, tratamentos eficientes e o mais alto nível de conforto para seu filho.` },
    { from: `Emergency Care`, to: `Atendimento de Emergência` },
    { from: `We provide emergency dental care for unexpected issues, ensuring your child receives prompt treatment when needed most.`, to: `Oferecemos atendimento odontológico de emergência para situações inesperadas, garantindo que seu filho receba tratamento rápido quando mais precisar.` },
    { from: `Convenient Hours`, to: `Horários Convenientes` },
    { from: `We offer flexible hours to fit your busy schedule, including after-school and weekend appointments, to make dental care as easy as possible.`, to: `Oferecemos horários flexíveis para se adaptar à sua agenda, incluindo agendamentos após o horário escolar e aos finais de semana.` },

    // ===== PEDIATRIA =====
    { from: `OWe specialize in gentle, personalized dental care for infants, children, and teens. From a child's first tooth to their teenage years, our goal is to create a comfortable, fun, and educational environment for every visit.`, to: `Somos especializados em cuidado odontológico gentil e personalizado para bebês, crianças e adolescentes. Do primeiro dentinho até a adolescência, nosso objetivo é criar um ambiente confortável, divertido e educativo em cada visita.` },
    { from: `Kid-friendly and calming environment designed just for children`, to: `Ambiente acolhedor e tranquilo projetado especialmente para crianças` },
    { from: `Experienced, board-certified pediatric dentists`, to: `Odontopediatras experientes e certificados` },
    { from: `Comfortable treatment rooms with fun themes`, to: `Salas de atendimento confortáveis com temas divertidos` },
    { from: `Parents welcome during exams and treatments`, to: `Pais bem-vindos durante exames e tratamentos` },
    { from: `Focus on education to build lifelong healthy habits`, to: `Foco em educação para construir hábitos saudáveis para a vida toda` },
    { from: `Flexible scheduling and emergency care available`, to: `Agendamento flexível e atendimento de emergência disponível` },
    // Pediatria - cards
    { from: `Infant Oral Health Exams`, to: `Exames de Saúde Bucal para Bebês` },
    { from: `Gentle exams for babies to monitor development and guide parents on early dental care.`, to: `Exames delicados para bebês para monitorar o desenvolvimento e orientar os pais sobre o cuidado odontológico precoce.` },
    { from: `Protect young teeth with cleanings, fluoride treatments, and dental sealants.`, to: `Proteja os dentes dos pequenos com limpezas, aplicação de flúor e selantes dentários.` },
    { from: `Safe, low-radiation imaging to detect dental issues early and accurately.`, to: `Imagens seguras com baixa radiação para detectar problemas dentários de forma precoce e precisa.` },
    { from: `Natural-looking fillings to repair cavities while keeping your child's smile bright.`, to: `Restaurações de aparência natural para tratar cáries mantendo o sorriso da criança bonito.` },
    { from: `Emergency Cuidado Odontológico`, to: `Atendimento Odontológico de Emergência` },
    { from: `Quick, compassionate care for dental injuries, toothaches, and accidents.`, to: `Atendimento rápido e compassivo para lesões dentárias, dores de dente e acidentes.` },
    { from: `Sedation Dentistry`, to: `Odontologia com Sedação` },
    { from: `Safe sedation options to help anxious children feel calm and comfortable.`, to: `Opções seguras de sedação para ajudar crianças ansiosas a se sentirem tranquilas e confortáveis.` },
    // Pediatria - depoimentos
    { from: `Dr. Sarah and her team are amazing with kids! My son used to be afraid of the dentist, but now he actually looks forward to his check-ups.`, to: `A equipe é incrível com as crianças! Meu filho tinha medo do dentista, mas agora ele aguarda ansioso pelos check-ups.` },
    { from: `The entire office is kid-friendly and welcoming. They explained every step clearly and made my daughter feel comfortable throughout.`, to: `Todo o consultório é acolhedor para crianças. Explicaram cada etapa com clareza e deixaram minha filha confortável durante todo o processo.` },
    { from: `My kids love going here! The staff is kind, patient, and always has a smile. You can tell they really care about children.`, to: `Meus filhos adoram vir aqui! A equipe é gentil, paciente e está sempre sorrindo. Dá para ver que eles realmente se importam com as crianças.` },
    { from: `From the moment we walked in, we felt at ease. The waiting area was fun for the kids, and the staff made sure we were all comfortable.`, to: `Desde o momento em que entramos, nos sentimos à vontade. A sala de espera era divertida para as crianças, e a equipe garantiu que todos estivéssemos confortáveis.` },
    { from: `My child needed a filling and was so nervous, but the dentist explained everything so kindly. They made it a positive experience from start to finish.`, to: `Meu filho precisava de uma restauração e estava muito nervoso, mas o dentista explicou tudo com muita gentileza. Fizeram disso uma experiência positiva do início ao fim.` },
    { from: `I appreciate how they involve parents in the process. They answered all my questions and gave great tips for dental care at home.`, to: `Aprecio como eles envolvem os pais no processo. Responderam todas as minhas perguntas e deram ótimas dicas de cuidado dental em casa.` },
    { from: `Our family loves this dental office! They're always on time, so friendly, and my twins leave with big smiles and new toothbrushes.`, to: `Nossa família adora este consultório! Sempre pontuais, muito simpáticos, e meus gêmeos saem com grandes sorrisos e escovas novas.` },
    { from: `Even during a dental emergency, they handled everything calmly and quickly. We felt cared for every step of the way.`, to: `Mesmo durante uma emergência odontológica, eles trataram tudo com calma e rapidez. Nos sentimos cuidados em cada etapa.` },

    // ===== ESTÉTICA - depoimentos residuais =====
    { from: `I was always self-conscious about my teeth. After my bonding and reshaping, it's like I have a brand-new smile. Quick, painless, and totally worth it.`, to: `Sempre tive vergonha dos meus dentes. Após a restauração e escultura dental, parece que tenho um sorriso novo. Rápido, indolor e totalmente válido.' },\n    { from: \`I never thought I'd love my smile this much. The veneers look so natural, and the process was surprisingly comfortable. I finally feel confident in every photo!\`, to: \`Nunca pensei que amaria tanto meu sorriso. As facetas ficaram tão naturais e o processo foi surpreendentemente confortável. Finalmente me sinto confiante em todas as fotos!` },

    // ===== PREVENTIVA - textos residuais =====
    { from: `Protect your child's molars from decay with a thin, invisible coating that lasts for years.`, to: `Proteja os molares do seu filho da cárie com um revestimento fino e invisível que dura anos.` },
    { from: `My son used to be terrified of dentists. Now he walks in with a smile. I can't thank this team enough!`, to: `Meu filho tinha pavor de dentistas. Agora entra sorrindo. Não tenho palavras para agradecer a esta equipe!' },\n    { from: \`We had an emergency and they saw us the same day. I'm so grateful for their quick response and kindness!\`, to: \`Tivemos uma emergência e nos atenderam no mesmo dia. Sou muito grata pela resposta rápida e gentileza!` },
];

const serviceFiles = [
    'service-orthodontics.html',
    'service-restorative-dentistry.html',
    'service-pediatric-dentistry.html',
    'service-preventive-dentistry.html',
    'service-cosmetic-dentistry.html',
    'service-general-dentistry.html',
];

let totalChanges = 0;

serviceFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    let fileChanged = false;

    replacements.forEach(({ from, to }) => {
        if (content.includes(from)) {
            content = content.split(from).join(to);
            fileChanged = true;
        }
    });

    if (fileChanged) {
        fs.writeFileSync(file, content);
        totalChanges++;
        console.log(`✅ Traduzido: ${file}`);
    } else {
        console.log(`✔️  Sem alterações: ${file}`);
    }
});

console.log(`\n🎉 Concluído! ${totalChanges} arquivo(s) traduzido(s).`);
