/* tslint:disable */
import { INavLinkGroupStyleProps, INavLinkGroupStyles } from '../Nav.types';

// const BackDropSelector = '@supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px))';
const navItemWithChildBgColor = '#CCCCCC';

export const getStyles = (props: INavLinkGroupStyleProps): INavLinkGroupStyles => {
  const { isNavCollapsed, isExpanded } = props;
  return {
    nestedNavMenu: {
      display: isNavCollapsed || !isExpanded ? 'none' : 'flex',
      flexDirection: 'column'
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
        $navLink: {
          zIndex: 1,
          backgroundColor: navItemWithChildBgColor
        }
      }
    },
    nestedNavLinksWhenNavCollapsed: {
      width: '230px',
      boxShadow: '0 0.3px 0.9px rgba(0, 0, 0, 0.108), 0 1.6px 3.6px rgba(0, 0, 0, 0.132)',
      backgroundColor: 'rgba(255,255,255,.6)',
      paddingTop: '48px',
      marginTop: '-48px'
    }
  };
};
/* tslint:enable */
