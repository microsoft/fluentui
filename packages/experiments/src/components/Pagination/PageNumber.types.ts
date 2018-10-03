export interface IPageNumberProps {
  /** The call back function when click on the page number . */
  applyPage: (page: number) => void;

  /** The page number. This should be starting from 1, i.e., index + 1 */
  page: number;

  /** If this page if currently selected */
  selected: boolean;

  /** The aria label template. Should contain one place holder, e.g. Page {0} */
  pageAriaLabel?: string;

  /** The className */
  className?: string;
}
