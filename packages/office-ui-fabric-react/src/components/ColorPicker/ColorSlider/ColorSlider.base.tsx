import * as React from 'react';
import { classNamesFunction, initializeComponentRef, EventGroup, KeyCodes, getWindow, warnDeprecations } from '../../../Utilities';
import { IColorSliderProps, IColorSliderStyleProps, IColorSliderStyles, IColorSlider } from './ColorSlider.types';
import { clamp } from '../../../utilities/color/clamp';

const getClassNames = classNamesFunction<IColorSliderStyleProps, IColorSliderStyles>();

export interface IColorSliderState {
  currentValue: number;
}

/**
 * {@docCategory ColorPicker}
 */
export class ColorSliderBase extends React.Component<IColorSliderProps, IColorSliderState> implements IColorSlider {
  public static defaultProps: Partial<IColorSliderProps> = {
    minValue: 0,
    maxValue: 100,
    value: 0
  };

  private _events: EventGroup;
  private _root = React.createRef<HTMLDivElement>();

  constructor(props: IColorSliderProps) {
    super(props);

    initializeComponentRef(this);
    this._events = new EventGroup(this);

    warnDeprecations('ColorSlider', props, {
      thumbColor: 'styles.sliderThumb',
      overlayStyle: 'overlayColor'
    });

    this.state = {
      currentValue: props.value || 0
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

  public componentWillUnmount() {
    this._events.dispose();
  }

  public render(): JSX.Element {
    const { isAlpha, minValue, maxValue, overlayStyle, overlayColor, theme, className, styles } = this.props;
    const { ariaLabel = isAlpha ? 'Alpha' : 'Hue' } = this.props;
    const currentValue = this.value;

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      isAlpha
    });

    const currentPercentage = (100 * (currentValue! - minValue!)) / (maxValue! - minValue!);

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
        aria-valuemin={minValue}
        aria-valuemax={maxValue}
        aria-label={ariaLabel}
        data-is-focusable={true}
      >
        {!!(overlayStyle || overlayColor) && (
          <div
            className={classNames.sliderOverlay}
            // this isn't included in getStyles because it may change frequently
            style={overlayStyle || { background: `linear-gradient(to right, transparent 0, #${overlayColor} 100%)` }}
          />
        )}
        <div className={classNames.sliderThumb} style={{ left: currentPercentage + '%' }} />
      </div>
    );
  }

  private _onKeyDown = (ev: React.KeyboardEvent): void => {
    let currentValue = this.value;
    const { minValue, maxValue } = this.props;
    const increment = ev.shiftKey ? 10 : 1;

    // Intentionally DO NOT flip the color picker in RTL: its orientation is not very meaningful,
    // and getting all the math and styles flipped correctly is tricky
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
        currentValue = minValue!;
        break;
      }
      case KeyCodes.end: {
        currentValue = maxValue!;
        break;
      }
      default: {
        return;
      }
    }

    this._updateValue(ev, clamp(currentValue, maxValue!, minValue));
  };

  private _onMouseDown = (ev: React.MouseEvent<HTMLElement>): void => {
    const win = getWindow(this as any);

    this._events.on(win, 'mousemove', this._onMouseMove, true);
    this._events.on(win, 'mouseup', this._onMouseUp, true);

    this._onMouseMove(ev);
  };

  private _onMouseMove = (ev: React.MouseEvent): void => {
    if (!this._root.current) {
      return;
    }

    const { minValue, maxValue } = this.props;
    const rectSize = this._root.current.getBoundingClientRect();

    const currentPercentage = (ev.clientX - rectSize.left) / rectSize.width;
    const newValue = clamp(Math.round(currentPercentage * maxValue!), maxValue!, minValue!);

    this._updateValue(ev, newValue);
  };

  private _onMouseUp = (): void => {
    this._events.off();
  };

  private _updateValue(ev: React.MouseEvent | React.KeyboardEvent, newValue: number) {
    if (newValue === this.value) {
      return;
    }

    const { onChange } = this.props;

    if (onChange) {
      onChange(ev, newValue);
    }

    if (!ev.defaultPrevented) {
      this.setState({
        currentValue: newValue
      });
      ev.preventDefault();
    }
  }
}
