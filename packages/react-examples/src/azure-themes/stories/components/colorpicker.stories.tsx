import * as React from 'react';
import { ColorPicker, Toggle, getColorFromString, IColor, IColorPickerStyles, updateA } from '@fluentui/react';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';

const classNames = mergeStyleSets({
  wrapper: { display: 'flex' },
  column2: { marginLeft: 10 },
});

const colorPickerStyles: Partial<IColorPickerStyles> = {
  panel: { padding: 12 },
  root: {
    maxWidth: 352,
    minWidth: 352,
  },
  colorRectangle: { height: 268 },
};

export interface IBasicColorPickerExampleState {
  color: IColor;
  alphaSliderHidden: boolean;
  showPreview: boolean;
}

export class ColorPickerBasicExample extends React.Component<{}, IBasicColorPickerExampleState> {
  public state: IBasicColorPickerExampleState = {
    color: getColorFromString('#ffffff')!,
    alphaSliderHidden: false,
    showPreview: true,
  };

  public render(): JSX.Element {
    const { color, alphaSliderHidden, showPreview: showPreview } = this.state;
    return (
      <div className={classNames.wrapper}>
        <ColorPicker
          color={color}
          onChange={this._updateColor}
          alphaSliderHidden={alphaSliderHidden}
          showPreview={showPreview}
          styles={colorPickerStyles}
          // The ColorPicker provides default English strings for visible text.
          // If your app is localized, you MUST provide the `strings` prop with localized strings.
          // Below are the recommended aria labels for the hue and alpha slider
          strings={{
            alphaAriaLabel: 'Alpha Slider: Use left and right arrow keys to change value, hold shift for a larger jump',
            hueAriaLabel: 'Hue Slider: Use left and right arrow keys to change value, hold shift for a larger jump',
          }}
        />

        <div className={classNames.column2}>
          <Toggle label="Hide alpha slider" onChange={this._onHideAlphaClick} checked={alphaSliderHidden} />
          <Toggle label="Show Preview Box" onChange={this._onShowPreviewBoxClick} checked={showPreview} />
        </div>
      </div>
    );
  }

  private _updateColor = (ev: React.SyntheticEvent<HTMLElement>, colorObj: IColor) => {
    this.setState({ color: colorObj });
  };

  private _onHideAlphaClick = (ev: React.MouseEvent<HTMLElement>, checked?: boolean) => {
    let color = this.state.color;
    if (checked) {
      // If hiding the alpha slider, remove transparency from the color
      color = updateA(this.state.color, 100);
    }
    this.setState({ alphaSliderHidden: !!checked, color });
  };

  private _onShowPreviewBoxClick = (ev: React.MouseEvent<HTMLElement>, checked?: boolean) => {
    this.setState({ showPreview: !!checked });
  };
}
