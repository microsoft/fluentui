import * as React from 'react';
import { Card } from '@uifabric/react-cards';
import { SemanticColorSlots, IThemeRules } from 'office-ui-fabric-react/lib/ThemeGenerator';
import { ITheme, ISemanticColors } from 'office-ui-fabric-react/lib/Styling';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { mergeStyles } from '@uifabric/merge-styles';
import { SemanticSlotsDetailsList } from './SemanticSlotsDetailsList';
import { getVariant, VariantThemeType } from '@uifabric/variants';

export interface ISemanticSlotsProps {
  theme?: ITheme;
  themeRules?: IThemeRules;
}

export interface ISemanticSlotsState {
  slotNames: string[];
  noneSlots: JSX.Element[]; // array of JSX.Element from semanticColorSlotWidget instead of SemanticColorSlots[]??
  neutralSlots: JSX.Element[];
  softSlots: JSX.Element[];
  strongSlots: JSX.Element[];
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

export class SemanticSlots extends React.Component<ISemanticSlotsProps, ISemanticSlotsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      slotNames: [
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
      ],
      noneSlots: this.fillVariantSlotsList(VariantThemeType.None),
      neutralSlots: this.fillVariantSlotsList(VariantThemeType.Neutral),
      softSlots: this.fillVariantSlotsList(VariantThemeType.Soft),
      strongSlots: this.fillVariantSlotsList(VariantThemeType.Strong)
    };
  }

  public render(): JSX.Element {
    return (
      <Card styles={{ root: { minWidth: '800px', maxWidth: '1200px', height: 'auto' } }}>
        {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
        <h1>Semantic Slots</h1>
        <SemanticSlotsDetailsList
          slotNames={this.state.slotNames}
          noneSlots={this.state.noneSlots}
          neutralSlots={this.state.neutralSlots}
          softSlots={this.state.softSlots}
          strongSlots={this.state.strongSlots}
        />
      </Card>
    );
  }

  // semanticSlotRuleChanged method? I don't think I need it bc when themeRules change SemanticSlots card will get
  // new theme and re-render with the new slotRules[SemanticColorSlots]?

  // so I think all I need to do is populate each of the slots lists with the right semantic color slot
  // so the first value in noneSlots[] will be bodyBackground on none = white
  // second value will be bodyStandoutBackground on none = neutralLighterAlt

  // will need semanticSlotWidget to make the colorbox and slot rule label for each cell though.

  private semanticSlotWidget = (color: string, name: string): JSX.Element => {
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
  private fillVariantSlotsList = (variantType: VariantThemeType): JSX.Element[] => {
    // call getVariant to get the default
    let noneThemeVariant: ITheme;
    if (this.props.theme) {
      noneThemeVariant = getVariant(this.props.theme!, variantType);
      let noneSemanticColors = noneThemeVariant.semanticColors;

      let tempJSXList: JSX.Element[];
      tempJSXList = [];
      for (let slot in noneSemanticColors) {
        if (noneSemanticColors.hasOwnProperty(slot)) {
          let currSlotJSX = this.semanticSlotWidget((noneSemanticColors as any)[slot], slot);
          tempJSXList.push(currSlotJSX);
        }
      }
      return tempJSXList;
    } else {
      return [];
    }
  };
}
