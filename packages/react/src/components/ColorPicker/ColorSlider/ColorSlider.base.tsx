import * as React from 'react';
import {
  classNamesFunction,
  initializeComponentRef,
  on,
  KeyCodes,
  getWindow,
  warnDeprecations,
  warn,
} from '../../../Utilities';
import { clamp } from '../../../utilities/color/clamp';
import { MAX_COLOR_HUE, MAX_COLOR_ALPHA } from '../../../utilities/color/consts';
import type { IColorSliderProps, IColorSliderStyleProps, IColorSliderStyles, IColorSlider } from './ColorSlider.types';

const getClassNames = classNamesFunction<IColorSliderStyleProps, IColorSliderStyles>();

export interface IColorSliderState {
  currentValue: number;
}

/**
 * {@docCategory ColorPicker}
 */
export class ColorSliderBase extends React.Component<IColorSliderProps, IColorSliderState> implements IColorSlider {
  public static defaultProps: Partial<IColorSliderProps> = {
    value: 0,
  };

  private _disposables: (() => void)[] = [];
  private _root = React.createRef<HTMLDivElement>();

  constructor(props: IColorSliderProps) {
    super(props);

    initializeComponentRef(this);

    warnDeprecations('ColorSlider', props, {
      thumbColor: 'styles.sliderThumb',
      overlayStyle: 'overlayColor',
      isAlpha: 'type',
      maxValue: 'type',
      minValue: 'type',
    });
    // eslint-disable-next-line deprecation/deprecation
    if (this._type !== 'hue' && !(props.overlayColor || props.overlayStyle)) {
      warn(`ColorSlider: 'overlayColor' is required when 'type' is "alpha" or "transparency"`);
    }

    this.state = {
      currentValue: props.value || 0,
    };
  }

  public get value(): number {
    return this.state.currentValue;
  }

  public componentDidUpdate(prevProps: Readonly<IColorSliderProps>, prevState: Readonly<IColorSliderState>): void {
    // if props changed (as opposed to a state update), set the value
    // TODO: switch to strict controlled pattern instead
    if (prevProps !== this.props && this.props.value !== undefined) {
      this.setState({ currentValue: this.props.value });
    }
  }

  public componentDidMount(): void {
    if (this._root.current) {
      // with Chrome's passive DOM listeners, stopPropagation and preventDefault only work if passive is false.
      this._root.current.addEventListener('touchstart', this._onTouchStart, { capture: true, passive: false });
      this._root.current.addEventListener('touchmove', this._onTouchMove, { capture: true, passive: false });
    }
  }

  public componentWillUnmount() {
    if (this._root.current) {
      this._root.current.removeEventListener('touchstart', this._onTouchStart);
      this._root.current.removeEventListener('touchmove', this._onTouchMove);
    }
    this._disposeListeners();
  }

