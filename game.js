/* ============================================================
   던전 디펜스 - 메인 게임 스크립트
   ============================================================ */

/* ---------------- 데이터 ---------------- */

const RARITIES = {
  common:    { label: '일반',    cls: 'rarity-common',    color: '#9d9da6', weight: 55 },
  rare:      { label: '레어',    cls: 'rarity-rare',      color: '#4da6ff', weight: 27 },
  epic:      { label: '에픽',    cls: 'rarity-epic',      color: '#b366ff', weight: 12 },
  legendary: { label: '레전더리', cls: 'rarity-legendary', color: '#ffb84d', weight: 5 },
  mythic:    { label: '신화',    cls: 'rarity-mythic',    color: '#ff5c8a', weight: 1 },
};
const RARITY_ORDER = ['common', 'rare', 'epic', 'legendary', 'mythic'];

const CATEGORIES = [
  { id: 'sword', label: '칼', icon: 'sword' },
  { id: 'armor', label: '갑옷', icon: 'armor' },
  { id: 'weapon', label: '무기', icon: 'weapon' },
];

const ITEMS = [
  { id: 'sw_short', name: '녹슨 단검', cat: 'sword', rarity: 'common', baseDmg: 8, baseRange: 60, shape: 'blade-straight', desc: '오래되어 녹이 슬었지만 여전히 날카롭다.' },
  { id: 'sw_curve', name: '초승달 검', cat: 'sword', rarity: 'rare', baseDmg: 14, baseRange: 70, shape: 'blade-curve', desc: '달빛 아래에서만 진가를 발휘하는 곡검.' },
  { id: 'sw_fire', name: '화염의 대검', cat: 'sword', rarity: 'epic', baseDmg: 24, baseRange: 80, shape: 'blade-flame', desc: '베인 상처에서 불꽃이 피어오른다.' },
  { id: 'sw_holy', name: '천상의 성검', cat: 'sword', rarity: 'legendary', baseDmg: 40, baseRange: 90, shape: 'blade-holy', desc: '빛의 신이 내려준 성스러운 검.' },
  { id: 'sw_void', name: '공허의 칼날', cat: 'sword', rarity: 'mythic', baseDmg: 70, baseRange: 100, shape: 'blade-void', desc: '차원의 틈에서 건져올린 금단의 검.' },

  { id: 'ar_cloth', name: '수련생의 로브', cat: 'armor', rarity: 'common', baseDmg: 0, baseRange: 0, def: 6, shape: 'armor-cloth', desc: '얇지만 발이 가벼워진다.' },
  { id: 'ar_leather', name: '가죽 갑주', cat: 'armor', rarity: 'rare', def: 12, shape: 'armor-leather', desc: '사냥꾼들이 즐겨 입는 튼튼한 가죽 갑옷.' },
  { id: 'ar_plate', name: '기사단의 판금', cat: 'armor', rarity: 'epic', def: 22, shape: 'armor-plate', desc: '왕국 근위 기사단의 정식 갑옷.' },
  { id: 'ar_dragon', name: '용린 갑주', cat: 'armor', rarity: 'legendary', def: 38, shape: 'armor-dragon', desc: '고대 용의 비늘로 두들겨 만들었다.' },
  { id: 'ar_abyss', name: '심연의 갑주', cat: 'armor', rarity: 'mythic', def: 60, shape: 'armor-abyss', desc: '어둠 그 자체를 두른 듯한 갑옷.' },

  { id: 'wp_sling', name: '낡은 새총', cat: 'weapon', rarity: 'common', baseDmg: 10, baseRange: 220, shape: 'gun-sling', aimStyle: 'dotted', desc: '아이들 장난감처럼 보이지만 꽤 아프다.' },
  { id: 'wp_cross', name: '사냥꾼의 석궁', cat: 'weapon', rarity: 'rare', baseDmg: 18, baseRange: 260, shape: 'gun-cross', aimStyle: 'dotted', desc: '먼 거리의 몬스터도 정확히 꿰뚫는다.' },
  { id: 'wp_cannon', name: '폭열 캐논', cat: 'weapon', rarity: 'epic', baseDmg: 30, baseRange: 300, shape: 'gun-cannon', aimStyle: 'block', desc: '한 발 한 발이 작은 폭발을 일으킨다.' },
  { id: 'wp_laser', name: '별빛 레이저포', cat: 'weapon', rarity: 'legendary', baseDmg: 50, baseRange: 340, shape: 'gun-laser', aimStyle: 'trident', desc: '별의 힘을 압축해 발사하는 병기.' },
  { id: 'wp_star', name: '종말의 별포', cat: 'weapon', rarity: 'mythic', baseDmg: 85, baseRange: 380, shape: 'gun-star', aimStyle: 'trident', desc: '전설 속에서만 전해지던 궁극의 무기.' },
];

const DUNGEON_THEMES = [
  { c1: '#7fd48a', c2: '#2f7a45', bg1: '#233d2a', bg2: '#14241a' },
  { c1: '#7fc4d4', c2: '#2f6f7a', bg1: '#1f363d', bg2: '#101f24' },
  { c1: '#c4b87f', c2: '#7a6f2f', bg1: '#3d3a1f', bg2: '#242210' },
  { c1: '#d49a7f', c2: '#7a4a2f', bg1: '#3d281f', bg2: '#241510' },
  { c1: '#c47fd4', c2: '#6f2f7a', bg1: '#361f3d', bg2: '#1f1024' },
  { c1: '#d47f9a', c2: '#7a2f4a', bg1: '#3d1f28', bg2: '#240f15' },
  { c1: '#d4a87f', c2: '#7a552f', bg1: '#3d301f', bg2: '#241b10' },
  { c1: '#9a9ad4', c2: '#4a4a7a', bg1: '#26263d', bg2: '#151524' },
  { c1: '#d47f7f', c2: '#7a2f2f', bg1: '#3d1f1f', bg2: '#240f0f' },
  { c1: '#4a4a52', c2: '#c41e1e', bg1: '#1c1c1e', bg2: '#0a0a0b' },
];
const DUNGEON_NAMES = ['초록 숲 입구', '이끼 낀 동굴', '메마른 협곡', '용암 지대', '보랏빛 늪지', '핏빛 신전', '황금 사막', '푸른 빙하', '핏빛 폐허', '심연의 나락'];

const DUNGEONS = DUNGEON_NAMES.map((name, i) => ({
  id: i + 1,
  name,
  waves: 10,
  theme: DUNGEON_THEMES[i],
  enemyHp: 20 + i * 18,
  enemySpeed: 0.35 + i * 0.035,
  reward: { gold: 40 + i * 25, gem: i >= 4 ? (i - 3) : 0 },
}));

const BOSSES = [
  { id: 1, name: '슬라임 여왕', hp: 500, color1: '#7fe08a', color2: '#2f8a45', shape: 'slime', reward: { gold: 300, gem: 8 } },
  { id: 2, name: '해골 군주', hp: 750, color1: '#d8d8d8', color2: '#5a5a5a', shape: 'skull', reward: { gold: 420, gem: 10 } },
  { id: 3, name: '망령 백작', hp: 950, color1: '#b38aff', color2: '#4a2a8a', shape: 'ghost', reward: { gold: 560, gem: 13 } },
  { id: 4, name: '용암 골렘', hp: 1300, color1: '#ff8a4a', color2: '#8a2a0a', shape: 'golem', reward: { gold: 720, gem: 16 } },
  { id: 5, name: '칠흑룡 벨카누스', hp: 1800, color1: '#7a5cff', color2: '#1a0a3a', shape: 'dragon', reward: { gold: 1000, gem: 22 } },
];

const CHALLENGE_NAMES = ['수습 시험', '전사의 길', '베테랑의 시련', '악몽의 미로', '심판의 방', '지옥문', '진 지옥'];
const CHALLENGES = CHALLENGE_NAMES.map((name, i) => ({
  id: i + 1,
  name,
  waves: 6 + i,
  enemyHp: 30 + i * 30,
  enemySpeed: 0.4 + i * 0.05,
  hellLevel: i,
  reward: { gold: 60 + i * 40, gem: 2 + i * 2 },
}));

