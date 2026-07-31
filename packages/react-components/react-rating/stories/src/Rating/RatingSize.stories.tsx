import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Rating } from '@fluentui/react-components';

import styles from './RatingSize.module.css';

const useStyles = () => styles;

export const Size = (): JSXElement => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Rating defaultValue={3} size="small" />
      <Rating defaultValue={3} size="medium" />
      <Rating defaultValue={3} size="large" />
      <Rating defaultValue={3} size="extra-large" />
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: "A Rating's `size` can be `small`, `medium`, `large`, or `extra-large`.",
    },
  },
};
