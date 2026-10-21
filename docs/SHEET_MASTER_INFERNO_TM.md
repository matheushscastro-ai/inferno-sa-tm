# SHEET MASTER: INFERNO S/A — TRUCO MODE (TM)
## Game Design Document (GDD) & Master System Specification

---

## 1. Identidade do Projeto & Ficha Tecnica

- **Titulo Oficial**: Inferno S/A: Truco Mode (TM) — O Takeover de Louis Beznoir IV
- **Conceito de Alto Nivel (High Concept)**: Um jogo de cartas roguelite mobile-first onde o Truco Paulista classico encontra a estetica dramatica de *Hades* (Supergiant Games / Jen Zee) em uma satira executiva do mercado financeiro da Faria Lima e de Wall Street.
- **Genero**: Roguelite de Cartas / Card Battler / Truco Tatico / Satira Corporativa
- **Publico-Alvo**: Jogadores casuais e competitivos de Truco, fas de roguelikes estéticos (Hades, Balatro, Slay the Spire) e entusiastas de humor corporativo.
- **Plataforma Principal**: Web Mobile-First (100dvh / 9:16 nativo para smartphones, com container de simulacao vertical para navegadores desktop).
- **Stack Tecnologica**: HTML5 Semantico, CSS3 Moderno (Custom Properties, Flexbox, Animations), JavaScript ES6+ Modular puro (Vanilla JS sem frameworks pesados).
- **Hospedagem & Deploy**: GitHub Pages com CI/CD automatico via GitHub Actions (`https://matheushscastro-ai.github.io/inferno-sa-tm/`).
- **Direcao de Arte**: 2D Stylized Game Art, cel-shading de alto contraste, tracos fortes em nanquim preto, paleta de ouro polido, obsidiana, purpura ametista e carmesim do Tartaro.
- **Diretriz Estrita de Interface**: Zero caracteres de emoji em toda a interface, tipografia, comentarios de codigo e mensagens de commit, substituindo-os 100% por ilustracoes tematicas em SVG e arte 2D.

---

## 2. Visao Geral da Narrativa & Universo

### 2.1 Sinopse do Enredo
Louis Beznoir IV e o herdeiro mimado de uma das mais antigas e preguicosas holdings familiares europeias. Com uma carreira construida a base de almocos de 4 horas, networking em iates e teorias sobre a temperatura ideal das ostras da Normandia, a vida de Louis parecia intocavel.

Porem, durante uma tarde ensolarada na Riviera Francesa, um incidente catastrofico de compliance gastronomico acontece: Louis se engasga pateticamente com espumante biodinamico de 4.000 euros. Ao perder os sentidos, seu espirito e despachado diretamente para as margens cinzentas do Rio Aqueronte, no Submundo.

Para seu horror, suas túnicas de alfaiataria italiana foram confiscadas pela alfandega infernal e substituidas por linho grego. Ao descobrir que o Submundo e controlado por um conglomerado burocratico implacavel chamado **Inferno S/A** — liderado por Hades em seu trono executivo de obsidiana —, Louis se recusa a aceitar o pos-vida de um mortal comum. Munido de sua arrogancia aristocratica e de seu baralho de Truco Paulista, ele decide auditar e executar um **Takeover Hostil** de todas as 5 camaras da corporacao ate expulsar Hades da cadeira de CEO.

### 2.2 Tom Narrativo & Satira
O jogo funde a mitologia greco-romana classica com os vicios, jargoes e absurdos do mercado financeiro e do direito corporativo:
- Processos em chamas, catracas de compliance, atestados medicos para fugir de reunioes e liminares juridicas do Tartaro.
- Jargoes executivos satiricos: *shitstorm*, *burnout*, *insider trading*, *takeover*, *EBITDA de almas*, *chamada de margem*, *compliance*, *M&A*, *holding blindada*, *HFT*.

---

## 3. Mecanica Central — O Sistema de Truco Paulista do Submundo

O coracao de *Inferno TM* e a adaptacao integral das regras do tradicional **Truco Paulista**, combinada a progressao de rodadas roguelite e modificadores divinos.

