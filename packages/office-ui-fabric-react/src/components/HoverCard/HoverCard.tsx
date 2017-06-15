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
import { IHoverCardProps, HoverCardDelay, IHoverCardStyles } from './HoverCard.Props';
import { Callout, ICallout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import { AnimationClassNames, mergeStyles } from '../../Styling';

import { getStyles } from './HoverCard.styles';

export enum HoverCardView {
  condensed,
  expanded
}

export interface IHoverCardState {
  view: HoverCardView
}

export class HoverCard extends BaseComponent<IHoverCardProps, IHoverCardState> {
  private _styles: IHoverCardStyles;
  private _mountTimerId: number;
  private _callout: ICallout;

  constructor(props: IHoverCardProps) {
    super(props);

    this.state = {
      view: HoverCardView.condensed
    };
    this._mountTimerId = 0;
  }

  public componentWillMount() {
    this._mountTimerId = this._async.setTimeout(this._setExpanded, 1000)
  }

  public componentWillUnmount() {
    this._mountTimerId = 0;
    this._async.dispose();
  }

  public render() {
    const {
      targetElement,
      calloutProps,
      id,
      styles: customStyles,
      onRenderCompactContent,
      onRenderExpandedContent
    } = this.props;
    this._styles = getStyles(customStyles);

    return (
      <Callout
        componentRef={ c => this._callout = c }
        className={ css(
          AnimationClassNames.fadeIn200,
          this._styles.root
        ) }
        targetElement={ targetElement }
        {...calloutProps}
        { ...getNativeProps(this.props, divProperties) }
      >
        { this._onRenderCompactContent() }
        { this.isExpanded && this._onRenderExpandedContent() }
      </Callout >
    );
  }

  public get isExpanded(): boolean {
    return this.state.view === HoverCardView.expanded;
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
      <div className={ css(AnimationClassNames.slideDownIn20, this._styles.expandedCard) }>
        { this.props.onRenderExpandedContent(this.props.item) }
      </div>
    );
  }

  @autobind
  private _setExpanded() {
    this.setState({
      view: HoverCardView.expanded
    });
  }
}
