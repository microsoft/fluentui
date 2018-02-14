import { ICalloutProps } from 'office-ui-fabric-react/lib/Callout';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunction, IPoint } from '../../Utilities';
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
   */
  content?: string;

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
   *
   * @type {() => void}
   */
  onExecute?: () => void;

  /**
   * Function to call when the keytip is returned to
   *
   * @type {() => void}
   */
  onReturn?: () => void;

  /**
   * Array of KeySequences which is the full key sequence to trigger this keytip
   * Should not include initial 'start' key sequence
   *
   * @type {IKeySequence[]}
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
   */
  calloutProps?: ICalloutProps;

  /**
   * Optional styles for the component.
   *
   * @type {IStyleFunction<IKeytipStyleProps, IKeytipStyles>}
   */
  getStyles?: IStyleFunction<IKeytipStyleProps, IKeytipStyles>;

  /**
   * Offset from the top-left corner of the component for positioning this keytip
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