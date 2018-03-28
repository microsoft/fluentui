import * as React from 'react';
import { BaseComponent, IRenderComponent } from '../../Utilities';
import { IKeytipProps } from './Keytip.types';
import { getNativeKeytipProps, registerKeytip, unregisterKeytip, updateKeytip } from '../../utilities/keytips';

export interface IKeytipHostProps {
  keytipProps?: IKeytipProps;
  ariaDescribedBy?: string;
}

/**
 * A small element to help the target component correctly read out its aria-describedby for its Keytip
 *
 * @export
 * @class KeytipHost
 * @extends {BaseComponent<IKeytipProps, {}}>}
 */
export class KeytipHost extends BaseComponent<IKeytipHostProps & IRenderComponent<{}>, {}> {
  private _uniqueId: string;

  public componentDidMount() {
    // Register Keytip in KeytipManager
    if (this.props.keytipProps) {
      this._uniqueId = registerKeytip({ ...this.props.keytipProps });
    }
  }

  public componentWillUnmount() {
    // Unregister Keytip in KeytipManager
    this.props.keytipProps && unregisterKeytip({ ...this.props.keytipProps }, this._uniqueId);
  }

  public componentDidUpdate() {
    // Update Keytip in KeytipManager
    this.props.keytipProps && updateKeytip({ ...this.props.keytipProps }, this._uniqueId);
  }

  public render(): JSX.Element {
    const { children, keytipProps, ariaDescribedBy } = this.props;
    let nativeKeytipProps: any = {};
    if (keytipProps) {
      nativeKeytipProps = getNativeKeytipProps(keytipProps);
      if (ariaDescribedBy) {
        // Append our aria-describedby to the one given
        nativeKeytipProps['aria-describedby'] = ariaDescribedBy + nativeKeytipProps['aria-describedby'];
      }
    }
    return children(nativeKeytipProps);
  }
}
