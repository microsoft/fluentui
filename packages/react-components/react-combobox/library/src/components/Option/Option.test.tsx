import * as React from 'react';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { fireEvent, render } from '@testing-library/react';
import { ListboxContext } from '../../contexts/ListboxContext';
import { Option } from './Option';
import type { OptionProps } from './Option.types';
import { isConformant } from '../../testing/isConformant';
import { optionClassNames } from './useOptionStyles.styles';
import type { ActiveDescendantImperativeRef } from '@fluentui/react-aria';
import { ActiveDescendantContextProvider } from '@fluentui/react-aria';

describe('Option', () => {
  isConformant<OptionProps>({
    Component: Option,
    displayName: 'Option',
  });

  afterEach(() => {
    resetIdsForTests();
  });

  const defaultContextValues = {
    activeOption: undefined,
    focusVisible: false,
    getOptionById() {
      return undefined;
    },
    getOptionsMatchingValue() {
      return [];
    },
    multiselect: false,
    registerOption() {
      return () => undefined;
    },
    selectedOptions: [],
    selectOption() {
      // noop
    },
    setActiveOption() {
      // noop
    },
    onOptionClick() {
      // noop
    },
    onActiveDescendantChange() {
      // noop
    },
  };

  it('renders a default single-select state', () => {
    const result = render(<Option>Default Option</Option>);
    expect(result.container).toMatchSnapshot();
  });

  it('renders child content', () => {
    const result = render(
      <Option text="Default">
        <b>Text content</b>
      </Option>,
    );
    expect(result.getByText('Text content').tagName).toBe('B');
    expect(result.queryByText('Default')).toBeNull();
  });

  it('renders a default multi-select state', () => {
    const result = render(
      <ListboxContext.Provider value={{ ...defaultContextValues, multiselect: true }}>
        <Option>Default Option</Option>
      </ListboxContext.Provider>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('renders a selected multi-select state', () => {
    const result = render(
      <ListboxContext.Provider value={{ ...defaultContextValues, multiselect: true, selectedOptions: ['default'] }}>
        <Option value="default">Default Option</Option>
      </ListboxContext.Provider>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('sets aria-selected based on value', () => {
    const { getByText } = render(
      <ListboxContext.Provider value={{ ...defaultContextValues, selectedOptions: ['selected'] }}>
        <Option value="selected">Option 1</Option>
        <Option value="not-selected">Option 2</Option>
      </ListboxContext.Provider>,
    );

    expect(getByText('Option 1').getAttribute('aria-selected')).toEqual('true');
    expect(getByText('Option 2').getAttribute('aria-selected')).toEqual('false');
  });

  it('sets aria-selected based on text', () => {
    const { getByText } = render(
      <ListboxContext.Provider value={{ ...defaultContextValues, selectedOptions: ['Option 1'] }}>
        <Option text="Option 1">one</Option>
        <Option text="Option 2">two</Option>
      </ListboxContext.Provider>,
    );

    expect(getByText('one').getAttribute('aria-selected')).toEqual('true');
    expect(getByText('two').getAttribute('aria-selected')).toEqual('false');
  });

  it('sets aria-selected based on children', () => {
    const { getByText } = render(
      <ListboxContext.Provider value={{ ...defaultContextValues, selectedOptions: ['Option 1'] }}>
        <Option>Option 1</Option>
        <Option>Option 2</Option>
      </ListboxContext.Provider>,
    );

    expect(getByText('Option 1').getAttribute('aria-selected')).toEqual('true');
    expect(getByText('Option 2').getAttribute('aria-selected')).toEqual('false');
  });

  it('ignores text if value is set', () => {
    const { getByText } = render(
      <ListboxContext.Provider value={{ ...defaultContextValues, selectedOptions: ['Option 1'] }}>
        <Option value="not-selected" text="Option 1">
          one
        </Option>
      </ListboxContext.Provider>,
    );

    expect(getByText('one').getAttribute('aria-selected')).toEqual('false');
  });

  it('handles an empty string as a value', () => {
    const { getByText } = render(
      <ListboxContext.Provider value={{ ...defaultContextValues, selectedOptions: [''] }}>
        <Option value="" text="Option 1">
          one
        </Option>
      </ListboxContext.Provider>,
    );

    expect(getByText('one').getAttribute('aria-selected')).toEqual('true');
  });

  it('calls console.warn if the text prop is absent and the children is not a string', () => {
    const warnFn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    render(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Option>
        <b>Some text content</b>
      </Option>,
    );

    expect(warnFn).toHaveBeenCalledTimes(1);
  });

  it('calls onClick', () => {
    const onOptionClick = jest.fn();
    const { getByRole } = render(<Option onClick={onOptionClick}>Option 1</Option>);

    fireEvent.click(getByRole('option'));

    expect(onOptionClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick if disabled', () => {
    const onOptionClick = jest.fn();
    const { getByRole } = render(
      <Option disabled onClick={onOptionClick}>
        Option 1
      </Option>,
    );

    fireEvent.click(getByRole('option'));

    expect(onOptionClick).not.toHaveBeenCalled();
  });

  it('registers with default values', () => {
    const registerOption = jest.fn();
    const { getByRole } = render(
      <ListboxContext.Provider value={{ ...defaultContextValues, registerOption }}>
        <Option>Option 1</Option>
      </ListboxContext.Provider>,
    );

    expect(registerOption).toHaveBeenCalledTimes(1);

    const registerProps = registerOption.mock.calls[0][0];
    const registerRef = registerOption.mock.calls[0][1];

    expect(typeof registerProps?.id).toEqual('string');
    expect(registerProps?.disabled).toBeFalsy();
    expect(registerProps?.value).toEqual('Option 1');
    expect(registerProps?.text).toEqual('Option 1');
    expect(registerRef).toEqual(getByRole('option'));
  });

  it('registers with values defined in props', () => {
    const registerOption = jest.fn();
    render(
      <ListboxContext.Provider value={{ ...defaultContextValues, registerOption }}>
        <Option id="op1" disabled value="foo" text="Option 1">
          text content
        </Option>
      </ListboxContext.Provider>,
    );

    const registerProps = registerOption.mock.calls[0][0];

    expect(registerProps?.id).toEqual('op1');
    expect(registerProps?.disabled).toBeTruthy();
    expect(registerProps?.value).toEqual('foo');
    expect(registerProps?.text).toEqual('Option 1');
  });

  it('re-registers when the value changes', () => {
    const registerOption = jest.fn();
    const result = render(
      <ListboxContext.Provider value={{ ...defaultContextValues, registerOption }}>
        <Option value="foo" text="Option 1" />
      </ListboxContext.Provider>,
    );
    result.rerender(
      <ListboxContext.Provider value={{ ...defaultContextValues, registerOption }}>
        <Option value="bar" text="Option 1" />
      </ListboxContext.Provider>,
    );

    expect(registerOption).toHaveBeenCalledTimes(2);
  });

  it('focuses the option and calls selectOption on click', () => {
    const selectOption = jest.fn();
    const focus = jest.fn();
    const { getByRole } = render(
      <ActiveDescendantContextProvider value={{ controller: { focus } as unknown as ActiveDescendantImperativeRef }}>
        <ListboxContext.Provider value={{ ...defaultContextValues, selectOption }}>
          <Option id="optionId" value="foo">
            Option 1
          </Option>
        </ListboxContext.Provider>
      </ActiveDescendantContextProvider>,
    );

    fireEvent.click(getByRole('option'));
    const optionData = { id: 'optionId', disabled: undefined, text: 'Option 1', value: 'foo' };

    expect(selectOption).toHaveBeenCalledTimes(1);
    expect(selectOption).toHaveBeenCalledWith(expect.anything(), optionData);
    expect(focus).toHaveBeenCalledTimes(1);
    expect(focus).toHaveBeenCalledWith('optionId');
  });

  describe('checkIcon slot', () => {
    it('renders the `checkIcon` slot by default', () => {
      render(
        <Option id="optionId" value="foo">
          Option 1
        </Option>,
      );

      expect(document.querySelector(`.${optionClassNames.checkIcon}`)).toBeTruthy();
    });

    it('should not render the `checkIcon` slot when passed `null`', () => {
      render(
        <Option id="optionId" value="foo" checkIcon={null}>
          Option 1
        </Option>,
      );

      expect(document.querySelector(`.${optionClassNames.checkIcon}`)).toBeFalsy();
    });
  });
});
