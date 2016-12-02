/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { ICalloutProps } from './Callout.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import {
  autobind,
  css,
  elementContains,
  getWindow,
  getDocument
} from '../../Utilities';
import { getRelativePositions, IPositionInfo, IPositionProps } from '../../utilities/positioning';
import { IRectangle } from '../../common/IRectangle';
import { focusFirstChild } from '../../utilities/focus';
import { assign } from '../../Utilities';
import { Popup } from '../../Popup';
import { BaseComponent } from '../../common/BaseComponent';
import './Callout.scss';

const BEAK_ORIGIN_POSITION = { top: 0, left: 0 };
const OFF_SCREEN_POSITION = { top: -9999, left: 0 };
const BORDER_WIDTH: number = 1;
const SPACE_FROM_EDGE: number = 8;
export interface ICalloutState {
  positions?: any;
  slideDirectionalClassName?: string;
  calloutElementRect?: ClientRect;
}

export class CalloutContent extends BaseComponent<ICalloutProps, ICalloutState> {

  public static defaultProps = {
    isBeakVisible: true,
    beakWidth: 16,
    gapSpace: 16,
    directionalHint: DirectionalHint.bottomAutoEdge
  };

  private _didSetInitialFocus: boolean;
  private _hostElement: HTMLDivElement;
  private _calloutElement: HTMLDivElement;
  private _targetWindow: Window;
  private _bounds: IRectangle;
  private _maxHeight: number;
  private _positionAttempts: number;
  private _target: HTMLElement | MouseEvent;

  constructor(props: ICalloutProps) {
    super(props, { 'beakStyle': 'beakWidth' });

    this._didSetInitialFocus = false;
    this.state = {
      positions: null,
      slideDirectionalClassName: null,
      calloutElementRect: null
    };
    this._positionAttempts = 0;
  }

  public componentDidUpdate() {
    this._setInitialFocus();
    this._updatePosition();
  }

  public componentWillMount() {
    let target = this.props.targetElement ? this.props.targetElement : this.props.target;
    this._setTargetWindowAndElement(target);
  }

  public componentWillUpdate(newProps: ICalloutProps) {
    if (newProps.targetElement !== this.props.targetElement || newProps.target !== this.props.target) {
      let newTarget = newProps.targetElement ? newProps.targetElement : newProps.target;
      this._setTargetWindowAndElement(newTarget);
    }
  }
  public componentDidMount() {
    this._onComponentDidMount();
  }

  public render() {
    // If there is no target window then we are likely in server side rendering and we should not render anything.
    if (!this._targetWindow) {
      return null;
    }
    let {
      className,
      target,
      targetElement,
      isBeakVisible,
      beakStyle,
      children,
      beakWidth } = this.props;
    let { positions, slideDirectionalClassName } = this.state;
    let beakStyleWidth = beakWidth;

    // This is here to support the old way of setting the beak size until version 1.0.0.
    // beakStyle is now deprecated and will be be removed at version 1.0.0
    if (beakStyle === 'ms-Callout-smallbeak') {
      beakStyleWidth = 16;
    }

    let beakReactStyle: React.CSSProperties = {
      top: positions && positions.beak ? positions.beak.top : BEAK_ORIGIN_POSITION.top,
      left: positions && positions.beak ? positions.beak.left : BEAK_ORIGIN_POSITION.left,
      height: beakStyleWidth,
      width: beakStyleWidth
    };

    let contentMaxHeight: number = this._getMaxHeight();
    let beakVisible: boolean = isBeakVisible && (!!targetElement || !!target);
    let content = (
      <div ref={ this._resolveRef('_hostElement') } className={ 'ms-Callout-container' }>
        <div
          className={
            css(
              'ms-Callout',
              className,
              slideDirectionalClassName ? `ms-u-${slideDirectionalClassName}` : ''
            ) }
          style={ positions ? positions.callout : OFF_SCREEN_POSITION }
          ref={ this._resolveRef('_calloutElement') }
          >

          { beakVisible ? (
            <div
              className={ 'ms-Callout-beak' }
              style={ beakReactStyle }
              />) : (null) }

          { beakVisible ?
            (<div className='ms-Callout-beakCurtain' />) :
            (null) }
          <Popup
            className='ms-Callout-main'
            onDismiss={ this.dismiss }
            shouldRestoreFocus={ true }
            style={ { maxHeight: contentMaxHeight } }>
            { children }
          </Popup>
        </div>
      </div>
    );
    return content;
  }

  @autobind
  public dismiss(ev?: Event | React.MouseEvent<HTMLElement>) {
    let { onDismiss } = this.props;

    if (onDismiss) {
      onDismiss(ev);
    }
  }

  protected _dismissOnScroll(ev: Event) {
    if (this.state.positions) {
      this._dismissOnLostFocus(ev);
    }
  }

