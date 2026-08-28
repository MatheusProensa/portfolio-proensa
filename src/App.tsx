import "./App.css";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaBehance,
  FaReact,
  FaPalette,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaTools,
} from "react-icons/fa";

import logoProensa from "./assets/logo-proensa.webp";
import pSimbolo from "./assets/p-simbolo.webp";
import fotoPerfil from "./assets/fotoperfil.webp";
import capaProensa from "./assets/capaproensa.webp";
import capaPontoGrao from "./assets/capapontograo.webp";
import capaPakoBella from "./assets/capapakoebella.webp";
import printPortfolio from "./assets/capa-portfolio.png";
import dashboard from "./assets/capa-dashboard.png";
import escala from "./assets/capa-escala.png";
import almoxarifado from "./assets/capa-almoxarifado.png";
import universidade from "./assets/capa-universidade.png";
import escolaCda from "./assets/capa-escolacda.png";
import erpEscolaCda from "./assets/capa-erp-escolacda.png";
import erpMeneghetti from "./assets/capa-erp-meneghetti.png";

/* ===================== TIPOS / DADOS ===================== */

type ModalData = {
  image: string;
  eyebrow: string;
  title: string;
  desc: string;
  longDesc: string;
  chips: string[];
  chipsLabel: string;
  role: string;
  href: string;
  linkLabel: string;
  kind: "behance" | "github";
  fit: "cover" | "contain";
  wip?: boolean;
};

type DesignProject = {
  cover: string;
  cat: string;
  title: string;
  desc: string;
  longDesc: string;
  papel: string;
  tools: string[];
  href: string;
};

type FrontProject = {
  img: string;
  title: string;
  featured?: boolean;
  wip?: boolean;
  desc: string;
  longDesc: string;
  stack: string[];
  papel: string;
  href: string;
};

const DESIGN: DesignProject[] = [
  {
    cover: capaProensa,
    cat: "Identidade Visual",
    title: "Proensa",
    desc: "Marca autoral com proposta minimalista e tecnológica.",
    longDesc:
      'Proensa é a minha marca pessoal — o ponto de encontro entre design e código. O símbolo nasce de um "P" geométrico que combina um traço sólido e um contorno fluido, representando as duas faces do meu trabalho. A paleta azul sobre fundo escuro reforça a pegada tecnológica, e a wordmark usa uma tipografia geométrica com textura sutil para dar personalidade.',
    papel: "Designer · Branding",
    tools: ["Illustrator", "Photoshop", "Canva"],
    href: "https://www.behance.net/gallery/246443199/Identidade-Visual-Proensa",
  },
  {
    cover: capaPontoGrao,
    cat: "Identidade Visual",
    title: "Ponto Grão",
    desc: "Projeto desenvolvido para uma cafeteria com proposta acolhedora e sofisticada.",
    longDesc:
      "Identidade visual para a cafeteria Ponto Grão. O conceito parte do ritual do café: acolhedor, artesanal e sofisticado. Trabalhei tons quentes, um símbolo que remete ao grão e à origem, e aplicações em embalagens e materiais que valorizam a experiência da marca no ponto de venda.",
    papel: "Designer · Branding",
    tools: ["Illustrator", "Photoshop", "Canva"],
    href: "https://www.behance.net/gallery/246372203/Identidade-Visual-Ponto-Grao",
  },
  {
    cover: capaPakoBella,
    cat: "Identidade Visual",
    title: "Pako & Bella",
    desc: "Projeto criado para Pet Shop com linguagem leve, afetiva e moderna.",
    longDesc:
      "Identidade visual para o pet shop Pako & Bella. A proposta é leve, afetiva e moderna — pensada para transmitir carinho e confiança. Tipografia arredondada, paleta amigável e aplicações divertidas em produtos como comedouros, embalagens e comunicação, sempre com foco no vínculo entre tutores e pets.",
    papel: "Designer · Branding",
    tools: ["Illustrator", "Photoshop", "Canva"],
    href: "https://www.behance.net/gallery/249385069/Identidade-Visual-Pet-Shop-Pako-Bella",
  },
];

