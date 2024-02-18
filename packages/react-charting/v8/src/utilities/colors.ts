export const DataVizPalette = {
  color1: 'qualitative.1',
  color2: 'qualitative.2',
  color3: 'qualitative.3',
  color4: 'qualitative.4',
  color5: 'qualitative.5',
  color6: 'qualitative.6',
  color7: 'qualitative.7',
  color8: 'qualitative.8',
  color9: 'qualitative.9',
  color10: 'qualitative.10',
  color11: 'qualitative.11',
  color12: 'qualitative.12',
  color13: 'qualitative.13',
  color14: 'qualitative.14',
  color15: 'qualitative.15',
  color16: 'qualitative.16',
  color17: 'qualitative.17',
  color18: 'qualitative.18',
  color19: 'qualitative.19',
  color20: 'qualitative.20',
  color21: 'qualitative.21',
  color22: 'qualitative.22',
  color23: 'qualitative.23',
  color24: 'qualitative.24',
  color25: 'qualitative.25',
  color26: 'qualitative.26',
  color27: 'qualitative.27',
  color28: 'qualitative.28',
  color29: 'qualitative.29',
  color30: 'qualitative.30',
  color31: 'qualitative.31',
  color32: 'qualitative.32',
  color33: 'qualitative.33',
  color34: 'qualitative.34',
  color35: 'qualitative.35',
  color36: 'qualitative.36',
  color37: 'qualitative.37',
  color38: 'qualitative.38',
  color39: 'qualitative.39',
  color40: 'qualitative.40',
  info: 'semantic.info',
  disabled: 'semantic.disabled',
  highError: 'semantic.highError',
  error: 'semantic.error',
  warning: 'semantic.warning',
  success: 'semantic.success',
  highSuccess: 'semantic.highSuccess',
};

/**
 * Key: Color code.
 * Value:
 * Index 0 - Default color / Color for light theme,
 * Index 1 - Color for dark theme
 */
type Palette = { [key: string]: string[] };

const QualitativePalette: Palette = {
  '1': ['#637cef'], // [cornflower.tint10],
  '2': ['#e3008c'], // [hotPink.primary],
  '3': ['#2aa0a4'], // [teal.tint20],
  '4': ['#9373c0'], // [orchid.tint10],
  '5': ['#13a10e'], // [lightGreen.primary],
  '6': ['#3a96dd'], // [lightBlue.primary],
  '7': ['#ca5010'], // [pumpkin.primary],
  '8': ['#57811b'], // [lime.shade20],
  '9': ['#b146c2'], // [lilac.primary],
  '10': ['#ae8c00'], // [gold.shade10],
  '11': ['#3c51b4', '#93a4f4'], // [cornflower.shade20, cornflower.tint30],
  '12': ['#ad006a', '#ee5fb7'], // [hotPink.shade20, hotPink.tint30],
  '13': ['#026467', '#4cb4b7'], // [teal.shade20, teal.tint30],
  '14': ['#674c8c', '#a083c9'], // [orchid.shade20, orchid.tint20],
  '15': ['#0e7a0b', '#27ac22'], // [lightGreen.shade20, lightGreen.tint10],
  '16': ['#2c72a8', '#4fa1e1'], // [lightBlue.shade20, lightBlue.tint10],
  '17': ['#9a3d0c', '#d77440'], // [pumpkin.shade20, pumpkin.tint20],
  '18': ['#405f14', '#73aa24'], // [lime.shade30, lime.primary],
  '19': ['#863593', '#c36bd1'], // [lilac.shade20, lilac.tint20],
  '20': ['#6d5700', '#d0b232'], // [gold.shade30, gold.tint20],
  '21': ['#4f6bed'], // [cornflower.primary],
  '22': ['#ea38a6'], // [hotPink.tint20],
  '23': ['#038387'], // [teal.primary],
  '24': ['#8764b8'], // [orchid.primary],
  '25': ['#11910d'], // [lightGreen.shade10],
  '26': ['#3487c7'], // [lightBlue.shade10],
  '27': ['#d06228'], // [pumpkin.tint10],
  '28': ['#689920'], // [lime.shade10],
  '29': ['#ba58c9'], // [lilac.tint10],
  '30': ['#937700', '#c19c00'], // [gold.shade20, gold.primary],
  '31': ['#2c3c85', '#c8d1fa'], // [cornflower.shade30, cornflower.tint40],
  '32': ['#7f004e', '#f7adda'], // [hotPink.shade30, hotPink.tint40],
  '33': ['#02494c', '#9bd9db'], // [teal.shade30, teal.tint40],
  '34': ['#4c3867', '#b29ad4'], // [orchid.shade30, orchid.tint30],
  '35': ['#0b5a08', '#a7e3a5'], // [lightGreen.shade30, lightGreen.tint40],
  '36': ['#20547c', '#83bdeb'], // [lightBlue.shade30, lightBlue.tint30],
  '37': ['#712d09', '#df8e64'], // [pumpkin.shade30, pumpkin.tint30],
  '38': ['#23330b', '#a4cc6c'], // [lime.shade40, lime.tint30],
  '39': ['#63276d', '#cf87da'], // [lilac.shade30, lilac.tint30],
  '40': ['#3a2f00', '#dac157'], // [gold.shade40, gold.tint30],
};

const SemanticPalette: Palette = {
  info: ['#015cda'],
  disabled: ['#dbdbdb', '#4d4d4d'], // [grey[86], grey[30]]
  highError: ['#6e0811', '#cc2635'], // [cranberry.shade30, cranberry.tint10],
  error: ['#c50f1f', '#dc626d'], // [cranberry.primary, cranberry.tint30],
  warning: ['#f7630c', '#f87528'], // [orange.primary, orange.tint10],
  success: ['#107c10', '#54b054'], // [green.primary, green.tint30],
  highSuccess: ['#094509', '#218c21'], // [green.shade30, green.tint10],
};

const Colors: { [key: string]: Palette } = {
  qualitative: QualitativePalette,
  semantic: SemanticPalette,
};

const QUALITATIVE_COLORS = Object.values(QualitativePalette);
const TOKENS = Object.values(DataVizPalette);

const getThemeSpecificColor = (colors: string[], isDarkTheme: boolean): string => {
  if (colors.length === 0) {
    return '';
  }
  const colorIdx = Number(isDarkTheme);
  if (colorIdx < colors.length) {
    return colors[colorIdx];
  }
  return colors[0];
};

export const getNextColor = (index: number, offset: number = 0, isDarkTheme: boolean = false): string => {
  const colors = QUALITATIVE_COLORS[(index + offset) % QUALITATIVE_COLORS.length];
  return getThemeSpecificColor(colors, isDarkTheme);
};

export const getColorFromToken = (token: string, isDarkTheme: boolean = false): string => {
  if (TOKENS.indexOf(token) >= 0) {
    const [paletteName, colorCode] = token.split('.');
    const colors = Colors[paletteName][colorCode];
    return getThemeSpecificColor(colors, isDarkTheme);
  }
  return token;
};
