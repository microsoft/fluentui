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
    td: {
      padding: 10,
      textAlign: 'left'
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
      <Text variant="xxLarge">Fabric palette</Text>
      <table className={tableClassName}>
        <thead>
          <tr>
            <th>
              <Text> Primary</Text>
            </th>
            <th>
              <Text> Hex</Text>
            </th>
            <th>
              <Text> Foreground</Text>
            </th>
            <th>
              <Text> Hex</Text>
            </th>
            <th>
              <Text> Background</Text>
            </th>
            <th>
              <Text> Hex</Text>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Text>{fabricSlotWidget(FabricSlots.themeDarker)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.themeDarker]].color!.str}</Text>
            </td>
            <td>
              <Text>{fabricSlotWidget(FabricSlots.black)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.black]].color!.str}</Text>
            </td>
            <td>
              <Text>{fabricSlotWidget(FabricSlots.neutralTertiaryAlt)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.neutralTertiaryAlt]].color!.str}</Text>
            </td>
          </tr>
          <tr>
            <td>
              <Text>{fabricSlotWidget(FabricSlots.themeDark)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.themeDark]].color!.str}</Text>
            </td>
            <td>
              <Text>{fabricSlotWidget(FabricSlots.neutralDark)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.neutralDark]].color!.str}</Text>
            </td>
            <td>
              <Text>{fabricSlotWidget(FabricSlots.neutralQuaternary)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.neutralQuaternary]].color!.str}</Text>
            </td>
          </tr>
          <tr>
            <td>
              <Text>{fabricSlotWidget(FabricSlots.themeDarkAlt)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.themeDarkAlt]].color!.str}</Text>
            </td>
            <td>
              <Text>{fabricSlotWidget(FabricSlots.neutralPrimary)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.neutralPrimary]].color!.str}</Text>
            </td>
            <td>
              <Text>{fabricSlotWidget(FabricSlots.neutralQuaternaryAlt)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.neutralQuaternaryAlt]].color!.str}</Text>
            </td>
          </tr>
          <tr>
            <td>
              <Text>{fabricSlotWidget(FabricSlots.themePrimary)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.themePrimary]].color!.str}</Text>
            </td>
            <td>
              <Text>{fabricSlotWidget(FabricSlots.neutralPrimaryAlt)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.neutralPrimaryAlt]].color!.str}</Text>
            </td>
            <td>
              <Text>{fabricSlotWidget(FabricSlots.neutralLight)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.neutralLight]].color!.str}</Text>
            </td>
          </tr>
          <tr>
            <td>
              <Text>{fabricSlotWidget(FabricSlots.themeSecondary)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.themeSecondary]].color!.str}</Text>
            </td>
            <td>
              <Text>{fabricSlotWidget(FabricSlots.neutralSecondary)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.neutralSecondary]].color!.str}</Text>
            </td>
            <td>
              <Text>{fabricSlotWidget(FabricSlots.neutralLighter)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.neutralLighter]].color!.str}</Text>
            </td>
          </tr>
          <tr>
            <td>
              <Text>{fabricSlotWidget(FabricSlots.themeTertiary)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.themeTertiary]].color!.str}</Text>
            </td>
            <td>
              <Text>{fabricSlotWidget(FabricSlots.neutralTertiary)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.neutralTertiaryAlt]].color!.str}</Text>
            </td>
            <td>
              <Text>{fabricSlotWidget(FabricSlots.neutralLighterAlt)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.neutralLighterAlt]].color!.str}</Text>
            </td>
          </tr>
          <tr>
            <td>
              <Text>{fabricSlotWidget(FabricSlots.themeLight)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.themeLight]].color!.str}</Text>
            </td>
            <td />
            <td />
            <td>
              <Text>{fabricSlotWidget(FabricSlots.white)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.white]].color!.str}</Text>
            </td>
          </tr>
          <tr>
            <td>
              <Text>{fabricSlotWidget(FabricSlots.themeLighter)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.themeLighter]].color!.str}</Text>
            </td>
          </tr>
          <tr>
            <td>
              <Text>{fabricSlotWidget(FabricSlots.themeLighterAlt)}</Text>
            </td>
            <td>
              <Text>{props.themeRules![FabricSlots[FabricSlots.themeLighterAlt]].color!.str}</Text>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
