import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Provider } from './Provider';
import { useProviderContext } from './useProviderContext';

describe('Provider', () => {
  isConformant({
    Component: Provider,
    displayName: 'Provider',
    disabledTests: ['component-handles-classname', 'component-has-root-ref', 'component-handles-ref'],
  });

  const TestComponent = ({ children }: { children?: React.ReactNode }) => {
    const context = useProviderContext();

    return <div dir={context.dir}>{children}</div>;
  };

  it('renders a default state', () => {
    const result = render(
      <Provider>
        <TestComponent>Content</TestComponent>
      </Provider>,
    );
    expect(result.container).toHaveTextContent('Content');
    expect(result.container.firstChild).toHaveAttribute('dir', 'ltr');
  });

  it('renders with custom props', () => {
    const result = render(
      <Provider dir="rtl">
        <TestComponent>Content</TestComponent>
      </Provider>,
    );
    expect(result.container).toHaveTextContent('Content');
    expect(result.container.firstChild).toHaveAttribute('dir', 'rtl');
  });
});
