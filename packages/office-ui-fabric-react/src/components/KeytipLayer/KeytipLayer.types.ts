import * as React from 'react';
import { IKeytipTransitionKey } from '../../Utilities';
import { KeytipLayer } from './KeytipLayer';

export interface IKeytipLayerProps extends React.Props<KeytipLayer> {
  /**
   * Optional callback to access the KeytipLayer component. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: KeytipLayer | null) => void;

  /**
   * String to put inside the layer to be used for the aria-describedby for the component with the keytip
   * Should be one of the starting sequences
   *
   * @type {string}
   */
  content: string;

  /**
  * List of key sequences that will start keytips mode
  *
  * @type {KeySequence}
  */
  keytipStartSequences?: IKeytipTransitionKey[];

  /**
   * List of key sequences that execute the return functionality in keytips (going back to the previous level of keytips)
   *
   * @type {KeySequence}
   */
  keytipReturnSequences?: IKeytipTransitionKey[];

  /**
   * List of key sequences that will exit keytips mode
   *
   * @type {KeySequence}
   */
  keytipExitSequences?: IKeytipTransitionKey[];

  /**
   * Callback function triggered when keytip mode is exited
   *
   * @type {() => void}
   */
  onExitKeytipMode?: () => void;

  /**
   * Callback function triggered when keytip mode is entered
   *
   * @type {() => void)}
   */
  onEnterKeytipMode?: () => void;
}