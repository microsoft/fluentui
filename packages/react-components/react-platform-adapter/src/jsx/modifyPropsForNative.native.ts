import type * as React from 'react';

import { getStylesFromClassName } from '../styling/index';

export const modifyPropsForNative = <P extends {}>(
  props: (P & { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) | null,
) => {
  if (!props?.className) {
    return props;
  }

  console.log('jsxDEV | props.className BEFORE: ', props.className);

  props = {
    ...props,
    // TODO Need to also convert props.style from CSSProperties to StyleXStyle
    style: getStylesFromClassName(props.className),
  };
  delete props.className;

  console.log('jsxDEV | props.style AFTER: ', props.style);

  return props;
};
