import * as React from 'react';
import {
  NavCategory,
  NavCategoryItem,
  NavDrawer,
  NavDrawerProps,
  NavItem,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-nav-preview';
import { DrawerBody, DrawerFooter, DrawerHeader, DrawerHeaderNavigation, DrawerProps } from '@fluentui/react-drawer';
import {
  Button,
  Caption1Strong,
  Label,
  Radio,
  RadioGroup,
  makeStyles,
  shorthands,
  tokens,
  useId,
} from '@fluentui/react-components';
import {
  Folder20Filled,
  Folder20Regular,
  NavigationFilled,
  PersonFilled,
  PersonRegular,
  bundleIcon,
} from '@fluentui/react-icons';
import { navItemTokens } from '../../src/components/sharedNavStyles.styles';

const useStyles = makeStyles({
  root: {
    ...shorthands.border('2px', 'solid', '#ccc'),
    ...shorthands.overflow('hidden'),
    display: 'flex',
    height: '480px',
    backgroundColor: '#fff',
  },
  content: {
    ...shorthands.flex(1),
    ...shorthands.padding('16px'),

    display: 'grid',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gridRowGap: tokens.spacingVerticalXXL,
    gridAutoRows: 'max-content',
  },
  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalS,
  },

  headingContent: {
    marginInlineStart: `10px`,
  },
  drawerFooterOverrides: {
    display: 'unset',
    ...shorthands.padding(0, tokens.spacingVerticalMNudge),
  },
  drawerHeaderOverrides: {
    ...shorthands.margin('unset'),
    paddingInlineStart: '8px',
    paddingBlockStart: '0px',
  },
  drawerBodyOverrides: {
    ...shorthands.padding(0, tokens.spacingVerticalMNudge),
  },
  buttonStyles: {
    marginInlineStart: '-8px',
    backgroundColor: navItemTokens.backgroundColor,
    color: tokens.colorNeutralForeground2,
    textDecorationLine: 'none',
    ':hover': {
      backgroundColor: navItemTokens.backgroundColorHover,
    },
    ':active': {
      backgroundColor: navItemTokens.backgroundColorPressed,
    },
  },
});

const Folder = bundleIcon(Folder20Filled, Folder20Regular);

const Person = bundleIcon(PersonFilled, PersonRegular);

type DrawerType = Required<DrawerProps>['type'];

export const NavDrawerDefault = (props: Partial<NavDrawerProps>) => {
  const styles = useStyles();

  const labelId = useId('type-label');

  const [isOpen, setIsOpen] = React.useState(true);
  const [type, setType] = React.useState<DrawerType>('inline');

  const someClickHandler = () => {
    console.log('someClickHandler');
  };

  return (
    <div className={styles.root}>
      <NavDrawer
        defaultSelectedValue={'2'}
        defaultSelectedCategoryValue={'1'}
        open={isOpen}
        type={type}
        onOpenChange={(_, { open }) => setIsOpen(open)}
        size="small"
      >
        <DrawerBody className={styles.drawerBodyOverrides}>
          <DrawerHeader className={styles.drawerHeaderOverrides}>
            <DrawerHeaderNavigation>
              <Button
                appearance={'transparent'}
                icon={<NavigationFilled />}
                value={'10000'}
                className={styles.buttonStyles}
              />
            </DrawerHeaderNavigation>
          </DrawerHeader>
          <NavCategory value="1">
            <Caption1Strong className={styles.headingContent}>Groceries</Caption1Strong>
            <NavCategoryItem icon={<Folder />}>Produce</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem target="_blank" onClick={someClickHandler} value="2">
                Carrot
              </NavSubItem>
              <NavSubItem target="_blank" onClick={someClickHandler} value="3">
                Lettuce
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavCategory value="4">
            <NavCategoryItem icon={<Folder />}>Meat</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem target="_blank" onClick={someClickHandler} value="9">
                Beef
              </NavSubItem>
              <NavSubItem target="_blank" onClick={someClickHandler} value="10">
                Pork
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavItem icon={<Folder />} target="_blank" onClick={someClickHandler} value="5">
            Bakery
          </NavItem>
          <NavItem icon={<Folder />} target="_blank" onClick={someClickHandler} value="6">
            Dairy
          </NavItem>
          <Caption1Strong className={styles.headingContent}>Home Improvement</Caption1Strong>
          <NavItem icon={<Folder />} target="_blank" onClick={someClickHandler} value="7">
            Lumber
          </NavItem>
          <NavItem icon={<Folder />} target="_blank" onClick={someClickHandler} value="8">
            Garden
          </NavItem>
        </DrawerBody>
        <DrawerFooter className={styles.drawerFooterOverrides}>
          <NavCategory value="9">
            <NavCategoryItem icon={<Person />}>Profile</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem target="_blank" onClick={someClickHandler} value="9">
                Settings
              </NavSubItem>
              <NavSubItem target="_blank" onClick={someClickHandler} value="10">
                Support
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
        </DrawerFooter>
      </NavDrawer>
      <div className={styles.content}>
        <Button appearance="primary" onClick={() => setIsOpen(!isOpen)}>
          {type === 'inline' ? 'Toggle' : 'Open'}
        </Button>

        <div className={styles.field}>
          <Label id={labelId}>Type</Label>
          <RadioGroup value={type} onChange={(_, data) => setType(data.value as DrawerType)} aria-labelledby={labelId}>
            <Radio value="overlay" label="Overlay (Default)" />
            <Radio value="inline" label="Inline" />
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};
