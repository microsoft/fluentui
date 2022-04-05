import type { GlobalSharedColors, ColorVariants, Greys, AlphaColors } from '../types';

export const grey: Record<Greys, string> = {
  '0': '#000000',
  '2': '#050505',
  '4': '#0a0a0a',
  '6': '#0f0f0f',
  '8': '#141414',
  '10': '#1a1a1a',
  '12': '#1f1f1f',
  '14': '#242424',
  '16': '#292929',
  '18': '#2e2e2e',
  '20': '#333333',
  '22': '#383838',
  '24': '#3d3d3d',
  '26': '#424242',
  '28': '#474747',
  '30': '#4d4d4d',
  '32': '#525252',
  '34': '#575757',
  '36': '#5c5c5c',
  '38': '#616161',
  '40': '#666666',
  '42': '#6b6b6b',
  '44': '#707070',
  '46': '#757575',
  '48': '#7a7a7a',
  '50': '#808080',
  '52': '#858585',
  '54': '#8a8a8a',
  '56': '#8f8f8f',
  '58': '#949494',
  '60': '#999999',
  '62': '#9e9e9e',
  '64': '#a3a3a3',
  '66': '#a8a8a8',
  '68': '#adadad',
  '70': '#b3b3b3',
  '72': '#b8b8b8',
  '74': '#bdbdbd',
  '76': '#c2c2c2',
  '78': '#c7c7c7',
  '80': '#cccccc',
  '82': '#d1d1d1',
  '84': '#d6d6d6',
  '86': '#dbdbdb',
  '88': '#e0e0e0',
  '90': '#e6e6e6',
  '92': '#ebebeb',
  '94': '#f0f0f0',
  '96': '#f5f5f5',
  '98': '#fafafa',
  '100': '#ffffff',
};

export const whiteAlpha: Record<AlphaColors, string> = {
  '5': 'rgba(255, 255, 255, 0.05)',
  '10': 'rgba(255, 255, 255, 0.1)',
  '20': 'rgba(255, 255, 255, 0.2)',
  '30': 'rgba(255, 255, 255, 0.3)',
  '40': 'rgba(255, 255, 255, 0.4)',
  '50': 'rgba(255, 255, 255, 0.5)',
  '60': 'rgba(255, 255, 255, 0.6)',
  '70': 'rgba(255, 255, 255, 0.7)',
  '80': 'rgba(255, 255, 255, 0.8)',
  '90': 'rgba(255, 255, 255, 0.9)',
};

export const blackAlpha: Record<AlphaColors, string> = {
  '5': 'rgba(0, 0, 0, 0.05)',
  '10': 'rgba(0, 0, 0, 0.1)',
  '20': 'rgba(0, 0, 0, 0.2)',
  '30': 'rgba(0, 0, 0, 0.3)',
  '40': 'rgba(0, 0, 0, 0.4)',
  '50': 'rgba(0, 0, 0, 0.5)',
  '60': 'rgba(0, 0, 0, 0.6)',
  '70': 'rgba(0, 0, 0, 0.7)',
  '80': 'rgba(0, 0, 0, 0.8)',
  '90': 'rgba(0, 0, 0, 0.9)',
};

export const grey14Alpha: Record<AlphaColors, string> = {
  '5': 'rgba(36, 36, 36, 0.05)',
  '10': 'rgba(36, 36, 36, 0.1)',
  '20': 'rgba(36, 36, 36, 0.2)',
  '30': 'rgba(36, 36, 36, 0.3)',
  '40': 'rgba(36, 36, 36, 0.4)',
  '50': 'rgba(36, 36, 36, 0.5)',
  '60': 'rgba(36, 36, 36, 0.6)',
  '70': 'rgba(36, 36, 36, 0.7)',
  '80': 'rgba(36, 36, 36, 0.8)',
  '90': 'rgba(36, 36, 36, 0.9)',
};

export const white = '#ffffff';

export const black = '#000000';

export const hcHyperlink = '#ffff00';

export const hcHighlight = '#1aebff';

export const hcDisabled = '#3ff23f';

export const hcCanvas = '#000000';

export const hcCanvasText = '#ffffff';

export const hcHighlightText = '#000000';

export const hcButtonText = '#000000';

export const hcButtonFace = '#ffffff';

