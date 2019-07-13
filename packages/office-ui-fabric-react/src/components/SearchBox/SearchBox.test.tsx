import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { SearchBox } from './SearchBox';
import { KeyCodes } from '../../Utilities';
import { ISearchBoxProps } from './SearchBox.types';
import { ISearchBoxState, SearchBoxBase } from './SearchBox.base';

// tslint:disable:jsx-no-lambda

describe('SearchBox', () => {
  let component: renderer.ReactTestRenderer | undefined;
  let wrapper: ReactWrapper<ISearchBoxProps, ISearchBoxState, SearchBoxBase> | undefined;

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

  it('renders SearchBox correctly', () => {
    component = renderer.create(<SearchBox />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can execute an onClick on clear button', () => {
    let clickExecuted = false;
    wrapper = mount(
      <SearchBox
        clearButtonProps={{
          onClick: () => (clickExecuted = true)
        }}
      />
    );

    expect(wrapper.find('input').prop('value')).toEqual('');

    wrapper.find('input').simulate('change', { target: { value: 'New value' } });

    expect(wrapper.find('input').prop('value')).toEqual('New value');

    wrapper.find('button').simulate('click');

    expect(clickExecuted).toEqual(true);

    expect(wrapper.find('input').prop('value')).toEqual('');
  });

  it('renders SearchBox without animation correctly', () => {
    component = renderer.create(<SearchBox disableAnimation={true} />);
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
          iconName: 'Filter'
        }}
      />
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

    expect(onFocus.mock.calls.length).toBe(1);
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

  it('handles setting null value', () => {
    // this is not allowed per typings, but users might do it anyway
    wrapper = mount(<SearchBox value={null as any} />);
    expect(wrapper.find('input').prop('value')).toBe('');
  });

  it('handles updating value to empty string', () => {
    wrapper = mount(<SearchBox value="test" />);
    wrapper.setProps({ value: '' });
    expect(wrapper.find('input').prop('value')).toBe('');
  });

  it('handles updating value to null', () => {
    wrapper = mount(<SearchBox value="test" />);
    // this is not allowed per typings, but users might do it anyway
    wrapper.setProps({ value: null as any });
    expect(wrapper.find('input').prop('value')).toBe('');
  });
});
