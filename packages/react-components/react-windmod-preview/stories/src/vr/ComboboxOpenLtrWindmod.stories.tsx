import * as React from 'react';
import { Combobox, FluentProvider, Listbox, Option, OptionGroup } from '@fluentui/react-windmod-preview';

import { ComboboxOpenVrScene } from './ComboboxOpenVrScene';

// listbox={{ popover: 'manual' }} — see ComboboxVrTypes.ts for why the windmod side needs it.
export const ComboboxOpenLtrWindmod = (): React.ReactNode => (
  <FluentProvider>
    <ComboboxOpenVrScene
      Combobox={Combobox}
      Listbox={Listbox}
      Option={Option}
      OptionGroup={OptionGroup}
      listbox={{ popover: 'manual' }}
    />
  </FluentProvider>
);
