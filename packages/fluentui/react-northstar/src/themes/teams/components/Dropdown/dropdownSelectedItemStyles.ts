import {
  DropdownSelectedItemStylesProps,
  dropdownSelectedItemSlotClassNames,
} from '../../../../components/Dropdown/DropdownSelectedItem';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DropdownVariables } from './dropdownVariables';
import { getIconFillOrOutlineStyles } from '../../getIconFillOrOutlineStyles';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { pxToRem } from '../../../../utils';

export const dropdownSelectedItemStyles: ComponentSlotStylesPrepared<
  DropdownSelectedItemStylesProps,
  DropdownVariables
> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const borderFocusStyles = getBorderFocusStyles({ variables: siteVariables });

    return {
      display: 'inline-flex',
      alignItems: 'center',
      // overflow: 'hidden',
      padding: `0 ${pxToRem(4)} 0 ${pxToRem(4)}`,
      startPaddingLeft: '0px',
      lineHeight: pxToRem(20),
      borderRadius: pxToRem(9999),
      fontSize: pxToRem(14),
      ...(p.hasImage && { paddingLeft: '0px' }),
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
        [`& .${dropdownSelectedItemSlotClassNames.icon}`]: {
          color: v.selectedItemIconColorHover,
        },
      },
      ':focus-visible': {
        ':after': borderFocusStyles[':focus-visible'][':after'],
      },
    };
  },
  image: (): ICSSInJSStyle => ({
    height: pxToRem(20),
    width: pxToRem(20),
  }),
  header: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      ...(p.hasImage && { marginLeft: pxToRem(3) }),
      marginRight: pxToRem(3),
    };
  },
  icon: ({ variables: v }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: pxToRem(16),
    height: pxToRem(16),
    '& > :first-child': {
      height: '100%',
      width: '100%',
      '& svg': {
        height: '100%',
        width: '100%',
      },
    },
    cursor: 'pointer',
    color: v.selectedItemIconColor,
    ...getIconFillOrOutlineStyles({ outline: true }),
    ':hover': {
      color: v.selectedItemIconColorHover,
      ...getIconFillOrOutlineStyles({ outline: false }),
    },
  }),
};