const MERCHANTS = [
  { id: 'gen', name: '잡화상 토미', type: 'general', discount: '가죽 갑주 30% 할인!',
    items: [ { itemId: 'sw_short', price: 200, discount: false }, { itemId: 'ar_leather', price: 480, discount: true },
             { itemId: 'wp_sling', price: 260, discount: false } ] },
  { id: 'smith', name: '대장장이 그론', type: 'smith', discount: '기사단 판금 특가!',
    items: [ { itemId: 'sw_fire', price: 1400, discount: false }, { itemId: 'ar_plate', price: 1600, discount: true },
             { itemId: 'wp_cross', price: 900, discount: false } ] },
  { id: 'witch', name: '???', type: 'witch', discount: '수상한 물건이 있다...',
    items: [ { itemId: 'sw_void', price: 6000, discount: false }, { itemId: 'ar_abyss', price: 6500, discount: true },
             { itemId: 'wp_star', price: 7200, discount: false } ] },
  { id: 'kid', name: '꼬마 상인 삐삐', type: 'kid', discount: '새총 반값 세일~!',
    items: [ { itemId: 'wp_sling', price: 130, discount: true }, { itemId: 'sw_curve', price: 620, discount: false },
             { itemId: 'ar_cloth', price: 90, discount: false } ] },
];

/* ---------------- 상태 관리 ---------------- */

const SAVE_KEY = 'dungeon_defense_save_v1';

function defaultState() {
  const inv = {};
  ITEMS.forEach(it => {
    inv[it.id] = { owned: it.rarity === 'common', level: it.rarity === 'common' ? 1 : 0, awakened: [] };
  });
  return {
    gold: 500,
    gem: 100,
    equipped: { sword: 'sw_short', armor: 'ar_cloth', weapon: 'wp_sling' },
    inventory: inv,
    dungeonCleared: 0,
    bossCleared: 0,
    pity: { common: 0, rare: 0, epic: 0, legendary: 0 },
  };
}

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) return Object.assign(defaultState(), JSON.parse(raw));
  } catch (e) {}
  return defaultState();
}
function save() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function getItem(id) { return ITEMS.find(i => i.id === id); }

function itemPower(id) {
  const it = getItem(id);
  const inv = state.inventory[id];
  if (!inv || !inv.owned) return { dmg: 0, range: 0, def: 0 };
  const lvl = Math.max(1, inv.level);
  const mult = 1 + (lvl - 1) * 0.18 + inv.awakened.length * 0.12;
  return {
    dmg: Math.round((it.baseDmg || 0) * mult),
    range: Math.round((it.baseRange || 0) * (1 + (lvl - 1) * 0.04)),
    def: Math.round((it.def || 0) * mult),
  };
}

/* ---------------- 내비게이션 ---------------- */

function nav(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + screenId).classList.add('active');
  if (screenId === 'lobby') refreshCurrencyDisplays();
  if (screenId === 'type-select') buildTypeList();
  if (screenId === 'dungeon-list') buildDungeonList();
  if (screenId === 'boss-list') buildBossList();
  if (screenId === 'challenge-list') buildChallengeList();
  if (screenId === 'equip') buildEquip();
  if (screenId === 'shop') buildShop();
  if (screenId === 'gacha') buildGacha();
}

document.querySelectorAll('[data-nav]').forEach(btn => {
  btn.addEventListener('click', () => nav(btn.dataset.nav));
});

function refreshCurrencyDisplays() {
  ['lobby-gold', 'shop-gold'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = state.gold; });
  ['lobby-gem', 'shop-gem', 'gacha-gem'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = state.gem; });
}

/* ---------------- 아이콘 드로잉 (SVG 문자열) ---------------- */

function rarityGrad(rarity) {
  const r = RARITIES[rarity];
  return `radial-gradient(circle at 35% 30%, ${lighten(r.color)}, ${r.color})`;
}
function lighten(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, ((n >> 16) & 255) + 60);
  const g = Math.min(255, ((n >> 8) & 255) + 60);
  const b = Math.min(255, (n & 255) + 60);
  return `rgb(${r},${g},${b})`;
}

