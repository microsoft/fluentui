import * as React from 'react';
import type { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import type { IStyle } from '../../Styling';
import type { IKeytipTransitionKey } from '../../utilities/keytips/IKeytipTransitionKey';

/**
 * {@docCategory Keytips}
 */
export interface IKeytipLayer {}

/**
 * Opt-in keyboard policy for KeytipLayer. Activation sequences are configured through
 * keytipStartSequences; keytip input is dispatched on keydown after application handlers.
 * {@docCategory Keytips}
 */
export interface IKeytipActivationBehavior {
  /**
   * Consume modifier-only activation keydown and keyup events. Entry occurs on keyup
   * only if no other key intervened; chord input itself is not consumed.
   * Also consume successful configured activation chords.
   * Also consume non-consecutive modifier activations that exit keytip mode.
   * Configured exit chords follow this policy; return navigation is always consumed.
   * Activation is consumed before entry/exit callbacks run, so hosts can safely transfer focus.
   * @defaultvalue false
   */
  consumeActivationEvent?: boolean;

  /**
   * Whether unmatched input leaves keytip mode without canceling the event.
   * @defaultvalue 'ignore'
   */
  unmatchedInputBehavior?: 'ignore' | 'exitAndPassThrough';

  /**
   * Pass a second invocation of the same modifier-only activation through when no
   * non-modifier key intervened. Repeated keydown events are not separate invocations.
   * Once a modifier exits keytip mode, activation aliases cannot reenter until it is released.
   * @defaultvalue 'toggle'
   */
  consecutiveActivationBehavior?: 'toggle' | 'exitAndPassThrough';
}

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
   * Opt in to gesture-aware activation and bubble-phase keydown input.
   * Supply a policy to enable the behavior; no feature gate or global setting is required.
   * Omit this prop to retain legacy transition and keypress behavior (disabled by default).
   * New event listeners, gesture bookkeeping, lifecycle cleanup, and enabled checks
   * only apply while this prop is supplied. Removing it cleans up the opted-in behavior.
   * Plain left and right Alt activations are equivalent; AltGraph typing remains excluded.
   * Modifier-only entry occurs on keyup after a standalone tap, not on keydown.
   * Keytip characters are not executed while Alt, Control, or Meta is held.
   * @defaultvalue undefined
   */
  keytipActivationBehavior?: IKeytipActivationBehavior;

  /**
   * Whether keytip mode may be entered, including programmatic entry.
   * KeytipManager.shouldEnterKeytipMode must also allow entry.
   * Only applies when keytipActivationBehavior is supplied; otherwise legacy behavior is unchanged.
   * @defaultvalue true
   */
  enabled?: boolean;

  /**
   * Callback function triggered when keytip mode is exited.
   * ev is the Mouse or Keyboard Event that triggered the exit, if any.
   */
  onExitKeytipMode?: (ev?: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>) => void;

  /**
   * Callback function triggered when keytip mode is entered
   * When consumeActivationEvent is enabled, the triggering event is already canceled.
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
