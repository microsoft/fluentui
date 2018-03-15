import * as React from 'react';
import {
  BaseComponent,
  autobind,
  css,
  createRef
} from '../../Utilities';
import * as stylesImport from './ColorPicker.scss';
const styles: any = stylesImport;

export interface IColorSliderProps {
  componentRef?: () => void;
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

  private _root = createRef<HTMLDivElement>();

  constructor(props: IColorSliderProps) {
    super(props);

    const { value } = this.props;

    this.state = {
      isAdjusting: false,
      origin: undefined,
      currentValue: value
    };
  }

  public componentWillReceiveProps(newProps: IColorSliderProps) {
    if (newProps && newProps.value) {
      this.setState({ currentValue: newProps.value });
    }
  }

  public render() {
    const { className, minValue, maxValue, overlayStyle } = this.props;
    const { currentValue, isAdjusting } = this.state;

    const currentPercentage = 100 * (currentValue! - minValue!) / (maxValue! - minValue!);

    return (
      <div
        ref={ this._root }
        className={ css(
          'ms-ColorPicker-slider',
          styles.slider,
          className,
          isAdjusting && 'is-adjusting'
        ) }
        onMouseDown={ this._onMouseDown }
      >
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
    if (!this._root.value) {
      return;
    }

    const { onChanged, minValue, maxValue } = this.props;
    const rectSize = this._root.value.getBoundingClientRect();

    const currentPercentage = (ev.clientX - rectSize.left) / rectSize.width;
    const newValue = Math.min(maxValue!, Math.max(minValue!, currentPercentage * maxValue!));

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
      origin: undefined
    });
  }

}
