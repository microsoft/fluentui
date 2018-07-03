import { IDetailsRowCheckStyleProps, IDetailsRowCheckStyles } from './DetailsRowCheck.types';
import { getGlobalClassNames, getFocusStyle } from '../../Styling';
import { IsFocusVisibleClassName } from '@uifabric/utilities';

const GlobalClassNames = {
  root: 'ms-DetailsRow-check',
  isDisabled: 'ms-DetailsRow-check--isDisabled',
  isHeader: 'ms-DetailsRow-check--isHeader'
};

export const getStyles = (props: IDetailsRowCheckStyleProps): IDetailsRowCheckStyles => {
  const { theme, className, isHeader, selected, anySelected, canSelect, compact } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const isVisible = selected || anySelected;

  return {
    root: [
      classNames.root,
      !canSelect && [classNames.isDisabled, { visibility: 'hidden' }],
      isHeader && classNames.isHeader,
      isVisible && { opacity: 1 },
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
        height: compact ? 32 : 40,
        width: 40,
        padding: 0,
        margin: 0,
        selectors: {
          '$owner:hover &': {
            opacity: 1
          },
          '&:hover': {
            opacity: 1
          },
          '&.isHeader': {
            height: 32
          },
          [`${IsFocusVisibleClassName} &`]: {
            opacity: 1
          }
        }
      }
    ],

    owner: [],

    isDisabled: []
  };
};
