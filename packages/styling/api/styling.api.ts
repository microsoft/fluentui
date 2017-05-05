export function after(style: IRawStyle): IProcessedStyle;

export function before(style: IRawStyle): IProcessedStyle;

export function fontFace(font: Glamor.FontProperties): string;

// (undocumented)
export function getClassNames < T >(styles: T): IClassNames<T>;

export function getFocusRule(theme: ITheme,
  inset: string = '0',
  color: string = theme.palette.neutralSecondary,
  position: 'relative' | 'absolute' = 'relative'): IStyle;

export function getTheme(): ITheme;

// (undocumented)
interface IAnimationClassNames extends IClassNames<IAnimationStyles> {
}

interface IAnimationStyles {
  // (undocumented)
  fadeIn100: IRawStyle;
  // (undocumented)
  fadeIn200: IRawStyle;
  // (undocumented)
  fadeIn400: IRawStyle;
  // (undocumented)
  fadeIn500: IRawStyle;
  // (undocumented)
  fadeOut100: IRawStyle;
  // (undocumented)
  fadeOut200: IRawStyle;
  // (undocumented)
  fadeOut400: IRawStyle;
  // (undocumented)
  fadeOut500: IRawStyle;
  // (undocumented)
  rotate90deg: IRawStyle;
  // (undocumented)
  rotateN90deg: IRawStyle;
  // (undocumented)
  scaleDownIn100: IRawStyle;
  // (undocumented)
  scaleDownOut98: IRawStyle;
  // (undocumented)
  scaleUpIn100: IRawStyle;
  // (undocumented)
  scaleUpOut103: IRawStyle;
  // (undocumented)
  slideDownIn10: IRawStyle;
  // (undocumented)
  slideDownIn20: IRawStyle;
  // (undocumented)
  slideDownOut10: IRawStyle;
  // (undocumented)
  slideDownOut20: IRawStyle;
  // (undocumented)
  slideLeftIn10: IRawStyle;
  // (undocumented)
  slideLeftIn20: IRawStyle;
  // (undocumented)
  slideLeftIn40: IRawStyle;
  // (undocumented)
  slideLeftIn400: IRawStyle;
  // (undocumented)
  slideLeftOut10: IRawStyle;
  // (undocumented)
  slideLeftOut20: IRawStyle;
  // (undocumented)
  slideLeftOut40: IRawStyle;
  // (undocumented)
  slideLeftOut400: IRawStyle;
  // (undocumented)
  slideRightIn10: IRawStyle;
  // (undocumented)
  slideRightIn20: IRawStyle;
  // (undocumented)
  slideRightIn40: IRawStyle;
  // (undocumented)
  slideRightIn400: IRawStyle;
  // (undocumented)
  slideRightOut10: IRawStyle;
  // (undocumented)
  slideRightOut20: IRawStyle;
  // (undocumented)
  slideRightOut40: IRawStyle;
  // (undocumented)
  slideRightOut400: IRawStyle;
  // (undocumented)
  slideUpIn10: IRawStyle;
  // (undocumented)
  slideUpIn20: IRawStyle;
  // (undocumented)
  slideUpOut10: IRawStyle;
  // (undocumented)
  slideUpOut20: IRawStyle;
}

