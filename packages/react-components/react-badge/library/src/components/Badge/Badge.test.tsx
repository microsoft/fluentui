import * as React from 'react';
import { Badge } from './Badge';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';

describe('Badge', () => {
  isConformant({
    Component: Badge,
    displayName: 'Badge',
    testOptions: {
      'has-static-classnames': [
        {
          props: { icon: 'Test Icon' },
        },
      ],
    },
  });

  /**
   * Note: see more visual regression tests for Badge in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<Badge>Default Badge</Badge>);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Badge DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      <Badge appearance="tint" color="danger" icon={<span />} iconPosition="after" shape="rounded" size="large" />,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class']);
  });
});
