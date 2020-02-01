import * as React from 'react';
import { ColorPicker, Toggle, getColorFromString, IColor, IColorPickerStyles, updateA } from 'office-ui-fabric-react/lib/index';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const classNames = mergeStyleSets({
  wrapper: { display: 'flex' },
  column2: { marginLeft: 10 }
});

const colorPickerStyles: Partial<IColorPickerStyles> = {
  panel: { padding: 12 },
  root: {
    maxWidth: 352,
    minWidth: 352
  },
  colorRectangle: { height: 268 }
};

export interface IBasicColorPickerExampleState {
  color: IColor;
  alphaSliderHidden: boolean;
  showPreview: boolean;
  useTransparencySlider: boolean;
}

export class ColorPickerBasicExample extends React.Component<{}, IBasicColorPickerExampleState> {
  public state: IBasicColorPickerExampleState = {
    color: getColorFromString('#ffffff')!,
    alphaSliderHidden: false,
    showPreview: true,
    useTransparencySlider: false
  };

  public render(): JSX.Element {
    const { color, alphaSliderHidden, showPreview: showPreview, useTransparencySlider } = this.state;

    return (
      <div className={classNames.wrapper}>
        <ColorPicker
          color={color}
          onChange={this._updateColor}
          alphaSliderHidden={alphaSliderHidden}
          showPreview={showPreview}
          styles={colorPickerStyles}
          useTransparencySlider={useTransparencySlider}
          alphaLabel={this._getAlphaLabel()}
          // The ColorPicker provides default English strings for visible text.
          // If your app is localized, you MUST provide the `strings` prop with localized strings.
          // Below are the recommended aria labels for the hue and alpha slider
          strings={{
            alphaAriaLabel: '${this._getAlphaLabel} Slider: Use left and right arrow keys to change value, hold shift for a larger jump',
            hueAriaLabel: 'Hue Slider: Use left and right arrow keys to change value, hold shift for a larger jump'
          }}
        />

        <div className={classNames.column2}>
          <Toggle label="Hide alpha slider" onChange={this._onHideAlphaClick} checked={alphaSliderHidden} />
          <Toggle label="Show Preview Box" onChange={this._onShowPreviewBoxClick} checked={showPreview} />
          <Toggle label="Use transparency slider" onChange={this._onUseTransparencySliderClick} checked={useTransparencySlider} />
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

  private _onUseTransparencySliderClick = (ev: React.MouseEvent<HTMLElement>, checked?: boolean) => {
    let color = this.state.color;
    this.setState({ useTransparencySlider: !!checked, color });
  };

  private _getAlphaLabel = (): string => {
    return this.state.useTransparencySlider ? 'Transparency' : 'Alpha';
  };
}
