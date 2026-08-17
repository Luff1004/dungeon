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
  { id: 'weapon', label: '무기', sub: '일반공격', icon: 'weapon' },
  { id: 'sword', label: '칼', sub: '특수공격', icon: 'sword' },
  { id: 'armor', label: '갑옷', sub: '방어력', icon: 'armor' },
];

const ITEMS = [
  { id: 'sw_short', name: '녹슨 단검', cat: 'sword', rarity: 'common', baseDmg: 8, baseRange: 60, shape: 'blade-straight', aimStyle: 'dotted', desc: '녹슨 게 아니라 빈티지 감성입니다. 절대 안 부러져요... 아마도.' },
  { id: 'sw_curve', name: '초승달 검', cat: 'sword', rarity: 'rare', baseDmg: 14, baseRange: 70, shape: 'blade-curve', aimStyle: 'dotted', desc: '낮에 쓰면 그냥 좀 휜 칼, 밤에 쓰면 있어 보이는 칼.' },
  { id: 'sw_fire', name: '화염의 대검', cat: 'sword', rarity: 'epic', baseDmg: 24, baseRange: 80, shape: 'blade-flame', aimStyle: 'block', desc: '상대도 뜨겁고 손잡이도 뜨겁습니다. 장갑은 필수 구매.' },
  { id: 'sw_holy', name: '천상의 성검', cat: 'sword', rarity: 'legendary', baseDmg: 40, baseRange: 90, shape: 'blade-holy', aimStyle: 'trident', desc: '신이 내려주셨는데 택배비는 제가 냈습니다.' },
  { id: 'sw_void', name: '공허의 칼날', cat: 'sword', rarity: 'mythic', baseDmg: 70, baseRange: 100, shape: 'blade-void', aimStyle: 'trident', desc: '어디서 났는지는 묻지 마세요. 저도 몰라요.' },

  { id: 'ar_cloth', name: '수련생의 로브', cat: 'armor', rarity: 'common', baseDmg: 0, baseRange: 0, def: 6, shape: 'armor-cloth', desc: '방어력은 거의 없지만 도망만큼은 국가대표급.' },
  { id: 'ar_leather', name: '가죽 갑주', cat: 'armor', rarity: 'rare', def: 12, shape: 'armor-leather', desc: '가죽 냄새가 좀 나지만 몬스터는 코가 없어서 상관없음.' },
  { id: 'ar_plate', name: '기사단의 판금', cat: 'armor', rarity: 'epic', def: 22, shape: 'armor-plate', desc: '무겁고 뜨겁고 계단 오르기 힘들지만 폼 하나는 살아있음.' },
  { id: 'ar_dragon', name: '용린 갑주', cat: 'armor', rarity: 'legendary', def: 38, shape: 'armor-dragon', desc: '이거 만든 거 원조 용이 알면 화낼 것 같습니다.' },
  { id: 'ar_abyss', name: '심연의 갑주', cat: 'armor', rarity: 'mythic', def: 60, shape: 'armor-abyss', desc: '세탁기 돌리지 마세요. 어둠은 표백이 안 됩니다.' },

  { id: 'wp_sling', name: '낡은 새총', cat: 'weapon', rarity: 'common', baseDmg: 10, baseRange: 220, shape: 'gun-sling', aimStyle: 'dotted', desc: '동네 형이 쓰던 그 새총. 근데 은근히 셉니다.' },
  { id: 'wp_cross', name: '사냥꾼의 석궁', cat: 'weapon', rarity: 'rare', baseDmg: 18, baseRange: 260, shape: 'gun-cross', aimStyle: 'dotted', desc: '조준 안 해도 알아서 맞는다는 소문이 있는데 거짓말입니다.' },
  { id: 'wp_cannon', name: '폭열 캐논', cat: 'weapon', rarity: 'epic', baseDmg: 30, baseRange: 300, shape: 'gun-cannon', aimStyle: 'block', desc: '귀마개는 본인이 알아서 준비하세요. 저흰 안 챙겨드려요.' },
  { id: 'wp_laser', name: '별빛 레이저포', cat: 'weapon', rarity: 'legendary', baseDmg: 50, baseRange: 340, shape: 'gun-laser', aimStyle: 'trident', desc: '멋있는데 다음 달 전기세가 걱정되는 그 무기.' },
  { id: 'wp_star', name: '종말의 별포', cat: 'weapon', rarity: 'mythic', baseDmg: 85, baseRange: 380, shape: 'gun-star', aimStyle: 'trident', desc: '쏘고 나면 주변이 조용해집니다. 이유는 묻지 마세요.' },

  // 상인 전용 추가 장비
  { id: 'ar_royal', name: '왕실 근위대 갑주', cat: 'armor', rarity: 'epic', def: 27, shape: 'armor-royal', desc: '근위병 국룰: 표정 관리 필수, 절대 웃으면 안 됨.' },
  { id: 'wp_frost', name: '서리한 석궁', cat: 'weapon', rarity: 'rare', baseDmg: 21, baseRange: 270, shape: 'gun-frost', aimStyle: 'dotted', desc: '몬스터도 춥고 쏘는 제 손도 시립니다.' },

  // 보스 전용 보상 장비 (상점/가챠에서는 얻을 수 없음)
  { id: 'ar_boss_skull', name: '해골 군주의 늑골 갑주', cat: 'armor', rarity: 'mythic', def: 66, shape: 'armor-bone', bossExclusive: true, desc: '통풍 하나는 진짜 잘 됩니다. 뼈 사이로 다 뚫려있어서.' },
  { id: 'wp_boss_wraith', name: '원한의 사슬낫', cat: 'weapon', rarity: 'mythic', baseDmg: 78, baseRange: 320, shape: 'gun-wraith', aimStyle: 'trident', bossExclusive: true, desc: '휘두를 때마다 어디선가 원망 섞인 한숨소리가 들립니다.' },
  { id: 'ar_boss_magma', name: '용암핵 갑주', cat: 'armor', rarity: 'mythic', def: 80, shape: 'armor-magma', bossExclusive: true, desc: '여름에 입으면 좀 많이 그렇습니다. 각오하세요.' },
  { id: 'wp_boss_dragon', name: '칠흑룡의 숨결포', cat: 'weapon', rarity: 'mythic', baseDmg: 95, baseRange: 360, shape: 'gun-dragon', aimStyle: 'block', bossExclusive: true, desc: '원조 용도 이 위력을 보면 살짝 부끄러워할 겁니다.' },
  { id: 'wp_boss_genesis', name: '태초의 별빛창', cat: 'weapon', rarity: 'mythic', baseDmg: 120, baseRange: 400, shape: 'gun-genesis', aimStyle: 'trident', bossExclusive: true, desc: '우주 탄생 로열티는 안 받습니다. 무료 나눔이에요.' },
  { id: 'ar_boss_genesis', name: '태초의 화신 갑주', cat: 'armor', rarity: 'mythic', def: 100, shape: 'armor-genesis', bossExclusive: true, desc: '입기만 해도 후광 효과 발동. 인생샷 각입니다.' },

  // 가챠 전용 추가 장비 30종
  { id: 'sw_wind1', name: '질풍의 검', cat: 'sword', rarity: 'common', baseDmg: 9, baseRange: 58, shape: 'blade-wind', aimStyle: 'dotted', desc: '휘두르면 바람 소리가 납니다. 진짜예요, 믿어보세요.' },
  { id: 'sw_thorn1', name: '가시 단검', cat: 'sword', rarity: 'common', baseDmg: 7, baseRange: 65, shape: 'blade-thorn', aimStyle: 'dotted', desc: '손잡이도 가시라서 쥐는 사람도 아픕니다.' },
  { id: 'sw_shadow1', name: '그림자 검', cat: 'sword', rarity: 'rare', baseDmg: 15, baseRange: 68, shape: 'blade-shadow', aimStyle: 'dotted', desc: '어두운 곳에서 잃어버리기 딱 좋습니다.' },
  { id: 'sw_crystal1', name: '서리 세검', cat: 'sword', rarity: 'rare', baseDmg: 13, baseRange: 75, shape: 'blade-crystal', aimStyle: 'block', desc: '차갑고 예쁘지만 그게 답니다.' },
  { id: 'sw_bone1', name: '뼈검', cat: 'sword', rarity: 'epic', baseDmg: 22, baseRange: 82, shape: 'blade-bone', aimStyle: 'block', desc: '누구 뼈인지는 아무도 모릅니다.' },
  { id: 'sw_wind2', name: '폭풍의 대검', cat: 'sword', rarity: 'epic', baseDmg: 26, baseRange: 78, shape: 'blade-wind', aimStyle: 'trident', desc: '너무 크게 휘두르면 본인이 넘어집니다.' },
  { id: 'sw_shadow2', name: '왕가의 검', cat: 'sword', rarity: 'legendary', baseDmg: 38, baseRange: 95, shape: 'blade-shadow', aimStyle: 'trident', desc: '왕족이 아니어도 들 수 있습니다. 아마도요.' },
  { id: 'sw_crystal2', name: '수정 검', cat: 'sword', rarity: 'legendary', baseDmg: 42, baseRange: 88, shape: 'blade-crystal', aimStyle: 'block', desc: '깨질까 봐 살살 휘두르게 됩니다.' },
  { id: 'sw_bone2', name: '태고의 뼈검', cat: 'sword', rarity: 'mythic', baseDmg: 65, baseRange: 105, shape: 'blade-bone', aimStyle: 'trident', desc: '박물관에서 몰래 가져온 건 아닙니다.' },
  { id: 'sw_thorn2', name: '심연의 가시검', cat: 'sword', rarity: 'mythic', baseDmg: 75, baseRange: 98, shape: 'blade-thorn', aimStyle: 'trident', desc: '만지지 마세요. 진심입니다.' },

  { id: 'ar_scale1', name: '비늘 갑옷', cat: 'armor', rarity: 'common', def: 5, shape: 'armor-scale', desc: '물고기 냄새가 살짝 납니다.' },
  { id: 'ar_wind1', name: '폭풍 망토', cat: 'armor', rarity: 'common', def: 7, shape: 'armor-wind', desc: '바람 불면 혼자 펄럭입니다. 폼은 확실합니다.' },
  { id: 'ar_thorn1', name: '가시 갑주', cat: 'armor', rarity: 'rare', def: 11, shape: 'armor-thorn', desc: '포옹은 절대 금지입니다.' },
  { id: 'ar_crystal1', name: '수정 갑주', cat: 'armor', rarity: 'rare', def: 13, shape: 'armor-crystal', desc: '빛을 받으면 반짝여서 몬스터 눈에도 잘 띕니다.' },
  { id: 'ar_scale2', name: '비늘 판금', cat: 'armor', rarity: 'epic', def: 20, shape: 'armor-scale', desc: '용의 비늘이라 우기는 사람이 많습니다.' },
  { id: 'ar_storm1', name: '폭풍기사 갑주', cat: 'armor', rarity: 'epic', def: 24, shape: 'armor-storm', desc: '천둥번개 칠 때 입으면 특히 위험합니다.' },
  { id: 'ar_thorn2', name: '가시 여왕의 갑주', cat: 'armor', rarity: 'legendary', def: 36, shape: 'armor-thorn', desc: '여왕님도 이거 입고 소파에 못 앉습니다.' },
  { id: 'ar_crystal2', name: '수정 결정 갑주', cat: 'armor', rarity: 'legendary', def: 40, shape: 'armor-crystal', desc: '가격표를 보면 갑옷이 더 비쌀 것 같습니다.' },
  { id: 'ar_scale3', name: '태고의 비늘 갑주', cat: 'armor', rarity: 'mythic', def: 58, shape: 'armor-scale', desc: '이 비늘이 어디서 왔는지 아무도 묻지 않기로 했습니다.' },
  { id: 'ar_storm2', name: '폭풍룡 갑주', cat: 'armor', rarity: 'mythic', def: 63, shape: 'armor-storm', desc: '입는 순간부터 머리카락이 자꾸 섭니다.' },

  { id: 'wp_thorn1', name: '가시 발사기', cat: 'weapon', rarity: 'common', baseDmg: 9, baseRange: 210, shape: 'gun-thorn', aimStyle: 'dotted', desc: '장전할 때 손 조심하세요.' },
  { id: 'wp_wind1', name: '질풍의 활', cat: 'weapon', rarity: 'common', baseDmg: 11, baseRange: 230, shape: 'gun-wind', aimStyle: 'dotted', desc: '시위 소리가 은근히 멋집니다.' },
  { id: 'wp_crystal1', name: '수정 저격총', cat: 'weapon', rarity: 'rare', baseDmg: 17, baseRange: 270, shape: 'gun-crystal', aimStyle: 'dotted', desc: '겨냥할 때마다 반짝여서 위치가 들킵니다.' },
  { id: 'wp_bone1', name: '뼈 투척기', cat: 'weapon', rarity: 'rare', baseDmg: 19, baseRange: 250, shape: 'gun-bone', aimStyle: 'block', desc: '탄약이 떨어지면 그냥 뼈를 주우면 됩니다.' },
  { id: 'wp_storm1', name: '폭풍 캐논', cat: 'weapon', rarity: 'epic', baseDmg: 28, baseRange: 310, shape: 'gun-storm', aimStyle: 'block', desc: '쏠 때마다 정전기가 옵니다.' },
  { id: 'wp_thorn2', name: '가시 폭탄발사기', cat: 'weapon', rarity: 'epic', baseDmg: 32, baseRange: 290, shape: 'gun-thorn', aimStyle: 'block', desc: '안전핀은 장식입니다.' },
  { id: 'wp_crystal2', name: '수정 레일건', cat: 'weapon', rarity: 'legendary', baseDmg: 48, baseRange: 350, shape: 'gun-crystal', aimStyle: 'trident', desc: '충전 시간 동안 커피 한 잔 가능합니다.' },
  { id: 'wp_storm2', name: '폭풍의 창포', cat: 'weapon', rarity: 'legendary', baseDmg: 52, baseRange: 330, shape: 'gun-storm', aimStyle: 'trident', desc: '쏘고 나면 근처에 비가 옵니다. 우연입니다.' },
  { id: 'wp_bone2', name: '태고의 뼈대포', cat: 'weapon', rarity: 'mythic', baseDmg: 80, baseRange: 390, shape: 'gun-bone', aimStyle: 'trident', desc: '고고학자들이 보면 기절할 물건입니다.' },
  { id: 'wp_wind2', name: '종말의 질풍포', cat: 'weapon', rarity: 'mythic', baseDmg: 90, baseRange: 370, shape: 'gun-wind', aimStyle: 'trident', desc: '쏘고 나면 근처 나뭇잎이 다 떨어집니다.' },

  // 가챠 전용 무기 24종
  { id: 'wp_spike1', name: '가시 곤봉포', cat: 'weapon', rarity: 'common', baseDmg: 9, baseRange: 205, shape: 'gun-spike', aimStyle: 'dotted', desc: '들고만 있어도 위협적으로 보입니다.' },
  { id: 'wp_orb1', name: '빛나는 구슬총', cat: 'weapon', rarity: 'common', baseDmg: 8, baseRange: 195, shape: 'gun-orb', aimStyle: 'dotted', desc: '예쁘긴 한데 그게 다입니다.' },
  { id: 'wp_fang1', name: '송곳니 발사기', cat: 'weapon', rarity: 'common', baseDmg: 10, baseRange: 210, shape: 'gun-fang', aimStyle: 'dotted', desc: '이빨 요정에게는 절대 팔지 마세요.' },
  { id: 'wp_arc1', name: '굽은 활', cat: 'weapon', rarity: 'common', baseDmg: 9, baseRange: 220, shape: 'gun-arc', aimStyle: 'dotted', desc: '똑바로 안 날아가도 성능은 정상입니다.' },
  { id: 'wp_comet1', name: '유성 투척기', cat: 'weapon', rarity: 'common', baseDmg: 11, baseRange: 200, shape: 'gun-comet', aimStyle: 'dotted', desc: '유성이라기엔 좀 작습니다.' },
  { id: 'wp_vortex1', name: '소용돌이포', cat: 'weapon', rarity: 'rare', baseDmg: 16, baseRange: 250, shape: 'gun-vortex', aimStyle: 'block', desc: '어지러워서 3발 이상 연속 발사 비추천.' },
  { id: 'wp_blaze1', name: '불꽃 발사기', cat: 'weapon', rarity: 'rare', baseDmg: 17, baseRange: 260, shape: 'gun-blaze', aimStyle: 'block', desc: '손잡이가 좀 뜨겁습니다. 참으세요.' },
  { id: 'wp_glacier1', name: '빙하 파편총', cat: 'weapon', rarity: 'rare', baseDmg: 15, baseRange: 270, shape: 'gun-glacier', aimStyle: 'dotted', desc: '겨울에 쓰면 그냥 눈싸움 같습니다.' },
  { id: 'wp_venom1', name: '독액 분사기', cat: 'weapon', rarity: 'rare', baseDmg: 18, baseRange: 240, shape: 'gun-venom', aimStyle: 'dotted', desc: '바람 부는 방향 꼭 확인하세요.' },
  { id: 'wp_nova1', name: '소형 초신성포', cat: 'weapon', rarity: 'rare', baseDmg: 19, baseRange: 255, shape: 'gun-nova', aimStyle: 'block', desc: '소형이라고 우습게 보면 안 됩니다.' },
  { id: 'wp_spike2', name: '대형 가시포', cat: 'weapon', rarity: 'epic', baseDmg: 28, baseRange: 300, shape: 'gun-spike', aimStyle: 'block', desc: '수납할 때가 제일 힘듭니다.' },
  { id: 'wp_orb2', name: '구속의 구슬포', cat: 'weapon', rarity: 'epic', baseDmg: 27, baseRange: 290, shape: 'gun-orb', aimStyle: 'block', desc: '한번 맞으면 잊기 힘든 그런 느낌입니다.' },
  { id: 'wp_fang2', name: '맹수의 송곳니포', cat: 'weapon', rarity: 'epic', baseDmg: 30, baseRange: 285, shape: 'gun-fang', aimStyle: 'block', desc: '으르렁 소리는 옵션입니다.' },
  { id: 'wp_arc2', name: '전쟁궁', cat: 'weapon', rarity: 'epic', baseDmg: 29, baseRange: 310, shape: 'gun-arc', aimStyle: 'block', desc: '평화를 위해 만들어졌다는 건 거짓말입니다.' },
  { id: 'wp_comet2', name: '낙성포', cat: 'weapon', rarity: 'epic', baseDmg: 32, baseRange: 295, shape: 'gun-comet', aimStyle: 'block', desc: '하늘에서 별이 떨어지는 게 아니라 이게 떨어집니다.' },
  { id: 'wp_vortex2', name: '심연의 소용돌이포', cat: 'weapon', rarity: 'legendary', baseDmg: 48, baseRange: 345, shape: 'gun-vortex', aimStyle: 'trident', desc: '빨려 들어가지 않게 발판을 꽉 잡으세요.' },
  { id: 'wp_blaze2', name: '화염지옥포', cat: 'weapon', rarity: 'legendary', baseDmg: 50, baseRange: 335, shape: 'gun-blaze', aimStyle: 'trident', desc: '보증서에 화상 책임은 없다고 적혀 있습니다.' },
  { id: 'wp_glacier2', name: '절대영도포', cat: 'weapon', rarity: 'legendary', baseDmg: 46, baseRange: 355, shape: 'gun-glacier', aimStyle: 'trident', desc: '쏘고 나면 주변 온도가 살짝 이상해집니다.' },
  { id: 'wp_venom2', name: '맹독지옥포', cat: 'weapon', rarity: 'legendary', baseDmg: 47, baseRange: 340, shape: 'gun-venom', aimStyle: 'trident', desc: '해독제는 따로 판매하지 않습니다.' },
  { id: 'wp_nova2', name: '초신성포', cat: 'weapon', rarity: 'legendary', baseDmg: 52, baseRange: 350, shape: 'gun-nova', aimStyle: 'trident', desc: '발사 순간만큼은 온 세상이 조용해집니다.' },
  { id: 'wp_spike3', name: '태초의 가시창포', cat: 'weapon', rarity: 'mythic', baseDmg: 85, baseRange: 380, shape: 'gun-spike', aimStyle: 'trident', desc: '태초부터 이렇게 뾰족했다고 전해집니다.' },
  { id: 'wp_orb3', name: '창세의 구슬포', cat: 'weapon', rarity: 'mythic', baseDmg: 88, baseRange: 390, shape: 'gun-orb', aimStyle: 'trident', desc: '세상이 시작될 때 같이 만들어졌다고 합니다. 아마도요.' },
  { id: 'wp_fang3', name: '종말의 송곳니포', cat: 'weapon', rarity: 'mythic', baseDmg: 92, baseRange: 375, shape: 'gun-fang', aimStyle: 'trident', desc: '이걸 쓰면 정말 끝을 보게 됩니다.' },
  { id: 'wp_arc3', name: '신화의 대궁', cat: 'weapon', rarity: 'mythic', baseDmg: 90, baseRange: 400, shape: 'gun-arc', aimStyle: 'trident', desc: '신화 속 영웅도 이거 드는 건 힘들어했답니다.' },

  // 보스 전용 무기 5종 (기존 보상에 추가)
  { id: 'wp_boss_slime', name: '젤리핵 융합포', cat: 'weapon', rarity: 'mythic', baseDmg: 80, baseRange: 360, shape: 'gun-comet', aimStyle: 'trident', bossExclusive: true, desc: '슬라임 여왕의 핵을 압축해 만든 병기입니다.' },
  { id: 'wp_boss_witch', name: '저주받은 독액포', cat: 'weapon', rarity: 'mythic', baseDmg: 95, baseRange: 350, shape: 'gun-venom', aimStyle: 'trident', bossExclusive: true, desc: '독전 마녀 로자린이 직접 조제한 맹독을 쏩니다.' },
  { id: 'wp_boss_ice', name: '절대영도의 창', cat: 'weapon', rarity: 'mythic', baseDmg: 98, baseRange: 370, shape: 'gun-glacier', aimStyle: 'trident', bossExclusive: true, desc: '빙결 여제 시렌의 냉기가 그대로 담겨 있습니다.' },
  { id: 'wp_boss_thunder', name: '천벌의 낙뢰포', cat: 'weapon', rarity: 'mythic', baseDmg: 100, baseRange: 365, shape: 'gun-vortex', aimStyle: 'trident', bossExclusive: true, desc: '뇌전 폭군 자칸의 분노가 응축되어 있습니다.' },
  { id: 'wp_boss_hunter', name: '심연의 사냥포', cat: 'weapon', rarity: 'mythic', baseDmg: 102, baseRange: 355, shape: 'gun-blaze', aimStyle: 'trident', bossExclusive: true, desc: '심연의 사냥꾼 크로바가 사냥감을 놓친 적 없는 무기.' },

  // 지옥 난이도 보스 전용 장비 3종
  { id: 'wp_boss_hell1', name: '천개의 손이 쥔 창', cat: 'weapon', rarity: 'mythic', baseDmg: 110, baseRange: 400, shape: 'gun-nova', aimStyle: 'trident', bossExclusive: true, desc: '손이 너무 많아서 정작 본인도 헷갈려합니다.' },
  { id: 'wp_boss_hell2', name: '심판의 나팔포', cat: 'weapon', rarity: 'mythic', baseDmg: 115, baseRange: 390, shape: 'gun-storm', aimStyle: 'trident', bossExclusive: true, desc: '불고 나면 온 던전이 잠시 조용해집니다.' },
  { id: 'wp_boss_hell3', name: '태초 이전의 파편', cat: 'weapon', rarity: 'mythic', baseDmg: 125, baseRange: 410, shape: 'gun-crystal', aimStyle: 'trident', bossExclusive: true, desc: '세상이 생기기도 전부터 있었다고 전해집니다.' },
  { id: 'ar_boss_hell3', name: '태초 이전의 갑주', cat: 'armor', rarity: 'mythic', def: 110, shape: 'armor-thorn', bossExclusive: true, desc: '가시 하나하나가 시간보다 오래됐습니다.' },
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
  { c1: '#bde8ff', c2: '#3a7aa8', bg1: '#1f333d', bg2: '#101c24' },
  { c1: '#c9c4e0', c2: '#5a4f7a', bg1: '#2a2438', bg2: '#161220' },
  { c1: '#c48ae0', c2: '#4a1f6a', bg1: '#2a1a38', bg2: '#150c20' },
  { c1: '#a08a94', c2: '#5a1a2a', bg1: '#241018', bg2: '#12060c' },
  { c1: '#a8e07f', c2: '#4a6a1f', bg1: '#26301a', bg2: '#141a0c' },
  { c1: '#fff26a', c2: '#5a5a7a', bg1: '#2a2a38', bg2: '#151520' },
  { c1: '#e0c98a', c2: '#7a5a2f', bg1: '#302818', bg2: '#18140c' },
  { c1: '#8aeaff', c2: '#c47ae0', bg1: '#241f38', bg2: '#120f20' },
  { c1: '#e8e2d0', c2: '#8a7a5f', bg1: '#302c22', bg2: '#181610' },
  { c1: '#5ac4d4', c2: '#0f3a5a', bg1: '#0f2430', bg2: '#081218' },
  { c1: '#ff6a3a', c2: '#8a0a0a', bg1: '#301008', bg2: '#180804' },
  { c1: '#9a7ad0', c2: '#1a0a2a', bg1: '#180f24', bg2: '#0a0512' },
  { c1: '#eaf5ff', c2: '#7aa8c4', bg1: '#243038', bg2: '#12181c' },
  { c1: '#6a8a5a', c2: '#1a2a0a', bg1: '#1a2412', bg2: '#0c1408' },
  { c1: '#ff2a3a', c2: '#3a0505', bg1: '#1a0808', bg2: '#050000' },
];
const DUNGEON_NAMES = [
  '초록 숲 입구', '이끼 낀 동굴', '메마른 협곡', '용암 지대', '보랏빛 늪지', '핏빛 신전', '황금 사막', '푸른 빙하', '핏빛 폐허', '심연의 나락',
  '서리 협곡', '유령 열차', '거미 소굴', '흑요석 광산', '저주받은 정원', '폭풍의 탑', '잊혀진 서고', '수정 동굴', '뼈의 계곡', '심해 유적',
  '화산 심장부', '그림자 미궁', '천공의 폐허', '악몽의 늪', '종말의 문',
];

