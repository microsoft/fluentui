import * as React from 'react';
import { FabricSlots, IThemeRules } from '@fluentui/react/lib/ThemeGenerator';
import { MainPanelInnerContent } from '../shared/MainPanelStyles';
import { mergeStyles } from '@fluentui/merge-styles';
import { Text } from '@fluentui/react';
import { IColor } from '@fluentui/react/lib/Color';
import { FabricSlotWidget } from './FabricSlotWidget';
import { DirectionalHint } from '@fluentui/react/lib/Callout';

export interface IFabricPaletteProps {
  themeRules?: IThemeRules;
  onFabricPaletteColorChange: (newColor: IColor | undefined, fabricSlot: FabricSlots) => void;
}

const tableClassName = mergeStyles({
  width: '100%',
  selectors: {
    thead: {
      textAlign: 'center',
    },
    tr: {
      padding: 80,
      textAlign: 'left',
    },
    th: {
      display: 'table-cell',
    },
    td: {
      padding: 10,
      textAlign: 'left',
      display: 'table-cell',
    },
  },
});

export const FabricPalette: React.FunctionComponent<IFabricPaletteProps> = (props: IFabricPaletteProps) => {
  const { themeRules, onFabricPaletteColorChange } = props;
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
                slotRule={themeRules[FabricSlots[FabricSlots.themeDarker]]}
                slot={FabricSlots.themeDarker}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.themeDarker]].color.str}</Text>
            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.black]]}
                slot={FabricSlots.black}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.topCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.black]].color.str}</Text>
            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.neutralTertiaryAlt]]}
                slot={FabricSlots.neutralTertiaryAlt}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.topCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.neutralTertiaryAlt]].color.str}</Text>
          </tr>
          <tr>
            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.themeDark]]}
                slot={FabricSlots.themeDark}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.themeDark]].color.str}</Text>
            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.neutralDark]]}
                slot={FabricSlots.neutralDark}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.neutralDark]].color.str}</Text>
            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.neutralDark]]}
                slot={FabricSlots.neutralQuaternary}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.neutralDark]].color.str}</Text>
          </tr>
          <tr>
            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.themeDarkAlt]]}
                slot={FabricSlots.themeDarkAlt}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.themeDarkAlt]].color.str}</Text>
            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.neutralPrimary]]}
                slot={FabricSlots.neutralPrimary}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.neutralPrimary]].color.str}</Text>
            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.neutralQuaternaryAlt]]}
                slot={FabricSlots.neutralQuaternaryAlt}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.neutralQuaternaryAlt]].color.str}</Text>
          </tr>
          <tr>
            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.themePrimary]]}
                slot={FabricSlots.themePrimary}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.themePrimary]].color.str}</Text>
            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.neutralPrimaryAlt]]}
                slot={FabricSlots.neutralPrimaryAlt}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.neutralPrimaryAlt]].color.str}</Text>
            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.neutralLight]]}
                slot={FabricSlots.neutralLight}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.neutralLight]].color.str}</Text>
          </tr>
          <tr>
            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.themeSecondary]]}
                slot={FabricSlots.themeSecondary}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.themeSecondary]].color.str}</Text>
            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.neutralSecondary]]}
                slot={FabricSlots.neutralSecondary}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.neutralSecondary]].color.str}</Text>
            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.neutralLighter]]}
                slot={FabricSlots.neutralLighter}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.neutralLighter]].color.str}</Text>
          </tr>
          <tr>
            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.themeTertiary]]}
                slot={FabricSlots.themeTertiary}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.themeTertiary]].color.str}</Text>
            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.neutralTertiary]]}
                slot={FabricSlots.neutralTertiary}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.neutralTertiary]].color.str}</Text>
            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.neutralLighterAlt]]}
                slot={FabricSlots.neutralLighterAlt}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.neutralLighterAlt]].color.str}</Text>
          </tr>
          <tr>
            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.themeLight]]}
                slot={FabricSlots.themeLight}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.themeLight]].color.str}</Text>

            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.neutralSecondaryAlt]]}
                slot={FabricSlots.neutralSecondaryAlt}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.neutralSecondaryAlt]].color.str}</Text>
          </tr>
          <tr>
            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.themeLighter]]}
                slot={FabricSlots.themeLighter}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.themeLighter]].color.str}</Text>
            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.white]]}
                slot={FabricSlots.white}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.white]].color.str}</Text>
          </tr>
          <tr>
            <Text as="td">
              <FabricSlotWidget
                slotRule={themeRules[FabricSlots[FabricSlots.themeLighterAlt]]}
                slot={FabricSlots.themeLighterAlt}
                onFabricPaletteColorChange={onFabricPaletteColorChange}
                directionalHint={DirectionalHint.leftCenter}
              />
            </Text>
            <Text as="td">{themeRules[FabricSlots[FabricSlots.themeLighterAlt]].color.str}</Text>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
