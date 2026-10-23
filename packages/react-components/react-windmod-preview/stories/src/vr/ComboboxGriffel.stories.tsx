import * as React from 'react';
import { Combobox, FluentProvider, Listbox, Option, OptionGroup, webLightTheme } from '@fluentui/react-components';

import { ComboboxVrScene } from './ComboboxVrScene';

export const ComboboxGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <ComboboxVrScene Combobox={Combobox} Listbox={Listbox} Option={Option} OptionGroup={OptionGroup} />
  </FluentProvider>
);
