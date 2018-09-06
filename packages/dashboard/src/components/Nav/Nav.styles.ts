/* tslint:disable */
import {
  IStyle,
  AnimationClassNames,
  DefaultPalette,
  FontWeights,
  FontSizes
} from 'office-ui-fabric-react/lib/Styling';
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
const navFloatingWidth = 230;
const navItemHeight = 48;
const navChildItemHeight = 32;
const navBackgroundColor = '#E5E5E5';
const floatingNavBackgroundColor = 'rgba(255,255,255,1)';
const navItemHoverColor = '#CCCCCC';
const navGroupSeparatorItemHeight = 40;
const navGroupSeparatorWithGroupNameHeight = 70;
const navItemWithChildBgColor = '#CCCCCC';
const navItemSelectedColor = '#B7B7B7';
const navFloatingItemIndentSize = 20;
const BackDropSelector = '@supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px))';

export const getStyles = (props: INavStyleProps): INavStyles => {
  const { isSelected, hasChildren, nestingLevel, isCollapsed, scrollTop, isChildLinkSelected, hasGroupName } = props;

  return {
    root: {
      width: isCollapsed ? navCollapsedWidth : navWidth,
      backgroundColor: navBackgroundColor,
      color: navTextColor,
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
    iconWrapper: {
      position: 'relative',
      display: 'flex',
      flex: isSelected || isChildLinkSelected ? '0 0 32px' : '0 0 48px',
      alignItems: 'center',
      justifyContent: 'center'
    },
    navItemBarMarker: {
      position: 'absolute',
      left: !!nestingLevel && nestingLevel > 0 && !hasChildren ? '-10px' : '6px',
      top: !!nestingLevel && nestingLevel > 0 ? '7px' : '12px',
      width: '2px',
      height: !!nestingLevel && nestingLevel > 0 ? '18px' : '24px',
      backgroundColor: DefaultPalette.accent,
      display: isSelected || isChildLinkSelected ? 'block' : 'none'
    },
    navItemIcon: {
      fontSize: navIconSize,
      lineHeight: !!nestingLevel && nestingLevel > 0 ? navChildItemHeight : navItemHeight,
      color: DefaultPalette.black
    },
    navItemText: {
      flex: '1 1 auto',
      lineHeight: !!nestingLevel && nestingLevel > 0 ? navChildItemHeight : navItemHeight,
      marginLeft:
        isChildLinkSelected || (!hasChildren && isSelected && !(nestingLevel && nestingLevel > 0)) ? '8px' : '0px',
      textOverflow: 'ellipsis',
      overflowX: 'hidden',
      whiteSpace: 'nowrap',
      color: DefaultPalette.black
    },
    navSlimItemRoot: {
      selectors: {
        ':hover': {
          backgroundColor: hasChildren ? navItemWithChildBgColor : navItemHoverColor
        }
      }
    },
    navFloatingRoot: [
      {
        display: 'none',
        zIndex: 1901,
        position: 'absolute',
        marginLeft: navCollapsedWidth,
        marginTop: -navItemHeight - (!!scrollTop && scrollTop > 0 ? scrollTop : 0),
        width: navFloatingWidth,
        color: navTextColor,
        boxShadow: '0px 1.2px 3.6px rgba(0, 0, 0, 0.18), 0px 6.4px 14.4px rgba(0, 0, 0, 0.22)',
        backgroundColor: floatingNavBackgroundColor,
        opacity: '0.6',
        selectors: {
          [BackDropSelector]: {
            webkitBackdropFilter: 'blur(20px) saturate(125%)',
            backdropFilter: 'blur(20px) saturate(125%)',
            backgroundColor: 'rgba(255,255,255,.6)'
          },
          a: {
            width: '100%',
            backgroundColor: 'inherit'
          }
        }
      },
      AnimationClassNames.slideRightIn20
    ],
    navFloatingItemRoot: {
      height: !!nestingLevel && nestingLevel > 0 ? navChildItemHeight : navItemHeight,
      cursor: 'pointer',
      backgroundColor: !(nestingLevel && nestingLevel > 0) ? navItemHoverColor : floatingNavBackgroundColor,
      paddingLeft: navFloatingItemIndentSize,
      selectors: {
        ':hover': {
          backgroundColor: !!nestingLevel && nestingLevel > 0 ? navItemHoverColor : 'navItemHoverColor'
        },
        ':active': {
          backgroundColor: navItemSelectedColor
        }
      }
    },
    navGroupSeparatorRoot: {
      width: '100%',
      height: hasGroupName ? navGroupSeparatorWithGroupNameHeight : navGroupSeparatorItemHeight,
      textAlign: 'center'
    },
    navGroupSeparatorHrLine: {
      position: 'relative',
      height: '20px',
      borderBottom: `1px solid ${navItemWithChildBgColor}`
    },
    navGroupSeparatorHeaderGroupName: {
      position: 'absolute',
      marginTop: '40px',
      left: '16px',
      color: DefaultPalette.black,
      fontWeight: FontWeights.bold
    }
  };
};

/* tslint:enable */
