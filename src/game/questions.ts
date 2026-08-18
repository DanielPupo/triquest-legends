export type Figure = {
  variant: "triangle" | "ladder" | "shadow" | "ramp" | "elevation";
  angle: string;
  hyp?: string;
  opp?: string;
  adj?: string;
  caption?: string;
};

export type Question = {
  id: string;
  world: "identificar" | "notaveis" | "aplicacoes";
  ratio: "seno" | "cosseno" | "tangente" | "conceito";
  prompt: string;
  options: string[];
  answerIndex: number;
  hint: string;
  explanation: string;
  figure: Figure;
};

export const WORLDS = [
  {
    id: "identificar",
    name: "Vale dos Identificadores",
    desc: "Hipotenusa, cateto oposto e cateto adjacente.",
  },
  {
    id: "notaveis",
    name: "Templo dos Ângulos Notáveis",
    desc: "Cálculos com 30°, 45° e 60°.",
  },
  {
    id: "aplicacoes",
    name: "Montanha das Aplicações Reais",
    desc: "Alturas, rampas, sombras e distâncias.",
  },
] as const;

export const TABELA_NOTAVEIS = [
  { angulo: "30°", sen: "1/2 = 0,50", cos: "√3/2 ≈ 0,87", tan: "√3/3 ≈ 0,58" },
  { angulo: "45°", sen: "√2/2 ≈ 0,71", cos: "√2/2 ≈ 0,71", tan: "1" },
  { angulo: "60°", sen: "√3/2 ≈ 0,87", cos: "1/2 = 0,50", tan: "√3 ≈ 1,73" },
];

