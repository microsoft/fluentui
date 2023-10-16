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
    <List layout={ListLayout.Grid} className={classes.root}>
      <ListItem button={{ onClick: () => alert('Asia') }}>Asia</ListItem>
      <ListItem button={{ onClick: () => alert('Africa') }}>Africa</ListItem>
      <ListItem button={{ onClick: () => alert('Europe') }}>Europe</ListItem>
      <ListItem button={{ onClick: () => alert('North America') }}>North America</ListItem>
      <ListItem button={{ onClick: () => alert('South America') }}>South America</ListItem>
      <ListItem button={{ onClick: () => alert('Australia/Oceania') }}>Australia/Oceania</ListItem>
      <ListItem button={{ onClick: () => alert('Antarctica') }}>Antarctica</ListItem>
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
