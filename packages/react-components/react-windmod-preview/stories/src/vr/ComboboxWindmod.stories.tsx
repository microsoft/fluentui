import * as React from 'react';
import { Combobox, Listbox, Option, OptionGroup } from '@fluentui/react-windmod-preview/combobox';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import { ComboboxVrScene } from './ComboboxVrScene';

export const ComboboxWindmod = (): React.ReactNode => (
  <FluentProvider>
    <ComboboxVrScene Combobox={Combobox} Listbox={Listbox} Option={Option} OptionGroup={OptionGroup} />
  </FluentProvider>
);
