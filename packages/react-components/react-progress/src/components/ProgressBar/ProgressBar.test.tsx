import * as React from 'react';
import { render } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';
import { isConformant } from '../../testing/isConformant';

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
});
