import * as React from 'react';
import { IconButton } from '../../Button';
import { Layer } from '../../Layer';
import { Overlay } from '../../Overlay';
import { Popup } from '../../Popup';
import {
  allowScrollOnElement,
  allowOverscrollOnElement,
  classNamesFunction,
  divProperties,
  elementContains,
  getId,
  getNativeProps,
  getRTL,
  css,
  warnDeprecations,
  Async,
  EventGroup,
  initializeComponentRef,
} from '../../Utilities';
import { FocusTrapZone } from '../FocusTrapZone/index';
import { PanelType } from './Panel.types';
import type { IProcessedStyleSet } from '../../Styling';
import type { IPanel, IPanelProps, IPanelStyleProps, IPanelStyles } from './Panel.types';
import { WindowContext } from '@fluentui/react-window-provider';
import { getDocumentEx, getWindowEx } from '../../utilities/dom';

const getClassNames = classNamesFunction<IPanelStyleProps, IPanelStyles>();
const COMPONENT_NAME = 'Panel';

enum PanelVisibilityState {
  closed,
  animatingOpen,
  open,
  animatingClosed,
}

interface IPanelState {
  isFooterSticky?: boolean;
  id?: string;
  visibility: PanelVisibilityState;
}

export class PanelBase extends React.Component<IPanelProps, IPanelState> implements IPanel {
  public static defaultProps: IPanelProps = {
    isHiddenOnDismiss: false,
    isOpen: undefined,
    isBlocking: true,
    hasCloseButton: true,
    type: PanelType.smallFixedFar,
  };

  public static contextType = WindowContext;

  private _async: Async;
  private _events: EventGroup;
  private _panel = React.createRef<HTMLDivElement>();
  private _classNames: IProcessedStyleSet<IPanelStyles>;
  private _scrollableContent: HTMLDivElement | null;
  private _animationCallback: number | null = null;
  private _hasCustomNavigation: boolean = !!(this.props.onRenderNavigation || this.props.onRenderNavigationContent);
  private _headerTextId: string | undefined;
  private _allowTouchBodyScroll: boolean;

  public static getDerivedStateFromProps(
    nextProps: Readonly<IPanelProps>,
    prevState: Readonly<IPanelState>,
  ): Partial<IPanelState> | null {
    if (nextProps.isOpen === undefined) {
      return null; // no state update
    }
    if (
      nextProps.isOpen &&
      (prevState.visibility === PanelVisibilityState.closed ||
        prevState.visibility === PanelVisibilityState.animatingClosed)
    ) {
      return { visibility: PanelVisibilityState.animatingOpen };
    }
    if (
      !nextProps.isOpen &&
      (prevState.visibility === PanelVisibilityState.open ||
        prevState.visibility === PanelVisibilityState.animatingOpen)
    ) {
      return { visibility: PanelVisibilityState.animatingClosed };
    }
    return null;
  }

  constructor(props: IPanelProps) {
    super(props);

    const { allowTouchBodyScroll = false } = this.props;
    this._allowTouchBodyScroll = allowTouchBodyScroll;

    initializeComponentRef(this);

    warnDeprecations(COMPONENT_NAME, props, {
      ignoreExternalFocusing: 'focusTrapZoneProps',
      forceFocusInsideTrap: 'focusTrapZoneProps',
      firstFocusableSelector: 'focusTrapZoneProps',
    });

    this.state = {
      isFooterSticky: false,
      // intentionally ignore props so animation takes place during componentDidMount
      visibility: PanelVisibilityState.closed,
      id: getId('Panel'),
    };
  }

