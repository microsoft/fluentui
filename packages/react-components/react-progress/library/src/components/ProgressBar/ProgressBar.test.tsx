import * as React from 'react';
import { render } from '@testing-library/react';
import { Field } from '@fluentui/react-field';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { ProgressBar } from './ProgressBar';
import { isConformant } from '../../testing/isConformant';

describe('ProgressBar', () => {
  isConformant({
    Component: ProgressBar,
    displayName: 'ProgressBar',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts `progressBarClassNames` still holds
    // `fui-ProgressBar` / `fui-ProgressBar__<slot>` strings AND that they are rendered. Both
    // are false by design: DECISIONS.md D16.1 removed the BEM statics, D16.5 narrowed the
    // export to `{ root }` and re-pointed it at the group marker.
    // `component-has-group-marker` (now a default test) is its replacement and asserts the contract that
    // actually holds now — including the D15.1 `classList[0]` invariant the static used to
    // satisfy incidentally (D16.2/D16.6). Its `has-static-classnames` testOptions entry
    // (which rendered a label/description so the sub-slot statics could be found) goes with it.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
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