function itemThumbSVG(item) {
  const col = RARITIES[item.rarity].color;
  const col2 = lighten(col);
  const shapes = {
    'blade-straight': `<rect x="26" y="4" width="8" height="40" rx="3" fill="${col2}"/><rect x="20" y="42" width="20" height="8" rx="3" fill="#5a4a3a"/>`,
    'blade-curve': `<path d="M30 4 Q46 24 30 46 Q26 30 22 24 Q26 14 30 4Z" fill="${col2}"/><rect x="24" y="44" width="12" height="8" rx="3" fill="#5a4a3a"/>`,
    'blade-flame': `<path d="M30 2 Q40 16 30 26 Q38 34 30 46 Q22 34 30 26 Q20 16 30 2Z" fill="${col2}"/><rect x="24" y="46" width="12" height="6" rx="3" fill="#3a2a1a"/>`,
    'blade-holy': `<rect x="27" y="4" width="6" height="34" rx="3" fill="${col2}"/><path d="M14 20 H46" stroke="${col}" stroke-width="6" stroke-linecap="round"/><circle cx="30" cy="46" r="6" fill="${col2}"/>`,
    'blade-void': `<path d="M30 2 L38 20 L30 46 L22 20 Z" fill="${col2}"/><circle cx="30" cy="20" r="5" fill="#000"/>`,
    'armor-cloth': `<path d="M18 12 Q30 4 42 12 L46 44 Q30 52 14 44 Z" fill="${col2}"/><rect x="24" y="6" width="12" height="8" fill="${col}"/>`,
    'armor-leather': `<path d="M16 14 L30 6 L44 14 L42 46 Q30 52 18 46 Z" fill="${col2}" stroke="#4a3220" stroke-width="2"/>`,
    'armor-plate': `<path d="M16 12 L30 4 L44 12 L44 30 Q44 46 30 52 Q16 46 16 30 Z" fill="${col2}" stroke="#888" stroke-width="2"/><rect x="24" y="24" width="12" height="6" fill="${col}"/>`,
    'armor-dragon': `<path d="M14 14 L30 4 L46 14 L44 32 Q44 48 30 54 Q16 48 16 32 Z" fill="${col2}"/><circle cx="24" cy="20" r="3" fill="${col}"/><circle cx="36" cy="20" r="3" fill="${col}"/><circle cx="30" cy="30" r="3" fill="${col}"/>`,
    'armor-abyss': `<path d="M14 16 L30 4 L46 16 L42 50 Q30 56 18 50 Z" fill="#1a1428" stroke="${col}" stroke-width="2"/>`,
    'gun-sling': `<path d="M18 46 L26 14 L34 14 L42 46" stroke="${col2}" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="24" y="42" width="12" height="8" fill="#5a4a3a"/>`,
    'gun-cross': `<rect x="10" y="24" width="40" height="5" fill="${col2}"/><rect x="27" y="10" width="6" height="34" fill="#5a4a3a"/><path d="M14 26 Q30 16 46 26" stroke="${col}" stroke-width="2" fill="none"/>`,
    'gun-cannon': `<rect x="14" y="20" width="32" height="16" rx="6" fill="${col2}"/><circle cx="46" cy="28" r="9" fill="${col}"/>`,
    'gun-laser': `<rect x="12" y="24" width="36" height="10" rx="5" fill="${col2}"/><circle cx="46" cy="29" r="6" fill="#fff"/><rect x="16" y="18" width="8" height="22" fill="${col}"/>`,
    'gun-star': `<path d="M30 6 L34 24 L52 24 L38 34 L44 52 L30 41 L16 52 L22 34 L8 24 L26 24 Z" fill="${col2}"/>`,
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="100%" height="100%">${shapes[item.shape] || ''}</svg>`;
}

function svgToBg(svg) {
  return `url('data:image/svg+xml,${encodeURIComponent(svg)}')`;
}

/* ---------------- 유형 선택 화면 ---------------- */

function buildTypeList() {
  const list = document.getElementById('type-list');
  list.innerHTML = `
    <div class="card-wide type-dungeon" data-nav="dungeon-list">
      <div class="card-icon"></div>
      <div class="card-text">
        <p class="card-title">던전</p>
        <p class="card-sub">웨이브를 막아내고 던전을 정복하라</p>
      </div>
      <span class="card-tag">${state.dungeonCleared}/10 클리어</span>
    </div>
    <div class="card-wide type-boss" data-nav="boss-list">
      <div class="card-icon"></div>
      <div class="card-text">
        <p class="card-title">보스 토벌</p>
        <p class="card-sub">강력한 보스와 1:1로 맞서라</p>
      </div>
      <span class="card-tag">${state.bossCleared}/5 처치</span>
    </div>
    <div class="card-wide type-challenge" data-nav="challenge-list">
      <div class="card-icon"></div>
      <div class="card-text">
        <p class="card-title">챌린지</p>
        <p class="card-sub">아래로 갈수록 지옥같은 난이도</p>
      </div>
      <span class="card-tag">특별 보상</span>
    </div>`;
  list.querySelectorAll('.card-wide').forEach(el => el.addEventListener('click', () => nav(el.dataset.nav)));
}

function buildDungeonList() {
  const list = document.getElementById('dungeon-list');
  list.innerHTML = '';
  DUNGEONS.forEach((d, i) => {
    const locked = i > state.dungeonCleared;
    const card = document.createElement('div');
    card.className = 'card-wide dungeon-card' + (locked ? ' locked' : '');
    card.style.setProperty('--c1', d.theme.c1);
    card.style.setProperty('--c2', d.theme.c2);
    card.style.setProperty('--bg1', d.theme.bg1);
    card.style.setProperty('--bg2', d.theme.bg2);
    card.innerHTML = `
      <div class="card-icon"></div>
      <div class="card-text">
        <p class="card-title">${i + 1}. ${d.name}</p>
        <p class="card-sub">웨이브 ${d.waves} · 난이도 ${'★'.repeat(Math.min(5, 1 + Math.floor(i / 2)))}</p>
      </div>
      ${locked ? `<div class="lock-icon"><div class="shackle"></div><div class="body"></div></div>` : `<span class="card-tag">${i < state.dungeonCleared ? '클리어' : '도전 가능'}</span>`}
    `;
    if (!locked) card.addEventListener('click', () => startRun({ mode: 'dungeon', data: d }));
    list.appendChild(card);
  });
}

function buildBossList() {
  const list = document.getElementById('boss-list');
  list.innerHTML = '';
  BOSSES.forEach((b, i) => {
    const locked = i > state.bossCleared;
    const card = document.createElement('div');
    card.className = 'card-wide boss-card' + (locked ? ' locked' : '');
    card.style.setProperty('--c1', `radial-gradient(circle,${lighten(b.color1)},${b.color2})`);
    card.style.setProperty('--bg1', b.color2 + '55');
    card.style.setProperty('--bg2', '#1a1424');
    card.innerHTML = `
      <div class="card-icon" style="background:radial-gradient(circle at 35% 30%,${lighten(b.color1)},${b.color2});border-radius:50% 50% 40% 40%;"></div>
      <div class="card-text">
        <p class="card-title">${b.name}</p>
        <p class="card-sub">체력 ${b.hp}</p>
      </div>
      ${locked ? `<div class="lock-icon"><div class="shackle"></div><div class="body"></div></div>` : `<span class="card-tag">${i < state.bossCleared ? '처치완료' : '도전 가능'}</span>`}
    `;
    if (!locked) card.addEventListener('click', () => startRun({ mode: 'boss', data: b }));
    list.appendChild(card);
  });
}

function buildChallengeList() {
  const list = document.getElementById('challenge-list');
  list.innerHTML = '';
  CHALLENGES.forEach((c, i) => {
    const t = i / (CHALLENGES.length - 1);
    const bg1 = mixColor('#233d2a', '#3d0a0a', t);
    const bg2 = mixColor('#14241a', '#1a0505', t);
    const c1 = mixColor('#7fd48a', '#ff3b3b', t);
    const c2 = mixColor('#2f7a45', '#5a0a0a', t);
    const card = document.createElement('div');
    card.className = 'card-wide challenge-card';
    card.style.setProperty('--bg1', bg1); card.style.setProperty('--bg2', bg2);
    card.style.setProperty('--c1', c1); card.style.setProperty('--c2', c2);
    card.innerHTML = `
      <div class="card-icon"></div>
      <div class="card-text">
        <p class="card-title">${c.name}</p>
        <p class="card-sub">웨이브 ${c.waves} · ${i === CHALLENGES.length - 1 ? '지옥 그 자체' : '난이도 ' + (i + 1)}</p>
      </div>
      <span class="card-tag">보상 ↑</span>
    `;
    card.addEventListener('click', () => startRun({ mode: 'challenge', data: c }));
    list.appendChild(card);
  });
}

function mixColor(a, b, t) {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const ar = (pa >> 16) & 255, ag = (pa >> 8) & 255, ab = pa & 255;
  const br = (pb >> 16) & 255, bg = (pb >> 8) & 255, bb = pb & 255;
  const r = Math.round(ar + (br - ar) * t), g = Math.round(ag + (bg - ag) * t), bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${bl})`;
}

/* ---------------- 장비 화면 ---------------- */

let currentCat = 'sword';

function buildEquip() {
  const catsEl = document.getElementById('equip-cats');
  catsEl.innerHTML = '';
  CATEGORIES.forEach(c => {
    const b = document.createElement('button');
    b.className = 'cat-btn' + (c.id === currentCat ? ' active' : '');
    b.innerHTML = `<div class="cat-ico" style="background:${lighten('#5a2fbf')}"></div>${c.label}`;
    b.addEventListener('click', () => { currentCat = c.id; buildEquip(); });
    catsEl.appendChild(b);
  });
  const listEl = document.getElementById('equip-list');
  listEl.innerHTML = '';
  ITEMS.filter(it => it.cat === currentCat).forEach(it => {
    const inv = state.inventory[it.id];
    const owned = inv && inv.owned;
    const equipped = state.equipped[it.cat] === it.id;
    const card = document.createElement('div');
    card.className = `item-card ${RARITIES[it.rarity].cls}` + (equipped ? ' equipped' : '') + (inv && inv.awakened.length >= 6 ? ' awakened' : '');
    card.innerHTML = `
      <div class="item-thumb" style="background:${svgToBg(itemThumbSVG(it))} center/70% no-repeat, radial-gradient(circle,#2c2244,#150f22)"></div>
      <div class="item-info">
        <p class="item-name">${it.name}</p>
        <p class="item-rarity">${RARITIES[it.rarity].label}</p>
        <p class="item-lv">${owned ? 'Lv.' + Math.max(1, inv.level) : '미보유'}</p>
        ${owned ? `<button class="upgrade-mini-btn">${equipped ? '장착중' : '장착하기'}</button>` : ''}
      </div>
    `;
    if (owned) {
      const btn = card.querySelector('.upgrade-mini-btn');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.equipped[it.cat] = it.id; save(); buildEquip();
      });
      card.addEventListener('click', () => openUpgrade(it.id));
    }
    listEl.appendChild(card);
  });
  drawPlayerPreview(document.getElementById('playerPreviewCanvas'));
}

/* ---------------- 업그레이드 & 각성 ---------------- */

let upgradingId = null;

function upgradeCost(it, level) {
  const base = { common: 20, rare: 60, epic: 150, legendary: 400, mythic: 900 }[it.rarity];
  return Math.round(base * Math.pow(1.35, level));
}

function openUpgrade(itemId) {
  upgradingId = itemId;
  nav('upgrade');
  renderUpgrade();
}