  public componentDidMount(): void {
    this._async = new Async(this);
    this._events = new EventGroup(this);
    const win = getWindowEx(this.context);
    const doc = getDocumentEx(this.context);

    this._events.on(win, 'resize', this._updateFooterPosition);

    if (this._shouldListenForOuterClick(this.props)) {
      this._events.on(doc?.body, 'mousedown', this._dismissOnOuterClick, true);
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

    const doc = getDocumentEx(this.context);
    if (shouldListenOnOuterClick && !previousShouldListenOnOuterClick) {
      this._events.on(doc?.body, 'mousedown', this._dismissOnOuterClick, true);
    } else if (!shouldListenOnOuterClick && previousShouldListenOnOuterClick) {
      this._events.off(doc?.body, 'mousedown', this._dismissOnOuterClick, true);
    }
  }

  public componentWillUnmount(): void {
    this._async.dispose();
    this._events.dispose();
  }

  public render(): JSX.Element | null {
    const {
      className = '',
      elementToFocusOnDismiss,
      /* eslint-disable deprecation/deprecation */
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
      popupProps,
      type,
      styles,
      theme,
      customWidth,
      onLightDismissClick = this._onPanelClick,
      onRenderNavigation = this._onRenderNavigation,
      onRenderHeader = this._onRenderHeader,
      onRenderBody = this._onRenderBody,
      onRenderFooter = this._onRenderFooter,
    } = this.props;
    const { isFooterSticky, visibility, id } = this.state;
    const isLeft = type === PanelType.smallFixedNear || type === PanelType.customNear ? true : false;
    const isRTL = getRTL(theme);
    const isOnRightSide = isRTL ? isLeft : !isLeft;
    const customWidthStyles = type === PanelType.custom || type === PanelType.customNear ? { width: customWidth } : {};
    const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties);
    const isOpen = this.isActive;
    const isAnimating =
      visibility === PanelVisibilityState.animatingClosed || visibility === PanelVisibilityState.animatingOpen;

    this._headerTextId = headerText && id + '-headerText';

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
      type,
      hasCustomNavigation: this._hasCustomNavigation,
    });

    const { _classNames, _allowTouchBodyScroll } = this;

    let overlay;
    if (isBlocking && isOpen) {
      overlay = (
        <Overlay
          className={_classNames.overlay}
          isDarkThemed={false}
          onClick={isLightDismiss ? onLightDismissClick : undefined}
          allowTouchBodyScroll={_allowTouchBodyScroll}
          {...overlayProps}
        />
      );
    }

    return (
      <Layer {...layerProps}>
        <Popup
          role="dialog"
          aria-modal={isBlocking ? 'true' : undefined}
          ariaLabelledBy={this._headerTextId ? this._headerTextId : undefined}
          onDismiss={this.dismiss}
          className={_classNames.hiddenPanel}
          enableAriaHiddenSiblings={isOpen ? true : false}
          {...popupProps}
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
              <div className={_classNames.contentInner}>
                <div ref={this._allowScrollOnPanel} className={_classNames.scrollableContent} data-is-scrollable={true}>
                  <div className={_classNames.commands} data-is-visible={true}>
                    {onRenderNavigation(this.props, this._onRenderNavigation)}
                  </div>
                  {(this._hasCustomNavigation || !hasCloseButton) &&
                    onRenderHeader(this.props, this._onRenderHeader, this._headerTextId)}
                  {onRenderBody(this.props, this._onRenderBody)}
                  {onRenderFooter(this.props, this._onRenderFooter)}
                </div>
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

  public dismiss = (ev?: React.SyntheticEvent<HTMLElement> | KeyboardEvent): void => {
    if (this.props.onDismiss && this.isActive) {
      this.props.onDismiss(ev);
    }

    if (!ev || (ev && !ev.defaultPrevented)) {
      this.close();
    }
  };

  /** isActive is true when panel is open or opening. */
  public get isActive(): boolean {
    return (
      this.state.visibility === PanelVisibilityState.open ||
      this.state.visibility === PanelVisibilityState.animatingOpen
    );
  }

  // Allow the user to scroll within the panel but not on the body
  private _allowScrollOnPanel = (elt: HTMLDivElement | null): void => {
    if (elt) {
      if (this._allowTouchBodyScroll) {
        allowOverscrollOnElement(elt, this._events);
      } else {
        allowScrollOnElement(elt, this._events);
      }
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
    return (
      <div className={this._classNames.navigation}>
        {onRenderNavigationContent(props, this._onRenderNavigationContent)}
      </div>
    );
  };

  private _onRenderNavigationContent = (props: IPanelProps): JSX.Element | null => {
    const { closeButtonAriaLabel, hasCloseButton, onRenderHeader = this._onRenderHeader } = props;
    if (hasCloseButton) {
      const iconButtonStyles = this._classNames.subComponentStyles?.closeButton();

      return (
        <>
          {!this._hasCustomNavigation && onRenderHeader(this.props, this._onRenderHeader, this._headerTextId)}
          <IconButton
            styles={iconButtonStyles}
            className={this._classNames.closeButton}
            onClick={this._onPanelClick}
            ariaLabel={closeButtonAriaLabel}
            title={closeButtonAriaLabel}
            data-is-visible={true}
            iconProps={{ iconName: 'Cancel' }}
          />
        </>
      );
    }
    return null;
  };

  private _onRenderHeader = (
    props: IPanelProps,
    defaultRender?: (props?: IPanelProps) => JSX.Element | null,
    headerTextId?: string | undefined,
  ): JSX.Element | null => {
    const { headerText, headerTextProps = {} } = props;

    if (headerText) {
      return (
        <div className={this._classNames.header}>
          <div
            id={headerTextId}
            role="heading"
            aria-level={1}
            {...headerTextProps}
            className={css(this._classNames.headerText, headerTextProps.className)}
          >
            {headerText}
          </div>
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
        isFooterSticky: height < innerHeight ? true : false,
      });
    }
  }

  private _dismissOnOuterClick(ev: React.MouseEvent<HTMLDivElement>): void {
    const panel = this._panel.current;
    if (this.isActive && panel && !ev.defaultPrevented) {
      if (!elementContains(panel, ev.target as HTMLElement)) {
        if (this.props.onOuterClick) {
          this.props.onOuterClick(ev);
        } else {
          this.dismiss(ev);
        }
      }
    }
  }

  private _animateTo = (newVisibilityState: PanelVisibilityState): void => {
    if (newVisibilityState === PanelVisibilityState.open && this.props.onOpen) {
      this.props.onOpen();
    }

    this._animationCallback = this._async.setTimeout(() => {
      this.setState({ visibility: newVisibilityState });
      this._onTransitionComplete(newVisibilityState);
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

  private _onTransitionComplete = (newVisibilityState: PanelVisibilityState): void => {
    this._updateFooterPosition();
    if (newVisibilityState === PanelVisibilityState.open && this.props.onOpened) {
      this.props.onOpened();
    }

    if (newVisibilityState === PanelVisibilityState.closed && this.props.onDismissed) {
      this.props.onDismissed();
    }
  };
}
