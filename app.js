import {
  FAIXAS, faixaDe, CATEGORIAS, catById, TOTAL_RELEVANTES, REDES, ETAPAS,
  PERFIL, EVOLUCAO, OFENSORES, COMENTARIOS, INSIGHTS, SUGESTOES,
  METRICAS, RELATORIOS, PERFIS, POSTS, POSTS_POR_PERIODO,
} from './data.js?v=29';

// Categorias que mapeiam para um artigo penal (crime contra a honra).
const LEI = { calunia: 'Art. 138 · Calúnia', difamacao: 'Art. 139 · Difamação', injuria: 'Art. 140 · Injúria' };
function resumoPosts(posts) {
  const reels = posts.filter((p) => p.tipo === 'reel').length;
  const outros = posts.length - reels;
  return { total: posts.length, reels, posts: outros };
}

/* ============================================================================
   ÍCONES (inline SVG, stroke)
   ============================================================================ */
const I = {
  dashboard: '<path d="M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z"/>',
  scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M3 12h18"/>',
  report: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  profiles: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  ai: '<path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/><circle cx="12" cy="12" r="4"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  arrowUp: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  arrowRight: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  x: '<path d="M18 6L6 18M6 6l12 12"/>',
  bookmark: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  trash: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>',
  alert: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  trend: '<path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',
  file: '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M13 2v7h7"/>',
  layers: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
  spark: '<path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.5 5.7 21l2.3-7.1-6-4.5h7.6z"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  print: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z"/>',
  back: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  scale: '<path d="M12 3v18M7 7l-4 6a4 4 0 0 0 8 0zM17 7l-4 6a4 4 0 0 0 8 0zM7 7h10M5 21h14"/>',
  menu: '<path d="M3 12h18M3 6h18M3 18h18"/>',
};
const svg = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${I[name] || ''}</svg>`;

/* ============================================================================
   HELPERS
   ============================================================================ */
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => { const d = document.createElement('div'); d.textContent = s ?? ''; return d.innerHTML; };
const nf = (n) => (n ?? 0).toLocaleString('pt-BR');
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const initials = (nome) => (nome || '?').split(/[\s._]+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase();
function fmtData(iso, full = false) {
  const d = new Date(iso); if (isNaN(d)) return '—';
  return d.toLocaleDateString('pt-BR', full
    ? { day: '2-digit', month: 'short', year: 'numeric' }
    : { day: '2-digit', month: '2-digit' });
}
function fmtDataHora(iso) {
  const d = new Date(iso); if (isNaN(d)) return '—';
  return d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}
// Logos oficiais das plataformas (SVG inline, tile arredondado).
const LOGO = {
  instagram: `<svg viewBox="0 0 24 24"><defs><radialGradient id="ig-g" cx="30%" cy="107%" r="135%"><stop offset="0" stop-color="#FDF497"/><stop offset=".05" stop-color="#FDF497"/><stop offset=".45" stop-color="#FD5949"/><stop offset=".6" stop-color="#D6249F"/><stop offset=".9" stop-color="#285AEB"/></radialGradient></defs><rect width="24" height="24" rx="6" fill="url(#ig-g)"/><rect x="5" y="5" width="14" height="14" rx="4.4" fill="none" stroke="#fff" stroke-width="1.7"/><circle cx="12" cy="12" r="3.4" fill="none" stroke="#fff" stroke-width="1.7"/><circle cx="16.6" cy="7.4" r="1.15" fill="#fff"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#010101"/><g transform="translate(3.5 3.3) scale(0.72)"><path fill="#fff" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></g></svg>`,
};
const netGlyph = (id) => LOGO[id]
  ? `<span class="net-glyph">${LOGO[id]}</span>`
  : `<span class="net-glyph fallback" style="background:${REDES[id]?.cor || '#999'}">${(REDES[id]?.nome || '?')[0]}</span>`;
const netChip = (id) => `<span class="net-chip">${netGlyph(id)}${REDES[id]?.nome || id}</span>`;

/* ============================================================================
   DATASET — abstrai "de onde vêm os dados" (demo mockada OU varredura real)
   ============================================================================ */
// dataset da demo (dados fictícios do data.js)
const MOCK_DATASET = {
  real: false,
  perfil: PERFIL,
  categorias: CATEGORIAS,
  totalRelevantes: TOTAL_RELEVANTES,
  ofensores: OFENSORES,
  comentarios: COMENTARIOS,
  insights: INSIGHTS,
  sugestoes: SUGESTOES,
  posts: POSTS,
};
let current = MOCK_DATASET;      // dataset ativo na tela de Resultado / Relatório atual
let pendingScan = null;          // Promise da varredura em andamento
const statusMap = {};            // id -> 'novo' | 'seguir' | 'descartado'
const notas = {};                // id -> anotação do advogado
function resetStatus(ds) { Object.keys(statusMap).forEach((k) => delete statusMap[k]); ds.comentarios.forEach((c) => (statusMap[c.id] = 'novo')); }
resetStatus(MOCK_DATASET);

// artigo do Código Penal -> categoria da UI
const ARTIGO_CAT = { '138': 'calunia', '139': 'difamacao', '140': 'injuria' };
const CONF_NUM = { alta: 92, media: 72, baixa: 52 };

