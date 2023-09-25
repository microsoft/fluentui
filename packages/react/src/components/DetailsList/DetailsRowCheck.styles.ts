import { getGlobalClassNames, getFocusStyle } from '../../Styling';
import { DEFAULT_ROW_HEIGHTS } from './DetailsRow.styles';
import { HEADER_HEIGHT } from './DetailsHeader.styles';
import { CheckGlobalClassNames } from '../../components/Check/Check.styles';
import type { IDetailsRowCheckStyleProps, IDetailsRowCheckStyles } from './DetailsRowCheck.types';

const GlobalClassNames = {
  root: 'ms-DetailsRow-check',
  isDisabled: 'ms-DetailsRow-check--isDisabled',
  isHeader: 'ms-DetailsRow-check--isHeader',
};

export const CHECK_CELL_WIDTH = 48;

export const getDetailsRowCheckStyles = (props: IDetailsRowCheckStyleProps): IDetailsRowCheckStyles => {
  const { theme, className, isHeader, selected, anySelected, canSelect, compact, isVisible } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);
  const { rowHeight, compactRowHeight } = DEFAULT_ROW_HEIGHTS;

  const height = isHeader ? HEADER_HEIGHT : compact ? compactRowHeight : rowHeight;

  const isCheckVisible = isVisible || selected || anySelected;

  return {
    root: [classNames.root, className],

    check: [
      !canSelect && classNames.isDisabled,
      isHeader && classNames.isHeader,
      getFocusStyle(theme),
      theme.fonts.small,
      CheckGlobalClassNames.checkHost,
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'default',
        boxSizing: 'border-box',
        verticalAlign: 'top',
        background: 'none',
        backgroundColor: 'transparent',
        border: 'none',
        opacity: isCheckVisible ? 1 : 0,
        height,
        width: CHECK_CELL_WIDTH,
        padding: 0,
        margin: 0,
      },
    ],

    isDisabled: [],
  };
};
