import * as React from 'react';
import { Combobox, FluentProvider, Listbox, Option, OptionGroup } from '@fluentui/react-windmod-preview';

import { ComboboxListboxVrScene } from './ComboboxListboxVrScene';

export const ComboboxListboxWindmod = (): React.ReactNode => (
  <FluentProvider>
    <ComboboxListboxVrScene Combobox={Combobox} Listbox={Listbox} Option={Option} OptionGroup={OptionGroup} />
  </FluentProvider>
);
