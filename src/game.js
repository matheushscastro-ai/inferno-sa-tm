// ============================================================================
// INFERNO S/A: O Takeover de Louis Beznoir (Edição TRUCO DE WALL STREET)
// ============================================================================
import { sfx } from './audio.js';

// 1. BANCO DE CARTAS (Hierarquia de Força do Truco 2 a 14 + Efeitos Táticos + Fusões ZAP)

export const CARD_DATABASE = {
  // CARTAS DE BASE DE LOUIS (FORÇA 5 A 9)
  corte_custos: {
    id: 'corte_custos',
    name: 'Estocada Ágil',
    type: 'action',
    cost: 5,
    trucoPower: 5,
    icon: 'assets/ui/icon_sword.svg',
    image: 'assets/cards/card_estocada_precisa.png',
    desc: 'FORÇA 5 • Golpe rápido: causa +4 de Dano Direto imediato ao bater na mesa.',
    damage: 4,
    shield: 0,
    flavor: 'Velocidade e pontaria na abertura da rodada.'
  },
  blefe_mercado: {
    id: 'blefe_mercado',
    name: 'Finta de Blefe',
    type: 'action',
    cost: 6,
    trucoPower: 6,
    icon: 'assets/ui/icon_shield.svg',
    image: 'assets/cards/card_toque_aristocratico.png',
    desc: 'FORÇA 6 • +8 Escudo e intimida o Chefe (+30% chance dele CORRER do seu Truco!).',
    damage: 0,
    shield: 8,
    bluffBoost: true,
    flavor: 'A arte clássica de blefar rindo da cara do adversário.'
  },
  discurso_impacto: {
    id: 'discurso_impacto',
    name: 'Retórica Nobre',
    type: 'action',
    cost: 7,
    trucoPower: 7,
    icon: 'assets/ui/status_confusao.svg',
    image: 'assets/cards/card_retorica_duelo.png',
    desc: 'FORÇA 7 • Sabotagem: reduz a Força da carta do Chefe em -3 nesta rodada!',
    damage: 3,
    shield: 0,
    weakenEnemyCard: 3,
    applyStatus: { type: 'daze', duration: 2, icon: 'assets/ui/status_confusao.svg', name: 'Confusão' },
    flavor: 'Uma oratória tão arrogante que desmonta a mão do oponente.'
  },
  liminar_judicial: {
    id: 'liminar_judicial',
    name: 'Liminar Arcana',
    type: 'action',
    cost: 7,
    trucoPower: 7,
    icon: 'assets/ui/icon_scroll.svg',
    image: 'assets/cards/card_liminar_arcana.png',
    desc: 'FORÇA 7 • Gera +10 de Escudo (protege seu HP se perder a mão ou correr).',
    damage: 0,
    shield: 10,
    flavor: 'Minha família tem imunidade em qualquer jurisdição.'
  },
  toque_aristocratico: {
    id: 'toque_aristocratico',
    name: 'Toque Nobre',
    type: 'action',
    cost: 8,
    trucoPower: 8,
    icon: 'assets/ui/icon_spark.svg',
    image: 'assets/cards/card_toque_aristocratico.png',
    desc: 'FORÇA 8 • Carta firme de rodada! Causa +6 de Dano Direto imediato.',
    damage: 6,
    shield: 0,
    flavor: 'A nobreza não perde rodada para amadores.'
  },
  acao_indenizatoria: {
    id: 'acao_indenizatoria',
    name: 'Contragolpe',
    type: 'action',
    cost: 9,
    trucoPower: 9,
    icon: 'assets/ui/icon_scales.svg',
    image: 'assets/cards/card_estocada_precisa.png',
    desc: 'FORÇA 9 (Três) • Vira FORÇA 13 (Manilha!) se o Chefe venceu uma rodada nesta mão!',
    damage: 5,
    isRetaliation: true,
    shield: 0,
    flavor: 'Perdeu a primeira rodada? Crave a virada na segunda!'
  },

  // BÊNÇÃOS DOS DEUSES & MANILHAS DO MERCADO (FORÇA 10 A 13)
  blindagem_olimpica: {
    id: 'blindagem_olimpica',
    name: 'Hedge de Hefesto',
    type: 'blessing',
    element: 'fire',
    vfxType: 'fire',
    cost: 10,
    trucoPower: 10,
    icon: 'assets/ui/icon_shield.svg',
    image: 'assets/cards/card_chamas_hefesto.png',
    desc: 'FORÇA 10 (Ás) • Gera +12 de Escudo e aplica 3 de Queimadura no Chefe.',
    damage: 0,
    shield: 12,
    applyStatus: { type: 'burn', stacks: 3, icon: 'assets/ui/status_fogo.svg', name: 'Queimadura' },
    flavor: 'Proteção patrimonial forjada no fogo.'
  },
  bencao_velocidade: {
    id: 'bencao_velocidade',
    name: 'Asas de Hermes',
    type: 'blessing',
    element: 'speed',
    cost: 11,
    trucoPower: 11,
    isManilha: true,
    icon: 'assets/ui/icon_wing.svg',
    image: 'assets/cards/card_bencao_velocidade.png',
    desc: 'MANILHA 11 (Ouros) • Compra +1 Carta extra para sua mão e causa +4 Dano!',
    damage: 4,
    shield: 0,
    drawCards: 1,
    flavor: 'Manilha veloz que renova suas opções na mesa.'
  },
  bencao_fogo: {
    id: 'bencao_fogo',
    name: 'Fogo de Hefesto',
    type: 'blessing',
    element: 'fire',
    vfxType: 'fire',
    cost: 11,
    trucoPower: 11,
    isManilha: true,
    icon: 'assets/ui/status_fogo.svg',
    image: 'assets/cards/card_chamas_hefesto.png',
    desc: 'MANILHA 11 (Ouros) • Causa +5 Dano e aplica 5 de Queimadura contínua.',
    damage: 5,
    shield: 0,
    applyStatus: { type: 'burn', stacks: 5, icon: 'assets/ui/status_fogo.svg', name: 'Queimadura' },
    flavor: 'Fogo refinado das forjas divinas.'
  },
  alavancagem_divina: {
    id: 'alavancagem_divina',
    name: 'Dividendos de Zeus',
    type: 'blessing',
    element: 'lightning',
    vfxType: 'lightning',
    cost: 12,
    trucoPower: 12,
    isManilha: true,
    icon: 'assets/ui/icon_dracma.svg',
    image: 'assets/cards/card_bencao_raio.png?v=29',
    desc: 'MANILHA 12 (Espadilha) • Causa +6 Dano e paga +15 Dracmas na hora!',
    damage: 6,
    shield: 0,
    gainGold: 15,
    applyStatus: { type: 'shock', stacks: 2, icon: 'assets/ui/status_raio.svg', name: 'Choque' },
    flavor: 'Liquidez imediata com garantia olímpica.'
  },
  bencao_raio: {
    id: 'bencao_raio',
    name: 'Raio de Zeus',
    type: 'blessing',
    element: 'lightning',
    vfxType: 'lightning',
    cost: 12,
    trucoPower: 12,
    isManilha: true,
    icon: 'assets/ui/status_raio.svg',
    image: 'assets/cards/card_bencao_raio.png?v=29',
    desc: 'MANILHA 12 (Espadilha) • Causa +6 Dano e sobe a Aposta da Mão em +8 Dano!',
    damage: 6,
    shield: 0,
    potBoost: 8,
    applyStatus: { type: 'shock', stacks: 2, icon: 'assets/ui/status_raio.svg', name: 'Choque' },
    flavor: 'A aprovação reluzente do Olimpo.'
  },
  bencao_guerra: {
    id: 'bencao_guerra',
    name: 'Fúria de Ares',
    type: 'blessing',
    element: 'blood',
    vfxType: 'blood',
    cost: 13,
    trucoPower: 13,
    isManilha: true,
    icon: 'assets/ui/status_sangria.svg',
    image: 'assets/cards/card_bencao_guerra.png?v=29',
    desc: 'MANILHA 13 (Copas) • Só perde pro ZAP! Causa +8 Dano e 4 Sangramento!',
    damage: 8,
    shield: 0,
    applyStatus: { type: 'bleed', stacks: 4, icon: 'assets/ui/status_sangria.svg', name: 'Sangramento' },
    flavor: 'Agressividade pura para esmagar qualquer mesa.'
  },

  // CARTA DE BUROCRACIA / SUJEIRA DE MÃO (INSERIDA PELOS CHEFES)
  protocolo_pendente: {
    id: 'protocolo_pendente',
    name: 'Formulário 9.999',
    type: 'curse',
    cost: 2,
    trucoPower: 2,
    icon: 'assets/ui/icon_scroll.svg',
    image: 'assets/cards/card_liminar_arcana.png',
    desc: 'FORÇA 2 (Sujeira!) • Perde rodada fácil! Jogue para incinerar ou vença no BLEFE gritando TRUCO!',
    damage: 0,
    shield: 0,
    exhaust: true,
    flavor: 'Faltou carimbo na terceira via autenticada.'
  }
};

// RECEITAS DE FUSÃO M&A — TODA CARTA FUNDIDA É UM "ZAP" (FORÇA 14 IMBATÍVEL!)
export const FUSION_RECIPES = {
  'toque_aristocratico+bencao_fogo': {
    id: 'combustao_gourmet',
    name: 'ZAP: Chama de Hefesto',
    type: 'fused',
    vfxType: 'fire',
    cost: 14,
    trucoPower: 14,
    isManilha: true,
    icon: 'assets/ui/status_fogo.svg',
    image: 'assets/cards/card_combustao_gourmet.png',
    desc: 'ZAP FORÇA 14 (Imbatível na Rodada!) • Causa +10 Dano de fogo e 5 Queimadura!',
    damage: 10,
    shield: 0,
    applyStatus: { type: 'burn', stacks: 5, icon: 'assets/ui/status_fogo.svg', name: 'Queimadura' },
    catchphrase: 'ZAP NA TESTA! Flawless blend!'
  },
  'toque_aristocratico+bencao_raio': {
    id: 'estalo_trovejante',
    name: 'ZAP: Estalo de Zeus',
    type: 'fused',
    vfxType: 'lightning',
    cost: 14,
    trucoPower: 14,
    isManilha: true,
    icon: 'assets/ui/status_raio.svg',
    image: 'assets/cards/card_estalo_zeus.png',
    desc: 'ZAP FORÇA 14 (Imbatível na Rodada!) • Causa +10 Dano e sobe a Mão em +10!',
    damage: 10,
    shield: 0,
    potBoost: 10,
    applyStatus: { type: 'shock', stacks: 3, icon: 'assets/ui/status_raio.svg', name: 'Choque' },
    catchphrase: 'ZAP DE ZEUS NA MESA! Flawless!'
  },
  'toque_aristocratico+bencao_guerra': {
    id: 'bravata_imperial',
    name: 'ZAP: Golpe de Ares',
    type: 'fused',
    vfxType: 'blood',
    cost: 14,
    trucoPower: 14,
    isManilha: true,
    icon: 'assets/ui/status_sangria.svg',
    image: 'assets/cards/card_bencao_guerra.png?v=29',
    desc: 'ZAP FORÇA 14 (Imbatível na Rodada!) • Causa +12 Dano crítico e 5 Sangramento!',
    damage: 12,
    shield: 0,
    applyStatus: { type: 'bleed', stacks: 5, icon: 'assets/ui/status_sangria.svg', name: 'Sangramento' },
    catchphrase: 'ZAP IMPERIAL! Engole essa, submundo!'
  },
  'liminar_judicial+bencao_raio': {
    id: 'clausula_eletrizante',
    name: 'ZAP: Égide de Zeus',
    type: 'fused',
    vfxType: 'lightning',
    cost: 14,
    trucoPower: 14,
    isManilha: true,
    icon: 'assets/ui/status_raio.svg',
    image: 'assets/cards/card_estalo_zeus.png',
    desc: 'ZAP FORÇA 14 (Imbatível!) • Gera +14 de Escudo e causa +8 Dano!',
    damage: 8,
    shield: 14,
    applyStatus: { type: 'shock', stacks: 2, icon: 'assets/ui/status_raio.svg', name: 'Choque' },
    catchphrase: 'ZAP BLINDADO! Flawless!'
  },
  'corte_custos+bencao_velocidade': {
    id: 'layoff_relampago',
    name: 'ZAP: Estocada Alada',
    type: 'fused',
    cost: 14,
    trucoPower: 14,
    isManilha: true,
    icon: 'assets/ui/icon_wing.svg',
    image: 'assets/cards/card_bencao_velocidade.png',
    desc: 'ZAP FORÇA 14 (Imbatível!) • Causa +9 Dano e compra +1 Carta extra!',
    damage: 9,
    shield: 0,
    drawCards: 1,
    catchphrase: 'ZAP HFT NA MESA!'
  },
  'acao_indenizatoria+bencao_guerra': {
    id: 'litigio_sangrento',
    name: 'ZAP: Vingança de Ares',
    type: 'fused',
    vfxType: 'blood',
    cost: 14,
    trucoPower: 14,
    isManilha: true,
    icon: 'assets/ui/status_sangria.svg',
    image: 'assets/cards/card_bencao_guerra.png?v=29',
    desc: 'ZAP FORÇA 14 (Imbatível!) • Causa +12 Dano e aplica 5 de Sangramento!',
    damage: 12,
    isRetaliation: true,
    shield: 0,
    applyStatus: { type: 'bleed', stacks: 5, icon: 'assets/ui/status_sangria.svg', name: 'Sangramento' },
    catchphrase: 'ZAP EXECUTIVO! Sem recurso!'
  }
};

// SINTETIZADOR UNIVERSAL DE FUSÃO (Qualquer Ação + Bênção vira um ZAP Força 14!)
export function resolveCardDefinition(cardKey) {
  if (!cardKey) return null;
  if (CARD_DATABASE[cardKey]) return CARD_DATABASE[cardKey];
  if (FUSION_RECIPES[cardKey]) return FUSION_RECIPES[cardKey];

  if (cardKey.includes('+')) {
    const [k1, k2] = cardKey.split('+');
    const revKey = `${k2}+${k1}`;
    if (FUSION_RECIPES[revKey]) return FUSION_RECIPES[revKey];

    const c1 = CARD_DATABASE[k1];
    const c2 = CARD_DATABASE[k2];
    if (c1 && c2 && c1.type !== 'curse' && c2.type !== 'curse') {
      const blessing = c1.type === 'blessing' ? c1 : c2;
      const other = c1.type === 'blessing' ? c2 : c1;
      const dmg = Math.max(8, (c1.damage || 0) + (c2.damage || 0) + 3);
      const shd = (c1.shield || 0) + (c2.shield || 0);
      const draw = (c1.drawCards || 0) + (c2.drawCards || 0);
      const status = blessing.applyStatus || other.applyStatus;

      const parts = ['ZAP FORÇA 14 (Imbatível!)'];
      if (dmg > 0) parts.push(`+${dmg} Dano`);
      if (shd > 0) parts.push(`+${shd} Escudo`);
      if (status) parts.push(`+${status.stacks || status.duration} ${status.name}`);

      const dynamicRecipe = {
        id: cardKey,
        name: `ZAP: ${other.name.split(' ')[0]} Supremo`,
        type: 'fused',
        vfxType: blessing.vfxType || other.vfxType || 'lightning',
        cost: 14,
        trucoPower: 14,
        isManilha: true,
        icon: blessing.icon || other.icon,
        image: blessing.image || other.image,
        desc: parts.join(' • '),
        damage: dmg,
        shield: shd,
        drawCards: draw,
        isRetaliation: c1.isRetaliation || c2.isRetaliation,
        applyStatus: status,
        catchphrase: 'ZAP M&A NA MESA! Imbatível!'
      };
      FUSION_RECIPES[cardKey] = dynamicRecipe;
      return dynamicRecipe;
    }
  }
  return null;
}

// BANCO DE RELÍQUIAS / ATIVOS DO MERCADO FINANCEIRO (PASSIVAS DE TRUCO)
export const RELIC_DATABASE = {
  algoritmo_hermes: {
    id: 'algoritmo_hermes',
    name: 'Algoritmo HFT',
    art: 'assets/ui/archetype_quant.png',
    desc: 'Tese Quant: 1x por boss compre 4 cartas (descarta 1 no início); 1x por boss carta ímpar vence!'
  },
  alavancagem_ares: {
    id: 'alavancagem_ares',
    name: 'Alavancagem Hostil',
    art: 'assets/ui/archetype_pe.png',
    desc: 'Private Equity: 1x por boss sua carta ganha +2 de poder; 1x por boss carta do chefe perde 2!'
  },
  blindagem_patrimonial: {
    id: 'blindagem_patrimonial',
    name: 'Holding Blindada',
    art: 'assets/ui/archetype_hedge.png',
    desc: 'Hedge Fund: Passiva: você vence todos os empates (cangas); 1x por boss carta par vence!'
  },
  patek_olimpico: {
    id: 'patek_olimpico',
    name: 'Patek dos Deuses',
    art: 'assets/ui/relic_patek.png',
    cost: 70,
    desc: 'Sinal de Status: Na 1ª rodada de toda mão, sua carta ganha +1 nível de força na mesa!'
  },
  cartao_centurion: {
    id: 'cartao_centurion',
    name: 'Amex Obsidiana',
    art: 'assets/ui/relic_centurion.png',
    cost: 65,
    desc: 'Rei do Blefe: Ganha +25 Dracmas sempre que o Chefe correr do seu Truco!'
  },
  insider_trading: {
    id: 'insider_trading',
    name: 'Insider Trading',
    art: 'assets/ui/icon_wing.svg',
    cost: 80,
    desc: 'Espionagem Executiva: Na 2ª partida de cada rodada, a carta do Chefe é jogada aberta na mesa!'
  },
  trituradora_vip: {
    id: 'trituradora_vip',
    name: 'Compliance VIP',
    art: 'assets/ui/relic_compliance.png',
    cost: 75,
    desc: 'Blindagem Jurídica: Bloqueia 1 habilidade especial do Chefe no duelo e intimida-o a correr do Truco!'
  },
  safra_1800: {
    id: 'safra_1800',
    name: 'Bordeaux 1800',
    art: 'assets/ui/relic_bordeaux.png',
    cost: 70,
    desc: 'Reserva Exclusiva: Começa cada duelo contra Chefe já com +2 Tentos de vantagem no placar!'
  },
  fusao_perpetua: {
    id: 'fusao_perpetua',
    name: 'Contrato M&A',
    art: 'assets/ui/relic_contract.png',
    cost: 90,
    desc: 'Pacto Perpétuo: Garante que a Carta Especial de Louis (★ Beznoir) venha na sua mão em TODAS as rodadas iniciais!'
  },
  fundo_soberano: {
    id: 'fundo_soberano',
    name: 'Fundo Soberano',
    art: 'assets/ui/icon_scales.svg',
    cost: 60,
    desc: 'Liquidez Superior: Ao vencer a rodada sem perder partidas (2x0), fatura +20 Dracmas imediatos!'
  }
};

// BANCO DE CARTAS DE BÊNÇÃO (TRAPAÇAS OLÍMPICAS QUE INTERFEREM NAS REGRAS DA RODADA)
export const OLYMPIC_BLESSINGS_DB = {
  troca_manilha: {
    id: 'troca_manilha',
    name: 'Trocar Manilha',
    god: 'Hermes',
    icon: 'assets/ui/icon_wing.svg',
    image: 'assets/cards/card_bencao_velocidade.png',
    shortLabel: 'Trocar Manilha',
    desc: 'Vira uma nova carta no baralho da mesa imediatamente, mudando a MANILHA da rodada!'
  },
  menor_vence: {
    id: 'menor_vence',
    name: 'Menor Carta Vence',
    god: 'Dionísio',
    icon: 'assets/ui/icon_dice.svg',
    image: 'assets/cards/card_retorica_duelo.png',
    shortLabel: 'Menor Vence',
    desc: 'Inverte a regra nesta rodada: ganha a rodada quem jogar a carta MAIS FRACA (menor valor)!'
  },
  inimigo_impar: {
    id: 'inimigo_impar',
    name: 'Inimigo Ímpar Perde',
    god: 'Zeus',
    icon: 'assets/ui/status_raio.svg',
    image: 'assets/cards/card_estalo_zeus.png',
    shortLabel: 'Mata Ímpar',
    desc: 'Ganha a rodada automaticamente se a carta do inimigo for ÍMPAR (3, 5, 7, A, J, K)!'
  },
  aumento_poder: {
    id: 'aumento_poder',
    name: '+4 Poder na Carta',
    god: 'Hefesto',
    icon: 'assets/ui/status_fogo.svg',
    image: 'assets/cards/card_combustao_gourmet.png',
    shortLabel: '+4 Poder',
    desc: 'Aumenta o poder da sua carta em +4 posições na hierarquia do Truco nesta rodada!'
  },
  diminuicao_inimigo: {
    id: 'diminuicao_inimigo',
    name: '-4 Poder Inimigo',
    god: 'Ares',
    icon: 'assets/ui/status_sangria.svg',
    image: 'assets/cards/card_bencao_guerra.png?v=29',
    shortLabel: '-4 Inimigo',
    desc: 'Diminui o poder da carta do inimigo em -4 posições na hierarquia nesta rodada!'
  },
  inimigo_par: {
    id: 'inimigo_par',
    name: 'Inimigo Par Perde',
    god: 'Atena',
    icon: 'assets/ui/icon_shield.svg',
    image: 'assets/cards/card_liminar_arcana.png',
    shortLabel: 'Mata Par',
    desc: 'Ganha a rodada automaticamente se a carta do inimigo for PAR (2, 4, 6, Q)!'
  },
  anular_manilha: {
    id: 'anular_manilha',
    name: 'Anular Manilha Inimiga',
    god: 'Poseidon',
    icon: 'assets/ui/icon_scales.svg',
    image: 'assets/cards/card_estocada_precisa.png',
    shortLabel: 'Anula Manilha',
    desc: 'Se o Chefe jogar uma Manilha nesta rodada, ela perde o efeito de Manilha e vira carta comum!'
  },
  roubar_empate: {
    id: 'roubar_empate',
    name: 'Empate +1 Tento',
    god: 'Afrodite',
    icon: 'assets/ui/status_charme.svg',
    image: 'assets/cards/card_toque_aristocratico.png',
    shortLabel: '+1 Tento',
    desc: 'Vence qualquer empate nesta rodada e adiciona +1 Tento extra ao valor da Mão!'
  }
};

// ARQUÉTIPOS INICIAIS (TESES DE INVESTIMENTO NO TRUCO PAULISTA)
export const ARCHETYPES = {
  quant: {
    id: 'quant',
    name: 'Fundo Quantitativo (HFT)',
    art: 'assets/ui/archetype_quant.png',
    subtitle: '1x por Boss: Compra 4 e Descarta 1 • 1x por Boss: Carta Ímpar Vence',
    relic: 'algoritmo_hermes',
    blessings: ['troca_manilha', 'inimigo_impar'],
    deck: ['troca_manilha', 'inimigo_impar']
  },
  private_equity: {
    id: 'private_equity',
    name: 'Private Equity Hostil',
    art: 'assets/ui/archetype_pe.png',
    subtitle: '1x por Boss: Sua Carta +2 Poder • 1x por Boss: Carta do Boss -2',
    relic: 'alavancagem_ares',
    blessings: ['aumento_poder', 'diminuicao_inimigo'],
    deck: ['aumento_poder', 'diminuicao_inimigo']
  },
  hedge_fund: {
    id: 'hedge_fund',
    name: 'Holding Blindada (Hedge)',
    art: 'assets/ui/archetype_hedge.png',
    subtitle: 'Passiva: Vence Todos os Empates • 1x por Boss: Carta Par Vence',
    relic: 'blindagem_patrimonial',
    blessings: ['menor_vence', 'inimigo_par'],
    deck: ['menor_vence', 'inimigo_par']
  }
};

// BARALHO CLÁSSICO TEMÁTICO DE TRUCO PAULISTA (Do 4 ao 3 + Figuras Ilustradas A, J, Q, K)
export const TRUCO_RANKS = ['4', '5', '6', '7', 'Q', 'J', 'K', 'A', '2', '3'];

export const TRUCO_SUITS = [
  { id: 'ouros', name: 'Ouros', svg: 'assets/ui/suit_ouros.svg', isRed: true, suitOrder: 1, manilhaTitle: 'PICA-FUMO' },
  { id: 'espadas', name: 'Espadas', svg: 'assets/ui/suit_espadas.svg', isRed: false, suitOrder: 2, manilhaTitle: 'ESPADILHA' },
  { id: 'copas', name: 'Copas', svg: 'assets/ui/suit_copas.svg', isRed: true, suitOrder: 3, manilhaTitle: 'COPETA' },
  { id: 'paus', name: 'Paus', svg: 'assets/ui/suit_paus.svg', isRed: false, suitOrder: 4, manilhaTitle: 'ZAP' }
];

export const COURT_CARD_ART = {
  'A': 'assets/cards/truco_card_a.png',
  'J': 'assets/cards/truco_card_j.png',
  'Q': 'assets/cards/truco_card_q.png',
  'K': 'assets/cards/truco_card_k.png',
  '★': 'assets/cards/truco_card_louis.png'
};

export function getNextTrucoRank(rank) {
  const idx = TRUCO_RANKS.indexOf(String(rank));
  if (idx === -1) return 'Q';
  return TRUCO_RANKS[(idx + 1) % TRUCO_RANKS.length];
}

export function isRankOdd(rank) {
  const r = String(rank);
  return ['3', '5', '7', 'A', 'J', 'K', '★'].includes(r);
}

export function isRankEven(rank) {
  const r = String(rank);
  return ['2', '4', '6', 'Q'].includes(r);
}