const QUESTIONS: Question[] = [
  {
    id: "i1",
    world: "identificar",
    ratio: "conceito",
    prompt:
      "No triângulo retângulo abaixo, qual lado é a hipotenusa em relação ao ângulo de 40°?",
    options: [
      "O lado de 10 m, oposto ao ângulo reto",
      "O lado de 6 m, oposto ao ângulo de 40°",
      "O lado de 8 m, que forma o ângulo de 40°",
      "Depende do ângulo de referência escolhido",
    ],
    answerIndex: 0,
    hint: "A hipotenusa é sempre o maior lado e fica de frente para o ângulo de 90°.",
    explanation:
      "A hipotenusa nunca muda: é o lado oposto ao ângulo reto, aqui o lado de 10 m. Apenas os catetos trocam de papel conforme o ângulo de referência.",
    figure: { variant: "triangle", angle: "40°", hyp: "10 m", opp: "6 m", adj: "8 m" },
  },
  {
    id: "i2",
    world: "identificar",
    ratio: "conceito",
    prompt: "Em relação ao ângulo de 35°, qual lado é o cateto oposto?",
    options: [
      "O lado de 13 cm (hipotenusa)",
      "O lado de 12 cm, vizinho ao ângulo",
      "O lado de 5 cm, em frente ao ângulo",
      "Nenhum dos catetos",
    ],
    answerIndex: 2,
    hint: "Cateto oposto é o lado que fica diretamente em frente ao ângulo de referência.",
    explanation:
      "O cateto oposto ao ângulo de 35° é o lado de 5 cm, pois está em frente a ele. O lado de 12 cm forma o ângulo (adjacente) e 13 cm é a hipotenusa.",
    figure: { variant: "triangle", angle: "35°", hyp: "13 cm", opp: "5 cm", adj: "12 cm" },
  },
  {
    id: "i3",
    world: "identificar",
    ratio: "conceito",
    prompt:
      "Conhecemos a hipotenusa e queremos o cateto adjacente ao ângulo dado. Qual razão trigonométrica devemos usar?",
    options: ["Seno", "Cosseno", "Tangente", "Relação fundamental"],
    answerIndex: 1,
    hint: "Escreva as três razões e veja qual delas relaciona exatamente esses dois lados.",
    explanation:
      "Cosseno = cateto adjacente ÷ hipotenusa. Como temos a hipotenusa e queremos o adjacente, usamos o cosseno.",
    figure: { variant: "triangle", angle: "θ", hyp: "conhecida", opp: "?", adj: "procurada" },
  },
  {
    id: "n1",
    world: "notaveis",
    ratio: "seno",
    prompt:
      "Uma escada de 12 m está apoiada em uma parede, formando um ângulo de 60° com o chão. Qual é a altura que a escada alcança na parede?",
    options: ["6,0 m", "8,5 m", "10,4 m", "12,0 m"],
    answerIndex: 2,
    hint: "A altura é o cateto oposto a 60° e a escada é a hipotenusa: use sen 60° ≈ 0,87.",
    explanation: "sen 60° = h/12 → h = 12 · 0,866 ≈ 10,4 m.",
    figure: { variant: "ladder", angle: "60°", hyp: "12 m", opp: "h = ?", adj: "chão" },
  },
  {
    id: "n2",
    world: "notaveis",
    ratio: "tangente",
    prompt:
      "Uma árvore projeta uma sombra de 10 m quando o ângulo de elevação do Sol é de 45°. Qual é a altura da árvore?",
    options: ["8,0 m", "10,0 m", "12,0 m", "14,1 m"],
    answerIndex: 1,
    hint: "Altura e sombra são os dois catetos: use tangente. tg 45° = 1.",
    explanation: "tg 45° = h/10 → h = 10 · 1 = 10,0 m.",
    figure: { variant: "shadow", angle: "45°", opp: "h = ?", adj: "10 m" },
  },
  {
    id: "n3",
    world: "notaveis",
    ratio: "tangente",
    prompt:
      "Um barco está a 80 m da base de um farol. O ângulo de elevação até o topo é de 30°. Qual é a altura do farol?",
    options: ["40,0 m", "53,2 m", "46,2 m", "60,0 m"],
    answerIndex: 2,
    hint: "Distância horizontal e altura são catetos: tg 30° ≈ 0,577.",
    explanation: "tg 30° = h/80 → h = 80 · 0,577 ≈ 46,2 m.",
    figure: { variant: "elevation", angle: "30°", opp: "h = ?", adj: "80 m" },
  },
  {
    id: "n4",
    world: "notaveis",
    ratio: "seno",
    prompt:
      "Uma pipa está presa por uma linha de 40 m, formando um ângulo de 60° com o solo. Qual é a altura da pipa?",
    options: ["20,0 m", "30,0 m", "38,2 m", "34,6 m"],
    answerIndex: 3,
    hint: "A linha é a hipotenusa e a altura é o cateto oposto: sen 60° ≈ 0,866.",
    explanation: "sen 60° = h/40 → h = 40 · 0,866 ≈ 34,6 m.",
    figure: { variant: "ladder", angle: "60°", hyp: "40 m", opp: "h = ?", adj: "solo" },
  },
  {
    id: "a1",
    world: "aplicacoes",
    ratio: "tangente",
    prompt:
      "Um observador está a 25 m da base de um prédio. O ângulo de elevação até o topo é de 35°. Qual é a altura do prédio?",
    options: ["15,8 m", "21,0 m", "17,5 m", "12,5 m"],
    answerIndex: 2,
    hint: "tg 35° ≈ 0,70 e os dois lados envolvidos são catetos.",
    explanation: "tg 35° = h/25 → h = 25 · 0,700 ≈ 17,5 m.",
    figure: { variant: "elevation", angle: "35°", opp: "h = ?", adj: "25 m" },
  },
  {
    id: "a2",
    world: "aplicacoes",
    ratio: "seno",
    prompt:
      "Um avião sobe formando um ângulo de 40° com o solo. Após percorrer 1.500 m, qual é a altura atingida?",
    options: ["900,0 m", "964,2 m", "1.149,1 m", "1.280,5 m"],
    answerIndex: 1,
    hint: "O trajeto do avião é a hipotenusa: sen 40° ≈ 0,643.",
    explanation: "sen 40° = h/1500 → h = 1500 · 0,643 ≈ 964,2 m.",
    figure: { variant: "ramp", angle: "40°", hyp: "1.500 m", opp: "h = ?", adj: "solo" },
  },
  {
    id: "a3",
    world: "aplicacoes",
    ratio: "seno",
    prompt:
      "Um cabo de aço de 18 m prende o topo de uma torre ao chão, formando um ângulo de 55° com o solo. Qual é a altura da torre?",
    options: ["13,8 m", "14,7 m", "16,2 m", "18,0 m"],
    answerIndex: 1,
    hint: "O cabo é a hipotenusa; a torre é o cateto oposto. sen 55° ≈ 0,819.",
    explanation: "sen 55° = h/18 → h = 18 · 0,819 ≈ 14,7 m.",
    figure: { variant: "ladder", angle: "55°", hyp: "18 m", opp: "h = ?", adj: "solo" },
  },
  {
    id: "a4",
    world: "aplicacoes",
    ratio: "seno",
    prompt:
      "Um morro possui uma trilha de 200 m, inclinada em 25° em relação ao solo. Qual é a altura do morro?",
    options: ["72,4 m", "96,8 m", "84,5 m", "101,2 m"],
    answerIndex: 2,
    hint: "A trilha é a hipotenusa: sen 25° ≈ 0,4226.",
    explanation: "sen 25° = h/200 → h = 200 · 0,4226 ≈ 84,5 m.",
    figure: { variant: "ramp", angle: "25°", hyp: "200 m", opp: "h = ?", adj: "solo" },
  },
  {
    id: "a5",
    world: "aplicacoes",
    ratio: "seno",
    prompt:
      "Um drone sobe em linha reta por 120 m, formando um ângulo de 65° com o solo. Qual é a altura alcançada?",
    options: ["98,6 m", "108,8 m", "114,2 m", "120,0 m"],
    answerIndex: 1,
    hint: "sen 65° ≈ 0,906 e o percurso do drone é a hipotenusa.",
    explanation: "sen 65° = h/120 → h = 120 · 0,906 ≈ 108,8 m.",
    figure: { variant: "ramp", angle: "65°", hyp: "120 m", opp: "h = ?", adj: "solo" },
  },
  {
    id: "a6",
    world: "aplicacoes",
    ratio: "tangente",
    prompt:
      "Um prédio possui 45 m de altura. De um ponto no chão, o ângulo de elevação até o topo é de 50°. Qual é a distância entre o observador e o prédio?",
    options: ["37,8 m", "32,4 m", "45,0 m", "53,6 m"],
    answerIndex: 0,
    hint: "tg 50° ≈ 1,19 e a distância é o cateto adjacente.",
    explanation: "tg 50° = 45/d → d = 45 ÷ 1,19 ≈ 37,8 m.",
    figure: { variant: "elevation", angle: "50°", opp: "45 m", adj: "d = ?" },
  },
  {
    id: "a7",
    world: "aplicacoes",
    ratio: "seno",
    prompt:
      "Uma escada alcança uma janela a 8 m de altura e forma um ângulo de 53° com o chão. Qual é o comprimento da escada?",
    options: ["9,0 m", "11,2 m", "12,5 m", "10,0 m"],
    answerIndex: 3,
    hint: "sen 53° ≈ 0,8 e a escada é a hipotenusa procurada.",
    explanation: "sen 53° = 8/L → L = 8 ÷ 0,8 = 10,0 m.",
    figure: { variant: "ladder", angle: "53°", hyp: "L = ?", opp: "8 m", adj: "chão" },
  },
  {
    id: "a8",
    world: "aplicacoes",
    ratio: "seno",
    prompt:
      "Uma rampa de acesso mede 15 m e forma um ângulo de 20° com a horizontal. Qual é o desnível vencido pela rampa?",
    options: ["4,2 m", "5,1 m", "6,8 m", "7,5 m"],
    answerIndex: 1,
    hint: "sen 20° ≈ 0,342 aplicado sobre o comprimento da rampa.",
    explanation: "sen 20° = h/15 → h = 15 · 0,342 ≈ 5,1 m.",
    figure: { variant: "ramp", angle: "20°", hyp: "15 m", opp: "h = ?", adj: "horizontal" },
  },
  {
    id: "a9",
    world: "aplicacoes",
    ratio: "tangente",
    prompt:
      "Um helicóptero está a 600 m de altura. O ângulo de depressão até um carro é de 30°. Qual é a distância horizontal entre eles?",
    options: ["600 m", "866 m", "1.039,2 m", "1.200 m"],
    answerIndex: 2,
    hint: "tg 30° ≈ 0,577 relaciona altura e distância horizontal.",
    explanation: "tg 30° = 600/d → d = 600 ÷ 0,577 ≈ 1.039,2 m.",
    figure: { variant: "elevation", angle: "30°", opp: "600 m", adj: "d = ?" },
  },
  {
    id: "a10",
    world: "aplicacoes",
    ratio: "seno",
    prompt:
      "Um poste está preso ao chão por um cabo de 16 m, formando um ângulo de 70° com o solo. Qual é a altura do poste?",
    options: ["15,0 m", "12,5 m", "15,8 m", "16,0 m"],
    answerIndex: 0,
    hint: "sen 70° ≈ 0,94 e o cabo é a hipotenusa.",
    explanation: "sen 70° = h/16 → h = 16 · 0,9397 ≈ 15,0 m.",
    figure: { variant: "ladder", angle: "70°", hyp: "16 m", opp: "h = ?", adj: "solo" },
  },
  {
    id: "a11",
    world: "aplicacoes",
    ratio: "tangente",
    prompt:
      "Um prédio projeta uma sombra de 24 m. Sabendo que o ângulo de elevação do Sol é de 40°, determine a altura do prédio.",
    options: ["18,5 m", "19,4 m", "20,1 m", "22,7 m"],
    answerIndex: 2,
    hint: "tg 40° ≈ 0,839 e sombra e altura são catetos.",
    explanation: "tg 40° = h/24 → h = 24 · 0,839 ≈ 20,1 m.",
    figure: { variant: "shadow", angle: "40°", opp: "h = ?", adj: "24 m" },
  },
  {
    id: "a12",
    world: "aplicacoes",
    ratio: "tangente",
    prompt:
      "Um estudante está a 30 m da base de uma torre de observação. O ângulo de elevação até o topo é de 42°. Qual é a altura da torre?",
    options: ["24,1 m", "27,0 m", "30,0 m", "33,4 m"],
    answerIndex: 1,
    hint: "tg 42° ≈ 0,900.",
    explanation: "tg 42° = h/30 → h = 30 · 0,900 ≈ 27,0 m.",
    figure: { variant: "elevation", angle: "42°", opp: "h = ?", adj: "30 m" },
  },
];

export function getQuestions(world = "all"): Question[] {
  if (world === "all") return QUESTIONS;
  return QUESTIONS.filter((q) => q.world === world);
}
