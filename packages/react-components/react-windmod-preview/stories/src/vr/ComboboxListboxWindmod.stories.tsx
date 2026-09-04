import * as React from 'react';
import { Combobox, Listbox, Option, OptionGroup } from '@fluentui/react-windmod-preview/combobox';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import { ComboboxListboxVrScene } from './ComboboxListboxVrScene';

export const ComboboxListboxWindmod = (): React.ReactNode => (
  <FluentProvider>
    <ComboboxListboxVrScene Combobox={Combobox} Listbox={Listbox} Option={Option} OptionGroup={OptionGroup} />
  </FluentProvider>
);