// (undocumented)
interface IColorClassNames {
  // (undocumented)
  black?: string;
  // (undocumented)
  blackBackground?: string;
  // (undocumented)
  blackBackgroundHover?: string;
  // (undocumented)
  blackBorder?: string;
  // (undocumented)
  blackBorderHover?: string;
  // (undocumented)
  blackHover?: string;
  // (undocumented)
  blackTranslucent40?: string;
  // (undocumented)
  blackTranslucent40Background?: string;
  // (undocumented)
  blackTranslucent40BackgroundHover?: string;
  // (undocumented)
  blackTranslucent40Border?: string;
  // (undocumented)
  blackTranslucent40BorderHover?: string;
  // (undocumented)
  blackTranslucent40Hover?: string;
  // (undocumented)
  blue?: string;
  // (undocumented)
  blueBackground?: string;
  // (undocumented)
  blueBackgroundHover?: string;
  // (undocumented)
  blueBorder?: string;
  // (undocumented)
  blueBorderHover?: string;
  // (undocumented)
  blueDark?: string;
  // (undocumented)
  blueDarkBackground?: string;
  // (undocumented)
  blueDarkBackgroundHover?: string;
  // (undocumented)
  blueDarkBorder?: string;
  // (undocumented)
  blueDarkBorderHover?: string;
  // (undocumented)
  blueDarkHover?: string;
  // (undocumented)
  blueHover?: string;
  // (undocumented)
  blueLight?: string;
  // (undocumented)
  blueLightBackground?: string;
  // (undocumented)
  blueLightBackgroundHover?: string;
  // (undocumented)
  blueLightBorder?: string;
  // (undocumented)
  blueLightBorderHover?: string;
  // (undocumented)
  blueLightHover?: string;
  // (undocumented)
  blueMid?: string;
  // (undocumented)
  blueMidBackground?: string;
  // (undocumented)
  blueMidBackgroundHover?: string;
  // (undocumented)
  blueMidBorder?: string;
  // (undocumented)
  blueMidBorderHover?: string;
  // (undocumented)
  blueMidHover?: string;
  // (undocumented)
  green?: string;
  // (undocumented)
  greenBackground?: string;
  // (undocumented)
  greenBackgroundHover?: string;
  // (undocumented)
  greenBorder?: string;
  // (undocumented)
  greenBorderHover?: string;
  // (undocumented)
  greenDark?: string;
  // (undocumented)
  greenDarkBackground?: string;
  // (undocumented)
  greenDarkBackgroundHover?: string;
  // (undocumented)
  greenDarkBorder?: string;
  // (undocumented)
  greenDarkBorderHover?: string;
  // (undocumented)
  greenDarkHover?: string;
  // (undocumented)
  greenHover?: string;
  // (undocumented)
  greenLight?: string;
  // (undocumented)
  greenLightBackground?: string;
  // (undocumented)
  greenLightBackgroundHover?: string;
  // (undocumented)
  greenLightBorder?: string;
  // (undocumented)
  greenLightBorderHover?: string;
  // (undocumented)
  greenLightHover?: string;
  // (undocumented)
  magenta?: string;
  // (undocumented)
  magentaBackground?: string;
  // (undocumented)
  magentaBackgroundHover?: string;
  // (undocumented)
  magentaBorder?: string;
  // (undocumented)
  magentaBorderHover?: string;
  // (undocumented)
  magentaDark?: string;
  // (undocumented)
  magentaDarkBackground?: string;
  // (undocumented)
  magentaDarkBackgroundHover?: string;
  // (undocumented)
  magentaDarkBorder?: string;
  // (undocumented)
  magentaDarkBorderHover?: string;
  // (undocumented)
  magentaDarkHover?: string;
  // (undocumented)
  magentaHover?: string;
  // (undocumented)
  magentaLight?: string;
  // (undocumented)
  magentaLightBackground?: string;
  // (undocumented)
  magentaLightBackgroundHover?: string;
  // (undocumented)
  magentaLightBorder?: string;
  // (undocumented)
  magentaLightBorderHover?: string;
  // (undocumented)
  magentaLightHover?: string;
  // (undocumented)
  neutralDark?: string;
  // (undocumented)
  neutralDarkBackground?: string;
  // (undocumented)
  neutralDarkBackgroundHover?: string;
  // (undocumented)
  neutralDarkBorder?: string;
  // (undocumented)
  neutralDarkBorderHover?: string;
  // (undocumented)
  neutralDarkHover?: string;
  // (undocumented)
  neutralLight?: string;
  // (undocumented)
  neutralLightBackground?: string;
  // (undocumented)
  neutralLightBackgroundHover?: string;
  // (undocumented)
  neutralLightBorder?: string;
  // (undocumented)
  neutralLightBorderHover?: string;
  // (undocumented)
  neutralLighter?: string;
  // (undocumented)
  neutralLighterAlt?: string;
  // (undocumented)
  neutralLighterAltBackground?: string;
  // (undocumented)
  neutralLighterAltBackgroundHover?: string;
  // (undocumented)
  neutralLighterAltBorder?: string;
  // (undocumented)
  neutralLighterAltBorderHover?: string;
  // (undocumented)
  neutralLighterAltHover?: string;
  // (undocumented)
  neutralLighterBackground?: string;
  // (undocumented)
  neutralLighterBackgroundHover?: string;
  // (undocumented)
  neutralLighterBorder?: string;
  // (undocumented)
  neutralLighterBorderHover?: string;
  // (undocumented)
  neutralLighterHover?: string;
  // (undocumented)
  neutralLightHover?: string;
  // (undocumented)
  neutralPrimary?: string;
  // (undocumented)
  neutralPrimaryAlt?: string;
  // (undocumented)
  neutralPrimaryAltBackground?: string;
  // (undocumented)
  neutralPrimaryAltBackgroundHover?: string;
  // (undocumented)
  neutralPrimaryAltBorder?: string;
  // (undocumented)
  neutralPrimaryAltBorderHover?: string;
  // (undocumented)
  neutralPrimaryAltHover?: string;
  // (undocumented)
  neutralPrimaryBackground?: string;
  // (undocumented)
  neutralPrimaryBackgroundHover?: string;
  // (undocumented)
  neutralPrimaryBorder?: string;
  // (undocumented)
  neutralPrimaryBorderHover?: string;
  // (undocumented)
  neutralPrimaryHover?: string;
  // (undocumented)
  neutralQuaternary?: string;
  // (undocumented)
  neutralQuaternaryAlt?: string;
  // (undocumented)
  neutralQuaternaryAltBackground?: string;
  // (undocumented)
  neutralQuaternaryAltBackgroundHover?: string;
  // (undocumented)
  neutralQuaternaryAltBorder?: string;
  // (undocumented)
  neutralQuaternaryAltBorderHover?: string;
  // (undocumented)
  neutralQuaternaryAltHover?: string;
  // (undocumented)
  neutralQuaternaryBackground?: string;
  // (undocumented)
  neutralQuaternaryBackgroundHover?: string;
  // (undocumented)
  neutralQuaternaryBorder?: string;
  // (undocumented)
  neutralQuaternaryBorderHover?: string;
  // (undocumented)
  neutralQuaternaryHover?: string;
  // (undocumented)
  neutralSecondary?: string;
  // (undocumented)
  neutralSecondaryAlt?: string;
  // (undocumented)
  neutralSecondaryAltBackground?: string;
  // (undocumented)
  neutralSecondaryAltBackgroundHover?: string;
  // (undocumented)
  neutralSecondaryAltBorder?: string;
  // (undocumented)
  neutralSecondaryAltBorderHover?: string;
  // (undocumented)
  neutralSecondaryAltHover?: string;
  // (undocumented)
  neutralSecondaryBackground?: string;
  // (undocumented)
  neutralSecondaryBackgroundHover?: string;
  // (undocumented)
  neutralSecondaryBorder?: string;
  // (undocumented)
  neutralSecondaryBorderHover?: string;
  // (undocumented)
  neutralSecondaryHover?: string;
  // (undocumented)
  neutralTertiary?: string;
  // (undocumented)
  neutralTertiaryAlt?: string;
  // (undocumented)
  neutralTertiaryAltBackground?: string;
  // (undocumented)
  neutralTertiaryAltBackgroundHover?: string;
  // (undocumented)
  neutralTertiaryAltBorder?: string;
  // (undocumented)
  neutralTertiaryAltBorderHover?: string;
  // (undocumented)
  neutralTertiaryAltHover?: string;
  // (undocumented)
  neutralTertiaryBackground?: string;
  // (undocumented)
  neutralTertiaryBackgroundHover?: string;
  // (undocumented)
  neutralTertiaryBorder?: string;
  // (undocumented)
  neutralTertiaryBorderHover?: string;
  // (undocumented)
  neutralTertiaryHover?: string;
  // (undocumented)
  orange?: string;
  // (undocumented)
  orangeBackground?: string;
  // (undocumented)
  orangeBackgroundHover?: string;
  // (undocumented)
  orangeBorder?: string;
  // (undocumented)
  orangeBorderHover?: string;
  // (undocumented)
  orangeHover?: string;
  // (undocumented)
  orangeLight?: string;
  // (undocumented)
  orangeLightBackground?: string;
  // (undocumented)
  orangeLightBackgroundHover?: string;
  // (undocumented)
  orangeLightBorder?: string;
  // (undocumented)
  orangeLightBorderHover?: string;
  // (undocumented)
  orangeLighter?: string;
  // (undocumented)
  orangeLighterBackground?: string;
  // (undocumented)
  orangeLighterBackgroundHover?: string;
  // (undocumented)
  orangeLighterBorder?: string;
  // (undocumented)
  orangeLighterBorderHover?: string;
  // (undocumented)
  orangeLighterHover?: string;
  // (undocumented)
  orangeLightHover?: string;
  // (undocumented)
  purple?: string;
  // (undocumented)
  purpleBackground?: string;
  // (undocumented)
  purpleBackgroundHover?: string;
  // (undocumented)
  purpleBorder?: string;
  // (undocumented)
  purpleBorderHover?: string;
  // (undocumented)
  purpleDark?: string;
  // (undocumented)
  purpleDarkBackground?: string;
  // (undocumented)
  purpleDarkBackgroundHover?: string;
  // (undocumented)
  purpleDarkBorder?: string;
  // (undocumented)
  purpleDarkBorderHover?: string;
  // (undocumented)
  purpleDarkHover?: string;
  // (undocumented)
  purpleHover?: string;
  // (undocumented)
  purpleLight?: string;
  // (undocumented)
  purpleLightBackground?: string;
  // (undocumented)
  purpleLightBackgroundHover?: string;
  // (undocumented)
  purpleLightBorder?: string;
  // (undocumented)
  purpleLightBorderHover?: string;
  // (undocumented)
  purpleLightHover?: string;
  // (undocumented)
  red?: string;
  // (undocumented)
  redBackground?: string;
  // (undocumented)
  redBackgroundHover?: string;
  // (undocumented)
  redBorder?: string;
  // (undocumented)
  redBorderHover?: string;
  // (undocumented)
  redDark?: string;
  // (undocumented)
  redDarkBackground?: string;
  // (undocumented)
  redDarkBackgroundHover?: string;
  // (undocumented)
  redDarkBorder?: string;
  // (undocumented)
  redDarkBorderHover?: string;
  // (undocumented)
  redDarkHover?: string;
  // (undocumented)
  redHover?: string;
  // (undocumented)
  teal?: string;
  // (undocumented)
  tealBackground?: string;
  // (undocumented)
  tealBackgroundHover?: string;
  // (undocumented)
  tealBorder?: string;
  // (undocumented)
  tealBorderHover?: string;
  // (undocumented)
  tealDark?: string;
  // (undocumented)
  tealDarkBackground?: string;
  // (undocumented)
  tealDarkBackgroundHover?: string;
  // (undocumented)
  tealDarkBorder?: string;
  // (undocumented)
  tealDarkBorderHover?: string;
  // (undocumented)
  tealDarkHover?: string;
  // (undocumented)
  tealHover?: string;
  // (undocumented)
  tealLight?: string;
  // (undocumented)
  tealLightBackground?: string;
  // (undocumented)
  tealLightBackgroundHover?: string;
  // (undocumented)
  tealLightBorder?: string;
  // (undocumented)
  tealLightBorderHover?: string;
  // (undocumented)
  tealLightHover?: string;
  // (undocumented)
  themeDark?: string;
  // (undocumented)
  themeDarkAlt?: string;
  // (undocumented)
  themeDarkAltBackground?: string;
  // (undocumented)
  themeDarkAltBackgroundHover?: string;
  // (undocumented)
  themeDarkAltBorder?: string;
  // (undocumented)
  themeDarkAltBorderHover?: string;
  // (undocumented)
  themeDarkAltHover?: string;
  // (undocumented)
  themeDarkBackground?: string;
  // (undocumented)
  themeDarkBackgroundHover?: string;
  // (undocumented)
  themeDarkBorder?: string;
  // (undocumented)
  themeDarkBorderHover?: string;
  // (undocumented)
  themeDarker?: string;
  // (undocumented)
  themeDarkerBackground?: string;
  // (undocumented)
  themeDarkerBackgroundHover?: string;
  // (undocumented)
  themeDarkerBorder?: string;
  // (undocumented)
  themeDarkerBorderHover?: string;
  // (undocumented)
  themeDarkerHover?: string;
  // (undocumented)
  themeDarkHover?: string;
  // (undocumented)
  themeLight?: string;
  // (undocumented)
  themeLightBackground?: string;
  // (undocumented)
  themeLightBackgroundHover?: string;
  // (undocumented)
  themeLightBorder?: string;
  // (undocumented)
  themeLightBorderHover?: string;
  // (undocumented)
  themeLighter?: string;
  // (undocumented)
  themeLighterAlt?: string;
  // (undocumented)
  themeLighterAltBackground?: string;
  // (undocumented)
  themeLighterAltBackgroundHover?: string;
  // (undocumented)
  themeLighterAltBorder?: string;
  // (undocumented)
  themeLighterAltBorderHover?: string;
  // (undocumented)
  themeLighterAltHover?: string;
  // (undocumented)
  themeLighterBackground?: string;
  // (undocumented)
  themeLighterBackgroundHover?: string;
  // (undocumented)
  themeLighterBorder?: string;
  // (undocumented)
  themeLighterBorderHover?: string;
  // (undocumented)
  themeLighterHover?: string;
  // (undocumented)
  themeLightHover?: string;
  // (undocumented)
  themePrimary?: string;
  // (undocumented)
  themePrimaryBackground?: string;
  // (undocumented)
  themePrimaryBackgroundHover?: string;
  // (undocumented)
  themePrimaryBorder?: string;
  // (undocumented)
  themePrimaryBorderHover?: string;
  // (undocumented)
  themePrimaryHover?: string;
  // (undocumented)
  themeSecondary?: string;
  // (undocumented)
  themeSecondaryBackground?: string;
  // (undocumented)
  themeSecondaryBackgroundHover?: string;
  // (undocumented)
  themeSecondaryBorder?: string;
  // (undocumented)
  themeSecondaryBorderHover?: string;
  // (undocumented)
  themeSecondaryHover?: string;
  // (undocumented)
  themeTertiary?: string;
  // (undocumented)
  themeTertiaryBackground?: string;
  // (undocumented)
  themeTertiaryBackgroundHover?: string;
  // (undocumented)
  themeTertiaryBorder?: string;
  // (undocumented)
  themeTertiaryBorderHover?: string;
  // (undocumented)
  themeTertiaryHover?: string;
  // (undocumented)
  white?: string;
  // (undocumented)
  whiteBackground?: string;
  // (undocumented)
  whiteBackgroundHover?: string;
  // (undocumented)
  whiteBorder?: string;
  // (undocumented)
  whiteBorderHover?: string;
  // (undocumented)
  whiteHover?: string;
  // (undocumented)
  whiteTranslucent40?: string;
  // (undocumented)
  whiteTranslucent40Background?: string;
  // (undocumented)
  whiteTranslucent40BackgroundHover?: string;
  // (undocumented)
  whiteTranslucent40Border?: string;
  // (undocumented)
  whiteTranslucent40BorderHover?: string;
  // (undocumented)
  whiteTranslucent40Hover?: string;
  // (undocumented)
  yellow?: string;
  // (undocumented)
  yellowBackground?: string;
  // (undocumented)
  yellowBackgroundHover?: string;
  // (undocumented)
  yellowBorder?: string;
  // (undocumented)
  yellowBorderHover?: string;
  // (undocumented)
  yellowHover?: string;
  // (undocumented)
  yellowLight?: string;
  // (undocumented)
  yellowLightBackground?: string;
  // (undocumented)
  yellowLightBackgroundHover?: string;
  // (undocumented)
  yellowLightBorder?: string;
  // (undocumented)
  yellowLightBorderHover?: string;
  // (undocumented)
  yellowLightHover?: string;
}

