import * as React from 'react';
import { BaseComponent, css, createRef } from '../../Utilities';
import { TeachingBubbleContent } from './TeachingBubbleContent';
import { ITeachingBubbleProps } from './TeachingBubble.types';
import { Callout, ICalloutProps } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import * as stylesImport from './TeachingBubble.scss';
const styles: any = stylesImport;

export interface ITeachingBubbleState {
  isTeachingBubbleVisible?: boolean;
}

export class TeachingBubble extends BaseComponent<ITeachingBubbleProps, ITeachingBubbleState> {
  public static defaultProps = {
    /**
     * Default calloutProps is deprecated in favor of private _defaultCalloutProps.
     * Remove in next release.
     * @deprecated
     */
    calloutProps: {
      beakWidth: 16,
      gapSpace: 0,
      setInitialFocus: true,
      doNotLayer: false,
      directionalHint: DirectionalHint.rightCenter
    }
  };

  public rootElement = createRef<HTMLDivElement>();
  private _defaultCalloutProps: ICalloutProps;

  // Constructor
  constructor(props: ITeachingBubbleProps) {
    super(props);

    this.state = {};

    this._defaultCalloutProps = {
      beakWidth: 16,
      gapSpace: 0,
      setInitialFocus: true,
      doNotLayer: false,
      directionalHint: DirectionalHint.rightCenter
    };
  }

  public focus(): void {
    if (this.rootElement.current) {
      this.rootElement.current.focus();
    }
  }

  public render(): JSX.Element {
    const { calloutProps: setCalloutProps, targetElement, onDismiss, isWide } = this.props;
    const calloutProps = { ...this._defaultCalloutProps, ...setCalloutProps };

    return (
      <Callout
        target={targetElement}
        onDismiss={onDismiss}
        {...calloutProps}
        className={css(
          'ms-TeachingBubble',
          styles.root,
          isWide ? styles.wideCallout : null,
          calloutProps ? calloutProps.className : undefined
        )}
      >
        <div ref={this.rootElement}>
          <TeachingBubbleContent {...this.props} />
        </div>
      </Callout>
    );
  }
}
