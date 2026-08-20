/* ============================================================================
   Juriscan — dados fictícios (mock)
   Nenhum dado real. Perfis, nomes e comentários são inventados para demonstração.
   A IA nunca afirma crime — apenas "possível", "potencial", "indício",
   "necessita validação jurídica".
   ============================================================================ */

// ---- Escala de Risco Reputacional (fonte da verdade) ---------------------
export const FAIXAS = [
  { min: 0,  max: 20,  nome: 'Baixo',    cor: '#30A46C', desc: 'Presença digital saudável.' },
  { min: 21, max: 40,  nome: 'Moderado', cor: '#66A80F', desc: 'Ruído dentro do esperado.' },
  { min: 41, max: 60,  nome: 'Atenção',  cor: '#F5A623', desc: 'Padrões que pedem acompanhamento.' },
  { min: 61, max: 80,  nome: 'Alto',     cor: '#F76808', desc: 'Ataques relevantes e recorrentes.' },
  { min: 81, max: 100, nome: 'Crítico',  cor: '#E5484D', desc: 'Indícios fortes e coordenados.' },
];

export function faixaDe(score) {
  return FAIXAS.find((f) => score >= f.min && score <= f.max) ?? FAIXAS[0];
}

// ---- Categorias de classificação -----------------------------------------
// "flag: true"  -> possível ilícito (entra no funil de revisão)
// "flag: false" -> contexto legítimo (mostrado para dar credibilidade ao funil)
export const CATEGORIAS = [
  { id: 'injuria',    nome: 'Possível Injúria',    curto: 'Injúria',       artigo: 'Art. 140', cor: '#E5484D', flag: true,  qtd: 44 },
  { id: 'difamacao',  nome: 'Possível Difamação',  curto: 'Difamação',     artigo: 'Art. 139', cor: '#F76808', flag: true,  qtd: 29 },
  { id: 'calunia',    nome: 'Possível Calúnia',    curto: 'Calúnia',       artigo: 'Art. 138', cor: '#D6409F', flag: true,  qtd: 12 },
  { id: 'humilhacao', nome: 'Humilhação',          curto: 'Humilhação',    artigo: '—',        cor: '#E5533C', flag: true,  qtd: 18 },
  { id: 'ataque',     nome: 'Ataque Pessoal',      curto: 'Ataque pessoal',artigo: '—',        cor: '#F5A623', flag: true,  qtd: 16 },
  { id: 'odio',       nome: 'Discurso de Ódio',    curto: 'Discurso de ódio',artigo: '—',      cor: '#A21CAF', flag: true,  qtd: 9  },
  { id: 'politica',   nome: 'Crítica Política',    curto: 'Crítica política',artigo: '—',      cor: '#6E56CF', flag: false, qtd: 214 },
  { id: 'legitima',   nome: 'Crítica Legítima',    curto: 'Crítica legítima',artigo: '—',      cor: '#30A46C', flag: false, qtd: 156 },
];

export const catById = Object.fromEntries(CATEGORIAS.map((c) => [c.id, c]));
export const TOTAL_RELEVANTES = CATEGORIAS.filter((c) => c.flag).reduce((s, c) => s + c.qtd, 0); // 128

// ---- Redes sociais ---------------------------------------------------------
export const REDES = {
  instagram: { nome: 'Instagram', cor: '#E1306C', ativa: true },
};

// ---- Etapas da varredura (loading) ----------------------------------------
export const ETAPAS = [
  'Conectando à rede social',
  'Localizando perfil',
  'Coletando comentários',
  'Analisando padrões',
  'Classificando comentários',
  'Calculando score reputacional',
  'Gerando relatório',
];

// ---- Perfil analisado (fictício) ------------------------------------------
export const PERFIL = {
  nome: 'Prefeito Adriano',
  handle: 'prefeito.adriano',
  redes: ['instagram'],
  periodo: '90 dias',
  score: 87, // Crítico (81–100), conforme a escala FAIXAS
  totalAnalisados: 4382,
  relevantes: TOTAL_RELEVANTES, // 128
  recorrentes: 17,
  prioritarios: 4,
};

