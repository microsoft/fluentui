import { ICalloutProps } from 'office-ui-fabric-react/lib/Callout';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunction } from '../../Utilities';
import { IKeySequence } from '../../utilities/keysequence';

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
   * @memberof IKeytipProps
   */
  content?: string;

  /**
  * Optional theme for component
  */
  theme?: ITheme;

  /**
   * T/F if the corresponding control is disabled
   *
   * @type {boolean}
   * @memberof IKeytipProps
   */
  disabled?: boolean;

  /**
   * T/F if the keytip is visible
   *
   * @type {boolean}
   * @memberof IKeytipProps
   */
  visible?: boolean;

  /**
   * Function to call when this keytip is activated
   *
   * @type {() => void}
   * @memberof IKeytipProps
   */
  onExecute?: () => void;

  /**
   * Array of KeySequences which is the full key sequence to trigger this keytip
   * Should not include initial 'start' key sequence
   */
  keySequences: IKeySequence[];

  /**
   * KeySequence of overflow set which will trigger the keytip.
   */
  overflowSetSequence?: IKeySequence;

  /**
   * ICalloutProps to pass to the callout element
   *
   * @type {string}
   * @memberof IKeytipProps
   */
  calloutProps?: ICalloutProps;

  /**
  * Optional styles for the component.
  */
  getStyles?: IStyleFunction<IKeytipStyleProps, IKeytipStyles>;

  /**
   * Whether or not this node has children nodes or not. Should be used for menus/overflow components, that have
   * their children registered after the initial rendering of the DOM.
   */
  hasChildrenNodes?: boolean;
}

/**
 * Props to style Keytip component
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

export interface IKeytipStyles {

  /**
   * Style for the div container surrounding the keytip content.
   */
  container: IStyle;

  /**
   * Style for the keytip content element.
   */
  root: IStyle;

  /**
   * Style for the containing Callout
   */
  calloutContainer: IStyle;
}