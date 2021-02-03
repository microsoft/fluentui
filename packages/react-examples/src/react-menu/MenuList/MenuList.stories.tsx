import * as React from 'react';

import {
  MenuList,
  MenuItem,
  MenuGroup,
  MenuGroupHeader,
  MenuItemCheckbox,
  MenuItemRadio,
  MenuGroupDivider,
} from '@fluentui/react-menu';
import { teamsLightTheme } from '@fluentui/react-theme';
import { FluentProvider } from '@fluentui/react-provider';
import { CutIcon, PasteIcon, EditIcon, AcceptIcon } from '@fluentui/react-icons-mdl2';
import { makeStyles } from '@fluentui/react-make-styles';

const useContainerStyles = makeStyles([
  // This should eventually be the popup container styles
  [
    null,
    theme => ({
      backgroundColor: theme.neutralColorTokens.neutralBackground1,
      minWidth: '128px',
      minHeight: '48px',
      maxWidth: '128px',
      boxShadow: `${theme.shadowLevels?.shadow16.ambient}, ${theme.shadowLevels?.shadow16.key}`,
      paddingTop: '4px',
      paddingBottom: '4px',
    }),
  ],
]);
const Container = (props: { children: React.ReactNode }) => {
  const classNames = useContainerStyles({});
  return <div className={classNames}>{props.children}</div>;
};

export const MenuListExample = () => (
  <FluentProvider theme={teamsLightTheme}>
    <Container>
      <MenuList>
        <MenuItem icon={<CutIcon />}>Item</MenuItem>
        <MenuItem icon={<PasteIcon />}>Item</MenuItem>
        <MenuItem icon={<EditIcon />}>Item</MenuItem>
      </MenuList>
    </Container>
  </FluentProvider>
);

export const MenuListWithIconsExample = () => (
  <FluentProvider theme={teamsLightTheme}>
    <Container>
      <MenuList>
        <MenuItem icon={<CutIcon />}>Item</MenuItem>
        <MenuItem icon={<PasteIcon />}>Item</MenuItem>
        <MenuItem icon={<EditIcon />}>Item</MenuItem>
      </MenuList>
    </Container>
  </FluentProvider>
);

export const MenuListWithGroupExample = () => (
  <FluentProvider theme={teamsLightTheme}>
    <Container>
      <MenuList>
        <MenuItem icon={<CutIcon />}>Item</MenuItem>
        <MenuItem icon={<PasteIcon />}>Item</MenuItem>
        <MenuItem icon={<EditIcon />}>Item</MenuItem>
        <MenuGroupDivider />
        <MenuGroup>
          <MenuGroupHeader>Section header</MenuGroupHeader>
          <MenuItem icon={<CutIcon />}>Item</MenuItem>
          <MenuItem icon={<PasteIcon />}>Item</MenuItem>
          <MenuItem icon={<EditIcon />}>Item</MenuItem>
        </MenuGroup>
      </MenuList>
    </Container>
  </FluentProvider>
);

export const MenuListWithCheckboxes = () => {
  const checkmark = <AcceptIcon />;
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({});
  const onChange = (name: string, items: string[]) => {
    setCheckedValues(s => ({ ...s, [name]: items }));
  };

  return (
    <FluentProvider theme={teamsLightTheme}>
      <Container>
        <MenuList checkedValues={checkedValues} onCheckedValuesChange={onChange}>
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
    </FluentProvider>
  );
};

export const MenuListWithRadios = () => {
  const checkmark = <AcceptIcon />;
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({});
  const onChange = (name: string, items: string[]) => {
    setCheckedValues(s => ({ ...s, [name]: items }));
  };

  return (
    <FluentProvider theme={teamsLightTheme}>
      <Container>
        <MenuList checkedValues={checkedValues} onCheckedValuesChange={onChange}>
          <MenuItemRadio name="checkbox" value="1" checkmark={checkmark}>
            Item
          </MenuItemRadio>
          <MenuItemRadio name="checkbox" value="2" checkmark={checkmark}>
            Item
          </MenuItemRadio>
          <MenuItemRadio name="checkbox" value="3" checkmark={checkmark}>
            Item
          </MenuItemRadio>
        </MenuList>
      </Container>
    </FluentProvider>
  );
};
