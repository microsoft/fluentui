import * as React from 'react';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';
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

export const SemanticSlots: React.StatelessComponent<ISemanticSlotsProps> = (props: ISemanticSlotsProps) => {
  let slotNames: string[] = [];
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

  const trimPaletteSlots = (paletteSlots: {}): {} => {
    let trimmedPaletteSlots = {};
    for (let palette in paletteSlots) {
      if (
        palette.startsWith('theme') ||
        palette.startsWith('neutral') ||
        palette === 'black' ||
        palette === 'white' ||
        palette === 'redDark' ||
        palette === 'accent'
      ) {
        (trimmedPaletteSlots as any)[palette] = (paletteSlots as any)[palette];
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
      semanticString.startsWith('input')
    );
  };

  const trimSemanticSlotsOrNames = (semanticSlots: {} | string[]): {} | string[] => {
    if (semanticSlots instanceof Array) {
      let trimmedSemanticSlotNames = [];
      for (let i = 0; i < semanticSlots.length; i++) {
        let slotName = (semanticSlots as any)[i];
        if (isASemanticColor(slotName)) {
          trimmedSemanticSlotNames.push(slotName);
        }
      }
      return trimmedSemanticSlotNames;
    } else {
      let trimmedSemanticSlots = {};
      for (let semanticColor in semanticSlots) {
        if (isASemanticColor(semanticColor)) {
          (trimmedSemanticSlots as any)[semanticColor] = (semanticSlots as any)[semanticColor];
        }
      }
      return trimmedSemanticSlots;
    }
  };

  const fillVariantSlotsList = (variantType: VariantThemeType): JSX.Element[] => {
    let currThemeVariant: ITheme;
    if (props.theme) {
      currThemeVariant = getVariant(props.theme, variantType);
      const currVariantSemanticSlots = currThemeVariant.semanticColors;
      // "trimming" to get rid of the seamantic color slots & palette slots we don't use for theme designer app
      const trimmedSemanticSlots = trimSemanticSlotsOrNames(currVariantSemanticSlots);
      const currVariantPaletteSlots = currThemeVariant.palette;
      const trimmedPaletteSlots = trimPaletteSlots(currVariantPaletteSlots);
      const mapping = {};
      // Iterate through the list of semantic colors
      // for each semantic color, check if it's hex color string is in the list of palette colors
      // if it is, add it to the mapping
      for (let semanticColor in trimmedSemanticSlots) {
        if (semanticColor) {
          const paletteColorHexStr = (trimmedSemanticSlots as any)[semanticColor];
          for (let palette in trimmedPaletteSlots) {
            if ((trimmedPaletteSlots as any)[palette] === paletteColorHexStr) {
              (mapping as any)[semanticColor] = palette;
            } else if (paletteColorHexStr === 'transparent') {
              (mapping as any)[semanticColor] = 'transparent';
            }
          }
        }
      }
      const tempJSXList: JSX.Element[] = [];
      for (let i = 0; i < slotNames.length; i++) {
        let slot = slotNames[i];
        let currSlotJSX = semanticSlotWidget((currVariantSemanticSlots as any)[slot], (mapping as any)[slot]);
        tempJSXList.push(currSlotJSX);
      }
      return tempJSXList;
    } else {
      return [];
    }
  };

  let semanticSlotsNone = props.theme.semanticColors;
  (slotNames as any) = trimSemanticSlotsOrNames(Object.keys(semanticSlotsNone));
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
