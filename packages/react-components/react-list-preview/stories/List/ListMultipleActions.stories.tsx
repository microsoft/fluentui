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
    // 'grid-template-columns': 'repeat(auto-fill, minmax(300px, 1fr))',
    display: 'flex',
    width: '300px',
    flexDirection: 'column',
    ...shorthands.gap('16px'),
  },

  listItem: {
    position: 'relative',
    flexGrow: '1',
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

const CardExample = (props: CardProps & { value: string; selected?: boolean }) => {
  const styles = useStyles();
  const { value } = props;

  return (
    <ListItem
      value={props.value}
      className={styles.listItem}
      // aria-roledescription="Selectable list"
      role="listitem"
      onClick={e => {
        if (e.target.tagName === 'BUTTON') {
          return;
        }
        alert('main action trigerred');
      }}
      // aria-checked={props.selected ? 'true' : 'false'}
      aria-label={'iOS App Prototype' + props.value}

      // aria-owns={owns}
    >
      <Card {...props} aria-role={undefined}>
        <CardPreview
          // role="gridcell"
          id={'card-preview' + value}
          className={styles.grayBackground}
          logo={
            <img className={styles.logoBadge} src={resolveAsset('logo3.svg')} alt="Figma app logo" aria-hidden={true} />
          }
        >
          <img
            className={styles.smallRadius}
            src={resolveAsset('office1.png')}
            aria-hidden={true}
            alt="Presentation Preview"
          />
        </CardPreview>

        <CardHeader
          // role="gridcell"
          id={'card-header' + value}
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

  return (
    <List layout="grid" className={classes.list} focusableItems role="list" aria-orientation="vertical">
      <CardExample value="card-1" />
      <CardExample value="card-2" />
      <CardExample value="card-3" />
      <CardExample value="card-4" />
      <CardExample value="card-5" />
      <CardExample value="card-6" />
      <CardExample value="card-7" />
      <CardExample value="card-8" />
      <CardExample value="card-9" />
    </List>
  );
};

ListMultipleActions.parameters = {
  docs: {
    description: {
      story: [].join('\n'),
    },
  },
};
