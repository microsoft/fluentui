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
  Theme,
} from '@fluentui/react-components';
import { ExportLink } from './ExportLink';

export interface ExportProps {
  brand: BrandVariants;
  isDark: boolean;
  overrides: Partial<Theme>;
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

  const { brand, isDark, overrides } = props;

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
              <ExportLink brand={brand} isDark={isDark} overrides={overrides} />
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};
