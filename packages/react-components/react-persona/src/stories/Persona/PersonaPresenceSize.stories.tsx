import * as React from 'react';
import { Persona } from '@fluentui/react-persona';
import { makeStyles, PresenceBadgeProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, max-content)',
    columnGap: '10px',
    rowGap: '10px',
  },
});

const sizes: PresenceBadgeProps['size'][] = ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'];

export const PresenceSize = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      {sizes.map(size => (
        <Persona
          presenceOnly
          presence={{ status: 'available', size }}
          name="Kevin Sturgis"
          secondaryText="Available"
          key={size}
        />
      ))}
    </div>
  );
};

PresenceSize.parameters = {
  docs: {
    description: {
      story:
        `A Persona supports all PresenceBadge's sizes respecting its default size medium. When a size is specified ` +
        `, Persona will apply styles to the text lines based on the size of the PresenceBadge.`,
    },
  },
};
