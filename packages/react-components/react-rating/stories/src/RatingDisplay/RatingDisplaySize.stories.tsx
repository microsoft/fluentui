import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { RatingDisplay } from '@fluentui/react-components';

import styles from './RatingDisplaySize.module.css';

const useStyles = () => styles;

export const Size = (): JSXElement => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <RatingDisplay value={3} size="small" />
      <RatingDisplay value={3} size="medium" />
      <RatingDisplay value={3} size="large" />
      <RatingDisplay value={3} size="extra-large" />
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: "A RatingDisplay's `size` can be `small`, `medium`, `large`, or `extra-large`.",
    },
  },
};
