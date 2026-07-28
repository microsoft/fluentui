import * as React from 'react';
import userEvent from '@testing-library/user-event';
import type { RenderResult } from '@testing-library/react';
import { render, fireEvent, screen } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { SearchBox } from './SearchBox';
import { isConformant } from '../../testing/isConformant';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { searchBoxClassNames } from './useSearchBoxStyles.styles';

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
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    disabledTests: ['make-styles-overrides-win'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            contentBefore: 'Test ContentBefore',
            contentAfter: 'Test ContentAfter',
            dismiss: 'Test Dismiss',
          },
          expectedClassNames: {
            root: searchBoxClassNames.root,
            contentAfter: searchBoxClassNames.contentAfter,
            dismiss: searchBoxClassNames.dismiss,
          },
        },
      ],
      'consistent-callback-args': {
        legacyCallbacks: ['onChange'],
      },
    },
  });

  it('renders a default state', () => {
    const result = render(<SearchBox />);
    expect(result.container).toMatchSnapshot();
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
