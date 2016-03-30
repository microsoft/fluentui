import * as React from 'react';
import { css } from '../../utilities/css';
import './Panel.scss';
import Overlay from '../Overlay/Overlay';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';
import { getRTL } from '../../utilities/rtl';

export interface IPanelProps extends React.Props<Panel> {
  isOpen?: boolean;
  onDismiss?: () => {};
}

export interface IPanelState {
  isOpen?: boolean;
  isAnimatingOpen?: boolean;
  isAnimatingClose?: boolean;
}

export default class Panel extends React.Component<IPanelProps, IPanelState> {
  public refs: {
    [ key: string ]: React.ReactInstance;
    panelMain: HTMLElement
  };

  private _events: EventGroup;

  constructor(props: IPanelProps) {
    super(props);

    this._onPanelClick = this._onPanelClick.bind(this);

    this.state = {
      isOpen: !!props.isOpen,
      isAnimatingOpen: false,
      isAnimatingClose: false
    };

    this._events = new EventGroup(this);
  }

  public componentDidMount() {
    this._events.on(this.refs.panelMain, 'animationend', this._onAnimationEnd);

    if (this.state.isOpen) {
      setTimeout(() => {
      this.setState({
        isAnimatingOpen: true
      });
      }, 2000);
    }
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public componentWillReceiveProps(newProps: IPanelProps) {
    if (newProps.isOpen !== this.state.isOpen) {
      this.setState({
        isOpen: true,
        isAnimatingOpen: newProps.isOpen ? true : false,
        isAnimatingClose: newProps.isOpen ? false : true
      });
    }
  }

  public render() {
    let { children } = this.props;
    let { isOpen, isAnimatingOpen, isAnimatingClose } = this.state;
    let isRTL = getRTL();

    return (
      <div ref='panelMain' className={ css('ms-Panel', {
        'ms-Panel--left': !isRTL,
        'ms-Panel--right': isRTL,
        'is-open': isOpen,
        'ms-Panel-animateIn': isAnimatingOpen,
        'ms-Panel-animateOut': isAnimatingClose
      }) }
        onClick={ this._onPanelClick }
      >
        <Overlay isDarkThemed={ true } />
        <div className='ms-Panel-main'>
          { children }
        </div>
      </div>
    );
  }

  public dismiss() {
    if (this.state.isOpen) {
      this.setState({
        isAnimatingClose: true
      });
    }
  }

  private _onPanelClick() {
    this.dismiss();
  }

  private _onAnimationEnd(ev: AnimationEvent) {
    if (ev.animationName.indexOf('In') > -1) {
      this.setState({
        isOpen: true,
        isAnimatingOpen: false
      });
    }
    if (ev.animationName.indexOf('Out') > -1) {
      this.setState({
        isOpen: false,
        isAnimatingClose: false
      });

      if (this.props.onDismiss) {
        this.props.onDismiss();
      }
    }
  }
}
