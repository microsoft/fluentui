import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { Menu, MenuButton, MenuItem, MenuList, MenuPopover, MenuTrigger} from '@fluentui/react-components';
import { ExportLink } from './ExportLink';

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '20px',
  },
});

export const ExportButton = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Menu>
        <MenuTrigger>
          <MenuButton size="small" appearance="outline">
            Save
          </MenuButton>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>
              <ExportLink />
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};
