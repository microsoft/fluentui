import * as React from 'react';
import { BaseComponent, IPoint, getDocument, mergeOverflowKeySequences } from '../../Utilities';
import { Callout, CalloutTargetFunction } from '../../Callout';
import { DirectionalHint } from '../../ContextualMenu';
import { IKeytip, IKeytipProps } from './Keytip.types';
import { KeytipContent } from './KeytipContent';
import { getCalloutStyles } from './Keytip.styles';
import { constructKeytipTargetFromSequences } from '../../utilities/keytips';

/**
 * A callout corresponding to another Fabric component to describe a key sequence that will activate that component
 *
 * @export
 * @class Keytip
 * @extends {BaseComponent<IKeytipProps, {}}>}
 */
export class Keytip extends BaseComponent<IKeytipProps, {}> implements IKeytip {
  // tslint:disable-next-line:no-any
  constructor(props: IKeytipProps, context: any) {
    super(props, context);
  }

  public render(): JSX.Element {
    const {
      keySequences,
      offset,
      overflowSetSequence
    } = this.props;
    let {
      calloutProps
    } = this.props;

    let sequenceToTarget: string;
    // Take into consideration the overflow sequence
    if (overflowSetSequence) {
      sequenceToTarget = constructKeytipTargetFromSequences(mergeOverflowKeySequences(keySequences, overflowSetSequence));
    } else {
      sequenceToTarget = constructKeytipTargetFromSequences(keySequences);
    }
    let keytipTarget: string | CalloutTargetFunction = sequenceToTarget;

    if (offset) {
      // If we have an offset, use a function to calculate the exact point after the
      // item has rendered
      keytipTarget = (): Element | string | MouseEvent | IPoint | null => {
        const currentDoc: Document = getDocument()!;
        const targetEl = currentDoc ? currentDoc.querySelector(sequenceToTarget) as Element : undefined;
        if (targetEl) {
          const targetRect = targetEl.getBoundingClientRect();
          // Add keytip offset to the top-left of the target
          return { x: targetRect.left + offset.x, y: targetRect.top + offset.y };
        }
        return null;
      };
    }

    if (!calloutProps || !calloutProps.directionalHint) {
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
        getStyles={ getCalloutStyles }
        preventDismissOnScroll={ true }
        target={ keytipTarget }
      >
        <KeytipContent { ...this.props } />
      </Callout>
    );
  }
}