// ---- Evolução dos ataques (12 semanas) ------------------------------------
export const EVOLUCAO = [
  { semana: 'S1', valor: 3 },  { semana: 'S2', valor: 5 },  { semana: 'S3', valor: 4 },
  { semana: 'S4', valor: 7 },  { semana: 'S5', valor: 6 },  { semana: 'S6', valor: 9 },
  { semana: 'S7', valor: 8 },  { semana: 'S8', valor: 12 }, { semana: 'S9', valor: 14 },
  { semana: 'S10', valor: 13 }, { semana: 'S11', valor: 19 }, { semana: 'S12', valor: 28 },
];

// ---- Ranking de ofensores (fictícios) -------------------------------------
export const OFENSORES = [
  { handle: 'mari.santos.oficial', rede: 'instagram', ataques: 28, score: 95, prioritario: true,  primeira: '2026-05-12', ultima: '2026-08-07', ultimo: 'Esse aí é ladrão descarado, todo mundo sabe que desviou a merenda.' },
  { handle: 'jc_verdade_2024',     rede: 'instagram',  ataques: 21, score: 91, prioritario: true,  primeira: '2026-05-20', ultima: '2026-08-06', ultimo: 'Corrupto safado, devia estar preso e não na prefeitura.' },
  { handle: 'portal.cidade.livre', rede: 'instagram', ataques: 17, score: 88, prioritario: true,  primeira: '2026-06-01', ultima: '2026-08-05', ultimo: 'Sabemos que ele mandou fraudar a licitação, tem prova.' },
  { handle: 'anon_zx2024',         rede: 'instagram',    ataques: 14, score: 84, prioritario: true,  primeira: '2026-06-10', ultima: '2026-08-04', ultimo: 'Que nojo desse homem, um lixo de pessoa, não merece respeito.' },
  { handle: 'lucas.debate',        rede: 'instagram', ataques: 9,  score: 71, prioritario: false, primeira: '2026-06-15', ultima: '2026-08-01', ultimo: 'Incompetente, não entregou uma obra sequer no prazo.' },
  { handle: 'contadora_flavia',    rede: 'instagram',  ataques: 7,  score: 64, prioritario: false, primeira: '2026-06-22', ultima: '2026-07-28', ultimo: 'Palhaço, vergonha pra cidade inteira.' },
  { handle: 'zeca.opina',          rede: 'instagram',    ataques: 5,  score: 52, prioritario: false, primeira: '2026-07-02', ultima: '2026-07-25', ultimo: 'Só sabe aparecer em foto, trabalhar que é bom nada.' },
  { handle: 'renata_news',         rede: 'instagram', ataques: 4,  score: 47, prioritario: false, primeira: '2026-07-05', ultima: '2026-07-20', ultimo: 'Mais um mandato jogado fora, lamentável.' },
  { handle: 'paulo.cidadao',       rede: 'instagram',  ataques: 3,  score: 38, prioritario: false, primeira: '2026-07-10', ultima: '2026-07-18', ultimo: 'Discordo totalmente da política de transporte dele.' },
];

