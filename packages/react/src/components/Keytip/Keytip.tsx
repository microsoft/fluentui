import * as React from 'react';
import { getFirstVisibleElementFromSelector } from '../../Utilities';
import { mergeOverflows, ktpTargetFromSequences } from '../../utilities/keytips/KeytipUtils';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../ContextualMenu';
import { KeytipContent } from './KeytipContent';
import { getCalloutStyles, getCalloutOffsetStyles } from './Keytip.styles';
import type { IKeytipProps } from './Keytip.types';
import type { Target } from '@fluentui/react-hooks';

/**
 * A callout corresponding to another Fabric component to describe a key sequence that will activate that component
 */
export class Keytip extends React.Component<IKeytipProps, {}> {
  public render(): JSX.Element {
    const { keySequences, offset, overflowSetSequence } = this.props;
    let { calloutProps } = this.props;

    let keytipTarget: Target;
    // Take into consideration the overflow sequence
    if (overflowSetSequence) {
      keytipTarget = ktpTargetFromSequences(mergeOverflows(keySequences, overflowSetSequence));
    } else {
      keytipTarget = ktpTargetFromSequences(keySequences);
    }

    const element = getFirstVisibleElementFromSelector(keytipTarget);

    if (!element) {
      return <></>;
    }

    keytipTarget = element;

    if (offset) {
      // Set callout to top-left corner, will be further positioned in
      // getCalloutOffsetStyles
      calloutProps = {
        coverTarget: true,
        directionalHint: DirectionalHint.topLeftEdge,
        ...calloutProps,
      };
    }

    if (!calloutProps || calloutProps.directionalHint === undefined) {
      // Default callout directional hint to BottomCenter
      calloutProps = {
        ...calloutProps,
        directionalHint: DirectionalHint.bottomCenter,
      };
    }

    return (
      <Callout
        {...calloutProps}
        isBeakVisible={false}
        doNotLayer={true}
        minPagePadding={0}
        styles={offset ? getCalloutOffsetStyles(offset) : getCalloutStyles}
        preventDismissOnScroll={true}
        target={keytipTarget}
      >
        <KeytipContent {...this.props} />
      </Callout>
    );
  }
}
