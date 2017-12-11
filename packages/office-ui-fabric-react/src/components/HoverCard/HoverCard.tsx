/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  BaseComponent,
  autobind,
  divProperties,
  getNativeProps,
  getId,
  KeyCodes,
  getDocument
} from '../../Utilities';
import {
  mergeStyles
} from '../../Styling';

import { IHoverCardProps, IHoverCardStyles } from './HoverCard.types';
import { ExpandingCard } from './ExpandingCard';
import { ExpandingCardMode, OpenCardMode } from './ExpandingCard.types';
import { getStyles } from './HoverCard.styles';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';

export interface IHoverCardState {
  isHoverCardVisible: boolean;
  mode: ExpandingCardMode;
  openMode: OpenCardMode;
}

export class HoverCard extends BaseComponent<IHoverCardProps, IHoverCardState> {
  public static defaultProps = {
    cardOpenDelay: 500,
    cardDismissDelay: 100,
    expandedCardOpenDelay: 1500,
    instantOpenOnClick: false
  };

  // The wrapping div that gets the hover events
  private _hoverCard: HTMLElement;
  // tslint:disable-next-line:no-unused-variable
  private _expandingCard: ExpandingCard;
  private _dismissTimerId: number;
  private _openTimerId: number;
  private _currentMouseTarget: EventTarget;

  private _styles: IHoverCardStyles;

  // Constructor
  constructor(props: IHoverCardProps) {
    super(props);

    this.state = {
      isHoverCardVisible: false,
      mode: ExpandingCardMode.compact,
      openMode: OpenCardMode.hover
    };
  }

  public componentDidMount() {
    const target = this._getTargetElement();

    this._events.on(target, 'mouseenter', this._cardOpen);
    this._events.on(target, 'mouseleave', this._cardDismiss);
    if (this.props.trapFocus) {
      this._events.on(target, 'keydown', this._cardOpen);
    } else {
      this._events.on(target, 'focus', this._cardOpen);
      this._events.on(target, 'blur', this._cardDismiss);
    }
    if (this.props.instantOpenOnClick) {
      this._events.on(target, 'click', this._instantOpenExpanded);
    } else {
      this._events.on(target, 'mousedown', this._cardDismiss);
      this._events.on(target, 'keydown', this._cardDismiss);
    }
  }

  public componentWillUpdate(newProps: IHoverCardProps, newState: IHoverCardState) {
    if (newState.isHoverCardVisible !== this.state.isHoverCardVisible) {
      if (newState.isHoverCardVisible) {
        this._async.setTimeout(() => {
          this.setState({
            mode: ExpandingCardMode.expanded
          });
        }, this.props.expandedCardOpenDelay!);
        this.props.onCardVisible && this.props.onCardVisible();
      } else {
        this.setState({
          mode: ExpandingCardMode.compact
        });
        this.props.onCardHide && this.props.onCardHide();
      }
    }
  }

  // Render
  public render() {
    const {
      expandingCardProps,
      children,
      id,
      setAriaDescribedBy = true,
      styles: customStyles
    } = this.props;
    const { isHoverCardVisible, mode, openMode } = this.state;
    const hoverCardId = id || getId('hoverCard');

    this._styles = getStyles(customStyles);

    return (
      <div
        className={ mergeStyles(this._styles.host) }
        ref={ this._resolveRef('_hoverCard') }
        aria-describedby={ setAriaDescribedBy && isHoverCardVisible ? hoverCardId : undefined }
      >
        { children }
        { isHoverCardVisible &&
          <ExpandingCard
            componentRef={ this._resolveRef('_expandingCard') }
            { ...getNativeProps(this.props, divProperties) }
            id={ hoverCardId }
            trapFocus={ !!this.props.trapFocus }
            firstFocus={ openMode === OpenCardMode.hotKey }
            targetElement={ this._getTargetElement() }
            onEnter={ this._cardOpen }
            onLeave={ this._executeCardDimiss }
            mode={ mode }
            { ...expandingCardProps }
          />
        }
      </div>
    );
  }

  private _getTargetElement(): HTMLElement {
    const { target } = this.props;

    switch (typeof target) {
      case 'string':
        return getDocument()!.querySelector(target as string) as HTMLElement;

      case 'object':
        return target as HTMLElement;

      default:
        return this._hoverCard;
    }
  }

  // Show HoverCard
  @autobind
  private _cardOpen(ev: MouseEvent) {
    if (ev.type === 'keydown' && !(ev.which === KeyCodes.c)) {
      return;
    }
    this._async.clearTimeout(this._dismissTimerId);
    if (ev.type === 'mouseenter') {
      this._currentMouseTarget = ev.currentTarget;
    }

    this._executeCardOpen(ev);
  }

  @autobind
  private _executeCardOpen(ev: MouseEvent) {
    this._openTimerId = this._async.setTimeout(() => {
      if (!this.state.isHoverCardVisible) {
        this.setState({
          isHoverCardVisible: true,
          mode: ExpandingCardMode.compact,
          openMode: ev.type === 'keydown' ? OpenCardMode.hotKey : OpenCardMode.hover
        });
      }
    }, this.props.cardOpenDelay!);
  }

  // Hide HoverCard
  @autobind
  private _cardDismiss(ev: MouseEvent) {
    if (ev.type === 'keydown' && (ev.which !== KeyCodes.escape)) {
      return;
    }
    this._async.clearTimeout(this._openTimerId);

    // Dismiss if not sticky and currentTarget is the same element that mouse last entered
    if (!this.props.sticky && (this._currentMouseTarget === ev.currentTarget || (ev.which === KeyCodes.escape))) {
      this._executeCardDimiss();
    }
  }

  @autobind
  private _executeCardDimiss() {
    this._dismissTimerId = this._async.setTimeout(() => {
      this.setState({
        isHoverCardVisible: false,
        mode: ExpandingCardMode.compact,
        openMode: OpenCardMode.hover
      });
    }, this.props.cardDismissDelay!);
  }

  // Instant Open the card in Expanded mode
  @autobind
  private _instantOpenExpanded(ev: React.MouseEvent<HTMLDivElement>) {
    this.setState({
      isHoverCardVisible: true,
      mode: ExpandingCardMode.expanded
    });
  }
}