// Transforma a resposta real de /api/buscar no formato que as telas consomem.
function buildDatasetFromApi(resp, ctx) {
  const brutos = resp.comentarios || [];
  const comentarios = brutos.map((c) => {
    const flag = c.artigo && c.artigo !== 'NENHUM';
    return {
      id: c.id,
      autor: c.autor || 'desconhecido',
      rede: 'instagram',
      data: c.data || null,
      likes: typeof c.likes === 'number' ? c.likes : null,
      categoria: flag ? (ARTIGO_CAT[c.artigo] || 'injuria') : 'legitima',
      confianca: CONF_NUM[c.confianca] || (flag ? 60 : 90),
      confiancaLabel: c.confianca || null,
      texto: c.comentario,
      obs: c.motivo || 'Sinalizado pela IA — necessita validação jurídica.',
      artigo: c.artigo,
    };
  });

  const flagged = comentarios.filter((c) => catById[c.categoria].flag);
  const naoSinalizados = comentarios.length - flagged.length;

  // categorias com contagem real
  const qtdPorCat = {};
  flagged.forEach((c) => (qtdPorCat[c.categoria] = (qtdPorCat[c.categoria] || 0) + 1));
  const categorias = CATEGORIAS.map((c) => ({
    ...c,
    qtd: c.id === 'legitima' ? naoSinalizados : (qtdPorCat[c.id] || 0),
  }));
  const totalRelevantes = flagged.length;

  // ofensores (agrupa flagrados por autor)
  const mapOf = new Map();
  for (const c of flagged) {
    if (!mapOf.has(c.autor)) mapOf.set(c.autor, { handle: c.autor, rede: 'instagram', itens: [], datas: [], altas: 0 });
    const g = mapOf.get(c.autor);
    g.itens.push(c);
    if (c.confiancaLabel === 'alta') g.altas++;
    const t = c.data ? +new Date(c.data) : NaN;
    if (!isNaN(t)) g.datas.push(t);
  }
  const ofensores = [...mapOf.values()].map((g) => {
    const ataques = g.itens.length;
    const score = clamp(Math.round(30 + ataques * 8 + g.altas * 6), 0, 99);
    return {
      handle: g.handle, rede: 'instagram', ataques, score,
      prioritario: ataques >= 3,
      primeira: g.datas.length ? new Date(Math.min(...g.datas)).toISOString() : null,
      ultima: g.datas.length ? new Date(Math.max(...g.datas)).toISOString() : null,
      ultimo: g.itens[g.itens.length - 1].texto,
    };
  }).sort((a, b) => b.ataques - a.ataques || b.score - a.score);

  const recorrentes = ofensores.filter((o) => o.ataques >= 2).length;
  const prioritarios = ofensores.filter((o) => o.prioritario).length;
  const altas = flagged.filter((c) => c.confiancaLabel === 'alta').length;
  const score = clamp(Math.round(10 + totalRelevantes * 1.2 + recorrentes * 5 + prioritarios * 8 + altas * 1.5), 0, 100);

  // insights derivados dos números reais (nunca afirmam crime)
  const insights = [];
  if (totalRelevantes > 0) {
    const relPct = Math.round((totalRelevantes / Math.max(comentarios.length, 1)) * 100);
    insights.push(`Foram sinalizados ${totalRelevantes} de ${comentarios.length} comentários analisados (${relPct}%) com indícios que necessitam validação.`);
    const cats = categorias.filter((c) => c.flag && c.qtd > 0).sort((a, b) => b.qtd - a.qtd);
    if (cats[0]) insights.push(`Predomínio de ${cats[0].nome.toLowerCase()} (${Math.round((cats[0].qtd / totalRelevantes) * 100)}%) entre os comentários sinalizados.`);
    if (recorrentes > 0) {
      const topN = ofensores.slice(0, Math.min(4, recorrentes));
      const soma = topN.reduce((s, o) => s + o.ataques, 0);
      insights.push(`${recorrentes} usuário(s) recorrente(s) identificado(s); os principais concentram ${Math.round((soma / totalRelevantes) * 100)}% dos comentários sinalizados.`);
    }
    if (prioritarios > 0) insights.push(`${prioritarios} usuário(s) com reincidência elevada merecem atenção prioritária do advogado.`);
  } else {
    insights.push('Nenhum comentário com indício relevante foi sinalizado nesta amostra.');
  }
  insights.push('Nenhuma conclusão jurídica foi realizada. As classificações são probabilísticas e necessitam validação do advogado.');

  // Publicações analisadas: agrupa por URL do post (uma linha por publicação, com link).
  const postMap = new Map();
  brutos.forEach((c) => {
    const u = c.postUrl || c.commentUrl; if (!u) return;
    if (!postMap.has(u)) postMap.set(u, { tipo: 'post', url: u, comentarios: 0, data: c.data || null });
    postMap.get(u).comentarios++;
  });
  const posts = [...postMap.values()];

  return {
    real: true,
    perfil: {
      nome: '@' + resp.handle, handle: resp.handle, redes: ['instagram'],
      periodo: ctx.periodo, score, totalAnalisados: comentarios.length,
      relevantes: totalRelevantes, recorrentes, prioritarios,
    },
    categorias, totalRelevantes, ofensores, comentarios, insights, sugestoes: SUGESTOES, posts,
  };
}

// Dispara a varredura real; se o backend não existir (host estático), cai na demo.
async function doRealScan(handle, redes, periodo, nome) {
  try {
    const r = await fetch('/api/buscar', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ handle }),
    });
    const j = await r.json();
    if (!r.ok || j.erro || !Array.isArray(j.comentarios)) throw new Error(j.erro || 'Falha na varredura.');
    const ds = buildDatasetFromApi(j, { periodo });
    return ds;
  } catch (e) {
    console.warn('[Juriscan] varredura real indisponível — usando demonstração.', e?.message || e);
    // Demo: reflete o alvo, o nome e o período escolhidos, mantendo as métricas de amostra.
    const known = PERFIS.find((x) => x.handle === handle);
    const perfil = {
      ...MOCK_DATASET.perfil,
      handle: handle || MOCK_DATASET.perfil.handle,
      nome: nome || (known ? known.nome : (handle ? 'Novo perfil' : MOCK_DATASET.perfil.nome)),
      score: known ? known.score : MOCK_DATASET.perfil.score,
      periodo: periodo || MOCK_DATASET.perfil.periodo,
      redes: ['instagram'],
    };
    const nPosts = POSTS_POR_PERIODO[periodo] || POSTS.length;
    const posts = POSTS.slice(0, nPosts);
    return { ...MOCK_DATASET, perfil, posts, demoFallback: true, erroReal: e?.message || null };
  }
}

/* ---- gauge SVG (score) ---- */
function gauge(score) {
  const R = 82, C = 2 * Math.PI * R, arc = C * 0.75;
  const val = (score / 100) * arc;
  const cor = faixaDe(score).cor;
  return `
    <svg viewBox="0 0 200 200" style="width:100%;height:100%">
      <defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${cor}" stop-opacity="0.65"/><stop offset="1" stop-color="${cor}"/>
      </linearGradient></defs>
      <circle cx="100" cy="100" r="${R}" fill="none" stroke="#EFEFF2" stroke-width="14"
        stroke-linecap="round" stroke-dasharray="${arc} ${C}" transform="rotate(135 100 100)"/>
      <circle cx="100" cy="100" r="${R}" fill="none" stroke="url(#gg)" stroke-width="14"
        stroke-linecap="round" stroke-dasharray="0 ${C}" transform="rotate(135 100 100)"
        style="transition:stroke-dasharray 1.1s cubic-bezier(.22,.61,.36,1)" data-val="${val} ${C}"/>
    </svg>`;
}
function animaGauge(root) {
  const c = root.querySelector('circle[data-val]');
  if (c) requestAnimationFrame(() => (c.setAttribute('stroke-dasharray', c.dataset.val)));
}

/* ---- area chart ---- */
function areaChart(data, cor = '#4F46E5') {
  const W = 520, H = 150, pad = 8;
  const max = Math.max(...data.map((d) => d.valor)) * 1.15 || 1;
  const step = (W - pad * 2) / (data.length - 1);
  const x = (i) => pad + i * step;
  const y = (v) => H - pad - (v / max) * (H - pad * 2 - 14);
  const pts = data.map((d, i) => [x(i), y(d.valor)]);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L${x(data.length - 1)},${H - pad} L${x(0)},${H - pad} Z`;
  const dots = pts.map((p, i) => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${i === data.length - 1 ? 4.5 : 2.6}" fill="${i === data.length - 1 ? cor : '#fff'}" stroke="${cor}" stroke-width="2"/>`).join('');
  const labels = data.map((d, i) => `<text x="${x(i)}" y="${H + 4}" font-size="9" fill="#A0A0A8" text-anchor="middle">${d.semana}</text>`).join('');
  return `<svg class="spark" viewBox="0 0 ${W} ${H + 12}" preserveAspectRatio="none">
    <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${cor}" stop-opacity="0.18"/><stop offset="1" stop-color="${cor}" stop-opacity="0"/></linearGradient></defs>
    <path d="${area}" fill="url(#ag)"/>
    <path d="${line}" fill="none" stroke="${cor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="stroke-dasharray:2000;stroke-dashoffset:2000;animation:draw 1.4s ease forwards"/>
    ${dots}${labels}<style>@keyframes draw{to{stroke-dashoffset:0}}</style></svg>`;
}

