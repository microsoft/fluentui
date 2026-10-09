import * as React from 'react';
import { Combobox, FluentProvider, Listbox, Option, OptionGroup, webLightTheme } from '@fluentui/react-components';

import { ComboboxOpenVrScene } from './ComboboxOpenVrScene';

export const ComboboxOpenRtlGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme} dir="rtl">
    <ComboboxOpenVrScene Combobox={Combobox} Listbox={Listbox} Option={Option} OptionGroup={OptionGroup} />
  </FluentProvider>
);
