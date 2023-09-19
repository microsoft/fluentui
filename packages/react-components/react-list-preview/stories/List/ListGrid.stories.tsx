import * as React from 'react';
import { List, ListProps, ListItem, ListLayout } from '@fluentui/react-list-preview';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    'grid-template-columns': '1fr 1fr 1fr',
  },
});

export const ListGrid = (props: Partial<ListProps>) => {
  const classes = useStyles();
  return (
    <List layout={ListLayout.Grid} focusableItems className={classes.root}>
      <ListItem>Asia</ListItem>
      <ListItem>Africa</ListItem>
      <ListItem>Europe</ListItem>
      <ListItem>North America</ListItem>
      <ListItem>South America</ListItem>
      <ListItem>Australia/Oceania</ListItem>
      <ListItem>Antarctica</ListItem>
    </List>
  );
};
