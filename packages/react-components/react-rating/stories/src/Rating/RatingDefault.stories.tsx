import * as React from 'react';
import type { JSXElement, RatingProps } from '@fluentui/react-components';
import { Rating } from '@fluentui/react-components';

export const Default = (props: Partial<RatingProps>): JSXElement => {
  return <Rating {...props} />;
};
