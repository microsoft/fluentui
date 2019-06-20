import * as React from 'react';
import { IRenderComponent, mergeAriaAttributeValues } from '../../Utilities';
import { IKeytipDataProps } from './KeytipData.types';
import { IKeytipProps } from '../../Keytip';
import { KeytipManager } from '../../utilities/keytips/KeytipManager';
import { mergeOverflows, sequencesToID, getAriaDescribedBy } from '../../utilities/keytips/KeytipUtils';

/**
 * A small element to help the target component correctly read out its aria-describedby for its Keytip
 * {@docCategory Keytips}
 */
export class KeytipData extends React.Component<IKeytipDataProps & IRenderComponent<{}>, {}> {
  private _uniqueId: string;
  private _keytipManager: KeytipManager = KeytipManager.getInstance();

  public componentDidMount() {
    // Register Keytip in KeytipManager
    if (this.props.keytipProps) {
      this._uniqueId = this._keytipManager.register(this._getKtpProps());
    }
  }

  public componentWillUnmount() {
    // Unregister Keytip in KeytipManager
    this.props.keytipProps && this._keytipManager.unregister(this._getKtpProps(), this._uniqueId);
  }

  public componentDidUpdate(prevProps: IKeytipDataProps & IRenderComponent<{}>) {
    if (prevProps.keytipProps !== this.props.keytipProps || prevProps.disabled !== this.props.disabled) {
      // If keytipProps or disabled has changed update Keytip in KeytipManager
      this.props.keytipProps && this._keytipManager.update(this._getKtpProps(), this._uniqueId);
    }
  }

  public render(): JSX.Element {
    const { children, keytipProps, ariaDescribedBy } = this.props;
    let nativeKeytipProps: any = {};
    if (keytipProps) {
      nativeKeytipProps = this._getKtpAttrs(keytipProps, ariaDescribedBy);
    }
    return children(nativeKeytipProps);
  }

  private _getKtpProps(): IKeytipProps {
    return {
      disabled: this.props.disabled,
      ...this.props.keytipProps!
    };
  }

  /**
   * Gets the aria- and data- attributes to attach to the component
   * @param keytipProps - props for Keytip
   * @param describedByPrepend - ariaDescribedBy value to prepend
   */
  private _getKtpAttrs(keytipProps: IKeytipProps, describedByPrepend?: string): any {
    if (keytipProps) {
      // Add the parent overflow sequence if necessary
      const newKeytipProps = this._keytipManager.addParentOverflow(keytipProps);

      // Construct aria-describedby and data-ktp-id attributes and return
      const ariaDescribedBy = getAriaDescribedBy(newKeytipProps.keySequences);
      let keySequences = [...newKeytipProps.keySequences];
      if (newKeytipProps.overflowSetSequence) {
        keySequences = mergeOverflows(keySequences, newKeytipProps.overflowSetSequence);
      }
      const ktpId = sequencesToID(keySequences);

      return {
        'aria-describedby': mergeAriaAttributeValues(describedByPrepend, ariaDescribedBy),
        'data-ktp-target': ktpId,
        'data-ktp-execute-target': ktpId
      };
    }
    return undefined;
  }
}
