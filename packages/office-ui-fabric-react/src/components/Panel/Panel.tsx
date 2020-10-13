/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
  BaseComponent,
  css,
  getId,
  getRTL,
  createRef
} from '../../Utilities';
import { FocusTrapZone } from '../FocusTrapZone/index';
import { IPanel, IPanelProps, PanelType } from './Panel.types';
import { Layer } from '../Layer/Layer';
import { Overlay } from '../../Overlay';
import { Popup } from '../../Popup';
import { IconButton } from '../../Button';
import { AnimationClassNames, getTheme, IconFontSizes } from '../../Styling';
import * as stylesImport from './Panel.scss';
const styles: any = stylesImport;
const theme = getTheme();

export interface IPanelState {
  isFooterSticky?: boolean;
  isOpen?: boolean;
  isAnimating?: boolean;
  id?: string;
}

export class Panel extends BaseComponent<IPanelProps, IPanelState> implements IPanel {

  public static defaultProps: IPanelProps = {
    isHiddenOnDismiss: false,
    isOpen: false,
    isBlocking: true,
    hasCloseButton: true,
    type: PanelType.smallFixedFar,
  };

  private _content = createRef<HTMLDivElement>();

  constructor(props: IPanelProps) {
    super(props);

    this._warnDeprecations({
      'ignoreExternalFocusing': 'focusTrapZoneProps',
      'forceFocusInsideTrap': 'focusTrapZoneProps',
      'firstFocusableSelector': 'focusTrapZoneProps'
    });

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
    const {
      className = '',
      elementToFocusOnDismiss,
      firstFocusableSelector,
      focusTrapZoneProps,
      forceFocusInsideTrap,
      hasCloseButton,
      headerText,
      ignoreExternalFocusing,
      isBlocking,
      isLightDismiss,
      isHiddenOnDismiss,
      layerProps,
      type,
      customWidth,
      onLightDismissClick = this._onPanelClick,
      onRenderNavigation = this._onRenderNavigation,
      onRenderHeader = this._onRenderHeader,
      onRenderBody = this._onRenderBody,
      onRenderFooter = this._onRenderFooter
    } = this.props;
    const { isOpen, isAnimating, id } = this.state;
    const isLeft = type === PanelType.smallFixedNear ? true : false;
    const isRTL = getRTL();
    const isOnRightSide = isRTL ? isLeft : !isLeft;
    const headerTextId = headerText && id + '-headerText';
    const customWidthStyles = (type === PanelType.custom) ? { width: customWidth } : {};

    if (!isOpen && !isAnimating && !isHiddenOnDismiss) {
      return null;
    }

    let overlay;
    if (isBlocking && isOpen) {
      overlay = (
        <Overlay
          className={ css(
            styles.overlay,
            isOpen && isAnimating && AnimationClassNames.fadeIn200,
            !isOpen && isAnimating && AnimationClassNames.fadeOut200
          ) }
          isDarkThemed={ false }
          onClick={ isLightDismiss ? onLightDismissClick : undefined }
        />
      );
    }

    const header = onRenderHeader(this.props, this._onRenderHeader, headerTextId);

    return (
      <Layer { ...layerProps }>
        <Popup
          role='dialog'
          ariaLabelledBy={ header ? headerTextId : undefined }
          onDismiss={ this.dismiss }
          className={
            css(
              !isOpen && !isAnimating && isHiddenOnDismiss && styles.hiddenPanel
            )
          }
        >
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
                hasCloseButton && ('ms-Panel--hasCloseButton ' + styles.rootHasCloseButton),
                !isOpen && !isAnimating && isHiddenOnDismiss && styles.hiddenPanel
              )
            }
          >
            { overlay }
            <FocusTrapZone
              ignoreExternalFocusing={ ignoreExternalFocusing }
              forceFocusInsideTrap={ forceFocusInsideTrap }
              firstFocusableSelector={ firstFocusableSelector }
              { ...focusTrapZoneProps }
              className={
                css(
                  'ms-Panel-main',
                  styles.main,
                  isOpen && isAnimating && !isOnRightSide && AnimationClassNames.slideRightIn40,
                  isOpen && isAnimating && isOnRightSide && AnimationClassNames.slideLeftIn40,
                  !isOpen && isAnimating && !isOnRightSide && AnimationClassNames.slideLeftOut40,
                  !isOpen && isAnimating && isOnRightSide && AnimationClassNames.slideRightOut40,
                  focusTrapZoneProps ? focusTrapZoneProps.className : undefined
                ) }
              style={ customWidthStyles }
              elementToFocusOnDismiss={ elementToFocusOnDismiss }
              isClickableOutsideFocusTrap={
                isLightDismiss || isHiddenOnDismiss || (focusTrapZoneProps && focusTrapZoneProps.isClickableOutsideFocusTrap)
              }
            >
              <div className={ css('ms-Panel-commands') } data-is-visible={ true } >
                { onRenderNavigation(this.props, this._onRenderNavigation) }
              </div>
              <div className={ css('ms-Panel-contentInner', styles.contentInner) } >
                { header }
                { onRenderBody(this.props, this._onRenderBody) }
                { onRenderFooter(this.props, this._onRenderFooter) }
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