const FRONT: FrontProject[] = [
  {
    img: printPortfolio,
    title: "Portfólio Proensa",
    desc: "Portfólio pessoal desenvolvido com React, TypeScript e direção visual própria, focado em identidade visual moderna e experiência premium.",
    longDesc:
      "Este portfólio. Desenvolvido em React + TypeScript com direção visual própria, do conceito ao código. Inclui fundo interativo de constelação, microinterações, entrada animada e uma identidade premium consistente do hero ao rodapé — pensado para parecer um estúdio de branding, não um template.",
    stack: ["React", "TypeScript", "Vite", "Canvas API"],
    papel: "Design + Front-end",
    href: "https://github.com/MatheusProensa/portfolio-proensa",
  },
  {
    img: almoxarifado,
    title: "Almox Proensa",
    wip: true,
    desc: "Sistema de almoxarifado e controle de estoque desenvolvido para o setor de Suprimento do DTCEA-SM, substituindo as planilhas no trabalho diário.",
    longDesc:
      "Sistema web real, em uso no Destacamento de Controle do Espaço Aéreo de Santa Maria (DTCEA-SM). Nasceu de uma dor concreta — o controle de materiais em planilhas confusas — e foca em usabilidade operacional: dashboard com indicadores, entradas e saídas com responsável e documento, ajuste de estoque, alertas de itens críticos, histórico completo de movimentações e relatórios com exportação em CSV e PDF oficial. PWA instalável, com dados em tempo real via Supabase.",
    stack: ["React", "Vite", "Supabase", "PWA"],
    papel: "Design + Front-end",
    href: "https://github.com/MatheusProensa/almoxarifado-dtceasm",
  },
  {
    img: escala,
    title: "Escala DTCEA-SM",
    desc: "Sistema de escala de serviço (permanência) do DTCEA-SM, com autenticação, gestão da escala e exportação em Excel.",
    longDesc:
      "Aplicação web para organizar a escala de serviço de permanência do DTCEA-SM. Conta com autenticação de usuários, dados em tempo real via Supabase e exportação da escala em Excel — substituindo o controle manual. Construída como PWA instalável, com interface escura alinhada à identidade do destacamento.",
    stack: ["React", "TypeScript", "Supabase", "PWA"],
    papel: "Design + Front-end",
    href: "https://github.com/MatheusProensa/escala-dtceasm",
  },
  {
    img: erpEscolaCda,
    title: "ERP Escola CDA",
    wip: true,
    desc: "Sistema de gestão escolar completo para a Escola CDA, unindo módulo acadêmico, financeiro e administrativo em um só painel.",
    longDesc:
      "ERP desenvolvido para a Escola CDA (Santa Maria/RS), reunindo em um único painel: matrículas e turmas, contratos e boletos, notas fiscais, ficha de alunos e responsáveis, ponto e documentos de funcionários, controle de estoque e cardápio, empréstimo de chaves, mural de avisos, chat interno, calendário de eventos e relatórios completos. Autenticação com permissões por usuário e dados em tempo real via Supabase. Projeto em desenvolvimento ativo.",
    stack: ["Next.js", "TypeScript", "Prisma", "Supabase"],
    papel: "Design + Front-end",
    href: "https://github.com/MatheusProensa/ERP-EscolaCDA",
  },
  {
    img: erpMeneghetti,
    title: "ERP Mecânica Meneghetti",
    wip: true,
    desc: "Sistema de gestão para oficina mecânica, com ordens de serviço, financeiro e controle de dívidas em um painel único.",
    longDesc:
      "ERP desenvolvido para a Mecânica Meneghetti, cobrindo toda a operação da oficina: cadastro de clientes e mecânicos, ordens de serviço com anexos, calculadora de materiais, emissão de notas e despesas, controle de dívidas e devedores, pagamento de extras e um resumo diário automático por e-mail. Inclui notificações push, exportação em PDF e autenticação com NextAuth. Projeto em desenvolvimento ativo.",
    stack: ["Next.js", "TypeScript", "Prisma", "Supabase"],
    papel: "Design + Front-end",
    href: "https://github.com/MatheusProensa/mecanica-meneghetti-erp",
  },
  {
    img: dashboard,
    title: "Dashboard Chamados TI",
    wip: true,
    desc: "Sistema visual para gerenciamento de chamados técnicos com foco em interface moderna, responsividade e experiência administrativa.",
    longDesc:
      "Interface administrativa para gestão de chamados de TI. Foco em clareza e leitura rápida: visão geral com indicadores, volume de chamados por período e uma organização visual que prioriza a tomada de decisão. Construído com atenção à responsividade e à hierarquia da informação.",
    stack: ["React", "TypeScript", "Vite"],
    papel: "Front-end · UI",
    href: "https://github.com/MatheusProensa/dashboard-chamados-ti",
  },
  {
    img: universidade,
    title: "Universidade React",
    desc: "Projeto acadêmico desenvolvido com React utilizando rotas, componentes reutilizáveis e estrutura SPA moderna.",
    longDesc:
      "Projeto acadêmico construído como uma SPA em React. Explora roteamento com React Router, componentes reutilizáveis e uma arquitetura escalável — um exercício prático de estruturar uma aplicação real do zero, com boas práticas de organização.",
    stack: ["React", "TypeScript", "React Router", "Vite"],
    papel: "Front-end",
    href: "https://github.com/MatheusProensa/front-end-universidade",
  },
  {
    img: escolaCda,
    title: "Escola CDA",
    wip: true,
    desc: "Site institucional moderno para escola de educação infantil e fundamental, com identidade acolhedora, painel administrativo e foco em acessibilidade.",
    longDesc:
      "Site institucional completo da Escola CDA (Santa Maria/RS). Reúne um site público — home emocional, segmentos, metodologia, espaços com lightbox e álbuns de momentos — e um painel administrativo com login e editores por seção, pronto para integração com back-end. Inclui VLibras, alto contraste, aumento de fonte, SEO por página e deploy automático na Vercel. Projeto em desenvolvimento ativo.",
    stack: ["React", "TypeScript", "Vite", "React Router"],
    papel: "Front-end",
    href: "https://github.com/MatheusProensa/front-end-escola-cda",
  },
];

