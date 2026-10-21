# Inferno S/A: Truco Mode (TM) — O Takeover de Louis Beznoir

Um jogo de cartas e estratégia roguelite mobile-first no estilo clássico de **Truco Paulista** com estética inspirada em *Hades* (Supergiant Games / Jen Zee), acompanhando a jornada de **Louis Beznoir IV** — herdeiro e executivo do mercado financeiro que, após um incidente de compliance gastronômico na Riviera Francesa, decide realizar um **Takeover Hostil** da corporação **Inferno S/A** no Submundo.

---

## Jogue Agora
- **[Jogar Inferno S/A - Truco Mode Online (GitHub Pages)](https://matheushscastro-ai.github.io/inferno-sa-tm/)**

---

## Documentação Mestra do Projeto (Master Docs)
Toda a especificação de design, regras, histórico e arquitetura está detalhada na pasta [`docs/`](docs/):

1. **[Sheet Master — Game Design Document & Master Systems](docs/SHEET_MASTER_INFERNO_TM.md)**
   - Lore completa e biografia de Louis Beznoir IV.
   - Regras oficiais do Truco Paulista (Vira, Manilhas, Naipes, Pontuação até 12 Tentos).
   - Regras avançadas: Mão de 11, Mão de Ferro, física de feltro e intervalo natural.
   - Banco completo de Relíquias Financeiras, Bênçãos do Olimpo e Teses de Investimento.
   - Bestiário dos 5 Chefes de Câmara e Bíblia de Diálogos Satíricos.
2. **[Histórico de Evolução & Registro da Conversa](docs/HISTORICO_EVOLUCAO_PROJETO.md)**
   - Resumo das 6 Fases do projeto, desde o protótipo inicial até o polimento do Truco Mode.
   - Tabela cronológica completa de todas as 108 solicitações do usuário e entregáveis.
3. **[Guia de Operação e Desenvolvimento](docs/GUIA_DO_PROJETO_INFERNO_TM.md)**
   - Como rodar localmente, arquitetura de software, pipeline de toque mobile e convenções de código.
4. **[Log Bruto da Conversa](docs/conversa_transcript.jsonl)**
   - Registro bruto integral em JSONL contendo toda a trajetória da conversa.

---

## Regras Centrais do Modo Truco (TM)
- **Baralho Clássico Completo**: Cartas temáticas de 4 a 3 (4, 5, 6, 7, Q, J, K, A, 2, 3) nos quatro naipes gregos/submundo, com ilustrações exclusivas no traço de Hades para as Letras (**A**, **J**, **Q**, **K** e a carta especial de Louis).
- **Mecânica Paulista de Vira e Manilha**: A cada rodada, uma carta é virada na mesa (*Vira*). A manilha é sempre a carta de número/letra seguinte, obedecendo a hierarquia clássica de naipes: **Paus (Zap) > Copas (Copeta) > Espadas (Espadilha) > Ouros (Pica-Fumo)**.
- **Melhor de 3 Partidas por Rodada**: Cada rodada consiste em até 3 vazas. A mão inicial tem 3 cartas.
- **Escalada de Aposta (Truco)**: Disputas iniciam valendo 1 ponto e escalam progressivamente: **3 -> 6 -> 9 -> 12 tentos**. O jogador que pede aumento passa a vez de trucar para o oponente.
- **Mão de 11 e Mão de Ferro**: Regras estritas ao atingir 11 tentos (análise prévia com highlights de manilha ou disputa cega no 11x11).
- **Partida até 12 Tentos**: O primeiro a atingir 12 tentos (Louis ou o Chefe) conquista o contrato da Câmara.
- **Teses de Operação (Arquétipos Financeiros)**:
  - **Fundo Quantitativo (HFT)**: Compra 4 cartas e descarta 1 no início, ou ativa regra de carta ímpar vencedora.
  - **Private Equity Hostil**: Aumenta o poder da sua carta em +2 ou reduz o poder da carta do chefe em -2.
  - **Holding Blindada (Hedge)**: Vence todos os empates de vaza e ativa regra de carta par vencedora.
- **Bênçãos & Relíquias Passivas**: Itens negociados com os Deuses do Olimpo entre as câmaras para amplificar recursos e vantagens táticas.

---

## Como Executar Localmente
```bash
# Iniciar o servidor HTTP local na raiz do projeto:
python server.py

# Acesse no navegador:
# http://localhost:8080
```
