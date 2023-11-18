import * as React from 'react';
import { FabricSlots, IThemeSlotRule } from '@fluentui/react/lib/ThemeGenerator';
import { IColor } from '@fluentui/react/lib/Color';
import { Stack, IStackStyles } from '@fluentui/react/lib/Stack';
import { mergeStyles } from '@fluentui/merge-styles';
import { ColorPicker } from '@fluentui/react/lib/ColorPicker';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';

export interface IFabricSlotWidgetProps {
  slot: FabricSlots;
  onFabricPaletteColorChange: (newColor: IColor, fabricSlot: FabricSlots) => void;
  slotRule: IThemeSlotRule;
  directionalHint?: DirectionalHint;
}

export interface IFabricSlotWidgetState {
  isColorPickerVisible: boolean;
  colorPickerElement: HTMLElement | null;
}

const slotClassName = mergeStyles({
  display: 'flex',
  alignItems: 'center',
  overflow: 'auto',
});

const fabricPaletteColorBox = mergeStyles({
  width: 15,
  height: 15,
  display: 'inline-block',
  left: 5,
  top: 5,
  border: '1px solid black',
  flexShrink: 0,
});

const colorBoxAndHexStringClassName: IStackStyles = {
  root: {
    position: 'relative',
  },
};

export class FabricSlotWidget extends React.Component<IFabricSlotWidgetProps, IFabricSlotWidgetState> {
  constructor(props: IFabricSlotWidgetProps) {
    super(props);

    this.state = {
      isColorPickerVisible: false,
      colorPickerElement: null,
    };
  }

  public render() {
    const { isColorPickerVisible, colorPickerElement } = this.state;
    const { slotRule, directionalHint } = this.props;
    return (
      <div className={slotClassName}>
        <Stack horizontal styles={colorBoxAndHexStringClassName} gap={5}>
          <div
            className={fabricPaletteColorBox}
            style={{ backgroundColor: slotRule.color!.str }}
            onClick={this._onColorBoxClick}
          />
          <div>{slotRule.name}</div>
        </Stack>
        {isColorPickerVisible && (
          <Callout
            gapSpace={10}
            target={colorPickerElement}
            directionalHint={directionalHint}
            setInitialFocus={true}
            onDismiss={this._onCalloutDismiss}
          >
            <ColorPicker color={slotRule.color!} onChange={this._onColorPickerChange} alphaSliderHidden={true} />
          </Callout>
        )}
      </div>
    );
  }

  private _onColorPickerChange = (ev: React.MouseEvent<HTMLElement>, newColor: IColor) => {
    this.props.onFabricPaletteColorChange(newColor, this.props.slot);
  };

  private _onColorBoxClick = (ev: React.MouseEvent<HTMLElement>) => {
    this.setState({
      isColorPickerVisible: true,
      colorPickerElement: ev.target as HTMLElement,
    });
  };

  private _onCalloutDismiss = () => {
    this.setState({
      isColorPickerVisible: false,
    });
  };
}
