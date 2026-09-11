import * as React from 'react';
import { Listbox, Option, OptionGroup } from '@fluentui/react-windmod-preview/combobox';
import { Dropdown } from '@fluentui/react-windmod-preview/dropdown';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import { DropdownVrScene } from './DropdownVrScene';

export const DropdownWindmod = (): React.ReactNode => (
  <FluentProvider>
    <DropdownVrScene Dropdown={Dropdown} Listbox={Listbox} Option={Option} OptionGroup={OptionGroup} />
  </FluentProvider>
);
