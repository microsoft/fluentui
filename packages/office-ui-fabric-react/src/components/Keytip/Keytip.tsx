import * as React from 'react';
import { BaseComponent, IKeySequence, convertSequencesToKeytipID } from '../../Utilities';
import { IKeytip, IKeytipProps } from './Keytip.types';
import { KeytipManager, constructAriaDescribedByString } from '../../utilities/keytips';

/**
 * A small element to help the target element correctly read out its aria-describedby for its Keytip
 *
 * @export
 * @class Keytip
 * @extends {BaseComponent<IKeytipProps, {}}>}
 */
export class Keytip extends BaseComponent<IKeytipProps, {}> {
  private _keytipManager: KeytipManager = KeytipManager.getInstance();

  // tslint:disable-next-line:no-any
  constructor(props: IKeytipProps, context: any) {
    super(props, context);
  }

  public componentDidMount() {
    // Register Keytip in KeytipManager
    this._keytipManager.registerKeytip(this._createKeytipProps());
  }

  public componentWillUnmount() {
    // Unregister Keytip in KeytipManager
    this._keytipManager.unregisterKeytip(this._createKeytipProps());
  }

  public componentDidUpdate() {
    // Update Keytip in KeytipManager
    this._keytipManager.updateKeytip(this._createKeytipProps());
  }

  public render(): JSX.Element {
    const { keySequences, overflowSetSequence } = this.props;
    const keySequencesString = constructAriaDescribedByString(keySequences, overflowSetSequence);

    return (
      // TODO: put these styles in the styles file
      <span style={ { visibility: 'hidden', position: 'fixed', top: 0, left: 0 } } id={ convertSequencesToKeytipID(keySequences) }>{ keySequencesString }</span>
    );
  }

  private _createKeytipProps(): IKeytipProps {
    return {
      content: this.props.content,
      disabled: this.props.disabled,
      visible: this.props.visible,
      onExecute: this.props.onExecute,
      onReturn: this.props.onReturn,
      keySequences: this.props.keySequences,
      overflowSetSequence: this.props.overflowSetSequence,
      calloutProps: this.props.calloutProps,
      offset: this.props.offset,
      hasChildrenNodes: this.props.hasChildrenNodes
    }
  }
}