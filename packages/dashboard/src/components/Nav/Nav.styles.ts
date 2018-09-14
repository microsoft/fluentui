/* tslint:disable */
import { IStyle, DefaultPalette, FontWeights, FontSizes } from 'office-ui-fabric-react/lib/Styling';
import { INavStyleProps, INavStyles } from './Nav.types';

export type INavItemStyle = {
  root?: IStyle;
  iconColumn?: IStyle;
  nameColumn?: IStyle;
};

export type IFloatingNavStyle = IStyle & {
  root?: IStyle;
  withChild?: IStyle;
};

const navFontSize = FontSizes.medium;
const navIconSize = FontSizes.icon;
const navTextColor = DefaultPalette.black;
const navWidth = 280;
const navCollapsedWidth = 48;
const navItemHeight = 48;
const navChildItemHeight = 32;
const navBackgroundColor = '#E5E5E5';
const navItemHoverColor = '#CCCCCC';
const navDividerHeight = 21;
const navDividerColor = 'rgba(0,0,0,.2)';
const navItemWithChildBgColor = '#CCCCCC';
const navItemSelectedColor = '#B7B7B7';
// Will need these later
// const navFloatingWidth = 230;
// const BackDropSelector = '@supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px))';

export const getStyles = (props: INavStyleProps): INavStyles => {
  const { isSelected, hasChildren, nestingLevel, isChildLinkSelected } = props;

  return {
    root: {
      width: navWidth,
      backgroundColor: navBackgroundColor,
      color: navTextColor,
      transitionProperty: 'width',
      transitionDuration: '.3s',
      selectors: {
        ul: {
          listStyleType: 'none',
          padding: 0,
          margin: 0,
          fontSize: navFontSize
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

    //
    // Everything below this needs to be brought above or deleted
    //
    navItemRoot: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      cursor: 'pointer',

      selectors: {
        ':hover': {
          backgroundColor: hasChildren ? navItemWithChildBgColor : navItemHoverColor
        },
        ':active': {
          backgroundColor: navItemSelectedColor
        }
      }
    },
    navItemSmall: {
      height: navChildItemHeight,
      lineHeight: navChildItemHeight
    },
    nestedNavLink: {},
    nestedNavLinkCollapsed: {
      display: 'none'
    },
    iconWrapper: {
      position: 'relative',
      display: 'flex',
      flex: isSelected || isChildLinkSelected ? '0 0 32px' : '0 0 48px',
      alignItems: 'center',
      justifyContent: 'center'
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
      left: '41px',
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
      lineHeight: !!nestingLevel && nestingLevel > 0 ? navChildItemHeight : navItemHeight,
      color: DefaultPalette.black
    },
    navItemText: {
      flex: '1 1 auto',
      lineHeight: !!nestingLevel && nestingLevel > 0 ? navChildItemHeight : navItemHeight,
      marginLeft: isChildLinkSelected || (!hasChildren && isSelected && !(nestingLevel && nestingLevel > 0)) ? '8px' : '0px',
      textOverflow: 'ellipsis',
      overflowX: 'hidden',
      whiteSpace: 'nowrap',
      color: DefaultPalette.black
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
    }
  };
};

/* tslint:enable */
