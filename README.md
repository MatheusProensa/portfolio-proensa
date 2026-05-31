# Portfólio Proensa

Portfólio pessoal de **Matheus Proensa** — Designer Gráfico & Front-end Developer.
Uma single-page application com identidade visual própria, estética premium,
minimalista e tecnológica: fundo interativo de constelação, microinterações e
um sistema visual consistente do hero ao rodapé.

🔗 **Demo:** [_adicione o link do deploy aqui (Vercel / Netlify / GitHub Pages)_](https://matheusproensa.vercel.app/)

---

## ✨ Destaques

- **Fundo interativo de partículas** — uma constelação de pontos que se conectam
  por linhas e reagem ao movimento do mouse, desenhada em `<canvas>`.
- **Direção visual própria** — paleta azul elétrico → ciano sobre fundo navy
  profundo, glassmorphism, e a wordmark/monograma da marca Proensa.
- **Modais de case study** — cada projeto abre em um modal com imagem, descrição
  completa, papel, ferramentas/stack e link externo.
- **Microinterações** — revelação no scroll, hover nos cards e chips, flutuação
  sutil de elementos do hero.
- **Loader honesto** — tela de carregamento que some quando a página realmente
  carrega (sem atraso artificial).
- **Totalmente responsivo** — layout adapta de desktop a mobile, com menu
  hambúrguer.
- **Acessibilidade** — navegação por teclado nos cards e modal (Enter / Espaço /
  Esc), `aria-label` nos ícones e foco visível.

---

## 🛠️ Tecnologias

- **React** + **TypeScript**
- **Vite** (build e dev server)
- **react-icons** (Font Awesome)
- **CSS puro** com custom properties (design tokens) — sem framework de UI

---

## 📂 Estrutura

```
src/
├─ assets/            # logos, wordmark, capas de projeto, screenshots, foto
├─ App.tsx            # aplicação completa (seções + fundo + modal)
├─ App.css            # sistema visual (tokens, layout, componentes, animações)
└─ main.tsx           # entrypoint
```

### Seções
- **Hero** — nome + wordmark, proposta de valor, CTAs e redes sociais.
- **Sobre** — apresentação + selo de disponibilidade.
- **Áreas de atuação** — Design e Front-end.
- **Projetos de Design** — identidades visuais (abrem em modal).
- **Projetos Front-end** — aplicações em React (abrem em modal).
- **Contato** — informações + formulário.

---

## 🚀 Rodando localmente

```bash
# clonar
git clone https://github.com/MatheusProensa/portfolio-proensa.git
cd portfolio-proensa

# instalar dependências
npm install

# ambiente de desenvolvimento
npm run dev

# build de produção
npm run build

# pré-visualizar o build
npm run preview
```

A aplicação sobe em `http://localhost:5173` por padrão.

---

## 🎨 Sistema visual

O design é guiado por tokens em CSS custom properties, definidos em `App.css`:

| Token | Uso |
|-------|-----|
| `--blue` `#2563eb` | Cor de destaque (botões, links, selos) |
| `--cyan` `#38bdf8` | Glow, hovers, fundo interativo |
| Fundo navy `#0b1120` | Canvas base da página |
| Cards "glass" | Fundo translúcido + blur + borda hairline |

Tipografia: **Space Grotesk** (títulos) + **Inter** (corpo).

---

## 📬 Contato

- **E-mail:** matheu.proensa@gmail.com
- **WhatsApp:** (55) 98129-2693
- **LinkedIn:** [matheus-proensa](https://www.linkedin.com/in/matheus-proensa-48082617b/)
- **GitHub:** [@MatheusProensa](https://github.com/MatheusProensa)
- **Behance:** projetos de identidade visual (Proensa, Ponto Grão, Pako & Bella)

📍 Santa Maria — RS, Brasil



