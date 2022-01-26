import * as React from 'react';

import {
  divProperties,
  getNativeProps,
  getId,
  KeyCodes,
  getDocument,
  classNamesFunction,
  initializeComponentRef,
  EventGroup,
  Async,
} from '../../Utilities';
import { OpenCardMode, HoverCardType } from './HoverCard.types';
import { ExpandingCard } from './ExpandingCard';
import { ExpandingCardMode } from './ExpandingCard.types';
import { PlainCard } from './PlainCard/PlainCard';
import type { IHoverCardProps, IHoverCardStyles, IHoverCardStyleProps, IHoverCard } from './HoverCard.types';
import type { IExpandingCardProps } from './ExpandingCard.types';
import type { IPlainCardProps } from './PlainCard/PlainCard.types';

const getClassNames = classNamesFunction<IHoverCardStyleProps, IHoverCardStyles>();

export interface IHoverCardState {
  isHoverCardVisible?: boolean;
  mode?: ExpandingCardMode;
  openMode?: OpenCardMode;
}

export class HoverCardBase extends React.Component<IHoverCardProps, IHoverCardState> implements IHoverCard {
  public static defaultProps = {
    cardOpenDelay: 500,
    cardDismissDelay: 100,
    expandedCardOpenDelay: 1500,
    instantOpenOnClick: false,
    setInitialFocus: false,
    openHotKey: KeyCodes.c as KeyCodes,
    type: HoverCardType.expanding,
  };

  // The wrapping div that gets the hover events
  private _hoverCard = React.createRef<HTMLDivElement>();
  private _dismissTimerId: number;
  private _openTimerId: number;
  private _currentMouseTarget: EventTarget | null;

  private _nativeDismissEvent: (ev?: any) => void;
  private _childDismissEvent: (ev?: any) => void;

  private _classNames: { [key in keyof IHoverCardStyles]: string };

  private _async: Async;
  private _events: EventGroup;

  // Constructor
  constructor(props: IHoverCardProps) {
    super(props);

    initializeComponentRef(this);
    this._async = new Async(this);
    this._events = new EventGroup(this);

    this._nativeDismissEvent = this._cardDismiss.bind(this, true);
    this._childDismissEvent = this._cardDismiss.bind(this, false);

    this.state = {
      isHoverCardVisible: false,
      mode: ExpandingCardMode.compact,
      openMode: OpenCardMode.hover,
    };
  }

  public componentDidMount(): void {
    this._setEventListeners();
  }

  public componentWillUnmount(): void {
    this._async.dispose();
    this._events.dispose();
  }

  public componentDidUpdate(prevProps: IHoverCardProps, prevState: IHoverCardState) {
    if (prevProps.target !== this.props.target) {
      this._events.off();
      this._setEventListeners();
    }

    if (prevState.isHoverCardVisible !== this.state.isHoverCardVisible) {
      if (this.state.isHoverCardVisible) {
        this._async.setTimeout(() => {
          this.setState(
            {
              mode: ExpandingCardMode.expanded,
            },
            () => {
              this.props.onCardExpand && this.props.onCardExpand();
            },
          );
        }, this.props.expandedCardOpenDelay!);
        this.props.onCardVisible && this.props.onCardVisible();
      } else {
        this.setState({
          mode: ExpandingCardMode.compact,
        });
        this.props.onCardHide && this.props.onCardHide();
      }
    }
  }

  public dismiss = (withTimeOut?: boolean): void => {
    this._async.clearTimeout(this._openTimerId);
    this._async.clearTimeout(this._dismissTimerId);
    if (!withTimeOut) {
      this._setDismissedState();
    } else {
      this._dismissTimerId = this._async.setTimeout(() => {
        this._setDismissedState();
      }, this.props.cardDismissDelay!);
    }
  };

  // Render
  public render(): JSX.Element {
    const {
      expandingCardProps,
      children,
      id,
      setAriaDescribedBy = true,
      styles: customStyles,
      theme,
      className,
      type,
      plainCardProps,
      trapFocus,
      setInitialFocus,
    } = this.props;
    const { isHoverCardVisible, mode, openMode } = this.state;
    const hoverCardId = id || getId('hoverCard');

    this._classNames = getClassNames(customStyles, {
      theme: theme!,
      className,
    });

    // Common props for both card types.
    const commonCardProps = {
      ...getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties),
      id: hoverCardId,
      trapFocus: !!trapFocus,
      firstFocus: setInitialFocus || openMode === OpenCardMode.hotKey,
      targetElement: this._getTargetElement(this.props.target),
      onEnter: this._cardOpen,
      onLeave: this._childDismissEvent,
    };

    const finalExpandedCardProps: IExpandingCardProps = { ...expandingCardProps, ...commonCardProps, mode };
    const finalPlainCardProps: IPlainCardProps = { ...plainCardProps, ...commonCardProps };

