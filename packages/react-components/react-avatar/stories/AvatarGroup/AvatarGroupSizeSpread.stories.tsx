import * as React from 'react';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  makeStyles,
  partitionAvatarGroupItems,
} from '@fluentui/react-components';
import type { AvatarSize } from '@fluentui/react-components';

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

const sizes: AvatarSize[] = [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128];

export const SizeSpread = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      {sizes.map(size => {
        const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items: names });

        return (
          <AvatarGroup layout="spread" size={size} key={size}>
            {inlineItems.map(name => (
              <AvatarGroupItem name={name} key={name} />
            ))}
            {overflowItems && (
              <AvatarGroupPopover>
                {overflowItems.map(name => (
                  <AvatarGroupItem name={name} key={name} />
                ))}
              </AvatarGroupPopover>
            )}
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
