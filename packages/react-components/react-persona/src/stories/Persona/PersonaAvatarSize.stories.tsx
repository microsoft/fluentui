import * as React from 'react';
import { Persona } from '@fluentui/react-persona';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, max-content)',
    columnGap: '10px',
    rowGap: '10px',
  },
});

export const AvatarSize = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Persona size="extra-small" name="Kevin Sturgis" avatar={{ color: 'colorful' }} secondaryText="Available" />
      <Persona size="small" name="Kevin Sturgis" avatar={{ color: 'colorful' }} secondaryText="Available" />
      <Persona size="medium" name="Kevin Sturgis" avatar={{ color: 'colorful' }} secondaryText="Available" />
      <Persona size="large" name="Kevin Sturgis" avatar={{ color: 'colorful' }} secondaryText="Available" />
      <Persona size="extra-large" name="Kevin Sturgis" avatar={{ color: 'colorful' }} secondaryText="Available" />
      <Persona size="2-extra-large" name="Kevin Sturgis" avatar={{ color: 'colorful' }} secondaryText="Available" />
    </div>
  );
};

AvatarSize.parameters = {
  docs: {
    description: {
      story:
        `A Persona supports size different sizes, medium being the default. When a size is specified for avatar` +
        `, the size is respected.`,
    },
  },
};