### 3.1 Baralho e Hierarquia de Cartas Comuns
O baralho utiliza a estrutura oficial de 40 cartas do Truco Paulista (excluindo 8, 9, 10 e curingas), com cartas do 4 ao 3:
- **Hierarquia Basica de Forca (da mais fraca para a mais forte)**:
  1. `4` (Poder 1)
  2. `5` (Poder 2)
  3. `6` (Poder 3)
  4. `7` (Poder 4)
  5. `Q` / Dama (Poder 5) — Ilustrada com Persefone / Rainha do Submundo
  6. `J` / Valete (Poder 6) — Ilustrado com Guerreiro Hermes / Ares Jovem
  7. `K` / Rei (Poder 7) — Ilustrado com Monarca Minos / Submundo
  8. `A` / As (Poder 8) — Ilustrado com Brasao Imperial de Hades
  9. `2` (Poder 9)
  10. `3` (Poder 10)
  11. `★ Beznoir` (Poder 11) — Carta especial exclusiva do protagonista Louis Beznoir IV.

### 3.2 A Vira e o Sistema de Manilhas
No inicio de cada rodada (conjunto de 3 vazas), o baralho e embaralhado e uma carta e virada para cima na mesa (*A Vira*).
- **Regra da Proxima Carta**: As cartas de maior forca da rodada sao as **Manilhas**, definidas como a carta de numero/letra imediatamente seguinte a Vira na sequencia ciclica:
  `4 -> 5 -> 6 -> 7 -> Q -> J -> K -> A -> 2 -> 3 -> 4`
  *Exemplo: Se a Vira for 7, a Manilha e a Dama (Q). Se a Vira for 3, a Manilha e o 4.*

- **Hierarquia Oficial dos Naipes para as Manilhas**:
  Quando duas ou mais manilhas sao jogadas na mesma vaza, o desempate segue estritamente a ordem oficial de naipes do Truco Paulista:
  1. **Paus (Zap)** — O naipe supremo. Forca absoluta 100.
  2. **Copas (Copeta)** — Segunda maior manilha. Forca absoluta 90.
  3. **Espadas (Espadilha)** — Terceira maior manilha. Forca absoluta 80.
  4. **Ouros (Pica-Fumo)** — Quarta maior manilha. Forca absoluta 70.

### 3.3 A Vaza (Melhor de 3 Partidas por Rodada)
- Cada jogador (Louis e o Chefe) recebe 3 cartas na mao.
- Uma rodada consiste em ate 3 confrontos individuais de cartas (*vazas*).
- O jogador que vencer **2 das 3 vazas** fatura a rodada e leva a pontuacao correspondente em **Tentos**.
- **Regra de Empates (Canga)**:
  - Empate na 1ª vaza: Quem vencer a 2ª vaza ganha a rodada.
  - Empate na 2ª vaza: Quem venceu a 1ª vaza ganha a rodada.
  - Empate na 3ª vaza: Quem venceu a 1ª vaza ganha a rodada.
  - Empate nas 3 vazas: Ninguem pontua, baralho e reembaralhado.
  - *Excecao Holding Blindada*: O arquétipo Holding Blindada vence automaticamente qualquer situacao de empate de vaza.

### 3.4 Sistema de Apostas e Escalada de Truco
Toda rodada se inicia valendo **1 Tento**. A qualquer momento em seu turno, antes de jogar uma carta, o jogador ou o chefe pode solicitar aumento da aposta:
1. **Grito de TRUCO**: Eleva o valor da rodada para **3 Tentos**.
2. **Grito de SEIS**: Eleva o valor da rodada para **6 Tentos**.
3. **Grito de NOVE**: Eleva o valor da rodada para **9 Tentos**.
4. **Grito de DOZE**: Eleva o valor da rodada para **12 Tentos** (o teto maximo da partida inteira).

- **Alternancia de Pedido**: Quem pede aumento passa a prerrogativa do proximo aumento para o adversario. Quem trucou nao pode trucar novamente em sequencia.
- **Opcao de Correr (Fold)**: Diante de um pedido de aumento, o adversario pode:
  - *Aceitar*: A rodada continua valendo a nova pontuacao.
  - *Aumentar (Contra-trucar)*: Devolve pedindo o nivel seguinte.
  - *Correr*: Desiste da mao imediatamente. O desafiante fatura os pontos acumulados ate antes do pedido recusado.

### 3.5 Condicao de Vitoria da Partida
- A partida contra cada Chefe de Camara e disputada ate **12 Tentos**.
- O primeiro participante a alcancar ou superar 12 tentos vence a partida.
- Se Louis vencer, ele assume o contrato da Camara, adquire Dracmas, escolhe uma Bencao/Reliquia no lounge olimpico e avanca para a proxima fase.
- Se o Chefe alcancar 12 tentos, Louis sofre liquidacao judicial e a run e encerrada com a tela de Game Over.

