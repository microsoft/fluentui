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
import { DrawerBody, DrawerProps } from '@fluentui/react-drawer';
import { Button, Label, Radio, RadioGroup, makeStyles, shorthands, tokens, useId } from '@fluentui/react-components';
import { Folder20Filled, Folder20Regular, bundleIcon } from '@fluentui/react-icons';

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
});

const Folder = bundleIcon(Folder20Filled, Folder20Regular);

type DrawerType = Required<DrawerProps>['type'];

export const NavDrawerDefault = (props: Partial<NavDrawerProps>) => {
  const styles = useStyles();

  const labelId = useId('type-label');

  const [isOpen, setIsOpen] = React.useState(false);
  const [type, setType] = React.useState<DrawerType>('overlay');

  const someClickHandler = () => {
    console.log('someClickHandler');
  };

  return (
    <div className={styles.root}>
      <NavDrawer
        defaultSelectedValue={'10'}
        defaultSelectedCategoryValue={'8'}
        open={isOpen}
        type={type}
        onOpenChange={(_, { open }) => setIsOpen(open)}
        size="small"
      >
        <DrawerBody>
          <NavItem icon={<Folder />} target="_blank" onClick={someClickHandler} value="1">
            First
          </NavItem>
          <NavItem icon={<Folder />} target="_blank" onClick={someClickHandler} value="2">
            Second
          </NavItem>
          <NavItem icon={<Folder />} target="_blank" onClick={someClickHandler} value="3">
            Third
          </NavItem>
          <NavCategory value="4">
            <NavCategoryItem icon={<Folder />}>NavCategoryItem 1</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem target="_blank" onClick={someClickHandler} value="5">
                Five
              </NavSubItem>
              <NavSubItem target="_blank" onClick={someClickHandler} value="6">
                Six
              </NavSubItem>
              <NavSubItem target="_blank" onClick={someClickHandler} value="7">
                Seven
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavCategory value="8">
            <NavCategoryItem icon={<Folder />}>NavCategoryItem2</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem target="_blank" onClick={someClickHandler} value="9">
                Nine
              </NavSubItem>
              <NavSubItem target="_blank" onClick={someClickHandler} value="10">
                Ten
              </NavSubItem>
              <NavSubItem target="_blank" onClick={someClickHandler} value="11">
                Eleven
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
        </DrawerBody>
      </NavDrawer>{' '}
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
