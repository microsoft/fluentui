import * as React from 'react';
import {
  BaseComponent,
  autobind,
  css
} from '../../Utilities';
import stylesImport from './ColorPicker.scss';
const styles: any = stylesImport;

export interface IColorSliderProps {
  minValue?: number;
  maxValue?: number;
  value?: number;
  thumbColor?: string;
  overlayStyle?: any;
  onChanged?: (newValue: number) => void;

  className?: string;
  style?: any;
}

export interface IColorSliderState {
  isAdjusting?: boolean;
  origin?: { x: number, originalValue: number };
  currentValue?: number;
}

export class ColorSlider extends BaseComponent<IColorSliderProps, IColorSliderState> {
  public static defaultProps = {
    minValue: 0,
    maxValue: 100,
    thumbColor: 'inherit',
    value: 0
  };

  public refs: {
    [key: string]: React.ReactInstance;
    root: HTMLElement;
  };

  constructor(props: IColorSliderProps) {
    super(props);

    let { value } = this.props;

    this.state = {
      isAdjusting: false,
      origin: null,
      currentValue: value
    };
  }

  public componentWillReceiveProps(newProps: IColorSliderProps) {
    if (newProps && newProps.value) {
      this.setState({ currentValue: newProps.value });
    }
  }

  public render() {
    let { className, minValue, maxValue, overlayStyle } = this.props;
    let { currentValue, isAdjusting } = this.state;

    let currentPercentage = 100 * (currentValue - minValue) / (maxValue - minValue);

    return (
      <div
        ref='root'
        className={ css('ms-ColorPicker-slider', styles.slider, className, {
          'is-adjusting': isAdjusting
        }) }
        onMouseDown={ this._onMouseDown }>
        <div className={ css('ms-ColorPicker-sliderOverlay', styles.sliderOverlay) } style={ overlayStyle } />
        <div className={ css('ms-ColorPicker-thumb is-slider', styles.thumb, styles.thumbIsSlider) } style={ { left: currentPercentage + '%' } } />
      </div>
    );
  }

  @autobind
  private _onMouseDown(ev: React.MouseEvent<HTMLElement>) {
    this._events.on(window, 'mousemove', this._onMouseMove, true);
    this._events.on(window, 'mouseup', this._onMouseUp, true);

    this._onMouseMove(ev);
  }

  @autobind
  private _onMouseMove(ev: React.MouseEvent<HTMLElement>) {
    let { onChanged, minValue, maxValue } = this.props;
    let rectSize = this.refs.root.getBoundingClientRect();

    let currentPercentage = (ev.clientX - rectSize.left) / rectSize.width;
    let newValue = Math.min(maxValue, Math.max(minValue, currentPercentage * maxValue));

    this.setState({
      isAdjusting: true,
      currentValue: newValue
    });

    if (onChanged) {
      onChanged(newValue);
    }

    ev.preventDefault();
    ev.stopPropagation();
  }

  @autobind
  private _onMouseUp(ev: React.MouseEvent<HTMLElement>) {
    this._events.off();

    this.setState({
      isAdjusting: false,
      origin: null
    });
  }

}
