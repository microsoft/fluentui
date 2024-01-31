import * as React from 'react';

import { helloWorld } from '@fluentui/react-platform-adapter';
import { html } from 'react-strict-dom';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  root: {
    marginBlock: '1rem',
    borderColor: 'red',
    borderWidth: '1px',
    borderStyle: 'solid',
    color: 'orange',
  },
  cond: {
    borderWidth: '5px',
  },
});

export const StrictDomDemo = (props: { cond?: boolean }) => {
  const { cond } = props;
  return <html.div style={[styles.root, cond && styles.cond]}>{helloWorld()}</html.div>;
};
