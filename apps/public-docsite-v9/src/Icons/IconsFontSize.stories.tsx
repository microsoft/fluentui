import { AccessTimeFilled } from '@fluentui/react-icons';
import { makeStyles, shorthands } from '@fluentui/react-components';
import * as React from 'react';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    ...shorthands.gap('10px'),
  },
});

export const FontSize = () => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <AccessTimeFilled aria-label="An AccessTimeFilled (32px size) icon" fontSize="32px" />
      <AccessTimeFilled aria-label="An AccessTimeFilled (64px size) icon" fontSize="64px" />
    </div>
  );
};

FontSize.parameters = {
  docs: {
    description: {
      story:
        'As icons are SVG elements they can be styled using [`fontSize` prop](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-size).',
    },
  },
};