// ---- Comentários (fictícios, variados) ------------------------------------
// categoria referencia CATEGORIAS.id ; confianca em % ; status inicial 'novo'
export const COMENTARIOS = [
  { id: 1,  autor: 'mari.santos.oficial', rede: 'instagram', data: '2026-08-07T14:22:00', likes: 42, categoria: 'calunia',    confianca: 92, texto: 'Esse aí é ladrão descarado, todo mundo sabe que desviou a merenda da escola.', obs: 'Imputa fato definido como crime (peculato) de forma direta. Indício de possível calúnia — necessita validação jurídica.' },
  { id: 2,  autor: 'jc_verdade_2024',     rede: 'instagram',  data: '2026-08-06T09:10:00', likes: 18, categoria: 'injuria',    confianca: 88, texto: 'Corrupto safado, devia estar preso e não na prefeitura.', obs: 'Ofensa direta à dignidade + imputação genérica. Potencial injúria com teor de calúnia — sugere-se análise do advogado.' },
  { id: 3,  autor: 'portal.cidade.livre', rede: 'instagram', data: '2026-08-05T20:41:00', likes: 130, categoria: 'calunia',   confianca: 90, texto: 'Sabemos que ele mandou fraudar a licitação, tem prova disso circulando.', obs: 'Afirmação de fato criminoso específico. Indício de calúnia — validar veracidade e autoria.' },
  { id: 4,  autor: 'anon_zx2024',         rede: 'instagram',    data: '2026-08-04T18:05:00', likes: 7,  categoria: 'odio',       confianca: 81, texto: 'Que nojo desse homem, um lixo de pessoa, não merece nem respirar.', obs: 'Teor de ódio e desumanização. Necessita validação — possível ultrapasse do limite da crítica.' },
  { id: 5,  autor: 'contadora_flavia',    rede: 'instagram',  data: '2026-07-28T11:33:00', likes: 25, categoria: 'humilhacao', confianca: 76, texto: 'Palhaço, vergonha pra cidade inteira, ninguém aguenta mais essa figura.', obs: 'Expressão vexatória. Potencial injúria/humilhação — sugere-se validação.' },
  { id: 6,  autor: 'lucas.debate',        rede: 'instagram', data: '2026-08-01T08:12:00', likes: 61, categoria: 'difamacao',  confianca: 69, texto: 'Não entregou uma obra sequer no prazo, o posto de saúde está parado há 2 anos.', obs: 'Imputa fato ofensivo à reputação. Fronteira entre crítica dura e possível difamação — necessita validação.' },
  { id: 7,  autor: 'zeca.opina',          rede: 'instagram',    data: '2026-07-25T22:47:00', likes: 3,  categoria: 'ataque',     confianca: 72, texto: 'Só sabe aparecer em foto, trabalhar que é bom nada, preguiçoso.', obs: 'Ataque pessoal com juízo depreciativo. Possível injúria de menor gravidade — validar.' },
  { id: 8,  autor: 'renata_news',         rede: 'instagram', data: '2026-07-20T16:20:00', likes: 12, categoria: 'ataque',     confianca: 58, texto: 'Mais um mandato jogado fora, esse povo não aprende a votar mesmo.', obs: 'Crítica com tom ofensivo difuso — provavelmente crítica protegida; necessita validação.' },
  { id: 9,  autor: 'paulo.cidadao',       rede: 'instagram',  data: '2026-07-18T13:00:00', likes: 9,  categoria: 'politica',   confianca: 94, texto: 'Discordo totalmente da política de transporte dele, prometeu e não cumpriu.', obs: 'Crítica política legítima a agente público. Não configura ilícito — mantido apenas como contexto.' },
  { id: 10, autor: 'ana.professora',      rede: 'instagram', data: '2026-07-15T10:05:00', likes: 34, categoria: 'legitima',   confianca: 96, texto: 'Fui na audiência pública e questionei o orçamento da educação. Precisamos de transparência.', obs: 'Manifestação legítima. Não configura ilícito — contexto.' },
  { id: 11, autor: 'mari.santos.oficial', rede: 'instagram', data: '2026-07-30T19:14:00', likes: 55, categoria: 'injuria',    confianca: 85, texto: 'Cara de pau, mentiroso profissional, não passa de um picareta.', obs: 'Sequência de ofensas à honra subjetiva. Potencial injúria — recorrência do mesmo autor.' },
  { id: 12, autor: 'jc_verdade_2024',     rede: 'instagram',  data: '2026-07-29T07:55:00', likes: 21, categoria: 'difamacao',  confianca: 79, texto: 'Ele usa o carro da prefeitura pra passeio da família no fim de semana.', obs: 'Imputa conduta específica que atinge a reputação. Possível difamação — validar veracidade.' },
  { id: 13, autor: 'portal.cidade.livre', rede: 'instagram', data: '2026-08-02T21:30:00', likes: 88, categoria: 'humilhacao', confianca: 74, texto: 'Olha a barriga desse vagabundo, come do dinheiro público e ainda desfila.', obs: 'Ofensa estética + acusação difusa. Potencial injúria/humilhação — sugere-se análise.' },
  { id: 14, autor: 'anon_zx2024',         rede: 'instagram',    data: '2026-08-03T15:48:00', likes: 4,  categoria: 'odio',       confianca: 83, texto: 'Gente como ele tinha que sumir do mapa, escória.', obs: 'Teor de ódio com possível ameaça velada. Necessita validação jurídica prioritária.' },
  { id: 15, autor: 'lucas.debate',        rede: 'instagram', data: '2026-07-22T12:41:00', likes: 17, categoria: 'politica',   confianca: 91, texto: 'A gestão da saúde piorou, os números do próprio painel mostram isso.', obs: 'Crítica embasada em dado público. Não configura ilícito — contexto.' },
  { id: 16, autor: 'renata_news',         rede: 'instagram', data: '2026-07-19T09:23:00', likes: 6,  categoria: 'ataque',     confianca: 63, texto: 'Incompetente, não serve nem pra vereador quanto mais prefeito.', obs: 'Juízo depreciativo. Fronteira com crítica dura; necessita validação.' },
  { id: 17, autor: 'contadora_flavia',    rede: 'instagram',  data: '2026-07-26T18:02:00', likes: 30, categoria: 'difamacao',  confianca: 70, texto: 'Contrata só os amigos, a prefeitura virou cabide de emprego da turma dele.', obs: 'Imputa favorecimento. Possível difamação — necessita validação.' },
  { id: 18, autor: 'joao.neutro',         rede: 'instagram',    data: '2026-07-14T11:11:00', likes: 2,  categoria: 'legitima',   confianca: 89, texto: 'Alguém sabe o horário de atendimento da secretaria de obras?', obs: 'Comentário neutro/pergunta. Não configura ilícito — contexto.' },
  { id: 19, autor: 'mari.santos.oficial', rede: 'instagram', data: '2026-08-07T14:25:00', likes: 12, categoria: 'calunia',    confianca: 87, texto: 'Ele lava dinheiro pela empresa do cunhado, isso vai estourar.', obs: 'Imputa crime específico a terceiro relacionado. Indício de calúnia — validar.' },
  { id: 20, autor: 'zeca.opina',          rede: 'instagram',    data: '2026-07-24T20:19:00', likes: 5,  categoria: 'humilhacao', confianca: 66, texto: 'Que vergonha alheia esse discurso gaguejado, ridículo.', obs: 'Zombaria/humilhação. Possível injúria leve — sugere-se validação.' },
];

