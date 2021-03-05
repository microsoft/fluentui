import { GlobalSharedColors, ColorVariants, ProductBrandColors, BrandVariants } from '../types';

// Global Colors
// https://www.figma.com/file/KB9oUjMKen2cKnyPG7RgdS/Design-tokens-superset?node-id=1297%3A14745
// TODO export flat instead of objects for better tree shakeability

export const grey = {
  0: '#000000',
  2: '#050505',
  4: '#0A0A0A',
  6: '#0F0F0F',
  8: '#141414',
  10: '#1A1A1A',
  12: '#1F1F1F',
  14: '#242424',
  16: '#292929',
  18: '#2E2E2E',
  20: '#333333',
  22: '#383838',
  24: '#3D3D3D',
  26: '#424242',
  28: '#474747',
  30: '#4D4D4D',
  32: '#525252',
  34: '#575757',
  36: '#5C5C5C',
  38: '#616161',
  40: '#666666',
  42: '#6B6B6B',
  44: '#707070',
  46: '#757575',
  48: '#7A7A7A',
  50: '#808080',
  52: '#858585',
  54: '#8A8A8A',
  56: '#8F8F8F',
  58: '#949494',
  60: '#999999',
  62: '#9E9E9E',
  64: '#A3A3A3',
  66: '#A8A8A8',
  68: '#ADADAD',
  70: '#B2B2B2',
  72: '#B8B8B8',
  74: '#BDBDBD',
  76: '#C2C2C2',
  78: '#C7C7C7',
  80: '#CCCCCC',
  82: '#D1D1D1',
  84: '#D6D6D6',
  86: '#DBDBDB',
  88: '#E0E0E0',
  90: '#E5E5E5',
  92: '#EBEBEB',
  94: '#F0F0F0',
  96: '#F5F5F5',
  98: '#FAFAFA',
  100: '#FFFFFF',
};

export const black = grey[0];
export const white = grey[100];

export const hyperlink = '#FFFF00';
export const disabled = '#3FF23F';
export const selected = '#1AEBFF';

// TODO: values should be set per product theme
const brand: BrandVariants = {
  shade60: '#092C47',
  shade50: '#043862',
  shade40: '#004578',
  shade30: '#004C87',
  shade20: '#005A9E',
  shade10: '#106EBE',
  primary: '#0078D4',
  tint10: '#2899F5',
  tint20: '#3AA0F3',
  tint30: '#6CB8F6',
  tint40: '#C7E0F4',
  tint50: '#DEECF9',
  tint60: '#EFF6FC',
};

// TODO: these colors are not approved yet
const brandTeams: BrandVariants = {
  shade60: '#323348',
  shade50: '#393b5d', // TBD
  shade40: '#3D3E66',
  shade30: '#464775',
  shade20: '#494B83',
  shade10: '#52558f', // TBD
  primary: '#6264A7',
  tint10: '#8f95f8', // TBD
  tint20: '#9EA2FF',
  tint30: '#B2B5FF',
  tint40: '#C7C9FF',
  tint50: '#DBDCF0',
  tint60: '#E9EAF6',
};

const darkRed: ColorVariants = {
  shade50: '#130205',
  shade40: '#230309',
  shade30: '#420610',
  shade20: '#590816',
  shade10: '#6A0A1A',
  primary: '#750B1C',
  tint10: '#861B2D',
  tint20: '#962E40',
  tint30: '#AC4E5E',
  tint40: '#D69BA5',
  tint50: '#E9C7CD',
  tint60: '#F9F0F2',
};

const burgundy: ColorVariants = {
  shade50: '#1A0607',
  shade40: '#310B0D',
  shade30: '#5B1519',
  shade20: '#7C1D21',
  shade10: '#932227',
  primary: '#A4262C',
  tint10: '#AE383E',
  tint20: '#B94D52',
  tint30: '#C86C70',
  tint40: '#E3AFB2',
  tint50: '#F0D3D4',
  tint60: '#FBF4F4',
};

