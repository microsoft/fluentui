/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  BaseComponent,
  css,
  getNativeProps,
  divProperties
} from '../../Utilities';
import { ITooltipProps, TooltipDelay } from './Tooltip.Props';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import * as stylesImport from './Tooltip.scss';
const styles: any = stylesImport;
import { AnimationClassNames, mergeStyles } from '../../Styling';

export class Tooltip extends BaseComponent<ITooltipProps, any> {

  // Specify default props values
  public static defaultProps = {
    directionalHint: DirectionalHint.topCenter,
    delay: TooltipDelay.medium,
    maxWidth: '364px',
    calloutProps: {
      isBeakVisible: true,
      beakWidth: 16,
      gapSpace: 0,
      setInitialFocus: true,
      doNotLayer: false
    }
  };

  public render() {
    const {
      targetElement,
      calloutProps,
      directionalHint,
      directionalHintForRTL,
      delay,
      id,
      maxWidth,
      onRenderContent = this._onRenderContent
  } = this.props;

    return (
      <Callout
        target={ targetElement }
        directionalHint={ directionalHint }
        directionalHintForRTL={ directionalHintForRTL }
        {...calloutProps}
        { ...getNativeProps(this.props, divProperties) }
        className={ mergeStyles(
          'ms-Tooltip',
          AnimationClassNames.fadeIn200,
          styles.root,
          (delay === TooltipDelay.medium) && styles.hasMediumDelay,
          (maxWidth !== null) && { maxWidth: maxWidth },
          this.props.className
        ) }
      >
        <div className={ css('ms-Tooltip-content', styles.content) } id={ id } role='tooltip'>
          { onRenderContent(this.props, this._onRenderContent) }
        </div>
      </Callout >
    );
  }

  private _onRenderContent(props: ITooltipProps): JSX.Element {
    return (
      <p className={ css('ms-Tooltip-subText', styles.subText) }>
        { props.content }
      </p>
    );
  }
}
