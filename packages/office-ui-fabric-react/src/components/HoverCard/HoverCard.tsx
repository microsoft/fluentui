/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  BaseComponent,
  css,
  getNativeProps,
  divProperties,
  memoize
} from '../../Utilities';
import { IHoverCardProps, HoverCardDelay, IHoverCardStyles } from './HoverCard.Props';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import { AnimationClassNames, mergeStyles } from '../../Styling';

import { getStyles } from './HoverCard.styles';

export class HoverCard extends BaseComponent<IHoverCardProps, any> {

  // Specify default props values
  public static defaultProps = {
    directionalHint: DirectionalHint.bottomAutoEdge,
    delay: HoverCardDelay.medium
  };

  private _styles: IHoverCardStyles;

  public render() {
    const {
      targetElement,
      content,
      calloutProps,
      directionalHint,
      delay,
      id,
      styles: customStyles
    } = this.props;
    this._styles = getStyles(customStyles);

    return (
      <Callout
        className={ css(
          'ms-HoverCard',
          AnimationClassNames.fadeIn200,
          this._styles.root
        ) }
        targetElement={ targetElement }
        directionalHint={ directionalHint }
        {...calloutProps}
        { ...getNativeProps(this.props, divProperties) }
      >
        <div className={ css('ms-HoverCard-card', this._styles.card) } id={ id }>
          { this._onRenderContent() }
        </div>
      </Callout >
    );
  }

  private _onRenderContent(): JSX.Element {
    return (
      <p className={ css('ms-HoverCard-subText', this._styles.content) }>
        { this.props.content }
      </p>
    );
  }
}
