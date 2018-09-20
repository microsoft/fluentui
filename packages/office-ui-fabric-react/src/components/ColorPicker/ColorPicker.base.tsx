import * as React from 'react';
import { BaseComponent, classNamesFunction, createRef } from '../../Utilities';
import { IColorPickerProps, IColorPickerStyleProps, IColorPickerStyles } from './ColorPicker.types';
import { ITextField, TextField } from '../../TextField';
import { ColorRectangle } from './ColorRectangle/ColorRectangle';
import { ColorSlider } from './ColorSlider/ColorSlider';
import { MAX_COLOR_HUE, IColor, getColorFromString, getColorFromRGBA, updateA, updateH, updateSV } from '../../utilities/color/colors';

export interface IColorPickerState {
  isOpen: boolean;
  color: IColor;
}

const getClassNames = classNamesFunction<IColorPickerStyleProps, IColorPickerStyles>();

export class ColorPickerBase extends BaseComponent<IColorPickerProps, IColorPickerState> {
  public static defaultProps = {
    hexLabel: 'Hex',
    redLabel: 'Red',
    greenLabel: 'Green',
    blueLabel: 'Blue',
    alphaLabel: 'Alpha'
  };

  private _hexText = createRef<ITextField>();
  private _rText = createRef<ITextField>();
  private _gText = createRef<ITextField>();
  private _bText = createRef<ITextField>();
  private _aText = createRef<ITextField>();

  constructor(props: IColorPickerProps) {
    super(props);

    this.state = {
      color: getColorFromString(props.color)
    } as IColorPickerState;
  }

  public componentWillReceiveProps(newProps: IColorPickerProps): void {
    if (newProps.color) {
      this._updateColor(getColorFromString(newProps.color));
    }
  }

  public render(): JSX.Element {
    const { theme, className, styles } = this.props;
    const { color } = this.state;

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className
    });

    return (
      <div className={classNames.root}>
        <div className={classNames.panel}>
          <ColorRectangle color={color} onSVChanged={this._onSVChanged} />
          <ColorSlider className="is-hue" minValue={0} maxValue={MAX_COLOR_HUE} value={color.h} onChange={this._onHChanged} />
          {!this.props.alphaSliderHidden && (
            <ColorSlider
              className="is-alpha"
              isAlpha
              overlayStyle={{ background: `linear-gradient(to right, transparent 0, ${color.str} 100%)` }}
              minValue={0}
              maxValue={100}
              value={color.a}
              onChange={this._onAChanged}
            />
          )}
          <table className={classNames.table} cellPadding="0" cellSpacing="0">
            <thead>
              <tr className={classNames.tableHeader}>
                <td className={classNames.tableHexCell}>{this.props.hexLabel}</td>
                <td>{this.props.redLabel}</td>
                <td>{this.props.greenLabel}</td>
                <td>{this.props.blueLabel}</td>
                {!this.props.alphaSliderHidden && <td>{this.props.alphaLabel}</td>}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <TextField
                    className={classNames.input}
                    value={color.hex}
                    componentRef={this._hexText}
                    onBlur={this._onHexChanged}
                    spellCheck={false}
                    ariaLabel={this.props.hexLabel}
                  />
                </td>
                <td style={{ width: '18%' }}>
                  <TextField
                    className={classNames.input}
                    onBlur={this._onRGBAChanged}
                    value={String(color.r)}
                    componentRef={this._rText}
                    spellCheck={false}
                    ariaLabel={this.props.redLabel}
                  />
                </td>
                <td style={{ width: '18%' }}>
                  <TextField
                    className={classNames.input}
                    onBlur={this._onRGBAChanged}
                    value={String(color.g)}
                    componentRef={this._gText}
                    spellCheck={false}
                    ariaLabel={this.props.greenLabel}
                  />
                </td>
                <td style={{ width: '18%' }}>
                  <TextField
                    className={classNames.input}
                    onBlur={this._onRGBAChanged}
                    value={String(color.b)}
                    componentRef={this._bText}
                    spellCheck={false}
                    ariaLabel={this.props.blueLabel}
                  />
                </td>
                {!this.props.alphaSliderHidden && (
                  <td style={{ width: '18%' }}>
                    <TextField
                      className={classNames.input}
                      onBlur={this._onRGBAChanged}
                      value={String(color.a ? color.a.toPrecision(3) : color.a)}
                      componentRef={this._aText}
                      spellCheck={false}
                      ariaLabel={this.props.alphaLabel}
                    />
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  private _onSVChanged = (s: number, v: number): void => {
    this._updateColor(updateSV(this.state.color, s, v));
  };

  private _onHChanged = (ev: React.MouseEvent<HTMLElement>, h: number): void => {
    this._updateColor(updateH(this.state.color, h));
  };

  private _onAChanged = (ev: React.MouseEvent<HTMLElement>, a: number): void => {
    this._updateColor(updateA(this.state.color, a));
  };

  private _onHexChanged = (): void => {
    if (this._hexText.current) {
      this._updateColor(getColorFromString('#' + this._hexText.current.value));
    }
  };

  private _onRGBAChanged = (): void => {
    if (!this._rText.current || !this._gText.current || !this._bText.current || !this._aText.current) {
      return;
    }

    this._updateColor(
      getColorFromRGBA({
        r: Number(this._rText.current.value),
        g: Number(this._gText.current.value),
        b: Number(this._bText.current.value),
        a: Number(this._aText.current.value || 100)
      })
    );
  };

  private _updateColor(newColor?: IColor): void {
    if (!newColor) {
      return;
    }

    const { onColorChanged } = this.props;
    const { color } = this.state;
    const hasColorStringChanged = newColor.str !== color.str;
    if (newColor.h !== color.h || hasColorStringChanged) {
      this.setState(
        {
          color: newColor
        } as IColorPickerState,
        () => {
          if (hasColorStringChanged && onColorChanged) {
            onColorChanged(newColor.str, newColor);
          }
        }
      );
    }
  }
}
