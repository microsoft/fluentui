import { AnimationClassNames } from 'office-ui-fabric-react';
import { INavLinkGroupStyleProps, INavLinkGroupStyles } from './NavLinkGroup.types';

export const getStyles = (props: INavLinkGroupStyleProps): INavLinkGroupStyles => {
  const { isNavCollapsed /**isExpanded */ } = props;
  return {
    /**fix what elements slide down/fade, should be the nested nav
check that adjecent selector works as expected
clean up other code
sort out extensibility */
    navMenuContainer: [
      {
        display: 'flex'
      },
      isNavCollapsed ? AnimationClassNames.fadeIn400 : AnimationClassNames.slideDownIn20,
      isNavCollapsed && {
        selectors: {
          '& a:hover + $nestedNavMenuWhenNavCollapsed, & a:focus + $nestedNavMenuWhenNavCollapsed': {
            display: 'flex'
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
    nestedNavLinks: [
      {
        padding: 0,
        flexDirection: 'column'
      },
      AnimationClassNames.slideRightIn10
    ]
  };
};
