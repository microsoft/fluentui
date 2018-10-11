import * as React from 'react';

import { ICustomizations } from 'office-ui-fabric-react/lib/Utilities';

export type IExampleCardCustomizations = {
  title: string;
  customizations: ICustomizations;
};

export type IAppCustomizations = {
  exampleCardCustomizations?: IExampleCardCustomizations[];
};

export const AppCustomizationsContext = React.createContext<IAppCustomizations>({
  exampleCardCustomizations: undefined
});
