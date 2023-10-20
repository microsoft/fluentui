import * as React from 'react';
import { classNamesFunction, initializeComponentRef, warnDeprecations, warn } from '../../Utilities';
import { TextField } from '../../TextField';
import { TooltipHost } from '../../Tooltip';
import { DirectionalHint } from '../../common/DirectionalHint';
import { ColorRectangle } from './ColorRectangle/ColorRectangle';
import { ColorSlider } from './ColorSlider/ColorSlider';
import {
  MAX_COLOR_ALPHA,
  MAX_COLOR_RGB,
  MAX_HEX_LENGTH,
  MAX_RGBA_LENGTH,
  MIN_HEX_LENGTH,
  MIN_RGBA_LENGTH,
  HEX_REGEX,
  RGBA_REGEX,
} from '../../utilities/color/consts';
// These imports are separated to help with bundling
import { getColorFromString } from '../../utilities/color/getColorFromString';
import { getColorFromRGBA } from '../../utilities/color/getColorFromRGBA';
import { clamp } from '../../utilities/color/clamp';
import { updateA } from '../../utilities/color/updateA';
import { updateT } from '../../utilities/color/updateT';
import { updateH } from '../../utilities/color/updateH';
import { correctRGB } from '../../utilities/color/correctRGB';
import { correctHex } from '../../utilities/color/correctHex';
import { ColorRectangleBase } from './ColorRectangle/ColorRectangle.base';
import type {
  IColorPickerProps,
  IColorPickerStyleProps,
  IColorPickerStyles,
  IColorPicker,
  IColorPickerStrings,
} from './ColorPicker.types';
import type { IColor, IRGB } from '../../utilities/color/interfaces';

type ColorComponent = keyof Pick<IColor, 'r' | 'g' | 'b' | 'a' | 't' | 'hex'>;
type ColorErrorKeys = keyof Pick<
  IColorPickerStrings,
  'hexError' | 'alphaError' | 'transparencyError' | 'redError' | 'greenError' | 'blueError'
>;

export interface IColorPickerState {
  /** Most recently selected color */
  color: IColor;
  /** Color component currently being edited via a text field (if intermediate value is invalid) */
  editingColor?: {
    /** Which color component is being edited */
    component: ColorComponent;
    /** Currently entered value, which is not valid */
    value: string;
  };
}

const getClassNames = classNamesFunction<IColorPickerStyleProps, IColorPickerStyles>();

const allColorComponents: ColorComponent[] = ['hex', 'r', 'g', 'b', 'a', 't'];

const errorKeys: { [component in ColorComponent]: ColorErrorKeys } = {
  hex: 'hexError',
  r: 'redError',
  g: 'greenError',
  b: 'blueError',
  a: 'alphaError',
  t: 'transparencyError',
};

/**
 * {@docCategory ColorPicker}
 */
export class ColorPickerBase extends React.Component<IColorPickerProps, IColorPickerState> implements IColorPicker {
  public static defaultProps: Partial<IColorPickerProps> = {
    alphaType: 'alpha',
    strings: {
      rootAriaLabelFormat: 'Color picker, {0} selected.',
      hex: 'Hex',
      red: 'Red',
      green: 'Green',
      blue: 'Blue',
      alpha: 'Alpha',
      transparency: 'Transparency',
      hueAriaLabel: 'Hue',
      svAriaLabel: ColorRectangleBase.defaultProps.ariaLabel!,
      svAriaValueFormat: ColorRectangleBase.defaultProps.ariaValueFormat!,
      svAriaDescription: ColorRectangleBase.defaultProps.ariaDescription!,
      hexError: 'Hex values must be between 3 and 6 characters long',
      alphaError: 'Alpha must be between 0 and 100',
      transparencyError: 'Transparency must be between 0 and 100',
      redError: 'Red must be between 0 and 255',
      greenError: 'Green must be between 0 and 255',
      blueError: 'Blue must be between 0 and 255',
    },
  };

  private _textChangeHandlers: {
    [K in ColorComponent]: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
  };
  /**
   * Strings displayed in the UI as text field labels (these are in a separate object for convenient
   * indexing by short color component name).
   */
  private _textLabels: { [K in ColorComponent]: string };

