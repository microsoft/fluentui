import * as React from 'react';
import { PivotBase, IPivotData } from './Pivot.base';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject, IComponentAs } from '../../Utilities';
import { PivotItem } from './PivotItem';
import { IButtonProps } from '../Button';
import { IPivotItemProps } from './PivotItem.types';

/**
 * {@docCategory Pivot}
 */
export interface IPivot {
  /**
   * Sets focus to the first pivot tab.
   */
  focus(): void;

  /**
   * Remeasures the available space.
   */
  remeasure(): void;
}

/**
 * {@docCategory Pivot}
 */
export interface IPivotProps extends React.ClassAttributes<PivotBase>, React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the IPivot interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IPivot>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IPivotStyleProps, IPivotStyles>;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Additional css class to apply to the Pivot
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * Default selected key for the pivot. Only provide this if the pivot is an uncontrolled component;
   * otherwise, use the `selectedKey` property.
   *
   * This property is also mutually exclusive with `defaultSelectedIndex`.
   */
  defaultSelectedKey?: string;

  /**
   * Default selected index for the pivot. Only provide this if the pivot is an uncontrolled component;
   * otherwise, use the `selectedKey` property.
   *
   * This property is also mutually exclusive with `defaultSelectedKey`.
   */
  defaultSelectedIndex?: number;

  /**
   * Index of the pivot item initially selected. Mutually exclusive with `initialSelectedKey`.
   * Only provide this if the pivot is an uncontrolled component; otherwise, use `selectedKey`.
   *
   * @deprecated Use `defaultSelectedIndex`
   */
  initialSelectedIndex?: number;

  /**
   * Key of the pivot item initially selected. Mutually exclusive with `initialSelectedIndex`.
   * Only provide this if the pivot is an uncontrolled component; otherwise, use `selectedKey`.
   *
   * @deprecated Use `defaultSelectedKey`
   */
  initialSelectedKey?: string;

  /**
   * Key of the selected pivot item. Updating this will override the Pivot's selected item state.
   * Only provide this if the pivot is a controlled component where you are maintaining the
   * current state; otherwise, use `defaultSelectedKey`.
   */
  selectedKey?: string | null;

  /**
   * Callback for when the selected pivot item is changed.
   */
  onLinkClick?: (item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) => void;

  /**
   * PivotLinkSize to use (normal, large)
   */
  linkSize?: PivotLinkSize;

  /**
   * PivotLinkFormat to use (links, tabs)
   */
  linkFormat?: PivotLinkFormat;

  /**
   * Whether to skip rendering the tabpanel with the content of the selected tab.
   * Use this prop if you plan to separately render the tab content
   * and don't want to leave an empty tabpanel in the page that may confuse Screen Readers.
   */
  headersOnly?: boolean;

  /**
   * Callback to customize how IDs are generated for each tab header.
   * Useful if you're rendering content outside and need to connect aria-labelledby.
   */
  getTabId?: (itemKey: string, index: number) => string;

  /**
   * Props to be passed to overflow button.
   * If `menuProps` are passed through this prop, any items provided will be prepended to any
   * computed overflow items.
   */
  overflowButtonProps?: IButtonProps;

  /**
   * Custom component for the overflow button.
   */
  overflowButtonAs?: IComponentAs<IButtonProps>;

  /**
   * When true, items will be 'shifted' off the front of the array when reduced, and unshifted during grow.
   */
  shiftOnReduce?: boolean;

  /**
   * Custom function to reduce data if items do not fit in given space.
   * Return `undefined` if no more steps can be taken to avoid infinate loop.
   */
  onReduceData?: (data: IPivotData) => IPivotData | undefined;

  /**
   * Custom function to grow data if items are too small for the given space.
   * Return `undefined` if no more steps can be taken to avoid infinate loop.
   */
  onGrowData?: (data: IPivotData) => IPivotData | undefined;

  /**
   * Callback invoked when data has been reduced.
   */
  onDataReduced?: (movedItem: IPivotItemProps) => void;

  /**
   * Callback invoked when data has been grown.
   */
  onDataGrown?: (movedItem: IPivotItemProps) => void;

  /**
   * Function to be called every time data is rendered. It provides the data that was actually rendered.
   * A use case would be adding telemetry when a particular control is shown in an overflow or dropped
   * as a result of `onReduceData`, or to count the number of renders that an implementation of
   * `onReduceData` triggers.
   */
  dataDidRender?: (renderedData: any) => void;
}

/**
 * {@docCategory Pivot}
 */
export type IPivotStyleProps = Required<Pick<IPivotProps, 'theme'>> &
  Pick<IPivotProps, 'className'> & {
    /** Indicates whether Pivot has large format. */
    rootIsLarge?: boolean;
    /** Indicates whether Pivot has tabbed format. */
    rootIsTabs?: boolean;
    /**
     * Indicates whether Pivot link is selected.
     * @deprecated Is not populated with valid value. Specify `linkIsSelected` styling instead.
     */
    linkIsSelected?: boolean;
  };

/**
 * {@docCategory Pivot}
 */
export interface IPivotStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;
  link: IStyle;
  linkContent: IStyle;
  linkIsSelected: IStyle;
  text: IStyle;
  count: IStyle;
  icon: IStyle;
  itemContainer?: IStyle;
}

/**
 * {@docCategory Pivot}
 */
export enum PivotLinkFormat {
  /**
   * Display Pivot Links as links
   */
  links = 0,

  /**
   * Display Pivot Links as Tabs
   */
  tabs = 1
}

/**
 * {@docCategory Pivot}
 */
export enum PivotLinkSize {
  /**
   * Display Link using normal font size
   */
  normal = 0,

  /**
   * Display links using large font size
   */
  large = 1
}
