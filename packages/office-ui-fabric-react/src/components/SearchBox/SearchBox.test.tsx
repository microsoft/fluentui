import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { SearchBox } from './SearchBox';
import { KeyCodes } from '../../Utilities';

// tslint:disable:jsx-no-lambda

describe('SearchBox', () => {
  it('renders SearchBox correctly', () => {
    const component = renderer.create(<SearchBox />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can execute an onClick on clear button', () => {
    let clickExecuted = false;
    const component = mount(
      <SearchBox
        clearButtonProps={{
          onClick: () => (clickExecuted = true)
        }}
      />
    );

    expect(component.find('input').prop('value')).toEqual('');

    component.find('input').simulate('change', { target: { value: 'New value' } });

    expect(component.find('input').prop('value')).toEqual('New value');

    component.find('button').simulate('click');

    expect(clickExecuted).toEqual(true);

    expect(component.find('input').prop('value')).toEqual('');
  });

  it('renders SearchBox without animation correctly', () => {
    const component = renderer.create(<SearchBox disableAnimation={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can execute search when SearchBox is empty', () => {
    let searchExecuted = false;
    const component = mount(<SearchBox onSearch={() => (searchExecuted = true)} />);

    component.find('input').simulate('keydown', { which: KeyCodes.enter });
    expect(searchExecuted).toEqual(true);
  });

  it('has a default icon with empty iconProps', () => {
    const component = mount(<SearchBox iconProps={{}} />);
    const searchIcon = '';
    expect(component.find('i').text()).toEqual(searchIcon);
  });

  it('supports overriding the icon iconName', () => {
    const component = mount(
      <SearchBox
        iconProps={{
          iconName: 'Filter'
        }}
      />
    );

    const filterIcon = '';
    expect(component.find('i').text()).toEqual(filterIcon);
  });

  it('supports native props on inner input', () => {
    const component = mount(<SearchBox autoComplete="on" />);
    const inputEl = component.find('input').getDOMNode();
    const autocompleteVal = inputEl.getAttribute('autocomplete');

    expect(autocompleteVal).toBe('on');
  });

  it('supports setting a placeholder value', () => {
    const placeholder = 'Search';
    const component = mount(<SearchBox placeholder={placeholder} />);
    const inputEl = component.find('input').getDOMNode();
    const placeholderVal = inputEl.getAttribute('placeholder');

    expect(placeholderVal).toBe(placeholder);
  });

  it('only invokes onFocus callback once per focus event', () => {
    const onFocus = jest.fn();
    const component = mount(<SearchBox onFocus={onFocus} />);
    component.simulate('focus');

    expect(onFocus.mock.calls.length).toBe(1);
  });

  it('id is generated internally and cannot be set via props', () => {
    const component = mount(<SearchBox id={'foo'} />);
    const inputEl = component.find('input').getDOMNode();
    const idVal = inputEl.getAttribute('id');

    expect(idVal).toBe('SearchBox12');
  });

  it('disable state can be set via props', () => {
    const component = mount(<SearchBox disabled />);
    const inputEl = component.find('input').getDOMNode();
    const disabledVal = inputEl.getAttribute('disabled');

    expect(disabledVal).toBe('');
  });

  it('disable is false by default', () => {
    const component = mount(<SearchBox />);
    const inputEl = component.find('input').getDOMNode();
    const disabledVal = inputEl.getAttribute('disabled');

    expect(disabledVal).toBeFalsy();
  });
});
