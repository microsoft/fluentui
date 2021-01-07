import * as React from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { TextField } from '@fluentui/react/lib/TextField';
import { Stack } from '@fluentui/react/lib/Stack';
import { ColorPicker } from '@fluentui/react/lib/ColorPicker';
import { Callout } from '@fluentui/react/lib/Callout';
import { mergeStyles } from '@fluentui/merge-styles';
import { IColor, getColorFromString } from '@fluentui/react/lib/Color';

const colorLabelClassName = mergeStyles({
  fontSize: 16,
  fontWeight: 800,
  marginLeft: 20,
});

const colorBoxClassName = mergeStyles({
  width: 20,
  height: 20,
  display: 'inline-block',
  position: 'absolute',
  left: 5,
  top: 5,
  border: '1px solid black',
  flexShrink: 0,
});

const textBoxClassName = mergeStyles({
  width: 100,
});

const colorPanelClassName = mergeStyles({
  position: 'relative' /* This is necessary to make position: absolute; work in the other style. */,
});

export interface IThemeDesignerColorPickerProps {
  color: IColor;
  onColorChange: (color: IColor | undefined) => void;
  label: string;
}

export interface IThemeDesignerColorPickerState {
  isColorPickerVisible: boolean;
  editingColorStr?: string;
}

export class ThemeDesignerColorPicker extends React.Component<
  IThemeDesignerColorPickerProps,
  IThemeDesignerColorPickerState
> {
  private _colorPickerRef = React.createRef<HTMLDivElement>();
  constructor(props: IThemeDesignerColorPickerProps) {
    super(props);
    this.state = {
      isColorPickerVisible: false,
    };

    this._updateColorPickerVisible = this._updateColorPickerVisible.bind(this);
    this._onTextFieldValueChange = this._onTextFieldValueChange.bind(this);
    this._onCalloutDismiss = this._onCalloutDismiss.bind(this);
    this._onColorPickerChange = this._onColorPickerChange.bind(this);
  }

  public render() {
    const { editingColorStr = this.props.color.str } = this.state;
    return (
      <div>
        <Stack horizontal horizontalAlign={'space-between'} gap={20}>
          <Text className={colorLabelClassName}>{this.props.label}</Text>
          <Stack horizontal className={colorPanelClassName} gap={35}>
            <div
              ref={this._colorPickerRef}
              id="colorbox"
              className={colorBoxClassName}
              style={{ backgroundColor: this.props.color.str }}
              onClick={this._updateColorPickerVisible}
            />
            <TextField
              id="textfield"
              className={textBoxClassName}
              value={editingColorStr}
              onChange={this._onTextFieldValueChange}
            />
          </Stack>
        </Stack>
        {this.state.isColorPickerVisible && (
          <Callout
            gapSpace={10}
            target={this._colorPickerRef.current}
            setInitialFocus={true}
            onDismiss={this._onCalloutDismiss}
          >
            <ColorPicker color={this.props.color} onChange={this._onColorPickerChange} alphaSliderHidden={true} />
          </Callout>
        )}
      </div>
    );
  }

  private _updateColorPickerVisible() {
    this.setState({ isColorPickerVisible: true });
  }

  private _onTextFieldValueChange(ev: any, newValue: string | undefined) {
    const newColor = getColorFromString(newValue!);
    if (newColor) {
      this.props.onColorChange(newColor);
      this.setState({ editingColorStr: undefined });
    } else {
      this.setState({ editingColorStr: newValue });
    }
  }

  private _onCalloutDismiss() {
    this.setState({ isColorPickerVisible: false });
  }

  private _onColorPickerChange(ev: any, color: IColor) {
    this.props.onColorChange(color);
  }
}
