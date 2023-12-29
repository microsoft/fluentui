import * as React from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field } from '@fluentui/react-field';
import { isConformant } from '../../testing/isConformant';
import { CheckboxShim } from './CheckboxShim';

const TEST_ID = 'checkboxshim-test-id';

describe('CheckboxShim', () => {
  isConformant({
    Component: CheckboxShim,
    displayName: 'CheckboxShim',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            id: TEST_ID,
          },
        },
      ],
    },
  });

  describe('on component render', () => {
    it('renders a default state correctly', () => {
      const { getByTestId } = render(<CheckboxShim />);
      const input = getByTestId(TEST_ID);

      expect(input.tagName).toEqual('INPUT');
      expect(input.getAttribute('type')).toEqual('checkbox');
    });

    it('respects id prop', () => {
      const id = 'switch';
      const { getByTestId } = render(<CheckboxShim id={id} />);
      const input = getByTestId(TEST_ID);

      expect(input.id).toEqual(id);
    });

    it('forwards ref to the input element', () => {
      const switchRef = React.createRef<HTMLInputElement>();
      const { getByTestId } = render(<CheckboxShim ref={switchRef} />);
      const input = getByTestId(TEST_ID);

      expect(switchRef.current).toEqual(input);
    });

    it('defaults to unchecked', () => {
      const { getByTestId } = render(<CheckboxShim />);
      const input = getByTestId(TEST_ID) as HTMLInputElement;

      expect(input.checked).toBe(false);
    });

    it('respects defaultChecked prop', () => {
      const { getByTestId } = render(<CheckboxShim defaultChecked />);
      const input = getByTestId(TEST_ID) as HTMLInputElement;

      expect(input.checked).toBe(true);
    });

    it('respects checked prop', () => {
      const { getByTestId } = render(<CheckboxShim checked />);
      const input = getByTestId(TEST_ID) as HTMLInputElement;

      expect(input.checked).toBe(true);
    });
  });

  describe('on state changes', () => {
    it('ignores defaultChecked updates', () => {
      const { getByTestId, rerender } = render(<CheckboxShim defaultChecked />);
      const input = getByTestId(TEST_ID) as HTMLInputElement;

      expect(input.checked).toBe(true);
      rerender(<CheckboxShim defaultChecked={false} />);
      expect(input.checked).toBe(true);
    });

    it('triggers a change in the checked state if it is uncontrolled', () => {
      const { getAllByRole } = render(
        <>
          <CheckboxShim defaultChecked={false} />
          <CheckboxShim defaultChecked={true} />
        </>,
      );
      const [initiallyUnchecked, initiallyChecked] = getAllByRole(TEST_ID) as HTMLInputElement[];

      expect(initiallyUnchecked.checked).toBe(false);
      userEvent.click(initiallyUnchecked);
      expect(initiallyUnchecked.checked).toBe(true);
      userEvent.click(initiallyUnchecked);
      expect(initiallyUnchecked.checked).toBe(false);

      expect(initiallyChecked.checked).toBe(true);
      userEvent.click(initiallyChecked);
      expect(initiallyChecked.checked).toBe(false);
      userEvent.click(initiallyChecked);
      expect(initiallyChecked.checked).toBe(true);
    });

    it('does not trigger a change in the checked state if it is controlled', () => {
      const { getAllByRole } = render(
        <>
          <CheckboxShim checked={false} />
          <CheckboxShim checked={true} />
        </>,
      );
      const [unchecked, checked] = getAllByRole(TEST_ID) as HTMLInputElement[];

      expect(unchecked.checked).toBe(false);
      userEvent.click(unchecked);
      expect(unchecked.checked).toBe(false);

      expect(checked.checked).toBe(true);
      userEvent.click(checked);
      expect(checked.checked).toBe(true);
    });

    it('does not trigger a change in the checked state if it is disabled', () => {
      const { getAllByRole } = render(
        <>
          <CheckboxShim defaultChecked={false} disabled />
          <CheckboxShim defaultChecked={true} disabled />
        </>,
      );
      const [unchecked, checked] = getAllByRole(TEST_ID) as HTMLInputElement[];

      expect(unchecked.checked).toBe(false);
      userEvent.click(unchecked);
      expect(unchecked.checked).toBe(false);

      expect(checked.checked).toBe(true);
      userEvent.click(checked);
      expect(checked.checked).toBe(true);
    });

    it('calls onChange with the correct value', () => {
      const onChange = jest.fn<void, [React.ChangeEvent<HTMLInputElement>, CheckboxShimOnChangeData]>();
      const { getByTestId } = render(<CheckboxShim onChange={onChange} />);
      const input = getByTestId(TEST_ID) as HTMLInputElement;

      expect(onChange).not.toHaveBeenCalled();

      userEvent.click(input);
      userEvent.click(input);
      userEvent.click(input);

      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange.mock.calls[0][1]).toEqual({ checked: true });
      expect(onChange.mock.calls[1][1]).toEqual({ checked: false });
      expect(onChange.mock.calls[2][1]).toEqual({ checked: true });
    });
  });

  it('gets props from a surrounding Field', () => {
    const result = render(
      <Field label="Test label" validationMessage="Test error message" required>
        <CheckboxShim />
      </Field>,
    );

    const input = result.getByTestId(TEST_ID) as HTMLInputElement;
    const label = result.getByText('Test label') as HTMLLabelElement;
    const message = result.getByText('Test error message');

    expect(input.id).toEqual(label.htmlFor);
    expect(input.getAttribute('aria-describedby')).toEqual(message.id);
    expect(input.getAttribute('aria-invalid')).toEqual('true');
    expect(input.required).toBe(true);
  });
});
