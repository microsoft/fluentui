import * as React from 'react';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  makeStyles,
  partitionAvatarGroupItems,
} from '@fluentui/react-components';

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

export const Indicator = () => {
  const styles = useStyles();
  const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items: names });

  return (
    <div className={styles.root}>
      <AvatarGroup>
        {inlineItems.map(name => (
          <AvatarGroupItem name={name} key={name} />
        ))}
        {overflowItems && (
          <AvatarGroupPopover indicator="count">
            {overflowItems.map(name => (
              <AvatarGroupItem name={name} key={name} />
            ))}
          </AvatarGroupPopover>
        )}
      </AvatarGroup>
      <AvatarGroup>
        {inlineItems.map(name => (
          <AvatarGroupItem name={name} key={name} />
        ))}
        {overflowItems && (
          <AvatarGroupPopover indicator="icon">
            {overflowItems.map(name => (
              <AvatarGroupItem name={name} key={name} />
            ))}
          </AvatarGroupPopover>
        )}
      </AvatarGroup>
    </div>
  );
};

Indicator.parameters = {
  docs: {
    description: {
      story: `An AvatarGroup supports an icon and a count indicator.
        When size is less than 24, then icon will be used by default.`,
    },
  },
};
