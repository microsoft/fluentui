import { IStyle, ITheme } from '../../Styling';
import { IStyleFunctionOrObject, IRefObject } from '../../Utilities';

export interface IPagination {}

export interface IPaginationProps {
  /**
   * The total number of pages.
   */
  pageCount: number;

  /**
   * label for the next page button
   * @default '>>'
   */
  nextLabel?: string;

  /**
   * label for the previous page button
   * @default '<<'
   */
  previousLabel?: string;

  /**
   * The label representing omitted page numbers.
   * @default '...'
   */
  omissionLabel?: string;

  /**
   * The page range to show around the selected page. e.g., if this is 2, there will be 2 page numbers in total
   * showing next to the selected page on the left and/or the right
   * @default 2
   */
  pageRange?: number;

  /**
   * The number of pages in the beginning and the end of the list.
   * @default 1
   */
  marginPages?: number;

  /**
   * Selected page index
   * @default 0
   */
  selectedPageIndex?: number;

  /**
   * aria label for the next page button
   */
  nextAriaLabel?: string;

  /**
   * aria label for the previous page button
   */
  previousAriaLabel?: string;

  /**
   * aria label for the omitted pages
   */
  omittedPagesAriaLabel?: string;

  /**
   * aria label for the page buttons
   */
  pageAriaLabel?: string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IPaginationStyleProps, IPaginationStyles>;

  /**
   * Optional callback to access the IPagination interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IPagination>;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * The call back function to load another page in the table. This needs to be defined in the parent component.
   */
  onPageChange?: (index: number) => void;
}

export interface IPaginationStyleProps {
  theme: ITheme;
}

export interface IPaginationStyles {
  /**
   * Style for the root element in the default enabled/unchecked state.
   */
  root: IStyle;
  pageNumber: IStyle;
  previousNextPage: IStyle;
  omission: IStyle;
}