const cranberry: ColorVariants = {
  shade50: '#1F0305',
  shade40: '#3B0509',
  shade30: '#6E0911',
  shade20: '#950C17',
  shade10: '#B10E1C',
  primary: '#C50F1F',
  tint10: '#CB2734',
  tint20: '#D23F4C',
  tint30: '#DC626D',
  tint40: '#EDACB1',
  tint50: '#F6D1D4',
  tint60: '#FDF3F4',
};

// TODO wrong values in figma currently
const red: ColorVariants = {
  shade50: '#210809',
  shade40: '#3F1011',
  shade30: '#751D20',
  shade20: '#9F282C',
  shade10: '#BC2F34',
  primary: '#D13438',
  tint10: '#D7494E',
  tint20: '#DC5F63',
  tint30: '#E37D81',
  tint40: '#F1BBBD',
  tint50: '#F8DADB',
  tint60: '#FDF6F6',
};

const darkOrange: ColorVariants = {
  shade50: '#230900',
  shade40: '#411100',
  shade30: '#792000',
  shade20: '#A52C00',
  shade10: '#C33400',
  primary: '#DA3B01',
  tint10: '#DD4F1B',
  tint20: '#E26436',
  tint30: '#E8825D',
  tint40: '#F4BEAA',
  tint50: '#F9DCD1',
  tint60: '#FDF6F3',
};

const bronze: ColorVariants = {
  shade50: '#1B0A01',
  shade40: '#321302',
  shade30: '#5D2405',
  shade20: '#7E3006',
  shade10: '#953907',
  primary: '#A74109',
  tint10: '#B0511D',
  tint20: '#BB6334',
  tint30: '#C97F57',
  tint40: '#E4BAA3',
  tint50: '#F1D9CC',
  tint60: '#FBF5F2',
};

const pumpkin: ColorVariants = {
  shade50: '#200D03',
  shade40: '#3C1805',
  shade30: '#712D09',
  shade20: '#993E0C',
  shade10: '#B5490F',
  primary: '#CA5010',
  tint10: '#D06228',
  tint20: '#D67540',
  tint30: '#DF8F64',
  tint40: '#EFC4AD',
  tint50: '#F6DFD2',
  tint60: '#FDF7F4',
};

const orange: ColorVariants = {
  shade50: '#281002',
  shade40: '#4A1E04',
  shade30: '#8B3707',
  shade20: '#BC4B09',
  shade10: '#DF590B',
  primary: '#F7630C',
  tint10: '#F87529',
  tint20: '#F98745',
  tint30: '#FAA06C',
  tint40: '#FDCFB5',
  tint50: '#FEE5D7',
  tint60: '#FFF9F5',
};

const peach: ColorVariants = {
  shade50: '#291600',
  shade40: '#4D2A00',
  shade30: '#8F4F00',
  shade20: '#C26B00',
  shade10: '#E67E00',
  primary: '#FF8C00',
  tint10: '#FF9A1F',
  tint20: '#FFA83D',
  tint30: '#FFBA66',
  tint40: '#FFDDB3',
  tint50: '#FFEDD6',
  tint60: '#FFFAF5',
};

const marigold: ColorVariants = {
  shade50: '#261A00',
  shade40: '#463100',
  shade30: '#835C00',
  shade20: '#B27D00',
  shade10: '#D39400',
  primary: '#EAA300',
  tint10: '#EDAE1C',
  tint20: '#EFB939',
  tint30: '#F3C761',
  tint40: '#F9E2AE',
  tint50: '#FCF0D3',
  tint60: '#FEFBF4',
};

const yellow: ColorVariants = {
  shade50: '#282400',
  shade40: '#4c4400',
  shade30: '#4c4400',
  shade20: '#c0ad00',
  shade10: '#e3cc00',
  primary: '#FDE300',
  tint10: '#FDE71E',
  tint20: '#FDEA3D',
  tint30: '#fdee65',
  tint40: '#fef7b2',
  tint50: '#fffbd6',
  tint60: '#fffef5',
};

