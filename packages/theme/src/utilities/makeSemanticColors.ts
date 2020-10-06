import { IEffects, IPalette, ISemanticColors } from '../types/index';

/** Generates all the semantic slot colors based on the theme so far
 * We'll use these as fallbacks for semantic slots that the passed in theme did not define.
 * The caller must still mix in the customized semantic slots at the end.
 */
export function makeSemanticColors<TResult = Partial<ISemanticColors>>(
  palette: Partial<IPalette> | undefined,
  effects: Partial<IEffects> | undefined,
  semanticColors: Partial<ISemanticColors> | undefined,
  isInverted: boolean,
): TResult {
  let result: Partial<ISemanticColors> = {
    // DEFAULTS
    bodyBackground: palette?.white,
    bodyBackgroundHovered: palette?.neutralLighter,
    bodyBackgroundChecked: palette?.neutralLight,
    bodyStandoutBackground: palette?.neutralLighterAlt,
    bodyFrameBackground: palette?.white,
    bodyFrameDivider: palette?.neutralLight,
    bodyText: palette?.neutralPrimary,
    bodyTextChecked: palette?.black,
    bodySubtext: palette?.neutralSecondary,
    bodyDivider: palette?.neutralLight,
    disabledBodyText: palette?.neutralTertiary,
    disabledBodySubtext: palette?.neutralTertiaryAlt,
    disabledBorder: palette?.neutralTertiaryAlt,
    focusBorder: palette?.neutralSecondary,
    cardStandoutBackground: palette?.white,
    cardShadow: effects?.elevation4,
    cardShadowHovered: '', // set in second pass
    variantBorder: palette?.neutralLight,
    variantBorderHovered: palette?.neutralTertiary,
    defaultStateBackground: palette?.neutralLighterAlt,

    // LINKS
    actionLink: palette?.neutralPrimary,
    actionLinkHovered: palette?.neutralDark,
    link: palette?.themePrimary,
    linkHovered: palette?.themeDarker,

    // BUTTONS
    buttonBackground: palette?.white,
    buttonBackgroundChecked: palette?.neutralTertiaryAlt,
    buttonBackgroundHovered: palette?.neutralLighter,
    buttonBackgroundCheckedHovered: palette?.neutralLight,
    buttonBackgroundPressed: palette?.neutralLight,
    buttonBackgroundDisabled: palette?.neutralLighter,
    buttonBorder: palette?.neutralSecondaryAlt,
    buttonText: palette?.neutralPrimary,
    buttonTextHovered: palette?.neutralDark,
    buttonTextChecked: palette?.neutralDark,
    buttonTextCheckedHovered: palette?.black,
    buttonTextPressed: palette?.neutralDark,
    buttonTextDisabled: palette?.neutralTertiary,
    buttonBorderDisabled: palette?.neutralLighter,

    primaryButtonBackground: palette?.themePrimary,
    primaryButtonBackgroundHovered: palette?.themeDarkAlt,
    primaryButtonBackgroundPressed: palette?.themeDark,
    primaryButtonBackgroundDisabled: palette?.neutralLighter,
    primaryButtonBorder: 'transparent',
    primaryButtonText: palette?.white,
    primaryButtonTextHovered: palette?.white,
    primaryButtonTextPressed: palette?.white,
    primaryButtonTextDisabled: palette?.neutralQuaternary,

    accentButtonBackground: palette?.accent,
    accentButtonText: palette?.white,

    // INPUTS
    inputBorder: palette?.neutralSecondary,
    inputBorderHovered: palette?.neutralPrimary,
    inputBackground: palette?.white,
    inputBackgroundChecked: palette?.themePrimary,
    inputBackgroundCheckedHovered: palette?.themeDark,
    inputPlaceholderBackgroundChecked: palette?.themeLighter,
    inputForegroundChecked: palette?.white,
    inputIcon: palette?.themePrimary,
    inputIconHovered: palette?.themeDark,
    inputIconDisabled: palette?.neutralTertiary,
    inputFocusBorderAlt: palette?.themePrimary,
    smallInputBorder: palette?.neutralSecondary,
    inputText: palette?.neutralPrimary,
    inputTextHovered: palette?.neutralDark,
    inputPlaceholderText: palette?.neutralSecondary,
    disabledBackground: palette?.neutralLighter,
    disabledText: palette?.neutralTertiary,
    disabledSubtext: palette?.neutralQuaternary,

    // LISTS
    listBackground: palette?.white,
    listText: palette?.neutralPrimary,
    listItemBackgroundHovered: palette?.neutralLighter,
    listItemBackgroundChecked: palette?.neutralLight,
    listItemBackgroundCheckedHovered: palette?.neutralQuaternaryAlt,

    listHeaderBackgroundHovered: palette?.neutralLighter,
    listHeaderBackgroundPressed: palette?.neutralLight,

    // MENUS
    menuBackground: palette?.white,
    menuDivider: palette?.neutralTertiaryAlt,
    menuIcon: palette?.themePrimary,
    menuHeader: palette?.themePrimary,
    menuItemBackgroundHovered: palette?.neutralLighter,
    menuItemBackgroundPressed: palette?.neutralLight,
    menuItemText: palette?.neutralPrimary,
    menuItemTextHovered: palette?.neutralDark,

    errorText: !isInverted ? '#a4262c' : '#F1707B',

    messageText: !isInverted ? '#323130' : '#F3F2F1',
    messageLink: !isInverted ? '#005A9E' : '#6CB8F6',
    messageLinkHovered: !isInverted ? '#004578' : '#82C7FF',

    infoIcon: !isInverted ? '#605e5c' : '#C8C6C4',
    errorIcon: !isInverted ? '#A80000' : '#F1707B',
    blockingIcon: !isInverted ? '#FDE7E9' : '#442726',
    warningIcon: !isInverted ? '#797775' : '#C8C6C4',
    severeWarningIcon: !isInverted ? '#D83B01' : '#FCE100',
    successIcon: !isInverted ? '#107C10' : '#92C353',

    infoBackground: !isInverted ? '#f3f2f1' : '#323130',
    errorBackground: !isInverted ? '#FDE7E9' : '#442726',
    blockingBackground: !isInverted ? '#FDE7E9' : '#442726',
    warningBackground: !isInverted ? '#FFF4CE' : '#433519',
    severeWarningBackground: !isInverted ? '#FED9CC' : '#4F2A0F',
    successBackground: !isInverted ? '#DFF6DD' : '#393D1B',

    // mix in customized semantic slots for second pass
    ...semanticColors,
  };

  // second pass for self-referential slots
  result = {
    ...result,
    cardShadowHovered:
      semanticColors?.cardShadowHovered ||
      (!isInverted ? effects?.elevation8 : '0 0 1px ' + result.variantBorderHovered),
  };

  return result as TResult;
}
