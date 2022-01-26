import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { makeStyles } from './makeStyles';

describe('makeStyles', () => {
  it('works outside of React components', () => {
    expect(() => makeStyles({ root: { color: 'red' } })).not.toThrow();
  });

  it('throws inside React components', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const Example: React.FC = () => {
      makeStyles({ root: { color: 'red' } });
      return null;
    };
    const container = document.createElement('div');

    expect(() => ReactDOM.render(<Example />, container)).toThrow(/All makeStyles\(\) calls should be top level/);
  });
});
