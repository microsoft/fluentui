import * as React from 'react';

import {
  getStylesFromClassName,
  makeResetStyles,
  makeStyles,
  mergeClasses,
  shorthands,
} from '@fluentui/react-platform-adapter';
import { html } from 'react-strict-dom';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

const useBaseClassName = makeResetStyles({
  marginBlock: '1rem',
  padding: '10px',
});

const useClassNames = makeStyles({
  root: {
    ...shorthands.border('2px', 'solid', 'red'),
    color: 'pink',
    backgroundColor: '#333',
    ':hover': {
      color: 'skyblue',
      backgroundColor: 'darkblue',
    },
  },
  cond: {
    ...shorthands.borderWidth('5px'),
  },
});

export const StrictDomDemo = (props: { cond?: boolean }) => {
  const { cond } = props;

  const classNames = useClassNames();

  return (
    <FluentProvider theme={webLightTheme}>
      <html.div
        style={getStylesFromClassName(mergeClasses(useBaseClassName(), classNames.root, cond && classNames.cond))}
      >
        <html.span>This is a demo of styles defined using griffel</html.span>
      </html.div>
    </FluentProvider>
  );
};