const gold: ColorVariants = {
  shade50: '#1F1900',
  shade40: '#3A2F00',
  shade30: '#6D5700',
  shade20: '#937600',
  shade10: '#AE8C00',
  primary: '#C19C00',
  tint10: '#C9A618',
  tint20: '#D0B132',
  tint30: '#DAC057',
  tint40: '#EDDEA6',
  tint50: '#F5EDCE',
  tint60: '#FDFBF2',
};

const brass: ColorVariants = {
  shade50: '#181202',
  shade40: '#2E2203',
  shade30: '#563F06',
  shade20: '#745608',
  shade10: '#8A650A',
  primary: '#986F0B',
  tint10: '#A57F1E',
  tint20: '#B18E34',
  tint30: '#C2A356',
  tint40: '#E0CFA2',
  tint50: '#EFE5CB',
  tint60: '#FBF8F2',
};

const brown: ColorVariants = {
  shade50: '#170E07',
  shade40: '#2B1A0E',
  shade30: '#50301A',
  shade20: '#6D4123',
  shade10: '#814E29',
  primary: '#8E562E',
  tint10: '#9C663F',
  tint20: '#AA7752',
  tint30: '#BC8F6F',
  tint40: '#DDC3B0',
  tint50: '#EDDED3',
  tint60: '#FBF7F4',
};

const darkBrown: ColorVariants = {
  shade50: '#0c0604',
  shade40: '#170c08',
  shade30: '#2b170f',
  shade20: '#3a1f15',
  shade10: '#452519',
  primary: '#4D291C',
  tint10: '#62392b',
  tint20: '#774d3d',
  tint30: '#946a5b',
  tint40: '#c9ada3',
  tint50: '#e2d1cb',
  tint60: '#f8f3f2',
};

const lime: ColorVariants = {
  shade50: '#121b06',
  shade40: '#22330b',
  shade30: '#406014',
  shade20: '#57821b',
  shade10: '#679a20',
  primary: '#73AA24',
  tint10: '#81b537',
  tint20: '#8fbf4c',
  tint30: '#a4cd6c',
  tint40: '#cfe6af',
  tint50: '#e5f2d3',
  tint60: '#f8fcf4',
};

const forest: ColorVariants = {
  shade50: '#0C1501',
  shade40: '#162702',
  shade30: '#294903',
  shade20: '#386304',
  shade10: '#427505',
  primary: '#498205',
  tint10: '#5A9117',
  tint20: '#6BA02B',
  tint30: '#85B44C',
  tint40: '#BDDA9B',
  tint50: '#DBEBC7',
  tint60: '#F6FAF0',
};

const seafoam: ColorVariants = {
  shade50: '#002111',
  shade40: '#003D20',
  shade30: '#00723B',
  shade20: '#009B50',
  shade10: '#00B85F',
  primary: '#00CC6A',
  tint10: '#19D279',
  tint20: '#34D889',
  tint30: '#5AE09F',
  tint40: '#A8F0CD',
  tint50: '#CFF7E4',
  tint60: '#F3FDF8',
};

const lightGreen: ColorVariants = {
  shade50: '#031a02',
  shade40: '#063004',
  shade30: '#0b5a08',
  shade20: '#0f7a0b',
  shade10: '#11910d',
  primary: '#13A10E',
  tint10: '#27ac22',
  tint20: '#3db739',
  tint30: '#5ec65a',
  tint40: '#a7e3a5',
  tint50: '#cef0cd',
  tint60: '#f2fbf2',
};

const green: ColorVariants = {
  shade50: '#031403',
  shade40: '#052505',
  shade30: '#094609',
  shade20: '#0c5f0c',
  shade10: '#0f700f',
  primary: '#107c10',
  tint10: '#218d21',
  tint20: '#359c35',
  tint30: '#55B155',
  tint40: '#a0d8a0',
  tint50: '#caeaca',
  tint60: '#f1faf1',
};

const darkGreen: ColorVariants = {
  shade50: '#021102',
  shade40: '#032003',
  shade30: '#063C06',
  shade20: '#085108',
  shade10: '#0A600A',
  primary: '#0B6A0B',
  tint10: '#1A7D1A',
  tint20: '#2D8F2D',
  tint30: '#4CA64C',
  tint40: '#9AD39A',
  tint50: '#C6E7C6',
  tint60: '#F0F9F0',
};

