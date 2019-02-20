import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { IColorPickerProps, IColorPickerStyleProps, IColorPickerStyles, IColorPicker } from './ColorPicker.types';
import { TextField } from '../../TextField';
import { ColorRectangle } from './ColorRectangle/ColorRectangle';
import { ColorSlider } from './ColorSlider/ColorSlider';
import { MAX_COLOR_HUE, IColor, getColorFromString, getColorFromRGBA, updateA, updateH } from '../../utilities/color/colors';

type IRGBHex = Pick<IColor, 'r' | 'g' | 'b' | 'a' | 'hex'>;

export interface IColorPickerState {
  color: IColor;
}

const getClassNames = classNamesFunction<IColorPickerStyleProps, IColorPickerStyles>();

const colorComponents: Array<keyof IRGBHex> = ['hex', 'r', 'g', 'b', 'a'];

export class ColorPickerBase extends BaseComponent<IColorPickerProps, IColorPickerState> implements IColorPicker {
  public static defaultProps = {
    hexLabel: 'Hex',
    redLabel: 'Red',
    greenLabel: 'Green',
    blueLabel: 'Blue',
    alphaLabel: 'Alpha'
  };

  private _textChangeHandlers: {
    [K in keyof IRGBHex]: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void
  };
  private _textLabels: { [K in keyof IRGBHex]?: string };

  constructor(props: IColorPickerProps) {
    super(props);

    this._warnDeprecations({
      onColorChanged: 'onChange'
    });

    this.state = {
      color: _getColorFromProps(props) || getColorFromString('#ffffff')!
    };

    this._textChangeHandlers = {} as any;
    for (const component of colorComponents) {
      this._textChangeHandlers[component] = this._onTextChange.bind(this, component);
    }
    this._textLabels = {
      r: props.redLabel,
      g: props.greenLabel,
      b: props.blueLabel,
      a: props.alphaLabel,
      hex: props.hexLabel
    };
  }

  public get color(): IColor {
    return this.state.color;
  }

  public componentWillReceiveProps(newProps: IColorPickerProps): void {
    const color = _getColorFromProps(newProps);
    if (color) {
      this._updateColor(undefined, color);
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
          <ColorRectangle color={color} onChange={this._onSVChanged} />
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
                {...colorComponents.map((comp: keyof IRGBHex) => {
                  if (comp === 'a' && props.alphaSliderHidden) {
                    return null;
                  }
                  return (
                    <td key={comp} style={comp === 'hex' ? undefined : { width: '18%' }}>
                      <TextField
                        className={classNames.input}
                        onChange={this._textChangeHandlers[comp]}
                        value={this._getDisplayValue(comp)}
                        spellCheck={false}
                        ariaLabel={this._textLabels[comp]}
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

  private _getDisplayValue(component: keyof IColor): string {
    const { color } = this.state;
    if (typeof color[component] === 'number') {
      return String(component === 'a' ? color.a!.toPrecision(3) : color[component]);
    }
    return (color[component] as string) || '';
  }

  private _onSVChanged = (ev: React.MouseEvent<HTMLElement>, color: IColor): void => {
    this._updateColor(ev, color);
  };

  private _onHChanged = (ev: React.MouseEvent<HTMLElement>, h: number): void => {
    this._updateColor(ev, updateH(this.state.color, h));
  };

  private _onAChanged = (ev: React.MouseEvent<HTMLElement>, a: number): void => {
    this._updateColor(ev, updateA(this.state.color, a));
  };

  private _onTextChange(component: keyof IRGBHex, event: React.FormEvent<HTMLInputElement>, newValue?: string): void {
    const color = this.state.color;
    const isHex = component === 'hex';
    if (String(color[component]) === newValue) {
      return;
    }

    let newColor: IColor | undefined;
    if (isHex) {
      newColor = getColorFromString('#' + newValue);
    } else {
      newColor = getColorFromRGBA({
        r: color.r,
        g: color.g,
        b: color.b,
        a: color.a || 100,
        [component]: Number(newValue)
      });
    }
    this._updateColor(event, newColor);
  }

  /**
   * Update the displayed color and call change handlers if appropriate.
   * @param ev Event if call was triggered by an event (undefined if triggered by props change)
   * @param newColor Updated color
   */
  private _updateColor(ev: React.SyntheticEvent<HTMLElement> | undefined, newColor: IColor | undefined): void {
    if (!newColor) {
      return;
    }

    const props = this.props;
    const { color } = this.state;
    const isDifferentColor = newColor.h !== color.h || newColor.str !== color.str;

    if (isDifferentColor) {
      this.setState({ color: newColor }, () => {
        if (ev && props.onChange) {
          props.onChange(ev, newColor);
        }

        // To preserve the existing behavior, this one is called even when the change comes from a
        // props update (which is not very useful)
        if (props.onColorChanged) {
          props.onColorChanged(newColor.str, newColor);
        }
      });
    }
  }
}

function _getColorFromProps(props: IColorPickerProps): IColor | undefined {
  const { color } = props;
  return typeof color === 'string' ? getColorFromString(color) : color;
}
