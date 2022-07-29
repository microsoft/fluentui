import * as React from 'react';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupOverflow,
  getPartitionedAvatarGroupItems,
} from '@fluentui/react-avatar';
import { makeStyles } from '@fluentui/react-components';
import type { AvatarSizes } from '@fluentui/react-avatar';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

const names = [
  'Johnie McConnell',
  'Allan Munger',
  'Erik Nason',
  'Kristin Patterson',
  'Daisy Phillips',
  'Carole Poland',
  'Carlos Slattery',
  'Robert Tolbert',
  'Kevin Sturgis',
  'Charlotte Waltson',
  'Elliot Woodward',
];

const sizes = [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128];

export const SizeSpread = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      {sizes.map(size => {
        const avatarGroupItems = names.map(name => <AvatarGroupItem name={name} key={size + '-' + name} />);
        const { inlineItems, overflowItems } = getPartitionedAvatarGroupItems(avatarGroupItems);
        return (
          <AvatarGroup layout="spread" size={size as AvatarSizes} key={size}>
            {inlineItems}
            <AvatarGroupOverflow>{overflowItems}</AvatarGroupOverflow>
          </AvatarGroup>
        );
      })}
    </div>
  );
};

SizeSpread.parameters = {
  docs: {
    description: {
      story: 'An AvatarGroup with `spread` layout supports a range of sizes from 16 to 128. The default is 32.',
    },
  },
};
