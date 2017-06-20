/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  BaseComponent,
  css,
  getNativeProps,
  divProperties,
  memoize,
  autobind
} from '../../Utilities';
import { IHoverCardProps, IHoverCardStyles } from './HoverCard.Props';
import { Callout, ICallout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import { AnimationClassNames, mergeStyles } from '../../Styling';

import { getStyles } from './HoverCard.styles';

export enum HoverCardMode {
  condensed,
  expanded
}

export interface IHoverCardState {
  mode: HoverCardMode
}

export class HoverCard extends BaseComponent<IHoverCardProps, IHoverCardState> {
  public static defaultProps = {
    expandedCardOpenDelay: 1000,
    openExpanded: false
  };

  private _styles: IHoverCardStyles;
  private _callout: ICallout;

  constructor(props: IHoverCardProps) {
    super(props);

    this.state = {
      mode: props.openExpanded ? HoverCardMode.expanded : HoverCardMode.condensed
    };
  }

  public componentWillMount() {
    this._async.setTimeout(() => {
      this.setState({
        mode: HoverCardMode.expanded
      })
    }, this.props.expandedCardOpenDelay);
  }

  public componentWillUpdate(newProps: IHoverCardProps, newState: IHoverCardState) {
    if (newProps.openExpanded != this.props.openExpanded) {
      this.setState({
        mode: newProps.openExpanded ? HoverCardMode.expanded : HoverCardMode.condensed
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
      styles: customStyles,
      onRenderCompactContent,
      onRenderExpandedContent
    } = this.props;
    this._styles = getStyles(customStyles);
    console.log('render: HoverCard');
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
        directionalHint={ DirectionalHint.bottomLeftEdge }
        directionalHintFixed={ true }
        directionalHintFixedHeight={ 540 }
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
    return this.state.mode === HoverCardMode.expanded;
  }

  @autobind
  private _onRenderCompactContent(): JSX.Element {
    return (
      <div className={ css(this._styles.compactCard) }>
        { this.props.onRenderCompactContent(this.props.item) }
      </div>
    );
  }

  @autobind
  private _onRenderExpandedContent(): JSX.Element {
    return (
      <div className={ mergeStyles(this._styles.expandedCard, this.isExpanded && this._styles.expandedCardIsExpanded) as string }>
        { this.props.onRenderExpandedContent(this.props.item) }
      </div>
    );
  }
}
