import { ITheme, mergeStyleSets } from '../../Styling';
import { getStyles as getActionButtonStyles } from '../Button/ActionButton/ActionButton.styles';
import { IButtonClassNames } from '../Button/BaseButton.classNames';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';

/**
 * Function to override the getClassNames func in a button.
 */
export const getColorPickerGridCellButtonClassNames = memoizeFunction(
  (
    theme: ITheme,
    className: string,
    variantClassName: string,
    iconClassName: string | undefined,
    menuIconClassName: string | undefined,
    disabled: boolean,
    checked: boolean,
    expanded: boolean,
    isSplit: boolean | undefined
  ): IButtonClassNames => {
    const styles = getActionButtonStyles(theme);
    return mergeStyleSets({
      root: [
        'ms-Button',
        styles.root,
        variantClassName,
        className,
        checked && ['is-checked', styles.rootChecked],
        disabled && ['is-disabled', styles.rootDisabled],
        !disabled &&
          !checked && {
            selectors: {
              ':hover': styles.rootHovered,
              ':focus': styles.rootFocused,
              ':active': styles.rootPressed
            }
          },
        disabled && checked && [styles.rootCheckedDisabled],
        !disabled &&
          checked && {
            selectors: {
              ':hover': styles.rootCheckedHovered,
              ':active': styles.rootCheckedPressed
            }
          }
      ],
      flexContainer: ['ms-Button-flexContainer', styles.flexContainer]
    });
  }
);
