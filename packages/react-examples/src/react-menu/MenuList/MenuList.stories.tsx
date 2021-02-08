import * as React from 'react';

import { MenuList, MenuItem } from '@fluentui/react-menu';
import { teamsLightTheme } from '@fluentui/react-theme';
import { FluentProvider } from '@fluentui/react-provider';
import { CutIcon, PasteIcon, EditIcon } from '@fluentui/react-icons-mdl2';
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
  <FluentProvider theme={teamsLightTheme}>
    <Container>
      <MenuList>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
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
