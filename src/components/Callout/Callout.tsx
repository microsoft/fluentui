import * as React from 'react';
import './Callout.scss';
import { Layer } from '../../components/index';
import { ICalloutProps, DirectionalHint } from './Callout.Props';
import { css } from '../../utilities/css';
import { CalloutPosition, IPositionInfo } from './CalloutPosition';
import EventGroup from '../../utilities/eventGroup/EventGroup';

const BEAK_ORIGIN_POSITION = { top: 0, left: 0 };
const OFF_SCREEN_POSITION = { top: 0, left: -9999 };

export interface ICalloutState {
  positions?: any;
  slideDirectionalClassName?: string;
  calloutElementRect?: ClientRect;
}

export default class Callout extends React.Component<ICalloutProps, ICalloutState> {

  public static defaultProps = {
    isBeakVisible: true,
    beakStyle: 'ms-Callout-beak',
    beakWidth: 28,
    gapSpace: 0,
    directionalHint: DirectionalHint.rightCenter
  };

  private _hostElement: HTMLDivElement;
  private _calloutElement: HTMLDivElement;
  private _calloutPosition: CalloutPosition;
  private _events: EventGroup;

  constructor(props: ICalloutProps) {
    super(props);

    this.state = {
      positions: null,
      slideDirectionalClassName: null,
      calloutElementRect: null
    };

    this._calloutPosition = new CalloutPosition();
    this._events = new EventGroup(this);

    this._updatePosition = this._updatePosition.bind(this);
  }

  public componentDidUpdate() {
    this._updatePosition();
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public render() {
    let { className, targetElement, isBeakVisible, beakStyle, children } = this.props;
    let { positions, slideDirectionalClassName } = this.state;

    return (
      <Layer onLayerMounted={ this._updatePosition }>
        <div ref={ (host: HTMLDivElement) => this._hostElement = host } className={ css('ms-Callout-container', className) }>
          <div
            className= { 'ms-Callout' + ((slideDirectionalClassName) ? (` ms-u-${slideDirectionalClassName}`) : '') }
            style={ ((positions) ? positions.callout : OFF_SCREEN_POSITION) }
            >
            { isBeakVisible && targetElement ? (<div className={ beakStyle }  style={ ((positions) ? positions.beak : BEAK_ORIGIN_POSITION) } />) : (null) }
            <div className='ms-Callout-main' ref={ (callout: HTMLDivElement) => this._calloutElement = callout }>
                { children }
            </div>
          </div>
        </div>
      </Layer>
    );
  }

  private _updatePosition() {
    let { positions } = this.state;
    let hostElement: HTMLElement = this._hostElement;
    let calloutElement: HTMLElement = this._calloutElement;

    if (hostElement && calloutElement) {
      let positionInfo: IPositionInfo = this._calloutPosition.getRelativePositions(this.props, hostElement, calloutElement);

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
