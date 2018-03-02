import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { Callout } from '../../Callout';
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
      calloutProps,
      keySequences,
      offset = 0 // Default value for gap is 0
    } = this.props;

    return (
      <Callout
        { ...calloutProps }
        gapSpace={ offset }
        isBeakVisible={ false }
        doNotLayer={ true }
        directionalHint={ DirectionalHint.bottomCenter }
        target={ constructKeytipTargetFromSequences(keySequences) }
        getStyles={ getCalloutStyles }
        preventDismissOnScroll={ true }
      >
        <KeytipContent {...this.props} />
      </Callout>
    );
  }
}