/* ============================================================================
   SIDEBAR + TOPBAR
   ============================================================================ */
const NAV = [
  { id: 'dashboard', nome: 'Dashboard', ico: 'dashboard' },
  { id: 'nova', nome: 'Nova Varredura', ico: 'scan' },
  { id: 'relatorios', nome: 'Relatórios', ico: 'report' },
];
function renderSidebar(active) {
  $('#sidebar').innerHTML = `
    <div class="brand">
      <div class="brand-mark">${svg('scale')}</div>
      <div><div class="brand-name">Juri<b>scan</b></div><div class="brand-tag">Inteligência Reputacional</div></div>
    </div>
    <nav class="nav">
      <div class="nav-label">Análise</div>
      ${NAV.map((n) => `<a class="nav-item ${active === n.id ? 'active' : ''}" href="#/${n.id}">${svg(n.ico)}<span>${n.nome}</span></a>`).join('')}
      <div class="nav-label">Sistema</div>
      <span class="nav-item disabled">${svg('settings')}<span>Configurações</span><span class="soon">em breve</span></span>
    </nav>
    <div class="side-foot">
      <a class="side-cta" href="#/nova">${svg('plus')} Nova Varredura</a>
      <div class="side-user"><div class="avatar">DT</div><div><span>Dr. Thuan</span><small>Plano Escritório</small></div></div>
    </div>`;
}
function renderTopbar() {
  // Desktop: topbar oculta (CSS). Mobile: só o botão do menu.
  $('#topbar').innerHTML = `<div class="topbar-inner"><button class="icon-btn menu-btn" id="menuBtn">${svg('menu')}</button></div>`;
  const mb = $('#menuBtn'); if (mb) mb.onclick = () => $('#sidebar').classList.toggle('open');
}
// Cabeçalho único da tela: título (à esquerda) + ações (à direita). title/sub/actions são HTML.
function viewHead(title, sub, actions) {
  return `<div class="view-head"><div class="vh-text"><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ''}</div>${actions ? `<div class="vh-actions">${actions}</div>` : ''}</div>`;
}

/* ============================================================================
   VIEWS
   ============================================================================ */
const view = $('#view');
const badgeCat = (id) => {
  const c = catById[id];
  return `<span class="badge" style="background:${c.cor}14;color:${c.cor}"><span class="bdot" style="background:${c.cor}"></span>${c.curto}</span>`;
};

/* ---------- DASHBOARD ---------- */
function viewDashboard() {
  renderTopbar();
  const f = faixaDe(PERFIL.score);
  const kpis = [
    { lbl: 'Varreduras realizadas', val: nf(METRICAS.varreduras), ico: 'scan', d: '+8 este mês', up: true },
    { lbl: 'Perfis analisados', val: nf(METRICAS.perfis), ico: 'profiles', d: '+3 este mês', up: true },
    { lbl: 'Comentários analisados', val: nf(METRICAS.comentariosAnalisados), ico: 'layers', d: '+12k este mês', up: true },
    { lbl: 'Comentários sinalizados', val: nf(METRICAS.comentariosClassificados), ico: 'alert', d: '2,4% do total', up: true },
    { lbl: 'Usuários recorrentes', val: nf(METRICAS.recorrentes), ico: 'users', d: '+9 este mês', up: true },
    { lbl: 'Casos revisados', val: nf(METRICAS.casosRevisados), ico: 'report', d: 'pelo advogado', up: false },
  ];
  const flagged = CATEGORIAS.filter((c) => c.flag);
  const maxCat = Math.max(...flagged.map((c) => c.qtd));
  view.innerHTML = `
    ${viewHead('Dashboard', 'Visão geral das varreduras e do risco reputacional.', `<a class="btn btn-brand" href="#/nova">${svg('plus')} Nova Varredura</a>`)}
    <div class="grid grid-4" style="margin-bottom:16px">
      <div class="score-hero card">
        <div class="gauge">${gauge(PERFIL.score)}<div class="num"><b>${PERFIL.score}</b><s>de 100</s></div></div>
        <div class="score-side">
          <div class="eyebrow">Score de Risco Reputacional</div>
          <h3>Risco <span class="risk-flag" style="background:${f.cor}">${f.nome}</span></h3>
          <p>@${PERFIL.handle} — ${f.desc} Calculado a partir de volume, recorrência, crescimento, reincidência e teor das mensagens.</p>
          <div class="score-legend">${FAIXAS.map((fx) => `<div class="lg ${fx.nome === f.nome ? 'on' : ''}"><div class="bar" style="background:${fx.cor}"></div><small>${fx.nome}</small></div>`).join('')}</div>
          <div class="score-factors">
            <span class="factor">Ataques <b>${TOTAL_RELEVANTES}</b></span>
            <span class="factor">Recorrentes <b>${PERFIL.recorrentes}</b></span>
            <span class="factor">Prioritários <b>${PERFIL.prioritarios}</b></span>
            <span class="factor">Crescimento <b>+146%</b></span>
          </div>
        </div>
      </div>
      ${kpis.slice(0, 2).map(kpiCard).join('')}
    </div>
    <div class="grid grid-4">${kpis.slice(2).map(kpiCard).join('')}</div>
    <div class="grid grid-2" style="margin-top:24px;align-items:start">
      <div class="card chart-card"><h3>Evolução dos ataques sinalizados</h3><div class="sub">Últimas 12 semanas · @${PERFIL.handle}</div>${areaChart(EVOLUCAO)}</div>
      <div class="card chart-card"><h3>Sinalizações por categoria</h3><div class="sub">${TOTAL_RELEVANTES} comentários relevantes</div>
        <div class="bars">${flagged.map((c) => `<div class="bar-row"><span class="bl"><span class="bdot" style="width:8px;height:8px;border-radius:3px;background:${c.cor}"></span>${c.curto}</span><span class="bt"><span class="bf" style="width:${(c.qtd / maxCat) * 100}%;background:${c.cor}"></span></span><span class="bn">${c.qtd}</span></div>`).join('')}</div>
      </div>
    </div>
    <div class="sec-head"><h3>Últimos relatórios</h3><a class="link" href="#/relatorios">Ver todos →</a></div>
    <div class="card table-card"><table>
      <thead><tr><th>Relatório</th><th>Perfil</th><th>Data</th><th>Status</th></tr></thead>
      <tbody>${RELATORIOS.map((r) => `<tr onclick="location.hash='#/relatorio/${r.id}'"><td><span class="u">${r.id}</span></td><td>${esc(r.perfil)} <span style="color:var(--muted-2)">@${esc(r.handle)}</span></td><td class="num">${fmtData(r.data, true)}</td><td>${statusBadge(r.status)}</td></tr>`).join('')}</tbody>
    </table></div>`;
  animaGauge(view);
}
function kpiCard(k) {
  return `<div class="card kpi"><div class="kpi-ico">${svg(k.ico)}</div><div class="kpi-val">${k.val}</div><div class="kpi-lbl">${k.lbl}</div><div class="kpi-delta ${k.up ? 'up' : 'down'}">${k.d}</div></div>`;
}
function miniScore(score) {
  const cor = faixaDe(score).cor;
  return `<span class="mini-score" style="color:${cor}"><span class="track"><span class="fill" style="width:${score}%;background:${cor}"></span></span>${score}</span>`;
}
function statusBadge(status) {
  const emAnalise = /an[áa]lise/i.test(status);
  const cor = emAnalise ? 'var(--r-atencao)' : 'var(--r-baixo)';
  const bg = emAnalise ? '#FEF3E6' : '#EAF7F0';
  return `<span class="badge" style="background:${bg};color:${cor}"><span class="bdot" style="background:${cor}"></span>${esc(status)}</span>`;
}

