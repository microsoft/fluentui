import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { RatingDisplay } from '@fluentui/react-components';
import { CircleFilled, SquareFilled } from '@fluentui/react-icons';

import styles from './RatingDisplayShape.module.css';

export const Shape = (): JSXElement => {
  return (
    <div className={styles.root}>
      <RatingDisplay icon={CircleFilled} value={3.5} />
      <RatingDisplay icon={SquareFilled} value={3.5} />
    </div>
  );
};

Shape.parameters = {
  docs: {
    description: {
      story: 'You can pass in a custom icon to the RatingDisplay component using the `icon` prop.',
    },
  },
};