// ---- Insights da IA (nunca afirmam crime) ---------------------------------
export const INSIGHTS = [
  'A IA identificou forte recorrência de ataques concentrados em 4 usuários específicos, responsáveis por 62% dos comentários relevantes.',
  'Foi observado crescimento de +146% no volume de comentários potencialmente ofensivos nas últimas 3 semanas.',
  'Há indícios de possível campanha coordenada: 3 perfis publicam conteúdo semelhante em janelas de tempo próximas.',
  'Predomínio de possível injúria (34%) e possível difamação (23%) entre os comentários sinalizados.',
  'Nenhuma conclusão jurídica foi realizada. As classificações são probabilísticas e necessitam validação do advogado.',
];

export const SUGESTOES = [
  'Priorizar a análise dos 4 usuários recorrentes com maior score.',
  'Validar juridicamente os 12 comentários de possível calúnia (imputação de crime).',
  'Considerar notificação extrajudicial aos perfis com indício de campanha coordenada.',
  'Preservar as evidências (prints + URLs) antes de eventual remoção pelos autores.',
];

// ---- Métricas do Dashboard -------------------------------------------------
export const METRICAS = {
  varreduras: 34,
  perfis: 12,
  comentariosAnalisados: 48920,
  comentariosClassificados: 1204,
  recorrentes: 63,
  casosRevisados: 19,
};

