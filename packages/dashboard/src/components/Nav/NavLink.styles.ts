import { DefaultPalette, FontSizes } from 'office-ui-fabric-react';

import { INavLinkStyles, INavLinkStyleProps } from './NavLink.types';
import { navTextColor, navItemHeight } from './Nav.styles';

const navIconSize = FontSizes.icon;
const navChildItemHeight = 32;
const navItemHoverColor = '#CCCCCC';
const navItemSelectedColor = '#B7B7B7';
const navItemWithChildBgColor = '#CCCCCC';

export const getStyles = (props: INavLinkStyleProps): INavLinkStyles => {
  const { isNavCollapsed, isExpanded, hasNestedMenu, isSelected, hasSelectedNestedLink, isNested } = props;
  return {
    // NavLink
    navLink: {
      color: navTextColor,
      textDecoration: 'none',
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      cursor: 'pointer',
      selectors: {
        ':hover': {
          backgroundColor: hasNestedMenu ? navItemWithChildBgColor : navItemHoverColor
        },
        ':active': {
          backgroundColor: navItemSelectedColor
        },
        ':focus': {
          backgroundColor: navItemSelectedColor
        }
      }
    },
    iconWrapper: [
      {
        position: 'relative',
        display: 'flex',
        flex: '0 0 48px',
        alignItems: 'center',
        justifyContent: 'center'
      },
      (isSelected || hasSelectedNestedLink) && {
        flex: '0 0 32px'
      },
      isNavCollapsed &&
        isNested && {
          flex: '0 0 12px'
        }
    ],
    navItemBarMarker: [
      {
        position: 'absolute',
        left: '4px',
        top: '12px',
        width: '2px',
        height: '24px',
        backgroundColor: DefaultPalette.accent,
        opacity: 0,
        transition: 'opacity 300ms'
      },
      isNested && {
        left: 'unset',
        right: '6px',
        top: '7px',
        height: '18px'
      },
      ((!isNavCollapsed && !isExpanded && hasSelectedNestedLink) || // Nav is open, L2 menu collapsed, L2 has a selected link => true
      (!isNavCollapsed && !hasNestedMenu && isSelected) || // Nav is open, is an L2 menu, is selected => true
        (isNavCollapsed && isSelected)) && {
        // Nav is closed, is selected regardless of L1 or L2 => true
        opacity: 1
      }
    ],
    navItemIcon: [
      {
        fontSize: navIconSize,
        lineHeight: isNested ? navChildItemHeight : navItemHeight,
        color: DefaultPalette.black,
        transition: 'transform 200ms'
      },
      isNested && {
        height: navChildItemHeight,
        lineHeight: navChildItemHeight
      },
      isExpanded && {
        transform: 'rotate(-180deg)'
      }
    ],
    navItemText: [
      {
        flex: '1 1 auto',
        lineHeight: isNested ? navChildItemHeight : navItemHeight,
        marginLeft: hasSelectedNestedLink || (!hasNestedMenu && isSelected && !isNested) ? '8px' : '0px',
        textOverflow: 'ellipsis',
        overflowX: 'hidden',
        whiteSpace: 'nowrap',
        color: DefaultPalette.black
      },
      isNested && {
        height: navChildItemHeight,
        lineHeight: navChildItemHeight
      }
    ]
  };
};
