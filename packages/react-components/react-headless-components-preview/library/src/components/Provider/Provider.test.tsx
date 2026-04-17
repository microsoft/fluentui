import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Provider } from './Provider';

describe('Provider', () => {
  isConformant({
    Component: Provider,
    displayName: 'Provider',
  });

  it('renders a default state', () => {
    const result = render(
      <Provider>
        <div>Content</div>
      </Provider>,
    );
    expect(result.container).toHaveTextContent('Content');
    expect(result.container.firstChild).toHaveAttribute('dir', 'ltr');
  });

  it('renders with custom dir', () => {
    const result = render(
      <Provider dir="rtl">
        <div>Content</div>
      </Provider>,
    );
    expect(result.container).toHaveTextContent('Content');
    expect(result.container.firstChild).toHaveAttribute('dir', 'rtl');
  });
});
