import * as React from 'react';
import { create } from '@fluentui/test-utilities';
import { mount, ReactWrapper } from 'enzyme';
import { SearchBox } from './SearchBox';
import { KeyCodes, resetIds } from '../../Utilities';
import { isConformant } from '../../common/isConformant';
import type { ReactTestRenderer } from 'react-test-renderer';
import type { ISearchBoxProps } from './SearchBox.types';

describe('SearchBox', () => {
  let component: ReactTestRenderer | undefined;
  let wrapper: ReactWrapper<ISearchBoxProps> | undefined;

  beforeEach(() => {
    resetIds();
  });

  afterEach(() => {
    if (component) {
      component.unmount();
      component = undefined;
    }
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  isConformant({
    Component: SearchBox,
    displayName: 'SearchBox',
  });

  it('renders SearchBox correctly', () => {
    component = create(<SearchBox />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders SearchBox role on the container div', () => {
    wrapper = mount(<SearchBox role="search" />);

    expect(wrapper.getDOMNode().getAttribute('role')).toEqual('search');
  });

  it('can execute an onClick on clear button', () => {
    let clickExecuted = false;
    wrapper = mount(
      <SearchBox
        clearButtonProps={{
          onClick: () => (clickExecuted = true),
        }}
      />,
    );

    expect(wrapper.find('input').prop('value')).toEqual('');

    wrapper.find('input').simulate('change', { target: { value: 'New value' } });

    expect(wrapper.find('input').prop('value')).toEqual('New value');

    wrapper.find('button').simulate('click');

    expect(clickExecuted).toEqual(true);

    expect(wrapper.find('input').prop('value')).toEqual('');
  });

  it('renders SearchBox without animation correctly', () => {
    component = create(<SearchBox disableAnimation={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can execute search when SearchBox is empty', () => {
    let searchExecuted = false;
    wrapper = mount(<SearchBox onSearch={() => (searchExecuted = true)} />);

    wrapper.find('input').simulate('keydown', { which: KeyCodes.enter });
    expect(searchExecuted).toEqual(true);
  });

  it('has a default icon with empty iconProps', () => {
    wrapper = mount(<SearchBox iconProps={{}} />);
    const searchIcon = '';
    expect(wrapper.find('i').text()).toEqual(searchIcon);
  });

  it('supports overriding the icon iconName', () => {
    wrapper = mount(
      <SearchBox
        iconProps={{
          iconName: 'Filter',
        }}
      />,
    );

    const filterIcon = '';
    expect(wrapper.find('i').text()).toEqual(filterIcon);
  });

  it('supports native props on inner input', () => {
    wrapper = mount(<SearchBox autoComplete="on" />);
    const inputEl = wrapper.find('input').getDOMNode();
    const autocompleteVal = inputEl.getAttribute('autocomplete');

    expect(autocompleteVal).toBe('on');
  });

  it('supports setting a placeholder value', () => {
    const placeholder = 'Search';
    wrapper = mount(<SearchBox placeholder={placeholder} />);
    const inputEl = wrapper.find('input').getDOMNode();
    const placeholderVal = inputEl.getAttribute('placeholder');

    expect(placeholderVal).toBe(placeholder);
  });

  it('supports setting id on input', () => {
    wrapper = mount(<SearchBox id="foo" />);
    expect(wrapper.find('input').prop('id')).toBe('foo');
  });

  it('generates id for input if none passed in', () => {
    wrapper = mount(<SearchBox />);
    expect(wrapper.find('input').prop('id')).toBeTruthy();
  });

  it('only invokes onFocus callback once per focus event', () => {
    const onFocus = jest.fn();
    wrapper = mount(<SearchBox onFocus={onFocus} />);
    wrapper.simulate('focus');

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('can be disabled via props', () => {
    wrapper = mount(<SearchBox disabled />);
    const inputEl = wrapper.find('input').getDOMNode();
    const disabledVal = inputEl.getAttribute('disabled');

    expect(disabledVal).toBe('');
  });

  it('is not disabled by default', () => {
    wrapper = mount(<SearchBox />);
    const inputEl = wrapper.find('input').getDOMNode();
    const disabledVal = inputEl.getAttribute('disabled');

    expect(disabledVal).toBeFalsy();
  });

  it('handles setting value', () => {
    wrapper = mount(<SearchBox value="test" />);
    expect(wrapper.find('input').prop('value')).toBe('test');
  });

  it('handles updating value to empty string', () => {
    wrapper = mount(<SearchBox value="test" />);
    wrapper.setProps({ value: '' });
    expect(wrapper.find('input').prop('value')).toBe('');
  });

  it('handles setting null value', () => {
    // this is not allowed per typings, but users might do it anyway
    wrapper = mount(<SearchBox value={null as any} />);
    expect(wrapper.find('input').prop('value')).toBe(`null`);
  });

  it('handles rendering 0', () => {
    wrapper = mount(<SearchBox value={0 as any} />);
    // this is not allowed per typings, but users might do it anyway
    expect(wrapper.find('input').getDOMNode().getAttribute('value')).toBe('0');
  });

  it('handles onChange', () => {
    const onChange = jest.fn();

    wrapper = mount(<SearchBox onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(0);

    wrapper.find('input').simulate('change', { target: { value: 'New value' } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('handles onChanged', () => {
    const onChanged = jest.fn();

    wrapper = mount(<SearchBox onChanged={onChanged} />);
    expect(onChanged).toHaveBeenCalledTimes(0);

    wrapper.find('input').simulate('change', { target: { value: 'New value' } });

    expect(onChanged).toHaveBeenCalledTimes(1);
  });

  it('invokes onEscape callback on escape keydown', () => {
    const onEscape = jest.fn();

    wrapper = mount(<SearchBox onEscape={onEscape} />);
    wrapper.find('input').simulate('keydown', { which: KeyCodes.escape });

    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it('invokes onClear callback on escape keydown and clears the value, if it has a value', () => {
    const onClear = jest.fn();

    wrapper = mount(<SearchBox onClear={onClear} defaultValue="test" />);
    wrapper.find('input').simulate('keydown', { which: KeyCodes.escape });

    expect(onClear).toHaveBeenCalledTimes(1);
    expect(wrapper.find('input').prop('value')).toBe('');
  });

  it('does not invoke onClear callback on escape keydown, if it does not have a value', () => {
    const onClear = jest.fn();

    wrapper = mount(<SearchBox onClear={onClear} />);
    wrapper.find('input').simulate('keydown', { which: KeyCodes.escape });

    expect(onClear).not.toHaveBeenCalled();
  });

  it('does not clear the value on escape keydown, if onClear calls preventDefault', () => {
    const onClear = jest.fn(ev => ev.preventDefault());

    wrapper = mount(<SearchBox onClear={onClear} defaultValue="test" />);
    wrapper.find('input').simulate('keydown', { which: KeyCodes.escape });

    expect(onClear).toHaveBeenCalledTimes(1);
    expect(wrapper.find('input').prop('value')).toBe('test');
  });

  it('prevents escape keypress from bubbling, if and only if it has a value', () => {
    const onParentKeyDown = jest.fn();

    wrapper = mount(
      <div onKeyDown={onParentKeyDown}>
        <SearchBox defaultValue="test" />
      </div>,
    );

    // First escape clears the value and should not bubble
    wrapper.find('input').simulate('keydown', { which: KeyCodes.escape });
    expect(onParentKeyDown).not.toHaveBeenCalled();

    // Second escape should bubble
    wrapper.find('input').simulate('keydown', { which: KeyCodes.escape });
    expect(onParentKeyDown).toHaveBeenCalledTimes(1);
  });

  it('invokes onSearch callback on enter keydown', () => {
    const onSearch = jest.fn();

    wrapper = mount(<SearchBox onSearch={onSearch} />);
    wrapper.find('input').simulate('keydown', { which: KeyCodes.enter });

    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('invokes onKeyDown callback on keydown', () => {
    const onKeyDown = jest.fn();

    wrapper = mount(<SearchBox onKeyDown={onKeyDown} />);
    wrapper.find('input').simulate('keydown');

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });
});
