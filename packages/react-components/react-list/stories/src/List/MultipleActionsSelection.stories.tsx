import {
  Button,
  Caption1,
  Image,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Text,
} from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';
import { List, ListItem } from '@fluentui/react-components';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import styles from './MultipleActionsSelection.module.css';

const useListItemRootStyles = () => styles.listItemRoot;

const useStyles = () => styles;

const CustomListItem = (props: { title: string; value: string }) => {
  const listItemStyles = useListItemRootStyles();
  const { value, title } = props;

  return (
    <ListItem
      value={value}
      className={`${listItemStyles} ${styles.listItem}`}
      checkmark={{ root: { role: 'gridcell' }, className: styles.checkmark, 'aria-label': value }}
      aria-label={value}
    >
      <div role="gridcell" className={styles.preview}>
        <Image
          fit="cover"
          className={styles.image}
          src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image.png"
          alt="Presentation Preview"
        />
      </div>
      <div role="gridcell" className={styles.header}>
        <Text className={styles.title}>{title}</Text>
        <Caption1 className={styles.caption}>You created 53m ago</Caption1>
      </div>
      <div role="gridcell" className={styles.action}>
        <Button
          appearance="primary"
          aria-label="Install"
          onClick={e => {
            e.preventDefault();
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
                  alert('Clicked menu item');
                }}
              >
                About
              </MenuItem>
              <MenuItem
                onClick={e => {
                  e.preventDefault();
                  alert('Clicked menu item');
                }}
              >
                Uninstall
              </MenuItem>
              <MenuItem
                onClick={e => {
                  e.preventDefault();
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

export const MultipleActionsSelection = (): JSXElement => {
  const classes = useStyles();

  const [selectedItems, setSelectedItems] = React.useState<Array<string | number>>([]);

  return (
    <List
      className={classes.list}
      navigationMode="composite"
      selectionMode="multiselect"
      selectedItems={selectedItems}
      onSelectionChange={(e, data) => setSelectedItems(data.selectedItems)}
    >
      <CustomListItem title="Example List Item" value="card-1" />
      <CustomListItem title="Example List Item" value="card-2" />
      <CustomListItem title="Example List Item" value="card-3" />
      <CustomListItem title="Example List Item" value="card-4" />
      <CustomListItem title="Example List Item" value="card-5" />
      <CustomListItem title="Example List Item" value="card-6" />
      <CustomListItem title="Example List Item" value="card-7" />
      <CustomListItem title="Example List Item" value="card-8" />
      <CustomListItem title="Example List Item" value="card-9" />
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
