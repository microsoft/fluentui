import { mergeStyles } from '../../Styling';
import { memoizeFunction } from '../../Utilities';
import { IYearPickerStyles } from "./YearPicker.styles";

interface IYearPickerClassNames {
  root?: string;
  header?: string;
  title?: string;
  navContainer?: string;
  navPrev?: string;
  navNext?: string;
  body?: string;
  optionGrid?: string;
  optionGridCell?: string;
}

const getClassNames = memoizeFunction((styles: IYearPickerStyles, className?: string): IYearPickerClassNames => {
  return {
    root: mergeStyles("ms-YearPicker", styles.root),
    header: mergeStyles("ms-YearPicker-header", styles.header),
    title: mergeStyles("ms-YearPicker-title", styles.title),
    navContainer: mergeStyles("ms-YearPicker-nav-container", styles.navContainer),
    navPrev: mergeStyles("ms-YearPicker-nav-prev", styles.navPrev),
    navNext: mergeStyles("ms-YearPicker-nav-next", styles.navNext),
    body: mergeStyles("ms-YearPicker-body", styles.body),
    optionGrid: mergeStyles("ms-YearPicker-option-grid", styles.optionGrid),
    optionGridCell: mergeStyles("ms-YearPicker-option-grid-cell", styles.optionGridCell)
  }
});

export { IYearPickerClassNames, getClassNames }