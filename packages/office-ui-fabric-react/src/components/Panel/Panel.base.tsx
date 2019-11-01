import * as React from 'react';
import { IconButton } from '../../Button';
import { Layer } from '../../Layer';
import { Overlay } from '../../Overlay';
import { Popup } from '../../Popup';
import { getTheme, IconFontSizes, IProcessedStyleSet } from '../../Styling';
import {
  allowScrollOnElement,
  BaseComponent,
  classNamesFunction,
  divProperties,
  elementContains,
  getId,
  getNativeProps,
  getRTL
} from '../../Utilities';
import { FocusTrapZone } from '../FocusTrapZone/index';
import { IPanel, IPanelProps, IPanelStyleProps, IPanelStyles, PanelType } from './Panel.types';

const getClassNames = classNamesFunction<IPanelStyleProps, IPanelStyles>();

enum PanelVisibilityState {
  closed,
  animatingOpen,
  open,
  animatingClosed
}

interface IPanelState {
  isFooterSticky?: boolean;
  id?: string;
  visibility: PanelVisibilityState;
}

export class PanelBase extends BaseComponent<IPanelProps, IPanelState> implements IPanel {
  public static defaultProps: IPanelProps = {
    isHiddenOnDismiss: false,
    isOpen: undefined,
    isBlocking: true,
    hasCloseButton: true,
    type: PanelType.smallFixedFar
  };

  private _panel = React.createRef<HTMLDivElement>();
  private _classNames: IProcessedStyleSet<IPanelStyles>;
  private _scrollableContent: HTMLDivElement | null;
  private _animationCallback: number | null = null;

  public static getDerivedStateFromProps(nextProps: Readonly<IPanelProps>, prevState: Readonly<IPanelState>): Partial<IPanelState> | null {
    if (nextProps.isOpen === undefined) {
      return null; // no state update
    }
    if (
      nextProps.isOpen &&
      (prevState.visibility === PanelVisibilityState.closed || prevState.visibility === PanelVisibilityState.animatingClosed)
    ) {
      return { visibility: PanelVisibilityState.animatingOpen };
    }
    if (
      !nextProps.isOpen &&
      (prevState.visibility === PanelVisibilityState.open || prevState.visibility === PanelVisibilityState.animatingOpen)
    ) {
      return { visibility: PanelVisibilityState.animatingClosed };
    }
    return null;
  }

  constructor(props: IPanelProps) {
    super(props);

    this._warnDeprecations({
      ignoreExternalFocusing: 'focusTrapZoneProps',
      forceFocusInsideTrap: 'focusTrapZoneProps',
      firstFocusableSelector: 'focusTrapZoneProps'
    });

    this.state = {
      isFooterSticky: false,
      visibility: PanelVisibilityState.closed, // intentionally ignore props so animation takes place during componentDidMount
      id: getId('Panel')
    };
  }

  public componentDidMount(): void {
    this._events.on(window, 'resize', this._updateFooterPosition);

    if (this._shouldListenForOuterClick(this.props)) {
      this._events.on(document.body, 'mousedown', this._dismissOnOuterClick, true);
    }

    if (this.props.isOpen) {
      this.setState({ visibility: PanelVisibilityState.animatingOpen });
    }
  }

  public componentDidUpdate(previousProps: IPanelProps, previousState: IPanelState): void {
    const shouldListenOnOuterClick = this._shouldListenForOuterClick(this.props);
    const previousShouldListenOnOuterClick = this._shouldListenForOuterClick(previousProps);

    if (this.state.visibility !== previousState.visibility) {
      this._clearExistingAnimationTimer();
      if (this.state.visibility === PanelVisibilityState.animatingOpen) {
        this._animateTo(PanelVisibilityState.open);
      } else if (this.state.visibility === PanelVisibilityState.animatingClosed) {
        this._animateTo(PanelVisibilityState.closed);
      }
    }

    if (shouldListenOnOuterClick && !previousShouldListenOnOuterClick) {
      this._events.on(document.body, 'mousedown', this._dismissOnOuterClick, true);
    } else if (!shouldListenOnOuterClick && previousShouldListenOnOuterClick) {
      this._events.off(document.body, 'mousedown', this._dismissOnOuterClick, true);
    }
  }

