import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { FluentProvider, webDarkTheme } from '@fluentui/react-components';
import { CircleRegular, ChevronRightRegular } from '@fluentui/react-icons';
import { Text, Menu, MenuTrigger, MenuButton, MenuPopover, MenuList, MenuItem } from '@fluentui/react-components';

export interface NavProps {
  className?: string;
}

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 3fr 3fr',
    height: '40px',
  },
  logo: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  content: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  export: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '20px',
  },
});

export const Name = () => {
  const styles = useStyles();
  return (
    <div className={styles.content}>
      <Text>Untitled</Text>
    </div>
  );
};

export const ExportButton = () => {
  const styles = useStyles();
  return (
    <div className={styles.export}>
      <Menu>
        <MenuTrigger>
          <MenuButton size="small" appearance="outline">
            Save
          </MenuButton>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>TBD</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};

export const Nav: React.FC<NavProps> = props => {
  const styles = useStyles();
  return (
    <div className={props.className}>
      <FluentProvider theme={webDarkTheme}>
        <div className={styles.root}>
          <div className={styles.logo}>
            <CircleRegular />
            <Text>Color Tool</Text>
          </div>
          <div className={styles.content}>
            UI Colors <ChevronRightRegular /> New palette
          </div>
          <Name />
          <ExportButton />
        </div>
      </FluentProvider>
    </div>
  );
};