/* ---------- NOVA VARREDURA (assistente em 2 passos — só Instagram) ---------- */
// Tecnicamente, uma rede por vez: o MVP foca em Instagram.
const REDE_FIXA = 'instagram';
const novaState = { step: 1, tipo: null, cliente: null, alvo: '', periodo: '30 dias', novoCliente: false, clienteNome: '', clienteHandle: '' };
const limpaHandle = (s) => s.trim().replace(/^@/, '');

function novaValida(step) {
  if (step !== 1) return true; // passo 2 (período) sempre válido
  if (novaState.tipo === 'atual') {
    return novaState.novoCliente
      ? (!!novaState.clienteNome.trim() && !!limpaHandle(novaState.clienteHandle))
      : !!novaState.cliente;
  }
  return novaState.tipo === 'novo' && novaState.alvo.trim().length > 0;
}
function alvoAtual() {
  if (novaState.tipo === 'atual') {
    if (novaState.novoCliente) return limpaHandle(novaState.clienteHandle);
    const p = PERFIS.find((x) => x.handle === novaState.cliente); return p ? p.handle : '';
  }
  return limpaHandle(novaState.alvo);
}
function nomeAtual() {
  if (novaState.tipo === 'atual') {
    if (novaState.novoCliente) return novaState.clienteNome.trim();
    return PERFIS.find((x) => x.handle === novaState.cliente)?.nome || '';
  }
  return '';
}

function stepCliente() {
  const t = novaState.tipo;
  const cli = t === 'atual'
    ? (novaState.novoCliente ? `
    <div class="field" style="margin-top:22px"><label>Cadastrar novo cliente</label>
      <div class="hint">Registre o cliente que você vai passar a monitorar (nome e perfil).</div>
      <div class="input-shell" style="margin-bottom:10px"><input id="cliNome" type="text" placeholder="Nome do cliente" autocomplete="off" value="${esc(novaState.clienteNome)}" /></div>
      <div class="input-shell"><span class="at">@</span><input id="cliHandle" type="text" placeholder="perfil.do.cliente" autocomplete="off" value="${esc(novaState.clienteHandle)}" /></div>
      <button type="button" class="btn-link" id="cliCancelar" style="margin:12px 0 0">← Escolher da lista</button>
    </div>` : `
    <div class="field" style="margin-top:22px"><label>Selecione o cliente</label>
      <div class="client-list">${PERFIS.map((p) => `<div class="client-row ${novaState.cliente === p.handle ? 'sel' : ''}" data-cli="${esc(p.handle)}"><div class="pav">${initials(p.nome)}</div><div class="ci-name">${esc(p.nome)}<small>@${esc(p.handle)}</small></div><div class="ci-meta"><span>última varredura ${fmtData(p.ultima, true)}</span></div></div>`).join('')}
        <button type="button" class="add-client" id="addCliente">${svg('plus')} Adicionar novo cliente</button>
      </div>
    </div>`)
    : '';
  const novo = t === 'novo' ? `
    <div class="field" style="margin-top:22px"><label>Perfil a analisar</label><div class="hint">Digite o @ do perfil público no Instagram.</div>
      <div class="input-shell"><span class="at">@</span><input id="alvo" type="text" placeholder="ana.beatriz.oficial" autocomplete="off" value="${esc(novaState.alvo)}" /></div>
    </div>` : '';
  return `
    <div class="wz-title">Para quem é a varredura?</div>
    <div class="wz-sub">Escolha se é o monitoramento de um cliente atual ou a prospecção de um novo perfil.</div>
    <div class="choice-grid">
      <div class="choice-card ${t === 'atual' ? 'sel' : ''}" data-tipo="atual"><span class="badge-tipo">Monitoramento</span><div class="ci">${svg('users')}</div><h4>Cliente atual</h4><p>Acompanhar um caso que você já monitora — perfil que autorizou o acompanhamento.</p></div>
      <div class="choice-card ${t === 'novo' ? 'sel' : ''}" data-tipo="novo"><span class="badge-tipo">Prospecção</span><div class="ci">${svg('scan')}</div><h4>Novo perfil</h4><p>Analisar um perfil público que ainda não é cliente, para prospectar.</p></div>
    </div>
    ${cli}${novo}
    <div class="field" style="margin-top:22px">
      <label>Rede social</label>
      <div class="hint">Escolha a rede social onde a varredura dos comentários será feita.</div>
      <div class="net-grid">
        <div class="net-opt sel"><div class="check">${svg('check')}</div><div class="g logo">${LOGO.instagram}</div><span>Instagram</span></div>
        <div class="net-opt off"><div class="g soon-g">${svg('plus')}</div><span>Outras redes</span><span class="soon2">Em breve</span></div>
      </div>
    </div>
    <div class="wz-nav"><div class="sp"></div><button class="btn btn-brand" id="wzNext" ${novaValida(1) ? '' : 'disabled'}>Continuar ${svg('arrowRight')}</button></div>`;
}
function stepPeriodo() {
  return `
    <div class="wz-title">Qual o período da varredura?</div>
    <div class="wz-sub">Janela de coleta dos comentários.</div>
    <div class="seg" id="seg">${['7 dias', '30 dias', '90 dias'].map((p) => `<button data-p="${p}" class="${novaState.periodo === p ? 'on' : ''}">${p}</button>`).join('')}</div>
    <div class="recap">
      <div class="r"><span>${novaState.tipo === 'atual' ? 'Cliente' : 'Novo perfil'}:</span> <b>@${esc(alvoAtual())}</b></div>
      <div class="sepr"></div>
      <div class="r" style="display:flex;align-items:center;gap:6px"><span>Rede:</span> ${netGlyph('instagram')} <b>Instagram</b></div>
      <div class="sepr"></div>
      <div class="r"><span>Período:</span> <b>${novaState.periodo}</b></div>
    </div>
    <div class="wz-nav"><button class="btn btn-ghost" id="wzBack">${svg('back')} Voltar</button><div class="sp"></div><button class="btn btn-brand btn-lg" id="wzStart">${svg('scan')} Iniciar Varredura</button></div>`;
}

