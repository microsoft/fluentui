import * as React from 'react';
import {
  BaseComponent,
  autobind,
  css
} from '../../Utilities';
import { IColorPickerProps } from './ColorPicker.types';
import { TextFieldBase, TextField } from '../../TextField';
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
import * as stylesImport from './ColorPicker.scss';
const styles: any = stylesImport;

export interface IColorPickerState {
  isOpen: boolean;
  color: IColor;
}

export class ColorPicker extends BaseComponent<IColorPickerProps, IColorPickerState> {
  public static defaultProps = {
    hexLabel: 'Hex',
    redLabel: 'Red',
    greenLabel: 'Green',
    blueLabel: 'Blue',
    alphaLabel: 'Alpha'
  };

  private _hexText: TextFieldBase;
  private _rText: TextFieldBase;
  private _gText: TextFieldBase;
  private _bText: TextFieldBase;
  private _aText: TextFieldBase;

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
          <table className={ css('ms-ColorPicker-table', styles.table) } cellPadding='0' cellSpacing='0'>
            <thead>
              <tr className={ FontClassNames.small }>
                <td className={ styles.tableHexCell }>{ this.props.hexLabel }</td>
                <td>{ this.props.redLabel }</td>
                <td>{ this.props.greenLabel }</td>
                <td>{ this.props.blueLabel }</td>
                { !this.props.alphaSliderHidden && (
                  <td>{ this.props.alphaLabel }</td>) }
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <TextField
                    className={ css('ms-ColorPicker-input', styles.input) }
                    value={ color.hex }
                    componentRef={ this._resolveRef('_hexText') }
                    onBlur={ this._onHexChanged }
                    spellCheck={ false }
                  />
                </td>
                <td style={ { width: '18%' } }>
                  <TextField
                    className={ css('ms-ColorPicker-input', styles.input) }
                    onBlur={ this._onRGBAChanged }
                    value={ String(color.r) }
                    componentRef={ this._resolveRef('_rText') }
                    spellCheck={ false }
                  />
                </td>
                <td style={ { width: '18%' } }>
                  <TextField
                    className={ css('ms-ColorPicker-input', styles.input) }
                    onBlur={ this._onRGBAChanged }
                    value={ String(color.g) }
                    componentRef={ this._resolveRef('_gText') }
                    spellCheck={ false }
                  />
                </td>
                <td style={ { width: '18%' } }>
                  <TextField
                    className={ css('ms-ColorPicker-input', styles.input) }
                    onBlur={ this._onRGBAChanged }
                    value={ String(color.b) }
                    componentRef={ this._resolveRef('_bText') }
                    spellCheck={ false }
                  />
                </td>
                { !this.props.alphaSliderHidden && (
                  <td style={ { width: '18%' } }>
                    <TextField
                      className={ css('ms-ColorPicker-input', styles.input) }
                      onBlur={ this._onRGBAChanged }
                      value={ String(color.a) }
                      componentRef={ this._resolveRef('_aText') }
                      spellCheck={ false }
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
    this._updateColor(getColorFromString('#' + this._hexText.value));
  }

  @autobind
  private _onRGBAChanged() {
    this._updateColor(getColorFromRGBA({
      r: Number(this._rText.value),
      g: Number(this._gText.value),
      b: Number(this._bText.value),
      a: Number(this._aText.value)
    }));
  }

  private _updateColor(newColor?: IColor) {
    if (!newColor) {
      return;
    }

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
