import * as React from 'react';
import { autobind } from '../../utilities/autobind';
import { css } from '../../utilities/css';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';

export interface IColorSliderProps {
  minValue?: number;
  maxValue?: number;
  initialValue?: number;
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

export class ColorSlider extends React.Component<IColorSliderProps, IColorSliderState> {
  public static defaultProps = {
    minValue: 0,
    maxValue: 100,
    thumbColor: 'inherit',
    initialValue: 0
  };

  public refs: {
    [key: string]: React.ReactInstance;
    root: HTMLElement;
  };

  private _events: EventGroup;

  constructor(props: IColorSliderProps) {
    super(props);

    let { initialValue } = this.props;

    this._events = new EventGroup(this);

    this.state = {
      isAdjusting: false,
      origin: null,
      currentValue: initialValue
    };
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public render() {
    let { className, minValue, maxValue, overlayStyle } = this.props;
    let { currentValue, isAdjusting } = this.state;

    let currentPercentage = 100 * (currentValue - minValue) / (maxValue - minValue);

    return (
      <div
        ref='root'
        className={ css('ms-ColorPicker-slider', className, {
          'is-adjusting': isAdjusting
        })}
        onMouseDown={ this._onMouseDown }>
        <div className='ms-ColorPicker-sliderOverlay' style={ overlayStyle } />
        <div className='ms-ColorPicker-thumb is-slider' style={ { left: currentPercentage + '%' } }/>
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
