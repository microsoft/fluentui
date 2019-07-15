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

export class FabricPalette extends React.Component<IFabricPaletteProps, {}> {
  constructor(props: IFabricPaletteProps) {
    super(props);
  }

  public render() {
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
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.themeDarker}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.leftCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.themeDarker]].color.str}</div>
              </Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.black}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.topCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.black]].color.str}</div>
              </Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralTertiaryAlt}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.topCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.neutralTertiaryAlt]].color.str}</div>
              </Text>
            </tr>
            <tr>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.themeDark}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.leftCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.themeDark]].color.str}</div>
              </Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralDark}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.leftCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.neutralDark]].color.str}</div>
              </Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralQuaternary}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.leftCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.neutralQuaternary]].color.str}</div>
              </Text>
            </tr>
            <tr>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.themeDarkAlt}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.leftCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.themeDarkAlt]].color.str}</div>
              </Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralPrimary}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.leftCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.neutralPrimary]].color.str}</div>
              </Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralQuaternaryAlt}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.leftCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.neutralQuaternaryAlt]].color.str}</div>
              </Text>
            </tr>
            <tr>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.themePrimary}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.leftCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.themePrimary]].color.str}</div>
              </Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralPrimaryAlt}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.leftCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.neutralPrimaryAlt]].color.str}</div>
              </Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralLight}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.leftCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.neutralLight]].color.str}</div>
              </Text>
            </tr>
            <tr>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.themeSecondary}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.leftCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.themeSecondary]].color.str}</div>
              </Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralSecondary}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.leftCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.neutralSecondary]].color.str}</div>
              </Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralLighter}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.leftCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.neutralLighter]].color.str}</div>
              </Text>
            </tr>
            <tr>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.themeTertiary}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.leftCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.themeTertiary]].color.str}</div>
              </Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralTertiary}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.leftCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.neutralTertiary]].color.str}</div>
              </Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralLighterAlt}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.leftCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.neutralLighterAlt]].color.str}</div>
              </Text>
            </tr>
            <tr>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.themeLight}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.leftCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.themeLight]].color.str}</div>
              </Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.white}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.leftCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.white]].color.str}</div>
              </Text>
            </tr>
            <tr>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.themeLighter}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.leftCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.themeLighter]].color.str}</div>
              </Text>
            </tr>
            <tr>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.themeLighterAlt}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                  directionalHint={DirectionalHint.leftCenter}
                />
              </Text>
              <Text as="td">
                <div>{this.props.themeRules[FabricSlots[FabricSlots.themeLighterAlt]].color.str}</div>
              </Text>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
