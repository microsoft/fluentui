import * as React from 'react';
import './Slider.scss';
import { ISliderProps } from './Slider.Props';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';
import { KeyCodes } from '../../utilities/KeyCodes';
import { css } from '../../utilities/css';
import { getRTL as isRTL, getRTLSafeKeyCode } from '../../utilities/rtl';

export interface ISliderState {
  value: number;
}

export enum ValuePosition {
  Previous,
  Next
}

let _instance: number = 0;

export class Slider extends React.Component<ISliderProps, ISliderState> {
  public static defaultProps: {} = {
    step: 1,
    showValue: true,
    isDisabled: false
  };

  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement,
    sliderLine: HTMLElement,
    thumb: HTMLElement
  };

  private _events: EventGroup;
  private _id: string;

  public static ensurePropsValid(props: ISliderProps): ISliderProps {
    if (props.max <= props.min) {
      props.max = props.min + 1;
    }
    if (!props.step || props.step <= 0) {
      props.step = 1;
    }
    if (!props.initialValue || props.initialValue < props.min) {
      props.initialValue = props.min;
    } else if (props.initialValue > props.max) {
      props.initialValue = props.max;
    }
    return props;
  }

  constructor(props?: ISliderProps) {
    const validProps: ISliderProps = Slider.ensurePropsValid(props);
    super(validProps);

    this._events = new EventGroup(this);
    this._onMouseDownOrTouchStart = this._onMouseDownOrTouchStart.bind(this);
    this._onMouseMoveOrTouchMove = this._onMouseMoveOrTouchMove.bind(this);
    this._onMouseUpOrTouchEnd = this._onMouseUpOrTouchEnd.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);

    this._id = `Slider-${ _instance++ }`;

    this.state = {
      value: validProps.initialValue
    };
  }

  /**
   * Invoked when a component is receiving new props. This method is not called for the initial render.
   */
  public componentWillReceiveProps(newProps: ISliderProps): void {
    const validProps: ISliderProps = Slider.ensurePropsValid(newProps);
    this.setState({
      value: validProps.initialValue
    });
  }

  public componentWillUnmount(): void {
    this._events.dispose();
  }

  public render(): React.ReactElement<{}> {
    const max: number = this.props.max;
    const min: number = this.props.min;
    const value: number = this.state.value;
    const label: string = this.props.label;
    const showValue: boolean = this.props.showValue;
    const isDisabled: boolean = this.props.isDisabled;
    const thumbOffsetPercent: number = (value - min) / (max - min) * 100;

    const ariaLabel: string = this.props.ariaLabel;

    const onMouseDownProp: {} = isDisabled ? {} : { onMouseDown: this._onMouseDownOrTouchStart };
    const onTouchStartProp: {} = isDisabled ? {} : { onTouchStart: this._onMouseDownOrTouchStart };
    const onKeyDownProp: {} = isDisabled ? {} : { onKeyDown: this._onKeyDown };

    return (
      <div ref='root'>
        { label && <label className='ms-Label'
                          { ...ariaLabel ? {} : {'htmlFor' : this._id} }>{ label }</label> }
        <div className= { css('ms-Slider-wrapper', {
               'ms-Slider-showValue': showValue
             }) } >
          <div ref='sliderLine'
               role='application'
               className = { css('ms-Slider-line', {
                 'ms-Slider-enabled': !isDisabled,
                 'ms-Slider-disabled': isDisabled
               }) }
               { ...onMouseDownProp }
               { ...onTouchStartProp }>
            <span ref='thumb'
                  id={ this._id }
                  className='ms-Slider-thumb'
                  { ...isDisabled ? {} : {'tabIndex': 0 } }
                  role='slider'
                  aria-valuenow={ value }
                  aria-valuemin={ min }
                  aria-valuemax={ max }
                  { ...ariaLabel ? {'aria-label' : ariaLabel} : {} }
                  style={ isRTL() ?
                          {'right': thumbOffsetPercent + '%'} :
                          {'left': thumbOffsetPercent + '%'} }
                  { ...onKeyDownProp }></span>
            <span className='ms-Slider-active' style={ {'width': thumbOffsetPercent + '%'} }></span>
            <span className='ms-Slider-inactive' style={ {'width': (100 - thumbOffsetPercent) + '%'} }></span>
          </div>
          { showValue && <label className='ms-Label ms-Slider-value'>{ value }</label> }
        </div>
      </div>
    ) as React.ReactElement<{}>;
  }

  private _onMouseDownOrTouchStart(event: MouseEvent | TouchEvent): void {
    if (event.type === 'mousedown') {
      this._events.on(window, 'mousemove', this._onMouseMoveOrTouchMove, true);
      this._events.on(window, 'mouseup', this._onMouseUpOrTouchEnd, true);
    } else if (event.type === 'touchstart') {
      this._events.on(window, 'touchmove', this._onMouseMoveOrTouchMove, true);
      this._events.on(window, 'touchend', this._onMouseUpOrTouchEnd, true);
    }

    this._onMouseMoveOrTouchMove(event);
  }

  private _onMouseMoveOrTouchMove(event: MouseEvent | TouchEvent): void {
    const max: number = this.props.max;
    const min: number = this.props.min;
    const step: number = this.props.step;
    const onChanged: (value: number) => void = this.props.onChanged;

    const steps: number = (max - min) / step;
    const sliderLength: number = this.refs.sliderLine.offsetWidth;
    const stepLength: number = sliderLength / steps;
    const sliderPositionRect: ClientRect = this.refs.sliderLine.getBoundingClientRect();
    let currentSteps: number;
    if (event.type === 'mousedown' || event.type === 'mousemove') {
      currentSteps = isRTL() ?
                     (sliderPositionRect.right - (event as MouseEvent).clientX) / stepLength :
                     ((event as MouseEvent).clientX - sliderPositionRect.left) / stepLength;
    } else if (event.type === 'touchstart' || event.type === 'touchmove') {
      currentSteps = isRTL() ?
                     (sliderPositionRect.right - (event as TouchEvent).touches[0].clientX) / stepLength :
                     ((event as TouchEvent).touches[0].clientX - sliderPositionRect.left) / stepLength;
    }

    let currentValue: number;
    // The value shouldn't be bigger than max or be smaller than min.
    if (currentSteps > Math.floor(steps)) {
      currentValue = max;
    } else if (currentSteps < 0) {
      currentValue = min;
    } else {
      currentValue = min + step * Math.round(currentSteps);
    }

    this.setState({
      value: currentValue
    });
    if (onChanged) {
      onChanged(currentValue);
    }

    event.preventDefault();
    event.stopPropagation();
  }

  private _onMouseUpOrTouchEnd(): void {
    this._events.off();
  }

  private _onKeyDown(event: MouseEvent): void {
    const max: number = this.props.max;
    const min: number = this.props.min;
    const step: number = this.props.step;
    const value: number = this.state.value;
    const onChanged: (value: number) => void = this.props.onChanged;

    let diff: number = 0;
    if (event.which === getRTLSafeKeyCode(KeyCodes.left)) {
      diff = -step;
    } else if (event.which === getRTLSafeKeyCode(KeyCodes.right)) {
      diff = step;
    } else {
      return;
    }
    const newValue: number = Math.min(max, Math.max(min, value + diff));

    this.setState({
      value: newValue
    });
    if (onChanged) {
      onChanged(newValue);
    }

    event.preventDefault();
    event.stopPropagation();
  }

}