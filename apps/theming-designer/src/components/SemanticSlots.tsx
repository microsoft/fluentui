import * as React from 'react';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';
import { Stack, Text } from 'office-ui-fabric-react';
import { mergeStyles } from '@uifabric/merge-styles';
import { SemanticSlotsDetailsList } from './SemanticSlotsDetailsList';
import { MainPanelInnerContent } from '../shared/MainPanelStyles';
import { getVariant, VariantThemeType } from '@uifabric/variants';

export interface ISemanticSlotsProps {
  theme?: ITheme;
}

const slotClassName = mergeStyles({
  display: 'flex',
  alignItems: 'center',
  overflow: 'auto'
});

const semanticPaletteColorBox = mergeStyles({
  width: 15,
  height: 15,
  display: 'inline-block',
  left: 5,
  top: 5,
  border: '1px solid black',
  flexShrink: 0
});

export const SemanticSlots: React.StatelessComponent<ISemanticSlotsProps> = (props: ISemanticSlotsProps) => {
  let slotNames: string[] = [];
  let noneSlots: JSX.Element[] = [];
  let neutralSlots: JSX.Element[] = [];
  let softSlots: JSX.Element[] = [];
  let strongSlots: JSX.Element[] = [];

  slotNames = [
    // DEFAULTS - 13
    'bodyBackground', // white
    'bodyStandoutBackground', // neutralLighterAlt
    'bodyFrameBackground', // white
    'bodyFrameDivider', // neturalLight
    'bodyText', // neutralPrimary
    'bodyTextChecked', // black
    'bodySubtext', // neutralSecondary
    'bodyDivider', // neutralLight
    'disabledBodyText', // neutralTertiary
    'focusBorder', // neutralSecondary
    'variantBorder', // neutralLight
    'variantBorderHovered', // neutralTertiary
    'defaultStateBackground', // neutralLighterAlt
    // LINKS - 4
    'actionLink', // neutralPrimary
    'actionLinkHovered', // neutralDark
    'link', // themePrimary
    'linkHovered', // themeDarker
    // BUTTONS - 25
    'buttonBackground', // neutralLighter
    'buttonBackgroundChecked', // neutralTertiaryAlt
    'buttonBackgroundHovered', // neutralLight
    'buttonBackgroundCheckedHovered', // neutralLight
    'buttonBackgroundPressed', // neutralLight
    'buttonBackgroundDisabled', // neutralLighter
    'buttonBorder', // 'transparent'
    'buttonText', // neutralPrimary
    'buttonTextHovered', // neutralDark
    'buttonTextChecked', // neutralDark
    'buttonTextCheckedHovered', // black
    'buttonTextPressed', // neutralDark
    'buttonTextDisabled', // neutralTertiary
    'buttonBorderDisabled', // 'transparent'

    'primaryButtonBackground', // themePrimary
    'primaryButtonBackgroundHovered', // themeDarkAlt
    'primaryButtonBackgroundPressed', // themeDark
    'primaryButtonBackgroundDisabled', // neutralLighter
    'primaryButtonBorder', // 'transparent'
    'primaryButtonText', // white
    'primaryButtonTextHovered', // white
    'primaryButtonTextPressed', // white
    'primaryButtonTextDisabled', // neutralQuaternary

    'accentButtonBackground', // accent
    'accentButtonText', // white
    // INPUTS - 14
    'inputBorder', // neutralTertiary
    'inputBorderHovered', // neutralPrimary
    'inputBackground', // white
    'inputBackgroundChecked', // themePrimary
    'inputBackgroundCheckedHovered', // themeDarkAlt
    'inputForegroundChecked', // white
    'inputFocusBorderAlt', // themePrimary
    'smallInputBorder', // neutralSecondary
    'inputText', // neutralPrimary
    'inputTextHovered', // neutralDark
    'inputPlaceholderText', // neutralSecondary
    'disabledBackground', // neutralLighter
    'disabledText', // neutralTertiary
    'disabledSubText', // neutralQuaternary
    // LISTS - 7
    'listBackground', // white
    'listText', // neutralPrimary
    'listItemBackgroundHovered', // neutralLighter
    'listItemBackgroundChecked', // neutralLight
    'listItemBackgroundCheckedHovered', // neutralQuaternaryAlt
    'listHeaderBackgroundHovered', // neutralLighter
    'listHeaderBackgroundPressed', // neutralLight
    // MENUS - 8
    'menuBackground', // white
    'menuDivider', // neutralTertiaryAlt
    'menuIcon', // themePrimary
    'menuHeader', // themePrimary
    'menuItemBackgroundHovered', // neutralLighter
    'menuItemBackgroundPressed', // neutralLight
    'menuItemText', // neutralPrimary
    'menuItemTextHovered' // neutralDark
  ];

  const noneSemanticColorsToPaletteValuesMapping = {
    bodyBackground: 'white',
    bodyStandoutBackground: 'neutralLighterAlt',
    bodyFrameBackground: 'white',
    bodyFrameDivider: 'neutralLight',
    bodyText: 'neutralPrimary',
    bodyTextChecked: 'black',
    bodySubtext: 'neutralSecondary',
    bodyDivider: 'neutralLight',
    disabledBodyText: 'neutralTertiary',
    focusBorder: 'neutralSecondary',
    variantBorder: 'neutralLight',
    variantBorderHovered: 'neutralTertiary',
    defaultStateBackground: 'neutralLighterAlt',
    actionLink: 'neutralPrimary',
    actionLinkHovered: 'neutralDark',
    link: 'themePrimary',
    linkHovered: 'themeDarker',
    buttonBackground: 'neutralLighter',
    buttonBackgroundChecked: 'neutralTertiaryAlt',
    buttonBackgroundHovered: 'neutralLight',
    buttonBackgroundCheckedHovered: 'neutralLight',
    buttonBackgroundPressed: 'neutralLight',
    buttonBackgroundDisabled: 'neutralLighter',
    buttonBorder: 'transparent',
    buttonText: 'neutralPrimary',
    buttonTextHovered: 'neutralDark',
    buttonTextChecked: 'neutralDark',
    buttonTextCheckedHovered: 'black',
    buttonTextPressed: 'neutralDark',
    buttonTextDisabled: 'neutralTertiary',
    buttonBorderDisabled: 'transparent',
    primaryButtonBackground: 'themePrimary',
    primaryButtonBackgroundHovered: 'themeDarkAlt',
    primaryButtonBackgroundPressed: 'themeDark',
    primaryButtonBackgroundDisabled: 'neutralLighter',
    primaryButtonBorder: 'transparent',
    primaryButtonText: 'white',
    primaryButtonTextHovered: 'white',
    primaryButtonTextPressed: 'white',
    primaryButtonTextDisabled: 'neutralQuaternary',
    accentButtonBackground: 'accent',
    accentButtonText: 'white',
    inputBorder: 'neutralTertiary',
    inputBorderHovered: 'neutralPrimary',
    inputBackground: 'white',
    inputBackgroundChecked: 'themePrimary',
    inputBackgroundCheckedHovered: 'themeDarkAlt',
    inputForegroundChecked: 'white',
    inputFocusBorderAlt: 'themePrimary',
    smallInputBorder: 'neutralSecondary',
    inputText: 'neutralPrimary',
    inputTextHovered: 'neutralDark',
    inputPlaceholderText: 'neutralSecondary',
    disabledBackground: 'neutralLighter',
    disabledText: 'neutralTertiary',
    disabledSubtext: 'neutralQuaternary',
    listBackground: 'white',
    listText: 'neutralPrimary',
    listItemBackgroundHovered: 'neutralLighter',
    listItemBackgroundChecked: 'neutralLight',
    listItemBackgroundCheckedHovered: 'neutralQuaternaryAlt',
    listHeaderBackgroundHovered: 'neutralLighter',
    listHeaderBackgroundPressed: 'neutralLight',
    menuBackground: 'white',
    menuDivider: 'neutralTertiaryAlt',
    menuIcon: 'themePrimary',
    menuHeader: 'themePrimary',
    menuItemBackgroundHovered: 'neutralLighter',
    menuItemBackgroundPressed: 'neutralLight',
    menuItemText: 'neutralPrimary',
    menuItemTextHovered: 'neutralDark',
    errorText: props.theme ? (!props.theme.isInverted ? 'redDark' : '#ff5f5f') : 'N/A',
    warningText: props.theme ? (!props.theme.isInverted ? '#333333' : '#ffffff') : 'N/A',
    errorBackground: props.theme ? (!props.theme.isInverted ? 'rgba(232, 17, 35, .2)' : 'rgba(232, 17, 35, .5)') : 'N/A',
    blockingBackground: props.theme ? (!props.theme.isInverted ? 'rgba(234, 67, 0, .2)' : 'rgba(234, 67, 0, .5)') : 'N/A',
    warningBackground: props.theme ? (!props.theme.isInverted ? 'rgba(255, 185, 0, .2)' : 'rgba(255, 251, 0, .6)') : 'N/A',
    warningHighlight: props.theme ? (!props.theme.isInverted ? '#ffb900' : '#fff100') : 'N/A',
    successBackground: props.theme ? (!props.theme.isInverted ? 'rgba(186, 216, 10, .2)' : 'rgba(186, 216, 10, .4)') : 'N/A',
    disabledBodySubtext: 'neutralTertiaryAlt',
    listTextColor: '',
    menuItemBackgroundChecked: 'neutralLight'
  };

  const neutralSemanticColorsToPaletteValuesMapping = {
    bodyBackground: 'neturalLighter',
    bodyStandoutBackground: 'neutralLight',
    bodyFrameBackground: props.theme ? (!props.theme.isInverted ? 'neutralLight' : 'neutralLighter') : 'N/A',
    bodyFrameDivider: props.theme ? (!props.theme.isInverted ? 'neutralLight' : 'neutralQuaternaryAlt') : 'N/A',
    bodyText: 'neutralPrimary',
    bodyTextChecked: 'N/A',
    bodySubtext: 'neutralSecondary',
    bodyDivider: 'neutralQuaternaryAlt',
    disabledBodyText: 'neturalTertiary',
    focusBorder: 'neutralSecondary',
    variantBorder: 'neutralLight',
    variantBorderHovered: 'neutralTertiary',
    defaultStateBackground: 'neutralLight',
    actionLink: 'neutralPrimary',
    actionLinkHovered: 'neutralDark',
    link: 'themeDarkAlt',
    linkHovered: 'themeDarker',
    buttonBackground: 'neutralQuaternaryAlt',
    buttonBackgroundChecked: 'N/A',
    buttonBackgroundHovered: 'neutralQuaternary',
    buttonBackgroundCheckedHovered: 'N/A',
    buttonBackgroundPressed: props.theme ? (!props.theme.isInverted ? 'neutralTertiary' : 'neutralTertiaryAlt') : 'N/A',
    buttonBackgroundDisabled: 'neutralLight',
    buttonBorder: 'transparent',
    buttonText: 'neutralPrimary',
    buttonTextHovered: 'neutralDark',
    buttonTextChecked: 'N/A',
    buttonTextCheckedHovered: 'N/A',
    buttonTextPressed: 'neutralDark',
    buttonTextDisabled: props.theme ? (!props.theme.isInverted ? 'neutralTertiary' : 'neutralTertiaryAlt') : 'N/A',
    buttonBorderDisabled: 'transparent',
    primaryButtonBackground: 'themePrimary',
    primaryButtonBackgroundHovered: 'themeDarkAlt',
    primaryButtonBackgroundPressed: 'themeDark',
    primaryButtonBackgroundDisabled: 'N/A',
    primaryButtonBorder: 'transparent',
    primaryButtonText: 'white',
    primaryButtonTextHovered: 'white',
    primaryButtonTextPressed: 'white',
    primaryButtonTextDisabled: 'N/A',
    accentButtonBackground: 'accent',
    accentButtonText: 'white',
    inputBorder: 'neutralTertiary',
    inputBorderHovered: 'neutralPrimary',
    inputBackground: 'white',
    inputBackgroundChecked: 'N/A',
    inputBackgroundCheckedHovered: 'N/A',
    inputForegroundChecked: 'N/A',
    inputFocusBorderAlt: 'themePrimary',
    smallInputBorder: 'N/A',
    inputText: 'neutralPrimary',
    inputTextHovered: 'neutralDark',
    inputPlaceholderText: 'neutralSecondary',
    disabledBackground: props.theme ? (!props.theme.isInverted ? 'neutralLight' : 'neutralLighter') : 'N/A',
    disabledText: 'neutralTertiary',
    disabledBodySubtext: 'neutralTertiaryAlt',
    listBackground: 'N/A',
    listText: 'N/A',
    listItemBackgroundHovered: 'N/A',
    listItemBackgroundChecked: 'N/A',
    listItemBackgroundCheckedHovered: 'N/A',
    listHeaderBackgroundHovered: 'N/A',
    listHeaderBackgroundPressed: 'N/A',
    menuBackground: 'white',
    menuDivider: 'neutralTertiaryAlt',
    menuIcon: 'N/A',
    menuHeader: 'N/A',
    menuItemBackgroundHovered: 'neutralLighter',
    menuItemBackgroundPressed: 'neutralLight',
    menuItemText: 'neutralPrimary',
    menuItemTextHovered: props.theme ? (!props.theme.isInverted ? 'neutralDark' : 'neutralPrimary') : 'N/A'
  };

  const softSemanticColorsToPaletteValuesMapping = {
    bodyBackground: props.theme ? (!props.theme.isInverted ? 'themeLighterAlt' : 'themeLight') : 'N/A',
    bodyStandoutBackground: props.theme ? (!props.theme.isInverted ? 'themeLighter' : 'themeTertiary') : 'N/A',
    bodyFrameBackground: props.theme ? (!props.theme.isInverted ? 'themeLighter' : 'themeLight') : 'N/A',
    bodyFrameDivider: props.theme ? (!props.theme.isInverted ? 'themeLighter' : 'neutralQuaternary') : 'N/A',
    bodyText: 'neutralPrimary',
    bodyTextChecked: 'N/A',
    bodySubtext: 'neutralSecondary',
    bodyDivider: 'neutralQuaternaryAlt',
    disabledBodyText: 'neturalTertiary',
    focusBorder: 'neutralSecondary',
    variantBorder: 'neutralLight',
    variantBorderHovered: 'neutralTertiary',
    defaultStateBackground: 'neutralLight',
    actionLink: 'neutralPrimary',
    actionLinkHovered: 'neutralDark',
    link: 'themeDarkAlt',
    linkHovered: 'themeDarker',
    buttonBackground: 'neutralQuaternaryAlt',
    buttonBackgroundChecked: 'N/A',
    buttonBackgroundHovered: 'neutralQuaternary',
    buttonBackgroundCheckedHovered: 'N/A',
    buttonBackgroundPressed: props.theme ? (!props.theme.isInverted ? 'neutralTertiary' : 'neutralTertiaryAlt') : 'N/A',
    buttonBackgroundDisabled: 'neutralLight',
    buttonBorder: 'transparent',
    buttonText: 'neutralPrimary',
    buttonTextHovered: 'neutralDark',
    buttonTextChecked: 'N/A',
    buttonTextCheckedHovered: 'N/A',
    buttonTextPressed: 'neutralDark',
    buttonTextDisabled: props.theme ? (!props.theme.isInverted ? 'neutralTertiary' : 'neutralTertiaryAlt') : 'N/A',
    buttonBorderDisabled: 'transparent',
    primaryButtonBackground: 'themePrimary',
    primaryButtonBackgroundHovered: 'themeDarkAlt',
    primaryButtonBackgroundPressed: 'themeDark',
    primaryButtonBackgroundDisabled: 'N/A',
    primaryButtonBorder: 'transparent',
    primaryButtonText: 'white',
    primaryButtonTextHovered: 'white',
    primaryButtonTextPressed: 'white',
    primaryButtonTextDisabled: 'N/A',
    accentButtonBackground: 'accent',
    accentButtonText: 'white',
    inputBorder: 'neutralTertiary',
    inputBorderHovered: 'neutralPrimary',
    inputBackground: 'white',
    inputBackgroundChecked: 'themePrimary',
    inputBackgroundCheckedHovered: 'themeDarkAlt',
    inputForegroundChecked: 'themeLighter',
    inputFocusBorderAlt: 'themePrimary',
    smallInputBorder: 'N/A',
    inputText: 'neutralPrimary',
    inputTextHovered: 'neutralDark',
    inputPlaceholderText: 'neutralSecondary',
    disabledBackground: 'neutralLight',
    disabledText: 'neutralTertiary',
    disabledBodySubtext: 'neutralTertiaryAlt',
    listBackground: 'N/A',
    listText: 'N/A',
    listItemBackgroundHovered: 'N/A',
    listItemBackgroundChecked: 'N/A',
    listItemBackgroundCheckedHovered: 'N/A',
    listHeaderBackgroundHovered: 'N/A',
    listHeaderBackgroundPressed: 'N/A',
    menuBackground: 'white',
    menuDivider: 'neutralTertiaryAlt',
    menuIcon: 'N/A',
    menuHeader: 'N/A',
    menuItemBackgroundHovered: 'neutralLighter',
    menuItemBackgroundPressed: 'neutralLight',
    menuItemText: 'neutralPrimary',
    menuItemTextHovered: props.theme ? (props.theme.isInverted ? 'neutralDark' : 'neutralPrimary') : 'N/A'
  };

  const strongSemanticColorsToPaletteValuesMapping = {
    bodyBackground: 'themePrimary',
    bodyStandoutBackground: 'themeDarkAlt',
    bodyFrameBackground: props.theme ? (!props.theme.isInverted ? 'themeDarkAlt' : 'themePrimary') : 'N/A',
    bodyFrameDivider: props.theme ? (!props.theme.isInverted ? 'themeDarkAlt' : 'themeTertiary') : 'N/A',
    bodyText: 'white',
    bodyTextChecked: 'N/A',
    bodySubtext: 'white',
    bodyDivider: 'themeTertiary',
    disabledBodyText: 'neutralQuaternary',
    focusBorder: 'white',
    variantBorder: 'themeDarkAlt',
    variantBorderHovered: 'themeDarker',
    defaultStateBackground: 'neutralLightAlt',
    actionLink: 'white',
    actionLinkHovered: 'white',
    link: 'white',
    linkHovered: 'white',
    buttonBackground: 'themePrimary',
    buttonBackgroundChecked: 'N/A',
    buttonBackgroundHovered: 'themeDarkAlt',
    buttonBackgroundCheckedHovered: 'N/A',
    buttonBackgroundPressed: 'themeDark',
    buttonBackgroundDisabled: props.theme ? (!props.theme.isInverted ? 'themeLighter' : 'themeLight') : 'N/A',
    buttonBorder: 'white',
    buttonText: 'white',
    buttonTextHovered: 'white',
    buttonTextChecked: 'N/A',
    buttonTextCheckedHovered: 'N/A',
    buttonTextPressed: 'white',
    buttonTextDisabled: 'themeTertiary',
    buttonBorderDisabled: 'transparent',
    primaryButtonBackground: 'white',
    primaryButtonBackgroundHovered: props.theme ? (!props.theme.isInverted ? 'themeLighter' : 'themeLight') : 'N/A',
    primaryButtonBackgroundPressed: props.theme ? (!props.theme.isInverted ? 'themeLight' : 'themeTertiary') : 'N/A',
    primaryButtonBackgroundDisabled: 'N/A',
    primaryButtonBorder: 'transparent',
    primaryButtonText: props.theme ? (!props.theme.isInverted ? 'themePrimary' : 'neutralPrimary') : 'N/A',
    primaryButtonTextHovered: props.theme ? (!props.theme.isInverted ? 'themeDark' : 'neutralDark') : 'N/A',
    primaryButtonTextPressed: props.theme ? (!props.theme.isInverted ? 'themeDark' : 'neutralDark') : 'N/A',
    primaryButtonTextDisabled: 'N/A',
    accentButtonBackground: 'white',
    accentButtonText: props.theme ? (!props.theme.isInverted ? 'themePrimary' : 'neutralPrimary') : 'N/A',
    inputBorder: 'themeDarkAlt',
    inputBorderHovered: 'themeDarker',
    inputBackground: 'white',
    inputBackgroundChecked: 'white',
    inputBackgroundCheckedHovered: 'themePrimary',
    inputForegroundChecked: 'themeDark',
    inputFocusBorderAlt: 'themeTertiary',
    smallInputBorder: 'N/A',
    inputText: 'neutralPrimary',
    inputTextHovered: 'neutralDark',
    inputPlaceholderText: 'neutralSecondary',
    disabledBackground: 'themeDarkAlt',
    disabledText: 'themeTertiary',
    disabledBodySubtext: 'neutralTertiaryAlt',
    listBackground: 'N/A',
    listText: 'N/A',
    listItemBackgroundHovered: 'N/A',
    listItemBackgroundChecked: 'N/A',
    listItemBackgroundCheckedHovered: 'N/A',
    listHeaderBackgroundHovered: 'N/A',
    listHeaderBackgroundPressed: 'N/A',
    menuBackground: 'white',
    menuDivider: 'neutralTertiaryAlt',
    menuIcon: 'N/A',
    menuHeader: 'N/A',
    menuItemBackgroundHovered: 'neutralLighter',
    menuItemBackgroundPressed: 'neutralLight',
    menuItemText: 'neutralPrimary',
    menuItemTextHovered: props.theme ? (!props.theme.isInverted ? 'neutralDark' : 'neutralPrimary') : 'N/A'
  };

  const semanticSlotWidget = (color: string, name: string): JSX.Element => {
    return (
      <div key={name} className={slotClassName}>
        <Stack horizontal gap={5}>
          <div key={name} className={semanticPaletteColorBox} style={{ backgroundColor: color }} />
          <div>{name}</div>
        </Stack>
      </div>
    );
  };

  const fillVariantSlotsList = (variantType: VariantThemeType, mappingType: {}): JSX.Element[] => {
    let currThemeVariant: ITheme;
    if (props.theme) {
      currThemeVariant = getVariant(props.theme, variantType);
      let currVariantSemanticColors = currThemeVariant.semanticColors;
      let tempJSXList: JSX.Element[];
      tempJSXList = [];
      for (let i = 0; i < slotNames.length; i++) {
        let slot = slotNames[i];
        if ((mappingType as any)[slot] === 'N/A') {
          let currSlotJSX = semanticSlotWidget('#ffffff', (mappingType as any)[slot]);
          tempJSXList.push(currSlotJSX);
        } else {
          let currSlotJSX = semanticSlotWidget((currVariantSemanticColors as any)[slot], (mappingType as any)[slot]);
          tempJSXList.push(currSlotJSX);
        }
      }
      return tempJSXList;
    } else {
      return [];
    }
  };

  noneSlots = fillVariantSlotsList(VariantThemeType.None, noneSemanticColorsToPaletteValuesMapping);
  neutralSlots = fillVariantSlotsList(VariantThemeType.Neutral, neutralSemanticColorsToPaletteValuesMapping);
  softSlots = fillVariantSlotsList(VariantThemeType.Soft, softSemanticColorsToPaletteValuesMapping);
  strongSlots = fillVariantSlotsList(VariantThemeType.Strong, strongSemanticColorsToPaletteValuesMapping);

  return (
    <div className={MainPanelInnerContent}>
      <SemanticSlotsDetailsList
        slotNames={slotNames}
        noneSlots={noneSlots}
        neutralSlots={neutralSlots}
        softSlots={softSlots}
        strongSlots={strongSlots}
      />
    </div>
  );
};