// (undocumented)
module IconCodes {
  aadLogo: string = '\uED68';

  accept: string = '\uE8FB';

  accessLogo: string = '\uED69';

  accounts: string = '\uE910';

  add: string = '\uE710';

  addEvent: string = '\uEEB5';

  addFavorite: string = '\uF0C8';

  addFavoriteFill: string = '\uF0C9';

  addFriend: string = '\uE8FA';

  addGroup: string = '\uEE3D';

  addOnlineMeeting: string = '\uED8E';

  addPhone: string = '\uED96';

  addTo: string = '\uECC8';

  admin: string = '\uE7EF';

  adminALogo: string = '\uED6A';

  adminCLogo: string = '\uED6B';

  adminDLogo: string = '\uED6C';

  adminELogo: string = '\uED6D';

  adminLLogo: string = '\uED6E';

  adminMLogo: string = '\uED6F';

  adminOLogo: string = '\uED70';

  adminPLogo: string = '\uED71';

  adminSLogo: string = '\uED72';

  adminYLogo: string = '\uED73';

  airplane: string = '\uE709';

  airTickets: string = '\uEF7A';

  alarmClock: string = '\uE919';

  album: string = '\uE7AB';

  albumRemove: string = '\uEC62';

  alchemyLogo: string = '\uED74';

