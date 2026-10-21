# Guia de Operacao e Desenvolvimento — Projeto Inferno TM

## 1. Visao Geral do Projeto
O **Projeto Inferno TM (Truco Mode)** e uma aplicacao web mobile-first completa que reimagina o classico Truco Paulista sob uma estetica de roguelite mitologico satírico. O projeto foi arquitetado para rodar diretamente no navegador, sem necessidade de instaladores ou dependencias de backend em tempo de execucao.

- **Link de Acesso Publico**: [https://matheushscastro-ai.github.io/inferno-sa-tm/](https://matheushscastro-ai.github.io/inferno-sa-tm/)
- **Repositorio Oficial no GitHub**: [https://github.com/matheushscastro-ai/inferno-sa-tm.git](https://github.com/matheushscastro-ai/inferno-sa-tm.git)

---

## 2. Como Executar e Testar Localmente

### Opcao 1: Via Servidor Python Nativo (Recomendado)
O projeto inclui um servidor HTTP embutido (`server.py`) configurado para rodar na porta 8080:
```bash
# No terminal (PowerShell ou Bash):
cd "P:\Users\Matheus Castro\.gemini\antigravity\scratch\inferno-sa-tm"
python server.py
```
Acesse no navegador:
`http://localhost:8080` ou `http://127.0.0.1:8080`

Para testar a experiencia mobile no desktop, abra as Ferramentas do Desenvolvedor (F12) e ative a emulacao de dispositivos moveis (ex: iPhone 14 Pro ou Pixel 7).

---

## 3. Estrutura de Diretorios e Espelhos de Codigo

Para garantir integridade e seguranca, o projeto e mantido sincronizado em dois caminhos no ambiente de trabalho:
- **Repositorio de Trabalho Primario**: `P:\Users\Matheus Castro\.gemini\antigravity\scratch\inferno-sa-tm`
- **Espelho Local**: `C:\Users\Matheus Castro\.gemini\antigravity\scratch\inferno-sa-tm`
- **Branch Ativa**: `main`

### Mapa de Arquivos Chave:
- `index.html`: Estrutura semantica com todos os modais (Tela Inicial, Arquetipos, Mesa de Truco, Leitor de HQ, Mapa, Vitoria e Derrota).
- `style.css`: Folha de estilos unificada contendo o design system, layout mobile-first, regras de viewport 100dvh, animacoes fisicas e z-index de modais.
- `src/game.js`: Motor logico contendo as classes de Truco, IA dos chefes, regras de Vira/Manilhas, Mao de 11/Ferro e eventos de toque.
- `assets/cards/`: Ilustracoes em alta definicao para as cartas de corte (A, J, Q, K e Louis Beznoir).
- `assets/characters/`: Sprites de corpo inteiro no estilo de Hades para cada um dos 5 chefes.
- `assets/ui/`: Medalhoes heraldicos de arquetipos, icones de naipes e ornamentos da interface.
- `docs/`: Documentacao mestra completa:
  - `SHEET_MASTER_INFERNO_TM.md`: GDD mestre e especificacao de regras e sistemas.
  - `HISTORICO_EVOLUCAO_PROJETO.md`: Relatorio cronologico das 108 solicitacoes e evolucoes.
  - `conversa_transcript.jsonl`: Log bruto dos dialogos de desenvolvimento.

---

## 4. Convencoes e Regras de Engenharia do Projeto

1. **Diretriz de Zero Emojis**:
   - Todo e qualquer elemento visual decorativo e renderizado exclusivamente atraves de arquivos SVG estilizados (`.inline-ui-art` ou `.hud-art-icon`).
   - Textos de interface, comentarios de codigo e mensagens de commit no git nao utilizam emojis.

2. **Politica de Cache-Buster**:
   - Sempre que `style.css` ou `src/game.js` forem modificados para producao, incremente a versao do cache buster nas tags correspondentes em `index.html`:
     ```html
     <link rel="stylesheet" href="style.css?v=61">
     <script type="module" src="src/game.js?v=61"></script>
     ```

3. **Padrao de Toque Mobile (`bindSafeTap`)**:
   - Elementos interativos essenciais (botoes de truco, cartas na mao, leitor de HQ) utilizam o pipeline `game.bindSafeTap`, que diferencia toques rapidos de arrastos/rolagem (`dx, dy > 16px`) e suprime eventos de clique duplicados com debounce de 450ms.
   - Botoes vitais de tela inicial contam tambem com o fallback nativo `onclick="window.handler && window.handler()"`.

4. **Hierarquia de Camadas (Z-Index)**:
   - Modais sobrepostos (`#comic-modal`, `#map-modal`, `#interstitial-comic-modal`): `z-index: 2000 !important;`
   - Tela Inicial (`.title-screen-overlay`): `z-index: 380;`
   - Modais de Selecao de Tese (`#archetype-modal`): `z-index: 350;`
   - Mesa de Feltro e Batalha: `z-index: 10 a 100;`

---

*Guia homologado para o time de desenvolvimento e mantenedores do Projeto Inferno TM.*
