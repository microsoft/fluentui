export interface IMas {
  text: string;
  url?: string;
  title?: string;
  oldMas?: string;
}
export interface IMasData {
  [key: string]: IMas;

  MAS1_1_1: IMas;
  MAS1_2_1: IMas;
  MAS1_2_2: IMas;
  MAS1_2_4: IMas;
  MAS1_2_5: IMas;
  MAS1_3_1: IMas;
  MAS1_3_2: IMas;
  MAS1_3_3: IMas;
  MAS1_4_1: IMas;
  MAS1_4_2: IMas;
  MAS1_4_3: IMas;
  MAS1_4_4: IMas;
  MAS1_4_5: IMas;
  MAS2_1_1: IMas;
  MAS2_1_2: IMas;
  MAS2_2_1: IMas;
  MAS2_2_2: IMas;
  MAS2_3_1: IMas;
  MAS2_4_1: IMas;
  MAS2_4_2: IMas;
  MAS2_4_3: IMas;
  MAS2_4_5: IMas;
  MAS2_4_6: IMas;
  MAS2_4_7: IMas;
  MAS3_1_1: IMas;
  MAS3_1_2: IMas;
  MAS3_2_1: IMas;
  MAS3_2_2: IMas;
  MAS3_2_3: IMas;
  MAS3_2_4: IMas;
  MAS3_3_1: IMas;
  MAS3_3_2: IMas;
  MAS3_3_3: IMas;
  MAS3_3_4: IMas;
  MAS4_1_1: IMas;
  MAS4_1_2: IMas;
  MAS4_3_1: IMas;
  MAS2_4_4: IMas;
  MASBest_Practice: IMas;
}

