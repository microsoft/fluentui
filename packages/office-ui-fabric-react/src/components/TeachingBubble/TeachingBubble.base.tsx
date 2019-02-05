import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { TeachingBubbleContent } from './TeachingBubbleContent';
import {
  ITeachingBubbleProps,
  ITeachingBubbleStyleProps,
  ITeachingBubbleStyles,
  ITeachingBubbleSubComponentStyles
} from './TeachingBubble.types';
import { Callout, ICalloutProps } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';

const getClassNames = classNamesFunction<ITeachingBubbleStyleProps, ITeachingBubbleStyles>();

export interface ITeachingBubbleState {
  isTeachingBubbleVisible?: boolean;
}

export class TeachingBubbleBase extends BaseComponent<ITeachingBubbleProps, ITeachingBubbleState> {
  public static defaultProps = {
    /**
     * Default calloutProps is deprecated in favor of private `_defaultCalloutProps`.
     * Remove in next release.
     * @deprecated In favor of private `_defaultCalloutProps`.
     */
    calloutProps: {
      beakWidth: 16,
      gapSpace: 0,
      setInitialFocus: true,
      doNotLayer: false,
      directionalHint: DirectionalHint.rightCenter
    }
  };

  public rootElement = React.createRef<HTMLDivElement>();
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
    const { onDismiss, ...rest } = this.props;
    const { calloutProps: setCalloutProps, targetElement, isWide, styles, theme } = rest;
    const calloutProps = { ...this._defaultCalloutProps, ...setCalloutProps };
    const stylesProps: ITeachingBubbleStyleProps = {
      theme: theme!,
      isWide,
      calloutClassName: calloutProps ? calloutProps.className : undefined
    };

    const classNames = getClassNames(styles, stylesProps);
    const calloutStyles = classNames.subComponentStyles
      ? (classNames.subComponentStyles as ITeachingBubbleSubComponentStyles).callout
      : undefined;

    return (
      <Callout
        target={targetElement}
        onDismiss={onDismiss}
        {...calloutProps}
        className={classNames.root}
        styles={calloutStyles}
        hideOverflow
      >
        <div ref={this.rootElement}>
          <TeachingBubbleContent {...rest} />
        </div>
      </Callout>
    );
  }
}
