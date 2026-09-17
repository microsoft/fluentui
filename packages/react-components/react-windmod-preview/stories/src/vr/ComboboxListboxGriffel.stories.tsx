import * as React from 'react';
import { Combobox, FluentProvider, Listbox, Option, OptionGroup, webLightTheme } from '@fluentui/react-components';

import { ComboboxListboxVrScene } from './ComboboxListboxVrScene';

export const ComboboxListboxGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <ComboboxListboxVrScene Combobox={Combobox} Listbox={Listbox} Option={Option} OptionGroup={OptionGroup} />
  </FluentProvider>
);
