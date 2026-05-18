import "./App.css";

import { useEffect, useRef } from "react";

import simbolo from "./assets/p-simbolo.png";
import logo from "./assets/logo-proensa.png";
import fotoPerfil from "./assets/fotoperfil.png";

import capaProensa from "./assets/capaproensa.png";
import capaPontoGrao from "./assets/capapontograo.png";
import capaPakoBella from "./assets/capapakoebella.png";

import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaReact,
  FaPalette,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaBehance,
} from "react-icons/fa";

function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const mouse = {
      x: width / 2,
      y: height / 2,
      active: true,
    };

    const particles = Array.from({ length: 75 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      size: Math.random() * 1.8 + 0.8,
    }));

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;
    }

    function handleMouseMove(event: MouseEvent) {
      const target = event.target as HTMLElement;

      if (
        target.closest(".disable-network") ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        mouse.active = false;
        return;
      }

      mouse.active = true;

      mouse.x = event.clientX;
      mouse.y = event.clientY;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        if (mouse.active) {
          const dxMouse = particle.x - mouse.x;
          const dyMouse = particle.y - mouse.y;

          const mouseDistance = Math.sqrt(
            dxMouse * dxMouse + dyMouse * dyMouse
          );

          if (mouseDistance < 150) {
            particle.x += dxMouse * 0.003;
            particle.y += dyMouse * 0.003;
          }
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56,189,248,0.45)";
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            ctx.beginPath();

            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);

            ctx.strokeStyle = `rgba(56,189,248,${
              0.12 * (1 - distance / 130)
            })`;

            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrame = requestAnimationFrame(draw);
    }

    resizeCanvas();
    draw();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="network-canvas" />;
}

