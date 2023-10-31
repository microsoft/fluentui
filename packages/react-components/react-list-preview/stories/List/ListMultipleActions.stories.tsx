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
  MenuItemLink,
  MenuList,
  MenuPopover,
  MenuTrigger,
  shorthands,
  Text,
  tokens,
} from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';
import { List, ListItem, ListLayout, ListProps } from '@fluentui/react-list-preview';
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
});

const CardExample = (props: CardProps) => {
  const styles = useStyles();

  return (
    <Card {...props}>
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
            <Button appearance="primary" aria-label="Install" onClick={() => alert('Installing!')}>
              Install
            </Button>
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Button appearance="transparent" icon={<MoreHorizontal20Regular />} aria-label="More actions" />
              </MenuTrigger>

              <MenuPopover>
                <MenuList>
                  <MenuItem onClick={() => alert('Clicked menu item')}>About</MenuItem>
                  <MenuItem onClick={() => alert('Clicked menu item')}>Uninstall</MenuItem>
                  <MenuItem onClick={() => alert('Clicked menu item')}>Block</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </div>
        }
      />
    </Card>
  );
};

export const ListMultipleActions = (props: Partial<ListProps>) => {
  const classes = useStyles();
  return (
    <List layout={ListLayout.Grid} className={classes.list} focusableItems>
      <ListItem aria-label="iOS App Prototype">
        <CardExample />
      </ListItem>
      <ListItem aria-label="iOS App Prototype">
        <CardExample />
      </ListItem>
      <ListItem aria-label="iOS App Prototype">
        <CardExample />
      </ListItem>
      <ListItem aria-label="iOS App Prototype">
        <CardExample />
      </ListItem>
      <ListItem aria-label="iOS App Prototype">
        <CardExample />
      </ListItem>
      <ListItem aria-label="iOS App Prototype">
        <CardExample />
      </ListItem>
      <ListItem aria-label="iOS App Prototype">
        <CardExample />
      </ListItem>
      <ListItem aria-label="iOS App Prototype">
        <CardExample />
      </ListItem>
      <ListItem aria-label="iOS App Prototype">
        <CardExample />
      </ListItem>
    </List>
  );
};

ListMultipleActions.parameters = {
  docs: {
    description: {
      story: [
        'List can have a grid layout. What this means is that the wrapper will have `display: grid` applied to it. Also the arrow navigation will work horizontaly and vertically.',
        "\nBy default, the grid doesn't have any columns defined. It is up to the user to define the columns using CSS. Please refer to the example below.",
      ].join('\n'),
    },
  },
};
