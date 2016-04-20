import { IContextualMenuItem } from '../index';

export interface ICommandBarProps {
  /**
   * Whether or not the search box is visible
   * @defaultvalue false
   */
  isSearchBoxVisible?: boolean;

  /**
   * Placeholder text to display in the search box
   */
  searchPlaceholderText?: string;

  /**
   * Items to render
   */
  items: IContextualMenuItem[];

  /**
   * Default items to have in the overflow menu
   */
  overflowItems?: IContextualMenuItem[];

  /**
   * Items to render on the right side (or left, in RTL).
   */
  farItems?: IContextualMenuItem[];
}