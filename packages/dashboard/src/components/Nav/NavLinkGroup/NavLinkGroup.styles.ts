/* tslint:disable */
import { AnimationClassNames } from 'office-ui-fabric-react/lib/Styling';
import { INavLinkGroupStyleProps, INavLinkGroupStyles } from '../Nav.types';

// const BackDropSelector = '@supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px))';

export const getStyles = (props: INavLinkGroupStyleProps): INavLinkGroupStyles => {
  const { isNavCollapsed } = this.props;
  return {
    nestedNavMenu: [
      {
        display: isNavCollapsed ? 'none' : 'flex',
        flexDirection: 'column'
      },
      AnimationClassNames.slideDownIn20
    ],
    nestedNavMenuCollapsed: {
      display: 'none'
    }
  };
};

/* tslint:enable */
