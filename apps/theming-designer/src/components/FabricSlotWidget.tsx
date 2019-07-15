import * as React from 'react';
import { IThemeRules, FabricSlots, IThemeSlotRule } from 'office-ui-fabric-react/lib/ThemeGenerator';
import { IColor } from 'office-ui-fabric-react/lib/Color';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { mergeStyles } from '@uifabric/merge-styles';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';

export interface IFabricSlotWidgetProps {
  slot: FabricSlots;
  onFabricPaletteColorChange: (newColor: IColor | undefined, fabricSlot: FabricSlots) => void;
  themeRules?: IThemeRules;
  directionalHint?: DirectionalHint;
}

export interface IFabricSlotWidgetState {
  isColorPickerVisible: boolean;
  colorPickerElement: HTMLElement | null;
  slotRule: IThemeSlotRule | null;
}

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

export class FabricSlotWidget extends React.Component<IFabricSlotWidgetProps, IFabricSlotWidgetState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isColorPickerVisible: false,
      colorPickerElement: null,
      slotRule: props.themeRules![FabricSlots[this.props.slot]]
    };

    this._onColorBoxClick = this._onColorBoxClick.bind(this);
    this._onCalloutDismiss = this._onCalloutDismiss.bind(this);
  }

  public render() {
    const { isColorPickerVisible, colorPickerElement, slotRule } = this.state;
    return (
      <div key={slotRule.name} className={slotClassName}>
        <Stack horizontal gap={20}>
          <Stack horizontal gap={5}>
            <div
              key={slotRule.name}
              className={fabricPaletteColorBox}
              style={{ backgroundColor: slotRule.color!.str }}
              onClick={this._onColorBoxClick}
            />
            {isColorPickerVisible && (
              <div>
                <Callout
                  gapSpace={10}
                  target={colorPickerElement}
                  directionalHint={this.props.directionalHint}
                  setInitialFocus={true}
                  onDismiss={this._onCalloutDismiss}
                >
                  <ColorPicker color={slotRule.color} onChange={this._onColorPickerChange} alphaSliderHidden={true} />
                </Callout>
              </div>
            )}
            <div>{slotRule.name}</div>
          </Stack>
          <div>{slotRule.color!.str}</div>
        </Stack>
      </div>
    );
  }

  private _onColorPickerChange = (ev: React.MouseEvent<HTMLElement>, newColor: IColor) => {
    this.props.onFabricPaletteColorChange(newColor, this.props.slot);
  };

  private _onColorBoxClick(ev: React.MouseEvent<HTMLElement>) {
    this.setState({
      isColorPickerVisible: true,
      colorPickerElement: ev.target as HTMLElement
    });
  }

  private _onCalloutDismiss() {
    this.setState({
      isColorPickerVisible: false
    });
  }
}