function renderUpgrade() {
  const it = getItem(upgradingId);
  const inv = state.inventory[upgradingId];
  document.getElementById('upgrade-item-name').textContent = it.name;
  document.getElementById('upgrade-desc').textContent = it.desc;
  const lvl = Math.max(1, inv.level);
  const pow = itemPower(upgradingId);
  document.getElementById('up-level').textContent = lvl + (inv.awakened.length ? ` (+${inv.awakened.length}각성)` : '');
  document.getElementById('up-damage').textContent = pow.dmg || pow.def;
  document.getElementById('up-range').textContent = pow.range || '-';

  const canvas = document.getElementById('upgradeItemCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawItemIcon(ctx, it, canvas.width / 2, canvas.height / 2, canvas.width * 0.8);

  const awakenBtn = document.getElementById('btn-awaken');
  const normalBody = document.getElementById('upgrade-body-normal');
  awakenBtn.style.display = lvl >= 10 ? 'block' : 'none';

  const cost = upgradeCost(it, lvl);
  const costEl = document.getElementById('upgrade-cost');
  const confirmBtn = document.getElementById('btn-upgrade-confirm');
  const changeEl = document.getElementById('upgrade-change');

  if (lvl >= 10) {
    changeEl.textContent = '최대 레벨 도달! 각성으로 더 강해질 수 있어요.';
    costEl.textContent = '';
    confirmBtn.style.display = 'none';
  } else {
    const nextPow = Math.round((it.baseDmg || it.def || 0) * (1 + lvl * 0.18));
    changeEl.textContent = `${(it.baseDmg ? '데미지' : '방어력')} ${pow.dmg || pow.def} → ${nextPow}`;
    costEl.textContent = `필요 골드: ${cost}`;
    confirmBtn.style.display = 'block';
    confirmBtn.classList.toggle('disabled', state.gold < cost);
    confirmBtn.onclick = () => {
      if (state.gold < cost) return;
      state.gold -= cost;
      inv.level = lvl + 1;
      save(); refreshCurrencyDisplays(); renderUpgrade();
    };
  }

  drawPlayerPreview(document.getElementById('upgradePreviewCanvas'));

  document.getElementById('btn-awaken').onclick = () => {
    document.getElementById('upgrade-body-normal').style.display = 'none';
    document.getElementById('awaken-grid-wrap').style.display = 'flex';
    buildHexGrid();
  };
  document.getElementById('btn-awaken-back').onclick = () => {
    document.getElementById('upgrade-body-normal').style.display = 'flex';
    document.getElementById('awaken-grid-wrap').style.display = 'none';
    renderUpgrade();
  };
  document.getElementById('upgrade-body-normal').style.display = 'flex';
  document.getElementById('awaken-grid-wrap').style.display = 'none';
}

function buildHexGrid() {
  const grid = document.getElementById('hex-grid');
  grid.innerHTML = '';
  const inv = state.inventory[upgradingId];
  const it = getItem(upgradingId);
  for (let i = 0; i < 9; i++) {
    const hex = document.createElement('div');
    const done = inv.awakened.includes(i);
    const available = !done && (i === 0 || inv.awakened.includes(i - 1)) && inv.awakened.length < 9;
    hex.className = 'hex' + (done ? ' done' : '') + (available ? ' available' : '');
    hex.textContent = done ? '✦' : (i + 1);
    if (available) {
      hex.addEventListener('click', () => {
        const cost = 200 * (i + 1);
        if (state.gem < cost) { flashMsg('마력석이 부족합니다'); return; }
        state.gem -= cost;
        inv.awakened.push(i);
        save(); refreshCurrencyDisplays(); buildHexGrid();
        if (inv.awakened.length >= 9) flashMsg(`${it.name} 완전 각성!`);
      });
    }
    grid.appendChild(hex);
  }
}

function flashMsg(msg) {
  const el = document.createElement('div');
  el.textContent = msg;
  el.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.8);color:#fff;padding:10px 20px;border-radius:12px;z-index:999;font-size:0.85rem;';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1800);
}

/* ---------------- 캐릭터/아이템 드로잉 (탕탕특공대 스타일) ---------------- */

function drawPlayerPreview(canvas) {
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);
  drawAdventurer(ctx, rect.width / 2, rect.height * 0.66, rect.height * 0.56, state.equipped, 0);
}

function darken(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, ((n >> 16) & 255) - amt);
  const g = Math.max(0, ((n >> 8) & 255) - amt);
  const b = Math.max(0, (n & 255) - amt);
  return `rgb(${r},${g},${b})`;
}

function drawAdventurer(ctx, cx, cy, scale, equipped, facing) {
  const armorIt = equipped ? getItem(equipped.armor) : null;
  const armorRarity = armorIt ? armorIt.rarity : 'common';
  const armorBase = RARITIES[armorRarity].color;
  const armorColor = darken(armorBase, 60);
  const armorDark = darken(armorBase, 100);
  ctx.save();
  ctx.translate(cx, cy);
  const s = scale / 100;
  ctx.scale(s * (facing < 0 ? -1 : 1), s);

  // 그림자
  ctx.beginPath(); ctx.ellipse(0, 48, 26, 7, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.45)'; ctx.fill();

  // 뒤쪽 망토
  ctx.beginPath();
  ctx.moveTo(-16, -18); ctx.quadraticCurveTo(-30, 20, -20, 46); ctx.lineTo(-2, 40); ctx.quadraticCurveTo(-10, 10, -6, -20); ctx.closePath();
  ctx.fillStyle = armorDark; ctx.fill();

  // 다리 / 부츠
  ctx.fillStyle = '#2a231c';
  ctx.beginPath(); ctx.roundRect(-14, 30, 11, 20, 3); ctx.fill();
  ctx.beginPath(); ctx.roundRect(4, 30, 11, 20, 3); ctx.fill();
  ctx.fillStyle = '#181310';
  ctx.beginPath(); ctx.roundRect(-16, 44, 15, 8, 3); ctx.fill();
  ctx.beginPath(); ctx.roundRect(2, 44, 15, 8, 3); ctx.fill();

  // 몸통 (각진 갑옷)
  ctx.beginPath();
  ctx.moveTo(-19, -14); ctx.lineTo(19, -14); ctx.lineTo(22, 12); ctx.lineTo(14, 32); ctx.lineTo(-14, 32); ctx.lineTo(-22, 12); ctx.closePath();
  ctx.fillStyle = armorColor; ctx.fill();
  ctx.strokeStyle = armorDark; ctx.lineWidth = 2; ctx.stroke();
  // 가슴 장식선
  ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, -12); ctx.lineTo(0, 28); ctx.stroke();
  // 벨트
  ctx.fillStyle = '#171310'; ctx.fillRect(-20, 14, 40, 7);
  ctx.fillStyle = darken(armorBase, 20); ctx.beginPath(); ctx.roundRect(-5, 13, 10, 9, 2); ctx.fill();

  // 어깨 견갑
  ctx.fillStyle = darken(armorBase, 30);
  ctx.beginPath(); ctx.roundRect(-30, -18, 16, 14, 5); ctx.fill();
  ctx.beginPath(); ctx.roundRect(14, -18, 16, 14, 5); ctx.fill();
  // 팔
  ctx.fillStyle = '#3a3028';
  ctx.beginPath(); ctx.roundRect(-27, -6, 10, 26, 5); ctx.fill();
  ctx.beginPath(); ctx.roundRect(17, -6, 10, 26, 5); ctx.fill();
  // 장갑
  ctx.fillStyle = '#211b16';
  ctx.beginPath(); ctx.roundRect(-28, 16, 12, 10, 4); ctx.fill();
  ctx.beginPath(); ctx.roundRect(16, 16, 12, 10, 4); ctx.fill();

  // 목/후드
  ctx.fillStyle = darken(armorBase, 40);
  ctx.beginPath(); ctx.arc(0, -18, 15, Math.PI * 0.05, Math.PI * 0.95, true); ctx.fill();

  // 머리 (후드 그림자 아래 얼굴 일부만)
  ctx.beginPath(); ctx.arc(0, -24, 12, 0, Math.PI * 2);
  ctx.fillStyle = '#c99a72'; ctx.fill();
  // 후드
  ctx.fillStyle = armorDark;
  ctx.beginPath(); ctx.arc(0, -27, 14, Math.PI, 0); ctx.fill();
  ctx.fillRect(-14, -27, 28, 6);
  // 얼굴 그림자 (눈 위)
  ctx.fillStyle = 'rgba(10,8,6,0.55)';
  ctx.beginPath(); ctx.ellipse(0, -23, 11, 7, 0, Math.PI, Math.PI * 2); ctx.fill();
  // 눈 (날카로운 슬릿, 무기 색으로 은은히 빛남)
  const eyeGlow = equipped ? RARITIES[getItem(equipped.weapon).rarity].color : '#9adfff';
  ctx.strokeStyle = eyeGlow; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
  ctx.shadowColor = eyeGlow; ctx.shadowBlur = 4;
  ctx.beginPath(); ctx.moveTo(-6.5, -24); ctx.lineTo(-2.5, -23.5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(2.5, -23.5); ctx.lineTo(6.5, -24); ctx.stroke();
  ctx.shadowBlur = 0;

  // 무기 (오른손에 들기)
  if (equipped) {
    const wpIt = getItem(equipped.weapon);
    if (wpIt) drawHeldWeapon(ctx, wpIt, 24, 4);
    const swIt = getItem(equipped.sword);
    if (swIt) drawHeldWeapon(ctx, swIt, -24, 4, true);
  }
  ctx.restore();
}

function drawHeldWeapon(ctx, item, x, y, flip) {
  ctx.save();
  ctx.translate(x, y);
  if (flip) ctx.scale(-1, 1);
  ctx.rotate(0.45);
  const col = RARITIES[item.rarity].color;
  const col2 = lighten(col);
  if (item.cat === 'weapon') {
    ctx.fillStyle = '#2a2620'; ctx.fillRect(-5, -20, 12, 32);
    ctx.fillStyle = col2; ctx.beginPath(); ctx.arc(1, -20, 7, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.stroke();
  } else {
    ctx.fillStyle = col2; ctx.fillRect(-3, -30, 6, 34);
    ctx.fillStyle = '#211b16'; ctx.fillRect(-6, 2, 13, 8);
  }
  ctx.restore();
}

function drawItemIcon(ctx, item, cx, cy, size) {
  ctx.save();
  ctx.translate(cx - size / 2, cy - size / 2);
  ctx.scale(size / 60, size / 60);
  const div = document.createElement('div');
  div.innerHTML = itemThumbSVG(item);
  const svgEl = div.firstChild;
  const img = new Image();
  const svgStr = new XMLSerializer().serializeToString(svgEl);
  img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgStr)));
  img.onload = () => { ctx.drawImage(img, 0, 0, 60, 60); };
  ctx.restore();
}