  /** Strings besides red/green/blue/alpha/hex, with defaults for all values except the deprecated `hue` */
  private _strings: Required<Omit<IColorPickerStrings, ColorComponent | 'hue'>> & Pick<IColorPickerStrings, 'hue'>;

  constructor(props: IColorPickerProps) {
    super(props);

    initializeComponentRef(this);

    const strings = props.strings!; // always defined since it's in defaultProps

    warnDeprecations('ColorPicker', props, {
      hexLabel: 'strings.hex',
      redLabel: 'strings.red',
      greenLabel: 'strings.green',
      blueLabel: 'strings.blue',
      alphaLabel: 'strings.alpha',
      alphaSliderHidden: 'alphaType',
    });

    // eslint-disable-next-line deprecation/deprecation
    if (strings.hue) {
      // warnDeprecations can't handle nested deprecated props
      warn("ColorPicker property 'strings.hue' was used but has been deprecated. Use 'strings.hueAriaLabel' instead.");
    }

    this.state = {
      color: _getColorFromProps(props) || getColorFromString('#ffffff')!,
    };

    this._textChangeHandlers = {} as any;
    for (const component of allColorComponents) {
      this._textChangeHandlers[component] = this._onTextChange.bind(this, component);
    }

    const defaultStrings = ColorPickerBase.defaultProps.strings as Required<IColorPickerStrings>;

    this._textLabels = {
      /* eslint-disable deprecation/deprecation */
      r: props.redLabel || strings.red || defaultStrings.red,
      g: props.greenLabel || strings.green || defaultStrings.green,
      b: props.blueLabel || strings.blue || defaultStrings.blue,
      a: props.alphaLabel || strings.alpha || defaultStrings.alpha,
      hex: props.hexLabel || strings.hex || defaultStrings.hex,
      t: strings.transparency || defaultStrings.transparency,
      /* eslint-enable deprecation/deprecation */
    };

    this._strings = {
      ...defaultStrings,
      // these aria labels default to the visible labels
      alphaAriaLabel: this._textLabels.a,
      transparencyAriaLabel: this._textLabels.t,
      ...strings,
    };
  }

  public get color(): IColor {
    return this.state.color;
  }

  public componentDidUpdate(prevProps: Readonly<IColorPickerProps>, prevState: Readonly<IColorPickerState>): void {
    // if props changed (as opposed to a state update), update the color
    if (prevProps !== this.props) {
      const color = _getColorFromProps(this.props);
      if (color) {
        this._updateColor(undefined, color);
      }
    }
  }