  alignCenter: string = '\uE8E3';

  alignLeft: string = '\uE8E4';

  alignRight: string = '\uE8E2';

  androidLogo: string = '\uEF8B';

  annotation: string = '\uE924';

  appForOfficeLogo: string = '\uEEC7';

  appIconDefault: string = '\uECAA';

  arrivals: string = '\uEB34';

  arrowDownRight8: string = '\uEED5';

  arrowDownRightMirrored8: string = '\uEEF0';

  arrowUpRight8: string = '\uEED4';

  arrowUpRightMirrored8: string = '\uEEEF';

  articles: string = '\uEAC1';

  ascending: string = '\uEDC0';

  assetLibrary: string = '\uEEB6';

  asterisk: string = '\uEA38';

  atpLogo: string = '\uEF85';

  attach: string = '\uE723';

  australianRules: string = '\uEE70';

  autoEnhanceOff: string = '\uE78E';

  autoEnhanceOn: string = '\uE78D';

  autoRacing: string = '\uEB24';

  awayStatus: string = '\uEE6A';

  azureLogo: string = '\uEB6A';

  back: string = '\uE72B';

  backToWindow: string = '\uE73F';

  badge: string = '\uEC1B';

  balloons: string = '\uED7E';

  barChart4: string = '\uEAE7';

  barChartHorizontal: string = '\uE9EB';

  baseball: string = '\uEB20';

  bidiLtr: string = '\uE9AA';

  bidiRtl: string = '\uE9AB';

  bingLogo: string = '\uEB6B';

  blockContact: string = '\uE8F8';

  blocked: string = '\uE733';

  blocked2: string = '\uECE4';

  blowingSnow: string = '\uE9C9';

  boards: string = '\uEF68';

  bold: string = '\uE8DD';

  bookingsLogo: string = '\uEDC7';

  bookmarks: string = '\uE8A4';

  bookmarksMirrored: string = '\uEA41';

  boxLogo: string = '\uED75';

  branchFork: string = '\uF173';

  breadcrumb: string = '\uEF8C';

  brightness: string = '\uE706';

  broom: string = '\uEA99';

  bufferTimeAfter: string = '\uF0D0';

  bufferTimeBefore: string = '\uF0CF';

  bufferTimeBoth: string = '\uF0D1';

  bulletedList: string = '\uE8FD';

  bulletedListMirrored: string = '\uEA42';

  busSolid: string = '\uEB47';

  cafe: string = '\uEC32';

  cake: string = '\uECA4';

  calculatorAddition: string = '\uE948';

  calculatorSubtract: string = '\uE949';

  calendar: string = '\uE787';

  calendarAgenda: string = '\uEE9A';

  calendarDay: string = '\uE8BF';

  calendarMirrored: string = '\uED28';

  calendarReply: string = '\uE8F5';

  calendarWeek: string = '\uE8C0';

  calendarWorkWeek: string = '\uEF51';

  caloriesAdd: string = '\uF172';

  camera: string = '\uE722';

  cancel: string = '\uE711';

  car: string = '\uE804';

  caretBottomLeftSolid8: string = '\uF121';

  caretBottomRightSolid8: string = '\uF122';

  caretDown8: string = '\uEDD8';

  caretDownSolid8: string = '\uEDDC';

  caretHollow: string = '\uE817';

  caretHollowMirrored: string = '\uEA45';

  caretLeft8: string = '\uEDD5';

  caretLeftSolid8: string = '\uEDD9';

  caretRight8: string = '\uEDD6';

  caretRightSolid8: string = '\uEDDA';

  caretSolid: string = '\uE818';

  caretSolidMirrored: string = '\uEA46';

  caretTopLeftSolid8: string = '\uEF54';

  caretTopRightSolid8: string = '\uEF55';

  caretUp8: string = '\uEDD7';

  caretUpSolid8: string = '\uEDDB';

  cat: string = '\uED7F';

  cellPhone: string = '\uE8EA';

  certificate: string = '\uEB95';

  chart: string = '\uE999';

  chat: string = '\uE901';

  chatInviteFriend: string = '\uECFE';

  checkbox: string = '\uE739';

  checkboxComposite: string = '\uE73A';

  checkboxIndeterminate: string = '\uE73C';

  checkList: string = '\uE9D5';

  checkMark: string = '\uE73E';

  chevronDown: string = '\uE70D';

  chevronDownMed: string = '\uE972';

  chevronDownSmall: string = '\uE96E';

  chevronLeft: string = '\uE76B';

  chevronLeftMed: string = '\uE973';

  chevronLeftSmall: string = '\uE96F';

  chevronRight: string = '\uE76C';

  chevronRightMed: string = '\uE974';

  chevronRightSmall: string = '\uE970';

  chevronUp: string = '\uE70E';

  chevronUpMed: string = '\uE971';

  chevronUpSmall: string = '\uE96D';

  chromeBack: string = '\uE830';

  chromeBackMirrored: string = '\uEA47';

  chromeClose: string = '\uE8BB';

  chromeMinimize: string = '\uE921';

  circleFill: string = '\uEA3B';

  circleHalfFull: string = '\uED9E';

  circlePlus: string = '\uEAEE';

  circleRing: string = '\uEA3A';

  classNotebookLogo: string = '\uEDC8';

  classroomLogo: string = '\uEF75';

  clear: string = '\uE894';

  clearFilter: string = '\uEF8F';

  clearFormatting: string = '\uEDDD';

