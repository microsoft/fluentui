import { AnimationClassNames } from 'office-ui-fabric-react';
import { INavLinkGroupStyleProps, INavLinkGroupStyles } from './NavLinkGroup.types';
import { navItemHeight, navCollapsedWidth } from './Nav.styles';

// this is used to ensure that the left shadow of the nested nav can be hidden while
// the rest of the shadow can be shown
const shadowOffset = 24;

// width of the flyout navigation
const flyoutNavWidth = 230;

export const getStyles = (props: INavLinkGroupStyleProps): INavLinkGroupStyles => {
  const { isNavCollapsed, isExpanded, isKeyboardExpanded } = props;
  return {
    /**fix what elements slide down/fade, should be the nested nav
check that adjecent selector works as expected
clean up other code
sort out extensibility */
    root: [
      isNavCollapsed && {
        selectors: {
          '& *:hover + $nestedNav': {
            display: 'flex'
          }
        }
      }
    ],
    nestedNav: [
      isNavCollapsed && {
        width: `${flyoutNavWidth + navCollapsedWidth}px`,
        position: 'absolute',
        flexDirection: 'column',
        alignItems: 'flex-end',
        display: isKeyboardExpanded ? 'flex' : 'none',
        selectors: {
          ':hover': {
            display: 'flex'
          }
        }
      }
    ],
    nestedNavHeaderItem: {
      zIndex: 1,
      backgroundColor: '#ccc',
      cursor: 'default',
      selectors: {
        ':hover': {
          backgroundColor: 'inheret'
        },
        ':active': {
          backgroundColor: 'inheret'
        },
        ':focus': {
          backgroundColor: 'inheret'
        }
      }
    },
    nestedNavLinksWrapper: [
      !isNavCollapsed && isExpanded && [AnimationClassNames.fadeIn400, AnimationClassNames.slideDownIn20],
      !isNavCollapsed &&
        !isExpanded && {
          display: 'none'
        },
      isNavCollapsed && {
        overflow: 'hidden',
        padding: `${shadowOffset + navItemHeight}px ${shadowOffset}px ${shadowOffset}px 0px`,
        margin: `-${shadowOffset + navItemHeight}px -${shadowOffset}px -${shadowOffset}px 0px`
      }
    ],
    nestedNavLinks: [
      {
        padding: 0,
        listStyle: 'none'
      },
      isNavCollapsed && {
        width: `${flyoutNavWidth}px`,
        marginTop: `-${navItemHeight}px`,
        paddingTop: `${navItemHeight}px`,
        backgroundColor: '#F1F1F1',
        boxShadow: '0 1.2px 3.6px rgba(0, 0, 0, 0.09), 0 6.4px 14.4px rgba(0, 0, 0, 0.11)'
      },
      isNavCollapsed && AnimationClassNames.slideRightIn10
    ]
  };
};
