import * as React from 'react';
import { List, ListItem } from '@fluentui/react-windmod-preview/list';
import {
  FluentProvider,
  webDarkThemeClassName,
  webLightThemeClassName,
} from '@fluentui/react-windmod-preview/provider';

import { ListVrScene, type ListVrProviderProps } from './ListVrScene';

const Provider = ({ dark, dir, children }: ListVrProviderProps) => (
  <FluentProvider dir={dir} theme={dark ? webDarkThemeClassName : webLightThemeClassName}>
    {children}
  </FluentProvider>
);

export const ListWindmod = (): React.ReactNode => <ListVrScene List={List} ListItem={ListItem} Provider={Provider} />;