### 3.6 Regras Especiais Avancadas

#### A. Mao de 11 (Placar em 11 Tentos)
- Quando um dos participantes atinge **11 Tentos** no placar:
  - O jogador nessa pontuacao recebe suas 3 cartas e tem o direito de analisa-las com as cartas abertas e destaques visuais de Manilhas ativos.
  - O jogador escolhe conscientemente entre:
    1. *Jogar a Mao*: Disputa a rodada valendo automaticamente **3 Tentos fixos**.
    2. *Correr da Mao*: Desiste preventivamente, entregando apenas **1 Tento** ao oponente.
  - **Proibicao de Truco**: Na Mao de 11 e expressamente proibido pedir Truco. O botao de Truco permanece desabilitado.

#### B. Mao de Ferro (Placar 11 x 11)
- Quando ambos os participantes estao empatados em **11 x 11 Tentos**:
  - A tensao atinge o apice maximo. A rodada e disputada no escuro (*Face-down*).
  - Nenhum participante pode olhar suas proprias cartas nem as do adversario antes de jogar na mesa.
  - Nao ha pedido de Truco nem analise previa. A sorte, a probabilidade e o destino decidem a vitoria.

#### C. Iniciativa Aleatoria na Primeira Rodada
- No inicio de cada partida, o sistema sorteia aleatoriamente (50% de probabilidade) quem comeca jogando a primeira carta, conferindo dinamismo realista. Nas rodadas seguintes, quem venceu a rodada anterior assume a lideranca de saida.

#### D. Ritmo Humanizado de Jogada (Random Delay)
- Quando Louis e o Chefe jogam no mesmo turno, o motor insere um intervalo aleatorio entre **0 e 2 segundos** antes da resposta da IA, simulando a reflexao de um jogador humano avaliando a mesa.

#### E. Impacto Fisico e Reacao de Feltro
- Cada carta jogada dispara uma animacao de slam (`card-slam-anim`), tremor de tela proporcional a forca da carta (`screen-shake-anim`) e distorcao elastica da mesa verde de feltro (`felt-bump`), conferindo peso sensorial as batidas de Truco.

---

## 4. Teses de Investimento (Arquetipos Iniciais)

Ao iniciar uma nova run na tela inicial, o jogador seleciona uma entre tres teses de operacao no Submundo. Cada tese define os poderes passivos iniciais e o estilo tatico do baralho:

| Arquetipo | Titulo Executivo | Reliquia Patrona | Bencaos Iniciais | Estilo de Jogo |
|-----------|------------------|------------------|------------------|----------------|
| **Fundo Quantitativo** | Algoritmo HFT de Hermes | `algoritmo_hermes` | Troca Manilha + Inimigo Impar | Controle estatistico, manipulacao da Vira e execucao matematica. |
| **Private Equity Hostil** | Alavancagem de Ares | `alavancagem_ares` | +4 Poder + -4 Inimigo | Agressividade extrema, bullying de mesa e blefes com forca bruta. |
| **Holding Blindada** | Blindagem de Atena (Hedge) | `blindagem_patrimonial` | Menor Vence + Inimigo Par | Defesa intransponivel, vitoria automatica em empates e contra-ataques. |

---

## 5. Banco de Reliquias & Ativos Financeiros (DB)

Reliquias sao ativos permanentes de alto padrao acumulados durante a run que fornecem beneficios continuos e habilidades ativaveis na barra de poderes:

| ID | Nome do Ativo | Custo | Efeito Mecanico em Jogo |
|----|---------------|-------|-------------------------|
| `algoritmo_hermes` | **Algoritmo HFT** | Inicial | 1x por Boss: compra 4 cartas e descarta 1 no inicio da mao; 1x por Boss: carta impar vence a vaza. |
| `alavancagem_ares` | **Alavancagem Hostil** | Inicial | 1x por Boss: sua carta ganha +2 de forca na mesa; 1x por Boss: carta do chefe perde -2 de forca. |
| `blindagem_patrimonial` | **Holding Blindada** | Inicial | Passiva permanente: vence todos os empates de vaza (cangas); 1x por Boss: carta par vence a vaza. |
| `patek_olimpico` | **Patek dos Deuses** | 70 Dracmas | Sinal de Status: na 1ª vaza de toda mao, sua carta ganha +1 nivel de forca na mesa. |
| `cartao_centurion` | **Amex Obsidiana** | 65 Dracmas | Rei do Blefe: Louis fatura +25 Dracmas extras sempre que o Chefe correr de um pedido de Truco. |
| `insider_trading` | **Insider Trading** | 80 Dracmas | Espionagem: na 2ª vaza de cada rodada, a carta do Chefe e jogada aberta na mesa. |
| `trituradora_vip` | **Compliance VIP** | 75 Dracmas | Blindagem Juridica: bloqueia 1 habilidade especial do Chefe no duelo e intimida-o a correr do Truco. |
| `safra_1800` | **Bordeaux 1800** | 70 Dracmas | Reserva Exclusiva: Louis comeca cada duelo de Chefe com +2 Tentos de vantagem no placar. |
| `fusao_perpetua` | **Contrato M&A** | 90 Dracmas | Pacto Perpetuo: garante que a Carta Especial de Louis (★ Beznoir) venha em TODAS as maos iniciais. |
| `fundo_soberano` | **Fundo Soberano** | 60 Dracmas | Liquidez: ao vencer uma rodada sem perder partidas (2x0), fatura +20 Dracmas imediatos. |

