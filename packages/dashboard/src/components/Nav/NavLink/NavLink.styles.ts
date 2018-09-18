import { DefaultPalette, FontSizes } from 'office-ui-fabric-react/lib/Styling';
import { INavLinkProps, INavLinkStyles } from '../Nav.types';

const navIconSize = FontSizes.icon;
const navItemHeight = 48;
const navChildItemHeight = 32;
const navItemHoverColor = '#CCCCCC';
const navItemWithChildBgColor = '#CCCCCC';
const navItemSelectedColor = '#B7B7B7';
// const BackDropSelector = '@supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px))';

export const getStyles = (props: INavLinkProps): INavLinkStyles => {
  const { hasChildren, isSelected, isChildLinkSelected, isNested } = this.props;

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
          backgroundColor: hasChildren ? navItemWithChildBgColor : navItemHoverColor
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
      flex: isSelected || isChildLinkSelected ? '0 0 32px' : '0 0 48px',
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
      lineHeight: isNested > 0 ? navChildItemHeight : navItemHeight,
      marginLeft: isChildLinkSelected || (!hasChildren && isSelected && !isNested) ? '8px' : '0px',
      textOverflow: 'ellipsis',
      overflowX: 'hidden',
      whiteSpace: 'nowrap',
      color: DefaultPalette.black
    }
  };
};
