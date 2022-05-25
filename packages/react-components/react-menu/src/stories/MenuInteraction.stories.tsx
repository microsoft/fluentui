import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { makeStyles, shorthands } from '@griffel/react';

import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover, MenuProps } from '../index';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    ...shorthands.gap('10px'),
  },

  indicator: {
    width: '30px',
    height: '30px',
  },
});

export const Interaction = (props: Partial<MenuProps>) => {
  const styles = useStyles();
  const [color, setColor] = React.useState<string>('red');

  return (
    <div className={styles.container}>
      <Menu {...props}>
        <MenuTrigger>
          <Button>Pick a color</Button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem onClick={() => setColor('red')}>Red</MenuItem>
            <MenuItem onClick={() => setColor('green')}>Green</MenuItem>
            <MenuItem onClick={() => setColor('blue')}>Blue</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <div className={styles.indicator} style={{ background: color }} />
    </div>
  );
};

Interaction.parameters = {
  docs: {
    description: {
      story: [
        'Each sub component of the `Menu` that renders DOM elements can be assigned HTML event listeners.',
        'You can simply add an `onClick` listener to individual `MenuItem` without needing to control the entire',
        'component. Special handling is required for checkboxes and radio items inside a `Menu`, read the further',
        'examples below to see how to handle those variants.',
      ].join('\n'),
    },
  },
};
