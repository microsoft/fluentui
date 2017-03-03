/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
  BaseComponent,
  css,
  getId,
  getRTL
} from '../../Utilities';
import { FocusTrapZone } from '../FocusTrapZone/index';
import { IPanelProps, PanelType } from './Panel.Props';
import { Layer } from '../Layer/Layer';
import { Overlay } from '../../Overlay';
import { Popup } from '../../Popup';
import { IconButton } from '../../Button';
import styles from './Panel.scss';

export interface IPanelState {
  isOpen?: boolean;
  isAnimatingOpen?: boolean;
  isAnimatingClose?: boolean;
  id?: string;
}

// Animation class constants.
const FADE_IN_200 = 'ms-u-fadeIn200';
const FADE_OUT_200 = 'ms-u-fadeOut200';
const SLIDE_LEFT_IN_40 = 'ms-u-slideLeftIn40';
const SLIDE_LEFT_OUT_40 = 'ms-u-slideLeftOut40';
const SLIDE_RIGHT_IN_40 = 'ms-u-slideRightIn40';
const SLIDE_RIGHT_OUT_40 = 'ms-u-slideRightOut40';

export class Panel extends BaseComponent<IPanelProps, IPanelState> {

  public static defaultProps: IPanelProps = {
    isOpen: false,
    isBlocking: true,
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
        isOpen: true,
        isAnimatingOpen: newProps.isOpen ? true : false,
        isAnimatingClose: newProps.isOpen ? false : true
      });
    }
  }

  public render() {
    let {
      children,
      className = '',
      closeButtonAriaLabel,
      elementToFocusOnDismiss,
      firstFocusableSelector,
      forceFocusInsideTrap,
      hasCloseButton,
      headerClassName = '',
      headerText,
      ignoreExternalFocusing,
      isBlocking,
      isLightDismiss,
      layerProps,
      type
    } = this.props;
    let { isOpen, isAnimatingOpen, isAnimatingClose, id } = this.state;
    let isLeft = type === PanelType.smallFixedNear ? true : false;
    let isRTL = getRTL();
    let isOnRightSide = isRTL ? isLeft : !isLeft;
    const headerTextId = id + '-headerText';

    let pendingCommandBarContent = '';

    if (!isOpen) {
      return null;
    }

    let header;
    if (headerText) {
      header = <p className={ css('ms-Panel-headerText', styles.headerText, headerClassName) } id={ headerTextId }>{ headerText }</p>;
    }

    let closeButton;
    if (hasCloseButton) {
      closeButton = (
        <IconButton
          className={ css('ms-Panel-closeButton ms-PanelAction-close', styles.closeButton) }
          onClick={ this._onPanelClick }
          aria-label={ closeButtonAriaLabel }
          data-is-visible={ true } icon='Cancel'
        />
      );
    }

    let overlay;
    if (isBlocking) {
      overlay = (
        <Overlay
          className={ css(
            styles.overlay,
            {
              [FADE_IN_200]: isAnimatingOpen,
              [FADE_OUT_200]: isAnimatingClose
            }) }
          isDarkThemed={ false }
          onClick={ isLightDismiss ? this._onPanelClick : null }
        />
      );
    }

    return (
      <Layer { ...layerProps }>
        <Popup
          role='dialog'
          ariaLabelledBy={ headerText ? headerTextId : undefined }
          onDismiss={ this.props.onDismiss }>
          <div
            ref={ this._onPanelRef }
            className={
              css('ms-Panel', styles.root, className, {
                // because the RTL animations are not being used, we need to set a class
                ['is-open ' + styles.rootIsOpen]: isOpen,
                ['ms-Panel--smFluid ' + styles.rootIsSmallFluid]: type === PanelType.smallFluid,
                ['ms-Panel--smLeft ' + styles.rootIsSmallLeft]: type === PanelType.smallFixedNear,
                ['ms-Panel--sm ' + styles.rootIsSmall]: type === PanelType.smallFixedFar,
                ['ms-Panel--md ' + styles.rootIsMedium]: type === PanelType.medium,
                ['ms-Panel--lg ' + styles.rootIsLarge]: type === PanelType.large || type === PanelType.largeFixed,
                ['ms-Panel--fixed ' + styles.rootIsFixed]: type === PanelType.largeFixed,
                ['ms-Panel--xl ' + styles.rootIsXLarge]: type === PanelType.extraLarge,
                ['ms-Panel--hasCloseButton ' + styles.rootHasCloseButton]: hasCloseButton
              })
            }
          >
            { overlay }
            <FocusTrapZone
              className={ css(
                'ms-Panel-main',
                styles.main,
                {
                  [SLIDE_RIGHT_IN_40]: isAnimatingOpen && !isOnRightSide,
                  [SLIDE_LEFT_IN_40]: isAnimatingOpen && isOnRightSide,
                  [SLIDE_LEFT_OUT_40]: isAnimatingClose && !isOnRightSide,
                  [SLIDE_RIGHT_OUT_40]: isAnimatingClose && isOnRightSide
                }
              ) }
              elementToFocusOnDismiss={ elementToFocusOnDismiss }
              isClickableOutsideFocusTrap={ isLightDismiss }
              ignoreExternalFocusing={ ignoreExternalFocusing }
              forceFocusInsideTrap={ forceFocusInsideTrap }
              firstFocusableSelector={ firstFocusableSelector }
            >
              <div className={ css('ms-Panel-commands') } data-is-visible={ true } >
                { pendingCommandBarContent }
                { closeButton }
              </div>
              <div className={ css('ms-Panel-contentInner', styles.contentInner) }>
                { header }
                <div className={ css('ms-Panel-content') }>
                  { children }
                </div>
              </div>
            </FocusTrapZone>
          </div>
        </Popup>
      </Layer>
    );
  }

  public componentDidUpdate(prevProps, prevState) {
    if (
      prevState.isAnimatingClose === false &&
      this.state.isAnimatingClose === true &&
      this.props.onDismiss) {
      this.props.onDismiss();
    }
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

      if (this.props.onDismissed) {
        this.props.onDismissed();
      }
    }
  }
}
