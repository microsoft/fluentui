import * as React from 'react';
import { classNamesFunction, initializeComponentRef, EventGroup, KeyCodes, getWindow } from '../../../Utilities';
import { IColorSliderProps, IColorSliderStyleProps, IColorSliderStyles } from './ColorSlider.types';

const getClassNames = classNamesFunction<IColorSliderStyleProps, IColorSliderStyles>();

export interface IColorSliderState {
  currentValue: number;
}

/**
 * {@docCategory ColorPicker}
 */
export class ColorSliderBase extends React.Component<IColorSliderProps, IColorSliderState> {
  public static defaultProps = {
    minValue: 0,
    maxValue: 100,
    thumbColor: 'inherit',
    value: 0
  };

  private _events: EventGroup;
  private _root = React.createRef<HTMLDivElement>();

  constructor(props: IColorSliderProps) {
    super(props);

    initializeComponentRef(this);
    this._events = new EventGroup(this);

    const { value } = this.props;

    this.state = {
      currentValue: value || 0
    };
  }

  // tslint:disable-next-line function-name
  public UNSAFE_componentWillReceiveProps(newProps: IColorSliderProps): void {
    if (newProps && newProps.value) {
      this.setState({ currentValue: newProps.value });
    }
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public render(): JSX.Element {
    const { isAlpha, minValue, maxValue, overlayStyle, theme, className, styles } = this.props;
    const { currentValue } = this.state;

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className
    });

    const currentPercentage = (100 * (currentValue! - minValue!)) / (maxValue! - minValue!);

    const hueStyle = {
      background:
        // tslint:disable-next-line:max-line-length
        'linear-gradient(to left,red 0,#f09 10%,#cd00ff 20%,#3200ff 30%,#06f 40%,#00fffd 50%,#0f6 60%,#35ff00 70%,#cdff00 80%,#f90 90%,red 100%)'
    };

    const alphaStyle = {
      backgroundImage:
        // tslint:disable-next-line:max-line-length
        'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJUlEQVQYV2N89erVfwY0ICYmxoguxjgUFKI7GsTH5m4M3w1ChQC1/Ca8i2n1WgAAAABJRU5ErkJggg==)'
    };

    const sliderStyle = isAlpha ? alphaStyle : hueStyle;

    return (
      <div
        ref={this._root}
        className={classNames.root}
        tabIndex={0}
        onKeyDown={this._onKeyDown}
        onMouseDown={this._onMouseDown}
        style={sliderStyle}
      >
        <div className={classNames.sliderOverlay} style={overlayStyle} />
        <div className={classNames.sliderThumb} style={{ left: currentPercentage + '%' }} />
      </div>
    );
  }

  private _onKeyDown = (ev: React.KeyboardEvent): void => {
    let { currentValue = 0 } = this.state;
    const { minValue = 0, maxValue = 100 } = this.props;
    const increment = ev.shiftKey ? 10 : 1;

    switch (ev.which) {
      case KeyCodes.left: {
        currentValue = Math.max(minValue, currentValue - increment);
        break;
      }
      case KeyCodes.right: {
        currentValue = Math.min(maxValue, currentValue + increment);
        break;
      }
      case KeyCodes.home: {
        currentValue = minValue;
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

    this._updateValue(ev, currentValue);
  };

  private _onMouseDown = (ev: React.MouseEvent<HTMLElement>): void => {
    const win = getWindow(this);

    this._events.on(win, 'mousemove', this._onMouseMove, true);
    this._events.on(win, 'mouseup', this._onMouseUp, true);

    this._onMouseMove(ev);
  };

  private _updateValue(ev: React.MouseEvent | React.KeyboardEvent, currentValue: number) {
    const { onChange } = this.props;

    if (onChange) {
      onChange(ev, currentValue);
    }

    if (!ev.defaultPrevented) {
      this.setState({
        currentValue
      });
      ev.preventDefault();
    }
  }

  private _onMouseMove = (ev: React.MouseEvent): void => {
    if (!this._root.current) {
      return;
    }

    const { minValue, maxValue } = this.props;
    const rectSize = this._root.current.getBoundingClientRect();

    const currentPercentage = (ev.clientX - rectSize.left) / rectSize.width;
    const newValue = Math.min(maxValue!, Math.max(minValue!, currentPercentage * maxValue!));

    this._updateValue(ev, newValue);
  };

  private _onMouseUp = (ev: React.MouseEvent): void => {
    this._events.off();
  };
}
