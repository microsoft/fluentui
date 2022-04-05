import type { IEffects, IPalette, ISemanticColors } from '../types/index';

/** Generates all the semantic slot colors based on the theme so far
 * We'll use these as fallbacks for semantic slots that the passed in theme did not define.
 * The caller must still mix in the customized semantic slots at the end.
 */
export function makeSemanticColors(
  p: IPalette,
  e: IEffects,
  s: Partial<ISemanticColors> | undefined,
  isInverted: boolean,
  depComments: boolean = false,
): ISemanticColors {
  const semanticColors: Partial<ISemanticColors> = {
    primaryButtonBorder: 'transparent',

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

    // deprecated
    warningHighlight: !isInverted ? '#ffb900' : '#fff100',
    successText: !isInverted ? '#107C10' : '#92c353',

    ...s,
  };

  const fullSemanticColors = getSemanticColors<ISemanticColors>(p, e, semanticColors, isInverted);
  return _fixDeprecatedSlots(fullSemanticColors, depComments);
}

/**
 * Map partial platte and effects to partial semantic colors.
 */
export function getSemanticColors<TResult = Partial<ISemanticColors>>(
  p: Partial<IPalette> | undefined,
  e: Partial<IEffects> | undefined,
  s: Partial<ISemanticColors> | undefined,
  isInverted: boolean,
  depComments: boolean = false,
): TResult {
  let result: Partial<ISemanticColors> = {};

  // map palette
  const {
    white,
    black,
    themePrimary,
    themeDark,
    themeDarker,
    themeDarkAlt,
    themeLighter,
    neutralLight,
    neutralLighter,
    neutralDark,
    neutralQuaternary,
    neutralQuaternaryAlt,
    neutralPrimary,
    neutralSecondary,
    neutralSecondaryAlt,
    neutralTertiary,
    neutralTertiaryAlt,
    neutralLighterAlt,
    accent,
  } = p || {};

  if (white) {
    result.bodyBackground = white;
    result.bodyFrameBackground = white;
    result.accentButtonText = white;
    result.buttonBackground = white;
    result.primaryButtonText = white;
    result.primaryButtonTextHovered = white;
    result.primaryButtonTextPressed = white;
    result.inputBackground = white;
    result.inputForegroundChecked = white;
    result.listBackground = white;
    result.menuBackground = white;
    result.cardStandoutBackground = white;
  }
  if (black) {
    result.bodyTextChecked = black;
    result.buttonTextCheckedHovered = black;
  }
  if (themePrimary) {
    result.link = themePrimary;
    result.primaryButtonBackground = themePrimary;
    result.inputBackgroundChecked = themePrimary;
    result.inputIcon = themePrimary;
    result.inputFocusBorderAlt = themePrimary;
    result.menuIcon = themePrimary;
    result.menuHeader = themePrimary;
    result.accentButtonBackground = themePrimary;
  }
  if (themeDark) {
    result.primaryButtonBackgroundPressed = themeDark;
    result.inputBackgroundCheckedHovered = themeDark;
    result.inputIconHovered = themeDark;
  }
  if (themeDarker) {
    result.linkHovered = themeDarker;
  }
  if (themeDarkAlt) {
    result.primaryButtonBackgroundHovered = themeDarkAlt;
  }
  if (themeLighter) {
    result.inputPlaceholderBackgroundChecked = themeLighter;
  }
  if (neutralLight) {
    result.bodyBackgroundChecked = neutralLight;
    result.bodyFrameDivider = neutralLight;
    result.bodyDivider = neutralLight;
    result.variantBorder = neutralLight;
    result.buttonBackgroundCheckedHovered = neutralLight;
    result.buttonBackgroundPressed = neutralLight;
    result.listItemBackgroundChecked = neutralLight;
    result.listHeaderBackgroundPressed = neutralLight;
    result.menuItemBackgroundPressed = neutralLight;
    // eslint-disable-next-line deprecation/deprecation
    result.menuItemBackgroundChecked = neutralLight;
  }
  if (neutralLighter) {
    result.bodyBackgroundHovered = neutralLighter;
    result.buttonBackgroundHovered = neutralLighter;
    result.buttonBackgroundDisabled = neutralLighter;
    result.buttonBorderDisabled = neutralLighter;
    result.primaryButtonBackgroundDisabled = neutralLighter;
    result.disabledBackground = neutralLighter;
    result.listItemBackgroundHovered = neutralLighter;
    result.listHeaderBackgroundHovered = neutralLighter;
    result.menuItemBackgroundHovered = neutralLighter;
  }
  if (neutralQuaternary) {
    result.primaryButtonTextDisabled = neutralQuaternary;
    result.disabledSubtext = neutralQuaternary;
  }
  if (neutralQuaternaryAlt) {
    result.listItemBackgroundCheckedHovered = neutralQuaternaryAlt;
  }
  if (neutralTertiary) {
    result.disabledBodyText = neutralTertiary;
    result.variantBorderHovered = s?.variantBorderHovered || neutralTertiary;
    result.buttonTextDisabled = neutralTertiary;
    result.inputIconDisabled = neutralTertiary;
    result.disabledText = neutralTertiary;
  }
  if (neutralPrimary) {
    result.bodyText = neutralPrimary;
    result.actionLink = neutralPrimary;
    result.buttonText = neutralPrimary;
    result.inputBorderHovered = neutralPrimary;
    result.inputText = neutralPrimary;
    result.listText = neutralPrimary;
    result.menuItemText = neutralPrimary;
  }
  if (neutralLighterAlt) {
    result.bodyStandoutBackground = neutralLighterAlt;
    result.defaultStateBackground = neutralLighterAlt;
  }
  if (neutralDark) {
    result.actionLinkHovered = neutralDark;
    result.buttonTextHovered = neutralDark;
    result.buttonTextChecked = neutralDark;
    result.buttonTextPressed = neutralDark;
    result.inputTextHovered = neutralDark;
    result.menuItemTextHovered = neutralDark;
  }
  if (neutralSecondary) {
    result.bodySubtext = neutralSecondary;
    result.focusBorder = neutralSecondary;
    result.inputBorder = neutralSecondary;
    result.smallInputBorder = neutralSecondary;
    result.inputPlaceholderText = neutralSecondary;
  }
  if (neutralSecondaryAlt) {
    result.buttonBorder = neutralSecondaryAlt;
  }
  if (neutralTertiaryAlt) {
    result.disabledBodySubtext = neutralTertiaryAlt;
    result.disabledBorder = neutralTertiaryAlt;
    result.buttonBackgroundChecked = neutralTertiaryAlt;
    result.menuDivider = neutralTertiaryAlt;
  }
  if (accent) {
    result.accentButtonBackground = accent;
  }

  // map effects
  if (e?.elevation4) {
    result.cardShadow = e.elevation4;
  }
  if (!isInverted && e?.elevation8) {
    result.cardShadowHovered = e.elevation8;
  } else if (result.variantBorderHovered) {
    result.cardShadowHovered = '0 0 1px ' + result.variantBorderHovered;
  }

  result = {
    ...result,
    // mix in customized semantic slots
    ...s,
  };

  return result as TResult;
}

function _fixDeprecatedSlots(s: ISemanticColors, depComments: boolean): ISemanticColors {
  // Add @deprecated tag as comment if enabled
  let dep = '';
  if (depComments === true) {
    dep = ' /* @deprecated */';
  }

  /* eslint-disable deprecation/deprecation */
  s.listTextColor = s.listText + dep;
  s.menuItemBackgroundChecked += dep;
  s.warningHighlight += dep;
  s.warningText = s.messageText + dep;
  s.successText += dep;
  /* eslint-enable deprecation/deprecation */
  return s;
}