const darkRed: ColorVariants = {
  shade50: '#130204',
  shade40: '#230308',
  shade30: '#420610',
  shade20: '#590815',
  shade10: '#690a19',
  primary: '#750b1c',
  tint10: '#861b2c',
  tint20: '#962f3f',
  tint30: '#ac4f5e',
  tint40: '#d69ca5',
  tint50: '#e9c7cd',
  tint60: '#f9f0f2',
};

const burgundy: ColorVariants = {
  shade50: '#1a0607',
  shade40: '#310b0d',
  shade30: '#5c1519',
  shade20: '#7d1d21',
  shade10: '#942228',
  primary: '#a4262c',
  tint10: '#af393e',
  tint20: '#ba4d52',
  tint30: '#c86c70',
  tint40: '#e4afb2',
  tint50: '#f0d3d4',
  tint60: '#fbf4f4',
};

const cranberry: ColorVariants = {
  shade50: '#200205',
  shade40: '#3b0509',
  shade30: '#6e0811',
  shade20: '#960b18',
  shade10: '#b10e1c',
  primary: '#c50f1f',
  tint10: '#cc2635',
  tint20: '#d33f4c',
  tint30: '#dc626d',
  tint40: '#eeacb2',
  tint50: '#f6d1d5',
  tint60: '#fdf3f4',
};

const red: ColorVariants = {
  shade50: '#210809',
  shade40: '#3f1011',
  shade30: '#751d1f',
  shade20: '#9f282b',
  shade10: '#bc2f32',
  primary: '#d13438',
  tint10: '#d7494c',
  tint20: '#dc5e62',
  tint30: '#e37d80',
  tint40: '#f1bbbc',
  tint50: '#f8dadb',
  tint60: '#fdf6f6',
};

const darkOrange: ColorVariants = {
  shade50: '#230900',
  shade40: '#411200',
  shade30: '#7a2101',
  shade20: '#a62d01',
  shade10: '#c43501',
  primary: '#da3b01',
  tint10: '#de501c',
  tint20: '#e36537',
  tint30: '#e9835e',
  tint40: '#f4bfab',
  tint50: '#f9dcd1',
  tint60: '#fdf6f3',
};

const bronze: ColorVariants = {
  shade50: '#1b0a01',
  shade40: '#321303',
  shade30: '#5e2405',
  shade20: '#7f3107',
  shade10: '#963a08',
  primary: '#a74109',
  tint10: '#b2521e',
  tint20: '#bc6535',
  tint30: '#ca8057',
  tint40: '#e5bba4',
  tint50: '#f1d9cc',
  tint60: '#fbf5f2',
};

const pumpkin: ColorVariants = {
  shade50: '#200d03',
  shade40: '#3d1805',
  shade30: '#712d09',
  shade20: '#9a3d0c',
  shade10: '#b6480e',
  primary: '#ca5010',
  tint10: '#d06228',
  tint20: '#d77440',
  tint30: '#df8e64',
  tint40: '#efc4ad',
  tint50: '#f7dfd2',
  tint60: '#fdf7f4',
};

const orange: ColorVariants = {
  shade50: '#271002',
  shade40: '#4a1e04',
  shade30: '#8a3707',
  shade20: '#bc4b09',
  shade10: '#de590b',
  primary: '#f7630c',
  tint10: '#f87528',
  tint20: '#f98845',
  tint30: '#faa06b',
  tint40: '#fdcfb4',
  tint50: '#fee5d7',
  tint60: '#fff9f5',
};

const peach: ColorVariants = {
  shade50: '#291600',
  shade40: '#4d2a00',
  shade30: '#8f4e00',
  shade20: '#c26a00',
  shade10: '#e67e00',
  primary: '#ff8c00',
  tint10: '#ff9a1f',
  tint20: '#ffa83d',
  tint30: '#ffba66',
  tint40: '#ffddb3',
  tint50: '#ffedd6',
  tint60: '#fffaf5',
};

const marigold: ColorVariants = {
  shade50: '#251a00',
  shade40: '#463100',
  shade30: '#835b00',
  shade20: '#b27c00',
  shade10: '#d39300',
  primary: '#eaa300',
  tint10: '#edad1c',
  tint20: '#efb839',
  tint30: '#f2c661',
  tint40: '#f9e2ae',
  tint50: '#fcefd3',
  tint60: '#fefbf4',
};

