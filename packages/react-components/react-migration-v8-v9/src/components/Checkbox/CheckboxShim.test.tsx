import * as React from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckboxShim } from './CheckboxShim';

const TEST_TITLE = 'checkboxshim-test-title';

describe('CheckboxShim', () => {
  describe('on component render', () => {
    it('renders a default state correctly', () => {
      const { getByTitle } = render(<CheckboxShim title={TEST_TITLE} />);
      const input = getByTitle(TEST_TITLE);

      expect(input.tagName).toEqual('INPUT');
      expect(input.getAttribute('type')).toEqual('checkbox');
    });

    it('respects id prop', () => {
      const title = 'checkboxshim-test-title';
      const id = 'checkboxshim-test-newid';
      const { getByTitle } = render(<CheckboxShim id={id} title={TEST_TITLE} />);
      const input = getByTitle(title);

      expect(input.id).toEqual(id);
    });

    it('forwards ref to the input element', () => {
      const checkboxRef = React.createRef<HTMLInputElement>();
      const { getByTitle } = render(<CheckboxShim ref={checkboxRef} title={TEST_TITLE} />);
      const input = getByTitle(TEST_TITLE);

      expect(checkboxRef.current).toEqual(input);
    });

    it('defaults to unchecked', () => {
      const { getByTitle } = render(<CheckboxShim title={TEST_TITLE} />);
      const input = getByTitle(TEST_TITLE) as HTMLInputElement;

      expect(input.checked).toBe(false);
    });

    it('respects defaultChecked prop', () => {
      const { getByTitle } = render(<CheckboxShim defaultChecked title={TEST_TITLE} />);
      const input = getByTitle(TEST_TITLE) as HTMLInputElement;

      expect(input.checked).toBe(true);
    });

    it('respects checked prop', () => {
      const { getByTitle } = render(<CheckboxShim checked title={TEST_TITLE} />);
      const input = getByTitle(TEST_TITLE) as HTMLInputElement;

      expect(input.checked).toBe(true);
    });
  });

  describe('on state changes', () => {
    it('ignores defaultChecked updates', () => {
      const { getByTitle, rerender } = render(<CheckboxShim defaultChecked title={TEST_TITLE} />);
      const input = getByTitle(TEST_TITLE) as HTMLInputElement;

      expect(input.checked).toBe(true);
      rerender(<CheckboxShim defaultChecked={false} />);
      expect(input.checked).toBe(true);
    });

    it('triggers a change in the checked state if it is uncontrolled', () => {
      const { getAllByTitle } = render(
        <>
          <CheckboxShim defaultChecked={false} title={TEST_TITLE} />
          <CheckboxShim defaultChecked={true} title={TEST_TITLE} />
        </>,
      );
      const [initiallyUnchecked, initiallyChecked] = getAllByTitle(TEST_TITLE) as HTMLInputElement[];

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
      const { getAllByTitle } = render(
        <>
          <CheckboxShim checked={false} title={TEST_TITLE} />
          <CheckboxShim checked={true} title={TEST_TITLE} />
        </>,
      );
      const [unchecked, checked] = getAllByTitle(TEST_TITLE) as HTMLInputElement[];

      expect(unchecked.checked).toBe(false);
      userEvent.click(unchecked);
      expect(unchecked.checked).toBe(false);

      expect(checked.checked).toBe(true);
      userEvent.click(checked);
      expect(checked.checked).toBe(true);
    });

    it('does not trigger a change in the checked state if it is disabled', () => {
      const { getAllByTitle } = render(
        <>
          <CheckboxShim defaultChecked={false} disabled title={TEST_TITLE} />
          <CheckboxShim defaultChecked={true} disabled title={TEST_TITLE} />
        </>,
      );
      const [unchecked, checked] = getAllByTitle(TEST_TITLE) as HTMLInputElement[];

      expect(unchecked.checked).toBe(false);
      userEvent.click(unchecked);
      expect(unchecked.checked).toBe(false);

      expect(checked.checked).toBe(true);
      userEvent.click(checked);
      expect(checked.checked).toBe(true);
    });

    it('calls onChange with the correct value', () => {
      const onChange = jest.fn<void, [ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean]>();
      const { getByTitle } = render(<CheckboxShim onChange={onChange} title={TEST_TITLE} />);
      const input = getByTitle(TEST_TITLE) as HTMLInputElement;

      expect(onChange).not.toHaveBeenCalled();

      userEvent.click(input);
      userEvent.click(input);
      userEvent.click(input);

      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange.mock.calls[0][1]).toBe(true);
      expect(onChange.mock.calls[1][1]).toBe(false);
      expect(onChange.mock.calls[2][1]).toBe(true);
    });
  });
});
