import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Rating } from '@fluentui/react-components';
import { CircleFilled, CircleRegular, SquareFilled, SquareRegular } from '@fluentui/react-icons';

import styles from './RatingShape.module.css';

export const Shape = (): JSXElement => {
  return (
    <div className={styles.root}>
      <Rating iconFilled={CircleFilled} iconOutline={CircleRegular} step={0.5} />
      <Rating iconFilled={SquareFilled} iconOutline={SquareRegular} step={0.5} />
    </div>
  );
};

Shape.parameters = {
  docs: {
    description: {
      story:
        'You can pass in custom icons to the Rating component. You can specify the icons with the `iconFilled` and `iconOutline` props.',
    },
  },
};
