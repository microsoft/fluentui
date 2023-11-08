import * as React from 'react';
import { classNamesFunction, KeyCodes, Async, initializeComponentRef } from '../../Utilities';
import { ExpandingCardMode } from './ExpandingCard.types';
import { CardCallout } from './CardCallout/CardCallout';
import type { IExpandingCardProps, IExpandingCardStyles, IExpandingCardStyleProps } from './ExpandingCard.types';

const getClassNames = classNamesFunction<IExpandingCardStyleProps, IExpandingCardStyles>();

export interface IExpandingCardState {
  firstFrameRendered: boolean;
  needsScroll: boolean;
}

export class ExpandingCardBase extends React.Component<IExpandingCardProps, IExpandingCardState> {
  public static defaultProps = {
    compactCardHeight: 156,
    expandedCardHeight: 384,
    directionalHintFixed: true,
  };

  private _classNames: { [key in keyof IExpandingCardStyles]: string };
  private _expandedElem = React.createRef<HTMLDivElement>();
  private _async: Async;

  constructor(props: IExpandingCardProps) {
    super(props);

    this._async = new Async(this);
    initializeComponentRef(this);

    this.state = {
      firstFrameRendered: false,
      needsScroll: false,
    };
  }

  public componentDidMount(): void {
    this._checkNeedsScroll();
  }

  public componentWillUnmount(): void {
    this._async.dispose();
  }

  public render(): JSX.Element {
    const { styles, compactCardHeight, expandedCardHeight, theme, mode, className } = this.props;
    const { needsScroll, firstFrameRendered } = this.state;

    const finalHeight = compactCardHeight! + expandedCardHeight!;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      compactCardHeight,
      className,
      expandedCardHeight,
      needsScroll,
      expandedCardFirstFrameRendered: mode === ExpandingCardMode.expanded && firstFrameRendered,
    });

    const content: JSX.Element = (
      <div onMouseEnter={this.props.onEnter} onMouseLeave={this.props.onLeave} onKeyDown={this._onKeyDown}>
        {this._onRenderCompactCard()}
        {this._onRenderExpandedCard()}
      </div>
    );

    return (
      <CardCallout {...this.props} content={content} finalHeight={finalHeight} className={this._classNames.root} />
    );
  }

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    // eslint-disable-next-line deprecation/deprecation
    if (ev.which === KeyCodes.escape) {
      this.props.onLeave && this.props.onLeave(ev);
    }
  };

  private _onRenderCompactCard = (): JSX.Element => {
    return <div className={this._classNames.compactCard}>{this.props.onRenderCompactCard!(this.props.renderData)}</div>;
  };

  private _onRenderExpandedCard = (): JSX.Element => {
    // firstFrameRendered helps in initially setting height of expanded card to 1px, even if mode prop is set to
    // ExpandingCardMode.expanded on first render. This is to make sure transition animation takes place.
    !this.state.firstFrameRendered &&
      this._async.requestAnimationFrame(() => {
        this.setState({
          firstFrameRendered: true,
        });
      });

    return (
      <div className={this._classNames.expandedCard} ref={this._expandedElem}>
        <div className={this._classNames.expandedCardScroll}>
          {this.props.onRenderExpandedCard && this.props.onRenderExpandedCard(this.props.renderData)}
        </div>
      </div>
    );
  };

  private _checkNeedsScroll = (): void => {
    const { expandedCardHeight } = this.props;
    this._async.requestAnimationFrame(() => {
      if (this._expandedElem.current && this._expandedElem.current.scrollHeight >= expandedCardHeight!) {
        this.setState({
          needsScroll: true,
        });
      }
    });
  };
}
