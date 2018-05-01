import * as React from 'react';
import { IStyleFunction } from '../../Utilities';
import { IStyle } from '../../Styling';
import { IKeytipTransitionKey } from '../../utilities/keytips/IKeytipTransitionKey';

export interface IKeytipLayer {
}

export interface IKeytipLayerProps extends React.Props<IKeytipLayer> {
  /**
   * Optional callback to access the KeytipLayer component. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IKeytipLayer | null) => void;

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

  /**
   * getStyles function for KeytipLayer
   */
  getStyles?: IStyleFunction<IKeytipLayerStyleProps, IKeytipLayerStyles>;
}

export interface IKeytipLayerStyles {
  innerContent: IStyle;
}

export interface IKeytipLayerStyleProps {
}