export const mas: IMasData = {
  MAS1_1_1: {
    text: 'MAS 1.1.1',
    url: 'https://aka.ms/mas_111',
    title: 'Non-text content',
    oldMas: '20'
  },
  MAS1_2_1: {
    text: 'MAS 1.2.1',
    url: 'https://aka.ms/mas_121',
    title: 'Audio-only and Video-only (pre-recorded)',
    oldMas: '63'
  },
  MAS1_2_2: {
    text: 'MAS 1.2.2',
    url: 'https://aka.ms/mas_122',
    title: 'Captions (pre-recorded)',
    oldMas: '62'
  },
  MAS1_2_4: {
    text: 'MAS 1.2.4',
    url: 'https://aka.ms/mas_124',
    title: 'Captions (live)',
    oldMas: '64'
  },
  MAS1_2_5: {
    text: 'MAS 1.2.5',
    url: 'https://aka.ms/mas_125',
    title: 'Audio description (pre-recorded)',
    oldMas: '62B'
  },
  MAS1_3_1: {
    text: 'MAS 1.3.1',
    url: 'https://aka.ms/mas_131',
    title: 'Info and relationships',
    oldMas: '40'
  },
  MAS1_3_2: {
    text: 'MAS 1.3.2',
    url: 'https://aka.ms/mas_132',
    title: 'Meaningful sequence',
    oldMas: '25'
  },
  MAS1_3_3: {
    text: 'MAS 1.3.3',
    url: 'https://aka.ms/mas_133',
    title: 'Sensory characteristics',
    oldMas: '14'
  },
  MAS1_4_1: {
    text: 'MAS 1.4.1',
    url: 'https://aka.ms/mas_141',
    title: 'Use of color',
    oldMas: '16'
  },
  MAS1_4_2: {
    text: 'MAS 1.4.2',
    url: 'https://aka.ms/mas_142',
    title: 'Audio control',
    oldMas: '12'
  },
  MAS1_4_3: {
    text: 'MAS 1.4.3',
    url: 'https://aka.ms/mas_143',
    title: 'Contrast (minimum)',
    oldMas: '17'
  },
  MAS1_4_4: {
    text: 'MAS 1.4.4',
    url: 'https://aka.ms/mas_144',
    title: 'Resize text',
    oldMas: '13'
  },
  MAS1_4_5: {
    text: 'MAS 1.4.5',
    url: 'https://aka.ms/mas_145',
    title: 'Audio control',
    oldMas: '12'
  },
  MAS2_1_1: {
    text: 'MAS 2.1.1',
    url: 'https://aka.ms/mas_211',
    title: 'Keyboard',
    oldMas: '36'
  },
  MAS2_1_2: {
    text: 'MAS 2.1.2',
    url: 'https://aka.ms/mas_212',
    title: 'No keyboard trap',
    oldMas: '07'
  },
  MAS2_2_1: {
    text: 'MAS 2.2.1',
    url: 'https://aka.ms/mas_221',
    title: 'Timing adjustable',
    oldMas: '10'
  },
  MAS2_2_2: {
    text: 'MAS 2.2.2',
    url: 'https://aka.ms/mas_222',
    title: 'Pause, stop, hide',
    oldMas: '09'
  },
  MAS2_3_1: {
    text: 'MAS 2.3.1',
    url: 'https://aka.ms/mas_231',
    title: 'Three flashes or below threshold',
    oldMas: '08'
  },
  MAS2_4_1: {
    text: 'MAS 2.4.1',
    url: 'https://aka.ms/mas_241',
    title: 'Bypass blocks',
    oldMas: '27'
  },
  MAS2_4_2: {
    text: 'MAS 2.4.2',
    url: 'https://aka.ms/mas_242',
    title: 'Page titled',
    oldMas: '20A'
  },
  MAS2_4_3: {
    text: 'MAS 2.4.3',
    url: 'https://aka.ms/mas_243',
    title: 'Focus order',
    oldMas: '05'
  },
  MAS2_4_5: {
    text: 'MAS 2.4.5',
    url: 'https://aka.ms/mas_245',
    title: 'Multiple ways',
    oldMas: '26'
  },
  MAS2_4_6: {
    text: 'MAS 2.4.6',
    url: 'https://aka.ms/mas_246',
    title: 'Headings and Labels',
    oldMas: '27A'
  },
  MAS2_4_7: {
    text: 'MAS 2.4.7',
    url: 'https://aka.ms/mas_247',
    title: 'Focus visible',
    oldMas: '05A'
  },
  MAS3_1_1: {
    text: 'MAS 3.1.1',
    url: 'https://aka.ms/mas_311',
    title: 'Language of page',
    oldMas: '41'
  },
  MAS3_1_2: {
    text: 'MAS 3.1.2',
    url: 'https://aka.ms/mas_312',
    title: 'Language of parts',
    oldMas: '41A'
  },
  MAS3_2_1: {
    text: 'MAS 3.2.1',
    url: 'https://aka.ms/mas_321',
    title: 'On focus',
    oldMas: '06'
  },
  MAS3_2_2: {
    text: 'MAS 3.2.2',
    url: 'https://aka.ms/mas_322',
    title: 'On input',
    oldMas: '21'
  },
  MAS3_2_3: {
    text: 'MAS 3.2.3',
    url: 'https://aka.ms/mas_323',
    title: 'Consistent navigation',
    oldMas: '26A'
  },
  MAS3_2_4: {
    text: 'MAS 3.2.4',
    url: 'https://aka.ms/mas_324',
    title: 'Consistent identification'
  },
  MAS3_3_1: {
    text: 'MAS 3.3.1',
    url: 'https://aka.ms/mas_331',
    title: 'Error identification',
    oldMas: '22'
  },
  MAS3_3_2: {
    text: 'MAS 3.3.2',
    url: 'https://aka.ms/mas_332',
    title: 'Labels or instructions',
    oldMas: '19'
  },
  MAS3_3_3: {
    text: 'MAS 3.3.3',
    url: 'https://aka.ms/mas_333',
    title: 'Error suggestion',
    oldMas: '22A'
  },
  MAS3_3_4: {
    text: 'MAS 3.3.4',
    url: 'https://aka.ms/mas_334',
    title: 'Error prevention (legal, financial, data)',
    oldMas: '23'
  },
  MAS4_1_1: {
    text: 'MAS 4.1.1',
    url: 'https://aka.ms/mas_411',
    title: 'Parsing',
    oldMas: '40A'
  },
  MAS4_1_2: {
    text: 'MAS 4.1.2',
    url: 'https://aka.ms/mas_412',
    title: 'Name, role, value',
    oldMas: '40B'
  },
  MAS4_3_1: {
    text: 'MAS 4.3.1',
    url: 'https://aka.ms/mas_431',
    title: 'No disruption of accessibility features',
    oldMas: '42A'
  },
  MAS2_4_4: {
    text: 'MAS 2.4.4',
    url: 'https://aka.ms/mas_244',
    title: 'Link purpose (in context)',
    oldMas: '20B'
  },
  MASBest_Practice: {
    text: 'Best Practice'
  }
};
