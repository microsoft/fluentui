import { ICalloutProps } from '../../Callout';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunction, IKeySequence, IPoint } from '../../Utilities';

export interface IKeytip {
}

export interface IKeytipProps {
  /**
   * Optional callback to access the Keytip component. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IKeytip) => void;

  /**
   * Content to put inside the keytip
   *
   * @type {string}
   */
  content: string;

  /**
   * Theme for the component
   *
   * @type {ITheme}
   */
  theme?: ITheme;

  /**
   * T/F if the corresponding control is disabled
   *
   * @type {boolean}
   */
  disabled?: boolean;

  /**
   * T/F if the keytip is visible
   *
   * @type {boolean}
   */
  visible?: boolean;

  /**
   * Function to call when this keytip is activated
   * 'el' is the DOM element that the keytip is attached to
   *
   * @type {(HTMLElement) => void}
   */
  onExecute?: (el: HTMLElement | null) => void;

  /**
   * Function to call when the keytip is returned to
   * 'el' is the DOM element that the keytip is attached to
   *
   * @type {(HTMLElement) => void}
   */
  onReturn?: (el: HTMLElement | null) => void;

  /**
   * Array of KeySequences which is the full key sequence to trigger this keytip
   * Should not include initial 'start' key sequence
   *
   * @type {IKeySequence[]}
   */
  keySequences: IKeySequence[];

  /**
   * Full KeySequence of the overflow set button, set if this keytip is inside an overflow
   *
   * @type {IKeySequence}
   */
  overflowSetSequence?: IKeySequence[];

  /**
   * ICalloutProps to pass to the callout element
   *
   * @type {string}
   */
  calloutProps?: ICalloutProps;

  /**
   * Optional styles for the component.
   *
   * @type {IStyleFunction<IKeytipStyleProps, IKeytipStyles>}
   */
  getStyles?: IStyleFunction<IKeytipStyleProps, IKeytipStyles>;

  /**
   * Offset x and y for the keytip, added from the top-left corner
   *
   * @type {IPoint}
   */
  offset?: IPoint;

  /**
   * Whether or not this node has children nodes or not. Should be used for menus/overflow components, that have
   * their children registered after the initial rendering of the DOM.
   *
   * @type {boolean}
   */
  hasChildrenNodes?: boolean;
}

/**
 * Props to style Keytip component
 */
export interface IKeytipStyleProps {

  /**
   * The theme for the keytip.
   *
   * @type {ITheme}
   */
  theme: ITheme;

  /**
   * Whether the keytip is disabled or not.
   *
   * @type {boolean}
   */
  disabled?: boolean;

  /**
   * T/F if the keytip is visible
   *
   * @type {boolean}
   */
  visible?: boolean;
}

export interface IKeytipStyles {

  /**
   * Style for the div container surrounding the keytip content.
   *
   * @type {IStyle}
   */
  container: IStyle;

  /**
   * Style for the keytip content element.
   *
   * @type {IStyle}
   */
  root: IStyle;
}