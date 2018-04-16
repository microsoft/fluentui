/* tslint:disable */
import { IStyle, AnimationClassNames } from 'office-ui-fabric-react/lib/Styling';
import {
  INavStyleProps,
  INavStyles
} from './Nav.types';

export type INavItemStyle = {
  root?: IStyle;
  iconColumn?: IStyle;
  nameColumn?: IStyle;
};

export type IFloatingNavStyle = IStyle & {
  root?: IStyle;
  withChild?: IStyle;
};

const navFontSize = 13;
const navTextColor = '#FFF';
const navWidth = 280;
const navCollapsedWidth = 50;
const navFloatingWidth = 230;
const navItemHeight = 50;
const navBackgroundColor = '#333333';
const navItemHoverColor = '#767676';
const navGroupSeparatorItemHeight = 40;
const navItemWithChildBgColor = '#505050';
const navItemSelectedColor = '#666666';
const navItemIndentSize = 50;

export const getStyles = (
  props: INavStyleProps
): INavStyles => {
  const {
    isSelected,
    hasChildren,
    nestingLevel,
    isCollapsed,
    scrollTop
  } = props;

  return ({
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
            li: {
              selectors: {
                ':hover': {
                  selectors: {
                    '>div[class*=ms-Nav-FloatingNav]': {
                      visibility: 'visible'
                    }
                  }
                }
              }
            }
          }
        },
        a: {
          color: `${navTextColor} !important`,
          outline: 'none'
        }
      }
    },
    navItemRoot: {
      height: navItemHeight,
      cursor: 'pointer',
      backgroundColor: isSelected ? navItemSelectedColor : 'inherit',
      paddingLeft: !!nestingLevel && nestingLevel > 0 ? nestingLevel * navItemIndentSize : 'inherit',
      selectors: {
        ':hover': {
          backgroundColor: hasChildren ? navItemWithChildBgColor : navItemHoverColor
        }
      }
    },
    navItemIconColumn: {
      width: navCollapsedWidth,
      fontSize: '15px',
      lineHeight: navItemHeight,
      textAlign: 'center'
    },
    navItemNameColumn: {
      width: '100%',
      lineHeight: navItemHeight,
      verticalAlign: 'top',
      display: 'inline-block',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
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
        displayName: 'ms-Nav-FloatingNav',
        display: 'block',
        visibility: 'hidden',
        position: 'absolute',
        marginLeft: navCollapsedWidth,
        marginTop: -navItemHeight - (!!scrollTop && scrollTop > 0 ? scrollTop : 0),
        width: navFloatingWidth,
        color: navTextColor,
        backgroundColor: hasChildren ? navItemWithChildBgColor : navItemHoverColor,
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
      height: navItemHeight,
      cursor: 'pointer',
      backgroundColor: !!nestingLevel && nestingLevel > 0 && isSelected ? navItemSelectedColor : 'inherit',
      paddingLeft: !!nestingLevel && nestingLevel > 0 ? nestingLevel * navItemIndentSize : 'inherit',
      selectors: {
        ':hover': {
          backgroundColor: !!nestingLevel && nestingLevel > 0 ? navItemHoverColor : 'unset'
        }
      }
    },
    navGroupSeparatorRoot: {
      width: '100%',
      height: navGroupSeparatorItemHeight,
      textAlign: 'center'
    },
    navGroupSeparatorHrLine: {
      height: '20px',
      borderBottom: `1px solid ${navItemWithChildBgColor}`
    },
    navGroupSeparatorGroupName: {
      lineHeight: navGroupSeparatorItemHeight,
      padding: '0 8px',
      color: '#9B9B9B',
      backgroundColor: navBackgroundColor
    },
    navToggler: {
      height: navItemHeight,
      cursor: 'pointer',
      selectors: {
        ':hover': {
          backgroundColor: navItemHoverColor
        }
      },
      textAlign: 'right'
    }
  });
};

/* tslint:enable */
