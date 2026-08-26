import * as React from 'react';
import { Dropdown, FluentProvider, Listbox, Option, OptionGroup } from '@fluentui/react-windmod-preview';

import { DropdownWidthVrScene } from './DropdownWidthVrScene';

// listbox={{ popover: 'manual' }} — see ComboboxVrTypes.ts for why the windmod side needs it.
export const DropdownWidthRtlWindmod = (): React.ReactNode => (
  <FluentProvider dir="rtl">
    <DropdownWidthVrScene
      Dropdown={Dropdown}
      Listbox={Listbox}
      Option={Option}
      OptionGroup={OptionGroup}
      listbox={{ popover: 'manual' }}
    />
  </FluentProvider>
);
