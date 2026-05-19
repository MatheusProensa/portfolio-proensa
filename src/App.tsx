import "./App.css";

import { useEffect, useRef, useState } from "react";

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
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const context = canvasElement.getContext("2d");
    if (!context) return;

    const canvas = canvasElement;
    const ctx = context;

    let animationFrame: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const mouse = {
      x: width / 2,
      y: height / 2,
      active: true,
    };

    const particles = Array.from({ length: 78 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      size: Math.random() * 1.7 + 0.8,
    }));

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;
    }

    function handleMouseMove(event: MouseEvent) {
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
          const mouseDistance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (mouseDistance < 155) {
            particle.x += dxMouse * 0.003;
            particle.y += dyMouse * 0.003;
          }
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56,189,248,0.46)";
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 132) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56,189,248,${
              0.13 * (1 - distance / 132)
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

function useRevealAnimation() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.14,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

export default function App() {
  useRevealAnimation();

  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleNavbar() {
      setIsScrolled(window.scrollY > 30);
    }

    handleNavbar();

    window.addEventListener("scroll", handleNavbar);

    return () => {
      window.removeEventListener("scroll", handleNavbar);
    };
  }, []);

  useEffect(() => {
    const sections = [
      "home",
      "sobre",
      "skills",
      "design",
      "frontend",
      "contato",
    ];

  function handleScroll() {
    const scrollPosition = window.scrollY + 160;

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);

      if (section) {
        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (
          scrollPosition >= top &&
          scrollPosition < top + height
        ) {
          setActiveSection(sectionId);
        }
      }
    });
  }

  handleScroll();

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);


  if (isLoading) {
  return (
    <div className="loader-screen">
      <div className="loader-content">
        <img src={logo} alt="Proensa" className="loader-logo" />

        <div className="loader-line"></div>
      </div>
    </div>
  );
}

return (
  <div className="portfolio">
    <NetworkBackground />

    <div className="glow glow-one"></div>
    <div className="glow glow-two"></div>

<header
  className={`navbar disable-network ${
    isScrolled ? "navbar-scrolled" : ""
  }`}
>        <a href="#home" className="brand">
          <img src={simbolo} alt="Proensa" />
        </a>

        <nav className="nav">
  <a
    href="#sobre"
    className={activeSection === "sobre" ? "active" : ""}
  >
    Sobre
  </a>

  <a
    href="#skills"
    className={activeSection === "skills" ? "active" : ""}
  >
    Áreas
  </a>

  <a
    href="#design"
    className={activeSection === "design" ? "active" : ""}
  >
    Design
  </a>

  <a
    href="#frontend"
    className={activeSection === "frontend" ? "active" : ""}
  >
    Front-end
  </a>

  <a
    href="#contato"
    className={activeSection === "contato" ? "active" : ""}
  >
    Contato
  </a>
</nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-content disable-network reveal show">
            <h1>
              Matheus
              <img src={simbolo} alt="Proensa" className="hero-wordmark" />
            </h1>

            <p className="hero-role">Designer & Front-end Developer</p>

            <div className="hero-actions">
              <a href="#design" className="btn btn-primary">
                Ver projetos <FaArrowRight />
              </a>

              <a href="#contato" className="btn btn-secondary">
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

         <div className="hero-visual disable-network reveal show reveal-delay-1">
  <div className="brand-orbit">
    <img src={logo} alt="Logo Proensa" />
  </div>
</div>
        </section>

        <section id="sobre" className="section">
          <div className="section-center reveal">
            <h2 className="section-title">Sobre mim</h2>
          </div>

          <div className="about-layout disable-network">
            <div className="about-photo reveal reveal-delay-1">
              <img src={fotoPerfil} alt="Foto de perfil" />
            </div>

            <div className="about-copy reveal reveal-delay-2">
              <p>
                Sou Designer Gráfico e estudante de Sistemas de Informação, com
                foco em identidade visual, interfaces digitais e desenvolvimento
                front-end.
              </p>

              <p>
                Busco criar soluções visuais modernas, funcionais e bem
                estruturadas, unindo estética, usabilidade e tecnologia.
              </p>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-center reveal">
            <h2 className="section-title">Áreas de atuação</h2>
          </div>

          <div className="skills-grid">
            <article className="skill-card disable-network reveal reveal-delay-1">
              <div className="skill-icon">
                <FaPalette />
              </div>

              <h3>Design</h3>

              <p>Criação de marcas, peças visuais e materiais digitais.</p>

              <div className="tags">
                <span>Photoshop</span>
                <span>Illustrator</span>
                <span>Figma</span>
                <span>Canva</span>
              </div>
            </article>

            <article className="skill-card disable-network reveal reveal-delay-2">
              <div className="skill-icon">
                <FaReact />
              </div>

              <h3>Front-end</h3>

              <p>Desenvolvimento de interfaces modernas e responsivas.</p>

              <div className="tags">
                <span>React</span>
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
              </div>
            </article>
          </div>
        </section>

        <section id="design" className="section">
          <div className="section-center reveal">
            <h2 className="section-title">Projetos de Design</h2>
          </div>

          <div className="design-projects">
            <article className="design-card disable-network reveal reveal-delay-1">
              <div
                className="design-image"
                style={{ backgroundImage: `url(${capaProensa})` }}
              ></div>

              <div className="design-info">
                <span>Identidade Visual</span>
                <h3>Proensa Brand</h3>
                <p>
                  Marca autoral com proposta minimalista, tecnológica e moderna.
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

            <article className="design-card disable-network reveal reveal-delay-2">
              <div
                className="design-image"
                style={{ backgroundImage: `url(${capaPontoGrao})` }}
              ></div>

              <div className="design-info">
                <span>Branding</span>
                <h3>Ponto Grão</h3>
                <p>Identidade visual para cafeteria contemporânea.</p>

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

            <article className="design-card disable-network reveal reveal-delay-3">
              <div
                className="design-image"
                style={{ backgroundImage: `url(${capaPakoBella})` }}
              ></div>

              <div className="design-info">
                <span>Pet Branding</span>
                <h3>Pako & Bella</h3>
                <p>Identidade pet emocional, leve e moderna.</p>

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

        <section id="frontend" className="section">
          <div className="section-center reveal">
            <h2 className="section-title">Projetos Front-end</h2>
          </div>

          <div className="frontend-grid">
            <article className="frontend-card disable-network reveal reveal-delay-1">
              <span>React</span>

              <h3>Portfólio Proensa</h3>

              <p>
                Portfólio pessoal desenvolvido com React, TypeScript e direção
                visual própria.
              </p>

              <a
                href="https://github.com/MatheusProensa/portfolio-proensa"
                target="_blank"
                rel="noreferrer"
                className="project-button"
              >
                Ver GitHub <FaGithub />
              </a>
            </article>

            <article className="frontend-card disable-network reveal reveal-delay-2">
              <span>Em desenvolvimento</span>

              <h3>Novos projetos em breve</h3>

              <p>
                Espaço reservado para aplicações web, sistemas e estudos
                front-end.
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

        <section id="contato" className="section">
          <div className="section-center reveal">
            <h2 className="section-title">Contato</h2>
          </div>

          <div className="contact-card disable-network reveal reveal-delay-1">
            <div className="contact-left">
              <h3>Vamos criar algo único?</h3>

              <p>
                Branding, interfaces modernas e experiências digitais com foco
                em estética, identidade e presença visual.
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
              <textarea placeholder="Me conte sobre sua ideia ou projeto"></textarea>

              <button type="button" className="btn-form">
                Iniciar conversa <FaArrowRight />
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}