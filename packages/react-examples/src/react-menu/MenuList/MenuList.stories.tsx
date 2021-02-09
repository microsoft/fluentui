import * as React from 'react';

import { MenuList, MenuItem, MenuItemCheckbox } from '@fluentui/react-menu';
import { CutIcon, PasteIcon, EditIcon, AcceptIcon } from '@fluentui/react-icons-mdl2';
import { makeStyles } from '@fluentui/react-make-styles';

const useContainerStyles = makeStyles([
  // This should eventually be the popup container styles
  [
    null,
    theme => ({
      backgroundColor: theme.alias.color.neutral.neutralBackground1,
      minWidth: '128px',
      minHeight: '48px',
      maxWidth: '128px',
      boxShadow: `${theme.alias.shadow.shadow16}`,
      paddingTop: '4px',
      paddingBottom: '4px',
    }),
  ],
]);
const Container: React.FC = props => {
  const classNames = useContainerStyles({});
  return <div className={classNames}>{props.children}</div>;
};

export const MenuListExample = () => (
  <Container>
    <MenuList>
      <MenuItem>Item</MenuItem>
      <MenuItem>Item</MenuItem>
      <MenuItem>Item</MenuItem>
    </MenuList>
  </Container>
);

export const MenuListWithIconsExample = () => (
  <Container>
    <MenuList>
      <MenuItem icon={<CutIcon />}>Item</MenuItem>
      <MenuItem icon={<PasteIcon />}>Item</MenuItem>
      <MenuItem icon={<EditIcon />}>Item</MenuItem>
    </MenuList>
  </Container>
);

export const MenuListWithCheckboxes = () => {
  const checkmark = <AcceptIcon />;
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({});
  const onChange = (name: string, items: string[]) => {
    setCheckedValues(s => ({ ...s, [name]: items }));
  };

  return (
    <Container>
      <MenuList checkedValues={checkedValues} onCheckedValueChange={onChange}>
        <MenuItemCheckbox name="checkbox" value="1" checkmark={checkmark}>
          Item
        </MenuItemCheckbox>
        <MenuItemCheckbox name="checkbox" value="2" checkmark={checkmark}>
          Item
        </MenuItemCheckbox>
        <MenuItemCheckbox name="checkbox" value="3" checkmark={checkmark}>
          Item
        </MenuItemCheckbox>
      </MenuList>
    </Container>
  );
};
