# Historico de Evolucao e Registro de Conversa — Projeto Inferno TM

## Sumario Executivo do Desenvolvimento
O projeto **Inferno S/A: Truco Mode (TM)** nasceu da uniao de duas visões artisticas e ludicas complementares:
1. A estetica visual, o tom mitologico e a narrativa roguelite inspirados na obra-prima *Hades* (Supergiant Games), adaptados com sátira afiada sobre o mercado financeiro (Faria Lima / Wall Street).
2. A jogabilidade estrategica, tensa e psicologica do **Truco Paulista classico**, enriquecida por regras de deck-building, reliquias passivas, cartas especiais e poderes olimpios que alteram as regras da mesa.

Este documento registra a trajetoria completa de desenvolvimento do jogo ao longo de 108 interações com o usuário Matheus Castro, documentando cada marco de design, pivot mecanico, desafio de engenharia de software e solucao implementada.

---

## As 6 Fases do Projeto

### Fase 1: Concepcao do Universo e Prototipo Inicial (14 a 15 de Outubro de 2026)
- **Premissa Narrativa**: Louis Beznoir IV, herdeiro mimado e executivo de produtos do mercado financeiro, engasga com champanhe biodinamico em seu iate na Riviera Francesa. Ao acordar nas pedras cinzentas do Aqueronte, descobre que suas roupas italianas foram trocadas por linho grego. Determinado a voltar (ou demitir o Inferno), ele decide realizar um **Takeover Hostil** da corporacao Inferno S/A.
- **Estrutura de Fases**: Criacao das 5 Camaras corporativas do Submundo:
  1. Camara I: Margens do Aqueronte (O Estagiario de Compliance)
  2. Camara II: Cartorio do Limbo (A Recepcionista Histerica)
  3. Camara III: Portões do Cocito (O Seguranca Gargula)
  4. Camara IV: Tribunal de Flegetonte (O Juiz Minos)
  5. Camara V: Gabinete Executivo do Tartaro (Hades CEO)
- **Mecanica Inicial**: Batalhas roguelite por turnos com cartas de acao, gerenciamento de energia e dano, que serviram como embriao para a interface e cenarios.

### Fase 2: Identidade Visual Hades & Jen Zee (15 a 17 de Outubro de 2026)
- **Direcao de Arte**: Cel-shading de alto contraste, tracos fortes em nanquim preto, paleta de obsidiana, ouro velho, purpura imperial e carmesim rubi.
- **Key Art e Tela Inicial**: Geracao da ilustracao vertical oficial de Louis Beznoir IV segurando taça dourada e contrato místico sob a silhueta monumental de Hades.
- **Sprites e Avatares**: Criacao das ilustracoes full-body dos chefes, icones heráldicos para teses e relíquias, e fundos atmosfericos de cada arena.
- **Narrativa em Quadrinhos**: Desenvolvimento do leitor de HQ com o prologo em 3 paineis e tirinhas de transicao entre as camaras.

### Fase 3: Arquitetura Mobile-First e HUD Reestruturado (17 a 18 de Outubro de 2026)
- **Resolucao e Viewport**: Enquadramento mobile-first vertical (9:16 / 430px max width no desktop, 100dvh nativo no smartphone).
- **Molduras Douradas e Interface**: Criacao das molduras ornamentadas com louros olimpicos, runas gregas e estilo visual classico.
- **Mapa Interativo do Submundo**: Roadmap de nós com miniaturas das camaras e progressao visual na auditoria.

### Fase 4: O Grande Pivot para o Modo Truco Paulista - TM (18 de Outubro de 2026)
- **Decisao de Design**: Substituicao do combate tradicional de RPG pela tensao psicologica e agilidade do **Truco Paulista**:
  - Baralho limpo com cartas do 4 ao 3 (4, 5, 6, 7, Q, J, K, A, 2, 3) nos quatro naipes.
  - Ilustracoes completas no estilo de Hades para as cartas de corte (**A, J, Q, K** e a carta especial de Louis).
  - Regra oficial de **Vira e Manilhas**: A carta seguinte a Vira torna-se a Manilha, com hierarquia oficial de naipes (**Zap / Paus > Copeta / Copas > Espadilha / Espadas > Pica-Fumo / Ouros**).
  - Partida ate **12 Tentos**, com disputa em melhor de 3 rodadas (vazas) e escalada de apostas de Truco (**1 -> 3 -> 6 -> 9 -> 12**).
