import { AnimationClassNames } from 'office-ui-fabric-react';
import { INavLinkGroupStyleProps, INavLinkGroupStyles } from './NavLinkGroup.types';

export const getStyles = (props: INavLinkGroupStyleProps): INavLinkGroupStyles => {
  const { isNavCollapsed, isKeyboardExpanded } = props;
  return {
    /**fix what elements slide down/fade, should be the nested nav
check that adjecent selector works as expected
clean up other code
sort out extensibility */
    root: {},
    navMenuContainer: [
      isNavCollapsed ? AnimationClassNames.fadeIn400 : AnimationClassNames.slideDownIn20,
      isNavCollapsed && {
        selectors: {
          '& button:hover + $nestedNavLinksWrapper': {
            display: 'flex',
            backgroundColor: 'yellow',
            position: 'absolute'
          }
        }
      }
    ],
    // we should hover here to show the child menu
    // display none when collapsed and not expanded
    // change to position absolute on hover in the collapsed hover state
    // position can be normal otherwise
    /**nestedNavMenu: [
      {
        flexDirection: ,
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        selectors: {
          ':hover': {
            position: 'absolute',
            width: '278px',
            top: '0'
          },
          '> a': {
            zIndex: 1,
            backgroundColor: navBackgroundColor
          }
        }
      }
    ], */
    nestedNavLinksWrapper: [
      {
        boxShadow: '0 1.2px 3.6px rgba(0, 0, 0, 0.09), 0 6.4px 14.4px rgba(0, 0, 0, 0.11)',
        width: '230px',
        padding: '48px 0 0',
        marginTop: '-48px'
      },
      isNavCollapsed && {
        display: isKeyboardExpanded ? 'flex' : 'none',
        selectors: {
          ':hover': {
            display: 'flex'
          }
        }
      }
    ],
    nestedNavLinks: [
      {
        padding: 0,
        flexDirection: 'column',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      },
      AnimationClassNames.slideRightIn10
    ]
  };
};
