import * as React from 'react';
import type { RenderResult } from '@testing-library/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Field } from '@fluentui/react-field';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { Textarea } from './Textarea';
import { isConformant } from '../../testing/isConformant';

function getTextarea(): HTMLTextAreaElement {
  return screen.getByRole('textbox') as HTMLTextAreaElement;
}

describe('Textarea', () => {
  let renderedComponent: RenderResult | undefined;

  afterEach(() => {
    if (renderedComponent) {
      renderedComponent.unmount();
      renderedComponent = undefined;
    }
  });

  isConformant({
    Component: Textarea,
    displayName: 'Textarea',
    primarySlot: 'textarea',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` asserts `textareaClassNames` still holds
    // `fui-Textarea` / `fui-Textarea__<slot>` strings AND that they are rendered. Both are
    // false by design: DECISIONS.md D16.1 removed the BEM statics, D16.5 narrowed the export
    // to `{ root }` and re-pointed it at the group marker. `component-has-group-marker` (now a default test)
    // is its replacement and asserts the contract that actually holds now — including the
    // D15.1 `classList[0]` invariant the static used to satisfy incidentally (D16.2/D16.6).
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

  // TODO create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Textarea />);
    expect(result.container).toMatchSnapshot();
  });

  it('respects value', () => {
    renderedComponent = render(<Textarea value="foo" />);
    expect(getTextarea().value).toEqual('foo');
  });

  it('respects updates to value', () => {
    renderedComponent = render(<Textarea value="foo" />);
    expect(getTextarea().value).toEqual('foo');

    renderedComponent.rerender(<Textarea value="bar" />);
    expect(getTextarea().value).toEqual('bar');
  });

  it('respects updated to value', () => {
    renderedComponent = render(<Textarea defaultValue="foo" />);
    expect(getTextarea().value).toEqual('foo');
  });

  it('ignores updated to defaultValue', () => {
    renderedComponent = render(<Textarea defaultValue="foo" />);
    expect(getTextarea().value).toEqual('foo');

    renderedComponent.rerender(<Textarea defaultValue="bar" />);
    expect(getTextarea().value).toEqual('foo');
  });

  it('prefers value over defaultValue', () => {
    renderedComponent = render(<Textarea value="bar" defaultValue="foo" />);
    expect(getTextarea().value).toEqual('bar');
  });

  it('with value, calls onChange but does not update on text entry', () => {
    const onChange = jest.fn();
    renderedComponent = render(<Textarea value="foo" onChange={onChange} />);
    const textarea = getTextarea();
    fireEvent.change(textarea, { target: { value: 'bar' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'bar' });
    expect(textarea.value).toBe('foo');
  });

  it('with defaultValue, calls onChange and updates value on text entry', () => {
    const onChange = jest.fn();
    renderedComponent = render(<Textarea defaultValue="foo" onChange={onChange} />);
    const textarea = getTextarea();
    fireEvent.change(textarea, { target: { value: 'bar' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'bar' });
    expect(textarea.value).toBe('bar');
  });

  it('does not call onChange when value prop updates', () => {
    const onChange = jest.fn();
    renderedComponent = render(<Textarea value="foo" onChange={onChange} />);
    renderedComponent.rerender(<Textarea value="bar" onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('gets props from a surrounding Field', () => {
    const result = render(
      <Field label="Test label" validationMessage="Test error message" required>
        <Textarea />
      </Field>,
    );

    const textarea = result.getByRole('textbox') as HTMLTextAreaElement;
    const label = result.getByText('Test label') as HTMLLabelElement;
    const message = result.getByText('Test error message');

    expect(textarea.id).toEqual(label.htmlFor);
    expect(textarea.getAttribute('aria-describedby')).toEqual(message.id);
    expect(textarea.getAttribute('aria-invalid')).toEqual('true');
    expect(textarea.required).toBe(true);
  });
});
