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
import { getRelativePositions, IPositionInfo, IPositionProps, getMaxHeight } from '../../utilities/positioning';
import { IRectangle } from '../../common/IRectangle';
import { focusFirstChild } from '../../utilities/focus';
import { assign } from '../../Utilities';
import { Popup } from '../../Popup';
import { BaseComponent } from '../../common/BaseComponent';
import './Callout.scss';

const BEAK_ORIGIN_POSITION = { top: 0, left: 0 };
const OFF_SCREEN_STYLE = { opacity: 0 };
const BORDER_WIDTH: number = 1;
const SPACE_FROM_EDGE: number = 8;
export interface ICalloutState {
  positions?: IPositionInfo;
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
      this._maxHeight = undefined;
      this._setTargetWindowAndElement(newTarget);
    }
    if (newProps.gapSpace !== this.props.gapSpace || this.props.beakWidth !== newProps.beakWidth) {
      this._maxHeight = undefined;
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
      top: positions && positions.beakPosition ? positions.beakPosition.top : BEAK_ORIGIN_POSITION.top,
      left: positions && positions.beakPosition ? positions.beakPosition.left : BEAK_ORIGIN_POSITION.left,
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
          style={ positions ? positions.calloutPosition : OFF_SCREEN_STYLE }
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
      let newPositions: IPositionInfo = getRelativePositions(currentProps, hostElement, calloutElement);

      // Set the new position only when the positions are not exists or one of the new callout positions are different.
      // The position should not change if the position is within 2 decimal places.
      if ((!positions && newPositions) ||
        (positions && newPositions && !this._arePositionsEqual(positions, newPositions)
          && this._positionAttempts < 5)) {
        // We should not reposition the callout more than a few times, if it is then the content is likely resizing
        // and we should stop trying to reposition to prevent a stack overflow.
        this._positionAttempts++;
        this.setState({
          positions: newPositions
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
      if (this.props.isEdgeFixed && this._target) {
        let beakWidth = this.props.isBeakVisible ? this.props.beakWidth : 0;
        let gapSpace = this.props.gapSpace ? this.props.gapSpace : 0;
        this._maxHeight = getMaxHeight(this._target, this.props.directionalHint, beakWidth + gapSpace, this._getBounds());
      } else {
        this._maxHeight = this._getBounds().height - BORDER_WIDTH * 2;
      }
    }
    return this._maxHeight;
  }

  private _arePositionsEqual(positions: IPositionInfo, newPosition: IPositionInfo) {
    if (positions.calloutPosition.top.toFixed(2) !== newPosition.calloutPosition.top.toFixed(2)) {
      return false;
    }
    if (positions.calloutPosition.left.toFixed(2) !== newPosition.calloutPosition.left.toFixed(2)) {
      return false;
    }
    if (positions.beakPosition.top.toFixed(2) !== newPosition.beakPosition.top.toFixed(2)) {
      return false;
    }
    if (positions.beakPosition.top.toFixed(2) !== newPosition.beakPosition.top.toFixed(2)) {
      return false;
    }

    return true;

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
