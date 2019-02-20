import {
  IButtonProps,
  ICommandBarItemProps,
  ICommandBarProps,
  IContextualMenuItem,
  IDetailsListProps,
  IDetailsRowProps,
  IOverflowSetProps,
  IRenderFunction,
  ISearchBoxProps
} from 'office-ui-fabric-react';

export interface ICompositeListFarItemOptions {
  /**
   * To override 'selectedItems' menu bar item props
   */
  selectedMenuItemProps?: ICommandBarItemProps;

  /**
   * To get display text for selectedItems menu bar item
   */
  getSelectedText?: (count: number) => string;

  /**
   * To get aria label for selectedItems menu bar item
   */
  getSelectedAriaLabel?: (count: number) => string;

  /**
   * To override 'searchBox' menu bar item props
   */
  searchMenuItemProps?: ICommandBarItemProps;

  /**
   * To override the SearchBox component porops inside 'searchBox' menu bar item
   */
  searchBoxProps?: ISearchBoxProps;

  /**
   * To override 'compactToggle' menu bar item props
   */
  compactMenuProps?: ICommandBarItemProps;

  /**
   * To override 'NormalList' menu item props in 'compactToggle' menu bar item
   */
  compactMenuNormalListItemProps?: IContextualMenuItem;

  /**
   * To override 'CompactList' menu item props in 'compactToggle' menu bar item
   */
  compactMenuCompactListItemProps?: IContextualMenuItem;
}

export interface ICompositeListProps {
  /**
   * To override DetailList props in this composite list
   */
  detailsListProps: IDetailsListProps;

  /**
   * To override CommandBar props in this composite list
   */
  commandBarProps: ICommandBarProps;

  /**
   * To set number of items currently selected, if providing selection object
   */
  numberOfItemsSelected?: number;

  /**
   * To set the list in compact mode
   */
  isCompactMode?: boolean;

  /**
   * To set if the command bar should be hidden, defaults to false
   */
  hideCommandBar?: boolean;

  /**
   * Callback when compact mode is changed
   */
  onCompactModeChanged?: (newValue: boolean) => void;

  /**
   * A callback to override the provided CommandBar far items
   */
  onGetFarItems?: (
    /** The default render method for farItems */
    defaultRender: (options: ICompositeListFarItemOptions) => ICommandBarItemProps[]
  ) => ICommandBarItemProps[];
}

export interface ICompositeListRowItem {
  /**
   * unique index for list row item
   */
  [key: string]: string;
}

export interface ICompositeListRowProps<T extends ICompositeListRowItem> {
  /**
   * To pass in render function to render rows
   */
  renderFunction: IRenderFunction<IDetailsRowProps>;

  /**
   * To pass in list row props
   */
  rowProps: IDetailsRowProps;

  /**
   * To Pass in the key for action column
   */
  actionKey: string;

  /**
   * To pass in all action button commands props
   */
  actionItems: IActionButtonProps<T>[];
}

export interface IActionButtonProps<T> {
  /**
   * Unique id to identify the item
   */
  key: string;

  /**
   * To override Button props in this action button
   */
  buttonProps: IButtonProps;

  /**
   * To pass in the row item for each action
   */
  item: T;

  /**
   * A callback to override the action button click
   */
  onClick?: (item: T, event: React.MouseEvent<HTMLElement>) => void;

  /**
   * A callback to override the overflow menu click
   */
  onMenuClick?: (item: T, event: React.MouseEvent<HTMLElement>) => void;
}

export interface IOverflowMenuItemProps<T> extends IContextualMenuItem {
  /**
   * A callback to override the overflow menu item click
   */
  onItemClick: (item: T, event: React.MouseEvent<HTMLElement>) => void;
}

export interface IListRowActionProps<T extends ICompositeListRowItem> extends Partial<IOverflowSetProps> {
  /**
   * To pass in the customized Button props for action button
   */
  ActionItems: IActionButtonProps<T>[];
}
