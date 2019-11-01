import * as React from 'react';
import { classNamesFunction, EventGroup, initializeComponentRef, KeyCodes, getId } from '../../../Utilities';
import { IColorRectangleProps, IColorRectangleStyleProps, IColorRectangleStyles, IColorRectangle } from './ColorRectangle.types';

// These imports are separated to help with bundling
import { IColor } from '../../../utilities/color/interfaces';
import { MAX_COLOR_SATURATION, MAX_COLOR_VALUE } from '../../../utilities/color/consts';
import { getFullColorString } from '../../../utilities/color/getFullColorString';
import { updateSV } from '../../../utilities/color/updateSV';
import { clamp } from '../../../utilities/color/clamp';

const getClassNames = classNamesFunction<IColorRectangleStyleProps, IColorRectangleStyles>();

export interface IColorRectangleState {
  color: IColor;
}

/**
 * {@docCategory ColorPicker}
 */
export class ColorRectangleBase extends React.Component<IColorRectangleProps, IColorRectangleState> implements IColorRectangle {
  public static defaultProps: Partial<IColorRectangleProps> = {
    minSize: 220,
    ariaLabel: 'Saturation and brightness',
    ariaValueFormat: 'Saturation {0} brightness {1}',
    ariaDescription: 'Use left and right arrow keys to set saturation. Use up and down arrow keys to set brightness.'
  };

  private _events: EventGroup;
  private _root = React.createRef<HTMLDivElement>();
  private _isAdjustingSaturation: boolean = true;
  private _descriptionId = getId('ColorRectangle-description');

  constructor(props: IColorRectangleProps) {
    super(props);

    initializeComponentRef(this);
    this._events = new EventGroup(this);

    this.state = { color: props.color };
  }

  public get color(): IColor {
    return this.state.color;
  }

  public componentDidUpdate(prevProps: Readonly<IColorRectangleProps>, prevState: Readonly<IColorRectangleState>): void {
    // if props changed (as opposed to a state update), set the value
    // TODO: switch to strict controlled pattern instead
    if (prevProps !== this.props && this.props.color) {
      this.setState({ color: this.props.color });
    }
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public render(): JSX.Element {
    const { minSize, theme, className, styles, ariaValueFormat, ariaLabel, ariaDescription } = this.props;
    const { color } = this.state;

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      minSize
    });

    const valueText = ariaValueFormat!.replace('{0}', String(color.s)).replace('{1}', String(color.v));

    return (
      <div
        ref={this._root}
        tabIndex={0}
        className={classNames.root}
        style={{ backgroundColor: getFullColorString(color) }}
        onMouseDown={this._onMouseDown}
        onKeyDown={this._onKeyDown}
        role="slider"
        // Proper description of the current hue *and* saturation (screen reader typically chooses this over aria-valuenow)
        aria-valuetext={valueText}
        // Narrator reads aria-valuetext first, but it also reads aria-valuenow after a pause, and
        // per the aria spec this defaults to halfway between min/max (50) if we don't provide it.
        // So provide the value of the most recently adjusted thing.
        aria-valuenow={this._isAdjustingSaturation ? color.s : color.v}
        aria-valuemin={0}
        aria-valuemax={MAX_COLOR_VALUE}
        aria-label={ariaLabel}
        aria-describedby={this._descriptionId}
        data-is-focusable={true}
      >
        <div className={classNames.description} id={this._descriptionId}>
          {ariaDescription}
        </div>
        <div className={classNames.light} />
        <div className={classNames.dark} />
        <div
          className={classNames.thumb}
          style={{ left: color!.s + '%', top: MAX_COLOR_VALUE - color!.v + '%', backgroundColor: color!.str }}
        />
      </div>
    );
  }

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    const { color } = this.state;
    let { s, v } = color;

    const increment = ev.shiftKey ? 10 : 1;

    // Intentionally DO NOT flip the color picker in RTL: its orientation is not very meaningful,
    // and getting all the math and styles flipped correctly is tricky
    switch (ev.which) {
      case KeyCodes.up: {
        this._isAdjustingSaturation = false;
        v += increment; // V = 100 (lightest) is at the top
        break;
      }
      case KeyCodes.down: {
        this._isAdjustingSaturation = false;
        v -= increment; // V = 0 (darkest) is at the bottom
        break;
      }
      case KeyCodes.left: {
        this._isAdjustingSaturation = true;
        s -= increment;
        break;
      }
      case KeyCodes.right: {
        this._isAdjustingSaturation = true;
        s += increment;
        break;
      }
      default:
        return;
    }

    this._updateColor(ev, updateSV(color, clamp(s, MAX_COLOR_SATURATION), clamp(v, MAX_COLOR_VALUE)));
  };

  private _updateColor(ev: React.MouseEvent | React.KeyboardEvent, color: IColor): void {
    const { onChange } = this.props;

    const oldColor = this.state.color;
    if (color.s === oldColor.s && color.v === oldColor.v) {
      return; // no change
    }

    if (onChange) {
      onChange(ev, color);
    }

    if (!ev.defaultPrevented) {
      this.setState({ color });
      ev.preventDefault();
    }
  }

  private _onMouseDown = (ev: React.MouseEvent): void => {
    this._events.on(window, 'mousemove', this._onMouseMove, true);
    this._events.on(window, 'mouseup', this._disableEvents, true);

    this._onMouseMove(ev);
  };

  private _onMouseMove = (ev: React.MouseEvent): void => {
    if (!this._root.current) {
      return;
    }

    // If the primary button (1) isn't pressed, the user is no longer dragging, so turn off the
    // event handlers and exit. (this may only be relevant while debugging)
    // tslint:disable-next-line:no-bitwise
    if (!(ev.buttons & 1)) {
      this._disableEvents();
      return;
    }

    const newColor = _getNewColor(ev, this.state.color, this._root.current);
    if (newColor) {
      this._updateColor(ev, newColor);
    }
  };

  private _disableEvents = (): void => {
    this._events.off();
  };
}

/**
 * Exported for testing only.
 * @internal
 */
export function _getNewColor(ev: React.MouseEvent, prevColor: IColor, root: HTMLElement): IColor | undefined {
  const rectSize = root.getBoundingClientRect();

  const sPercentage = (ev.clientX - rectSize.left) / rectSize.width;
  const vPercentage = (ev.clientY - rectSize.top) / rectSize.height;

  return updateSV(
    prevColor,
    clamp(Math.round(sPercentage * MAX_COLOR_SATURATION), MAX_COLOR_SATURATION),
    clamp(Math.round(MAX_COLOR_VALUE - vPercentage * MAX_COLOR_VALUE), MAX_COLOR_VALUE)
  );
}
