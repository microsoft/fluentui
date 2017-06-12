/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  BaseComponent,
  css,
  getNativeProps,
  divProperties
} from '../../Utilities';
import { IHoverCardProps, HoverCardDelay } from './HoverCard.Props';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import * as stylesImport from './HoverCard.scss';
const styles: any = stylesImport;
import { AnimationClassNames } from '../../Styling';

export class HoverCard extends BaseComponent<IHoverCardProps, any> {

  // Specify default props values
  public static defaultProps = {
    directionalHint: DirectionalHint.topCenter,
    delay: HoverCardDelay.medium,
    calloutProps: {
      isBeakVisible: false,
      gapSpace: 0,
      setInitialFocus: true,
      doNotLayer: false
    }
  };

  public render() {
    const {
      targetElement,
      content,
      calloutProps,
      directionalHint,
      delay,
      id,
      onRenderContent = this._onRenderContent
    } = this.props;

    return (
      <Callout
        className={ css(
          'ms-HoverCard',
          AnimationClassNames.fadeIn200,
          styles.root, {
            [styles.hasMediumDelay]: delay === HoverCardDelay.medium
          }
        ) }
        targetElement={ targetElement }
        directionalHint={ directionalHint }
        {...calloutProps}
        { ...getNativeProps(this.props, divProperties) }
      >
        <div className={ css('ms-HoverCard-content', styles.content) } id={ id } role='tooltip'>
          { onRenderContent(this.props, this._onRenderContent) }
        </div>
      </Callout >
    );
  }

  private _onRenderContent(props: IHoverCardProps): JSX.Element {
    return (
      <p className={ css('ms-HoverCard-subText', styles.subText) }>
        { props.content }
      </p>
    );
  }
}