- **Separacao de Repositorio**: Migracao oficial para o repositorio dedicado `inferno-sa-tm` hospedado no GitHub Pages.

### Fase 5: Teses de Investimento, Reliquias & Bencaos Olimpicas (18 de Outubro de 2026)
- **3 Arquétipos Iniciais (Teses de Operação)**:
  1. *Fundo Quantitativo (HFT / Algoritmo de Hermes)*: Compra 4 cartas e descarta 1 no inicio da mao; ativa vitoria se carta for impar.
  2. *Private Equity Hostil (Alavancagem de Ares)*: Adiciona +2 de forca a sua carta ou reduz -2 de forca da carta do chefe.
  3. *Holding Blindada (Hedge Fund / Blindagem de Atena)*: Vence todos os empates (cangas); ativa vitoria se carta for par.
- **Banco de Reliquias Financeiras**: Inclusao de ativos de luxo e poder executivo (Patek dos Deuses, Amex Obsidiana, Compliance VIP, Bordeaux 1800, Contrato M&A, Fundo Soberano).
- **Bencaos do Olimpo**: Cartas cosmicas que alteram as regras da mesa (Troca de Manilha, Menor Carta Vence, Mata Impar, Mata Par, Anula Manilha Inimiga, Roubo de Empate).

### Fase 6: Regras Avancadas, Mão de 11/Ferro e Polimento Final (19 a 21 de Outubro de 2026)
- **Mao de 11 e Mao de Ferro**: Implementacao estrita das regras oficiais de Truco Paulista quando o placar atinge 11 tentos:
  - *Mao de 11*: Jogador analisa a mao de cartas com highlights de Manilha antes de aceitar ou correr da mao por 1 tento; botao de Truco desabilitado.
  - *Mao de Ferro*: Quando ambos estao com 11 tentos, todas as cartas sao jogadas no escuro (face down).
- **Impacto Fisico e Reacao de Feltro**: Animacao de impacto violento (`card-slam-anim`), tremor de tela (`screen-shake-anim`) e distorcao de feltro na mesa (`felt-bump`).
- **Ritmo Natural**: Intervalo aleatorio de 0 a 2 segundos quando ambos jogam no mesmo turno.
- **Passiva Inata de Louis**: Adicao do chip VIP interativo *Sorte de Nascença* (+40% de chance de receber a Carta Especial Beznoir).
- **Acumulo de Reliquias**: Integracao de todas as reliquias adquiridas nas lojas/salas como chips interativos na barra de habilidades.
- **Blindagem do Leitor de HQ**: Correcao do z-index (2000), proporcao de imagem 16:9 sem cortes e compatibilidade universal mobile/touch.

---

## Registro Cronologico Completo de Solicitacoes do Usuario

Abaixo estao documentadas todas as 108 interacoes do usuario Matheus Castro ao longo da construcao do jogo:

