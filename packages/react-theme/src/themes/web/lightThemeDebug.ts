// TODO:
//   The pipeline should output something that allows us to tell which variables are mapped to which.
//   That same output should allow following the mapping until you reach a hard coded value.
//   Example:
//     - debug[aliasName] => globalName
//     - debug[globalName] => '#888888'

export const webLightThemeDebug: Record<string, string> = {
  '--alias-color-neutral-neutralForeground1': '--global-palette-grey-14',

  '--alias-color-neutral-neutralForeground2': '--global-palette-grey-26',
  '--alias-color-neutral-neutralForeground2Hover': '--global-palette-grey-14',
  '--alias-color-neutral-neutralForeground2Pressed': '--global-palette-grey-14',
  '--alias-color-neutral-neutralForeground2Selected': '--global-palette-grey-14',
  '--alias-color-brand-brandForeground2Hover': '--global-palette-brand-primary',
  '--alias-color-brand-brandForeground2Pressed': '--global-palette-brand-shade10',
  '--alias-color-brand-brandForeground2Selected': '--global-palette-brand-primary',

  '--alias-color-neutral-neutralForeground3': '--global-palette-grey-38',
  '--alias-color-neutral-neutralForeground3Hover': '--global-palette-grey-26',
  '--alias-color-neutral-neutralForeground3Pressed': '--global-palette-grey-26',
  '--alias-color-neutral-neutralForeground3Selected': '--global-palette-grey-26',
  '--alias-color-brand-brandForeground3Hover': '--global-palette-brand-primary',
  '--alias-color-brand-brandForeground3Pressed': '--global-palette-brand-shade10',
  '--alias-color-brand-brandForeground3Selected': '--global-palette-brand-primary',

  '--alias-color-neutral-neutralForeground4': '--global-palette-grey-50',

  '--alias-color-neutral-neutralForegroundDisabled': '--global-palette-grey-74',

  '--alias-color-brand-brandForeground': '--global-palette-brand-shade10',

  '--alias-color-brand-brandForegroundHover': '--global-palette-brand-shade20',
  '--alias-color-brand-brandForegroundPressed': '--global-palette-brand-shade30',
  '--alias-color-brand-brandForegroundSelected': '--global-palette-brand-shade10',

  '--alias-color-neutral-neutralForegroundInverted': '--global-color-white',

  '--alias-color-neutral-neutralForegroundInvertedAccessible': '--global-color-white',

  '--alias-color-neutral-neutralBackground1': '--global-color-white',
  '--alias-color-neutral-neutralBackground1Hover': '--global-palette-grey-96',
  '--alias-color-neutral-neutralBackground1Pressed': '--global-palette-grey-88',
  '--alias-color-neutral-neutralBackground1Selected': '--global-palette-grey-92',

  '--alias-color-neutral-neutralBackground2': '--global-palette-grey-98',
  '--alias-color-neutral-neutralBackground2Hover': '--global-palette-grey-94',
  '--alias-color-neutral-neutralBackground2Pressed': '--global-palette-grey-86',
  '--alias-color-neutral-neutralBackground2Selected': '--global-palette-grey-90',

  '--alias-color-neutral-neutralBackground3': '--global-palette-grey-96',
  '--alias-color-neutral-neutralBackground3Hover': '--global-palette-grey-92',
  '--alias-color-neutral-neutralBackground3Pressed': '--global-palette-grey-84',
  '--alias-color-neutral-neutralBackground3Selected': '--global-palette-grey-88',

  '--alias-color-neutral-neutralBackground4': '--global-palette-grey-94',
  '--alias-color-neutral-neutralBackground4Hover': '--global-palette-grey-98',
  '--alias-color-neutral-neutralBackground4Pressed': '--global-palette-grey-96',
  '--alias-color-neutral-neutralBackground4Selected': '--global-color-white',

  '--alias-color-neutral-neutralBackground5': '--global-palette-grey-92',
  '--alias-color-neutral-neutralBackground5Hover': '--global-palette-grey-96',
  '--alias-color-neutral-neutralBackground5Pressed': '--global-palette-grey-94',
  '--alias-color-neutral-neutralBackground5Selected': '--global-palette-grey-98',

  '--alias-color-neutral-neutralBackground6': '--global-palette-grey-90',

  '--alias-color-neutral-neutralBackgroundDisabled': '--global-palette-grey-94',

  '--alias-color-neutral-neutralStrokeAccessible': '--global-palette-grey-38',
  '--alias-color-neutral-neutralStrokeAccessibleHover': '--global-palette-grey-34',
  '--alias-color-neutral-neutralStrokeAccessiblePressed': '--global-palette-grey-30',
  '--alias-color-neutral-neutralStrokeAccessibleSelected': '--global-palette-brand-primary',

  '--alias-color-neutral-neutralStroke1': '--global-palette-grey-82',
  '--alias-color-neutral-neutralStroke1Hover': '--global-palette-grey-78',
  '--alias-color-neutral-neutralStroke1Pressed': '--global-palette-grey-70',
  '--alias-color-neutral-neutralStroke1Selected': '--global-palette-grey-74',

  '--alias-color-neutral-neutralStroke2': '--global-palette-grey-88',

  '--alias-color-neutral-neutralStroke3': '--global-palette-grey-94',

  '--alias-color-neutral-neutralStrokeDisabled': '--global-palette-grey-88',

  // TODO: these are not mapped, what to do?
  '--alias-color-strokeAccessible': 'transparent',
  '--alias-color-strokeAccessibleInteractive': 'transparent',
  '--alias-color-strokeAccessibleDisabled': 'transparent',

  // TODO: these are not mapped, what to do?
  '--alias-color-neutral-neutralShadowAmbient': 'rgba(0,0,0,0.12)',
  '--alias-color-neutral-neutralShadowKey': 'rgba(0,0,0,0.14)',
  '--alias-color-neutral-neutralShadowAmbientLighter': 'rgba(0,0,0,0.06)',
  '--alias-color-neutral-neutralShadowKeyLighter': 'rgba(0,0,0,0.07)',
  '--alias-color-neutral-neutralShadowAmbientDarker': 'rgba(0,0,0,0.20)',
  '--alias-color-neutral-neutralShadowKeyDarker': 'rgba(0,0,0,0.24)',

  //
  // From: react-theme/src/global/utils.ts
  //
  '--global-palette-grey-0': '#000000',
  '--global-palette-grey-2': '#050505',
  '--global-palette-grey-4': '#0A0A0A',
  '--global-palette-grey-6': '#0F0F0F',
  '--global-palette-grey-8': '#141414',
  '--global-palette-grey-10': '#1A1A1A',
  '--global-palette-grey-12': '#1F1F1F',
  '--global-palette-grey-14': '#242424',
  '--global-palette-grey-16': '#292929',
  '--global-palette-grey-18': '#2E2E2E',
  '--global-palette-grey-20': '#333333',
  '--global-palette-grey-22': '#383838',
  '--global-palette-grey-24': '#3D3D3D',
  '--global-palette-grey-26': '#424242',
  '--global-palette-grey-28': '#474747',
  '--global-palette-grey-30': '#4D4D4D',
  '--global-palette-grey-32': '#525252',
  '--global-palette-grey-34': '#575757',
  '--global-palette-grey-36': '#5C5C5C',
  '--global-palette-grey-38': '#616161',
  '--global-palette-grey-40': '#666666',
  '--global-palette-grey-42': '#6B6B6B',
  '--global-palette-grey-44': '#707070',
  '--global-palette-grey-46': '#757575',
  '--global-palette-grey-48': '#7A7A7A',
  '--global-palette-grey-50': '#808080',
  '--global-palette-grey-52': '#858585',
  '--global-palette-grey-54': '#8A8A8A',
  '--global-palette-grey-56': '#8F8F8F',
  '--global-palette-grey-58': '#949494',
  '--global-palette-grey-60': '#999999',
  '--global-palette-grey-62': '#9E9E9E',
  '--global-palette-grey-64': '#A3A3A3',
  '--global-palette-grey-66': '#A8A8A8',
  '--global-palette-grey-68': '#ADADAD',
  '--global-palette-grey-70': '#B2B2B2',
  '--global-palette-grey-72': '#B8B8B8',
  '--global-palette-grey-74': '#BDBDBD',
  '--global-palette-grey-76': '#C2C2C2',
  '--global-palette-grey-78': '#C7C7C7',
  '--global-palette-grey-80': '#CCCCCC',
  '--global-palette-grey-82': '#D1D1D1',
  '--global-palette-grey-84': '#D6D6D6',
  '--global-palette-grey-86': '#DBDBDB',
  '--global-palette-grey-88': '#E0E0E0',
  '--global-palette-grey-90': '#E5E5E5',
  '--global-palette-grey-92': '#EBEBEB',
  '--global-palette-grey-94': '#F0F0F0',
  '--global-palette-grey-96': '#F5F5F5',
  '--global-palette-grey-98': '#FAFAFA',
  '--global-palette-grey-100': '#FFFFFF',
};
