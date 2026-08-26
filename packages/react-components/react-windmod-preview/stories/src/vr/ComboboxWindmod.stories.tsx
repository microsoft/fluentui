import * as React from 'react';
import { Combobox, FluentProvider, Listbox, Option, OptionGroup } from '@fluentui/react-windmod-preview';

import { ComboboxVrScene } from './ComboboxVrScene';

export const ComboboxWindmod = (): React.ReactNode => (
  <FluentProvider>
    <ComboboxVrScene Combobox={Combobox} Listbox={Listbox} Option={Option} OptionGroup={OptionGroup} />
  </FluentProvider>
);
