import * as React from 'react';
import { Combobox, FluentProvider, Listbox, Option, OptionGroup } from '@fluentui/react-windmod-preview';

import { ComboboxWidthVrScene } from './ComboboxWidthVrScene';

// listbox={{ popover: 'manual' }} — see ComboboxVrTypes.ts for why the windmod side needs it.
export const ComboboxWidthRtlWindmod = (): React.ReactNode => (
  <FluentProvider dir="rtl">
    <ComboboxWidthVrScene
      Combobox={Combobox}
      Listbox={Listbox}
      Option={Option}
      OptionGroup={OptionGroup}
      listbox={{ popover: 'manual' }}
    />
  </FluentProvider>
);
