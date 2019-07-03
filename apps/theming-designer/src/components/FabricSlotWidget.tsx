import * as React from 'react';
import { IThemeRules, FabricSlots, IThemeSlotRule } from 'office-ui-fabric-react/lib/ThemeGenerator';
import { IColor } from 'office-ui-fabric-react/lib/Color';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { mergeStyles } from '@uifabric/merge-styles';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';
import { Callout } from 'office-ui-fabric-react/lib/Callout';

export interface IFabricSlotWidgetProps {
  slot: FabricSlots;
  onFabricPaletteColorChange: (newColor: IColor | undefined, fabricSlot: FabricSlots) => void;
  themeRules?: IThemeRules;
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

    this.onColorBoxClick = this.onColorBoxClick.bind(this);
    this.onCalloutDismiss = this.onCalloutDismiss.bind(this);
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
              onClick={this.onColorBoxClick}
            />
            {isColorPickerVisible && (
              <div>
                <Callout gapSpace={10} target={colorPickerElement} setInitialFocus={true} onDismiss={this.onCalloutDismiss}>
                  <ColorPicker
                    color={slotRule.color}
                    onChange={(ev, newColor) => this.props.onFabricPaletteColorChange(newColor, this.props.slot)}
                    alphaSliderHidden={true}
                  />
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

  private onColorBoxClick(ev: React.MouseEvent<HTMLElement>) {
    this.setState({
      isColorPickerVisible: true,
      colorPickerElement: ev.target as HTMLElement
    });
    console.log(this.state.colorPickerElement);
  }

  private onCalloutDismiss() {
    this.setState({
      isColorPickerVisible: false
    });
  }
}