/* ---------------- 상점 ---------------- */

function buildShop() {
  refreshCurrencyDisplays();
  const row = document.getElementById('merchant-row');
  row.innerHTML = '';
  const gachaCard = document.createElement('div');
  gachaCard.className = 'gacha-launch';
  gachaCard.innerHTML = `
    <div class="gacha-machine" style="background:linear-gradient(160deg,#ff9ecb,#c93a7a);">
      <div class="dome"></div>
      <div class="capsule" style="top:30px;left:30px;background:#ffd166;"></div>
      <div class="capsule" style="top:24px;left:60px;background:#4da6ff;"></div>
      <div class="capsule" style="top:40px;left:75px;background:#b366ff;"></div>
      <div class="base">GACHA</div>
    </div>
    <div class="merchant-name">아이템 뽑기</div>
  `;
  gachaCard.addEventListener('click', () => nav('gacha'));
  row.appendChild(gachaCard);

  MERCHANTS.forEach(m => {
    const card = document.createElement('div');
    card.className = 'merchant-card';
    card.innerHTML = `
      <div class="merchant-bubble">${m.discount}</div>
      <div class="merchant-visual type-${m.type}">${merchantVisualInner(m.type)}</div>
      <div class="merchant-name">${m.name}</div>
    `;
    card.addEventListener('click', () => openMerchant(m));
    row.appendChild(card);
  });
}

function merchantVisualInner(type) {
  if (type === 'general') return `<div class="stall"></div><div class="npc"><div class="hat"></div><div class="head"></div><div class="body"></div></div>`;
  if (type === 'smith') return `<div class="npc"><div class="head"></div><div class="body"></div><div class="apron"></div></div><div class="anvil"></div>`;
  if (type === 'witch') return `<div class="shadow"></div><div class="eyes"><span></span><span></span></div>`;
  if (type === 'kid') return `<div class="npc"><div class="head"></div><div class="body"></div></div><div class="cart"></div>`;
  return '';
}

function openMerchant(m) {
  document.getElementById('merchant-modal-head').textContent = m.name + '의 상점';
  const list = document.getElementById('merchant-modal-list');
  list.innerHTML = '';
  m.items.forEach(entry => {
    const it = getItem(entry.itemId);
    const row = document.createElement('div');
    row.className = 'shop-item-row';
    row.innerHTML = `
      <div class="item-thumb" style="width:44px;height:44px;background:${svgToBg(itemThumbSVG(it))} center/70% no-repeat, radial-gradient(circle,#2c2244,#150f22);border-radius:10px;"></div>
      <div>
        <p class="si-name">${it.name}</p>
        <p class="si-price">${entry.discount ? `<span class="discount-tag">${Math.round(entry.price * 1.4)}</span>` : ''}${entry.price} G</p>
      </div>
      <button class="si-buy">구매</button>
    `;
    row.querySelector('.si-buy').addEventListener('click', () => {
      if (state.gold < entry.price) { flashMsg('골드가 부족합니다'); return; }
      state.gold -= entry.price;
      const inv = state.inventory[it.id];
      inv.owned = true; if (inv.level < 1) inv.level = 1;
      save(); refreshCurrencyDisplays();
      flashMsg(`${it.name} 구매 완료!`);
    });
    list.appendChild(row);
  });
  document.getElementById('merchant-modal').style.display = 'flex';
}
document.getElementById('merchant-modal-close').addEventListener('click', () => {
  document.getElementById('merchant-modal').style.display = 'none';
});

/* ---------------- 가챠 ---------------- */

const GACHA_TIERS = [
  { id: 'common', label: '일반 뽑기', price: 100, colors: ['#8d8d96', '#5c5c66'], pityMax: 10 },
  { id: 'rare', label: '레어 뽑기', price: 300, colors: ['#4da6ff', '#1c5ca8'], pityMax: 20 },
  { id: 'epic', label: '에픽 뽑기', price: 800, colors: ['#b366ff', '#6a1fbf'], pityMax: 40 },
  { id: 'legendary', label: '레전더리 뽑기', price: 2000, colors: ['#ffb84d', '#c47a10'], pityMax: 90 },
];

function buildGacha() {
  refreshCurrencyDisplays();
  const row = document.getElementById('gacha-row');
  row.innerHTML = '';
  GACHA_TIERS.forEach(t => {
    const wrap = document.createElement('div');
    wrap.className = 'gacha-tier';
    wrap.innerHTML = `
      <div class="gacha-machine" style="background:linear-gradient(160deg,${t.colors[0]},${t.colors[1]});">
        <div class="dome"></div>
        <div class="capsule" style="top:32px;left:26px;background:#fff;"></div>
        <div class="capsule" style="top:24px;left:58px;background:#fff;"></div>
        <div class="capsule" style="top:44px;left:78px;background:#fff;"></div>
        <div class="base">${t.price} 💎</div>
      </div>
      <div class="tier-name">${t.label}</div>
      <div class="pity">천장까지 ${t.pityMax - state.pity[t.id]}회</div>
      <button class="pull-btn" style="background:${t.colors[1]};">1회 뽑기</button>
    `;
    wrap.querySelector('.pull-btn').addEventListener('click', () => doGacha(t));
    row.appendChild(wrap);
  });
}

function doGacha(tier) {
  if (state.gem < tier.price) { flashMsg('마력석이 부족합니다'); return; }
  state.gem -= tier.price;
  state.pity[tier.id]++;

  const minRarityIdx = RARITY_ORDER.indexOf(tier.id);
  let pool = ITEMS.filter(it => RARITY_ORDER.indexOf(it.rarity) >= minRarityIdx);
  let result;
  if (state.pity[tier.id] >= tier.pityMax) {
    const topPool = pool.filter(it => it.rarity === RARITY_ORDER[RARITY_ORDER.length - 1] || it.rarity === 'legendary');
    result = topPool[Math.floor(Math.random() * topPool.length)] || pool[0];
    state.pity[tier.id] = 0;
  } else {
    const weighted = [];
    pool.forEach(it => { for (let i = 0; i < RARITIES[it.rarity].weight; i++) weighted.push(it); });
    result = weighted[Math.floor(Math.random() * weighted.length)];
    if (result.rarity !== 'common') state.pity[tier.id] = 0;
  }

  const inv = state.inventory[result.id];
  const isNew = !inv.owned;
  inv.owned = true;
  if (inv.level < 1) inv.level = 1; else inv.level = Math.min(10, inv.level + 1);
  save(); refreshCurrencyDisplays(); buildGacha();
  showGachaResult(result, isNew);
}

function showGachaResult(item, isNew) {
  const box = document.getElementById('gacha-result-item');
  box.innerHTML = `
    <div class="result-thumb" style="background:${svgToBg(itemThumbSVG(item))} center/70% no-repeat, radial-gradient(circle,#2c2244,#150f22)"></div>
    <div class="result-name">${item.name}</div>
    <div class="result-rarity" style="color:${RARITIES[item.rarity].color}">${RARITIES[item.rarity].label}${isNew ? ' · 신규 획득!' : ' · 강화 재료로 전환'}</div>
  `;
  document.getElementById('gacha-result-modal').style.display = 'flex';
}
document.getElementById('gacha-result-close').addEventListener('click', () => {
  document.getElementById('gacha-result-modal').style.display = 'none';
});

/* ============================================================
   게임 플레이
   ============================================================ */

const canvas = document.getElementById('gameCanvas');
const ctxG = canvas.getContext('2d');
let CW = 0, CH = 0;

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
  ctxG.setTransform(dpr, 0, 0, dpr, 0, 0);
  CW = rect.width; CH = rect.height;
}
window.addEventListener('resize', resizeCanvas);

let game = null;
const PLAYER_R = 22;

function getZone() {
  const w = Math.min(CW * 0.68, 380);
  const h = 120;
  return { cx: CW / 2, cy: CH - 260, w, h };
}
function clampToZone(x, y) {
  const z = getZone();
  return {
    x: Math.max(z.cx - z.w / 2 + PLAYER_R, Math.min(z.cx + z.w / 2 - PLAYER_R, x)),
    y: Math.max(z.cy - z.h / 2 + PLAYER_R, Math.min(z.cy + z.h / 2 - PLAYER_R, y)),
  };
}

