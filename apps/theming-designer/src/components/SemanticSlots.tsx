import * as React from 'react';
import { Card } from '@uifabric/react-cards';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { mergeStyles } from '@uifabric/merge-styles';
import { SemanticSlotsDetailsList } from './SemanticSlotsDetailsList';
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

  // fill noneSlots
  const fillVariantSlotsList = (variantType: VariantThemeType): JSX.Element[] => {
    console.log('gets called');
    // call getVariant to get the default
    let noneThemeVariant: ITheme;
    if (props.theme) {
      noneThemeVariant = getVariant(props.theme!, variantType);
      let noneSemanticColors = noneThemeVariant.semanticColors;

      let tempJSXList: JSX.Element[];
      tempJSXList = [];
      for (let slot in noneSemanticColors) {
        if (noneSemanticColors.hasOwnProperty(slot)) {
          let currSlotJSX = semanticSlotWidget((noneSemanticColors as any)[slot], slot);
          tempJSXList.push(currSlotJSX);
        }
      }
      return tempJSXList;
    } else {
      return [];
    }
  };

  noneSlots = fillVariantSlotsList(VariantThemeType.None);
  neutralSlots = fillVariantSlotsList(VariantThemeType.Neutral);
  softSlots = fillVariantSlotsList(VariantThemeType.Soft);
  strongSlots = fillVariantSlotsList(VariantThemeType.Strong);

  return (
    <div style={{ width: '1200px', marginLeft: '200px' }}>
      <h1>Semantic Slots</h1>
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
