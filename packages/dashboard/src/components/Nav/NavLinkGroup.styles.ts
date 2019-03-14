import { AnimationClassNames } from 'office-ui-fabric-react';
import { INavLinkGroupStyleProps, INavLinkGroupStyles } from './NavLinkGroup.types';
import { navBackgroundColor } from './Nav.styles';

export const getStyles = (props: INavLinkGroupStyleProps): INavLinkGroupStyles => {
  const { isNavCollapsed, isExpanded } = props;
  return {
    nestedNavMenu: [
      {
        display: isNavCollapsed || !isExpanded ? 'none' : 'flex',
        flexDirection: 'column',
        padding: 0
      },
      AnimationClassNames.slideDownIn20
    ],
    // we should hover here to show the child menu
    // display none when collapsed and not expanded
    // change to position absolute on hover in the collapsed hover state
    // position can be normal otherwise
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
    ]
  };
};
