import * as React from 'react';
import { List, ListItem, FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';

import { ListVrScene, type ListVrProviderProps } from './ListVrScene';

const Provider = ({ dark, dir, children }: ListVrProviderProps) => (
  <FluentProvider dir={dir} theme={dark ? webDarkTheme : webLightTheme}>
    {children}
  </FluentProvider>
);

export const ListGriffel = (): React.ReactNode => <ListVrScene List={List} ListItem={ListItem} Provider={Provider} />;