function viewNova() {
  renderTopbar();
  const passos = [['1', 'Cliente'], ['2', 'Período']];
  const ind = passos.map(([n, label], i) => {
    const idx = i + 1;
    const cls = novaState.step === idx ? 'on' : (novaState.step > idx ? 'done' : '');
    const line = i < passos.length - 1 ? `<div class="wz-line ${novaState.step > idx ? 'done' : ''}"></div>` : '';
    return `<div class="wz-step ${cls}"><span class="n">${novaState.step > idx ? '✓' : n}</span>${label}</div>${line}`;
  }).join('');
  const body = novaState.step === 1 ? stepCliente() : stepPeriodo();
  view.innerHTML = `
    ${viewHead('Nova Varredura', 'Configure uma nova varredura em dois passos: escolha o cliente e o período. A coleta é feita no Instagram; ao final, a plataforma analisa os comentários.', '')}
    <div class="wizard"><div class="wz-steps">${ind}</div><div class="wz-body">${body}</div></div>`;
  wireNova();
}
function wireNova() {
  const next = $('#wzNext'); const back = $('#wzBack');
  const syncNext = () => { if (next) next.disabled = !novaValida(novaState.step); };

  if (novaState.step === 1) {
    view.querySelectorAll('.choice-card').forEach((el) => {
      el.onclick = () => { novaState.tipo = el.dataset.tipo; viewNova(); };
    });
    view.querySelectorAll('.client-row').forEach((el) => {
      el.onclick = () => { novaState.cliente = el.dataset.cli; novaState.novoCliente = false; viewNova(); };
    });
    const addC = $('#addCliente');
    if (addC) addC.onclick = () => { novaState.novoCliente = true; novaState.cliente = null; viewNova(); };
    const cancC = $('#cliCancelar');
    if (cancC) cancC.onclick = () => { novaState.novoCliente = false; viewNova(); };
    const iNome = $('#cliNome'); if (iNome) iNome.oninput = (e) => { novaState.clienteNome = e.target.value; syncNext(); };
    const iHandle = $('#cliHandle'); if (iHandle) iHandle.oninput = (e) => { novaState.clienteHandle = e.target.value; syncNext(); };
    const inp = $('#alvo');
    if (inp) inp.oninput = (e) => { novaState.alvo = e.target.value; syncNext(); };
    if (next) next.onclick = () => { if (novaValida(1)) { novaState.step = 2; viewNova(); } };
  } else {
    $('#seg').querySelectorAll('button').forEach((b) => { b.onclick = () => { novaState.periodo = b.dataset.p; $('#seg').querySelectorAll('button').forEach((x) => x.classList.remove('on')); b.classList.add('on'); }; });
    if (back) back.onclick = () => { novaState.step = 1; viewNova(); };
    $('#wzStart').onclick = () => {
      const alvo = alvoAtual();
      const nome = nomeAtual();
      novaState.alvo = alvo;
      pendingScan = doRealScan(alvo, [REDE_FIXA], novaState.periodo, nome);
      novaState.step = 1; // deixa o assistente pronto para a próxima
      location.hash = '#/loading';
    };
  }
}

/* ---------- LOADING ---------- */
function viewLoading() {
  renderTopbar();
  const alvo = novaState.alvo.trim() || PERFIL.handle;
  view.innerHTML = `
    <div class="loader"><div class="loader-inner">
      <div class="orb"><div class="ring"></div><div class="ring"></div><div class="ring"></div><div class="core"></div></div>
      <h2>Analisando perfil</h2>
      <div class="who">@${esc(alvo)} · Instagram · ${novaState.periodo}</div>
      <div class="steps" id="steps">${ETAPAS.map((e) => `<div class="step"><span class="si">${svg('check')}</span><span>${e}</span></div>`).join('')}</div>
      <div class="progress-track"><div class="progress-fill" id="prog" style="width:0%"></div></div>
    </div></div>`;
  const steps = [...view.querySelectorAll('.step')];
  const prog = $('#prog');
  const scan = pendingScan || Promise.resolve(MOCK_DATASET);
  let i = 0, resolved = false, dataset = null;
  scan.then((ds) => { resolved = true; dataset = ds; });
  const finish = () => { current = dataset || MOCK_DATASET; resetStatus(current); pendingScan = null; prog.style.width = '100%'; setTimeout(() => (location.hash = '#/resultado'), 420); };
  const tick = () => {
    if (i > 0) steps[i - 1].classList.replace('doing', 'done');
    if (i >= steps.length) {
      // segura no último passo até a varredura real resolver
      if (resolved) return finish();
      steps[steps.length - 1].classList.add('doing');
      return setTimeout(tick, 400);
    }
    steps[i].classList.add('doing');
    prog.style.width = `${((i + 1) / steps.length) * 100}%`;
    i++;
    setTimeout(tick, 560 + Math.random() * 320);
  };
  setTimeout(tick, 300);
}

