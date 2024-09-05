export const DataVizGradientPalette = {
  gradient1: 'default.1',
  gradient2: 'default.2',
  gradient3: 'default.3',
  gradient4: 'default.4',
  gradient5: 'default.5',
  gradient6: 'default.6',
  gradient7: 'default.7',
  gradient8: 'default.8',
  gradient9: 'default.9',
  gradient10: 'default.10',
  // extended gradients
  gradient1Ext: 'extended.1',
  gradient2Ext: 'extended.2',
  gradient3Ext: 'extended.3',
  gradient4Ext: 'extended.4',
  gradient5Ext: 'extended.5',
  gradient6Ext: 'extended.6',
  gradient7Ext: 'extended.7',
  gradient8Ext: 'extended.8',
  gradient9Ext: 'extended.9',
  gradient10Ext: 'extended.10',
  // status gradients
  success: 'semantic.success',
  highSuccess: 'semantic.highSuccess',
  warning: 'semantic.warning',
  error: 'semantic.error',
  highError: 'semantic.highError',
  disabled: 'semantic.disabled',
};

/**
 * Key: Color code.
 * Value:
 *
 * Index 0 - Default gradient for light theme
 *      ├── Index 0 - start color of gradient
 *      └── Index 1 - end color of gradient
 *
 * Index 1 - gradient for dark theme
 *      ├── Index 0 - start color of gradient
 *      └── Index 1 - end color of gradient
 */
type GradientPalette = { [key: string]: [string, string][] };

const defaultGradientPalette: GradientPalette = {
  '1': [
    ['#4760D5', '#637CEF'], // [cornflower.shade10, cornflower.tint10],
    ['#4F6BED', '#637CEF'], // [cornflower.shade10, cornflower.tint10],
  ],
  '2': [
    ['#795AA6', '#9373C0'], // [orchid.shade20, orchid.tint10],
    ['#8764B8', '#A083C9'], // [orchid.primary, orchid.tint20],
  ],
  '3': [
    ['#159195', '#2AA0A4'], // [teal.tint10, teal.tint20],
    ['#159195', '#2AA0A4'], // [teal.tint10, teal.tint20],
  ],
  '4': [
    ['#B146C2', '#C36BD1'], // [lilac.primary, lilac.tint20],
    ['#B146C2', '#C36BD1'], // [lilac.primary, lilac.tint20],
  ],
  '5': [
    ['#3487C7', '#3A96DD'], // [lightBlue.shade10, lightBlue.primary],
    ['#3487C7', '#3A96DD'], // [lightBlue.shade20, lightBlue.primary],
  ],
  '6': [
    ['#0E7A0B', '#13A10E'], // [lightGreen.shade20, lightGreen.primary],
    ['#11910D', '#27AC22'], // [lightGreen.shade10, lightGreen.tint10],
  ],
  '7': [
    ['#E61C99', '#EE5FB7'], // [hotPink.tint10, hotPink.tint30],
    ['#E61C99', '#EE5FB7'], // [hotPink.tint10, hotPink.tint30],
  ],
  '8': [
    ['#CA5010', '#D77440'], // [pumpkin.primary, pumpkin.tint20],
    ['#CA5010', '#D77440'], // [pumpkin.primary, pumpkin.tint10],
  ],
  '9': [
    ['#57811B', '#689920'], // [lime.shade20, lime.shade10],
    ['#57811B', '#689920'], // [lime.shade20, lime.shade10],
  ],
  '10': [
    ['#937700', '#AE8C00'], // [gold.shade20, gold.shade10],
    ['#937700', '#AE8C00'], // [gold.shade20, gold.shade10],
  ],
};