const yellow: ColorVariants = {
  shade50: '#282400',
  shade40: '#4c4400',
  shade30: '#8e7f00',
  shade20: '#c0ad00',
  shade10: '#e4cc00',
  primary: '#fde300',
  tint10: '#fde61e',
  tint20: '#fdea3d',
  tint30: '#feee66',
  tint40: '#fef7b2',
  tint50: '#fffad6',
  tint60: '#fffef5',
};

const gold: ColorVariants = {
  shade50: '#1f1900',
  shade40: '#3a2f00',
  shade30: '#6c5700',
  shade20: '#937700',
  shade10: '#ae8c00',
  primary: '#c19c00',
  tint10: '#c8a718',
  tint20: '#d0b232',
  tint30: '#dac157',
  tint40: '#ecdfa5',
  tint50: '#f5eece',
  tint60: '#fdfbf2',
};

const brass: ColorVariants = {
  shade50: '#181202',
  shade40: '#2e2103',
  shade30: '#553e06',
  shade20: '#745408',
  shade10: '#89640a',
  primary: '#986f0b',
  tint10: '#a47d1e',
  tint20: '#b18c34',
  tint30: '#c1a256',
  tint40: '#e0cea2',
  tint50: '#efe4cb',
  tint60: '#fbf8f2',
};

const brown: ColorVariants = {
  shade50: '#170e07',
  shade40: '#2b1a0e',
  shade30: '#50301a',
  shade20: '#6c4123',
  shade10: '#804d29',
  primary: '#8e562e',
  tint10: '#9c663f',
  tint20: '#a97652',
  tint30: '#bb8f6f',
  tint40: '#ddc3b0',
  tint50: '#edded3',
  tint60: '#faf7f4',
};

const darkBrown: ColorVariants = {
  shade50: '#0c0704',
  shade40: '#170c08',
  shade30: '#2b1710',
  shade20: '#3a1f15',
  shade10: '#452519',
  primary: '#4d291c',
  tint10: '#623a2b',
  tint20: '#784d3e',
  tint30: '#946b5c',
  tint40: '#caada3',
  tint50: '#e3d2cb',
  tint60: '#f8f3f2',
};

const lime: ColorVariants = {
  shade50: '#121b06',
  shade40: '#23330b',
  shade30: '#405f14',
  shade20: '#57811b',
  shade10: '#689920',
  primary: '#73aa24',
  tint10: '#81b437',
  tint20: '#90be4c',
  tint30: '#a4cc6c',
  tint40: '#cfe5af',
  tint50: '#e5f1d3',
  tint60: '#f8fcf4',
};

const forest: ColorVariants = {
  shade50: '#0c1501',
  shade40: '#162702',
  shade30: '#294903',
  shade20: '#376304',
  shade10: '#427505',
  primary: '#498205',
  tint10: '#599116',
  tint20: '#6ba02b',
  tint30: '#85b44c',
  tint40: '#bdd99b',
  tint50: '#dbebc7',
  tint60: '#f6faf0',
};

const seafoam: ColorVariants = {
  shade50: '#002111',
  shade40: '#003d20',
  shade30: '#00723b',
  shade20: '#009b51',
  shade10: '#00b85f',
  primary: '#00cc6a',
  tint10: '#19d279',
  tint20: '#34d889',
  tint30: '#5ae0a0',
  tint40: '#a8f0cd',
  tint50: '#cff7e4',
  tint60: '#f3fdf8',
};

const lightGreen: ColorVariants = {
  shade50: '#031a02',
  shade40: '#063004',
  shade30: '#0b5a08',
  shade20: '#0e7a0b',
  shade10: '#11910d',
  primary: '#13a10e',
  tint10: '#27ac22',
  tint20: '#3db838',
  tint30: '#5ec75a',
  tint40: '#a7e3a5',
  tint50: '#cef0cd',
  tint60: '#f2fbf2',
};

const green: ColorVariants = {
  shade50: '#031403',
  shade40: '#052505',
  shade30: '#094509',
  shade20: '#0c5e0c',
  shade10: '#0e700e',
  primary: '#107c10',
  tint10: '#218c21',
  tint20: '#359b35',
  tint30: '#54b054',
  tint40: '#9fd89f',
  tint50: '#c9eac9',
  tint60: '#f1faf1',
};

const darkGreen: ColorVariants = {
  shade50: '#021102',
  shade40: '#032003',
  shade30: '#063b06',
  shade20: '#085108',
  shade10: '#0a5f0a',
  primary: '#0b6a0b',
  tint10: '#1a7c1a',
  tint20: '#2d8e2d',
  tint30: '#4da64d',
  tint40: '#9ad29a',
  tint50: '#c6e7c6',
  tint60: '#f0f9f0',
};