  public render(): JSX.Element | null {
    const {
      className = '',
      elementToFocusOnDismiss,
      firstFocusableSelector,
      focusTrapZoneProps,
      forceFocusInsideTrap,
      hasCloseButton,
      headerText,
      headerClassName = '',
      ignoreExternalFocusing,
      isBlocking,
      isFooterAtBottom,
      isLightDismiss,
      isHiddenOnDismiss,
      layerProps,
      overlayProps,
      type,
      styles,
      theme,
      customWidth,
      onLightDismissClick = this._onPanelClick,
      onRenderNavigation = this._onRenderNavigation,
      onRenderHeader = this._onRenderHeader,
      onRenderBody = this._onRenderBody,
      onRenderFooter = this._onRenderFooter
    } = this.props;
    const { isFooterSticky, visibility, id } = this.state;
    const isLeft = type === PanelType.smallFixedNear || type === PanelType.customNear ? true : false;
    const isRTL = getRTL();
    const isOnRightSide = isRTL ? isLeft : !isLeft;
    const headerTextId = headerText && id + '-headerText';
    const customWidthStyles = type === PanelType.custom || type === PanelType.customNear ? { width: customWidth } : {};
    const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties);
    const isOpen = this.isActive;
    const isAnimating = visibility === PanelVisibilityState.animatingClosed || visibility === PanelVisibilityState.animatingOpen;

