import * as React from 'react';
import * as PropTypes from 'prop-types';
import { BaseComponent, IKeySequence, convertSequencesToKeytipID, IRenderComponent } from '../../Utilities';
import { IKeytip, IKeytipProps } from './Keytip.types';
import { KeytipManager, getNativeKeytipProps } from '../../utilities/keytips';

/**
 * A small element to help the target element correctly read out its aria-describedby for its Keytip
 *
 * @export
 * @class Keytip
 * @extends {BaseComponent<IKeytipProps, {}}>}
 */
export class Keytip extends BaseComponent<IKeytipProps & IRenderComponent<{}>, {}> {
  private _keytipManager: KeytipManager = KeytipManager.getInstance();

  public componentDidMount() {
    // Register Keytip in KeytipManager
    this._hasValidKeytipProps() && this._keytipManager.registerKeytip(this._createKeytipProps());
  }

  public componentWillUnmount() {
    // Unregister Keytip in KeytipManager
    this._hasValidKeytipProps() && this._keytipManager.unregisterKeytip(this._createKeytipProps());
  }

  public componentDidUpdate() {
    // Update Keytip in KeytipManager
    this._hasValidKeytipProps() && this._keytipManager.updateKeytip(this._createKeytipProps());
  }

  public render(): JSX.Element {
    const { children } = this.props;
    let nativeKeytipProps = {};
    if (this._hasValidKeytipProps()) {
      nativeKeytipProps = getNativeKeytipProps(this.props);
    }
    return children(nativeKeytipProps);
  }

  private _hasValidKeytipProps(): boolean {
    return !!this.props.content && !!this.props.keySequences;
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
    };
  }
}
