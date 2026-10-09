import * as React from 'react';
import { Dropdown, FluentProvider, Listbox, Option, OptionGroup, webLightTheme } from '@fluentui/react-components';

import { DropdownOpenVrScene } from './DropdownOpenVrScene';

export const DropdownOpenLtrGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <DropdownOpenVrScene Dropdown={Dropdown} Listbox={Listbox} Option={Option} OptionGroup={OptionGroup} />
  </FluentProvider>
);
