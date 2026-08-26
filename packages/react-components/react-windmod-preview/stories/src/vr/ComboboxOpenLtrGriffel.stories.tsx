import * as React from 'react';
import { Combobox, FluentProvider, Listbox, Option, OptionGroup, webLightTheme } from '@fluentui/react-components';

import { ComboboxOpenVrScene } from './ComboboxOpenVrScene';

export const ComboboxOpenLtrGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <ComboboxOpenVrScene Combobox={Combobox} Listbox={Listbox} Option={Option} OptionGroup={OptionGroup} />
  </FluentProvider>
);