const LINKS = [
  { id: "sobre", label: "Sobre" },
  { id: "areas", label: "Áreas" },
  { id: "design", label: "Design" },
  { id: "frontend", label: "Front-end" },
  { id: "contato", label: "Contato" },
];

/* ===================== FUNDO INTERATIVO ===================== */

function CalmField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const mouse = { x: width / 2, y: height / 2, active: true };
    const count = width < 768 ? 30 : 78;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      size: Math.random() * 1.7 + 0.8,
    }));

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      cv!.width = width;
      cv!.height = height;
    }
    function onMove(e: MouseEvent) {
      mouse.active = true;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function draw() {
      if (document.hidden) {
        animationFrame = requestAnimationFrame(draw);
        return;
      }
      ctx!.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        if (mouse.active) {
          const dxM = p.x - mouse.x;
          const dyM = p.y - mouse.y;
          const dM = Math.sqrt(dxM * dxM + dyM * dyM);
          if (dM < 155) {
            p.x += dxM * 0.003;
            p.y += dyM * 0.003;
          }
        }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(56,189,248,0.46)";
        ctx!.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 132) {
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(56,189,248,${0.13 * (1 - distance / 132)})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }
      animationFrame = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return <canvas ref={ref} className="bg-canvas" aria-hidden="true" />;
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0, rootMargin: "0px 0px 12% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ===================== NAV ===================== */

type NavProps = { scrolled: boolean; active: string; onNav: (id: string) => void };

function Nav({ scrolled, active, onNav }: NavProps) {
  const [open, setOpen] = useState(false);
  const go = (id: string) => {
    setOpen(false);
    onNav(id);
  };
  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <a
        className="brand"
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          go("home");
        }}
        aria-label="Proensa — início"
      >
        <img className="brand-wordmark" src={pSimbolo} alt="Proensa" />
      </a>
      <nav className="links" aria-label="Navegação principal">
        {LINKS.map((l) => (
          <a
            key={l.id}
            className={active === l.id ? "active" : ""}
            href={`#${l.id}`}
            onClick={(e) => {
              e.preventDefault();
              go(l.id);
            }}
          >
            {l.label}
          </a>
        ))}
      </nav>
      <button
        className="menu-btn"
        aria-label="Abrir menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {LINKS.map((l) => (
          <a
            key={l.id}
            className={active === l.id ? "active" : ""}
            href={`#${l.id}`}
            onClick={(e) => {
              e.preventDefault();
              go(l.id);
            }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}

/* ===================== HERO ===================== */

