const fs = require('fs');

// ===== CORREÇÃO service-cosmetic-dentistry.html =====
let cosmetic = fs.readFileSync('service-cosmetic-dentistry.html', 'utf8');

// Encontra a seção de depoimentos e substitui completamente
const cosmeticTestimonialsOld = /(<section class="bg-color-op-2 no-top no-bottom overflow-hidden">[\s\S]*?<!-- Text -->)[\s\S]*?(<\/section>)/;
const cosmeticTestimonialsNew = `<section class="bg-color-op-2 no-top no-bottom overflow-hidden">
                <div class="container-fluid position-relative half-fluid">
                  <div class="container">
                    <div class="row">
                      <!-- Image -->
                      <div class="col-lg-6 position-lg-absolute left-half h-100">
                        <div class="image" data-bgimage="url(images/misc/l3.webp) center"></div>
                      </div>
                      <!-- Text -->
                      <div class="col-lg-5 offset-lg-7">
                            <div class="py-5 my-5">
                                <div class="owl-single-dots owl-carousel owl-theme">
                                    <div class="item">
                                        <i class="icofont-quote-left id-color fs-40 mb-4 wow fadeInUp"></i>
                                        <h3 class="mb-4 wow fadeInUp fs-32">Nunca pensei que amaria tanto meu sorriso. As facetas ficaram tão naturais e o processo foi surpreendentemente confortável. Finalmente me sinto confiante em todas as fotos!</h3>
                                        <span class="wow fadeInUp">Jessica M.</span>
                                    </div>

                                    <div class="item">
                                        <i class="icofont-quote-left id-color fs-40 mb-4 wow fadeInUp"></i>
                                        <h3 class="mb-4 wow fadeInUp fs-32">A equipe se dedicou a ouvir o que eu queria e realizou. Meu resultado de clareamento foi incrível, e recebo elogios o tempo todo. Agora eu realmente curto ir ao dentista!</h3>
                                        <span class="wow fadeInUp">Darren K.</span>
                                    </div>

                                    <div class="item">
                                        <i class="icofont-quote-left id-color fs-40 mb-4 wow fadeInUp"></i>
                                        <h3 class="mb-4 wow fadeInUp fs-32">Do início ao fim, me senti completamente cuidada. A transformação do meu sorriso mudou minha vida. Não consigo parar de sorrir — literalmente!</h3>
                                        <span class="wow fadeInUp">Elena R.</span>
                                    </div>

                                    <div class="item">
                                        <i class="icofont-quote-left id-color fs-40 mb-4 wow fadeInUp"></i>
                                        <h3 class="mb-4 wow fadeInUp fs-32">Sempre tive vergonha dos meus dentes. Após a restauração e escultura dental, parece que tenho um sorriso novo. Rápido, indolor e totalmente válido.</h3>
                                        <span class="wow fadeInUp">Carlos F.</span>
                                    </div>

                                    <div class="item">
                                        <i class="icofont-quote-left id-color fs-40 mb-4 wow fadeInUp"></i>
                                        <h3 class="mb-4 wow fadeInUp fs-32">Os resultados superaram minhas expectativas. O trabalho estético ficou tão natural, e a equipe foi um suporte em cada etapa do caminho.</h3>
                                        <span class="wow fadeInUp">Aisha B.</span>
                                    </div>
                                </div>
                            </div>
                      </div>
                    </div>
                  </div>
                </div>
            </section>`;

cosmetic = cosmetic.replace(/(<section class="bg-color-op-2 no-top no-bottom overflow-hidden">)[\s\S]*?(<\/section>)(\s*\n\s*<section class="bg-light">)/, cosmeticTestimonialsNew + '$3');
fs.writeFileSync('service-cosmetic-dentistry.html', cosmetic);
console.log('✅ service-cosmetic-dentistry.html - Depoimentos corrigidos');

// ===== CORREÇÃO service-preventive-dentistry.html =====
let preventive = fs.readFileSync('service-preventive-dentistry.html', 'utf8');
preventive = preventive
    .split(`We had an emergency and they saw us the same day. I'm so grateful for their quick response and kindness!`)
    .join(`Tivemos uma emergência e nos atenderam no mesmo dia. Sou muito grata pela resposta rápida e gentileza!`);
preventive = preventive
    .split(`My son used to be terrified of dentists. Now he walks in with a smile. I can't thank this team enough!`)
    .join(`Meu filho tinha pavor de dentistas. Agora entra sorrindo. Não tenho palavras para agradecer a esta equipe!`);
fs.writeFileSync('service-preventive-dentistry.html', preventive);
console.log('✅ service-preventive-dentistry.html - Depoimentos corrigidos');

// ===== CORREÇÃO service-pediatric-dentistry.html =====
let pediatric = fs.readFileSync('service-pediatric-dentistry.html', 'utf8');
pediatric = pediatric
    .split(`OWe specialize in gentle, personalized dental care for infants, children, and teens. From a child's first tooth to their teenage years, our goal is to create a comfortable, fun, and educational environment for every visit.`)
    .join(`Somos especializados em cuidado odontológico gentil e personalizado para bebês, crianças e adolescentes. Do primeiro dentinho até a adolescência, nosso objetivo é criar um ambiente confortável, divertido e educativo em cada visita.`);
fs.writeFileSync('service-pediatric-dentistry.html', pediatric);
console.log('✅ service-pediatric-dentistry.html - Descrição principal corrigida');

console.log('\n🎉 Todas as correções aplicadas!');
