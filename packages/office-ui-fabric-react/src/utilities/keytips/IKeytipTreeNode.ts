import { IKeySequence } from '../../Utilities';

export interface IKeytipTreeNode {
  /**
   * ID of the <Keytip> DOM element. Needed to locate the correct keytip in the KeytipLayer's 'keytip' state array
   */
  id: string;

  /**
   * KeySequence that invokes this KeytipTreeNode's onExecute function
   */
  keytipSequence: IKeySequence;

  /**
   * Control's execute function for when keytip is invoked, passed from the component to the Manager in the IKeytipProps
   */
  onExecute?: (el: HTMLElement | null) => void;

  /**
   * Function to execute when we return to this keytip
   */
  onReturn?: (el: HTMLElement | null) => void;

  /**
   * List of keytip IDs that should become visible when this keytip is pressed, can be empty
   */
  children: string[];

  /**
   * Parent keytip ID
   */
  parent: string;

  /**
   * Whether or not this node has children nodes or not. Should be used for menus/overflow components, that have
   * their children registered after the initial rendering of the DOM.
   */
  hasChildrenNodes?: boolean;

  /**
   * T/F if this keytip's component is currently disabled
   */
  disabled?: boolean;

  /**
   * T/F if this keytip is a persisted keytip
   */
  persisted?: boolean;
}