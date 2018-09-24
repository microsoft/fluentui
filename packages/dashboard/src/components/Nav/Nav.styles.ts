/* tslint:disable */
import { DefaultPalette, FontSizes } from 'office-ui-fabric-react/lib/Styling';
import { INavStyleProps, INavStyles } from './Nav.types';

const navFontSize = FontSizes.medium;
const navTextColor = DefaultPalette.black;
const navWidth = 280;
const navCollapsedWidth = 48;
const navBackgroundColor = '#E5E5E5';
const navItemSelectedColor = '#B7B7B7';

// Will need these later
// const navFloatingWidth = 230;

export const getStyles = (props: INavStyleProps): INavStyles => {
  return {
    nav: {
      width: navWidth,
      backgroundColor: navBackgroundColor,
      color: navTextColor,
      transitionProperty: 'width',
      transitionDuration: '.2s',
      userSelect: 'none',
      fontSize: navFontSize,
      selectors: {
        ul: {
          paddingLeft: 0,
          selectors: {
            li: {
              listStyleType: 'none',
              padding: 0,
              margin: 0
            }
          }
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
    }
  };
};

/* tslint:enable */
