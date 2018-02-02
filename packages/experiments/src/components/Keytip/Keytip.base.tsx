import * as React from 'react';
import { IKeytip, IKeytipProps, IKeytipStyleProps, IKeytipStyles } from './Keytip.types';
import {
  BaseComponent,
  customizable
} from '../../Utilities';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { DirectionalHint } from 'office-ui-fabric-react/lib/ContextualMenu';
import { getCalloutStyles } from './Keytip.styles';
import { classNamesFunction } from '../../Utilities';

const getClassNames = classNamesFunction<IKeytipStyleProps, IKeytipStyles>();

export interface IKeytipState {
}

/**
 * A callout corresponding to another Fabric component to describe a key sequence that will activate that component
 *
 * @export
 * @class Keytip
 * @extends {BaseComponent<IKeytipProps, IKeytipState>}
 */
@customizable('Keytip', ['theme'])
export class KeytipBase extends BaseComponent<IKeytipProps, IKeytipState> implements IKeytip {
  private _classNames: {[key in keyof IKeytipStyles]: string };

  // tslint:disable-next-line:no-any
  constructor(props: IKeytipProps, context: any) {
    super(props, context);
  }
  public render(): JSX.Element {
    const {
      content,
      keytipTarget,
      calloutProps,
      getStyles,
      theme,
      disabled
    } = this.props;

    this._classNames = getClassNames(
      getStyles!,
      {
        theme: theme!,
        disabled
      }
    );

    return (
      <Callout
        { ...calloutProps }
        isBeakVisible={ false }
        // doNotLayer={ true }
        directionalHint={ DirectionalHint.bottomCenter }
        target={ keytipTarget }
        getStyles={ getCalloutStyles }
      >
        <div className={ this._classNames.container }>
          <span className={ this._classNames.root }>{ content }</span>
        </div >
      </Callout>
    );
  }
}