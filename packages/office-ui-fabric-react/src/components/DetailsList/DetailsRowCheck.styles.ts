import { IDetailsRowCheckStyleProps, IDetailsRowCheckStyles } from './DetailsRowCheck.types';
import { getGlobalClassNames, getFocusStyle } from '../../Styling';
import { IsFocusVisibleClassName } from '@uifabric/utilities';

const GlobalClassNames = {
  root: 'ms-DetailsRow-check',
  isDisabled: 'ms-DetailsRow-check--isDisabled',
  isHeader: 'ms-DetailsRow-check--isHeader',
  compact: 'ms-DetailsList--Compact'
};

export const getStyles = (props: IDetailsRowCheckStyleProps): IDetailsRowCheckStyles => {
  const { theme, className, isHeader, isVisible, selected, anySelected, canSelect, compact } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      !canSelect && [classNames.isDisabled, { visibility: 'hidden' }],
      isHeader && classNames.isHeader,
      className
    ],
    check: [
      getFocusStyle(theme),
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
        height: 40,
        width: 40,
        padding: 0,
        margin: 0,
        selectors: {
          '&:hover': {
            opacity: 1
          },
          '&.isHeader': {
            height: 32
          },
          [IsFocusVisibleClassName]: {
            opacity: 1
          }
        }
      },
      compact && {
        height: 32
      },
      (selected || isVisible || anySelected) && {
        opacity: '1'
      }
    ],
    isDisabled: []
  };
};