const lightTeal: ColorVariants = {
  shade50: '#001D1F',
  shade40: '#00363A',
  shade30: '#00656D',
  shade20: '#008993',
  shade10: '#00A3AE',
  primary: '#00B7C3',
  tint10: '#18BDC9',
  tint20: '#32C6D0',
  tint30: '#57D2DA',
  tint40: '#A6E8ED',
  tint50: '#CEF3F5',
  tint60: '#F2FCFD',
};

const teal: ColorVariants = {
  shade50: '#001516',
  shade40: '#012729',
  shade30: '#02494C',
  shade20: '#026367',
  shade10: '#02767A',
  primary: '#038387',
  tint10: '#159196',
  tint20: '#2AA0A4',
  tint30: '#4BB4B7',
  tint40: '#9BD9DB',
  tint50: '#C7EBEC',
  tint60: '#F0FAFA',
};

const darkTeal: ColorVariants = {
  shade50: '#001010',
  shade40: '#001f1f',
  shade30: '#003939',
  shade20: '#004e4e',
  shade10: '#005c5c',
  primary: '#006666',
  tint10: '#0e7878',
  tint20: '#218B8B',
  tint30: '#41a3a3',
  tint40: '#92d1d1',
  tint50: '#c2e7e7',
  tint60: '#eff9f9',
};

const cyan: ColorVariants = {
  shade50: '#00191e',
  shade40: '#002e39',
  shade30: '#00566a',
  shade20: '#00758f',
  shade10: '#008baa',
  primary: '#0099BC',
  tint10: '#18a5c5',
  tint20: '#31b0cd',
  tint30: '#56c0d7',
  tint40: '#a5deeb',
  tint50: '#cdedf4',
  tint60: '#f2fafc',
};

const steel: ColorVariants = {
  shade50: '#000F12',
  shade40: '#001B22',
  shade30: '#00333F',
  shade20: '#004655',
  shade10: '#005265',
  primary: '#005B70',
  tint10: '#159196',
  tint20: '#237E92',
  tint30: '#4497A9',
  tint40: '#95C8D4',
  tint50: '#C3E1E8',
  tint60: '#EFF7F9',
};

const lightBlue: ColorVariants = {
  shade50: '#091823',
  shade40: '#112d43',
  shade30: '#20547c',
  shade20: '#2c73a9',
  shade10: '#3488c8',
  primary: '#3A96DD',
  tint10: '#4fa2e2',
  tint20: '#65aee6',
  tint30: '#83beeb',
  tint40: '#bfddf5',
  tint50: '#dcedfa',
  tint60: '#f6fafe',
};

const blue: ColorVariants = {
  shade50: '#001322',
  shade40: '#00243F',
  shade30: '#004377',
  shade20: '#005BA1',
  shade10: '#006CBE',
  primary: '#0078D4',
  tint10: '#1A86D9',
  tint20: '#3595DE',
  tint30: '#5CA9E5',
  tint40: '#A9D3F2',
  tint50: '#D0E7F8',
  tint60: '#F3F9FD',
};

const royalBlue: ColorVariants = {
  shade50: '#000C16',
  shade40: '#00172A',
  shade30: '#002B4F',
  shade20: '#003B6B',
  shade10: '#00457E',
  primary: '#004E8C',
  tint10: '#125D9A',
  tint20: '#286EA8',
  tint30: '#4A88BA',
  tint40: '#9ABFDD',
  tint50: '#C7DCED',
  tint60: '#F0F6FA',
};

const darkBlue: ColorVariants = {
  shade50: '#000910',
  shade40: '#00111f',
  shade30: '#002039',
  shade20: '#002c4e',
  shade10: '#00345c',
  primary: '#003966',
  tint10: '#0e4a78',
  tint20: '#215d8b',
  tint30: '#4179a3',
  tint40: '#92b6d1',
  tint50: '#c2d7e7',
  tint60: '#eff5f9',
};

