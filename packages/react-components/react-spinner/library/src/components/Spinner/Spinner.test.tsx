import * as React from 'react';
import { render } from '@testing-library/react';
import { Spinner } from './Spinner';
import { isConformant } from '../../testing/isConformant';

describe('Spinner', () => {
  isConformant({
    Component: Spinner,
    displayName: 'Spinner',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            label: 'Test Label',
          },
        },
      ],
    },
  });

  it('has role progressbar', () => {
    const result = render(<Spinner label="Default Spinner" />);
    expect(result.queryByRole('progressbar')).toBeDefined();
  });

  it('renders Spinner with a label', () => {
    const result = render(<Spinner label="Loading" />);
    expect(result.getByText('Loading')).toBeDefined();
    expect(result.queryByRole('progressbar')).toBeDefined();
  });

  it('doesnt render svg when slot is null', () => {
    const result = render(<Spinner spinner={null} />);
    expect(result.container.getElementsByClassName('fui-Spinner__Progressbar')).toBeNull;
  });

  it('doesnt render svg when spinner styles is overridden', () => {
    const testId = 'test-id';
    const result = render(<Spinner id={testId} spinner={{ style: { visibility: 'hidden' } }} />);
    expect(result.queryByRole('progressbar')?.getAttribute('id')).toEqual('test-id');
  });

  it('doesnt render Spinner or its label instantaneously when delay is added', () => {
    const result = render(<Spinner delay={1000} />);
    expect(result.container.getElementsByClassName('fui-Spinner__Progressbar')).toBeNull;
    expect(result.container.getElementsByClassName('fui-Spinner__label')).toBeNull;
  });
});
