import { IDetailsRowCheckStyleProps, IDetailsRowCheckStyles } from './DetailsRowCheck.types';
import { getGlobalClassNames, IStyle, getFocusStyle } from '../../Styling';
import { IsFocusVisibleClassName } from '@uifabric/utilities';

const GlobalClassNames = {
  root: 'ms-DetailsRow-check',
  isDisabled: 'ms-DetailsRow-check--isDisabled',
  isHeader: 'ms-DetailsRow-check--isHeader',
  compact: 'ms-DetailsList--Compact'
};

export const getStyles = (props: IDetailsRowCheckStyleProps): IDetailsRowCheckStyles => {
  const { theme, className, isHeader, canSelect } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const ownerHighlightStyles: IStyle = {
    selectors: {
      $check: {
        opacity: '1'
      }
    }
  };

  return {
    root: [
      classNames.root,
      !canSelect && `${classNames.isDisabled} $isDisabled`,
      isHeader && `${classNames.isHeader} $isHeader`,
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
          '&.isHeader': {
            height: 32
          },
          [classNames.compact!]: {
            height: 32
          },
          [IsFocusVisibleClassName]: {
            opacity: 1
          }
        }
      }
    ],
    owner: [
      {
        selectors: {
          [`${IsFocusVisibleClassName} $check`]: {
            opacity: 1
          },
          '&.$isSelected': ownerHighlightStyles,
          '&.$isVisible': ownerHighlightStyles,
          '&.$anySelected': ownerHighlightStyles,
          '&:hover': ownerHighlightStyles
        }
      }
    ],
    isDisabled: [
      {
        visibility: 'hidden'
      }
    ],
    isSelected: [],
    isVisible: [],
    anySelected: []
  };
};
