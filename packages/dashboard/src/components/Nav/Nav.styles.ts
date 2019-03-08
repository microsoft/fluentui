import { DefaultPalette, FontSizes } from 'office-ui-fabric-react/lib/Styling';
import { INavStyleProps, INavStyles } from './Nav.types';

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
export const navTextColor = DefaultPalette.black;
const navWidth = 280 + scrollBarWidth;
const navCollapsedWidth = 48 + scrollBarWidth;
export const navBackgroundColor = '#E5E5E5';

export const navItemHeight = 48;

// NavLinkGroup

// NavLink

export const getStyles = (props: INavStyleProps): INavStyles => {
  const { isNavCollapsed } = props;

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
        height: '100%'
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
      paddingLeft: 0,
      listStyle: 'none'
    }
  };
};
