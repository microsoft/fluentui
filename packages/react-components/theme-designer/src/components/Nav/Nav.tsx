import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { CircleRegular, ChevronRightRegular } from '@fluentui/react-icons';
import { Text, Menu, MenuTrigger, MenuButton, MenuPopover, MenuList, MenuItem } from '@fluentui/react-components';

export interface NavProps {
  className?: string;
}

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
    display: 'grid',
    gridTemplateColumns: '100px 200px auto 300px',
    ...shorthands.borderBottom('1px', 'solid', '#D1D1D1'),
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
  exportButton: {
    color: 'white',
  },
});

export const Nav: React.FC<NavProps> = props => {
  const styles = useStyles();
  return (
    <div className={mergeClasses(styles.root, props.className)}>
      <div className={styles.logo}>
        <CircleRegular primaryFill="white" />
        <Text>Color Tool</Text>
      </div>
      <div className={styles.content}>
        UI Colors <ChevronRightRegular /> New palette
      </div>
      <div className={styles.content}>
        <Text>Untitled</Text>
      </div>
      <div className={styles.export}>
        <Menu>
          <MenuTrigger>
            <MenuButton className={styles.exportButton} size="small" appearance="outline">
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
    </div>
  );
};