const lightTeal: ColorVariants = {
  shade50: '#001d1f',
  shade40: '#00373a',
  shade30: '#00666d',
  shade20: '#008b94',
  shade10: '#00a5af',
  primary: '#00b7c3',
  tint10: '#18bfca',
  tint20: '#32c8d1',
  tint30: '#58d3db',
  tint40: '#a6e9ed',
  tint50: '#cef3f5',
  tint60: '#f2fcfd',
};

const teal: ColorVariants = {
  shade50: '#001516',
  shade40: '#012728',
  shade30: '#02494c',
  shade20: '#026467',
  shade10: '#037679',
  primary: '#038387',
  tint10: '#159195',
  tint20: '#2aa0a4',
  tint30: '#4cb4b7',
  tint40: '#9bd9db',
  tint50: '#c7ebec',
  tint60: '#f0fafa',
};

const darkTeal: ColorVariants = {
  shade50: '#001010',
  shade40: '#001f1f',
  shade30: '#003939',
  shade20: '#004e4e',
  shade10: '#005c5c',
  primary: '#006666',
  tint10: '#0e7878',
  tint20: '#218b8b',
  tint30: '#41a3a3',
  tint40: '#92d1d1',
  tint50: '#c2e7e7',
  tint60: '#eff9f9',
};

const cyan: ColorVariants = {
  shade50: '#00181e',
  shade40: '#002e38',
  shade30: '#005669',
  shade20: '#00748f',
  shade10: '#008aa9',
  primary: '#0099bc',
  tint10: '#18a4c4',
  tint20: '#31afcc',
  tint30: '#56bfd7',
  tint40: '#a4deeb',
  tint50: '#cdedf4',
  tint60: '#f2fafc',
};

const steel: ColorVariants = {
  shade50: '#000f12',
  shade40: '#001b22',
  shade30: '#00333f',
  shade20: '#004555',
  shade10: '#005265',
  primary: '#005b70',
  tint10: '#0f6c81',
  tint20: '#237d92',
  tint30: '#4496a9',
  tint40: '#94c8d4',
  tint50: '#c3e1e8',
  tint60: '#eff7f9',
};

const lightBlue: ColorVariants = {
  shade50: '#091823',
  shade40: '#112d42',
  shade30: '#20547c',
  shade20: '#2c72a8',
  shade10: '#3487c7',
  primary: '#3a96dd',
  tint10: '#4fa1e1',
  tint20: '#65ade5',
  tint30: '#83bdeb',
  tint40: '#bfddf5',
  tint50: '#dcedfa',
  tint60: '#f6fafe',
};

const blue: ColorVariants = {
  shade50: '#001322',
  shade40: '#002440',
  shade30: '#004377',
  shade20: '#005ba1',
  shade10: '#006cbf',
  primary: '#0078d4',
  tint10: '#1a86d9',
  tint20: '#3595de',
  tint30: '#5caae5',
  tint40: '#a9d3f2',
  tint50: '#d0e7f8',
  tint60: '#f3f9fd',
};

const royalBlue: ColorVariants = {
  shade50: '#000c16',
  shade40: '#00172a',
  shade30: '#002c4e',
  shade20: '#003b6a',
  shade10: '#00467e',
  primary: '#004e8c',
  tint10: '#125e9a',
  tint20: '#286fa8',
  tint30: '#4a89ba',
  tint40: '#9abfdc',
  tint50: '#c7dced',
  tint60: '#f0f6fa',
};

const darkBlue: ColorVariants = {
  shade50: '#000910',
  shade40: '#00111f',
  shade30: '#002039',
  shade20: '#002b4e',
  shade10: '#00335c',
  primary: '#003966',
  tint10: '#0e4a78',
  tint20: '#215c8b',
  tint30: '#4178a3',
  tint40: '#92b5d1',
  tint50: '#c2d6e7',
  tint60: '#eff4f9',
};

const cornflower: ColorVariants = {
  shade50: '#0d1126',
  shade40: '#182047',
  shade30: '#2c3c85',
  shade20: '#3c51b4',
  shade10: '#4760d5',
  primary: '#4f6bed',
  tint10: '#637cef',
  tint20: '#778df1',
  tint30: '#93a4f4',
  tint40: '#c8d1fa',
  tint50: '#e1e6fc',
  tint60: '#f7f9fe',
};

