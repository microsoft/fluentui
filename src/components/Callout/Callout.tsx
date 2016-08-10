import * as React from 'react';
import { ICalloutProps } from './Callout.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import { Layer } from '../../Layer';
import { css } from '../../utilities/css';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';
import { getRelativePositions, IPositionInfo } from '../../utilities/positioning';
import './Callout.scss';

const BEAK_ORIGIN_POSITION = { top: 0, left: 0 };
const OFF_SCREEN_POSITION = { top: -9999, left: 0 };

export interface ICalloutState {
  positions?: any;
  slideDirectionalClassName?: string;
  calloutElementRect?: ClientRect;
}

export class Callout extends React.Component<ICalloutProps, ICalloutState> {
  public static defaultProps = {
    isBeakVisible: true,
    beakStyle: 'ms-Callout-beak',
    beakWidth: 28,
    gapSpace: 16,
    directionalHint: DirectionalHint.rightCenter
  };

  private _hostElement: HTMLDivElement;
  private _calloutElement: HTMLDivElement;
  private _events: EventGroup;
  // There are some cases when the callout needs to be rendered on a window other than the one
  // the javascript is running in.
  private _targetWindow: Window;

  constructor(props: ICalloutProps) {
    super(props);
    this._targetWindow = props.targetElement ? props.targetElement.ownerDocument.defaultView : window;
    this.state = {
      positions: null,
      slideDirectionalClassName: null,
      calloutElementRect: null,
    };

    this._events = new EventGroup(this);

    this._onLayerDidMount = this._onLayerDidMount.bind(this);
  }

  public componentDidUpdate() {
    this._updatePosition();
  }

  public componentDidMount() {
    if (this.props.doNotLayer) {
      this._onLayerDidMount();
    }
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public render() {
    let { className, targetElement, isBeakVisible, beakStyle, children } = this.props;
    let { positions, slideDirectionalClassName } = this.state;
    let content = (
      <div ref={ (host: HTMLDivElement) => this._hostElement = host } className={ 'ms-Callout-container' }>
        <div
          className={ css('ms-Callout', className, slideDirectionalClassName ? `ms-u-${ slideDirectionalClassName }` : '') }
          style={ ((positions) ? positions.callout : OFF_SCREEN_POSITION) }
          ref={ (callout: HTMLDivElement) => this._calloutElement = callout }
          >
          { isBeakVisible && targetElement ? (<div className={ beakStyle }  style={ ((positions) ? positions.beak : BEAK_ORIGIN_POSITION) } />) : (null) }
          <div className='ms-Callout-main'>
            { children }
          </div>
        </div>
      </div>
    );
    return this.props.doNotLayer ? content : (
      <Layer onLayerMounted={ this._onLayerDidMount } hostWindow = { this._targetWindow }>
        { content }
      </Layer>
    );
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

    if (ev.target !== this._targetWindow &&
      this._hostElement &&
      !this._hostElement.contains(target) &&
      (!targetElement || !targetElement.contains(target))) {
      this.dismiss();
    }
  }

  private _onLayerDidMount() {
    // This is added so the callout will dismiss when the window is scrolled
    // but not when something inside the callout is scrolled.
    this._events.on(this._targetWindow, 'scroll', this._dismissOnLostFocus, true);
    this._events.on(this._targetWindow, 'resize', this.dismiss, true);
    this._events.on(this._targetWindow, 'focus', this._dismissOnLostFocus, true);
    this._events.on(this._targetWindow, 'click', this._dismissOnLostFocus, true);
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
      let positionInfo: IPositionInfo = getRelativePositions(this.props, hostElement, calloutElement, this._targetWindow);

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