  public render(): JSX.Element {
    const props = this.props;
    const strings = this._strings;
    const textLabels = this._textLabels;
    const {
      theme,
      className,
      styles,
      alphaType,
      // eslint-disable-next-line deprecation/deprecation
      alphaSliderHidden = alphaType === 'none',
      tooltipProps,
    } = props;
    const { color } = this.state;
    const useTransparency = alphaType === 'transparency';
    const colorComponents = ['hex', 'r', 'g', 'b', useTransparency ? 't' : 'a'];
    const atValue = useTransparency ? color.t : color.a;
    const atLabel = useTransparency ? textLabels.t : textLabels.a;

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      alphaType,
    });

    const selectedColorAriaParts = [textLabels.r, color.r, textLabels.g, color.g, textLabels.b, color.b];
    if (!alphaSliderHidden && typeof atValue === 'number') {
      selectedColorAriaParts.push(atLabel, `${atValue}%`);
    }
    const ariaLabel = strings.rootAriaLabelFormat.replace('{0}', selectedColorAriaParts.join(' '));

    return (
      <div className={classNames.root} role="group" aria-label={ariaLabel}>
        <div className={classNames.panel}>
          <ColorRectangle
            color={color}
            onChange={this._onSVChanged}
            ariaLabel={strings.svAriaLabel}
            ariaDescription={strings.svAriaDescription}
            ariaValueFormat={strings.svAriaValueFormat}
            className={classNames.colorRectangle}
          />
          <div className={classNames.flexContainer}>
            <div className={classNames.flexSlider}>
              <ColorSlider
                className="is-hue"
                type="hue"
                // eslint-disable-next-line deprecation/deprecation
                ariaLabel={strings.hue || strings.hueAriaLabel}
                value={color.h}
                onChange={this._onHChanged}
              />
              {!alphaSliderHidden && (
                <ColorSlider
                  className="is-alpha"
                  type={alphaType as 'alpha' | 'transparency'}
                  ariaLabel={useTransparency ? strings.transparencyAriaLabel : strings.alphaAriaLabel}
                  overlayColor={color.hex}
                  value={atValue}
                  onChange={this._onATChanged}
                />
              )}
            </div>
            {props.showPreview && (
              <div className={classNames.flexPreviewBox}>
                <div
                  className={classNames.colorSquare + ' is-preview'}
                  style={{
                    backgroundColor: color.str,
                  }}
                />
              </div>
            )}
          </div>

          {/* Give the table role=group to prevent it from being read as a table (ideally we should
          just get rid of the table, but this has the potential of breaking consumers) */}
          <table className={classNames.table} role="group" cellPadding="0" cellSpacing="0">
            <thead>
              <tr className={classNames.tableHeader}>
                <td className={classNames.tableHexCell}>{textLabels.hex}</td>
                <td>{textLabels.r}</td>
                <td>{textLabels.g}</td>
                <td>{textLabels.b}</td>
                {!alphaSliderHidden && <td className={classNames.tableAlphaCell}>{atLabel}</td>}
              </tr>
            </thead>
            <tbody>
              <tr>
                {colorComponents.map((comp: ColorComponent) => {
                  if ((comp === 'a' || comp === 't') && alphaSliderHidden) {
                    return null;
                  }
                  const tooltipContent = this._getTooltipValue(comp);
                  return (
                    <td key={comp}>
                      <TooltipHost
                        content={tooltipContent}
                        directionalHint={DirectionalHint.bottomCenter}
                        role="alert"
                        {...tooltipProps}
                      >
                        <TextField
                          className={classNames.input}
                          onChange={this._textChangeHandlers[comp]}
                          onBlur={this._onBlur}
                          value={this._getDisplayValue(comp)}
                          spellCheck={false}
                          ariaLabel={textLabels[comp]}
                          autoComplete="off"
                          invalid={!!tooltipContent}
                        />
                      </TooltipHost>
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

  private _getDisplayValue(component: ColorComponent): string {
    const { color, editingColor } = this.state;
    if (editingColor && editingColor.component === component) {
      return editingColor.value;
    }
    if (component === 'hex') {
      return color[component] || '';
    } else if (typeof color[component] === 'number' && !isNaN(color[component] as number)) {
      return String(color[component]);
    }
    return '';
  }

  /* Get the error tooltip value for a component if the component is in an invalid state */
  private _getTooltipValue(component: ColorComponent): string | undefined {
    const { editingColor } = this.state;
    // if the component does not have an interim value, it is valid
    if (!editingColor || editingColor.component !== component) {
      return undefined;
    }

    const { value } = editingColor;
    // for hex, do not show a tooltip if the value is between 3-6 characters
    if (component === 'hex' && value.length >= MIN_HEX_LENGTH && value.length <= MAX_HEX_LENGTH) {
      return undefined;
    }

    const errorKey: ColorErrorKeys = errorKeys[component];

    return this._strings[errorKey];
  }

  private _onSVChanged = (ev: React.MouseEvent<HTMLElement>, color: IColor): void => {
    this._updateColor(ev, color);
  };

  private _onHChanged = (ev: React.MouseEvent<HTMLElement>, h: number): void => {
    this._updateColor(ev, updateH(this.state.color, h));
  };

  /** Callback for when the alpha/transparency slider changes */
  private _onATChanged = (ev: React.MouseEvent<HTMLElement>, value: number): void => {
    const updater = this.props.alphaType === 'transparency' ? updateT : updateA;
    this._updateColor(ev, updater(this.state.color, Math.round(value)));
  };

  private _onTextChange(component: ColorComponent, event: React.FormEvent<HTMLInputElement>, newValue?: string): void {
    const color = this.state.color;
    const isHex = component === 'hex';
    const isAlpha = component === 'a';
    const isTransparency = component === 't';
    // eslint-disable-next-line deprecation/deprecation
    newValue = (newValue || '').substr(0, isHex ? MAX_HEX_LENGTH : MAX_RGBA_LENGTH);

    // Ignore what the user typed if it contains invalid characters
    const validCharsRegex = isHex ? HEX_REGEX : RGBA_REGEX;
    if (!validCharsRegex.test(newValue)) {
      return;
    }

    // Determine if the entry is valid (different methods for hex, alpha, and RGB)
    let isValid: boolean;
    if (newValue === '') {
      // Empty string is obviously not valid
      isValid = false;
    } else if (isHex) {
      // Technically hex values of length 3 are also valid, but committing the value here would
      // cause it to be automatically converted to a value of length 6, which may not be what the
      // user wanted if they're not finished typing. (Values of length 3 will be committed on blur.)
      isValid = newValue.length === MAX_HEX_LENGTH;
    } else if (isAlpha || isTransparency) {
      isValid = Number(newValue) <= MAX_COLOR_ALPHA;
    } else {
      isValid = Number(newValue) <= MAX_COLOR_RGB;
    }

    if (!isValid) {
      // If the new value is an empty string or other invalid value, save that to display.
      // (if the user still hasn't entered anything on blur, the last value is restored)
      this.setState({ editingColor: { component, value: newValue } });
    } else if (String(color[component]) === newValue) {
      // If the new value is the same as the current value, mostly ignore it.
      // Exception is that if the user was previously editing the value (but hadn't yet entered
      // a new valid value), we should clear the intermediate value.
      if (this.state.editingColor) {
        this.setState({ editingColor: undefined });
      }
    } else {
      // Should be a valid color. Update the value.
      const newColor = isHex
        ? getColorFromString('#' + newValue)
        : isTransparency
        ? updateT(color, Number(newValue))
        : getColorFromRGBA({
            ...color,
            // Overwrite whichever key is being updated with the new value
            [component]: Number(newValue),
          });
      this._updateColor(event, newColor);
    }
  }

  private _onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { color, editingColor } = this.state;
    if (!editingColor) {
      return;
    }

    // If there was an intermediate incorrect value (such as too large or empty), correct it.
    const { value, component } = editingColor;
    const isHex = component === 'hex';
    const isAlpha = component === 'a';
    const isTransparency = component === 't';
    const minLength = isHex ? MIN_HEX_LENGTH : MIN_RGBA_LENGTH;
    if (value.length >= minLength && (isHex || !isNaN(Number(value)))) {
      // Real value. Clamp to appropriate length (hex) or range (rgba).
      let newColor: IColor | undefined;
      if (isHex) {
        newColor = getColorFromString('#' + correctHex(value));
      } else if (isAlpha || isTransparency) {
        const updater = isAlpha ? updateA : updateT;
        newColor = updater(color, clamp(Number(value), MAX_COLOR_ALPHA));
      } else {
        newColor = getColorFromRGBA(
          correctRGB({
            ...color,
            [component]: Number(value),
          } as IRGB),
        );
      }

      // Update state and call onChange
      this._updateColor(event, newColor);
    } else {
      // Intermediate value was an empty string or too short (hex only).
      // Just clear the intermediate state and revert to the previous value.
      this.setState({ editingColor: undefined });
    }
  };

  /**
   * Update the displayed color and call change handlers if appropriate.
   * @param ev - Event if call was triggered by an event (undefined if triggered by props change)
   * @param newColor - Updated color
   */
  private _updateColor(ev: React.SyntheticEvent<HTMLElement> | undefined, newColor: IColor | undefined): void {
    if (!newColor) {
      return;
    }

    const { color, editingColor } = this.state;
    // For black or white, the hue can change without changing the string.
    const isDifferentColor = newColor.h !== color.h || newColor.str !== color.str;

    if (isDifferentColor || editingColor) {
      // If ev is undefined, it's an update from props (which should be unconditionally respected
      // and not call onChange).
      if (ev && this.props.onChange) {
        this.props.onChange(ev, newColor);
        if (ev.defaultPrevented) {
          return;
        }
      }
      this.setState({ color: newColor, editingColor: undefined });
    }
  }
}

function _getColorFromProps(props: IColorPickerProps): IColor | undefined {
  const { color } = props;
  return typeof color === 'string' ? getColorFromString(color) : color;
}