// 2. DIÁLOGOS DE LUIZ BEZNOL (Truco Paulista de Wall Street)
const LUIZ_QUOTES = {
  start: [
    'Embaralha isso direito! Na Faria Lima eu só jogo Truco Paulista valendo 12 tentos.',
    'Olha a Vira na mesa! Três rodadas e sem choro no compliance. Quem dá as cartas?',
    'Pode vir! Se você correr do meu Truco, já vou anotando os tentos!',
    'Preciso fechar esse takeover em 12 tentos antes que meu Bordeaux esquente.'
  ],
  playAction: [
    'Bate essa carta na mesa se tiver patrimônio!',
    'Rodada limpa! Olha o naipe dessa carta!',
    'Você chama essa merda de carta?!',
    'Engole essa posição na mesa!',
    'Corta essa se tiver Manilha!'
  ],
  trucoCall: [
    'TRUCO, Burocrata! Vale 3 Tentos agora!',
    'SEIS NA SUA CARA! Vai encarar 6 Tentos ou vai correr pro RH?!',
    'NOVE! Bota 9 Tentos na roda agora!',
    'DOZE! PARTIDO INTEIRO! Quero a cadeira da presidência nessa mão!'
  ],
  fuse: [
    'Trapaça Olímpica ativada na mesa!'
  ],
  fuseFail: [
    'Jogue uma carta na mesa para resolver a rodada!'
  ],
  hurt: [
    'MEU LINHO EGÍPCIO! Ele tinha Manilha escondida?!',
    'ISSO É INSIDER TRADING! Quero recontagem das cartas!',
    'Roubaram no embaralhamento! Vou acionar a CVM do Tártaro!',
    'Derramou meu vinho de 1800 na mesa de feltro!'
  ],
  win: [
    'Flawless victory! 12 tentos no placar e mais um chefe liquidado!',
    'Outstanding! Mais uma mesa varrida pela Holding Beznoir.'
  ]
};

// BALÕES DE GRITO CÔMICO INSTANTÂNEO
const COMIC_CALLOUTS = {
  attack: [
    'TOMA NA RODADA!',
    'CORTA ESSA!',
    'ZAP NA TESTA!',
    'TRUCO, LADRÃO!',
    'DESCE A CARTA!'
  ],
  hurt: [
    'TINHA MANILHA?!',
    'BARALHO MARCADO!',
    'MEU LINHO EGÍPCIO!',
    'CHAMA A AUDITORIA!',
    'BLEFE MALDITO!'
  ]
};

const ENEMY_COMIC_CALLOUTS = {
  attack: [
    'MINHA RODADA!',
    'ENGOLIU O BLEFE!',
    'MANILHA DO SINDICATO!',
    'CORTA ESSA, PLAYBOY!',
    'TRUCO DE CARIMBO!'
  ],
  hurt: [
    'ERA ZAP?!',
    'ARREGUEI NESSA!',
    'QUE MÃO APELONA!',
    'PERDI OS TENTOS!',
    'CADÊ MEU TRÊS?!'
  ]
};

// 3. CHEFES DO SUBMUNDO
const DUNGEON_ENEMIES = [
  {
    luizName: 'O Estagiário Preguiçoso',
    realName: 'Sombra de Aqueronte',
    avatar: 'assets/ui/icon_skull.svg',
    portrait: 'assets/ui/map_node_1.png?v=30',
    image: 'assets/characters/estagiario_fullbody.png',
    background: 'assets/backgrounds/underworld_arena_ground.jpg',
    bgTitle: 'CÂMARA I: MARGENS DO AQUERONTE',
    bgDesc: 'O primeiro escalão do submundo. Ele tenta parecer focado, mas a ansiedade corporativa é palpável.',
    maxHp: 3,
    hp: 3,
    passiveId: 'corpo_mole',
    passiveIcon: 'assets/ui/icon_shield.svg',
    passiveText: 'Pressão Corporativa: Vacilante sob risco elevado',
    courage: 0.34,
    skillBias: 0.0,
    specialAbility: {
      id: 'atestado_medico',
      name: 'Atestado Médico',
      desc: 'Bate um atestado na mesa e força a partida atual a empatar (cangar)!',
      icon: 'assets/ui/icon_scroll.svg'
    },
    callouts: {
      attack: ['RODADA DO ESTAGIÁRIO!', 'HORA EXTRA NÃO!', 'OLHA A MANILHA!', 'PASSEI SEU BLEFE!'],
      hurt: ['CORRI DESSA MÃO!', 'ERA ZAP?!', 'SALÁRIO MÍNIMO NÃO COBRE ISSO!', 'BURNOUT TOTAL!']
    },
    intents: [
      { type: 'attack', value: 1, icon: 'assets/ui/icon_sword.svg', desc: 'Mão: 1 Tento' }
    ]
  },
  {
    luizName: 'A Recepcionista Histérica',
    realName: 'Fúria Sentinela do Limbo',
    avatar: 'assets/ui/icon_scroll.svg',
    portrait: 'assets/ui/map_node_2.png?v=30',
    image: 'assets/characters/recepcionista_fullbody.png?v=30',
    background: 'assets/backgrounds/underworld_arena_staircase.jpg',
    bgTitle: 'CÂMARA II: CARTÓRIO DO LIMBO',
    bgDesc: 'O guichê executivo de entrada. Atendimento impaciente, com procedimentos burocráticos implacáveis.',
    maxHp: 3,
    hp: 3,
    passiveId: 'burocracia_histerica',
    passiveIcon: 'assets/ui/icon_burst.svg',
    passiveText: 'Burocracia Feroz: Arredia e reativa a provocações',
    courage: 0.48,
    skillBias: 0.12,
    specialAbility: {
      id: 'falta_carimbo',
      name: 'Falta de Carimbo',
      desc: 'Carimba a carta de Louis, reduzindo sua força em -2 pontos!',
      icon: 'assets/ui/icon_scroll.svg'
    },
    callouts: {
      attack: ['TRUCO NO GUICHÊ!', 'SENHA 9.999!', 'FALTOU CARIMBO!', 'MINHA RODADA!'],
      hurt: ['MEU BALCÃO!', 'BLEFE DE RICO!', 'DESACATO NA MESA!', 'SISTEMA CAIU!']
    },
    intents: [
      { type: 'attack', value: 1, icon: 'assets/ui/icon_scroll.svg', desc: 'Mão: 1 Tento' }
    ]
  },
  {
    luizName: 'O Segurança Truculento',
    realName: 'Gárgula de Pedra do Cócito',
    avatar: 'assets/ui/icon_gargoyle.svg',
    portrait: 'assets/ui/map_node_3.png?v=30',
    image: 'assets/characters/gargula_fullbody.png?v=30',
    background: 'assets/backgrounds/underworld_arena_paths.jpg',
    bgTitle: 'CÂMARA III: PORTÕES DO CÓCITO',
    bgDesc: 'A muralha de pedra que controla o fluxo de almas. Firmeza absoluta e olhos pesados sobre a mesa.',
    maxHp: 3,
    hp: 3,
    passiveId: 'pele_granito',
    passiveIcon: 'assets/ui/icon_shield.svg',
    passiveText: 'Postura Inabalável: Firme como rocha diante de bravatas',
    courage: 0.58,
    skillBias: 0.22,
    specialAbility: {
      id: 'bloqueio_catraca',
      name: 'Bloqueio de Catraca',
      desc: 'Endurece sua carta de pedra com impacto pesado, ganhando +2 de força!',
      icon: 'assets/ui/icon_gargoyle.svg'
    },
    callouts: {
      attack: ['ACESSO NEGADO!', 'SEIS NA CATRACA!', 'PEDRA MATA TUDO!', 'FORA DA MESA!'],
      hurt: ['RACHARAM MEU GRANITO!', 'ZAP APELÃO!', 'CÓDIGO VERMELHO!', 'CHAMEM O REFORÇO!']
    },
    intents: [
      { type: 'attack', value: 1, icon: 'assets/ui/icon_sword.svg', desc: 'Mão: 1 Tento' }
    ]
  },
  {
    luizName: 'O Diretor Inflexível',
    realName: 'Rei Minos, o Juiz Supremo',
    avatar: 'assets/ui/icon_scales.svg',
    portrait: 'assets/ui/map_node_4.png?v=31',
    image: 'assets/characters/minos_fullbody.png?v=31',
    background: 'assets/backgrounds/underworld_arena.jpg',
    bgTitle: 'CÂMARA IV: TRIBUNAL DE MINOS',
    bgDesc: 'O tribunal que nunca dorme. Cada jogada é avaliada sob o peso rigoroso de jurisprudências milenares.',
    maxHp: 3,
    hp: 3,
    passiveId: 'juros_mora',
    passiveIcon: 'assets/ui/icon_scales.svg',
    passiveText: 'Rigor Processual: Implacável nos detalhes e desempates',
    courage: 0.65,
    skillBias: 0.30,
    specialAbility: {
      id: 'decisao_monocratica',
      name: 'Decisão Monocrática',
      desc: 'Cassa o recurso da mesa e vence desempates monocraticamente!',
      icon: 'assets/ui/icon_sword.svg'
    },
    callouts: {
      attack: ['TRUCO DE OFÍCIO!', 'RECURSO INDEFERIDO!', 'SENTENÇA NA MESA!', 'DESACATO!'],
      hurt: ['OBJEÇÃO NEGADA!', 'MINHA TOGA IMPERIAL!', 'QUEBRA DE DECORO!', 'ANULEM ESSA MÃO!']
    },
    intents: [
      { type: 'attack', value: 1, icon: 'assets/ui/icon_scales.svg', desc: 'Mão: 1 Tento' }
    ]
  },
  {
    luizName: 'O Lorde e CEO do Submundo',
    realName: 'Hades, o Rei do Tártaro',
    avatar: 'assets/ui/icon_bident.svg',
    portrait: 'assets/ui/map_node_5.png?v=31',
    image: 'assets/characters/hades_fullbody.png?v=31',
    background: 'assets/backgrounds/underworld_arena.jpg',
    bgTitle: 'CÂMARA V: GABINETE EXECUTIVO DE HADES',
    bgDesc: 'A mesa executiva suprema. O CEO da Inferno S/A dita o preço dos ativos e exige liquidez imediata.',
    maxHp: 3,
    hp: 3,
    passiveId: 'monopolio_tartaro',
    passiveIcon: 'assets/ui/status_fogo.svg',
    passiveText: 'Comando Absoluto: Impetuoso e dominante nos momentos decisivos',
    courage: 0.74,
    skillBias: 0.38,
    specialAbility: {
      id: 'liquidacao_forcada',
      name: 'Liquidação Forçada',
      desc: 'Executa uma chamada de margem com fúria executiva no momento crítico!',
      icon: 'assets/ui/icon_bident.svg'
    },
    callouts: {
      attack: ['TRUCO SOBERANO!', 'ESTORNO NEGADO!', 'EU SOU A BANCA!', 'SEIS, GAROTO!'],
      hurt: ['MEU BALANÇO ANUAL!', 'ZAP NO MEU TRONO?!', 'INSOLÊNCIA MORTAL!', 'MEU FUNDO SOBERANO!']
    },
    intents: [
      { type: 'attack', value: 1, icon: 'assets/ui/icon_bident.svg', desc: 'Mão: 1 Tento' }
    ]
  }
];

// ESCADA DE APOSTAS DO TRUCO PAULISTA (1, 3, 6, 9, 12 TENTOS)
// Level 0: 1 Tento (Inicial)  -> Próximo pedido: TRUCO! (3 Tentos)
// Level 1: 3 Tentos           -> Próximo pedido: SEIS! (6 Tentos)
// Level 2: 6 Tentos           -> Próximo pedido: NOVE! (9 Tentos)
// Level 3: 9 Tentos           -> Próximo pedido: DOZE! (12 Tentos)
// Level 4: 12 Tentos          -> Teto Máximo
const TRUCO_STAKES_LADDER = [
  { level: 0, points: 1, name: 'VALE 1 TENTO', raiseCallTitle: 'TRUCO!', raisePoints: 3, raiseCoinSvg: 'assets/ui/coins_truco_3.svg' },
  { level: 1, points: 3, name: 'VALE 3 TENTOS', raiseCallTitle: 'SEIS!', raisePoints: 6, raiseCoinSvg: 'assets/ui/coins_truco_6.svg' },
  { level: 2, points: 6, name: 'VALE 6 TENTOS', raiseCallTitle: 'NOVE!', raisePoints: 9, raiseCoinSvg: 'assets/ui/coins_truco_9.svg' },
  { level: 3, points: 9, name: 'VALE 9 TENTOS', raiseCallTitle: 'DOZE!', raisePoints: 12, raiseCoinSvg: 'assets/ui/coins_truco_12.svg' },
  { level: 4, points: 12, name: 'VALE 12 TENTOS (PARTIDO)', raiseCallTitle: 'MÁXIMO', raisePoints: 12, raiseCoinSvg: 'assets/ui/coins_truco_12.svg' }
];

// 4. ESTADO DO JOGO COM MOTOR DE TRUCO PAULISTA, VIRA/MANILHA E BÊNÇÃOS OLÍMPICAS
class GameState {
  constructor() {
    this.player = {
      name: 'Louis Beznoir IV',
      maxHp: 3,
      hp: 3,
      shield: 0,
      energy: 3,
      maxEnergy: 3,
      gold: 90,
      lastDamageTaken: 0
    };

    this.archetype = 'private_equity';
    this.relics = ['alavancagem_ares'];
    this.blessings = ['aumento_poder', 'diminuicao_inimigo'];
    this.blessingsUsedThisHand = {};
    this.activeRoundBlessing = null;

    // Habilidades 1x por Boss (Nerfadas e Balanceadas)
    this.bossAbilitiesUsed = {
      quantDraw4: false,
      quantOddWins: false,
      peBoostPlayer: false,
      peNerfBoss: false,
      hedgeEvenWins: false
    };
    this.activePartidaBonus = null; // 'quantOddWins', 'peBoostPlayer', 'peNerfBoss', 'hedgeEvenWins'
    this.quantDraw4Pending = false;

    this.turnNumber = 1;
    this.attacksPlayedThisTurn = 0;

    // Placar da Partida de Truco (0 a 12 Tentos)
    this.playerTentos = 0;
    this.enemyTentos = 0;
    this.maxTentos = 12;

    // Estado da Rodada de Truco (Conjunto de 3 Partidas)
    this.vazaResults = [null, null, null];
    this.currentVaza = 0;
    this.trucoLevel = 0;
    this.bonusPot = 0;
    this.lastTrucoCaller = null;

    // Baralho Clássico de 40 Cartas, Vira, Manilha e Cartas na Mesa
    this.tableDeck = [];
    this.viraCard = { rank: '7', suit: TRUCO_SUITS[2] };
    this.manilhaRank = 'Q';
    this.tablePlayedEnemy = null;
    this.tablePlayedPlayer = null;
    this.lastRoundWinner = null;

    this.enemyTrucoHand = [];
    this.currentEnemyCard = null;
    this.enemyPlayedOpen = true;
    this.isResolvingVaza = false;
    this.bluffBoostActive = false;
    this.clashStatusText = 'Jogue uma carta na mesa ou peça TRUCO!';

    this.enemyIndex = 0;
    this.enemy = this.createEnemy(0);

    this.deck = [...this.blessings];
    this.drawPile = [];
    this.discardPile = [];
    this.hand = [];
    
    this.roomNumber = 1;
    this.maxUnlockedRoom = 1;
    this.hasBeatenGame = false;
    this.selectedCardIndex = null;
    this.isDragging = false;
    this.draggedCardIndex = null;
    this.dragHoverCardIndex = null;

    // Métricas de Auditoria para o DRE / Extrato da Holding
    this.stats = {
      vazasWon: 0,
      vazasLost: 0,
      roundsWon: 0,
      roundsLost: 0,
      trucosCalled: 0,
      trucosWon: 0,
      manilhasPlayed: 0,
      bluffsUnmasked: 0,
      goldEarned: 100
    };

    // Mão de 11 e Mão de Ferro
    this.isMaoDeOnze = false;
    this.isMaoDeFerro = false;
  }

  resetBossAbilities() {
    this.bossAbilitiesUsed = {
      quantDraw4: false,
      quantOddWins: false,
      peBoostPlayer: false,
      peNerfBoss: false,
      hedgeEvenWins: false
    };
    this.activePartidaBonus = null;
    this.quantDraw4Pending = false;
  }

  hasRelic(relicId) {
    return this.relics && this.relics.includes(relicId);
  }

  addRelic(relicId) {
    if (!this.hasRelic(relicId) && RELIC_DATABASE[relicId]) {
      this.relics.push(relicId);
      this.updateUI();
    }
  }

  createEnemy(idx) {
    const data = DUNGEON_ENEMIES[Math.min(idx, DUNGEON_ENEMIES.length - 1)];
    return {
      luizName: data.luizName,
      realName: data.realName,
      avatar: data.avatar,
      portrait: data.portrait || null,
      image: data.image || null,
      background: data.background || 'assets/backgrounds/underworld_arena_ground.jpg',
      bgTitle: data.bgTitle || `Círculo I: Sala ${this.roomNumber}`,
      bgDesc: data.bgDesc || 'Um novo desafio no submundo...',
      maxHp: 3,
      hp: 3,
      shield: 0,
      thorns: 0,
      passiveId: data.passiveId || null,
      passiveIcon: data.passiveIcon || 'assets/ui/icon_scroll.svg',
      passiveText: data.passiveText || '',
      courage: data.courage || 0.45,
      skillBias: data.skillBias || 0.1,
      bonusDamage: 0,
      phase2Triggered: false,
      specialAbility: data.specialAbility || null,
      specialAbilityUsed: false,
      callouts: data.callouts || ENEMY_COMIC_CALLOUTS,
      intents: data.intents,
      intent: { ...(data.intents[0] || { type: 'attack', value: 1, icon: 'assets/ui/icon_sword.svg', desc: 'Mão: 1 Tento' }) },
      statuses: {}
    };
  }