  clearNight: string = '\uE9C2';

  clock: string = '\uE917';

  closedCaption: string = '\uEF84';

  closePane: string = '\uE89F';

  closePaneMirrored: string = '\uEA49';

  cloudAdd: string = '\uECA9';

  cloudDownload: string = '\uEBD3';

  cloudUpload: string = '\uEC8E';

  cloudWeather: string = '\uE9BE';

  cloudy: string = '\uE9BF';

  cocktails: string = '\uEA9D';

  code: string = '\uE943';

  coffee: string = '\uEAEF';

  collabsDbLogo: string = '\uEDC9';

  collapseMenu: string = '\uEF66';

  collegeFootball: string = '\uEB26';

  collegeHoops: string = '\uEB25';

  color: string = '\uE790';

  combine: string = '\uEDBB';

  compassNw: string = '\uE942';

  completed: string = '\uE930';

  completedSolid: string = '\uEC61';

  contact: string = '\uE77B';

  contactCard: string = '\uEEBD';

  contactInfo: string = '\uE779';

  container: string = '\uE7B8';

  contrast: string = '\uE7A1';

  copy: string = '\uE8C8';

  cotton: string = '\uEAF3';

  cricket: string = '\uEB1E';

  css: string = '\uEBEF';

  customList: string = '\uEEBE';

  customListMirrored: string = '\uEEBF';

  cycling: string = '\uEAC7';

  dataConnectionLibrary: string = '\uEEB7';

  dateTime: string = '\uEC92';

  dateTime2: string = '\uEA17';

  dateTimeMirrored: string = '\uEE93';

  decreaseIndentLegacy: string = '\uE290';

  delveAnalytics: string = '\uEEEE';

  delveAnalyticsLogo: string = '\uEDCA';

  delveLogo: string = '\uED76';

  descending: string = '\uEDC1';

  design: string = '\uEB3C';

  developerTools: string = '\uEC7A';

  devices3: string = '\uEA6C';

  devices4: string = '\uEB66';

  dialpad: string = '\uE75F';

  dictionary: string = '\uE82D';

  dietPlanNotebook: string = '\uEAC8';

  disableUpdates: string = '\uE8D8';

  dislike: string = '\uE8E0';

  dockLeft: string = '\uE90C';

  dockLeftMirrored: string = '\uEA4C';

  dockRight: string = '\uE90D';

  docLibrary: string = '\uEEB8';

  docsLogo: string = '\uEDCB';

  document: string = '\uE8A5';

  documentation: string = '\uEC17';

  documentReply: string = '\uEF57';

  documentSearch: string = '\uEF6C';

  documentSet: string = '\uEED6';

  door: string = '\uEB75';

  doubleBookmark: string = '\uEB8F';

  doubleChevronDown: string = '\uEE04';

  doubleChevronDown12: string = '\uEE97';

  doubleChevronLeft: string = '\uEDBE';

  doubleChevronLeft12: string = '\uEE98';

  doubleChevronLeftMed: string = '\uE991';

  doubleChevronLeftMedMirrored: string = '\uEA4D';

  doubleChevronRight: string = '\uEDBF';

  doubleChevronRight12: string = '\uEE99';

  doubleChevronUp: string = '\uEDBD';

  doubleChevronUp12: string = '\uEE96';

  down: string = '\uE74B';

  download: string = '\uE896';

  drm: string = '\uECA8';

  drop: string = '\uEB42';

  dropboxLogo: string = '\uED77';

  dropdown: string = '\uEDC5';

  duststorm: string = '\uE9CD';

  dynamics365Logo: string = '\uEDCC';

  dynamicSmbLogo: string = '\uEDCD';

  eatDrink: string = '\uE807';

  edgeLogo: string = '\uEC60';

  edit: string = '\uE70F';

  editMail: string = '\uEF61';

  editMirrored: string = '\uEB7E';

  editNote: string = '\uED9D';

  editPhoto: string = '\uEF77';

  editStyle: string = '\uEF60';

  embed: string = '\uECCE';

  emi: string = '\uE731';

  emoji: string = '\uE899';

  emoji2: string = '\uE76E';

  emojiDisappointed: string = '\uEA88';

  emojiNeutral: string = '\uEA87';

  emptyRecycleBin: string = '\uEF88';

  equalizer: string = '\uE9E9';

  eraseTool: string = '\uE75C';

  error: string = '\uE783';

  errorBadge: string = '\uEA39';

  event: string = '\uECA3';

  eventInfo: string = '\uED8B';

  excelDocument: string = '\uEF73';

  excelLogo: string = '\uEC28';

  exchangeLogo: string = '\uED78';

  expandMenu: string = '\uEF67';

  fabricAssetLibrary: string = '\uF09C';

  fabricDataConnectionLibrary: string = '\uF09D';

  fabricDocLibrary: string = '\uF09E';

  fabricFolder: string = '\uF0A9';

  fabricFolderFill: string = '\uF0AA';

  fabricFolderSearch: string = '\uF0A4';

  fabricFormLibrary: string = '\uF09F';

  fabricFormLibraryMirrored: string = '\uF0A0';

  fabricMovetoFolder: string = '\uF0A5';

  fabricNewFolder: string = '\uF0AB';

  fabricOpenFolderHorizontal: string = '\uF0A8';

  fabricPictureLibrary: string = '\uF0AC';

  fabricPublicFolder: string = '\uF0A3';

  fabricReportLibrary: string = '\uF0A1';

  fabricReportLibraryMirrored: string = '\uF0A2';

  fabricSyncFolder: string = '\uF0A7';

  fabricUnsyncFolder: string = '\uF0A6';

  facebookLogo: string = '\uECB3';

  family: string = '\uEBDA';

  fangBody: string = '\uECEB';

  favoriteList: string = '\uE728';

  favoriteStar: string = '\uE734';

  favoriteStarFill: string = '\uE735';

  fax: string = '\uEF5C';

  ferry: string = '\uE7E3';

  ferrySolid: string = '\uEB48';

  filter: string = '\uE71C';

  filters: string = '\uE795';

  financial: string = '\uE7BB';

  fingerprint: string = '\uE928';

  flag: string = '\uE7C1';

  flickDown: string = '\uE935';

  flickLeft: string = '\uE937';

  flickRight: string = '\uE938';

  flickUp: string = '\uE936';

  flow: string = '\uEF90';

  fog: string = '\uE9CB';

  folder: string = '\uE8B7';

  folderFill: string = '\uE8D5';

  folderHorizontal: string = '\uF12B';

  folderOpen: string = '\uE838';

  folderSearch: string = '\uEF65';

  font: string = '\uE8D2';

  fontColor: string = '\uE8D3';

  fontDecrease: string = '\uE8E7';

  fontIncrease: string = '\uE8E8';