function Hero({ onNav }: { onNav: (id: string) => void }) {
  return (
    <section id="home" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="hero-lockup">
            <h1 className="hero-name">Matheus</h1>
            <img className="hero-wordmark" src={pSimbolo} alt="Proensa" />
          </div>
          <div className="hero-role">Designer &amp; Front-end Developer</div>
          <p className="valueprop">
            Transformo ideias em <b>artes visuais</b> e <b>interfaces digitais</b> — unindo estética,
            usabilidade e tecnologia, do traço ao código no ar.
          </p>
          <div className="hero-cta">
            <div className="hero-actions">
              <a className="btn btn-primary" href="#design" onClick={() => onNav("design")}>
                Ver projetos <FaArrowRight />
              </a>
              <a className="btn btn-ghost" href="#contato" onClick={() => onNav("contato")}>
                Vamos conversar
              </a>
            </div>
            <div className="socials">
              <a href="https://github.com/MatheusProensa" target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/matheus-proensa-48082617b/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a href="https://wa.me/5555981292693" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="monogram">
            <img src={logoProensa} alt="Monograma Proensa" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== SOBRE ===================== */

function Sobre() {
  return (
    <section id="sobre" className="section about">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>Sobre mim</h2>
        </div>
        <div className="about-panel reveal">
          <div className="about-photo-wrap">
            <div className="photo">
              <img src={fotoPerfil} alt="Matheus Proensa" />
            </div>
            <span className="status">
              <i className="dot" /> Disponível para projetos
            </span>
          </div>
          <div className="about-copy">
            <p className="about-intro">Onde o design encontra o código.</p>
            <p>
              Sou Designer Gráfico e estudante de Sistemas de Informação, com foco em identidade visual,
              interfaces digitais e desenvolvimento front-end.
            </p>
            <p>
              Busco criar soluções visuais modernas, funcionais e bem estruturadas, unindo estética,
              usabilidade e tecnologia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== ÁREAS ===================== */

function Areas() {
  return (
    <section id="areas" className="section">
      <div className="wrap">
        <div className="sec-head center reveal">
          <h2>Áreas de atuação</h2>
        </div>
        <div className="skills">
          <article className="skill design reveal">
            <div className="ic">
              <FaPalette />
            </div>
            <h3>Design</h3>
            <p>Criação de marcas, peças visuais e materiais digitais.</p>
            <div className="tags">
              {["Photoshop", "Illustrator", "Figma", "Canva"].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </article>
          <article className="skill dev reveal d1">
            <div className="ic">
              <FaReact />
            </div>
            <h3>Front-end</h3>
            <p>Desenvolvimento de interfaces modernas e responsivas.</p>
            <div className="tags">
              {["React", "HTML", "CSS", "JavaScript"].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ===================== PROJETOS ===================== */

function DesignSection({ onOpen }: { onOpen: (d: ModalData) => void }) {
  return (
    <section id="design" className="section">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>Projetos de Design</h2>
        </div>
        <div className="grid-3">
          {DESIGN.map((p, i) => {
            const data: ModalData = {
              image: p.cover,
              eyebrow: p.cat,
              title: p.title,
              desc: p.desc,
              longDesc: p.longDesc,
              chips: p.tools,
              chipsLabel: "Ferramentas",
              role: p.papel,
              href: p.href,
              linkLabel: "Ver no Behance",
              kind: "behance",
              fit: "cover",
            };
            return (
              <article
                key={p.title}
                className={`pcard reveal d${i + 1}`}
                role="button"
                tabIndex={0}
                onClick={() => onOpen(data)}
                onKeyDown={(e: ReactKeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpen(data);
                  }
                }}
              >
                <div className="thumb">
                  <div
                    className="bgimg"
                    style={{ backgroundImage: `url(${p.cover})` }}
                    role="img"
                    aria-label={p.title}
                  />
                  <span className="badge">{p.cat}</span>
                </div>
                <div className="body">
                  <span className="cat">{p.cat}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="meta-row">
                    {p.tools.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="link">
                    Ver detalhes <FaArrowRight />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FrontSection({ onOpen }: { onOpen: (d: ModalData) => void }) {
  return (
    <section id="frontend" className="section">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>Projetos Front-end</h2>
        </div>
        <div className="grid-3">
          {FRONT.map((p, i) => {
            const data: ModalData = {
              image: p.img,
              eyebrow: p.stack.join(" · "),
              title: p.title,
              desc: p.desc,
              longDesc: p.longDesc,
              chips: p.stack,
              chipsLabel: "Stack",
              role: p.papel,
              href: p.href,
              linkLabel: "Ver no GitHub",
              kind: "github",
              fit: "contain",
              wip: p.wip,
            };
            return (
              <article
                key={p.title}
                className={`pcard ${p.featured ? "featured" : ""} reveal d${i + 1}`}
                role="button"
                tabIndex={0}
                onClick={() => onOpen(data)}
                onKeyDown={(e: ReactKeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpen(data);
                  }
                }}
              >
                <div className="thumb">
                  <img src={p.img} alt={p.title} loading="lazy" />
                  {p.featured && <span className="featured-flag">Destaque</span>}
                  {p.wip && (
                    <span className="wip-flag">
                      <FaTools /> Em andamento
                    </span>
                  )}
                </div>
                <div className="body">
                  <span className="cat">{p.stack.slice(0, 3).join(" · ")}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="meta-row">
                    {p.stack.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="link">
                    Ver detalhes <FaArrowRight />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===================== MODAL ===================== */

function ProjectModal({ project, onClose }: { project: ModalData | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;
  const p = project;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        onClick={(e: ReactMouseEvent) => e.stopPropagation()}
      >
        <button className="modal-close" aria-label="Fechar" onClick={onClose}>
          <FaTimes />
        </button>
        <div className={`modal-media ${p.fit}`}>
          <img src={p.image} alt={p.title} />
        </div>
        <div className="modal-body">
          <span className="cat">{p.eyebrow}</span>
          <h3>
            {p.title}
            {p.wip && (
              <span className="modal-wip">
                <FaTools /> Em andamento
              </span>
            )}
          </h3>
          <p className="modal-lead">{p.desc}</p>
          <p className="modal-long">{p.longDesc}</p>
          <div className="modal-meta">
            <div className="mm">
              <span>Papel</span>
              <b>{p.role}</b>
            </div>
            <div className="mm">
              <span>{p.chipsLabel}</span>
              <div className="modal-chips">
                {p.chips.map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <a className="btn btn-primary" href={p.href} target="_blank" rel="noreferrer">
            {p.linkLabel} {p.kind === "behance" ? <FaBehance /> : <FaGithub />}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ===================== CONTATO ===================== */

function Contato() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contato" className="section">
      <div className="wrap">
        <div className="sec-head center reveal">
          <h2>Vamos criar algo único?</h2>
        </div>
        <div className="contact-card reveal">
          <div className="contact-left">
            <h3>Design gráfico, interfaces e experiências digitais.</h3>
            <p>Foco em estética, identidade e presença visual. Me conte sua ideia — respondo rápido.</p>
            <div className="contact-info">
              <a href="mailto:matheu.proensa@gmail.com">
                <FaEnvelope /> matheu.proensa@gmail.com
              </a>
              <a href="https://wa.me/5555981292693" target="_blank" rel="noreferrer">
                <FaWhatsapp /> (55) 98129-2693
              </a>
              <span>
                <FaMapMarkerAlt /> Santa Maria - RS
              </span>
            </div>
          </div>
          {/* TODO: integrar com Formspree */}
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <input type="text" name="nome" placeholder="Seu nome" aria-label="Seu nome" required />
            <input type="email" name="email" placeholder="Seu e-mail" aria-label="Seu e-mail" required />
            <textarea
              name="mensagem"
              placeholder="Me conte sobre sua ideia ou projeto"
              aria-label="Sua mensagem"
              required
            />
            <button type="submit" className="btn btn-primary">
              {sent ? (
                "Mensagem enviada ✓"
              ) : (
                <>
                  Iniciar conversa <FaArrowRight />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ===================== APP ===================== */

export default function App() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<ModalData | null>(null);

  useEffect(() => {
    const start = Date.now();
    const finish = () =>
      window.setTimeout(() => setLoading(false), Math.max(0, 1300 - (Date.now() - start)));
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish);
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
      const ids = ["home", ...LINKS.map((l) => l.id)];
      const pos = window.scrollY + 160;
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) setActive(id);
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function nav(id: string) {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: id === "home" ? 0 : el.offsetTop - 70, behavior: "smooth" });
  }

  return (
    <div className={`shell ${loading ? "" : "ready"}`}>
      <div className={`loader ${loading ? "" : "hidden"}`}>
        <div className="loader-inner">
          <img src={logoProensa} alt="Proensa" />
          <span className="loader-line" />
        </div>
      </div>
      <CalmField />
      <div className="bg-glow" aria-hidden="true" />
      <Nav scrolled={scrolled} active={active} onNav={nav} />
      <main>
        <Hero onNav={nav} />
        <Sobre />
        <Areas />
        <DesignSection onOpen={setModal} />
        <FrontSection onOpen={setModal} />
        <Contato />
      </main>
      <footer>
        <div className="wrap">
          © 2026 <b>Matheus Proensa</b> · Designer &amp; Front-end Developer · Santa Maria — RS
        </div>
      </footer>
      <ProjectModal project={modal} onClose={() => setModal(null)} />
    </div>
  );
}