export default function App() {
  return (
    <div className="portfolio">
      <NetworkBackground />

      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      {/* NAVBAR */}
      <header className="navbar disable-network">
        <a href="#home" className="brand">
          <img src={simbolo} alt="Proensa" />
        </a>

        <nav className="nav">
          <a href="#sobre">Sobre</a>
          <a href="#skills">Áreas</a>
          <a href="#design">Design</a>
          <a href="#frontend">Front-end</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="hero">
          <div className="hero-content disable-network">
            <span className="hero-label">
              Creative Developer / Branding Studio
            </span>

            <h1>
              Matheus
              <strong>Proensa</strong>
            </h1>

            <p className="hero-role">
              Designer & Front-end Developer
            </p>

            <div className="hero-actions">
              <a href="#design" className="btn btn-light">
                Ver projetos <FaArrowRight />
              </a>

              <a href="#contato" className="btn btn-outline">
                Contato
              </a>
            </div>

            <div className="socials hero-socials">
              <a
                href="https://github.com/MatheusProensa"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/matheus-proensa-48082617b/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://wa.me/5555981292693"
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div className="hero-visual disable-network">
            <div className="brand-orbit">
              <img src={logo} alt="Logo Proensa" />
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="section">
          <div className="section-center">
            <h2 className="section-title">Sobre mim</h2>
          </div>

          <div className="about-layout disable-network">
            <div className="about-photo">
              <img
                src={fotoPerfil}
                alt="Foto de perfil"
              />
            </div>

            <div className="about-copy">
              <p>
                Sou designer gráfico e estudante de Sistemas de Informação,
                com foco em identidade visual, interfaces digitais e
                desenvolvimento front-end.
              </p>

              <p>
                Busco criar soluções visuais modernas, funcionais e bem
                estruturadas, unindo estética, usabilidade e tecnologia.
              </p>
            </div>
          </div>
        </section>

        {/* ÁREAS */}
        <section id="skills" className="section">
          <div className="section-center">
            <h2 className="section-title">Áreas de atuação</h2>
          </div>

          <div className="skills-grid">
            <article className="skill-card disable-network">
              <div className="skill-icon">
                <FaPalette />
              </div>

              <h3>Design</h3>

              <p>
                Criação de marcas, peças visuais e materiais digitais.
              </p>

              <div className="tags">
                <span>Photoshop</span>
                <span>Illustrator</span>
                <span>Figma</span>
                <span>Canva</span>
              </div>
            </article>

            <article className="skill-card disable-network">
              <div className="skill-icon">
                <FaReact />
              </div>

              <h3>Front-end</h3>

              <p>
                Desenvolvimento de interfaces modernas e responsivas.
              </p>

              <div className="tags">
                <span>React</span>
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
              </div>
            </article>
          </div>
        </section>

        {/* DESIGN */}
        <section id="design" className="section">
          <div className="section-center">
            <h2 className="section-title">Projetos de Design</h2>
          </div>

          <div className="design-projects">
            <article className="design-card disable-network">
              <div
                className="design-image"
                style={{
                  backgroundImage: `url(${capaProensa})`,
                }}
              ></div>

              <div className="design-info">
                <span>Identidade Visual</span>

                <h3>Proensa Brand</h3>

                <p>
                  Marca autoral com proposta minimalista,
                  tecnológica e moderna.
                </p>

                <a
                  href="https://www.behance.net/gallery/246443199/Identidade-Visual-Proensa"
                  target="_blank"
                  rel="noreferrer"
                  className="project-button"
                >
                  Ver no Behance <FaBehance />
                </a>
              </div>
            </article>

            <article className="design-card disable-network">
              <div
                className="design-image"
                style={{
                  backgroundImage: `url(${capaPontoGrao})`,
                }}
              ></div>

              <div className="design-info">
                <span>Branding</span>

                <h3>Ponto Grão</h3>

                <p>
                  Identidade visual para cafeteria contemporânea.
                </p>

                <a
                  href="https://www.behance.net/gallery/246372203/Identidade-Visual-Ponto-Grao"
                  target="_blank"
                  rel="noreferrer"
                  className="project-button"
                >
                  Ver no Behance <FaBehance />
                </a>
              </div>
            </article>

            <article className="design-card disable-network">
              <div
                className="design-image"
                style={{
                  backgroundImage: `url(${capaPakoBella})`,
                }}
              ></div>

              <div className="design-info">
                <span>Pet Branding</span>

                <h3>Pako & Bella</h3>

                <p>
                  Identidade pet emocional, leve e moderna.
                </p>

                <a
                  href="https://www.behance.net/gallery/249385069/Identidade-Visual-Pet-Shop-Pako-Bella"
                  target="_blank"
                  rel="noreferrer"
                  className="project-button"
                >
                  Ver no Behance <FaBehance />
                </a>
              </div>
            </article>
          </div>
        </section>

        {/* FRONT-END */}
        <section id="frontend" className="section">
          <div className="section-center">
            <h2 className="section-title">Projetos Front-end</h2>
          </div>

          <div className="frontend-grid">
            <article className="frontend-card disable-network">
              <span>React</span>

              <h3>Portfólio Proensa</h3>

              <p>
                Portfólio pessoal desenvolvido com React,
                TypeScript e direção visual própria.
              </p>

              <a
                href="https://github.com/MatheusProensa"
                target="_blank"
                rel="noreferrer"
                className="project-button"
              >
                Ver GitHub <FaGithub />
              </a>
            </article>

            <article className="frontend-card disable-network">
              <span>Em desenvolvimento</span>

              <h3>Novos projetos em breve</h3>

              <p>
                Espaço reservado para aplicações web,
                sistemas e estudos front-end.
              </p>

              <a
                href="https://github.com/MatheusProensa"
                target="_blank"
                rel="noreferrer"
                className="project-button"
              >
                Ver GitHub <FaGithub />
              </a>
            </article>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" className="section">
          <div className="section-center">
            <h2 className="section-title">Contato</h2>
          </div>

          <div className="contact-card disable-network">
            <div className="contact-left">
              <h3>Vamos conversar?</h3>

              <p>
                Entre em contato para projetos,
                oportunidades ou troca de ideias.
              </p>

              <div className="contact-info">
                <a href="mailto:matheu.proensa@gmail.com">
                  <FaEnvelope />
                  matheu.proensa@gmail.com
                </a>

                <a
                  href="https://wa.me/5555981292693"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp />
                  (55) 98129-2693
                </a>

                <span>
                  <FaMapMarkerAlt />
                  Santa Maria - RS
                </span>
              </div>
            </div>

            <form className="contact-form">
              <input placeholder="Seu nome" />

              <input placeholder="Seu e-mail" />

              <textarea placeholder="Mensagem"></textarea>

              <button type="button">
                Enviar mensagem <FaArrowRight />
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}