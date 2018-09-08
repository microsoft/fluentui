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
});
