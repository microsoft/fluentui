import type { ICalloutProps } from '../../Callout';
import type { IStyle, ITheme } from '../../Styling';
import type { IStyleFunctionOrObject, Point } from '../../Utilities';

/**
 * {@docCategory Keytips}
 */
export interface IKeytipProps {
  /**
   * Content to put inside the keytip
   */
  content: string;

  /**
   * Theme for the component
   */
  theme?: ITheme;

  /**
   * T/F if the corresponding control for this keytip is disabled
   */
  disabled?: boolean;

  /**
   * T/F if the keytip is visible
   */
  visible?: boolean;

  /**
   * Function to call when this keytip is activated.
   * 'executeTarget' is the DOM element marked with 'data-ktp-execute-target'.
   * 'target' is the DOM element marked with 'data-ktp-target'.
   */
  onExecute?: (executeTarget: HTMLElement | null, target: HTMLElement | null) => void;

  /**
   * Function to call when the keytip is the currentKeytip and a return sequence is pressed.
   * 'executeTarget' is the DOM element marked with 'data-ktp-execute-target'.
   * 'target' is the DOM element marked with 'data-ktp-target'.
   */
  onReturn?: (executeTarget: HTMLElement | null, target: HTMLElement | null) => void;

  /**
   * Array of KeySequences which is the full key sequence to trigger this keytip
   * Should not include initial 'start' key sequence
   */
  keySequences: string[];

  /**
   * Full KeySequence of the overflow set button, will be set automatically if this keytip is inside an overflow
   */
  overflowSetSequence?: string[];

  /**
   * ICalloutProps to pass to the callout element
   */
  calloutProps?: ICalloutProps;

  /**
   * Optional styles for the component.
   */
  styles?: IStyleFunctionOrObject<IKeytipStyleProps, IKeytipStyles>;

  /**
   * Offset x and y for the keytip, added from the top-left corner
   * By default the keytip will be anchored to the bottom-center of the element
   */
  offset?: Point;

  /**
   * Whether or not this keytip will have children keytips that are dynamically created (DOM is generated on
   * keytip activation). Common cases are a Pivot or Modal.
   */
  hasDynamicChildren?: boolean;

  /**
   * Whether or not this keytip belongs to a component that has a menu
   * Keytip mode will stay on when a menu is opened, even if the items in that menu have no keytips
   */
  hasMenu?: boolean;

  /**
   * Whether or not this keytip belongs to a component that is in an overflow menu
   * and also has a menu
   */
  hasOverflowSubMenu?: boolean;
}

/**
 * Props to style Keytip component
 * {@docCategory Keytips}
 */
export interface IKeytipStyleProps {
  /**
   * The theme for the keytip.
   */
  theme: ITheme;

  /**
   * Whether the keytip is disabled or not.
   */
  disabled?: boolean;

  /**
   * T/F if the keytip is visible
   */
  visible?: boolean;
}

/**
 * {@docCategory Keytips}
 */
export interface IKeytipStyles {
  /**
   * Style for the div container surrounding the keytip content.
   */
  container: IStyle;

  /**
   * Style for the keytip content element.
   */
  root: IStyle;
}
