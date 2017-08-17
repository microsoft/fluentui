import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  autobind,
  css,
  getId,
  getRTL,
  getRTLSafeKeyCode
} from '../../Utilities';
import { ISliderProps, ISlider } from './Slider.Props';
import { Label } from '../../Label';
import * as stylesImport from './Slider.scss';
const styles: any = stylesImport;

export interface ISliderState {
  value?: number;
  renderedValue?: number;
}

export enum ValuePosition {
  Previous = 0,
  Next = 1
}

export class Slider extends BaseComponent<ISliderProps, ISliderState> implements ISlider {
  public static defaultProps: {} = {
    step: 1,
    min: 0,
    max: 10,
    showValue: true,
    disabled: false,
    horizontal: true,
    buttonProps: {}
  };

  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement,
    sliderLine: HTMLElement,
    thumb: HTMLElement
  };

  private _id: string;

  constructor(props: ISliderProps) {
    super(props);

    this._warnMutuallyExclusive({
      'value': 'defaultValue'
    });

    this._id = getId('Slider');

    let value = props.value || props.defaultValue || props.min;

    this.state = {
      value: value,
      renderedValue: value
    };
  }

  /**
   * Invoked when a component is receiving new props. This method is not called for the initial render.
   */
  public componentWillReceiveProps(newProps: ISliderProps): void {

    if (newProps.value !== undefined) {
      let value = Math.max(newProps.min as number, Math.min(newProps.max as number, newProps.value));

      this.setState({
        value: value,
        renderedValue: value
      });
    }
  }

  public render(): React.ReactElement<{}> {
    const {
      ariaLabel,
      className,
      disabled,
      label,
      max,
      min,
      showValue,
      buttonProps,
      horizontal
    } = this.props;
    const { value, renderedValue } = this.state;
    const thumbOffsetPercent: number = (renderedValue! - min!) / (max! - min!) * 100;

    const onMouseDownProp: {} = disabled ? {} : { onMouseDown: this._onMouseDownOrTouchStart };
    const onTouchStartProp: {} = disabled ? {} : { onTouchStart: this._onMouseDownOrTouchStart };
    const onKeyDownProp: {} = disabled ? {} : { onKeyDown: this._onKeyDown };
    return (
      <div
        className={ css('ms-Slider', styles.root, className, {
          ['ms-Slider-enabled ' + styles.rootIsEnabled]: !disabled,
          ['ms-Slider-disabled ' + styles.rootIsDisabled]: disabled,
          ['ms-Slider-row ' + styles.row]: horizontal,
          ['ms-Slider-column ' + styles.column]: !horizontal
        }) }
        ref='root'>
        { label && (
          <Label className={ styles.titleLabel } { ...ariaLabel ? {} : { 'htmlFor': this._id } }>
            { label }
          </Label>
        ) }
        <div className={ css('ms-Slider-container', styles.container) }>
          <button
            aria-valuenow={ value }
            aria-valuemin={ min }
            aria-valuemax={ max }
            { ...onMouseDownProp }
            { ...onTouchStartProp }
            { ...onKeyDownProp }
            { ...buttonProps }
            className={ css('ms-Slider-slideBox', styles.slideBox, buttonProps!.className, {
              'ms-Slider-showValue': !!showValue,
              ['ms-Slider-showTransitions ' + styles.showTransitions]: (renderedValue === value)
            }) }
            id={ this._id }
            disabled={ disabled }
            type='button'
            role='slider'
          >
            <div
              ref='sliderLine'
              className={ css('ms-Slider-line', styles.line) }
            >
              <span
                ref='thumb'
                className={ css('ms-Slider-thumb', styles.thumb) }
                { ...ariaLabel ? { 'aria-label': ariaLabel } : {} }
                style={ this._getThumbStyle(horizontal, thumbOffsetPercent) }
              />
              <span className={ css('ms-Slider-active', styles.activeSection) } style={ horizontal ? { 'width': thumbOffsetPercent + '%' } : { 'height': (thumbOffsetPercent) + '%' } }></span>
              <span className={ css('ms-Slider-inactive', styles.inactiveSection) } style={ horizontal ? { 'width': (100 - thumbOffsetPercent) + '%' } : { 'height': (100 - thumbOffsetPercent) + '%' } }></span>
            </div>
          </button>
          { showValue && <Label className={ css('ms-Slider-value', styles.valueLabel) }>{ value }</Label> }
        </div>
      </div>
    ) as React.ReactElement<{}>;
  }
  public focus(): void {
    if (this.refs.thumb) {
      this.refs.thumb.focus();
    }
  }

  public get value(): number | undefined {
    return this.state.value;
  }


  private _getThumbStyle(horizontal: boolean | undefined, thumbOffsetPercent: number): any {
    var thumbStyle: string;
    if (horizontal) {
      return getRTL() ? { 'right': thumbOffsetPercent + '%' } : { 'left': thumbOffsetPercent + '%' };
    } else {
      return getRTL() ? { 'bottom': thumbOffsetPercent + '%' } : { 'top': thumbOffsetPercent + '%' };
    }

  }

  @autobind
  private _onMouseDownOrTouchStart(event: MouseEvent | TouchEvent): void {
    if (event.type === 'mousedown') {
      this._events.on(window, 'mousemove', this._onMouseMoveOrTouchMove, true);
      this._events.on(window, 'mouseup', this._onMouseUpOrTouchEnd, true);
    } else if (event.type === 'touchstart') {
      this._events.on(window, 'touchmove', this._onMouseMoveOrTouchMove, true);
      this._events.on(window, 'touchend', this._onMouseUpOrTouchEnd, true);
    }

    this._onMouseMoveOrTouchMove(event, true);
  }

  @autobind
  private _onMouseMoveOrTouchMove(event: MouseEvent | TouchEvent, suppressEventCancelation?: boolean): void {
    const { max, min, step } = this.props;
    const steps: number = (max! - min!) / step!;
    const sliderPositionRect: ClientRect = this.refs.sliderLine.getBoundingClientRect();
    const sliderLength: number = this.props.horizontal ? sliderPositionRect.width : sliderPositionRect.height;
    const stepLength: number = sliderLength / steps;
    let currentSteps: number | undefined;
    if (this.props.horizontal) {
      if (event.type === 'mousedown' || event.type === 'mousemove') {
        currentSteps = getRTL() ?
          (sliderPositionRect.right - (event as MouseEvent).clientX) / stepLength :
          ((event as MouseEvent).clientX - sliderPositionRect.left) / stepLength;
      } else if (event.type === 'touchstart' || event.type === 'touchmove') {
        currentSteps = getRTL() ?
          (sliderPositionRect.right - (event as TouchEvent).touches[0].clientX) / stepLength :
          ((event as TouchEvent).touches[0].clientX - sliderPositionRect.left) / stepLength;
      }
    } else {
      if (event.type === 'mousedown' || event.type === 'mousemove') {
        currentSteps = getRTL() ?
          ((event as MouseEvent).clientY - sliderPositionRect.top) / stepLength :
          (sliderPositionRect.bottom - (event as MouseEvent).clientY) / stepLength;
      } else if (event.type === 'touchstart' || event.type === 'touchmove') {
        currentSteps = getRTL() ?
          ((event as TouchEvent).touches[0].clientY - sliderPositionRect.top) / stepLength :
          (sliderPositionRect.bottom - (event as TouchEvent).touches[0].clientY) / stepLength;
      }
    }


    let currentValue: number | undefined;
    let renderedValue: number | undefined;

    // The value shouldn't be bigger than max or be smaller than min.
    if (currentSteps! > Math.floor(steps)) {
      this.props.horizontal ? renderedValue = currentValue = max as number : renderedValue = currentValue = min as number;
    } else if (currentSteps! < 0) {
      this.props.horizontal ? renderedValue = currentValue = min as number : renderedValue = currentValue = max as number;
    } else {
      if (this.props.horizontal) {
        renderedValue = min! + step! * currentSteps!;
        currentValue = min! + step! * Math.round(currentSteps!);
      } else {
        renderedValue = max! - step! * currentSteps!;
        currentValue = max! - step! * Math.round(currentSteps!);
      }

    }

    this._updateValue(currentValue, renderedValue);

    if (!suppressEventCancelation) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private _updateValue(value: number, renderedValue: number) {
    let valueChanged = value !== this.state.value;

    this.setState({
      value,
      renderedValue
    }, () => {
      if (valueChanged && this.props.onChange) {
        this.props.onChange(this.state.value as number);
      }
    });
  }

  @autobind
  private _onMouseUpOrTouchEnd(): void {

    // Synchronize the renderedValue to the actual value.
    this.setState({
      renderedValue: this.state.value
    });

    this._events.off();
  }

  @autobind
  private _onKeyDown(event: KeyboardEvent): void {
    let value: number | undefined = this.state.value;
    const { max, min, step } = this.props;

    let diff: number | undefined = 0;

    switch (event.which) {
      case getRTLSafeKeyCode(KeyCodes.left):
      case KeyCodes.down:
        diff = this.props.horizontal ? -(step as number) : +(step as number);
        break;
      case getRTLSafeKeyCode(KeyCodes.right):
      case KeyCodes.up:
        diff = this.props.horizontal ? step : -(step as number);
        break;

      case KeyCodes.home:
        value = min;
        break;

      case KeyCodes.end:
        value = max;
        break;

      default:
        return;
    }

    const newValue: number = Math.min(max as number, Math.max(min as number, value! + diff!));

    this._updateValue(newValue, newValue);

    event.preventDefault();
    event.stopPropagation();
  }

}