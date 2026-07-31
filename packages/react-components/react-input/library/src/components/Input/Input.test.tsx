import * as React from 'react';
import type { RenderResult } from '@testing-library/react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Field } from '@fluentui/react-field';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { Input } from './Input';
import { isConformant } from '../../testing/isConformant';

function getInput(): HTMLInputElement {
  return screen.getByRole('textbox') as HTMLInputElement;
}

describe('Input', () => {
  let renderedComponent: RenderResult | undefined;

  afterEach(() => {
    jest.clearAllMocks();
    if (renderedComponent) {
      renderedComponent.unmount();
      renderedComponent = undefined;
    }
  });

  isConformant({
    Component: Input,
    displayName: 'Input',
    primarySlot: 'input',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` asserts that `inputClassNames` holds
    // `fui-Input` / `fui-Input__<slot>` and that those classes are rendered. Input publishes
    // neither any more: the BEM statics are removed and `inputClassNames` is narrowed to
    // `{ root: 'group/fui-input' }` (DECISIONS.md D16.1/D16.5). The test is disabled per
    // package as each one is swept; it leaves `defaultTests` altogether once every converted
    // package has been (D16.6). `component-has-group-marker` (now a default test) is its replacement — it
    // asserts the marker is stamped AND that it is never `classList[0]` (D16.2).
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onChange'],
      },
    },
  });

  it('renders a default state', () => {
    const result = render(<Input />);
    expect(result.container).toMatchSnapshot();
  });

  it('respects value', () => {
    renderedComponent = render(<Input value="hello" />);
    expect(getInput().value).toEqual('hello');
  });

  it('respects updates to value', () => {
    renderedComponent = render(<Input value="hello" />);
    expect(getInput().value).toEqual('hello');

    renderedComponent.rerender(<Input value="world" />);
    expect(getInput().value).toEqual('world');
  });

  it('respects defaultValue', () => {
    renderedComponent = render(<Input defaultValue="hello" />);
    expect(getInput().value).toEqual('hello');
  });

  it('ignores updates to defaultValue', () => {
    renderedComponent = render(<Input defaultValue="hello" />);
    expect(getInput().value).toEqual('hello');

    renderedComponent.rerender(<Input defaultValue="world" />);
    expect(getInput().value).toEqual('hello');
  });

  it('prefers value over defaultValue', () => {
    renderedComponent = render(<Input value="hello" defaultValue="world" />);
    expect(getInput().value).toEqual('hello');
  });

  it('with value, calls onChange but does not update on text entry', () => {
    const onChange = jest.fn();
    renderedComponent = render(<Input value="hello" onChange={onChange} />);
    const input = getInput();
    fireEvent.change(input, { target: { value: 'world' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'world' });
    expect(input.value).toBe('hello');
  });

  it('with defaultValue, calls onChange and updates value on text entry', () => {
    const onChange = jest.fn();
    renderedComponent = render(<Input defaultValue="hello" onChange={onChange} />);
    const input = getInput();
    fireEvent.change(input, { target: { value: 'world' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'world' });
    expect(input.value).toBe('world');
  });

  it('does not call onChange when value prop updates', () => {
    const onChange = jest.fn();
    renderedComponent = render(<Input value="hello" onChange={onChange} />);
    renderedComponent.rerender(<Input value="world" onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('gets props from a surrounding Field', () => {
    renderedComponent = render(
      <Field label="Test label" validationMessage="Test error message" required>
        <Input />
      </Field>,
    );

    const input = renderedComponent.getByRole('textbox') as HTMLInputElement;
    const label = renderedComponent.getByText('Test label') as HTMLLabelElement;
    const message = renderedComponent.getByText('Test error message');

    expect(input.id).toEqual(label.htmlFor);
    expect(input.getAttribute('aria-describedby')).toEqual(message.id);
    expect(input.getAttribute('aria-invalid')).toEqual('true');
    expect(input.required).toBe(true);
  });

  it('does not emit error when uncontrolled', () => {
    const spy = jest.spyOn(console, 'error');
    renderedComponent = render(<Input />);

    const input = renderedComponent.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'foo' } });
    expect(input.value).toBe('foo');
    expect(spy).not.toHaveBeenCalled();
  });

  it('forwards native input props to the input element', () => {
    renderedComponent = render(<Input autoCorrect="on" minLength={1} maxLength={2} />);

    expect(getInput()).toMatchObject({
      minLength: 1,
      maxLength: 2,
    });

    expect(getInput().getAttribute('autocorrect')).toEqual('on');
  });
});
