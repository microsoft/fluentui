import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field } from '@fluentui/react-field';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { Switch } from './Switch';
import type { SwitchOnChangeData } from './Switch.types';

describe('Switch', () => {
  isConformant({
    Component: Switch,
    displayName: 'Switch',
    primarySlot: 'input',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` asserts that `switchClassNames` holds
    // `fui-Switch` / `fui-Switch__<slot>` and that those classes are rendered. Switch
    // publishes neither any more: the BEM statics are removed and `switchClassNames` is
    // narrowed to `{ root: 'group/fui-switch' }` (DECISIONS.md D16.1/D16.5). The test is
    // disabled per package as each one is swept; it leaves `defaultTests` altogether once
    // every converted package has been (D16.6). `component-has-group-marker` (now a default test) is its
    // replacement — it asserts the marker is stamped AND that it is never `classList[0]`
    // (D16.2).
    disabledTests: ['make-styles-overrides-win', 'component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onChange'],
      },
    },
  });

  describe('on component render', () => {
    it('renders a default state correctly', () => {
      const { getByRole } = render(<Switch />);
      const input = getByRole('switch');

      expect(input.tagName).toEqual('INPUT');
      expect(input.getAttribute('type')).toEqual('checkbox');
    });

    it('respects id prop', () => {
      const id = 'switch';
      const { getByRole } = render(<Switch id={id} />);
      const input = getByRole('switch');

      expect(input.id).toEqual(id);
    });

    it('forwards ref to the input element', () => {
      const switchRef = React.createRef<HTMLInputElement>();
      const { getByRole } = render(<Switch ref={switchRef} />);
      const input = getByRole('switch');

      expect(switchRef.current).toEqual(input);
    });

    it('defaults to unchecked', () => {
      const { getByRole } = render(<Switch />);
      const input = getByRole('switch') as HTMLInputElement;

      expect(input.checked).toBe(false);
    });

    it('respects defaultChecked prop', () => {
      const { getByRole } = render(<Switch defaultChecked />);
      const input = getByRole('switch') as HTMLInputElement;

      expect(input.checked).toBe(true);
    });

    it('respects checked prop', () => {
      const { getByRole } = render(<Switch checked />);
      const input = getByRole('switch') as HTMLInputElement;

      expect(input.checked).toBe(true);
    });
  });

  describe('on state changes', () => {
    it('ignores defaultChecked updates', () => {
      const { getByRole, rerender } = render(<Switch defaultChecked />);
      const input = getByRole('switch') as HTMLInputElement;

      expect(input.checked).toBe(true);
      rerender(<Switch defaultChecked={false} />);
      expect(input.checked).toBe(true);
    });

    it('triggers a change in the checked state if it is uncontrolled', () => {
      const { getAllByRole } = render(
        <>
          <Switch defaultChecked={false} />
          <Switch defaultChecked={true} />
        </>,
      );
      const [initiallyUnchecked, initiallyChecked] = getAllByRole('switch') as HTMLInputElement[];

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
          <Switch checked={false} />
          <Switch checked={true} />
        </>,
      );
      const [unchecked, checked] = getAllByRole('switch') as HTMLInputElement[];

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
          <Switch defaultChecked={false} disabled />
          <Switch defaultChecked={true} disabled />
        </>,
      );
      const [unchecked, checked] = getAllByRole('switch') as HTMLInputElement[];

      expect(unchecked.checked).toBe(false);
      userEvent.click(unchecked);
      expect(unchecked.checked).toBe(false);

      expect(checked.checked).toBe(true);
      userEvent.click(checked);
      expect(checked.checked).toBe(true);
    });

    it('does not trigger a change in the checked state if it is disabledFocusable', () => {
      const { getAllByRole } = render(
        <>
          <Switch defaultChecked={false} disabledFocusable />
          <Switch defaultChecked={true} disabledFocusable />
        </>,
      );
      const [unchecked, checked] = getAllByRole('switch') as HTMLInputElement[];

      expect(unchecked.checked).toBe(false);
      userEvent.click(unchecked);
      expect(unchecked.checked).toBe(false);

      expect(checked.checked).toBe(true);
      userEvent.click(checked);
      expect(checked.checked).toBe(true);
    });

    it('can be focused when disabledFocusable has been passed', () => {
      const { getByRole } = render(<Switch disabledFocusable />);
      const input = getByRole('switch');

      expect(document.activeElement).not.toEqual(input);
      userEvent.tab();
      expect(document.activeElement).toEqual(input);
    });

    it('calls onChange with the correct value', () => {
      const onChange = jest.fn<void, [React.ChangeEvent<HTMLInputElement>, SwitchOnChangeData]>();
      const { getByRole } = render(<Switch onChange={onChange} />);
      const input = getByRole('switch');

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
        <Switch />
      </Field>,
    );

    const input = result.getByRole('switch') as HTMLInputElement;
    const label = result.getByText('Test label') as HTMLLabelElement;
    const message = result.getByText('Test error message');

    expect(input.id).toEqual(label.htmlFor);
    expect(input.getAttribute('aria-describedby')).toEqual(message.id);
    expect(input.getAttribute('aria-invalid')).toEqual('true');
    expect(input.required).toBe(true);
  });
});