const cornflower: ColorVariants = {
  shade50: '#0D1126',
  shade40: '#172047',
  shade30: '#2C3C85',
  shade20: '#3B52B4',
  shade10: '#4661D5',
  primary: '#4F6BED',
  tint10: '#627CEF',
  tint20: '#768DF1',
  tint30: '#92A4F4',
  tint40: '#C7D1FA',
  tint50: '#E1E6FC',
  tint60: '#F7F9FE',
};

const navy: ColorVariants = {
  shade50: '#00061D',
  shade40: '#000C36',
  shade30: '#001665',
  shade20: '#001E8A',
  shade10: '#0023A3',
  primary: '#0027B4',
  tint10: '#173BBE',
  tint20: '#3050C7',
  tint30: '#5470D3',
  tint40: '#A3B2E9',
  tint50: '#CCD5F3',
  tint60: '#F2F4FC',
};

const lavender: ColorVariants = {
  shade50: '#120F25',
  shade40: '#221D46',
  shade30: '#403582',
  shade20: '#5648B0',
  shade10: '#6656D1',
  primary: '#7160E8',
  tint10: '#8171EB',
  tint20: '#9183EE',
  tint30: '#A79CF1',
  tint40: '#D2CCF8',
  tint50: '#E7E4FB',
  tint60: '#F9F8FE',
};

const purple: ColorVariants = {
  shade50: '#0F0717',
  shade40: '#1C0E2C',
  shade30: '#341A51',
  shade20: '#46236E',
  shade10: '#532A83',
  primary: '#5C2E91',
  tint10: '#6C409F',
  tint20: '#7C53AC',
  tint30: '#9470BD',
  tint40: '#C6B1DE',
  tint50: '#E0D4ED',
  tint60: '#F7F4FB',
};

const darkPurple: ColorVariants = {
  shade50: '#0a0411',
  shade40: '#130820',
  shade30: '#230f3c',
  shade20: '#301451',
  shade10: '#391860',
  primary: '#401B6C',
  tint10: '#502a7d',
  tint20: '#623d8f',
  tint30: '#7d5ba6',
  tint40: '#b9a3d3',
  tint50: '#d8cce7',
  tint60: '#f5f2f9',
};

const orchid: ColorVariants = {
  shade50: '#15101d',
  shade40: '#281e37',
  shade30: '#4b3867',
  shade20: '#664b8c',
  shade10: '#7959a5',
  primary: '#8764B8',
  tint10: '#9372c0',
  tint20: '#a083c9',
  tint30: '#b29ad4',
  tint40: '#d7c9ea',
  tint50: '#e9e2f4',
  tint60: '#f9f8fc',
};

const grape: ColorVariants = {
  shade50: '#160418',
  shade40: '#29072E',
  shade30: '#4D0D56',
  shade20: '#691174',
  shade10: '#7C158A',
  primary: '#881798',
  tint10: '#972AA5',
  tint20: '#A43FB1',
  tint30: '#B65FC2',
  tint40: '#DAA7E0',
  tint50: '#CCD5F3',
  tint60: '#F2F4FC',
};

const berry: ColorVariants = {
  shade50: '#1f091c',
  shade40: '#3a1135',
  shade30: '#6d1f64',
  shade20: '#932b87',
  shade10: '#ae33a0',
  primary: '#C239B3',
  tint10: '#c94bba',
  tint20: '#d060c3',
  tint30: '#da7dcf',
  tint40: '#edbae7',
  tint50: '#f5d9f2',
  tint60: '#fdf5fc',
};

const lilac: ColorVariants = {
  shade50: '#1C0B1F',
  shade40: '#35153A',
  shade30: '#63276D',
  shade20: '#873593',
  shade10: '#A03FAE',
  primary: '#B146C2',
  tint10: '#BA58C9',
  tint20: '#C36BD0',
  tint30: '#CF86DA',
  tint40: '#E7BFED',
  tint50: '#F2DCF5',
  tint60: '#FCF6FD',
};

