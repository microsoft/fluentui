import { IStyle } from 'office-ui-fabric-react/lib/Styling';

/**
 * Enum that defines what we show in columns
 */
export enum GridColumnContentType {
  /**
   * Enum if we want to show facepile with/without text
   */
  facepile,

  /**
   * Enum if we want to show icon with/without text
   */
  icon,

  /**
   * Enum if we want to show text only
   */
  textOnly
}

/**
 * Grid Row Item interface
 */
export interface IGridCellItem {
  /**
   * This shows the content text we want to show
   */
  content?: string;

  /**
   * The facepile Image source or path to where the image is located
   */
  facepileImageSrc?: string;

  /**
   * The icon we want to show
   */
  iconName?: string;

  /**
   * The color for the icon
   */
  iconColor?: string;

  /**
   * The color for text in each cell
   */
  textColor?: string;

  /**
   * This sets the fontWeight to 'bold' the text if 'bold' is passed, otherwise normal
   */
  boldText?: string;
}

export interface ICustomCssForCells {
  iconColor?: string;
  textColor?: string;
  boldText?: string;
}

/**
 * The Grid column interface defines what content goes into each column
 */
export interface IGridColumn {
  /**
   * The key that determines the Content type we want to show
   * This could be facepile or icon or text only
   */
  key: GridColumnContentType;

  /**
   * The name of the column header
   */
  name: string;
}

/**
 * Grid item interface, we support only upto 3 columns
 */
export interface IGridRow {
  /**
   * Column 1 contents for a single row
   */
  c1: IGridCellItem;

  /**
   * Column 2 contents for a single row
   */
  c2?: IGridCellItem;

  /**
   * Column 3 content for a single row
   */
  c3?: IGridCellItem;

  /**
   * If the item is clickable, we will invoke this function
   */
  // Disabling ts-lint for the signature because Details List expects item parameter as any
  // tslint:disable-next-line
  onRowClicked?: (item: any) => void;

  /**
   * Defines the id for the gridRow action
   */
  id?: string;
}

/**
 * The grid list props that we need to send to the grid list
 */
export interface IGridListProps {
  /**
   * Grid List optional ID Props
   */
  id?: string;

  /**
   * Array of row items
   */
  gridRows: IGridRow[];

  /**
   * Array of Grid columns
   */
  gridColumns: IGridColumn[];

  /**
   * This flag is used to display the header, default is true
   */
  isHeaderVisible?: boolean;

  /**
   * This flag determines if a row in the grid list is clickable, default is false
   */
  isRowClickable?: boolean;

  /**
   * The component will render an action link with the text if it is not null or undefined
   */
  actionButtonText?: string;

  /**
   * This function will be invoked when the action link is clicked
   */
  onActionLinkClicked?: VoidFunction;
}

/**
 * Gridlist styles interface
 */
export interface IGridListStyles {
  /**
   * Root styles for GridList
   */
  root: IStyle;

  /**
   * Action Button styles
   */
  actionButton: IStyle;

  /**
   * Icon or facepile style
   */
  imageAlignment: IStyle;

  /**
   * Cursor style
   */
  cursonPointer: IStyle;

  /**
   * Text content style
   */
  text: IStyle;
}
