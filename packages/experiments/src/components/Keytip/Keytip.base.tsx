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
  visible?: boolean;
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
  public static defaultProps: Partial<IKeytipProps> = {
    visible: false
  };

  private _classNames: {[key in keyof IKeytipStyles]: string };

  // tslint:disable-next-line:no-any
  constructor(props: IKeytipProps, context: any) {
    super(props, context);

    this.state = {
      visible: props.visible || false
    };
  }

  public componentWillReceiveProps(nextProps: IKeytipProps): void {
    let { visible } = nextProps;

    this.setState({
      visible: visible
    });
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

    const {
      visible
    } = this.state;

    this._classNames = getClassNames(
      getStyles!,
      {
        theme: theme!,
        disabled,
        visible
      }
    );

    let onKeytipDismiss = this._onKeytipDismiss.bind(this);

    return (
      <Callout
        { ...calloutProps }
        isBeakVisible={ false }
        doNotLayer={ true }
        directionalHint={ DirectionalHint.bottomCenter }
        target={ keytipTarget }
        getStyles={ getCalloutStyles }
        onDismiss={ onKeytipDismiss }
        className={ this._classNames.calloutContainer }
      >
        <div className={ this._classNames.container }>
          <span className={ this._classNames.root }>{ content }</span>
        </div >
      </Callout>
    );
  }

  // tslint:disable-next-line:no-any
  private _onKeytipDismiss(ev?: Event | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void {
    this.setState({
      visible: false
    });
    // TODO: should call manager.exitKeytipMode here but when you do it throws a big error in the console
  }

}