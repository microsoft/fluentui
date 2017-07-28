/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
  BaseComponent,
  autobind,
  css,
  getId,
  getRTL
} from '../../Utilities';
import { FocusTrapZone } from '../FocusTrapZone/index';
import { IPanel, IPanelProps, PanelType } from './Panel.Props';
import { Layer } from '../Layer/Layer';
import { Overlay } from '../../Overlay';
import { Popup } from '../../Popup';
import { IconButton } from '../../Button';
import { AnimationClassNames } from '../../Styling';
import * as stylesImport from './Panel.scss';
const styles: any = stylesImport;

export interface IPanelState {
  isFooterSticky?: boolean;
  isOpen?: boolean;
  isAnimating?: boolean;
  id?: string;
}

export class Panel extends BaseComponent<IPanelProps, IPanelState> implements IPanel {

  public static defaultProps: IPanelProps = {
    isOpen: false,
    isBlocking: true,
    hasCloseButton: true,
    type: PanelType.smallFixedFar,
  };

  private _content: HTMLElement;

  constructor(props: IPanelProps) {
    super(props);

    this.state = {
      isFooterSticky: false,
      isOpen: false,
      isAnimating: false,
      id: getId('Panel')
    };
  }

  public componentDidMount() {
    this._events.on(window, 'resize', this._updateFooterPosition);

    if (this.props.isOpen) {
      this.open();
    }
  }

  public componentWillReceiveProps(newProps: IPanelProps) {
    if (newProps.isOpen !== this.state.isOpen) {
      if (newProps.isOpen) {
        this.open();
      } else {
        this.dismiss();
      }
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
      headerClassName,
      onRenderNavigation = this._onRenderNavigation,
      onRenderHeader = this._onRenderHeader,
      onRenderBody = this._onRenderBody,
      onRenderFooter = this._onRenderFooter
    } = this.props;
    let { isOpen, isAnimating, id, isFooterSticky } = this.state;
    let isLeft = type === PanelType.smallFixedNear ? true : false;
    let isRTL = getRTL();
    let isOnRightSide = isRTL ? isLeft : !isLeft;
    const headerTextId = id + '-headerText';
    const customWidthStyles = (type === PanelType.custom) ? { width: customWidth } : {};
    const renderProps: IPanelProps = { ...this.props, componentId: id };

    if (!isOpen && !isAnimating) {
      return null;
    }

    let overlay;
    if (isBlocking) {
      overlay = (
        <Overlay
          className={ css(
            styles.overlay,
            isOpen && isAnimating && AnimationClassNames.fadeIn200,
            !isOpen && isAnimating && AnimationClassNames.fadeOut200
          ) }
          isDarkThemed={ false }
          onClick={ isLightDismiss ? this._onPanelClick : undefined }
        />
      );
    }

    return (
      <Layer { ...layerProps }>
        <Popup
          role='dialog'
          ariaLabelledBy={ headerText && headerTextId }
          onDismiss={ this.dismiss }>
          <div
            className={
              css(
                'ms-Panel',
                styles.root,
                className,
                // because the RTL animations are not being used, we need to set a class
                isOpen && ('is-open ' + styles.rootIsOpen),
                type === PanelType.smallFluid && ('ms-Panel--smFluid ' + styles.rootIsSmallFluid),
                type === PanelType.smallFixedNear && ('ms-Panel--smLeft ' + styles.rootIsSmallLeft),
                type === PanelType.smallFixedFar && ('ms-Panel--sm ' + styles.rootIsSmall),
                type === PanelType.medium && ('ms-Panel--md ' + styles.rootIsMedium),
                (type === PanelType.large || type === PanelType.largeFixed) && ('ms-Panel--lg ' + styles.rootIsLarge),
                type === PanelType.largeFixed && ('ms-Panel--fixed ' + styles.rootIsFixed),
                type === PanelType.extraLarge && ('ms-Panel--xl ' + styles.rootIsXLarge),
                type === PanelType.custom && ('ms-Panel--custom ' + styles.rootIsCustom),
                hasCloseButton && ('ms-Panel--hasCloseButton ' + styles.rootHasCloseButton)
              )
            }
          >
            { overlay }
            <FocusTrapZone
              className={
                css(
                  'ms-Panel-main',
                  styles.main,
                  isOpen && isAnimating && !isOnRightSide && AnimationClassNames.slideRightIn40,
                  isOpen && isAnimating && isOnRightSide && AnimationClassNames.slideLeftIn40,
                  !isOpen && isAnimating && !isOnRightSide && AnimationClassNames.slideLeftOut40,
                  !isOpen && isAnimating && isOnRightSide && AnimationClassNames.slideRightOut40,
                ) }
              style={ customWidthStyles }
              elementToFocusOnDismiss={ elementToFocusOnDismiss }
              isClickableOutsideFocusTrap={ isLightDismiss }
              ignoreExternalFocusing={ ignoreExternalFocusing }
              forceFocusInsideTrap={ forceFocusInsideTrap }
              firstFocusableSelector={ firstFocusableSelector }
            >
              <div className={ css('ms-Panel-commands') } data-is-visible={ true } >
                { onRenderNavigation(renderProps, this._onRenderNavigation) }
              </div>
              <div className={ css('ms-Panel-contentInner', styles.contentInner) } >
                { onRenderHeader(renderProps, this._onRenderHeader) }
                { onRenderBody(renderProps, this._onRenderBody) }
                { onRenderFooter(renderProps, this._onRenderFooter) }
              </div>
            </FocusTrapZone>
          </div>
        </Popup>
      </Layer>
    );
  }

