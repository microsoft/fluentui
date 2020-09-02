import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { screenReaderContainerStyles } from '../../../../utils/accessibility/Styles/accessibilityStyles';
import { ListItemStylesProps } from '../../../../components/List/ListItem';
import { listItemContentClassName } from '../../../../components/List/ListItemContent';
import { listItemContentMediaClassName } from '../../../../components/List/ListItemContentMedia';
import { listItemEndMediaClassName } from '../../../../components/List/ListItemEndMedia';
import { listItemHeaderClassName } from '../../../../components/List/ListItemHeader';
import { listItemHeaderMediaClassName } from '../../../../components/List/ListItemHeaderMedia';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { ListItemVariables } from './listItemVariables';

const selectableHoverStyle = (p: ListItemStylesProps, v): ICSSInJSStyle => ({
  background: v.selectableFocusHoverBackgroundColor,
  color: v.selectableFocusHoverColor,
  cursor: 'pointer',

  [`& .${listItemHeaderClassName}`]: { color: 'inherit' },
  [`& .${listItemContentClassName}`]: { color: 'inherit' },

  // hide the header media and content media on hover
  [`& .${listItemHeaderMediaClassName}`]: {
    ...screenReaderContainerStyles,
    color: 'inherit',
  },
  [`& .${listItemContentMediaClassName}`]: { display: 'none', color: 'inherit' },

  // show the end media on hover
  [`& .${listItemEndMediaClassName}`]: { display: 'block', color: 'inherit' },
});

const selectedStyle = variables => ({
  background: variables.selectedBackgroundColor,
  color: variables.selectedColor,
});

export const listItemStyles: ComponentSlotStylesPrepared<ListItemStylesProps, ListItemVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
    });

    return {
      display: 'flex',
      alignItems: 'center',
      minHeight: v.minHeight,
      padding: v.rootPadding,
      ...((p.selectable || p.navigable) && {
        position: 'relative',

        // hide the end media by default
        [`& .${listItemEndMediaClassName}`]: { display: 'none' },

        '&:hover': selectableHoverStyle(p, v),
        ':focus': borderFocusStyles[':focus'],
        ':focus-visible': {
          ...borderFocusStyles[':focus-visible'],
          zIndex: v.zIndex,
        },

        ...(p.selected && selectedStyle(v)),
      }),
      ...(p.important && {
        fontWeight: v.importantFontWeight,
      }),
    };
  },

  headerWrapper: () => ({
    display: 'flex',
  }),

  contentWrapper: () => ({
    display: 'flex',
  }),

  main: () => ({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minWidth: 0, // needed for the truncate styles to work
  }),
};
