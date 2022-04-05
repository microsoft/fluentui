export interface IPageNumberProps {
  /** The call back function when click on the page number . */
  onClick: (page: number) => void;
  /** The page number. This should be starting from 1, i.e., index + 1 */
  page: number;
  /** If this page if currently selected */
  selected: boolean;
  /** The aria label template.*/
  ariaLabel?: string;
  /** The className */
  className?: string;
}
