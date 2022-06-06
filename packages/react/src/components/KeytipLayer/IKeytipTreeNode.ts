export interface IKeytipTreeNode {
  /**
   * ID of the <Keytip> DOM element. Needed to locate the correct keytip in the KeytipLayer's 'keytip' state array
   */
  id: string;

  /**
   * KeySequence that invokes this KeytipTreeNode's onExecute function
   */
  keySequences: string[];

  /**
   * Overflow set sequence for this keytip
   */
  overflowSetSequence?: string[];

  /**
   * Control's execute function for when keytip is invoked, passed from the component to the Manager in the IKeytipProps
   */
  onExecute?: (executeTarget: HTMLElement | null, target: HTMLElement | null) => void;

  /**
   * Function to execute when we return to this keytip
   */
  onReturn?: (executeTarget: HTMLElement | null, target: HTMLElement | null) => void;

  /**
   * List of keytip IDs that should become visible when this keytip is pressed, can be empty
   */
  children: string[];

  /**
   * Parent keytip ID
   */
  parent: string;

  /**
   * Whether or not this keytip will have children keytips that are dynamically created (DOM is generated on
   * keytip activation). Common cases are keytips in a menu or modal.
   */
  hasDynamicChildren?: boolean;

  /**
   * Whether or not this keytip belongs to a component that has a menu
   * Keytip mode will stay on when a menu is opened, even if the items in that menu have no keytips
   */
  hasMenu?: boolean;

  /**
   * T/F if this keytip's component is currently disabled
   */
  disabled?: boolean;

  /**
   * T/F if this keytip is a persisted keytip
   */
  persisted?: boolean;

  /**
   * Whether or not this keytip belongs to a component that is in an overflow menu
   * and also has a menu
   */
  hasOverflowSubMenu?: boolean;
}
