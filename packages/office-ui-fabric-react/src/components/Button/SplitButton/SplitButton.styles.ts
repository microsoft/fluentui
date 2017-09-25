import { IButtonStyles } from '../Button.Props';
import {
  ITheme,
  mergeStyleSets
} from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: IButtonStyles
): IButtonStyles => {
  let splitButtonStyles: IButtonStyles = {
    splitButtonContainer: {
      position: 'relative',
      display: 'inline-block',
      border: '1px solid transparent',

      selectors: {
        ':focus': {
          outline: 'none!important',
          border: '1px solid'
        }
      }
    },

    splitButtonMenuButton: {
      padding: '6px',
      height: 'auto',
      boxSizing: 'border-box',
      border: '1px solid transparent',
      outline: 'transparent',
      userSelect: 'none',
      display: 'inline-block',
      textDecoration: 'none',
      textAlign: 'center',
      cursor: 'pointer',
      verticalAlign: 'top',
      width: '32px'
    },

    splitButtonMenuButtonDisabled: {
      pointerEvents: 'none',
      selectors: {
        ':hover': {
          cursor: 'default'
        }
      }
    },

    splitButtonFlexContainer: {
      display: 'flex',
      height: '100%',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'center'
    },
  };

  return mergeStyleSets(splitButtonStyles, customStyles)!;
});