/* ---------- RESULTADO ---------- */
function viewResultado() {
  const P = current.perfil;
  renderTopbar();
  const f = faixaDe(P.score);
  const flagged = current.categorias.filter((c) => c.flag && c.qtd > 0);
  const ctx = current.categorias.filter((c) => !c.flag && c.qtd > 0);
  view.innerHTML = `
    ${viewHead(
      `${esc(P.nome)} <span style="color:var(--muted-2);font-weight:500">@${esc(P.handle)}</span>`,
      `Resumo executivo da varredura em ${P.redes.map((r) => REDES[r].nome).join(', ')} · período de ${P.periodo}.`,
      `<a class="btn btn-ghost" href="#/relatorio/atual">${svg('file')} Ver relatório</a>`
    )}
    <div class="summary-bar">
      <div class="card stat"><b>${nf(P.totalAnalisados)}</b><span>comentários analisados</span></div>
      <div class="card stat"><b>${P.relevantes}</b><span>comentários relevantes</span></div>
      <div class="card stat"><b>${P.recorrentes}</b><span>usuários recorrentes</span></div>
    </div>
    ${postsSection(current.posts)}
    <div class="grid grid-2" style="margin-top:22px;align-items:start">${distribuicaoCard()}${perfisCard()}</div>
    <div class="sec-head"><h3>Revisão dos comentários</h3><span class="cmt-counter" id="cmtCounter"></span></div>
    <div class="grid grid-2" id="cmtList"></div>`;
  renderComentarios();
  const vt = $('#verTodos'); if (vt) vt.onclick = () => { verTodosOfensores = !verTodosOfensores; viewResultado(); };
  view.querySelectorAll('[data-ofensor]').forEach((el) => { el.onclick = () => { const first = current.comentarios.find((c) => c.autor === el.dataset.ofensor); if (first) openDrawer(first.id); }; });
  animaGauge(view);
}
let verTodosOfensores = false;
function sevDe(o) {
  if (o.prioritario) return { cls: 'alta', label: 'ALTA' };
  if (o.ataques >= 5) return { cls: 'media', label: 'MÉDIA' };
  return { cls: 'baixa', label: 'BAIXA' };
}
function distribuicaoCard() {
  const flagged = current.categorias.filter((c) => c.flag && c.qtd > 0);
  const ctxTotal = current.categorias.filter((c) => !c.flag).reduce((s, c) => s + c.qtd, 0);
  const total = Math.max(current.totalRelevantes, 1);
  return `<div class="card find-card">
    <div class="find-head"><div><div class="eyebrow2">Classificação preliminar</div><h3>Distribuição dos achados</h3></div><span class="find-count">${current.totalRelevantes} achados</span></div>
    <div class="find-bars">${flagged.map((c) => `<div class="find-item"><span class="fi-dot" style="background:${c.cor}"></span><span class="fi-name">${c.nome}</span><span class="fi-pct">${Math.round((c.qtd / total) * 100)}%</span><b class="fi-n">${c.qtd}</b></div>`).join('') || '<p class="empty">Nenhum achado nesta amostra.</p>'}</div>
    ${ctxTotal ? `<div class="find-ctx">Crítica política / legítima: <b>${nf(ctxTotal)}</b> comentários — contexto, não configuram ilícito.</div>` : ''}
    <div class="find-note">${svg('info')} Classificações são indicativas e dependem de validação jurídica.</div>
  </div>`;
}
function perfisCard() {
  const all = current.ofensores;
  const lista = verTodosOfensores ? all : all.slice(0, 3);
  const top = all[0];
  const pctTop = top ? Math.round((top.ataques / Math.max(current.totalRelevantes, 1)) * 100) : 0;
  return `<div class="card watch-card">
    <div class="watch-head"><div><div class="eyebrow2">Recorrência</div><h3>Perfis que merecem atenção</h3></div>${all.length > 3 ? `<button class="link" id="verTodos">${verTodosOfensores ? 'Ver menos' : 'Ver todos'}</button>` : ''}</div>
    <div class="watch-list">${lista.map((o) => `<div class="watch-row" data-ofensor="${esc(o.handle)}"><div class="pav">${initials(o.handle)}</div><div class="wr-info"><b>@${esc(o.handle)}</b><small>${o.ataques} comentários relevantes</small></div><span class="wr-chev">${svg('arrowRight')}</span></div>`).join('') || '<p class="empty">Nenhum perfil recorrente nesta amostra.</p>'}</div>
    ${top ? `<div class="watch-note">${svg('alert')}<div><b>Padrão identificado</b><br>@${esc(top.handle)} responde por ${pctTop}% dos comentários sinalizados nesta varredura.</div></div>` : ''}
  </div>`;
}
function postsSection(posts) {
  if (!posts || !posts.length) return '';
  const r = resumoPosts(posts);
  const partes = [`${r.total} ${r.total === 1 ? 'publicação' : 'publicações'}`];
  if (r.reels) partes.push(`${r.reels} ${r.reels === 1 ? 'reel' : 'reels'}`);
  if (r.posts) partes.push(`${r.posts} ${r.posts === 1 ? 'post' : 'posts'}`);
  return `
    <div class="sec-head"><h3>Publicações analisadas</h3><span style="color:var(--muted);font-size:12.5px">${partes.join(' · ')}</span></div>
    <div class="card posts-card">${posts.map((p) => `
      <a class="post-row" href="${esc(p.url)}" target="_blank" rel="noopener">
        <span class="post-type ${p.tipo === 'reel' ? 'reel' : 'post'}">${p.tipo === 'reel' ? 'Reel' : 'Post'}</span>
        <span class="post-date">${fmtData(p.data, true)}</span>
        <span class="post-cmts">${nf(p.comentarios)} comentários</span>
        <span class="post-link">Ver publicação ↗</span>
      </a>`).join('')}
    </div>`;
}
function catCard(c, ctx, total) {
  const pct = ctx ? '' : `${Math.round((c.qtd / Math.max(total, 1)) * 100)}% dos relevantes`;
  return `<div class="card cat-card ${ctx ? 'ctx' : ''}"><div class="ct"><span class="cn" style="color:${c.cor}">${c.nome}</span><span class="art">${c.artigo}</span></div><div class="cq">${nf(c.qtd)}</div><div class="cbar"><div class="cbf" style="width:${ctx ? 100 : Math.round((c.qtd / Math.max(total, 1)) * 100)}%;background:${c.cor}"></div></div><div class="cp">${ctx ? 'Não configura ilícito — contexto' : pct}</div></div>`;
}
function renderComentarios() {
  const wrap = $('#cmtList'); if (!wrap) return;
  const base = current.comentarios.filter((c) => catById[c.categoria].flag);
  const visiveis = base.filter((c) => statusMap[c.id] !== 'descartado');
  wrap.innerHTML = visiveis.map((c) => cmtCard(c)).join('') ||
    '<p class="empty">Nada para revisar aqui — todos os comentários sinalizados foram descartados.</p>';
  // contador de progresso
  const counter = $('#cmtCounter');
  if (counter) {
    const novo = base.filter((c) => statusMap[c.id] === 'novo').length;
    const mant = base.filter((c) => statusMap[c.id] === 'mantido').length;
    const desc = base.filter((c) => statusMap[c.id] === 'descartado').length;
    counter.innerHTML = `<b>${novo}</b> para revisar · <b>${mant}</b> mantidos · <b>${desc}</b> descartados`;
  }
  wrap.querySelectorAll('[data-cmt]').forEach((el) => {
    const id = +el.dataset.cmt;
    const q = (s) => el.querySelector(s);
    q('.cmt-text').onclick = () => openDrawer(id);
    q('[data-a="ctx"]')?.addEventListener('click', () => openDrawer(id));
    q('[data-a="keep"]')?.addEventListener('click', () => { statusMap[id] = 'mantido'; renderComentarios(); toast('Mantido no relatório'); });
    q('[data-a="undo"]')?.addEventListener('click', () => { statusMap[id] = 'novo'; renderComentarios(); });
    q('[data-a="drop"]')?.addEventListener('click', () => {
      el.classList.add('removing');
      setTimeout(() => {
        statusMap[id] = 'descartado';
        renderComentarios();
        toast('Comentário descartado', { label: 'Desfazer', onClick: () => { statusMap[id] = 'novo'; renderComentarios(); } });
      }, 200);
    });
  });
}
function cmtCard(c) {
  const mantido = statusMap[c.id] === 'mantido';
  const acoes = mantido
    ? `<span class="kept-tag">${svg('check')} Mantido no relatório</span><button class="btn-link" data-a="undo">Desfazer</button>`
    : `<button class="btn btn-ghost btn-sm" data-a="ctx">${svg('eye')} Contexto</button><span class="sp"></span>
       <button class="btn btn-ghost btn-sm danger" data-a="drop">${svg('trash')} Descartar</button>
       <button class="btn btn-brand btn-sm" data-a="keep">${svg('check')} Manter</button>`;
  return `<article class="card cmt ${mantido ? 'kept' : ''}" data-cmt="${c.id}">
    <div class="cmt-top">${badgeCat(c.categoria)}<span class="meta">${netGlyph(c.rede)} @${esc(c.autor)} · ${fmtDataHora(c.data)}</span></div>
    <div class="cmt-text">"${esc(c.texto)}"</div>
    <div class="cmt-actions">${acoes}</div>
  </article>`;
}

