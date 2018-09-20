/* tslint:disable */
import { DefaultPalette, FontSizes } from 'office-ui-fabric-react/lib/Styling';
import { INavLinkStyleProps, INavLinkStyles } from '../Nav.types';

const navIconSize = FontSizes.icon;
const navItemHeight = 48;
const navChildItemHeight = 32;
const navItemHoverColor = '#CCCCCC';
const navItemWithChildBgColor = '#CCCCCC';
const navItemSelectedColor = '#B7B7B7';

export const getNavLinkStyles = (props: INavLinkStyleProps): INavLinkStyles => {
  const { hasNestedMenu, isSelected, hasSelectedNestedLink, isNested } = props;

  return {
    navLink: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      cursor: 'pointer',

      selectors: {
        ':hover': {
          backgroundColor: hasNestedMenu ? navItemWithChildBgColor : navItemHoverColor
        },
        ':active': {
          backgroundColor: navItemSelectedColor
        }
      }
    },
    navLinkSmall: {
      height: navChildItemHeight,
      lineHeight: navChildItemHeight
    },
    iconWrapper: {
      position: 'relative',
      display: 'flex',
      flex: isSelected || hasSelectedNestedLink ? '0 0 32px' : '0 0 48px',
      alignItems: 'center',
      justifyContent: 'center'
    },
    navItemBarMarker: {
      position: 'absolute',
      left: '4px',
      top: '12px',
      width: '2px',
      height: '24px',
      backgroundColor: DefaultPalette.accent
    },
    navItemBarMarkerSmall: {
      position: 'absolute',
      left: '41px',
      top: '7px',
      width: '2px',
      height: '18px',
      backgroundColor: DefaultPalette.accent
    },
    hidden: {
      display: 'none'
    },
    navItemIcon: {
      fontSize: navIconSize,
      lineHeight: isNested ? navChildItemHeight : navItemHeight,
      color: DefaultPalette.black
    },
    navItemText: {
      flex: '1 1 auto',
      lineHeight: isNested ? navChildItemHeight : navItemHeight,
      marginLeft: hasSelectedNestedLink || (!hasNestedMenu && isSelected && !isNested) ? '8px' : '0px',
      textOverflow: 'ellipsis',
      overflowX: 'hidden',
      whiteSpace: 'nowrap',
      color: DefaultPalette.black
    }
  };
};
/* tslint:enable */