  // Gera e embaralha o Baralho Clássico de 40 Cartas (4, 5, 6, 7, Q, J, K, A, 2, 3 nos 4 naipes)
  buildClassicTrucoDeck() {
    const deck = [];
    for (const rank of TRUCO_RANKS) {
      for (const suit of TRUCO_SUITS) {
        deck.push({
          id: `${rank}_${suit.id}`,
          rank,
          suit,
          isSpecialProtagonist: false,
          art: COURT_CARD_ART[rank] || null
        });
      }
    }
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  // Cria a Carta Especial Única do Protagonista (Louis Beznoir IV)
  createProtagonistSpecialCard() {
    return {
      id: 'special_louis_beznoir',
      rank: '★',
      suit: TRUCO_SUITS[3], // Paus (♣)
      isSpecialProtagonist: true,
      name: 'Suborno Real Beznoir',
      art: COURT_CARD_ART['★']
    };
  }

  // Calcula a força hierárquica de uma carta no Truco Paulista considerando a Manilha ativa e Bênçãos
  getPlayingCardStrength(card, isEnemy = false) {
    if (!card) return 0;

    // Carta Especial do Protagonista (★ Beznoir): força altíssima (23.5 — só perde para o ZAP ♣ da Manilha!)
    if (card.isSpecialProtagonist) {
      return 23.5;
    }

    const rankStr = String(card.rank);
    const baseIdx = TRUCO_RANKS.indexOf(rankStr); // 0 (para '4') até 9 (para '3')
    let strength = (baseIdx >= 0 ? baseIdx + 1 : 5); // 1 a 10

    const isManilha = (rankStr === String(this.manilhaRank));

    if (isManilha) {
      const suitOrder = card.suit ? card.suit.suitOrder : 1; // 1 (Ouros) a 4 (Paus/ZAP)
      strength = 20 + suitOrder; // 21 (Ouros), 22 (Espadas), 23 (Copas), 24 (ZAP Paus)
    }

    if (!isEnemy) {
      // Relíquia Alavancagem Hostil: +1 nível em cartas comuns
      if (this.hasRelic('alavancagem_ares') && !isManilha) {
        strength += 1;
      }
      // Patek dos Deuses: +1 nível de força na 1ª partida de cada rodada
      if (this.hasRelic('patek_olimpico') && this.currentVaza === 0) {
        strength += 1;
      }
      // Habilidade Ativa do Arquétipo PE Hostil: +2 números mais forte nesta partida
      if (this.activePartidaBonus === 'peBoostPlayer') {
        strength += 2;
      }
    } else {
      // Habilidade Ativa do Arquétipo PE Hostil: Deixa a carta do chefe 2 números mais fraca nesta partida
      if (this.activePartidaBonus === 'peNerfBoss') {
        strength = Math.max(1, strength - 2);
      }
      // Benefício de Hades (Golden Parachute): +2 de poder quando a aposta vale 6, 9 ou 12
      if (this.enemy && this.enemy.passiveId === 'monopolio_tartaro' && this.trucoLevel >= 2) {
        strength += 2;
      }
      // Benefício do Segurança (Adicional de Periculosidade): +1 de poder em cartas de Espadas
      if (this.enemy && this.enemy.passiveId === 'pele_granito' && card.suit && card.suit.id === 'espadas') {
        strength += 1;
      }
    }

    return strength;
  }

  isCardManilha(card) {
    if (!card) return false;
    return String(card.rank) === String(this.manilhaRank);
  }

  formatCardShortName(card) {
    if (!card) return '?';
    if (card.isSpecialProtagonist) return '★ Cartão Beznoir';
    const suitName = card.suit ? card.suit.name : '';
    if (this.isCardManilha(card)) {
      return `${card.rank} de ${suitName} (${card.suit.manilhaTitle})`;
    }
    return `${card.rank} de ${suitName}`;
  }

  getStakePointsForLevel(level) {
    const idx = Math.max(0, Math.min(level, TRUCO_STAKES_LADDER.length - 1));
    let pts = TRUCO_STAKES_LADDER[idx].points;
    if (level === 0 && this.hasRelic('alavancagem_ares')) {
      pts += 1; // Mão normal vale 2 Tentos com Alavancagem Hostil
    }
    return Math.min(12, pts + (this.bonusPot || 0));
  }

  getCurrentStakeDamage() {
    return this.getStakePointsForLevel(this.trucoLevel);
  }

  getEffectivePlayerCardPower(card) {
    return this.getPlayingCardStrength(card, false);
  }

  init() {
    this.turnNumber = 1;
    this.attacksPlayedThisTurn = 0;
    this.isFusing = false;
    this.isResolvingVaza = false;
    this.hideTrucoChallengeModal();
    this.playerTentos = this.hasRelic('safra_1800') ? 2 : 0;
    this.enemyTentos = 0;
    this.startTurn();
    this.speak(this.getRandomQuote(LUIZ_QUOTES.start));
  }

  openArchetypeModal() {
    const modal = document.getElementById('archetype-modal');
    const container = document.getElementById('archetype-choices');
    if (!modal || !container) return;

    container.innerHTML = '';
    Object.values(ARCHETYPES).forEach(arch => {
      const relic = RELIC_DATABASE[arch.relic];
      const cardEl = document.createElement('div');
      cardEl.className = 'door-card';
      cardEl.innerHTML = `
        <div class="door-icon"><img src="${arch.art}" class="door-art-img" alt="${arch.name}"></div>
        <div class="door-info">
          <strong>${arch.name}</strong>
          <small style="color:#ffd700;display:block;margin-bottom:2px;">${arch.subtitle}</small>
          <small><strong>Ativo Inicial (${relic.name}):</strong> ${relic.desc}</small>
        </div>
      `;
      this.bindSafeTap(cardEl, () => {
        this.selectArchetype(arch.id);
      });
      container.appendChild(cardEl);
    });

    modal.classList.remove('hidden');
  }

  selectArchetype(archId) {
    const arch = ARCHETYPES[archId] || ARCHETYPES.private_equity;
    this.archetype = arch.id;
    this.relics = [arch.relic];
    this.blessings = [...(arch.blessings || ['aumento_poder', 'diminuicao_inimigo'])];
    this.deck = [...this.blessings];
    this.player.gold = arch.id === 'quant' ? 110 : 90;
    this.roomNumber = 1;
    this.enemyIndex = 0;
    this.isVictoryHandled = false;
    this.isVictoryInProgress = false;
    this.isFusing = false;
    this.isResolvingVaza = false;
    this.resetBossAbilities();
    this.enemy = this.createEnemy(0);

    const modal = document.getElementById('archetype-modal');
    if (modal) modal.classList.add('hidden');

    sfx.boonAcquired();
    this.init();
    this.speak(`Tese "${arch.name}" aprovada! Partida até 12 Tentos — olhe a Vira e grite TRUCO!`);
  }

  // Inicia uma Nova RODADA DE TRUCO PAULISTA (Conjunto de 3 Partidas)
  startTurn() {
    if (this.isVictoryHandled || this.isVictoryInProgress) return;

    this.attacksPlayedThisTurn = 0;
    this.isResolvingVaza = false;
    this.hideTrucoChallengeModal();

    // Reseta o placar das 3 Partidas da Rodada
    this.vazaResults = [null, null, null];
    this.currentVaza = 0;
    this.trucoLevel = 0;
    this.bonusPot = 0;
    this.lastTrucoCaller = null;
    this.bluffBoostActive = false;
    this.activeRoundBlessing = null;
    this.activePartidaBonus = null;
    this.blessingsUsedThisHand = {};
    this.tablePlayedEnemy = null;
    this.tablePlayedPlayer = null;
    this.lastRoundWinner = null;
    this.selectedCardIndex = null;

    // 1. Monta e embaralha o Baralho Clássico de 40 Cartas
    this.tableDeck = this.buildClassicTrucoDeck();

    // 2. Vira 1 Carta no centro da mesa e define a MANILHA (carta seguinte na ordem do Truco Paulista)
    this.viraCard = this.tableDeck.pop();
    this.manilhaRank = getNextTrucoRank(this.viraCard.rank);

    // 3. Distribui as Cartas de Louis (3 cartas normais, ou 4 se ativou o bônus quantitativo)
    const wantsQuantDraw4 = this.quantDraw4Pending && !this.bossAbilitiesUsed.quantDraw4;
    if (wantsQuantDraw4) {
      this.bossAbilitiesUsed.quantDraw4 = true;
      this.quantDraw4Pending = false;
    }
    const cardsToDraw = wantsQuantDraw4 ? 4 : 3;
    this.hand = [];
    for (let i = 0; i < cardsToDraw; i++) {
      this.hand.push(this.tableDeck.pop());
    }

    // Passiva do Protagonista: "Sorte de Nascença"
    // Probabilidade estatística de um baralho de truco (1 carta em 40 cartas = 2.5% por carta, 3 cartas = 7.5%)
    // Com a passiva Sorte de Nascença (+40% de probabilidade): (3 / 40) * 1.40 = ~10.5%!
    const baseChance = cardsToDraw / 40;
    const boostedChance = baseChance * 1.40;
    const relicExtra = this.hasRelic('fusao_perpetua') ? 0.08 : 0;
    const includeProtagonistSpecial = Math.random() < (boostedChance + relicExtra);
    if (includeProtagonistSpecial && this.hand.length > 0) {
      this.hand[0] = this.createProtagonistSpecialCard();
    }

    // 4. Distribui as 3 Cartas da mão do Chefe
    this.generateEnemyTrucoHand();

    this.drawPile = this.tableDeck;
    this.discardPile = [];

    // Regra Clássica de Truco Paulista: MÃO DE 11 (ou MÃO DE FERRO se 11 x 11)
    if (this.playerTentos === 11 && this.enemyTentos === 11) {
      this.isMaoDeFerro = true;
      this.isMaoDeOnze = false;
      this.trucoLevel = 1; // Vale 3 tentos automaticamente
      this.speak('Mão de Ferro! 11 a 11 na mesa! Operação no escuro — as cartas serão disputadas às cegas!');
    } else if (this.playerTentos === 11) {
      this.isMaoDeOnze = true;
      this.isMaoDeFerro = false;
      this.trucoLevel = 1; // Vale 3 tentos se aceitar disputar
      setTimeout(() => this.showMaoDeOnzeModal(), 350);
    } else if (this.enemyTentos === 11) {
      this.isMaoDeOnze = true;
      this.isMaoDeFerro = false;
      this.trucoLevel = 1; // Vale 3 tentos se aceitar disputar
      setTimeout(() => this.evaluateEnemyMaoDeOnze(), 350);
    } else {
      this.isMaoDeOnze = false;
      this.isMaoDeFerro = false;
    }

    // Quem começa a 1ª partida da Rodada é 50% aleatório (Louis ou Chefe)!
    this.currentTurnStarter = Math.random() < 0.5 ? 'player' : 'enemy';

    // Prepara a 1ª Partida na mesa
    this.prepareVaza();
    this.updateUI();

    if (wantsQuantDraw4) {
      setTimeout(() => {
        this.openQuantDiscardModal();
      }, 250);
    }
  }

  generateEnemyTrucoHand() {
    const hand = [];
    const bias = (this.enemy.skillBias || 0) + (this.enemy.phase2Triggered ? 0.18 : 0);
    for (let i = 0; i < 3; i++) {
      let card = this.tableDeck.pop();
      // Em câmaras avançadas, o Chefe tem chance de pescar uma carta melhor do monte
      if (Math.random() < bias && this.tableDeck.length > 2) {
        const alt = this.tableDeck.pop();
        if (this.getPlayingCardStrength(alt, true) > this.getPlayingCardStrength(card, true)) {
          this.tableDeck.unshift(card);
          card = alt;
        } else {
          this.tableDeck.unshift(alt);
        }
      }
      hand.push(card);
    }
    this.enemyTrucoHand = hand;
  }

  prepareVaza() {
    if (this.isVictoryHandled || this.isVictoryInProgress) return;

    this.activeRoundBlessing = null;
    this.tablePlayedPlayer = null;
    this.lastRoundWinner = null;
    this.selectedCardIndex = null;

    // Se for a 2ª ou 3ª partida, quem venceu a anterior começa!
    if (this.currentVaza > 0) {
      const prevResult = this.vazaResults[this.currentVaza - 1];
      if (prevResult === 'win') {
        this.currentTurnStarter = 'player';
      } else if (prevResult === 'loss') {
        this.currentTurnStarter = 'enemy';
      }
      // Se foi empate ('tie'), mantém o mesmo que começou a anterior!
    }

    this.currentEnemyCard = this.enemyTrucoHand[0] || this.tableDeck.pop();
    const pwr = this.getPlayingCardStrength(this.currentEnemyCard, true);

    if (this.currentTurnStarter === 'enemy') {
      // Chefe joga primeiro! Carta aberta na mesa
      this.enemyPlayedOpen = true;
      this.tablePlayedEnemy = { ...this.currentEnemyCard, isFaceDown: false };
      this.tablePlayedPlayer = null;
      this.enemy.intent = {
        type: 'attack',
        value: pwr,
        icon: this.isCardManilha(this.currentEnemyCard) ? 'assets/ui/icon_burst.svg' : 'assets/ui/icon_sword.svg',
        desc: `Jogou: ${this.formatCardShortName(this.currentEnemyCard)}`
      };
      this.clashStatusText = `${this.currentVaza + 1}ª PARTIDA: Chefe iniciou e jogou ${this.formatCardShortName(this.currentEnemyCard)}!`;
      setTimeout(() => this.triggerCardSlam('enemy'), 200);
    } else {
      // Louis joga primeiro! O Chefe ainda não jogou carta na mesa (slot vazio ?)
      this.enemyPlayedOpen = false;
      this.tablePlayedEnemy = null;
      this.tablePlayedPlayer = null;
      this.enemy.intent = {
        type: 'attack',
        value: pwr,
        icon: 'assets/ui/icon_dice.svg',
        desc: 'Você joga primeiro!'
      };
      this.clashStatusText = `${this.currentVaza + 1}ª PARTIDA: Sua vez de iniciar! Jogue uma carta na mesa.`;
    }

    this.updateUI();

    // Chance do Chefe pedir TRUCO na 2ª ou 3ª Partida
    if (
      this.currentVaza > 0 &&
      this.trucoLevel < 4 &&
      this.lastTrucoCaller !== 'enemy' &&
      !this.isResolvingVaza
    ) {
      const bossHasStrongCard = pwr >= 9;
      const bossBluffs = Math.random() < 0.24;
      if ((bossHasStrongCard && Math.random() < this.enemy.courage + 0.2) || bossBluffs) {
        setTimeout(() => {
          if (!this.isResolvingVaza && !this.isVictoryHandled && !this.pendingEnemyTrucoLevel) {
            this.triggerEnemyTrucoCall();
          }
        }, 380);
      }
    }
  }


  // =========================================================================
  // HABILIDADES ATIVAS DOS ARQUÉTIPOS (NERFADAS E BALANCEADAS — 1X POR BOSS)
  // =========================================================================

  activateQuantDraw4() {
    if (this.bossAbilitiesUsed.quantDraw4 || this.isResolvingVaza) return;
    this.bossAbilitiesUsed.quantDraw4 = true;
    sfx.playCard();

    // Se estiver na 1ª partida com a mão completa de 3 cartas, compra a 4ª agora e abre o modal de descarte!
    if (this.currentVaza === 0 && this.hand.length === 3 && this.tableDeck && this.tableDeck.length > 0) {
      this.hand.push(this.tableDeck.pop());
      this.openQuantDiscardModal();
    } else {
      // Caso contrário, fica programado para a próxima rodada
      this.quantDraw4Pending = true;
      this.clashStatusText = 'FUNDO QUANT: Na próxima rodada você comprará 4 cartas e descartará 1!';
      this.speak('Algoritmo calibrado! Na próxima rodada teremos 4 opções de compra!');
    }
    this.updateUI();
  }

  openQuantDiscardModal() {
    const modal = document.getElementById('discard-card-modal');
    const grid = document.getElementById('discard-cards-grid');
    if (!modal || !grid) return;

    grid.innerHTML = '';
    this.hand.forEach((card, idx) => {
      const suit = card.suit || TRUCO_SUITS[0];
      const cardEl = document.createElement('div');
      cardEl.className = `discard-card-item ${suit.isRed ? 'suit-red' : 'suit-dark'}`;
      cardEl.innerHTML = this.buildMiniTableCardHTML(card);
      cardEl.onclick = () => {
        this.hand.splice(idx, 1);
        this.discardPile.push(card);
        modal.classList.add('hidden');
        sfx.playCard();
        this.speak(`Descartei o ${card.rank} de ${suit.name}! Fiquei com as 3 posições vencedoras.`);
        this.updateUI();
      };
      grid.appendChild(cardEl);
    });

    modal.classList.remove('hidden');
  }

  activateQuantOddWins() {
    if (this.bossAbilitiesUsed.quantOddWins || this.isResolvingVaza) return;
    this.bossAbilitiesUsed.quantOddWins = true;
    this.activePartidaBonus = 'quantOddWins';
    sfx.swordSlash();
    this.triggerCardCombatVFX({ vfxType: 'lightning' });
    this.clashStatusText = 'ALGORITMO ÍMPAR ATIVO: Carta ÍMPAR vence PAR nesta partida (entre 2 ímpares, a maior vence)!';
    this.speak('Algoritmo de Hermes ativado: nesta partida os números ímpares vencem!');
    this.updateUI();
  }

  activatePEBoostPlayer() {
    if (this.bossAbilitiesUsed.peBoostPlayer || this.isResolvingVaza) return;
    this.bossAbilitiesUsed.peBoostPlayer = true;
    this.activePartidaBonus = 'peBoostPlayer';
    sfx.swordSlash();
    this.triggerCardCombatVFX({ vfxType: 'fire' });
    this.clashStatusText = 'ALAVANCAGEM ATIVA: Sua carta ganha +2 de poder nesta partida!';
    this.speak('Alavancagem hostil na mesa: minha carta sobe 2 patamares!');
    this.updateUI();
  }

  activatePENerfBoss() {
    if (this.bossAbilitiesUsed.peNerfBoss || this.isResolvingVaza) return;
    this.bossAbilitiesUsed.peNerfBoss = true;
    this.activePartidaBonus = 'peNerfBoss';
    sfx.enemyCoffeeSplash();
    this.triggerCardCombatVFX({ vfxType: 'blood' });
    this.clashStatusText = 'HOSTILE TAKEOVER ATIVO: A carta do chefe perde -2 de poder nesta partida!';
    this.speak('Reestruturação forçada: a posição do chefe desaba 2 níveis!');
    this.updateUI();
  }

  activateHedgeEvenWins() {
    if (this.bossAbilitiesUsed.hedgeEvenWins || this.isResolvingVaza) return;
    this.bossAbilitiesUsed.hedgeEvenWins = true;
    this.activePartidaBonus = 'hedgeEvenWins';
    sfx.swordSlash();
    this.triggerCardCombatVFX({ vfxType: 'lightning' });
    this.clashStatusText = 'PARIDADE BLINDADA ATIVA: Carta PAR vence ÍMPAR nesta partida (entre 2 pares, a maior vence)!';
    this.speak('Holding Blindada: paridade absoluta! Os pares vencem a partida!');
    this.updateUI();
  }

  // =========================================================================
  // SISTEMA DE GRITAR TRUCO / SEIS / NOVE / DOZE (VALENDO 3, 6, 9, 12 TENTOS)
  // =========================================================================
  callPlayerTruco() {
    if (
      this.isVictoryHandled ||
      this.isVictoryInProgress ||
      this.isResolvingVaza ||
      this.pendingEnemyTrucoLevel
    ) return;

    if (this.isMaoDeOnze || this.isMaoDeFerro) {
      this.speak('Regra tradicional do Truco Paulista: proibido pedir Truco na Mão de 11! Quem pede perde a mão!');
      return;
    }

    if (this.trucoLevel >= 4) {
      this.speak('A mesa já está valendo DOZE TENTOS (Partido Inteiro)! Jogue sua carta!');
      return;
    }

    // REGRA DE TRUCO: A mesma pessoa NÃO PODE solicitar 2x seguidas!
    if (this.lastTrucoCaller === 'player') {
      this.speak('Você já aumentou a aposta! Aguarde a resposta do Chefe.');
      return;
    }

    const currentTier = TRUCO_STAKES_LADDER[this.trucoLevel];
    const proposedLevel = this.trucoLevel + 1;
    const callTitle = currentTier.raiseCallTitle;
    const proposedPts = currentTier.raisePoints;
    this.lastTrucoCaller = 'player';
    this.selectedCardIndex = null;
    this.stats.trucosCalled++;

    sfx.swordSlash();
    sfx.snobAttack();
    this.playPlayerAttack();

    this.showTrucoCinematicBanner(proposedLevel, true);

    const calloutEl = document.getElementById('player-comic-callout');
    if (calloutEl) {
      calloutEl.textContent = `${callTitle} (VALE ${proposedPts} PTS!)`;
      calloutEl.className = 'comic-callout attack-callout';
      calloutEl.classList.remove('hidden');
    }

    const quoteIdx = Math.min(proposedLevel - 1, LUIZ_QUOTES.trucoCall.length - 1);
    this.speak(LUIZ_QUOTES.trucoCall[quoteIdx]);

    // Benefício da Recepcionista: Triagem Burocrática (30% de chance de barrar o aumento no compliance)
    if (this.enemy && this.enemy.passiveId === 'burocracia_histerica' && Math.random() < 0.30) {
      this.lastTrucoCaller = null;
      const enemyEl = document.getElementById('enemy-sprite');
      this.spawnFloatingText(enemyEl, 'COMPLIANCE BARROU!', '#e74c3c', 'assets/ui/icon_scroll.svg');
      this.speak('O Compliance da Recepcionista indeferiu seu pedido de Truco! A aposta segue no valor atual!');
      return;
    }

    const enemyCardPwr = this.getPlayingCardStrength(this.currentEnemyCard, true);
    let bossConfidence = (enemyCardPwr - 2) / 14;
    bossConfidence = (bossConfidence * 0.65) + (this.enemy.courage * 0.35);

    // Benefício do Segurança: Imune a correr na 1ª rodada
    if (this.enemy && this.enemy.passiveId === 'pele_granito' && this.currentVaza === 0 && bossConfidence < 0.42) {
      bossConfidence = 0.50;
    }

    if (this.vazaResults[0] === 'win') bossConfidence -= 0.22;
    if (this.vazaResults[0] === 'loss') bossConfidence += 0.18;
    if (this.hasRelic('trituradora_vip')) bossConfidence -= 0.15;

    bossConfidence -= (proposedLevel - 1) * 0.12;
    bossConfidence += (Math.random() * 0.24 - 0.12);

    // 1. CHEFE CORREU DO TRUCO! (Louis ganha os Tentos atuais já aceitos na rodada!)
    if (bossConfidence < 0.42) {
      this.isResolvingVaza = true;
      const earnedPts = this.getCurrentStakeDamage();
      const bluffGold = this.hasRelic('cartao_centurion') ? 20 : 8;
      this.player.gold += bluffGold;

      const enemyEl = document.getElementById('enemy-sprite');
      const playerEl = document.getElementById('player-bust-frame');
      this.spawnFloatingText(enemyEl, 'CORREU DO TRUCO!', '#ffd700', 'assets/ui/icon_scroll.svg');
      this.spawnFloatingText(playerEl, `+${earnedPts} TENTOS!`, '#2ecc71', 'assets/ui/icon_dracma.svg');

      this.clashStatusText = `${this.enemy.luizName} CORREU do seu ${callTitle}! Você ganhou +${earnedPts} Tento${earnedPts > 1 ? 's' : ''}!`;
      this.awardHandTentos('player', earnedPts, true);
      return;
    }

    // 2. CHEFE REVIDA PEDINDO SEIS / NOVE / DOZE!
    if (bossConfidence > 0.78 && proposedLevel < 4) {
      this.trucoLevel = proposedLevel;
      this.updateUI();
      setTimeout(() => {
        this.triggerEnemyTrucoCall(true);
      }, 420);
      return;
    }

    // 3. CHEFE ACEITOU O TRUCO!
    this.trucoLevel = proposedLevel;
    const newPts = this.getCurrentStakeDamage();
    const enemyEl = document.getElementById('enemy-sprite');
    this.playEnemyAttack();
    this.spawnFloatingText(enemyEl, `ACEITOU! VALE ${newPts} PTS!`, '#ff4757', 'assets/ui/icon_burst.svg');
    this.clashStatusText = `CHEFE ACEITOU O ${callTitle}! A Rodada agora vale ${newPts} Tento${newPts > 1 ? 's' : ''}!`;
    this.updateUI();
  }

  triggerEnemyTrucoCall(isCounterRaise = false) {
    if (this.trucoLevel >= 4 || this.isVictoryHandled) return;
    if (this.lastTrucoCaller === 'enemy') return;

    const currentTier = TRUCO_STAKES_LADDER[this.trucoLevel];
    const proposedLevel = this.trucoLevel + 1;
    const callTitle = currentTier.raiseCallTitle;
    const currentPts = this.getCurrentStakeDamage();
    const proposedPts = currentTier.raisePoints;

    this.lastTrucoCaller = 'enemy';
    sfx.enemyCoffeeSplash();
    this.playEnemyAttack();
    this.showTrucoCinematicBanner(proposedLevel, false);

    const modal = document.getElementById('truco-challenge-modal');
    const tagEl = document.getElementById('truco-challenge-tag');
    const titleEl = document.getElementById('truco-challenge-title');
    const quoteEl = document.getElementById('truco-challenge-quote');
    const stakesEl = document.getElementById('truco-challenge-stakes');
    const counterBtn = document.getElementById('btn-truco-counter');
    const counterLabel = document.getElementById('btn-truco-counter-label');
    const foldLabel = document.getElementById('btn-truco-fold-label');

    if (tagEl) tagEl.textContent = isCounterRaise ? 'REVIDE NA MESA!' : 'DESAFIO DE TRUCO!';
    if (titleEl) {
      titleEl.textContent = isCounterRaise
        ? `${this.enemy.luizName.toUpperCase()} REVIDOU COM ${callTitle}!`
        : `${this.enemy.luizName.toUpperCase()} PEDIU ${callTitle}!`;
    }
    if (quoteEl) {
      quoteEl.textContent = isCounterRaise
        ? `"Truco é troco de pinga, playboy! Peço ${callTitle} na sua cara! Vai encarar?!"`
        : `"Quero ver se você tem Manilha mesmo! ${callTitle} na mesa — aceita ou corre?!"`;
    }
    if (stakesEl) {
      stakesEl.innerHTML = `A Mão sobe de <strong>${currentPts} Tento(s)</strong> para <strong>${proposedPts} Tentos</strong>!`;
    }

    if (counterBtn && counterLabel) {
      if (proposedLevel < 4) {
        const nextTier = TRUCO_STAKES_LADDER[proposedLevel];
        counterBtn.style.display = 'flex';
        counterLabel.textContent = `PEDIR ${nextTier.raiseCallTitle} (Vale ${nextTier.raisePoints} Tentos)`;
      } else {
        counterBtn.style.display = 'none';
      }
    }

    if (foldLabel) {
      foldLabel.textContent = `CORRER (Chefe leva só ${currentPts} Tento${currentPts > 1 ? 's' : ''})`;
    }

    this.pendingEnemyTrucoLevel = proposedLevel;
    if (modal) modal.classList.remove('hidden');
  }

  hideTrucoChallengeModal() {
    const modal = document.getElementById('truco-challenge-modal');
    if (modal) modal.classList.add('hidden');
    this.pendingEnemyTrucoLevel = null;
  }

  acceptEnemyTruco() {
    const level = this.pendingEnemyTrucoLevel || Math.min(4, this.trucoLevel + 1);
    this.hideTrucoChallengeModal();
    this.trucoLevel = level;
    sfx.swordSlash();
    const newPts = this.getCurrentStakeDamage();
    this.clashStatusText = `Desafio aceito! A Rodada agora vale ${newPts} Tento${newPts > 1 ? 's' : ''}!`;
    this.speak(`Aceito! Pode descer a carta que a Manilha aqui canta!`);
    this.updateUI();
  }

  counterEnemyTruco() {
    const acceptedLevel = this.pendingEnemyTrucoLevel || Math.min(4, this.trucoLevel + 1);
    this.hideTrucoChallengeModal();
    this.trucoLevel = acceptedLevel;
    this.lastTrucoCaller = 'enemy';
    this.callPlayerTruco();
  }

  foldHand() {
    if (this.isVictoryHandled || this.isVictoryInProgress) return;

    this.hideTrucoChallengeModal();
    this.isResolvingVaza = true;

    // Regra clássica: quem corre entrega o valor que já havia sido aceito na rodada (1, 3, 6, 9 ou 12)
    const surrenderedPts = this.getCurrentStakeDamage();
    this.clashStatusText = `Você correu da mão (Chefe ganhou +${surrenderedPts} Tento${surrenderedPts > 1 ? 's' : ''}).`;
    this.speak('Melhor correr dessa mão podre e entregar o tento aceito do que pagar mais caro!');
    this.awardHandTentos('enemy', surrenderedPts, true);
  }

  // =========================================================================
  // JOGAR CARTA NA MESA (CARTA PERMANECE VISÍVEL NA MESA ATÉ O FIM DA RODADA)
  // =========================================================================
  playCard(index) {
    if (
      this.isVictoryHandled ||
      this.isVictoryInProgress ||
      this.isResolvingVaza ||
      this.pendingEnemyTrucoLevel
    ) return;

    const card = this.hand[index];
    if (!card) return;

    this.isResolvingVaza = true;
    this.selectedCardIndex = null;
    sfx.playCard();

    const playerEl = document.getElementById('player-bust-frame');
    const enemyEl = document.getElementById('enemy-sprite');

    // Remove a carta da mão de Louis e coloca na MESA
    this.hand.splice(index, 1);
    this.tablePlayedPlayer = { ...card, isFaceDown: false };

    let enemyCard = this.currentEnemyCard;
    if (this.currentTurnStarter === 'player') {
      // Louis jogou primeiro! O Chefe escolhe inteligentemente a carta de resposta:
      const playerPower = this.getPlayingCardStrength(card, false);
      let chosenCardIdx = 0;
      let bestWinningIdx = -1;
      let minWinningDiff = 999;
      let lowestCardIdx = 0;
      let minPower = 999;

      this.enemyTrucoHand.forEach((eCard, idx) => {
        const ePwr = this.getPlayingCardStrength(eCard, true);
        if (ePwr < minPower) {
          minPower = ePwr;
          lowestCardIdx = idx;
        }
        if (ePwr >= playerPower) {
          const diff = ePwr - playerPower;
          if (diff < minWinningDiff) {
            minWinningDiff = diff;
            bestWinningIdx = idx;
          }
        }
      });

      chosenCardIdx = bestWinningIdx >= 0 ? bestWinningIdx : lowestCardIdx;
      enemyCard = this.enemyTrucoHand.splice(chosenCardIdx, 1)[0] || enemyCard;
      this.currentEnemyCard = enemyCard;

      // Se o chefe não consegue cobrir a carta e a aposta está alta, dispara tell de nervosismo/blefe
      if (bestWinningIdx < 0 && (this.trucoLevel > 0 || playerPower >= 9)) {
        this.triggerBossTell('bluff');
        this.stats.bluffsUnmasked++;
      }
    } else {
      // O Chefe já havia jogado aberto na mesa! Remove a carta dele da mão
      const idxInHand = this.enemyTrucoHand.findIndex(c => c.rank === enemyCard.rank && (!c.suit || !enemyCard.suit || c.suit.id === enemyCard.suit.id));
      if (idxInHand >= 0) {
        this.enemyTrucoHand.splice(idxInHand, 1);
      }
    }

    this.tablePlayedEnemy = { ...enemyCard, isFaceDown: false };

    // Se jogou a Carta Especial de Louis (Suborno Real Beznoir), ganha +15 Dracmas e dispara efeito visual/fala de Faria Limer!
    if (card.isSpecialProtagonist) {
      this.stats.manilhasPlayed++;
      this.player.gold += 15;
      this.spawnFloatingText(playerEl, '+15 Dracmas VIP', '#ffd700', 'assets/ui/icon_dracma.svg');
      this.triggerCardCombatVFX({ vfxType: 'lightning' });
      this.triggerScreenShake();
      this.triggerHaptic([40, 25, 55]);
      sfx.boonAcquired();
      this.speakArrogant('Suborno Real Beznoir', 'Of course! Todo mundo tem um preço nesta repartição pública! Essa vaza já foi liquidada pela Holding Beznoir!');
    } else if (this.isCardManilha(card)) {
      this.stats.manilhasPlayed++;
      this.triggerCardCombatVFX({ vfxType: 'fire' });
      this.triggerScreenShake();
      this.triggerHaptic([35, 20, 50]);
    }

    if (this.currentTurnStarter === 'player') {
      // 1. Louis jogou primeiro: sua carta vai à mesa imediatamente com card slam
      this.tablePlayedEnemy = null;
      this.clashStatusText = `${this.currentVaza + 1}ª PARTIDA: Você jogou ${this.formatCardShortName(card)}. ${this.enemy.luizName} está avaliando...`;
      this.updateUI();
      this.triggerCardSlam('player');

      // 2. Intervalo aleatório entre 0 e 2 segundos (ex: 500ms a 1800ms) para resposta natural do Chefe
      const thinkInterval = Math.floor(Math.random() * 1300) + 500;

      setTimeout(() => {
        // O Chefe escolhe a melhor carta
        const playerPower = this.getPlayingCardStrength(card, false);
        let chosenCardIdx = 0;
        let bestWinningIdx = -1;
        let minWinningDiff = 999;
        let lowestCardIdx = 0;
        let minPower = 999;

        this.enemyTrucoHand.forEach((eCard, idx) => {
          const ePwr = this.getPlayingCardStrength(eCard, true);
          if (ePwr < minPower) {
            minPower = ePwr;
            lowestCardIdx = idx;
          }
          if (ePwr >= playerPower) {
            const diff = ePwr - playerPower;
            if (diff < minWinningDiff) {
              minWinningDiff = diff;
              bestWinningIdx = idx;
            }
          }
        });

        chosenCardIdx = bestWinningIdx >= 0 ? bestWinningIdx : lowestCardIdx;
        const enemyCard = this.enemyTrucoHand.splice(chosenCardIdx, 1)[0] || this.currentEnemyCard;
        this.currentEnemyCard = enemyCard;
        this.tablePlayedEnemy = { ...enemyCard, isFaceDown: false };

        this.updateUI();
        this.triggerCardSlam('enemy');

        // Resolve o confronto da vaza
        this.resolveVazaCombat(card, enemyCard, playerEl, enemyEl);
      }, thinkInterval);

    } else {
      // Chefe já havia jogado aberto na mesa!
      let enemyCard = this.currentEnemyCard;
      const idxInHand = this.enemyTrucoHand.findIndex(c => c.rank === enemyCard.rank && (!c.suit || !enemyCard.suit || c.suit.id === enemyCard.suit.id));
      if (idxInHand >= 0) {
        this.enemyTrucoHand.splice(idxInHand, 1);
      }
      this.tablePlayedEnemy = { ...enemyCard, isFaceDown: false };

      this.updateUI();
      this.triggerCardSlam('player');

      // Intervalo de suspense natural para a mesa avaliar quem levou a vaza (entre 400ms e 800ms)
      const clashDelay = Math.floor(Math.random() * 400) + 400;
      setTimeout(() => {
        this.resolveVazaCombat(card, enemyCard, playerEl, enemyEl);
      }, clashDelay);
    }
  }

  resolveVazaCombat(card, enemyCard, playerEl, enemyEl) {
    if (!playerEl) playerEl = document.getElementById('player-bust-frame');
    if (!enemyEl) enemyEl = document.getElementById('enemy-sprite');

    // 1. Calcula Força da Carta de Louis vs. Carta do Chefe
    let playerPower = this.getPlayingCardStrength(card, false);
    let enemyPower = this.getPlayingCardStrength(enemyCard, true);

    // Habilidade Especial do Chefe (1x por Duelo):
    let bossSpecialTriggered = false;
    let bossSpecialDesc = '';

    if (this.enemy && this.enemy.specialAbility && !this.enemy.specialAbilityUsed) {
      const bossAbility = this.enemy.specialAbility;

      // Se Louis possui a relíquia Compliance VIP, os advogados barram a habilidade do chefe 1x por duelo!
      if (this.hasRelic('trituradora_vip') && !this.complianceBlockedThisDuel) {
        this.complianceBlockedThisDuel = true;
        this.enemy.specialAbilityUsed = true;
        this.spawnFloatingText(playerEl, 'COMPLIANCE BARRADO!', '#2ecc71', 'assets/ui/relic_compliance.png');
        this.speak('Recurso indeferido pelo Compliance da Holding Beznoir! Segue o jogo normal!');
      } else {
        // Estagiário: "Atestado Médico" (Força empate/canga quando está perdendo)
        if (bossAbility.id === 'atestado_medico' && (this.currentVaza >= 1 || this.vazaResults[0] === 'win')) {
          if (playerPower > enemyPower && Math.random() < 0.70) {
            this.enemy.specialAbilityUsed = true;
            bossSpecialTriggered = true;
            bossSpecialDesc = ' [Atestado Médico: Estagiário Cangou!]';
            this.spawnFloatingText(enemyEl, 'ATESTADO MÉDICO!', '#ffd700', 'assets/ui/icon_scroll.svg');
            sfx.aristocratGasp();
            const calloutEl = document.getElementById('enemy-comic-callout');
            if (calloutEl) {
              calloutEl.textContent = 'ATESTADO MÉDICO! NÃO BATO PONTO HOJE!';
              calloutEl.className = 'comic-callout hurt-callout';
              calloutEl.classList.remove('hidden');
              setTimeout(() => calloutEl.classList.add('hidden'), 2200);
            }
          }
        }
        // Recepcionista: "Falta de Carimbo" (-2 na força da carta de Louis)
        else if (bossAbility.id === 'falta_carimbo' && playerPower >= 6 && Math.random() < 0.65) {
          this.enemy.specialAbilityUsed = true;
          playerPower = Math.max(1, playerPower - 2);
          bossSpecialDesc = ' [Falta de Carimbo: Louis -2 Força!]';
          this.spawnFloatingText(enemyEl, 'FALTA DE CARIMBO!', '#ff4757', 'assets/ui/icon_scroll.svg');
          sfx.enemyCoffeeSplash();
          const calloutEl = document.getElementById('enemy-comic-callout');
          if (calloutEl) {
            calloutEl.textContent = 'FALTOU CARIMBO! SUA CARTA PERDEU 2 DE FORÇA!';
            calloutEl.className = 'comic-callout attack-callout';
            calloutEl.classList.remove('hidden');
            setTimeout(() => calloutEl.classList.add('hidden'), 2200);
          }
        }
        // Segurança: "Bloqueio de Catraca" (+2 na força da carta do Chefe)
        else if (bossAbility.id === 'bloqueio_catraca' && playerPower >= enemyPower && Math.random() < 0.65) {
          this.enemy.specialAbilityUsed = true;
          enemyPower += 2;
          bossSpecialDesc = ' [Bloqueio de Catraca: Chefe +2 Força!]';
          this.spawnFloatingText(enemyEl, 'BLOQUEIO DE CATRACA (+2)!', '#74b9ff', 'assets/ui/icon_gargoyle.svg');
          sfx.swordSlash();
          const calloutEl = document.getElementById('enemy-comic-callout');
          if (calloutEl) {
            calloutEl.textContent = 'ACESSO NEGADO! CATRACA TRAVADA!';
            calloutEl.className = 'comic-callout attack-callout';
            calloutEl.classList.remove('hidden');
            setTimeout(() => calloutEl.classList.add('hidden'), 2200);
          }
        }
        // Hades: "Liquidação Forçada" (+2 no momento decisivo se estiver apostado)
        else if (bossAbility.id === 'liquidacao_forcada' && this.trucoLevel >= 1 && Math.random() < 0.65) {
          this.enemy.specialAbilityUsed = true;
          enemyPower += 2;
          bossSpecialDesc = ' [Liquidação Forçada: Hades +2 Força!]';
          this.spawnFloatingText(enemyEl, 'LIQUIDAÇÃO FORÇADA (+2)!', '#d63031', 'assets/ui/icon_bident.svg');
          sfx.swordSlash();
          const calloutEl = document.getElementById('enemy-comic-callout');
          if (calloutEl) {
            calloutEl.textContent = 'LIQUIDAÇÃO FORÇADA! EU CONTROLO O MERCADO!';
            calloutEl.className = 'comic-callout attack-callout';
            calloutEl.classList.remove('hidden');
            setTimeout(() => calloutEl.classList.add('hidden'), 2200);
          }
        }
      }
    }

    const isPlayerOdd = isRankOdd(card.rank);
    const isEnemyOdd = isRankOdd(enemyCard.rank);
    const isPlayerEven = isRankEven(card.rank);
    const isEnemyEven = isRankEven(enemyCard.rank);

    // 2. Resolução clássica da Partida de Truco Paulista
    let vazaOutcome = 'tie';
    let specialReason = bossSpecialDesc || '';

    if (bossSpecialTriggered && this.enemy && this.enemy.specialAbility && this.enemy.specialAbility.id === 'atestado_medico') {
      vazaOutcome = 'tie';
    } else if (this.activePartidaBonus === 'quantOddWins') {
      if (isPlayerOdd && !isEnemyOdd) {
        vazaOutcome = 'win';
        specialReason = ' [Ímpar Vence!]';
      } else if (!isPlayerOdd && isEnemyOdd) {
        vazaOutcome = 'loss';
        specialReason = ' [Chefe Ímpar Venceu!]';
      } else {
        if (playerPower > enemyPower) vazaOutcome = 'win';
        else if (playerPower < enemyPower) vazaOutcome = 'loss';
        else vazaOutcome = this.hasRelic('blindagem_patrimonial') || this.archetype === 'hedge_fund' ? 'win' : 'tie';
      }
      this.triggerCardCombatVFX({ vfxType: 'lightning' });
    } else if (this.activePartidaBonus === 'hedgeEvenWins') {
      if (isPlayerEven && !isEnemyEven) {
        vazaOutcome = 'win';
        specialReason = ' [Par Vence!]';
      } else if (!isPlayerEven && isEnemyEven) {
        vazaOutcome = 'loss';
        specialReason = ' [Chefe Par Venceu!]';
      } else {
        if (playerPower > enemyPower) vazaOutcome = 'win';
        else if (playerPower < enemyPower) vazaOutcome = 'loss';
        else vazaOutcome = 'win';
      }
      this.triggerCardCombatVFX({ vfxType: 'lightning' });
    } else {
      if (playerPower > enemyPower) {
        vazaOutcome = 'win';
      } else if (playerPower < enemyPower) {
        vazaOutcome = 'loss';
      } else {
        if (this.enemy && this.enemy.specialAbility && this.enemy.specialAbility.id === 'decisao_monocratica' && !this.enemy.specialAbilityUsed) {
          this.enemy.specialAbilityUsed = true;
          vazaOutcome = 'loss';
          specialReason = ' [Decisão Monocrática: Minos Vence Desempate!]';
          this.spawnFloatingText(enemyEl, 'DECISÃO MONOCRÁTICA!', '#e17055', 'assets/ui/icon_scales.svg');
          const calloutEl = document.getElementById('enemy-comic-callout');
          if (calloutEl) {
            calloutEl.textContent = 'RECURSO INDEFERIDO! SENTENÇA MONOCRÁTICA!';
            calloutEl.className = 'comic-callout attack-callout';
            calloutEl.classList.remove('hidden');
            setTimeout(() => calloutEl.classList.add('hidden'), 2200);
          }
        } else if (
          this.archetype === 'hedge_fund' ||
          this.hasRelic('blindagem_patrimonial')
        ) {
          vazaOutcome = 'win';
          specialReason = ' [Holding Blindada: Desempate VIP!]';
        } else {
          vazaOutcome = 'tie';
        }
      }
    }

    this.activePartidaBonus = null;
    this.vazaResults[this.currentVaza] = vazaOutcome;
    this.lastRoundWinner = vazaOutcome;

    const pName = this.formatCardShortName(card);
    const eName = this.formatCardShortName(enemyCard);

    if (vazaOutcome === 'win') {
      this.stats.vazasWon++;
      this.triggerHaptic([30, 20, 50]);
      this.clashStatusText = `${this.currentVaza + 1}ª PARTIDA SUA! ${pName} venceu ${eName}!${specialReason}`;
      this.spawnFloatingText(enemyEl, `PERDEU PARTIDA!`, '#ffd700', 'assets/ui/icon_spark.svg');
      this.playPlayerAttack();
      this.speak(this.getRandomQuote(LUIZ_QUOTES.playAction));
    } else if (vazaOutcome === 'loss') {
      this.stats.vazasLost++;
      this.clashStatusText = `CHEFE LEVOU A ${this.currentVaza + 1}ª PARTIDA! ${eName} bateu ${pName}!${specialReason}`;
      this.spawnFloatingText(playerEl, `Perdeu Partida`, '#ff6b81', 'assets/ui/icon_skull.svg');
      this.playEnemyAttack();
    } else {
      this.clashStatusText = `${this.currentVaza + 1}ª PARTIDA CANCOU (${card.rank} = ${enemyCard.rank})!${specialReason}`;
      this.spawnFloatingText(enemyEl, `CANCOU!`, '#a29bfe', 'assets/ui/icon_scales.svg');
    }

    // Renderiza imediatamente as cartas na mesa e os blocos 1/3, 2/3, 3/3
    this.updateUI();

    // Verifica se a Rodada já foi decidida (Melhor de 2 ou regras clássicas de canga do Truco Paulista)
    const earlyOrFinalWinner = this.checkEarlyOrFinalRodadaWinner();

    if (earlyOrFinalWinner) {
      setTimeout(() => {
        this.resolveTrucoHand(earlyOrFinalWinner);
      }, 1250);
    } else if (this.currentVaza < 2) {
      this.currentVaza++;
      setTimeout(() => {
        this.isResolvingVaza = false;
        this.prepareVaza();
      }, 1250);
    } else {
      const rodadaWinner = this.calculateRodadaWinner();
      setTimeout(() => {
        this.resolveTrucoHand(rodadaWinner);
      }, 1250);
    }
  }

  // Regras autênticas de vitória de Rodada no Truco Paulista:
  // - Melhor de 2: Se vencer 2 seguidas (2-0), acaba na hora!
  // - Se empatar na 1ª partida: quem ganhar a 2ª ganha a rodada imediatamente!
  // - Se empatar na 2ª ou na 3ª partida: quem ganhou a 1ª ganha a rodada imediatamente!
  checkEarlyOrFinalRodadaWinner() {
    const r = this.vazaResults;
    const p1 = r[0];
    const p2 = r[1];
    const p3 = r[2];

    // Se só jogou a 1ª partida, a rodada nunca termina ainda
    if (this.currentVaza === 0) return null;

    // Se acabou de jogar a 2ª partida (currentVaza === 1):
    if (this.currentVaza === 1) {
      // 1. Ganhou 2 seguidas (2-0) -> Fim de rodada imediato!
      if (p1 === 'win' && p2 === 'win') return 'player';
      if (p1 === 'loss' && p2 === 'loss') return 'enemy';

      // 2. Se empatou na primeira partida, quem ganhar a segunda ganha a rodada imediatamente!
      if (p1 === 'tie') {
        if (p2 === 'win') return 'player';
        if (p2 === 'loss') return 'enemy';
        // Se empatou a 1ª E a 2ª, vai para a 3ª partida!
        return null;
      }

      // 3. Se empatar na segunda partida, quem ganhou a primeira ganha a rodada imediatamente!
      if (p2 === 'tie') {
        if (p1 === 'win') return 'player';
        if (p1 === 'loss') return 'enemy';
      }

      // 4. Se 1 a 1 (um ganhou a 1ª e o outro a 2ª), precisa da 3ª partida
      return null;
    }

    // Se acabou de jogar a 3ª partida (currentVaza === 2):
    if (this.currentVaza === 2) {
      // Quem venceu a 3ª partida ganha a rodada
      if (p3 === 'win') return 'player';
      if (p3 === 'loss') return 'enemy';

      // Se empatar na terceira partida: quem ganhou a primeira ganha a rodada!
      if (p3 === 'tie') {
        if (p1 === 'win') return 'player';
        if (p1 === 'loss') return 'enemy';

        // Se a 1ª também foi empate, quem ganhou a 2ª:
        if (p2 === 'win') return 'player';
        if (p2 === 'loss') return 'enemy';

        // Holding Blindada ou Relíquia de desempate
        if (this.archetype === 'hedge_fund' || this.hasRelic('blindagem_patrimonial') || this.hasRelic('trituradora_vip')) {
          return 'player';
        }
        return 'player';
      }
    }

    return null;
  }

  // Regras autênticas de vitória de Rodada no Truco Paulista (Melhor de 3 Partidas + Desempate de Canga)
  calculateRodadaWinner() {
    const r = this.vazaResults;
    const wins = r.filter(x => x === 'win').length;
    const losses = r.filter(x => x === 'loss').length;

    if (wins > losses) return 'player';
    if (losses > wins) return 'enemy';

    // Em caso de empate no número de partidas:
    // Benefício de Minos (Decisão Monocrática): o tribunal julga empates a favor de Minos (a menos que Louis tenha Compliance VIP)
    if (this.enemy && this.enemy.passiveId === 'juros_mora' && !this.hasRelic('trituradora_vip')) {
      return 'enemy';
    }

    // Holding Blindada ou Relíquia de desempate
    if (this.archetype === 'hedge_fund' || this.hasRelic('blindagem_patrimonial') || this.hasRelic('trituradora_vip')) {
      return 'player';
    }

    // Regra clássica de canga do Truco Paulista:
    if (r[0] === 'win') return 'player';
    if (r[0] === 'loss') return 'enemy';

    if (r[1] === 'win') return 'player';
    if (r[1] === 'loss') return 'enemy';

    if (r[2] === 'win') return 'player';
    if (r[2] === 'loss') return 'enemy';

    return 'player';
  }

  resolveTrucoHand(winner) {
    if (this.isVictoryHandled || this.isVictoryInProgress) return;
    const pts = this.getCurrentStakeDamage();
    this.awardHandTentos(winner, pts, false);
  }

  awardHandTentos(winner, pts, wasFold = false) {
    if (this.isVictoryHandled || this.isVictoryInProgress) return;

    const enemyEl = document.getElementById('enemy-sprite');
    const playerEl = document.getElementById('player-bust-frame');

    if (winner === 'player') {
      this.stats.roundsWon++;
      if (this.trucoLevel > 0) this.stats.trucosWon++;
      this.playerTentos = Math.min(this.maxTentos, this.playerTentos + pts);
      sfx.swordSlash();
      sfx.snobAttack();
      this.playPlayerAttack();
      this.playEnemyHurt();

      // Ganho de Dracmas proporcional aos Tentos conquistados!
      const earnedGold = pts * 6;
      this.player.gold += earnedGold;
      this.spawnFloatingText(playerEl, `+${earnedGold} Dracmas`, '#ffd700', 'assets/ui/icon_dracma.svg');

      if (this.hasRelic('fundo_soberano') && this.vazaResults.filter(x => x === 'win').length >= 2 && this.vazaResults.filter(x => x === 'loss').length === 0) {
        this.player.gold += 20;
        this.spawnFloatingText(playerEl, '+20 Dracmas (Fundo Soberano)', '#ffd700', 'assets/ui/icon_scales.svg');
      }

      if (!wasFold) {
        this.clashStatusText = `RODADA SUA! Você ganhou +${pts} Tento(s)! (Placar: ${this.playerTentos} a ${this.enemyTentos})`;
        this.spawnFloatingText(playerEl, `+${pts} TENTO(S)! (${this.playerTentos}/12)`, '#2ecc71', 'assets/ui/icon_dracma.svg');
      }
    } else {
      this.stats.roundsLost++;
      // Benefício do Estagiário: se a 1ª partida empatou e ele venceu a mão disputada (sem o jogador ter corrido), ganha +1 Tento
      if (!wasFold && this.enemy && this.enemy.passiveId === 'corpo_mole' && this.vazaResults[0] === 'tie') {
        pts += 1;
        this.spawnFloatingText(enemyEl, '+1 Tento (Adicional Noturno)', '#f39c12', 'assets/ui/icon_scroll.svg');
      }

      this.enemyTentos = Math.min(this.maxTentos, this.enemyTentos + pts);
      sfx.enemyCoffeeSplash();
      this.playEnemyAttack();
      this.playPlayerHurt();

      if (!wasFold) {
        this.clashStatusText = `RODADA DO CHEFE! Ele ganhou +${pts} Tento(s)! (Placar: ${this.playerTentos} a ${this.enemyTentos})`;
        this.spawnFloatingText(enemyEl, `+${pts} TENTO(S)! (${this.enemyTentos}/12)`, '#ff4757', 'assets/ui/icon_burst.svg');
        sfx.aristocratGasp();
        this.speak(this.getRandomQuote(LUIZ_QUOTES.hurt));
      }
    }

    // Fase 2 de Hades quando chega a 6 Tentos!
    if (this.enemy.passiveId === 'monopolio_tartaro' && !this.enemy.phase2Triggered && this.enemyTentos >= 6) {
      this.enemy.phase2Triggered = true;
      this.enemy.passiveIcon = 'assets/ui/status_fogo.svg';
      this.enemy.passiveText = 'FASE 2: BANCA EM CHAMAS (+Manilhas!)';
      this.spawnFloatingText(enemyEl, 'FASE 2 ATIVADA!', '#ffd700', 'assets/ui/icon_bident.svg');
    }

    this.updateUI();

    // Verifica se alguém atingiu 12 Tentos e fechou a Partida!
    if (this.playerTentos >= this.maxTentos) {
      this.isVictoryHandled = true;
      this.hideTrucoChallengeModal();
      setTimeout(() => {
        this.handleVictory();
      }, 650);
      return;
    }

    if (this.enemyTentos >= this.maxTentos) {
      this.hideTrucoChallengeModal();
      setTimeout(() => {
        this.handleGameOver();
      }, 650);
      return;
    }

    setTimeout(() => {
      this.turnNumber++;
      this.startTurn();
    }, 950);
  }

  endTurn() {
    this.callPlayerTruco();
  }

  triggerCardCombatVFX(card) {
    const station = document.getElementById('enemy-battle-station');
    const arena = document.getElementById('battle-arena');
    if (!station || !arena) return;

    const vfxType = card.vfxType || card.element || (card.applyStatus && card.applyStatus.type);
    if (!vfxType) return;

    const overlay = document.createElement('div');
    overlay.className = 'combat-vfx-overlay';

    let flashClass = '';
    if (vfxType === 'lightning' || vfxType === 'shock') {
      flashClass = 'flash-lightning';
      overlay.innerHTML = `
        <div class="vfx-shockwave-ring"></div>
        <svg class="vfx-zeus-bolt-svg" viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="105,4 42,102 86,106 24,214 124,96 76,90" fill="#ffd700" stroke="#080612" stroke-width="6" stroke-linejoin="round"/>
          <polygon points="98,16 52,98 84,102 38,192 112,100 74,94" fill="#e0ffff"/>
          <polyline points="42,102 12,84 4,104" stroke="#00f2fe" stroke-width="4" stroke-linecap="round"/>
          <polyline points="112,100 144,120 154,108" stroke="#00f2fe" stroke-width="4" stroke-linecap="round"/>
        </svg>
      `;
    } else if (vfxType === 'blood' || vfxType === 'bleed') {
      flashClass = 'flash-blood';
      overlay.innerHTML = `
        <div class="vfx-blood-burst-ring"></div>
        <svg class="vfx-ares-slash-svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18,22 Q100,92 184,180 Q92,108 18,22 Z" fill="#ff1e42" stroke="#0b0408" stroke-width="6"/>
          <path d="M26,28 Q100,96 174,172" stroke="#ffeaa7" stroke-width="4" stroke-linecap="round"/>
          <path d="M182,22 Q100,92 16,180 Q108,108 182,22 Z" fill="#ff1e42" stroke="#0b0408" stroke-width="6"/>
          <path d="M174,28 Q100,96 26,172" stroke="#ffeaa7" stroke-width="4" stroke-linecap="round"/>
          <circle cx="100" cy="100" r="14" fill="#ffd700" stroke="#0b0408" stroke-width="4"/>
          <circle cx="100" cy="100" r="7" fill="#ff1e42"/>
        </svg>
      `;
    } else if (vfxType === 'fire' || vfxType === 'burn') {
      flashClass = 'flash-fire';
      overlay.innerHTML = `
        <svg class="vfx-fire-burst-svg" viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M90,12 C125,65 155,105 135,165 C120,190 60,190 45,165 C25,105 55,65 90,12 Z" fill="#ff4500" stroke="#0b0408" stroke-width="6"/>
          <path d="M90,42 C112,82 132,115 118,160 C108,178 72,178 62,160 C48,115 68,82 90,42 Z" fill="#ffa502"/>
          <path d="M90,78 C102,105 112,128 104,156 C96,168 84,168 76,156 C68,128 78,105 90,78 Z" fill="#fff9e6"/>
        </svg>
      `;
    } else {
      return;
    }

    station.appendChild(overlay);
    setTimeout(() => overlay.remove(), 700);

    if (flashClass) {
      const flashEl = document.createElement('div');
      flashEl.className = `arena-vfx-flash ${flashClass}`;
      arena.appendChild(flashEl);
      setTimeout(() => flashEl.remove(), 480);
    }

    arena.classList.add('arena-shake');
    setTimeout(() => arena.classList.remove('arena-shake'), 380);
  }

  fuseCards(indexSource, indexTarget) {
    if (this.isVictoryHandled || this.isVictoryInProgress || this.isFusing || this.isResolvingVaza || this.enemy.hp <= 0) return false;

    const sourceKey = this.hand[indexSource];
    const targetKey = this.hand[indexTarget];

    // Não permite fundir cartas já fundidas ou formulários de burocracia
    if (!sourceKey || !targetKey || sourceKey.includes('+') || targetKey.includes('+')) {
      this.speak(this.getRandomQuote(LUIZ_QUOTES.fuseFail));
      return false;
    }

    const recipeKey1 = `${sourceKey}+${targetKey}`;
    const recipeKey2 = `${targetKey}+${sourceKey}`;
    const recipe = FUSION_RECIPES[recipeKey1] || FUSION_RECIPES[recipeKey2] || resolveCardDefinition(recipeKey1);

    if (!recipe) {
      this.speak(this.getRandomQuote(LUIZ_QUOTES.fuseFail));
      return false;
    }

    this.isFusing = true;

    const allCardEls = Array.from(document.querySelectorAll('.game-card'));
    const sourceEl = allCardEls.find(el => parseInt(el.dataset.index) === indexSource);
    const targetEl = allCardEls.find(el => parseInt(el.dataset.index) === indexTarget);

    if (sourceEl) sourceEl.classList.add('fusion-colliding-source');
    if (targetEl) targetEl.classList.add('fusion-colliding-target');

    const viewport = document.getElementById('mobile-viewport');
    if (viewport) {
      const flash = document.createElement('div');
      flash.className = 'fusion-screen-flash';
      viewport.appendChild(flash);
      setTimeout(() => flash.remove(), 550);
    }
    const arena = document.getElementById('battle-arena');
    if (arena) {
      arena.classList.add('arena-shake');
      setTimeout(() => arena.classList.remove('arena-shake'), 450);
    }

    sfx.fusion();
    if (navigator.vibrate) navigator.vibrate([40, 30, 80]);

    setTimeout(() => {
      const higherIndex = Math.max(indexSource, indexTarget);
      const lowerIndex = Math.min(indexSource, indexTarget);
      this.hand.splice(higherIndex, 1);
      this.hand.splice(lowerIndex, 1);

      const fusedKey = recipeKey1 in FUSION_RECIPES ? recipeKey1 : recipeKey2;
      this.hand.push(fusedKey);
      // Repõe 1 carta do baralho para que o jogador continue com cartas para as 3 rodadas!
      this.drawCards(1);
      this.isFusing = false;

      this.showFusionBanner(recipe);
      this.speak(recipe.catchphrase || 'ZAP FORJADO NA MÃO! Agora quero ver quem aguenta meu Truco!');
      this.updateUI();
    }, 280);

    return true;
  }

  spawnFloatingText(targetEl, text, color = '#ff4757', iconSrc = null) {
    if (!targetEl) return;
    const rect = targetEl.getBoundingClientRect();
    const arena = document.getElementById('battle-arena');
    if (!arena) return;
    const arenaRect = arena.getBoundingClientRect();

    const floatEl = document.createElement('div');
    floatEl.className = 'floating-text';
    if (iconSrc) {
      floatEl.innerHTML = `<img src="${iconSrc}" class="floating-art-icon" alt=""> <span>${text}</span>`;
    } else {
      floatEl.textContent = text;
    }
    floatEl.style.color = color;

    const left = (rect.left + rect.width / 2) - arenaRect.left;
    const top = (rect.top + rect.height * 0.25) - arenaRect.top;

    floatEl.style.left = `${left}px`;
    floatEl.style.top = `${top}px`;

    arena.appendChild(floatEl);
    setTimeout(() => floatEl.remove(), 850);
  }

  setPlayerSpriteState(state) {
    const idleEl = document.getElementById('player-sprite-idle');
    const attackEl = document.getElementById('player-sprite-attack');
    const hurtEl = document.getElementById('player-sprite-hurt');
    if (!idleEl || !attackEl || !hurtEl) return;

    idleEl.className = 'player-bust-sprite hidden-sprite';
    attackEl.className = 'player-bust-sprite hidden-sprite';
    hurtEl.className = 'player-bust-sprite hidden-sprite';

    if (state === 'attack') {
      attackEl.className = 'player-bust-sprite active-attack';
    } else if (state === 'hurt') {
      hurtEl.className = 'player-bust-sprite active-hurt';
    } else {
      idleEl.className = 'player-bust-sprite active-idle';
    }
  }

  playPlayerAttack() {
    this.setPlayerSpriteState('attack');
    this.showComicCallout('attack');
    clearTimeout(this.playerStateTimer);
    this.playerStateTimer = setTimeout(() => {
      this.setPlayerSpriteState('idle');
    }, 650);
  }

  playPlayerHurt() {
    this.setPlayerSpriteState('hurt');
    this.showComicCallout('hurt');
    clearTimeout(this.playerStateTimer);
    this.playerStateTimer = setTimeout(() => {
      this.setPlayerSpriteState('idle');
    }, 850);
  }

  showComicCallout(type) {
    const calloutEl = document.getElementById('player-comic-callout');
    if (!calloutEl) return;
    const quotes = COMIC_CALLOUTS[type] || [];
    if (!quotes.length) return;
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    calloutEl.textContent = quote;
    calloutEl.className = `comic-callout ${type === 'attack' ? 'attack-callout' : ''}`;
    calloutEl.classList.remove('hidden');

    clearTimeout(this.calloutTimer);
    this.calloutTimer = setTimeout(() => {
      calloutEl.classList.add('hidden');
    }, 900);
  }

  setEnemySpriteState(state) {
    const idleEl = document.getElementById('enemy-sprite-idle');
    const attackEl = document.getElementById('enemy-sprite-attack');
    const hurtEl = document.getElementById('enemy-sprite-hurt');
    if (!idleEl || !attackEl || !hurtEl) return;

    idleEl.style.display = 'none';
    attackEl.style.display = 'none';
    hurtEl.style.display = 'none';
    idleEl.className = 'enemy-fullbody-sprite hidden-sprite';
    attackEl.className = 'enemy-fullbody-sprite hidden-sprite';
    hurtEl.className = 'enemy-fullbody-sprite hidden-sprite';

    if (state === 'attack') {
      attackEl.style.display = 'block';
      attackEl.className = 'enemy-fullbody-sprite active-enemy-attack';
    } else if (state === 'hurt') {
      hurtEl.style.display = 'block';
      hurtEl.className = 'enemy-fullbody-sprite active-enemy-hurt';
    } else {
      idleEl.style.display = 'block';
      idleEl.className = 'enemy-fullbody-sprite active-enemy-idle';
    }
  }

  playEnemyAttack() {
    this.setEnemySpriteState('attack');
    this.showEnemyComicCallout('attack');
    clearTimeout(this.enemyStateTimer);
    this.enemyStateTimer = setTimeout(() => {
      this.setEnemySpriteState('idle');
    }, 650);
  }

  playEnemyHurt() {
    this.setEnemySpriteState('hurt');
    this.showEnemyComicCallout('hurt');
    clearTimeout(this.enemyStateTimer);
    this.enemyStateTimer = setTimeout(() => {
      this.setEnemySpriteState('idle');
    }, 850);
  }

  showEnemyComicCallout(type) {
    const calloutEl = document.getElementById('enemy-comic-callout');
    if (!calloutEl) return;
    const quotes = (this.enemy && this.enemy.callouts && this.enemy.callouts[type]) || ENEMY_COMIC_CALLOUTS[type] || [];
    if (!quotes.length) return;
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    calloutEl.textContent = quote;
    calloutEl.className = 'enemy-comic-callout';
    calloutEl.classList.remove('hidden');

    clearTimeout(this.enemyCalloutTimer);
    this.enemyCalloutTimer = setTimeout(() => {
      calloutEl.classList.add('hidden');
    }, 900);
  }

  damagePlayer(rawDmg, customLabel = null, customIcon = null) {
    let unmitigatedDmg = rawDmg;
    const playerEl = document.getElementById('player-bust-frame');
    if (this.player.shield > 0) {
      if (unmitigatedDmg <= this.player.shield) {
        this.player.shield -= unmitigatedDmg;
        this.spawnFloatingText(playerEl, `-${unmitigatedDmg}`, '#70a1ff', 'assets/ui/icon_shield.svg');
        unmitigatedDmg = 0;
      } else {
        const blocked = this.player.shield;
        unmitigatedDmg -= this.player.shield;
        this.player.shield = 0;
        this.spawnFloatingText(playerEl, `-${blocked}`, '#70a1ff', 'assets/ui/icon_shield.svg');
      }
    }
    this.player.hp = Math.max(0, this.player.hp - unmitigatedDmg);
    this.player.lastDamageTaken += unmitigatedDmg;

    if (unmitigatedDmg > 0) {
      sfx.hurt();
      this.playPlayerHurt();
      if (playerEl) {
        this.spawnFloatingText(playerEl, customLabel ? `${customLabel} -${unmitigatedDmg}` : `-${unmitigatedDmg}`, '#ff4757', customIcon);
      }
    }
    if (this.player.hp <= 0) {
      setTimeout(() => this.handleGameOver(), 350);
    }
  }

  damageEnemy(dmg, triggerAnim = true, isPassiveDot = false) {
    let finalDmg = dmg;
    const enemyEl = document.getElementById('enemy-sprite');
    if (this.enemy.shield > 0) {
      if (finalDmg <= this.enemy.shield) {
        this.enemy.shield -= finalDmg;
        this.spawnFloatingText(enemyEl, `-${finalDmg}`, '#70a1ff', 'assets/ui/icon_shield.svg');
        finalDmg = 0;
      } else {
        const blocked = this.enemy.shield;
        finalDmg -= this.enemy.shield;
        this.enemy.shield = 0;
        this.spawnFloatingText(enemyEl, `-${blocked}`, '#70a1ff', 'assets/ui/icon_shield.svg');
      }
    }
    this.enemy.hp = Math.max(0, this.enemy.hp - finalDmg);

    if (finalDmg > 0) {
      sfx.enemyPaperDrop();
      this.playEnemyHurt();
      this.spawnFloatingText(enemyEl, `-${finalDmg}`, '#ff4757');
      if (navigator.vibrate) navigator.vibrate(30);
    }

    // Passivas de Reação dos Chefes (Apenas contra ataques diretos e se o chefe sobreviveu)
    if (!isPassiveDot && this.enemy.hp > 0) {
      // Câmara III (Gárgula): Pele de Granito reflete 3 de Dano em Louis!
      if (this.enemy.thorns > 0) {
        this.damagePlayer(this.enemy.thorns, 'Espinhos', 'assets/ui/icon_gargoyle.svg');
      }
    }

    // Fase 2 de Hades (Liquidação Hostil aos 50% de HP!)
    if (this.enemy.passiveId === 'monopolio_tartaro' && !this.enemy.phase2Triggered && this.enemy.hp > 0 && this.enemy.hp <= this.enemy.maxHp * 0.5) {
      this.enemy.phase2Triggered = true;
      this.enemy.shield += 20;
      this.enemy.bonusDamage += 4;
      this.enemy.passiveIcon = 'assets/ui/status_fogo.svg';
      this.enemy.passiveText = 'FASE 2: LIQUIDAÇÃO TOTAL (+Manilhas!)';
      this.spawnFloatingText(enemyEl, 'FASE 2: +20 ESCUDO!', '#ffd700', 'assets/ui/icon_bident.svg');
      const calloutEl = document.getElementById('enemy-comic-callout');
      if (calloutEl) {
        calloutEl.textContent = 'LIQUIDAÇÃO HOSTIL ATIVADA!';
        calloutEl.classList.remove('hidden');
      }
    }

    // GATILHO UNIVERSAL DE VITÓRIA
    if (this.enemy.hp <= 0 && !this.isVictoryHandled) {
      this.isVictoryHandled = true;
      this.hideTrucoChallengeModal();
      setTimeout(() => {
        this.handleVictory();
      }, 400);
    }
  }

  handleVictory() {
    if (this.isVictoryInProgress) return;
    this.isVictoryInProgress = true;
    this.isVictoryHandled = true;
    this.hideTrucoChallengeModal();

    sfx.victory();
    this.speak(this.getRandomQuote(LUIZ_QUOTES.win));
    const rewardGold = 45 + (this.roomNumber * 10);
    this.player.gold += rewardGold;

    if (this.hasRelic('safra_1800')) {
      this.player.hp = Math.min(this.player.maxHp, this.player.hp + 10);
    }

    const station = document.getElementById('enemy-battle-station');
    if (station) {
      station.classList.add('defeat-exit');
    }

    if (this.roomNumber >= 5) {
      this.hasBeatenGame = true;
      this.maxUnlockedRoom = 5;
      setTimeout(() => {
        const gameOverModal = document.getElementById('game-over-modal');
        if (gameOverModal) {
          const box = gameOverModal.querySelector('.game-over-box');
          const tag = gameOverModal.querySelector('.death-tag');
          const artWrap = document.getElementById('game-over-art-wrap');
          const h2 = gameOverModal.querySelector('h2');
          const p = gameOverModal.querySelector('p');
          const btnText = document.getElementById('btn-restart-text') || document.getElementById('btn-restart');
          if (box) box.classList.add('victory-mode');
          if (tag) {
            tag.innerHTML = `<img src="assets/ui/icon_spark.svg" class="inline-ui-art" alt=""> AQUISIÇÃO HOSTIL CONCLUÍDA! <img src="assets/ui/icon_spark.svg" class="inline-ui-art" alt="">`;
            tag.classList.add('victory-tag-style');
          }
          if (artWrap) artWrap.classList.remove('hidden');
          if (h2) h2.textContent = '"Flawless acquisition! A Inferno S/A agora pertence à Holding Beznoir!"';
          if (p) p.textContent = 'Louis Beznoir IV liquidou Hades na mesa de Truco, assumiu o Trono Executivo do Tártaro e rebaixou o antigo Lorde do Submundo!';
          if (btnText) btnText.textContent = 'NOVA OPERAÇÃO';
          this.renderDRESummary(true);
          gameOverModal.classList.remove('hidden');
        }
      }, 900);
      return;
    }

    setTimeout(() => {
      this.showGodBoonEncounter();
    }, 750);
  }

  showGodBoonEncounter(isReroll = false) {
    if (!isReroll) sfx.godBoonOffer();
    const modal = document.getElementById('god-boon-modal');
    const godImg = document.getElementById('boon-god-img');
    const godTitle = document.getElementById('boon-god-title');
    const godName = document.getElementById('boon-god-name');
    const godQuote = document.getElementById('boon-god-quote');
    const cardsContainer = document.getElementById('boon-cards-container');
    const rerollBtn = document.getElementById('btn-reroll-boon');

    const isHermes = this.roomNumber % 2 !== 0;
    if (isHermes) {
      godTitle.textContent = 'PATROCÍNIO OLÍMPICO: MERCADO DE ATIVOS';
      godName.textContent = 'Hermes, Broker dos Deuses';
      godImg.src = 'assets/characters/god_hermes.png';
      godQuote.textContent = '"Excelente vitória na mesa, primo rico! O conselho do Olimpo liberou novos Ativos Passivos para sua Holding. Escolha um para incorporar ao seu portfólio!"';
    } else {
      godTitle.textContent = 'CONSELHO SUPREMO DE ZEUS';
      godName.textContent = 'Zeus, Chairman do Olimpo';
      godImg.src = 'assets/characters/god_zeus.png';
      godQuote.textContent = '"Jovem Louis! Todo o Olimpo aplaude seu desempenho nas mesas de Truco! Selecione um Ativo de prestígio para expandir sua influência!"';
    }

    const availableRelicIds = Object.keys(RELIC_DATABASE).filter(k => 
      !['algoritmo_hermes', 'alavancagem_ares', 'blindagem_patrimonial'].includes(k) && !this.hasRelic(k)
    );
    const pool = availableRelicIds.length >= 3 ? availableRelicIds : Object.keys(RELIC_DATABASE).filter(k => !['algoritmo_hermes', 'alavancagem_ares', 'blindagem_patrimonial'].includes(k));
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const relicChoices = shuffled.slice(0, 3);

    if (rerollBtn) {
      rerollBtn.disabled = this.player.gold < 25;
      rerollBtn.innerHTML = `<img src="assets/ui/icon_dice.svg" class="inline-ui-art" alt=""> Subornar Corretora: Trocar Ativos (-25 <img src="assets/ui/icon_dracma.svg" class="inline-ui-art" alt=""> | Saldo: ${this.player.gold} <img src="assets/ui/icon_dracma.svg" class="inline-ui-art" alt="">)`;
      rerollBtn.onclick = () => {
        if (this.player.gold >= 25) {
          this.player.gold -= 25;
          sfx.cardDraw();
          this.updateUI();
          this.showGodBoonEncounter(true);
        }
      };
    }

    const inspectPanel = document.getElementById('boon-inspect-panel');
    const inspectQuote = document.getElementById('boon-inspect-quote');
    const btnCancel = document.getElementById('btn-boon-cancel');
    const btnSelect = document.getElementById('btn-boon-select');

    if (inspectPanel) inspectPanel.classList.add('hidden');
    let selectedRelicKey = null;

    if (btnCancel) {
      const newCancel = btnCancel.cloneNode(true);
      btnCancel.parentNode.replaceChild(newCancel, btnCancel);
      this.bindSafeTap(newCancel, () => {
        selectedRelicKey = null;
        const allCards = cardsContainer.querySelectorAll('.boon-card-choice');
        allCards.forEach(c => {
          c.classList.remove('boon-card-focused', 'boon-card-dimmed');
        });
        if (inspectPanel) inspectPanel.classList.add('hidden');
      });
    }

    if (btnSelect) {
      const newSelect = btnSelect.cloneNode(true);
      btnSelect.parentNode.replaceChild(newSelect, btnSelect);
      this.bindSafeTap(newSelect, () => {
        if (!selectedRelicKey) return;
        this.claimRelic(selectedRelicKey);
      });
    }

    cardsContainer.innerHTML = '';
    relicChoices.forEach(relicKey => {
      const relic = RELIC_DATABASE[relicKey];
      if (!relic) return;

      const cardEl = document.createElement('div');
      cardEl.className = 'boon-card-choice';
      
      this.bindSafeTap(cardEl, () => {
        selectedRelicKey = relicKey;
        const allCards = cardsContainer.querySelectorAll('.boon-card-choice');
        allCards.forEach(c => {
          c.classList.remove('boon-card-focused');
          c.classList.add('boon-card-dimmed');
        });
        cardEl.classList.remove('boon-card-dimmed');
        cardEl.classList.add('boon-card-focused');

        if (inspectPanel && inspectQuote) {
          inspectQuote.textContent = this.getFariaLimerQuote(relic.name, relic.desc);
          inspectPanel.classList.remove('hidden');
        }
        sfx.cardDraw();
      });

      cardEl.innerHTML = `
        <div class="card-art-container">
          <img src="${relic.art}" class="card-art-img" alt="${relic.name}" onerror="this.src='assets/ui/icon_spark.svg'"/>
        </div>
        <img class="card-frame-overlay" src="assets/ui/card_frame_olympian_cutout.png?v=1" alt="Frame" />
        <div class="card-cost">★</div>
        <div class="card-header">${relic.name}</div>
        <div class="card-type-tag">ATIVO PASSIVO</div>
      `;
      cardsContainer.appendChild(cardEl);
    });

    modal.classList.remove('hidden');
  }

  claimRelic(relicKey) {
    const relic = RELIC_DATABASE[relicKey];
    if (!relic) return;

    this.addRelic(relicKey);
    sfx.boonAcquired();

    const boonModal = document.getElementById('god-boon-modal');
    if (boonModal) {
      boonModal.classList.add('hidden');
    }
    const inspectPanel = document.getElementById('boon-inspect-panel');
    if (inspectPanel) {
      inspectPanel.classList.add('hidden');
    }

    this.updateUI();
    this.speak(`Ativo "${relic.name}" incorporado ao portfólio da Holding Beznoir!`);

    setTimeout(() => {
      this.showRoomChoice();
    }, 420);
  }

  showRoomChoice() {
    const modal = document.getElementById('room-choice-modal');
    const doorsContainer = document.getElementById('doors-container');
    const statusBar = document.getElementById('room-choice-status-bar');
    if (!modal || !doorsContainer) return;

    if (statusBar) {
      statusBar.innerHTML = `<img src="assets/ui/icon_dracma.svg" class="inline-ui-art" alt=""> <strong>${this.player.gold} Dracmas</strong> &nbsp;|&nbsp; <img src="assets/ui/icon_scales.svg" class="inline-ui-art" alt=""> <strong>${this.relics.length} Ativos no Portfólio</strong>`;
    }

    const availableShopRelics = Object.keys(RELIC_DATABASE)
      .filter(id => !['algoritmo_hermes', 'alavancagem_ares', 'blindagem_patrimonial'].includes(id) && !this.hasRelic(id));
    const offeredRelicId = availableShopRelics.length > 0 ? availableShopRelics[this.roomNumber % availableShopRelics.length] : null;
    const offeredRelic = offeredRelicId ? RELIC_DATABASE[offeredRelicId] : null;
    const canAffordRelic = Boolean(offeredRelic && this.player.gold >= offeredRelic.cost);

    const options = [
      {
        choice: 'heal',
        param: null,
        enabled: true,
        art: 'assets/ui/relic_bordeaux.png',
        title: `Lounge VIP do Estige <span class="door-cost-tag">GRÁTIS</span>`,
        desc: `Suborno de Abertura: Começa a próxima partida de Truco já com <strong>+2 Tentos</strong> no placar!`
      }
    ];

    if (offeredRelic) {
      options.push({
        choice: 'buy_relic',
        param: offeredRelic.id,
        enabled: canAffordRelic,
        art: offeredRelic.art,
        title: `Mercado de Caronte: ${offeredRelic.name} <span class="door-cost-tag">-${offeredRelic.cost} <img src="assets/ui/icon_dracma.svg" class="inline-ui-art" alt=""></span>`,
        desc: offeredRelic.desc
      });
    }

    options.push(
      {
        choice: 'consulting',
        param: null,
        enabled: this.player.gold >= 40,
        art: 'assets/ui/relic_compliance.png',
        title: `Consultoria Jurídica <span class="door-cost-tag">-40 <img src="assets/ui/icon_dracma.svg" class="inline-ui-art" alt=""></span>`,
        desc: `Contrata advogados para a próxima Câmara: começa com <strong>+1 Tento</strong> de vantagem extra!`
      },
      {
        choice: 'dividend_rush',
        param: null,
        enabled: true,
        art: 'assets/ui/relic_centurion.png',
        title: `Alavancagem Agressiva <span class="door-cost-tag">+65 <img src="assets/ui/icon_dracma.svg" class="inline-ui-art" alt=""></span>`,
        desc: `Avança direto para a próxima mesa faturando <strong>+65 Dracmas</strong> imediatos em dividendos!`
      }
    );

    doorsContainer.innerHTML = '';
    let doorChosen = false;

    options.forEach(opt => {
      const cardEl = document.createElement('div');
      cardEl.className = `door-card ${opt.enabled ? '' : 'disabled-door'}`;
      cardEl.innerHTML = `
        <div class="door-icon"><img src="${opt.art}" class="door-art-img" alt=""></div>
        <div class="door-info">
          <strong>${opt.title}</strong>
          <small>${opt.desc}</small>
        </div>
      `;

      const handlePick = () => {
        if (doorChosen) return;
        if (!opt.enabled) {
          sfx.hurt();
          this.speak('Dracmas insuficientes para essa operação! Escolha outra rota do Roadmap.');
          return;
        }
        doorChosen = true;
        this.nextRoom(opt.choice, opt.param);
      };

      this.bindSafeTap(cardEl, handlePick);
      doorsContainer.appendChild(cardEl);
    });

    modal.classList.remove('hidden');
  }

  openUnderworldMap(inTransition = false) {
    const mapModal = document.getElementById('map-modal');
    if (!mapModal) return;

    const CHAMBER_COORDS = {
      1: { top: '88%', left: '54%', title: 'Câmara I: Margens do Aqueronte', desc: 'Onde as almas recém-chegadas aguardam atendimento perpétuo às margens do rio cinzento...' },
      2: { top: '71%', left: '68%', title: 'Câmara II: Cartório do Limbo', desc: 'A fúria de mil processos não arquivados e a Recepcionista Histérica em chamas...' },
      3: { top: '55%', left: '50%', title: 'Câmara III: Portões do Cócito', desc: 'Onde nenhum recurso judicial tem efeito suspensivo perante os guardas de pedra...' },
      4: { top: '42%', left: '50%', title: 'Câmara IV: Tribunal Supremo de Minos', desc: 'Audiência arbitrária e julgamento sumário sob a balança divina do submundo...' },
      5: { top: '24%', left: '50%', title: 'Câmara V: Gabinete Executivo de Hades', desc: 'O CEO do Submundo aguarda o pitch final de aquisição hostil...' }
    };

    const currentChamber = Math.min(Math.max(this.roomNumber, 1), 5);
    const chamberInfo = CHAMBER_COORDS[currentChamber];

    const nodes = document.querySelectorAll('.map-node');
    nodes.forEach(node => {
      const chamberNum = parseInt(node.dataset.chamber);
      node.classList.remove('active-node', 'completed-node', 'locked-node');
      if (chamberNum < currentChamber) {
        node.classList.add('completed-node');
      } else if (chamberNum === currentChamber) {
        node.classList.add('active-node');
      } else {
        node.classList.add('locked-node');
      }
    });

    const pin = document.getElementById('map-player-pin');
    if (pin && chamberInfo) {
      pin.style.top = chamberInfo.top;
      pin.style.left = chamberInfo.left;
    }

    const cardStatus = document.getElementById('map-card-status');
    const cardTitle = document.getElementById('map-card-title');
    const cardDesc = document.getElementById('map-card-desc');

    if (cardStatus) {
      cardStatus.className = 'chamber-status-tag status-current';
      const greekEmblemSvg = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="#ffd700" stroke="#12091c" stroke-width="1.5"/><circle cx="12" cy="12" r="3" fill="#ff1e42"/></svg>`;
      cardStatus.innerHTML = inTransition
        ? `${greekEmblemSvg}<span>PRÓXIMA META DO ROADMAP</span>`
        : `${greekEmblemSvg}<span>CÂMARA ATUAL</span>`;
    }
    if (cardTitle && chamberInfo) cardTitle.textContent = chamberInfo.title;
    if (cardDesc && chamberInfo) cardDesc.textContent = `"${chamberInfo.desc}"`;

    const btnProceed = document.getElementById('map-btn-proceed');
    const btnCloseBottom = document.getElementById('map-btn-close-bottom');
    const btnCloseHeader = document.getElementById('btn-close-map');

    this.isMapInTransition = inTransition;

    if (inTransition) {
      if (btnProceed) {
        btnProceed.textContent = `AVANÇAR PARA CÂMARA ${currentChamber}`;
        btnProceed.classList.remove('hidden');
      }
      if (btnCloseBottom) btnCloseBottom.classList.add('hidden');
      if (btnCloseHeader) btnCloseHeader.classList.add('hidden');
    } else {
      if (btnProceed) btnProceed.classList.add('hidden');
      if (btnCloseBottom) btnCloseBottom.classList.remove('hidden');
      if (btnCloseHeader) btnCloseHeader.classList.remove('hidden');
    }

    mapModal.classList.remove('hidden');
    sfx.swordSlash();
  }

  closeUnderworldMap() {
    const mapModal = document.getElementById('map-modal');
    if (mapModal) mapModal.classList.add('hidden');
    this.isMapInTransition = false;
  }

  openInterstitialComic(transitionKey) {
    const comicModal = document.getElementById('interstitial-comic-modal');
    if (!comicModal) return;

    this.interstitialSlideIndex = 0;
    this.interstitialTransitionKey = transitionKey;
    this.renderInterstitialSlide();

    comicModal.classList.remove('hidden');
    sfx.godBoonOffer();
  }

  renderInterstitialSlide() {
    const titleEl = document.getElementById('interstitial-title');
    const imgEl = document.getElementById('interstitial-img');
    const captionEl = document.getElementById('interstitial-caption-text');
    const btnTextEl = document.getElementById('btn-interstitial-text') || document.querySelector('#btn-interstitial-continue span');
    const dots = document.querySelectorAll('#interstitial-dots .comic-dot');

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === this.interstitialSlideIndex);
    });

    if (this.interstitialTransitionKey === '1_2') {
      if (titleEl) titleEl.textContent = 'TRANSIÇÃO: RUMO AO CARTÓRIO DO LIMBO';
      if (this.interstitialSlideIndex === 0) {
        if (imgEl) imgEl.src = 'assets/comic/comic_transition_1_2_panel1.png?v=30';
        if (captionEl) captionEl.textContent = '"Louis achou que podia dar gorjeta na catraca do submundo: \'Cobrem da conta do meu pai, gentileza...\'"';
        if (btnTextEl) btnTextEl.textContent = 'PRÓXIMO QUADRO';
      } else {
        if (imgEl) imgEl.src = 'assets/comic/comic_transition_1_2_panel2.png?v=30';
        if (captionEl) captionEl.textContent = '"O Choque Burocrático! A Recepcionista do Limbo atira uma montanha de processos em chamas: \'NÃO ATENDEMOS SEM AGENDAMENTO! SENHA 9.999!\'"';
        if (btnTextEl) btnTextEl.textContent = 'ENTRAR EM COMBATE';
      }
    } else if (this.interstitialTransitionKey === '2_3') {
      if (titleEl) titleEl.textContent = 'TRANSIÇÃO: OS PORTÕES DO CÓCITO';
      if (this.interstitialSlideIndex === 0) {
        if (imgEl) imgEl.src = 'assets/comic/comic_transition_2_3_panel1.png?v=30';
        if (captionEl) captionEl.textContent = '"Louis tentando furar a fila do controle de acesso: \'Liberem a catraca VIP. Meu pai é acionista majoritário desta dimensão.\'"';
        if (btnTextEl) btnTextEl.textContent = 'PRÓXIMO QUADRO';
      } else {
        if (imgEl) imgEl.src = 'assets/comic/comic_transition_2_3_panel2.png?v=30';
        if (captionEl) captionEl.textContent = '"A Barreira Intransigente! O Gárgula colossal bloqueia o caminho: \'O PROTOCOLO É ABSOLUTO. SEM EXCEÇÕES.\'"';
        if (btnTextEl) btnTextEl.textContent = 'ENTRAR EM COMBATE';
      }
    } else if (this.interstitialTransitionKey === '3_4') {
      if (titleEl) titleEl.textContent = 'TRANSIÇÃO: TRIBUNAL SUPREMO DE MINOS';
      if (this.interstitialSlideIndex === 0) {
        if (imgEl) imgEl.src = 'assets/comic/comic_transition_3_4_panel1.png?v=30';
        if (captionEl) captionEl.textContent = '"Louis adentra o salão do Tribunal de Minos cheio de confiança: \'OUTSTANDING! Meus advogados resolvem isso em 5 minutos!\'"';
        if (btnTextEl) btnTextEl.textContent = 'PRÓXIMO QUADRO';
      } else {
        if (imgEl) imgEl.src = 'assets/comic/comic_transition_3_4_panel2.png?v=30';
        if (captionEl) captionEl.textContent = '"O Veredito Implacável! Rei Minos bate o malhete de ouro: \'RECURSO INDEFERIDO! MULTA POR LITIGÂNCIA DE MÁ-FÉ!\'"';
        if (btnTextEl) btnTextEl.textContent = 'ENTRAR EM COMBATE';
      }
    } else if (this.interstitialTransitionKey === '4_5') {
      if (titleEl) titleEl.textContent = 'TRANSIÇÃO FINAL: O GABINETE DE HADES';
      if (this.interstitialSlideIndex === 0) {
        if (imgEl) imgEl.src = 'assets/comic/comic_transition_4_5_panel1.png?v=30';
        if (captionEl) captionEl.textContent = '"Louis escancara as portas duplas da presidência: \'FINALLY! Vim exigir o estorno imediato da minha morte!\'"';
        if (btnTextEl) btnTextEl.textContent = 'PRÓXIMO QUADRO';
      } else {
        if (imgEl) imgEl.src = 'assets/comic/comic_transition_4_5_panel2.png?v=30';
        if (captionEl) captionEl.textContent = '"Choque com o CEO! Hades ergue seu Bidente em chamas: \'ESTORNO NEGADO, GAROTO! AQUI VOCÊ É SÓ MAIS UM PASSIVO NO MEU BALANÇO!\'"';
        if (btnTextEl) btnTextEl.textContent = 'ENFRENTAR HADES';
      }
    }
  }

  advanceInterstitialSlide() {
    if (this.interstitialSlideIndex === 0) {
      this.interstitialSlideIndex = 1;
      this.renderInterstitialSlide();
      sfx.cardDraw();
    } else {
      this.closeInterstitialComic();
    }
  }

  closeInterstitialComic() {
    const comicModal = document.getElementById('interstitial-comic-modal');
    if (comicModal) comicModal.classList.add('hidden');
    this.triggerPhaseTransition();
  }

  nextRoom(choice, param = null) {
    const choiceModal = document.getElementById('room-choice-modal');
    if (choiceModal) choiceModal.classList.add('hidden');

    this.nextDuelBonusTentos = 0;

    if (choice === 'heal') {
      this.nextDuelBonusTentos = 2;
      sfx.boonAcquired();
    } else if (choice === 'buy_relic' && param && RELIC_DATABASE[param]) {
      const relic = RELIC_DATABASE[param];
      if (this.player.gold >= relic.cost) {
        this.player.gold -= relic.cost;
        this.addRelic(param);
        sfx.boonAcquired();
      }
    } else if (choice === 'consulting') {
      if (this.player.gold >= 40) {
        this.player.gold -= 40;
        this.nextDuelBonusTentos = (this.nextDuelBonusTentos || 0) + 1;
        sfx.boonAcquired();
      }
    } else if (choice === 'dividend_rush') {
      this.player.gold += 65;
      sfx.cardDraw();
    }

    this.roomNumber++;
    this.maxUnlockedRoom = Math.max(this.maxUnlockedRoom || 1, this.roomNumber);
    this.enemyIndex++;
    this.isVictoryHandled = false;
    this.isVictoryInProgress = false;
    this.isFusing = false;
    this.isResolvingVaza = false;
    this.hideTrucoChallengeModal();
    this.resetBossAbilities();

    this.enemy = this.createEnemy(this.enemyIndex);
    this.updateUI();
    this.openUnderworldMap(true);
  }

  triggerPhaseTransition() {
    const overlay = document.getElementById('phase-transition-overlay');
    const titleEl = document.getElementById('phase-title');
    const descEl = document.getElementById('phase-desc');
    const subEl = document.getElementById('phase-sub');
    const bgLayer = document.getElementById('arena-bg-layer');

    if (titleEl) titleEl.textContent = this.enemy.bgTitle;
    if (descEl) descEl.textContent = `"${this.enemy.bgDesc}"`;
    if (subEl) subEl.textContent = `TRUCO PAULISTA (12 TENTOS) — CÂMARA ${this.roomNumber}`;

    if (overlay) overlay.classList.remove('hidden');

    if (bgLayer && this.enemy.background) {
      bgLayer.style.backgroundImage = `url("${this.enemy.background}")`;
      bgLayer.style.backgroundSize = 'cover';
      bgLayer.style.backgroundPosition = 'center';
    }

    const roomNameEl = document.getElementById('room-name');
    if (roomNameEl) roomNameEl.textContent = this.enemy.bgTitle;

    this.turnNumber = 1;
    this.attacksPlayedThisTurn = 0;
    this.isFusing = false;
    this.isResolvingVaza = false;
    this.hideTrucoChallengeModal();
    this.playerTentos = (this.hasRelic('safra_1800') ? 2 : 0) + (this.nextDuelBonusTentos || 0);
    this.nextDuelBonusTentos = 0;
    this.enemyTentos = 0;
    this.startTurn();

    const station = document.getElementById('enemy-battle-station');
    if (station) {
      station.classList.remove('defeat-exit');
      station.style.animation = 'none';
      void station.offsetWidth;
      station.style.animation = '';
      station.classList.add('enter-station');
    }

    sfx.swordSlash();

    setTimeout(() => {
      if (overlay) overlay.classList.add('hidden');
      if (station) setTimeout(() => station.classList.remove('enter-station'), 500);

      this.speak(this.getRandomQuote([
        'Outstanding! Mais uma mesa de Truco Paulista até 12 Tentos!',
        'Tragam o baralho e virem a Manilha! Quero ver se esse chefe aguenta quando eu gritar SEIS!',
        'Esse ambiente é hostil, mas minhas Bênçãos Olímpicas mudam qualquer regra!'
      ]));
    }, 1350);
  }

  handleGameOver() {
    this.hideTrucoChallengeModal();
    const gameOverModal = document.getElementById('game-over-modal');
    if (gameOverModal) {
      const box = gameOverModal.querySelector('.game-over-box');
      const tag = gameOverModal.querySelector('.death-tag');
      const artWrap = document.getElementById('game-over-art-wrap');
      const h2 = gameOverModal.querySelector('h2');
      const p = gameOverModal.querySelector('p');
      const btnText = document.getElementById('btn-restart-text') || document.getElementById('btn-restart');
      if (box) box.classList.remove('victory-mode');
      if (tag) {
        tag.innerHTML = `<img src="assets/ui/icon_skull.svg" class="inline-ui-art" alt=""> DERROTA NA MESA (12 TENTOS) <img src="assets/ui/icon_skull.svg" class="inline-ui-art" alt="">`;
        tag.classList.remove('victory-tag-style');
      }
      if (artWrap) artWrap.classList.add('hidden');
      if (h2) h2.textContent = '"Isso é um dealbreaker total..."';
      if (p) p.textContent = `O Chefe fechou os 12 Tentos na mesa de ${this.enemy ? this.enemy.bgTitle : 'Câmara I'}.`;
      if (btnText) btnText.textContent = 'VOLTAR AO MENU INICIAL';
      this.renderDRESummary(false);
      gameOverModal.classList.remove('hidden');
    }
  }

  restart() {
    this.hideTrucoChallengeModal();
    this.hideMaoDeOnzeModal();
    const gameOverModal = document.getElementById('game-over-modal');
    if (gameOverModal) gameOverModal.classList.add('hidden');
    const roomChoiceModal = document.getElementById('room-choice-modal');
    if (roomChoiceModal) roomChoiceModal.classList.add('hidden');
    this.closeUnderworldMap();
    const interModal = document.getElementById('interstitial-comic-modal');
    if (interModal) interModal.classList.add('hidden');
    const archModal = document.getElementById('archetype-modal');
    if (archModal) archModal.classList.add('hidden');

    // Volta à tela inicial / capa do jogo
    const titleModal = document.getElementById('title-screen-modal');
    if (titleModal) {
      titleModal.classList.remove('hidden');
    }

    this.stats = {
      vazasWon: 0,
      vazasLost: 0,
      roundsWon: 0,
      roundsLost: 0,
      trucosCalled: 0,
      trucosWon: 0,
      manilhasPlayed: 0,
      bluffsUnmasked: 0,
      goldEarned: 100
    };
    this.isMaoDeOnze = false;
    this.isMaoDeFerro = false;

    this.currentRoomIndex = 0;
    this.roomNumber = 1;
    this.enemyIndex = 0;
    this.enemy = this.createEnemy(0);
    this.playerTentos = 0;
    this.enemyTentos = 0;
    this.player.gold = 100;
    this.relics = [];
    this.vazaResults = [];
    this.hand = [];
    this.enemyTrucoHand = [];
    this.tablePlayedEnemy = null;
    this.tablePlayedPlayer = null;
    this.viraCard = null;
    this.manilhaRank = null;
    this.trucoLevel = 0;
    this.trucoCaller = null;
    this.activePartidaBonus = null;

    const roomNameEl = document.getElementById('room-name');
    if (roomNameEl) roomNameEl.textContent = DUNGEON_ENEMIES[0].bgTitle;
    const bgLayer = document.getElementById('arena-bg-layer');
    if (bgLayer) bgLayer.style.backgroundImage = `url("${DUNGEON_ENEMIES[0].background}")`;
  }

  triggerHaptic(pattern = [25]) {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // Ignora silenciosamente se o dispositivo não der suporte
      }
    }
  }

  triggerScreenShake() {
    const arena = document.getElementById('battle-arena') || document.getElementById('mobile-viewport');
    if (!arena) return;
    arena.classList.remove('screen-shake-anim');
    void arena.offsetWidth; // Força reflow CSS
    arena.classList.add('screen-shake-anim');
    setTimeout(() => {
      arena.classList.remove('screen-shake-anim');
    }, 320);
  }

  triggerCardSlam(slotType = 'player') {
    const slot = document.getElementById(slotType === 'player' ? 'table-slot-player' : 'table-slot-enemy');
    if (!slot) return;

    const cardInside = slot.querySelector('.mini-playing-card');
    const felt = document.querySelector('.truco-felt-surface');

    slot.classList.remove('card-slam-anim', 'slam-impact');
    if (cardInside) cardInside.classList.remove('card-slam-anim');
    if (felt) felt.classList.remove('felt-bump');

    void slot.offsetWidth; // Força reflow CSS

    slot.classList.add('card-slam-anim', 'slam-impact');
    if (cardInside) cardInside.classList.add('card-slam-anim');
    if (felt) felt.classList.add('felt-bump');

    sfx.playCard();
    this.triggerHaptic([35, 15, 20]);

    setTimeout(() => {
      slot.classList.remove('slam-impact');
      if (felt) felt.classList.remove('felt-bump');
    }, 450);
  }

  showTrucoCinematicBanner(level, isPlayer) {
    const banner = document.getElementById('truco-comic-banner');
    const textEl = document.getElementById('comic-shout-text');
    const subEl = document.getElementById('comic-shout-sub');
    if (!banner || !textEl || !subEl) return;

    const titles = {
      1: isPlayer ? 'TRUCO!' : 'TRUCO DO CHEFE!',
      2: isPlayer ? 'SEIS, MEU CONSAGRADO!' : 'SEIS DO CHEFE!',
      3: isPlayer ? 'NOVE NELE!' : 'NOVE DO CHEFE!',
      4: isPlayer ? 'DOZE! VALE O JOGO!' : 'DOZE DO CHEFE!'
    };
    const pts = {
      1: 'VALE 3 TENTOS NA MESA!',
      2: 'VALE 6 TENTOS NA MESA!',
      3: 'VALE 9 TENTOS NA MESA!',
      4: 'VALE 12 TENTOS (PARTIDA COMPLETA)!'
    };

    textEl.textContent = titles[level] || (isPlayer ? 'TRUCO!' : 'TRUCO!');
    subEl.textContent = pts[level] || 'APOSTA ELEVADA!';

    banner.classList.remove('hidden');
    this.triggerScreenShake();
    this.triggerHaptic([60, 30, 80]);

    clearTimeout(this.trucoBannerTimer);
    this.trucoBannerTimer = setTimeout(() => {
      banner.classList.add('hidden');
    }, 900);
  }

  triggerBossTell(type = 'bluff') {
    return; // Desativado a pedido do usuário
  }

  showMaoDeOnzeModal() {
    const modal = document.getElementById('mao-de-onze-modal');
    const preview = document.getElementById('mao-de-onze-preview');
    const contextEl = document.getElementById('mao-de-onze-context');
    const adviceEl = document.getElementById('mao-de-onze-advice');
    const btnAccept = document.getElementById('btn-m11-accept');
    const btnFold = document.getElementById('btn-m11-fold');
    if (!modal) return;

    const viraSuit = this.viraCard && this.viraCard.suit ? this.viraCard.suit.name : 'Ouros';
    const viraRank = this.viraCard ? this.viraCard.rank : '?';
    const manilhaRank = this.manilhaRank || '?';

    if (contextEl) {
      contextEl.innerHTML = `
        <div class="m11-rule-strip">
          <span class="m11-rule-vira">VIRA: <strong>${viraRank} de ${viraSuit}</strong></span>
          <span class="m11-rule-arrow">➔</span>
          <span class="m11-rule-manilha">MANILHA OFICIAL: <strong>${manilhaRank}</strong></span>
        </div>
      `;
    }

    let manilhaCount = 0;
    let hasSpecial = false;

    if (preview) {
      preview.innerHTML = '';
      let cardsHTML = '';

      (this.hand || []).forEach(c => {
        if (!c) return;
        const suit = c.suit || TRUCO_SUITS[0];
        const isSpecial = Boolean(c.isSpecialProtagonist);
        const isManilha = this.isCardManilha(c);

        let highlightClass = 'is-m11-normal';
        let badgeHTML = '';

        if (isSpecial) {
          hasSpecial = true;
          manilhaCount++;
          highlightClass = 'is-m11-special';
          badgeHTML = `<div class="m11-card-badge badge-special">★ SUBORNO REAL</div><div class="m11-card-subtag">IMBATÍVEL</div>`;
        } else if (isManilha) {
          manilhaCount++;
          highlightClass = 'is-m11-manilha';
          badgeHTML = `<div class="m11-card-badge badge-manilha">★ MANILHA</div><div class="m11-card-subtag">${suit.manilhaTitle}</div>`;
        } else {
          highlightClass = 'is-m11-normal';
          badgeHTML = `<div class="m11-card-badge badge-normal">COMUM (${c.rank})</div><div class="m11-card-subtag">Força ${this.getPlayingCardStrength(c, false)}</div>`;
        }

        const artHtml = c.art
          ? `<img src="${c.art}" class="m11-card-art" alt="${c.rank}">`
          : `<img src="${suit.svg}" class="m11-card-suit-center" alt="${suit.name}">`;

        cardsHTML += `
          <div class="m11-card-item ${highlightClass} ${suit.isRed ? 'suit-red' : 'suit-dark'}">
            <div class="m11-card-corner top-left">
              <span class="m11-corner-rank">${c.rank}</span>
              <img src="${suit.svg}" class="m11-corner-suit" alt="${suit.name}">
            </div>
            ${artHtml}
            <div class="m11-card-corner bottom-right">
              <span class="m11-corner-rank">${c.rank}</span>
              <img src="${suit.svg}" class="m11-corner-suit" alt="${suit.name}">
            </div>
            <div class="m11-badges-wrap">
              ${badgeHTML}
            </div>
          </div>
        `;
      });
      preview.innerHTML = cardsHTML;
    }

    if (adviceEl) {
      if (manilhaCount >= 2 || hasSpecial) {
        adviceEl.className = 'm11-advice-strip advice-excellent';
        adviceEl.innerHTML = `<strong>DUE DILIGENCE FAVORÁVEL:</strong> Mão com ${manilhaCount} Manilha(s)! Risco baixo para disputar os 3 tentos e fechar a partida!`;
      } else if (manilhaCount === 1) {
        adviceEl.className = 'm11-advice-strip advice-moderate';
        adviceEl.innerHTML = `<strong>DUE DILIGENCE MODERADA:</strong> 1 Manilha na mão. Boa chance de vitória disputando a rodada!`;
      } else {
        adviceEl.className = 'm11-advice-strip advice-risky';
        adviceEl.innerHTML = `<strong>ALERTA DE RISCO:</strong> Nenhuma Manilha na mão! Correr cede apenas 1 tento ao invés de perder 3!`;
      }
    }

    if (btnAccept) {
      btnAccept.onclick = () => {
        this.hideMaoDeOnzeModal();
        sfx.swordSlash();
        this.triggerHaptic([40, 30, 60]);
        this.speak('Decisão de governança: Aceitamos o risco! Vamos disputar os 3 tentos da vitória!');
      };
    }

    if (btnFold) {
      btnFold.onclick = () => {
        this.hideMaoDeOnzeModal();
        this.foldHandMaoDeOnze();
      };
    }

    modal.classList.remove('hidden');
  }

  hideMaoDeOnzeModal() {
    const modal = document.getElementById('mao-de-onze-modal');
    if (modal) modal.classList.add('hidden');
  }

  foldHandMaoDeOnze() {
    this.hideMaoDeOnzeModal();
    this.speak('Gestão de risco prudente! Descartamos essa mão antes do pregão e cedemos 1 tento!');
    this.awardHandTentos('enemy', 1, true);
  }

  evaluateEnemyMaoDeOnze() {
    const hasManilha = this.enemyTrucoHand.some(c => this.isCardManilha(c));
    const maxPwr = Math.max(...this.enemyTrucoHand.map(c => this.getPlayingCardStrength(c, true)));

    // Chefe aceita se tiver manilha ou carta de peso alto (>= 11, ex: 3, 2)
    if (hasManilha || maxPwr >= 11 || Math.random() < 0.45) {
      this.speakArrogant(
        'Mão de 11 do Chefe',
        'O Chefe revisou a carteira dele e bancou o risco! A mão vale 3 tentos! Mostre quem manda no pregão!'
      );
    } else {
      this.speakArrogant(
        'Mão de 11 do Chefe',
        'O Chefe arregou na Mão de 11 com medo da nossa auditoria! Faturamos +1 Tento de graça no balcão!'
      );
      this.awardHandTentos('player', 1, true);
    }
  }

  renderDRESummary(isVictory) {
    const dreVazas = document.getElementById('dre-vazas');
    const dreGold = document.getElementById('dre-gold');
    const dreTrucos = document.getElementById('dre-trucos');
    const dreManilhas = document.getElementById('dre-manilhas');
    const dreParecer = document.getElementById('dre-parecer');

    const totalVazas = (this.stats.vazasWon || 0) + (this.stats.vazasLost || 0);
    const winRate = totalVazas > 0 ? Math.round((this.stats.vazasWon / totalVazas) * 100) : 100;
    const trucoRate = this.stats.trucosCalled > 0 
      ? Math.round((this.stats.trucosWon / this.stats.trucosCalled) * 100)
      : 100;

    if (dreVazas) dreVazas.textContent = `${this.stats.vazasWon} vitórias (${winRate}% de win rate)`;
    if (dreGold) dreGold.textContent = `${this.player.gold} Dracmas (Saldo Final)`;
    if (dreTrucos) dreTrucos.textContent = `${trucoRate}% de sucesso (${this.stats.trucosWon}/${this.stats.trucosCalled || 1})`;
    if (dreManilhas) dreManilhas.textContent = `${this.stats.manilhasPlayed} jogadas na mesa`;

    if (dreParecer) {
      if (isVictory) {
        dreParecer.textContent = '"Holding Beznoir consolidada com EBITDA astronômico! Auditoria concluída com takeover hostil do Olimpo e rebaixamento de Hades!"';
      } else {
        dreParecer.textContent = '"Insolvência operacional de tentos na mesa. Recomendamos reestruturação do balanço, corte de despesas e nova auditoria no Limbo."';
      }
    }
  }

  bindSafeTap(el, callback) {
    if (!el) return;
    let startX = 0, startY = 0;
    let didMove = false;
    let isTouching = false;
    let lastTapTime = 0;

    el.style.touchAction = 'manipulation';
    el.style.cursor = 'pointer';

    el.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length > 0) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        didMove = false;
        isTouching = true;
      }
    }, { passive: true });

    el.addEventListener('touchmove', (e) => {
      if (!isTouching || !e.touches || e.touches.length === 0) return;
      const dx = Math.abs(e.touches[0].clientX - startX);
      const dy = Math.abs(e.touches[0].clientY - startY);
      if (dx > 16 || dy > 16) {
        didMove = true;
      }
    }, { passive: true });

    el.addEventListener('touchend', (e) => {
      if (!isTouching) return;
      isTouching = false;
      if (!didMove) {
        lastTapTime = Date.now();
        callback(e);
      }
      didMove = false;
    }, { passive: true });

    el.addEventListener('touchcancel', () => {
      isTouching = false;
      didMove = false;
    });

    el.addEventListener('click', (e) => {
      const now = Date.now();
      if (now - lastTapTime < 450) {
        return;
      }
      callback(e);
    });
  }

  speak(text) {
    const bubble = document.getElementById('luiz-dialogue-bubble');
    const dialogue = document.getElementById('dialogue-text');
    const actionSlot = document.getElementById('dialogue-action-slot');
    if (actionSlot) actionSlot.classList.add('hidden');
    if (dialogue) dialogue.textContent = `"${text}"`;
    if (bubble) bubble.classList.remove('hidden');
    clearTimeout(this.dialogueTimer);
    this.dialogueTimer = setTimeout(() => {
      if (bubble) bubble.classList.add('hidden');
    }, 3200);

    const closeBtn = document.getElementById('dialogue-close-btn');
    if (closeBtn) {
      closeBtn.onclick = () => bubble && bubble.classList.add('hidden');
    }
  }

  getFariaLimerQuote(term, desc) {
    const templates = [
      `"${term}? Shitstorm total no mercado e você não sabe o que é isso, meu consagrado?! ${desc}"`,
      `"${term}? Se vier uma shitstorm no payroll, você zera a posição ou aplica isso aqui: ${desc}"`,
      `"${term}? Shitstorm generalizada no book de ofertas e você boiando nessa regra básica?! Presta atenção: ${desc}"`,
      `"${term}? Outstanding! Como você não sabe o que é isso, meu consagrado?! ${desc}"`,
      `"${term}? Flawless! Não te ensinaram o valuation disso no seu MBA?! ${desc}"`,
      `"${term}? By the way, quem opera no mercado sem entender essa tese é puro amadorismo! ${desc}"`,
      `"${term}? Of course! Básico do corporate governance do Olimpo! Presta atenção: ${desc}"`,
      `"${term}? Absolutely out of the curve! Como alguém com CPF ativo não conhece essa mecânica?! ${desc}"`,
      `"${term}? Dealbreaker total não saber isso! Meu private banker usa todo santo dia: ${desc}"`,
      `"${term}? Excuse me?! Isso é cartilha básica da Faria Lima até o Tártaro! ${desc}"`,
      `"${term}? Low profile, mas de altíssima rentabilidade! Deixa eu desenhar o pitch pra você: ${desc}"`,
      `"${term}? Surreal ter que dar essa consultoria de graça na mesa! É o seguinte: ${desc}"`,
      `"${term}? Mindset fraco esse seu! Deixa eu fazer o onboarding rápido: ${desc}"`,
      `"${term}? C-Level não perde tempo com dúvida júnior, mas lá vai: ${desc}"`
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  speakArrogant(term, desc, actionCallback = null, actionLabel = 'EXECUTAR ORDEM') {
    const bubble = document.getElementById('luiz-dialogue-bubble');
    const dialogue = document.getElementById('dialogue-text');
    const actionSlot = document.getElementById('dialogue-action-slot');
    if (!bubble || !dialogue) return;

    dialogue.textContent = this.getFariaLimerQuote(term, desc);
    bubble.classList.remove('hidden');

    if (actionSlot) {
      if (actionCallback) {
        actionSlot.innerHTML = `<button type="button" class="btn-dialogue-execute">${actionLabel}</button>`;
        actionSlot.classList.remove('hidden');
        const execBtn = actionSlot.querySelector('.btn-dialogue-execute');
        if (execBtn) {
          execBtn.onclick = (e) => {
            e.stopPropagation();
            bubble.classList.add('hidden');
            actionCallback();
          };
        }
      } else {
        actionSlot.innerHTML = '';
        actionSlot.classList.add('hidden');
      }
    }

    clearTimeout(this.dialogueTimer);
    this.dialogueTimer = setTimeout(() => {
      bubble.classList.add('hidden');
    }, actionCallback ? 8000 : 4500);

    const closeBtn = document.getElementById('dialogue-close-btn');
    if (closeBtn) {
      closeBtn.onclick = () => bubble.classList.add('hidden');
    }
  }

  getRandomQuote(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  showFusionBanner(recipe) {
    const banner = document.getElementById('fusion-banner');
    if (!banner) return;
    banner.classList.remove('hidden');
    clearTimeout(this.fusionBannerTimer);
    this.fusionBannerTimer = setTimeout(() => {
      banner.classList.add('hidden');
    }, 2000);
  }

  renderRelicsBar() {
    const bar = document.getElementById('relics-bar');
    if (!bar) return;
    bar.innerHTML = `<span class="relics-label">ATIVOS:</span>`;
    (this.relics || []).forEach(relicId => {
      const r = RELIC_DATABASE[relicId];
      if (!r) return;
      const pill = document.createElement('span');
      pill.className = 'relic-pill';
      pill.title = `${r.name}: ${r.desc}`;
      pill.innerHTML = `<img src="${r.art}" class="relic-pill-art" alt="${r.name}">`;
      this.bindSafeTap(pill, () => {
        this.speakArrogant(r.name, r.desc);
      });
      bar.appendChild(pill);
    });
  }

  // Renderiza uma mini-carta na mesa (para a Carta VIRA e para as Cartas Jogadas na Rodada)
  buildMiniTableCardHTML(card) {
    if (!card) return `<span class="slot-placeholder">?</span>`;
    if (card.isFaceDown) {
      return `<img src="assets/cards/truco_card_back.svg" alt="Carta Coberta" class="deck-back-img">`;
    }
    const suit = card.suit || TRUCO_SUITS[0];
    const isSpecial = Boolean(card.isSpecialProtagonist);
    const isManilha = this.isCardManilha(card) || isSpecial;
    const artHtml = card.art
      ? `<img src="${card.art}" class="mini-card-art" alt="${card.rank}">`
      : `<img src="${suit.svg}" class="mini-center-suit" alt="${suit.name}">`;

    return `
      <div class="mini-playing-card ${suit.isRed ? 'suit-red' : ''} ${isManilha ? 'is-manilha' : ''}">
        ${artHtml}
        <div class="mini-corner">
          <span class="mini-rank">${card.rank}</span>
          <img src="${suit.svg}" class="mini-suit-img" alt="${suit.name}">
        </div>
      </div>
    `;
  }


  renderArchetypeAbilities() {
    const bar = document.getElementById('archetype-abilities-bar');
    if (!bar) return;
    bar.innerHTML = '';

    // 0. Passiva Inata do Protagonista: "Sorte de Nascença" (+40% de probabilidade da carta especial)
    const btnLouisPassive = document.createElement('button');
    btnLouisPassive.type = 'button';
    btnLouisPassive.className = 'archetype-ability-btn louis-passive-chip';
    btnLouisPassive.title = 'Passiva Inata: Sorte de Nascença (+40% de probabilidade estatística de vir a carta Suborno Real na mão)';
    btnLouisPassive.innerHTML = `
      <img src="assets/characters/luiz_beznol.png?v=4" class="archetype-ability-icon" alt="Sorte de Nascença">
      <span class="archetype-ability-badge louis-passive-badge">+40%</span>
    `;
    this.bindSafeTap(btnLouisPassive, () => {
      this.speakArrogant(
        'Sorte de Nascença',
        'Berço de ouro! Minha carta especial Suborno Real Beznoir tem probabilidade estatística aumentada em +40% de vir na mão a cada rodada!'
      );
      sfx.cardDraw();
    });
    bar.appendChild(btnLouisPassive);

    // Divisor entre a Passiva Inata de Louis e os Poderes do Arquétipo
    const divInnate = document.createElement('span');
    divInnate.className = 'abilities-bar-divider';
    divInnate.title = 'Poderes do Arquétipo';
    bar.appendChild(divInnate);

    const arch = this.archetype; // 'quant', 'private_equity', 'hedge_fund'

    if (arch === 'quant') {
      // 1. Compra 4 Cartas e Descarta 1 (1x por boss)
      const usedDraw4 = this.bossAbilitiesUsed.quantDraw4;
      const btnDraw4 = document.createElement('button');
      btnDraw4.type = 'button';
      btnDraw4.className = `archetype-ability-btn ${usedDraw4 ? 'ability-used' : ''}`;
      btnDraw4.disabled = this.isResolvingVaza;
      btnDraw4.innerHTML = `
        <img src="assets/ui/archetype_quant.png" class="archetype-ability-icon" alt="HFT">
        <span class="archetype-ability-badge">${usedDraw4 ? '✓' : '1x'}</span>
      `;
      btnDraw4.title = 'Algoritmo HFT de Hermes (Compre 4 e descarte 1)';
      this.bindSafeTap(btnDraw4, () => {
        if (usedDraw4) {
          this.speakArrogant('Algoritmo HFT de Hermes', 'Já executamos essa ordem no book neste duelo! Eu sou investidor agressivo, não imprudente!');
        } else {
          this.speakArrogant(
            'Algoritmo HFT de Hermes',
            'É automação de alta frequência! Compro 4 cartas do book de ofertas e descarto o lixo antes do mercado abrir!',
            () => this.activateQuantDraw4(),
            'EXECUTAR COMPRA (4 CARTAS)'
          );
        }
      });
      bar.appendChild(btnDraw4);

      // 2. Ímpar Vence (1x por boss)
      const usedOdd = this.bossAbilitiesUsed.quantOddWins;
      const isActiveOdd = this.activePartidaBonus === 'quantOddWins';
      const btnOdd = document.createElement('button');
      btnOdd.type = 'button';
      btnOdd.className = `archetype-ability-btn ${usedOdd ? 'ability-used' : ''} ${isActiveOdd ? 'ability-active' : ''}`;
      btnOdd.disabled = this.isResolvingVaza;
      btnOdd.innerHTML = `
        <img src="assets/ui/status_raio.svg" class="archetype-ability-icon" alt="Ímpar">
        <span class="archetype-ability-badge">${isActiveOdd ? 'ON' : (usedOdd ? '✓' : '1x')}</span>
      `;
      btnOdd.title = 'Estatística Arbitrada (Carta Ímpar Vence Par)';
      this.bindSafeTap(btnOdd, () => {
        if (isActiveOdd) {
          this.speakArrogant('Estatística Arbitrada', 'O modelo quantitativo já está rodando nesta rodada! Carta ímpar vai bater qualquer par do Chefe!');
        } else if (usedOdd) {
          this.speakArrogant('Estatística Arbitrada', 'Essa tese estatística já foi liquidada neste duelo!');
        } else {
          this.speakArrogant(
            'Estatística Arbitrada',
            'O modelo quantitativo provou: nesta rodada, qualquer carta ÍMPAR vence PAR!',
            () => this.activateQuantOddWins(),
            'APLICAR MODELO ÍMPAR'
          );
        }
      });
      bar.appendChild(btnOdd);

    } else if (arch === 'private_equity') {
      // 1. +2 Força Player (1x por boss)
      const usedBoost = this.bossAbilitiesUsed.peBoostPlayer;
      const isActiveBoost = this.activePartidaBonus === 'peBoostPlayer';
      const btnBoost = document.createElement('button');
      btnBoost.type = 'button';
      btnBoost.className = `archetype-ability-btn ${usedBoost ? 'ability-used' : ''} ${isActiveBoost ? 'ability-active' : ''}`;
      btnBoost.disabled = this.isResolvingVaza;
      btnBoost.innerHTML = `
        <img src="assets/ui/archetype_pe.png" class="archetype-ability-icon" alt="Alavancagem">
        <span class="archetype-ability-badge">${isActiveBoost ? 'ON' : (usedBoost ? '✓' : '+2')}</span>
      `;
      btnBoost.title = 'Alavancagem Hostil (+2 Força na sua carta)';
      this.bindSafeTap(btnBoost, () => {
        if (isActiveBoost) {
          this.speakArrogant('Alavancagem Hostil', 'A rodada já está alavancada! Minha carta jogada está com +2 de poder bruto na mesa!');
        } else if (usedBoost) {
          this.speakArrogant('Alavancagem Hostil', 'Já injetamos a cota máxima de alavancagem contra este Chefe!');
        } else {
          this.speakArrogant(
            'Alavancagem Hostil',
            'Tomo dívida barata para alavancar a rodada! Minha carta jogada ganha +2 de poder bruto na mesa!',
            () => this.activatePEBoostPlayer(),
            'ALAVANCAR CARTA (+2)'
          );
        }
      });
      bar.appendChild(btnBoost);

      // 2. -2 Força Chefe (1x por boss)
      const usedNerf = this.bossAbilitiesUsed.peNerfBoss;
      const isActiveNerf = this.activePartidaBonus === 'peNerfBoss';
      const btnNerf = document.createElement('button');
      btnNerf.type = 'button';
      btnNerf.className = `archetype-ability-btn ${usedNerf ? 'ability-used' : ''} ${isActiveNerf ? 'ability-active' : ''}`;
      btnNerf.disabled = this.isResolvingVaza;
      btnNerf.innerHTML = `
        <img src="assets/ui/status_sangria.svg" class="archetype-ability-icon" alt="Auditoria">
        <span class="archetype-ability-badge">${isActiveNerf ? 'ON' : (usedNerf ? '✓' : '-2')}</span>
      `;
      btnNerf.title = 'Auditoria Destrutiva (-2 Força na carta do Chefe)';
      this.bindSafeTap(btnNerf, () => {
        if (isActiveNerf) {
          this.speakArrogant('Auditoria Destrutiva', 'Auditoria em andamento! A carta jogada do Chefe está 2 pontos desvalorizada!');
        } else if (usedNerf) {
          this.speakArrogant('Auditoria Destrutiva', 'Já congelamos as contas e auditamos este Chefe neste duelo!');
        } else {
          this.speakArrogant(
            'Auditoria Destrutiva',
            'Mando congelar o fluxo de caixa do Chefe e a carta dele perde 2 pontos de força na hora!',
            () => this.activatePENerfBoss(),
            'EXECUTAR AUDITORIA (-2)'
          );
        }
      });
      bar.appendChild(btnNerf);

    } else if (arch === 'hedge_fund') {
      // Passiva permanente: Vence empates
      const chipTie = document.createElement('button');
      chipTie.type = 'button';
      chipTie.className = 'archetype-passive-chip';
      chipTie.innerHTML = `
        <img src="assets/ui/archetype_hedge.png" class="archetype-ability-icon" alt="Holding">
        <span class="archetype-ability-badge">H</span>
      `;
      chipTie.title = 'Holding Blindada: Você vence todos os empates (cangas) automaticamente!';
      this.bindSafeTap(chipTie, () => {
        this.speakArrogant('Holding Blindada', 'Minhas offshores são intocáveis: se houver empate (canga) na mesa, a vaza é automaticamente minha!');
      });
      bar.appendChild(chipTie);

      // 1. Par Vence (1x por boss)
      const usedEven = this.bossAbilitiesUsed.hedgeEvenWins;
      const isActiveEven = this.activePartidaBonus === 'hedgeEvenWins';
      const btnEven = document.createElement('button');
      btnEven.type = 'button';
      btnEven.className = `archetype-ability-btn ${usedEven ? 'ability-used' : ''} ${isActiveEven ? 'ability-active' : ''}`;
      btnEven.disabled = this.isResolvingVaza;
      btnEven.innerHTML = `
        <img src="assets/ui/icon_shield.svg" class="archetype-ability-icon" alt="Par">
        <span class="archetype-ability-badge">${isActiveEven ? 'ON' : (usedEven ? '✓' : 'Par')}</span>
      `;
      btnEven.title = 'Contrato de Hedge (Carta Par Vence Ímpar)';
      this.bindSafeTap(btnEven, () => {
        if (isActiveEven) {
          this.speakArrogant('Contrato de Hedge', 'Hedge ativo! Se a minha carta for par, ela já ganhou a disputa!');
        } else if (usedEven) {
          this.speakArrogant('Contrato de Hedge', 'Já exercemos nossa opção de proteção neste duelo!');
        } else {
          this.speakArrogant(
            'Contrato de Hedge',
            'Proteção derivativa absoluta: se a minha carta for par, ela ganha da carta do chefe sem contestação!',
            () => this.activateHedgeEvenWins(),
            'ATIVAR HEDGE PAR'
          );
        }
      });
      bar.appendChild(btnEven);
    }

    // Renderiza também todos os Ativos Passivos / Efeitos colecionados pós-fase na barra de poderes!
    const collectedRelics = (this.relics || []).filter(
      rId => !['algoritmo_hermes', 'alavancagem_ares', 'blindagem_patrimonial'].includes(rId)
    );

    if (collectedRelics.length > 0) {
      const divider = document.createElement('span');
      divider.className = 'abilities-bar-divider';
      divider.title = 'Ativos da Holding';
      bar.appendChild(divider);

      collectedRelics.forEach(relicId => {
        const r = RELIC_DATABASE[relicId];
        if (!r) return;

        const relicBtn = document.createElement('button');
        relicBtn.type = 'button';
        relicBtn.className = 'archetype-ability-btn relic-power-chip';
        relicBtn.title = `${r.name}: ${r.desc} (Toque para ouvir Louis)`;
        relicBtn.innerHTML = `
          <img src="${r.art}" class="archetype-ability-icon" alt="${r.name}" onerror="this.src='assets/ui/icon_spark.svg'">
          <span class="archetype-ability-badge relic-badge-tag">VIP</span>
        `;
        this.bindSafeTap(relicBtn, () => {
          this.speakArrogant(r.name, r.desc);
          sfx.cardDraw();
        });
        bar.appendChild(relicBtn);
      });
    }
  }

  selectCardForInspection(index) {
    if (this.selectedCardIndex === index) {
      this.playCard(index);
      return;
    }

    this.selectedCardIndex = index;
    const card = this.hand[index];
    const banner = document.getElementById('card-inspector-banner');

    if (banner && card) {
      const suit = card.suit || TRUCO_SUITS[0];
      const isSpecial = Boolean(card.isSpecialProtagonist);
      const isManilha = this.isCardManilha(card);
      const pwr = this.getPlayingCardStrength(card, false);

      banner.className = 'card-inspector-banner';

      if (isSpecial) {
        banner.classList.add('special-selected');
        banner.innerHTML = `<strong>★ SUBORNO REAL BEZNOIR:</strong> Força Quase Suprema (23.5) & Rende +15 Dracmas! <em>(Toque novamente para jogar)</em>`;
        this.speakArrogant('Suborno Real Beznoir', 'Uma ordem de pagamento irrecusável: força 23.5 contra a mesa e me rende +15 Dracmas no ato!');
      } else if (isManilha) {
        banner.classList.add('manilha-selected');
        banner.innerHTML = `<strong>${suit.manilhaTitle} (${card.rank} de ${suit.name}):</strong> MANILHA DA RODADA! Força ${pwr}. <em>(Toque novamente para jogar)</em>`;
      } else {
        banner.innerHTML = `<strong>${card.rank} de ${suit.name}:</strong> Carta Comum (Hierarquia: Força ${pwr}). <em>(Toque novamente para jogar)</em>`;
      }
    }

    this.renderHand();
  }

  renderTrucoHUD() {
    const stakePts = this.getCurrentStakeDamage();
    const currentTier = TRUCO_STAKES_LADDER[Math.min(this.trucoLevel, TRUCO_STAKES_LADDER.length - 1)];

    // Placar Unificado Clean
    const scoreEnemyName = document.getElementById('scoreboard-enemy-name');
    if (scoreEnemyName && this.enemy) {
      scoreEnemyName.textContent = this.enemy.luizName.toUpperCase();
    }
    const scoreEnemyVal = document.getElementById('enemy-tentos-val');
    if (scoreEnemyVal) scoreEnemyVal.textContent = this.enemyTentos;
    const scorePlayerVal = document.getElementById('player-tentos-val');
    if (scorePlayerVal) scorePlayerVal.textContent = this.playerTentos;

    const stakeBadge = document.getElementById('scoreboard-stake-badge');
    const stakesLabel = document.getElementById('truco-stakes-label');
    if (stakesLabel) {
      stakesLabel.textContent = `VALE ${stakePts} TENTO${stakePts > 1 ? 'S' : ''}`;
    }
    if (stakeBadge) {
      stakeBadge.classList.toggle('stake-escalated', this.trucoLevel > 0);
    }

    const manilhaRankEl = document.getElementById('active-manilha-rank');
    if (manilhaRankEl) {
      manilhaRankEl.textContent = this.manilhaRank;
    }

    // Renderiza a Carta VIRA no baralho da mesa
    const viraSlot = document.getElementById('table-vira-card');
    if (viraSlot && this.viraCard) {
      viraSlot.innerHTML = this.buildMiniTableCardHTML(this.viraCard);
    }

    // Renderiza as Cartas Jogadas no Turno na Mesa (permanecem visíveis até o fim da partida/rodada)
    const enemySlot = document.getElementById('table-slot-enemy');
    const playerSlot = document.getElementById('table-slot-player');
    const vsInd = document.getElementById('table-vs-indicator');

    if (enemySlot) {
      enemySlot.className = `table-played-slot ${this.tablePlayedEnemy ? '' : 'empty-slot'} ${this.lastRoundWinner === 'loss' ? 'slot-winner' : ''}`;
      enemySlot.innerHTML = this.tablePlayedEnemy ? this.buildMiniTableCardHTML(this.tablePlayedEnemy) : `<span class="slot-placeholder">?</span>`;
    }

    if (playerSlot) {
      playerSlot.className = `table-played-slot ${this.tablePlayedPlayer ? '' : 'empty-slot'} ${this.lastRoundWinner === 'win' ? 'slot-winner' : ''}`;
      playerSlot.innerHTML = this.tablePlayedPlayer ? this.buildMiniTableCardHTML(this.tablePlayedPlayer) : `<span class="slot-placeholder">?</span>`;
    }

    if (vsInd) {
      if (this.lastRoundWinner === 'win') vsInd.textContent = 'SUA!';
      else if (this.lastRoundWinner === 'loss') vsInd.textContent = 'DELE!';
      else if (this.lastRoundWinner === 'tie') vsInd.textContent = 'CANGA!';
      else vsInd.textContent = 'VS';
    }

    const tableHud = document.getElementById('truco-table-hud');
    if (tableHud) {
      tableHud.classList.toggle('truco-escalated', this.trucoLevel > 0);
    }

    const potBadge = document.getElementById('truco-pot-badge');
    const potText = document.getElementById('truco-pot-text');
    if (potBadge && potText) {
      potBadge.classList.toggle('pot-high-stakes', this.trucoLevel > 0);
      potText.textContent = `VALE ${stakePts} PT${stakePts > 1 ? 'S' : ''}`;
    }

    const dots = document.querySelectorAll('#truco-vaza-dots .vaza-dot');
    dots.forEach((dot, idx) => {
      dot.className = 'vaza-dot';
      const res = this.vazaResults[idx];
      if (res === 'win') {
        dot.classList.add('vaza-win');
        dot.textContent = `${idx + 1}ª SUA`;
      } else if (res === 'loss') {
        dot.classList.add('vaza-loss');
        dot.textContent = `${idx + 1}ª CHEFE`;
      } else if (res === 'tie') {
        dot.classList.add('vaza-tie');
        dot.textContent = `${idx + 1}ª CANGA`;
      } else {
        dot.textContent = `${idx + 1}ª PARTIDA`;
      }
    });

    const clashEl = document.getElementById('truco-clash-status');
    if (clashEl) {
      clashEl.textContent = this.clashStatusText || 'Jogue uma carta na mesa ou peça TRUCO!';
    }

    // Botão TRUCO Centralizado com Moedas Ilustradas
    const trucoBtn = document.getElementById('btn-end-turn');
    const trucoBtnText = document.getElementById('btn-truco-text');
    const trucoBtnSub = document.getElementById('btn-truco-sub-label');
    const trucoCoinImg = document.getElementById('btn-truco-coin-img');

    if (trucoBtn) {
      if (this.isMaoDeOnze || this.isMaoDeFerro) {
        trucoBtn.disabled = true;
        trucoBtn.className = 'btn-truco-call-centered truco-waiting btn-disabled-m11';
        if (trucoBtnText) trucoBtnText.textContent = this.isMaoDeFerro ? 'MÃO DE FERRO' : 'MÃO DE 11';
        if (trucoBtnSub) trucoBtnSub.textContent = 'VALE 3 TENTOS';
        if (trucoCoinImg) trucoCoinImg.src = 'assets/ui/coins_truco_3.svg';
      } else if (this.trucoLevel >= 4) {
        trucoBtn.disabled = true;
        trucoBtn.className = 'btn-truco-call-centered truco-waiting';
        if (trucoBtnText) trucoBtnText.textContent = 'MÁXIMO (12)';
        if (trucoBtnSub) trucoBtnSub.textContent = 'JOGO TOTAL';
        if (trucoCoinImg) trucoCoinImg.src = 'assets/ui/coins_truco_12.svg';
      } else if (this.lastTrucoCaller === 'player') {
        trucoBtn.disabled = true;
        trucoBtn.className = 'btn-truco-call-centered truco-waiting';
        if (trucoBtnText) trucoBtnText.textContent = 'APOSTA FEITA';
        if (trucoBtnSub) trucoBtnSub.textContent = 'AGUARDE O CHEFE';
        if (trucoCoinImg) trucoCoinImg.src = currentTier.raiseCoinSvg;
      } else {
        trucoBtn.disabled = false;
        trucoBtn.className = 'btn-truco-call-centered';
        if (trucoBtnText) trucoBtnText.textContent = currentTier.raiseCallTitle;
        if (trucoBtnSub) trucoBtnSub.textContent = `VALE ${currentTier.raisePoints} TENTOS`;
        if (trucoCoinImg) trucoCoinImg.src = currentTier.raiseCoinSvg;
      }
    }

    this.renderArchetypeAbilities();
    this.renderRelicsBar();
  }

  getBossPassiveName() {
    if (!this.enemy) return 'Passiva Corporativa';
    const names = {
      corpo_mole: 'Adicional Noturno',
      burocracia_histerica: 'Burocracia Feroz',
      pele_granito: 'Postura Inabalável',
      juros_mora: 'Rigor Processual',
      veredito_minos: 'Jurisprudência do Tártaro',
      monopolio_tartaro: 'Monopólio do Tártaro'
    };
    return names[this.enemy.passiveId] || 'Passiva Corporativa';
  }

  getBossPassiveExplanation() {
    if (!this.enemy) return '';
    const explanations = {
      corpo_mole: 'Se a 1ª vaza empatar (cangar), ele tenta faturar +1 Tento extra de Adicional Noturno se vencer a mão disputada! Mas vacila e corre facilmente sob Truco!',
      burocracia_histerica: 'Reativa e agressiva a provocações! Se você pedir Truco, ela retruca com frequência para te pressionar no balcão!',
      pele_granito: 'Muralha inabalável! Não corre fácil de truco e suas cartas de Espadas ganham peso decisivo no desempate!',
      juros_mora: 'O Juiz Supremo ignora blefes e em caso de empate ele pune com severidade processual monocrática!',
      veredito_minos: 'Jurisprudência do Tártaro: o Juiz Supremo ignora blefes e suas decisões monocráticas prevalecem!',
      monopolio_tartaro: 'O CEO do Submundo! Ao atingir 6 Tentos, entra em Fase 2 (Banca em Chamas) com fúria dobrada e manilhas extras!'
    };
    return explanations[this.enemy.passiveId] || this.enemy.bgDesc || 'Efeito burocrático do submundo.';
  }

  renderBossTopHUD() {
    const passiveBtn = document.getElementById('enemy-passive-badge');
    const abilityBtn = document.getElementById('enemy-ability-badge');
    if (!this.enemy) return;

    // 1. Passiva do Chefe (Símbolo Clicável)
    if (passiveBtn) {
      const pIcon = this.enemy.passiveIcon || 'assets/ui/icon_shield.svg';
      const pName = this.getBossPassiveName();
      const pDesc = this.getBossPassiveExplanation();
      passiveBtn.innerHTML = `<img src="${pIcon}" class="boss-symbol-icon" alt="${pName}">`;
      passiveBtn.title = `Passiva: ${pName} (Toque para ouvir Louis)`;
      passiveBtn.classList.toggle('phase2-enrage', !!this.enemy.phase2Triggered);

      passiveBtn.onclick = (e) => {
        if (e) e.stopPropagation();
        this.speakArrogant(pName, pDesc);
        sfx.cardDraw();
      };
    }

    // 2. Habilidade Especial do Chefe (Símbolo Clicável)
    if (abilityBtn) {
      const ability = this.enemy.specialAbility;
      if (ability) {
        const aIcon = ability.icon || 'assets/ui/icon_scroll.svg';
        const isUsed = !!this.enemy.specialAbilityUsed;
        abilityBtn.innerHTML = `
          <img src="${aIcon}" class="boss-symbol-icon" alt="${ability.name}">
          ${isUsed ? '<span class="boss-used-badge">✓</span>' : ''}
        `;
        abilityBtn.title = `Habilidade: ${ability.name}${isUsed ? ' (Já usada)' : ''} (Toque para ouvir Louis)`;
        abilityBtn.classList.toggle('ability-used', isUsed);
        abilityBtn.style.display = 'inline-flex';

        abilityBtn.onclick = (e) => {
          if (e) e.stopPropagation();
          if (isUsed) {
            this.speakArrogant(ability.name, 'O chefe já gastou esse golpe desonesto nesta mão! Ele não tem mais essa carta na manga!');
          } else {
            this.speakArrogant(ability.name, ability.desc);
          }
          sfx.cardDraw();
        };
      } else {
        abilityBtn.style.display = 'none';
      }
    }
  }

  updateUI() {
    document.getElementById('player-name').textContent = this.player.name;
    document.getElementById('player-gold').textContent = this.player.gold;

    // 1. Atualiza as Barras em 3 Blocos Equivalentes às Rodadas (1/3, 2/3, 3/3) — Sem numeração de HP!
    const playerWins = this.vazaResults.filter(x => x === 'win').length;
    const enemyWins = this.vazaResults.filter(x => x === 'loss').length;

    const pText = document.getElementById('player-hp-text');
    if (pText) pText.textContent = `${playerWins}/3`;
    const eText = document.getElementById('enemy-hp-text');
    if (eText) eText.textContent = `${enemyWins}/3`;

    const pFill = document.getElementById('player-hp-fill');
    if (pFill) pFill.style.width = '0%';
    const eFill = document.getElementById('enemy-hp-fill');
    if (eFill) eFill.style.width = '0%';

    const pBlocks = document.querySelectorAll('#player-round-blocks .round-block-cell');
    pBlocks.forEach((cell, idx) => {
      cell.className = 'round-block-cell';
      if (idx < playerWins) cell.classList.add('block-won-player');
      else if (this.vazaResults[idx] === 'tie') cell.classList.add('block-tie');
    });

    const eBlocks = document.querySelectorAll('#enemy-round-blocks .round-block-cell');
    eBlocks.forEach((cell, idx) => {
      cell.className = 'round-block-cell';
      if (idx < enemyWins) cell.classList.add('block-won-enemy');
      else if (this.vazaResults[idx] === 'tie') cell.classList.add('block-tie');
    });

    // 2. Atualiza o Placar de Tentos da Partida (0 / 12)
    const pTentosEl = document.getElementById('player-tentos-val');
    if (pTentosEl) pTentosEl.textContent = this.playerTentos;
    const eTentosEl = document.getElementById('enemy-tentos-val');
    if (eTentosEl) eTentosEl.textContent = this.enemyTentos;

    this.renderRelicsBar();
    this.renderTrucoHUD();

    document.getElementById('enemy-name').textContent = this.enemy.luizName;
    document.getElementById('enemy-subname').textContent = `(${this.enemy.realName})`;

    this.renderBossTopHUD();

    const playerPassiveEl = document.getElementById('player-passive-tag');
    if (playerPassiveEl && !playerPassiveEl.dataset.bound) {
      playerPassiveEl.dataset.bound = 'true';
      this.bindSafeTap(playerPassiveEl, () => {
        this.speakArrogant(
          'Sorte de Nascença',
          'Berço de ouro! Minha carta especial Suborno Real Beznoir tem probabilidade estatística aumentada em +40% de vir na mão!'
        );
        sfx.cardDraw();
      });
    }

    const enemyImg = document.getElementById('enemy-sprite-idle') || document.getElementById('enemy-avatar-img');
    const enemyAttackImg = document.getElementById('enemy-sprite-attack');
    const enemyHurtImg = document.getElementById('enemy-sprite-hurt');
    const enemyFallback = document.getElementById('enemy-avatar-fallback');
    if (enemyImg && this.enemy && this.enemy.image) {
      enemyImg.src = this.enemy.image;
      if (enemyAttackImg) {
        enemyAttackImg.src = this.enemy.image;
        enemyAttackImg.style.display = 'none';
      }
      if (enemyHurtImg) {
        enemyHurtImg.src = this.enemy.image;
        enemyHurtImg.style.display = 'none';
      }
      if (enemyFallback) enemyFallback.style.display = 'none';
      enemyImg.style.display = 'block';
    } else if (enemyFallback) {
      if (enemyImg) enemyImg.style.display = 'none';
      enemyFallback.innerHTML = `<img src="${this.enemy.avatar || 'assets/ui/icon_skull.svg'}" class="inline-ui-art" alt="">`;
      enemyFallback.style.display = 'block';
    }

    const intentIconEl = document.getElementById('intent-icon');
    if (intentIconEl) {
      intentIconEl.innerHTML = `<img src="${this.enemy.intent.icon || 'assets/ui/icon_sword.svg'}" class="intent-art-icon" alt="">`;
    }
    const intentDescEl = document.getElementById('intent-desc');
    if (intentDescEl) intentDescEl.textContent = this.enemy.intent.desc;

    document.getElementById('draw-pile-count').textContent = this.tableDeck ? this.tableDeck.length : 0;
    document.getElementById('discard-pile-count').textContent = this.discardPile ? this.discardPile.length : 0;

    this.renderHand();
  }

  renderStatusBadges() {}

  // Gera os Pips Clássicos de Baralho para as cartas numeradas (2, 3, 4, 5, 6, 7)
  buildNumberCardPipsHTML(rank, suit) {
    const count = parseInt(rank, 10) || 4;
    let pips = '';
    for (let i = 0; i < count; i++) {
      const spanCenter = ((count === 5 || count === 7) && i === Math.floor(count / 2)) ? 'pip-center-span' : '';
      pips += `<img src="${suit.svg}" class="pip-suit-item ${spanCenter}" alt="${suit.name}">`;
    }
    return `<div class="playing-card-pips-grid pips-count-${count}">${pips}</div>`;
  }

  // Renderiza as Cartas Limpas do Baralho Clássico (Sem caixa de texto poluída!)
  renderHand() {
    const container = document.getElementById('cards-hand');
    if (!container) return;
    container.innerHTML = '';

    this.hand.forEach((card, index) => {
      if (!card) return;

      const suit = card.suit || TRUCO_SUITS[0];
      const isManilha = this.isCardManilha(card);
      const isSpecial = Boolean(card.isSpecialProtagonist);
      const isSelected = this.selectedCardIndex === index;

      const cardEl = document.createElement('div');
      cardEl.className = `game-card playing-card-clean ${suit.isRed ? 'suit-red' : 'suit-dark'} ${isManilha ? 'manilha-card' : ''} ${isSpecial ? 'protagonist-special-card' : ''} ${isSelected ? 'is-selected' : ''}`;
      cardEl.dataset.index = index;

      const total = this.hand.length;
      const center = (total - 1) / 2;
      const diff = index - center;
      const rot = (diff * 4.8).toFixed(1);
      const offsetY = (Math.abs(diff) * 3.8).toFixed(1);
      cardEl.style.setProperty('--card-rot', `${rot}deg`);
      cardEl.style.setProperty('--card-y', `${offsetY}px`);
      cardEl.style.setProperty('--card-z', index + 1);

      // Centro da carta: Figuras Ilustradas (A, J, Q, K, ★) OU Pips Clássicos para Números (2, 3, 4, 5, 6, 7)
      const centerArtHTML = card.art
        ? `<img src="${card.art}" class="card-art-fullbleed" alt="${card.rank}">`
        : this.buildNumberCardPipsHTML(card.rank, suit);

      // Selo minimalista apenas se for MANILHA da rodada ou a Carta Especial do Protagonista
      let badgeHTML = '';
      if (isSpecial) {
        badgeHTML = `<div class="clean-card-badge badge-special">★ SUBORNO REAL</div>`;
      } else if (isManilha) {
        badgeHTML = `<div class="clean-card-badge">${suit.manilhaTitle}</div>`;
      }

      cardEl.innerHTML = `
        <div class="playing-card-corner top-left">
          <span class="corner-rank">${card.rank}</span>
          <img src="${suit.svg}" class="corner-suit-svg" alt="${suit.name}">
        </div>
        ${centerArtHTML}
        <div class="playing-card-corner bottom-right">
          <span class="corner-rank">${card.rank}</span>
          <img src="${suit.svg}" class="corner-suit-svg" alt="${suit.name}">
        </div>
        ${badgeHTML}
      `;

      this.bindCardEvents(cardEl, index);
      container.appendChild(cardEl);
    });
  }

  bindCardEvents(cardEl, index) {
    let startX = 0, startY = 0;
    let hasMoved = false;

    const onPointerDown = (e) => {
      startX = e.clientX;
      startY = e.clientY;
      hasMoved = false;
      this.isDragging = true;
      this.draggedCardIndex = index;
      this.triggerHaptic([15]);
      cardEl.classList.add('active-touch');
      try {
        cardEl.setPointerCapture(e.pointerId);
      } catch (err) {}
    };

    const onPointerMove = (e) => {
      if (!this.isDragging || this.draggedCardIndex !== index) return;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      if (Math.abs(deltaY) > 10 || Math.abs(deltaX) > 10) {
        hasMoved = true;
      }
    };

    const onPointerUp = (e) => {
      if (!this.isDragging || this.draggedCardIndex !== index) return;
      this.isDragging = false;
      cardEl.classList.remove('active-touch');
      try {
        cardEl.releasePointerCapture(e.pointerId);
      } catch (err) {}

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      // Arrastar para cima joga a carta na mesa imediatamente!
      if (hasMoved && deltaY < -55 && Math.abs(deltaY) > Math.abs(deltaX)) {
        this.playCard(index);
      } else if (!hasMoved) {
        // Se a carta já estiver selecionada para inspeção, o toque joga ela!
        // Caso contrário, seleciona para inspeção e exibe os detalhes no banner!
        if (this.selectedCardIndex === index) {
          this.playCard(index);
        } else {
          this.selectCardForInspection(index);
        }
      }

      this.draggedCardIndex = null;
      this.dragHoverCardIndex = null;
    };

    cardEl.addEventListener('pointerdown', onPointerDown);
    cardEl.addEventListener('pointermove', onPointerMove);
    cardEl.addEventListener('pointerup', onPointerUp);
    cardEl.addEventListener('pointercancel', onPointerUp);
  }
}

// Inicialização Global
window.addEventListener('DOMContentLoaded', () => {
  const game = new GameState();
  window.game = game;
  game.init();

  // =========================================================================
  // TELA INICIAL (TITLE SCREEN) -> ABRE SELEÇÃO DE TESE DE INVESTIMENTO
  // =========================================================================
  const titleModal = document.getElementById('title-screen-modal');
  const btnStartGame = document.getElementById('btn-start-game');
  const btnTitlePrologue = document.getElementById('btn-title-prologue');

  if (btnStartGame && titleModal) {
    const startGameHandler = (e) => {
      if (e && e.type === 'touchend') e.preventDefault();
      titleModal.classList.add('hidden');
      sfx.swordSlash();
      game.openArchetypeModal();
    };
    btnStartGame.addEventListener('click', startGameHandler);
    btnStartGame.addEventListener('touchend', startGameHandler);
  }

  // Botão Principal de GRITAR TRUCO / SEIS / NOVE / DOZE
  const btnTrucoCall = document.getElementById('btn-end-turn');
  if (btnTrucoCall) {
    btnTrucoCall.addEventListener('click', () => {
      game.selectedCardIndex = null;
      game.callPlayerTruco();
    });
  }

  // Botão de CORRER da mão atual
  const btnFoldHand = document.getElementById('btn-fold-hand');
  if (btnFoldHand) {
    btnFoldHand.addEventListener('click', () => {
      game.selectedCardIndex = null;
      game.foldHand();
    });
  }

  // Botões do Modal de Desafio de Truco do Chefe
  const btnTrucoAccept = document.getElementById('btn-truco-accept');
  const btnTrucoCounter = document.getElementById('btn-truco-counter');
  const btnTrucoFold = document.getElementById('btn-truco-fold');

  if (btnTrucoAccept) {
    btnTrucoAccept.addEventListener('click', () => game.acceptEnemyTruco());
  }
  if (btnTrucoCounter) {
    btnTrucoCounter.addEventListener('click', () => game.counterEnemyTruco());
  }
  if (btnTrucoFold) {
    btnTrucoFold.addEventListener('click', () => game.foldHand());
  }

  document.getElementById('btn-restart').addEventListener('click', () => {
    game.restart();
  });

  // Toque fora das cartas desseleciona a carta ampliada
  document.addEventListener('pointerdown', (e) => {
    if (!e.target.closest('#cards-hand') && window.game && window.game.selectedCardIndex !== null) {
      window.game.selectedCardIndex = null;
      window.game.renderHand();
    }
  });

  // =========================================================================
  // SISTEMA DE LEITOR DE HQ (COMIC VIEWER — DESBLOQUEIO PROGRESSIVO)
  // =========================================================================
  const ALL_COMIC_CHAPTERS = [
    {
      title: 'Prólogo — Cena I: A Riviera Francesa',
      caption: '"Louis desfrutava de seu espumante biodinâmico de 4.000 euros, discutindo acaloradamente sobre a temperatura ideal das ostras da Normandia..."',
      image: 'assets/comic/comic_prologue_panel_1.png',
      minRoom: 1
    },
    {
      title: 'Prólogo — Cena II: O Incidente de Compliance',
      caption: '"Um segundo de distração... um engasgo fútil e estúpido! O champanhe voou pelo ar, encerrando uma carreira bilionária de networking."',
      image: 'assets/comic/comic_prologue_panel_2.png',
      minRoom: 1
    },
    {
      title: 'Prólogo — Cena III: O Despertar no Inferno',
      caption: '"Acordando nas pedras cinzentas do Aqueronte, Louis ficou chocado: suas roupas italianas sumiram, substituídas por uma túnica grega! \'Onde fica o RH disso aqui?!\'"',
      image: 'assets/comic/comic_prologue_panel_3.png',
      minRoom: 1
    },
    {
      title: 'Câmara II — Parte 1: A Catraca do Limbo',
      caption: '"Louis achou que podia dar gorjeta na catraca do submundo: \'Cobrem da conta do meu pai, gentileza...\'"',
      image: 'assets/comic/comic_transition_1_2_panel1.png?v=32',
      minRoom: 2
    },
    {
      title: 'Câmara II — Parte 2: O Choque Burocrático',
      caption: '"A Recepcionista do Limbo atira uma montanha de processos em chamas: \'NÃO ATENDEMOS SEM AGENDAMENTO! SENHA 9.999!\'"',
      image: 'assets/comic/comic_transition_1_2_panel2.png?v=32',
      minRoom: 2
    },
    {
      title: 'Câmara III — Parte 1: Os Portões do Cócito',
      caption: '"Louis tentando furar a fila do controle de acesso: \'Liberem a catraca VIP. Meu pai é acionista majoritário desta dimensão.\'"',
      image: 'assets/comic/comic_transition_2_3_panel1.png?v=32',
      minRoom: 3
    },
    {
      title: 'Câmara III — Parte 2: A Barreira Intransigente',
      caption: '"O Gárgula colossal bloqueia o caminho: \'O PROTOCOLO É ABSOLUTO. SEM EXCEÇÕES.\'"',
      image: 'assets/comic/comic_transition_2_3_panel2.png?v=32',
      minRoom: 3
    },
    {
      title: 'Câmara IV — Parte 1: O Tribunal de Minos',
      caption: '"Louis adentra o salão do Tribunal de Minos cheio de confiança: \'OUTSTANDING! Meus advogados resolvem isso em 5 minutos!\'"',
      image: 'assets/comic/comic_transition_3_4_panel1.png?v=32',
      minRoom: 4
    },
    {
      title: 'Câmara IV — Parte 2: O Veredito Implacável',
      caption: '"Rei Minos bate o malhete de ouro: \'RECURSO INDEFERIDO! MULTA POR LITIGÂNCIA DE MÁ-FÉ!\'"',
      image: 'assets/comic/comic_transition_3_4_panel2.png?v=32',
      minRoom: 4
    },
    {
      title: 'Câmara V — Parte 1: O Gabinete Executivo',
      caption: '"Louis escancara as portas duplas da presidência: \'FINALLY! Vim exigir o estorno imediato da minha morte!\'"',
      image: 'assets/comic/comic_transition_4_5_panel1.png?v=32',
      minRoom: 5
    },
    {
      title: 'Câmara V — Parte 2: O Confronto com Hades',
      caption: '"Hades ergue seu Bidente em chamas: \'ESTORNO NEGADO, GAROTO! AQUI VOCÊ É SÓ MAIS UM PASSIVO NO MEU BALANÇO!\'"',
      image: 'assets/comic/comic_transition_4_5_panel2.png?v=32',
      minRoom: 5
    },
    {
      title: 'Epílogo — O Novo CEO do Submundo',
      caption: '"Flawless acquisition! Louis Beznoir IV assume o Trono de Obsidiana enquanto os deuses riem da derrota de Hades!"',
      image: 'assets/comic/ending_victory_throne.png?v=32',
      minRoom: 5,
      requiresVictory: true,
      isVertical: true
    }
  ];

  function getUnlockedComics() {
    if (game.hasBeatenGame) {
      return ALL_COMIC_CHAPTERS;
    }
    const maxRoom = game.maxUnlockedRoom || 1;
    return ALL_COMIC_CHAPTERS.filter(ch => !ch.requiresVictory && ch.minRoom <= maxRoom);
  }

  let currentComicIndex = 0;
  const comicModal = document.getElementById('comic-modal');
  const comicPanelContainer = document.getElementById('comic-panel-container');
  const comicImg = document.getElementById('comic-panel-img');
  const comicTitle = document.getElementById('comic-caption-title');
  const comicText = document.getElementById('comic-caption-text');
  const comicDotsBar = document.getElementById('comic-dots-bar');
  const comicHeaderTag = document.querySelector('#comic-modal .comic-chapter-tag');
  const prevBtn = document.getElementById('comic-prev-btn');
  const nextBtn = document.getElementById('comic-next-btn');

  function renderComicDots() {
    const unlocked = getUnlockedComics();
    comicDotsBar.innerHTML = '';
    unlocked.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `comic-dot ${idx === currentComicIndex ? 'active' : ''}`;
      dot.addEventListener('click', () => showComicSlide(idx));
      comicDotsBar.appendChild(dot);
    });
  }

  function showComicSlide(idx) {
    const unlocked = getUnlockedComics();
    if (idx < 0 || idx >= unlocked.length) return;
    currentComicIndex = idx;
    const slide = unlocked[idx];

    if (comicHeaderTag) {
      comicHeaderTag.innerHTML = `<img src="assets/ui/icon_scroll.svg" class="inline-ui-art" alt=""> MEMÓRIAS DE LOUIS (${idx + 1}/${unlocked.length})`;
    }

    if (comicPanelContainer) {
      comicPanelContainer.classList.toggle('vertical-epilogue-panel', !!slide.isVertical);
    }

    comicImg.style.opacity = '0';
    setTimeout(() => {
      comicImg.src = slide.image;
      comicImg.style.opacity = '1';
    }, 150);

    comicTitle.textContent = slide.title;
    comicText.textContent = slide.caption;

    prevBtn.disabled = currentComicIndex === 0;
    nextBtn.textContent = currentComicIndex === unlocked.length - 1 ? 'Concluir ✓' : 'Próximo ▶';

    renderComicDots();
  }

  function openComicViewer() {
    comicModal.classList.remove('hidden');
    showComicSlide(0);
  }

  function closeComicViewer() {
    comicModal.classList.add('hidden');
  }

  const openBtn = document.getElementById('btn-open-comic');
  const closeBtn = document.getElementById('btn-close-comic');

  if (openBtn) {
    const handleOpen = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      openComicViewer();
    };
    openBtn.addEventListener('click', handleOpen);
    openBtn.addEventListener('touchend', handleOpen);
  }

  if (btnTitlePrologue) {
    const handleTitlePrologue = (e) => {
      if (e && e.type === 'touchend') e.preventDefault();
      openComicViewer();
    };
    btnTitlePrologue.addEventListener('click', handleTitlePrologue);
    btnTitlePrologue.addEventListener('touchend', handleTitlePrologue);
  }

  if (closeBtn) {
    const handleClose = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      closeComicViewer();
    };
    closeBtn.addEventListener('click', handleClose);
    closeBtn.addEventListener('touchend', handleClose);
  }

  prevBtn.addEventListener('click', () => {
    if (currentComicIndex > 0) showComicSlide(currentComicIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    const unlocked = getUnlockedComics();
    if (currentComicIndex < unlocked.length - 1) {
      showComicSlide(currentComicIndex + 1);
    } else {
      closeComicViewer();
    }
  });

  // Swipe touch navigation na HQ
  let comicTouchStartX = 0;
  comicModal.addEventListener('touchstart', (e) => {
    comicTouchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  comicModal.addEventListener('touchend', (e) => {
    const unlocked = getUnlockedComics();
    const deltaX = e.changedTouches[0].clientX - comicTouchStartX;
    if (deltaX < -50 && currentComicIndex < unlocked.length - 1) {
      showComicSlide(currentComicIndex + 1);
    } else if (deltaX > 50 && currentComicIndex > 0) {
      showComicSlide(currentComicIndex - 1);
    }
  }, { passive: true });

  // =========================================================================
  // SISTEMA DO MAPA DE AUDITORIA DO SUBMUNDO (UNDERWORLD MAP)
  // =========================================================================
  const btnOpenMap = document.getElementById('btn-open-map');
  const btnCloseMap = document.getElementById('btn-close-map');
  const mapBtnCloseBottom = document.getElementById('map-btn-close-bottom');
  const mapBtnProceed = document.getElementById('map-btn-proceed');

  function routeRoomTransition() {
    if (game.roomNumber === 2) {
      game.openInterstitialComic('1_2');
    } else if (game.roomNumber === 3) {
      game.openInterstitialComic('2_3');
    } else if (game.roomNumber === 4) {
      game.openInterstitialComic('3_4');
    } else if (game.roomNumber === 5) {
      game.openInterstitialComic('4_5');
    } else {
      game.triggerPhaseTransition();
    }
  }

  if (btnOpenMap) {
    const handleOpenMap = (e) => {
      if (e && e.type === 'touchend') e.preventDefault();
      game.openUnderworldMap(false);
    };
    btnOpenMap.addEventListener('click', handleOpenMap);
    btnOpenMap.addEventListener('touchend', handleOpenMap);
  }

  if (btnCloseMap) {
    const handleCloseMap = (e) => {
      if (e && e.type === 'touchend') e.preventDefault();
      if (game.isMapInTransition) {
        game.closeUnderworldMap();
        routeRoomTransition();
      } else {
        game.closeUnderworldMap();
      }
    };
    btnCloseMap.addEventListener('click', handleCloseMap);
    btnCloseMap.addEventListener('touchend', handleCloseMap);
  }

  if (mapBtnCloseBottom) {
    const handleCloseBottom = (e) => {
      if (e && e.type === 'touchend') e.preventDefault();
      if (game.isMapInTransition) {
        game.closeUnderworldMap();
        routeRoomTransition();
      } else {
        game.closeUnderworldMap();
      }
    };
    mapBtnCloseBottom.addEventListener('click', handleCloseBottom);
    mapBtnCloseBottom.addEventListener('touchend', handleCloseBottom);
  }

  if (mapBtnProceed) {
    let proceedLocked = false;
    const handleProceed = (e) => {
      if (e && e.type === 'touchend') e.preventDefault();
      if (proceedLocked) return;
      proceedLocked = true;
      setTimeout(() => { proceedLocked = false; }, 600);

      game.closeUnderworldMap();
      routeRoomTransition();
    };
    mapBtnProceed.addEventListener('click', handleProceed);
    mapBtnProceed.addEventListener('touchend', handleProceed);
  }

  // =========================================================================
  // SISTEMA DE TIRINHA CÔMICA INTERSTICIAL (ENTRE FASES - 2 SLIDES)
  // =========================================================================
  const btnInterstitialContinue = document.getElementById('btn-interstitial-continue');
  if (btnInterstitialContinue) {
    let continueLocked = false;
    const handleContinue = (e) => {
      if (e && e.type === 'touchend') e.preventDefault();
      if (continueLocked) return;
      continueLocked = true;
      setTimeout(() => { continueLocked = false; }, 400);

      game.advanceInterstitialSlide();
    };
    btnInterstitialContinue.addEventListener('click', handleContinue);
    btnInterstitialContinue.addEventListener('touchend', handleContinue);
  }

  const interstitialDots = document.querySelectorAll('#interstitial-dots .comic-dot');
  interstitialDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      game.interstitialSlideIndex = idx;
      game.renderInterstitialSlide();
    });
  });

  // Fechamento de tooltip de status ao clicar fora
  document.addEventListener('click', (e) => {
    const tooltip = document.getElementById('status-tooltip');
    if (tooltip && !e.target.closest('#enemy-status-container')) {
      tooltip.classList.add('hidden');
    }
  });

  // Toque ou clique no overlay de transição para pular imediatamente caso desejado
  const phaseOverlay = document.getElementById('phase-transition-overlay');
  if (phaseOverlay) {
    phaseOverlay.addEventListener('click', () => {
      phaseOverlay.classList.add('hidden');
    });
  }
});
