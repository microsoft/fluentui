import * as React from 'react';
import { Dropdown, FluentProvider, Listbox, Option, OptionGroup, webLightTheme } from '@fluentui/react-components';

import { DropdownVrScene } from './DropdownVrScene';

export const DropdownGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <DropdownVrScene Dropdown={Dropdown} Listbox={Listbox} Option={Option} OptionGroup={OptionGroup} />
  </FluentProvider>
);
