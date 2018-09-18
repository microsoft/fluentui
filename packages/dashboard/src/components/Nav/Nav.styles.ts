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
const BackDropSelector = '@supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px))';

export const getStyles = (props: INavStyleProps): INavStyles => {
  return {
    nav: {
      width: navWidth,
      backgroundColor: navBackgroundColor,
      color: navTextColor,
      transitionProperty: 'width',
      transitionDuration: '.2s',
      userSelect: 'none',
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
    navCollapsed: [
      {
        width: navCollapsedWidth,
        selectors: {
          [BackDropSelector]: {
            webkitBackdropFilter: 'blur(20px) saturate(125%)',
            backdropFilter: 'blur(20px) saturate(125%)',
            backgroundColor: 'rgba(255,255,255,.6)'
          }
        }
        // ul: {
        //   selectors: {
        //     li: {
        //       selectors: {
        //         ':hover': {
        //           selectors: {
        //             ul: {
        //               display: 'flex',
        //               flexDirection: 'column',
        //               position: 'absolute',
        //               top: '0',
        //               left: navCollapsedWidth,
        //               width: '230px',
        //               backgroundColor: 'rgba(255,255,255,.6)',
        //               selectors: {
        //                 [BackDropSelector]: {
        //                   webkitBackdropFilter: 'blur(20px) saturate(125%)',
        //                   backdropFilter: 'blur(20px) saturate(125%)',
        //                   backgroundColor: 'rgba(255,255,255,.6)'
        //                 }
        //               }
        //             }
        //           }
        //         }
        //       }
        //     }
        //   }
        // }
      }
    ]
  };
};

/* tslint:enable */
