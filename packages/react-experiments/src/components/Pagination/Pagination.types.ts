import type { IStyle, ITheme } from '../../Styling';
import type { IStyleFunctionOrObject, IRefObject, IRenderFunction } from '../../Utilities';
import type { IIconProps } from '@fluentui/react/lib/Icon';

export interface IPaginationProps {
  /**
   * The total number of pages.
   */
  pageCount: number;
  /**
   * Items per page
   */
  itemsPerPage?: number;
  /**
   * total number of items
   */
  totalItemCount?: number;
  /**
   * Selected page index
   * @default 0
   */
  selectedPageIndex?: number;
  /**
   * Icon prop for the first page button
   */
  firstPageIconProps?: IIconProps;
  /**
   * Icon prop for the previous page button
   */
  previousPageIconProps?: IIconProps;
  /**
   * Icon prop for the next page button
   */
  nextPageIconProps?: IIconProps;
  /**
   * Icon prop for the last page button
   */
  lastPageIconProps?: IIconProps;
  /**
   * aria label for the first page button
   */
  firstPageAriaLabel?: string;
  /**
   * aria label for the previous page button
   */
  previousPageAriaLabel?: string;
  /**
   * aria label for the next page button
   */
  nextPageAriaLabel?: string;
  /**
   * aria label for the last page button
   */
  lastPageAriaLabel?: string;
  /**
   * aria label for the page. This should be a simple string such as 'page' in corresponding localized language.
   */
  pageAriaLabel?: string;
  /**
   * aria label for the selected page. e.g. 'selected', 'page selected'
   */
  selectedAriaLabel?: string;
  /**
   * call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IPaginationStyleProps, IPaginationStyles>;
  /**
   * Gets ref to component interface
   */
  componentRef?: IRefObject<{}>;
  /**
   * theme provided by High-Order Component.
   */
  theme?: ITheme;
  /**
   * the aria label of combo box
   */
  comboBoxAriaLabel?: string;
  /**
   * format of the pagination control
   * @default PaginationFormat.buttons
   */
  format?: PaginationFormat;
  /**
   * number of visible buttons. This is only applicable for @param comboBox
   */
  numberOfPageButton?: number;
  /**
   * The string object
   */
  strings?: IPaginationString;
  /**
   * the call back function to load another page in the table. This needs to be defined in the parent component.
   */
  onPageChange?: (index: number) => void;
  /**
   * provide a render function for the visible item label if localization of this string is needed.
   */
  onRenderVisibleItemLabel?: IRenderFunction<IPaginationProps>;
}

export type PaginationFormat = 'comboBox' | 'buttons';

export interface IPaginationString {
  /**
   * the divider between the 'from item index' and the 'to item index', e.g. '-'
   **/
  divider?: string;
  /**
   *  the string for 'of', e.g. 'of'
   **/
  of?: string;
}

export interface IPaginationStyleProps {
  theme: ITheme;
  /**
   * format of the pagination control
   * @default PaginationFormat.comboBox
   */
  format?: PaginationFormat;
}

export interface IPaginationStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;
  /**
   * Style for the Combo Box.
   */
  comboBox: IStyle;
  /**
   * Style for the page number.
   */
  pageNumber: IStyle;
  /**
   * Style for the previous, next, first, last page buttons.
   */
  previousNextPage: IStyle;
  /**
   * Style for the previous, next, first, last page buttons when they are disabled.
   */
  previousNextPageDisabled: IStyle;
  /**
   * Style for the visible item label.
   */
  visibleItemLabel: IStyle;
}
