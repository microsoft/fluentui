import * as React from 'react';
import { Combobox, FluentProvider, Listbox, Option, OptionGroup, webLightTheme } from '@fluentui/react-components';

import { ComboboxWidthVrScene } from './ComboboxWidthVrScene';

export const ComboboxWidthLtrGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <ComboboxWidthVrScene Combobox={Combobox} Listbox={Listbox} Option={Option} OptionGroup={OptionGroup} />
  </FluentProvider>
);