  fontSize: string = '\uE8E9';

  formLibrary: string = '\uEEB9';

  formLibraryMirrored: string = '\uEEBA';

  forward: string = '\uE72A';

  forwardEvent: string = '\uED8C';

  freezing: string = '\uE9EF';

  frigid: string = '\uE9CA';

  fullCircleMask: string = '\uE91F';

  fullScreen: string = '\uE740';

  generate: string = '\uE9DA';

  giftbox: string = '\uEC1F';

  giftCard: string = '\uEB8E';

  glasses: string = '\uEA16';

  glimmer: string = '\uECF4';

  globalNavButton: string = '\uE700';

  globe: string = '\uE774';

  globeFavorite: string = '\uEF53';

  golf: string = '\uEB1F';

  googleDriveLogo: string = '\uEE0B';

  gotoToday: string = '\uE8D1';

  gripperTool: string = '\uE75E';

  group: string = '\uE902';

  groupedAscending: string = '\uEE67';

  groupedDescending: string = '\uEE66';

  groupedList: string = '\uEF74';

  hailDay: string = '\uEA00';

  hailNight: string = '\uEA13';

  handwriting: string = '\uE929';

  header1: string = '\uEA19';

  header2: string = '\uEF36';

  header3: string = '\uEF37';

  header4: string = '\uEF38';

  headset: string = '\uE95B';

  health: string = '\uE95E';

  heart: string = '\uEB51';

  heartFill: string = '\uEB52';

  help: string = '\uE897';

  helpMirrored: string = '\uEA51';

  hide: string = '\uED1A';

  hide2: string = '\uEF89';

  history: string = '\uE81C';

  home: string = '\uE80F';

  homeSolid: string = '\uEA8A';

  hospital: string = '\uE91D';

  hotel: string = '\uE824';

  important: string = '\uE8C9';

  inboxCheck: string = '\uEF64';

  incidentTriangle: string = '\uE814';

  increaseIndentLegacy: string = '\uE291';

  info: string = '\uE946';

  info2: string = '\uEA1F';

  insertTextBox: string = '\uEC7D';

  internetSharing: string = '\uE704';

  iOsAppStoreLogo: string = '\uEF8A';

  issueTracking: string = '\uEEC0';

  issueTrackingMirrored: string = '\uEEC1';

  italic: string = '\uE8DB';

  joinOnlineMeeting: string = '\uED8F';

  js: string = '\uEBF0';

  label: string = '\uE932';

  landscapeOrientation: string = '\uEF6B';

  laptopSelected: string = '\uEC76';

  largeGrid: string = '\uEECB';

  library: string = '\uE8F1';

  lifesaver: string = '\uEF62';

  lifesaverLock: string = '\uEF63';

  light: string = '\uE793';

  lightbulb: string = '\uEA80';

  lightningBolt: string = '\uE945';

  like: string = '\uE8E1';

  link: string = '\uE71B';

  list: string = '\uEA37';

  listMirrored: string = '\uEA55';

  location: string = '\uE81D';

  locationCircle: string = '\uE80E';

  locationDot: string = '\uE827';

  locationFill: string = '\uE920';

  lock: string = '\uE72E';

  lowerBrightness: string = '\uEC8A';

  lyncLogo: string = '\uED79';

  mail: string = '\uE715';

  mailAlert: string = '\uED80';

  mailCheck: string = '\uED81';

  mailFill: string = '\uE8A8';

  mailForward: string = '\uE89C';

  mailForwardMirrored: string = '\uEA56';

  mailLowImportance: string = '\uED82';

  mailPause: string = '\uED83';

  mailRepeat: string = '\uED84';

  mailReply: string = '\uE8CA';

  mailReplyAll: string = '\uE8C2';

  mailReplyAllMirrored: string = '\uEA58';

  mailReplyMirrored: string = '\uEA57';

  mapDirections: string = '\uE816';

  mapPin: string = '\uE707';

  market: string = '\uEAFC';

  marketDown: string = '\uEF42';

  megaphone: string = '\uE789';

  memo: string = '\uE77C';

  merge: string = '\uE7D5';

  message: string = '\uE8BD';

  messageFill: string = '\uEC70';

  microphone: string = '\uE720';

  microsoftStaffhubLogo: string = '\uF130';

  miniLink: string = '\uE732';

  mobileSelected: string = '\uEC75';

  money: string = '\uEAFD';

  more: string = '\uE712';

  moreSports: string = '\uEB22';

  move: string = '\uE7C2';

  moveToFolder: string = '\uE8DE';

  msnLogo: string = '\uEB6C';

  multiSelect: string = '\uE762';

  multiSelectMirrored: string = '\uEA98';

  musicInCollection: string = '\uE940';

  musicInCollectionFill: string = '\uEA36';

  musicNote: string = '\uEC4F';

  nav2DMapView: string = '\uE800';

  newFolder: string = '\uE8F4';

  news: string = '\uE900';

  noteForward: string = '\uED99';

  notePinned: string = '\uED9A';

  noteReply: string = '\uED98';

  numberedList: string = '\uEA1C';

  numberField: string = '\uEDC4';

  officeAssistantLogo: string = '\uEDCE';

  officeFormLogo: string = '\uEF86';

  officeLogo: string = '\uEB6E';

  officeStoreLogo: string = '\uEDCF';

  officeVideoLogo: string = '\uED7A';

  offlineOneDriveParachute: string = '\uEEC8';

  offlineOneDriveParachuteDisabled: string = '\uEEC9';

  oneDrive: string = '\uE941';

  oneDriveAdd: string = '\uEF32';

  oneNoteEduLogo: string = '\uEDD0';

  oneNoteLogo: string = '\uEC0D';

  openFile: string = '\uE8E5';

  openFolderHorizontal: string = '\uED25';

  openInNewWindow: string = '\uE8A7';

  openPane: string = '\uE8A0';

  openPaneMirrored: string = '\uEA5B';

  org: string = '\uECA6';

  outlookLogo: string = '\uEB6D';

  outOfOffice: string = '\uED34';

  page: string = '\uE7C3';

  pageAdd: string = '\uEA1A';

  pageCheckedin: string = '\uF104';

  pageCheckedOut: string = '\uF02C';

  pageLeft: string = '\uE760';

  pageRight: string = '\uE761';

  pageSolid: string = '\uE729';

  panoIndicator: string = '\uE7B0';

  paratureLogo: string = '\uED7B';

  partlyCloudyDay: string = '\uE9C0';

  partlyCloudyNight: string = '\uE9C1';

  partyLeader: string = '\uECA7';

  pause: string = '\uE769';

  paymentCard: string = '\uE8C7';

  pc1: string = '\uE977';

  pdf: string = '\uEA90';

  pencilReply: string = '\uEF7B';

