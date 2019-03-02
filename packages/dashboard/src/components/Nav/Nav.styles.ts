import { DefaultPalette, FontSizes, FontWeights, AnimationClassNames } from 'office-ui-fabric-react/lib/Styling';
import { INavLinkProps, INavStyles } from './Nav.types';

// Get the browser scrollbar width because they're all different
let scrollBarWidth: number = 0;
const scrollDiv: HTMLDivElement = document.createElement('div');
scrollDiv.setAttribute('style', 'width: 100px;height: 100px;overflow: scroll;position: absolute;top: -999px;');
const contentDiv: HTMLElement = document.createElement('p');
contentDiv.setAttribute('style', 'width: 100px;height: 200px;');
scrollDiv.appendChild(contentDiv);
document.body.appendChild(scrollDiv);
scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
document.body.removeChild(scrollDiv);

// Nav
const navFontSize = FontSizes.medium;
const navTextColor = DefaultPalette.black;
const navWidth = 280 + scrollBarWidth;
const navCollapsedWidth = 48 + scrollBarWidth;
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

export const getStyles = (props: INavLinkProps): INavStyles => {
  const { isNavCollapsed, isExpanded, hasNestedMenu, isSelected, hasSelectedNestedLink, isNested } = props;

  return {
    // Nav
    root: {
      position: 'relative',
      flex: '0 0 auto'
    },
    navWrapper: {
      overflow: 'hidden',
      height: '100%'
    },
    navWrapperScroll: {
      selectors: {
        ':hover': {
          overflow: 'unset',
          marginRight: -scrollBarWidth + 'px'
        }
      }
    },
    navContainer: [
      {
        width: navWidth,
        backgroundColor: navBackgroundColor,
        color: navTextColor,
        transitionProperty: 'width',
        transitionDuration: '.2s',
        userSelect: 'none',
        fontSize: navFontSize,
        overflowY: 'scroll',
        overflowX: 'hidden',
        marginRight: -scrollBarWidth + 'px',
        height: '100%',
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
      isNavCollapsed && {
        width: navCollapsedWidth
      }
    ],
    navContainerScroll: {
      selectors: {
        ':hover': {
          marginRight: '0px'
        }
      }
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
    navItem: [
      isNavCollapsed && {
        selectors: {
          ':hover $nestedNavMenuWhenNavCollapsed, :focus $nestedNavMenuWhenNavCollapsed': {
            display: 'flex'
          }
        }
      }
    ],
    nestedNavMenu: [
      {
        display: isNavCollapsed || !isExpanded ? 'none' : 'flex',
        flexDirection: 'column',
        padding: 0
      },
      AnimationClassNames.slideDownIn20
    ],
    nestedNavMenuWhenNavCollapsed: [
      {
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
      AnimationClassNames.fadeIn400
    ],
    nestedNavLinksWrapper: {
      boxShadow: '0 1.2px 3.6px rgba(0, 0, 0, 0.09), 0 6.4px 14.4px rgba(0, 0, 0, 0.11)',
      width: '230px',
      padding: '48px 0 0',
      marginTop: '-48px',
      backgroundColor: 'rgba(255,255,255,.95)',
      selectors: {
        '@supports((backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px)))': {
          backgroundColor: 'rgba(255,255,255,.8)'
        }
      }
    },
    nestedNavLinksWhenNavCollapsed: [
      {
        padding: 0
      },
      AnimationClassNames.slideRightIn10
    ],
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