  protected _dismissOnLostFocus(ev: Event) {
    let target = ev.target as HTMLElement;
    let clickedOutsideCallout = this._hostElement && !elementContains(this._hostElement, target);

    if (
      (!this._target && clickedOutsideCallout) ||
      ev.target !== this._targetWindow &&
      clickedOutsideCallout &&
      ((this._target as MouseEvent).stopPropagation ||
        (!this._target || (target !== this._target && !elementContains(this._target as HTMLElement, target))))) {
      this.dismiss(ev);
    }
  }

  @autobind
  protected _setInitialFocus() {
    if (this.props.setInitialFocus && !this._didSetInitialFocus && this.state.positions) {
      this._didSetInitialFocus = true;
      focusFirstChild(this._calloutElement);
    }
  }

  @autobind
  protected _onComponentDidMount() {
    // This is added so the callout will dismiss when the window is scrolled
    // but not when something inside the callout is scrolled. The delay seems
    // to be required to avoid React firing an async focus event in IE from
    // the target changing focus quickly prior to rendering the callout.
    this._async.setTimeout(() => {
      this._events.on(this._targetWindow, 'scroll', this._dismissOnScroll, true);
      this._events.on(this._targetWindow, 'resize', this.dismiss, true);
      this._events.on(this._targetWindow, 'focus', this._dismissOnLostFocus, true);
      this._events.on(this._targetWindow, 'click', this._dismissOnLostFocus, true);
    }, 0);

    if (this.props.onLayerMounted) {
      this.props.onLayerMounted();
    }

    this._updatePosition();
  }

  private _updatePosition() {
    let { positions } = this.state;
    let hostElement: HTMLElement = this._hostElement;
    let calloutElement: HTMLElement = this._calloutElement;

    if (hostElement && calloutElement) {
      let currentProps: IPositionProps;
      currentProps = assign(currentProps, this.props);
      currentProps.bounds = this._getBounds();
      // Temporary to be removed when targetElement is removed. Currently deprecated.
      if (this.props.targetElement) {
        currentProps.targetElement = this._target as HTMLElement;
      } else {
        currentProps.target = this._target;
      }
      let positionInfo: IPositionInfo = getRelativePositions(currentProps, hostElement, calloutElement);

      // Set the new position only when the positions are not exists or one of the new callout positions are different.
      // The position should not change if the position is within 2 decimal places.
      if ((!positions && positionInfo) ||
        (positions && positionInfo &&
          (positions.callout.top.toFixed(2) !== positionInfo.calloutPosition.top.toFixed(2) ||
            positions.callout.left.toFixed(2) !== positionInfo.calloutPosition.left.toFixed(2))
          && this._positionAttempts < 5)) {
        // We should not reposition the callout more than a few times, if it is then the content is likely resizing
        // and we should stop trying to reposition to prevent a stack overflow.
        this._positionAttempts++;
        this.setState({
          positions: {
            callout: positionInfo.calloutPosition,
            beak: positionInfo.beakPosition,
          },
          slideDirectionalClassName: positionInfo.directionalClassName
        });
      } else {
        this._positionAttempts = 0;
        if (this.props.onPositioned) {
          this.props.onPositioned();
        }
      }
    }
  }

  private _getBounds(): IRectangle {
    if (!this._bounds) {
      let currentBounds = this.props.bounds;

      if (!currentBounds) {
        currentBounds = {
          top: 0 + SPACE_FROM_EDGE,
          left: 0 + SPACE_FROM_EDGE,
          right: this._targetWindow.innerWidth - SPACE_FROM_EDGE,
          bottom: this._targetWindow.innerHeight - SPACE_FROM_EDGE,
          width: this._targetWindow.innerWidth - SPACE_FROM_EDGE * 2,
          height: this._targetWindow.innerHeight - SPACE_FROM_EDGE * 2
        };
      }
      this._bounds = currentBounds;
    }
    return this._bounds;
  }

  private _getMaxHeight(): number {
    if (!this._maxHeight) {
      this._maxHeight = this._getBounds().height - BORDER_WIDTH * 2;
    }
    return this._maxHeight;
  }

  private _setTargetWindowAndElement(target: HTMLElement | string | MouseEvent): void {
    if (target) {
      if (typeof target === 'string') {
        let currentDoc: Document = getDocument();
        this._target = currentDoc ? currentDoc.querySelector(target) as HTMLElement : null;
        this._targetWindow = getWindow();
      } else if ((target as MouseEvent).stopPropagation) {
        this._target = target;
        this._targetWindow = getWindow((target as MouseEvent).toElement as HTMLElement);
      } else {
        let targetElement: HTMLElement = target as HTMLElement;
        this._target = target;
        this._targetWindow = getWindow(targetElement);
      }
    } else {
      this._targetWindow = getWindow();
    }
  }
}
