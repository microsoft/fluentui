import * as React from 'react';

import { ICustomizations } from 'office-ui-fabric-react';

export interface IExampleCardCustomizations {
  /**
   * Theme title used in selectors shown to user.
   */
  title: string;
  /**
   * Associated customizations that will be applied to example card.
   */
  customizations: ICustomizations;
}

export interface IAppCustomizations {
  exampleCardCustomizations?: IExampleCardCustomizations[];
  hideSchemes?: boolean;
}

export const AppCustomizationsContext = React.createContext<IAppCustomizations>({
  exampleCardCustomizations: undefined,
  hideSchemes: false
});
