import * as React from 'react';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { fireEvent, render } from '@testing-library/react';
import { ListboxContext } from '../../contexts/ListboxContext';
import { Option } from './Option';
import { isConformant } from '../../common/isConformant';

describe('Option', () => {
  isConformant({
    Component: Option,
    displayName: 'Option',
  });

  afterEach(() => {
    resetIdsForTests();
  });

  const defaultContextValues = {
    activeOption: undefined,
    multiselect: false,
    onOptionClick() {
      // noop
    },
    registerOption() {
      return () => undefined;
    },
    selectedOptions: [],
  };

  it('renders a default single-select state', () => {
    const result = render(<Option>Default Option</Option>);
    expect(result.container).toMatchSnapshot();
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
        <Option value="not-selected">Option 1</Option>
      </ListboxContext.Provider>,
    );

    expect(getByText('Option 1').getAttribute('aria-selected')).toEqual('false');
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
    expect(registerRef).toEqual(getByRole('option'));
  });

  it('registers with values defined in props', () => {
    const registerOption = jest.fn();
    render(
      <ListboxContext.Provider value={{ ...defaultContextValues, registerOption }}>
        <Option id="op1" disabled value="foo">
          Option 1
        </Option>
      </ListboxContext.Provider>,
    );

    const registerProps = registerOption.mock.calls[0][0];

    expect(registerProps?.id).toEqual('op1');
    expect(registerProps?.disabled).toBeTruthy();
    expect(registerProps?.value).toEqual('foo');
  });

  it('re-registers when the value changes', () => {
    const registerOption = jest.fn();
    const result = render(
      <ListboxContext.Provider value={{ ...defaultContextValues, registerOption }}>
        <Option value="foo">Option 1</Option>
      </ListboxContext.Provider>,
    );
    result.rerender(
      <ListboxContext.Provider value={{ ...defaultContextValues, registerOption }}>
        <Option value="bar">Option 1</Option>
      </ListboxContext.Provider>,
    );

    expect(registerOption).toHaveBeenCalledTimes(2);
  });
});
