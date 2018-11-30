import { IDetailsRowCheckStyleProps, IDetailsRowCheckStyles } from './DetailsRowCheck.types';
import { DEFAULT_ROW_HEIGHTS } from './DetailsRow.styles';
import { getGlobalClassNames, getFocusStyle } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-DetailsRow-check',
  isDisabled: 'ms-DetailsRow-check--isDisabled',
  isHeader: 'ms-DetailsRow-check--isHeader'
};

export const getStyles = (props: IDetailsRowCheckStyleProps): IDetailsRowCheckStyles => {
  const { theme, className, isHeader, selected, anySelected, canSelect, compact, isVisible } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);
  const { rowHeight, compactRowHeight } = DEFAULT_ROW_HEIGHTS;

  const height = isHeader ? 32 : compact ? compactRowHeight : rowHeight;

  const isCheckVisible = isVisible || selected || anySelected;

  return {
    root: [classNames.root, className],

    check: [
      !canSelect && [classNames.isDisabled, { visibility: 'hidden' }],
      isHeader && classNames.isHeader,
      getFocusStyle(theme),
      theme.fonts.small,
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
        opacity: 0,
        height: height,
        width: 40,
        padding: 0,
        margin: 0,
        selectors: {
          '&:hover': {
            opacity: 1
          }
        }
      },

      isCheckVisible && {
        opacity: 1
      }
    ],

    isDisabled: []
  };
};
