import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Rating } from '@fluentui/react-components';

import styles from './RatingColor.module.css';

export const Color = (): JSXElement => {
  return (
    <div className={styles.root}>
      <Rating defaultValue={3} />

      <Rating color="brand" defaultValue={3} />

      <Rating color="marigold" defaultValue={3} />
    </div>
  );
};

Color.parameters = {
  docs: {
    description: {
      story: "A Rating's `color` can be `neutral` (default), `brand`, or `marigold`.",
    },
  },
};
