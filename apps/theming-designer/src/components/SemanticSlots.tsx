import * as React from 'react';
import { ITheme, IPalette, ISemanticColors } from '@fluentui/react/lib/Styling';
import { Stack } from '@fluentui/react';
import { mergeStyles } from '@fluentui/merge-styles';
import { SemanticSlotsDetailsList } from './SemanticSlotsDetailsList';
import { MainPanelInnerContent } from '../shared/MainPanelStyles';
import { getVariant, VariantThemeType } from '@fluentui/scheme-utilities';

export interface ISemanticSlotsProps {
  theme?: ITheme;
}

const slotClassName = mergeStyles({
  display: 'flex',
  alignItems: 'center',
  overflow: 'auto',
});

const semanticPaletteColorBox = mergeStyles({
  width: 15,
  height: 15,
  display: 'inline-block',
  left: 5,
  top: 5,
  border: '1px solid black',
  flexShrink: 0,
});

type IPaletteSlots = {
  [key: string]: string;
};

type IMapping = {
  [key: string]: string;
};

type ISlotNames = string[];

export const SemanticSlots: React.FunctionComponent<ISemanticSlotsProps> = (props: ISemanticSlotsProps) => {
  let slotNames: ISlotNames = [];
  let noneSlots: JSX.Element[] = [];
  let neutralSlots: JSX.Element[] = [];
  let softSlots: JSX.Element[] = [];
  let strongSlots: JSX.Element[] = [];

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

  /**
   * Filters the list of palette slots pulled from getVariant to only include the ones starting with 'theme'
   * and 'neutral' or the 4 unique ones called 'black', 'white', 'redDark', and 'accent' because these are
   * the only ones to be displayed on the theme designer site.
   */
  const trimPaletteSlots = (paletteSlots: IPalette): IPaletteSlots => {
    let trimmedPaletteSlots: IPaletteSlots = {};
    for (let palette in paletteSlots) {
      if (
        palette.startsWith('theme') ||
        palette.startsWith('neutral') ||
        palette === 'black' ||
        palette === 'white' ||
        palette === 'redDark'
      ) {
        trimmedPaletteSlots[palette] = paletteSlots[palette as keyof IPalette];
      }
    }
    return trimmedPaletteSlots;
  };

  const isASemanticColor = (semanticString: string): boolean => {
    return (
      semanticString.startsWith('body') ||
      semanticString.startsWith('primary') ||
      semanticString.startsWith('disabled') ||
      semanticString.startsWith('focus') ||
      semanticString.startsWith('variant') ||
      semanticString.startsWith('default') ||
      semanticString.includes('action') ||
      semanticString.includes('link') ||
      semanticString.startsWith('list') ||
      semanticString.startsWith('button') ||
      semanticString.startsWith('menu') ||
      semanticString.startsWith('input') ||
      semanticString.startsWith('small')
    );
  };

  /**
   * Filters the list of semantic slots pulled from getVariant to only ones with strings that are appropriate.
   * The appropriate ones are in the method above 'isASemanticColor'. These are the only ones we selected to include
   * on the theme designer site. Input can be type ISemanticColors, which is a dictionary mapping each slot to
   * its hex color value or an array of strings. Output is similar whether an array or a dictionary.
   */
  function trimSemanticSlotsOrNames(semanticSlots: ISemanticColors): Partial<ISemanticColors>;
  function trimSemanticSlotsOrNames(semanticSlots: Array<string>): Array<string>;
  function trimSemanticSlotsOrNames(
    semanticSlots: Array<string> | ISemanticColors,
  ): Array<string> | Partial<ISemanticColors> {
    if (semanticSlots instanceof Array) {
      let trimmedSemanticSlotNames = [];
      for (let i = 0; i < semanticSlots.length; i++) {
        let slotName = semanticSlots[i];
        if (isASemanticColor(slotName)) {
          trimmedSemanticSlotNames.push(slotName);
        }
      }
      return trimmedSemanticSlotNames;
    } else {
      let trimmedSemanticSlots: Partial<ISemanticColors> = {};
      for (let semanticColor in semanticSlots) {
        if (isASemanticColor(semanticColor)) {
          trimmedSemanticSlots[semanticColor as keyof ISemanticColors] =
            semanticSlots[semanticColor as keyof ISemanticColors];
        }
      }
      return trimmedSemanticSlots;
    }
  }

  const fillVariantSlotsList = (variantType: VariantThemeType): JSX.Element[] => {
    if (props.theme) {
      let currThemeVariant: ITheme;
      let noneVariant = getVariant(props.theme, VariantThemeType.None);
      currThemeVariant = getVariant(props.theme, variantType);
      const currVariantSemanticSlots = currThemeVariant.semanticColors;
      /* "trimming" to get rid of the semantic color slots & palette slots we don't use for theme designer app */
      const trimmedSemanticSlots = trimSemanticSlotsOrNames(currVariantSemanticSlots);
      // palette slot values should be based off the default variant
      const currVariantPaletteSlots = noneVariant.palette;
      const trimmedPaletteSlots = trimPaletteSlots(currVariantPaletteSlots);
      const mapping: IMapping = {};
      /**
       * Iterate through the list of semantic colors.
       * For each semantic color, check if its hex color string is in the list of palette colors.
       * If it is, add it to the mapping.
       */
      for (let semanticColor in trimmedSemanticSlots) {
        if (semanticColor) {
          const paletteColorHexStr = trimmedSemanticSlots[semanticColor as keyof ISemanticColors];
          for (let palette in trimmedPaletteSlots) {
            if (trimmedPaletteSlots[palette] === paletteColorHexStr) {
              mapping[semanticColor] = palette;
            } else if (paletteColorHexStr === 'transparent') {
              mapping[semanticColor] = 'transparent';
            }
          }
        }
      }
      const tempJSXList: JSX.Element[] = [];
      for (let i = 0; i < slotNames.length; i++) {
        let slot = slotNames[i];
        let currSlotJSX = semanticSlotWidget(currVariantSemanticSlots[slot as keyof ISemanticColors], mapping[slot]);
        tempJSXList.push(currSlotJSX);
      }
      return tempJSXList;
    } else {
      return [];
    }
  };

  let semanticSlotsNone = props.theme!.semanticColors;
  slotNames = trimSemanticSlotsOrNames(Object.keys(semanticSlotsNone)) as ISlotNames;
  noneSlots = fillVariantSlotsList(VariantThemeType.None);
  neutralSlots = fillVariantSlotsList(VariantThemeType.Neutral);
  softSlots = fillVariantSlotsList(VariantThemeType.Soft);
  strongSlots = fillVariantSlotsList(VariantThemeType.Strong);

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
