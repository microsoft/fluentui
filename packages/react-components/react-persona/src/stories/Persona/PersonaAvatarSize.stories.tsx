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
      <Persona name="Kevin Sturgis" avatar={{ size: 16, color: 'colorful' }} secondaryText="Available" />
      <Persona name="Kevin Sturgis" avatar={{ size: 20, color: 'colorful' }} secondaryText="Available" />
      <Persona name="Kevin Sturgis" avatar={{ size: 24, color: 'colorful' }} secondaryText="Available" />
      <Persona name="Kevin Sturgis" avatar={{ size: 28, color: 'colorful' }} secondaryText="Available" />
      <Persona name="Kevin Sturgis" avatar={{ size: 32, color: 'colorful' }} secondaryText="Available" />
      <Persona name="Kevin Sturgis" avatar={{ size: 36, color: 'colorful' }} secondaryText="Available" />
      <Persona name="Kevin Sturgis" avatar={{ size: 40, color: 'colorful' }} secondaryText="Available" />
      <Persona name="Kevin Sturgis" avatar={{ size: 48, color: 'colorful' }} secondaryText="Available" />
      <Persona name="Kevin Sturgis" avatar={{ size: 56, color: 'colorful' }} secondaryText="Available" />
      <Persona name="Kevin Sturgis" avatar={{ size: 64, color: 'colorful' }} secondaryText="Available" />
      <Persona name="Kevin Sturgis" avatar={{ size: 72, color: 'colorful' }} secondaryText="Available" />
      <Persona name="Kevin Sturgis" avatar={{ size: 96, color: 'colorful' }} secondaryText="Available" />
      <Persona name="Kevin Sturgis" avatar={{ size: 120, color: 'colorful' }} secondaryText="Available" />
      <Persona name="Kevin Sturgis" avatar={{ size: 128, color: 'colorful' }} secondaryText="Available" />
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
