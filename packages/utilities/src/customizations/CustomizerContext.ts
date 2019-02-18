import * as React from 'react';
import { ICustomizations } from './Customizations';

export interface ICustomizerContext {
  customizations: ICustomizations;
}

export const CustomizerContext = React.createContext<ICustomizerContext>({
  customizations: {
    inCustomizerContext: false,
    settings: {},
    scopedSettings: {}
  }
});
