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

describe('CounterBadge DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(<CounterBadge count={5} dot={false} overflowCount={3} showZero size="large" />);

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class']);
  });
});
