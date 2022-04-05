import * as React from 'react';
import type { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import type { IStyle } from '../../Styling';
import type { IKeytipTransitionKey } from '../../utilities/keytips/IKeytipTransitionKey';

/**
 * {@docCategory Keytips}
 */
export interface IKeytipLayer {}

/**
 * {@docCategory Keytips}
 */
export interface IKeytipLayerProps extends React.ClassAttributes<IKeytipLayer> {
  /**
   * Optional callback to access the KeytipLayer component. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IKeytipLayer>;

  /**
   * String to put inside the layer to be used for the aria-describedby for the component with the keytip
   * Should be one of the starting sequences
   */
  content: string;

  /**
   * List of key sequences that will start keytips mode
   */
  keytipStartSequences?: IKeytipTransitionKey[];

  /**
   * List of key sequences that execute the return functionality in keytips
   * (going back to the previous level of keytips)
   */
  keytipReturnSequences?: IKeytipTransitionKey[];

  /**
   * List of key sequences that will exit keytips mode
   */
  keytipExitSequences?: IKeytipTransitionKey[];

  /**
   * Callback function triggered when keytip mode is exited.
   * ev is the Mouse or Keyboard Event that triggered the exit, if any.
   */
  onExitKeytipMode?: (ev?: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>) => void;

  /**
   * Callback function triggered when keytip mode is entered
   * @param transitionKey - The key sequence that triggered keytip mode, if any.
   */
  onEnterKeytipMode?: (transitionKey?: IKeytipTransitionKey) => void;

  /**
   * (Optional) Call to provide customized styling.
   */
  styles?: IStyleFunctionOrObject<IKeytipLayerStyleProps, IKeytipLayerStyles>;
}

/**
 * {@docCategory Keytips}
 */
export interface IKeytipLayerStyles {
  innerContent: IStyle;
}

/**
 * {@docCategory Keytips}
 */
export interface IKeytipLayerStyleProps {}