    return (
      <div
        className={this._classNames.host}
        ref={this._hoverCard}
        aria-describedby={setAriaDescribedBy && isHoverCardVisible ? hoverCardId : undefined}
        data-is-focusable={!this.props.target}
      >
        {children}
        {isHoverCardVisible &&
          (type === HoverCardType.expanding ? (
            <ExpandingCard {...finalExpandedCardProps} />
          ) : (
            <PlainCard {...finalPlainCardProps} />
          ))}
      </div>
    );
  }

  private _getTargetElement(target?: HTMLElement | string | null): HTMLElement | undefined {
    switch (typeof target) {
      case 'string':
        return getDocument()!.querySelector(target as string) as HTMLElement;

      case 'object':
        return target as HTMLElement;

      default:
        return this._hoverCard.current || undefined;
    }
  }

  private _shouldBlockHoverCard(): boolean {
    return !!(this.props.shouldBlockHoverCard && this.props.shouldBlockHoverCard());
  }

  // Show HoverCard
  private _cardOpen = (ev: MouseEvent): void => {
    // eslint-disable-next-line deprecation/deprecation
    if (this._shouldBlockHoverCard() || (ev.type === 'keydown' && !(ev.which === this.props.openHotKey))) {
      return;
    }
    this._async.clearTimeout(this._dismissTimerId);
    if (ev.type === 'mouseenter') {
      this._currentMouseTarget = ev.currentTarget;
    }

    this._executeCardOpen(ev);
  };

  private _executeCardOpen = (ev: MouseEvent): void => {
    this._async.clearTimeout(this._openTimerId);
    this._openTimerId = this._async.setTimeout(() => {
      this.setState((prevState: IHoverCardState) => {
        if (!prevState.isHoverCardVisible) {
          return {
            isHoverCardVisible: true,
            mode: ExpandingCardMode.compact,
            openMode: ev.type === 'keydown' ? OpenCardMode.hotKey : OpenCardMode.hover,
          };
        }

        return prevState;
      });
    }, this.props.cardOpenDelay!);
  };

  /**
   * Hide HoverCard
   * How we dismiss the card depends on where the callback is coming from.
   * This is provided by the `isNativeEvent` argument.
   *  true: Event is coming from event listeners set up in componentDidMount.
   *  false: Event is coming from the `onLeave` prop from the HoverCard component.
   */
  private _cardDismiss = (
    isNativeEvent: boolean,
    ev: MouseEvent | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => {
    if (isNativeEvent) {
      // We expect these to be MouseEvents, If not, return.
      if (!(ev instanceof MouseEvent)) {
        return;
      }

      // eslint-disable-next-line deprecation/deprecation
      if (ev.type === 'keydown' && ev.which !== KeyCodes.escape) {
        return;
      }

      // Dismiss if not sticky and currentTarget is the same element that mouse last entered
      // eslint-disable-next-line deprecation/deprecation
      if (!this.props.sticky && (this._currentMouseTarget === ev.currentTarget || ev.which === KeyCodes.escape)) {
        this.dismiss(true);
      }
    } else {
      // If this is a mouseleave event and the component is sticky, do not dismiss.
      if (
        this.props.sticky &&
        !(ev instanceof MouseEvent) &&
        ev.nativeEvent instanceof MouseEvent &&
        ev.type === 'mouseleave'
      ) {
        return;
      }

      this.dismiss(true);
    }
  };

  private _setDismissedState = () => {
    this.setState({
      isHoverCardVisible: false,
      mode: ExpandingCardMode.compact,
      openMode: OpenCardMode.hover,
    });
  };

  private _instantOpenAsExpanded = (ev: React.MouseEvent<HTMLDivElement>): void => {
    this._async.clearTimeout(this._dismissTimerId);

    this.setState((prevState: IHoverCardState) => {
      if (!prevState.isHoverCardVisible) {
        return {
          isHoverCardVisible: true,
          mode: ExpandingCardMode.expanded,
        };
      }

      return prevState;
    });
  };

  private _setEventListeners = (): void => {
    const { trapFocus, instantOpenOnClick, eventListenerTarget } = this.props;
    const target = eventListenerTarget
      ? this._getTargetElement(eventListenerTarget)
      : this._getTargetElement(this.props.target);
    const nativeEventDismiss = this._nativeDismissEvent;

    // target can be undefined if ref isn't available, only assign
    // events when defined to avoid throwing exception.
    if (target) {
      this._events.on(target, 'mouseenter', this._cardOpen);
      this._events.on(target, 'mouseleave', nativeEventDismiss);
      if (trapFocus) {
        this._events.on(target, 'keydown', this._cardOpen);
      } else {
        this._events.on(target, 'focus', this._cardOpen);
        this._events.on(target, 'blur', nativeEventDismiss);
      }
      if (instantOpenOnClick) {
        this._events.on(target, 'click', this._instantOpenAsExpanded);
      } else {
        this._events.on(target, 'mousedown', nativeEventDismiss);
        this._events.on(target, 'keydown', nativeEventDismiss);
      }
    }
  };
}