---

## 6. Banco de Bencaos Olimpicas (DB)

Bencaos sao intervencoes cosmicas negociadas com as divindades do Olimpo que subvertem as regras fundamentais do Truco durante a rodada:

| ID | Nome da Bencao | Divindade | Icone / Visual | Efeito Mecanico |
|----|----------------|-----------|----------------|-----------------|
| `troca_manilha` | **Trocar Manilha** | Hermes | Asas douradas / Azul celeste | Vira imediatamente uma nova carta do topo do deck, alterando a Manilha da rodada. |
| `menor_vence` | **Menor Carta Vence** | Dionisio | Taca de vinho / Rubi | Inverte a regra nesta vaza: quem jogar a carta mais fraca vence o confronto. |
| `inimigo_impar` | **Mata Impar** | Zeus | Raio de plasma / Eletrico | Vence a vaza automaticamente se a carta jogada pelo Chefe for IMPAR (3, 5, 7, A, J, K). |
| `aumento_poder` | **+4 Poder na Carta** | Hefesto | Brasas vulcânicas / Fogo | Aumenta a forca da carta de Louis em +4 posicoes na hierarquia do Truco. |
| `diminuicao_inimigo`| **-4 Poder Inimigo** | Ares | Laminas sangrentas / Carmesim | Reduz a forca da carta jogada pelo Chefe em -4 posicoes na hierarquia. |
| `inimigo_par` | **Mata Par** | Atena | Escudo Egide / Safira | Vence a vaza automaticamente se a carta jogada pelo Chefe for PAR (2, 4, 6, Q). |
| `anular_manilha` | **Anula Manilha** | Poseidon | Tridente / Oceano | Se o Chefe jogar uma Manilha, despoja-a de seu status, convertendo-a em carta comum. |
| `roubar_empate` | **Empate +1 Tento** | Afrodite | Rosa cosmica / Ouro | Concede a vitoria em qualquer empate e adiciona +1 Tento extra ao valor da mao. |

---

## 7. Bestiario de Chefes & Camaras Corporativas (DB)

A jornada de auditoria hostil e composta por 5 Camaras lineares com dificuldade progressiva, estilos de blefe e mecanicas exclusivas:

### Camara I: Margens do Aqueronte
- **Chefe**: O Estagiario de Compliance (*Sombra de Aqueronte*)
- **Descricao**: O primeiro escalao da burocracia do Submundo. Ansioso, comete erros de cálculo e vacila sob pressao de Truco.
- **Coragem de Truco (IA)**: `0.34` (Tende a correr de aumentos elevados).
- **Habilidade Especial**: *Atestado Medico* — Forca a vaza atual a empatar (cangar).
- **Cenario**: Pedras cinzentas e nevoa espessa as margens do rio das almas.

### Camara II: Cartorio do Limbo
- **Chefe**: A Recepcionista Histerica (*Furia Sentinela do Limbo*)
- **Descricao**: Atendimento intransigente com pilhas de processos em chamas. Odeia desacato e reage com frieza a pedidos de aumento.
- **Coragem de Truco (IA)**: `0.48`
- **Habilidade Especial**: *Falta de Carimbo* — Carimba a carta de Louis, reduzindo sua forca em -2 pontos na vaza.
- **Cenario**: Balcao de marmore escuro com montanhas de pergaminhos e guiches numerados.

