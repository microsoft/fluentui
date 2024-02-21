import {
  Button,
  Caption1,
  makeResetStyles,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  mergeClasses,
  shorthands,
  Text,
  tokens,
} from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';
import { List, ListItem, ListProps } from '@fluentui/react-list-preview';
import * as React from 'react';

const useListItemRootStyles = makeResetStyles({
  position: 'relative',
  flexGrow: '1',
  gap: '8px',
  border: '1px solid grey',
  alignItems: 'center',
  borderRadius: '8px',
  gridTemplate: `"preview preview preview" auto
      "header action secondary_action" auto / 1fr auto auto
    `,
});

const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('16px'),
    maxWidth: '300px',
  },
  listItem: {
    display: 'grid',
    ...shorthands.padding('8px'),
  },
  caption: {
    color: tokens.colorNeutralForeground3,
  },
  image: {
    maxWidth: '100%',
    ...shorthands.borderRadius('5px'),
  },
});

const CardExample = (props: { title: string; value: string }) => {
  const listItemStyles = useListItemRootStyles();
  const styles = useStyles();
  const { value } = props;

  return (
    <ListItem
      value={props.value}
      className={mergeClasses(listItemStyles, styles.listItem)}
      aria-label={value}
      onClick={() => alert('Primary action triggered!')}
    >
      <div style={{ gridArea: 'preview', overflow: 'hidden' }}>
        <img className={styles.image} src={`https://picsum.photos/seed/${value}/300/130/`} alt="Presentation Preview" />
      </div>
      <div style={{ gridArea: 'header' }}>
        <Text weight="semibold" style={{ display: 'block' }}>
          {props.title}
        </Text>
        <Caption1 className={styles.caption}>You created 53m ago</Caption1>
      </div>
      <div style={{ gridArea: 'action' }}>
        <Button
          appearance="primary"
          aria-label="Install"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            alert('Installing!');
          }}
        >
          Install
        </Button>
      </div>
      <div style={{ gridArea: 'secondary_action' }}>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
              appearance="transparent"
              icon={<MoreHorizontal20Regular />}
              aria-label="More actions"
            />
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  alert('Clicked menu item');
                }}
              >
                About
              </MenuItem>
              <MenuItem
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  alert('Clicked menu item');
                }}
              >
                Uninstall
              </MenuItem>
              <MenuItem
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  alert('Clicked menu item');
                }}
              >
                Block
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </ListItem>
  );
};

export const MultipleActionsWithPrimary = (props: Partial<ListProps>) => {
  const classes = useStyles();

  return (
    <List className={classes.list} aria-orientation="vertical">
      <CardExample title="Example List Item" value="card-1" />
      <CardExample title="Example List Item" value="card-2" />
      <CardExample title="Example List Item" value="card-3" />
      <CardExample title="Example List Item" value="card-4" />
      <CardExample title="Example List Item" value="card-5" />
      <CardExample title="Example List Item" value="card-6" />
      <CardExample title="Example List Item" value="card-7" />
      <CardExample title="Example List Item" value="card-8" />
      <CardExample title="Example List Item" value="card-9" />
    </List>
  );
};

MultipleActionsWithPrimary.parameters = {
  docs: {
    description: {
      story: [
        "Base item with multiple actions. Doesn't support selection, but the list items have a primary action ",
        'that can be triggered by clicking on the item or pressing Enter.',
        '',
        'You can navigate inside of the list items by pressing the `Right Arrow` key.',
      ].join('\n'),
    },
  },
};
