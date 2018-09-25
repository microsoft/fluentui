/* tslint:disable */
import { DefaultPalette, FontSizes, FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { INavStyleProps, INavLinkProps, INavStyles } from './Nav.types';

// Nav
const navFontSize = FontSizes.medium;
const navTextColor = DefaultPalette.black;
const navWidth = 280;
const navCollapsedWidth = 48;
const navBackgroundColor = '#E5E5E5';
const navItemSelectedColor = '#B7B7B7';

// NavGroup
const navDividerHeight = 21;
const navDividerColor = 'rgba(0,0,0,.2)';
const navItemHeight = 48;

// NavLinkGroup
const navItemWithChildBgColor = '#CCCCCC';

// NavLink
const navIconSize = FontSizes.icon;
const navChildItemHeight = 32;
const navItemHoverColor = '#CCCCCC';

// Will need these later
// const navFloatingWidth = 230;

export const getStyles = (props: INavStyleProps & INavLinkProps): INavStyles => {
  const { isNavCollapsed, isExpanded, hasNestedMenu, isSelected, hasSelectedNestedLink, isNested } = props;

  return {
    // Nav
    nav: {
      width: navWidth,
      backgroundColor: navBackgroundColor,
      color: navTextColor,
      transitionProperty: 'width',
      transitionDuration: '.2s',
      userSelect: 'none',
      fontSize: navFontSize,
      selectors: {
        ul: {
          selectors: {
            li: {
              listStyleType: 'none'
            }
          }
        },
        a: {
          color: navTextColor,
          textDecoration: 'none',
          selectors: {
            ':focus': {
              backgroundColor: navItemSelectedColor
            }
          }
        }
      }
    },
    navCollapsed: {
      width: navCollapsedWidth
    },
    // NavGroup
    navGroup: {
      margin: 0,
      paddingLeft: 0
    },
    navGroupDivider: {
      display: 'block',
      position: 'relative',
      height: navDividerHeight,
      textAlign: 'center',
      selectors: {
        '::after': {
          content: '" "',
          width: 'calc(100% - 32px)',
          position: 'absolute',
          height: '1px',
          top: 10,
          left: '16px',
          backgroundColor: navDividerColor
        }
      }
    },
    navGroupTitle: {
      lineHeight: navItemHeight,
      color: DefaultPalette.black,
      fontWeight: FontWeights.bold,
      marginLeft: '16px'
    },
    navItem: {
      position: 'relative'
    },
    navItemWhenNavCollapsed: {
      position: 'relative',
      selectors: {
        ':hover $nestedNavMenuWhenNavCollapsed': {
          display: 'flex'
        }
      }
    },
    nestedNavMenu: {
      display: isNavCollapsed || !isExpanded ? 'none' : 'flex',
      flexDirection: 'column',
      padding: 0
    },
    nestedNavMenuCollapsed: {
      background: 'green'
    },
    nestedNavMenuWhenNavCollapsed: {
      display: 'none',
      flexDirection: 'row',
      flexWrap: 'wrap',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '278px',
      justifyContent: 'flex-end',
      selectors: {
        '> a': {
          zIndex: 1,
          backgroundColor: navBackgroundColor
        }
      }
    },
    nestedNavLinksWrapper: {
      boxShadow: '0 1.2px 3.6px rgba(0, 0, 0, 0.09), 0 6.4px 14.4px rgba(0, 0, 0, 0.11)'
    },
    nestedNavLinksWhenNavCollapsed: {
      width: '230px',
      padding: '48px 0 0',
      marginTop: '-48px',
      backgroundColor: 'rgba(255,255,255,.95)',
      selectors: {
        '@supports(backdrop-filter: blur(20px))': {
          backgroundColor: 'rgba(255,255,255,.8)',
          backdropFilter: 'blur(20px) saturate(125%)'
        }
      }
    },
    // NavLink
    navLink: {
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
        }
      }
    },
    navLinkSmall: {
      height: navChildItemHeight,
      lineHeight: navChildItemHeight
    },
    iconWrapper: {
      position: 'relative',
      display: 'flex',
      flex: isSelected || hasSelectedNestedLink ? '0 0 32px' : '0 0 48px',
      alignItems: 'center',
      justifyContent: 'center'
    },
    nestedIconWrapper: {
      flex: '0 0 12px'
    },
    navItemBarMarker: {
      position: 'absolute',
      left: '4px',
      top: '12px',
      width: '2px',
      height: '24px',
      backgroundColor: DefaultPalette.accent
    },
    navItemBarMarkerSmall: {
      position: 'absolute',
      right: '6px',
      top: '7px',
      width: '2px',
      height: '18px',
      backgroundColor: DefaultPalette.accent
    },
    hidden: {
      display: 'none'
    },
    navItemIcon: {
      fontSize: navIconSize,
      lineHeight: isNested ? navChildItemHeight : navItemHeight,
      color: DefaultPalette.black
    },
    navItemText: {
      flex: '1 1 auto',
      lineHeight: isNested ? navChildItemHeight : navItemHeight,
      marginLeft: hasSelectedNestedLink || (!hasNestedMenu && isSelected && !isNested) ? '8px' : '0px',
      textOverflow: 'ellipsis',
      overflowX: 'hidden',
      whiteSpace: 'nowrap',
      color: DefaultPalette.black
    }
  };
};

/* tslint:enable */
