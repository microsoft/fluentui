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
    vertical: false,
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
      vertical
    } = this.props;
    const { value, renderedValue } = this.state;
    const thumbOffsetPercent: number = (renderedValue! - min!) / (max! - min!) * 100;
    const lengthString = vertical ? 'height' : 'width';
    const onMouseDownProp: {} = disabled ? {} : { onMouseDown: this._onMouseDownOrTouchStart };
    const onTouchStartProp: {} = disabled ? {} : { onTouchStart: this._onMouseDownOrTouchStart };
    const onKeyDownProp: {} = disabled ? {} : { onKeyDown: this._onKeyDown };

    return (
      <div
        className={ css('ms-Slider', styles.root, className, {
          ['ms-Slider-enabled ' + styles.rootIsEnabled]: !disabled,
          ['ms-Slider-disabled ' + styles.rootIsDisabled]: disabled,
          ['ms-Slider-row ' + styles.rootIsHorizontal]: !vertical,
          ['ms-Slider-column ' + styles.rootIsVertical]: vertical
        }) }
        ref='root'
      >
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
            className={ css(
              'ms-Slider-slideBox',
              styles.slideBox,
              buttonProps!.className,
              !!showValue && 'ms-Slider-showValue',
              (renderedValue === value) && ('ms-Slider-showTransitions ' + styles.showTransitions)
            ) }
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
                style={ this._getThumbStyle(vertical, thumbOffsetPercent) }
              />
              <span
                className={ css('ms-Slider-active', styles.lineContainer, styles.activeSection) }
                style={ { [lengthString]: thumbOffsetPercent + '%' } }
              />
              <span
                className={ css('ms-Slider-inactive', styles.lineContainer, styles.inactiveSection) }
                style={ { [lengthString]: (100 - thumbOffsetPercent) + '%' } }
              />
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

  private _getThumbStyle(vertical: boolean | undefined, thumbOffsetPercent: number): any {
    let direction: string = vertical ? 'bottom' : (getRTL() ? 'right' : 'left');
    return {
      [direction]: thumbOffsetPercent + '%'
    };
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
    const sliderLength: number = !this.props.vertical ? sliderPositionRect.width : sliderPositionRect.height;
    const stepLength: number = sliderLength / steps;
    let currentSteps: number | undefined;
    let distance: number | undefined;

    if (!this.props.vertical) {
      let left: number | undefined = this._getPosition(event, this.props.vertical);
      distance = getRTL() ? sliderPositionRect.right - left! : left! - sliderPositionRect.left;
      currentSteps = distance / stepLength;
    } else {
      let bottom: number | undefined = this._getPosition(event, this.props.vertical);
      distance = sliderPositionRect.bottom - bottom!;
      currentSteps = distance / stepLength;
    }

    let currentValue: number | undefined;
    let renderedValue: number | undefined;

    // The value shouldn't be bigger than max or be smaller than min.
    if (currentSteps! > Math.floor(steps)) {
      renderedValue = currentValue = max as number;
    } else if (currentSteps! < 0) {
      renderedValue = currentValue = min as number;
    } else {
      renderedValue = min! + step! * currentSteps!;
      currentValue = min! + step! * Math.round(currentSteps!);
    }

    this._updateValue(currentValue, renderedValue);

    if (!suppressEventCancelation) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private _getPosition(event: MouseEvent | TouchEvent, vertical: boolean | undefined): number | undefined {
    let currentPosition: number | undefined;
    switch (event.type) {
      case 'mousedown':
      case 'mousemove':
        currentPosition = !vertical ? (event as MouseEvent).clientX : (event as MouseEvent).clientY;
        break;
      case 'touchstart':
      case 'touchmove':
        currentPosition = !vertical ? (event as TouchEvent).touches[0].clientX : (event as TouchEvent).touches[0].clientY;
        break;
    }
    return currentPosition;
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
        diff = -(step as number);
        break;
      case getRTLSafeKeyCode(KeyCodes.right):
      case KeyCodes.up:
        diff = step;
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
