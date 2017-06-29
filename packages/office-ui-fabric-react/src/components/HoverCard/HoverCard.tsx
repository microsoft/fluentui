/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  BaseComponent,
  css,
  getNativeProps,
  divProperties,
  customizable,
  autobind,
  getRTL
} from '../../Utilities';
import { IHoverCardProps, IHoverCardStyles } from './HoverCard.Props';
import { Callout, ICallout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import { AnimationClassNames, mergeStyles } from '../../Styling';

import { getStyles } from './HoverCard.styles';

export enum HoverCardMode {
  compact,
  expanded
}

export interface IHoverCardState {
  mode: HoverCardMode;
  needsScroll: boolean;
}

@customizable(['theme'])
export class HoverCard extends BaseComponent<IHoverCardProps, IHoverCardState> {
  public static defaultProps = {
    expandedCardOpenDelay: 1000,
    openExpanded: false,
    compactCardHeight: 156,
    expandedCardHeight: 384
  };

  private _styles: IHoverCardStyles;
  private _callout: ICallout;
  private _expandedElem: HTMLDivElement;

  constructor(props: IHoverCardProps) {
    super(props);

    this.state = {
      mode: props.openExpanded ? HoverCardMode.expanded : HoverCardMode.compact,
      needsScroll: false
    };
  }

  public componentWillMount() {
    this._async.setTimeout(() => {
      this.setState({
        mode: HoverCardMode.expanded
      });
    }, this.props.expandedCardOpenDelay);
  }

  public componentDidMount() {
    if (this._expandedElem && this._expandedElem.scrollHeight >= this.props.expandedCardHeight) {
      this.setState({
        needsScroll: true
      });
    }
  }

  public componentWillUpdate(newProps: IHoverCardProps, newState: IHoverCardState) {
    if (newProps.openExpanded !== this.props.openExpanded) {
      this.setState({
        mode: newProps.openExpanded ? HoverCardMode.expanded : HoverCardMode.compact
      });
    }
  }

  public componentWillUnmount() {
    this._async.dispose();
  }

  public render() {
    const {
      targetElement,
      id,
      theme,
      styles: customStyles,
      onRenderCompactContent,
      onRenderExpandedContent,
      compactCardHeight,
      expandedCardHeight
    } = this.props;
    this._styles = getStyles(theme, customStyles);

    return (
      <Callout
        componentRef={ c => this._callout = c }
        className={ css(
          AnimationClassNames.scaleUpIn100,
          this._styles.root
        ) }
        targetElement={ targetElement }
        { ...getNativeProps(this.props, divProperties) }
        isBeakVisible={ false }
        directionalHint={ getRTL() ? DirectionalHint.bottomRightEdge : DirectionalHint.bottomLeftEdge }
        directionalHintFixed={ true }
        finalHeight={ compactCardHeight + expandedCardHeight }
        minPagePadding={ 24 }
      >
        <div
          { ...{ onFocusCapture: this.props.onEnter } }
          { ...{ onBlurCapture: this.props.onDismiss } }
          onMouseEnter={ this.props.onEnter }
          onMouseLeave={ this.props.onDismiss }
        >
          { this._onRenderCompactContent() }
          { this._onRenderExpandedContent() }
        </div>
      </Callout >
    );
  }

  public get isExpanded(): boolean {
    return this.state.mode !== HoverCardMode.compact;
  }

  @autobind
  private _onRenderCompactContent(): JSX.Element {
    return (
      <div className={ mergeStyles(this._styles.compactCard, { height: this.props.compactCardHeight + 'px' }) as string }>
        { this.props.onRenderCompactContent(this.props.item) }
      </div>
    );
  }

  @autobind
  private _onRenderExpandedContent(): JSX.Element {
    return (
      <div className={ mergeStyles(
        this._styles.expandedCard,
        this.isExpanded && { height: this.props.expandedCardHeight + 'px' },
        this.state.needsScroll && { 'overflow-y': 'auto' }
      ) as string }
        ref={ this._resolveRef('_expandedElem') }
      >
        { this.props.onRenderExpandedContent && this.props.onRenderExpandedContent(this.props.item) }
      </div>
    );
  }

  @autobind
  private _checkNeedsScroll(): void {
    if (this._expandedElem) {
      this._async.requestAnimationFrame(() => {
        if (this._expandedElem.scrollHeight >= this.props.expandedCardHeight) {
          this.setState({
            needsScroll: true
          });
        }
      });
    }
  }
}
