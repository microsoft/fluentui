import { DefaultPalette, FontWeights } from 'office-ui-fabric-react';
import { INavGroupStyleProps, INavGroupStyles } from './NavGroup.types';
import { navItemHeight } from './Nav.styles';

// NavGroup
const navDividerHeight = 21;
const navDividerColor = 'rgba(0,0,0,.2)';

export const getStyles = (props: INavGroupStyleProps): INavGroupStyles => {
  const { isNavCollapsed } = props;
  return {
    navGroupDivider: {
      display: 'block',
      position: 'relative',
      height: navDividerHeight,
      textAlign: 'center',
      selectors: {
        '::after': {
          content: '" "',
          width: 'calc(100% - 32px)',
          position: 'absolute',
          height: '1px',
          top: 10,
          left: '16px',
          backgroundColor: navDividerColor
        }
      }
    },
    navGroupTitle: {
      lineHeight: navItemHeight,
      color: DefaultPalette.black,
      fontWeight: FontWeights.bold,
      marginLeft: '16px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    navItem: [
      {
        margin: '0px',
        padding: '0px'
      },
      isNavCollapsed && {
        selectors: {
          ':hover $nestedNavMenuWhenNavCollapsed, :focus $nestedNavMenuWhenNavCollapsed': {
            display: 'flex'
          }
        }
      }
    ]
  };
};