/* ---------- DRAWER ---------- */
function openDrawer(id) {
  const c = current.comentarios.find((x) => x.id === id); if (!c) return;
  const doAutor = current.comentarios.filter((x) => x.autor === c.autor);
  const of = current.ofensores.find((o) => o.handle === c.autor);
  const framings = [...new Set(doAutor.map((x) => x.categoria))].map((cid) => catById[cid]);
  $('#drawer').innerHTML = `
    <div class="drawer-head"><div class="avatar">${initials(c.autor)}</div><div class="who">@${esc(c.autor)}<small>${netChip(c.rede)}</small></div><button class="icon-btn drawer-close" id="dClose">${svg('x')}</button></div>
    <div class="drawer-body">
      <div class="dsec"><label>Comentário</label><div class="dquote">"${esc(c.texto)}"</div><div style="margin-top:8px">${badgeCat(c.categoria)}${LEI[c.categoria] ? ` <span class="lei-flag" style="padding:3px 8px">${svg('scale')} ${LEI[c.categoria]}</span>` : ''}</div></div>
      <div class="dsec"><label>Histórico do autor</label><div class="dstat-row"><div class="dstat"><b>${doAutor.length}</b><span>comentários</span></div><div class="dstat"><b>${of ? of.ataques : doAutor.length}</b><span>ocorrências</span></div><div class="dstat"><b style="color:${of ? faixaDe(of.score).cor : 'var(--ink)'}">${of ? of.score : '—'}</b><span>score autor</span></div></div></div>
      <div class="dsec"><label>Comentários anteriores</label><div class="dhist">${doAutor.map((x) => `<div class="h">"${esc(x.texto)}"<small>${catById[x.categoria].curto} · ${fmtDataHora(x.data)}</small></div>`).join('')}</div></div>
      <div class="dsec"><label>Possíveis enquadramentos</label><div class="framing">${framings.map((fr) => `<span class="badge" style="background:${fr.cor}14;color:${fr.cor}"><span class="bdot" style="background:${fr.cor}"></span>${fr.nome}${fr.artigo !== '—' ? ' · ' + fr.artigo : ''}</span>`).join('')}</div></div>
      <div class="dsec"><label>Observações da IA</label><p style="font-size:13px;color:var(--muted);line-height:1.55">${esc(c.obs)}</p></div>
      <div class="dsec"><label>Anotações do advogado</label><textarea class="dtext" id="dNota" placeholder="Registre sua análise, enquadramento e próximos passos...">${esc(notas[id] || '')}</textarea></div>
    </div>
    <div class="drawer-foot"><button class="btn btn-ghost danger" id="dDrop">${svg('trash')} Descartar</button><button class="btn btn-brand" id="dKeep">${svg('check')} Manter no relatório</button></div>`;
  $('#drawer').classList.add('show'); $('#scrim').classList.add('show');
  $('#dClose').onclick = closeDrawer;
  $('#dNota').oninput = (e) => (notas[id] = e.target.value);
  $('#dDrop').onclick = () => { statusMap[id] = 'descartado'; closeDrawer(); renderComentarios(); toast('Comentário descartado', { label: 'Desfazer', onClick: () => { statusMap[id] = 'novo'; renderComentarios(); } }); };
  $('#dKeep').onclick = () => { statusMap[id] = 'mantido'; closeDrawer(); renderComentarios(); toast('Mantido no relatório'); };
}
function closeDrawer() { $('#drawer').classList.remove('show'); $('#scrim').classList.remove('show'); }
$('#scrim').onclick = closeDrawer;

/* ---------- RELATÓRIOS (lista) ---------- */
function viewRelatorios() {
  renderTopbar();
  view.innerHTML = `
    ${viewHead('Relatórios', 'Relatórios executivos gerados a partir das varreduras. Prontos para exportação e uso em prospecção jurídica.', '')}
    <div class="card table-card"><table>
      <thead><tr><th>Relatório</th><th>Perfil</th><th>Data</th><th>Status</th></tr></thead>
      <tbody>${RELATORIOS.map((r) => `<tr onclick="location.hash='#/relatorio/${r.id}'"><td><span class="u">${r.id}</span></td><td>${esc(r.perfil)} <span style="color:var(--muted-2)">@${esc(r.handle)}</span></td><td class="num">${fmtData(r.data, true)}</td><td>${statusBadge(r.status)}</td></tr>`).join('')}</tbody>
    </table></div>`;
}

/* ---------- RELATÓRIO (documento estilo PDF) ---------- */
function viewRelatorio(id) {
  renderTopbar();
  let P, categorias, ofensores, comentarios, insights, sugestoes, total, dataEmissao, rid;
  if (id === 'atual') {
    P = current.perfil; categorias = current.categorias; ofensores = current.ofensores;
    comentarios = current.comentarios; insights = current.insights; sugestoes = current.sugestoes;
    total = current.totalRelevantes; dataEmissao = new Date().toISOString(); rid = current.real ? 'RPT-AO-VIVO' : 'RPT-DEMO';
  } else {
    const r = RELATORIOS.find((x) => x.id === id) || RELATORIOS[0];
    P = { nome: r.perfil, handle: r.handle, score: r.score, redes: ['instagram'], periodo: '90 dias', totalAnalisados: 1240, relevantes: Math.round(r.score * 1.4) };
    categorias = CATEGORIAS; ofensores = OFENSORES; comentarios = COMENTARIOS; insights = INSIGHTS; sugestoes = SUGESTOES; total = TOTAL_RELEVANTES; dataEmissao = r.data; rid = r.id;
  }
  const f = faixaDe(P.score);
  const flagged = categorias.filter((c) => c.flag && c.qtd > 0);
  const topOf = ofensores.slice(0, 4);
  const topCmt = comentarios.filter((c) => catById[c.categoria].flag).slice(0, 4);
  view.innerHTML = `
    <div class="report-toolbar"><a class="btn btn-ghost" href="#/relatorios">${svg('back')} Voltar</a><div class="sp"></div><button class="btn btn-ghost" onclick="window.print()">${svg('print')} Imprimir</button><button class="btn btn-primary" id="exp">${svg('download')} Exportar PDF</button></div>
    <div class="paper">
      <div class="paper-head">
        <div class="rk"><div class="paper-brand"><div class="m">${svg('scale')}</div> Juriscan</div><div class="conf-label">Confidencial · ${rid}</div></div>
        <h1>Relatório de Inteligência Reputacional</h1>
        <div class="who">${esc(P.nome)} · @${esc(P.handle)}</div>
        <div class="rmeta"><div><b>${fmtData(dataEmissao, true)}</b>Data de emissão</div><div><b>${P.periodo}</b>Período analisado</div><div><b>${nf(P.totalAnalisados)}</b>Comentários analisados</div><div><b>${P.relevantes}</b>Relevantes</div></div>
      </div>
      <div class="paper-body">
        <section><h2>Resumo executivo</h2><p>Esta análise foi conduzida pela plataforma Juriscan sobre o perfil público de <b>${esc(P.nome)}</b> (@${esc(P.handle)}). Foram processados os comentários públicos do período e sinalizados aqueles com indícios de possíveis crimes contra a honra (arts. 138, 139 e 140 do Código Penal). A ferramenta organiza e prioriza os indícios; <b>nenhuma conclusão jurídica foi realizada</b> — a validação e a decisão cabem ao advogado.</p></section>
        <section><h2>Score de risco reputacional</h2><div class="paper-score"><div class="big" style="color:${f.cor}">${P.score}<span style="font-size:20px;color:var(--muted-2)">/100</span></div><div><div class="badge" style="background:${f.cor}14;color:${f.cor};font-size:13px"><span class="bdot" style="background:${f.cor}"></span>Risco ${f.nome}</div><p style="margin-top:8px">${f.desc} Índice composto por volume, recorrência, crescimento, reincidência de autores e teor das mensagens.</p></div></div></section>
        <section><h2>Principais ofensores</h2><ul class="report-list">${topOf.map((o) => `<li><span><b>@${esc(o.handle)}</b> — ${o.ataques} comentários sinalizados, score ${o.score}${o.prioritario ? ' · <b style="color:var(--r-critico)">prioritário</b>' : ''} (${REDES[o.rede].nome})</span></li>`).join('') || '<li><span>Sem ofensores recorrentes nesta amostra.</span></li>'}</ul></section>
        <section><h2>Comentários relevantes</h2><ul class="report-list">${topCmt.map((c) => `<li><span>"${esc(c.texto)}" — <b>@${esc(c.autor)}</b>, ${catById[c.categoria].nome} (confiança ${c.confianca}%). ${esc(c.obs)}</span></li>`).join('') || '<li><span>Nenhum comentário sinalizado nesta amostra.</span></li>'}</ul></section>
        <section><h2>Distribuição por categoria</h2><ul class="report-list">${flagged.map((c) => `<li><span><b>${c.nome}</b> — ${c.qtd} ocorrências (${Math.round((c.qtd / Math.max(total, 1)) * 100)}%)${c.artigo !== '—' ? ' · ' + c.artigo : ''}</span></li>`).join('') || '<li><span>Sem sinalizações.</span></li>'}</ul></section>
        <section><h2>Insights da IA</h2><ul class="report-list">${insights.map((t) => `<li><span>${esc(t)}</span></li>`).join('')}</ul></section>
        <section><h2>Sugestões (necessitam validação)</h2><ul class="report-list">${sugestoes.map((t) => `<li><span>${esc(t)}</span></li>`).join('')}</ul></section>
      </div>
      <div class="paper-foot">Documento gerado por Juriscan · As classificações são probabilísticas e necessitam validação jurídica. A plataforma não afirma a existência de crime e não substitui a análise do advogado. Uso restrito e confidencial.</div>
    </div>`;
  $('#exp').onclick = () => { toast('Use Imprimir → Salvar como PDF'); setTimeout(() => window.print(), 400); };
}

