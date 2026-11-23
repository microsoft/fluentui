import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { Field } from '@fluentui/react-field';
import { ProgressBar } from './ProgressBar';
import { isConformant } from '../../testing/isConformant';
import { useProgressBarBase_unstable } from './useProgressBar';

describe('ProgressBar', () => {
  isConformant({
    Component: ProgressBar,
    displayName: 'ProgressBar',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            label: 'Test Label',
            description: 'Test Description',
          },
        },
      ],
    },
  });
  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalConsoleError;
  });
  it('has role progressbar', () => {
    const result = render(<ProgressBar />);
    expect(result.getByRole('progressbar')).toBeDefined();
  });
  it('does not add aria attributes for indeterminate', () => {
    const result = render(<ProgressBar />);
    expect(result.getByRole('progressbar').getAttribute('aria-valuenow')).toBeFalsy();
    expect(result.getByRole('progressbar').getAttribute('aria-valuemin')).toBeFalsy();
    expect(result.getByRole('progressbar').getAttribute('aria-valuemax')).toBeFalsy();
  });
  it('adds aria attributes for determinate', () => {
    const result = render(<ProgressBar value={0.52} />);
    expect(result.getByRole('progressbar').getAttribute('aria-valuenow')).toEqual('0.52');
    expect(result.getByRole('progressbar').getAttribute('aria-valuemin')).toEqual('0');
    expect(result.getByRole('progressbar').getAttribute('aria-valuemax')).toEqual('1');
  });
  it('updates the max prop properly', () => {
    const result = render(<ProgressBar value={13} max={42} />);
    expect(result.getByRole('progressbar').getAttribute('aria-valuenow')).toEqual('13');
    expect(result.getByRole('progressbar').getAttribute('aria-valuemin')).toEqual('0');
    expect(result.getByRole('progressbar').getAttribute('aria-valuemax')).toEqual('42');
  });
  it('sets valuemin and valuemax when value is 0', () => {
    const result = render(<ProgressBar value={0} />);
    expect(result.getByRole('progressbar').getAttribute('aria-valuenow')).toEqual('0');
    expect(result.getByRole('progressbar').getAttribute('aria-valuemin')).toEqual('0');
    expect(result.getByRole('progressbar').getAttribute('aria-valuemax')).toEqual('1');
  });
  describe('Max', () => {
    it('sets the proper aria-valuemax when max is negative', () => {
      const max = -1;
      const result = render(<ProgressBar value={-2} max={max} />);
      expect(result.getByRole('progressbar').getAttribute('aria-valuemax')).toEqual('1');
    });
    it('sets the proper aria-valuemax when max is zero', () => {
      const max = 0;
      const result = render(<ProgressBar value={-5} max={max} />);
      expect(result.getByRole('progressbar').getAttribute('aria-valuemax')).toEqual('1');
    });
    it('sets the proper aria-valuemax when max is valid', () => {
      const max = 2;
      const result = render(<ProgressBar value={0} max={max} />);
      expect(result.getByRole('progressbar').getAttribute('aria-valuemax')).toEqual('2');
    });
  });
  describe('Value', () => {
    it('sets the proper aria-valuenow when value is greater than max', () => {
      const value = 23;
      const max = 10;
      const result = render(<ProgressBar value={value} max={max} />);
      expect(result.getByRole('progressbar').getAttribute('aria-valuenow')).toEqual('10');
    });
    it('sets the proper aria-valuenow when value is negative', () => {
      const value = -5;
      const max = 3;
      const result = render(<ProgressBar value={value} max={max} />);
      expect(result.getByRole('progressbar').getAttribute('aria-valuenow')).toEqual('0');
    });
    it('sets the proper aria-valuenow when value is less than or equal to max', () => {
      const value = 5;
      const max = 10;
      const result = render(<ProgressBar value={value} max={max} />);
      expect(result.getByRole('progressbar').getAttribute('aria-valuenow')).toEqual('5');
    });
  });

  it('gets props from a surrounding Field', () => {
    const result = render(
      <Field label="Test label" validationMessage="Test error message">
        <ProgressBar aria-describedby="test-describedby" />
      </Field>,
    );

    const progressbar = result.getByRole('progressbar');
    const label = result.getByText('Test label') as HTMLLabelElement;
    const message = result.getByText('Test error message');

    expect(progressbar.getAttribute('aria-labelledby')).toEqual(label.id);
    expect(progressbar.getAttribute('aria-describedby')).toEqual(message.id + ' test-describedby');
  });
});

describe('ProgressBar DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(<ProgressBar color="success" max={10} shape="square" thickness="large" value={5} />);

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual([
      'aria-valuemax',
      'aria-valuemin',
      'aria-valuenow',
      'class',
      'role',
    ]);
  });
});

describe('useProgressBarBase_unstable base hook', () => {
  it('does not forward component props to the root slot', () => {
    const { result } = renderHook(() => useProgressBarBase_unstable({ bar: {}, max: 10, value: 5 }, React.createRef()));

    expect(result.current.root).not.toHaveProperty('bar');
    expect(result.current.root).not.toHaveProperty('max');
    expect(result.current.root).not.toHaveProperty('value');
  });
});
