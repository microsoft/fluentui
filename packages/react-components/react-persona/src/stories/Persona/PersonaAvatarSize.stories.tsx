import * as React from 'react';
import { Persona } from '@fluentui/react-persona';
import { AvatarSizes, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, max-content)',
    columnGap: '10px',
    rowGap: '10px',
  },
});

const sizes: AvatarSizes[] = [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128];

export const AvatarSize = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      {sizes.map(size => (
        <Persona
          name="Kevin Sturgis"
          avatar={{ size }}
          presence={{ status: 'available' }}
          secondaryText="Available"
          key={size}
        />
      ))}
    </div>
  );
};

AvatarSize.parameters = {
  docs: {
    description: {
      story:
        'A Persona supports all Avatar sizes respecting its default size of 32. When a size is specified, Persona ' +
        'will apply styles to the text lines based on the size of the Avatar.',
    },
  },
};
