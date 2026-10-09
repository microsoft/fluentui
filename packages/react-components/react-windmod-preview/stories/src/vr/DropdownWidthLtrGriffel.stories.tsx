import * as React from 'react';
import { Dropdown, FluentProvider, Listbox, Option, OptionGroup, webLightTheme } from '@fluentui/react-components';

import { DropdownWidthVrScene } from './DropdownWidthVrScene';

export const DropdownWidthLtrGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <DropdownWidthVrScene Dropdown={Dropdown} Listbox={Listbox} Option={Option} OptionGroup={OptionGroup} />
  </FluentProvider>
);
