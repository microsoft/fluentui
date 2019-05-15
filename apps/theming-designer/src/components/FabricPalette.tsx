import * as React from 'react';
import { FabricSlots, IThemeRules } from 'office-ui-fabric-react/lib/ThemeGenerator';
import { MainPanelInnerContent } from '../shared/MainPanelStyles';
import { mergeStyles } from '@uifabric/merge-styles';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

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
      <h1>Fabric palette</h1>
      <table className={tableClassName}>
        <thead>
          <tr>
            <th>Primary</th>
            <th>Hex</th>
            <th>Foreground</th>
            <th>Hex</th>
            <th>Background</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{fabricSlotWidget(FabricSlots.themeDarker)}</td> {/*fabricThemeSlots*/}
            <td>{props.themeRules![FabricSlots[FabricSlots.themeDarker]].color!.str}</td>
            <td>{fabricSlotWidget(FabricSlots.black)}</td> {/*fabricNeutralForegroundSlots*/}
            <td>{props.themeRules![FabricSlots[FabricSlots.black]].color!.str}</td>
            <td>{fabricSlotWidget(FabricSlots.neutralTertiaryAlt)}</td> {/*fabricNeutralBackgroundSlots*/}
            <td>{props.themeRules![FabricSlots[FabricSlots.neutralTertiaryAlt]].color!.str}</td>
          </tr>
          <tr>
            <td>{fabricSlotWidget(FabricSlots.themeDark)}</td>
            <td>{props.themeRules![FabricSlots[FabricSlots.themeDark]].color!.str}</td>
            <td>{fabricSlotWidget(FabricSlots.neutralDark)}</td>
            <td>{props.themeRules![FabricSlots[FabricSlots.neutralDark]].color!.str}</td>
            <td>{fabricSlotWidget(FabricSlots.neutralQuaternary)}</td>
            <td>{props.themeRules![FabricSlots[FabricSlots.neutralQuaternary]].color!.str}</td>
          </tr>
          <tr>
            <td>{fabricSlotWidget(FabricSlots.themeDarkAlt)}</td>
            <td>{props.themeRules![FabricSlots[FabricSlots.themeDarkAlt]].color!.str}</td>
            <td>{fabricSlotWidget(FabricSlots.neutralPrimary)}</td>
            <td>{props.themeRules![FabricSlots[FabricSlots.neutralPrimary]].color!.str}</td>
            <td>{fabricSlotWidget(FabricSlots.neutralQuaternaryAlt)}</td>
            <td>{props.themeRules![FabricSlots[FabricSlots.neutralQuaternaryAlt]].color!.str}</td>
          </tr>
          <tr>
            <td>{fabricSlotWidget(FabricSlots.themePrimary)}</td>
            <td>{props.themeRules![FabricSlots[FabricSlots.themePrimary]].color!.str}</td>
            <td>{fabricSlotWidget(FabricSlots.neutralPrimaryAlt)}</td>
            <td>{props.themeRules![FabricSlots[FabricSlots.neutralPrimaryAlt]].color!.str}</td>
            <td>{fabricSlotWidget(FabricSlots.neutralLight)}</td>
            <td>{props.themeRules![FabricSlots[FabricSlots.neutralLight]].color!.str}</td>
          </tr>
          <tr>
            <td>{fabricSlotWidget(FabricSlots.themeSecondary)}</td>
            <td>{props.themeRules![FabricSlots[FabricSlots.themeSecondary]].color!.str}</td>
            <td>{fabricSlotWidget(FabricSlots.neutralSecondary)}</td>
            <td>{props.themeRules![FabricSlots[FabricSlots.neutralSecondary]].color!.str}</td>
            <td>{fabricSlotWidget(FabricSlots.neutralLighter)}</td>
            <td>{props.themeRules![FabricSlots[FabricSlots.neutralLighter]].color!.str}</td>
          </tr>
          <tr>
            <td>{fabricSlotWidget(FabricSlots.themeTertiary)}</td>
            <td>{props.themeRules![FabricSlots[FabricSlots.themeTertiary]].color!.str}</td>
            <td>{fabricSlotWidget(FabricSlots.neutralTertiary)}</td>
            <td>{props.themeRules![FabricSlots[FabricSlots.neutralTertiaryAlt]].color!.str}</td>
            <td>{fabricSlotWidget(FabricSlots.neutralLighterAlt)}</td>
            <td>{props.themeRules![FabricSlots[FabricSlots.neutralLighterAlt]].color!.str}</td>
          </tr>
          <tr>
            <td>{fabricSlotWidget(FabricSlots.themeLight)}</td>
            <td>{props.themeRules![FabricSlots[FabricSlots.themeLight]].color!.str}</td>
            <td />
            <td />
            <td>{fabricSlotWidget(FabricSlots.white)}</td>
            <td>{props.themeRules![FabricSlots[FabricSlots.white]].color!.str}</td>
          </tr>
          <tr>
            <td>{fabricSlotWidget(FabricSlots.themeLighter)}</td>
            <td>{props.themeRules![FabricSlots[FabricSlots.themeLighter]].color!.str}</td>
          </tr>
          <tr>
            <td>{fabricSlotWidget(FabricSlots.themeLighterAlt)}</td>
            <td>{props.themeRules![FabricSlots[FabricSlots.themeLighterAlt]].color!.str}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
