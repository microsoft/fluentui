import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { RatingDisplay } from '@fluentui/react-components';

import styles from './RatingDisplayColor.module.css';

export const Color = (): JSXElement => {
  return (
    <div className={styles.root}>
      <RatingDisplay value={3} />

      <RatingDisplay color="brand" value={3} />

      <RatingDisplay color="marigold" value={3} />
    </div>
  );
};

Color.parameters = {
  docs: {
    description: {
      story: "A RatingDisplay's `color` can be `neutral` (default), `brand`, or `marigold`.",
    },
  },
};
