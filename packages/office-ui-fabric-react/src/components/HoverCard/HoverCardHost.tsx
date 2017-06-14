/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  BaseComponent,
  autobind,
  css,
  divProperties,
  getNativeProps,
  getId,
  assign,
  memoize
} from '../../Utilities';
import {
  mergeStyles
} from '../../Styling';
import { IHoverCardHostProps, IHoverCardHostStyles } from './HoverCardHost.Props';
import { HoverCard } from './HoverCard';
import { HoverCardDelay } from './HoverCard.Props';

import { getStyles } from './HoverCardHost.styles';

export interface IHoverCardHostState {
  isHoverCardVisible?: boolean;
}

interface IHoverCardClassNames {
  host: string;
}

export class HoverCardHost extends BaseComponent<IHoverCardHostProps, IHoverCardHostState> {
  public static defaultProps = {
    delay: HoverCardDelay.medium
  };

  // The wrapping div that gets the hover events
  private _hoverCardHost: HTMLElement;

  // Constructor
  constructor(props: IHoverCardHostProps) {
    super(props);

    this.state = {
      isHoverCardVisible: false
    };
  }

  // Render
  public render() {
    const {
      calloutProps,
      hoverCardProps,
      content,
      children,
      directionalHint,
      delay,
      id,
      setAriaDescribedBy = true,
      styles: customStyles
    } = this.props;
    const { isHoverCardVisible } = this.state;
    const hoverCardId = id || getId('hoverCard');
    const classNames: IHoverCardClassNames = this._getClassNames(
      getStyles(customStyles)
    );
    return (
      <div
        className={ classNames.host }
        ref={ this._resolveRef('_hoverCardHost') }
        { ...{ onFocusCapture: this._onHoverCardMouseEnter } }
        { ...{ onBlurCapture: this._onHoverCardMouseLeave } }
        onMouseEnter={ this._onHoverCardMouseEnter }
        onMouseLeave={ this._onHoverCardMouseLeave }
        aria-describedby={ setAriaDescribedBy && isHoverCardVisible && content ? hoverCardId : undefined }
      >
        { children }
        { isHoverCardVisible &&
          content ? (
            <HoverCard
              { ...hoverCardProps }
              id={ hoverCardId }
              delay={ delay }
              content={ content }
              targetElement={ this._getTargetElement() }
              directionalHint={ directionalHint }
              calloutProps={ assign(calloutProps, { onDismiss: this._onHoverCardCallOutDismiss, isBeakVisible: false }) }
              { ...getNativeProps(this.props, divProperties) }
            >
            </HoverCard>
          ) : undefined }
      </div>
    );
  }

  private _getTargetElement(): HTMLElement {
    return this._hoverCardHost;
  }

  // Show HoverCard
  @autobind
  private _onHoverCardMouseEnter(ev: any) {
    this.setState({
      isHoverCardVisible: true
    });
  }

  // Hide HoverCard
  @autobind
  private _onHoverCardMouseLeave(ev: any) {
    // this.setState({
    //   isHoverCardVisible: false
    // });
  }

  // Hide HoverCard
  @autobind
  private _onHoverCardCallOutDismiss() {
    this.setState({
      isHoverCardVisible: false
    });
  }

  @memoize
  private _getClassNames(
    styles: IHoverCardHostStyles
    ): IHoverCardClassNames {
    return {
      host: mergeStyles(
        styles.host
      ) as string
    };
  };
}