  public render(): JSX.Element {
    const type = this._type;
    const maxValue = this._maxValue;
    const {
      // eslint-disable-next-line deprecation/deprecation
      overlayStyle,
      overlayColor,
      theme,
      className,
      styles,
      ariaLabel = type,
    } = this.props;
    const currentValue = this.value;

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      type,
    });

    const currentPercentage = (100 * currentValue) / maxValue;

    return (
      <div
        ref={this._root}
        className={classNames.root}
        tabIndex={0}
        onKeyDown={this._onKeyDown}
        onMouseDown={this._onMouseDown}
        role="slider"
        aria-valuenow={currentValue}
        // Narrator doesn't read aria-valuenow properly
        aria-valuetext={String(currentValue)}
        aria-valuemin={0}
        aria-valuemax={maxValue}
        aria-label={ariaLabel}
        data-is-focusable={true}
      >
        {!!(overlayColor || overlayStyle) && (
          <div
            className={classNames.sliderOverlay}
            // this isn't included in getStyles because it may change frequently
            style={
              overlayColor
                ? {
                    background:
                      type === 'transparency'
                        ? `linear-gradient(to right, #${overlayColor}, transparent)`
                        : `linear-gradient(to right, transparent, #${overlayColor})`,
                  }
                : overlayStyle
            }
          />
        )}
        <div className={classNames.sliderThumb} style={{ left: currentPercentage + '%' }} />
      </div>
    );
  }

  private get _type(): IColorSliderProps['type'] {
    // eslint-disable-next-line deprecation/deprecation
    const { isAlpha, type = isAlpha ? 'alpha' : 'hue' } = this.props;
    return type;
  }

  private get _maxValue(): number {
    return this._type === 'hue' ? MAX_COLOR_HUE : MAX_COLOR_ALPHA;
  }

  private _onKeyDown = (ev: React.KeyboardEvent): void => {
    let currentValue = this.value;
    const maxValue = this._maxValue;
    const increment = ev.shiftKey ? 10 : 1;

    // Intentionally DO NOT flip the color picker in RTL: its orientation is not very meaningful,
    // and getting all the math and styles flipped correctly is tricky
    // eslint-disable-next-line deprecation/deprecation
    switch (ev.which) {
      case KeyCodes.left: {
        currentValue -= increment;
        break;
      }
      case KeyCodes.right: {
        currentValue += increment;
        break;
      }
      case KeyCodes.home: {
        currentValue = 0;
        break;
      }
      case KeyCodes.end: {
        currentValue = maxValue;
        break;
      }
      default: {
        return;
      }
    }

    this._updateValue(ev, clamp(currentValue, maxValue));
  };

  private _onMouseDown = (ev: React.MouseEvent<HTMLElement>): void => {
    const win = getWindow(this as any);

    if (win) {
      this._disposables.push(
        on(win, 'mousemove', this._onMouseMove as (ev: MouseEvent) => void, true),
        on(win, 'mouseup', this._disposeListeners, true),
      );
    }

    this._onMouseMove(ev);
  };

  private _onMouseMove = (ev: MouseEvent | React.MouseEvent): void => {
    if (!this._root.current) {
      return;
    }

    const maxValue = this._maxValue;
    const rectSize = this._root.current.getBoundingClientRect();

    const currentPercentage = (ev.clientX - rectSize.left) / rectSize.width;
    const newValue = clamp(Math.round(currentPercentage * maxValue), maxValue);

    this._updateValue(ev, newValue);
  };

  private _onTouchStart = (ev: TouchEvent): void => {
    if (!this._root.current) {
      return;
    }

    // prevent touch from scrolling the page so that the touch can be dragged on the color rectangle.
    ev.stopPropagation();
  };

  private _onTouchMove = (ev: TouchEvent): void => {
    if (!this._root.current) {
      return;
    }

    const lastTouch = ev.touches[ev.touches.length - 1];
    if (lastTouch.clientX !== undefined) {
      const maxValue = this._maxValue;
      const rectSize = this._root.current.getBoundingClientRect();

      const currentPercentage = (lastTouch.clientX - rectSize.left) / rectSize.width;
      const newValue = clamp(Math.round(currentPercentage * maxValue), maxValue);

      this._updateValue(ev, newValue);
    }

    ev.preventDefault();
    ev.stopPropagation();
  };

  private _disposeListeners = (): void => {
    this._disposables.forEach(dispose => dispose());
    this._disposables = [];
  };

  private _updateValue(
    ev: MouseEvent | KeyboardEvent | React.MouseEvent | React.KeyboardEvent | TouchEvent,
    newValue: number,
  ) {
    if (newValue === this.value) {
      return;
    }

    const { onChange } = this.props;

    if (onChange) {
      onChange(ev as React.MouseEvent | React.KeyboardEvent, newValue);
    }

    if (!ev.defaultPrevented) {
      this.setState({
        currentValue: newValue,
      });
      ev.preventDefault();
    }
  }
}
