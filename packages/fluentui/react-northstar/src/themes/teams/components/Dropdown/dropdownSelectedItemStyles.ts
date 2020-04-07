import {
  default as DropDownSelectedItem,
  DropdownSelectedItemProps,
} from '../../../../components/Dropdown/DropdownSelectedItem';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DropdownVariables } from './dropdownVariables';
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles';
import getBorderFocusStyles from '../../getBorderFocusStyles';
import { pxToRem } from '../../../../utils';

const dropdownSelectedItemStyles: ComponentSlotStylesPrepared<DropdownSelectedItemProps, DropdownVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const borderFocusStyles = getBorderFocusStyles({ variables: siteVariables });

    return {
      cursor: 'pointer',
      margin: '.25rem 0 0 .4rem',
      color: v.selectedItemColor,
      position: 'relative',
      border: v.selectedItemBorder,
      height: pxToRem(24),
      overflow: 'visible',
      outline: 0,
      fontWeight: siteVariables.fontWeightSemibold,
      ...(v.selectedItemBackgroundColor && {
        backgroundColor: v.selectedItemBackgroundColor,
      }),
      ':focus': {
        color: v.selectedItemColorFocus,
      },
      ':hover': {
        color: v.selectedItemColorHover,
        backgroundColor: v.selectedItemBackgroundColorHover,
        [`& .${DropDownSelectedItem.slotClassNames.icon}`]: {
          color: v.selectedItemIconColorHover,
        },
      },
      ':focus-visible': {
        ':after': borderFocusStyles[':focus-visible'][':after'],
      },
    };
  },
  icon: ({ variables: v }) => ({
    color: v.selectedItemIconColor,
    ...getIconFillOrOutlineStyles({ outline: true }),
    ':hover': {
      color: v.selectedItemIconColorHover,
      ...getIconFillOrOutlineStyles({ outline: false }),
    },
  }),
};

export default dropdownSelectedItemStyles;
