import * as React from 'react';
import { Listbox, Option, OptionGroup } from '@fluentui/react-windmod-preview/combobox';
import { Dropdown } from '@fluentui/react-windmod-preview/dropdown';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import { DropdownOpenVrScene } from './DropdownOpenVrScene';

// listbox={{ popover: 'manual' }} — see ComboboxVrTypes.ts for why the windmod side needs it.
export const DropdownOpenRtlWindmod = (): React.ReactNode => (
  <FluentProvider dir="rtl">
    <DropdownOpenVrScene
      Dropdown={Dropdown}
      Listbox={Listbox}
      Option={Option}
      OptionGroup={OptionGroup}
      listbox={{ popover: 'manual' }}
    />
  </FluentProvider>
);
