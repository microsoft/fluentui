import { createDOMRenderer, makeOverrides, MakeStylesOptions } from '@fluentui/make-styles';
import * as React from 'react';

const useBasicOverrides = makeOverrides({
  border: '1px solid red',
  color: 'red',
  padding: '5px',
});

const makeStylesOptions: MakeStylesOptions<{}> = {
  renderer: createDOMRenderer(),
  tokens: {},
  rtl: false,
};

export const BasicOverrides = () => {
  const classes = useBasicOverrides(makeStylesOptions);

  return <div className={classes}>Hello World!</div>;
};
