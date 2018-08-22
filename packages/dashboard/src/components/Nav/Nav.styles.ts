/* tslint:disable */
import { IStyle, AnimationClassNames } from 'office-ui-fabric-react/lib/Styling';
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

const navFontSize = 14;
const navTextColor = '#FFF';
const navWidth = 280;
const navCollapsedWidth = 48;
const shortenedIconWidth = 32;
const navFloatingWidth = 230;
const navItemHeight = 48;
const navChildItemHeight = 32;
const navBackgroundColor = '#E5E5E5';
const navItemHoverColor = '#CCCCCC';
const navGroupSeparatorItemHeight = 40;
const navGroupSeparatorWithGroupNameHeight = 70;
const navItemWithChildBgColor = '#CCCCCC';
const navItemSelectedColor = '#B7B7B7';
const navItemIndentSize = 50;
const navFloatingItemIndentSize = 20;

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
          fontSize: navFontSize,
          selectors: {
            'li:hover >div': {
              display: 'block'
            }
          }
        },
        a: {
          color: `${navTextColor} !important`,
          outline: 'none',
          selectors: {
            ':focus': {
              backgroundColor: navItemSelectedColor
            }
          }
        }
      }
    },
    navItemRoot: {
      height: !!nestingLevel && nestingLevel > 0 ? navChildItemHeight : navItemHeight,
      cursor: 'pointer',
      paddingLeft: !!nestingLevel && nestingLevel > 0 ? nestingLevel * navItemIndentSize : 'inherit',

      selectors: {
        ':hover': {
          backgroundColor: hasChildren ? navItemWithChildBgColor : navItemHoverColor
        },
        ':active': {
          backgroundColor: navItemSelectedColor
        }
      }
    },
    navItemBarMarker: {
      marginLeft: !!nestingLevel && nestingLevel > 0 && !hasChildren ? '-10px' : '6px',
      marginRight: !!nestingLevel && nestingLevel > 0 && !hasChildren ? '8px' : '0px',
      marginTop: !!nestingLevel && nestingLevel > 0 ? '7px' : '12px',
      width: '2px',
      height: !!nestingLevel && nestingLevel > 0 ? '18px' : '24px',
      backgroundColor: '#0078D4',
      display: isSelected || isChildLinkSelected ? 'inline-block' : 'none',
      borderWidth: 0
    },
    navItemIconColumn: {
      width: isSelected || isChildLinkSelected ? shortenedIconWidth : navCollapsedWidth,
      fontSize: '16px',
      lineHeight: !!nestingLevel && nestingLevel > 0 ? navChildItemHeight : navItemHeight,
      textAlign: 'center',
      color: '#000000',
      verticalAlign: 'top'
    },
    navItemNameColumn: {
      width: '100%',
      marginLeft: isChildLinkSelected ? '8px' : '0px',
      lineHeight: !!nestingLevel && nestingLevel > 0 ? navChildItemHeight : navItemHeight,
      verticalAlign: 'top',
      display: 'inline-block',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      color: '#000000'
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
        position: 'absolute',
        marginLeft: navCollapsedWidth,
        marginTop: -navItemHeight - (!!scrollTop && scrollTop > 0 ? scrollTop : 0),
        width: navFloatingWidth,
        color: navTextColor,
        selectors: {
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
      backgroundColor: !(nestingLevel && nestingLevel > 0) ? navItemHoverColor : navBackgroundColor,
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
      color: '#000000',
      fontWeight: 'bold'
    },
    navToggler: {
      height: navItemHeight,
      cursor: 'pointer',
      selectors: {
        ':hover': {
          backgroundColor: navItemHoverColor
        }
      },
      textAlign: 'left'
    }
  };
};

/* tslint:enable */
