export function after(style: IRawStyle): IProcessedStyle;

export function before(style: IRawStyle): IProcessedStyle;

export function fontFace(font: Glamor.FontProperties): string;

// (undocumented)
export function getClassNames < T >(styles: T): IClassNames<T>;

// (undocumented)
export function getFocusRule(theme: ITheme,
  inset: string = '0',
  color: string = theme.palette.neutralSecondary,
  position: string = 'absolute'): IStyle;

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
  // (undocumented)
  aadLogo: string = '\uED68';

  // (undocumented)
  accept: string = '\uE8FB';

  // (undocumented)
  accessLogo: string = '\uED69';

  // (undocumented)
  accounts: string = '\uE910';

  // (undocumented)
  add: string = '\uE710';

  // (undocumented)
  addEvent: string = '\uEEB5';

  // (undocumented)
  addFavorite: string = '\uF0C8';

  // (undocumented)
  addFavoriteFill: string = '\uF0C9';

  // (undocumented)
  addFriend: string = '\uE8FA';

  // (undocumented)
  addGroup: string = '\uEE3D';

  // (undocumented)
  addOnlineMeeting: string = '\uED8E';

  // (undocumented)
  addPhone: string = '\uED96';

  // (undocumented)
  addTo: string = '\uECC8';

  // (undocumented)
  admin: string = '\uE7EF';

  // (undocumented)
  adminALogo: string = '\uED6A';

  // (undocumented)
  adminCLogo: string = '\uED6B';

  // (undocumented)
  adminDLogo: string = '\uED6C';

  // (undocumented)
  adminELogo: string = '\uED6D';

  // (undocumented)
  adminLLogo: string = '\uED6E';

  // (undocumented)
  adminMLogo: string = '\uED6F';

  // (undocumented)
  adminOLogo: string = '\uED70';

  // (undocumented)
  adminPLogo: string = '\uED71';

  // (undocumented)
  adminSLogo: string = '\uED72';

  // (undocumented)
  adminYLogo: string = '\uED73';

  // (undocumented)
  airplane: string = '\uE709';

  // (undocumented)
  airTickets: string = '\uEF7A';

  // (undocumented)
  alarmClock: string = '\uE919';

  // (undocumented)
  album: string = '\uE7AB';

  // (undocumented)
  albumRemove: string = '\uEC62';

  // (undocumented)
  alchemyLogo: string = '\uED74';

  // (undocumented)
  alignCenter: string = '\uE8E3';

  // (undocumented)
  alignLeft: string = '\uE8E4';

  // (undocumented)
  alignRight: string = '\uE8E2';

  // (undocumented)
  androidLogo: string = '\uEF8B';

  // (undocumented)
  annotation: string = '\uE924';

  // (undocumented)
  appForOfficeLogo: string = '\uEEC7';

  // (undocumented)
  appIconDefault: string = '\uECAA';

  // (undocumented)
  arrivals: string = '\uEB34';

  // (undocumented)
  arrowDownRight8: string = '\uEED5';

  // (undocumented)
  arrowDownRightMirrored8: string = '\uEEF0';

  // (undocumented)
  arrowUpRight8: string = '\uEED4';

  // (undocumented)
  arrowUpRightMirrored8: string = '\uEEEF';

  // (undocumented)
  articles: string = '\uEAC1';

  // (undocumented)
  ascending: string = '\uEDC0';

  // (undocumented)
  assetLibrary: string = '\uEEB6';

  // (undocumented)
  asterisk: string = '\uEA38';

  // (undocumented)
  atpLogo: string = '\uEF85';

  // (undocumented)
  attach: string = '\uE723';

  // (undocumented)
  australianRules: string = '\uEE70';

  // (undocumented)
  autoEnhanceOff: string = '\uE78E';

  // (undocumented)
  autoEnhanceOn: string = '\uE78D';

  // (undocumented)
  autoRacing: string = '\uEB24';

  // (undocumented)
  awayStatus: string = '\uEE6A';

  // (undocumented)
  azureLogo: string = '\uEB6A';

  // (undocumented)
  back: string = '\uE72B';

  // (undocumented)
  backToWindow: string = '\uE73F';

  // (undocumented)
  badge: string = '\uEC1B';

  // (undocumented)
  balloons: string = '\uED7E';

  // (undocumented)
  barChart4: string = '\uEAE7';

  // (undocumented)
  barChartHorizontal: string = '\uE9EB';

  // (undocumented)
  baseball: string = '\uEB20';

  // (undocumented)
  bidiLtr: string = '\uE9AA';

  // (undocumented)
  bidiRtl: string = '\uE9AB';

  // (undocumented)
  bingLogo: string = '\uEB6B';

  // (undocumented)
  blockContact: string = '\uE8F8';

  // (undocumented)
  blocked: string = '\uE733';

  // (undocumented)
  blocked2: string = '\uECE4';

  // (undocumented)
  blowingSnow: string = '\uE9C9';

  // (undocumented)
  boards: string = '\uEF68';

  // (undocumented)
  bold: string = '\uE8DD';

  // (undocumented)
  bookingsLogo: string = '\uEDC7';

  // (undocumented)
  bookmarks: string = '\uE8A4';

  // (undocumented)
  bookmarksMirrored: string = '\uEA41';

  // (undocumented)
  boxLogo: string = '\uED75';

  // (undocumented)
  branchFork: string = '\uF173';

  // (undocumented)
  breadcrumb: string = '\uEF8C';

  // (undocumented)
  brightness: string = '\uE706';

  // (undocumented)
  broom: string = '\uEA99';

  // (undocumented)
  bufferTimeAfter: string = '\uF0D0';

  // (undocumented)
  bufferTimeBefore: string = '\uF0CF';

  // (undocumented)
  bufferTimeBoth: string = '\uF0D1';

  // (undocumented)
  bulletedList: string = '\uE8FD';

  // (undocumented)
  bulletedListMirrored: string = '\uEA42';

  // (undocumented)
  busSolid: string = '\uEB47';

  // (undocumented)
  cafe: string = '\uEC32';

  // (undocumented)
  cake: string = '\uECA4';

  // (undocumented)
  calculatorAddition: string = '\uE948';

  // (undocumented)
  calculatorSubtract: string = '\uE949';

  // (undocumented)
  calendar: string = '\uE787';

  // (undocumented)
  calendarAgenda: string = '\uEE9A';

  // (undocumented)
  calendarDay: string = '\uE8BF';

  // (undocumented)
  calendarMirrored: string = '\uED28';

  // (undocumented)
  calendarReply: string = '\uE8F5';

  // (undocumented)
  calendarWeek: string = '\uE8C0';

  // (undocumented)
  calendarWorkWeek: string = '\uEF51';

  // (undocumented)
  caloriesAdd: string = '\uF172';

  // (undocumented)
  camera: string = '\uE722';

  // (undocumented)
  cancel: string = '\uE711';

  // (undocumented)
  car: string = '\uE804';

  // (undocumented)
  caretBottomLeftSolid8: string = '\uF121';

  // (undocumented)
  caretBottomRightSolid8: string = '\uF122';

  // (undocumented)
  caretDown8: string = '\uEDD8';

  // (undocumented)
  caretDownSolid8: string = '\uEDDC';

  // (undocumented)
  caretHollow: string = '\uE817';

  // (undocumented)
  caretHollowMirrored: string = '\uEA45';

  // (undocumented)
  caretLeft8: string = '\uEDD5';

  // (undocumented)
  caretLeftSolid8: string = '\uEDD9';

  // (undocumented)
  caretRight8: string = '\uEDD6';

  // (undocumented)
  caretRightSolid8: string = '\uEDDA';

  // (undocumented)
  caretSolid: string = '\uE818';

  // (undocumented)
  caretSolidMirrored: string = '\uEA46';

  // (undocumented)
  caretTopLeftSolid8: string = '\uEF54';

  // (undocumented)
  caretTopRightSolid8: string = '\uEF55';

  // (undocumented)
  caretUp8: string = '\uEDD7';

  // (undocumented)
  caretUpSolid8: string = '\uEDDB';

  // (undocumented)
  cat: string = '\uED7F';

  // (undocumented)
  cellPhone: string = '\uE8EA';

  // (undocumented)
  certificate: string = '\uEB95';

  // (undocumented)
  chart: string = '\uE999';

  // (undocumented)
  chat: string = '\uE901';

  // (undocumented)
  chatInviteFriend: string = '\uECFE';

  // (undocumented)
  checkbox: string = '\uE739';

  // (undocumented)
  checkboxComposite: string = '\uE73A';

  // (undocumented)
  checkboxIndeterminate: string = '\uE73C';

  // (undocumented)
  checkList: string = '\uE9D5';

  // (undocumented)
  checkMark: string = '\uE73E';

  // (undocumented)
  chevronDown: string = '\uE70D';

  // (undocumented)
  chevronDownMed: string = '\uE972';

  // (undocumented)
  chevronDownSmall: string = '\uE96E';

  // (undocumented)
  chevronLeft: string = '\uE76B';

  // (undocumented)
  chevronLeftMed: string = '\uE973';

  // (undocumented)
  chevronLeftSmall: string = '\uE96F';

  // (undocumented)
  chevronRight: string = '\uE76C';

  // (undocumented)
  chevronRightMed: string = '\uE974';

  // (undocumented)
  chevronRightSmall: string = '\uE970';

  // (undocumented)
  chevronUp: string = '\uE70E';

  // (undocumented)
  chevronUpMed: string = '\uE971';

  // (undocumented)
  chevronUpSmall: string = '\uE96D';

  // (undocumented)
  chromeBack: string = '\uE830';

  // (undocumented)
  chromeBackMirrored: string = '\uEA47';

  // (undocumented)
  chromeClose: string = '\uE8BB';

  // (undocumented)
  chromeMinimize: string = '\uE921';

  // (undocumented)
  circleFill: string = '\uEA3B';

  // (undocumented)
  circleHalfFull: string = '\uED9E';

  // (undocumented)
  circlePlus: string = '\uEAEE';

  // (undocumented)
  circleRing: string = '\uEA3A';

  // (undocumented)
  classNotebookLogo: string = '\uEDC8';

  // (undocumented)
  classroomLogo: string = '\uEF75';

  // (undocumented)
  clear: string = '\uE894';

  // (undocumented)
  clearFilter: string = '\uEF8F';

  // (undocumented)
  clearFormatting: string = '\uEDDD';

  // (undocumented)
  clearNight: string = '\uE9C2';

  // (undocumented)
  clock: string = '\uE917';

  // (undocumented)
  closedCaption: string = '\uEF84';

  // (undocumented)
  closePane: string = '\uE89F';

  // (undocumented)
  closePaneMirrored: string = '\uEA49';

  // (undocumented)
  cloudAdd: string = '\uECA9';

  // (undocumented)
  cloudDownload: string = '\uEBD3';

  // (undocumented)
  cloudUpload: string = '\uEC8E';

  // (undocumented)
  cloudWeather: string = '\uE9BE';

  // (undocumented)
  cloudy: string = '\uE9BF';

  // (undocumented)
  cocktails: string = '\uEA9D';

  // (undocumented)
  code: string = '\uE943';

  // (undocumented)
  coffee: string = '\uEAEF';

  // (undocumented)
  collabsDbLogo: string = '\uEDC9';

  // (undocumented)
  collapseMenu: string = '\uEF66';

  // (undocumented)
  collegeFootball: string = '\uEB26';

  // (undocumented)
  collegeHoops: string = '\uEB25';

  // (undocumented)
  color: string = '\uE790';

  // (undocumented)
  combine: string = '\uEDBB';

  // (undocumented)
  compassNw: string = '\uE942';

  // (undocumented)
  completed: string = '\uE930';

  // (undocumented)
  completedSolid: string = '\uEC61';

  // (undocumented)
  contact: string = '\uE77B';

  // (undocumented)
  contactCard: string = '\uEEBD';

  // (undocumented)
  contactInfo: string = '\uE779';

  // (undocumented)
  container: string = '\uE7B8';

  // (undocumented)
  contrast: string = '\uE7A1';

  // (undocumented)
  copy: string = '\uE8C8';

  // (undocumented)
  cotton: string = '\uEAF3';

  // (undocumented)
  cricket: string = '\uEB1E';

  // (undocumented)
  css: string = '\uEBEF';

  // (undocumented)
  customList: string = '\uEEBE';

  // (undocumented)
  customListMirrored: string = '\uEEBF';

  // (undocumented)
  cycling: string = '\uEAC7';

  // (undocumented)
  dataConnectionLibrary: string = '\uEEB7';

  // (undocumented)
  dateTime: string = '\uEC92';

  // (undocumented)
  dateTime2: string = '\uEA17';

  // (undocumented)
  dateTimeMirrored: string = '\uEE93';

  // (undocumented)
  decreaseIndentLegacy: string = '\uE290';

  // (undocumented)
  delveAnalytics: string = '\uEEEE';

  // (undocumented)
  delveAnalyticsLogo: string = '\uEDCA';

  // (undocumented)
  delveLogo: string = '\uED76';

  // (undocumented)
  descending: string = '\uEDC1';

  // (undocumented)
  design: string = '\uEB3C';

  // (undocumented)
  developerTools: string = '\uEC7A';

  // (undocumented)
  devices3: string = '\uEA6C';

  // (undocumented)
  devices4: string = '\uEB66';

  // (undocumented)
  dialpad: string = '\uE75F';

  // (undocumented)
  dictionary: string = '\uE82D';

  // (undocumented)
  dietPlanNotebook: string = '\uEAC8';

  // (undocumented)
  disableUpdates: string = '\uE8D8';

  // (undocumented)
  dislike: string = '\uE8E0';

  // (undocumented)
  dockLeft: string = '\uE90C';

  // (undocumented)
  dockLeftMirrored: string = '\uEA4C';

  // (undocumented)
  dockRight: string = '\uE90D';

  // (undocumented)
  docLibrary: string = '\uEEB8';

  // (undocumented)
  docsLogo: string = '\uEDCB';

  // (undocumented)
  document: string = '\uE8A5';

  // (undocumented)
  documentation: string = '\uEC17';

  // (undocumented)
  documentReply: string = '\uEF57';

  // (undocumented)
  documentSearch: string = '\uEF6C';

  // (undocumented)
  documentSet: string = '\uEED6';

  // (undocumented)
  door: string = '\uEB75';

  // (undocumented)
  doubleBookmark: string = '\uEB8F';

  // (undocumented)
  doubleChevronDown: string = '\uEE04';

  // (undocumented)
  doubleChevronDown12: string = '\uEE97';

  // (undocumented)
  doubleChevronLeft: string = '\uEDBE';

  // (undocumented)
  doubleChevronLeft12: string = '\uEE98';

  // (undocumented)
  doubleChevronLeftMed: string = '\uE991';

  // (undocumented)
  doubleChevronLeftMedMirrored: string = '\uEA4D';

  // (undocumented)
  doubleChevronRight: string = '\uEDBF';

  // (undocumented)
  doubleChevronRight12: string = '\uEE99';

  // (undocumented)
  doubleChevronUp: string = '\uEDBD';

  // (undocumented)
  doubleChevronUp12: string = '\uEE96';

  // (undocumented)
  down: string = '\uE74B';

  // (undocumented)
  download: string = '\uE896';

  // (undocumented)
  drm: string = '\uECA8';

  // (undocumented)
  drop: string = '\uEB42';

  // (undocumented)
  dropboxLogo: string = '\uED77';

  // (undocumented)
  dropdown: string = '\uEDC5';

  // (undocumented)
  duststorm: string = '\uE9CD';

  // (undocumented)
  dynamics365Logo: string = '\uEDCC';

  // (undocumented)
  dynamicSmbLogo: string = '\uEDCD';

  // (undocumented)
  eatDrink: string = '\uE807';

  // (undocumented)
  edgeLogo: string = '\uEC60';

  // (undocumented)
  edit: string = '\uE70F';

  // (undocumented)
  editMail: string = '\uEF61';

  // (undocumented)
  editMirrored: string = '\uEB7E';

  // (undocumented)
  editNote: string = '\uED9D';

  // (undocumented)
  editPhoto: string = '\uEF77';

  // (undocumented)
  editStyle: string = '\uEF60';

  // (undocumented)
  embed: string = '\uECCE';

  // (undocumented)
  emi: string = '\uE731';

  // (undocumented)
  emoji: string = '\uE899';

  // (undocumented)
  emoji2: string = '\uE76E';

  // (undocumented)
  emojiDisappointed: string = '\uEA88';

  // (undocumented)
  emojiNeutral: string = '\uEA87';

  // (undocumented)
  emptyRecycleBin: string = '\uEF88';

  // (undocumented)
  equalizer: string = '\uE9E9';

  // (undocumented)
  eraseTool: string = '\uE75C';

  // (undocumented)
  error: string = '\uE783';

  // (undocumented)
  errorBadge: string = '\uEA39';

  // (undocumented)
  event: string = '\uECA3';

  // (undocumented)
  eventInfo: string = '\uED8B';

  // (undocumented)
  excelDocument: string = '\uEF73';

  // (undocumented)
  excelLogo: string = '\uEC28';

  // (undocumented)
  exchangeLogo: string = '\uED78';

  // (undocumented)
  expandMenu: string = '\uEF67';

  // (undocumented)
  fabricAssetLibrary: string = '\uF09C';

  // (undocumented)
  fabricDataConnectionLibrary: string = '\uF09D';

  // (undocumented)
  fabricDocLibrary: string = '\uF09E';

  // (undocumented)
  fabricFolder: string = '\uF0A9';

  // (undocumented)
  fabricFolderFill: string = '\uF0AA';

  // (undocumented)
  fabricFolderSearch: string = '\uF0A4';

  // (undocumented)
  fabricFormLibrary: string = '\uF09F';

  // (undocumented)
  fabricFormLibraryMirrored: string = '\uF0A0';

  // (undocumented)
  fabricMovetoFolder: string = '\uF0A5';

  // (undocumented)
  fabricNewFolder: string = '\uF0AB';

  // (undocumented)
  fabricOpenFolderHorizontal: string = '\uF0A8';

  // (undocumented)
  fabricPictureLibrary: string = '\uF0AC';

  // (undocumented)
  fabricPublicFolder: string = '\uF0A3';

  // (undocumented)
  fabricReportLibrary: string = '\uF0A1';

  // (undocumented)
  fabricReportLibraryMirrored: string = '\uF0A2';

  // (undocumented)
  fabricSyncFolder: string = '\uF0A7';

  // (undocumented)
  fabricUnsyncFolder: string = '\uF0A6';

  // (undocumented)
  facebookLogo: string = '\uECB3';

  // (undocumented)
  family: string = '\uEBDA';

  // (undocumented)
  fangBody: string = '\uECEB';

  // (undocumented)
  favoriteList: string = '\uE728';

  // (undocumented)
  favoriteStar: string = '\uE734';

  // (undocumented)
  favoriteStarFill: string = '\uE735';

  // (undocumented)
  fax: string = '\uEF5C';

  // (undocumented)
  ferry: string = '\uE7E3';

  // (undocumented)
  ferrySolid: string = '\uEB48';

  // (undocumented)
  filter: string = '\uE71C';

  // (undocumented)
  filters: string = '\uE795';

  // (undocumented)
  financial: string = '\uE7BB';

  // (undocumented)
  fingerprint: string = '\uE928';

  // (undocumented)
  flag: string = '\uE7C1';

  // (undocumented)
  flickDown: string = '\uE935';

  // (undocumented)
  flickLeft: string = '\uE937';

  // (undocumented)
  flickRight: string = '\uE938';

  // (undocumented)
  flickUp: string = '\uE936';

  // (undocumented)
  flow: string = '\uEF90';

  // (undocumented)
  fog: string = '\uE9CB';

  // (undocumented)
  folder: string = '\uE8B7';

  // (undocumented)
  folderFill: string = '\uE8D5';

  // (undocumented)
  folderHorizontal: string = '\uF12B';

  // (undocumented)
  folderOpen: string = '\uE838';

  // (undocumented)
  folderSearch: string = '\uEF65';

  // (undocumented)
  font: string = '\uE8D2';

  // (undocumented)
  fontColor: string = '\uE8D3';

  // (undocumented)
  fontDecrease: string = '\uE8E7';

  // (undocumented)
  fontIncrease: string = '\uE8E8';

  // (undocumented)
  fontSize: string = '\uE8E9';

  // (undocumented)
  formLibrary: string = '\uEEB9';

  // (undocumented)
  formLibraryMirrored: string = '\uEEBA';

  // (undocumented)
  forward: string = '\uE72A';

  // (undocumented)
  forwardEvent: string = '\uED8C';

  // (undocumented)
  freezing: string = '\uE9EF';

  // (undocumented)
  frigid: string = '\uE9CA';

  // (undocumented)
  fullCircleMask: string = '\uE91F';

  // (undocumented)
  fullScreen: string = '\uE740';

  // (undocumented)
  generate: string = '\uE9DA';

  // (undocumented)
  giftbox: string = '\uEC1F';

  // (undocumented)
  giftCard: string = '\uEB8E';

  // (undocumented)
  glasses: string = '\uEA16';

  // (undocumented)
  glimmer: string = '\uECF4';

  // (undocumented)
  globalNavButton: string = '\uE700';

  // (undocumented)
  globe: string = '\uE774';

  // (undocumented)
  globeFavorite: string = '\uEF53';

  // (undocumented)
  golf: string = '\uEB1F';

  // (undocumented)
  googleDriveLogo: string = '\uEE0B';

  // (undocumented)
  gotoToday: string = '\uE8D1';

  // (undocumented)
  gripperTool: string = '\uE75E';

  // (undocumented)
  group: string = '\uE902';

  // (undocumented)
  groupedAscending: string = '\uEE67';

  // (undocumented)
  groupedDescending: string = '\uEE66';

  // (undocumented)
  groupedList: string = '\uEF74';

  // (undocumented)
  hailDay: string = '\uEA00';

  // (undocumented)
  hailNight: string = '\uEA13';

  // (undocumented)
  handwriting: string = '\uE929';

  // (undocumented)
  header1: string = '\uEA19';

  // (undocumented)
  header2: string = '\uEF36';

  // (undocumented)
  header3: string = '\uEF37';

  // (undocumented)
  header4: string = '\uEF38';

  // (undocumented)
  headset: string = '\uE95B';

  // (undocumented)
  health: string = '\uE95E';

  // (undocumented)
  heart: string = '\uEB51';

  // (undocumented)
  heartFill: string = '\uEB52';

  // (undocumented)
  help: string = '\uE897';

  // (undocumented)
  helpMirrored: string = '\uEA51';

  // (undocumented)
  hide: string = '\uED1A';

  // (undocumented)
  hide2: string = '\uEF89';

  // (undocumented)
  history: string = '\uE81C';

  // (undocumented)
  home: string = '\uE80F';

  // (undocumented)
  homeSolid: string = '\uEA8A';

  // (undocumented)
  hospital: string = '\uE91D';

  // (undocumented)
  hotel: string = '\uE824';

  // (undocumented)
  important: string = '\uE8C9';

  // (undocumented)
  inboxCheck: string = '\uEF64';

  // (undocumented)
  incidentTriangle: string = '\uE814';

  // (undocumented)
  increaseIndentLegacy: string = '\uE291';

  // (undocumented)
  info: string = '\uE946';

  // (undocumented)
  info2: string = '\uEA1F';

  // (undocumented)
  insertTextBox: string = '\uEC7D';

  // (undocumented)
  internetSharing: string = '\uE704';

  // (undocumented)
  iOsAppStoreLogo: string = '\uEF8A';

  // (undocumented)
  issueTracking: string = '\uEEC0';

  // (undocumented)
  issueTrackingMirrored: string = '\uEEC1';

  // (undocumented)
  italic: string = '\uE8DB';

  // (undocumented)
  joinOnlineMeeting: string = '\uED8F';

  // (undocumented)
  js: string = '\uEBF0';

  // (undocumented)
  label: string = '\uE932';

  // (undocumented)
  landscapeOrientation: string = '\uEF6B';

  // (undocumented)
  laptopSelected: string = '\uEC76';

  // (undocumented)
  largeGrid: string = '\uEECB';

  // (undocumented)
  library: string = '\uE8F1';

  // (undocumented)
  lifesaver: string = '\uEF62';

  // (undocumented)
  lifesaverLock: string = '\uEF63';

  // (undocumented)
  light: string = '\uE793';

  // (undocumented)
  lightbulb: string = '\uEA80';

  // (undocumented)
  lightningBolt: string = '\uE945';

  // (undocumented)
  like: string = '\uE8E1';

  // (undocumented)
  link: string = '\uE71B';

  // (undocumented)
  list: string = '\uEA37';

  // (undocumented)
  listMirrored: string = '\uEA55';

  // (undocumented)
  location: string = '\uE81D';

  // (undocumented)
  locationCircle: string = '\uE80E';

  // (undocumented)
  locationDot: string = '\uE827';

  // (undocumented)
  locationFill: string = '\uE920';

  // (undocumented)
  lock: string = '\uE72E';

  // (undocumented)
  lowerBrightness: string = '\uEC8A';

  // (undocumented)
  lyncLogo: string = '\uED79';

  // (undocumented)
  mail: string = '\uE715';

  // (undocumented)
  mailAlert: string = '\uED80';

  // (undocumented)
  mailCheck: string = '\uED81';

  // (undocumented)
  mailFill: string = '\uE8A8';

  // (undocumented)
  mailForward: string = '\uE89C';

  // (undocumented)
  mailForwardMirrored: string = '\uEA56';

  // (undocumented)
  mailLowImportance: string = '\uED82';

  // (undocumented)
  mailPause: string = '\uED83';

  // (undocumented)
  mailRepeat: string = '\uED84';

  // (undocumented)
  mailReply: string = '\uE8CA';

  // (undocumented)
  mailReplyAll: string = '\uE8C2';

  // (undocumented)
  mailReplyAllMirrored: string = '\uEA58';

  // (undocumented)
  mailReplyMirrored: string = '\uEA57';

  // (undocumented)
  mapDirections: string = '\uE816';

  // (undocumented)
  mapPin: string = '\uE707';

  // (undocumented)
  market: string = '\uEAFC';

  // (undocumented)
  marketDown: string = '\uEF42';

  // (undocumented)
  megaphone: string = '\uE789';

  // (undocumented)
  memo: string = '\uE77C';

  // (undocumented)
  merge: string = '\uE7D5';

  // (undocumented)
  message: string = '\uE8BD';

  // (undocumented)
  messageFill: string = '\uEC70';

  // (undocumented)
  microphone: string = '\uE720';

  // (undocumented)
  microsoftStaffhubLogo: string = '\uF130';

  // (undocumented)
  miniLink: string = '\uE732';

  // (undocumented)
  mobileSelected: string = '\uEC75';

  // (undocumented)
  money: string = '\uEAFD';

  // (undocumented)
  more: string = '\uE712';

  // (undocumented)
  moreSports: string = '\uEB22';

  // (undocumented)
  move: string = '\uE7C2';

  // (undocumented)
  moveToFolder: string = '\uE8DE';

  // (undocumented)
  msnLogo: string = '\uEB6C';

  // (undocumented)
  multiSelect: string = '\uE762';

  // (undocumented)
  multiSelectMirrored: string = '\uEA98';

  // (undocumented)
  musicInCollection: string = '\uE940';

  // (undocumented)
  musicInCollectionFill: string = '\uEA36';

  // (undocumented)
  musicNote: string = '\uEC4F';

  // (undocumented)
  nav2DMapView: string = '\uE800';

  // (undocumented)
  newFolder: string = '\uE8F4';

  // (undocumented)
  news: string = '\uE900';

  // (undocumented)
  noteForward: string = '\uED99';

  // (undocumented)
  notePinned: string = '\uED9A';

  // (undocumented)
  noteReply: string = '\uED98';

  // (undocumented)
  numberedList: string = '\uEA1C';

  // (undocumented)
  numberField: string = '\uEDC4';

  // (undocumented)
  officeAssistantLogo: string = '\uEDCE';

  // (undocumented)
  officeFormLogo: string = '\uEF86';

  // (undocumented)
  officeLogo: string = '\uEB6E';

  // (undocumented)
  officeStoreLogo: string = '\uEDCF';

  // (undocumented)
  officeVideoLogo: string = '\uED7A';

  // (undocumented)
  offlineOneDriveParachute: string = '\uEEC8';

  // (undocumented)
  offlineOneDriveParachuteDisabled: string = '\uEEC9';

  // (undocumented)
  oneDrive: string = '\uE941';

  // (undocumented)
  oneDriveAdd: string = '\uEF32';

  // (undocumented)
  oneNoteEduLogo: string = '\uEDD0';

  // (undocumented)
  oneNoteLogo: string = '\uEC0D';

  // (undocumented)
  openFile: string = '\uE8E5';

  // (undocumented)
  openFolderHorizontal: string = '\uED25';

  // (undocumented)
  openInNewWindow: string = '\uE8A7';

  // (undocumented)
  openPane: string = '\uE8A0';

  // (undocumented)
  openPaneMirrored: string = '\uEA5B';

  // (undocumented)
  org: string = '\uECA6';

  // (undocumented)
  outlookLogo: string = '\uEB6D';

  // (undocumented)
  outOfOffice: string = '\uED34';

  // (undocumented)
  page: string = '\uE7C3';

  // (undocumented)
  pageAdd: string = '\uEA1A';

  // (undocumented)
  pageCheckedin: string = '\uF104';

  // (undocumented)
  pageCheckedOut: string = '\uF02C';

  // (undocumented)
  pageLeft: string = '\uE760';

  // (undocumented)
  pageRight: string = '\uE761';

  // (undocumented)
  pageSolid: string = '\uE729';

  // (undocumented)
  panoIndicator: string = '\uE7B0';

  // (undocumented)
  paratureLogo: string = '\uED7B';

  // (undocumented)
  partlyCloudyDay: string = '\uE9C0';

  // (undocumented)
  partlyCloudyNight: string = '\uE9C1';

  // (undocumented)
  partyLeader: string = '\uECA7';

  // (undocumented)
  pause: string = '\uE769';

  // (undocumented)
  paymentCard: string = '\uE8C7';

  // (undocumented)
  pc1: string = '\uE977';

  // (undocumented)
  pdf: string = '\uEA90';

  // (undocumented)
  pencilReply: string = '\uEF7B';

  // (undocumented)
  people: string = '\uE716';

  // (undocumented)
  peopleAdd: string = '\uEA15';

  // (undocumented)
  peopleAlert: string = '\uED93';

  // (undocumented)
  peopleBlock: string = '\uED91';

  // (undocumented)
  peoplePause: string = '\uED94';

  // (undocumented)
  peopleRepeat: string = '\uED92';

  // (undocumented)
  permissions: string = '\uE8D7';

  // (undocumented)
  phone: string = '\uE717';

  // (undocumented)
  photo2: string = '\uEB9F';

  // (undocumented)
  photo2Add: string = '\uECAB';

  // (undocumented)
  photo2Remove: string = '\uECAC';

  // (undocumented)
  photoCollection: string = '\uE7AA';

  // (undocumented)
  picture: string = '\uE8B9';

  // (undocumented)
  pictureLibrary: string = '\uEEC2';

  // (undocumented)
  pieDouble: string = '\uEB04';

  // (undocumented)
  pill: string = '\uEACB';

  // (undocumented)
  pin: string = '\uE718';

  // (undocumented)
  pinned: string = '\uE840';

  // (undocumented)
  pinnedFill: string = '\uE842';

  // (undocumented)
  planner: string = '\uEDD1';

  // (undocumented)
  play: string = '\uE768';

  // (undocumented)
  playerSettings: string = '\uEF58';

  // (undocumented)
  poi: string = '\uECAF';

  // (undocumented)
  postUpdate: string = '\uE8F3';

  // (undocumented)
  powerApps: string = '\uEDD2';

  // (undocumented)
  powerApps2Logo: string = '\uF092';

  // (undocumented)
  powerAppsLogo: string = '\uF091';

  // (undocumented)
  powerBiLogo: string = '\uEA1E';

  // (undocumented)
  powerPointDocument: string = '\uEF72';

  // (undocumented)
  powerPointLogo: string = '\uEC2A';

  // (undocumented)
  precipitation: string = '\uE9CF';

  // (undocumented)
  presenceChickletVideo: string = '\uE979';

  // (undocumented)
  preview: string = '\uE8FF';

  // (undocumented)
  previewLink: string = '\uE8A1';

  // (undocumented)
  print: string = '\uE749';

  // (undocumented)
  printfaxPrinterFile: string = '\uE956';

  // (undocumented)
  product: string = '\uECDC';

  // (undocumented)
  proFootball: string = '\uEB27';

  // (undocumented)
  proHockey: string = '\uEB28';

  // (undocumented)
  projectLogo: string = '\uEDD4';

  // (undocumented)
  protectedDocument: string = '\uE8A6';

  // (undocumented)
  publicCalendar: string = '\uEF6D';

  // (undocumented)
  publicContactCard: string = '\uEF6E';

  // (undocumented)
  publicEmail: string = '\uEF6F';

  // (undocumented)
  publicFolder: string = '\uEF70';

  // (undocumented)
  puzzle: string = '\uEA86';

  // (undocumented)
  questionnaire: string = '\uEE19';

  // (undocumented)
  questionnaireMirrored: string = '\uEE4B';

  // (undocumented)
  quickNote: string = '\uE70B';

  // (undocumented)
  radioBtnOn: string = '\uECCB';

  // (undocumented)
  radioBullet: string = '\uE915';

  // (undocumented)
  rain: string = '\uE9C4';

  // (undocumented)
  rainShowersDay: string = '\uE9C3';

  // (undocumented)
  rainShowersNight: string = '\uEA0F';

  // (undocumented)
  rainSnow: string = '\uE9C7';

  // (undocumented)
  read: string = '\uE8C3';

  // (undocumented)
  readingMode: string = '\uE736';

  // (undocumented)
  receiptCheck: string = '\uEF5B';

  // (undocumented)
  receiptForward: string = '\uEF59';

  // (undocumented)
  receiptReply: string = '\uEF5A';

  // (undocumented)
  recent: string = '\uE823';

  // (undocumented)
  recurringEvent: string = '\uEF5D';

  // (undocumented)
  recurringTask: string = '\uEDB2';

  // (undocumented)
  recycleBin: string = '\uEF87';

  // (undocumented)
  redEye: string = '\uE7B3';

  // (undocumented)
  redo: string = '\uE7A6';

  // (undocumented)
  refresh: string = '\uE72C';

  // (undocumented)
  reminderGroup: string = '\uEBF8';

  // (undocumented)
  remove: string = '\uE738';

  // (undocumented)
  removeEvent: string = '\uED8A';

  // (undocumented)
  removeFilter: string = '\uEB08';

  // (undocumented)
  removeLink: string = '\uED90';

  // (undocumented)
  removeOccurrence: string = '\uED9B';

  // (undocumented)
  rename: string = '\uE8AC';

  // (undocumented)
  reopenPages: string = '\uED50';

  // (undocumented)
  repair: string = '\uE90F';

  // (undocumented)
  reply: string = '\uE97A';

  // (undocumented)
  replyAll: string = '\uEE0A';

  // (undocumented)
  replyAllAlt: string = '\uEF5F';

  // (undocumented)
  replyAllMirrored: string = '\uEE36';

  // (undocumented)
  replyAlt: string = '\uEF5E';

  // (undocumented)
  replyMirrored: string = '\uEE35';

  // (undocumented)
  reportLibrary: string = '\uEEBB';

  // (undocumented)
  reportLibraryMirrored: string = '\uEEBC';

  // (undocumented)
  returnToSession: string = '\uED24';

  // (undocumented)
  revToggleKey: string = '\uE845';

  // (undocumented)
  ribbon: string = '\uE9D1';

  // (undocumented)
  rightDoubleQuote: string = '\uE9B1';

  // (undocumented)
  ringer: string = '\uEA8F';

  // (undocumented)
  room: string = '\uED9F';

  // (undocumented)
  rotate: string = '\uE7AD';

  // (undocumented)
  rugby: string = '\uEB2D';

  // (undocumented)
  running: string = '\uEADA';

  // (undocumented)
  sad: string = '\uE757';

  // (undocumented)
  save: string = '\uE74E';

  // (undocumented)
  saveAs: string = '\uE792';

  // (undocumented)
  search: string = '\uE721';

  // (undocumented)
  section: string = '\uEC0C';

  // (undocumented)
  sections: string = '\uEF76';

  // (undocumented)
  securityGroup: string = '\uED85';

  // (undocumented)
  send: string = '\uE724';

  // (undocumented)
  sendMirrored: string = '\uEA63';

  // (undocumented)
  setAction: string = '\uF071';

  // (undocumented)
  settings: string = '\uE713';

  // (undocumented)
  share: string = '\uE72D';

  // (undocumented)
  shareiOs: string = '\uEF79';

  // (undocumented)
  sharepointLogo: string = '\uED18';

  // (undocumented)
  shield: string = '\uEA18';

  // (undocumented)
  shop: string = '\uE719';

  // (undocumented)
  shoppingCart: string = '\uE7BF';

  // (undocumented)
  showResults: string = '\uE8BC';

  // (undocumented)
  showResultsMirrored: string = '\uEA65';

  // (undocumented)
  sidePanel: string = '\uEF52';

  // (undocumented)
  singleBookmark: string = '\uEDFF';

  // (undocumented)
  sipMove: string = '\uE759';

  // (undocumented)
  skypeCheck: string = '\uEF80';

  // (undocumented)
  skypeCircleCheck: string = '\uEF7D';

  // (undocumented)
  skypeCircleClock: string = '\uEF7E';

  // (undocumented)
  skypeCircleMinus: string = '\uEF7F';

  // (undocumented)
  skypeClock: string = '\uEF81';

  // (undocumented)
  skypeLogo: string = '\uEB6F';

  // (undocumented)
  skypeMessage: string = '\uEF83';

  // (undocumented)
  skypeMinus: string = '\uEF82';

  // (undocumented)
  sliderThumb: string = '\uEC13';

  // (undocumented)
  snow: string = '\uEB46';

  // (undocumented)
  snowShowerDay: string = '\uE9FD';

  // (undocumented)
  snowShowerNight: string = '\uEA11';

  // (undocumented)
  soccer: string = '\uEB21';

  // (undocumented)
  socialListeningLogo: string = '\uED7C';

  // (undocumented)
  sort: string = '\uE8CB';

  // (undocumented)
  sortDown: string = '\uEE69';

  // (undocumented)
  sortLines: string = '\uE9D0';

  // (undocumented)
  sortUp: string = '\uEE68';

  // (undocumented)
  speakers: string = '\uE7F5';

  // (undocumented)
  speedHigh: string = '\uEC4A';

  // (undocumented)
  split: string = '\uEDBC';

  // (undocumented)
  squalls: string = '\uE9CC';

  // (undocumented)
  stackIndicator: string = '\uE7FF';

  // (undocumented)
  starburst: string = '\uEF78';

  // (undocumented)
  statusErrorFull: string = '\uEB90';

  // (undocumented)
  statusTriangle: string = '\uEA82';

  // (undocumented)
  stockDown: string = '\uEB0F';

  // (undocumented)
  stockUp: string = '\uEB11';

  // (undocumented)
  stopwatch: string = '\uE916';

  // (undocumented)
  storeLogo: string = '\uEA96';

  // (undocumented)
  storeLogoMed: string = '\uEA04';

  // (undocumented)
  strikethrough: string = '\uEDE0';

  // (undocumented)
  subscribe: string = '\uEDA1';

  // (undocumented)
  subscript: string = '\uEDDF';

  // (undocumented)
  suitcase: string = '\uEDD3';

  // (undocumented)
  sunAdd: string = '\uEF69';

  // (undocumented)
  sunny: string = '\uE9BD';

  // (undocumented)
  sunQuestionMark: string = '\uEF6A';

  // (undocumented)
  superscript: string = '\uEDDE';

  // (undocumented)
  swayLogo: string = '\uED29';

  // (undocumented)
  switcher: string = '\uE8AB';

  // (undocumented)
  switcherStartEnd: string = '\uE810';

  // (undocumented)
  sync: string = '\uE895';

  // (undocumented)
  syncFolder: string = '\uE8F7';

  // (undocumented)
  syncToPc: string = '\uEE6E';

  // (undocumented)
  system: string = '\uE770';

  // (undocumented)
  tab: string = '\uE7E9';

  // (undocumented)
  table: string = '\uED86';

  // (undocumented)
  tablet: string = '\uE70A';

  // (undocumented)
  tabletSelected: string = '\uEC74';

  // (undocumented)
  tag: string = '\uE8EC';

  // (undocumented)
  taskManager: string = '\uEDB7';

  // (undocumented)
  taskManagerMirrored: string = '\uEDB8';

  // (undocumented)
  teamwork: string = '\uEA12';

  // (undocumented)
  temporaryUser: string = '\uEE58';

  // (undocumented)
  tennis: string = '\uEB33';

  // (undocumented)
  textBox: string = '\uEDC2';

  // (undocumented)
  textField: string = '\uEDC3';

  // (undocumented)
  thumbnailView: string = '\uE7B6';

  // (undocumented)
  thumbnailViewMirrored: string = '\uEA67';

  // (undocumented)
  thunderstorms: string = '\uE9C6';

  // (undocumented)
  ticket: string = '\uEB54';

  // (undocumented)
  tiles: string = '\uECA5';

  // (undocumented)
  tiles2: string = '\uEF7C';

  // (undocumented)
  timeline: string = '\uED9C';

  // (undocumented)
  timer: string = '\uE91E';

  // (undocumented)
  toggleBorder: string = '\uEC12';

  // (undocumented)
  toggleFilled: string = '\uEC11';

  // (undocumented)
  toggleThumb: string = '\uEC14';

  // (undocumented)
  touch: string = '\uE815';

  // (undocumented)
  touchPointer: string = '\uE7C9';

  // (undocumented)
  train: string = '\uE7C0';

  // (undocumented)
  trainSolid: string = '\uEB4D';

  // (undocumented)
  transferCall: string = '\uED95';

  // (undocumented)
  trash: string = '\uE74D';

  // (undocumented)
  triangleDown12: string = '\uEED1';

  // (undocumented)
  triangleLeft12: string = '\uEED2';

  // (undocumented)
  triangleRight12: string = '\uEED3';

  // (undocumented)
  triangleSolidDown12: string = '\uEECD';

  // (undocumented)
  triangleSolidLeft12: string = '\uEECE';

  // (undocumented)
  triangleSolidRight12: string = '\uEECF';

  // (undocumented)
  triangleSolidUp12: string = '\uEECC';

  // (undocumented)
  triangleUp12: string = '\uEED0';

  // (undocumented)
  trophy: string = '\uED3F';

  // (undocumented)
  turnRight: string = '\uE7DB';

  // (undocumented)
  tvMonitor: string = '\uE7F4';

  // (undocumented)
  tvMonitorSelected: string = '\uEC77';

  // (undocumented)
  underline: string = '\uE8DC';

  // (undocumented)
  undo: string = '\uE7A7';

  // (undocumented)
  unfavorite: string = '\uE8D9';

  // (undocumented)
  unknownCall: string = '\uED97';

  // (undocumented)
  unlock: string = '\uE785';

  // (undocumented)
  unpin: string = '\uE77A';

  // (undocumented)
  unsubscribe: string = '\uEDA0';

  // (undocumented)
  unsyncFolder: string = '\uE8F6';

  // (undocumented)
  up: string = '\uE74A';

  // (undocumented)
  upload: string = '\uE898';

  // (undocumented)
  video: string = '\uE714';

  // (undocumented)
  videoSolid: string = '\uEA0C';

  // (undocumented)
  view: string = '\uE890';

  // (undocumented)
  viewAll: string = '\uE8A9';

  // (undocumented)
  viewAll2: string = '\uEF56';

  // (undocumented)
  visioLogo: string = '\uED7D';

  // (undocumented)
  voicemailForward: string = '\uED87';

  // (undocumented)
  voicemailReply: string = '\uED88';

  // (undocumented)
  volume0: string = '\uE992';

  // (undocumented)
  volume1: string = '\uE993';

  // (undocumented)
  volume2: string = '\uE994';

  // (undocumented)
  volume3: string = '\uE995';

  // (undocumented)
  volumeDisabled: string = '\uEA85';

  // (undocumented)
  waffle: string = '\uED89';

  // (undocumented)
  warning: string = '\uE7BA';

  // (undocumented)
  website: string = '\uEB41';

  // (undocumented)
  weights: string = '\uEADB';

  // (undocumented)
  windDirection: string = '\uEBE6';

  // (undocumented)
  windowsLogo: string = '\uE782';

  // (undocumented)
  wipePhone: string = '\uED8D';

  // (undocumented)
  wordDocument: string = '\uEF71';

  // (undocumented)
  wordLogo: string = '\uEC29';

  // (undocumented)
  work: string = '\uE821';

  // (undocumented)
  workFlow: string = '\uEA01';

  // (undocumented)
  worldClock: string = '\uE918';

  // (undocumented)
  yammerLogo: string = '\uED19';

  // (undocumented)
  zoom: string = '\uE71E';

  // (undocumented)
  zoomIn: string = '\uE8A3';

  // (undocumented)
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
  // (undocumented)
  black?: string;
  // (undocumented)
  blackTranslucent40?: string;
  // (undocumented)
  blue?: string;
  // (undocumented)
  blueDark?: string;
  // (undocumented)
  blueLight?: string;
  // (undocumented)
  blueMid?: string;
  // (undocumented)
  green?: string;
  // (undocumented)
  greenDark?: string;
  // (undocumented)
  greenLight?: string;
  // (undocumented)
  magenta?: string;
  // (undocumented)
  magentaDark?: string;
  // (undocumented)
  magentaLight?: string;
  // (undocumented)
  neutralDark?: string;
  // (undocumented)
  neutralLight?: string;
  // (undocumented)
  neutralLighter?: string;
  // (undocumented)
  neutralLighterAlt?: string;
  // (undocumented)
  neutralPrimary?: string;
  // (undocumented)
  neutralPrimaryAlt?: string;
  // (undocumented)
  neutralQuaternary?: string;
  // (undocumented)
  neutralQuaternaryAlt?: string;
  // (undocumented)
  neutralSecondary?: string;
  // (undocumented)
  neutralSecondaryAlt?: string;
  // (undocumented)
  neutralTertiary?: string;
  // (undocumented)
  neutralTertiaryAlt?: string;
  // (undocumented)
  orange?: string;
  // (undocumented)
  orangeLight?: string;
  // (undocumented)
  orangeLighter?: string;
  // (undocumented)
  purple?: string;
  // (undocumented)
  purpleDark?: string;
  // (undocumented)
  purpleLight?: string;
  // (undocumented)
  red?: string;
  // (undocumented)
  redDark?: string;
  // (undocumented)
  teal?: string;
  // (undocumented)
  tealDark?: string;
  // (undocumented)
  tealLight?: string;
  // (undocumented)
  themeDark?: string;
  // (undocumented)
  themeDarkAlt?: string;
  // (undocumented)
  themeDarker?: string;
  // (undocumented)
  themeLight?: string;
  // (undocumented)
  themeLighter?: string;
  // (undocumented)
  themeLighterAlt?: string;
  // (undocumented)
  themePrimary?: string;
  // (undocumented)
  themeSecondary?: string;
  // (undocumented)
  themeTertiary?: string;
  // (undocumented)
  white?: string;
  // (undocumented)
  yellow?: string;
  // (undocumented)
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
