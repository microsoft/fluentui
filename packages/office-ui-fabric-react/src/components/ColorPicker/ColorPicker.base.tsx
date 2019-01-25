import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { IColorPickerProps, IColorPickerStyleProps, IColorPickerStyles, IColorPicker } from './ColorPicker.types';
import { TextField } from '../../TextField';
import { ColorRectangle } from './ColorRectangle/ColorRectangle';
import { ColorSlider } from './ColorSlider/ColorSlider';
import {
  MAX_COLOR_HUE,
  IColor,
  IRGB,
  getColorFromString,
  getColorFromRGBA,
  updateA,
  updateH,
  updateSV
} from '../../utilities/color/colors';

export interface IColorPickerState {
  color: IColor;
}

const getClassNames = classNamesFunction<IColorPickerStyleProps, IColorPickerStyles>();

const rgbaComponents: Array<keyof IRGB> = ['r', 'g', 'b', 'a'];

export class ColorPickerBase extends BaseComponent<IColorPickerProps, IColorPickerState> implements IColorPicker {
  public static defaultProps = {
    hexLabel: 'Hex',
    redLabel: 'Red',
    greenLabel: 'Green',
    blueLabel: 'Blue',
    alphaLabel: 'Alpha'
  };

  private _rgbaChangeHandlers: {
    [K in keyof IRGB]: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void
  };
  private _rgbaLabels: { [K in keyof IRGB]?: string };

  constructor(props: IColorPickerProps) {
    super(props);

    this.state = {
      color: getColorFromString(props.color)!
    };

    this._rgbaChangeHandlers = {} as any;
    for (const component of rgbaComponents) {
      this._rgbaChangeHandlers[component] = this._onRGBAChanged.bind(this, component);
    }
    this._rgbaLabels = {
      r: props.redLabel,
      g: props.greenLabel,
      b: props.blueLabel,
      a: props.alphaLabel
    };
  }

  public get color(): IColor {
    return this.state.color;
  }

  public componentWillReceiveProps(newProps: IColorPickerProps): void {
    if (newProps.color) {
      this._updateColor(getColorFromString(newProps.color));
    }
  }

  public render(): JSX.Element {
    const props = this.props;
    const { theme, className, styles } = props;
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
          {!props.alphaSliderHidden && (
            <ColorSlider
              className="is-alpha"
              isAlpha
              overlayStyle={{ background: `linear-gradient(to right, transparent 0, #${color.hex} 100%)` }}
              minValue={0}
              maxValue={100}
              value={color.a}
              onChange={this._onAChanged}
            />
          )}
          <table className={classNames.table} cellPadding="0" cellSpacing="0">
            <thead>
              <tr className={classNames.tableHeader}>
                <td className={classNames.tableHexCell}>{props.hexLabel}</td>
                <td>{props.redLabel}</td>
                <td>{props.greenLabel}</td>
                <td>{props.blueLabel}</td>
                {!props.alphaSliderHidden && <td>{props.alphaLabel}</td>}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <TextField
                    className={classNames.input}
                    value={color.hex || ''}
                    onChange={this._onHexChanged}
                    spellCheck={false}
                    ariaLabel={props.hexLabel}
                  />
                </td>
                {...rgbaComponents.map((comp: keyof IRGB) => {
                  const isAlpha = comp === 'a';
                  let value = String(color[comp] || 0);
                  if (isAlpha) {
                    if (props.alphaSliderHidden) {
                      return null;
                    }
                    value = typeof color.a === 'number' ? String(color.a.toPrecision(3)) : '';
                  }
                  return (
                    <td key={comp} style={{ width: '18%' }}>
                      <TextField
                        className={classNames.input}
                        onChange={this._rgbaChangeHandlers[comp]}
                        value={value}
                        spellCheck={false}
                        ariaLabel={this._rgbaLabels[comp]}
                      />
                    </td>
                  );
                })}
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

  private _onHexChanged = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    if (newValue && newValue !== this.state.color.hex) {
      this._updateColor(getColorFromString('#' + newValue));
    }
  };

  private _onRGBAChanged(component: keyof IRGB, event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void {
    const color = this.state.color;
    if (String(color[component]) === newValue) {
      return;
    }

    this._updateColor(
      getColorFromRGBA({
        r: color.r,
        g: color.g,
        b: color.b,
        a: color.a || 100,
        [component]: Number(newValue)
      })
    );
  }

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
        },
        () => {
          if (hasColorStringChanged && onColorChanged) {
            onColorChanged(newColor.str, newColor);
          }
        }
      );
    }
  }
}