// 던전마다 테마에 맞는 고유 기믹
const DUNGEON_GIMMICKS = [
  null, // 초록 숲 입구 - 튜토리얼, 기믹 없음
  { type: 'fallingHazard', label: '낙석 주의', color: '#a89a7f', interval: 3.2, dmg: 12 },
  { type: 'pushForce', label: '모래바람', color: '#c4b87f', interval: 4.0, mode: 'gust', force: 90, duration: 1.6 },
  { type: 'fallingHazard', label: '용암탄 낙하', color: '#ff8a4a', interval: 3.0, dmg: 16 },
  { type: 'slowTrap', label: '늪 수렁', color: '#8a6fd4', interval: 3.5, r: 40 },
  { type: 'homing', label: '저주받은 원혼', color: '#ff5a5a', interval: 5.0, dmg: 10 },
  { type: 'pushForce', label: '모래 늪 소용돌이', color: '#e0c96a', interval: 4.5, mode: 'vortex', force: 70, duration: 2.2 },
  { type: 'obscure', label: '눈보라 시야방해', color: '#eaf5ff', interval: 5.5, duration: 2.2 },
  { type: 'homing', label: '유령 화살', color: '#d47f7f', interval: 4.2, dmg: 12 },
  { type: 'pushForce', label: '심연의 소용돌이', color: '#8a4a4a', interval: 4.0, mode: 'vortex', force: 95, duration: 2.2 },
  { type: 'obscure', label: '눈보라 시야방해', color: '#bde8ff', interval: 5.0, duration: 2.2 },
  { type: 'train', label: '열차 습격', color: '#c9c4e0', interval: 6.0 },
  { type: 'web', label: '거미줄 함정', color: '#c48ae0', interval: 4.5 },
  { type: 'fallingHazard', label: '갱도 붕괴', color: '#8a6a7f', interval: 2.8, dmg: 16 },
  { type: 'slowTrap', label: '저주받은 덩굴', color: '#a8e07f', interval: 3.5, r: 42 },
  { type: 'fallingHazard', label: '낙뢰', color: '#fff26a', interval: 3.4, dmg: 15 },
  { type: 'homing', label: '떠도는 저주받은 책', color: '#e0c98a', interval: 4.6, dmg: 10 },
  { type: 'fallingHazard', label: '수정 파편 낙하', color: '#8aeaff', interval: 3.0, dmg: 13 },
  { type: 'slowTrap', label: '뼈 함정', color: '#e8e2d0', interval: 3.6, r: 40 },
  { type: 'pushForce', label: '해류', color: '#5ac4d4', interval: 4.2, mode: 'gust', force: 85, duration: 1.8 },
  { type: 'fallingHazard', label: '용암 폭발', color: '#ff6a3a', interval: 2.6, dmg: 18 },
  { type: 'obscure', label: '칠흑의 어둠', color: '#9a7ad0', interval: 4.8, duration: 2.8 },
  { type: 'pushForce', label: '폭풍의 돌풍', color: '#eaf5ff', interval: 3.8, mode: 'gust', force: 110, duration: 1.6 },
  { type: 'homing', label: '악몽의 안개', color: '#6a8a5a', interval: 4.2, dmg: 11 },
  { type: 'fallingHazard', label: '운석우 + 암흑', color: '#ff2a3a', interval: 2.4, dmg: 20, obscure: true },
];

const DUNGEONS = DUNGEON_NAMES.map((name, i) => ({
  id: i + 1,
  name,
  waves: 10,
  theme: DUNGEON_THEMES[i],
  gimmick: DUNGEON_GIMMICKS[i],
  enemyHp: 20 + i * 18,
  enemySpeed: 0.35 + i * 0.035,
  reward: { gold: 40 + i * 25, gem: i >= 4 ? (i - 3) : 0 },
}));

