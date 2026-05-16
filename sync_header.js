const fs = require('fs');

// Lê o index.html como fonte da verdade
const indexContent = fs.readFileSync('index.html', 'utf8');

// Extrai o header do index.html (versão transparente com logo branca)
const headerTransparent = `        <!-- header begin -->
        <header class="transparent scroll-light">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="de-flex sm-pt10">
                            <div class="de-flex-col">
                                <!-- logo begin -->
                                <div id="logo">
                                    <a href="index.html">
                                        <img class="logo-main" src="images/logo-white.png" alt="" >
                                        <img class="logo-scroll" src="images/logo-black.png" alt="" >
                                        <img class="logo-mobile" src="images/logo-white.png" alt="" >
                                    </a>
                                </div>
                                <!-- logo end -->
                            </div>
                            <div class="de-flex-col header-col-mid">
                                <!-- mainemenu begin -->
                                <ul id="mainmenu">
                                    <li><a class="menu-item" href="index.html">Início</a></li>
                                    <li><a class="menu-item" href="services.html">Serviços</a>
                                        <ul>
                                            <li><a href="service-general-dentistry.html">Clínica Geral</a></li>
                                            <li><a href="service-cosmetic-dentistry.html">Procedimentos Estéticos</a></li>
                                            <li><a href="service-pediatric-dentistry.html">Pediatria</a></li>
                                            <li><a href="service-restorative-dentistry.html">Reabilitação Médica</a></li>
                                            <li><a href="service-preventive-dentistry.html">Medicina Preventiva</a></li>
                                            <li><a href="service-orthodontics.html">Ortopedia</a></li>
                                            <li><a href="services.html">Todos os Serviços</a></li>
                                        </ul>
                                    </li>
                                    <li><a class="menu-item" href="dentists.html">Corpo Clínico</a></li>
                                    <li><a class="menu-item" href="#">Páginas</a>
                                        <ul>
                                            <li><a href="about.html">Sobre Nós</a></li>
                                            <li><a href="faq.html">Perguntas Frequentes</a></li>
                                            <li><a href="gallery.html">Galeria</a></li>
                                            <li><a href="testimonials.html">Depoimentos</a></li>
                                        </ul>
                                    </li>
                                    <li><a class="menu-item" href="https://wa.me/5534992007248?text=Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o" target="_blank">Contato</a></li>
                                </ul>
                                <!-- mainmenu end -->
                            </div>
                            <div class="de-flex-col">
                                <div class="menu_side_area">
                                    <a href="https://wa.me/5534992007248?text=Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o" target="_blank" class="btn-main fx-slide"><span>Agendar Avaliação</span></a>
                                    <span id="menu-btn"></span>
                                </div>

                                <div id="btn-extra">
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <!-- header end -->`;

// Header para páginas internas (logo preta, sem transparent)
const headerLight = headerTransparent
    .replace('class="transparent scroll-light"', 'class="transparent header-light"')
    .replace('src="images/logo-white.png" alt="" >\n                                        <img class="logo-scroll" src="images/logo-black.png" alt="" >\n                                        <img class="logo-mobile" src="images/logo-white.png"', 
              'src="images/logo-black.png" alt="" >\n                                        <img class="logo-scroll" src="images/logo-black.png" alt="" >\n                                        <img class="logo-mobile" src="images/logo-black.png"');

// Overlay menu correto do index.html
const overlayMenu = `    <!-- overlay content begin -->
    <div id="extra-wrap" class="text-light">
        <div id="btn-close">
            <span></span>
            <span></span>
        </div>

        <div id="extra-content">
            <img src="images/logo-white.png" class="w-150px" alt="">

            <div class="spacer-30-line"></div>

            <h5>Sobre N&#243;s</h5>
            <p style="opacity:.75; font-size:14px; line-height:1.7em;">Na MTV Odontologia e Sa&#250;de, nos dedicamos a fornecer atendimento de alta qualidade e cuidado humanizado para todos os nossos pacientes.</p>

            <div class="social-icons" style="margin-bottom:0;">
                <a href="https://www.instagram.com/mtvsaude/" target="_blank" rel="noopener"><i class="fa-brands fa-instagram"></i></a>
                <a href="https://www.facebook.com/mtvsaude" target="_blank" rel="noopener"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="#"><i class="fa-brands fa-whatsapp"></i></a>
            </div>

            <div class="spacer-30-line"></div>

            <h5>Nossos Servi&#231;os</h5>
            <ul class="ul-check">
                <li><a href="service-general-dentistry.html">Cl&#237;nica Geral</a></li>
                <li><a href="service-cosmetic-dentistry.html">Procedimentos Est&#233;ticos</a></li>
                <li><a href="service-pediatric-dentistry.html">Pediatria</a></li>
                <li><a href="service-restorative-dentistry.html">Reabilita&#231;&#227;o M&#233;dica</a></li>
                <li><a href="service-preventive-dentistry.html">Medicina Preventiva</a></li>
                <li><a href="service-orthodontics.html">Ortopedia</a></li>
            </ul>

            <div class="spacer-30-line"></div>

            <h5>Contato</h5>
            <div class="fw-bold text-white" style="margin-bottom:4px;"><i class="icofont-location-pin me-2 id-color"></i>Unidade 1</div>
            <p style="opacity:.75; font-size:14px; margin-bottom:4px;">R. Jo&#227;o Pinheiro, 2539 - Conj. Boa Vista, Uberaba</p>
            <p style="opacity:.75; font-size:14px; margin-bottom:0;">Tel: (34) 3312-3298 | Whats: (34) 9 9970-0284</p>
            <div style="height:16px;"></div>
            <div class="fw-bold text-white" style="margin-bottom:4px;"><i class="icofont-location-pin me-2 id-color"></i>Unidade 2</div>
            <p style="opacity:.75; font-size:14px; margin-bottom:4px;">Av. Nossa Senhora do Desterro, 1803 - Jardim Libanio</p>
            <p style="opacity:.75; font-size:14px; margin-bottom:0;">Tel: (34) 3313-0003 | Whats: (34) 3313-0003</p>
            <div style="height:16px;"></div>
            <div class="fw-bold text-white" style="margin-bottom:4px;"><i class="icofont-envelope me-2 id-color"></i>E-mail</div>
            <p style="opacity:.75; font-size:14px; margin-bottom:0;">contato@mtvsaude.com.br</p>
            <div style="height:40px;"></div>
        </div>
    </div>`;

// Páginas que usam header transparente (com logo branca)
const transparentPages = ['index.html'];

// Páginas internas (com logo preta e header-light)
const files = fs.readdirSync('./').filter(f => f.endsWith('.html') && f !== 'index.html');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Substitui todo o bloco de header
    const headerRegex = /<!-- header begin -->[\s\S]*?<!-- header end -->/;
    if (headerRegex.test(content)) {
        content = content.replace(headerRegex, headerLight);
        changed = true;
    }

    // Substitui todo o bloco do overlay menu
    const overlayRegex = /<!-- overlay content begin -->[\s\S]*?<\/div>\s*\n\s*\n\s*<!-- Javascript/;
    if (overlayRegex.test(content)) {
        content = content.replace(overlayRegex, overlayMenu + '\n\n    <!-- Javascript');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`✅ Atualizado: ${file}`);
    } else {
        console.log(`⚠️  Sem match: ${file}`);
    }
});

console.log('\n🎉 Header e menu overlay sincronizados em todas as páginas!');
