import * as React from 'react';
import { List, ListItem } from '@fluentui/react-list-preview';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

const Scenario = () => <ListItem>I'm a List Item!</ListItem>;

Scenario.decorator = (props: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>
    <List>{props.children}</List>
  </FluentProvider>
);

export default Scenario;