const BOSSES = [
  { id: 1, name: '슬라임 여왕', hp: 500, color1: '#7fe08a', color2: '#2f8a45', shape: 'slime',
    pattern: 'single', patternLabel: '단발 조준탄 + 튀는 젤리 폭탄', atkInterval: 1.7,
    big: { type: 'bounce', dmg: 24, interval: 6.0, telegraphT: 0.5 },
    reward: { gold: 300, gem: 8 }, rewardItem: 'sw_curve', rewardItem2: 'wp_boss_slime' },
  { id: 2, name: '해골 군주', hp: 780, color1: '#d8d8d8', color2: '#5a5a5a', shape: 'skull',
    pattern: 'spread', patternLabel: '3방향 부채꼴 + 뼈 소나기', atkInterval: 2.0,
    big: { type: 'rain', count: 13, dmg: 9, interval: 5.0, telegraphT: 0.5 },
    reward: { gold: 420, gem: 10 }, rewardItem: 'ar_boss_skull' },
  { id: 3, name: '망령 백작', hp: 1000, color1: '#b38aff', color2: '#4a2a8a', shape: 'ghost',
    pattern: 'teleport', patternLabel: '순간이동 기습 + 즉사급 기습타', atkInterval: 1.6,
    big: { type: 'pointblank', dmg: 28, interval: 4.8, telegraphT: 0.4 },
    reward: { gold: 560, gem: 13 }, rewardItem: 'wp_boss_wraith' },
  { id: 4, name: '용암 골렘', hp: 1350, color1: '#ff8a4a', color2: '#8a2a0a', shape: 'golem',
    pattern: 'slam', patternLabel: '광역 강타 + 확산하는 용암 웅덩이', atkInterval: 2.3,
    big: { type: 'expand', dmg: 9, startR: 20, endR: 150, duration: 2.6, interval: 6.5, telegraphT: 0.6 },
    reward: { gold: 720, gem: 16 }, rewardItem: 'ar_boss_magma' },
  { id: 5, name: '독전 마녀 로자린', hp: 1550, color1: '#8aff9e', color2: '#1f5a2f', shape: 'witch',
    pattern: 'poison', patternLabel: '맹독 웅덩이 + 독안개 3연폭', atkInterval: 2.1,
    big: { type: 'multiExpand', count: 3, dmg: 7, startR: 14, endR: 62, duration: 1.9, interval: 6.0, telegraphT: 0.5 },
    reward: { gold: 860, gem: 18 }, rewardItem: 'wp_cannon', rewardItem2: 'wp_boss_witch' },
  { id: 6, name: '빙결 여제 시렌', hp: 1750, color1: '#bdeeff', color2: '#2a6a8a', shape: 'ice',
    pattern: 'slow', patternLabel: '냉기탄 + 굴러오는 얼음 바위', atkInterval: 2.0,
    big: { type: 'boulder', dmg: 22, speed: 2.6, radius: 32, duration: 3.4, interval: 6.0, telegraphT: 0.5 },
    reward: { gold: 950, gem: 20 }, rewardItem: 'wp_frost', rewardItem2: 'wp_boss_ice' },
  { id: 7, name: '뇌전 폭군 자칸', hp: 1950, color1: '#fff26a', color2: '#8a7a10', shape: 'thunder',
    pattern: 'double', patternLabel: '연속 2연발 + 연쇄 낙뢰 3연타', atkInterval: 1.3,
    big: { type: 'rainwave', waves: 3, perWave: 5, dmg: 10, gap: 0.42, interval: 5.0, telegraphT: 0.3 },
    reward: { gold: 1050, gem: 22 }, rewardItem: 'wp_laser', rewardItem2: 'wp_boss_thunder' },
  { id: 8, name: '칠흑룡 벨카누스', hp: 2200, color1: '#7a5cff', color2: '#1a0a3a', shape: 'dragon',
    pattern: 'sweep', patternLabel: '전방위 브레스 (안전지대 찾기)', atkInterval: 2.6,
    reward: { gold: 1300, gem: 26 }, rewardItem: 'wp_boss_dragon' },
  { id: 9, name: '심연의 사냥꾼 크로바', hp: 2450, color1: '#ff6a8a', color2: '#4a0a1a', shape: 'hunter',
    pattern: 'dash', patternLabel: '고속 돌진 저격 + 3연속 급습', atkInterval: 1.5,
    big: { type: 'tripledash', dashes: 3, dmg: 18, gap: 0.35, interval: 5.0, telegraphT: 0.3 },
    reward: { gold: 1500, gem: 30 }, rewardItem: 'sw_void', rewardItem2: 'wp_boss_hunter' },
  { id: 10, name: '태초의 화신', hp: 3200, color1: '#ffe9a8', color2: '#5a3a10', shape: 'genesis',
    pattern: 'combo', patternLabel: '모든 패턴 복합 사용', atkInterval: 1.6,
    reward: { gold: 2200, gem: 45 }, rewardItem: 'wp_boss_genesis', rewardItem2: 'ar_boss_genesis' },

  // ===== HELL DIFFICULTY (지옥 난이도) 10종 =====
  { id: 11, name: '지옥문지기 카론', hp: 3600, color1: '#ff8a5a', color2: '#3a0808', shape: 'hunter',
    pattern: 'single', patternLabel: '단발 조준탄 + 즉사급 기습타', atkInterval: 1.4,
    big: { type: 'pointblank', dmg: 32, interval: 4.4, telegraphT: 0.35 },
    reward: { gold: 2600, gem: 50 }, rewardItem: 'sw_thorn2' },
  { id: 12, name: '업화의 심판관', hp: 4000, color1: '#ff5a2a', color2: '#4a0a0a', shape: 'golem',
    pattern: 'slam', patternLabel: '광역 강타 + 3연속 급습', atkInterval: 2.0,
    big: { type: 'tripledash', dashes: 4, dmg: 20, gap: 0.3, interval: 4.6, telegraphT: 0.3 },
    reward: { gold: 2900, gem: 55 }, rewardItem: 'wp_blaze2' },
  { id: 13, name: '흑염 마신', hp: 4500, color1: '#c43aff', color2: '#1a0022', shape: 'ghost',
    pattern: 'teleport', patternLabel: '순간이동 기습 + 뼈(재) 소나기', atkInterval: 1.3,
    big: { type: 'rain', count: 16, dmg: 11, interval: 4.2, telegraphT: 0.45 },
    reward: { gold: 3200, gem: 60 }, rewardItem: 'wp_vortex2' },
  { id: 14, name: '아귀왕 글루토니', hp: 5000, color1: '#8aff5a', color2: '#0a2a08', shape: 'slime',
    pattern: 'poison', patternLabel: '맹독 웅덩이 + 튀는 폭탄', atkInterval: 1.9,
    big: { type: 'bounce', dmg: 28, interval: 5.0, telegraphT: 0.5 },
    reward: { gold: 3600, gem: 65 }, rewardItem: 'ar_scale3' },
  { id: 15, name: '얼어붙은 통곡자', hp: 5600, color1: '#c9c4e0', color2: '#2a1030', shape: 'skull',
    pattern: 'slow', patternLabel: '냉기탄 + 독안개 3연폭', atkInterval: 1.8,
    big: { type: 'multiExpand', count: 4, dmg: 9, startR: 16, endR: 68, duration: 1.9, interval: 5.2, telegraphT: 0.45 },
    reward: { gold: 4000, gem: 70 }, rewardItem: 'wp_glacier2' },
  { id: 16, name: '뇌옥의 간수장', hp: 6200, color1: '#5ac4ff', color2: '#0a1a3a', shape: 'ice',
    pattern: 'double', patternLabel: '연속 2연발 + 확산 웅덩이', atkInterval: 1.1,
    big: { type: 'expand', dmg: 11, startR: 22, endR: 160, duration: 2.4, interval: 5.6, telegraphT: 0.55 },
    reward: { gold: 4500, gem: 75 }, rewardItem: 'ar_storm2' },
  { id: 17, name: '천 개의 손을 가진 자', hp: 6900, color1: '#ffd94a', color2: '#3a2a00', shape: 'thunder',
    pattern: 'spread', patternLabel: '3방향 부채꼴 + 굴러오는 바위', atkInterval: 1.3,
    big: { type: 'boulder', dmg: 26, speed: 3.0, radius: 34, duration: 3.6, interval: 5.4, telegraphT: 0.45 },
    reward: { gold: 5100, gem: 82 }, rewardItem: 'wp_boss_hell1' },
  { id: 18, name: '심판의 나팔수', hp: 7600, color1: '#ff4a8a', color2: '#3a0020', shape: 'witch',
    pattern: 'dash', patternLabel: '고속 돌진 저격 + 연쇄 낙뢰', atkInterval: 1.0,
    big: { type: 'rainwave', waves: 4, perWave: 6, dmg: 12, gap: 0.38, interval: 4.8, telegraphT: 0.28 },
    reward: { gold: 5800, gem: 90 }, rewardItem: 'wp_boss_hell2' },
  { id: 19, name: '별을 삼킨 자', hp: 8400, color1: '#ff3a3a', color2: '#1a0000', shape: 'dragon',
    pattern: 'starburst', patternLabel: '전방위 탄막 (본연의 패턴)', atkInterval: 2.2,
    reward: { gold: 6600, gem: 100 }, rewardItem: 'sw_bone2' },
  { id: 20, name: '태초 이전의 것', hp: 9500, color1: '#f0f0f0', color2: '#000000', shape: 'genesis',
    pattern: 'combo', patternLabel: '모든 패턴 + 확산 웅덩이 (진 최종보스)', atkInterval: 1.2,
    big: { type: 'multiExpand', count: 5, dmg: 10, startR: 18, endR: 75, duration: 2.0, interval: 4.6, telegraphT: 0.4 },
    reward: { gold: 8500, gem: 130 }, rewardItem: 'wp_boss_hell3', rewardItem2: 'ar_boss_hell3' },
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
  { id: 'knight', name: '떠돌이 기사 레온', type: 'knight', discount: '근위대 갑주 한정 판매!',
    items: [ { itemId: 'ar_royal', price: 2100, discount: true }, { itemId: 'sw_holy', price: 3400, discount: false },
             { itemId: 'wp_frost', price: 780, discount: false } ] },
  { id: 'masked', name: '가면 상인', type: 'masked', discount: '서리한 석궁 오늘만 할인',
    items: [ { itemId: 'wp_frost', price: 560, discount: true }, { itemId: 'ar_dragon', price: 5200, discount: false },
             { itemId: 'wp_laser', price: 4800, discount: false } ] },
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
    lastCheckIn: null,
    checkInStreak: 0,
    playerSkin: null,
    dailyQuestDate: null,
    dailyQuests: [],
    bestEndlessWave: 0,
    totalGachaPulls: 0,
    achievementsClaimed: {},
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
  if (screenId === 'lobby') { refreshCurrencyDisplays(); updateCheckinBadge(); updateQuestBadge(); updateAchievementBadge(); }
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
    'armor-royal': `<path d="M16 12 L30 4 L44 12 L44 32 Q44 48 30 54 Q16 48 16 32 Z" fill="${col2}" stroke="#e8d9a0" stroke-width="2"/><path d="M30 14 L34 24 L24 24 Z" fill="${col}"/>`,
    'gun-frost': `<rect x="10" y="24" width="40" height="5" fill="${col2}"/><rect x="27" y="10" width="6" height="34" fill="#dff3ff"/><path d="M14 26 Q30 16 46 26" stroke="#dff3ff" stroke-width="2" fill="none"/><circle cx="30" cy="26" r="4" fill="#fff"/>`,
    'armor-bone': `<rect x="14" y="10" width="32" height="40" rx="6" fill="#161018" stroke="${col}" stroke-width="2"/><path d="M20 18 H40 M20 26 H40 M20 34 H40 M20 42 H40" stroke="#e8e2d8" stroke-width="3"/><circle cx="30" cy="14" r="4" fill="#e8e2d8"/>`,
    'gun-wraith': `<path d="M46 8 Q54 20 44 30 Q40 22 32 22 Z" fill="${col2}"/><path d="M32 22 L14 50" stroke="#2a2430" stroke-width="4" stroke-linecap="round"/><circle cx="46" cy="14" r="3" fill="${col}"/>`,
    'armor-magma': `<path d="M14 16 L30 4 L46 16 L42 50 Q30 56 18 50 Z" fill="#241414" stroke="${col2}" stroke-width="2"/><path d="M24 22 L30 34 L26 34 L34 48" stroke="${col}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    'gun-dragon': `<path d="M10 30 Q10 18 26 16 L48 22 Q56 26 48 32 L26 30 Q16 34 10 30Z" fill="${col2}"/><circle cx="46" cy="25" r="3" fill="#fff"/><path d="M26 16 L22 8 M30 16 L30 8" stroke="${col}" stroke-width="3" stroke-linecap="round"/>`,
    'gun-genesis': `<path d="M30 4 L36 22 L54 22 L40 32 L46 50 L30 40 L14 50 L20 32 L6 22 L24 22 Z" fill="${col2}"/><circle cx="30" cy="28" r="5" fill="#fff"/>`,
    'armor-genesis': `<path d="M12 18 L30 4 L48 18 L44 34 Q44 52 30 58 Q16 52 16 34 Z" fill="${col2}" stroke="#fff2c9" stroke-width="2"/><path d="M4 24 L16 30 L4 40 Z" fill="${col}"/><path d="M56 24 L44 30 L56 40 Z" fill="${col}"/>`,
    'blade-wind': `<path d="M30 4 L34 40 L30 48 L26 40 Z" fill="${col2}"/><path d="M18 20 Q30 12 42 20" stroke="${col}" stroke-width="2" fill="none"/><path d="M20 28 Q30 22 40 28" stroke="${col}" stroke-width="2" fill="none"/>`,
    'blade-thorn': `<path d="M30 4 L34 20 L40 22 L34 26 L36 40 L30 34 L24 40 L26 26 L20 22 L26 20 Z" fill="${col2}"/>`,
    'blade-shadow': `<path d="M22 4 L38 4 L32 26 L40 48 L26 40 L20 48 L28 24 Z" fill="${col2}" opacity="0.92"/>`,
    'blade-crystal': `<path d="M30 2 L40 18 L34 30 L30 50 L26 30 L20 18 Z" fill="${col2}"/><path d="M30 2 L34 30 L30 50" stroke="#fff" stroke-width="1" opacity="0.5"/>`,
    'blade-bone': `<rect x="27" y="6" width="6" height="34" rx="3" fill="${col2}"/><circle cx="30" cy="6" r="5" fill="${col2}"/><rect x="20" y="40" width="20" height="6" rx="3" fill="#e8e2d0"/>`,
    'armor-scale': `<path d="M16 14 L30 6 L44 14 L44 34 Q44 48 30 54 Q16 48 16 34 Z" fill="${col2}"/><path d="M20 20 a4 4 0 0 1 8 0 M28 20 a4 4 0 0 1 8 0 M36 20 a4 4 0 0 1 8 0 M24 28 a4 4 0 0 1 8 0 M32 28 a4 4 0 0 1 8 0" stroke="${col}" stroke-width="1.5" fill="none"/>`,
    'armor-wind': `<path d="M20 10 Q30 4 40 10 L44 30 Q30 50 16 30 Z" fill="${col2}" opacity="0.88"/><path d="M18 22 Q30 16 42 22" stroke="#fff" stroke-width="1.5" fill="none" opacity="0.6"/>`,
    'armor-thorn': `<path d="M16 14 L30 6 L44 14 L42 44 Q30 54 18 44 Z" fill="${col2}"/><path d="M16 20 L10 16 M44 20 L50 16 M18 34 L11 32 M42 34 L49 32" stroke="${col2}" stroke-width="3"/>`,
    'armor-crystal': `<path d="M30 4 L46 18 L40 50 L20 50 L14 18 Z" fill="${col2}"/><path d="M30 4 L30 50 M14 18 L46 18" stroke="#fff" stroke-width="1" opacity="0.4"/>`,
    'armor-storm': `<path d="M16 14 L30 6 L44 14 L44 32 Q44 48 30 54 Q16 48 16 32 Z" fill="${col2}"/><path d="M32 14 L24 28 L30 28 L26 42 L38 24 L31 24 Z" fill="${col}"/>`,
    'gun-thorn': `<rect x="12" y="24" width="34" height="8" rx="3" fill="${col2}"/><path d="M46 22 L52 28 L46 34 Z" fill="${col}"/><path d="M18 24 L16 18 M26 24 L24 18 M34 24 L32 18" stroke="${col2}" stroke-width="2"/>`,
    'gun-wind': `<path d="M12 30 Q30 14 48 30" stroke="${col2}" stroke-width="5" fill="none"/><path d="M18 30 L14 40 M48 30 L52 40" stroke="${col}" stroke-width="3"/>`,
    'gun-crystal': `<path d="M10 28 L30 20 L50 28 L30 36 Z" fill="${col2}"/><circle cx="30" cy="28" r="4" fill="#fff"/>`,
    'gun-storm': `<rect x="14" y="24" width="30" height="9" rx="3" fill="${col2}"/><path d="M40 16 L32 30 L38 30 L30 44 L46 26 L39 26 Z" fill="${col}"/>`,
    'gun-bone': `<rect x="14" y="26" width="34" height="6" rx="3" fill="${col2}"/><circle cx="14" cy="29" r="6" fill="#e8e2d0"/><circle cx="48" cy="29" r="6" fill="#e8e2d0"/>`,
    'gun-spike': `<rect x="14" y="24" width="30" height="9" rx="3" fill="${col2}"/><path d="M44 20 L50 14 M44 24 L52 24 M44 28 L50 34" stroke="${col}" stroke-width="2.5" stroke-linecap="round"/>`,
    'gun-orb': `<circle cx="30" cy="28" r="14" fill="${col2}"/><circle cx="30" cy="28" r="6" fill="${col}"/>`,
    'gun-fang': `<path d="M10 34 L26 14 L30 28 L34 14 L50 34 L30 24 Z" fill="${col2}"/>`,
    'gun-arc': `<path d="M14 40 Q30 8 46 40" stroke="${col2}" stroke-width="6" fill="none"/><path d="M14 40 L46 40" stroke="${col}" stroke-width="1.5"/>`,
    'gun-comet': `<circle cx="42" cy="20" r="8" fill="${col2}"/><path d="M36 24 L14 42" stroke="${col}" stroke-width="4" stroke-linecap="round" opacity="0.6"/>`,
    'gun-vortex': `<circle cx="30" cy="28" r="16" fill="none" stroke="${col2}" stroke-width="5"/><circle cx="30" cy="28" r="7" fill="${col}"/>`,
    'gun-blaze': `<path d="M30 6 Q40 20 30 30 Q38 38 30 50 Q22 38 30 30 Q20 20 30 6Z" fill="${col2}"/><rect x="20" y="46" width="20" height="6" rx="2" fill="#3a2a1a"/>`,
    'gun-glacier': `<path d="M14 30 L26 18 L30 30 L34 18 L46 30 L34 34 L30 46 L26 34 Z" fill="${col2}"/>`,
    'gun-venom': `<rect x="14" y="22" width="32" height="10" rx="4" fill="${col2}"/><circle cx="46" cy="27" r="6" fill="${col}"/><path d="M20 32 L18 40 M28 32 L27 42" stroke="${col}" stroke-width="2"/>`,
    'gun-nova': `<path d="M30 8 L34 24 L50 24 L37 33 L42 48 L30 39 L18 48 L23 33 L10 24 L26 24 Z" fill="${col2}" opacity="0.9"/>`,
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
      <span class="card-tag">${state.dungeonCleared}/${DUNGEONS.length} 클리어</span>
    </div>
    <div class="card-wide type-boss" data-nav="boss-list">
      <div class="card-icon"></div>
      <div class="card-text">
        <p class="card-title">보스 토벌</p>
        <p class="card-sub">강력한 보스와 1:1로 맞서라</p>
      </div>
      <span class="card-tag">${state.bossCleared}/${BOSSES.length} 처치</span>
    </div>
    <div class="card-wide type-challenge" data-nav="challenge-list">
      <div class="card-icon"></div>
      <div class="card-text">
        <p class="card-title">챌린지</p>
        <p class="card-sub">아래로 갈수록 지옥같은 난이도</p>
      </div>
      <span class="card-tag">특별 보상</span>
    </div>
    <div class="card-wide type-endless" id="endless-launch">
      <div class="card-icon"></div>
      <div class="card-text">
        <p class="card-title">무한 모드</p>
        <p class="card-sub">끝없이 몰려오는 적, 얼마나 버틸 수 있을까?</p>
      </div>
      <span class="card-tag">최고 웨이브 ${state.bestEndlessWave || 0}</span>
    </div>`;
  list.querySelectorAll('.card-wide[data-nav]').forEach(el => el.addEventListener('click', () => nav(el.dataset.nav)));
  document.getElementById('endless-launch').addEventListener('click', () => startRun({ mode: 'endless', data: { enemyHp: 24, enemySpeed: 0.4, endless: true } }));
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
        <p class="card-sub">웨이브 ${d.waves} · 난이도 ${'★'.repeat(Math.min(5, 1 + Math.floor(i / 5)))}${d.gimmick ? ` · <span style="color:${d.theme.c1}">${d.gimmick.label}</span>` : ''}</p>
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
    const rewardNote = (b.rewardItem || b.rewardItem2) ? ' · <span style="color:#ffd97a;">보상 장비</span>' : '';
    card.innerHTML = `
      <div class="card-icon" style="background:radial-gradient(circle at 35% 30%,${lighten(b.color1)},${b.color2});border-radius:50% 50% 40% 40%;"></div>
      <div class="card-text">
        <p class="card-title">${b.name}</p>
        <p class="card-sub">체력 ${b.hp} · ${b.patternLabel}${rewardNote}</p>
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

let currentCat = 'weapon';

function buildEquip() {
  const catsEl = document.getElementById('equip-cats');
  catsEl.innerHTML = '';
  CATEGORIES.forEach(c => {
    const b = document.createElement('button');
    b.className = 'cat-btn' + (c.id === currentCat ? ' active' : '');
    b.innerHTML = `<div class="cat-ico" style="background:${lighten('#5a2fbf')}"></div>${c.label}<span class="cat-sub">${c.sub}</span>`;
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
    card.className = `item-card ${RARITIES[it.rarity].cls}` + (equipped ? ' equipped' : '') + (inv && inv.awakened.length >= HEX_TOTAL ? ' awakened' : '');
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
  const dmgLabel = it.cat === 'weapon' ? '일반공격 데미지' : it.cat === 'sword' ? '특수공격 데미지' : '방어력';
  document.getElementById('up-damage-label').textContent = dmgLabel;
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
    changeEl.textContent = `${dmgLabel} ${pow.dmg || pow.def} → ${nextPow}`;
    costEl.textContent = `필요 골드: ${cost}`;
    confirmBtn.style.display = 'block';
    confirmBtn.classList.toggle('disabled', state.gold < cost);
    confirmBtn.onclick = () => {
      if (state.gold < cost) return;
      state.gold -= cost;
      inv.level = lvl + 1;
      addQuestProgress('upgrade');
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

// 벌집 구조: 0번(중심)을 각성해야 그에 연결된 1~6번이 해금된다
const HEX_TOTAL = 7;
const HEX_CENTER = 0;
function hexNeighbors(i) { return i === HEX_CENTER ? [1, 2, 3, 4, 5, 6] : [HEX_CENTER]; }
function hexCost(count) { return 300 + count * 250; } // count = 이미 각성한 개수
function hexEffectLabel(it) { return (it.baseDmg ? '데미지' : '방어력') + ' +12%'; }

function isHexAvailable(inv, i) {
  if (inv.awakened.includes(i)) return false;
  if (i === HEX_CENTER) return true;
  return inv.awakened.includes(HEX_CENTER);
}

function buildHexGrid() {
  const grid = document.getElementById('hex-grid');
  grid.innerHTML = '';
  const inv = state.inventory[upgradingId];
  const it = getItem(upgradingId);

  const info = document.getElementById('awaken-info');
  const doneCount = inv.awakened.length;
  const nextCost = doneCount < HEX_TOTAL ? hexCost(doneCount) : null;
  info.innerHTML = `
    <p class="ai-progress">각성 진행도 <b>${doneCount} / ${HEX_TOTAL}</b></p>
    <p class="ai-effect">칸당 효과: <b>${hexEffectLabel(it)}</b>${nextCost !== null ? ` · 다음 각성 비용: <b>${nextCost} 마력석</b>` : ' · 완전 각성 완료!'}</p>
  `;

  // 중심(0) + 주변 6개를 정육각형 모양으로 배치
  const positions = [{ x: 0, y: 0 }];
  for (let k = 0; k < 6; k++) {
    const angle = (-90 + 60 * k) * Math.PI / 180;
    positions.push({ x: Math.cos(angle) * 74, y: Math.sin(angle) * 74 });
  }

  // 중심-주변 연결선
  for (let i = 1; i < HEX_TOTAL; i++) {
    const p = positions[i];
    const dist = Math.hypot(p.x, p.y);
    const angleDeg = Math.atan2(p.y, p.x) * 180 / Math.PI;
    const line = document.createElement('div');
    line.className = 'hex-link' + (inv.awakened.includes(0) ? ' lit' : '');
    line.style.width = dist + 'px';
    line.style.transform = `translate(0, -50%) rotate(${angleDeg}deg)`;
    grid.appendChild(line);
  }

  for (let i = 0; i < HEX_TOTAL; i++) {
    const hex = document.createElement('div');
    const done = inv.awakened.includes(i);
    const available = isHexAvailable(inv, i) && doneCount < HEX_TOTAL;
    hex.className = 'hex' + (done ? ' done' : '') + (available ? ' available' : '');
    hex.style.left = `calc(50% + ${positions[i].x}px)`;
    hex.style.top = `calc(50% + ${positions[i].y}px)`;
    if (done) {
      hex.innerHTML = `<span class="hex-mark">✦</span>`;
    } else if (available) {
      hex.innerHTML = `<span class="hex-cost">${hexCost(doneCount)}</span>`;
    }
    if (available) {
      hex.addEventListener('click', () => {
        const cost = hexCost(doneCount);
        if (state.gem < cost) { flashMsg('마력석이 부족합니다'); return; }
        state.gem -= cost;
        inv.awakened.push(i);
        save(); refreshCurrencyDisplays(); buildHexGrid();
        if (inv.awakened.length >= HEX_TOTAL) flashMsg(`${it.name} 완전 각성!`);
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
  drawPlayerCharacter(ctx, rect.width / 2, rect.height * 0.66, rect.height * 0.56, state.equipped, 0);
}

/* ---------------- 직접 그린 캐릭터 스킨 ---------------- */

let playerSkinImg = null;
function loadPlayerSkin() {
  if (!state.playerSkin) { playerSkinImg = null; return; }
  const img = new Image();
  img.onload = () => { playerSkinImg = img; };
  img.src = state.playerSkin;
}

function drawPlayerCharacter(ctx, cx, cy, scale, equipped, facing) {
  if (!playerSkinImg) { drawAdventurer(ctx, cx, cy, scale, equipped, facing); return; }
  ctx.save();
  ctx.beginPath(); ctx.ellipse(cx, cy + scale * 0.48, scale * 0.34, scale * 0.09, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fill();
  const size = scale * 1.15;
  if (facing < 0) {
    ctx.translate(cx, 0); ctx.scale(-1, 1); ctx.translate(-cx, 0);
  }
  ctx.drawImage(playerSkinImg, cx - size / 2, cy - size / 2, size, size);
  ctx.restore();
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
  const div = document.createElement('div');
  div.innerHTML = itemThumbSVG(item);
  const svgEl = div.firstChild;
  const img = new Image();
  const svgStr = new XMLSerializer().serializeToString(svgEl);
  img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgStr)));
  img.onload = () => {
    ctx.save();
    ctx.translate(cx - size / 2, cy - size / 2);
    ctx.scale(size / 60, size / 60);
    ctx.drawImage(img, 0, 0, 60, 60);
    ctx.restore();
  };
}

/* ---------------- 상점 ---------------- */

function buildShop() {
  refreshCurrencyDisplays();
  const row = document.getElementById('merchant-row');
  row.innerHTML = '';
  const gachaCard = document.createElement('div');
  gachaCard.className = 'gacha-launch';
  gachaCard.innerHTML = `
    <div class="gacha-machine" style="background:linear-gradient(160deg,#b98aff,#4a1f8a);">
      <div class="dome"></div>
      <div class="capsule" style="top:30px;left:30px;background:#ffd97a;"></div>
      <div class="capsule" style="top:24px;left:60px;background:#7fe0ff;"></div>
      <div class="capsule" style="top:40px;left:75px;background:#ff8ac4;"></div>
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
  if (type === 'knight') return `<div class="npc"><div class="plume"></div><div class="helmet"></div><div class="body"></div></div><div class="shield"></div>`;
  if (type === 'masked') return `<div class="npc"><div class="cloak"></div><div class="mask"></div></div><div class="lantern"></div>`;
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
    const pityLeft = t.pityMax - state.pity[t.id];
    const pityPct = Math.min(100, (state.pity[t.id] / t.pityMax) * 100);
    const card = document.createElement('div');
    card.className = 'gacha-tier-card';
    card.style.setProperty('--c1', t.colors[0]);
    card.style.setProperty('--c2', t.colors[1]);
    card.innerHTML = `
      <div class="gacha-orb">
        <div class="gacha-orb-core"></div>
        <div class="gacha-orb-ring"></div>
        <div class="gacha-orb-spark s1"></div>
        <div class="gacha-orb-spark s2"></div>
        <div class="gacha-orb-spark s3"></div>
      </div>
      <div class="gacha-info">
        <p class="gt-name">${t.label}</p>
        <div class="gt-pity-bar"><div class="gt-pity-fill" style="width:${pityPct}%;"></div></div>
        <p class="gt-pity-label">천장까지 ${pityLeft}회 남음</p>
      </div>
      <div class="gacha-actions">
        <button class="pull-btn single">1회<span>${t.price}</span></button>
        <button class="pull-btn ten">10회<span>${Math.round(t.price * 9)}</span></button>
      </div>
    `;
    card.querySelector('.single').addEventListener('click', () => doGachaPull(t, 1));
    card.querySelector('.ten').addEventListener('click', () => doGachaPull(t, 10));
    row.appendChild(card);
  });
}

