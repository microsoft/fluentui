import { ax, createDOMRenderer, makeOverrides, MakeStylesOptions } from '@fluentui/make-styles';
import * as React from 'react';

const useBasicOverrides = makeOverrides({
  root: {
    border: '1px solid red',
    color: 'red',
    padding: '5px',
  },
  rootPrimary: {
    border: '1px solid blue',
    color: 'blue',
  },

  content: {
    fontWeight: 'bold',
  },
});

const makeStylesOptions: MakeStylesOptions<{}> = {
  renderer: createDOMRenderer(),
  tokens: {},
  rtl: false,
};

export const BasicOverrides = () => {
  const classes = useBasicOverrides(makeStylesOptions);

  return (
    <>
      <div className={classes.root}>
        <span className={classes.content}>Hello World!</span>
      </div>

      <div className={ax(classes.root, classes.rootPrimary)}>
        <span className={classes.content}>Hello World!</span>
      </div>
    </>
  );
};
