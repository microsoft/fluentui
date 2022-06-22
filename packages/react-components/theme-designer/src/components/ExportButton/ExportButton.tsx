import * as React from 'react';
import { makeStyles } from '@griffel/react';
import {
  BrandVariants,
  Menu,
  MenuTrigger,
  MenuButton,
  MenuPopover,
  MenuList,
  MenuItem,
} from '@fluentui/react-components';
import { ExportLink } from './ExportLink';

export interface ExportProps {
  className?: string;
  brand: BrandVariants;
  isDark: boolean;
}

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '20px',
  },
});

export const ExportButton: React.FC<ExportProps> = props => {
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
              <ExportLink brand={props.brand} isDark={props.isDark} />
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};
