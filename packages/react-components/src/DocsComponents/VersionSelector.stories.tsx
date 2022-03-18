import * as React from 'react';
import {
  MenuButton,
  Menu,
  MenuPopover,
  MenuItemRadio,
  MenuList,
  MenuTrigger,
  makeStyles,
  MenuProps,
  MenuItem,
} from '../index';
import { version as packageJsonVersion } from '../../package.json';

const useStyles = makeStyles({
  menuButton: {
    minWidth: '210px',
    justifyContent: 'flex-start',
    marginLeft: '5px',
  },
  chevronIcon: {
    marginLeft: 'auto',
  },
  menuPopover: {
    minWidth: '210px',
    zIndex: 1000,
  },
  menuList: {
    overflowY: 'auto',
    maxHeight: '30vh',
  },
  menuItemRadio: {
    height: 'auto',
    paddingTop: '7px',
    paddingBottom: '7px',
  },
});

const onCheckedValueChange: MenuProps['onCheckedValueChange'] = (e, data) => {
  const selectedUrl = data.checkedItems[0] + window.location.search;
  if (window.top) {
    window.top.location.href = selectedUrl;
  } else {
    window.location.href = selectedUrl;
  }
};

/**
 * Theme picker used in the react-components docs header
 */
export const VersionSelector: React.FC = () => {
  const styles = useStyles();
  const [versions, setVersions] = React.useState<string[][]>([]);

  React.useEffect(() => {
    // metadata.json is populated only in Chromatic
    // an example of the file is available here:
    // https://master--5ccbc373887ca40020446347.chromatic.com/metadata.json
    fetch('/metadata.json').then(async response => {
      if (response.ok) {
        const metadata = await response.json();
        setVersions(Object.entries(metadata.versions));
      }
    });
  }, []);

  return (
    <Menu
      onCheckedValueChange={onCheckedValueChange}
      checkedValues={{
        version: [
          versions
            .find(v => v[0] === `v${packageJsonVersion}`)
            ?.slice(-1)
            .pop() || '',
        ],
      }}
    >
      <MenuTrigger>
        <MenuButton className={styles.menuButton} menuIcon={{ className: styles.chevronIcon }}>
          Version (v{packageJsonVersion})
        </MenuButton>
      </MenuTrigger>
      <MenuPopover className={styles.menuPopover}>
        <MenuList className={styles.menuList}>
          {versions.length === 0 && (
            <MenuItem className={styles.menuItemRadio}>Unable to load the list of available versions.</MenuItem>
          )}
          {versions.map(([version, url], index) => (
            <MenuItemRadio className={styles.menuItemRadio} name="version" value={url} key={index}>
              {version}
            </MenuItemRadio>
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
