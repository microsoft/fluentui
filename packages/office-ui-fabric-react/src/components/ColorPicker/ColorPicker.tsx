import * as React from 'react';
import {
  BaseComponent,
  autobind,
  css
} from '../../Utilities';
import { IColorPickerProps } from './ColorPicker.Props';
import { TextField } from '../../TextField';
import { ColorRectangle } from './ColorRectangle';
import { ColorSlider } from './ColorSlider';
import {
  MAX_COLOR_HUE,
  IColor,
  getColorFromString,
  getColorFromRGBA,
  updateA,
  updateH,
  updateSV
} from '../../utilities/color/colors';
import { FontClassNames } from '../../Styling';
import stylesImport from './ColorPicker.scss';
const styles: any = stylesImport;

export interface IColorPickerState {
  isOpen: boolean;
  color: IColor;
}

export class ColorPicker extends BaseComponent<IColorPickerProps, IColorPickerState> {
  private hexText: TextField;
  private rText: TextField;
  private gText: TextField;
  private bText: TextField;
  private aText: TextField;

  constructor(props: IColorPickerProps) {
    super(props);

    this.state = {
      color: getColorFromString(props.color)
    } as IColorPickerState;
  }

  public componentWillReceiveProps(newProps: IColorPickerProps) {
    if (newProps.color) {
      this._updateColor(getColorFromString(newProps.color));
    }
  }

  public render() {
    let { color } = this.state;

    return (
      <div className={ css('ms-ColorPicker', styles.root) }>
        <div className={ css('ms-ColorPicker-panel', styles.panel) }>
          <ColorRectangle color={ color } onSVChanged={ this._onSVChanged } />
          <ColorSlider
            className={ css('is-hue', styles.colorSliderIsHue) }
            minValue={ 0 }
            maxValue={ MAX_COLOR_HUE }
            value={ color.h }
            onChanged={ this._onHChanged }
          />
          { !this.props.alphaSliderHidden && (
            <ColorSlider
              className={ css('is-alpha', styles.colorSliderIsAlpha) }
              overlayStyle={ { background: `linear-gradient(to right, transparent 0, ${color.str} 100%)` } }
              minValue={ 0 }
              maxValue={ 100 }
              value={ color.a }
              onChanged={ this._onAChanged }
            />) }
          <table className='ms-ColorPicker-table' cellPadding='0' cellSpacing='0'>
            <thead>
              <tr className={ FontClassNames.small }>
                <td>Hex</td>
                <td>Red</td>
                <td>Green</td>
                <td>Blue</td>
                { !this.props.alphaSliderHidden && (
                  <td>Alpha</td>) }
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <TextField
                    className={ css('ms-ColorPicker-input', styles.input) }
                    value={ color.hex }
                    ref={ (ref) => this.hexText = ref }
                    onBlur={ this._onHexChanged }
                  />
                </td>
                <td style={ { width: '18%' } }>
                  <TextField
                    className={ css('ms-ColorPicker-input', styles.input) }
                    onBlur={ this._onRGBAChanged }
                    value={ String(color.r) }
                    ref={ (ref) => this.rText = ref }
                  />
                </td>
                <td style={ { width: '18%' } }>
                  <TextField
                    className={ css('ms-ColorPicker-input', styles.input) }
                    onBlur={ this._onRGBAChanged }
                    value={ String(color.g) }
                    ref={ (ref) => this.gText = ref }
                  />
                </td>
                <td style={ { width: '18%' } }>
                  <TextField
                    className={ css('ms-ColorPicker-input', styles.input) }
                    onBlur={ this._onRGBAChanged }
                    value={ String(color.b) }
                    ref={ (ref) => this.bText = ref }
                  />
                </td>
                { !this.props.alphaSliderHidden && (
                  <td style={ { width: '18%' } }>
                    <TextField
                      className={ css('ms-ColorPicker-input', styles.input) }
                      onBlur={ this._onRGBAChanged }
                      value={ String(color.a) }
                      ref={ (ref) => this.aText = ref }
                    />
                  </td>
                ) }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  @autobind
  private _onSVChanged(s: number, v: number) {
    this._updateColor(updateSV(this.state.color, s, v));
  }

  @autobind
  private _onHChanged(h: number) {
    this._updateColor(updateH(this.state.color, h));
  }

  @autobind
  private _onAChanged(a: number) {
    this._updateColor(updateA(this.state.color, a));
  }

  @autobind
  private _onHexChanged() {
    this._updateColor(getColorFromString('#' + this.hexText.value));
  }

  @autobind
  private _onRGBAChanged() {
    this._updateColor(getColorFromRGBA({
      r: Number(this.rText.value),
      g: Number(this.gText.value),
      b: Number(this.bText.value),
      a: Number(this.aText.value)
    }));
  }

  private _updateColor(newColor: IColor) {
    let { onColorChanged } = this.props;

    if (newColor.str !== this.state.color.str) {
      this.setState({
        color: newColor
      } as IColorPickerState, () => {
        if (onColorChanged) {
          onColorChanged(newColor.str);
        }
      });
    }
  }
}
