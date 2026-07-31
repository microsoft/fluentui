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

import styles from './MultipleActionsDifferentPrimary.module.css';

const useListItemRootStyles = () => styles.listItemRoot;

const useStyles = () => styles;

const CustomListItem = (props: { title: string; value: string }) => {
  const listItemStyles = useListItemRootStyles();
  const { value } = props;

  // This will be triggered by user pressing Enter or clicking on the list item
  const onAction = React.useCallback(
    (event: React.SyntheticEvent | Event, { value: val }: { value: string | number }) => {
      // This prevents the change in selection on click/Enter
      event.preventDefault();
      alert(`Triggered custom action on ${val}`);
    },
    [],
  );

  return (
    <ListItem
      value={props.value}
      className={`${listItemStyles} ${styles.listItem}`}
      checkmark={{ root: { role: 'gridcell' }, className: styles.checkmark, 'aria-label': value }}
      aria-label={value}
      onAction={onAction}
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
        <Text className={styles.title}>{props.title}</Text>
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

export const MultipleActionsDifferentPrimary = (): JSXElement => {
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

MultipleActionsDifferentPrimary.parameters = {
  docs: {
    description: {
      story: [
        'Similar to previous example, but this one implements a custom `onAction` prop on the `ListItem`, ',
        'allowing us to trigger a different action than the selection when the user clicks ',
        'on the list item or presses Enter.',
        '',
        'The primary action can be triggered by clicking on the list item or pressing `Enter`.',
        '',
        'The selection can be toggled by clicking on the checkbox or pressing `Space` when the item is focused.',
        '',
        'To focus on the secondary actions, you can navigate between them by using left and right arrows.',
      ].join('\n'),
    },
  },
};