function startRun(cfg) {
  resizeCanvas();
  nav('game');
  resizeCanvas();
  const pow = {
    dmg: itemPower(state.equipped.weapon).dmg + itemPower(state.equipped.sword).dmg,
    range: Math.max(itemPower(state.equipped.weapon).range, 160),
    def: itemPower(state.equipped.armor).def,
  };
  const baseMaxHp = 100 + pow.def * 4;
  const zone = getZone();

  game = {
    mode: cfg.mode,
    data: cfg.data,
    player: { x: zone.cx, y: zone.cy },
    moveVec: { x: 0, y: 0 },
    aim: { active: false, angle: -Math.PI / 2, kind: 'main' },
    speed: 200,
    baseHp: baseMaxHp,
    baseMaxHp,
    playerDmg: Math.max(6, pow.dmg),
    playerRange: pow.range,
    wave: 1,
    totalWaves: cfg.mode === 'boss' ? 1 : cfg.data.waves,
    enemies: [],
    projectiles: [],
    bossProjectiles: [],
    boss: null,
    ammo: 8, ammoMax: 8, ammoRegenTimer: 0,
    special: { cooldown: 0, max: 5 },
    spawnQueue: 0,
    spawnTimer: 0,
    running: true,
    baseBounce: 0,
    hitFlash: 0,
    lastTime: performance.now(),
  };

  document.getElementById('overlay-message').style.display = 'none';
  document.getElementById('boss-hp-wrap').style.display = (cfg.mode === 'boss') ? 'block' : 'none';
  updateAmmoBar();

  if (cfg.mode === 'boss') {
    spawnBoss(cfg.data);
  } else {
    prepareWave();
  }
  requestAnimationFrame(gameLoop);
}

function currentEnemyStats() {
  const d = game.data;
  const waveMult = 1 + (game.wave - 1) * 0.12;
  return { hp: Math.round(d.enemyHp * waveMult), speed: d.enemySpeed * (1 + (game.wave - 1) * 0.02) };
}

function prepareWave() {
  document.getElementById('wave-label').textContent = `WAVE ${game.wave} / ${game.totalWaves}`;
  game.spawnQueue = 4 + game.wave * 2;
  game.spawnTimer = 0;
  game.enemies = [];
}

function spawnEnemy() {
  const stats = currentEnemyStats();
  const zone = getZone();
  const baseX = Math.max(30, Math.min(CW - 30, zone.cx + (Math.random() - 0.5) * zone.w * 1.7));
  const hue = game.data.theme ? game.data.theme.c1 : (game.data.hellLevel !== undefined ? mixColor('#7fd48a', '#ff3b3b', game.data.hellLevel / 6) : '#ff8a8a');
  game.enemies.push({
    x: baseX, baseX, y: -30 - Math.random() * 60, age: 0,
    hp: stats.hp, maxHp: stats.hp, speed: stats.speed * (0.8 + Math.random() * 0.4), color: hue, resolved: false,
    drift: (Math.random() - 0.5) * 46,
    wobbleAmp: 14 + Math.random() * 26,
    wobbleFreq: 0.7 + Math.random() * 1.6,
    wobblePhase: Math.random() * Math.PI * 2,
  });
}

function spawnBoss(b) {
  game.boss = { def: b, x: CW / 2, y: 90, vx: 1.4, hp: b.hp, maxHp: b.hp, atkTimer: 1.5, telegraph: null };
  document.getElementById('boss-name').textContent = b.name;
  document.getElementById('wave-label').textContent = '보스전';
}

function updateAmmoBar() {
  document.getElementById('ammo-bar').style.width = (game.ammo / game.ammoMax * 100) + '%';
}

document.getElementById('btn-quit').addEventListener('click', () => { game = null; nav('type-select'); });
document.getElementById('overlay-lobby').addEventListener('click', () => { game = null; nav('lobby'); });
document.getElementById('overlay-retry').addEventListener('click', () => { if (game) startRun({ mode: game.mode, data: game.data }); });

/* ---------- 이동: PC는 WASD, 모바일은 조이스틱으로 지정된 구역 안에서만 이동 ---------- */

const keys = {};
window.addEventListener('keydown', (e) => { keys[e.key.toLowerCase()] = true; });
window.addEventListener('keyup', (e) => { keys[e.key.toLowerCase()] = false; });

function setupMoveJoystick(el, radius) {
  const knob = el.querySelector('.stick-knob');
  let active = false, sx = 0, sy = 0;
  function start(e) {
    active = true;
    const rect = el.getBoundingClientRect();
    sx = rect.left + rect.width / 2; sy = rect.top + rect.height / 2;
    e.preventDefault();
  }
  function move(e) {
    if (!active) return;
    const t = e.touches ? e.touches[0] : e;
    const dx = t.clientX - sx, dy = t.clientY - sy;
    const dist = Math.min(radius, Math.hypot(dx, dy));
    const ang = Math.atan2(dy, dx);
    knob.style.transform = `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist}px)`;
    const norm = Math.min(1, Math.hypot(dx, dy) / radius);
    if (game) game.moveVec = { x: Math.cos(ang) * norm, y: Math.sin(ang) * norm };
    e.preventDefault();
  }
  function end() {
    if (!active) return;
    active = false;
    knob.style.transform = 'translate(0,0)';
    if (game) game.moveVec = { x: 0, y: 0 };
  }
  el.addEventListener('mousedown', start); el.addEventListener('touchstart', start, { passive: false });
  window.addEventListener('mousemove', move); window.addEventListener('touchmove', move, { passive: false });
  window.addEventListener('mouseup', end); window.addEventListener('touchend', end);
}
setupMoveJoystick(document.getElementById('move-stick'), 34);

/* ---------- 조준/발사: 모바일 조이스틱(조준 후 떼면 발사) + PC 마우스(클릭 발사) ---------- */

function fireMain(angle) {
  if (!game || !game.running) return;
  if (game.ammo < 1) { flashMsg('탄약 부족!'); return; }
  game.ammo--; updateAmmoBar();
  game.projectiles.push({ x: game.player.x, y: game.player.y, vx: Math.cos(angle) * 9, vy: Math.sin(angle) * 9, dmg: game.playerDmg, special: false, r: 6 });
}
function fireSpecial(angle) {
  if (!game || !game.running) return;
  if (game.special.cooldown > 0) { flashMsg('특수무기 재장전 중'); return; }
  game.special.cooldown = game.special.max;
  game.projectiles.push({ x: game.player.x, y: game.player.y, vx: Math.cos(angle) * 7, vy: Math.sin(angle) * 7, dmg: game.playerDmg * 2.4, special: true, r: 12 });
}

function setupAimJoystick(el, kind, onFire, radius) {
  const knob = el.querySelector('.stick-knob');
  let active = false, sx = 0, sy = 0, lastAng = 0, lastDist = 0;
  function start(e) {
    active = true;
    const rect = el.getBoundingClientRect();
    sx = rect.left + rect.width / 2; sy = rect.top + rect.height / 2;
    e.preventDefault();
  }
  function move(e) {
    if (!active) return;
    const t = e.touches ? e.touches[0] : e;
    const dx = t.clientX - sx, dy = t.clientY - sy;
    lastDist = Math.min(radius, Math.hypot(dx, dy));
    lastAng = Math.atan2(dy, dx);
    knob.style.transform = `translate(${Math.cos(lastAng) * lastDist}px, ${Math.sin(lastAng) * lastDist}px)`;
    if (game) game.aim = { active: true, angle: lastAng, kind };
    e.preventDefault();
  }
  function end() {
    if (!active) return;
    active = false;
    knob.style.transform = 'translate(0,0)';
    if (game) game.aim.active = false;
    if (lastDist > 8) onFire(lastAng);
  }
  el.addEventListener('mousedown', start); el.addEventListener('touchstart', start, { passive: false });
  window.addEventListener('mousemove', move); window.addEventListener('touchmove', move, { passive: false });
  window.addEventListener('mouseup', end); window.addEventListener('touchend', end);
}
setupAimJoystick(document.getElementById('main-stick'), 'main', (ang) => fireMain(ang), 40);
setupAimJoystick(document.getElementById('special-stick'), 'special', (ang) => fireSpecial(ang), 28);

canvas.addEventListener('mousemove', (e) => {
  if (!game || !game.running) return;
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left, my = e.clientY - rect.top;
  game.aim = { active: true, angle: Math.atan2(my - game.player.y, mx - game.player.x), kind: 'main' };
});
canvas.addEventListener('mouseleave', () => { if (game) game.aim.active = false; });
canvas.addEventListener('click', () => {
  if (!game || !game.running || !game.aim.active) return;
  fireMain(game.aim.angle);
});
canvas.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  if (!game || !game.running || !game.aim.active) return;
  fireSpecial(game.aim.angle);
});

