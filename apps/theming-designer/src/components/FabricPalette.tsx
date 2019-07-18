import * as React from 'react';
import { FabricSlots, IThemeRules } from 'office-ui-fabric-react/lib/ThemeGenerator';
import { MainPanelInnerContent } from '../shared/MainPanelStyles';
import { mergeStyles } from '@uifabric/merge-styles';
import { Text } from 'office-ui-fabric-react';
import { IColor } from 'office-ui-fabric-react/lib/Color';
import { FabricSlotWidget } from './FabricSlotWidget';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';

export interface IFabricPaletteProps {
  themeRules?: IThemeRules;
  onFabricPaletteColorChange: (newColor: IColor | undefined, fabricSlot: FabricSlots) => void;
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

export const FabricPalette: React.StatelessComponent<IFabricPaletteProps> = (props: IFabricPaletteProps) => {
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
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.themeDarker}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.themeDarker]].color.str}</div>
            </Text>
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.black}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.topCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.black]].color.str}</div>
            </Text>
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.neutralTertiaryAlt}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.topCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.neutralTertiaryAlt]].color.str}</div>
            </Text>
          </tr>
          <tr>
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.themeDark}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.themeDark]].color.str}</div>
            </Text>
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.neutralDark}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.neutralDark]].color.str}</div>
            </Text>
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.neutralQuaternary}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.neutralQuaternary]].color.str}</div>
            </Text>
          </tr>
          <tr>
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.themeDarkAlt}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.themeDarkAlt]].color.str}</div>
            </Text>
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.neutralPrimary}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.neutralPrimary]].color.str}</div>
            </Text>
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.neutralQuaternaryAlt}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.neutralQuaternaryAlt]].color.str}</div>
            </Text>
          </tr>
          <tr>
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.themePrimary}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.themePrimary]].color.str}</div>
            </Text>
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.neutralPrimaryAlt}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.neutralPrimaryAlt]].color.str}</div>
            </Text>
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.neutralLight}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.neutralLight]].color.str}</div>
            </Text>
          </tr>
          <tr>
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.themeSecondary}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.themeSecondary]].color.str}</div>
            </Text>
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.neutralSecondary}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.neutralSecondary]].color.str}</div>
            </Text>
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.neutralLighter}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.neutralLighter]].color.str}</div>
            </Text>
          </tr>
          <tr>
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.themeTertiary}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.themeTertiary]].color.str}</div>
            </Text>
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.neutralTertiary}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.neutralTertiary]].color.str}</div>
            </Text>
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.neutralLighterAlt}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.neutralLighterAlt]].color.str}</div>
            </Text>
          </tr>
          <tr>
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.themeLight}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.themeLight]].color.str}</div>
            </Text>
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.white}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.white]].color.str}</div>
            </Text>
          </tr>
          <tr>
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.themeLighter}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.themeLighter]].color.str}</div>
            </Text>
          </tr>
          <tr>
            <Text as="td">
              <FabricSlotWidget
                themeRules={props.themeRules!}
                slot={FabricSlots.themeLighterAlt}
                onFabricPaletteColorChange={props.onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">
              <div>{props.themeRules[FabricSlots[FabricSlots.themeLighterAlt]].color.str}</div>
            </Text>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
