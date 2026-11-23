import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { Spinner } from './Spinner';
import { isConformant } from '../../testing/isConformant';
import { useSpinnerBase_unstable } from './useSpinner';

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
    expect(result.getByRole('progressbar')).toBeDefined();
  });

  it('doesnt render svg when slot is null', () => {
    const result = render(<Spinner spinner={null} />);
    expect(result.container.getElementsByClassName('fui-Spinner__Progressbar')).toBeNull;
  });

  it('doesnt render svg when spinner styles is overridden', () => {
    const testId = 'test-id';
    const result = render(<Spinner id={testId} spinner={{ style: { visibility: 'hidden' } }} />);
    expect(result.getByRole('progressbar').getAttribute('id')).toEqual('test-id');
  });

  it('doesnt render Spinner or its label instantaneously when delay is added', () => {
    const result = render(<Spinner delay={1000} />);
    expect(result.container.getElementsByClassName('fui-Spinner__Progressbar')).toBeNull;
    expect(result.container.getElementsByClassName('fui-Spinner__label')).toBeNull;
  });

  it('renders span as a root slot tag', () => {
    const result = render(<Spinner as="span" />);
    expect(result.getByRole('progressbar').tagName).toBe('SPAN');
  });
});

describe('Spinner DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      <Spinner appearance="inverted" delay={0} label="Loading" labelPosition="below" size="large" />,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual([
      'aria-labelledby',
      'class',
      'role',
    ]);
  });
});

describe('useSpinnerBase_unstable base hook', () => {
  it('does not forward component props to the root slot', () => {
    const { result } = renderHook(() =>
      useSpinnerBase_unstable(
        { delay: 10, label: 'Loading', labelPosition: 'below', spinner: {}, spinnerTail: {} },
        React.createRef(),
      ),
    );

    expect(result.current.root).not.toHaveProperty('delay');
    expect(result.current.root).not.toHaveProperty('label');
    expect(result.current.root).not.toHaveProperty('labelPosition');
    expect(result.current.root).not.toHaveProperty('spinner');
    expect(result.current.root).not.toHaveProperty('spinnerTail');
  });
});
