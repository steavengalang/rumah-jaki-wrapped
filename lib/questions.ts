import { Question } from '@/types';

// 15 mandatory questions with Indonesian text and category weights
export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'Di rumah Jaki biasanya lu ngapain?',
    options: [
      {
        id: 'a',
        text: 'Tes ombak',
        weights: { TES_OMBAK: 3, KERKOM: 1, AMBIS: 1 },
      },
      {
        id: 'b',
        text: 'Kerkom',
        weights: { KERKOM: 3, RAMAI: 2, TES_OMBAK: 1 },
      },
      {
        id: 'c',
        text: 'Nyantai',
        weights: { NYANTAI: 3, HEALING: 2, MAGERS: 1 },
      },
    ],
    allowOther: true,
    otherWeightHint: { NGIKUT: 2, NYANTAI: 1 },
  },
  {
    id: 'q2',
    text: 'Dateng ke rumah Jaki itu niatnya…',
    options: [
      {
        id: 'a',
        text: 'Niat main',
        weights: { RAMAI: 3, KERKOM: 2, AMBIS: 1 },
      },
      {
        id: 'b',
        text: 'Nongkrong bentar',
        weights: { NYANTAI: 2, CABUT: 2, NGIKUT: 1 },
      },
      {
        id: 'c',
        text: 'Ga niat tapi betah',
        weights: { MAGERS: 3, NYANTAI: 2, HEALING: 1 },
      },
    ],
    allowOther: true,
    otherWeightHint: { NGIKUT: 2, HEALING: 1 },
  },
  {
    id: 'q3',
    text: 'Biasanya lu dateng ke rumah Jaki…',
    options: [
      {
        id: 'a',
        text: 'Rame-rame',
        weights: { RAMAI: 3, KERKOM: 2, NGIKUT: 1 },
      },
      {
        id: 'b',
        text: 'Sama 1–2 orang',
        weights: { NYANTAI: 2, HEALING: 2, NGIKUT: 1 },
      },
      {
        id: 'c',
        text: 'Sendiri',
        weights: { AMBIS: 2, NYANTAI: 2, MAGERS: 1 },
      },
    ],
    allowOther: true,
    otherWeightHint: { NGIKUT: 2, CABUT: 1 },
  },
  {
    id: 'q4',
    text: 'Kesan pertama pas sampe rumah Jaki',
    options: [
      {
        id: 'a',
        text: '"Wah rame"',
        weights: { RAMAI: 3, KERKOM: 1, TES_OMBAK: 1 },
      },
      {
        id: 'b',
        text: '"Santai juga"',
        weights: { NYANTAI: 3, HEALING: 2, MAGERS: 1 },
      },
      {
        id: 'c',
        text: '"Liat situasi dulu"',
        weights: { NGIKUT: 2, CABUT: 2, AMBIS: 1 },
      },
    ],
    allowOther: true,
    otherWeightHint: { HEALING: 2, NYANTAI: 1 },
  },
  {
    id: 'q5',
    text: 'Aktivitas yang paling sering kejadian',
    options: [
      {
        id: 'a',
        text: 'Kerkom rame',
        weights: { KERKOM: 3, RAMAI: 2, TES_OMBAK: 1 },
      },
      {
        id: 'b',
        text: 'Ngobrol santai',
        weights: { NYANTAI: 3, HEALING: 2, NGIKUT: 1 },
      },
      {
        id: 'c',
        text: 'Main HP masing-masing',
        weights: { MAGERS: 3, NYANTAI: 1, CABUT: 1 },
      },
    ],
    allowOther: true,
    otherWeightHint: { HEALING: 2, AMBIS: 1 },
  },
  {
    id: 'q6',
    text: 'Kalo suasana mulai rame, lu…',
    options: [
      {
        id: 'a',
        text: 'Ikut nimbrung',
        weights: { RAMAI: 3, KERKOM: 2, TES_OMBAK: 1 },
      },
      {
        id: 'b',
        text: 'Nonton aja',
        weights: { NGIKUT: 2, NYANTAI: 2, MAGERS: 1 },
      },
      {
        id: 'c',
        text: 'Pelan-pelan minggir',
        weights: { CABUT: 3, NYANTAI: 1, HEALING: 1 },
      },
    ],
    allowOther: true,
    otherWeightHint: { MAGERS: 2, NGIKUT: 1 },
  },
  {
    id: 'q7',
    text: 'Biasanya lu duduk di posisi…',
    options: [
      {
        id: 'a',
        text: 'Tengah keramaian',
        weights: { RAMAI: 3, KERKOM: 2, AMBIS: 1 },
      },
      {
        id: 'b',
        text: 'Pinggir tapi keliatan',
        weights: { NGIKUT: 2, NYANTAI: 2, HEALING: 1 },
      },
      {
        id: 'c',
        text: 'Pojokan',
        weights: { MAGERS: 2, CABUT: 2, NYANTAI: 1 },
      },
    ],
    allowOther: true,
    otherWeightHint: { HEALING: 2, NGIKUT: 1 },
  },
  {
    id: 'q8',
    text: 'Kalo ada yang ngajak kerkom',
    options: [
      {
        id: 'a',
        text: 'Gas tanpa mikir',
        weights: { KERKOM: 3, TES_OMBAK: 2, RAMAI: 1 },
      },
      {
        id: 'b',
        text: 'Mikir dulu',
        weights: { NGIKUT: 2, AMBIS: 2, NYANTAI: 1 },
      },
      {
        id: 'c',
        text: 'Skip halus',
        weights: { CABUT: 3, MAGERS: 2, HEALING: 1 },
      },
    ],
    allowOther: true,
    otherWeightHint: { NYANTAI: 2, HEALING: 1 },
  },
  {
    id: 'q9',
    text: 'Waktu paling sering lu dateng',
    options: [
      {
        id: 'a',
        text: 'Awal-awal',
        weights: { AMBIS: 3, RAMAI: 2, KERKOM: 1 },
      },
      {
        id: 'b',
        text: 'Tengah acara',
        weights: { NGIKUT: 2, NYANTAI: 2, HEALING: 1 },
      },
      {
        id: 'c',
        text: 'Menjelang bubar',
        weights: { CABUT: 2, MAGERS: 2, NGIKUT: 1 },
      },
    ],
    allowOther: true,
    otherWeightHint: { HEALING: 2, NYANTAI: 1 },
  },
  {
    id: 'q10',
    text: 'Kalo suasana mulai sepi',
    options: [
      {
        id: 'a',
        text: 'Tetep stay',
        weights: { MAGERS: 3, NYANTAI: 2, HEALING: 1 },
      },
      {
        id: 'b',
        text: 'Ikut ngobrol sisa-sisa',
        weights: { NGIKUT: 2, NYANTAI: 2, HEALING: 1 },
      },
      {
        id: 'c',
        text: 'Cabut',
        weights: { CABUT: 3, AMBIS: 1, RAMAI: 1 },
      },
    ],
    allowOther: true,
    otherWeightHint: { HEALING: 2, MAGERS: 1 },
  },
  {
    id: 'q11',
    text: 'Peran lu pas rame-rame',
    options: [
      {
        id: 'a',
        text: 'Penghidup suasana',
        weights: { RAMAI: 3, KERKOM: 2, TES_OMBAK: 1 },
      },
      {
        id: 'b',
        text: 'Penyeimbang',
        weights: { NGIKUT: 2, NYANTAI: 2, HEALING: 1 },
      },
      {
        id: 'c',
        text: 'Penonton setia',
        weights: { MAGERS: 2, NYANTAI: 2, NGIKUT: 1 },
      },
    ],
    allowOther: true,
    otherWeightHint: { AMBIS: 2, HEALING: 1 },
  },
  {
    id: 'q12',
    text: 'Orang biasanya ngenalin lu sebagai',
    options: [
      {
        id: 'a',
        text: '"Yang rame"',
        weights: { RAMAI: 3, KERKOM: 2, TES_OMBAK: 1 },
      },
      {
        id: 'b',
        text: '"Yang santai"',
        weights: { NYANTAI: 3, HEALING: 2, MAGERS: 1 },
      },
      {
        id: 'c',
        text: '"Yang suka ilang"',
        weights: { CABUT: 3, MAGERS: 1, NGIKUT: 1 },
      },
    ],
    allowOther: true,
    otherWeightHint: { NGIKUT: 2, AMBIS: 1 },
  },
  {
    id: 'q13',
    text: 'Kalo ada orang baru dateng',
    options: [
      {
        id: 'a',
        text: 'Disamperin',
        weights: { RAMAI: 3, AMBIS: 2, KERKOM: 1 },
      },
      {
        id: 'b',
        text: 'Disenyumin doang',
        weights: { NGIKUT: 2, NYANTAI: 2, HEALING: 1 },
      },
      {
        id: 'c',
        text: 'Biasa aja',
        weights: { MAGERS: 2, CABUT: 1, NYANTAI: 1 },
      },
    ],
    allowOther: true,
    otherWeightHint: { HEALING: 2, NGIKUT: 1 },
  },
  {
    id: 'q14',
    text: 'Biasanya lu pulang jam…',
    options: [
      {
        id: 'a',
        text: 'Ga inget waktu',
        weights: { MAGERS: 3, RAMAI: 2, KERKOM: 1 },
      },
      {
        id: 'b',
        text: 'Sesuai rencana',
        weights: { AMBIS: 3, NGIKUT: 1, NYANTAI: 1 },
      },
      {
        id: 'c',
        text: 'Cepet cabut',
        weights: { CABUT: 3, AMBIS: 1, HEALING: 1 },
      },
    ],
    allowOther: true,
    otherWeightHint: { HEALING: 2, NYANTAI: 1 },
  },
  {
    id: 'q15',
    text: 'Open House Rumah Jaki buat lu itu…',
    options: [
      {
        id: 'a',
        text: 'Tempat rame-rame',
        weights: { RAMAI: 3, KERKOM: 2, TES_OMBAK: 1 },
      },
      {
        id: 'b',
        text: 'Tempat santai',
        weights: { NYANTAI: 3, HEALING: 2, MAGERS: 1 },
      },
      {
        id: 'c',
        text: 'Tempat mampir',
        weights: { CABUT: 2, NGIKUT: 2, AMBIS: 1 },
      },
    ],
    allowOther: true,
    otherWeightHint: { HEALING: 2, NGIKUT: 1 },
  },
];

export function getQuestionById(id: string): Question | undefined {
  return QUESTIONS.find((q) => q.id === id);
}
