import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Rating, RatingProps } from '@fluentui/react-components';

export const Default = (props: Partial<RatingProps>): JSXElement => {
  return <Rating {...props} />;
};
