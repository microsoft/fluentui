import { pxToRem } from '../../../../utils';

export interface TableVariables {
  color: string;
  hoverColor: string;
  backgroundColor: string;
  backgroundHoverColor: string;
  borderWidth: string;
  headerBorderColor: string;
  headerBorderHoverColor: string;
  headerBorderFocusColor: string;
  rowBorderColor: string;
  rowBorderHoverColor: string;
  rowBorderFocusColor: string;
  cellBorderColor: string;
  cellBorderHoverColor: string;
  cellBorderFocusColor: string;
  defaultRowHeight: string;
  compactRowHeight: string;
  minCellWidth: string;
  cellPadding: string;
  rowPadding: string;
  headerFontSize: string;
  bodyFontSize: string;
}

export const tableVariables = (siteVariables): Partial<TableVariables> => {
  return {
    color: siteVariables.colorScheme.default.foreground,
    hoverColor: siteVariables.colorScheme.default.foregroundHover,
    backgroundColor: siteVariables.colorScheme.default.background,
    backgroundHoverColor: siteVariables.colorScheme.default.backgroundHover1,
    defaultRowHeight: pxToRem(48),
    compactRowHeight: pxToRem(36),
    minCellWidth: '0',
    cellPadding: `0 ${pxToRem(8)}`,
    rowPadding: '0',
    headerFontSize: pxToRem(12),
    bodyFontSize: pxToRem(13),
    borderWidth: pxToRem(1),
    headerBorderColor: siteVariables.colorScheme.default.backgroundHover1,
    headerBorderHoverColor: 'transparent',
    headerBorderFocusColor: 'transparent',
    rowBorderColor: siteVariables.colorScheme.default.backgroundHover1,
    rowBorderHoverColor: siteVariables.colorScheme.default.backgroundHover1,
    rowBorderFocusColor: siteVariables.colorScheme.default.borderFocus,
    cellBorderColor: 'transparent',
    cellBorderHoverColor: 'transparent',
    cellBorderFocusColor: siteVariables.colorScheme.default.borderFocus,
  };
};
