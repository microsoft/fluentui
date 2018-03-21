import * as React from 'react';
import * as PropTypes from 'prop-types';
import { BaseComponent, IKeySequence, convertSequencesToKeytipID, IRenderComponent } from '../../Utilities';
import { IKeytip, IKeytipProps } from './Keytip.types';
import { KeytipManager, getNativeKeytipProps } from '../../utilities/keytips';

export interface IKeytipHostProps {
  keytipProps?: IKeytipProps;
  ariaDescribedBy?: string;
}

/**
 * A small element to help the target element correctly read out its aria-describedby for its Keytip
 *
 * @export
 * @class KeytipHost
 * @extends {BaseComponent<IKeytipProps, {}}>}
 */
export class KeytipHost extends BaseComponent<IKeytipHostProps & IRenderComponent<{}>, {}> {
  private _keytipManager: KeytipManager = KeytipManager.getInstance();

  public componentDidMount() {
    // Register Keytip in KeytipManager
    this.props.keytipProps && this._keytipManager.registerKeytip(this.props.keytipProps);
  }

  public componentWillUnmount() {
    // Unregister Keytip in KeytipManager
    this.props.keytipProps && this._keytipManager.unregisterKeytip(this.props.keytipProps);
  }

  public componentDidUpdate() {
    // Update Keytip in KeytipManager
    this.props.keytipProps && this._keytipManager.updateKeytip(this.props.keytipProps);
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
