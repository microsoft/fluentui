import * as React from 'react';
import { FabricSlots, IThemeRules } from 'office-ui-fabric-react/lib/ThemeGenerator';
import { MainPanelInnerContent } from '../shared/MainPanelStyles';
import { mergeStyles } from '@uifabric/merge-styles';
import { Stack, Text } from 'office-ui-fabric-react';

export interface IFabricPaletteProps {
  themeRules?: IThemeRules;
}

const tableClassName = mergeStyles({
  width: '100%',
  selectors: {
    thead: {
      textAlign: 'center'
    },
    tr: {
      padding: 80,
      textAlign: 'left'
    },
    th: {
      display: 'table-cell'
    },
    td: {
      padding: 10,
      textAlign: 'left',
      display: 'table-cell'
    }
  }
});

const slotClassName = mergeStyles({
  display: 'flex',
  alignItems: 'center',
  overflow: 'auto'
});

const fabricPaletteColorBox = mergeStyles({
  width: 15,
  height: 15,
  display: 'inline-block',
  left: 5,
  top: 5,
  border: '1px solid black',
  flexShrink: 0
});

export const FabricPalette: React.StatelessComponent<IFabricPaletteProps> = (props: IFabricPaletteProps) => {
  const fabricSlotWidget = (fabricSlot: FabricSlots): JSX.Element => {
    const slotRule = props.themeRules![FabricSlots[fabricSlot]];
    return (
      <div key={slotRule.name} className={slotClassName}>
        <Stack horizontal gap={5}>
          <div key={slotRule.name} className={fabricPaletteColorBox} style={{ backgroundColor: slotRule.color!.str }} />
          <div>{slotRule.name}</div>
        </Stack>
      </div>
    );
  };

  return (
    <div className={MainPanelInnerContent}>
      <table className={tableClassName}>
        <thead>
          <tr>
            <Text as="th"> Primary</Text>
            <Text as="th"> Hex</Text>
            <Text as="th"> Foreground</Text>
            <Text as="th"> Hex</Text>
            <Text as="th"> Background</Text>
            <Text as="th"> Hex</Text>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Text as="td">{fabricSlotWidget(FabricSlots.themeDarker)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.themeDarker]].color!.str}</Text>
            <Text as="td">{fabricSlotWidget(FabricSlots.black)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.black]].color!.str}</Text>
            <Text as="td">{fabricSlotWidget(FabricSlots.neutralTertiaryAlt)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.neutralTertiaryAlt]].color!.str}</Text>
          </tr>
          <tr>
            <Text as="td">{fabricSlotWidget(FabricSlots.themeDark)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.themeDark]].color!.str}</Text>
            <Text as="td">{fabricSlotWidget(FabricSlots.neutralDark)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.neutralDark]].color!.str}</Text>
            <Text as="td">{fabricSlotWidget(FabricSlots.neutralQuaternary)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.neutralQuaternary]].color!.str}</Text>
          </tr>
          <tr>
            <Text as="td">{fabricSlotWidget(FabricSlots.themeDarkAlt)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.themeDarkAlt]].color!.str}</Text>
            <Text as="td">{fabricSlotWidget(FabricSlots.neutralPrimary)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.neutralPrimary]].color!.str}</Text>
            <Text as="td">{fabricSlotWidget(FabricSlots.neutralQuaternaryAlt)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.neutralQuaternaryAlt]].color!.str}</Text>
          </tr>
          <tr>
            <Text as="td">{fabricSlotWidget(FabricSlots.themePrimary)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.themePrimary]].color!.str}</Text>
            <Text as="td">{fabricSlotWidget(FabricSlots.neutralPrimaryAlt)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.neutralPrimaryAlt]].color!.str}</Text>
            <Text as="td">{fabricSlotWidget(FabricSlots.neutralLight)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.neutralLight]].color!.str}</Text>
          </tr>
          <tr>
            <Text as="td">{fabricSlotWidget(FabricSlots.themeSecondary)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.themeSecondary]].color!.str}</Text>
            <Text as="td">{fabricSlotWidget(FabricSlots.neutralSecondary)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.neutralSecondary]].color!.str}</Text>
            <Text as="td">{fabricSlotWidget(FabricSlots.neutralLighter)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.neutralLighter]].color!.str}</Text>
          </tr>
          <tr>
            <Text as="td">{fabricSlotWidget(FabricSlots.themeTertiary)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.themeTertiary]].color!.str}</Text>
            <Text as="td">{fabricSlotWidget(FabricSlots.neutralTertiary)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.neutralTertiaryAlt]].color!.str}</Text>
            <Text as="td">{fabricSlotWidget(FabricSlots.neutralLighterAlt)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.neutralLighterAlt]].color!.str}</Text>
          </tr>
          <tr>
            <Text as="td">{fabricSlotWidget(FabricSlots.themeLight)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.themeLight]].color!.str}</Text>
            <Text as="td">{fabricSlotWidget(FabricSlots.white)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.white]].color!.str}</Text>
          </tr>
          <tr>
            <Text as="td">{fabricSlotWidget(FabricSlots.themeLighter)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.themeLighter]].color!.str}</Text>
          </tr>
          <tr>
            <Text as="td">{fabricSlotWidget(FabricSlots.themeLighterAlt)}</Text>
            <Text as="td">{props.themeRules![FabricSlots[FabricSlots.themeLighterAlt]].color!.str}</Text>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
