import * as React from 'react';
import { ITheme, makeSemanticColorsFromPalette, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
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

  const trimPaletteColors = (paletteColors: {}): any => {
    let trimmedPaletteColors = {};
    for (let palette in paletteColors) {
      if (
        palette.includes('theme') ||
        palette.includes('neutral') ||
        palette.includes('black') ||
        palette.includes('white') ||
        palette.includes('redDark') ||
        palette.includes('accent')
      ) {
        (trimmedPaletteColors as any)[palette] = (paletteColors as any)[palette];
      }
    }
    return trimmedPaletteColors;
  };

  const trimSemanticColors = (semanticColors: {}): any => {
    let trimmedSemanticColors = {};
    for (let semanticColor in semanticColors) {
      if (
        semanticColor.includes('body') ||
        semanticColor.includes('disabled') ||
        semanticColor.includes('focus') ||
        semanticColor.includes('variant') ||
        semanticColor.includes('default') ||
        semanticColor.includes('action') ||
        semanticColor.includes('link') ||
        semanticColor.includes('accent') ||
        semanticColor.includes('list') ||
        semanticColor.includes('button') ||
        semanticColor.includes('menu') ||
        semanticColor.includes('input')
      ) {
        (trimmedSemanticColors as any)[semanticColor] = (semanticColors as any)[semanticColor];
      }
    }
    return trimmedSemanticColors;
  };

  const trimSemanticSlotNames = (semanticSlotNames: string[]): any => {
    console.log(semanticSlotNames);
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
        console.log('found one');
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
      const trimmedSemanticColors = trimSemanticColors(currVariantSemanticColors);
      console.log(trimmedSemanticColors);
      let currVariantPaletteColors = currThemeVariant.palette;
      const onlyPaletteColors = trimPaletteColors(currVariantPaletteColors);
      let mapping = {};
      for (let semanticColor in trimmedSemanticColors) {
        const paletteColorHexStr = (trimmedSemanticColors as any)[semanticColor];
        for (let palette in props.theme.palette) {
          if ((onlyPaletteColors as any)[palette] === paletteColorHexStr) {
            (mapping as any)[semanticColor] = palette;
          } else if (paletteColorHexStr === 'transparent') {
            (mapping as any)[semanticColor] = 'transparent';
          }
        }
      }
      let tempJSXList: JSX.Element[];
      tempJSXList = [];
      for (let i = 0; i < slotNames.length; i++) {
        let slot = slotNames[i];
        if ((mapping as any)[slot] === 'N/A') {
          let currSlotJSX = semanticSlotWidget('#ffffff', (mapping as any)[slot]);
          tempJSXList.push(currSlotJSX);
        } else {
          let currSlotJSX = semanticSlotWidget((currVariantSemanticColors as any)[slot], (mapping as any)[slot]);
          tempJSXList.push(currSlotJSX);
        }
      }
      return tempJSXList;
    } else {
      return [];
    }
  };

  let semanticColorsNone = makeSemanticColorsFromPalette(DefaultPalette, false, false);
  slotNames = trimSemanticSlotNames(Object.keys(semanticColorsNone));
  console.log(slotNames);
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