const navy: ColorVariants = {
  shade50: '#00061d',
  shade40: '#000c36',
  shade30: '#001665',
  shade20: '#001e89',
  shade10: '#0023a2',
  primary: '#0027b4',
  tint10: '#173bbd',
  tint20: '#3050c6',
  tint30: '#546fd2',
  tint40: '#a3b2e8',
  tint50: '#ccd5f3',
  tint60: '#f2f4fc',
};

const lavender: ColorVariants = {
  shade50: '#120f25',
  shade40: '#221d46',
  shade30: '#3f3682',
  shade20: '#5649b0',
  shade10: '#6656d1',
  primary: '#7160e8',
  tint10: '#8172eb',
  tint20: '#9184ee',
  tint30: '#a79cf1',
  tint40: '#d2ccf8',
  tint50: '#e7e4fb',
  tint60: '#f9f8fe',
};

const purple: ColorVariants = {
  shade50: '#0f0717',
  shade40: '#1c0e2b',
  shade30: '#341a51',
  shade20: '#46236e',
  shade10: '#532982',
  primary: '#5c2e91',
  tint10: '#6b3f9e',
  tint20: '#7c52ab',
  tint30: '#9470bd',
  tint40: '#c6b1de',
  tint50: '#e0d3ed',
  tint60: '#f7f4fb',
};

const darkPurple: ColorVariants = {
  shade50: '#0a0411',
  shade40: '#130820',
  shade30: '#240f3c',
  shade20: '#311552',
  shade10: '#3a1861',
  primary: '#401b6c',
  tint10: '#512b7e',
  tint20: '#633e8f',
  tint30: '#7e5ca7',
  tint40: '#b9a3d3',
  tint50: '#d8cce7',
  tint60: '#f5f2f9',
};

const orchid: ColorVariants = {
  shade50: '#16101d',
  shade40: '#281e37',
  shade30: '#4c3867',
  shade20: '#674c8c',
  shade10: '#795aa6',
  primary: '#8764b8',
  tint10: '#9373c0',
  tint20: '#a083c9',
  tint30: '#b29ad4',
  tint40: '#d7caea',
  tint50: '#e9e2f4',
  tint60: '#f9f8fc',
};

const grape: ColorVariants = {
  shade50: '#160418',
  shade40: '#29072e',
  shade30: '#4c0d55',
  shade20: '#671174',
  shade10: '#7a1589',
  primary: '#881798',
  tint10: '#952aa4',
  tint20: '#a33fb1',
  tint30: '#b55fc1',
  tint40: '#d9a7e0',
  tint50: '#eaceef',
  tint60: '#faf2fb',
};

const berry: ColorVariants = {
  shade50: '#1f091d',
  shade40: '#3a1136',
  shade30: '#6d2064',
  shade20: '#932b88',
  shade10: '#af33a1',
  primary: '#c239b3',
  tint10: '#c94cbc',
  tint20: '#d161c4',
  tint30: '#da7ed0',
  tint40: '#edbbe7',
  tint50: '#f5daf2',
  tint60: '#fdf5fc',
};

const lilac: ColorVariants = {
  shade50: '#1c0b1f',
  shade40: '#35153a',
  shade30: '#63276d',
  shade20: '#863593',
  shade10: '#9f3faf',
  primary: '#b146c2',
  tint10: '#ba58c9',
  tint20: '#c36bd1',
  tint30: '#cf87da',
  tint40: '#e6bfed',
  tint50: '#f2dcf5',
  tint60: '#fcf6fd',
};

const pink: ColorVariants = {
  shade50: '#24091b',
  shade40: '#441232',
  shade30: '#80215d',
  shade20: '#ad2d7e',
  shade10: '#cd3595',
  primary: '#e43ba6',
  tint10: '#e750b0',
  tint20: '#ea66ba',
  tint30: '#ef85c8',
  tint40: '#f7c0e3',
  tint50: '#fbddf0',
  tint60: '#fef6fb',
};

const hotPink: ColorVariants = {
  shade50: '#240016',
  shade40: '#44002a',
  shade30: '#7f004e',
  shade20: '#ad006a',
  shade10: '#cc007e',
  primary: '#e3008c',
  tint10: '#e61c99',
  tint20: '#ea38a6',
  tint30: '#ee5fb7',
  tint40: '#f7adda',
  tint50: '#fbd2eb',
  tint60: '#fef4fa',
};

