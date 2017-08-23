/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  BaseComponent,
  autobind,
  css,
  divProperties,
  getNativeProps,
  getId
} from '../../Utilities';
import { IHoverCardProps, IHoverCardStyles } from './HoverCard.Props';
import { ExpandingCard } from './ExpandingCard';
import { ExpandingCardMode } from './ExpandingCard.Props';

import { getStyles } from './HoverCard.styles';

export interface IHoverCardState {
  isHoverCardVisible: boolean;
  mode: ExpandingCardMode;
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
  private _expandingCard: ExpandingCard;
  private _dismissTimerId: number;
  private _openTimerId: number;

  private _styles: IHoverCardStyles;

  // Constructor
  constructor(props: IHoverCardProps) {
    super(props);

    this.state = {
      isHoverCardVisible: false,
      mode: ExpandingCardMode.compact
    };
  }

  public componentDidMount() {
    const target = this._getTargetElement();

    this._events.on(target, 'mouseenter', this._cardOpen);
    this._events.on(target, 'mouseleave', this._cardDismiss);
    this._events.on(target, 'focus', this._cardOpen);
    this._events.on(target, 'blur', this._cardDismiss);
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
      } else {
        this.setState({
          mode: ExpandingCardMode.compact
        });
      }
    }
  }

  // Render
  public render() {
    const {
      expandingCardProps,
      children,
      id,
      instantOpenOnClick,
      setAriaDescribedBy = true,
      styles: customStyles
    } = this.props;
    const { isHoverCardVisible, mode } = this.state;
    const hoverCardId = id || getId('hoverCard');

    this._styles = getStyles(customStyles);

    return (
      <div
        className={ css(this._styles.host) }
        ref={ this._resolveRef('_hoverCard') }
        aria-describedby={ setAriaDescribedBy && isHoverCardVisible ? hoverCardId : undefined }
      >
        { children }
        { isHoverCardVisible &&
          <ExpandingCard
            componentRef={ this._resolveRef('_expandingCard') }
            { ...getNativeProps(this.props, divProperties) }
            id={ hoverCardId }
            targetElement={ this._getTargetElement() }
            onEnter={ this._cardOpen }
            onLeave={ this._cardDismiss }
            mode={ mode }
            { ...expandingCardProps }
          />
        }
      </div>
    );
  }

  private _getTargetElement(): HTMLElement {
    return this.props.target ? this.props.target : this._hoverCard;
  }

  // Show HoverCard
  @autobind
  private _cardOpen(ev: MouseEvent) {
    this._async.clearTimeout(this._dismissTimerId);

    this._openTimerId = this._async.setTimeout(() => {
      if (!this.state.isHoverCardVisible) {
        this.setState({
          isHoverCardVisible: true,
          mode: ExpandingCardMode.compact
        });
      }
    }, this.props.cardOpenDelay!);
  }

  // Hide HoverCard
  @autobind
  private _cardDismiss(ev: MouseEvent) {
    const { type, x, y } = ev;
    this._async.clearTimeout(this._openTimerId);

    this._dismissTimerId = this._async.setTimeout(() => {
      if (!(this.props.sticky && type === 'mouseleave')) {
        const rect = this._expandingCard.element.getBoundingClientRect();
        // handle the case when dismiss is called by target when cursor moves towards the card.
        const isInsideCard: boolean = x <= rect.right && x >= rect.left && y >= rect.top;
        if (!isInsideCard) {
          this.setState({
            isHoverCardVisible: false,
            mode: ExpandingCardMode.compact
          });
        }
      }
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
