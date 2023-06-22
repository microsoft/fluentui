import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { render, RenderResult, fireEvent, screen } from '@testing-library/react';
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

  it('hides contentAfter and dismiss at rest, shows contentAfter and dismiss when focused', () => {
    const { container } = render(
      <>
        <SearchBox contentAfter={{ 'data-testid': 'contentAfter' } as React.HTMLAttributes<HTMLSpanElement>} />
        <div data-testid="outside">outside</div>
      </>,
    );

    const searchBox = getSearchBox();

    // While unfocused
    expect(document.activeElement).not.toEqual(searchBox);
    expect(container.querySelector(searchBoxClassNames.dismiss)).toBeNull;
    expect(container.querySelector(searchBoxClassNames.contentAfter)).toBeNull;
    expect(container).toMatchSnapshot();

    userEvent.tab();

    // While focused
    expect(document.activeElement).toEqual(searchBox);
    expect(container.querySelector(searchBoxClassNames.dismiss)).not.toBeNull;
    expect(container.querySelector(searchBoxClassNames.contentAfter)).not.toBeNull;
    expect(container).toMatchSnapshot();
  });

  it('shows contentBefore both in and out of focus', () => {
    const { getByTestId } = render(
      <SearchBox contentBefore={{ 'data-testid': 'contentBefore' } as React.HTMLAttributes<HTMLSpanElement>} />,
    );

    expect(getByTestId('contentBefore')).not.toBeNull;

    userEvent.click(getSearchBox());
    expect(getByTestId('contentBefore')).not.toBeNull;
  });

  it('clears value when dismiss is clicked', () => {
    const { getByTestId } = render(
      <SearchBox
        defaultValue="hello"
        dismiss={{ 'data-testid': 'dismiss' } as React.HTMLAttributes<HTMLSpanElement>}
      />,
    );

    userEvent.click(getByTestId('dismiss'));
    expect(getSearchBox().value).toBe('');
  });
});