### Camara III: Portões do Cocito
- **Chefe**: O Seguranca Truculento (*Gargula de Pedra do Cocito*)
- **Descricao**: A barreira fisica de granito que barra qualquer entrada sem cracha VIP. Firme e imune a bravatas vazias.
- **Coragem de Truco (IA)**: `0.58`
- **Habilidade Especial**: *Bloqueio de Catraca* — Enrijece sua carta de pedra, somando +2 de forca imediata.
- **Cenario**: Portais macicos de pedra esculpida, grades de ferro e rios congelados.

### Camara IV: Tribunal de Flegetonte
- **Chefe**: O Diretor Inflexivel (*Rei Minos, o Juiz Supremo*)
- **Descricao**: O magistrado ancestral do Submundo. Analisa probabilidades com precisao cirurgica e trucas quando tem cartas medias.
- **Coragem de Truco (IA)**: `0.65`
- **Habilidade Especial**: *Decisao Monocratica* — Cassa o recurso da mesa e vence empates monocraticamente.
- **Cenario**: Sala de tribunal iluminada por tochas de lava carmesim e colunas corintias.

### Camara V: Gabinete Executivo de Hades
- **Chefe**: O Lorde e CEO do Submundo (*Hades, o Rei do Tartaro*)
- **Descricao**: O executivo supremo da Inferno S/A. Agressivo, blefa com naturalidade monarquica e tenta intimidar Louis a cada tento.
- **Coragem de Truco (IA)**: `0.74` (Altissima probabilidade de aceitar Truco e contra-trucar com Seis ou Doze).
- **Habilidade Especial**: *Liquidacao Forcada* — Executa uma chamada de margem devastadora, exigindo o maximo de forca.
- **Cenario**: Sala da presidencia em obsidiana negra com colunas em chamas azuis e o monumental Trono do Submundo.

---

## 8. O Protagonista: Louis Beznoir IV

- **Passiva Inata (Sorte de Nascenca)**: Sendo um herdeiro privilegiado do jet-set internacional, Louis possui uma probabilidade **+40% superior** de receber sua Carta Especial exclusiva em qualquer distribuiçao de cartas. Representada por um chip heráldico dourado na barra de habilidades.
- **Carta Especial (★ Beznoir)**:
  - Posicionada no ranking acima do 3 (poder 11), figurando logo abaixo das Manilhas.
  - Ilustrada com Louis Beznoir segurando uma taça de ouro reluzente e um contrato em chamas.

---

## 9. Biblia de Dialogos & Satira Executiva

### 9.1 Frases de Louis Beznoir IV
- **Inicio de Partida**:
  - *"Embaralha isso direito! Na Faria Lima eu so jogo Truco Paulista valendo 12 tentos."*
  - *"Olha a Vira na mesa! Tres rodadas e sem choro no compliance. Quem da as cartas?"*
  - *"Pode vir! Se voce correr do meu Truco, ja vou anotando os tentos!"*
  - *"Preciso fechar esse takeover em 12 tentos antes que meu Bordeaux esquente."*
- **Jogada de Carta**:
  - *"Bate essa carta na mesa se tiver patrimonio!"*
  - *"Rodada limpa! Olha o naipe dessa carta!"*
  - *"Voce chama essa merda de carta?!"*
  - *"Engole essa posicao na mesa!"*
  - *"Corta essa se tiver Manilha!"*
- **Gritos de Truco**:
  - *"TRUCO, Burocrata! Vale 3 Tentos agora!"*
  - *"SEIS NA SUA CARA! Vai encarar 6 Tentos ou vai correr pro RH?!"*
  - *"NOVE! Bota 9 Tentos na roda agora!"*
  - *"DOZE! PARTIDO INTEIRO! Quero a cadeira da presidencia nessa mao!"*
- **Reacoes a Dano / Derrota na Vaza**:
  - *"MEU LINHO EGIPCIO! Ele tinha Manilha escondida?!"*
  - *"ISSO E INSIDER TRADING! Quero recontagem das cartas!"*
  - *"Roubaram no embaralhamento! Vou acionar a CVM do Tartaro!"*
  - *"Derramou meu vinho de 1800 na mesa de feltro!"*
- **Vitoria Final**:
  - *"Flawless victory! 12 tentos no placar e mais um chefe liquidado!"*
  - *"Outstanding! Mais uma mesa varrida pela Holding Beznoir."*