  people: string = '\uE716';

  peopleAdd: string = '\uEA15';

  peopleAlert: string = '\uED93';

  peopleBlock: string = '\uED91';

  peoplePause: string = '\uED94';

  peopleRepeat: string = '\uED92';

  permissions: string = '\uE8D7';

  phone: string = '\uE717';

  photo2: string = '\uEB9F';

  photo2Add: string = '\uECAB';

  photo2Remove: string = '\uECAC';

  photoCollection: string = '\uE7AA';

  picture: string = '\uE8B9';

  pictureLibrary: string = '\uEEC2';

  pieDouble: string = '\uEB04';

  pill: string = '\uEACB';

  pin: string = '\uE718';

  pinned: string = '\uE840';

  pinnedFill: string = '\uE842';

  planner: string = '\uEDD1';

  play: string = '\uE768';

  playerSettings: string = '\uEF58';

  poi: string = '\uECAF';

  postUpdate: string = '\uE8F3';

  powerApps: string = '\uEDD2';

  powerApps2Logo: string = '\uF092';

  powerAppsLogo: string = '\uF091';

  powerBiLogo: string = '\uEA1E';

  powerPointDocument: string = '\uEF72';

  powerPointLogo: string = '\uEC2A';

  precipitation: string = '\uE9CF';

  presenceChickletVideo: string = '\uE979';

  preview: string = '\uE8FF';

  previewLink: string = '\uE8A1';

  print: string = '\uE749';

  printfaxPrinterFile: string = '\uE956';

  product: string = '\uECDC';

  proFootball: string = '\uEB27';

  proHockey: string = '\uEB28';

  projectLogo: string = '\uEDD4';

  protectedDocument: string = '\uE8A6';

  publicCalendar: string = '\uEF6D';

  publicContactCard: string = '\uEF6E';

  publicEmail: string = '\uEF6F';

  publicFolder: string = '\uEF70';

  puzzle: string = '\uEA86';

  questionnaire: string = '\uEE19';

  questionnaireMirrored: string = '\uEE4B';

  quickNote: string = '\uE70B';

  radioBtnOn: string = '\uECCB';

  radioBullet: string = '\uE915';

  rain: string = '\uE9C4';

  rainShowersDay: string = '\uE9C3';

  rainShowersNight: string = '\uEA0F';

  rainSnow: string = '\uE9C7';

  read: string = '\uE8C3';

  readingMode: string = '\uE736';

  receiptCheck: string = '\uEF5B';

  receiptForward: string = '\uEF59';

  receiptReply: string = '\uEF5A';

  recent: string = '\uE823';

  recurringEvent: string = '\uEF5D';

  recurringTask: string = '\uEDB2';

  recycleBin: string = '\uEF87';

  redEye: string = '\uE7B3';

  redo: string = '\uE7A6';

  refresh: string = '\uE72C';

  reminderGroup: string = '\uEBF8';

  remove: string = '\uE738';

  removeEvent: string = '\uED8A';

  removeFilter: string = '\uEB08';

  removeLink: string = '\uED90';

  removeOccurrence: string = '\uED9B';

  rename: string = '\uE8AC';

  reopenPages: string = '\uED50';

  repair: string = '\uE90F';

  reply: string = '\uE97A';

  replyAll: string = '\uEE0A';

  replyAllAlt: string = '\uEF5F';

  replyAllMirrored: string = '\uEE36';

  replyAlt: string = '\uEF5E';

  replyMirrored: string = '\uEE35';

  reportLibrary: string = '\uEEBB';

  reportLibraryMirrored: string = '\uEEBC';

  returnToSession: string = '\uED24';

  revToggleKey: string = '\uE845';

  ribbon: string = '\uE9D1';

  rightDoubleQuote: string = '\uE9B1';

  ringer: string = '\uEA8F';

  room: string = '\uED9F';

  rotate: string = '\uE7AD';

  rugby: string = '\uEB2D';

  running: string = '\uEADA';

  sad: string = '\uE757';

  save: string = '\uE74E';

  saveAs: string = '\uE792';

  search: string = '\uE721';

  section: string = '\uEC0C';

  sections: string = '\uEF76';

  securityGroup: string = '\uED85';

  send: string = '\uE724';

  sendMirrored: string = '\uEA63';

  setAction: string = '\uF071';

  settings: string = '\uE713';

  share: string = '\uE72D';

  shareiOs: string = '\uEF79';

  sharepointLogo: string = '\uED18';

  shield: string = '\uEA18';

  shop: string = '\uE719';

  shoppingCart: string = '\uE7BF';

  showResults: string = '\uE8BC';

  showResultsMirrored: string = '\uEA65';

  sidePanel: string = '\uEF52';

  singleBookmark: string = '\uEDFF';

  sipMove: string = '\uE759';

  skypeCheck: string = '\uEF80';

  skypeCircleCheck: string = '\uEF7D';

  skypeCircleClock: string = '\uEF7E';

  skypeCircleMinus: string = '\uEF7F';

  skypeClock: string = '\uEF81';

  skypeLogo: string = '\uEB6F';

  skypeMessage: string = '\uEF83';

  skypeMinus: string = '\uEF82';

  sliderThumb: string = '\uEC13';

  snow: string = '\uEB46';

  snowShowerDay: string = '\uE9FD';

  snowShowerNight: string = '\uEA11';

  soccer: string = '\uEB21';

  socialListeningLogo: string = '\uED7C';

  sort: string = '\uE8CB';

  sortDown: string = '\uEE69';

  sortLines: string = '\uE9D0';

  sortUp: string = '\uEE68';

  speakers: string = '\uE7F5';

  speedHigh: string = '\uEC4A';

  split: string = '\uEDBC';

  squalls: string = '\uE9CC';

  stackIndicator: string = '\uE7FF';

  starburst: string = '\uEF78';

  statusErrorFull: string = '\uEB90';

  statusTriangle: string = '\uEA82';

  stockDown: string = '\uEB0F';

  stockUp: string = '\uEB11';

  stopwatch: string = '\uE916';

  storeLogo: string = '\uEA96';

  storeLogoMed: string = '\uEA04';

  strikethrough: string = '\uEDE0';

  subscribe: string = '\uEDA1';

  subscript: string = '\uEDDF';

  suitcase: string = '\uEDD3';

  sunAdd: string = '\uEF69';

  sunny: string = '\uE9BD';

  sunQuestionMark: string = '\uEF6A';

  superscript: string = '\uEDDE';

  swayLogo: string = '\uED29';

  switcher: string = '\uE8AB';

  switcherStartEnd: string = '\uE810';

  sync: string = '\uE895';

  syncFolder: string = '\uE8F7';

  syncToPc: string = '\uEE6E';

  system: string = '\uE770';

  tab: string = '\uE7E9';

