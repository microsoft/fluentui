import {
  Button,
  Caption1,
  Image,
  makeResetStyles,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  mergeClasses,
  Text,
  tokens,
} from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';
import { List, ListItem } from '@fluentui/react-list-preview';

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
    gap: '16px',
    maxWidth: '300px',
  },
  listItem: {
    display: 'grid',
    padding: '8px',
  },
  caption: {
    color: tokens.colorNeutralForeground3,
  },
  image: {
    height: '160px',
    maxWidth: '100%',
    borderRadius: '5px',
  },
  title: {
    fontWeight: 600,
    display: 'block',
  },
  preview: { gridArea: 'preview', overflow: 'hidden' },
  header: { gridArea: 'header' },
  action: { gridArea: 'action' },
  secondaryAction: { gridArea: 'secondary_action' },
});

const CustomListItem = (props: { title: string; value: string }) => {
  const listItemStyles = useListItemRootStyles();
  const styles = useStyles();
  const { value } = props;

  // This will be triggered by user pressing Enter or clicking on the list item
  const onAction = React.useCallback(event => {
    // This prevents the change in selection on click/Enter
    event.preventDefault();
    alert(`Triggered custom action!`);
  }, []);

  return (
    <ListItem
      value={props.value}
      className={mergeClasses(listItemStyles, styles.listItem)}
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
              appearance="transparent"
              icon={<MoreHorizontal20Regular />}
              onClick={e => e.preventDefault()}
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

export const MultipleActionsWithPrimary = () => {
  const classes = useStyles();

  return (
    <List navigationMode="composite" className={classes.list}>
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

MultipleActionsWithPrimary.parameters = {
  docs: {
    description: {
      story: [
        "Base item with multiple actions. Doesn't support selection, but the list items have a primary action ",
        'that can be triggered by clicking on the item or pressing Enter.',
        '',
        '__To make the navigation work properly, the `navigationMode` prop should be set to `composite`.__',
        'This will allow the user to navigate inside of the list items by pressing the `Right Arrow` key.',
        'It also sets the `grid` role automatically to the list.',
        '',
        '> ⚠️ _In cases where `grid` role is used, it is important that every direct children of `ListItem`_',
        '_has role `gridcell`. Also each focusable item should be in its own "gridcell". This makes sure the _',
        '_screen readers work properly._',
      ].join('\n'),
    },
  },
};