function rollGachaOnce(tier) {
  state.pity[tier.id]++;
  const minRarityIdx = RARITY_ORDER.indexOf(tier.id);
  const pool = ITEMS.filter(it => RARITY_ORDER.indexOf(it.rarity) >= minRarityIdx && !it.bossExclusive);
  let result;
  if (state.pity[tier.id] >= tier.pityMax) {
    const topPool = pool.filter(it => it.rarity === RARITY_ORDER[RARITY_ORDER.length - 1] || it.rarity === 'legendary');
    result = topPool[Math.floor(Math.random() * topPool.length)] || pool[0];
    state.pity[tier.id] = 0;
  } else {
    const weighted = [];
    pool.forEach(it => { for (let i = 0; i < RARITIES[it.rarity].weight; i++) weighted.push(it); });
    result = weighted[Math.floor(Math.random() * weighted.length)];
    if (RARITY_ORDER.indexOf(result.rarity) >= RARITY_ORDER.indexOf('legendary')) state.pity[tier.id] = 0;
  }
  const inv = state.inventory[result.id];
  const isNew = !inv.owned;
  inv.owned = true;
  if (inv.level < 1) inv.level = 1; else inv.level = Math.min(10, inv.level + 1);
  return { item: result, isNew };
}

function doGachaPull(tier, count) {
  const totalPrice = count === 1 ? tier.price : Math.round(tier.price * 9);
  if (state.gem < totalPrice) { flashMsg('마력석이 부족합니다'); return; }
  state.gem -= totalPrice;
  const results = [];
  for (let i = 0; i < count; i++) results.push(rollGachaOnce(tier));
  addQuestProgress('gachaPull', count);
  state.totalGachaPulls = (state.totalGachaPulls || 0) + count;
  save(); refreshCurrencyDisplays(); buildGacha();
  showGachaResults(results);
}

function showGachaResults(results) {
  const box = document.getElementById('gacha-result-item');
  box.className = results.length > 1 ? 'gacha-result-grid' : '';
  box.innerHTML = results.map(({ item, isNew }) => `
    <div class="result-slot ${RARITIES[item.rarity].cls}">
      <div class="result-thumb" style="background:${svgToBg(itemThumbSVG(item))} center/70% no-repeat, radial-gradient(circle,#2c2244,#150f22)"></div>
      <div class="result-name">${item.name}</div>
      <div class="result-rarity" style="color:${RARITIES[item.rarity].color}">${RARITIES[item.rarity].label}${isNew ? ' · 신규' : ''}</div>
    </div>
  `).join('');
  document.getElementById('gacha-result-modal').style.display = 'flex';
}
document.getElementById('gacha-result-close').addEventListener('click', () => {
  document.getElementById('gacha-result-modal').style.display = 'none';
});

/* ---------------- 일일 출석 체크 ---------------- */

const CHECKIN_REWARDS = [
  { gold: 100, label: '100 G' },
  { gold: 150, label: '150 G' },
  { gold: 200, gem: 5, label: '200 G + 5' },
  { gold: 300, label: '300 G' },
  { gem: 10, label: '10 마력석' },
  { gold: 500, gem: 10, label: '500 G + 10' },
  { gold: 1000, gem: 30, bonus: true, label: '1000 G + 30 + 에픽 확정' },
];

function todayStr() { return new Date().toISOString().slice(0, 10); }
function yesterdayStr() { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().slice(0, 10); }
function isCheckInAvailable() { return state.lastCheckIn !== todayStr(); }

function rollFreeItem(minRarity) {
  const minRarityIdx = RARITY_ORDER.indexOf(minRarity);
  const pool = ITEMS.filter(it => RARITY_ORDER.indexOf(it.rarity) >= minRarityIdx && !it.bossExclusive);
  const weighted = [];
  pool.forEach(it => { for (let i = 0; i < RARITIES[it.rarity].weight; i++) weighted.push(it); });
  const result = weighted[Math.floor(Math.random() * weighted.length)];
  const inv = state.inventory[result.id];
  const isNew = !inv.owned;
  inv.owned = true;
  if (inv.level < 1) inv.level = 1; else inv.level = Math.min(10, inv.level + 1);
  return { item: result, isNew };
}

function updateCheckinBadge() {
  document.getElementById('checkin-badge-num').textContent = state.checkInStreak;
  document.getElementById('checkin-ping').style.display = isCheckInAvailable() ? 'block' : 'none';
}

function nextCheckinDayIdx() {
  // 오늘 출석 시 부여될 사이클 내 일차 (0~6)
  if (state.lastCheckIn === yesterdayStr()) return state.checkInStreak % 7;
  if (state.lastCheckIn === todayStr()) return (state.checkInStreak - 1 + 7) % 7;
  return 0;
}

function buildCheckinModal() {
  document.getElementById('checkin-streak-label').textContent = state.checkInStreak;
  const grid = document.getElementById('checkin-grid');
  grid.innerHTML = '';
  const claimedToday = !isCheckInAvailable();
  const todayIdx = nextCheckinDayIdx();
  CHECKIN_REWARDS.forEach((r, i) => {
    const cell = document.createElement('div');
    let cls = 'checkin-day';
    if (r.bonus) cls += ' jackpot';
    if (i < todayIdx || (i === todayIdx && claimedToday)) cls += ' claimed';
    else if (i === todayIdx) cls += ' today';
    else cls += ' future';
    cell.className = cls;
    cell.innerHTML = `<span class="cd-label">${i + 1}일차</span><span class="cd-icon"></span><span class="cd-amount">${r.label}</span>`;
    grid.appendChild(cell);
  });
  const btn = document.getElementById('checkin-claim-btn');
  if (claimedToday) {
    btn.textContent = '내일 다시 와주세요';
    btn.classList.add('disabled');
  } else {
    btn.textContent = '오늘 출석하기';
    btn.classList.remove('disabled');
  }
}

function openCheckinModal() {
  buildCheckinModal();
  document.getElementById('checkin-modal').style.display = 'flex';
}

function claimCheckIn() {
  if (!isCheckInAvailable()) { flashMsg('오늘은 이미 출석했어요!'); return; }
  const today = todayStr();
  if (state.lastCheckIn === yesterdayStr()) state.checkInStreak += 1; else state.checkInStreak = 1;
  state.lastCheckIn = today;
  const reward = CHECKIN_REWARDS[(state.checkInStreak - 1) % 7];
  state.gold += reward.gold || 0;
  state.gem += reward.gem || 0;
  let bonus = null;
  if (reward.bonus) bonus = rollFreeItem('epic');
  save(); refreshCurrencyDisplays(); updateCheckinBadge(); buildCheckinModal();
  flashMsg(`출석 완료! ${reward.label} 획득`);
  if (bonus) showGachaResults([bonus]);
}

document.getElementById('btn-checkin').addEventListener('click', openCheckinModal);
document.getElementById('checkin-claim-btn').addEventListener('click', claimCheckIn);
document.getElementById('checkin-modal-close').addEventListener('click', () => {
  document.getElementById('checkin-modal').style.display = 'none';
});

/* ---------------- 일일 퀘스트 ---------------- */

const QUEST_POOL = [
  { id: 'dungeon2', desc: '던전 2회 클리어', target: 2, type: 'dungeonClear', reward: { gold: 200 } },
  { id: 'dungeon4', desc: '던전 4회 클리어', target: 4, type: 'dungeonClear', reward: { gold: 350, gem: 3 } },
  { id: 'boss1', desc: '보스 1회 처치', target: 1, type: 'bossClear', reward: { gold: 300, gem: 5 } },
  { id: 'gacha1', desc: '가챠 1회 뽑기', target: 1, type: 'gachaPull', reward: { gold: 150 } },
  { id: 'gacha3', desc: '가챠 3회 뽑기', target: 3, type: 'gachaPull', reward: { gold: 300, gem: 3 } },
  { id: 'kill30', desc: '몬스터 30마리 처치', target: 30, type: 'enemyKill', reward: { gold: 180 } },
  { id: 'kill60', desc: '몬스터 60마리 처치', target: 60, type: 'enemyKill', reward: { gold: 280, gem: 3 } },
  { id: 'upgrade1', desc: '장비 업그레이드 1회', target: 1, type: 'upgrade', reward: { gold: 150 } },
  { id: 'wave5', desc: '웨이브 5회 클리어', target: 5, type: 'waveClear', reward: { gold: 170 } },
  { id: 'wave10', desc: '웨이브 10회 클리어', target: 10, type: 'waveClear', reward: { gold: 260, gem: 2 } },
  { id: 'special10', desc: '특수공격 10회 사용', target: 10, type: 'specialUse', reward: { gold: 160 } },
];

function ensureDailyQuests() {
  const today = todayStr();
  if (state.dailyQuestDate !== today) {
    state.dailyQuestDate = today;
    const shuffled = [...QUEST_POOL].sort(() => Math.random() - 0.5).slice(0, 4);
    state.dailyQuests = shuffled.map((q) => ({ ...q, progress: 0, claimed: false }));
    save();
  }
}

function addQuestProgress(type, amount) {
  ensureDailyQuests();
  let changed = false;
  state.dailyQuests.forEach((q) => {
    if (q.type === type && q.progress < q.target) {
      q.progress = Math.min(q.target, q.progress + (amount || 1));
      changed = true;
    }
  });
  if (changed) { save(); updateQuestBadge(); }
}

function updateQuestBadge() {
  ensureDailyQuests();
  const claimable = state.dailyQuests.filter((q) => q.progress >= q.target && !q.claimed).length;
  const doneCount = state.dailyQuests.filter((q) => q.claimed).length;
  document.getElementById('quest-badge-num').textContent = `${doneCount}/${state.dailyQuests.length}`;
  document.getElementById('quest-ping').style.display = claimable > 0 ? 'block' : 'none';
}

function buildQuestModal() {
  ensureDailyQuests();
  const list = document.getElementById('quest-list');
  list.innerHTML = '';
  state.dailyQuests.forEach((q) => {
    const done = q.progress >= q.target;
    const row = document.createElement('div');
    row.className = 'quest-row' + (done ? ' done' : '');
    const rewardLabel = [q.reward.gold ? `${q.reward.gold}G` : '', q.reward.gem ? `${q.reward.gem}마력석` : ''].filter(Boolean).join(' + ');
    row.innerHTML = `
      <div class="qr-top">
        <span class="qr-desc">${q.desc}</span>
        <span class="qr-reward">${rewardLabel}</span>
      </div>
      <div class="qr-bar"><div class="qr-bar-fill" style="width:${Math.min(100, (q.progress / q.target) * 100)}%;"></div></div>
      <div class="qr-bottom">
        <span class="qr-progress-label">${q.progress} / ${q.target}</span>
        <button class="quest-claim-btn ${q.claimed ? 'claimed' : (done ? '' : 'disabled')}">${q.claimed ? '완료' : '받기'}</button>
      </div>
    `;
    if (done && !q.claimed) {
      row.querySelector('.quest-claim-btn').addEventListener('click', () => {
        q.claimed = true;
        state.gold += q.reward.gold || 0;
        state.gem += q.reward.gem || 0;
        save(); refreshCurrencyDisplays(); updateQuestBadge(); buildQuestModal();
        flashMsg(`퀘스트 완료! ${rewardLabel} 획득`);
      });
    }
    list.appendChild(row);
  });
}

document.getElementById('btn-quest').addEventListener('click', () => { buildQuestModal(); document.getElementById('quest-modal').style.display = 'flex'; });
document.getElementById('quest-modal-close').addEventListener('click', () => {
  document.getElementById('quest-modal').style.display = 'none';
});

/* ---------------- 업적 ---------------- */

