import * as React from 'react';
import { Dropdown, FluentProvider, Listbox, Option, OptionGroup } from '@fluentui/react-windmod-preview';

import { DropdownOpenVrScene } from './DropdownOpenVrScene';

// listbox={{ popover: 'manual' }} — see ComboboxVrTypes.ts for why the windmod side needs it.
export const DropdownOpenLtrWindmod = (): React.ReactNode => (
  <FluentProvider>
    <DropdownOpenVrScene
      Dropdown={Dropdown}
      Listbox={Listbox}
      Option={Option}
      OptionGroup={OptionGroup}
      listbox={{ popover: 'manual' }}
    />
  </FluentProvider>
);
