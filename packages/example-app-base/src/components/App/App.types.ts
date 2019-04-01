import { IWithResponsiveModeState } from 'office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode';
import { INavLink, INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';
import { IAppCustomizations } from '../../utilities/customizations';

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
}
