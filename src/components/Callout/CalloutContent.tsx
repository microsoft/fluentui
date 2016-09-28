/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { ICalloutProps } from './Callout.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import {
  autobind,
  css,
  getRTL,
  elementContains
} from '../../Utilities';
import { getRelativePositions, IPositionInfo } from '../../utilities/positioning';
import { focusFirstChild } from '../../utilities/focus';
import { Popup } from '../Popup/index';
import { BaseComponent } from '../../common/BaseComponent';
import './Callout.scss';

const BEAK_ORIGIN_POSITION = { top: 0, left: 0 };
const OFF_SCREEN_POSITION = { top: -9999, left: 0 };

export interface ICalloutState {
  positions?: any;
  slideDirectionalClassName?: string;
  calloutElementRect?: ClientRect;
}

export class CalloutContent extends BaseComponent<ICalloutProps, ICalloutState> {

  public static defaultProps = {
    isBeakVisible: true,
    beakStyle: 'ms-Callout-beak',
    beakWidth: 28,
    gapSpace: 0,
    directionalHint: getRTL() ? DirectionalHint.bottomRightEdge : DirectionalHint.bottomLeftEdge
  };

  private _didSetInitialFocus: boolean;
  private _hostElement: HTMLDivElement;
  private _calloutElement: HTMLDivElement;

  constructor(props: ICalloutProps) {
    super(props);

    this._didSetInitialFocus = false;
    this.state = {
      positions: null,
      slideDirectionalClassName: null,
      calloutElementRect: null
    };
  }

  public componentDidUpdate() {
    this._setInitialFocus();
    this._updatePosition();
  }

  public componentDidMount() {
    this._onComponentDidMount();
  }

  public render() {
    let { className, targetElement, isBeakVisible, beakStyle, children } = this.props;
    let { positions, slideDirectionalClassName } = this.state;
    let content = (
      <div ref={ this._resolveRef('_hostElement') } className={ 'ms-Callout-container' }>
        <div
          className={ css('ms-Callout', className, slideDirectionalClassName ? `ms-u-${ slideDirectionalClassName }` : '') }
          style={ ((positions) ? positions.callout : OFF_SCREEN_POSITION) }
          ref={ this._resolveRef('_calloutElement') }
          >
          { isBeakVisible && targetElement ? (<div className={ beakStyle }  style={ ((positions) ? positions.beak : BEAK_ORIGIN_POSITION) } />) : (null) }
          <div className='ms-Callout-beakCurtain' />
          <Popup
            className='ms-Callout-main'
            onDismiss={ (ev:any) => this.dismiss() }
            shouldRestoreFocus={ true }>
            { children }
          </Popup>
        </div>
      </div>
    );
    return content;
  }

  public dismiss() {
    let { onDismiss } = this.props;

    if (onDismiss) {
      onDismiss();
    }
  }

  private _dismissOnLostFocus(ev: Event) {
    let { targetElement } = this.props;
    let target = ev.target as HTMLElement;

    if (ev.target !== window &&
      this._hostElement &&
      !elementContains(this._hostElement, target) &&
      (!targetElement || !elementContains(targetElement, target))) {
      this.dismiss();
    }
  }

  @autobind
  private _setInitialFocus() {
    if (this.props.setInitialFocus && !this._didSetInitialFocus && this.state.positions) {
      this._didSetInitialFocus = true;
      focusFirstChild(this._calloutElement);
    }
  }

  @autobind
  private _onComponentDidMount() {
    // This is added so the callout will dismiss when the window is scrolled
    // but not when something inside the callout is scrolled.
    this._events.on(window, 'scroll', this._dismissOnLostFocus, true);
    this._events.on(window, 'resize', this.dismiss, true);
    this._events.on(window, 'focus', this._dismissOnLostFocus, true);
    this._events.on(window, 'click', this._dismissOnLostFocus, true);

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
      let positionInfo: IPositionInfo = getRelativePositions(this.props, hostElement, calloutElement);

      // Set the new position only when the positions are not exists or one of the new callout positions are different
      if ((!positions && positionInfo) ||
        (positions && positionInfo && (positions.callout.top !== positionInfo.calloutPosition.top || positions.callout.left !== positionInfo.calloutPosition.left))) {

        this.setState({
          positions: {
            callout: positionInfo.calloutPosition,
            beak: positionInfo.beakPosition,
          },
          slideDirectionalClassName: positionInfo.directionalClassName
        });
      }
    }
  }
}