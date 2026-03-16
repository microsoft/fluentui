import * as React from 'react';
import { CounterBadge } from './CounterBadge';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';

describe('CounterBadge', () => {
  isConformant({
    Component: CounterBadge,
    displayName: 'CounterBadge',
    testOptions: {
      'has-static-classnames': [
        {
          props: { icon: 'Test Icon' },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const { container } = render(<CounterBadge />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