const ACHIEVEMENTS = [
  { id: 'first_dungeon', desc: '첫 던전 클리어', reward: { gold: 100 }, check: (s) => s.dungeonCleared >= 1 },
  { id: 'dungeon10', desc: '던전 10개 클리어', reward: { gold: 500 }, check: (s) => s.dungeonCleared >= 10 },
  { id: 'dungeon_all', desc: `던전 전체(${DUNGEONS.length}개) 클리어`, reward: { gold: 2000, gem: 20 }, check: (s) => s.dungeonCleared >= DUNGEONS.length },
  { id: 'first_boss', desc: '첫 보스 처치', reward: { gold: 150 }, check: (s) => s.bossCleared >= 1 },
  { id: 'boss_all', desc: `보스 전체(${BOSSES.length}종) 처치`, reward: { gold: 1500, gem: 15 }, check: (s) => s.bossCleared >= BOSSES.length },
  { id: 'gacha10', desc: '가챠 10회 뽑기', reward: { gold: 200 }, check: (s) => (s.totalGachaPulls || 0) >= 10 },
  { id: 'gacha100', desc: '가챠 100회 뽑기', reward: { gold: 1000, gem: 10 }, check: (s) => (s.totalGachaPulls || 0) >= 100 },
  { id: 'awaken1', desc: '장비 완전 각성 1회 달성', reward: { gold: 300 }, check: (s) => Object.values(s.inventory).some((i) => i.awakened.length >= HEX_TOTAL) },
  { id: 'endless20', desc: '무한 모드 웨이브 20 도달', reward: { gold: 400 }, check: (s) => (s.bestEndlessWave || 0) >= 20 },
  { id: 'endless50', desc: '무한 모드 웨이브 50 도달', reward: { gold: 1000, gem: 10 }, check: (s) => (s.bestEndlessWave || 0) >= 50 },
  { id: 'artist', desc: '내 캐릭터 직접 그리기 완료', reward: { gold: 100 }, check: (s) => !!s.playerSkin },
  { id: 'streak7', desc: '7일 연속 출석', reward: { gold: 300 }, check: (s) => (s.checkInStreak || 0) >= 7 },
];

function updateAchievementBadge() {
  const claimedCount = Object.keys(state.achievementsClaimed).length;
  document.getElementById('achv-count').textContent = `${claimedCount}/${ACHIEVEMENTS.length}`;
}

function buildAchievementModal() {
  const list = document.getElementById('achv-list');
  list.innerHTML = '';
  ACHIEVEMENTS.forEach((a) => {
    const claimed = !!state.achievementsClaimed[a.id];
    const done = a.check(state);
    const row = document.createElement('div');
    row.className = 'quest-row' + (done ? ' done' : '');
    const rewardLabel = [a.reward.gold ? `${a.reward.gold}G` : '', a.reward.gem ? `${a.reward.gem}마력석` : ''].filter(Boolean).join(' + ');
    row.innerHTML = `
      <div class="qr-top">
        <span class="qr-desc">${a.desc}</span>
        <span class="qr-reward">${rewardLabel}</span>
      </div>
      <div class="qr-bottom">
        <span class="qr-progress-label">${done ? '달성 완료' : '진행 중'}</span>
        <button class="quest-claim-btn ${claimed ? 'claimed' : (done ? '' : 'disabled')}">${claimed ? '완료' : '받기'}</button>
      </div>
    `;
    if (done && !claimed) {
      row.querySelector('.quest-claim-btn').addEventListener('click', () => {
        state.achievementsClaimed[a.id] = true;
        state.gold += a.reward.gold || 0;
        state.gem += a.reward.gem || 0;
        save(); refreshCurrencyDisplays(); updateAchievementBadge(); buildAchievementModal();
        flashMsg(`업적 달성! ${rewardLabel} 획득`);
      });
    }
    list.appendChild(row);
  });
}