### 9.2 Baloes de Grito Comico Instantaneo (Callouts)
- **Louis no Ataque**: `TOMA NA RODADA!`, `CORTA ESSA!`, `ZAP NA TESTA!`, `TRUCO, LADRAO!`, `DESCE A CARTA!`
- **Louis no Dano**: `TINHA MANILHA?!`, `BARALHO MARCADO!`, `MEU LINHO EGIPCIO!`, `CHAMA A AUDITORIA!`, `BLEFE MALDITO!`
- **Chefes no Ataque**: `MINHA RODADA!`, `ENGOLIU O BLEFE!`, `MANILHA DO SINDICATO!`, `CORTA ESSA, PLAYBOY!`, `TRUCO DE CARIMBO!`
- **Chefes no Dano**: `ERA ZAP?!`, `ARREGUEI NESSA!`, `QUE MAO APELONA!`, `PERDI OS TENTOS!`, `CADE MEU TRES?!`

---

## 10. Sistema de Quadrinhos & Narrativa Visual

O jogo conta com um visualizador de HQs integrado no estilo romance grafico estilizado:
1. **Prologo (3 Cenas em Widescreen 16:9)**:
   - *Cena I: Riviera Francesa* — Louis relaxando no iate com champanhe de 4.000 euros.
   - *Cena II: O Incidente de Compliance* — O engasgo tragico e o champanhe voando pelo ar.
   - *Cena III: O Despertar no Inferno* — Louis nas pedras do Aqueronte com linho grego perguntando pelo RH.
2. **Tirinhas Intersticiais de Transicao (Entre Camaras)**:
   - 1 -> 2: Louis tentando dar gorjeta na catraca do Limbo e o choque burocratico.
   - 2 -> 3: Tentativa de furar fila executiva nos portões do Cocito e o bloqueio do Gargula.
   - 3 -> 4: A apelacao juridica no Tribunal de Minos.
   - 4 -> 5: A invasao do Gabinete Presidencial e o confronto final com Hades.
3. **Epilogo da Vitoria (Proporcao Vertical 9:16)**:
   - Louis Beznoir IV sentado no monumental Trono de Obsidiana de Hades, taça de ouro erguida e cetro-bidente na mao enquanto os deuses riem da capitulacao de Hades.

---

## 11. Arquitetura de Software & Engenharia

### 11.1 Estrutura de Diretorios do Repositorio
```
inferno-sa-tm/
├── index.html                   # Documento raiz semantico mobile-first
├── style.css                    # Folha de estilos central (design tokens, temas, animacoes)
├── server.py                    # Servidor local de desenvolvimento Python
├── README.md                    # Documento de apresentacao e links rapidos
├── docs/                        # Pasta de documentacao mestra do projeto
│   ├── SHEET_MASTER_INFERNO_TM.md       # Master GDD e especificacao tecnica completa
│   ├── HISTORICO_EVOLUCAO_PROJETO.md    # Registro detalhado das 108 interacoes do usuario
│   ├── GUIA_DO_PROJETO_INFERNO_TM.md    # Manual do desenvolvedor, deploy e arquitetura
│   └── conversa_transcript.jsonl        # Log bruto integral da sessao de desenvolvimento
├── src/
│   └── game.js                  # Motor central do jogo (GameState, IA, Truco, eventos)
├── assets/
│   ├── cards/                   # Ilustracoes de cartas (A, J, Q, K, Louis, molduras)
│   ├── characters/              # Sprites full-body dos 5 chefes de camara
│   ├── backgrounds/             # Arenas e cenarios atmosfericos das camaras
│   ├── comic/                   # Paineis de HQ do prologo, transicoes e epilogo
│   └── ui/                      # Icones heráldicos, naipes, dracmas e ornamentos em SVG
└── tools/                       # Scripts de automacao, validacao QA e balanceamento
```

### 11.2 Principais Modulos do Motor (`src/game.js`)
- `GameState`: Classe controladora singleton contendo o estado da run, inventario, baralho, mesa de truco e historico de tentos.
- `Deck & Truco Logic`: Gerenciamento do baralho de 40 cartas, calculo dinamico de forca com base na Vira atual e hierarquia de naipes.
- `AI Decision Matrix`: Motor de decisao dos chefes baseado em forca estimada da mao, nivel de coragem da camara e probabilidade de blefe.
- `Input Handling Pipeline`: Suporte simultaneo a touch screens e mouse via `bindSafeTap`, supressao de eventos fantasmas e fallback nativo inline.
- `Visual FX Engine`: Orquestracao de vibracoes de feltro, screen shakes, particulas de corte e balões de diálogo dinâmicos.

---

*Documento gerado e catalogado como Master Sheet oficial do Projeto Inferno TM em Outubro de 2026.*
