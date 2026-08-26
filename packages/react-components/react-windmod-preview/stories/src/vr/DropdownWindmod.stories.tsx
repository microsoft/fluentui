import * as React from 'react';
import { Dropdown, FluentProvider, Listbox, Option, OptionGroup } from '@fluentui/react-windmod-preview';

import { DropdownVrScene } from './DropdownVrScene';

export const DropdownWindmod = (): React.ReactNode => (
  <FluentProvider>
    <DropdownVrScene Dropdown={Dropdown} Listbox={Listbox} Option={Option} OptionGroup={OptionGroup} />
  </FluentProvider>
);
