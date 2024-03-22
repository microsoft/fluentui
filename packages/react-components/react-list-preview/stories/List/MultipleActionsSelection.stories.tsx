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
import { List, ListItem, ListProps } from '@fluentui/react-list-preview';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';

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
  title: {
    fontWeight: 600,
    display: 'block',
  },
  checkmark: {
    position: 'absolute',
    left: '10px',
    top: '10px',
    zIndex: 1,
  },
  preview: {
    ...shorthands.gridArea('preview'),
    ...shorthands.overflow('hidden'),
  },
  header: { ...shorthands.gridArea('header') },
  action: { ...shorthands.gridArea('action') },
  secondaryAction: { ...shorthands.gridArea('secondary_action') },
});

const CardExample = (props: { title: string; value: string; selected?: boolean }) => {
  const listItemStyles = useListItemRootStyles();
  const styles = useStyles();
  const { value } = props;

  return (
    <ListItem
      value={props.value}
      className={mergeClasses(listItemStyles, styles.listItem)}
      checkmark={{ className: styles.checkmark }}
      aria-label={value}
    >
      <div role="gridcell" className={styles.preview}>
        <img className={styles.image} src={`https://picsum.photos/seed/${value}/300/130/`} alt="Presentation Preview" />
      </div>
      <div role="gridcell" className={styles.header}>
        <Text className={styles.title}>{props.title}</Text>
        <Caption1 className={styles.caption}>You created 53m ago</Caption1>
      </div>
      <div role="gridcell" className={styles.action}>
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
      <div role="gridcell" className={styles.secondaryAction}>
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

export const MultipleActionsSelection = (props: Partial<ListProps>) => {
  const classes = useStyles();

  const [selectedItems, setSelectedItems] = React.useState<Array<string | number>>([]);

  return (
    <List
      selectionMode="multiselect"
      navigationMode="composite"
      className={classes.list}
      onSelectionChange={(e, data) => setSelectedItems(data.selectedItems)}
    >
      <CardExample title="Example List Item" value="card-1" selected={selectedItems.includes('card-1')} />
      <CardExample title="Example List Item" value="card-2" selected={selectedItems.includes('card-2')} />
      <CardExample title="Example List Item" value="card-3" selected={selectedItems.includes('card-3')} />
      <CardExample title="Example List Item" value="card-4" selected={selectedItems.includes('card-4')} />
      <CardExample title="Example List Item" value="card-5" selected={selectedItems.includes('card-5')} />
      <CardExample title="Example List Item" value="card-6" selected={selectedItems.includes('card-6')} />
      <CardExample title="Example List Item" value="card-7" selected={selectedItems.includes('card-7')} />
      <CardExample title="Example List Item" value="card-8" selected={selectedItems.includes('card-8')} />
      <CardExample title="Example List Item" value="card-9" selected={selectedItems.includes('card-9')} />
    </List>
  );
};
MultipleActionsSelection.parameters = {
  docs: {
    description: {
      story: [
        "Item with multiple actions. It has selection enabled, which is also it's primary action.",
        'The selection can be toggled by clicking on the item or pressing the `Space` key.',
        '',
        'Because the selection is the action on the item, to properly narrate the state of selection',
        'we are using the role grid / row / gridcell here to properly announce when the selection on the',
        'item is toggled.',
        '',
        'To enable the user to navigate inside of the list items by pressing the `RightArrow` key,',
        'the `navigationMode` prop should be set to `composite`.',
      ].join('\n'),
    },
  },
};