const magenta: ColorVariants = {
  shade50: '#1f0013',
  shade40: '#390024',
  shade30: '#6b0043',
  shade20: '#91005a',
  shade10: '#ac006b',
  primary: '#bf0077',
  tint10: '#c71885',
  tint20: '#ce3293',
  tint30: '#d957a8',
  tint40: '#eca5d1',
  tint50: '#f5cee6',
  tint60: '#fcf2f9',
};

const plum: ColorVariants = {
  shade50: '#13000c',
  shade40: '#240017',
  shade30: '#43002b',
  shade20: '#5a003b',
  shade10: '#6b0045',
  primary: '#77004d',
  tint10: '#87105d',
  tint20: '#98246f',
  tint30: '#ad4589',
  tint40: '#d696c0',
  tint50: '#e9c4dc',
  tint60: '#faf0f6',
};

const beige: ColorVariants = {
  shade50: '#141313',
  shade40: '#252323',
  shade30: '#444241',
  shade20: '#5d5958',
  shade10: '#6e6968',
  primary: '#7a7574',
  tint10: '#8a8584',
  tint20: '#9a9594',
  tint30: '#afabaa',
  tint40: '#d7d4d4',
  tint50: '#eae8e8',
  tint60: '#faf9f9',
};

const mink: ColorVariants = {
  shade50: '#0f0e0e',
  shade40: '#1c1b1a',
  shade30: '#343231',
  shade20: '#474443',
  shade10: '#54514f',
  primary: '#5d5a58',
  tint10: '#706d6b',
  tint20: '#84817e',
  tint30: '#9e9b99',
  tint40: '#cecccb',
  tint50: '#e5e4e3',
  tint60: '#f8f8f8',
};

const silver: ColorVariants = {
  shade50: '#151818',
  shade40: '#282d2e',
  shade30: '#4a5356',
  shade20: '#657174',
  shade10: '#78868a',
  primary: '#859599',
  tint10: '#92a1a5',
  tint20: '#a0aeb1',
  tint30: '#b3bfc2',
  tint40: '#d8dfe0',
  tint50: '#eaeeef',
  tint60: '#fafbfb',
};

const platinum: ColorVariants = {
  shade50: '#111314',
  shade40: '#1f2426',
  shade30: '#3b4447',
  shade20: '#505c60',
  shade10: '#5f6d71',
  primary: '#69797e',
  tint10: '#79898d',
  tint20: '#89989d',
  tint30: '#a0adb2',
  tint40: '#cdd6d8',
  tint50: '#e4e9ea',
  tint60: '#f8f9fa',
};

const anchor: ColorVariants = {
  shade50: '#090a0b',
  shade40: '#111315',
  shade30: '#202427',
  shade20: '#2b3135',
  shade10: '#333a3f',
  primary: '#394146',
  tint10: '#4d565c',
  tint20: '#626c72',
  tint30: '#808a90',
  tint40: '#bcc3c7',
  tint50: '#dbdfe1',
  tint60: '#f6f7f8',
};

const charcoal: ColorVariants = {
  shade50: '#090909',
  shade40: '#111111',
  shade30: '#202020',
  shade20: '#2b2b2b',
  shade10: '#333333',
  primary: '#393939',
  tint10: '#515151',
  tint20: '#686868',
  tint30: '#888888',
  tint40: '#c4c4c4',
  tint50: '#dfdfdf',
  tint60: '#f7f7f7',
};

export const sharedColors: GlobalSharedColors = {
  darkRed,
  burgundy,
  cranberry,
  red,
  darkOrange,
  bronze,
  pumpkin,
  orange,
  peach,
  marigold,
  yellow,
  gold,
  brass,
  brown,
  darkBrown,
  lime,
  forest,
  seafoam,
  lightGreen,
  green,
  darkGreen,
  lightTeal,
  teal,
  darkTeal,
  cyan,
  steel,
  lightBlue,
  blue,
  royalBlue,
  darkBlue,
  cornflower,
  navy,
  lavender,
  purple,
  darkPurple,
  orchid,
  grape,
  berry,
  lilac,
  pink,
  hotPink,
  magenta,
  plum,
  beige,
  mink,
  silver,
  platinum,
  anchor,
  charcoal,
};
