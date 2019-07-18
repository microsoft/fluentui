import * as React from 'react';
import { IThemeRules, FabricSlots, IThemeSlotRule } from 'office-ui-fabric-react/lib/ThemeGenerator';
import { IColor } from 'office-ui-fabric-react/lib/Color';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { mergeStyles } from '@uifabric/merge-styles';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { Text } from 'office-ui-fabric-react';

export interface IFabricSlotWidgetProps {
  slot: FabricSlots;
  onFabricPaletteColorChange: (newColor: IColor, fabricSlot: FabricSlots) => void;
  themeRules?: IThemeRules;
  directionalHint?: DirectionalHint;
}

export interface IFabricSlotWidgetState {
  isColorPickerVisible: boolean;
  colorPickerElement: HTMLElement | null;
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

const colorBoxAndHexStringClassName = mergeStyles({
  position: 'relative' /* This is necessary to make position: absolute; work in the other style. */
});

export class FabricSlotWidget extends React.Component<IFabricSlotWidgetProps, IFabricSlotWidgetState> {
  constructor(props: IFabricSlotWidgetProps) {
    super(props);

    this.state = {
      isColorPickerVisible: false,
      colorPickerElement: null
    };
  }

  public render() {
    const { isColorPickerVisible, colorPickerElement } = this.state;
    if (this.props.themeRules) {
      const slotRule = this.props.themeRules[FabricSlots[this.props.slot]];
      return (
        <div className={slotClassName}>
          <Stack horizontal className={colorBoxAndHexStringClassName} gap={5}>
            <div className={fabricPaletteColorBox} style={{ backgroundColor: slotRule.color.str }} onClick={this._onColorBoxClick} />
            <div>{slotRule.name}</div>
          </Stack>
          {isColorPickerVisible && (
            <Callout
              gapSpace={10}
              target={colorPickerElement}
              directionalHint={this.props.directionalHint}
              setInitialFocus={true}
              onDismiss={this._onCalloutDismiss}
            >
              <ColorPicker color={slotRule.color} onChange={this._onColorPickerChange} alphaSliderHidden={true} />
            </Callout>
          )}
        </div>
      );
    }
  }

  private _onColorPickerChange = (ev: React.MouseEvent<HTMLElement>, newColor: IColor) => {
    this.props.onFabricPaletteColorChange(newColor, this.props.slot);
  };

  private _onColorBoxClick = (ev: React.MouseEvent<HTMLElement>) => {
    this.setState({
      isColorPickerVisible: true,
      colorPickerElement: ev.target as HTMLElement
    });
  };

  private _onCalloutDismiss = () => {
    this.setState({
      isColorPickerVisible: false
    });
  };
}
