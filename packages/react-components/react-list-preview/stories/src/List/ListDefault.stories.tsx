import * as React from 'react';
import { List, ListItem } from '@fluentui/react-list-preview';
import { tokens, Text, makeResetStyles } from '@fluentui/react-components';

const useTextStyle = makeResetStyles({
  color: tokens.colorNeutralForeground1,
});

export const Default = () => {
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
