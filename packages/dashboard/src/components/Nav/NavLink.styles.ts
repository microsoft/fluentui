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
    root: {
      color: navTextColor,
      textDecoration: 'none',
      display: 'flex',
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
    iconContainer: [
      {
        position: 'relative',
        display: 'flex',
        flex: '0 0 48px',
        selectors: {
          '::before': [
            {
              content: '" "',
              justifySelf: 'flex-start',
              width: '2px',
              height: '24px',
              backgroundColor: DefaultPalette.accent,
              opacity: 0,
              transition: 'opacity 300ms'
            },
            isNested && {
              height: '18px'
            },
            ((!isNavCollapsed && !isExpanded && hasSelectedNestedLink) || // Nav is open, L2 menu collapsed, L2 has a selected link => true
            (!isNavCollapsed && !hasNestedMenu && isSelected) || // Nav is open, is an L2 menu, is selected => true
              (isNavCollapsed && isSelected)) && {
              // Nav is closed, is selected regardless of L1 or L2 => true
              opacity: 1
            }
          ],
          '::after': {
            content: '" "',
            flex: '1 1 auto',
            order: 2
          }
        }
      },
      isNavCollapsed &&
        isNested && {
          flex: '0 0 12px'
        }
    ],
    icon: {
      fontSize: navIconSize,
      color: DefaultPalette.black,
      justifySelf: 'flex-end',
      order: 3
    },
    secondaryItemContainer: {},
    secondaryIcon: [
      {
        fontSize: navIconSize,
        color: DefaultPalette.black,
        transition: 'transform 200ms'
      },
      isExpanded && {
        transform: 'rotate(-180deg)'
      }
    ],
    text: [
      {
        flex: '1 1 auto',
        lineHeight: isNested ? navChildItemHeight : navItemHeight,
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
