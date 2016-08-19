/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { BaseComponent } from '../../common/BaseComponent';
import { IPanelProps, PanelType } from './Panel.Props';
import { Layer } from '../Layer/Layer';
import { Overlay } from '../../Overlay';
import { Popup } from '../Popup/index';
import { css } from '../../utilities/css';
import { getId } from '../../utilities/object';
import { getRTL } from '../../utilities/rtl';
import './Panel.scss';

export interface IPanelState {
  isOpen?: boolean;
  isAnimatingOpen?: boolean;
  isAnimatingClose?: boolean;
  id?: string;
}

export class Panel extends BaseComponent<IPanelProps, IPanelState> {

  public static defaultProps: IPanelProps = {
    isOpen: false,
    hasCloseButton: true,
    type: PanelType.smallFixedFar,
  };

  constructor(props: IPanelProps) {
    super(props);

    this._onPanelClick = this._onPanelClick.bind(this);
    this._onPanelRef = this._onPanelRef.bind(this);

    this.state = {
      isOpen: !!props.isOpen,
      isAnimatingOpen: props.isOpen,
      isAnimatingClose: false,
      id: getId('Panel')
    };
  }

  public componentDidMount() {
    if (this.state.isOpen) {
      this._async.setTimeout(() => {
        this.setState({
          isAnimatingOpen: false
        });
      }, 2000);
    }
  }

  public componentWillReceiveProps(newProps: IPanelProps) {
    if (newProps.isOpen !== this.state.isOpen) {
      this.setState({
        isOpen: newProps.isOpen,
        isAnimatingOpen: newProps.isOpen ? true : false,
        isAnimatingClose: newProps.isOpen ? false : true
      });
    }
  }

  public render() {
    let { children, className = '', type, hasCloseButton, isLightDismiss, headerText, closeButtonAriaLabel, headerClassName = ''  } = this.props;
    let { isOpen, isAnimatingOpen, isAnimatingClose, id } = this.state;
    let isLeft = type === PanelType.smallFixedNear ? true : false;
    let isRTL = getRTL();
    let isOnRightSide = isRTL ? isLeft : !isLeft;
    const headerTextId = id + '-headerText';

    let pendingCommandBarContent = '';

    let header;
    if (headerText) {
      header = <p className={ css('ms-Panel-headerText', headerClassName ) } id={ headerTextId }>{ headerText }</p>;
    }

    let closeButton;
    if (hasCloseButton) {
      closeButton = <button className='ms-Panel-closeButton ms-PanelAction-close' onClick={ this._onPanelClick }  aria-label={ closeButtonAriaLabel } data-is-visible={ true }>
        <i className='ms-Panel-closeIcon ms-Icon ms-Icon--Cancel'></i>
      </button>;
    }

    return (
      <Layer>
        <Popup
          role='dialog'
          ariaLabelledBy={ headerText ? headerTextId : undefined }
          onDismiss={ this.props.onDismiss }>
          <div
            ref={ this._onPanelRef }
            className={
              css('ms-Panel', className, {
                'ms-Panel--openLeft': !isOnRightSide,  // because the RTL animations are not being used, we need to set a class
                'ms-Panel--openRight': isOnRightSide,  // because the RTL animations are not being used, we need to set a class
                'is-open': isOpen,
                'ms-Panel-animateIn': isAnimatingOpen,
                'ms-Panel-animateOut': isAnimatingClose,
                'ms-Panel--smFluid': type === PanelType.smallFluid,
                'ms-Panel--smLeft': type === PanelType.smallFixedNear,
                'ms-Panel--sm': type === PanelType.smallFixedFar,
                'ms-Panel--md': type === PanelType.medium,
                'ms-Panel--lg': type === PanelType.large || type === PanelType.largeFixed,
                'ms-Panel--fixed': type === PanelType.largeFixed,
                'ms-Panel--xl': type === PanelType.extraLarge,
              })
            }
            >
            <Overlay
              isDarkThemed={ false }
              onClick={ isLightDismiss ? this._onPanelClick : null }
              />
            <div className='ms-Panel-main'>
              <div className='ms-Panel-commands' data-is-visible={ true } >
                { pendingCommandBarContent }
                { closeButton }
              </div>
              <div className='ms-Panel-contentInner'>
                { header }
                <div className='ms-Panel-content'>
                  { children }
                </div>
              </div>
            </div>
          </div>
        </Popup>
      </Layer>

    );
  }

  public dismiss() {
    if (this.state.isOpen) {
      this.setState({
        isAnimatingOpen: false,
        isAnimatingClose: true
      });
    }
  }

  private _onPanelClick() {
    this.dismiss();
  }

  private _onPanelRef(ref: HTMLDivElement) {
    if (ref) {
      this._events.on(ref, 'animationend', this._onAnimationEnd);
    } else {
      this._events.off();
    }
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