/* ---------- 게임 루프 ---------- */

function gameLoop(t) {
  if (!game) return;
  const dt = Math.min(0.05, (t - game.lastTime) / 1000);
  game.lastTime = t;
  if (game.running) update(dt);
  render();
  requestAnimationFrame(gameLoop);
}

function update(dt) {
  // 탄약 재장전
  game.ammoRegenTimer += dt;
  if (game.ammoRegenTimer > 1.1 && game.ammo < game.ammoMax) { game.ammo++; game.ammoRegenTimer = 0; updateAmmoBar(); }
  if (game.special.cooldown > 0) game.special.cooldown -= dt;
  if (game.baseBounce > 0) game.baseBounce -= dt * 3;
  if (game.hitFlash > 0) game.hitFlash = Math.max(0, game.hitFlash - dt * 2.2);

  // 이동 (WASD + 조이스틱, 지정된 구역 안에서만)
  let mvx = game.moveVec.x, mvy = game.moveVec.y;
  if (keys['w'] || keys['arrowup']) mvy -= 1;
  if (keys['s'] || keys['arrowdown']) mvy += 1;
  if (keys['a'] || keys['arrowleft']) mvx -= 1;
  if (keys['d'] || keys['arrowright']) mvx += 1;
  const mlen = Math.hypot(mvx, mvy);
  if (mlen > 0.01) {
    const nx = mvx / Math.max(1, mlen), ny = mvy / Math.max(1, mlen);
    const clamped = clampToZone(game.player.x + nx * game.speed * dt, game.player.y + ny * game.speed * dt);
    game.player.x = clamped.x; game.player.y = clamped.y;
  }

  // 웨이브 스폰
  if (game.mode !== 'boss') {
    game.spawnTimer -= dt;
    if (game.spawnQueue > 0 && game.spawnTimer <= 0) {
      spawnEnemy(); game.spawnQueue--;
      const base = Math.max(0.32, 0.85 - game.wave * 0.03);
      game.spawnTimer = base * (0.55 + Math.random() * 0.9);
    }
  }

  const zone = getZone();
  const playerRow = zone.cy - zone.h / 2;

  // 적 이동 + 플레이어와 충돌 판정 (회피 가능)
  for (let i = game.enemies.length - 1; i >= 0; i--) {
    const e = game.enemies[i];
    e.y += e.speed * dt * 60;
    e.age += dt;
    e.x = Math.max(20, Math.min(CW - 20, e.baseX + e.drift * e.age + Math.sin(e.age * e.wobbleFreq + e.wobblePhase) * e.wobbleAmp));
    if (!e.resolved && e.y >= playerRow) {
      e.resolved = true;
      const dist = Math.hypot(e.x - game.player.x, e.y - game.player.y);
      if (dist < PLAYER_R + 14) {
        game.baseHp -= 8; game.baseBounce = 1; game.hitFlash = 1;
        game.enemies.splice(i, 1);
        updateBaseHp();
        if (game.baseHp <= 0) { gameOver(false); return; }
        continue;
      }
    }
    if (e.y > CH + 40) game.enemies.splice(i, 1);
  }

  // 플레이어 투사체
  for (let i = game.projectiles.length - 1; i >= 0; i--) {
    const p = game.projectiles[i];
    p.x += p.vx * dt * 60; p.y += p.vy * dt * 60;
    if (p.x < -20 || p.x > CW + 20 || p.y < -20 || p.y > CH + 20) { game.projectiles.splice(i, 1); continue; }
    let hit = false;
    if (game.boss) {
      if (Math.hypot(p.x - game.boss.x, p.y - game.boss.y) < 34) {
        game.boss.hp -= p.dmg; hit = true;
        updateBossHp();
        if (game.boss.hp <= 0) { gameOver(true); return; }
      }
    } else {
      for (let j = game.enemies.length - 1; j >= 0; j--) {
        const e = game.enemies[j];
        if (Math.hypot(p.x - e.x, p.y - e.y) < 22) {
          e.hp -= p.dmg; hit = true;
          if (e.hp <= 0) game.enemies.splice(j, 1);
          break;
        }
      }
    }
    if (hit) game.projectiles.splice(i, 1);
  }

  // 웨이브 클리어 체크
  if (game.mode !== 'boss' && game.spawnQueue <= 0 && game.enemies.length === 0) {
    if (game.wave >= game.totalWaves) { gameOver(true); return; }
    game.wave++;
    prepareWave();
    flashMsg(`WAVE ${game.wave} 시작!`);
  }

  // 보스 로직
  if (game.boss) {
    const b = game.boss;
    b.x += b.vx * dt * 60;
    if (b.x < 60 || b.x > CW - 60) b.vx *= -1;
    b.atkTimer -= dt;
    if (b.telegraph) {
      b.telegraph.t -= dt;
      if (b.telegraph.t <= 0) {
        game.bossProjectiles.push({ x: b.telegraph.x, y: b.y + 30, speed: 5.2, resolved: false });
        b.telegraph = null;
      }
    } else if (b.atkTimer <= 0) {
      b.atkTimer = 1.7;
      const tx = Math.max(40, Math.min(CW - 40, game.player.x + (Math.random() - 0.5) * 140));
      b.telegraph = { x: tx, t: 0.75 };
    }
  }
  for (let i = game.bossProjectiles.length - 1; i >= 0; i--) {
    const bp = game.bossProjectiles[i];
    bp.y += bp.speed * dt * 60;
    if (!bp.resolved && bp.y >= playerRow) {
      bp.resolved = true;
      const dist = Math.hypot(bp.x - game.player.x, bp.y - game.player.y);
      if (dist < PLAYER_R + 16) {
        game.baseHp -= 14; game.baseBounce = 1; game.hitFlash = 1; updateBaseHp();
        game.bossProjectiles.splice(i, 1);
        if (game.baseHp <= 0) { gameOver(false); return; }
        continue;
      }
    }
    if (bp.y > CH + 40) game.bossProjectiles.splice(i, 1);
  }
}

function updateBaseHp() {
  document.getElementById('base-hp-fill').style.width = Math.max(0, game.baseHp / game.baseMaxHp * 100) + '%';
}
function updateBossHp() {
  document.getElementById('boss-hp-fill').style.width = Math.max(0, game.boss.hp / game.boss.maxHp * 100) + '%';
}

function gameOver(win) {
  game.running = false;
  const overlay = document.getElementById('overlay-message');
  const title = document.getElementById('overlay-title');
  const desc = document.getElementById('overlay-desc');
  const rewardsEl = document.getElementById('overlay-rewards');
  overlay.style.display = 'flex';
  let reward = { gold: 0, gem: 0 };
  if (win) {
    title.textContent = game.mode === 'boss' ? '보스 처치!' : '던전 클리어!';
    desc.textContent = '수고하셨습니다!';
    reward = game.data.reward;
    state.gold += reward.gold; state.gem += reward.gem;
    if (game.mode === 'dungeon') state.dungeonCleared = Math.max(state.dungeonCleared, DUNGEONS.indexOf(game.data) + 1);
    if (game.mode === 'boss') state.bossCleared = Math.max(state.bossCleared, BOSSES.indexOf(game.data) + 1);
    save();
  } else {
    title.textContent = '기지가 파괴되었습니다...';
    desc.textContent = '다시 도전해보세요!';
  }
  rewardsEl.innerHTML = win ? `<div class="cur-pill gold"><span class="cur-icon"></span>${reward.gold}</div><div class="cur-pill gem"><span class="cur-icon"></span>${reward.gem}</div>` : '';
}

/* ---------- 렌더링 ---------- */

