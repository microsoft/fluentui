import * as React from 'react';

import { ICustomizations } from 'office-ui-fabric-react';

export type IExampleCardCustomizations = {
  /**
   * Theme title used in selectors shown to user.
   */
  title: string;
  /**
   * Associated customizations that will be applied to example card.
   */
  customizations: ICustomizations;
};

export type IAppCustomizations = {
  exampleCardCustomizations?: IExampleCardCustomizations[];
};

export const AppCustomizationsContext = React.createContext<IAppCustomizations>({
  exampleCardCustomizations: undefined
});