/* ---------- PERFIS ---------- */
function viewPerfis() {
  renderTopbar();
  view.innerHTML = `
    ${viewHead('Perfis', 'Figuras públicas já analisadas pela plataforma. Cada perfil concentra suas varreduras e o score reputacional mais recente.', `<a class="btn btn-brand" href="#/nova">${svg('plus')} Analisar novo perfil</a>`)}
    <div class="grid grid-3">${PERFIS.map((p) => { const f = faixaDe(p.score); return `<div class="card profile-card" data-h="${esc(p.handle)}"><div class="ph"><div class="pav">${initials(p.nome)}</div><div class="pn">${esc(p.nome)}<small>@${esc(p.handle)}</small></div></div><div class="pr">${p.redes.map(netChip).join('')}</div><div style="display:flex;align-items:center;gap:12px"><div style="flex:1">${miniScore(p.score)}</div><span class="badge" style="background:${f.cor}14;color:${f.cor}"><span class="bdot" style="background:${f.cor}"></span>Risco ${f.nome}</span></div><div class="pfoot"><span>${p.varreduras} varreduras</span><span>última ${fmtData(p.ultima, true)}</span></div></div>`; }).join('')}</div>`;
  view.querySelectorAll('[data-h]').forEach((el) => { el.onclick = () => { current = MOCK_DATASET; resetStatus(current); location.hash = '#/resultado'; }; });
}

/* ---------- INSIGHTS IA ---------- */
function viewInsights() {
  renderTopbar();
  const flagged = CATEGORIAS.filter((c) => c.flag);
  view.innerHTML = `
    ${viewHead('Insights IA', 'Padrões e tendências detectados pela inteligência artificial em todas as varreduras. Leituras probabilísticas — não são conclusões jurídicas.', '')}
    <div class="grid"><div class="insight-hero"><div class="ih-head"><div class="ih-ico">${svg('ai')}</div><div><h3>Leitura consolidada</h3><small>@${PERFIL.handle} · varredura mais recente</small></div></div>
      <div class="insight-list">${INSIGHTS.map((t, i) => `<div class="insight-item ${i === 1 || i === 2 ? 'warn' : ''}"><span class="ib">${svg(i === 1 ? 'trend' : i === 2 ? 'alert' : 'spark')}</span><p>${esc(t)}</p></div>`).join('')}</div>
      <div class="disclaimer">${svg('info')}<span>Sempre validar juridicamente. A IA usa termos como <b>possível</b>, <b>potencial</b> e <b>indício</b> — nunca afirma crime.</span></div></div></div>
    <div class="grid grid-2" style="margin-top:20px;align-items:start">
      <div class="card chart-card"><h3>Tendência de ataques</h3><div class="sub">Volume semanal sinalizado</div>${areaChart(EVOLUCAO, '#E5484D')}</div>
      <div class="card chart-card"><h3>Composição das sinalizações</h3><div class="sub">Por categoria</div><div class="bars">${flagged.map((c) => `<div class="bar-row"><span class="bl"><span class="bdot" style="width:8px;height:8px;border-radius:3px;background:${c.cor}"></span>${c.curto}</span><span class="bt"><span class="bf" style="width:${(c.qtd / Math.max(...flagged.map((x) => x.qtd))) * 100}%;background:${c.cor}"></span></span><span class="bn">${c.qtd}</span></div>`).join('')}</div></div>
    </div>
    <div class="sec-head"><h3>Sugestões da IA</h3></div>
    <div class="grid grid-2">${SUGESTOES.map((s) => `<div class="card" style="padding:16px;display:flex;gap:12px;align-items:flex-start"><span class="ib" style="width:26px;height:26px;border-radius:8px;background:var(--brand-soft);color:var(--brand);display:grid;place-items:center;flex-shrink:0">${svg('arrowRight')}</span><p style="font-size:13.5px;color:var(--ink-2);line-height:1.5">${esc(s)}</p></div>`).join('')}</div>`;
}

/* ============================================================================
   TOAST
   ============================================================================ */
let toastT;
function toast(msg, action) {
  const t = $('#toast');
  t.innerHTML = `${svg('check')}<span>${esc(msg)}</span>${action ? `<button class="toast-undo">${esc(action.label)}</button>` : ''}`;
  t.classList.add('show');
  const u = t.querySelector('.toast-undo');
  if (u) u.onclick = () => { action.onClick(); t.classList.remove('show'); clearTimeout(toastT); };
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('show'), action ? 4500 : 2600);
}

/* ============================================================================
   ROUTER
   ============================================================================ */
function router() {
  const hash = location.hash.replace('#/', '') || 'dashboard';
  const [route, param] = hash.split('/');
  closeDrawer();
  $('#sidebar').classList.remove('open');
  window.scrollTo(0, 0);
  const navActive = { dashboard: 'dashboard', nova: 'nova', loading: 'nova', resultado: 'nova', relatorios: 'relatorios', relatorio: 'relatorios', perfis: 'perfis', insights: 'insights' }[route] || 'dashboard';
  renderSidebar(navActive);
  ({
    dashboard: viewDashboard, nova: viewNova, loading: viewLoading, resultado: viewResultado,
    relatorios: viewRelatorios, relatorio: () => viewRelatorio(param), perfis: viewPerfis, insights: viewInsights,
  }[route] || viewDashboard)();
}
window.addEventListener('hashchange', router);
router();