  public dismiss = (): void => {
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

  private _onRenderNavigation = (props: IPanelProps): JSX.Element | null => {
    const {
      closeButtonAriaLabel,
      hasCloseButton
    } = props;
    if (hasCloseButton) {
      return (
        <div className={ css('ms-Panel-navigation', styles.navigation) } >
          <IconButton
            styles={
              {
                root: {
                  height: 'auto',
                  width: '44px',
                  color: theme.palette.neutralSecondary,
                  fontSize: IconFontSizes.large,
                },
                rootHovered: {
                  color: theme.palette.neutralPrimary
                }
              }
            }
            className={ css('ms-Panel-closeButton ms-PanelAction-close') }
            onClick={ this._onPanelClick }
            ariaLabel={ closeButtonAriaLabel }
            title={ closeButtonAriaLabel }
            data-is-visible={ true }
            iconProps={ { iconName: 'Cancel' } }
          />
        </div>
      );
    }
    return null;
  }

  private _onRenderHeader = (
    props: IPanelProps,
    defaultRender?: (props?: IPanelProps) => JSX.Element | null,
    headerTextId?: string | undefined
  ): JSX.Element | null => {
    const {
      headerText,
      headerClassName = '',
    } = props;

    if (headerText) {
      return (
        <div className={ css('ms-Panel-header', styles.header) }>
          <p
            className={ css('ms-Panel-headerText', styles.headerText, headerClassName) }
            id={ headerTextId }
            role='heading'
            aria-level={ 1 }
          >
            { headerText }
          </p>
        </div>
      );
    }
    return null;
  }

  private _onRenderBody = (props: IPanelProps): JSX.Element => {
    const contentClass = css(
      'ms-Panel-content',
      styles.content,
      props.isFooterAtBottom && styles.contentGrow
    );

    return (
      <div ref={ this._content } className={ contentClass } >
        { props.children }
      </div>
    );
  }

  private _onRenderFooter = (props: IPanelProps): JSX.Element | null => {
    const { isFooterSticky } = this.state;
    const { onRenderFooterContent = null } = this.props;
    if (onRenderFooterContent) {
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

  private _updateFooterPosition(): void {
    const _content = this._content.value;
    if (_content) {
      const height = _content.clientHeight;
      const innerHeight = _content.scrollHeight;

      this.setState({
        isFooterSticky: height < innerHeight ? true : false
      });
    }
  }

  private _onPanelClick = (): void => {
    this.dismiss();
  }

  private _onTransitionComplete = (): void => {
    this.setState({
      isAnimating: false
    });

    if (!this.state.isOpen && this.props.onDismissed) {
      this.props.onDismissed();
    }
  }
}
