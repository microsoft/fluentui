import {
  Button,
  Caption1,
  Card,
  CardHeader,
  CardPreview,
  CardProps,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  shorthands,
  Text,
  tokens,
} from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';
import { List, ListItem, ListProps } from '@fluentui/react-list-preview';
import * as React from 'react';

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/';

  return `${ASSET_URL}${asset}`;
};

const useStyles = makeStyles({
  list: {
    'grid-template-columns': 'repeat(auto-fill, minmax(300px, 1fr))',
    ...shorthands.gap('16px'),
  },

  listItem: {
    position: 'relative',
  },

  caption: {
    color: tokens.colorNeutralForeground3,
  },

  smallRadius: {
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
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
  const styles = useStyles();

  return (
    <ListItem
      aria-label="iOS App Prototype"
      value={props.value}
      className={styles.listItem}
      checkmark={{ className: styles.checkmark }}
    >
      <Card {...props} selected={undefined} tabIndex={-1}>
        <CardPreview
          className={styles.grayBackground}
          logo={<img className={styles.logoBadge} src={resolveAsset('logo3.svg')} alt="Figma app logo" />}
        >
          <img className={styles.smallRadius} src={resolveAsset('office1.png')} alt="Presentation Preview" />
        </CardPreview>

        <CardHeader
          header={<Text weight="semibold">iOS App Prototype</Text>}
          description={<Caption1 className={styles.caption}>You created 53m ago</Caption1>}
          action={
            <div className={styles.actionsWrapper}>
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
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <Button
                    onClick={e => e.preventDefault()}
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
          }
        />
      </Card>
    </ListItem>
  );
};

export const ListMultipleActions = (props: Partial<ListProps>) => {
  const classes = useStyles();

  const [selectedItems, setSelectedItems] = React.useState<Array<string | number>>([]);

  return (
    <List
      layout={'grid'}
      className={classes.list}
      navigable
      selectable
      onSelectionChange={(e, data) => setSelectedItems(Array.from(data.selectedItems))}
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

ListMultipleActions.parameters = {
  docs: {
    description: {
      story: [
        'List can have a grid layout. What this means is that the wrapper will have `display: grid` applied to it. Also the arrow navigation will work horizontaly and vertically.',
        "\nBy default, the grid doesn't have any columns defined. It is up to the user to define the columns using CSS. Please refer to the example below.",
        '',
        'You can also select the items with a click or using a Spacebar key.',
      ].join('\n'),
    },
  },
};
