import * as React from 'react';
import { AvatarGroup, AvatarGroupItem, AvatarGroupPopover, partitionAvatarGroupItems } from '@fluentui/react-avatar';
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

const sizes: AvatarSizes[] = [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128];

export const SizePie = () => {
  const styles = useStyles();
  const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items: names, layout: 'pie' });

  return (
    <div className={styles.root}>
      {sizes.map(size => {
        return (
          <AvatarGroup layout="pie" size={size} key={size}>
            {inlineItems.map(name => (
              <AvatarGroupItem name={name} key={name} />
            ))}
            <AvatarGroupPopover>
              {overflowItems.map(name => (
                <AvatarGroupItem name={name} key={name} />
              ))}
            </AvatarGroupPopover>
          </AvatarGroup>
        );
      })}
    </div>
  );
};

SizePie.parameters = {
  docs: {
    description: {
      story: 'An AvatarGroup with `pie` layout supports a range of sizes from 16 to 128. The default is 32.',
    },
  },
};
