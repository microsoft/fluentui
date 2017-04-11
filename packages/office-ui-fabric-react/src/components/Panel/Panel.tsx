/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
  BaseComponent,
  css,
  getId,
  getRTL,
  autobind
} from '../../Utilities';
import { FocusTrapZone } from '../FocusTrapZone/index';
import { IPanelProps, PanelType } from './Panel.Props';
import { Layer } from '../Layer/Layer';
import { Overlay } from '../../Overlay';
import { Popup } from '../../Popup';
import { IconButton } from '../../Button';
import styles = require('./Panel.scss');

export interface IPanelState {
  isFooterSticky?: boolean;
  isOpen?: boolean;
  isAnimatingOpen?: boolean;
  isAnimatingClose?: boolean;
  id?: string;
}

// Animation class constants.
const FADE_IN_200 = 'ms-fadeIn200';
const FADE_OUT_200 = 'ms-fadeOut200';
const SLIDE_LEFT_IN_40 = 'ms-slideLeftIn40';
const SLIDE_LEFT_OUT_40 = 'ms-slideLeftOut40';
const SLIDE_RIGHT_IN_40 = 'ms-slideRightIn40';
const SLIDE_RIGHT_OUT_40 = 'ms-slideRightOut40';

export class Panel extends BaseComponent<IPanelProps, IPanelState> {

  public static defaultProps: IPanelProps = {
    isOpen: false,
    isBlocking: true,
    hasCloseButton: true,
    type: PanelType.smallFixedFar,
  };

  private _content: HTMLElement;

  constructor(props: IPanelProps) {
    super(props);

    this._onPanelClick = this._onPanelClick.bind(this);
    this._onPanelRef = this._onPanelRef.bind(this);

    this.state = {
      isFooterSticky: false,
      isOpen: !!props.isOpen,
      isAnimatingOpen: props.isOpen,
      isAnimatingClose: false,
      id: getId('Panel')
    };
  }

  public componentDidMount() {
    this._events.on(window, 'resize', this._updateFooterPosition);
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

  public componentDidUpdate(prevProps, prevState) {
    if (prevState.isOpen === false) {
      this._updateFooterPosition();
    }
    if (
      prevState.isAnimatingClose === false &&
      this.state.isAnimatingClose === true &&
      this.props.onDismiss) {
      this.props.onDismiss();
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
      headerText,
      ignoreExternalFocusing,
      isBlocking,
      isLightDismiss,
      layerProps,
      type,
      customWidth,
      onRenderNavigation = this._onRenderNavigation,
      onRenderHeader = this._onRenderHeader,
      onRenderBody = this._onRenderBody,
      onRenderFooter = this._onRenderFooter
    } = this.props;
    let { isOpen, isAnimatingOpen, isAnimatingClose, id, isFooterSticky } = this.state;
    let isLeft = type === PanelType.smallFixedNear ? true : false;
    let isRTL = getRTL();
    let isOnRightSide = isRTL ? isLeft : !isLeft;
    const headerTextId = id + '-headerText';
    const customWidthStyles = (type === PanelType.custom) ? { width: customWidth } : {};

    if (!isOpen) {
      return null;
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
          ariaLabelledBy={ headerText && headerTextId }
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
                ['ms-Panel--custom ' + styles.rootIsCustom]: type === PanelType.custom,
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
              style={ customWidthStyles }
              elementToFocusOnDismiss={ elementToFocusOnDismiss }
              isClickableOutsideFocusTrap={ isLightDismiss }
              ignoreExternalFocusing={ ignoreExternalFocusing }
              forceFocusInsideTrap={ forceFocusInsideTrap }
              firstFocusableSelector={ firstFocusableSelector }
            >
              <div className={ css('ms-Panel-commands') } data-is-visible={ true } >
                { onRenderNavigation(this.props, this._onRenderNavigation) }
              </div>
              <div className={ css('ms-Panel-contentInner', styles.contentInner) } >
                { onRenderHeader(this.props, this._onRenderHeader) }
                { onRenderBody(this.props, this._onRenderBody) }
                { onRenderFooter(this.props, this._onRenderFooter) }
              </div>
            </FocusTrapZone>
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

  @autobind
  private _onRenderNavigation(props): JSX.Element {
    let {
      closeButtonAriaLabel,
      hasCloseButton
    } = props;
    return (
      hasCloseButton &&
      <IconButton
        className={ css('ms-Panel-closeButton ms-PanelAction-close', styles.closeButton) }
        onClick={ this._onPanelClick }
        aria-label={ closeButtonAriaLabel }
        data-is-visible={ true } icon='Cancel'
      />
    );
  }

  @autobind
  private _onRenderHeader(props): JSX.Element {
    let {
      headerText,
      headerTextId,
      headerClassName = '',
    } = props;
    return (
      headerText &&
      <div className={ css('ms-Panel-header', styles.header) }>
        <p className={ css('ms-Panel-headerText', styles.headerText, headerClassName) } id={ headerTextId } role='heading'>
          { headerText }
        </p>
      </div>
    );
  }

  @autobind
  private _onRenderBody(props): JSX.Element {
    return (
      <div className={ css('ms-Panel-content', styles.content) } ref={ this._resolveRef('_content') }>
        { props.children }
      </div>
    );
  }

  @autobind
  private _onRenderFooter(props): JSX.Element {
    let { isFooterSticky } = this.state;
    let { onRenderFooterContent = null } = this.props;
    return (
      onRenderFooterContent != null &&
      <div className={ css('ms-Panel-footer', styles.footer, isFooterSticky && styles.footerIsSticky) } >
        <div className={ css('ms-Panel-footerInner', styles.footerInner) }>
          { onRenderFooterContent() }
        </div>
      </div>
    );
  }

  private _updateFooterPosition() {
    let _content = this._content;
    if (_content) {
      let height = _content.clientHeight;
      let innerHeight = _content.scrollHeight;

      this.setState({
        isFooterSticky: height < innerHeight ? true : false
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