const pink: ColorVariants = {
  shade50: '#24091A',
  shade40: '#441232',
  shade30: '#7F215D',
  shade20: '#AC2D7E',
  shade10: '#CC3595',
  primary: '#E43BA6',
  tint10: '#E650AF',
  tint20: '#EA66B9',
  tint30: '#EE84C7',
  tint40: '#F7C0E3',
  tint50: '#FBDDF0',
  tint60: '#FEF6FB',
};

const hotPink: ColorVariants = {
  shade50: '#240016',
  shade40: '#44002a',
  shade30: '#7f004e',
  shade20: '#ac006a',
  shade10: '#cc007e',
  primary: '#E3008C',
  tint10: '#e61c99',
  tint20: '#ea38a6',
  tint30: '#ee5fb7',
  tint40: '#f7adda',
  tint50: '#fbd2eb',
  tint60: '#fef4fa',
};

const magenta: ColorVariants = {
  shade50: '#1F0013',
  shade40: '#390023',
  shade30: '#6B0042',
  shade20: '#91005A',
  shade10: '#AC006A',
  primary: '#BF0077',
  tint10: '#C71884',
  tint20: '#CF3292',
  tint30: '#D957A7',
  tint40: '#ECA5D1',
  tint50: '#F5CEE6',
  tint60: '#FCF2F9',
};

const plum: ColorVariants = {
  shade50: '#13000C',
  shade40: '#240017',
  shade30: '#43002C',
  shade20: '#5B003B',
  shade10: '#6C0046',
  primary: '#77004D',
  tint10: '#88105E',
  tint20: '#982570',
  tint30: '#AE4689',
  tint40: '#D696C0',
  tint50: '#E9C4DC',
  tint60: '#FAF0F6',
};

const beige: ColorVariants = {
  shade50: '#141313',
  shade40: '#252323',
  shade30: '#454241',
  shade20: '#5D5958',
  shade10: '#6E6A69',
  primary: '#7A7574',
  tint10: '#8A8584',
  tint20: '#9A9594',
  tint30: '#AFABAA',
  tint40: '#D7D5D4',
  tint50: '#EAE8E8',
  tint60: '#FAF9F9',
};

// TODO naming iteration -> clashing with grey
const mink: ColorVariants = {
  shade50: '#0F0E0E',
  shade40: '#1C1B1A',
  shade30: '#333231',
  shade20: '#464442',
  shade10: '#53504E',
  primary: '#5D5A58',
  tint10: '#6F6C6A',
  tint20: '#83807E',
  tint30: '#9D9A98',
  tint40: '#CECCCB',
  tint50: '#E5E4E3',
  tint60: '#F8F8F8',
};

const silver: ColorVariants = {
  shade50: '#151818',
  shade40: '#282d2e',
  shade30: '#4b5356',
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
  shade40: '#1F2425',
  shade30: '#3A4346',
  shade20: '#4F5B5F',
  shade10: '#5D6C70',
  primary: '#69797E',
  tint10: '#78888D',
  tint20: '#88979C',
  tint30: '#9FADB1',
  tint40: '#CDD5D8',
  tint50: '#E4E9EA',
  tint60: '#F8F9FA',
};

const anchor: ColorVariants = {
  shade50: '#090A0B',
  shade40: '#111315',
  shade30: '#1F2427',
  shade20: '#2A3134',
  shade10: '#32393E',
  primary: '#394146',
  tint10: '#4C555B',
  tint20: '#616B72',
  tint30: '#7F898F',
  tint40: '#BCC3C7',
  tint50: '#DADFE1',
  tint60: '#F6F7F8',
};

const charcoal: ColorVariants = {
  shade50: '#090909',
  shade40: '#111111',
  shade30: '#1f1f1f',
  shade20: '#2b2b2b',
  shade10: '#323232',
  primary: '#393939',
  tint10: '#505050',
  tint20: '#686868',
  tint30: '#888888',
  tint40: '#c3c3c3',
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
  mink, // TODO naming iteration -> clashing with grey
  silver,
  platinum,
  anchor,
  charcoal,
};

export const brandColors: ProductBrandColors = {
  teams: brandTeams,
  web: brand,
};