| # | Data | Solicitacao do Usuario | Modulo Impactado |
|---|------|------------------------|------------------|
| 1 | 2026-10-14 | Voce é um desenvolvedor de jogos. Quero voltar na ideia de criar um jogo, mas vamos dividir diferente. vamos comecar do zero, p... | Game Design Geral |
| 2 | 2026-10-14 | 1. Gostaria de um jogo no estilo diablo, porem, estou tendo muitos problemas com a IA no uso e selecao dos assets. gosto bastan... | Mecanica de Truco |
| 3 | 2026-10-14 | 1 | Game Design Geral |
| 4 | 2026-10-14 | 1. Vertical 2. gostei da opcao B e C. podemos partir de um deck inicial conforme a classe do guerreiro e deixar as benção padro... | Mecanica de Truco |
| 5 | 2026-10-14 | 1. gostei da regra de fusão e da mecanica, tenho a impressao que a capa espada limita um pouco as magias. O que voce acha? quan... | Game Design Geral |
| 6 | 2026-10-14 | Isso esta perfeito! O protagonista ficou otimo, adicionei Outstanding e flawless nos bordoes tbm. O inferno que voce tem em men... | Game Design Geral |
| 7 | 2026-10-14 | podemos seguir com a opcao A | Game Design Geral |
| 8 | 2026-10-14 | Gostei, acho que estamos indo par ao caminho certo. Na parte da mecanica, em qual fase conseguimos adicionar mais cartas, efeit... | Mecanica de Truco |
| 9 | 2026-10-14 | Gostei bastante das novas mecanicas | Game Design Geral |
| 10 | 2026-10-14 | podemos deixar poucas cartas iniciais (atreladas ao personagem) e as adicionais a serem liberadas passando as telas. As frases ... | Mecanica de Truco |
| 11 | 2026-10-14 | 1. Ok  2. Agora ficou muito mitologico, force menos a mao nas referencias, use referencias mais rasas a mitologia. o Tom de arr... | Direcao de Arte |
| 12 | 2026-10-14 | sim | Game Design Geral |
| 13 | 2026-10-14 | o Estagiario ficou bom, use essa foto do luiz como referencia | Game Design Geral |
| 14 | 2026-10-14 | o Layout, pensei em algo meio pokemon ou gwent. Personagem principal no canto inferior esquerdo (fora de um box), inimigo na pa... | Direcao de Arte |
| 15 | 2026-10-14 | pode conferir na pasta: P:\VS CODE\assets\herois | Game Design Geral |
| 16 | 2026-10-14 | Ainda nao, o fundo da imagem ficou branco tambem. estava pensando em algo nesse estilo, porem, mais cartunesco | Direcao de Arte |
| 17 | 2026-10-14 | ficou otimo, inclusive o recorte. Mas o layout da tela ainda me incomoda um pouco | UI/UX & Mobile |
| 18 | 2026-10-14 | pensei em algo assim para o layout: Background - parte do submundo que estamos Superior direito o inimigo (inteiro se couber ou... | Direcao de Arte |
| 19 | 2026-10-14 | a partir da terceira carta, a imagem corta, assim como a barra de vida, ela nao precisa ter escrito HP, só os numeros bastam (X... | Mecanica de Truco |
| 20 | 2026-10-14 | o fundo ainda nao esta muito em linha com a estetica dos personagens. ME envie um prompt para que eu peça a geracao no midjourney | Game Design Geral |
| 21 | 2026-10-14 | onde esta salvo a imagem do de corpo itneiro do protagonista e do primeiro inimigo? vou mandar como referencia | Direcao de Arte |
| 22 | 2026-10-14 | nao ajudou muito, mas o que acha dessas? tente encaixa-los | Game Design Geral |
| 23 | 2026-10-14 | o estagiario ficou meio perdido, acho que uma solucao boa para nao ficarmos nesse impasse do backgroud seria fazer um "platafor... | UI/UX & Mobile |
| 24 | 2026-10-14 | ainda não. ele da a impressao que esta flutuando ainda, nao esta muito centralizado na plataforma. talvez fosse melhor substrit... | Game Design Geral |
| 25 | 2026-10-14 | ficou melhor, acho que podemos fazer 2 correções que imagino que ajudem. 1. Deixa a plataforma menos colorida, cores mais opaca... | Game Design Geral |
| 26 | 2026-10-14 | achei que ficou melhor, mas o blur nao era na plataforma, mas sim envolta dela, como se fosse um campo gravitacional, outra pon... | UI/UX & Mobile |
| 27 | 2026-10-14 | ficou melhor mesmo, só desca o inimigo e a com as informacoes deles para abaixo das mensagens e concluimos essa parte | Direcao de Arte |
| 28 | 2026-10-14 | agora ficou Otimo! Crie a animacao de ataque e recebendo dano do nosso protagonista. Lembre de usar ideias comicas | Game Design Geral |
| 29 | 2026-10-14 | ficou bom, mas os personagens nao estao coerentes... a roupa do personagem que toma dano é outra, o cabelo tambem. Mesmo para o... | Direcao de Arte |
| 30 | 2026-10-14 | sim | Game Design Geral |
| 31 | 2026-10-14 | perfeito, agora ficou otimo. As frases que ele fala no ataque e no dano estao ficando em cima da animacao, corrija isso e faça ... | Direcao de Arte |
| 32 | 2026-10-14 | Perfeito! A adição do diretor e arte ajudou bastante na valocidade das coisas. Qual o proximo passo? | Direcao de Arte |
| 33 | 2026-10-14 | no roadmap, tire da conclusao dos efeitos sonoros, podemos voltar neles depois? nao curti muito, mas nao olhei com calma tbm. o... | Direcao de Arte |
| 34 | 2026-10-14 | O art director esta muito bom, parabens! Precisamos colocar frames/bordas nas cartas. Precisamos mexer um pouco mais no layout ... | Mecanica de Truco |
| 35 | 2026-10-14 | nao vejo ainda o frame das cartas e os layouts estao sendo cortados | Mecanica de Truco |
| 36 | 2026-10-14 | ficou bem melhor, só o texto que ficou um pouco fora do frame | Direcao de Arte |
| 37 | 2026-10-14 | boa, compartilhe o link para abrir no celular, por favor | UI/UX & Mobile |
| 38 | 2026-10-14 | no celular o botao terminar turno esta cortado. da para subir mais o protagonista e o baralho no computador ele esta com o text... | Mecanica de Truco |
| 39 | 2026-10-14 | no celular o botao terminar turno esta cortado. da para subir mais o protagonista e o baralho no computador ele esta com o tex... | Mecanica de Truco |
| 40 | 2026-10-14 | resolvido? | Game Design Geral |
| 41 | 2026-10-14 | Finalizar turno ainda esta fora do frame, troque por 'END'. No celular, ao arrastar a carta de qualquer maneira ela ja é jogada... | Mecanica de Truco |
| 42 | 2026-10-14 | troque o nome do protagonista de Lucca para Louis Finalizar turno ainda esta fora do frame, troque por 'END'. No celular, ao ar... | Mecanica de Truco |
| 43 | 2026-10-14 | resolvido. qual o proximo passo? precisamos olhar a historia tambem e a jornada do heroi para sair do submundo | Narrativa & HQ |
| 44 | 2026-10-14 | vamos pelo recomendado, gostaria que fossem geradas tambem HQs contando a historia (podem ser acessadas no decorrer do jogo ou ... | Narrativa & HQ |
| 45 | 2026-10-15 | Sim, um unico ponto. Faça ele morrer com roupas normais e acordar no submundo com as roupas que estamos usando (gregas) | Game Design Geral |
| 46 | 2026-10-15 | ficou otimo, nao abriu do celular, mas por aqui ficou muito bom. Quais os proximos passos? | UI/UX & Mobile |
| 47 | 2026-10-15 | vamos seguir com o recomendado, lembrando que tambem nao fizemos as animacoes das cartas de fusao | Mecanica de Truco |
| 48 | 2026-10-15 | continue o trabalho | Game Design Geral |
| 49 | 2026-10-15 | 1. quis dizer o desenho das cartas de fusao, elas estao com o emoji ainda. assim como a carta retorica de duelo (inclusive o ti... | Mecanica de Truco |
| 50 | 2026-10-15 | 1. os card ficaram melhores, os nomes ainda nao estao muito bem encaixados nos cards, mas as artes ficaram boas 2. a troca deve... | Direcao de Arte |
| 51 | 2026-10-15 | opcao 3 | Game Design Geral |
| 52 | 2026-10-15 | 1. No celular ficou mal formatada a parte de cima. O nome da fase deixe corrente, nao quebre entre linhas 2. a parte de baixo d... | Direcao de Arte |
| 53 | 2026-10-15 | 1. agora a transicao de tela funcionou bem no celular, porem no computador ela ainda fica travado e nao passa a tela. 2. O mapa... | Direcao de Arte |
| 54 | 2026-10-15 | 1. agora a transicao de tela funcionou bem no celular, porem no computador ela ainda fica travado e nao passa a tela. 2. O map... | Direcao de Arte |
| 55 | 2026-10-15 | ainda tem o simbolo sobrepondo. Deixe a versao anterior do mapa, só tire o simbolo que sobrepoe a imagem | Direcao de Arte |
| 56 | 2026-10-15 | A utilizacao da barra de vida nao deu certo tbm. monte 3 frames como exemplo e me mande para escolher. Os simbolos de fogo, rai... | Direcao de Arte |
| 57 | 2026-10-15 | gere os 3 apartados do jogo como exemplo para eu escolher | Game Design Geral |
| 58 | 2026-10-15 | gostei bastante da opcao 1, pode seguir com ela e ja iniciar a proxima fase de desenvolvimento | Game Design Geral |
| 59 | 2026-10-16 | 1. As mensagens estao por cima dos inimigos novamente 2. os numeros da vida estao mal centralizados e as cartas vazando a tela ... | Mecanica de Truco |
| 60 | 2026-10-17 | gere de novo o link por favor | Game Design Geral |
| 61 | 2026-10-17 | tudo otimo! o unico ponto é o quadrinho do gargula, o texto ficou 100% em ingles, deixa só o Unaceptable em ingles e o resto em... | Narrativa & HQ |
| 62 | 2026-10-17 | muito bom! agora esta andando bem mesmo. alguns detalhe do corte de hades. Para a tela de conclusão, faça uma arte com o protag... | Direcao de Arte |
| 63 | 2026-10-17 | esse'e uma boa base para o estilo inteiro | Game Design Geral |
| 64 | 2026-10-17 | title screen art v2 ficou otima! | Game Design Geral |
| 65 | 2026-10-17 | a imagem final nao ficou muito boa, a proporcao nao ficou legal tbm, Refaça-a (voce tem liberdade para mudar a imagem se achar ... | Direcao de Arte |
| 66 | 2026-10-17 | que tal essa? | Game Design Geral |
| 67 | 2026-10-17 | 1. um ponto que esqueci de mencionar - louis trabalhava com produtos no mercado financeiro, Entao precisamos trocar as referenc... | Narrativa & HQ |
| 68 | 2026-10-18 | queria dar uma revisada no gameplay, acho que esta muito facil e nao estou conseguindo ver a necessidade de ser rogue like. Ana... | Mecanica de Truco |
| 69 | 2026-10-18 | siga com o caminho 1 | Game Design Geral |
| 70 | 2026-10-18 | na recepcionista o jogo bugou e nao prosseguiu. Volte a versao do github para a versao anterior e vamos fazer os testes nesses ... | Direcao de Arte |
| 71 | 2026-10-18 | boa, funcionou. Pode subir essa versao para producao | Game Design Geral |
| 72 | 2026-10-18 | o Jogo de carta ficou melhor, mas ainda nao esta muito  viciante... Vamos pensar em alguns modelos mais simples? talvez um equi... | Mecanica de Truco |
| 73 | 2026-10-18 | cara é o equivalente a rodada? | Game Design Geral |
| 74 | 2026-10-18 | gostei do estilo truco. Vamos seguir com ele (nao colocar no github até terminarmos). Vamos mudar algumas coisas também: 1. Cri... | Mecanica de Truco |
| 75 | 2026-10-18 | Ok | Game Design Geral |
| 76 | 2026-10-18 | 1. os bonus estao muito apeloes. Vamos nervar. Fundo quant = 1x por boss, quando ativada, voce pode pegar 4 cartas (descarta um... | Mecanica de Truco |
| 77 | 2026-10-18 | ficou melhor ja, alguns pontos: 1. o jogo esta comecando valento 1 tento, mas o primeiro aumento disponivel esta para 6, nao pa... | Mecanica de Truco |
| 78 | 2026-10-18 | outro ponto que notei agora, se eu corro da partida ela vale o tento que eu aceitei na rodada (1, 3, 6, 9, 12) | Mecanica de Truco |
| 79 | 2026-10-18 | gostei bastante da opcao A, vamos seguir com ela. | Game Design Geral |
| 80 | 2026-10-18 | 1. os comentarios da mesa, pode desabilitar (foto1) 2. Faça quem começa a primeira rodada ser aleatorio (depois quem ganhou com... | Mecanica de Truco |
| 81 | 2026-10-18 | o tabuleiro sumiu | Game Design Geral |
| 82 | 2026-10-18 | faça um projeto novo para mim no github, por favor. Inferno S/A - TV | DevOps & Repositorio |
| 83 | 2026-10-18 | Ficou otimo esse projeto que estamos fazendo do modo Truco. Vamos salvar em um projeto diferente no github (nao substituir o in... | Mecanica de Truco |
| 84 | 2026-10-18 | Migre tudo que estiver no caminho C:\Users\Matheus Castro\.gemini para o caminho P:\Users\Matheus Castro\.gemini e defina a par... | DevOps & Repositorio |
| 85 | 2026-10-18 | 1. ao perder, voltar a tela inicial. 2. as bencao e habilidade estao clicando sozinhas quando eu tento subir ou descer a tela d... | Mecanica de Truco |
| 86 | 2026-10-18 | agora cortou a parte de baixo da tela, e acho que personagens nao estao maiores. Com o personagem centralizado, podemos fazer e... | Direcao de Arte |
| 87 | 2026-10-18 | 1. na selecao de cartas benção, tire a definicao das cartas e faça o primeiro click ampliar a carta e luis expplicar o que ela ... | Mecanica de Truco |
| 88 | 2026-10-18 | deu errado | Game Design Geral |
| 89 | 2026-10-18 | No celular esta igual. Os 3 bosses que estao empilhados estao na mesma posicao | Chefes & Camaras |
| 90 | 2026-10-18 | Ele ainda esta cortando um pedaço da tela (pouca coisa). As cartas do roadmap ficaram com o espaco vazio, faca a imagem ocupar ... | Mecanica de Truco |
| 91 | 2026-10-18 | 1. Ficou cortando o finalzinho da tela ainda 2. Na arena ja tem o meu passivo, na parte de cima deixe os passivos dos bosses. R... | Direcao de Arte |
| 92 | 2026-10-18 | No menu superior deixe somente os passivos e habilidades nos chefes (símbolo clicável). | Chefes & Camaras |
| 93 | 2026-10-18 | Resolvida a parte dos poderes. As carras ficaram minusculas e os heroi voltaram a ficar peguenos. Solicitei tambem a geracao de... | Mecanica de Truco |
| 94 | 2026-10-18 | Sobre os cards, use como inspiração. Gere baseado, mas adapte para funcionar (passe pelos agentes) | Game Design Geral |
| 95 | 2026-10-19 | o botao nao esta clicavel | UI/UX & Mobile |
| 96 | 2026-10-19 | as cartas ficaram melhores em 2 versões anteriores: sendo a ultima com os frames (ruim), a penultima pequena (ruim tambem). Vol... | Mecanica de Truco |
| 97 | 2026-10-19 | as cartas ficaram melhores em 2 versões anteriores: sendo a ultima com os frames (ruim), a penultima pequena (ruim tambem). Vol... | Mecanica de Truco |
| 98 | 2026-10-19 | no patrocinio do olimpo todas as explicacoes ainda estao como "como voce nao sabe o que é". Coloque as variacoes | Game Design Geral |
| 99 | 2026-10-19 | Agora ficou otimo! Concluimos momhas ideias. Tem sugestoes de melhorias? | Game Design Geral |
| 100 | 2026-10-19 | Gostei de todas as ideias, execute-as em uma branch para que eu possa testar. Faça no melhor roteiro | DevOps & Repositorio |
| 101 | 2026-10-19 | Pode salvar na branch principal, vou testar por lá | DevOps & Repositorio |
| 102 | 2026-10-19 | 1. Funcionou, faltou exibir a os highlights da carta (quando sao manilhas ou nao) para aceitar ou nao a mão. Pode desligar o te... | Mecanica de Truco |
| 103 | 2026-10-19 | Quando ambos jogarem no mesmo turno, deixe um intervalor aleatorio entre 0 e 2 segundos para dar naturalidade Percebi que os ef... | Reliquias & RPG |
| 104 | 2026-10-19 | Otimo, funcionou | Game Design Geral |
| 105 | 2026-10-19 | Acabei de notar que o passivo do louis que aumentar a probabilidade da carta especial nao esta na barra de passivos | Mecanica de Truco |
| 106 | 2026-10-19 | O botão ler hq nao esta funcionando e o prologo esta cortando | Narrativa & HQ |
| 107 | 2026-10-19 | O botao ler prologo ainda nao funciona | Narrativa & HQ |
| 108 | 2026-10-21 | vamoscriar um projeto e salvar toda essa conversa, sheet master e tudo relacionado a esse jogo como projeto inferno TM | DevOps & Repositorio |

---

## Conclusao da Trajetoria
O Projeto Inferno TM representa a transformacao bem-sucedida de um conceito criativo ousado em um jogo completo, polido, mobile-first e totalmente funcional na web. A uniao da sátira corporativa da Faria Lima com a mitologia grega sob as regras consagradas do Truco Paulista produziu uma experiencia unica e altamente envolvente.
