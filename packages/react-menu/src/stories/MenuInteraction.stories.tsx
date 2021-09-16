import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover, MenuProps } from '@fluentui/react-menu';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from '@fluentui/react-button';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: '10px',
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