function render() {
  ctxG.clearRect(0, 0, CW, CH);
  const theme = game.data.theme;
  const t = game.data.hellLevel !== undefined ? game.data.hellLevel / 6 : 0;
  const bgTop = theme ? theme.bg1 : mixColor('#233d2a', '#3d0a0a', t);
  const bgBot = theme ? theme.bg2 : mixColor('#14241a', '#1a0505', t);
  const grad = ctxG.createLinearGradient(0, 0, 0, CH);
  grad.addColorStop(0, bgTop); grad.addColorStop(1, bgBot);
  ctxG.fillStyle = grad; ctxG.fillRect(0, 0, CW, CH);

  const zone = getZone();
  drawZone(zone);

  // 적
  game.enemies.forEach(e => drawEnemy(e));

  // 보스
  if (game.boss) drawBoss(game.boss);
  game.bossProjectiles.forEach(bp => {
    ctxG.beginPath(); ctxG.arc(bp.x, bp.y, 10, 0, Math.PI * 2);
    ctxG.fillStyle = '#ff4a4a'; ctxG.shadowColor = '#ff4a4a'; ctxG.shadowBlur = 12; ctxG.fill(); ctxG.shadowBlur = 0;
  });
  if (game.boss && game.boss.telegraph) {
    const x = game.boss.telegraph.x;
    ctxG.fillStyle = `rgba(255,60,60,${0.18 + 0.15 * Math.sin(performance.now() / 60)})`;
    ctxG.beginPath(); ctxG.moveTo(x - 40, 0); ctxG.lineTo(x + 40, 0); ctxG.lineTo(x + 16, zone.cy - zone.h / 2); ctxG.lineTo(x - 16, zone.cy - zone.h / 2); ctxG.closePath(); ctxG.fill();
  }

  // 투사체
  game.projectiles.forEach(p => {
    ctxG.beginPath(); ctxG.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctxG.fillStyle = p.special ? '#9adfff' : '#ffe08a';
    ctxG.shadowColor = ctxG.fillStyle; ctxG.shadowBlur = 10; ctxG.fill(); ctxG.shadowBlur = 0;
  });

  // 조준선 (무기별 다른 모양)
  drawAimIndicator();

  // 플레이어
  const bounceY = Math.sin(game.baseBounce * Math.PI) * -6 * (game.baseBounce > 0 ? 1 : 0);
  drawPlayerOnField(game.player.x, game.player.y + bounceY, game.aim.active ? game.aim.angle : null);

  // 피격 비네트
  if (game.hitFlash > 0) {
    const vg = ctxG.createRadialGradient(CW / 2, CH / 2, CH * 0.25, CW / 2, CH / 2, CH * 0.7);
    vg.addColorStop(0, 'rgba(200,0,0,0)');
    vg.addColorStop(1, `rgba(200,0,0,${game.hitFlash * 0.45})`);
    ctxG.fillStyle = vg; ctxG.fillRect(0, 0, CW, CH);
  }
}

function drawZone(zone) {
  ctxG.save();
  ctxG.strokeStyle = 'rgba(255,255,255,0.14)';
  ctxG.setLineDash([5, 7]);
  ctxG.lineWidth = 1.5;
  ctxG.beginPath();
  ctxG.roundRect(zone.cx - zone.w / 2, zone.cy - zone.h / 2, zone.w, zone.h, 18);
  ctxG.stroke();
  ctxG.restore();
}

function drawAimIndicator() {
  if (!game.aim || !game.aim.active) return;
  const wp = getItem(state.equipped.weapon);
  const kind = game.aim.kind;
  const style = kind === 'special' ? 'burst' : (wp.aimStyle || 'dotted');
  const length = kind === 'special' ? Math.max(140, game.playerRange * 0.65) : game.playerRange;
  const px = game.player.x, py = game.player.y, ang = game.aim.angle;
  ctxG.save();
  if (style === 'dotted') {
    ctxG.strokeStyle = 'rgba(255,255,255,0.75)';
    ctxG.setLineDash([7, 9]); ctxG.lineWidth = 2.4;
    ctxG.beginPath(); ctxG.moveTo(px, py); ctxG.lineTo(px + Math.cos(ang) * length, py + Math.sin(ang) * length); ctxG.stroke();
  } else if (style === 'block') {
    ctxG.translate(px, py); ctxG.rotate(ang);
    ctxG.fillStyle = 'rgba(255,255,255,0.22)'; ctxG.strokeStyle = 'rgba(255,255,255,0.6)'; ctxG.lineWidth = 1.5;
    ctxG.beginPath(); ctxG.roundRect(16, -12, length - 16, 24, 6); ctxG.fill(); ctxG.stroke();
  } else if (style === 'trident') {
    ctxG.strokeStyle = 'rgba(255,255,255,0.75)';
    ctxG.setLineDash([6, 8]); ctxG.lineWidth = 2;
    [-0.16, 0, 0.16].forEach((off) => {
      const a = ang + off;
      ctxG.beginPath(); ctxG.moveTo(px, py); ctxG.lineTo(px + Math.cos(a) * length * 0.92, py + Math.sin(a) * length * 0.92); ctxG.stroke();
    });
  } else if (style === 'burst') {
    ctxG.strokeStyle = 'rgba(180,222,255,0.8)';
    ctxG.setLineDash([4, 6]); ctxG.lineWidth = 3;
    ctxG.beginPath(); ctxG.moveTo(px, py); ctxG.lineTo(px + Math.cos(ang) * length, py + Math.sin(ang) * length); ctxG.stroke();
  }
  ctxG.restore();
}

function drawEnemy(e) {
  ctxG.save();
  ctxG.translate(e.x, e.y);
  ctxG.beginPath(); ctxG.ellipse(0, 22, 16, 5, 0, 0, Math.PI * 2); ctxG.fillStyle = 'rgba(0,0,0,0.3)'; ctxG.fill();
  ctxG.beginPath(); ctxG.arc(0, 0, 16, 0, Math.PI * 2);
  ctxG.fillStyle = e.color; ctxG.fill();
  ctxG.strokeStyle = 'rgba(0,0,0,0.3)'; ctxG.lineWidth = 2; ctxG.stroke();
  ctxG.fillStyle = '#241a1a';
  ctxG.beginPath(); ctxG.arc(-5, -2, 2.4, 0, Math.PI * 2); ctxG.fill();
  ctxG.beginPath(); ctxG.arc(5, -2, 2.4, 0, Math.PI * 2); ctxG.fill();
  // 체력바
  ctxG.fillStyle = 'rgba(0,0,0,0.5)'; ctxG.fillRect(-16, -28, 32, 5);
  ctxG.fillStyle = '#7dffb0'; ctxG.fillRect(-16, -28, 32 * Math.max(0, e.hp / e.maxHp), 5);
  ctxG.restore();
}

function drawBoss(b) {
  ctxG.save();
  ctxG.translate(b.x, b.y);
  const pulse = Math.sin(performance.now() / 300) * 4;
  ctxG.beginPath(); ctxG.ellipse(0, 60, 50, 12, 0, 0, Math.PI * 2); ctxG.fillStyle = 'rgba(0,0,0,0.35)'; ctxG.fill();
  ctxG.beginPath();
  if (b.def.shape === 'slime') { ctxG.ellipse(0, 10 + pulse * 0.3, 46, 40 + pulse, 0, 0, Math.PI * 2); }
  else if (b.def.shape === 'ghost') { ctxG.arc(0, 0, 44, Math.PI, 0); ctxG.lineTo(30, 40 + pulse); ctxG.lineTo(10, 26); ctxG.lineTo(-10, 40); ctxG.lineTo(-30, 26 + pulse); ctxG.closePath(); }
  else { ctxG.arc(0, 0, 46 + pulse * 0.2, 0, Math.PI * 2); }
  const g = ctxG.createRadialGradient(-10, -10, 6, 0, 0, 50);
  g.addColorStop(0, lighten(b.def.color1)); g.addColorStop(1, b.def.color2);
  ctxG.fillStyle = g; ctxG.fill();
  ctxG.fillStyle = '#1a0f0f';
  ctxG.beginPath(); ctxG.arc(-14, -6, 5, 0, Math.PI * 2); ctxG.fill();
  ctxG.beginPath(); ctxG.arc(14, -6, 5, 0, Math.PI * 2); ctxG.fill();
  ctxG.fillStyle = '#ff4a4a';
  ctxG.beginPath(); ctxG.arc(-14, -6, 2, 0, Math.PI * 2); ctxG.fill();
  ctxG.beginPath(); ctxG.arc(14, -6, 2, 0, Math.PI * 2); ctxG.fill();
  ctxG.restore();
}

function drawPlayerOnField(x, y, angle) {
  ctxG.save();
  const g = ctxG.createRadialGradient(x, y + 8, 4, x, y + 8, 42);
  g.addColorStop(0, 'rgba(255,255,255,0.1)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  ctxG.fillStyle = g; ctxG.beginPath(); ctxG.arc(x, y + 8, 42, 0, Math.PI * 2); ctxG.fill();
  ctxG.restore();
  const facing = angle !== null && Math.cos(angle) < 0 ? -1 : 1;
  drawAdventurer(ctxG, x, y, 80, state.equipped, facing);
}

/* ---------------- 초기화 ---------------- */

resizeCanvas();
refreshCurrencyDisplays();
