import * as React from 'react';
import { BaseComponent, mergeOverflowKeySequences, constructKeytipTargetFromSequences } from '../../Utilities';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../ContextualMenu';
import { IKeytip, IKeytipProps } from './Keytip.types';
import { KeytipContent } from './KeytipContent';
import { getCalloutStyles, getCalloutOffsetStyles } from './Keytip.styles';

/**
 * A callout corresponding to another Fabric component to describe a key sequence that will activate that component
 *
 * @export
 * @class Keytip
 * @extends {BaseComponent<IKeytipProps, {}}>}
 */
export class Keytip extends BaseComponent<IKeytipProps, {}> implements IKeytip {
  public render(): JSX.Element {
    const {
      keySequences,
      offset,
      overflowSetSequence
    } = this.props;
    let {
      calloutProps
    } = this.props;

    let keytipTarget: string;
    // Take into consideration the overflow sequence
    if (overflowSetSequence) {
      keytipTarget = constructKeytipTargetFromSequences(mergeOverflowKeySequences(keySequences, overflowSetSequence));
    } else {
      keytipTarget = constructKeytipTargetFromSequences(keySequences);
    }

    if (offset) {
      // Set callout to top-left corner, will be further positioned in
      // getCalloutOffsetStyles
      calloutProps = {
        ...calloutProps,
        coverTarget: true,
        directionalHint: DirectionalHint.topLeftEdge
      };
    }

    if (!calloutProps || calloutProps.directionalHint === undefined) {
      // Default callout directional hint to BottomCenter
      calloutProps = {
        ...calloutProps,
        directionalHint: DirectionalHint.bottomCenter
      };
    }

    return (
      <Callout
        { ...calloutProps }
        isBeakVisible={ false }
        doNotLayer={ true }
        minPagePadding={ 0 }
        getStyles={ offset ? getCalloutOffsetStyles(offset) : getCalloutStyles }
        preventDismissOnScroll={ true }
        target={ keytipTarget }
      >
        <KeytipContent { ...this.props } />
      </Callout>
    );
  }
}