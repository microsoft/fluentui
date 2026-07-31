import * as React from 'react';

import { Tooltip } from '@fluentui/react-tooltip';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { useFieldControlProps_unstable } from '../../contexts/useFieldControlProps';
import { isConformant } from '../../testing/isConformant';
import { Field } from './index';

const TestInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  props = useFieldControlProps_unstable(props, { supportsLabelFor: true, supportsRequired: true });
  return <input ref={ref} {...props} />;
});

const TestGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  props = useFieldControlProps_unstable(props);
  return <div role="group" ref={ref} {...props} />;
});

describe('Field', () => {
  isConformant({
    Component: Field,
    displayName: 'Field',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    disabledTests: [
      // Statics removal (DECISIONS.md D16.1 / D16.6). Field no longer renders `fui-Field*` BEM
      // statics, and `fieldClassNames` is now `{ root: <marker> }`, so all three sub-tests of
      // this rule — the export shape, the hard-coded `fui-<Component>__<slot>` format, and the
      // rendered-class assertion — are testing a contract the component is deliberately no
      // longer under. It is replaced by `component-has-group-marker` (now a default test). The
      // `has-static-classnames` testOptions entry that used to render this component with
      // `label` / `hint` / `validationMessage` / `validationState: 'error'` (so the four
      // sub-slot statics appeared in the DOM) went with it: there are none left to find.
      'component-has-static-classnames-object',
    ],
    // `component-has-group-marker` asserts the D16 public contract: exactly one
    // `group/fui-field` marker on the outermost slot, and never at `classList[0]`
    // (DECISIONS.md D15.1 / D16.2).
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('generates an id for the control and uses it as the label.htmlFor', () => {
    const result = render(
      <Field label="Test label">
        <TestInput />
      </Field>,
    );

    const input = result.getByRole('textbox');
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(input.id).toBeTruthy();
    expect(label.htmlFor).toBe(input.id);
    expect(input.getAttribute('aria-labelledby')).toBeFalsy();
  });

  it('does not set aria-labelledby if label.htmlFor matches the control id', () => {
    const result = render(
      <Field label={{ children: 'Test label', htmlFor: 'test-label-for' }}>
        <TestInput id="test-label-for" />
      </Field>,
    );

    const input = result.getByRole('textbox');
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(label.htmlFor).toBe('test-label-for');
    expect(input.id).toBe('test-label-for');
    expect(input.getAttribute('aria-labelledby')).toBeFalsy();
  });

  it('falls back to aria-labelledby if the control has an id that does not match the label.htmlFor', () => {
    const result = render(
      <Field label="Test label">
        <TestInput id="test-id" /> {/* Does not match label's generated htmlFor */}
      </Field>,
    );

    const input = result.getByRole('textbox');
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(label.id).toBeTruthy();
    expect(input.getAttribute('aria-labelledby')).toBe(label.id);
    expect(input.id).toBe('test-id');
  });

  it('sets aria-labelledby on a control that does not support label.htmlFor', () => {
    const result = render(
      <Field label="Test label">
        <TestGroup /> {/* Groups do not support label.htmlFor */}
      </Field>,
    );
    const group = result.getByRole('group');
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(label.id).toBeTruthy();
    expect(group.getAttribute('aria-labelledby')).toBe(label.id);
  });

  it('adds a required asterisk * to the label when required is set', () => {
    const result = render(
      <Field label="Test label" required>
        <TestInput />
      </Field>,
    );

    expect(result.getByText('*')).toBeTruthy();
  });

  it('sets `required` on a control that supports the `required` prop', () => {
    const result = render(
      <Field required>
        <TestInput />
      </Field>,
    );

    const input = result.getByRole('textbox') as HTMLInputElement;

    expect(input.required).toBe(true);
    expect(input.getAttribute('aria-required')).toBeNull();
  });

  it('sets `aria-required` on a control that does not support the `required` prop', () => {
    const result = render(
      <Field required>
        <TestGroup /> {/* Groups do not support the required prop */}
      </Field>,
    );

    const group = result.getByRole('group');

    expect(group.getAttribute('aria-required')).toBe('true');
    expect(group.getAttribute('required')).toBeNull();
  });

  it('sets aria-describedby to the hint', () => {
    const result = render(
      <Field hint="Test hint">
        <TestInput />
      </Field>,
    );
    const input = result.getByRole('textbox');
    const hint = result.getByText('Test hint');

    expect(hint.id).toBeTruthy();
    expect(input.getAttribute('aria-describedby')).toBe(hint.id);
  });

  it('sets aria-describedby to the validationMessage', () => {
    const result = render(
      <Field validationMessage="Test validation message" validationState="warning">
        <TestInput />
      </Field>,
    );
    const input = result.getByRole('textbox');
    const validationMessage = result.getByText('Test validation message');

    expect(validationMessage.id).toBeTruthy();
    expect(input.getAttribute('aria-describedby')).toBe(validationMessage.id);
  });

  it('sets aria-describedby to the validationMessage + hint', () => {
    const result = render(
      <Field hint="Test hint" validationMessage="Test validation message">
        <TestInput />
      </Field>,
    );
    const input = result.getByRole('textbox');
    const hint = result.getByText('Test hint');
    const validationMessage = result.getByText('Test validation message');

    expect(input.getAttribute('aria-describedby')).toBe(validationMessage.id + ' ' + hint.id);
  });

  it('sets aria-describedby to the validationMessage + hint + user aria-describedby', () => {
    const result = render(
      <Field hint="Test hint" validationMessage="Test validation message">
        <TestInput aria-describedby="test-describedby" />
      </Field>,
    );
    const input = result.getByRole('textbox');
    const hint = result.getByText('Test hint');
    const validationMessage = result.getByText('Test validation message');

    expect(input.getAttribute('aria-describedby')).toBe(validationMessage.id + ' ' + hint.id + ' test-describedby');
  });

  it('sets aria-invalid if an error', () => {
    const result = render(
      <Field validationState="error">
        <TestInput />
      </Field>,
    );
    const input = result.getByRole('textbox');

    expect(input.getAttribute('aria-invalid')).toBeTruthy();
  });

  it('does not override user props (other than aria-describedby)', () => {
    const result = render(
      <Field label="test label" validationMessage="test description" hint="test hint" required>
        <TestInput
          id="test-id"
          aria-labelledby="test-labelledby"
          aria-errormessage="test-errormessage"
          aria-invalid={false}
          aria-required={false}
        />
      </Field>,
    );

    const input = result.getByRole('textbox');

    expect(input.id).toBe('test-id');
    expect(input.getAttribute('aria-labelledby')).toBe('test-labelledby');
    expect(input.getAttribute('aria-errormessage')).toBe('test-errormessage');
    expect(input.getAttribute('aria-invalid')).toBe('false');
    expect(input.getAttribute('aria-required')).toBe('false');
    // aria-describedby gets merged with the hint and validationMessage; that is tested above
  });

  it('passes props through other component(s) using context', () => {
    const result = render(
      <Field label="Test label" hint="test hint" required>
        <div>
          <span>...</span>
          <TestInput />
        </div>
      </Field>,
    );

    const input = result.getByRole('textbox');
    const label = result.getByText('Test label') as HTMLLabelElement;
    const hint = result.getByText('test hint');

    expect(label.htmlFor).toBe(input.id);
    expect(input.getAttribute('aria-describedby')).toBe(hint.id);
  });

  it('merges Field describedby with Tooltip describedby', () => {
    const result = render(
      <Field hint="Test hint">
        <Tooltip relationship="description" content="Test tooltip">
          <TestInput />
        </Tooltip>
      </Field>,
    );

    const input = result.getByRole('textbox');
    const hint = result.getByText('Test hint');
    const tooltip = result.getByText('Test tooltip');

    expect(input.getAttribute('aria-describedby')).toBe(`${hint.id} ${tooltip.id}`);
  });

  it.each([
    [undefined, 'alert'], // defaults to error
    ['error', 'alert'],
    ['warning', 'alert'],
    ['success', null],
    ['none', null],
  ] as const)('if validationState is %s, sets role to %s on the validationMessage', (validationState, role) => {
    const result = render(
      <Field validationState={validationState} validationMessage="test validation message">
        <TestInput />
      </Field>,
    );
    const validationMessage = result.getByText('test validation message');

    expect(validationMessage.getAttribute('role')).toBe(role);
  });

  it('passes expected props to child render function', () => {
    const renderFn = jest.fn();
    const result = render(
      <Field label="Test label" hint="Test hint" validationMessage="Test validation message" required>
        {renderFn}
      </Field>,
    );

    const label = result.getByText('Test label') as HTMLLabelElement;
    const hint = result.getByText('Test hint');
    const validationMessage = result.getByText('Test validation message');

    expect(renderFn).toHaveBeenCalledWith({
      id: label.htmlFor,
      'aria-labelledby': label.id,
      'aria-describedby': validationMessage.id + ' ' + hint.id,
      'aria-invalid': true,
      'aria-required': true,
    });
  });
});
