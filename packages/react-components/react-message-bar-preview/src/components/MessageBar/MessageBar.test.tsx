import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { MessageBar } from './MessageBar';

describe('MessageBar', () => {
  beforeAll(() => {
    // https://github.com/jsdom/jsdom/issues/3368
    global.ResizeObserver = class ResizeObserver {
      public observe() {
        // do nothing
      }
      public unobserve() {
        // do nothing
      }
      public disconnect() {
        // do nothing
      }
    };
  });

  isConformant({
    Component: MessageBar,
    displayName: 'MessageBar',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            icon: 'Icon',
          },
        },
      ],
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<MessageBar>Default MessageBar</MessageBar>);
    expect(result.container).toMatchSnapshot();
  });
});
