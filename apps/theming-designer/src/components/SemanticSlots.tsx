import * as React from 'react';
import { ITheme, IPalette, ISemanticColors } from 'office-ui-fabric-react/lib/Styling';
import { Stack } from 'office-ui-fabric-react';
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

type IPaletteSlots = {
  [key: string]: string;
};

type ISemanticSlots = {
  [key: string]: string;
};

type IMapping = {
  [key: string]: string;
};

type ISlotNames = string[];

export const SemanticSlots: React.StatelessComponent<ISemanticSlotsProps> = (props: ISemanticSlotsProps) => {
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

  const trimPaletteSlots = (paletteSlots: IPalette): IPaletteSlots => {
    let trimmedPaletteSlots: IPaletteSlots = {};
    for (let palette in paletteSlots) {
      if (
        palette.startsWith('theme') ||
        palette.startsWith('neutral') ||
        palette === 'black' ||
        palette === 'white' ||
        palette === 'redDark' ||
        palette === 'accent'
      ) {
        trimmedPaletteSlots[palette] = (paletteSlots as any)[palette];
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
      semanticString.startsWith('accent') ||
      semanticString.startsWith('list') ||
      semanticString.startsWith('button') ||
      semanticString.startsWith('menu') ||
      semanticString.startsWith('input') ||
      semanticString.startsWith('small')
    );
  };

  const trimSemanticSlotsOrNames = (semanticSlots: ISemanticColors | string[]): ISemanticSlots | string[] => {
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
      let trimmedSemanticSlots: ISemanticSlots = {};
      for (let semanticColor in semanticSlots) {
        if (isASemanticColor(semanticColor)) {
          trimmedSemanticSlots[semanticColor] = (semanticSlots as any)[semanticColor];
        }
      }
      return trimmedSemanticSlots;
    }
  };

  const fillVariantSlotsList = (variantType: VariantThemeType): JSX.Element[] => {
    let currThemeVariant: ITheme;
    let noneVariant = getVariant(props.theme, VariantThemeType.None);
    if (props.theme) {
      currThemeVariant = getVariant(props.theme, variantType);
      const currVariantSemanticSlots = currThemeVariant.semanticColors;
      // "trimming" to get rid of the seamantic color slots & palette slots we don't use for theme designer app
      const trimmedSemanticSlots = trimSemanticSlotsOrNames(currVariantSemanticSlots);
      const currVariantPaletteSlots = noneVariant.palette; // palette slot values should be based off the default variant
      const trimmedPaletteSlots = trimPaletteSlots(currVariantPaletteSlots);
      const mapping: IMapping = {};
      // Iterate through the list of semantic colors
      // for each semantic color, check if it's hex color string is in the list of palette colors
      // if it is, add it to the mapping
      for (let semanticColor in trimmedSemanticSlots) {
        if (semanticColor) {
          const paletteColorHexStr = (trimmedSemanticSlots as any)[semanticColor];
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
        let currSlotJSX = semanticSlotWidget((currVariantSemanticSlots as any)[slot], mapping[slot]);
        tempJSXList.push(currSlotJSX);
      }
      return tempJSXList;
    } else {
      return [];
    }
  };

  let semanticSlotsNone = props.theme.semanticColors;
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