document.getElementById('btn-achievements').addEventListener('click', () => { buildAchievementModal(); document.getElementById('achv-modal').style.display = 'flex'; });
document.getElementById('achv-modal-close').addEventListener('click', () => {
  document.getElementById('achv-modal').style.display = 'none';
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
  const weaponPow = itemPower(state.equipped.weapon);
  const swordPow = itemPower(state.equipped.sword);
  const armorPow = itemPower(state.equipped.armor);
  const baseMaxHp = 100 + armorPow.def * 4;
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
    playerDmg: Math.max(6, weaponPow.dmg),
    playerRange: Math.max(weaponPow.range, 160),
    specialDmg: Math.max(10, Math.round(swordPow.dmg * 2)),
    specialRange: Math.max(swordPow.range * 2, 180),
    wave: 1,
    totalWaves: cfg.mode === 'boss' ? 1 : (cfg.mode === 'endless' ? Infinity : cfg.data.waves),
    enemies: [],
    projectiles: [],
    bossProjectiles: [],
    hazards: [],
    boss: null,
    ammo: 8, ammoMax: 8, ammoRegenTimer: 0,
    special: { cooldown: 0, max: 5 },
    spawnQueue: 0,
    spawnTimer: 0,
    running: true,
    baseBounce: 0,
    hitFlash: 0,
    slowTimer: 0,
    lastTime: performance.now(),
    gimmick: cfg.mode === 'dungeon' ? cfg.data.gimmick : null,
    gimmickTimer: 2.5,
    gimmickPending: null,
    gimmickActive: null,
    gimmickObjects: [],
    obscureTimer: 0,
    pushForce: { x: 0, y: 0 },
    fireQueue: [],
    burstEffects: [],
  };

  document.getElementById('overlay-message').style.display = 'none';
  document.getElementById('boss-hp-wrap').style.display = (cfg.mode === 'boss') ? 'block' : 'none';
  updateAmmoBar();
  updateBaseHp();

  if (cfg.mode === 'boss') {
    spawnBoss(cfg.data);
    updateBossHp();
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
  document.getElementById('wave-label').textContent = game.mode === 'endless' ? `WAVE ${game.wave} (무한)` : `WAVE ${game.wave} / ${game.totalWaves}`;
  game.spawnQueue = 4 + game.wave * 2;
  game.spawnTimer = 0;
  game.enemies = [];
}

function spawnEnemy() {
  const stats = currentEnemyStats();
  const zone = getZone();
  const baseX = Math.max(30, Math.min(CW - 30, zone.cx + (Math.random() - 0.5) * zone.w * 1.7));
  const hue = game.data.theme ? game.data.theme.c1 : (game.data.hellLevel !== undefined ? mixColor('#7fd48a', '#ff3b3b', game.data.hellLevel / 6) : '#ff8a8a');

  const chargerChance = Math.min(0.32, 0.06 + game.wave * 0.025);
  if (game.wave >= 2 && Math.random() < chargerChance) {
    game.enemies.push({
      type: 'charger', phase: 'fall',
      x: baseX, baseX, y: -30, age: 0,
      hp: Math.round(stats.hp * 0.65), maxHp: Math.round(stats.hp * 0.65),
      speed: stats.speed * 0.55, dashSpeed: stats.speed * 5.5,
      color: '#ff3b3b', resolved: false,
      drift: 0, wobbleAmp: 0, wobbleFreq: 0, wobblePhase: 0,
      chargeTimer: 0, lockX: baseX,
    });
    return;
  }

  game.enemies.push({
    type: 'normal',
    x: baseX, baseX, y: -30 - Math.random() * 60, age: 0,
    hp: stats.hp, maxHp: stats.hp, speed: stats.speed * (0.8 + Math.random() * 0.4), color: hue, resolved: false,
    drift: (Math.random() - 0.5) * 46,
    wobbleAmp: 14 + Math.random() * 26,
    wobbleFreq: 0.7 + Math.random() * 1.6,
    wobblePhase: Math.random() * Math.PI * 2,
  });
}

function spawnBoss(b) {
  game.boss = {
    def: b, x: CW / 2, y: 90, hp: b.hp, maxHp: b.hp, atkTimer: 1.5, telegraph: null, dashTarget: null,
    wanderPhase: Math.random() * Math.PI * 2,
    chaseSpeed: 1.1 + Math.random() * 0.6,
    bigTimer: b.big ? 4.0 : null, bigPending: null, bigActive: null,
  };
  document.getElementById('boss-name').textContent = b.name;
  document.getElementById('wave-label').textContent = '보스전 · ' + b.patternLabel;
}

/* ---- 보스 전용 대형 패턴 (각자 완전히 다른 방식) ---- */

function spawnRainBurst(count, dmg) {
  for (let i = 0; i < count; i++) {
    const x = 20 + Math.random() * (CW - 40);
    game.bossProjectiles.push({ x, y: -20 - Math.random() * 160, speed: 4 + Math.random() * 3, resolved: false, type: 'normal', dmg });
  }
}

function activateBigMove(b) {
  const big = b.def.big;
  const zone = getZone();
  const playerRow = zone.cy - zone.h / 2;
  if (big.type === 'bounce') {
    const ang = Math.random() * Math.PI * 2;
    b.bigActive = { type: 'bounce', big, x: game.player.x, y: playerRow - 120, vx: Math.cos(ang) * 2.6, vy: Math.abs(Math.sin(ang)) * 2.2 + 1, elapsed: 0 };
  } else if (big.type === 'rain') {
    spawnRainBurst(big.count, big.dmg);
  } else if (big.type === 'pointblank') {
    b.x = Math.max(60, Math.min(CW - 60, game.player.x + (Math.random() < 0.5 ? -1 : 1) * 30));
    game.bossProjectiles.push({ x: b.x, y: b.y + 20, speed: 9, resolved: false, type: 'wide', dmg: big.dmg });
    b.bigActive = { type: 'flash', elapsed: 0, duration: 0.3, x: b.x };
  } else if (big.type === 'expand') {
    const x = Math.max(60, Math.min(CW - 60, game.player.x + (Math.random() - 0.5) * 160));
    b.bigActive = { type: 'expand', big, x, y: playerRow + zone.h * 0.4, r: big.startR, elapsed: 0 };
  } else if (big.type === 'multiExpand') {
    const circles = [];
    for (let i = 0; i < big.count; i++) {
      circles.push({ x: Math.max(50, Math.min(CW - 50, game.player.x + (Math.random() - 0.5) * 220)), y: playerRow + zone.h * (0.3 + Math.random() * 0.5), r: big.startR });
    }
    b.bigActive = { type: 'multiExpand', big, circles, elapsed: 0 };
  } else if (big.type === 'boulder') {
    const dir = Math.random() < 0.5 ? -1 : 1;
    b.bigActive = { type: 'boulder', big, x: dir < 0 ? CW - 40 : 40, y: playerRow + zone.h * 0.5, vx: dir * -big.speed, elapsed: 0, trailTimer: 0 };
  } else if (big.type === 'rainwave') {
    b.bigActive = { type: 'rainwave', big, wavesLeft: big.waves, timer: 0 };
  } else if (big.type === 'tripledash') {
    b.bigActive = { type: 'tripledash', big, dashesLeft: big.dashes, timer: 0 };
  }
}

function updateBigActive(b, dt) {
  const ba = b.bigActive;
  if (!ba) return;
  const big = ba.big;
  const zone = getZone();
  const playerRow = zone.cy - zone.h / 2;
  const yMin = playerRow - 160, yMax = zone.cy + zone.h / 2 - 10;
  if (ba.type === 'flash') {
    ba.elapsed += dt;
    if (ba.elapsed >= ba.duration) b.bigActive = null;
    return;
  }
  if (ba.type === 'bounce') {
    ba.elapsed += dt;
    ba.x += ba.vx * dt * 60; ba.y += ba.vy * dt * 60;
    if (ba.x < 30 || ba.x > CW - 30) ba.vx *= -1;
    if (ba.y < yMin || ba.y > yMax) ba.vy *= -1;
    ba.x = Math.max(30, Math.min(CW - 30, ba.x));
    ba.y = Math.max(yMin, Math.min(yMax, ba.y));
    if (Math.hypot(ba.x - game.player.x, ba.y - game.player.y) < PLAYER_R + 26) {
      game.baseHp -= big.dmg * dt * 2.5; game.hitFlash = Math.max(game.hitFlash, 0.4); updateBaseHp();
      if (game.baseHp <= 0) { gameOver(false); return; }
    }
    if (ba.elapsed > 5.5) b.bigActive = null;
  } else if (ba.type === 'expand') {
    ba.elapsed += dt;
    const t = Math.min(1, ba.elapsed / big.duration);
    ba.r = big.startR + (big.endR - big.startR) * t;
    if (Math.hypot(ba.x - game.player.x, ba.y - game.player.y) < ba.r) {
      game.baseHp -= big.dmg * dt * 4; game.hitFlash = Math.max(game.hitFlash, 0.4); updateBaseHp();
      if (game.baseHp <= 0) { gameOver(false); return; }
    }
    if (ba.elapsed >= big.duration) b.bigActive = null;
  } else if (ba.type === 'multiExpand') {
    ba.elapsed += dt;
    const t = Math.min(1, ba.elapsed / big.duration);
    let hit = false;
    ba.circles.forEach((c) => {
      c.r = big.startR + (big.endR - big.startR) * t;
      if (Math.hypot(c.x - game.player.x, c.y - game.player.y) < c.r) hit = true;
    });
    if (hit) {
      game.baseHp -= big.dmg * dt * 4; game.hitFlash = Math.max(game.hitFlash, 0.4); updateBaseHp();
      if (game.baseHp <= 0) { gameOver(false); return; }
    }
    if (ba.elapsed >= big.duration) b.bigActive = null;
  } else if (ba.type === 'boulder') {
    ba.elapsed += dt;
    ba.x += ba.vx * dt * 60;
    ba.trailTimer -= dt;
    if (ba.trailTimer <= 0) { ba.trailTimer = 0.22; game.hazards.push({ x: ba.x, y: ba.y, r: 24, timer: 2.2, dps: 0, frost: true }); }
    if (Math.hypot(ba.x - game.player.x, ba.y - game.player.y) < PLAYER_R + big.radius) {
      game.baseHp -= big.dmg; game.hitFlash = 1; updateBaseHp();
      b.bigActive = null;
      if (game.baseHp <= 0) { gameOver(false); return; }
      return;
    }
    if (ba.x < -60 || ba.x > CW + 60) b.bigActive = null;
  } else if (ba.type === 'rainwave') {
    ba.timer -= dt;
    if (ba.timer <= 0 && ba.wavesLeft > 0) {
      spawnRainBurst(big.perWave, big.dmg);
      ba.wavesLeft--; ba.timer = big.gap;
    }
    if (ba.wavesLeft <= 0) b.bigActive = null;
  } else if (ba.type === 'tripledash') {
    ba.timer -= dt;
    if (ba.timer <= 0 && ba.dashesLeft > 0) {
      game.bossProjectiles.push({ x: game.player.x, y: playerRow - 6, speed: 99, resolved: false, type: 'wide', dmg: big.dmg });
      ba.dashesLeft--; ba.timer = big.gap;
    }
    if (ba.dashesLeft <= 0) b.bigActive = null;
  }
}

/* ---------------- 던전 전용 환경 기믹 ---------------- */

function updateGimmickTick(dt) {
  const g = game.gimmick;
  if (game.gimmickPending) {
    game.gimmickPending.t -= dt;
    if (game.gimmickPending.t <= 0) { activateGimmick(); game.gimmickPending = null; }
  } else if (game.gimmickActive) {
    updateGimmickActive(dt);
  } else {
    game.gimmickTimer -= dt;
    if (game.gimmickTimer <= 0) {
      game.gimmickTimer = g.interval;
      game.gimmickPending = { t: 0.55 };
    }
  }
  if (game.obscureTimer > 0) game.obscureTimer = Math.max(0, game.obscureTimer - dt);
  if (game.gimmickObjects.length) updateGimmickObjects(dt);
}

function activateGimmick() {
  const g = game.gimmick;
  const zone = getZone();
  const playerRow = zone.cy - zone.h / 2;
  if (g.type === 'fallingHazard') {
    const x = Math.max(24, Math.min(CW - 24, game.player.x + (Math.random() - 0.5) * 180));
    game.bossProjectiles.push({ x, y: -20, speed: 4.4, resolved: false, type: 'normal', dmg: g.dmg, envColor: g.color });
    if (g.obscure) game.obscureTimer = 1.4;
  } else if (g.type === 'homing') {
    game.gimmickObjects.push({ type: 'homing', x: Math.random() < 0.5 ? -20 : CW + 20, y: playerRow - 60, vx: 0, vy: 0, dmg: g.dmg, life: 6 });
  } else if (g.type === 'slowTrap') {
    const x = Math.max(30, Math.min(CW - 30, game.player.x + (Math.random() - 0.5) * 200));
    game.hazards.push({ x, y: playerRow + zone.h * 0.5, r: g.r, timer: 4.0, dps: 0, frost: true });
  } else if (g.type === 'obscure') {
    game.obscureTimer = g.duration;
  } else if (g.type === 'pushForce') {
    game.gimmickActive = { type: 'pushForce', mode: g.mode, force: g.force, elapsed: 0, duration: g.duration, angle: Math.random() * Math.PI * 2 };
  } else if (g.type === 'train') {
    const dir = Math.random() < 0.5 ? -1 : 1;
    game.gimmickActive = { type: 'train', x: dir < 0 ? CW + 80 : -80, dir, y: playerRow + zone.h * 0.5, speed: 6.5 };
  } else if (g.type === 'web') {
    for (let i = 0; i < 3; i++) {
      const x = Math.max(30, Math.min(CW - 30, game.player.x + (Math.random() - 0.5) * 240));
      game.hazards.push({ x, y: playerRow + zone.h * (0.2 + Math.random() * 0.6), r: 44, timer: 4.5, dps: 0, frost: true, web: true });
    }
    game.obscureTimer = 2.0;
  }
}

function updateGimmickActive(dt) {
  const ga = game.gimmickActive;
  const zone = getZone();
  const playerRow = zone.cy - zone.h / 2;
  if (ga.type === 'pushForce') {
    ga.elapsed += dt;
    if (ga.mode === 'vortex') {
      const cx = CW / 2, cy = zone.cy;
      const dx = cx - game.player.x, dy = cy - game.player.y;
      const d = Math.max(1, Math.hypot(dx, dy));
      game.pushForce.x = (dx / d) * ga.force; game.pushForce.y = (dy / d) * ga.force;
    } else {
      game.pushForce.x = Math.cos(ga.angle) * ga.force; game.pushForce.y = Math.sin(ga.angle) * ga.force * 0.3;
    }
    if (ga.elapsed >= ga.duration) { game.pushForce.x = 0; game.pushForce.y = 0; game.gimmickActive = null; }
  } else if (ga.type === 'train') {
    ga.x += ga.dir * ga.speed * dt * 60;
    if (Math.abs(game.player.x - ga.x) < 70 && Math.abs(game.player.y - ga.y) < 55) {
      game.baseHp -= 30 * dt * 3; game.hitFlash = 1; updateBaseHp();
      if (game.baseHp <= 0) { gameOver(false); return; }
    }
    if (ga.x < -100 || ga.x > CW + 100) game.gimmickActive = null;
  }
}

function updateGimmickObjects(dt) {
  for (let i = game.gimmickObjects.length - 1; i >= 0; i--) {
    const o = game.gimmickObjects[i];
    o.life -= dt;
    const dx = game.player.x - o.x, dy = game.player.y - o.y;
    const d = Math.max(1, Math.hypot(dx, dy));
    const homeSpeed = 1.6;
    o.vx += (dx / d) * homeSpeed * dt * 20; o.vy += (dy / d) * homeSpeed * dt * 20;
    o.vx *= 0.96; o.vy *= 0.96;
    o.x += o.vx * dt; o.y += o.vy * dt;
    if (Math.hypot(dx, dy) < PLAYER_R + 14) {
      game.baseHp -= o.dmg; game.baseBounce = 1; game.hitFlash = 1; updateBaseHp();
      game.gimmickObjects.splice(i, 1);
      if (game.baseHp <= 0) { gameOver(false); return; }
      continue;
    }
    if (o.life <= 0) game.gimmickObjects.splice(i, 1);
  }
}

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

const COMBO_PATTERNS = ['single', 'spread', 'slow', 'double', 'poison', 'sweep', 'slam', 'teleport', 'dash', 'starburst'];

function startBossTelegraph(b) {
  const pattern = b.def.pattern === 'combo' ? pickRandom(COMBO_PATTERNS) : b.def.pattern;
  const px = game.player.x;
  let xs = [];
  let t = 0.75;
  if (pattern === 'spread') { xs = [px - 70, px, px + 70]; }
  else if (pattern === 'double') { xs = [px - 40, px + 40]; t = 0.6; }
  else if (pattern === 'sweep') {
    const gapStart = Math.max(80, Math.min(CW - 80, px));
    let gapTarget = gapStart + (Math.random() < 0.5 ? -1 : 1) * (CW * 0.55);
    gapTarget = Math.max(80, Math.min(CW - 80, gapTarget));
    b.telegraph = { xs: [], t: 0.9, pattern, gapStart, gapTarget };
    return;
  } else if (pattern === 'starburst') {
    b.telegraph = { xs: [], t: 0.7, pattern };
    return;
  } else if (pattern === 'teleport') {
    b.x = Math.max(60, Math.min(CW - 60, Math.random() * CW));
    xs = [px]; t = 0.55;
  } else if (pattern === 'slam') { xs = [px]; t = 1.0; }
  else if (pattern === 'dash') { xs = [px]; t = 0.4; b.dashTarget = px; }
  else { xs = [px + (Math.random() - 0.5) * 100]; }
  xs = xs.map((x) => Math.max(30, Math.min(CW - 30, x)));
  b.telegraph = { xs, t, pattern };
}

function resolveBossTelegraph(b) {
  const pattern = b.telegraph.pattern;
  if (pattern === 'sweep') {
    game.boss.laser = {
      startX: b.telegraph.gapStart, targetX: b.telegraph.gapTarget, gapX: b.telegraph.gapStart,
      gapWidth: 85, elapsed: 0, duration: 2.1, motion: 'slide', color: '150,80,255', secondary: null, jumped: false,
    };
    b.dashTarget = null;
    return;
  }
  if (pattern === 'starburst') {
    const n = 12;
    for (let k = 0; k < n; k++) {
      const ang = (Math.PI * 2 * k) / n + Math.random() * 0.15;
      game.bossProjectiles.push({ x: b.x, y: b.y, vx: Math.cos(ang) * 4.6, vy: Math.sin(ang) * 4.6, angled: true, type: 'star', dmg: 12, resolved: false });
    }
    b.dashTarget = null;
    return;
  }
  b.telegraph.xs.forEach((x) => {
    if (pattern === 'poison') game.bossProjectiles.push({ x, y: b.y + 30, speed: 3.4, resolved: false, type: 'poison', dmg: 6 });
    else if (pattern === 'slow') game.bossProjectiles.push({ x, y: b.y + 30, speed: 3.8, resolved: false, type: 'slow', dmg: 10 });
    else if (pattern === 'slam') game.bossProjectiles.push({ x, y: b.y + 30, speed: 4.4, resolved: false, type: 'wide', dmg: 20 });
    else game.bossProjectiles.push({ x, y: b.y + 30, speed: 5.2, resolved: false, type: 'normal', dmg: 14 });
  });
  b.dashTarget = null;
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

// 무기 모양(shape)마다 탄환 개수/간격/크기/속도/발사 방식이 다르다
const FIRE_PATTERNS = {
  precise: { count: 1, spreadDeg: 0, speed: 12, r: 5 },
  heavy: { count: 1, spreadDeg: 0, speed: 7, r: 15 },
  dual: { count: 2, spreadDeg: 14, speed: 10, r: 6 },
  spread3: { count: 3, spreadDeg: 20, speed: 9, r: 6 },
  spread5: { count: 5, spreadDeg: 34, speed: 8, r: 5 },
  volley: { count: 3, spreadDeg: 6, speed: 10, r: 5, volley: true, volleyGap: 0.09 },
};
// 최근에 추가된 신규 무기 모양에만 적용 (기존 무기는 원래 발사 방식 그대로 유지 - 혼동 방지)
const SHAPE_FIRE_MAP = {
  'gun-crystal': 'precise', 'gun-glacier': 'precise', 'blade-crystal': 'precise', 'gun-bone': 'precise',
  'gun-storm': 'heavy', 'gun-blaze': 'heavy', 'gun-spike': 'heavy', 'blade-bone': 'heavy',
  'gun-fang': 'dual', 'gun-arc': 'dual', 'gun-orb': 'dual', 'blade-thorn': 'dual',
  'gun-nova': 'spread3', 'blade-shadow': 'spread3', 'gun-thorn': 'spread3',
  'gun-vortex': 'spread5', 'gun-comet': 'spread5',
  'gun-wind': 'volley', 'gun-venom': 'volley', 'blade-wind': 'volley',
};
const FIRE_DMG_MULT = { 1: 1, 2: 0.65, 3: 0.55, 5: 0.4 };

function getFirePattern(item) {
  const fam = SHAPE_FIRE_MAP[item.shape];
  return fam ? FIRE_PATTERNS[fam] : null;
}

function spawnPlayerShot(angle, dmg, special, item, holdSec) {
  const color = RARITIES[item.rarity].color;
  const chargeT0 = Math.min(1, (holdSec || 0) / 0.9);
  const chargeMult0 = 1 + chargeT0 * 0.7;
  const fp = getFirePattern(item);
  if (!fp) {
    // 기존 무기: 원래대로 단발, aimStyle이 trident면 3방향 부채꼴
    const style = item.aimStyle || 'dotted';
    const speed = special ? 7 : 9;
    const r = (special ? 12 : 6) * (1 + chargeT0 * 0.6);
    if (chargeT0 >= 0.85) spawnBurstEffect(game.player.x, game.player.y, color);
    if (style === 'trident') {
      [-0.16, 0, 0.16].forEach((off) => {
        const a = angle + off;
        game.projectiles.push({ x: game.player.x, y: game.player.y, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, dmg: Math.round(dmg * 0.6 * chargeMult0), special, r, style, color });
      });
    } else {
      game.projectiles.push({ x: game.player.x, y: game.player.y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, dmg: Math.round(dmg * chargeMult0), special, r, style, color });
    }
    return;
  }
  const style = item.aimStyle || 'dotted';
  const chargeT = Math.min(1, (holdSec || 0) / 0.9); // 0.9초 이상 누르면 완전 충전
  const chargeMult = 1 + chargeT * 0.7; // 최대 1.7배 데미지
  const perDmg = Math.max(1, Math.round(dmg * (FIRE_DMG_MULT[fp.count] || 0.5) * chargeMult));
  const chargedR = fp.r * (1 + chargeT * 0.6);
  if (chargeT >= 0.85) spawnBurstEffect(game.player.x, game.player.y, color);
  for (let i = 0; i < fp.count; i++) {
    const off = fp.count > 1 ? (i - (fp.count - 1) / 2) * (fp.spreadDeg * Math.PI / 180) : 0;
    const shot = { angle: angle + off, dmg: perDmg, special, r: chargedR, speed: fp.speed, style, color };
    if (fp.volley) {
      game.fireQueue.push({ ...shot, delay: i * fp.volleyGap });
    } else {
      game.projectiles.push({ x: game.player.x, y: game.player.y, vx: Math.cos(shot.angle) * fp.speed, vy: Math.sin(shot.angle) * fp.speed, dmg: perDmg, special, r: chargedR, style, color });
    }
  }
}

function spawnBurstEffect(x, y, color) {
  game.gimmickObjects = game.gimmickObjects || [];
  game.burstEffects = game.burstEffects || [];
  game.burstEffects.push({ x, y, color, elapsed: 0, duration: 0.35 });
}

function fireMain(angle, holdSec) {
  if (!game || !game.running) return;
  if (game.ammo < 1) { flashMsg('탄약 부족!'); return; }
  game.ammo--; updateAmmoBar();
  const wp = getItem(state.equipped.weapon);
  spawnPlayerShot(angle, game.playerDmg, false, wp, holdSec || 0);
}
function fireSpecial(angle, holdSec) {
  if (!game || !game.running) return;
  if (game.special.cooldown > 0) { flashMsg('특수무기 재장전 중'); return; }
  game.special.cooldown = game.special.max;
  const sw = getItem(state.equipped.sword);
  spawnPlayerShot(angle, game.specialDmg, true, sw, holdSec || 0);
  addQuestProgress('specialUse');
}

function setupAimJoystick(el, kind, onFire, radius) {
  const knob = el.querySelector('.stick-knob');
  let active = false, sx = 0, sy = 0, lastAng = 0, lastDist = 0, pressStart = 0;
  function start(e) {
    active = true;
    pressStart = performance.now();
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
    if (game) game.aim = { active: true, angle: lastAng, kind, charge: Math.min(1, (performance.now() - pressStart) / 900) };
    e.preventDefault();
  }
  function end() {
    if (!active) return;
    active = false;
    const holdSec = (performance.now() - pressStart) / 1000;
    knob.style.transform = 'translate(0,0)';
    if (game) game.aim.active = false;
    if (lastDist > 8) onFire(lastAng, holdSec);
  }
  el.addEventListener('mousedown', start); el.addEventListener('touchstart', start, { passive: false });
  window.addEventListener('mousemove', move); window.addEventListener('touchmove', move, { passive: false });
  window.addEventListener('mouseup', end); window.addEventListener('touchend', end);
}
setupAimJoystick(document.getElementById('main-stick'), 'main', (ang, hold) => fireMain(ang, hold), 40);
setupAimJoystick(document.getElementById('special-stick'), 'special', (ang, hold) => fireSpecial(ang, hold), 28);

canvas.addEventListener('mousemove', (e) => {
  if (!game || !game.running) return;
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left, my = e.clientY - rect.top;
  game.aim = { active: true, angle: Math.atan2(my - game.player.y, mx - game.player.x), kind: 'main' };
});
canvas.addEventListener('mouseleave', () => { if (game) game.aim.active = false; });
let pcPressStart = 0;
canvas.addEventListener('mousedown', (e) => {
  pcPressStart = performance.now();
  if (game) game.aim.charge = 0;
});
canvas.addEventListener('mouseup', (e) => {
  if (!game || !game.running || !game.aim.active) return;
  const hold = (performance.now() - pcPressStart) / 1000;
  if (e.button === 2) fireSpecial(game.aim.angle, hold);
  else fireMain(game.aim.angle, hold);
});
canvas.addEventListener('contextmenu', (e) => { e.preventDefault(); });

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
  if (game.slowTimer > 0) game.slowTimer = Math.max(0, game.slowTimer - dt);
  const effSpeed = game.speed * (game.slowTimer > 0 ? 0.5 : 1);
  let targetX = game.player.x, targetY = game.player.y;
  if (mlen > 0.01) {
    const nx = mvx / Math.max(1, mlen), ny = mvy / Math.max(1, mlen);
    targetX += nx * effSpeed * dt; targetY += ny * effSpeed * dt;
  }
  if (game.pushForce.x || game.pushForce.y) { targetX += game.pushForce.x * dt; targetY += game.pushForce.y * dt; }
  if (targetX !== game.player.x || targetY !== game.player.y) {
    const clamped = clampToZone(targetX, targetY);
    game.player.x = clamped.x; game.player.y = clamped.y;
  }

  // 던전 전용 기믹
  if (game.gimmick) { updateGimmickTick(dt); if (!game.running) return; }

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
  const zoneBottom = zone.cy + zone.h / 2 + PLAYER_R + 10;

  // 적 이동 + 플레이어와 충돌 판정 (회피 가능)
  // 존 안쪽 전체 구간을 매 프레임 검사한다 (아래쪽에 서 있다고 판정을 피해가지 못하도록)
  const chargeTriggerY = playerRow - 90;
  for (let i = game.enemies.length - 1; i >= 0; i--) {
    const e = game.enemies[i];
    if (e.type === 'charger') {
      if (e.phase === 'fall') {
        e.y += e.speed * dt * 60;
        e.x = e.baseX;
        if (e.y >= chargeTriggerY) { e.phase = 'telegraph'; e.chargeTimer = 0.5; e.lockX = game.player.x; }
      } else if (e.phase === 'telegraph') {
        e.chargeTimer -= dt;
        e.lockX = e.lockX + (game.player.x - e.lockX) * Math.min(1, dt * 4);
        if (e.chargeTimer <= 0) { e.phase = 'dash'; }
      } else {
        e.x = e.lockX;
        e.y += e.dashSpeed * dt * 60;
      }
    } else {
      e.y += e.speed * dt * 60;
      e.age += dt;
      e.x = Math.max(20, Math.min(CW - 20, e.baseX + e.drift * e.age + Math.sin(e.age * e.wobbleFreq + e.wobblePhase) * e.wobbleAmp));
    }
    const dmg = e.type === 'charger' ? 18 : 8;
    const hitR = PLAYER_R + (e.type === 'charger' ? 16 : 14);
    if (!e.resolved && e.y >= playerRow) {
      const dist = Math.hypot(e.x - game.player.x, e.y - game.player.y);
      if (dist < hitR) {
        e.resolved = true;
        game.baseHp -= dmg; game.baseBounce = 1; game.hitFlash = 1;
        game.enemies.splice(i, 1);
        updateBaseHp();
        if (game.baseHp <= 0) { gameOver(false); return; }
        continue;
      }
      if (e.y > zoneBottom) e.resolved = true;
    }
    if (e.y > CH + 40) game.enemies.splice(i, 1);
  }

  // 지연 발사 큐 (연사/볼리형 무기)
  for (let i = game.fireQueue.length - 1; i >= 0; i--) {
    const q = game.fireQueue[i];
    q.delay -= dt;
    if (q.delay <= 0) {
      game.projectiles.push({ x: game.player.x, y: game.player.y, vx: Math.cos(q.angle) * q.speed, vy: Math.sin(q.angle) * q.speed, dmg: q.dmg, special: q.special, r: q.r, style: q.style, color: q.color });
      game.fireQueue.splice(i, 1);
    }
  }

  // 차지샷 이펙트
  for (let i = game.burstEffects.length - 1; i >= 0; i--) {
    const b = game.burstEffects[i];
    b.elapsed += dt;
    if (b.elapsed >= b.duration) game.burstEffects.splice(i, 1);
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
          if (e.hp <= 0) { game.enemies.splice(j, 1); addQuestProgress('enemyKill'); }
          break;
        }
      }
    }
    if (hit) game.projectiles.splice(i, 1);
  }

  // 웨이브 클리어 체크
  if (game.mode !== 'boss' && game.spawnQueue <= 0 && game.enemies.length === 0) {
    addQuestProgress('waveClear');
    if (game.wave >= game.totalWaves) { gameOver(true); return; }
    game.wave++;
    prepareWave();
    flashMsg(`WAVE ${game.wave} 시작!`);
  }

  // 보스 로직 (보스마다 다른 공격 패턴 + 플레이어를 쫓는 AI 이동)
  if (game.boss) {
    const b = game.boss;
    if (b.telegraph && b.telegraph.pattern === 'dash' && b.dashTarget !== null) {
      b.x += (b.dashTarget - b.x) * Math.min(1, dt * 8);
    } else {
      // 플레이어를 은근히 추적하되, 좌우로 흔들리며 완전히 예측 가능하지 않게 움직인다
      const weave = Math.sin(performance.now() / 850 + b.wanderPhase) * 100;
      const desiredX = Math.max(70, Math.min(CW - 70, game.player.x + weave));
      b.x += (desiredX - b.x) * Math.min(1, dt * b.chaseSpeed);
    }
    b.atkTimer -= dt;
    if (b.telegraph) {
      b.telegraph.t -= dt;
      if (b.telegraph.t <= 0) {
        resolveBossTelegraph(b);
        b.telegraph = null;
      }
    } else if (b.atkTimer <= 0) {
      b.atkTimer = b.def.atkInterval || 1.7;
      startBossTelegraph(b);
    }
    if (b.bigPending) {
      b.bigPending.t -= dt;
      if (b.bigPending.t <= 0) {
        activateBigMove(b);
        b.bigPending = null;
      }
    } else if (b.bigActive) {
      updateBigActive(b, dt);
      if (!game.running) return;
    } else if (b.bigTimer !== null) {
      b.bigTimer -= dt;
      if (b.bigTimer <= 0) {
        b.bigTimer = b.def.big.interval;
        b.bigPending = { t: b.def.big.telegraphT || 0.5 };
      }
    }
  }
  for (let i = game.bossProjectiles.length - 1; i >= 0; i--) {
    const bp = game.bossProjectiles[i];
    if (bp.angled) {
      // 전방위 탄막 (별 모양) - 매 프레임 위치/충돌 갱신
      bp.x += bp.vx * dt * 60; bp.y += bp.vy * dt * 60;
      if (!bp.resolved && Math.hypot(bp.x - game.player.x, bp.y - game.player.y) < PLAYER_R + 12) {
        bp.resolved = true;
        game.baseHp -= bp.dmg; game.baseBounce = 1; game.hitFlash = 1; updateBaseHp();
        game.bossProjectiles.splice(i, 1);
        if (game.baseHp <= 0) { gameOver(false); return; }
        continue;
      }
      if (bp.x < -30 || bp.x > CW + 30 || bp.y < -30 || bp.y > CH + 30) game.bossProjectiles.splice(i, 1);
      continue;
    }
    bp.y += bp.speed * dt * 60;
    if (!bp.resolved && bp.y >= playerRow) {
      const dist = Math.hypot(bp.x - game.player.x, bp.y - game.player.y);
      const hitRadius = PLAYER_R + (bp.type === 'wide' ? 32 : 16);
      if (dist < hitRadius) {
        bp.resolved = true;
        game.baseHp -= bp.dmg; game.baseBounce = 1; game.hitFlash = 1; updateBaseHp();
        if (bp.type === 'slow') game.slowTimer = 2.2;
        if (bp.type === 'poison') game.hazards.push({ x: bp.x, y: bp.y, r: 34, timer: 3.0, dps: 7 });
        game.bossProjectiles.splice(i, 1);
        if (game.baseHp <= 0) { gameOver(false); return; }
        continue;
      }
      if (bp.y > zoneBottom) {
        bp.resolved = true;
        if (bp.type === 'poison') game.hazards.push({ x: bp.x, y: bp.y, r: 34, timer: 3.0, dps: 7 });
        game.bossProjectiles.splice(i, 1);
        continue;
      }
    }
    if (bp.y > CH + 40) game.bossProjectiles.splice(i, 1);
  }

  // 가로 장막(레이저) - 보스마다 다른 방식으로 안전 구간이 움직인다
  if (game.boss && game.boss.laser) {
    const lz = game.boss.laser;
    lz.elapsed += dt;
    const t = Math.min(1, lz.elapsed / lz.duration);
    if (lz.motion === 'jump') {
      if (t >= 0.5 && !lz.jumped) {
        lz.jumped = true;
        lz.startX = lz.gapX;
        lz.targetX = Math.max(80, Math.min(CW - 80, lz.targetX + (Math.random() < 0.5 ? -1 : 1) * 120));
      }
      lz.gapX = t < 0.5 ? lz.startX : lz.targetX;
    } else if (lz.motion === 'zigzag') {
      const bounce = Math.abs(((t * 3) % 2) - 1);
      lz.gapX = lz.startX + (lz.targetX - lz.startX) * bounce;
    } else {
      lz.gapX = lz.startX + (lz.targetX - lz.startX) * t;
    }
    if (Math.abs(game.player.x - lz.gapX) > lz.gapWidth / 2) {
      game.baseHp -= 20 * dt; game.hitFlash = Math.max(game.hitFlash, 0.5); updateBaseHp();
      if (lz.secondary === 'slow') game.slowTimer = 0.3;
      if (game.baseHp <= 0) { gameOver(false); return; }
    }
    if (lz.elapsed >= lz.duration) {
      if (lz.secondary === 'poison') {
        const edgeX = lz.gapX + (lz.gapX < CW / 2 ? lz.gapWidth : -lz.gapWidth);
        game.hazards.push({ x: Math.max(30, Math.min(CW - 30, edgeX)), y: playerRow + 10, r: 40, timer: 3.5, dps: 6 });
      }
      game.boss.laser = null;
    }
  }

  // 지속 피해 웅덩이 (독전 마녀)
  for (let i = game.hazards.length - 1; i >= 0; i--) {
    const hz = game.hazards[i];
    hz.timer -= dt;
    if (hz.timer <= 0) { game.hazards.splice(i, 1); continue; }
    if (Math.hypot(hz.x - game.player.x, hz.y - game.player.y) < hz.r) {
      if (hz.frost) { game.slowTimer = 0.3; }
      else {
        game.baseHp -= hz.dps * dt;
        updateBaseHp();
        if (game.baseHp <= 0) { gameOver(false); return; }
      }
    }
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
  let wonItems = [];
  if (win) {
    title.textContent = game.mode === 'boss' ? '보스 처치!' : '던전 클리어!';
    desc.textContent = '수고하셨습니다!';
    reward = game.data.reward;
    state.gold += reward.gold; state.gem += reward.gem;
    if (game.mode === 'dungeon') { state.dungeonCleared = Math.max(state.dungeonCleared, DUNGEONS.indexOf(game.data) + 1); addQuestProgress('dungeonClear'); }
    if (game.mode === 'boss') {
      state.bossCleared = Math.max(state.bossCleared, BOSSES.indexOf(game.data) + 1);
      addQuestProgress('bossClear');
      ['rewardItem', 'rewardItem2'].forEach((key) => {
        const itemId = game.data[key];
        if (!itemId) return;
        const inv = state.inventory[itemId];
        if (inv && !inv.owned) {
          inv.owned = true; inv.level = 1;
          wonItems.push(getItem(itemId));
        }
      });
    }
    save();
  } else if (game.mode === 'endless') {
    const reached = game.wave;
    const isRecord = reached > state.bestEndlessWave;
    if (isRecord) state.bestEndlessWave = reached;
    reward = { gold: reached * 15, gem: Math.floor(reached / 3) };
    state.gold += reward.gold; state.gem += reward.gem;
    save();
    title.textContent = isRecord ? '신기록 달성!' : '무한 모드 종료';
    desc.textContent = `도달 웨이브: ${reached} (최고 기록: ${state.bestEndlessWave})`;
  } else {
    title.textContent = '기지가 파괴되었습니다...';
    desc.textContent = '다시 도전해보세요!';
  }
  const itemBadges = wonItems.map((it) => `
    <div class="reward-item-badge ${RARITIES[it.rarity].cls}">
      <div class="item-thumb" style="width:36px;height:36px;background:${svgToBg(itemThumbSVG(it))} center/70% no-repeat;"></div>
      <span>${it.name}</span>
    </div>`).join('');
  rewardsEl.innerHTML = (win || game.mode === 'endless') ? `<div class="cur-pill gold"><span class="cur-icon"></span>${reward.gold}</div><div class="cur-pill gem"><span class="cur-icon"></span>${reward.gem}</div>${itemBadges}` : '';
}

