import * as React from 'react';
import type { ICustomizations } from './Customizations';

export interface ICustomizerContext {
  customizations: ICustomizations;
}

export const CustomizerContext = React.createContext<ICustomizerContext>({
  customizations: {
    inCustomizerContext: false,
    settings: {},
    scopedSettings: {},
  },
});