  table: string = '\uED86';

  tablet: string = '\uE70A';

  tabletSelected: string = '\uEC74';

  tag: string = '\uE8EC';

  taskManager: string = '\uEDB7';

  taskManagerMirrored: string = '\uEDB8';

  teamwork: string = '\uEA12';

  temporaryUser: string = '\uEE58';

  tennis: string = '\uEB33';

  textBox: string = '\uEDC2';

  textField: string = '\uEDC3';

  thumbnailView: string = '\uE7B6';

  thumbnailViewMirrored: string = '\uEA67';

  thunderstorms: string = '\uE9C6';

  ticket: string = '\uEB54';

  tiles: string = '\uECA5';

  tiles2: string = '\uEF7C';

  timeline: string = '\uED9C';

  timer: string = '\uE91E';

  toggleBorder: string = '\uEC12';

  toggleFilled: string = '\uEC11';

  toggleThumb: string = '\uEC14';

  touch: string = '\uE815';

  touchPointer: string = '\uE7C9';

  train: string = '\uE7C0';

  trainSolid: string = '\uEB4D';

  transferCall: string = '\uED95';

  trash: string = '\uE74D';

  triangleDown12: string = '\uEED1';

  triangleLeft12: string = '\uEED2';

  triangleRight12: string = '\uEED3';

  triangleSolidDown12: string = '\uEECD';

  triangleSolidLeft12: string = '\uEECE';

  triangleSolidRight12: string = '\uEECF';

  triangleSolidUp12: string = '\uEECC';

  triangleUp12: string = '\uEED0';

  trophy: string = '\uED3F';

  turnRight: string = '\uE7DB';

  tvMonitor: string = '\uE7F4';

  tvMonitorSelected: string = '\uEC77';

  underline: string = '\uE8DC';

  undo: string = '\uE7A7';

  unfavorite: string = '\uE8D9';

  unknownCall: string = '\uED97';

  unlock: string = '\uE785';

  unpin: string = '\uE77A';

  unsubscribe: string = '\uEDA0';

  unsyncFolder: string = '\uE8F6';

  up: string = '\uE74A';

  upload: string = '\uE898';

  video: string = '\uE714';

  videoSolid: string = '\uEA0C';

  view: string = '\uE890';

  viewAll: string = '\uE8A9';

  viewAll2: string = '\uEF56';

  visioLogo: string = '\uED7D';

  voicemailForward: string = '\uED87';

  voicemailReply: string = '\uED88';

  volume0: string = '\uE992';

  volume1: string = '\uE993';

  volume2: string = '\uE994';

  volume3: string = '\uE995';

  volumeDisabled: string = '\uEA85';

  waffle: string = '\uED89';

  warning: string = '\uE7BA';

  website: string = '\uEB41';

  weights: string = '\uEADB';

  windDirection: string = '\uEBE6';

  windowsLogo: string = '\uE782';

  wipePhone: string = '\uED8D';

  wordDocument: string = '\uEF71';

  wordLogo: string = '\uEC29';

  work: string = '\uE821';

  workFlow: string = '\uEA01';

  worldClock: string = '\uE918';

  yammerLogo: string = '\uED19';

  zoom: string = '\uE71E';

  zoomIn: string = '\uE8A3';

  zoomOut: string = '\uE71F';

}

// (undocumented)
interface IFontClassNames extends IClassNames<IFontStyles> {
}

interface IFontStyles {
  // (undocumented)
  icon?: IRawStyle;
  // (undocumented)
  large?: IRawStyle;
  // (undocumented)
  medium?: IRawStyle;
  // (undocumented)
  mediumPlus?: IRawStyle;
  // (undocumented)
  mega?: IRawStyle;
  // (undocumented)
  small?: IRawStyle;
  // (undocumented)
  smallPlus?: IRawStyle;
  // (undocumented)
  superLarge?: IRawStyle;
  // (undocumented)
  tiny?: IRawStyle;
  // (undocumented)
  xLarge?: IRawStyle;
  // (undocumented)
  xSmall?: IRawStyle;
  // (undocumented)
  xxLarge?: IRawStyle;
}

// (undocumented)
interface IIconClassNames extends IClassNames<typeof IconCodes> {
}

export function insertGlobal(selector: string, style: IRawStyle): void;

interface IPalette {
  black?: string;
  blackTranslucent40?: string;
  blue?: string;
  blueDark?: string;
  blueLight?: string;
  blueMid?: string;
  green?: string;
  greenDark?: string;
  greenLight?: string;
  magenta?: string;
  magentaDark?: string;
  magentaLight?: string;
  neutralDark?: string;
  neutralLight?: string;
  neutralLighter?: string;
  neutralLighterAlt?: string;
  neutralPrimary?: string;
  neutralPrimaryAlt?: string;
  neutralQuaternary?: string;
  neutralQuaternaryAlt?: string;
  neutralSecondary?: string;
  neutralSecondaryAlt?: string;
  neutralTertiary?: string;
  neutralTertiaryAlt?: string;
  orange?: string;
  orangeLight?: string;
  orangeLighter?: string;
  purple?: string;
  purpleDark?: string;
  purpleLight?: string;
  red?: string;
  redDark?: string;
  teal?: string;
  tealDark?: string;
  tealLight?: string;
  themeDark?: string;
  themeDarkAlt?: string;
  themeDarker?: string;
  themeLight?: string;
  themeLighter?: string;
  themeLighterAlt?: string;
  themePrimary?: string;
  themeSecondary?: string;
  themeTertiary?: string;
  white?: string;
  yellow?: string;
  yellowLight?: string;
}

interface IProcessedStyle {
  toString: () => string;
}

// (undocumented)
interface IRawStyle {
  // (undocumented)
  [ key: string ]: string | number | IRawStyle;
}

// (undocumented)
interface ITheme {
  // (undocumented)
  fonts?: IFontStyles;
  // (undocumented)
  palette?: IPalette;
}

export function keyframes(timeline: Glamor.TimeLine): string;

export function loadTheme(theme: ITheme): void;

// (undocumented)
export function mergeStyles(...args: (IStyle | IRawStyle)[]): IStyle;

// (undocumented)
export function mergeStyleSets < T >(...args: T[]): T;

export function parent(selector: string, style: IRawStyle): IProcessedStyle;

// WARNING: Unsupported export: AnimationClassNames
// WARNING: Unsupported export: FontClassNames
// WARNING: Unsupported export: IconClassNames
// WARNING: Unsupported export: ColorClassNames
// WARNING: Unsupported export: AnimationStyles
// WARNING: Unsupported export: DefaultPalette
// WARNING: Unsupported export: DefaultFontStyles
// WARNING: Unsupported export: IClassNames
// WARNING: Unsupported export: IStyle
// (No packageDescription for this package)
