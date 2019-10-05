import * as React from 'react';
import { classNamesFunction, EventGroup, initializeComponentRef, getRTLSafeKeyCode, KeyCodes } from '../../../Utilities';
import { IColor } from '../../../utilities/color/interfaces';
import { MAX_COLOR_SATURATION, MAX_COLOR_VALUE } from '../../../utilities/color/consts';
import { getFullColorString } from '../../../utilities/color/getFullColorString';
import { updateSV } from '../../../utilities/color/updateSV';
import { clamp } from '../../../utilities/color/clamp';
import { IColorRectangleProps, IColorRectangleStyleProps, IColorRectangleStyles, IColorRectangle } from './ColorRectangle.types';

const getClassNames = classNamesFunction<IColorRectangleStyleProps, IColorRectangleStyles>();

export interface IColorRectangleState {
  color: IColor;
}

/**
 * {@docCategory ColorPicker}
 */
export class ColorRectangleBase extends React.Component<IColorRectangleProps, IColorRectangleState> implements IColorRectangle {
  public static defaultProps = {
    minSize: 220
  };

  private _events: EventGroup;
  private _root = React.createRef<HTMLDivElement>();

  constructor(props: IColorRectangleProps) {
    super(props);

    initializeComponentRef(this);
    this._events = new EventGroup(this);

    const { color } = this.props;

    this.state = {
      color: color
    };
  }

  public get color(): IColor {
    return this.state.color;
  }

  // tslint:disable-next-line function-name
  public UNSAFE_componentWillReceiveProps(newProps: IColorRectangleProps): void {
    const { color } = newProps;

    this.setState({
      color: color
    });
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public render(): JSX.Element {
    const { minSize, theme, className, styles } = this.props;
    const { color } = this.state;

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      minSize
    });

    return (
      <div
        ref={this._root}
        tabIndex={0}
        className={classNames.root}
        style={{ backgroundColor: getFullColorString(color) }}
        onMouseDown={this._onMouseDown}
        onKeyDown={this._onKeyDown}
      >
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
    let s = color.s;
    let v = color.v;

    const increment = ev.shiftKey ? 10 : 1;

    switch (getRTLSafeKeyCode(ev.which)) {
      case KeyCodes.up: {
        v = Math.min(100, v + increment);
        break;
      }
      case KeyCodes.down: {
        v = Math.max(0, v - increment);
        break;
      }
      case KeyCodes.left: {
        s = Math.max(0, s - increment);
        break;
      }
      case KeyCodes.right: {
        s = Math.min(100, s + increment);
        break;
      }
      default:
        return;
    }
    this._updateColor(ev, updateSV(color, (s / 100) * MAX_COLOR_SATURATION, (v / 100) * MAX_COLOR_VALUE));
  };

  private _updateColor(ev: React.MouseEvent | React.KeyboardEvent, color: IColor): void {
    const { onChange } = this.props;

    if (onChange) {
      onChange(ev, color);
    }

    if (!ev.defaultPrevented && ev.type === 'keydown') {
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
    const { color } = this.props;

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

    const newColor = _getNewColor(ev, color, this._root.current);

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
    clamp(sPercentage * MAX_COLOR_SATURATION, MAX_COLOR_SATURATION),
    clamp(MAX_COLOR_VALUE - vPercentage * MAX_COLOR_VALUE, MAX_COLOR_VALUE)
  );
}