    if (!isOpen && !isAnimating && !isHiddenOnDismiss) {
      return null;
    }

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      focusTrapZoneClassName: focusTrapZoneProps ? focusTrapZoneProps.className : undefined,
      hasCloseButton,
      headerClassName,
      isAnimating,
      isFooterSticky,
      isFooterAtBottom,
      isOnRightSide,
      isOpen,
      isHiddenOnDismiss,
      type
    });

    const { _classNames } = this;

    let overlay;
    if (isBlocking && isOpen) {
      overlay = (
        <Overlay
          className={_classNames.overlay}
          isDarkThemed={false}
          onClick={isLightDismiss ? onLightDismissClick : undefined}
          {...overlayProps}
        />
      );
    }

    const header = onRenderHeader(this.props, this._onRenderHeader, headerTextId);

    return (
      <Layer {...layerProps}>
        <Popup
          role="dialog"
          aria-modal="true"
          ariaLabelledBy={header ? headerTextId : undefined}
          onDismiss={this.dismiss}
          className={_classNames.hiddenPanel}
        >
          <div aria-hidden={!isOpen && isAnimating} {...nativeProps} ref={this._panel} className={_classNames.root}>
            {overlay}
            <FocusTrapZone
              ignoreExternalFocusing={ignoreExternalFocusing}
              forceFocusInsideTrap={!isBlocking || (isHiddenOnDismiss && !isOpen) ? false : forceFocusInsideTrap}
              firstFocusableSelector={firstFocusableSelector}
              isClickableOutsideFocusTrap={true}
              {...focusTrapZoneProps}
              className={_classNames.main}
              style={customWidthStyles}
              elementToFocusOnDismiss={elementToFocusOnDismiss}
            >
              <div className={_classNames.commands} data-is-visible={true}>
                {onRenderNavigation(this.props, this._onRenderNavigation)}
              </div>
              <div className={_classNames.contentInner}>
                {header}
                <div ref={this._allowScrollOnPanel} className={_classNames.scrollableContent} data-is-scrollable={true}>
                  {onRenderBody(this.props, this._onRenderBody)}
                </div>
                {onRenderFooter(this.props, this._onRenderFooter)}
              </div>
            </FocusTrapZone>
          </div>
        </Popup>
      </Layer>
    );
  }

  public open() {
    if (this.props.isOpen !== undefined) {
      return;
    }

    if (this.isActive) {
      return;
    }

    if (this.props.onOpen) {
      this.props.onOpen();
    }
    this.setState({ visibility: PanelVisibilityState.animatingOpen });
  }

  public close() {
    if (this.props.isOpen !== undefined) {
      return;
    }

    if (!this.isActive) {
      return;
    }

    this.setState({ visibility: PanelVisibilityState.animatingClosed });
  }

  public dismiss = (ev?: React.SyntheticEvent<HTMLElement>): void => {
    if (this.props.onDismiss) {
      this.props.onDismiss(ev);
    }

    if (!ev || (ev && !ev.defaultPrevented)) {
      this.close();
    }
  };

  /** isActive is true when panel is open or opening. */
  get isActive(): boolean {
    return this.state.visibility === PanelVisibilityState.open || this.state.visibility === PanelVisibilityState.animatingOpen;
  }

  // Allow the user to scroll within the panel but not on the body
  private _allowScrollOnPanel = (elt: HTMLDivElement | null): void => {
    if (elt) {
      allowScrollOnElement(elt, this._events);
    } else {
      this._events.off(this._scrollableContent);
    }
    this._scrollableContent = elt;
  };

  private _shouldListenForOuterClick(props: IPanelProps): boolean {
    return !!props.isBlocking && !!props.isOpen;
  }

  private _onRenderNavigation = (props: IPanelProps): JSX.Element | null => {
    if (!this.props.onRenderNavigationContent && !this.props.onRenderNavigation && !this.props.hasCloseButton) {
      return null;
    }
    const { onRenderNavigationContent = this._onRenderNavigationContent } = this.props;
    return <div className={this._classNames.navigation}>{onRenderNavigationContent(props, this._onRenderNavigationContent)}</div>;
  };

  private _onRenderNavigationContent = (props: IPanelProps): JSX.Element | null => {
    const { closeButtonAriaLabel, hasCloseButton } = props;
    const theme = getTheme();
    if (hasCloseButton) {
      // TODO -Issue #5689: Comment in once Button is converted to mergeStyles
      // const iconButtonStyles = this._classNames.subComponentStyles
      // ? (this._classNames.subComponentStyles.iconButton as IStyleFunctionOrObject<IButtonStyleProps, IButtonStyles>)
      // : undefined;
      return (
        <IconButton
          // TODO -Issue #5689: Comment in once Button is converted to mergeStyles
          // className={iconButtonStyles}
          styles={{
            root: {
              height: 'auto',
              width: '44px',
              color: theme.palette.neutralSecondary,
              fontSize: IconFontSizes.large
            },
            rootHovered: {
              color: theme.palette.neutralPrimary
            }
          }}
          className={this._classNames.closeButton}
          onClick={this._onPanelClick}
          ariaLabel={closeButtonAriaLabel}
          title={closeButtonAriaLabel}
          data-is-visible={true}
          iconProps={{ iconName: 'Cancel' }}
        />
      );
    }
    return null;
  };

  private _onRenderHeader = (
    props: IPanelProps,
    defaultRender?: (props?: IPanelProps) => JSX.Element | null,
    headerTextId?: string | undefined
  ): JSX.Element | null => {
    const { headerText } = props;

    if (headerText) {
      return (
        <div className={this._classNames.header}>
          <p className={this._classNames.headerText} id={headerTextId} role="heading" aria-level={2}>
            {headerText}
          </p>
        </div>
      );
    }
    return null;
  };

  private _onRenderBody = (props: IPanelProps): JSX.Element => {
    return <div className={this._classNames.content}>{props.children}</div>;
  };

  private _onRenderFooter = (props: IPanelProps): JSX.Element | null => {
    const { onRenderFooterContent = null } = this.props;
    if (onRenderFooterContent) {
      return (
        <div className={this._classNames.footer}>
          <div className={this._classNames.footerInner}>{onRenderFooterContent()}</div>
        </div>
      );
    }
    return null;
  };

  private _updateFooterPosition(): void {
    const scrollableContent = this._scrollableContent;
    if (scrollableContent) {
      const height = scrollableContent.clientHeight;
      const innerHeight = scrollableContent.scrollHeight;

      this.setState({
        isFooterSticky: height < innerHeight ? true : false
      });
    }
  }

  private _dismissOnOuterClick(ev: any): void {
    const panel = this._panel.current;
    if (this.isActive && panel) {
      if (!elementContains(panel, ev.target)) {
        if (this.props.onOuterClick) {
          this.props.onOuterClick();
          ev.preventDefault();
        } else {
          this.dismiss();
        }
      }
    }
  }

  private _animateTo = (newVisibilityState: PanelVisibilityState): void => {
    this._animationCallback = this._async.setTimeout(() => {
      this.setState({ visibility: newVisibilityState });
      this._onTransitionComplete();
    }, 200);
  };

  private _clearExistingAnimationTimer = (): void => {
    if (this._animationCallback !== null) {
      this._async.clearTimeout(this._animationCallback);
    }
  };

  private _onPanelClick = (ev?: any): void => {
    this.dismiss(ev);
  };

  private _onTransitionComplete = (): void => {
    this._updateFooterPosition();

    if (this.state.visibility === PanelVisibilityState.open && this.props.onOpened) {
      this.props.onOpened();
    }

    if (this.state.visibility === PanelVisibilityState.closed && this.props.onDismissed) {
      this.props.onDismissed();
    }
  };
}
