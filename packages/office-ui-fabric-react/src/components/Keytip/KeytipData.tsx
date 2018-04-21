import * as React from 'react';
import { BaseComponent, IRenderComponent } from '../../Utilities';
import { IKeytipProps } from './Keytip.types';
import { getNativeKeytipProps, registerKeytip, unregisterKeytip, updateKeytip } from '../../utilities/keytips';

export interface IKeytipDataProps {
  keytipProps?: IKeytipProps;
  ariaDescribedBy?: string;
  disabled?: boolean;
}

/**
 * A small element to help the target component correctly read out its aria-describedby for its Keytip
 *
 * @export
 * @class KeytipData
 * @extends {BaseComponent<IKeytipDataProps & IRenderComponent<{}>, {}>}
 */
export class KeytipData extends BaseComponent<IKeytipDataProps & IRenderComponent<{}>, {}> {
  private _uniqueId: string;

  public componentDidMount() {
    // Register Keytip in KeytipManager
    if (this.props.keytipProps) {
      this._uniqueId = registerKeytip(this._getKeytipProps());
    }
  }

  public componentWillUnmount() {
    // Unregister Keytip in KeytipManager
    this.props.keytipProps && unregisterKeytip(this._getKeytipProps(), this._uniqueId);
  }

  public componentDidUpdate() {
    // Update Keytip in KeytipManager
    this.props.keytipProps && updateKeytip(this._getKeytipProps(), this._uniqueId);
  }

  public render(): JSX.Element {
    const { children, keytipProps, ariaDescribedBy } = this.props;
    let nativeKeytipProps: any = {};
    if (keytipProps) {
      nativeKeytipProps = getNativeKeytipProps(keytipProps, ariaDescribedBy);
    }
    return children(nativeKeytipProps);
  }

  private _getKeytipProps(): IKeytipProps {
    return {
      disabled: this.props.disabled,
      ...this.props.keytipProps!,
    };
  }
}
