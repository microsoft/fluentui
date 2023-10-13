import * as React from 'react';
import { List, ListProps, ListItem, ListLayout } from '@fluentui/react-list-preview';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    'grid-template-columns': 'repeat(3, 1fr)',
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

ListGrid.parameters = {
  docs: {
    description: {
      story: [
        'List can have a grid layout. What this means is that the wrapper will have `display: grid` applied to it. Also the arrow navigation will work horizontaly and vertically.',
        "\nBy default, the grid doesn't have any columns defined. It is up to the user to define the columns using CSS. Please refer to the example below.",
      ].join('\n'),
    },
  },
};