// ---- Últimos relatórios ----------------------------------------------------
export const RELATORIOS = [
  { id: 'RPT-0034', perfil: 'Prefeito Adriano',  handle: 'prefeito.adriano',  data: '2026-08-08', score: 87, status: 'Em análise' },
  { id: 'RPT-0033', perfil: 'Dra. Helena Souza', handle: 'helena.souza.adv',  data: '2026-08-03', score: 54, status: 'Concluído' },
  { id: 'RPT-0032', perfil: 'Empresário R. Lima', handle: 'ricardo.lima.of',  data: '2026-07-27', score: 72, status: 'Em análise' },
  { id: 'RPT-0031', perfil: 'Vereadora Teixeira', handle: 'cris.teixeira13',  data: '2026-07-19', score: 33, status: 'Concluído' },
  { id: 'RPT-0030', perfil: 'Influencer B. Mota', handle: 'bruna.mota',       data: '2026-07-11', score: 61, status: 'Concluído' },
];

// ---- Perfis monitorados ----------------------------------------------------
export const PERFIS = [
  { nome: 'Prefeito Adriano',   handle: 'prefeito.adriano', redes: ['instagram'], score: 87, varreduras: 6, ultima: '2026-08-08' },
  { nome: 'Dra. Helena Souza',  handle: 'helena.souza.adv', redes: ['instagram'], score: 54, varreduras: 3, ultima: '2026-08-03' },
  { nome: 'Empresário R. Lima', handle: 'ricardo.lima.of',  redes: ['instagram'], score: 72, varreduras: 4, ultima: '2026-07-27' },
  { nome: 'Vereadora Teixeira', handle: 'cris.teixeira13',  redes: ['instagram'], score: 33, varreduras: 2, ultima: '2026-07-19' },
  { nome: 'Influencer B. Mota', handle: 'bruna.mota',       redes: ['instagram'], score: 61, varreduras: 5, ultima: '2026-07-11' },
];

// ---- Publicações analisadas (fictícias) — mais recentes primeiro -----------
// tipo: 'reel' | 'post' ; url leva à publicação para o advogado conferir.
export const POSTS = [
  { tipo: 'reel', data: '2026-08-07', comentarios: 1840, url: 'https://www.instagram.com/reel/DAdemo0aa/' },
  { tipo: 'post', data: '2026-08-05', comentarios: 962,  url: 'https://www.instagram.com/p/DAdemo0bb/' },
  { tipo: 'reel', data: '2026-08-02', comentarios: 1130, url: 'https://www.instagram.com/reel/DAdemo0cc/' },
  { tipo: 'post', data: '2026-07-28', comentarios: 540,  url: 'https://www.instagram.com/p/DAdemo0dd/' },
  { tipo: 'post', data: '2026-07-20', comentarios: 388,  url: 'https://www.instagram.com/p/DAdemo0ee/' },
  { tipo: 'reel', data: '2026-07-10', comentarios: 705,  url: 'https://www.instagram.com/reel/DAdemo0ff/' },
  { tipo: 'post', data: '2026-06-22', comentarios: 274,  url: 'https://www.instagram.com/p/DAdemo0gg/' },
  { tipo: 'reel', data: '2026-06-05', comentarios: 619,  url: 'https://www.instagram.com/reel/DAdemo0hh/' },
];

// Quantas publicações a janela cobre (para a demo refletir o período escolhido).
export const POSTS_POR_PERIODO = { '7 dias': 2, '30 dias': 5, '90 dias': 8 };
