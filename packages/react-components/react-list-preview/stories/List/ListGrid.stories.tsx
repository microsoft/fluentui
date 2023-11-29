import * as React from 'react';
import { List, ListProps, ListItem, ListItemButton } from '@fluentui/react-list-preview';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    'grid-template-columns': 'repeat(3, 1fr)',
  },
});

export const ListGrid = (props: Partial<ListProps>) => {
  const classes = useStyles();
  return (
    <List layout="grid" className={classes.root}>
      <ListItem>
        <ListItemButton onClick={() => alert('Asia')}>Asia</ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => alert('Africa')}>Africa</ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => alert('Europe')}>Europe</ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => alert('North America')}>North America</ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => alert('South America')}>South America</ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => alert('Australia/Oceania')}>Australia/Oceania</ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => alert('Antarctica')}>Antarctica</ListItemButton>
      </ListItem>
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
