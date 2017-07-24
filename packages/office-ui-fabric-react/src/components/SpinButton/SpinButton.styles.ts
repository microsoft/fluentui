import { memoizeFunction } from '../../Utilities';
import { ISpinButtonStyles } from './SpinButton.Props';
import { ITheme, mergeStyleSets } from '../../Styling';

export const getStyles = memoizeFunction((
  customStyles: Partial<ISpinButtonStyles>,
  theme: ITheme
): ISpinButtonStyles => {
  const defaultStyles: ISpinButtonStyles = {
    container: {
      outline: 'none',
      fontSize: '12px',
      width: '100%',
      minWidth: '86px',
      padding: '2px',
    },
    labelWrapper: {
      display: 'inline-flex'
    },
    icon: {
      padding: '2px 5px',
      fontSize: '20px'
    },
    label: {

    },
    root: {
      display: 'flex',
      height: '26px',
      minWidth: '86px'
    },
    rootTopBottom: {
      width: '100%'
    },
    input: {

    },
    arrowBox: {

    },
    arrowButton: {
      display: 'block',
      height: '50%',
      width: '12px',
      padding: '0px',
      backgroundColor: 'transparent',
      textAlign: 'center',
      cursor: 'default',
      fontSize: '6px',
      color: '$ms-color-neutralPrimary'
    },
    arrowButtonHovered: {
      backgroundColor: '$ms-color-neutralLight'
    },
    arrowButtonActive: {

    },
    arrowButtonDisabled: {
      opacity: '0',
      // High contrast styles.
    },

  };
  return mergeStyleSets(defaultStyles, customStyles) as ISpinButtonStyles;
});