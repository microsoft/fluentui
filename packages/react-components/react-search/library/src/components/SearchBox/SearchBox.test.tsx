import * as React from 'react';
import userEvent from '@testing-library/user-event';
import type { RenderResult } from '@testing-library/react';
import { render, fireEvent, screen } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { SearchBox } from './SearchBox';
import { isConformant } from '../../testing/isConformant';
import { resetIdsForTests } from '@fluentui/react-utilities';

function getSearchBox(): HTMLInputElement {
  return screen.getByRole('searchbox') as HTMLInputElement;
}

describe('SearchBox', () => {
  beforeEach(() => {
    resetIdsForTests();
  });

  let renderedComponent: RenderResult | undefined;

  afterEach(() => {
    if (renderedComponent) {
      renderedComponent.unmount();
      renderedComponent = undefined;
    }
  });

  isConformant({
    Component: SearchBox,
    displayName: 'SearchBox',
    primarySlot: 'input',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts `searchBoxClassNames` still holds
    // `fui-SearchBox` / `fui-SearchBox__<slot>` strings AND that they are rendered. Both are
    // false by design: DECISIONS.md D16.1 removed the BEM statics, D16.5 narrowed the export
    // to `{ root }` and re-pointed it at the group marker. Its `has-static-classnames`
    // testOptions entry — which existed only to name the three sub-slot statics that the
    // default render does not produce — goes with it.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
    testOptions: {
      // a SearchBox IS an Input — `useInputStyles_unstable` stamps its marker on this same element, so this root
      // legitimately carries every marker below (DECISIONS.md D16.3). Declaring the whole set
      // keeps `component-has-group-marker` running: it is an exact set comparison, so an
      // undeclared marker still fails, and its `classList[0]` half — the D16.2 invariant that
      // nwsapi's jsdom `:scope` polyfill depends on — is asserted here rather than locally.
      'has-group-marker': {
        markers: ['group/fui-input', 'group/fui-search-box'],
      },
      'consistent-callback-args': {
        legacyCallbacks: ['onChange'],
      },
    },
  });

  it('renders a default state', () => {
    const result = render(<SearchBox />);
    expect(result.container).toMatchSnapshot();
  });

  /**
   * The `classList[0]` half of `component-has-group-marker`, asserted locally.
   *
   * Belt-and-braces alongside the shared `component-has-group-marker` default test, which
   * SearchBox takes by declaring its marker SET (`testOptions['has-group-marker'].markers`,
   * DECISIONS.md D16.3) because this root legitimately carries two — `group/fui-input` (a SearchBox IS an Input; `useInputStyles_unstable`
   * stamps it on this same element) and `group/fui-search-box`, which narrows to the subtype.
   *
   * The SECOND assertion — the D15.1 / D16.2 invariant that a marker is never `classList[0]`,
   * because nwsapi's jsdom `:scope` polyfill builds its anchor from
   * `escape(element.classList[0])` and the `/` survives that escaping into an invalid
   * selector — still applies and is not optional. It holds because `useInputStyles_unstable`
   * runs LAST and prepends Input's own composition, which leads with an unconditional module
   * class; this test exists so a change on either side of that delegation cannot break it
   * silently.
   */
  it('never emits a group marker as classList[0]', () => {
    const { container } = render(<SearchBox />);
    const root = container.firstElementChild as HTMLElement;

    expect(root.classList.length).toBeGreaterThan(0);
    expect(root.classList[0]).not.toMatch(/^(group|peer)\//);
  });

  // Tests from Input, added here since they were reimplemented for SearchBox
  it('respects value', () => {
    renderedComponent = render(<SearchBox value="hello" />);
    expect(getSearchBox().value).toEqual('hello');
  });

  it('respects updates to value', () => {
    renderedComponent = render(<SearchBox value="hello" />);
    expect(getSearchBox().value).toEqual('hello');

    renderedComponent.rerender(<SearchBox value="world" />);
    expect(getSearchBox().value).toEqual('world');
  });

  it('respects defaultValue', () => {
    renderedComponent = render(<SearchBox defaultValue="hello" />);
    expect(getSearchBox().value).toEqual('hello');
  });

  it('ignores updates to defaultValue', () => {
    renderedComponent = render(<SearchBox defaultValue="hello" />);
    expect(getSearchBox().value).toEqual('hello');

    renderedComponent.rerender(<SearchBox defaultValue="world" />);
    expect(getSearchBox().value).toEqual('hello');
  });

  it('prefers value over defaultValue', () => {
    renderedComponent = render(<SearchBox value="hello" defaultValue="world" />);
    expect(getSearchBox().value).toEqual('hello');
  });

  it('with value, calls onChange but does not update on text entry', () => {
    const onChange = jest.fn();
    renderedComponent = render(<SearchBox value="hello" onChange={onChange} />);
    const searchBox = getSearchBox();
    fireEvent.change(searchBox, { target: { value: 'world' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'world' });
    expect(searchBox.value).toBe('hello');
  });

  it('with defaultValue, calls onChange and updates value on text entry', () => {
    const onChange = jest.fn();
    renderedComponent = render(<SearchBox defaultValue="hello" onChange={onChange} />);
    const searchBox = getSearchBox();
    fireEvent.change(searchBox, { target: { value: 'world' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'world' });
    expect(searchBox.value).toBe('world');
  });

  it('does not call onChange when value prop updates', () => {
    const onChange = jest.fn();
    renderedComponent = render(<SearchBox value="hello" onChange={onChange} />);
    renderedComponent.rerender(<SearchBox value="world" onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('clears value when dismiss is clicked', () => {
    const onClick = jest.fn();
    renderedComponent = render(<SearchBox defaultValue="hello" dismiss={{ onClick }} />);

    userEvent.click(renderedComponent.getByRole('button'));
    expect(getSearchBox().value).toBe('');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('invokes `onChange` when the dismiss button is clicked', () => {
    const onChange = jest.fn();
    renderedComponent = render(<SearchBox defaultValue="hello" onChange={onChange} />);

    userEvent.click(renderedComponent.getByRole('button'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ value: '' }));
  });
});
