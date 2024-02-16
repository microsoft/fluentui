import {
  Button,
  Caption1,
  CardProps,
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
  listItem: { display: 'grid', ...shorthands.padding('8px') },

  caption: {
    color: tokens.colorNeutralForeground3,
  },

  image: {
    maxWidth: '100%',
    ...shorthands.borderRadius('5px'),
  },

  grayBackground: {
    backgroundColor: tokens.colorNeutralBackground3,
  },

  logoBadge: {
    ...shorthands.padding('5px'),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    backgroundColor: '#FFF',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)',
  },
  actionsWrapper: {
    display: 'flex',
    ...shorthands.gap('8px'),
  },
  checkmark: {
    position: 'absolute',
    left: '10px',
    top: '10px',
    zIndex: 1,
  },
});

const CardExample = (props: CardProps & { value: string; selected?: boolean }) => {
  const listItemStyles = useListItemRootStyles();
  const styles = useStyles();
  const { value } = props;

  return (
    <ListItem
      value={props.value}
      className={mergeClasses(listItemStyles, styles.listItem)}
      checkmark={{ className: styles.checkmark }}
      role="row"
      aria-label={value}
      onClick={e => {
        // Prevent the default behavior - toggling the selection
        // e.preventDefault();
        // alert('Main action triggered!');
      }}
    >
      <div role="gridcell" style={{ gridArea: 'preview', overflow: 'hidden' }}>
        <img className={styles.image} src={`https://picsum.photos/seed/${value}/300/130/`} alt="Presentation Preview" />
      </div>
      <div role="gridcell" style={{ gridArea: 'header' }}>
        <Text weight="semibold" style={{ display: 'block' }}>
          {props.value}
        </Text>
        <Caption1 className={styles.caption}>You created 53m ago</Caption1>
      </div>
      <div role="gridcell" style={{ gridArea: 'action' }}>
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
      <div role="gridcell" style={{ gridArea: 'secondary_action' }}>
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

export const MultipleActionsPrimarySelection = (props: Partial<ListProps>) => {
  const classes = useStyles();

  const [selectedItems, setSelectedItems] = React.useState<Array<string | number>>([]);

  return (
    <List
      className={classes.list}
      selectable
      role="grid"
      onSelectionChange={(e, data) => setSelectedItems(data.selectedItems)}
      selectionMode="multiselect"
    >
      <CardExample value="card-1" selected={selectedItems.includes('card-1')} />
      <CardExample value="card-2" selected={selectedItems.includes('card-2')} />
      <CardExample value="card-3" selected={selectedItems.includes('card-3')} />
      <CardExample value="card-4" selected={selectedItems.includes('card-4')} />
      <CardExample value="card-5" selected={selectedItems.includes('card-5')} />
      <CardExample value="card-6" selected={selectedItems.includes('card-6')} />
      <CardExample value="card-7" selected={selectedItems.includes('card-7')} />
      <CardExample value="card-8" selected={selectedItems.includes('card-8')} />
      <CardExample value="card-9" selected={selectedItems.includes('card-9')} />
    </List>
  );
};
MultipleActionsPrimarySelection.parameters = {
  docs: {
    description: {
      story: [
        'Item with multiple actions. It has a primary action on the list item and the action is selection.',
        '',
        'Because the selection is the action on the item, to properly narrate the state of selection',
        'we are using the role grid / row / gridcell here to properly announce when the selection on the',
        'item is toggled.',
      ].join('\n'),
    },
  },
};