/* ---------- 렌더링 ---------- */

function render() {
  ctxG.clearRect(0, 0, CW, CH);
  const theme = game.data.theme;
  const t = game.mode === 'endless' ? Math.min(1, game.wave / 30) : (game.data.hellLevel !== undefined ? game.data.hellLevel / 6 : 0);
  const bgTop = theme ? theme.bg1 : mixColor(game.mode === 'endless' ? '#14141c' : '#233d2a', game.mode === 'endless' ? '#3a0a3a' : '#3d0a0a', t);
  const bgBot = theme ? theme.bg2 : mixColor(game.mode === 'endless' ? '#05050a' : '#14241a', game.mode === 'endless' ? '#1a0518' : '#1a0505', t);
  const grad = ctxG.createLinearGradient(0, 0, 0, CH);
  grad.addColorStop(0, bgTop); grad.addColorStop(1, bgBot);
  ctxG.fillStyle = grad; ctxG.fillRect(0, 0, CW, CH);

  const zone = getZone();
  drawZone(zone);

  // 적
  game.enemies.forEach(e => drawEnemy(e));

  // 보스
  if (game.boss) drawBoss(game.boss);
  // 지속 피해/지형 웅덩이 (독/서리)
  game.hazards.forEach(hz => {
    const a = 0.25 + 0.15 * Math.sin(performance.now() / 150 + hz.x);
    ctxG.beginPath(); ctxG.arc(hz.x, hz.y, hz.r, 0, Math.PI * 2);
    if (hz.web) {
      ctxG.fillStyle = `rgba(230,220,255,${a * 0.9})`; ctxG.fill();
      ctxG.strokeStyle = 'rgba(255,255,255,0.5)'; ctxG.lineWidth = 1.5;
      for (let k = 0; k < 6; k++) { const ang = (Math.PI * 2 * k) / 6; ctxG.beginPath(); ctxG.moveTo(hz.x, hz.y); ctxG.lineTo(hz.x + Math.cos(ang) * hz.r, hz.y + Math.sin(ang) * hz.r); ctxG.stroke(); }
    } else if (hz.frost) {
      ctxG.fillStyle = `rgba(140,220,255,${a})`; ctxG.fill();
      ctxG.strokeStyle = 'rgba(200,240,255,0.6)'; ctxG.lineWidth = 2; ctxG.stroke();
    } else {
      ctxG.fillStyle = `rgba(90,220,110,${a})`; ctxG.fill();
      ctxG.strokeStyle = 'rgba(140,255,160,0.5)'; ctxG.lineWidth = 2; ctxG.stroke();
    }
  });

  const bpColors = { normal: '#ff4a4a', wide: '#ff9a3a', slow: '#7fd8ff', poison: '#8aff9e' };
  game.bossProjectiles.forEach(bp => {
    if (bp.type === 'star') { drawStarBullet(bp); return; }
    const r = bp.type === 'wide' ? 18 : (bp.type === 'slow' || bp.type === 'poison' ? 13 : 10);
    const col = bp.envColor || bpColors[bp.type] || '#ff4a4a';
    ctxG.beginPath(); ctxG.arc(bp.x, bp.y, r, 0, Math.PI * 2);
    ctxG.fillStyle = col; ctxG.shadowColor = col; ctxG.shadowBlur = 12; ctxG.fill(); ctxG.shadowBlur = 0;
  });

  // 던전 기믹: 유도체/열차
  game.gimmickObjects.forEach(o => {
    ctxG.save();
    ctxG.beginPath(); ctxG.arc(o.x, o.y, 12, 0, Math.PI * 2);
    ctxG.fillStyle = '#ff5a5a'; ctxG.shadowColor = '#ff5a5a'; ctxG.shadowBlur = 10; ctxG.fill();
    ctxG.restore();
  });
  if (game.gimmickActive && game.gimmickActive.type === 'train') {
    const t = game.gimmickActive;
    ctxG.save();
    ctxG.translate(t.x, t.y);
    ctxG.fillStyle = '#241f30'; ctxG.fillRect(-70, -55, 140, 110);
    ctxG.fillStyle = '#ffe08a';
    for (let k = -50; k <= 50; k += 25) { ctxG.beginPath(); ctxG.arc(k, -20, 6, 0, Math.PI * 2); ctxG.fill(); }
    ctxG.fillStyle = '#ff4a4a';
    ctxG.beginPath(); ctxG.arc(t.dir < 0 ? -66 : 66, 10, 8, 0, Math.PI * 2); ctxG.fill();
    ctxG.restore();
  }

  // 보스 전용 대형 패턴 경고 + 실제 효과
  if (game.boss && game.boss.bigPending) {
    const col = game.boss.def.color1;
    const flash = 0.12 + 0.12 * Math.sin(performance.now() / 40);
    ctxG.save();
    ctxG.globalAlpha = flash;
    ctxG.fillStyle = col;
    ctxG.fillRect(0, 0, CW, CH);
    ctxG.restore();
  }
  if (game.boss && game.boss.bigActive) drawBigActive(game.boss.bigActive);

  // 던전 기믹 경고
  if (game.gimmickPending) {
    const flash = 0.12 + 0.14 * Math.sin(performance.now() / 35);
    ctxG.save(); ctxG.globalAlpha = flash; ctxG.fillStyle = game.gimmick.color; ctxG.fillRect(0, 0, CW, CH); ctxG.restore();
  }
  if (game.boss && game.boss.laser) {
    const lz = game.boss.laser;
    const gx = lz.gapX, gw = lz.gapWidth;
    const glow = 0.4 + 0.2 * Math.sin(performance.now() / 70);
    ctxG.fillStyle = `rgba(${lz.color},${glow})`;
    ctxG.fillRect(0, 0, Math.max(0, gx - gw / 2), CH);
    ctxG.fillRect(Math.min(CW, gx + gw / 2), 0, CW, CH);
    ctxG.fillStyle = 'rgba(255,255,255,0.9)';
    ctxG.fillRect(gx - gw / 2 - 3, 0, 3, CH);
    ctxG.fillRect(gx + gw / 2, 0, 3, CH);
  }

  if (game.boss && game.boss.telegraph) {
    const bottom = zone.cy - zone.h / 2;
    const tp = game.boss.telegraph.pattern;
    if (tp === 'sweep') {
      const gx = game.boss.telegraph.gapStart;
      ctxG.fillStyle = `rgba(180,40,255,${0.18 + 0.15 * Math.sin(performance.now() / 60)})`;
      ctxG.fillRect(0, 0, CW, CH);
      ctxG.fillStyle = 'rgba(255,255,255,0.25)';
      ctxG.fillRect(gx - 45, 0, 90, CH);
    } else if (tp === 'starburst') {
      const pulse = 40 + 20 * Math.sin(performance.now() / 50);
      ctxG.strokeStyle = `rgba(255,120,255,${0.5 + 0.3 * Math.sin(performance.now() / 50)})`;
      ctxG.lineWidth = 3;
      ctxG.beginPath(); ctxG.arc(game.boss.x, game.boss.y, pulse, 0, Math.PI * 2); ctxG.stroke();
    } else {
      game.boss.telegraph.xs.forEach(x => {
        const halfW = tp === 'slam' ? 60 : 40;
        ctxG.fillStyle = `rgba(255,60,60,${0.18 + 0.15 * Math.sin(performance.now() / 60)})`;
        ctxG.beginPath(); ctxG.moveTo(x - halfW, 0); ctxG.lineTo(x + halfW, 0); ctxG.lineTo(x + halfW * 0.4, bottom); ctxG.lineTo(x - halfW * 0.4, bottom); ctxG.closePath(); ctxG.fill();
      });
    }
  }

  // 투사체 (무기 종류별로 다른 모양)
  game.projectiles.forEach(p => drawPlayerBullet(p));

  // 차지샷 발사 이펙트 (팡!)
  game.burstEffects.forEach((b) => {
    const t = b.elapsed / b.duration;
    ctxG.save();
    ctxG.globalAlpha = Math.max(0, 1 - t);
    ctxG.strokeStyle = b.color; ctxG.lineWidth = 3;
    ctxG.beginPath(); ctxG.arc(b.x, b.y, 10 + t * 40, 0, Math.PI * 2); ctxG.stroke();
    ctxG.restore();
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

  // 시야 방해 (눈보라/거미줄/암흑)
  if (game.obscureTimer > 0) {
    const alpha = Math.min(0.55, game.obscureTimer * 0.35);
    ctxG.save();
    ctxG.globalAlpha = alpha;
    const g2 = ctxG.createRadialGradient(game.player.x, game.player.y, 40, game.player.x, game.player.y, CW * 0.6);
    g2.addColorStop(0, 'rgba(20,15,25,0)');
    g2.addColorStop(1, 'rgba(230,230,240,0.95)');
    ctxG.fillStyle = g2; ctxG.fillRect(0, 0, CW, CH);
    ctxG.restore();
  }

  // 바람/소용돌이 힘 표시
  if (game.pushForce.x || game.pushForce.y) {
    ctxG.save();
    ctxG.strokeStyle = 'rgba(255,255,255,0.25)'; ctxG.lineWidth = 2;
    const ang = Math.atan2(game.pushForce.y, game.pushForce.x);
    for (let k = 0; k < 5; k++) {
      const lx = (k / 5) * CW, ly = 40 + k * 30;
      ctxG.beginPath(); ctxG.moveTo(lx, ly); ctxG.lineTo(lx + Math.cos(ang) * 30, ly + Math.sin(ang) * 30); ctxG.stroke();
    }
    ctxG.restore();
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
  const kind = game.aim.kind;
  const activeItem = kind === 'special' ? getItem(state.equipped.sword) : getItem(state.equipped.weapon);
  const length = kind === 'special' ? game.specialRange : game.playerRange;
  const px = game.player.x, py = game.player.y, ang = game.aim.angle;
  const famName = SHAPE_FIRE_MAP[activeItem.shape];
  ctxG.save();
  if (famName) {
    // 신규 무기: 실제 발사 패턴(개수/퍼짐)에 맞춰 조준선도 달라짐
    if (famName === 'heavy') {
      ctxG.translate(px, py); ctxG.rotate(ang);
      ctxG.fillStyle = 'rgba(255,255,255,0.24)'; ctxG.strokeStyle = 'rgba(255,255,255,0.6)'; ctxG.lineWidth = 1.5;
      ctxG.beginPath(); ctxG.roundRect(16, -13, length - 16, 26, 7); ctxG.fill(); ctxG.stroke();
    } else if (famName === 'precise') {
      ctxG.strokeStyle = 'rgba(255,255,255,0.8)';
      ctxG.setLineDash([9, 6]); ctxG.lineWidth = 1.8;
      ctxG.beginPath(); ctxG.moveTo(px, py); ctxG.lineTo(px + Math.cos(ang) * length, py + Math.sin(ang) * length); ctxG.stroke();
    } else if (famName === 'dual') {
      ctxG.strokeStyle = 'rgba(255,255,255,0.75)';
      ctxG.setLineDash([6, 8]); ctxG.lineWidth = 2.2;
      [-0.09, 0.09].forEach((off) => {
        const a = ang + off;
        ctxG.beginPath(); ctxG.moveTo(px, py); ctxG.lineTo(px + Math.cos(a) * length * 0.95, py + Math.sin(a) * length * 0.95); ctxG.stroke();
      });
    } else if (famName === 'spread3') {
      ctxG.strokeStyle = 'rgba(255,255,255,0.75)';
      ctxG.setLineDash([6, 8]); ctxG.lineWidth = 2;
      [-0.16, 0, 0.16].forEach((off) => {
        const a = ang + off;
        ctxG.beginPath(); ctxG.moveTo(px, py); ctxG.lineTo(px + Math.cos(a) * length * 0.92, py + Math.sin(a) * length * 0.92); ctxG.stroke();
      });
    } else if (famName === 'spread5') {
      ctxG.strokeStyle = 'rgba(255,255,255,0.7)';
      ctxG.setLineDash([5, 7]); ctxG.lineWidth = 1.8;
      [-0.3, -0.15, 0, 0.15, 0.3].forEach((off) => {
        const a = ang + off;
        ctxG.beginPath(); ctxG.moveTo(px, py); ctxG.lineTo(px + Math.cos(a) * length * 0.85, py + Math.sin(a) * length * 0.85); ctxG.stroke();
      });
    } else if (famName === 'volley') {
      ctxG.strokeStyle = 'rgba(200,225,255,0.8)';
      ctxG.setLineDash([3, 5]); ctxG.lineWidth = 2.6;
      ctxG.beginPath(); ctxG.moveTo(px, py); ctxG.lineTo(px + Math.cos(ang) * length, py + Math.sin(ang) * length); ctxG.stroke();
    }
    ctxG.restore();
    return;
  }
  // 기존 무기: 원래 조준선 그대로 유지
  const style = activeItem.aimStyle || 'dotted';
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
  if (e.type === 'charger') { drawCharger(e); return; }
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

function drawCharger(e) {
  ctxG.save();
  if (e.phase === 'dash') {
    // 돌진 잔상
    const grad = ctxG.createLinearGradient(e.x, e.y - 70, e.x, e.y);
    grad.addColorStop(0, 'rgba(255,60,60,0)');
    grad.addColorStop(1, 'rgba(255,90,60,0.55)');
    ctxG.fillStyle = grad;
    ctxG.beginPath(); ctxG.moveTo(e.x - 10, e.y - 70); ctxG.lineTo(e.x + 10, e.y - 70); ctxG.lineTo(e.x + 5, e.y); ctxG.lineTo(e.x - 5, e.y); ctxG.closePath(); ctxG.fill();
  }
  ctxG.translate(e.x, e.y);
  const flash = e.phase === 'telegraph' ? (0.5 + 0.5 * Math.sin(performance.now() / 40)) : 1;
  ctxG.beginPath(); ctxG.ellipse(0, 22, 16, 5, 0, 0, Math.PI * 2); ctxG.fillStyle = 'rgba(0,0,0,0.3)'; ctxG.fill();
  // 가시 달린 몸체 (마름모 + 뾰족한 돌기)
  ctxG.beginPath();
  ctxG.moveTo(0, -20); ctxG.lineTo(6, -6); ctxG.lineTo(18, 0); ctxG.lineTo(6, 6); ctxG.lineTo(0, 20); ctxG.lineTo(-6, 6); ctxG.lineTo(-18, 0); ctxG.lineTo(-6, -6); ctxG.closePath();
  ctxG.fillStyle = e.phase === 'telegraph' ? `rgba(255,${Math.round(60 + flash * 120)},${Math.round(40 + flash * 60)},1)` : '#ff3b3b';
  ctxG.shadowColor = '#ff3b3b'; ctxG.shadowBlur = e.phase === 'telegraph' ? 16 : 8;
  ctxG.fill();
  ctxG.shadowBlur = 0;
  ctxG.strokeStyle = '#5a0f0f'; ctxG.lineWidth = 2; ctxG.stroke();
  ctxG.fillStyle = '#1a0a0a';
  ctxG.beginPath(); ctxG.arc(-4, -1, 2.2, 0, Math.PI * 2); ctxG.fill();
  ctxG.beginPath(); ctxG.arc(4, -1, 2.2, 0, Math.PI * 2); ctxG.fill();
  // 체력바
  ctxG.fillStyle = 'rgba(0,0,0,0.5)'; ctxG.fillRect(-16, -30, 32, 5);
  ctxG.fillStyle = '#ff8a6a'; ctxG.fillRect(-16, -30, 32 * Math.max(0, e.hp / e.maxHp), 5);
  ctxG.restore();
}

function drawBoss(b) {
  ctxG.save();
  ctxG.translate(b.x, b.y);
  const pulse = Math.sin(performance.now() / 300) * 4;
  const shape = b.def.shape;
  ctxG.beginPath(); ctxG.ellipse(0, 60, 50, 12, 0, 0, Math.PI * 2); ctxG.fillStyle = 'rgba(0,0,0,0.35)'; ctxG.fill();
  ctxG.beginPath();
  if (shape === 'slime') { ctxG.ellipse(0, 10 + pulse * 0.3, 46, 40 + pulse, 0, 0, Math.PI * 2); }
  else if (shape === 'ghost') { ctxG.arc(0, 0, 44, Math.PI, 0); ctxG.lineTo(30, 40 + pulse); ctxG.lineTo(10, 26); ctxG.lineTo(-10, 40); ctxG.lineTo(-30, 26 + pulse); ctxG.closePath(); }
  else if (shape === 'skull') { ctxG.arc(0, -6, 40, Math.PI, 0); ctxG.lineTo(30, 30); ctxG.lineTo(18, 44); ctxG.lineTo(6, 30); ctxG.lineTo(-6, 44); ctxG.lineTo(-18, 30); ctxG.lineTo(-30, 30); ctxG.closePath(); }
  else if (shape === 'golem') { ctxG.roundRect(-46, -40 + pulse * 0.2, 92, 84, 14); }
  else if (shape === 'witch') { ctxG.moveTo(0, -56); ctxG.lineTo(30, 10); ctxG.arc(0, 10, 30, 0, Math.PI, false); ctxG.closePath(); }
  else if (shape === 'ice') { ctxG.moveTo(0, -48 - pulse * 0.3); ctxG.lineTo(34, 0); ctxG.lineTo(0, 48); ctxG.lineTo(-34, 0); ctxG.closePath(); }
  else if (shape === 'thunder') { ctxG.moveTo(10, -48); ctxG.lineTo(-24, 4); ctxG.lineTo(0, 4); ctxG.lineTo(-10, 48); ctxG.lineTo(30, -8); ctxG.lineTo(6, -8); ctxG.closePath(); }
  else if (shape === 'hunter') { ctxG.moveTo(0, -44); ctxG.lineTo(38, 4); ctxG.lineTo(22, 44); ctxG.lineTo(-22, 44); ctxG.lineTo(-38, 4); ctxG.closePath(); }
  else if (shape === 'genesis') { ctxG.moveTo(0, -50 - pulse * 0.3); for (let k = 1; k < 10; k++) { const a = (Math.PI * 2 * k) / 10 - Math.PI / 2; const r = k % 2 === 0 ? 46 : 20; ctxG.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctxG.closePath(); }
  else { ctxG.arc(0, 0, 46 + pulse * 0.2, 0, Math.PI * 2); }
  const g = ctxG.createRadialGradient(-10, -10, 6, 0, 0, 50);
  g.addColorStop(0, lighten(b.def.color1)); g.addColorStop(1, b.def.color2);
  ctxG.fillStyle = g; ctxG.fill();
  ctxG.strokeStyle = 'rgba(0,0,0,0.4)'; ctxG.lineWidth = 2; ctxG.stroke();
  ctxG.fillStyle = '#1a0f0f';
  ctxG.beginPath(); ctxG.arc(-14, -6, 5, 0, Math.PI * 2); ctxG.fill();
  ctxG.beginPath(); ctxG.arc(14, -6, 5, 0, Math.PI * 2); ctxG.fill();
  ctxG.fillStyle = '#ff4a4a';
  ctxG.beginPath(); ctxG.arc(-14, -6, 2, 0, Math.PI * 2); ctxG.fill();
  ctxG.beginPath(); ctxG.arc(14, -6, 2, 0, Math.PI * 2); ctxG.fill();
  ctxG.restore();
}

function drawPlayerBullet(p) {
  const col = p.color || (p.special ? '#9adfff' : '#ffe08a');
  const ang = Math.atan2(p.vy, p.vx);
  ctxG.save();
  ctxG.translate(p.x, p.y); ctxG.rotate(ang);
  ctxG.fillStyle = col; ctxG.shadowColor = col; ctxG.shadowBlur = 10;
  if (p.style === 'block') {
    ctxG.beginPath(); ctxG.arc(0, 0, p.r, 0, Math.PI * 2); ctxG.fill();
    ctxG.fillStyle = 'rgba(255,255,255,0.55)';
    ctxG.beginPath(); ctxG.arc(-p.r * 0.3, -p.r * 0.3, p.r * 0.35, 0, Math.PI * 2); ctxG.fill();
  } else if (p.style === 'trident') {
    ctxG.beginPath();
    ctxG.moveTo(p.r * 1.6, 0); ctxG.lineTo(0, -p.r * 0.7); ctxG.lineTo(-p.r * 1.1, 0); ctxG.lineTo(0, p.r * 0.7);
    ctxG.closePath(); ctxG.fill();
  } else {
    ctxG.beginPath();
    ctxG.moveTo(p.r * 1.8, 0); ctxG.lineTo(-p.r * 1.1, -p.r * 0.55); ctxG.lineTo(-p.r * 0.5, 0); ctxG.lineTo(-p.r * 1.1, p.r * 0.55);
    ctxG.closePath(); ctxG.fill();
  }
  ctxG.restore();
}

function drawBigActive(ba) {
  if (ba.type === 'bounce') {
    ctxG.save();
    ctxG.beginPath(); ctxG.arc(ba.x, ba.y, 26, 0, Math.PI * 2);
    const g = ctxG.createRadialGradient(ba.x - 6, ba.y - 6, 3, ba.x, ba.y, 26);
    g.addColorStop(0, '#c9ffd6'); g.addColorStop(1, '#2f8a45');
    ctxG.fillStyle = g; ctxG.shadowColor = '#7fe08a'; ctxG.shadowBlur = 16; ctxG.fill();
    ctxG.restore();
  } else if (ba.type === 'expand') {
    ctxG.save();
    ctxG.beginPath(); ctxG.arc(ba.x, ba.y, ba.r, 0, Math.PI * 2);
    ctxG.fillStyle = 'rgba(255,100,40,0.35)'; ctxG.fill();
    ctxG.strokeStyle = 'rgba(255,180,80,0.9)'; ctxG.lineWidth = 3; ctxG.stroke();
    ctxG.restore();
  } else if (ba.type === 'multiExpand') {
    ba.circles.forEach((c) => {
      ctxG.save();
      ctxG.beginPath(); ctxG.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctxG.fillStyle = 'rgba(110,230,130,0.35)'; ctxG.fill();
      ctxG.strokeStyle = 'rgba(160,255,180,0.9)'; ctxG.lineWidth = 3; ctxG.stroke();
      ctxG.restore();
    });
  } else if (ba.type === 'boulder') {
    ctxG.save();
    ctxG.translate(ba.x, ba.y); ctxG.rotate(ba.elapsed * 2);
    const g = ctxG.createRadialGradient(-8, -8, 4, 0, 0, 30);
    g.addColorStop(0, '#eaf9ff'); g.addColorStop(1, '#4a90b8');
    ctxG.fillStyle = g; ctxG.shadowColor = '#8fd8ff'; ctxG.shadowBlur = 14;
    ctxG.beginPath();
    for (let k = 0; k < 7; k++) { const a = (Math.PI * 2 * k) / 7; const r = 26 + (k % 2) * 4; const px = Math.cos(a) * r, py = Math.sin(a) * r; if (k === 0) ctxG.moveTo(px, py); else ctxG.lineTo(px, py); }
    ctxG.closePath(); ctxG.fill();
    ctxG.restore();
  }
}

function drawStarBullet(bp) {
  ctxG.save();
  ctxG.translate(bp.x, bp.y);
  ctxG.rotate(performance.now() / 180);
  ctxG.fillStyle = '#ff7aff'; ctxG.shadowColor = '#ff7aff'; ctxG.shadowBlur = 10;
  ctxG.beginPath();
  for (let k = 0; k < 8; k++) {
    const ang = (Math.PI * 2 * k) / 8;
    const r = k % 2 === 0 ? 9 : 4;
    const px = Math.cos(ang) * r, py = Math.sin(ang) * r;
    if (k === 0) ctxG.moveTo(px, py); else ctxG.lineTo(px, py);
  }
  ctxG.closePath(); ctxG.fill();
  ctxG.restore();
}

function drawPlayerOnField(x, y, angle) {
  ctxG.save();
  const g = ctxG.createRadialGradient(x, y + 8, 4, x, y + 8, 42);
  g.addColorStop(0, 'rgba(255,255,255,0.1)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  ctxG.fillStyle = g; ctxG.beginPath(); ctxG.arc(x, y + 8, 42, 0, Math.PI * 2); ctxG.fill();
  ctxG.restore();
  const facing = angle !== null && Math.cos(angle) < 0 ? -1 : 1;
  drawPlayerCharacter(ctxG, x, y, 80, state.equipped, facing);
}

/* ---------------- 캐릭터 그리기 화면 ---------------- */

const DRAW_COLORS = ['#241a1a', '#ffffff', '#e0a06a', '#f5d9b0', '#c94a3a', '#e08a3a', '#e0c93a', '#5ab35a', '#3a8ac9', '#6a4ac9', '#c95aa8', '#7a5230'];
let drawColor = '#241a1a';
let drawSize = 6;
let drawReturnScreen = 'type-select';

const drawCanvas = document.getElementById('drawCanvas');
const drawCtx = drawCanvas.getContext('2d');
let drawing = false;
let lastDrawPt = null;

function drawCanvasPos(e) {
  const rect = drawCanvas.getBoundingClientRect();
  const t = e.touches ? e.touches[0] : e;
  return {
    x: (t.clientX - rect.left) * (drawCanvas.width / rect.width),
    y: (t.clientY - rect.top) * (drawCanvas.height / rect.height),
  };
}
function drawStart(e) {
  drawing = true;
  lastDrawPt = drawCanvasPos(e);
  drawCtx.beginPath();
  drawCtx.arc(lastDrawPt.x, lastDrawPt.y, drawSize / 2, 0, Math.PI * 2);
  drawCtx.fillStyle = drawColor;
  drawCtx.fill();
  e.preventDefault();
}
function drawMove(e) {
  if (!drawing) return;
  const pt = drawCanvasPos(e);
  drawCtx.strokeStyle = drawColor;
  drawCtx.lineWidth = drawSize;
  drawCtx.lineCap = 'round';
  drawCtx.lineJoin = 'round';
  drawCtx.beginPath();
  drawCtx.moveTo(lastDrawPt.x, lastDrawPt.y);
  drawCtx.lineTo(pt.x, pt.y);
  drawCtx.stroke();
  lastDrawPt = pt;
  e.preventDefault();
}
function drawEnd() { drawing = false; lastDrawPt = null; }

drawCanvas.addEventListener('mousedown', drawStart);
drawCanvas.addEventListener('mousemove', drawMove);
window.addEventListener('mouseup', drawEnd);
drawCanvas.addEventListener('touchstart', drawStart, { passive: false });
drawCanvas.addEventListener('touchmove', drawMove, { passive: false });
drawCanvas.addEventListener('touchend', drawEnd);

function buildDrawColors() {
  const wrap = document.getElementById('draw-colors');
  wrap.innerHTML = '';
  DRAW_COLORS.forEach((c) => {
    const b = document.createElement('button');
    b.style.background = c;
    if (c === drawColor) b.classList.add('active');
    b.addEventListener('click', () => { drawColor = c; buildDrawColors(); });
    wrap.appendChild(b);
  });
}
buildDrawColors();

document.querySelectorAll('.brush-size-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    drawSize = Number(btn.dataset.size);
    document.querySelectorAll('.brush-size-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

document.getElementById('draw-clear').addEventListener('click', () => {
  drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
});

function openDrawScreen(returnTo) {
  drawReturnScreen = returnTo;
  drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
  nav('draw');
}

document.getElementById('draw-done').addEventListener('click', () => {
  state.playerSkin = drawCanvas.toDataURL('image/png');
  save();
  loadPlayerSkin();
  flashMsg('캐릭터 완성! 이제 이 모습으로 모험을 떠나요');
  nav(drawReturnScreen);
});
document.getElementById('draw-skip').addEventListener('click', () => {
  nav(drawReturnScreen);
});

document.getElementById('btn-start').addEventListener('click', () => {
  if (!state.playerSkin) openDrawScreen('type-select');
  else nav('type-select');
});
document.getElementById('btn-redraw').addEventListener('click', () => {
  openDrawScreen('equip');
});

/* ---------------- 개발자 코드 ---------------- */

function activateCheatCode() {
  Object.keys(state.inventory).forEach((id) => {
    state.inventory[id].owned = true;
    if (state.inventory[id].level < 1) state.inventory[id].level = 1;
  });
  state.gold += 1000000000;
  state.gem += 1000000000;
  state.dungeonCleared = DUNGEONS.length - 1;
  save();
  refreshCurrencyDisplays();
  updateCheckinBadge();
  flashMsg('✦ 개발자 코드 발동! 전 장비 획득 + 골드/마력석 10억 + 전 던전 해금 ✦');
}

let cheatBuffer = '';
window.addEventListener('keydown', (e) => {
  if (!document.getElementById('screen-lobby').classList.contains('active')) { cheatBuffer = ''; return; }
  if (e.key.length !== 1) return;
  cheatBuffer = (cheatBuffer + e.key.toLowerCase()).slice(-20);
  if (cheatBuffer.endsWith('amethyst')) {
    cheatBuffer = '';
    activateCheatCode();
  }
});

// 모바일 등 키보드가 없는 환경을 위한 숨겨진 탭 제스처: 로비 타이틀 5번 연속 탭 -> 코드 입력창
let titleTapCount = 0;
let titleTapTimer = null;
document.querySelector('.lobby-title').addEventListener('click', () => {
  titleTapCount++;
  if (titleTapTimer) clearTimeout(titleTapTimer);
  titleTapTimer = setTimeout(() => { titleTapCount = 0; }, 2000);
  if (titleTapCount >= 5) {
    titleTapCount = 0;
    clearTimeout(titleTapTimer);
    const code = window.prompt('개발자 코드를 입력하세요');
    if (code && code.trim().toLowerCase() === 'amethyst') {
      activateCheatCode();
    } else if (code) {
      flashMsg('잘못된 코드입니다');
    }
  }
});

/* ---------------- 초기화 ---------------- */

resizeCanvas();
refreshCurrencyDisplays();
updateCheckinBadge();
updateQuestBadge();
updateAchievementBadge();
loadPlayerSkin();
