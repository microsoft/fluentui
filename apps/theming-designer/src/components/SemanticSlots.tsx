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

  const trimPaletteColors = (paletteColors: {}): {} => {
    let trimmedPaletteColors = {};
    for (let palette in paletteColors) {
      if (
        palette.startsWith('theme') ||
        palette.startsWith('neutral') ||
        palette === 'black' ||
        palette === 'white' ||
        palette === 'redDark' ||
        palette === 'accent'
      ) {
        (trimmedPaletteColors as any)[palette] = (paletteColors as any)[palette];
      }
    }
    return trimmedPaletteColors;
  };

  const trimSemanticColors = (semanticColors: {}): {} => {
    let trimmedSemanticColors = {};
    for (let semanticColor in semanticColors) {
      if (
        semanticColor.startsWith('body') ||
        semanticColor.startsWith('disabled') ||
        semanticColor.startsWith('focus') ||
        semanticColor.startsWith('variant') ||
        semanticColor.startsWith('default') ||
        semanticColor.includes('action') ||
        semanticColor.includes('link') ||
        semanticColor.startsWith('accent') ||
        semanticColor.startsWith('list') ||
        semanticColor.startsWith('button') ||
        semanticColor.startsWith('menu') ||
        semanticColor.startsWith('input')
      ) {
        (trimmedSemanticColors as any)[semanticColor] = (semanticColors as any)[semanticColor];
      }
    }
    return trimmedSemanticColors;
  };

  const trimSemanticSlotNames = (semanticSlotNames: string[]): any => {
    let trimmedSemanticSlotNames = [];
    for (let i = 0; i < semanticSlotNames.length; i++) {
      let slotName = (semanticSlotNames as any)[i];
      if (
        slotName.includes('body') ||
        slotName.includes('disabled') ||
        slotName.includes('focus') ||
        slotName.includes('variant') ||
        slotName.includes('default') ||
        slotName.includes('action') ||
        slotName.includes('link') ||
        slotName.includes('accent') ||
        slotName.includes('list') ||
        slotName.includes('button') ||
        slotName.includes('menu') ||
        slotName.includes('input')
      ) {
        trimmedSemanticSlotNames.push(slotName);
      }
    }
    return trimmedSemanticSlotNames;
  };

  const fillVariantSlotsList = (variantType: VariantThemeType): JSX.Element[] => {
    let currThemeVariant: ITheme;
    if (props.theme) {
      currThemeVariant = getVariant(props.theme, variantType);
      let currVariantSemanticColors = currThemeVariant.semanticColors;
      // "trimming" to get rid of the seamantic color slots & palette slots we don't use for theme designer app
      const trimmedSemanticColors = trimSemanticColors(currVariantSemanticColors);
      console.log('semantic colors', trimmedSemanticColors);
      let currVariantPaletteColors = currThemeVariant.palette;
      const onlyPaletteColors = trimPaletteColors(currVariantPaletteColors);
      console.log('palette colors: ', onlyPaletteColors);
      const mapping = {};
      // Iterate through the list of semantic colors
      // for each semantic color, check if it's hex color string is in the list of palette colors
      // if it is, add it to the mapping
      for (let semanticColor in trimmedSemanticColors) {
        if (semanticColor) {
          const paletteColorHexStr = (trimmedSemanticColors as any)[semanticColor];
          for (let palette in props.theme.palette) {
            if ((onlyPaletteColors as any)[palette] === paletteColorHexStr) {
              (mapping as any)[semanticColor] = palette;
            } else if (paletteColorHexStr === 'transparent') {
              (mapping as any)[semanticColor] = 'transparent';
            }
          }
        }
      }
      let tempJSXList: JSX.Element[];
      tempJSXList = [];
      for (let i = 0; i < slotNames.length; i++) {
        let slot = slotNames[i];
        let currSlotJSX = semanticSlotWidget((currVariantSemanticColors as any)[slot], (mapping as any)[slot]);
        tempJSXList.push(currSlotJSX);
      }
      return tempJSXList;
    } else {
      return [];
    }
  };

  let semanticColorsNone = props.theme.semanticColors;
  slotNames = trimSemanticSlotNames(Object.keys(semanticColorsNone));
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
