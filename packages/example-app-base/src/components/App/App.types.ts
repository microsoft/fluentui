import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IWithResponsiveModeState } from 'office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode';
import { INavLink, INavLinkGroup, INavStyleProps } from 'office-ui-fabric-react/lib/Nav';
import { IPanelStyleProps } from 'office-ui-fabric-react/lib/Panel';
import { IAppCustomizations } from '../../utilities/customizations';
import { IHeaderStyleProps } from '../Header/index';

export enum ExampleStatus {
  placeholder = 0,
  started = 1,
  beta = 2,
  release = 3
}

export interface IAppLink extends INavLink {
  // tslint:disable-next-line:no-any
  getComponent?: (cb: (obj: any) => void) => any;
  component?: React.ComponentClass | (() => JSX.Element);
}

export interface IAppLinkGroup extends INavLinkGroup {
  links: IAppLink[];
}

export interface IAppDefinition {
  appTitle: string;
  testPages: IAppLink[];
  examplePages: IAppLinkGroup[];
  headerLinks: IAppLink[];
  /**
   * Optional customizations to apply to the application.
   */
  customizations?: IAppCustomizations;
}

export interface IAppProps extends IWithResponsiveModeState {
  appDefinition: IAppDefinition;

  /** Theme provided by higher-order component. */
  theme?: ITheme;

  /** Optional override styles */
  styles?: IStyleFunctionOrObject<IAppStyleProps, IAppStyles>;
}

export type IAppStyleProps = Required<Pick<IAppProps, 'responsiveMode'>> &
  Pick<IAppProps, 'theme'> & {
    /** Whether the page needs to show only the examples card */
    showOnlyExamples?: boolean;
  };

export interface IAppStyles {
  root: IStyle;
  /** Styles for the container of the actual Header */
  headerContainer: IStyle;
  /** Styles for the container when the nav is displayed on the left */
  leftNavContainer: IStyle;
  content: IStyle;
  linkFlair: IStyle;
  linkFlairStarted: IStyle;
  linkFlairBeta: IStyle;
  linkFlairRelease: IStyle;
  subComponentStyles: IAppSubComponentStyles;
}

export interface IAppSubComponentStyles {
  // TODO: remove anys after TS 3 upgrade
  // tslint:disable:no-any
  /** Styles for the Header itself. To style the container, use `styles.headerContainer`. */
  header: IStyleFunctionOrObject<IHeaderStyleProps, any>;
  /** Styles for the Nav itself, applied regardless of screen size */
  nav: IStyleFunctionOrObject<INavStyleProps, any>;
  /** Styles for the Panel used to display the nav on small screens */
  navPanel: IStyleFunctionOrObject<IPanelStyleProps, any>;
}
