import * as React from 'react';
import { FabricSlots, IThemeRules } from 'office-ui-fabric-react/lib/ThemeGenerator';
import { MainPanelInnerContent } from '../shared/MainPanelStyles';
import { mergeStyles } from '@uifabric/merge-styles';
import { Stack, Text } from 'office-ui-fabric-react';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { IColor } from 'office-ui-fabric-react/lib/Color';

export interface IFabricPaletteProps {
  themeRules?: IThemeRules;
  onFabricPaletteColorChange: (newColor: IColor | undefined, fabricSlot: FabricSlots) => void;
}

export interface IFabricPaletteState {
  isColorPickerVisible: boolean;
  // currentFabricSlot: FabricSlots;
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

export class FabricPalette extends React.Component<IFabricPaletteProps, IFabricPaletteState> {
  private _colorPickerRef = React.createRef<HTMLDivElement>();
  constructor(props: IFabricPaletteProps) {
    super(props);
    this.state = {
      isColorPickerVisible: false
      // currentFabricSlot: FabricSlots.themeDark
    };

    this._updateColorPickerVisible = this._updateColorPickerVisible.bind(this);
    this._onCalloutDismiss = this._onCalloutDismiss.bind(this);
    this._onColorPickerChange = this._onColorPickerChange.bind(this);
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
              <Text as="td">{this._fabricSlotWidget(FabricSlots.themeDarker)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.themeDarker]].color!.str}</Text>
              <Text as="td">{this._fabricSlotWidget(FabricSlots.black)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.black]].color!.str}</Text>
              <Text as="td">{this._fabricSlotWidget(FabricSlots.neutralTertiaryAlt)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralTertiaryAlt]].color!.str}</Text>
            </tr>
            <tr>
              <Text as="td">{this._fabricSlotWidget(FabricSlots.themeDark)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.themeDark]].color!.str}</Text>
              <Text as="td">{this._fabricSlotWidget(FabricSlots.neutralDark)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralDark]].color!.str}</Text>
              <Text as="td">{this._fabricSlotWidget(FabricSlots.neutralQuaternary)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralQuaternary]].color!.str}</Text>
            </tr>
            <tr>
              <Text as="td">{this._fabricSlotWidget(FabricSlots.themeDarkAlt)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.themeDarkAlt]].color!.str}</Text>
              <Text as="td">{this._fabricSlotWidget(FabricSlots.neutralPrimary)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralPrimary]].color!.str}</Text>
              <Text as="td">{this._fabricSlotWidget(FabricSlots.neutralQuaternaryAlt)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralQuaternaryAlt]].color!.str}</Text>
            </tr>
            <tr>
              <Text as="td">{this._fabricSlotWidget(FabricSlots.themePrimary)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.themePrimary]].color!.str}</Text>
              <Text as="td">{this._fabricSlotWidget(FabricSlots.neutralPrimaryAlt)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralPrimaryAlt]].color!.str}</Text>
              <Text as="td">{this._fabricSlotWidget(FabricSlots.neutralLight)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralLight]].color!.str}</Text>
            </tr>
            <tr>
              <Text as="td">{this._fabricSlotWidget(FabricSlots.themeSecondary)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.themeSecondary]].color!.str}</Text>
              <Text as="td">{this._fabricSlotWidget(FabricSlots.neutralSecondary)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralSecondary]].color!.str}</Text>
              <Text as="td">{this._fabricSlotWidget(FabricSlots.neutralLighter)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralLighter]].color!.str}</Text>
            </tr>
            <tr>
              <Text as="td">{this._fabricSlotWidget(FabricSlots.themeTertiary)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.themeTertiary]].color!.str}</Text>
              <Text as="td">{this._fabricSlotWidget(FabricSlots.neutralTertiary)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralTertiaryAlt]].color!.str}</Text>
              <Text as="td">{this._fabricSlotWidget(FabricSlots.neutralLighterAlt)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralLighterAlt]].color!.str}</Text>
            </tr>
            <tr>
              <Text as="td">{this._fabricSlotWidget(FabricSlots.themeLight)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.themeLight]].color!.str}</Text>
              <Text as="td">{this._fabricSlotWidget(FabricSlots.white)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.white]].color!.str}</Text>
            </tr>
            <tr>
              <Text as="td">{this._fabricSlotWidget(FabricSlots.themeLighter)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.themeLighter]].color!.str}</Text>
            </tr>
            <tr>
              <Text as="td">{this._fabricSlotWidget(FabricSlots.themeLighterAlt)}</Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.themeLighterAlt]].color!.str}</Text>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  private _fabricSlotWidget(fabricSlot: FabricSlots) {
    const slotRule = this.props.themeRules![FabricSlots[fabricSlot]];
    // this.setState({ currentFabricSlot: fabricSlot });
    return (
      <div key={slotRule.name} className={slotClassName}>
        <Stack horizontal gap={5}>
          <div
            ref={this._colorPickerRef}
            key={slotRule.name}
            className={fabricPaletteColorBox}
            style={{ backgroundColor: slotRule.color!.str }}
            onClick={this._updateColorPickerVisible}
          />
          {this.state.isColorPickerVisible && (
            <div>
              <Callout gapSpace={10} target={this._colorPickerRef.current} setInitialFocus={true} onDismiss={this._onCalloutDismiss}>
                <ColorPicker color={slotRule.color} onChange={this._onColorPickerChange} alphaSliderHidden={true} />
              </Callout>
            </div>
          )}
          <div>{slotRule.name}</div>
        </Stack>
      </div>
    );
  }

  private _updateColorPickerVisible() {
    this.setState({ isColorPickerVisible: true });
  }

  private _onColorPickerChange(ev: any, color: IColor) {
    console.log('hello');
    this.props.onFabricPaletteColorChange(color, FabricSlots.themeDark);
  }

  private _onCalloutDismiss() {
    this.setState({ isColorPickerVisible: false });
  }
}
