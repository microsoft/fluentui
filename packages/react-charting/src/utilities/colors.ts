type ColorVariants = {
  shade50: string;
  shade40: string;
  shade30: string;
  shade20: string;
  shade10: string;
  primary: string;
  tint10: string;
  tint20: string;
  tint30: string;
  tint40: string;
  tint50: string;
  tint60: string;
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

export const LightQualitativePalette = {
  dataVizSlot1: cornflower.tint10,
  dataVizSlot2: hotPink.primary,
  dataVizSlot3: teal.tint20,
  dataVizSlot4: orchid.tint10,
  dataVizSlot5: lightGreen.primary,
  dataVizSlot6: lightBlue.primary,
  dataVizSlot7: pumpkin.primary,
  dataVizSlot8: lime.shade20,
  dataVizSlot9: lilac.primary,
  dataVizSlot10: gold.shade10,
  dataVizSlot11: cornflower.shade20,
  dataVizSlot12: hotPink.shade20,
  dataVizSlot13: teal.shade20,
  dataVizSlot14: orchid.shade20,
  dataVizSlot15: lightGreen.shade20,
  dataVizSlot16: lightBlue.shade20,
  dataVizSlot17: pumpkin.shade20,
  dataVizSlot18: lime.shade30,
  dataVizSlot19: lilac.shade20,
  dataVizSlot20: gold.shade30,
  dataVizSlot21: cornflower.primary,
  dataVizSlot22: hotPink.tint20,
  dataVizSlot23: teal.primary,
  dataVizSlot24: orchid.primary,
  dataVizSlot25: lightGreen.shade10,
  dataVizSlot26: lightBlue.shade10,
  dataVizSlot27: pumpkin.tint10,
  dataVizSlot28: lime.shade10,
  dataVizSlot29: lilac.tint10,
  dataVizSlot30: gold.shade20,
  dataVizSlot31: cornflower.shade30,
  dataVizSlot32: hotPink.shade30,
  dataVizSlot33: teal.shade30,
  dataVizSlot34: orchid.shade30,
  dataVizSlot35: lightGreen.shade30,
  dataVizSlot36: lightBlue.shade30,
  dataVizSlot37: pumpkin.shade30,
  dataVizSlot38: lime.shade40,
  dataVizSlot39: lilac.shade30,
  dataVizSlot40: gold.shade40,
};

export const DarkQualitativePalette = {
  dataVizSlot1: cornflower.tint10,
  dataVizSlot2: hotPink.primary,
  dataVizSlot3: teal.tint20,
  dataVizSlot4: orchid.tint10,
  dataVizSlot5: lightGreen.primary,
  dataVizSlot6: lightBlue.primary,
  dataVizSlot7: pumpkin.primary,
  dataVizSlot8: lime.shade20,
  dataVizSlot9: lilac.primary,
  dataVizSlot10: gold.shade10,
  dataVizSlot11: cornflower.tint30,
  dataVizSlot12: hotPink.tint30,
  dataVizSlot13: teal.tint30,
  dataVizSlot14: orchid.tint20,
  dataVizSlot15: lightGreen.tint10,
  dataVizSlot16: lightBlue.tint10,
  dataVizSlot17: pumpkin.tint20,
  dataVizSlot18: lime.primary,
  dataVizSlot19: lilac.tint20,
  dataVizSlot20: gold.tint20,
  dataVizSlot21: cornflower.primary,
  dataVizSlot22: hotPink.tint20,
  dataVizSlot23: teal.primary,
  dataVizSlot24: orchid.primary,
  dataVizSlot25: lightGreen.shade10,
  dataVizSlot26: lightBlue.shade10,
  dataVizSlot27: pumpkin.tint10,
  dataVizSlot28: lime.shade10,
  dataVizSlot29: lilac.tint10,
  dataVizSlot30: gold.primary,
  dataVizSlot31: cornflower.tint40,
  dataVizSlot32: hotPink.tint40,
  dataVizSlot33: teal.tint40,
  dataVizSlot34: orchid.tint40,
  dataVizSlot35: lightGreen.tint40,
  dataVizSlot36: lightBlue.tint30,
  dataVizSlot37: pumpkin.tint30,
  dataVizSlot38: lime.tint30,
  dataVizSlot39: lilac.tint30,
  dataVizSlot40: gold.tint40,
};

const LIGHT_QUALITATIVE_COLORS = Object.values(LightQualitativePalette);
const DARK_QUALITATIVE_COLORS = Object.values(DarkQualitativePalette);

export const getNextColor = (index: number, offset: number = 0, isThemeInverted: boolean = false): string => {
  const colors = isThemeInverted ? DARK_QUALITATIVE_COLORS : LIGHT_QUALITATIVE_COLORS;
  return colors[(index + offset) % colors.length];
};

export const SemanticPalette = {
  info: '#015cda',
  success: '#57a300',
  warning: '#db7500',
  error: '#e00b1c',
  disabled: '#8a8886',
};