const extendedGradientPalette: GradientPalette = {
  '1': [
    ['#2C3C85', '#3C51B4'], // [cornflower.shade30, cornflower.shade20],
    ['#93A4F4', '#C8D1FA'], // [cornflower.tint30, cornflower.tint40],
  ],
  '2': [
    ['#4C3867', '#674C8C'], // [orchid.shade30, orchid.shade20],
    ['#A083C9', '#B29AD4'], // [orchid.tint20, orchid.tint30],
  ],
  '3': [
    ['#02494C', '#038387'], // [teal.shade30, teal.primary],
    ['#4CB4B7', '#9BD9DB'], // [teal.tint30, teal.tint40],
  ],
  '4': [
    ['#63276D', '#863593'], // [lilac.shade30, lilac.shade20],
    ['#C36BD1', '#CF87DA'], // [lilac.tint20, lilac.tint30],
  ],
  '5': [
    ['#20547C', '#2C72A8'], // [lightBlue.shade30, lightBlue.shade20],
    ['#4FA1E1', '#83BDEB'], // [lightBlue.tint10, lightBlue.tint30],
  ],
  '6': [
    ['#0B5A08', '#0E7A0B'], // [lightGreen.shade30, lightGreen.shade20],
    ['#27AC22', '#5EC75A'], // [lightGreen.tint10, lightGreen.tint30],
  ],
  '7': [
    ['#AD006A', '#E3008C'], // [hotPink.shade20, hotPink.primary],
    ['#EE5FB7', '#F7ADDA'], // [hotPink.tint30, hotPink.tint40],
  ],
  '8': [
    ['#9A3D0C', '#CA5010'], // [pumpkin.shade20, pumpkin.primary],
    ['#D77440', '#DF8E64'], // [pumpkin.tint20, pumpkin.tint30],
  ],
  '9': [
    ['#405F14', '#57811B'], // [lime.shade30, lime.shade20],
    ['#73AA24', '#A4CC6C'], // [lime.primary, lime.tint30],
  ],
  '10': [
    ['#6D5700', '#937700'], // [gold.shade30, gold.shade20],
    ['#D0B232', '#DAC157'], // [gold.tint20, gold.tint30],
  ],
};

const semanticGradientPalette: GradientPalette = {
  success: [
    ['#0C5E0C', '#107C10'], // [green.shade20, green.primary],
    ['#218C21', '#359B35'], // [green.tint10, green.tint20],
  ],
  highSuccess: [
    ['#107C10', '#359B35'], // [green.primary, green.tint20],
    ['#359B35', '#9FD89F'], // [green.tint20, green.tint40],
  ],
  warning: [
    ['#DE590B', '#F7630C'], // [orange.shade10, orange.primary],
    ['#DE590B', '#F87528'], // [orange.shade10, orange.tint10],
  ],
  error: [
    ['#B10E1C', '#CC2635'], // [cranberry.shade10, cranberry.tint10],
    ['#D33F4C', '#EEACB2'], // [cranberry.tint20, cranberry.tint40],
  ],
  highError: [
    ['#6E0811', '#B10E1C'], // [cranberry.shade30, cranberry.shade10],
    ['#D33F4C', '#DC626D'], // [cranberry.tint20, cranberry.tint30],
  ],
  disabled: [
    ['#E6E6E6', '#E6E6E6'],
    ['#E6E6E6', '#E6E6E6'],
  ],
};

const Gradients: { [key: string]: GradientPalette } = {
  default: defaultGradientPalette, // base gradients
  semantic: semanticGradientPalette, // status gradients
  extended: extendedGradientPalette, // extended gradients
};

const DEFAULT_COLORS = Object.values(defaultGradientPalette);
const TOKENS = Object.values(DataVizGradientPalette);

const getThemeSpecificGradient = (gradients: [string, string][], isDarkTheme: boolean): [string, string] => {
  if (gradients.length === 0) {
    return ['', ''];
  }

  const colorIdx = Number(isDarkTheme);

  if (colorIdx < gradients.length) {
    return gradients[colorIdx];
  }

  return gradients[0];
};

export const getNextGradient = (index: number, offset: number = 0, isDarkTheme: boolean = false): [string, string] => {
  const gradients = DEFAULT_COLORS[(index + offset) % DEFAULT_COLORS.length];
  return getThemeSpecificGradient(gradients, isDarkTheme);
};

export const getGradientFromToken = (token: string, isDarkTheme: boolean = false): [string, string] => {
  if (TOKENS.indexOf(token) >= 0) {
    const [paletteName, colorCode] = token.split('.');
    const colors = Gradients[paletteName][colorCode];

    return getThemeSpecificGradient(colors, isDarkTheme);
  }
  return [token, token];
};
