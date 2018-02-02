import * as React from 'react';
import { IKeySequence } from '../../utilities/keysequence';
import { IKeytipProps } from '../../Keytip';
import { KeytipLayer } from './KeytipLayer';

export interface IKeytipLayerProps extends React.Props<KeytipLayer> {
  /**
   * Optional callback to access the KeytipLayer component. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: KeytipLayer) => void;

  /**
   * The DOM ID to use as the hostId for the child keytips
   *
   * @type {string}
   * @memberof IKeytipLayerProps
   */
  id: string;

  /**
  * List of key sequences that will start keytips mode
  *
  * @type {KeySequence}
  * @memberof IKeytipLayerProps
  */
  keytipStartSequences: IKeySequence[];

  /**
   * List of key sequences that execute the 'go back' functionality in keytips (going back to the previous level of keytips)
   *
   * @type {KeySequence}
   * @memberof IKeytipLayerProps
   */
  keytipGoBackSequences: IKeySequence[];

  /**
   * List of key sequences that will exit keytips mode
   *
   * @type {KeySequence}
   * @memberof IKeytipLayerProps
   */
  keytipExitSequences: IKeySequence[];

  /**
   * List of keytips to add to this layer
   *
   * @type {string[]}
   * @memberof IKeytipLayerProps
   */
  keytips?: IKeytipProps[];

  /**
   *
   */
  onExitKeytipMode?: () => void;
}