  public open() {
    if (!this.state.isOpen) {
      this.setState({
        isOpen: true,
        isAnimating: true
      }, () => {
        this._async.setTimeout(this._onTransitionComplete, 200);
      });
    }
  }

  @autobind
  public dismiss() {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
        isAnimating: true
      }, () => {
        this._async.setTimeout(this._onTransitionComplete, 200);
      });

      if (this.props.onDismiss) {
        this.props.onDismiss();
      }
    }
  }

  @autobind
  private _onRenderNavigation(props: IPanelProps): JSX.Element | null {
    const {
      closeButtonAriaLabel,
      hasCloseButton
    } = props;
    if (hasCloseButton) {
      return (
        <IconButton
          className={ css('ms-Panel-closeButton ms-PanelAction-close', styles.closeButton) }
          onClick={ this._onPanelClick }
          ariaLabel={ closeButtonAriaLabel }
          data-is-visible={ true }
          iconProps={ { iconName: 'Cancel' } }
        />
      );
    }
    return null;
  }

  @autobind
  private _onRenderHeader(props: IPanelProps): JSX.Element | null {
    const {
      headerText,
      componentId,
      headerClassName = '',
    } = props;

    const { id } = this.state;
    if (headerText) {
      return (
        <div className={ css('ms-Panel-header', styles.header) }>
          <p className={ css('ms-Panel-headerText', styles.headerText, headerClassName) } id={ componentId + '-headerText' } role='heading'>
            { headerText }
          </p>
        </div>
      );
    }
    return null;
  }

  @autobind
  private _onRenderBody(props: IPanelProps): JSX.Element {
    return (
      <div className={ css('ms-Panel-content', styles.content) } ref={ this._resolveRef('_content') }>
        { props.children }
      </div>
    );
  }

  @autobind
  private _onRenderFooter(props: IPanelProps): JSX.Element | null {
    let { isFooterSticky } = this.state;
    let { onRenderFooterContent = null } = this.props;
    if (onRenderFooterContent != null) {
      return (
        <div className={ css('ms-Panel-footer', styles.footer, isFooterSticky && styles.footerIsSticky) } >
          <div className={ css('ms-Panel-footerInner', styles.footerInner) }>
            { onRenderFooterContent() }
          </div>
        </div>
      );
    }
    return null;
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

  @autobind
  private _onPanelClick() {
    this.dismiss();
  }

  @autobind
  private _onTransitionComplete() {
    this.setState({
      isAnimating: false
    });

    if (!this.state.isOpen && this.props.onDismissed) {
      this.props.onDismissed();
    }
  }
}
