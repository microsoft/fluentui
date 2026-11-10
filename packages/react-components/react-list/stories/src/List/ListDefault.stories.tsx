import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { List, ListItem } from '@fluentui/react-components';
import { tokens, Text, makeResetStyles } from '@fluentui/react-components';

const useTextStyle = makeResetStyles({
  color: tokens.colorNeutralForeground1,
});

export const Default = (): JSXElement => {
  const textStyle = useTextStyle();
  return (
    <List>
      <ListItem>
        <Text className={textStyle}>Asia</Text>
      </ListItem>
      <ListItem>
        <Text className={textStyle}>Africa</Text>
      </ListItem>
      <ListItem>
        <Text className={textStyle}>Europe</Text>
      </ListItem>
      <ListItem>
        <Text className={textStyle}>North America</Text>
      </ListItem>
      <ListItem>
        <Text className={textStyle}>South America</Text>
      </ListItem>
      <ListItem>
        <Text className={textStyle}>Australia/Oceania</Text>
      </ListItem>
      <ListItem>
        <Text className={textStyle}>Antarctica</Text>
      </ListItem>
    </List>
  );
};
