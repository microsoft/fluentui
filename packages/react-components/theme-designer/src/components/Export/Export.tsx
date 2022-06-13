import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { Theme, Menu, MenuTrigger, MenuButton, MenuPopover, MenuList, MenuItem } from '@fluentui/react-components';
import { CodeSandbox } from './CodeSandbox';

export interface ExportProps {
  className?: string;
  lightTheme: Theme;
  darkTheme: Theme;
}

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '20px',
  },
});

export const Export: React.FC<ExportProps> = props => {
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
              <CodeSandbox theme={props.lightTheme} text={'Preview Light Theme in CodeSandbox'} />
            </MenuItem>
            <MenuItem>
              <CodeSandbox theme={props.darkTheme} text={'Preview Dark Theme in CodeSandbox'} />
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};
